# Movic Audits — Frontend Guidelines

## 1. Purpose

This document defines the visual, interaction, UX, and frontend implementation standards for the Movic Audits website.

It is the primary frontend design reference for:

* Public website pages
* Reusable React components
* Administration interface
* Responsive layouts
* Typography
* Colors
* Buttons and forms
* Cards
* Navigation
* Images
* Icons
* Animations
* Accessibility
* Frontend states
* Visual consistency

The objective is to create a **professional, modern, brand-led Movic Audits website** that feels deliberately designed for the company.

The frontend must not look like a generic SaaS template, AI-generated website, or automatically assembled design system.

---

# 2. Design Philosophy

The Movic Audits frontend should communicate:

* Professionalism
* Creativity
* Reliability
* Modern media expertise
* Confidence
* Clarity
* Human craftsmanship
* Strong visual storytelling

The design should rely primarily on:

```text
Brand identity
     +
Typography (Manrope)
     +
Photography & Videography
     +
Strong layout
     +
Whitespace
     +
Content hierarchy
```

rather than decorative effects.

The interface should feel intentional and restrained.

---

# 3. Core Design Rule

## Brand First

The Movic Audits visual identity is the primary source of truth for the frontend experience.

The frontend should be built around the visual character of the brand rather than around generic web-design trends.

The visual language establishes the core visual relationship between:

* Deep Umber (`#513229`)
* Muted Slate / Ice Blue (`#A5BCD6`)
* Java Brown (`#231815`)
* Authoritative Typography (**Manrope**)
* Editorial, premium photography presentation

---

# 4. Brand Color System

The Movic Audits brand palette is built upon three foundational colors:

## 4.1 Primary Brand Color — Deep Umber (`#513229`)

The Deep Umber forms the primary brand color.

It is used for:

* Primary brand headers and hero title treatments
* Primary button backgrounds
* Brand navigation and footer surfaces
* Dark accent sections
* Solid contrast structural elements

---

## 4.2 Secondary / Accent Color — Muted Slate / Ice Blue (`#A5BCD6`)

The Muted Slate / Ice Blue serves as the primary accent and highlight color.

It is used for:

* Accent borders and subtle dividing rules
* Active navigation indicators and focus states
* Secondary button accents and badge highlights
* Hover feedback indicators
* Section detail tags and metadata indicators

The accent should remain restrained and intentional; it must never be applied as an overwhelming neon wash.

---

## 4.3 Third Brand Color — Java Brown (`#231815`)

Java Brown forms the deep grounding tone of the palette.

It is used for:

* Ultra-deep contrast containers
* Grounding editorial sections
* Deep surface backgrounds
* Footer base tone

---

# 5. Authoritative Typography — Manrope

**Manrope** is the sole authoritative typeface for the Movic Audits platform across both public and administrative interfaces.

* **Headings**: Manrope (Weights: 600 Semi-Bold, 700 Bold, 800 Extra-Bold). Letter-spacing: slightly tight (`-0.02em`) on display sizes.
* **Body Text**: Manrope (Weights: 400 Regular, 500 Medium). High legibility, balanced line height (`1.6`).
* **UI Controls**: Manrope (Weight: 600 Semi-Bold). Crisp, uppercase or title-cased labels with distinct character.

No other font family (including previous Outfit or Inter directions) may be used.

---

# 6. Color Usage Rules

Brand colors must be used intentionally.

Avoid turning the website into a chaotic multi-color showcase.

The palette must not:

* Use generic purple/blue AI gradients
* Use neon glowing effects or fuzzy drop-shadows
* Use excessive translucent glassmorphism cards
* Be combined with decorative sparkle or wand icons

The Deep Umber, Muted Slate, and Java Brown work harmoniously with clean functional neutrals.

---

# 6. UI Neutral Colors

UI neutrals are functional interface colors and are not considered Merit Media brand colors.

They may include:

* Page backgrounds
* Content surfaces
* Borders
* Dividers
* Muted text
* Form backgrounds
* Disabled states

White or near-white may be used as a functional interface color when appropriate.

It must not be described as part of the Merit Media logo palette.

---

# 7. Semantic Colors

Functional states may require additional colors.

Examples:

```text
Success
Warning
Error
Information
```

These colors should be:

* Clear
* Accessible
* Restrained
* Consistent

They should not compete with the Merit Media brand palette.

For example, an error message should be recognizable as an error without turning the entire interface bright red.

---

# 8. No AI-Style Visual Language

The Merit Media frontend must not use visual patterns associated with generic AI products or AI-generated website templates.

This is a strict project requirement.

## Prohibited

Do not use:

* AI icons
* Robot icons
* Sparkle/wand AI icons
* Brain/network AI symbols
* Generic AI assistant symbols
* "AI-powered" badges
* "Smart AI" labels
* AI-style feature labels
* AI-generated-looking decorative graphics
* AI SaaS dashboard aesthetics
* Futuristic AI interfaces
* Artificial glowing effects
* Neon UI
* Excessive blue/purple gradients
* Generic AI landing-page gradients
* Holographic effects
* Excessive floating elements
* Glassmorphism
* Frosted glass cards
* Translucent layered panels
* Unnecessary blur effects
* Excessive glow
* Decorative gradients without a brand or functional reason

The absence of AI-oriented design should apply to both:

* Public website
* Admin interface

---

# 9. No Glassmorphism

Glassmorphism should not be used as a design system.

Avoid:

```text
Backdrop blur
+
Translucent card
+
Glow
+
Gradient background
```

as a standard component pattern.

Content should normally sit on solid, clearly defined surfaces.

---

# 10. No Decorative Gradient System

Gradients should not become a defining part of the website.

In particular, avoid:

* Purple-to-blue gradients
* Blue-to-pink gradients
* Neon gradients
* Gold glow gradients
* AI-style mesh gradients
* Large gradient blobs
* Gradient backgrounds behind every section

If a gradient is ever introduced, it must have a specific design reason and remain consistent with the Merit Media brand.

The default should be solid colors and photography.

---

# 11. Typography

## Primary Font Family

The primary website typeface is:

# Manrope

Manrope should be used throughout the frontend unless a specific future brand requirement establishes another typeface.

It should be used for:

* Headings
* Body text
* Navigation
* Buttons
* Forms
* Labels
* Cards
* Tables
* Admin interface
* Notifications
* Metadata

---

# 12. Font Weights

The initial typography system should use:

| Weight | Usage                          |
| ------ | ------------------------------ |
| 400    | Body text                      |
| 500    | Supporting text and navigation |
| 600    | Buttons and secondary headings |
| 700    | Main headings                  |
| 800    | Major display headings         |

Not every weight should be used everywhere.

Typography should have clear hierarchy.

---

# 13. Typography Hierarchy

A typical hierarchy should follow:

```text
Display Heading
800

Page Heading
700–800

Section Heading
700

Subheading
600–700

Body
400

Supporting Text
400–500

Navigation
500–600

Button
600

Small Label
500
```

Exact font sizes should be defined through the Tailwind design system and responsive breakpoints.

---

# 14. Typography Style

Headings should be:

* Clear
* Confident
* Modern
* Readable
* Appropriately spaced

Avoid:

* Excessively oversized headings everywhere
* Decorative typography
* Excessive uppercase text
* Extremely tight letter spacing
* Excessive italic treatments
* Multiple competing typefaces

Typography should support the content rather than become a visual gimmick.

---

# 15. Logo Usage

The supplied Merit Media logo should be treated as an actual brand asset.

Do not recreate the logo using text.

Do not alter:

* Logo proportions
* Logo structure
* Brand mark
* Wordmark
* Relative spacing
* Brand colors

Do not:

* Stretch the logo
* Compress the logo
* Rotate the logo
* Add effects
* Add gradients
* Add shadows
* Add glow
* Place unnecessary decorations around it

The logo should have sufficient clear space.

---

# 16. Navigation

The main navigation should be:

* Clear
* Responsive
* Easy to understand
* Visually restrained
* Brand-consistent

Primary navigation should prioritize the most important public pages.

Potential structure:

```text
Home
About
Services
Portfolio
Blog
Contact
Booking
```

The exact ordering may be refined during implementation.

---

# 17. Navigation States

Navigation should clearly distinguish:

* Default
* Hover
* Active
* Focus
* Disabled where applicable

The active state may use the Merit Media gold accent.

Avoid:

* Glowing active states
* Animated gradient navigation
* Excessive pill backgrounds
* Floating glass navigation

---

# 18. Header

The header should provide strong brand recognition.

The design should prioritize:

1. Logo
2. Navigation
3. Primary action where appropriate

The header may be:

* Static
* Sticky
* Contextually sticky

depending on the final UX.

A sticky header should not consume excessive screen space.

---

# 19. Hero Sections

Hero sections should communicate the page purpose quickly.

A typical hero can contain:

* Strong heading
* Supporting text
* Primary action
* Secondary action where appropriate
* Relevant photography or visual content

The hero should not automatically use:

* Gradient backgrounds
* Glass cards
* Floating AI-style graphics
* Decorative glowing shapes

Photography and typography should do most of the visual work.

---

# 20. Photography

Photography is particularly important for a media company.

Images should be treated as major design elements rather than decoration.

Portfolio and project imagery should receive strong visual prominence.

Images should be:

* High quality
* Properly cropped
* Responsively served
* Appropriately compressed
* Given meaningful alternative text where required

Avoid unnecessary filters.

Do not apply generic AI-style color grading or effects to all images.

---

# 21. Image Presentation

Image presentation should vary according to content.

Possible patterns include:

* Editorial grids
* Featured image layouts
* Masonry-like arrangements where appropriate
* Standard aspect-ratio cards
* Full-width imagery
* Gallery layouts
* Image/text splits

The layout should serve the content.

Do not force every image into identical rounded cards.

---

# 22. Border Radius

Border radius should be restrained.

The site should not use extremely rounded cards or controls as a universal design language.

Avoid:

```text
Everything = rounded-full
```

Buttons, cards, images, and containers should use radius values appropriate to their function.

---

# 23. Cards

Cards should be used when they improve information grouping.

Examples:

* Service cards
* Portfolio cards
* Blog cards
* Testimonial cards
* Admin data cards

Cards should generally have:

* Clear hierarchy
* Appropriate spacing
* Strong typography
* Controlled borders/shadows
* Useful hover states where appropriate

Avoid turning every section into a collection of floating cards.

---

# 24. Shadows

Shadows should be subtle and functional.

Use them when they communicate:

* Elevation
* Separation
* Interaction
* Modal layering

Avoid:

* Large glowing shadows
* Neon shadows
* Excessive shadow depth
* Decorative shadow effects

---

# 25. Buttons

Buttons should be clear and purposeful.

Typical variants:

```text
Primary
Secondary
Outline
Text / Ghost
Destructive
```

The primary button may use the Merit Media brand accent where appropriate.

Buttons should have:

* Clear labels
* Accessible contrast
* Visible hover state
* Visible focus state
* Disabled state
* Loading state where applicable

Avoid overly decorative buttons.

---

# 26. Forms

Forms should feel professional and easy to use.

Inputs should provide:

* Clear labels
* Appropriate spacing
* Visible focus state
* Validation feedback
* Error messages
* Required-field indication where applicable

Do not rely solely on placeholder text as the field label.

---

# 27. Admin Interface

The admin interface is part of the same React application but should maintain the same underlying brand language.

It may be more functional and information-dense than the public website.

The admin should prioritize:

* Clarity
* Productivity
* Readability
* Efficient data management
* Consistent controls

It should not become a generic AI dashboard.

---

# 28. Admin Visual Language

The admin interface should use:

* Merit Media typography
* Brand accents
* Clear navigation
* Solid surfaces
* Structured tables
* Simple forms
* Consistent status indicators

Avoid:

* AI assistant panels
* AI-generated dashboards
* Decorative analytics graphics without purpose
* Excessive gradients
* Glass panels
* Glowing widgets

---

# 29. Icons

Icons should be functional and visually consistent.

Preferred characteristics:

* Simple
* Clear
* Professional
* Consistent stroke or filled style

Use icons to support meaning, not to decorate every piece of content.

Avoid:

* AI-specific icons
* Random icon styles
* Mixing 3D and flat icons
* Excessive emoji as interface icons

If an icon library is selected, it should be used consistently throughout the application.

---

# 30. Iconography

Icons should not replace clear text where the meaning could otherwise be ambiguous.

For example:

```text
[icon] Edit
```

is preferable to an unexplained icon when the action needs clarification.

Important admin actions should remain understandable without relying entirely on visual symbolism.

---

# 31. Animation

Animation should be subtle and purposeful.

Appropriate uses include:

* Navigation transitions
* Button feedback
* Image hover transitions
* Modal opening
* Dropdown transitions
* Page transitions where appropriate
* Loading states

Avoid animation simply because the interface can animate.

---

# 32. Animation Restrictions

Do not use:

* Excessive parallax
* Constant movement
* Floating decorative objects
* Pulsing decorative effects
* Glowing animations
* Neon transitions
* Excessive scroll-triggered animations
* Distracting background motion

The website should remain professional and content-focused.

---

# 33. Hover States

Hover states should communicate interaction.

Examples:

* Slight color change
* Border change
* Small image scale
* Underline
* Controlled shadow
* Gold accent

Avoid exaggerated hover effects.

---

# 34. Focus States

Keyboard focus must remain visible.

Do not remove browser focus indicators without replacing them with an accessible equivalent.

Focus styles should be consistent with the design system.

---

# 35. Responsive Design

The frontend must be designed for:

* Mobile
* Tablet
* Laptop
* Desktop
* Large desktop displays

Mobile is not an afterthought.

Components should adapt rather than simply shrink.

---

# 36. Mobile Navigation

Mobile navigation should be:

* Easy to open
* Easy to close
* Keyboard accessible
* Clearly structured
* Easy to understand

Avoid oversized menus that unnecessarily cover the entire screen unless required by the final UX.

---

# 37. Layout System

Layouts should use a consistent:

* Container width
* Grid system
* Spacing system
* Section rhythm
* Alignment system

The website should feel structurally consistent from page to page.

---

# 38. Whitespace

Whitespace is an important part of the Merit Media visual language.

Use enough space to:

* Separate sections
* Improve readability
* Establish hierarchy
* Give photography room
* Prevent visual clutter

Do not fill every available space with decorative content.

---

# 39. Section Design

Sections should have a clear purpose.

A section should normally answer:

* What is this?
* Why is it here?
* What should the visitor notice?
* What action should the visitor take?

Avoid adding sections simply because modern templates commonly contain them.

---

# 40. Content Hierarchy

Content should follow a clear hierarchy.

Typical structure:

```text
Section Label
      ↓
Heading
      ↓
Supporting Description
      ↓
Primary Content
      ↓
Action
```

The exact structure can vary depending on the page.

---

# 41. Services

Service presentation should emphasize:

* Service name
* Short explanation
* Relevant imagery
* Value/proposition where appropriate
* Call to action

Service pages should feel like genuine business content rather than generic feature cards.

---

# 42. Portfolio

Portfolio should be one of the strongest visual areas of the website.

The design should prioritize:

* Photography
* Project context
* Clear categorization
* Project titles
* Visual storytelling

Avoid excessive UI surrounding portfolio imagery.

The work itself should remain the focus.

---

# 43. Blog

Blog pages should prioritize readability.

Important considerations:

* Comfortable reading width
* Clear heading hierarchy
* Good line height
* Appropriate paragraph spacing
* Strong featured imagery
* Clear metadata
* Easy navigation

Avoid overly narrow or excessively decorative article layouts.

---

# 44. Testimonials

Testimonials should feel credible and human.

They may include:

* Client name
* Client image where available
* Testimonial content
* Relevant context

Avoid excessive carousel effects.

If a carousel is used, it must remain accessible and usable without motion.

---

# 45. Booking

The booking interface should feel professional and trustworthy.

The form should clearly communicate:

* What information is required
* Why the information is needed where useful
* What happens after submission

The submission experience should provide a clear success state.

---

# 46. Contact

The contact experience should remain simple.

Do not overload visitors with unnecessary fields.

Contact information should be easy to locate and understand.

---

# 47. Loading States

Loading states should be subtle.

Use:

* Skeletons
* Spinners
* Progress indicators
* Disabled controls

where appropriate.

Avoid elaborate animated loading screens.

---

# 48. Empty States

Empty states should clearly explain what is happening.

For example:

```text
No portfolio projects are currently available.
```

Admin empty states may provide a relevant action:

```text
No services have been added yet.

[Add Service]
```

---

# 49. Error States

Errors should be:

* Clear
* Human-readable
* Actionable where possible
* Visually distinguishable

Avoid exposing:

* Stack traces
* Database errors
* Internal implementation details
* Sensitive API information

---

# 50. Notifications

Notifications should be concise and useful.

Examples:

* Saved successfully
* Message sent
* Booking submitted
* Changes could not be saved
* Media uploaded successfully

Avoid excessive notification frequency.

---

# 51. Accessibility

Accessibility is a core frontend requirement.

The implementation should consider:

* Semantic HTML
* Keyboard navigation
* Screen readers
* Focus management
* Color contrast
* Form labels
* Alternative text
* Accessible dialogs
* Accessible menus
* Reduced motion
* Error announcements

---

# 52. Reduced Motion

Animations should respect users who prefer reduced motion.

Where appropriate, use:

```css
@media (prefers-reduced-motion: reduce)
```

to reduce or disable non-essential animation.

---

# 53. SEO-Friendly Frontend

Frontend implementation should support the SEO requirements documented in `SEO.md`.

Components and pages should provide:

* Correct headings
* Semantic HTML
* Descriptive links
* Image alt text
* Page metadata
* Canonical information where applicable
* Crawlable public routes

---

# 54. Performance

Frontend performance should prioritize:

* Optimized images
* Lazy loading where appropriate
* Efficient JavaScript
* Code splitting
* Minimal unnecessary dependencies
* Avoiding unnecessary re-renders
* Efficient API requests

Do not sacrifice performance for decorative effects.

---

# 55. Images and Assets

Images should be optimized before production use.

Where appropriate:

* Use modern image formats
* Provide responsive dimensions
* Avoid unnecessarily large source files
* Use lazy loading
* Provide meaningful alt text
* Avoid layout shifts

---

# 56. Component Architecture

The frontend should favor reusable components.

Suggested organization:

```text
src/
├── components/
│   ├── common/
│   ├── layout/
│   ├── forms/
│   ├── services/
│   ├── portfolio/
│   ├── blog/
│   ├── testimonials/
│   ├── booking/
│   └── admin/
├── layouts/
├── pages/
├── routes/
├── services/
├── hooks/
├── context/
├── types/
└── utils/
```

Components should have focused responsibilities.

---

# 57. Design Tokens

Core visual values should be centralized where practical.

Examples include:

```text
Brand colors
Typography
Spacing
Border radius
Shadows
Breakpoints
Transitions
```

Do not scatter arbitrary values throughout the application when a design token would provide better consistency.

---

# 58. Tailwind CSS

Tailwind CSS should implement the design system rather than become a collection of arbitrary utility combinations.

Brand values should be configured centrally.

For example:

```js
theme: {
  extend: {
    colors: {
      brand: {
        charcoal: "...",
        gold: "..."
      }
    }
  }
}
```

The exact values should be finalized from the approved Merit Media brand assets.

---

# 59. Avoiding Generic Template Design

The implementation should not blindly follow common website-template patterns.

Before adding a component or section, ask:

1. Does Merit Media actually need it?
2. Does it improve the user's experience?
3. Does it support the content?
4. Does it fit the brand?
5. Does it create unnecessary visual complexity?

If the answer is no, it should not be added simply because it is fashionable.

---

# 60. Human-Crafted Visual Direction

The frontend should communicate that it was intentionally designed for Merit Media.

This means:

* Real content should drive layouts.
* Real photography should drive visual sections.
* Typography should establish hierarchy.
* Brand colors should be used deliberately.
* Layout should have a clear purpose.
* Interactions should be restrained.
* Components should feel cohesive.

The site should not feel like a collection of generated design patterns.

---

# 61. Prohibited Branding Language

Unless explicitly required by a future business feature, the frontend should not introduce labels such as:

```text
AI Powered
AI Assistant
Smart AI
Powered by AI
AI Tools
AI Studio
Intelligent Platform
```

These are not part of the current Merit Media product positioning.

---

# 62. No Artificial Product Positioning

The website should not present Merit Media as:

* An AI platform
* An AI SaaS product
* An AI automation tool
* A futuristic AI company
* An AI startup

unless the actual business requirements explicitly change in the future.

The frontend represents the actual Merit Media business.

---

# 63. Public Website vs Admin

The public website should emphasize:

```text
Brand
Photography
Services
Portfolio
Content
Trust
Enquiries
```

The admin interface should emphasize:

```text
Efficiency
Clarity
Content management
Data management
Workflow
Security
```

Both should share the same fundamental visual identity.

---

# 64. Frontend Quality Checklist

Before considering a frontend feature complete:

### Brand

* [ ] Merit Media logo is used correctly.
* [ ] Brand charcoal is used consistently.
* [ ] Brand gold is used consistently.
* [ ] No unauthorized brand colors dominate the design.

### Typography

* [ ] Manrope is used consistently.
* [ ] Heading hierarchy is clear.
* [ ] Body text is readable.
* [ ] Font weights are intentional.

### Design

* [ ] Layout is clean.
* [ ] Whitespace is sufficient.
* [ ] Cards are not excessive.
* [ ] Border radius is restrained.
* [ ] Shadows are subtle.
* [ ] Photography/content remains prominent.

### AI-style restrictions

* [ ] No AI icons.
* [ ] No AI labels.
* [ ] No AI badges.
* [ ] No glassmorphism.
* [ ] No AI-style gradients.
* [ ] No neon/glowing effects.
* [ ] No generic AI dashboard styling.
* [ ] No unnecessary futuristic decoration.

### UX

* [ ] Navigation works.
* [ ] Forms are understandable.
* [ ] Loading states exist.
* [ ] Empty states exist.
* [ ] Error states exist.
* [ ] Success feedback exists.

### Responsive

* [ ] Mobile works.
* [ ] Tablet works.
* [ ] Desktop works.
* [ ] Images scale correctly.
* [ ] Navigation adapts correctly.

### Accessibility

* [ ] Keyboard navigation works.
* [ ] Focus states are visible.
* [ ] Forms have labels.
* [ ] Images have appropriate alt text.
* [ ] Contrast is sufficient.
* [ ] Motion can be reduced.

### Performance

* [ ] Images are optimized.
* [ ] Unnecessary dependencies are avoided.
* [ ] Large content is appropriately loaded.
* [ ] API requests are efficient.
* [ ] No unnecessary animation impacts performance.

---

# 65. Final Frontend Direction

The Merit Media frontend should be:

**Modern without being futuristic.**

**Professional without being generic.**

**Creative without being chaotic.**

**Minimal without being empty.**

**Brand-led without being overly decorative.**

**Visually strong without relying on effects.**

The primary visual foundation is:

```text
Merit Media Logo
       +
Charcoal
       +
Muted Gold
       +
Manrope
       +
Photography
       +
Strong Typography
       +
Editorial Layout
       +
Restrained Interaction
```

The final implementation should feel like a deliberate, professionally designed media-company website rather than a generic AI-generated interface.
