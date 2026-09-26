import { chromium } from "playwright-core";
import { mkdir } from "node:fs/promises";
import sharp from "sharp";

const base = "http://realestatedemo.local";
const output = "qa/screenshots";
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: "/usr/bin/chromium", args: ["--no-sandbox"] });
const failures = [];

async function checkPage(name, path, width, height) {
  const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1 });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
  const response = await page.goto(`${base}${path}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  await page.evaluate(async () => {
    document.documentElement.style.scrollBehavior = "auto";
    const pause = (duration) => new Promise((resolve) => setTimeout(resolve, duration));
    for (let y = 0; y < document.documentElement.scrollHeight; y += 650) { window.scrollTo({ top: y, behavior: "instant" }); await pause(35); }
    window.scrollTo({ top: 0, behavior: "instant" });
  });
  await page.waitForTimeout(950);
  if (name === "home-1440") {
    // Chromium omits the absolute hero image and search dock in its captureBeyondViewport path.
    // Stitch normal viewport captures so the delivered full-page image matches the rendered site.
    const documentHeight = await page.evaluate(() => document.documentElement.scrollHeight);
    const frames = [];
    await page.addStyleTag({ content: ".qa-scrolled .site-header{visibility:hidden!important}" });
    for (let y = 0; y < documentHeight; y += height) {
      await page.evaluate((target) => { window.scrollTo({ top: target, behavior: "instant" }); document.documentElement.classList.toggle("qa-scrolled", target > 0); }, y);
      await page.waitForTimeout(130);
      const top = await page.evaluate(() => window.scrollY);
      frames.push({ input: await page.screenshot(), top, left: 0 });
    }
    await sharp({ create: { width, height: documentHeight, channels: 3, background: "#f4f5f1" } }).composite(frames).png().toFile(`${output}/${name}.png`);
    await page.evaluate(() => { document.documentElement.classList.remove("qa-scrolled"); window.scrollTo({ top: 0, behavior: "instant" }); });
  } else {
    await page.screenshot({ path: `${output}/${name}.png`, fullPage: true });
  }
  const metrics = await page.evaluate(() => ({
    width: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
    height: document.documentElement.scrollHeight,
    dir: document.documentElement.dir,
    hero: document.querySelector(".hero")?.getBoundingClientRect().toJSON(),
    search: document.querySelector(".hero-search")?.getBoundingClientRect().toJSON(),
  }));
  if (response?.status() !== 200) failures.push(`${name}: HTTP ${response?.status()}`);
  if (metrics.scrollWidth > metrics.width + 1) failures.push(`${name}: horizontal overflow ${metrics.scrollWidth - metrics.width}px`);
  if (errors.length) failures.push(`${name}: ${errors.join(" | ")}`);
  console.log(`${name}: status ${response?.status()}, ${metrics.width}×${metrics.height}, dir=${metrics.dir}, overflow=${metrics.scrollWidth - metrics.width}`);
  if (name === "home-1440") console.log(`hero=${JSON.stringify(metrics.hero)} search=${JSON.stringify(metrics.search)}`);
  await context.close();
}

await checkPage("home-1440", "/en", 1440, 900);
await checkPage("home-390", "/en", 390, 844);
await checkPage("property-1440", "/en/properties/the-ridge-house", 1440, 900);
await checkPage("property-390", "/en/properties/the-ridge-house", 390, 844);
await checkPage("home-ar-390", "/ar", 390, 844);

const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
const page = await context.newPage();
page.on("pageerror", (error) => failures.push(`interaction page error: ${error.message}`));
await page.goto(`${base}/en`, { waitUntil: "networkidle" });
await page.locator(".area-list-item").nth(2).click();
const activeArea = await page.locator(".area-map-data h3").innerText();
if (activeArea !== "Sheikh Zayed") failures.push(`area explorer selection: ${activeArea}`);
await page.getByRole("button", { name: "Open menu" }).click();
if (!(await page.locator(".mobile-navigation").isVisible())) failures.push("mobile menu did not open");
await page.keyboard.press("Escape");
if (await page.locator(".mobile-navigation").count()) failures.push("mobile menu did not close on Escape");
await page.locator(".hero-search-mobile").click();
await page.keyboard.press("Escape");
if (await page.locator(".filter-sheet").evaluate((node) => node.open)) failures.push("filter sheet did not close on Escape");
await page.locator(".hero-search-mobile").click();
await page.locator(".filter-sheet select[aria-label='Location']").selectOption("new-cairo");
await page.locator(".filter-sheet select[aria-label='Property type']").selectOption("Villa");
await page.getByRole("button", { name: /Apply filters/i }).click();
await page.waitForURL(/\/en\/properties\?/, { timeout: 10000 });
const filteredCount = await page.locator(".listing-grid .property-card").count();
if (filteredCount !== 1) failures.push(`hero search expected 1 result, found ${filteredCount}`);
await page.locator(".property-card-main").first().click();
await page.waitForURL(/the-ridge-house/);
await page.locator(".gallery-open").click();
if (!(await page.locator(".gallery-dialog").evaluate((node) => node.open))) failures.push("gallery did not open");
await page.keyboard.press("Escape");
if (await page.locator(".gallery-dialog").evaluate((node) => node.open)) failures.push("gallery did not close on Escape");
await page.getByRole("tab", { name: "First" }).click();
if ((await page.getByRole("tab", { name: "First" }).getAttribute("aria-selected")) !== "true") failures.push("floor tab selection failed");
if (!(await page.locator("a[href^='https://wa.me/']").count())) failures.push("WhatsApp links missing");
const propertyWhatsapp = await page.locator(".inquiry-direct a").first().getAttribute("href");
if (!decodeURIComponent(propertyWhatsapp || "").includes("The Ridge House (VT-014) in New Cairo")) failures.push("property WhatsApp message lacks listing identity or location");
await page.locator(".inquiry-panel input[name='name']").fill("Demo Visitor");
await page.locator(".inquiry-panel input[name='phone']").fill("123");
await page.locator(".inquiry-panel button[type='submit']").click();
if (!(await page.locator(".inquiry-panel .form-error").isVisible())) failures.push("viewing form validation failed");
await context.close();

const matchContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const matchPage = await matchContext.newPage();
await matchPage.goto(`${base}/en`, { waitUntil: "networkidle" });
await matchPage.locator(".smart-question").nth(0).getByRole("button", { name: "To live" }).click();
await matchPage.locator(".smart-question").nth(1).getByRole("button", { name: "5–10M" }).click();
await matchPage.locator(".smart-question").nth(2).getByRole("button", { name: "East Cairo" }).click();
const matchCount = await matchPage.locator(".smart-result>span").first().innerText();
await matchPage.getByRole("link", { name: /See matching properties/ }).click();
await matchPage.waitForURL(/purpose=live/);
const matchResults = await matchPage.locator(".listing-grid .property-card").count();
if (!matchCount.startsWith(String(matchResults))) failures.push(`smart match count ${matchCount} differs from results ${matchResults}`);
await matchContext.close();

const desktopContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const desktopPage = await desktopContext.newPage();
await desktopPage.goto(`${base}/en/properties`, { waitUntil: "networkidle" });
await desktopPage.locator(".listing-filters-desktop select[aria-label='Location']").selectOption("new-cairo");
if ((await desktopPage.locator(".listing-grid .property-card").count()) !== 3) failures.push("desktop location filter did not return 3 New Cairo properties");
await desktopPage.locator(".sort-label select").selectOption("high");
if ((await desktopPage.locator(".listing-grid .property-card h3").first().innerText()) !== "The Ridge House") failures.push("price sorting failed");
await desktopPage.getByRole("button", { name: "List view" }).click();
if (!(await desktopPage.locator(".listing-grid").evaluate((node) => node.classList.contains("list-view")))) failures.push("list view toggle failed");
await desktopPage.locator(".language-link").click();
await desktopPage.waitForURL(/\/ar\/properties\?location=new-cairo/);
if ((await desktopPage.locator(".listing-grid .property-card").count()) !== 3) failures.push("language switch did not retain the filter");
await desktopPage.goto(`${base}/en/contact`, { waitUntil: "networkidle" });
await desktopPage.locator(".contact-form input[name='name']").fill("Demo Visitor");
await desktopPage.locator(".contact-form input[name='phone']").fill("123");
await desktopPage.locator(".contact-form button[type='submit']").click();
if (!(await desktopPage.locator(".contact-form .form-error").isVisible())) failures.push("contact form validation failed");
await desktopContext.close();

const routeContext = await browser.newContext();
const routes = ["/", "/en/properties", "/ar/properties", "/en/developments", "/en/developments/solis-district", "/en/areas", "/en/areas/new-cairo", "/en/about", "/en/contact", "/ar/about", "/ar/contact", "/ar/developments/arc-one", "/ar/areas/north-coast", "/ar/properties/the-ridge-house", "/robots.txt", "/sitemap.xml"];
for (const route of routes) {
  const response = await routeContext.request.get(`${base}${route}`);
  if (response.status() !== 200) failures.push(`${route}: HTTP ${response.status()}`);
}
const missing = await routeContext.request.get(`${base}/en/properties/does-not-exist`);
if (missing.status() !== 404) failures.push(`404 route returned ${missing.status()}`);
await routeContext.close();

const reducedContext = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
const reducedPage = await reducedContext.newPage();
await reducedPage.goto(`${base}/ar`, { waitUntil: "networkidle" });
const reduced = await reducedPage.evaluate(() => ({ requested: matchMedia("(prefers-reduced-motion: reduce)").matches, dir: document.documentElement.dir, overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth }));
if (!reduced.requested || reduced.dir !== "rtl" || reduced.overflow > 1) failures.push(`reduced-motion RTL check: ${JSON.stringify(reduced)}`);
await reducedContext.close();

for (const width of [320, 360, 375, 390, 430, 768, 1024, 1280, 1440, 1920]) {
  const ctx = await browser.newContext({ viewport: { width, height: 900 } });
  const p = await ctx.newPage(); await p.goto(`${base}/en`, { waitUntil: "domcontentloaded" });
  const overflow = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  if (overflow > 1) failures.push(`home ${width}px overflow ${overflow}px`);
  await ctx.close();
}

await browser.close();
if (failures.length) { console.error("QA failures:\n" + failures.join("\n")); process.exitCode = 1; }
else console.log("Browser QA passed.");
