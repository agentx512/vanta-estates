# VANTA ESTATES — local reference audit

Audit date: 2026-09-25. The top level of `/var/www/designdemo` contains one runnable website, **Nova Interiors**, plus `app`, `components`, `config`, `data`, `lib`, `messages`, `public`, configuration, build, and dependency folders. I inspected `http://designdemo.local/en` at 1440 px, its source components, and its image inventory. There are no separate property, map, or detail-page websites in this library. Its photographs and editorial visual system are unsuitable for VANTA.

## Selected bounded references (4)

| Reference | Full local path | Used for | Why selected | Explicitly excluded |
| --- | --- | --- | --- | --- |
| Header interaction | `/var/www/designdemo/components/layout/Header.tsx` | Scroll state and keyboard-managed mobile navigation behavior | Compact-on-scroll state and focus/escape handling translate to a multi-page site | Nova brand, warm styling, same navigation layout, theme toggle, section anchors, and identical numbered menu appearance |
| Indexed preview interaction | `/var/www/designdemo/components/sections/Services.tsx` | Focused list selection updating an adjacent visual | Gives the area explorer a usable hover, focus, and click model | Service copy, serif type, warm photos, row proportions, and styling |
| Progressive data presentation | `/var/www/designdemo/components/sections/Process.tsx` | Active-item logic and reduced-motion handling | Reference for controlled, accessible image changes | Sticky narrative layout, numbered visual treatment, process imagery, scroll pacing, and spacing |
| Lead handoff | `/var/www/designdemo/components/sections/ContactForm.tsx` | Validated client-side form and explicit WhatsApp handoff | A transparent demo inquiry flow is relevant to property leads | Fields, layout, colors, business identity, and contact copy |

## Reference lock and decision ledger

**Primary direction:** the SRS's Metropolitan Atlas / Urban Intelligence brief: midnight and porcelain surfaces, cobalt as the action and selection color, orange limited to availability, strong sans typography, sharp geometry, coordinate labels, fine rules, and property facts. The local references provide interaction patterns only. The implementation will compose a single architectural image with a data overlay, a compact horizontal search dock, asymmetric listing rhythm, and a code-native abstract map.

| Decision | Source | Role |
| --- | --- | --- |
| Cool midnight, porcelain, cobalt, and restrained orange | SRS §§5–8 | Brand palette and strict accent roles |
| Exterior architecture photography | SRS §§12, 17, 22 | Hero, listing, and development imagery; no Nova assets |
| List selection updates map and statistics | SRS §20; local Services interaction | Place discovery, not a services clone |
| Short route and marker transitions; native scrolling | SRS §§47–53 | Navigation feedback without pin spacers |
| Explicit demo inquiry handoff | SRS §§32–33, 66; local ContactForm behavior | WhatsApp link and honest client-side form |

Live Refero search returned `NO_SUBSCRIPTION`; the local audit and detailed SRS serve as the available visual research. No files in `/var/www/designdemo` will be modified or copied into this project.

## Motion extension — 2026-09-26

Refero style searches for luxury real estate, architectural property, and image-led travel all returned `NO_SUBSCRIPTION`. The locked visual target remains the existing VANTA site and the Metropolitan Atlas SRS direction above. The bundled Refero motion guide supplies timing, feedback, continuity, and reduced-motion rules.

| Decision | Source | Role |
| --- | --- | --- |
| Keep architectural photography, midnight canvas, sharp sans type, and cobalt actions | Existing VANTA reference lock | Motion adds depth without changing the brand roles |
| Replace the full-screen `clip-path` wipe with a thin route progress line | Motion guide: transform and opacity for large transitions; user request for smooth entry | Navigation feedback without obscuring the page or repainting a full viewport |
| Stage hero image, headline, links, and search with short eased transforms and fades | Existing image-led hero; motion guide hierarchy | Guide attention during the first second of page entry |
| Reveal only offscreen sections as they approach the viewport | Motion guide continuity and reduced-motion rule | Add rhythm during browsing while preserving visible server-rendered content |
| Keep old map/project images visible until replacements load, then crossfade | Existing area and development selection pattern | Avoid blank flashes during rapid selection |
| Animate filter feedback without remounting listing cards; update counters without React state on every frame | User request for responsiveness and frame stability | Keep interactions interruptible and reduce main-thread work |
