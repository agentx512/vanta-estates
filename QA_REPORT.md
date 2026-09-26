# VANTA ESTATES — QA record

Date: 2026-09-26

## Result

- `npm install`, `npm run lint`, `npm run typecheck`, and `npm run build` completed successfully. Next generated the bilingual home, detail, area, development, about, contact, sitemap, and robots routes.
- `node scripts/browser-qa.mjs` passed against `http://realestatedemo.local` with no page errors, console errors, hydration errors, or horizontal overflow in the tested pages.
- Apache reports `Syntax OK`. `apache2`, `realestatedemo.service`, and the existing `nova-interiors.service` are active. VANTA and Nova both return HTTP 200 on their separate local domains. `/etc/hosts` has exactly one `realestatedemo.local` entry. The Nova repository is unchanged.

## Browser coverage

The browser script checked English and Arabic, LTR/RTL, home and property detail at 1440 px and 390 px, navigation routes, menu and filter-sheet Escape handling, search filtering, area selection, Smart Match result consistency, property gallery, floor-plan tabs, WhatsApp message identity and location, form validation, desktop filtering, price sort, grid/list view, language switching with the query retained, reduced motion, sitemap, robots, and 404 behavior. It also checked horizontal overflow at 320, 360, 375, 390, 430, 768, 1024, 1280, 1440, and 1920 px.

## Full-page screenshots

| Page | Desktop | Mobile |
| --- | --- | --- |
| Home, English | [1440 px](qa/screenshots/home-1440.png) | [390 px](qa/screenshots/home-390.png) |
| The Ridge House detail | [1440 px](qa/screenshots/property-1440.png) | [390 px](qa/screenshots/property-390.png) |
| Home, Arabic | — | [390 px](qa/screenshots/home-ar-390.png) |

The screenshots show continuous section flow with no pinning spacers or blank sections. Chromium's direct full-page capture omitted the desktop hero's absolute photo and search dock despite rendering them normally in the viewport. The browser QA script stitches viewport captures for the English desktop home screenshot so the saved full-page image represents the rendered page.

## Demo boundaries

All properties and prices are fictional. The floor plan, gallery imagery, map, and travel times are illustrative. Viewing and contact forms validate input and prepare a WhatsApp handoff; no request is saved or sent to a backend. The demonstration WhatsApp number and email must be replaced before client use.
