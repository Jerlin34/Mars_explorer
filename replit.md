# Mars Image Explorer Dashboard

## Overview

This is a React-based Mars Image Explorer Dashboard built for the NASA Space Apps Challenge "Embiggen Your Eyes!" project. The application displays and organizes 1,000 Mars Curiosity rover images across 24 classified surface feature categories, providing an interactive exploration interface with progressive detail loading and contextual overlays for scientific pattern discovery.

The mission timeline spans Sol 50 to Sol 3,047 (2,997 Martian days), with images captured by various rover cameras (MAHLI, Mastcam Right, Mastcam Left) and categorized into geological features, rover equipment, scientific instruments, and sample handling classes.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System:**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server for fast HMR (Hot Module Replacement)
- Client-side routing handled via state management (no router library)

**UI Component System:**
- shadcn/ui component library with Radix UI primitives for accessible, composable components
- Tailwind CSS for utility-first styling with custom design tokens
- Material Design principles adapted for scientific data visualization with NASA/Mars aesthetic overlay
- Dark mode as the primary theme with space-themed color palette

**State Management:**
- TanStack Query (React Query) for server state management and data fetching
- Local React state (useState) for UI interactions and view transitions
- No global state management library - component-level state preferred

**Design System:**
- Custom color palette: Deep space navy backgrounds, Mars red for CTAs, NASA blue for equipment, discovery green for instruments
- Typography: Inter for body/UI, Space Grotesk for headers, JetBrains Mono for technical data
- Class-based badge color system: Geological (Mars Red), Equipment (NASA Blue), Instruments (Discovery Green), Sample Handling (Science Purple)

**Key Interactive Features:**
- Class folder view with 24 interactive cards showing representative thumbnails and metadata
- Expandable full-screen gallery with masonry grid layout (responsive: 3-4 columns desktop, 1-2 mobile)
- Zoomable image viewer with progressive detail loading using react-zoom-pan-pinch
- Detail panel that slides in at high zoom levels showing comprehensive mission metadata
- Search and filter functionality for class exploration

### Backend Architecture

**Server Framework:**
- Express.js server with TypeScript
- Development mode: Vite middleware integration for HMR
- Production mode: Serves static built assets from dist/public

**API Design:**
- RESTful API endpoint: `/api/mars-data` serves the complete Mars dataset JSON
- Static file serving: `/images` route serves Mars rover images
- Minimal API surface - primarily acts as a static file server

**Data Layer:**
- Static JSON data source (`public/mars_data.json`) containing 1,000 image records with metadata
- No database operations in current implementation
- Image files stored in `public/images` directory

**Session Management (Placeholder):**
- Basic user schema defined in shared/schema.ts (username/password)
- In-memory storage implementation (MemStorage class)
- No active authentication flow implemented - infrastructure prepared for future use

### External Dependencies

**Database:**
- Drizzle ORM configured for PostgreSQL via `@neondatabase/serverless`
- Schema defined but not actively used (user table with id/username/password)
- Database configured to be provisioned via `DATABASE_URL` environment variable
- Migration support via drizzle-kit

**Third-Party UI Libraries:**
- Radix UI components (@radix-ui/*) for accessible primitives (dialogs, dropdowns, tooltips, etc.)
- Framer Motion for animations and transitions
- embla-carousel-react for potential carousel functionality
- react-zoom-pan-pinch for image zoom interactions

**Development Tools:**
- Replit-specific plugins for development experience (@replit/vite-plugin-*)
- TypeScript for type checking without emission (noEmit: true)
- esbuild for server bundling in production

**Data Source:**
- NASA JPL Mars Science Laboratory imagery dataset
- Static JSON manifest with 24 class descriptions and 1,000 image records
- Each image includes: coordinates, sol number, camera type, Mars local time, geolocation, elevation, target distance

**Font Loading:**
- Google Fonts: Architects Daughter, DM Sans, Fira Code, Geist Mono (configured in client/index.html)