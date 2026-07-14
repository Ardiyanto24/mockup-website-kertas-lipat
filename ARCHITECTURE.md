# Project Architecture Map - Kertas Lipat

This document tracks the mapping of routes, layouts, templates, and organisms inside this repository.

## Route Map

| Route URL / Path | Template | Organisms Used | Description |
| :--- | :--- | :--- | :--- |
| `src/app/(public)/page.tsx` (`/`) | `HomeTemplate` | - `shared/public/Navbar`<br>- `home/HomeHeroSection`<br>- `home/HomeValuePropSection`<br>- `home/HomeOrderSchemeSection`<br>- `home/HomeFeaturedSection`<br>- `home/HomeHowItWorksSection`<br>- `home/HomeQualitySection`<br>- `home/HomeShowcaseSection`<br>- `home/HomeTestimonialSection`<br>- `home/HomeContactSection`<br>- `shared/public/Footer` | Homepage for Kertas Lipat with 9 sections. |
| `src/app/(public)/products/page.tsx` (`/products`) | `ProductsTemplate` | - `shared/public/Navbar`<br>- `products/ProductsHeaderSection`<br>- `products/ProductsCatalogSection`<br>- `shared/public/Footer` | Products catalog listing page with filters and search. |
| `src/app/(public)/products/[sku]/page.tsx` (`/products/[sku]`) | `ProductsDetailTemplate` | - `shared/public/Navbar`<br>- `products/ProductsDetailHeader`<br>- `products/ProductsDetailConfigurator`<br>- `products/ProductsDetailAccordion`<br>- `shared/public/Footer` | Dynamic product detail page with mockup gallery, pricing calculator, and WhatsApp checkout. |
| `src/app/(public)/cart/page.tsx` (`/cart`) | `CartTemplate` | - `shared/public/Navbar`<br>- `cart/CartListingSection`<br>- `cart/CartCheckoutPanel`<br>- `shared/public/Footer` | Shopping cart overview page with drag uploader and WA checkout brief compiler. |
| `src/app/(admin)/cms/page.tsx` (`/cms`) | `CmsTemplate` | - `cms/CmsSidebar`<br>- `cms/CmsHeader`<br>- `cms/CmsEditorForm` | CMS Editor panel to manage all 10 homepage sections. |

## Component Directory Structure (Atomic Design)

- `src/components/atoms/`: Small, reusable leaf elements (e.g., `Button`, `Badge`).
- `src/components/molecules/shared/`: Shared small composite components (e.g., `ProductCard`, `HotspotTooltip`, `CatalogProductCard`).
- `src/components/organisms/`: Large section-level components.
- `shared/public/`: Shared global public organisms (e.g., `Navbar`, `Footer`).
  - `home/`: Organisms specific to the home route.
  - `products/`: Organisms specific to the products catalog & detail routes.
  - `cart/`: Organisms specific to the cart overview route.
  - `cms/`: Organisms specific to the CMS admin dashboard route.
- `src/components/templates/`: Layout orchestrators linking pages and organisms (e.g., `HomeTemplate`, `ProductsTemplate`, `ProductsDetailTemplate`, `CartTemplate`, `CmsTemplate`).
