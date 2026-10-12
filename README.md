# Stark Studio

# Design System: Nothin'

## 1. Visual Theme & Atmosphere

Nothin’ presents itself like a creative manifesto translated into a website: stark, editorial, art-directed, and deliberately paradoxical. The visual system is mostly minimal in UI chrome but expressive in imagery, using glossy found-object photography, inflated forms, metallic textures, and cutout assets to create a surreal, contemporary studio feel.

- Overall feeling: Observed: bold, conceptual, fashion-editorial, and art-direction-led. Inferred: the brand wants to feel culturally fluent rather than corporate.
- Visual density: Observed: low UI density with high visual impact; lots of whitespace punctuated by dramatic images and oversized statements.
- Brand posture: Observed: confident, provocative, and idea-first. Messaging favors aphorisms and contradictions over explanatory marketing language.
- Signature motifs: Observed: black/white contrast, inflated and reflective objects, transparent-background cutouts, oversized type, and repeated/staggered text treatments.

### Key Characteristics

- Editorial minimalism with surreal object imagery
- Monochrome interface with occasional bright accent cues
- Oversized declarative typography
- Flat, contrast-led UI instead of shadow-heavy components

## 2. Color Palette & Roles

| Role | Semantic Name | Value | Usage |
| --- | --- | --- | --- |
| Primary action | Ink Black | #000000 | Observed in primary CTA fills and core high-contrast actions |
| Accent | Electric Blue | #0082F3 | Observed in branding metadata for links/accent emphasis; use sparingly |
| Surface | Paper White | #FFFFFF | Observed as the primary page background and secondary button surface |
| Text | Pure Black | #000000 | Observed as the dominant text color on light surfaces |
| Border | White Outline | #FFFFFF | Observed on pill CTA borders; especially useful over dark or image-heavy areas |

### Primary

- Observed: the core UI palette is overwhelmingly monochrome: Paper White #FFFFFF and Pure Black #000000.
- Observed in branding metadata: Electric Blue #0082F3, Sky Blue #3898EC, and Signal Yellow #FFFF00 exist as brand accents, but they are not the dominant interface colors on the provided page.

### Interactive

- Observed: primary CTAs invert the palette with black fill and white text in a pill shape.
- Inferred: where a focus or active accent is needed, Electric Blue #0082F3 is the safest reusable accent because it is the explicit link/accent color in branding data.

### Neutral Scale

- Paper White #FFFFFF: default canvas, open space, secondary button fill
- Pure Black #000000: text, strong contrast, primary action fill
- Inferred: the system uses very few intermediate neutrals; contrast is achieved by black/white and photography rather than gray-heavy UI layering

### Surface & Overlay

- Surface token: Paper White #FFFFFF is the primary site surface
- Overlay token: Inferred: transparent and image-led overlays are preferred over tinted UI overlays; photographic dark backdrops occasionally create local contrast zones

### Theme Modes

#### Light Mode

- Background: #FFFFFF
- Surface: #FFFFFF
- Text: #000000
- Accent: #0082F3
- Notes: Observed mode. This is the clearly evidenced presentation from Firecrawl branding and the provided page.

#### Dark Mode

- Background: Not evidenced as a full-site mode
- Surface: Not evidenced
- Text: Not evidenced
- Accent: If a dark implementation is needed, invert around #000000 / #FFFFFF and retain #0082F3 as accent
- Notes: Observed dark areas are contained within imagery and isolated UI inversions, not a confirmed dark theme mode.

### Shadows & Depth

- Observed: buttons use no shadow; contrast and silhouette create emphasis instead of elevation
- Observed: border/ring treatments matter more than shadow, especially on pill CTAs
- Inferred: focus treatment should be crisp and high-contrast, ideally a simple outline or ring rather than a soft glow

Evidence Notes:
- Firecrawl branding includes #3898EC, #0082F3, and #FFFF00. The provided page content, however, reads much more black/white in practice. Treat the bright colors as auxiliary accents unless more pages confirm broader usage.

## 3. Typography Rules

The typography system is built around strong scale contrast: very large, terse statements paired with small editorial metadata and compact body copy. The type does much of the branding work.

### Font Family

- Primary: Observed in font stacks: Ppneuemontreal, Arial, sans-serif. Inferred design intent: PP Neue Montreal is the preferred brand face, with Arial fallback.
- Monospace: IBM Plex Mono
- OpenType Features: Not evidenced

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| Hero headline | Ppneuemontreal, Arial, sans-serif | 96px | 400–500 (inferred) | Tight, about 0.95–1.05 (inferred) | Slightly tight to normal (inferred) | Observed large manifesto-style lines and oversized statements |
| Section heading | Ppneuemontreal, Arial, sans-serif | 48–96px (inferred from page structure) | 400–500 (inferred) | Tight (inferred) | Slightly tight (inferred) | Used for section-level declarations like “Most brands produce content. We prefer ideas.” |
| Body | Ppneuemontreal, Arial, sans-serif | 14.4px | 400 (inferred) | 1.4–1.6 (inferred) | Normal | Observed compact editorial paragraphs and descriptive copy |
| Label / Eyebrow | Ppneuemontreal or IBM Plex Mono | 14px | 400 (inferred) | 1.2–1.4 (inferred) | Normal to slightly wide (inferred) | Used for counters, location labels, parenthetical section markers, and small metadata |
| Caption / Meta | IBM Plex Mono or small grotesk | 14px | 400 (inferred) | 1.2–1.4 (inferred) | Normal | Suitable for utility text, social labels, years, and compact supporting information |

### Principles

- Observed: use large display copy as the primary brand expression, not decorative UI styling
- Observed: keep supporting text short and precise; paragraphs are brief and editorial rather than explanatory
- Inferred: preserve tension between tiny metadata and oversized statements to maintain the studio’s visual voice

## 4. Component Stylings

### Buttons and Links

- Primary CTA: Observed: black background (#000000), white text (#FFFFFF), white border (#FFFFFF), fully pill-shaped with 120px radius, no shadow
- Secondary CTA: Observed: white background (#FFFFFF), black text (#000000), white border (#FFFFFF), same 120px pill radius, no shadow
- Text links: Observed: links are short and understated in content. Branding metadata assigns #0082F3 for link color, but the page presentation feels mostly monochrome.
- Hover and active feel: Inferred: subtle inversion, opacity change, or underline/contrast shift fits best; avoid bouncy or glossy button effects

### Cards and Containers

- Surface style: Observed: project entries are primarily image-led and typography-led rather than boxed UI cards
- Radius: Observed token: 3px base radius; many media surfaces appear square or minimally rounded
- Border: Observed: minimal border usage outside CTA outlines
- Shadow or elevation: Observed: little to none
- Internal spacing: Inferred: generous spacing around project titles, descriptions, and image blocks; composition relies on breathing room

### Inputs and Interactive Controls

- Input treatment: Not directly observed on the provided page
- Focus behavior: Not directly observed; inferred best fit is a thin, high-contrast outline
- Selection states: Inferred: use inversion or outline contrast, not filled selection chips or heavy shadows

### Navigation

- Structure: Observed: simple top-level navigation with works, studio anchor, contact options, social links, and language switch
- Background treatment: Observed: light and visually minimal; likely transparent or white over the main canvas
- Link style: Observed: concise, editorial, and understated rather than obviously “buttonized”
- Sticky or scroll behavior: Not evidenced from the provided markdown

### Image Treatment

- Screenshot treatment: Observed: work thumbnails appear as crisp vignette images with clear framing
- Photography or illustration style: Observed: glossy, inflated, metallic, tactile, surreal object photography; often transparent-background cutouts or dark gradient scenes
- Border and radius treatment: Observed: minimal framing, very light radius at most, emphasis on clean edges and object silhouette

### Distinctive Components

- Observed: surreal object collage using reflective, balloon-like, foil, and plastic forms
- Observed: work-list modules combining title, one-line thesis, image vignette, and “explore” link
- Observed: experimental text treatments including repeated marquees, fragmented vertical lettering, and compressed word blocks

## 5. Layout Principles

### Spacing System

- Base unit: 4px
- Repeated spacing values: Inferred from the 4px base and the page rhythm: 8px, 12px, 16px, 24px, 32px, 48px, 64px, 96px

### Grid & Container

- Grid logic: Observed: editorial, asymmetrical composition rather than rigid application-shell layout
- Max content width: Not directly observed; inferred to be wide on desktop, with narrow text measures nested inside broader visual sections
- Section spacing: Observed/inferred: large vertical separation between major narrative sections, often in the 48px–96px+ range

### Whitespace Philosophy

- Whitespace philosophy: Observed: generous whitespace is a core brand device, used to make bold statements feel deliberate and premium
- Alignment tendencies: Observed: mostly left-aligned text with occasional stacked, vertical, or center-interrupted experimental layouts
- Content width behavior: Observed: short, narrow text blocks sit beside or between large visual moments; not every section fills the full width with content

### Border Radius Scale

- Micro: 3px
- Standard: 3px minimal rounding
- Large: Not directly observed; the system appears to favor either near-square forms or full pills
- Pill: 120px

## 6. Depth & Elevation

| Level | Treatment | Use |
| --- | --- | --- |
| Flat | Solid fill, no shadow, clean edges | Observed default treatment for most UI surfaces |
| Ring | Thin contrasting outline, especially white on dark or image zones | Observed on CTA buttons |
| Card | Defined by image block, whitespace, and typography rather than shadow | Observed in work modules |
| Focus | High-contrast outline or ring; no glow needed | Inferred for accessible implementation |

### Depth Principles

- Surface hierarchy: Observed: hierarchy comes from scale, position, and image contrast more than layered containers
- Shadow language: Observed: nearly absent; this system is intentionally flat
- Blur, glass, or overlay behavior: Observed/inferred: transparent PNG-style object layering and photographic contrast replace glassmorphism or blur-heavy UI
- When depth is used versus avoided: Observed: depth lives inside imagery and material textures, not in UI chrome

## 7. Do's and Don'ts

### Do

- Use a black-and-white foundation and let typography plus art-directed imagery carry the brand
- Keep headlines short, assertive, and concept-driven
- Use surreal, tactile, glossy object imagery to introduce emotional texture without cluttering the interface

### Don't

- Don’t add soft card shadows, neumorphism, or heavy layered UI
- Don’t fill the page with explanatory copy or dense product-style layouts
- Don’t introduce warm lifestyle palettes or overly polished corporate illustration styles that dilute the studio edge

## 8. Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
| --- | --- | --- |
| Mobile | ≤767px (inferred) | Large editorial layouts collapse to a single column; oversized text should scale down while preserving drama |
| Tablet | 768px–991px (inferred) | Collages and project modules simplify; navigation and social/meta links likely wrap into stacked groups |
| Desktop | ≥992px (inferred) | Full asymmetrical editorial composition, wide whitespace, and distributed image/text balance are preserved |

### Touch Targets

- Inferred: keep pill CTAs at comfortably tappable heights, ideally 44px or more
- Inferred: preserve clear spacing between text links, especially social and utility links grouped in headers/footers

### Collapsing Strategy

- Desktop behavior: Observed/inferred: distributed editorial layout with separated text, imagery, and utility metadata
- Tablet behavior: Inferred: reduce overlap and simplify image/text pairings while retaining large headings
- Mobile behavior: Inferred: stack sections vertically, keep copy narrow, and reduce the number of simultaneous decorative objects
- Breakpoint-driven component changes: Inferred: repeated marquees, vertical text, and scattered utility items should linearize into clearer reading order
- Touch target and spacing adjustments: Inferred: increase vertical spacing between small links and maintain roomy CTA padding

## 9. Agent Prompt Guide

### Quick Color Reference

- Primary CTA: #000000 background with #FFFFFF text
- Background: #FFFFFF
- Heading text: #000000
- Body text: #000000
- Border or ring: #FFFFFF on dark/image surfaces; otherwise use simple high-contrast outlines
- Accent: #0082F3

### Quick Summary

Nothin’ is a light-theme, editorial creative-studio site built on stark black/white contrast.  
Its identity comes from oversized manifesto-style typography, sparse UI, and surreal glossy object photography.  
Buttons are flat, fully pill-shaped, and high contrast with no shadow.  
Layouts feel asymmetrical and spacious, with lots of negative space and short, punchy copy blocks.  
Use PP Neue Montreal-style grotesk typography with IBM Plex Mono as supporting mono.  
Favor minimal containers, almost no shadows, and image-led storytelling over traditional boxed components.

### Example Component Prompts

- Hero: Build a white-background hero for a creative studio using oversized black display type, a short paradoxical headline, a black pill CTA with white text, and a cluster of surreal glossy cutout objects.
- Card: Create a project feature module with a large image vignette, a one-line conceptual description, a terse title, and a minimal “explore” link; no shadow, minimal border, generous whitespace.
- Navigation: Design a sparse top navigation with lowercase links, a language toggle, social links, and one strong pill CTA; keep the background white and the styling editorial.
- Button or badge: Make a fully pill-shaped CTA with 120px radius, black fill, white text, no shadow, and a clean outline-led hover state.

### Ready-to-Use Prompt

Design a landing page in the style of Nothin’: use a white canvas, black editorial typography, oversized manifesto headlines, minimal UI chrome, no shadows, pill CTAs, and surreal glossy cutout object imagery. Keep the layout spacious, asymmetrical, and art-direction-led.

### Iteration Guide

1. If the page starts feeling corporate, reduce UI decoration and make the headlines shorter and more declarative.
2. If the design feels flat in a bad way, add visual interest through imagery and composition, not through shadows or extra component styling.
3. Preserve monochrome discipline; introduce blue or yellow only as restrained accents, not as dominant surfaces.

## Optional Appendix: Interaction Patterns

- Scroll behavior: Not directly observed; inferred best fit is smooth editorial progression between visual chapters
- Hover behavior: Inferred: subtle contrast inversion, image emphasis, or underline/reveal behavior rather than dramatic motion
- Click behavior: Observed content suggests direct, low-friction actions like “book a call” and “explore”
- Animation tone: Inferred: refined, minimal, slightly experimental; avoid playful spring physics or heavy parallax

## Optional Appendix: Content & Messaging Patterns

- Headline pattern: Observed: paradoxical, manifesto-like, and concise; often framed as oppositions or perspective shifts
- CTA language: Observed: short and direct, e.g. “book a call,” “explore,” “Let’s chat”
- Trust signal pattern: Observed: named client/project list, named people, and selective capability listing instead of long proof blocks
- Voice and tone: Observed: confident, culturally aware, design-led, and slightly provocative

## Optional Appendix: Observed Pages

- Home (https://noth.in/): contributed the core black/white palette usage, pill CTA styling, editorial layout rhythm, object-photography direction, and manifesto-like messaging structure

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
