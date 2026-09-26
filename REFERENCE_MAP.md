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
