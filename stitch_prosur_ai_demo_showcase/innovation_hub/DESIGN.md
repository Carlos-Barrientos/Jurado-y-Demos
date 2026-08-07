---
name: Innovation Hub
colors:
  surface: '#f8f9fa'
  surface-dim: '#d9dadb'
  surface-bright: '#f8f9fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f5'
  surface-container: '#edeeef'
  surface-container-high: '#e7e8e9'
  surface-container-highest: '#e1e3e4'
  on-surface: '#191c1d'
  on-surface-variant: '#5c403f'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f2'
  outline: '#906f6e'
  outline-variant: '#e5bdbb'
  surface-tint: '#bf0229'
  primary: '#9e001f'
  on-primary: '#ffffff'
  primary-container: '#c8102e'
  on-primary-container: '#ffdad8'
  inverse-primary: '#ffb3b1'
  secondary: '#5b5f61'
  on-secondary: '#ffffff'
  secondary-container: '#e0e3e5'
  on-secondary-container: '#616567'
  tertiary: '#4d4c4c'
  on-tertiary: '#ffffff'
  tertiary-container: '#656464'
  on-tertiary-container: '#e4e1e1'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad8'
  primary-fixed-dim: '#ffb3b1'
  on-primary-fixed: '#410007'
  on-primary-fixed-variant: '#92001c'
  secondary-fixed: '#e0e3e5'
  secondary-fixed-dim: '#c4c7c9'
  on-secondary-fixed: '#191c1e'
  on-secondary-fixed-variant: '#444749'
  tertiary-fixed: '#e5e2e1'
  tertiary-fixed-dim: '#c8c6c5'
  on-tertiary-fixed: '#1c1b1b'
  on-tertiary-fixed-variant: '#474746'
  background: '#f8f9fa'
  on-background: '#191c1d'
  surface-variant: '#e1e3e4'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
  max-width: 1440px
---

## Brand & Style

This design system is engineered for a collaborative AI Demo Showcase, balancing the corporate heritage of the parent brand with an energetic, forward-looking tech aesthetic. The personality is **innovative, structured, and professional**, designed to foster engagement among diverse business units.

The visual style follows a **Modern Corporate** approach with a **Minimalist** foundation. It prioritizes clarity and whitespace to allow the video content and AI demonstrations to remain the focal point. The interface uses high-quality typography and subtle depth cues to create a sense of digital "craft" without overwhelming the user with decorative elements. 

The emotional goal is to evoke a sense of "Reliable Innovation"—where the established power of the parent group meets the agility of cutting-edge AI technology.

## Colors

The palette is anchored by the core brand colors: a deep, energetic **Prosur Red** and a sophisticated **Medium Gray**. 

- **Primary (Prosur Red):** Used for critical actions, highlights, and primary brand presence. It signifies energy and leadership.
- **Secondary (Gray):** Used for supporting text, borders, and secondary UI elements to provide a grounded, professional feel.
- **Surface & Background:** A sequence of very light grays and pure whites are used to define different functional areas (e.g., sidebar vs. main content) without using heavy lines.
- **Company Accents:** To differentiate the five business units, specific accent colors are utilized for subtle tagging, small indicators, or "owner" badges on video cards. These are secondary to the primary brand red.

## Typography

The typography uses **Hanken Grotesk** across all roles to maintain a unified, tech-forward, and highly legible appearance. It is a clean, sharp, and contemporary sans-serif that reflects professional precision.

- **Scale:** Headlines use a tight letter-spacing to feel impactful and modern. 
- **Hierarchy:** Strong weight contrast (Bold for titles, Regular for body) ensures that information-dense areas like comment sections or video descriptions remain scannable.
- **Labels:** Small labels and metadata (like "Views" or "Company Name") use a slightly heavier weight and increased letter-spacing to remain legible at small sizes.

## Layout & Spacing

The design system utilizes a **Fluid Grid** with a 12-column structure for desktop and a 4-column structure for mobile. 

- **Grid Model:** Elements align to a 4px baseline grid to ensure mathematical harmony.
- **Video Grid:** Showcase cards are typically displayed in a 3-column layout on desktop, reflowing to a single column on mobile.
- **Margins:** Large outer margins on desktop (48px) create a "gallery" feel, emphasizing the premium nature of the AI demos.
- **Density:** Spacing is generous around media elements (Video Cards) but tighter in utility areas (Comments, Settings) to maximize functional density where collaboration happens.

## Elevation & Depth

Visual hierarchy is established through **Tonal Layers** and **Ambient Shadows**. This approach creates a clean, tactile interface that feels structured without the "heaviness" of traditional skeuomorphism.

- **Level 0 (Background):** Solid `#F8F9FA`. Used for the main application canvas.
- **Level 1 (Cards/Containers):** Pure white background with a very soft, diffused shadow (0px 4px 20px rgba(0,0,0,0.05)) and a subtle 1px border in a light gray.
- **Level 2 (Hover/Active):** When a video card or button is interacted with, the shadow deepens and the element lifts slightly (y-offset increases) to provide immediate tactile feedback.
- **Separators:** Use thin, low-contrast lines (1px) rather than heavy shadows to divide content within a single container, such as individual comments in a thread.

## Shapes

The shape language is **Soft (0.25rem - 0.75rem)**. This provides a professional "tech" edge that is modern but approachable. 

- **Standard Elements:** Buttons and input fields use a 4px (0.25rem) radius.
- **Containers:** Large video cards and modals use 12px (0.75rem) to feel distinct from the background.
- **Media:** Video thumbnails within cards should match the container's top-radius for a seamless, integrated look.
- **Avatars:** User profiles always use a 100% circular (pill) shape to contrast against the predominantly rectangular UI.

## Components

### Video Cards
The primary content vehicle. Features a large thumbnail with a 16:9 aspect ratio, a title in `headline-md`, and a footer containing the participant's avatar and the specific Company Accent tag. Social stats (likes/views) are positioned in the bottom-right corner of the thumbnail with a semi-transparent dark background.

### Buttons
- **Primary:** Solid Prosur Red with white text. High-contrast and bold.
- **Secondary:** White background with a gray border and gray text.
- **Ghost/Social:** No background or border. Uses gray icons that turn Prosur Red on hover. Used for "Like" and "Share" actions.

### Participant Profiles
Small horizontal components used in lists. Includes a circular avatar (40px), the participant's name in `label-md`, and their company name in `label-sm` using the specific company accent color.

### Comment Section
Uses a nested layout. Top-level comments are separated by light borders. Replies are indented by 32px. Input fields for comments are full-width with a light gray fill that turns white on focus.

### Chips/Tags
Small, rounded-sm pills used for AI categories (e.g., "Generative," "Automation"). Use a light gray background with medium gray text to remain secondary to company accents.