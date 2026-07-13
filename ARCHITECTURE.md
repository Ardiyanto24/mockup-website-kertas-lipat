# Project Architecture Map - Kertas Lipat

This document tracks the mapping of routes, layouts, templates, and organisms inside this repository.

## Route Map

| Route URL / Path | Template | Organisms Used | Description |
| :--- | :--- | :--- | :--- |
| `src/app/(public)/page.tsx` (`/`) | `HomeTemplate` | - `shared/public/Navbar`<br>- `home/HomeHeroSection`<br>- `home/HomeValuePropSection`<br>- `home/HomeOrderSchemeSection`<br>- `home/HomeFeaturedSection`<br>- `home/HomeHowItWorksSection`<br>- `home/HomeQualitySection`<br>- `home/HomeShowcaseSection`<br>- `home/HomeTestimonialSection`<br>- `home/HomeContactSection`<br>- `shared/public/Footer` | Homepage for Kertas Lipat with 9 sections. |

## Component Directory Structure (Atomic Design)

- `src/components/atoms/`: Small, reusable leaf elements (e.g., `Button`, `Badge`).
- `src/components/molecules/shared/`: Shared small composite components (e.g., `ProductCard`, `HotspotTooltip`).
- `src/components/organisms/`: Large section-level components.
  - `shared/public/`: Shared global public organisms (e.g., `Navbar`, `Footer`).
  - `home/`: Organisms specific to the home route.
- `src/components/templates/`: Layout orchestrators linking pages and organisms.
