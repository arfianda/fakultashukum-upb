---
name: Academic Juris
colors:
  surface: '#fcf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fcf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0eded'
  surface-container-high: '#eae7e7'
  surface-container-highest: '#e5e2e1'
  on-surface: '#1c1b1b'
  on-surface-variant: '#5a413d'
  inverse-surface: '#313030'
  inverse-on-surface: '#f3f0ef'
  outline: '#8e706c'
  outline-variant: '#e2bfb9'
  surface-tint: '#b22b1d'
  primary: '#570000'
  on-primary: '#ffffff'
  primary-container: '#800000'
  on-primary-container: '#ff8371'
  inverse-primary: '#ffb4a8'
  secondary: '#775a19'
  on-secondary: '#ffffff'
  secondary-container: '#fed488'
  on-secondary-container: '#785a1a'
  tertiary: '#00137f'
  on-tertiary: '#ffffff'
  tertiary-container: '#0021b9'
  on-tertiary-container: '#94a0ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad4'
  primary-fixed-dim: '#ffb4a8'
  on-primary-fixed: '#410000'
  on-primary-fixed-variant: '#8f0f07'
  secondary-fixed: '#ffdea5'
  secondary-fixed-dim: '#e9c176'
  on-secondary-fixed: '#261900'
  on-secondary-fixed-variant: '#5d4201'
  tertiary-fixed: '#dfe0ff'
  tertiary-fixed-dim: '#bcc2ff'
  on-tertiary-fixed: '#000c61'
  on-tertiary-fixed-variant: '#1830c2'
  background: '#fcf9f8'
  on-background: '#1c1b1b'
  surface-variant: '#e5e2e1'
  deep-maroon-dark: '#5A0000'
  surface-cream: '#F8F7F4'
  surface-paper: '#FFFFFF'
  border-subtle: '#E5E1DA'
  text-muted: '#5C5854'
  accent-gold-light: '#E8D8B0'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 56px
    fontWeight: '600'
    lineHeight: 64px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 38px
    fontWeight: '600'
    lineHeight: 46px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '500'
    lineHeight: 48px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 30px
    fontWeight: '500'
    lineHeight: 38px
  headline-md:
    fontFamily: Playfair Display
    fontSize: 28px
    fontWeight: '500'
    lineHeight: 36px
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 30px
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 30px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.08em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.1em
spacing:
  gutter: 2rem
  gutter-mobile: 1rem
  margin: 3rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
  space-2xl: 4rem
---

## Brand & Style

This design system embodies academic gravitas, judicial authority, and timeless institutional prestige. Engineered for leading legal institutions, scholarly journals, and elite law faculties, the system pairs classical editorial craftsmanship with sharp, contemporary digital ergonomics.

The visual style is **Modern Academic Editorial**: deliberate structure, quiet confidence, pristine typographic balance, and meticulous information architecture. It eliminates ephemeral UI trends in favor of disciplined hierarchy, structured hairline rules, architectural whitespace, and balanced editorial contrast. The interface establishes credibility, scholarship, and unwavering intellectual clarity.

## Colors

The palette balances historical collegiate richness with clean readability.

- **Primary (`#800000`)**: Deep Academic Maroon serves as the institutional mark, used for key actions, primary links, section anchors, and dominant brand indicators.
- **Secondary (`#C5A059`)**: Antique Bronze/Gold acts as a refined accent for metadata labels, honors tags, subtle indicators, and premium decorative borders.
- **Neutral (`#1A1A1A`)**: Dark Charcoal replaces absolute black to provide soft, high-contrast readability without digital glare across long-form scholarship.
- **Backgrounds**: Pure paper white (`#FFFFFF`) forms the active reading surface, framed by muted warm alabaster (`#F8F7F4`) for section contrast and structural grounding.
- **Borders & Dividers (`#E5E1DA`)**: Neutral warm stone hairlines anchor the grid and enforce order without heavy shadows.

## Typography

The type system pairs **Playfair Display**—an editorial serif possessing scholarly authority and refined proportion—with **Plus Jakarta Sans**—a clean, geometric humanist sans-serif optimized for dense legal text, administrative data, and interface elements.

- **Display & Headlines**: Always rendered in Playfair Display. Headlines require relaxed vertical tracking and disciplined line-heights to emulate high-end university press publications.
- **Editorial Proportions**: Long-form article and case briefs default to `body-lg` (18px) with a generous 30px line height to facilitate uninterrupted scholarly study.
- **Labels & Overlines**: Uppercase labels (citations, volume identifiers, academic divisions) use `label-md` or `label-sm` with letter spacing expanded to 0.08em–0.1em.

## Layout & Spacing

The layout philosophy uses a disciplined **12-column architectural grid** bounded by generous outer margins. Structure is communicated through alignment, proportional whitespace, and fine horizontal rules rather than boxed fills.

- **Breakpoints**: Mobile (under 768px), Tablet (768px–1024px), Desktop (1025px–1440px), Wide Institutional (1441px+).
- **Margins & Gutters**: Desktop interfaces use 48px (`3rem`) page margins with 32px (`2rem`) gutters. Mobile transitions to a responsive 4-column system with 20px (`1.25rem`) margins.
- **Content Max-Widths**: Reading containers for jurisprudence texts, faculty profiles, and law journals are constrained to a strict `720px` reading line to preserve visual rhythm and cadence.

## Elevation & Depth

This system avoids synthetic software shadows, glossy skeuomorphism, and float physics. Depth is conveyed strictly through **tonal layering and low-contrast borders**:

- **Surface Tiers**: Base canvas surfaces are rendered in `#F8F7F4`. Cards, dossier units, and reading panes rest on crisp `#FFFFFF` layers.
- **Linear Boundaries**: All component boundaries, dividers, and table headers use single-pixel hairlines (`1px solid #E5E1DA`).
- **Interactive Depth**: Hover and focus states do not lift cards into the Z-axis. Instead, they shift border colors subtly to `#C5A059` or `#800000`, paired with hairline left borders (2px to 3px) that evoke indexed book spines and archival folders.
- **Modals & Overlays**: Restrained backdrop scrim (`#1A1A1A` at 40% opacity) combined with an ultra-diffused, ambient shadow (`0 20px 40px rgba(26, 26, 26, 0.08)`).

## Shapes

The design system utilizes **sharp, architectural zero-radius geometries (`roundedness: 0`)**. 

Sharp corners reinforce the permanence of institutional stone, classical parchment, archival volumes, and formal legal documents. Every card, button, text input, menu panel, and metadata badge retains strict 90-degree corners. Visual softness is achieved entirely through typographic warmth and balanced margins, not rounded edges.

## Components

### Buttons
- **Primary**: Deep Maroon (`#800000`) background, crisp white text, sharp 0px radius, uppercase `label-md` tracking. Hover initiates a transition to Deep Maroon Dark (`#5A0000`).
- **Secondary / Institutional**: Transparent background with a 1px solid border (`#800000` or `#1A1A1A`), dark charcoal text. Hover fills the background with `#F8F7F4`.
- **Text / Editorial Action**: Raw text with an explicit 1px underline positioned 4px below the baseline; transitions to Antique Bronze (`#C5A059`) on hover.

### Chips & Taxonomy Badges
- Structural tags for legal categories, academic terms, and journal citations.
- Styled with a transparent background, 1px solid border in `#E5E1DA`, and 11px uppercase `label-sm` in `#5C5854`.
- Featured/Honors variants utilize a pale cream background (`#F8F7F4`) with Antique Bronze borders (`#C5A059`).

### Input Fields & Search
- Grounded rectangular fields with 1px border (`#E5E1DA`) over white backgrounds.
- Focus state shifts the border to 1px `#800000` with zero glow.
- Labels are positioned statically above the field in `label-md` styling for immediate accessibility and clarity.

### Lists & Directories
- Faculty directories, course listings, and case archives use horizontal hairline dividers (`1px solid #E5E1DA`).
- Items feature generous vertical padding (`space-lg`), prominent serif row titles, and aligned right-hand metadata. Hover states tint the row to `#F8F7F4`.

### Cards & Dossiers
- Built on `#FFFFFF` backgrounds bordered by a 1px `#E5E1DA` frame.
- Image containers maintain an editorial 3:2 or 4:5 aspect ratio without radius.
- Cards feature top accent lines in `#800000` or `#C5A059` (2px) to designate featured scholarship, event lectures, or press statements.

### Blockquotes & Case Citations
- Prominently set in Playfair Display italic (`headline-sm`).
- Anchored by a 2px solid left rule in Antique Bronze (`#C5A059`), padded with `space-md` on the left, with attribution in uppercase `label-md`.