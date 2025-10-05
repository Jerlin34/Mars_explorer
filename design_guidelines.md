# Mars Image Explorer Dashboard - Design Guidelines

## Design Approach
**System Foundation:** Material Design principles adapted for scientific data visualization with NASA/Mars aesthetic overlay
**Rationale:** Combines Material's strong patterns for information-dense interfaces with space exploration visual identity required for hackathon impact

---

## Core Design Elements

### A. Color Palette

**Dark Mode Base (Primary UI)**
- Background: 11 8% 10% (deep space navy #0B0E1A)
- Surface elevated: 220 13% 18% (#1F2937)
- Surface cards: 217 19% 12% (#141827)

**Mars Theme Colors**
- Mars Red Primary: 14 71% 58% (#CD5C5C) - CTAs, active states, primary actions
- Desert Orange: 28 75% 63% (#F4A460) - Geological class badges, secondary accents
- Rust Tertiary: 30 59% 53% (#DEB887) - Hover states, subtle highlights

**NASA Brand Colors**
- NASA Blue: 215 91% 31% (#0B3D91) - Equipment/rover class badges, links
- Space White: 0 0% 88% (#E0E0E0) - Primary text
- Discovery Green: 122 39% 49% (#4CAF50) - Success states, pattern indicators

**Functional Colors**
- Text primary: 0 0% 88%
- Text secondary: 0 0% 65%
- Text tertiary: 0 0% 50%
- Error: 0 84% 60%
- Warning: 38 92% 50%

**Class Badge Color System**
- Geological (ground, horizon, drill holes): 14 71% 58% (Mars Red)
- Equipment (turret, wheel, rover rear deck): 215 91% 31% (NASA Blue)
- Instruments (mastcam, apxs, mahli): 122 39% 49% (Discovery Green)
- Sample Handling (scoop, inlet, observation tray): 271 76% 53% (Science Purple #9C27B0)

---

### B. Typography

**Font Families**
- Primary (Body/UI): 'Inter' - Clean, technical, excellent for data display
- Secondary (Headers): 'Space Grotesk' - NASA-inspired, geometric aesthetic
- Monospace (Data/Codes): 'JetBrains Mono' - Sol numbers, coordinates, technical specs

**Type Scale**
- Hero/Page Title: 3rem (48px) Space Grotesk Bold
- Section Heading: 2rem (32px) Space Grotesk SemiBold
- Card Title: 1.25rem (20px) Inter SemiBold
- Body: 1rem (16px) Inter Regular
- Caption/Meta: 0.875rem (14px) Inter Medium
- Small/Labels: 0.75rem (12px) Inter Medium
- Technical Data: 0.875rem (14px) JetBrains Mono Regular

---

### C. Layout System

**Spacing Primitives**
Core spacing units: 2, 4, 8, 12, 16, 24 (Tailwind units: p-2, p-4, p-8, p-12, p-16, p-24)

**Container Strategy**
- Max-width wrapper: max-w-7xl (1280px)
- Content sections: px-4 md:px-8 lg:px-12
- Card padding: p-6 (internal content)
- Section vertical spacing: py-16 md:py-24

**Grid Layouts**
- Class Folder Grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6
- Image Gallery: masonry layout with gap-4 md:gap-6
- Stats Dashboard: grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4

**Responsive Breakpoints**
- Mobile: < 768px (1 column layouts)
- Tablet: 768px - 1024px (2 column layouts)
- Desktop: 1024px+ (3-4 column layouts)

---

### D. Component Library

**1. Class Folder Cards**
- Structure: Thumbnail (16:9 aspect ratio) + Badge + Title + Count + Description
- Background: Surface card color with subtle border (1px solid rgba(255,255,255,0.1))
- Hover: Scale transform (1.02) + subtle shadow + border glow in class color
- Badge: Top-right absolute positioned, rounded-full px-3 py-1, class-specific color
- Thumbnail overlay: Gradient from transparent to rgba(0,0,0,0.6) for text readability

**2. Image Gallery Cards**
- Masonry item with metadata overlay on hover
- Border: 2px solid transparent, hover: class-color border
- Metadata panel: Absolute bottom, backdrop-blur-md, bg-black/70, p-4
- Info density: Sol number prominent (text-lg), camera/coordinates secondary (text-sm)

**3. Progressive Zoom Overlays**

*Level 1 (Overview)*
- Hotspot markers: Pulsing dot (w-3 h-3) with label tooltip on hover
- Position: Absolute positioned SVG pins
- Animation: Gentle pulse (scale 1 to 1.1, 2s infinite)

*Level 2 (Section View)*
- Info panels: Semi-transparent cards (bg-black/80 backdrop-blur-lg) 
- Size: Max-w-xs, p-4, rounded-lg border border-white/20
- Position: Dynamically placed near focused region, arrow pointer
- Typography: Heading (text-sm font-semibold), body (text-xs text-gray-300)

*Level 3 (Detail View)*
- Side panel: Fixed right, w-96, h-full, bg-surface elevated, overflow-y-auto
- Sections: Collapsible accordions with specifications, scientific context, related images
- Action bar: Annotation tools sticky at top of panel

**4. Navigation & Controls**

*Top Bar*
- Height: h-16, backdrop-blur-xl bg-black/50, sticky top-0, z-50
- Logo: "Mars Explorer" with NASA meatball icon
- Search: Centered, max-w-xl, rounded-full bg-white/10 focus:bg-white/20
- Filter pills: Inline flex gap-2, rounded-full px-4 py-1.5 bg-white/10

*Breadcrumbs*
- Position: Below header, py-4
- Style: text-sm text-gray-400, separator: text-mars-red ">"

*Gallery Navigation*
- Back button: Fixed top-left, rounded-full p-3 bg-black/70 backdrop-blur-md
- Prev/Next: Fixed left/right center, icon buttons with hover scale

**5. Statistics Dashboard**
- Card structure: p-6 rounded-xl bg-surface-card border border-white/10
- Stat number: text-4xl font-bold text-mars-red
- Stat label: text-sm uppercase tracking-wide text-gray-400
- Divider: h-px bg-gradient-to-r from-transparent via-white/20 to-transparent

**6. Filter & Sort Controls**
- Dropdown select: Custom styled, rounded-lg bg-white/10 text-white
- Range slider: Mars-red track, thumb with glow effect
- Toggle switches: Mars-red active state
- Apply button: Primary CTA, Mars-red gradient, shadow-lg

---

### E. Animations

**Folder Expansion**
- Duration: 300ms
- Easing: cubic-bezier(0.4, 0, 0.2, 1)
- Transform: scale(0.95) to scale(1), opacity 0 to 1

**Zoom Overlays**
- Info panel fade-in: 200ms delay after zoom stabilizes
- Transform: translateY(8px) to translateY(0), opacity 0 to 1

**Hotspot Pulse**
- Animation: scale(1) to scale(1.15), opacity 0.7 to 1
- Duration: 2s infinite ease-in-out

**Detail Panel Slide**
- Transform: translateX(100%) to translateX(0)
- Duration: 250ms cubic-bezier(0.4, 0, 0.2, 1)

**Hover Interactions**
- Card hover: transform scale(1.02), duration 200ms
- Button hover: Mars-red glow shadow, duration 150ms

**Page Transitions**
- Gallery expand: Stagger children by 50ms for waterfall effect

---

### F. Imagery & Visual Assets

**No Hero Image** - This is a data-focused dashboard, not a marketing page

**Mars Rover Images**
- Display: Full aspect ratio preservation, object-fit: cover for thumbnails
- Loading: Skeleton shimmer in Mars-red color
- Placeholder: NASA logo watermark on gray background if image unavailable
- Zoom: Use transform: scale() for performance, not width/height changes

**Icons**
- Library: Heroicons (via CDN)
- Usage: Navigation (arrows, back), actions (zoom, download), status (check, warning)
- Size: w-5 h-5 for inline, w-6 h-6 for buttons, w-8 h-8 for prominent actions
- Color: Inherit from parent text color

---

### G. Accessibility & UX

**Keyboard Navigation**
- Tab order: Header search → Filter controls → Class folders → Footer
- Enter: Expand folder/zoom in
- Escape: Close gallery/zoom out/collapse panel
- Arrow keys: Navigate between images in gallery

**Focus States**
- Ring: ring-2 ring-mars-red ring-offset-2 ring-offset-background
- Visible: Always show focus ring on keyboard navigation

**Screen Reader Support**
- ARIA labels: Descriptive for all interactive elements
- Live regions: Announce zoom level changes, filter updates
- Alt text: Scientific description + Sol + class name for Mars images

**Contrast Ratios**
- Text on dark background: 4.5:1 minimum (WCAG AA)
- Interactive elements: 3:1 minimum
- Test: All Mars-red CTAs against dark background

---

### H. Performance & Technical

**Image Loading Strategy**
- Lazy load: Below the fold images
- Thumbnail size: 400x225px (16:9 optimized)
- Gallery size: 800x600px
- Full res: 1600x1200px (only on zoom level 3)
- Format: WebP with JPG fallback

**Animation Performance**
- Use transform/opacity only (GPU accelerated)
- Avoid animating width/height/margin
- Use will-change sparingly for zoom interactions

**Data Rendering**
- Virtualize: Gallery view if >100 images
- Pagination: 50 images per page load
- Cache: Store zoomed image data in session storage

---

### I. Specialized Components

**Zoom Interaction System**
- Level 1 trigger: Default state, hotspots visible
- Level 2 trigger: 2x-3x zoom (transform scale), show info panels
- Level 3 trigger: 4x+ zoom or dedicated "Deep Dive" button, open side panel
- Visual feedback: Cursor changes (zoom-in → grab → zoom-out), zoom level indicator

**Annotation Tools (Level 3)**
- Drawing mode: Click to add pin, drag to draw box
- Color picker: Mars-red, NASA-blue, Discovery-green options
- Save: Export as JSON with image coordinates
- Display: Semi-transparent overlays with connected labels

**Mission Timeline**
- Visual: Horizontal scrollable bar, Sol 50 to Sol 3,047
- Markers: Tick marks every 500 Sols
- Interactive: Click Sol range to filter images
- Current selection: Highlighted range in Mars-red

---

### J. Responsive Behavior

**Mobile (< 768px)**
- Single column folder grid
- Bottom sheet for filters (not sidebar)
- Touch-friendly: Minimum tap target 44x44px
- Zoom: Pinch-to-zoom gesture enabled
- Gallery: 1 column, full-width images

**Tablet (768px - 1024px)**
- 2 column folder grid
- Side drawer filters (swipe from left)
- 2 column masonry gallery
- Detail panel: Full-screen modal instead of sidebar

**Desktop (1024px+)**
- 3-4 column folder grid
- Persistent filter sidebar
- 3-4 column masonry gallery
- Side-by-side detail panel

This design system creates a professional, NASA-inspired scientific data exploration interface optimized for pattern discovery and progressive detail loading while maintaining visual appeal for hackathon judges.