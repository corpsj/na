# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Byunhwa (변화 變花)** is a Korean florist portfolio website showcasing floral work and one-day classes. The project emphasizes a chic, dark aesthetic with a modern noir design concept (black background with crimson red accents).

- **Client**: Male florist in his 20s targeting a hip, sophisticated audience
- **Instagram**: @bye.on.hwa
- **Tech Stack**: Next.js 15 (App Router), TypeScript, Tailwind CSS, Supabase (integration in progress)

## Development Commands

```bash
# Development
npm run dev          # Start dev server at localhost:3000

# Build & Production
npm run build        # Create production build
npm start            # Run production server

# Code Quality
npm run lint         # Run ESLint
```

## Architecture Overview

### App Router Structure

The project uses Next.js 15's App Router with two main sections:

**Public Pages** (`/app`):
- `/` - Home with hero section, featured work, class preview
- `/portfolio` - Filterable gallery by category (웨딩, 부케, 화환, 클래스작품, 기타)
- `/class` - Available classes listing
- `/class/[id]` - Individual class details with curriculum
- `/class/[id]/apply` - Class application form
- `/about` - Florist introduction and contact info
- `/contact` - Contact page

**Admin Section** (`/app/admin`):
- `/admin` - Login page (separate from admin layout)
- `/admin/dashboard` - Overview and analytics
- `/admin/portfolio` - Portfolio CRUD operations
- `/admin/class` - Class management with scheduling
- `/admin/settings` - Configuration

The admin section uses a dedicated layout (`app/admin/layout.tsx`) with sidebar navigation that is bypassed for the login page.

### Data Layer

**Current State**: The project is transitioning from mock data to Supabase:

- **Mock Data**: `data/classData.ts` contains hardcoded class information
- **Mock APIs**: Routes in `app/api/` use in-memory data (e.g., `orders/route.ts`)
- **Target State**: Supabase tables for `Portfolio` and `Classes` (see `PROJECT_PLAN.md` for schema)

**When working with data**:
- Check `data/` directory for existing mock data structures
- API routes are basic placeholders - Supabase integration pending
- Admin login currently uses hardcoded password (`admin1234`) in `app/api/admin/login/route.ts`

### Component Organization

```
components/
├── Header.tsx, Footer.tsx, Logo.tsx  # Shared layout components
├── FadeIn.tsx                         # Animation wrapper
├── PortfolioModal.tsx                 # Public portfolio viewer
└── admin/
    ├── ClassFormModal.tsx
    ├── OrderManagementModal.tsx
    ├── PortfolioFormModal.tsx
    └── ScheduleManagementModal.tsx
```

Modal components in `components/admin/` handle create/edit operations with built-in form state management.

## Key Patterns & Conventions

### Path Aliases
- `@/*` maps to project root (configured in `tsconfig.json`)
- Example: `import { cn } from "@/lib/utils"`

### Client vs Server Components
- Components with interactivity use `"use client"` directive
- Admin layout and modals are client components
- Page components are server components by default

### Styling System

**Design Tokens** (defined in `tailwind.config.ts` and CSS variables):
- Primary: Crimson Red (`#8B0000`) - brand accent, logo '花'
- Background: Obsidian Black (`#000000`) - main background
- Foreground: Stark White (`#FFFFFF`) - primary text, logo '變'
- Muted: Charcoal Gray (`#333333`) - cards, dividers

**Typography**:
- Serif font: Playfair Display (`font-serif`) - headings and emphasis
- Sans font: Inter (`font-sans`) - body text (default)

**Utility Helper**:
- Use `cn()` from `lib/utils.ts` for conditional className merging (clsx + tailwind-merge)

### Image Configuration

`next.config.js` allows images from:
- `images.unsplash.com` (currently used for placeholders)

When adding new image sources, update the `remotePatterns` array.

## Development Context

### Current Phase
The project is in **Phase 2-3** (see `PROJECT_PLAN.md`):
- Basic UI and routing complete
- Mock data in place
- Supabase integration incomplete

### Important Notes

1. **Mobile-First**: Design is optimized for mobile with responsive breakpoints
2. **Korean Language**: UI text is primarily in Korean; maintain this convention
3. **Image Quality**: High-priority for florist portfolio - use appropriate Next.js Image optimization
4. **Admin Auth**: Current password check is a placeholder; production auth should use Supabase
5. **Order Reference**: `order-form-ref/` directory contains reference implementation (not part of main app)

### Supabase Integration (Pending)

When implementing Supabase:
- Environment variables: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Schema definitions are in `PROJECT_PLAN.md` (lines 105-133)
- Create Supabase client in `lib/` directory following standard patterns
- Replace mock API routes with Supabase queries

### Design Guidelines

- Maintain dark, moody aesthetic (black background, high contrast)
- Use serif fonts for titles, sans for body text
- Crimson red for accents and hover states only
- Avoid over-engineering; keep implementations focused and simple
- Images should be high-quality and properly optimized with Next.js Image component

## Git Workflow

- Main branch: `main`
- Modified files in current session: `app/admin/portfolio/page.tsx`
- Recent focus: Admin UI optimization (modals, 2-column grids, mobile layouts)
