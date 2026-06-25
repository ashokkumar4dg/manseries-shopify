<p align="center">
  <img src="Images/Logo/full_logo.png" alt="Man Series Logo" width="260">
</p>

<h1 align="center">PROJECT CONTEXT — Man Series</h1>
<p align="center"><em>Skin Minimalism · Engineered for Indian Men</em></p>

---

## 1. Brand Overview

### Identity

| Attribute | Detail |
| :--- | :--- |
| **Brand Name** | Man Series |
| **Tagline** | *Maximum Results, Minimum Efforts.* |
| **Category** | D2C Men's Skincare |
| **Target Audience** | Indian men (18–35) who value efficiency over complexity |
| **Brand Archetype** | The Sage — clinical, trustworthy, no‑BS |
| **Design Language** | Skin Minimalism — clean, warm, editorial with clinical credibility |

### Philosophy

> "Most skincare brands make a simple task feel like a full‑time job. At Man Series, we have cut through the noise. We specialize in **Skin Minimalism**: Multi‑functional, high‑performance formulations designed for the modern man who values his time as much as his appearance."

### Product Line — The Routine Matrix

| # | Product | Step | Hero Actives | Purpose |
| :---: | :--- | :--- | :--- | :--- |
| 1 | **MS Clear Facewash** | Cleanse | `Salicylic Acid 2% + Glycolic Acid 1%` | Removes excess oil, urban tan & pollution buildup |
| 2 | **MS Treat Serum** | Treat | `Niacinamide 4% + Zinc PCA 1% + Tranexamic 3%` | Targets acne scars, hyperpigmentation & barrier repair |
| 3 | **MS Protect Sunscreen** | Protect | `SPF 50+ PA++++ Hybrid Filters` | Broad‑spectrum UVA/UVB protection, zero white‑cast matte finish |

### Key Brand Differentiators
- **Skin Minimalism** — Only 3 products. No 10‑step routines.
- **Clinically‑Backed** — Dermatologist‑tested, active‑percentage‑first formulations.
- **Engineered for India** — Designed for Indian skin tones, humidity, pollution & sun exposure.
- **BYOS (Build Your Own Series)** — Custom bundle builder with dynamic discounts + Premium Gift Sleeve option.

---

## 2. Shopify Theme Structure

The theme follows the standard Shopify 2.0 architecture. All files live inside `shopify-theme/`.

```
shopify-theme/
├── assets/                     # Static files (CSS, JS, images)
│   ├── style.css               # Master stylesheet (~5,500 lines)
│   ├── app.js                  # Master JavaScript (~39 KB)
│   ├── full_logo.png           # Brand logo (full)
│   ├── logo.png                # Brand logo (icon)
│   ├── favicon.png             # Favicon
│   ├── Transparent_Facewash.png
│   ├── Transparent_Serum.png
│   ├── Transparent_Sunscreen.png
│   ├── desktop_banner.png      # Hero banner (desktop)
│   ├── mobile_banner.png       # Hero banner (mobile)
│   ├── mobile_banner_with_text.png
│   ├── byos.png                # BYOS section image
│   ├── avatar_1–12.png         # Testimonial avatars
│   ├── acne_control.png        # Skin concern card
│   ├── oiliness.png            # Skin concern card
│   ├── uneven_tone.png         # Skin concern card
│   └── fine_lines_wrinkles.png # Skin concern card
│
├── config/
│   ├── settings_schema.json    # Theme settings schema
│   └── settings_data.json      # Theme settings data (current values)
│
├── layout/
│   └── theme.liquid            # Master layout (HTML shell, <head>, global UI components)
│
├── sections/                   # Reusable, customizable Shopify sections
│   ├── announcement-bar.liquid
│   ├── header.liquid
│   ├── footer.liquid
│   ├── home-hero.liquid
│   ├── home-catalog.liquid
│   ├── home-reactor.liquid
│   ├── home-science.liquid
│   └── home-testimonials.liquid
│
└── templates/                  # Page-level templates
    ├── index.json              # Homepage (JSON sections template)
    ├── product.liquid          # Product Detail Page (PDP)
    ├── cart.liquid              # Cart page
    ├── page.liquid              # Generic page fallback
    ├── page.about.liquid        # About Us
    ├── page.series.liquid       # Full product catalog / Series page
    ├── page.byos.liquid         # Build Your Own Series (bundle builder)
    ├── page.checkout.liquid     # Custom checkout page
    ├── page.faqs.liquid         # FAQs
    ├── page.privacy.liquid      # Privacy Policy
    ├── page.returns.liquid      # Returns & Refunds
    └── page.terms.liquid        # Terms & Conditions
```

### Build Pipeline

A Python build script (`build-theme.py`) handles the static‑to‑Shopify conversion:

1. **Flattens images** from `Images/` subdirectories into `shopify-theme/assets/` (Shopify requires flat asset paths).
2. **Rewrites CSS paths** — converts `url('Images/Poster/desktop_banner.png')` → `url('desktop_banner.png')`.
3. **Packages ZIP** — creates `shopify-theme.zip` ready for Shopify Admin upload.

### Layout Architecture (`theme.liquid`)

The master layout includes these **global components** that persist across all pages:

| Component | Description |
| :--- | :--- |
| **Cursor Glow** | Custom lag‑compensated cursor follow effect (desktop only) |
| **Toast Notification** | Slide‑in confirmation for cart additions |
| **Cart Drawer** | Full slide‑out sidebar cart with shipping progress bar, item management & checkout link |
| **Announcement Bar** | Auto‑hiding ticker bar with key brand claims |
| **Header** | Navigation + logo + cart icon |
| **Footer** | Links, newsletter, social icons |

---

## 3. Completed Sections

### ✅ Global Components (in `layout/theme.liquid`)
- [x] SEO meta tags (title, description, Open Graph, Twitter Cards)
- [x] Font preloading (Satoshi, DM Serif Display, Inter)
- [x] CSS preloading with `onload` fallback
- [x] Favicon setup (settings‑based + fallback)
- [x] Dynamic product assets map (`window.ManSeriesAssets`)
- [x] Shopify native policy page styling (editorial layout)
- [x] Custom cursor glow element
- [x] Toast notification system
- [x] Cart drawer with shipping progress bar
- [x] Deferred JS loading (`app.js`)

### ✅ Homepage Sections
- [x] `announcement-bar.liquid` — Scrolling brand claims ticker
- [x] `header.liquid` — Logo + navigation + cart
- [x] `home-hero.liquid` — Full‑width hero banner with CTA
- [x] `home-catalog.liquid` — Product cards grid (3 products)
- [x] `home-reactor.liquid` — Canvas‑based Molecular Ingredient Reactor
- [x] `home-science.liquid` — Clinical actives / skin‑science section
- [x] `home-testimonials.liquid` — Customer reviews carousel (12 avatars)
- [x] `footer.liquid` — Links, newsletter signup, social icons

### ✅ Page Templates
- [x] `index.json` — Homepage (JSON sections template with section ordering)
- [x] `product.liquid` — Product Detail Page
- [x] `cart.liquid` — Cart page
- [x] `page.about.liquid` — About Us
- [x] `page.series.liquid` — Product catalog / Clinical Actives page
- [x] `page.byos.liquid` — Build Your Own Series (bundle builder with gift sleeve)
- [x] `page.checkout.liquid` — Custom checkout page
- [x] `page.faqs.liquid` — Frequently Asked Questions
- [x] `page.privacy.liquid` — Privacy Policy
- [x] `page.returns.liquid` — Returns & Refunds
- [x] `page.terms.liquid` — Terms & Conditions

### ✅ Assets
- [x] `style.css` — Master stylesheet (~5,585 lines) with full design system
- [x] `app.js` — Master JavaScript (~39 KB) with all interactive logic
- [x] All product images (transparent PNGs)
- [x] All testimonial avatars (12)
- [x] Hero banners (desktop + mobile variants)
- [x] Skin concern card images (4)
- [x] Brand logos (full + icon + favicon)

---

## 4. Pending Bugs & Known Issues

> [!NOTE]
> No explicit `TODO`, `FIXME`, or `BUG` comments exist in the codebase. The following are **inferred issues** based on code analysis:

| # | Severity | Area | Issue | Details |
| :---: | :--- | :--- | :--- | :--- |
| 1 | 🟡 Medium | `theme.liquid` | **CSS preload race condition** | `<link rel="preload" ... onload="this.rel='stylesheet'">` can cause a FOUC (Flash of Unstyled Content) if the JS `onload` handler fails. Needs an inline fallback `<style>` for critical above‑the‑fold CSS. |
| 2 | 🟡 Medium | `config/` | **Empty settings_data.json** | `settings_data.json` is essentially empty (`{}` or minimal). Theme settings customizer options may not have default values populated. |
| 3 | 🟡 Medium | `page.checkout.liquid` | **Custom checkout on Shopify** | Shopify does not allow custom checkout pages on non‑Plus plans. This template will only work if the store is on **Shopify Plus** or if it routes to a custom payment flow. |
| 4 | 🟢 Low | `assets/` | **Oversized product images** | Transparent PNGs are 2.5–3.9 MB each. Should be converted to WebP for faster load times. |
| 5 | 🟢 Low | `sections/` | **No `snippets/` directory** | Theme doesn't use Shopify snippets for reusable Liquid partials. Repeated markup in templates could be DRY‑ed up. |
| 6 | 🟢 Low | `templates/` | **No collection template** | Missing `collection.liquid` template — needed if the store uses Shopify collections for product browsing. |
| 7 | 🟢 Low | `templates/` | **No search template** | Missing `search.liquid` — Shopify's default search results page will use a generic layout. |
| 8 | 🟢 Low | `templates/` | **No 404 template** | Missing `404.liquid` — visitors hitting broken links will see Shopify's default 404 page instead of a branded one. |

---

## 5. Current Priorities

### 🔴 High Priority
1. **Optimize image assets** — Convert large PNGs (2–4 MB each) to WebP format. Add responsive `srcset` attributes for mobile/desktop variants.
2. **Populate `settings_schema.json`** — Define theme settings for colors, typography, section visibility, and content so the Shopify Theme Customizer is fully functional.
3. **Custom checkout compatibility** — Verify Shopify plan supports `page.checkout.liquid`, or implement redirect to Shopify's native `/checkout`.

### 🟡 Medium Priority
4. **Add missing templates** — Create `collection.liquid`, `search.liquid`, `404.liquid`, and `customers/` templates (login, register, account, order).
5. **Create `snippets/` directory** — Extract reusable Liquid components (product card, price display, icon SVGs) into snippets for DRY code.
6. **Critical CSS inlining** — Inline above‑the‑fold CSS in `<head>` to eliminate FOUC from the preload strategy.
7. **Accessibility audit** — Ensure all interactive elements have proper `aria-` labels, keyboard navigation, and focus states.

### 🟢 Low Priority
8. **Add `locales/` directory** — Create `en.default.json` for i18n support and Shopify translation features.
9. **Schema blocks for sections** — Add `{% schema %}` blocks with `settings` arrays to all sections so content is editable from Shopify Admin.
10. **Performance testing** — Run Lighthouse audit after deployment, target 90+ on all metrics.

---

## 6. Important Design Rules

### Color Palette — Anthropic‑Style Light Theme

```
┌─────────────────────────────────────────────────────────────┐
│                    MAN SERIES PALETTE                       │
├──────────────────┬──────────┬───────────────────────────────┤
│  Role            │  Hex     │  Usage                        │
├──────────────────┼──────────┼───────────────────────────────┤
│  Cream (BG)      │ #faf9f5  │  Page background              │
│  Warm White      │ #ffffff  │  Card backgrounds             │
│  Charcoal        │ #141413  │  Primary text, headings       │
│  Ink             │ #111111  │  Deep black accents           │
│  Sage            │ #9cb2a4  │  Primary brand accent         │
│  Sage Dark       │ #5a7363  │  Links, hover states          │
│  Sage Light      │ #edf3f0  │  Subtle backgrounds, tags     │
│  Muted           │ #b0aea5  │  Secondary text, captions     │
│  Border Warm     │ #eaeaea  │  Dividers, card borders       │
├──────────────────┼──────────┼───────────────────────────────┤
│  Facewash Accent │ #7cc09a  │  Facewash product color       │
│  Serum Accent    │ #89b5c0  │  Serum product color          │
│  Sunscreen Accent│ #ccab82  │  Sunscreen product color      │
└──────────────────┴──────────┴───────────────────────────────┘
```

> [!IMPORTANT]
> **Never use bright neon colors, harsh gradients, or dark mode.** The brand is built on warm, muted, clinical tones. Every color must feel like it belongs in a dermatologist's office — clean, trustworthy, premium.

### Typography System

| Role | Font | Weight | Usage |
| :--- | :--- | :--- | :--- |
| **Headings** | Satoshi | 500, 700, 900 | Section titles, product names, CTAs |
| **Display** | DM Serif Display | 400 (regular + italic) | Hero headlines, editorial pull‑quotes, policy page titles |
| **Body** | Inter | 300, 400, 500, 600 | Paragraphs, descriptions, UI labels, buttons |

**Font Sources:**
- Satoshi → [Fontshare](https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,900&display=swap)
- DM Serif Display + Inter → [Google Fonts](https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@300;400;500;600&display=swap)

### Typography Rules
- **ALL headings** use `sentence case` — never `ALL CAPS` or `Title Case`.
- **Letter‑spacing** on headings: `-0.5px` to `-1.5px` (tight, editorial feel).
- **Body line‑height**: `1.6` — generous for readability.
- **Font‑smoothing**: Always apply `-webkit-font-smoothing: antialiased`.

### Shadows & Depth

```css
--shadow-subtle: 0 2px 16px rgba(28, 25, 23, 0.03);   /* Resting state */
--shadow-hover:  0 20px 44px rgba(28, 25, 23, 0.08);   /* Hover/lift */
--shadow-glow:   0 6px 28px rgba(156, 178, 164, 0.12); /* Sage glow accent */
```

> [!TIP]
> Shadows should be **barely visible at rest** and **softly expand on hover**. Never use hard, dark box‑shadows. The aesthetic is "floating paper on a warm surface."

### Transitions & Animations

```css
--transition-smooth: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);     /* Smooth ease-out */
--transition-spring: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);  /* Spring bounce */
```

**Rules:**
- All hover transitions use `--transition-smooth` (500ms ease‑out).
- Interactive elements (buttons, cards) use `--transition-spring` for tactile bounce.
- Page load uses a subtle `scale(0.995) → scale(1)` fade‑in at 250ms.
- **Never use durations > 600ms** — they feel sluggish.
- Always respect `prefers-reduced-motion`.

### Micro‑Interaction Standards

| Interaction | Behavior |
| :--- | :--- |
| **Cursor Glow** | Lag‑compensated cursor follow on hoverable cards (desktop only) |
| **Haptic Feedback** | Short vibration on mobile cart additions (`navigator.vibrate`) |
| **Toast Notifications** | Slide‑in from top, auto‑dismiss after 3s |
| **Announcement Bar** | Sentence‑cased ticker, auto‑hides on scroll |
| **Card Hover** | Subtle lift (`translateY(-4px)`) + shadow expansion |
| **Button Hover** | Background color shift + slight scale (`1.02`) |

### Layout Principles

- **Max‑width**: Content containers should use consistent `max-width` (typically `1200px` or `1400px`).
- **Spacing**: Use generous whitespace — the brand breathes through negative space.
- **Mobile‑first**: All layouts start from `375px` and scale up.
- **Grid**: Use CSS Grid / Flexbox — no floats, no frameworks.
- **Background**: Always `var(--cream)` (#faf9f5) — never pure white `#fff` for page backgrounds.

### Security Standards

| Concern | Implementation |
| :--- | :--- |
| **DOM XSS Prevention** | All user inputs escaped via `escapeHTML()` before DOM insertion |
| **Secure Text Insertion** | Use `.textContent` instead of `.innerHTML` for user‑sourced values |
| **localStorage Safety** | Personalization badges from localStorage use `.textContent` to prevent injection |

### Image Guidelines

- **Product images**: Use transparent PNGs (or WebP with transparency) on warm cream backgrounds.
- **Banners**: Separate desktop (`desktop_banner.png`) and mobile (`mobile_banner.png`) variants.
- **Avatars**: AI‑generated, consistent style, circular crop, ~600px square.
- **Target formats**: Convert to WebP where possible; keep PNG only for transparency needs.
- **Naming**: Lowercase, underscores, descriptive (`transparent_facewash.png`, not `IMG_001.png`).

---

<p align="center">
  <strong>Man Series</strong> · Skin Minimalism · Since 2025<br>
  <em>Maximum Results, Minimum Efforts.</em>
</p>
