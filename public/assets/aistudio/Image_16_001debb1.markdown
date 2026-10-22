---
name: Aether Luxury Configurator
colors:
  surface: '#121314'
  surface-dim: '#121314'
  surface-bright: '#39393a'
  surface-container-lowest: '#0d0e0f'
  surface-container-low: '#1b1c1d'
  surface-container: '#1f2021'
  surface-container-high: '#292a2b'
  surface-container-highest: '#343536'
  on-surface: '#e3e2e3'
  on-surface-variant: '#bac9cc'
  inverse-surface: '#e3e2e3'
  inverse-on-surface: '#303031'
  outline: '#849396'
  outline-variant: '#3b494c'
  surface-tint: '#00daf3'
  primary: '#c3f5ff'
  on-primary: '#00363d'
  primary-container: '#00e5ff'
  on-primary-container: '#00626e'
  inverse-primary: '#006875'
  secondary: '#efbe86'
  on-secondary: '#472a00'
  secondary-container: '#644215'
  on-secondary-container: '#dfb079'
  tertiary: '#e2eefe'
  on-tertiary: '#26323d'
  tertiary-container: '#c6d2e1'
  on-tertiary-container: '#4f5a67'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#9cf0ff'
  primary-fixed-dim: '#00daf3'
  on-primary-fixed: '#001f24'
  on-primary-fixed-variant: '#004f58'
  secondary-fixed: '#ffddb9'
  secondary-fixed-dim: '#efbe86'
  on-secondary-fixed: '#2b1700'
  on-secondary-fixed-variant: '#614013'
  tertiary-fixed: '#d8e4f3'
  tertiary-fixed-dim: '#bcc8d6'
  on-tertiary-fixed: '#111d27'
  on-tertiary-fixed-variant: '#3c4854'
  background: '#121314'
  on-background: '#e3e2e3'
  surface-variant: '#343536'
  surface-stage: '#08090A'
  surface-panel: '#121417'
  surface-subtle: '#1A1D21'
  border-hairline: '#262A30'
  text-primary: '#F5F5F5'
  text-muted: '#8A9099'
  accent-electric: '#00E5FF'
  luxury-nappa: '#B08552'
  matte-silver: '#D2D2D2'
typography:
  display-hero:
    fontFamily: Hanken Grotesk
    fontSize: 56px
    fontWeight: '300'
    lineHeight: 64px
    letterSpacing: -0.03em
  headline-xl:
    fontFamily: Hanken Grotesk
    fontSize: 36px
    fontWeight: '400'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 28px
    fontWeight: '500'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 20px
    fontWeight: '500'
    lineHeight: 28px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  label-numeric:
    fontFamily: Space Grotesk
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 24px
    letterSpacing: 0.02em
  label-caps:
    fontFamily: Space Grotesk
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.14em
  label-sm:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-panel: 1rem
  margin: 2.5rem
  margin-stage: 3.5rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system delivers an ultra-luxurious, progressive electric vehicle personalization experience for flagship SUV flagships. Rooted in pure minimalism, technological serenity, and Scandinavian-influenced modernism, the design language communicates quiet confidence, refined craftsmanship, and forward-looking intelligence.

The experience addresses discerning, design-literate buyers seeking effortless customization. The interface minimizes cognitive friction, treating the vehicle 3D staging as the hero while UI controls act as architectural, precision-engineered translucent overlays. 

The aesthetic is characterized by:
- Expansive, breathing negative space and strict typographic rhythm.
- Monochromatic balance: deep graphite, obsidian, subtle matte silver, and pure white.
- Ethereal cyan-blue accents representing electric performance and digital intelligence.
- Tactile glassmorphism layered with surgical hairline separators.

## Colors

The palette revolves around deep atmospheric tones, allowing physical vehicle materials and lighting to take center stage. 

- **Primary (`#00E5FF`)**: Electric cyan; used sparingly for active states, selected indicators, interactive hotspots, and autonomous driving visual tags.
- **Secondary (`#B08552`)**: Heritage cognac gold; reserved for luxury interior upholstery callouts, bespoke material badges, and executive package highlights.
- **Tertiary (`#8E9AA8`)**: Muted aero-silver; designates technical metadata, dimensional callouts, and secondary inactive icons.
- **Neutral (`#0C0D0E`)**: Obsidian black; sets the tone for deep cinematic viewport backgrounds and frosted interaction docks.
- **Surface Accents (`#F5F5F5` / `#D2D2D2`)**: High-fidelity chalk and aluminum for sharp typographic contrast and hairline precision borders.

## Typography

The typographic hierarchy combines the sculptural modernity of **Hanken Grotesk** with the technical precision of **Space Grotesk**.

- **Display & Headlines**: Generous tracking on uppercase category tags juxtaposed against tight, light-weight display values creates a tailored, architectural impression.
- **Data & Pricing**: Monospaced and technical numeric indicators utilize **Space Grotesk** to emphasize real-time computational accuracy for range calculations, pricing summaries, and powertrain statistics.
- **Editorial Legibility**: Line heights remain generous across configuration summaries to guarantee effortless scanning in darkened environments.

## Layout & Spacing

The configuration layout utilizes an asymmetrical split-stage philosophy optimized for wide desktop viewports:

- **Viewport Stage (Left / Main Canvas, 70-75% Width)**: Dedicated to dynamic 3D vehicle rendering, exterior/interior lighting toggles, camera perspective sweeps, and discrete hot-spot badges. Outer padding is anchored at `margin-stage` (3.5rem) to ensure interface chrome does not crowd vehicle contours.
- **Inspector Console (Right Floating Panel, 25-30% Width)**: A vertical, independently scrollable console anchored with fixed step progress and persistent sticky bottom checkout logic.
- **Floating Step Navigator (Top Center or Lateral Dock)**: Minimal, ultra-thin segmented rail highlighting the configuration pipeline (Trim, Exterior, Wheels, Cabin, Intelligence, Summary).
- **Rhythm**: Element distances inside selection clusters adhere strictly to `space-sm` and `space-md`, preserving compact efficiency while section groups separate via `space-xl`.

## Elevation & Depth

Visual hierarchy uses frosted glassmorphism, luminescent back-glows, and structural hairlines instead of traditional heavy dropshadows:

- **Base Canvas (`elevation-0`)**: Deep void `#08090A` featuring faint radial lighting directly below the car chassis.
- **Floating Panels & Trays (`elevation-1`)**: Background color `rgba(18, 20, 23, 0.72)` supported by a `24px` backdrop blur (`backdrop-filter: blur(24px)`) and a `1px` translucent border of `rgba(255, 255, 255, 0.08)`.
- **Selected Element Halo (`elevation-active`)**: No chunky shadow; replaced by an outer `1px` border of `#00E5FF` accompanied by a soft, diffused ambient aura: `0 0 16px rgba(0, 229, 255, 0.25)`.
- **Summary Drawer / Bottom Dock**: Floats 24px above bottom boundary with `backdrop-filter: blur(32px)` and upper hairline separator `rgba(255, 255, 255, 0.12)`.

## Shapes

The design system maintains a refined, architectural curvature with `roundedness: 1` (Soft).

- **Precision Corners**: Modest `4px` (`0.25rem`) radius on swatch buttons, cards, and interactive tiles conveys an engineered, aerospace-grade feel.
- **Pill Exceptions**: Exclusively reserved for step indicator badges, floating mode toggles (e.g., Exterior/Interior Switcher), and primary configuration confirmation buttons (`rounded-full`), balancing technical edge with ergonomic comfort.

## Components

### Swatches & Material Pickers
- **Exterior Paint Swatches**: Circular `40px` discs embedded with realistic metallic flakes or gloss shaders. Active state features a 2px outer gap followed by a 1.5px `#00E5FF` ring. Name and pricing increment display beneath in `label-sm`.
- **Interior Materials**: Rectangular tactile cards with macro texture previews (Nappa leather grain, open-pore wood).

### Step Progression Bar
- Horizontal step ribbon floating at top. Inactive stages display in muted silver `#8A9099`; active stage renders in `#F5F5F5` paired with an electric cyan pinpoint indicator line beneath.

### Option Cards (Wheels, Calipers, NOMI Packages)
- Built on `surface-panel` with a subtle `1px` hairline.
- Left-aligned option title and description; right-aligned pricing delta (`+¥12,000` in `label-numeric`).
- Selection transforms border to `#00E5FF` and displays a subtle active badge.

### Summary & Pricing Bar
- Sticky bottom dock spanning the inspector column.
- Left side highlights total price with dynamic counter animations (`display-hero` scale down to `headline-xl`) alongside battery subscription (BaaS) toggles.
- Primary CTA: High-contrast pure white pill button (`#F5F5F5`) with black text (`#0C0D0E`), shifting to cyan glow on hover.