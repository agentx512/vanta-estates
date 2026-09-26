# VANTA ESTATES

A bilingual, multi-page real estate marketing demo for Egypt. All listings, developments, prices, travel times, floor plans, and brand details are fictional and illustrative. The site is frontend only: search and matching use local TypeScript data; inquiries prepare a WhatsApp message and are not stored.

## Run

```bash
npm install
npm run dev -- -p 3100
```

Open `http://localhost:3100/en` or `/ar`. Unprefixed routes redirect to English. For the installed local production service, open **http://realestatedemo.local**. The Apache and systemd configuration files are in [`ops/`](ops/).

```bash
npm run lint
npm run typecheck
npm run build
node scripts/browser-qa.mjs
```

The browser QA script uses the installed Chromium at `/usr/bin/chromium` and writes full-page screenshots to `qa/screenshots/`.

## Deploy to Vercel

This is a Next.js project. Vercel can build it with the default Next.js settings; the project root is this directory. No `vercel.json` or local Apache/systemd configuration is needed on Vercel.

1. Create an empty repository on GitHub and push this local `main` branch:

   ```bash
   git remote add origin <YOUR_GITHUB_REPOSITORY_URL>
   git push -u origin main
   ```

2. In the [Vercel dashboard](https://vercel.com/new), select **Add New → Project**, import the repository, leave **Framework Preset: Next.js** and **Root Directory: `./`**, then select **Deploy**.
3. In **Project Settings → Environment Variables**, enable **Automatically expose System Environment Variables**. The app uses Vercel's `VERCEL_PROJECT_PRODUCTION_URL` for canonical, Open Graph, sitemap, robots, and structured-data URLs. You can set `NEXT_PUBLIC_SITE_URL` to a full `https://...` URL if you want to override it, for example when using a custom domain. Redeploy after changing environment variables.
4. Open the assigned `*.vercel.app` URL and check `/en`, `/ar`, `/sitemap.xml`, and a property detail page. The forms open WhatsApp using the demonstration number in `config/site.ts`; change that number and the demo email before using the site for real inquiries.

Alternatively, deploy directly from this directory with the [Vercel CLI](https://vercel.com/docs/cli/deploy): `npx vercel` for a preview and `npx vercel --prod` for production. The first command will prompt you to log in and link or create a project.

## Structure

| Task | File or directory |
| --- | --- |
| Listings and detail content | `data/properties.ts` |
| Developments | `data/developments.ts` |
| Areas and atlas markers | `data/areas.ts` |
| Brand and contact settings | `config/site.ts` |
| English and Arabic interface copy | `lib/i18n.ts` |
| Client-side filtering | `lib/filters.ts` |
| WhatsApp message generation | `lib/whatsapp.ts` |
| Routes and metadata | `app/[locale]/` |
| Visual system and responsive layout | `app/globals.css` |
| Design reference audit | `REFERENCE_MAP.md` |

Routes include the homepage, properties and property details, developments and development details, areas and area details, about, and contact in both `/en` and `/ar`. The `/properties` listing accepts query parameters such as `location`, `type`, `budget`, `bedrooms`, `delivery`, `developer`, `region`, and `purpose`.

## Local installation

The site runs through `realestatedemo.service` on `127.0.0.1:3100`. Apache serves `realestatedemo.local` using a separate VirtualHost. Nova Interiors stays on its existing `designdemo.local` and port 3000 setup.

After a code change:

```bash
npm run build
sudo systemctl restart realestatedemo.service
```

`config/site.ts` contains a demonstration WhatsApp number and `.demo` email address. Replace these before adapting the project for a real client. The inquiry forms validate input and open WhatsApp; they do not submit to a backend.

## Imagery

The hero architectural concept was generated for this project with the built-in image generation tool, then saved as `public/images/hero.webp`. Prompt: “A monumental contemporary residential tower and landscaped courtyard in New Cairo, cool blue-gray architectural photography, geometric facade rhythm, building on the right, no people, text, or logos.” All other local WebP images are illustrative Unsplash architecture/coastal photos, downloaded and optimized for the demo. Their original photo IDs are:

| Asset | Unsplash photo ID |
| --- | --- |
| `ridge.webp` | `1613490493576-7fde63acd811` |
| `arc.webp` | `1624204386084-dd8c05e32226` |
| `courtyard.webp` | `1600596542815-ffad4c1539a9` |
| `coastline.webp` | `1628012209120-d9db7abf7eab` |
| `park.webp` | `1545324418-cc1a3fa10c00` |
| `eastline.webp` | `1621831337128-35676ca30868` |
| `dune.webp` | `1580587771525-78b9dba3b914` |
| `capital.webp` | `1515263487990-61b07816b324` |
| `west.webp` | `1722421492323-eaf9c401befe` |
| `office.webp` | `1631085474949-d8a367d9d26d` |
| `beach.webp` | `1615571022219-eb45cf7faa9d` |
| `modern.webp` | `1600585154340-be6161a56a0c` |

Gallery photos are illustrative across fictional listings. They do not depict real properties offered for sale.
