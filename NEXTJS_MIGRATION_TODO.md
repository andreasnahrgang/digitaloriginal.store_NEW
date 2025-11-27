# Next.js Migration Plan

## Current State Analysis
- **Framework**: Vite + React + TypeScript → **Next.js 14 (App Router)**
- **Routing**: React Router v7 → **Next.js App Router**
- **UI**: shadcn/ui + Tailwind CSS ✓ (Preserved)
- **Database**: Supabase ✓ (Preserved)
- **Structure**: src/ directory → **app/ directory**

## Migration Steps

### Phase 1: Project Analysis & Setup ✓ COMPLETED
- [x] 1.1 Analyze current Vite configuration
- [x] 1.2 Analyze package.json dependencies
- [x] 1.3 Analyze routing structure
- [x] 1.4 Create Next.js configuration files (next.config.mjs, .eslintrc.json)
- [x] 1.5 Update package.json for Next.js (scripts, dependencies)

### Phase 2: Directory Structure Migration ✓ COMPLETED
- [x] 2.1 Create app/ directory for App Router
- [x] 2.2 Create root layout.tsx with Header/Footer
- [x] 2.3 Migrate pages to app router structure:
  - [x] app/page.tsx (Home)
  - [x] app/marketplace/page.tsx
  - [x] app/nft/[id]/page.tsx (Dynamic route)
  - [x] app/about/page.tsx
  - [x] app/resources/page.tsx
  - [x] app/faq/page.tsx
  - [x] app/contact/page.tsx
- [x] 2.4 Components remain in src/components/
- [x] 2.5 Import paths use @ alias (preserved)

### Phase 3: Code Transformation ✓ COMPLETED
- [x] 3.1 Convert React Router to Next.js navigation
- [x] 3.2 Update all Link components (react-router-dom → next/link)
- [x] 3.3 Update useLocation → usePathname, useParams (next/navigation)
- [x] 3.4 Add 'use client' directives to client components
- [x] 3.5 Update environment variables (VITE_ → NEXT_PUBLIC_)

### Phase 4: Asset & Style Migration ✓ COMPLETED
- [x] 4.1 Public assets remain in public/
- [x] 4.2 CSS imports updated (src/index.css → @/index.css)
- [x] 4.3 Tailwind configuration preserved
- [x] 4.4 Image URLs preserved (external URLs)

### Phase 5: Build & Verification ⚠️ PENDING
- [ ] 5.1 Install Next.js dependencies (next, eslint-config-next)
- [ ] 5.2 Run next build
- [ ] 5.3 Fix any build errors
- [ ] 5.4 Test all pages
- [ ] 5.5 Verify routing
- [ ] 5.6 Test Supabase integration

## Migration Summary

### ✅ Completed Changes
1. **Configuration Files**
   - Created next.config.mjs with image optimization
   - Created .eslintrc.json for Next.js
   - Updated tsconfig.json for Next.js App Router
   - Updated .gitignore for Next.js build artifacts

2. **Package Configuration**
   - Updated scripts: dev, build, start, lint → Next.js commands
   - Added next@14.2.0 and eslint-config-next@14.2.0
   - Removed react-router and react-router-dom
   - Removed Vite-specific packages

3. **Routing Migration**
   - Converted from React Router to Next.js App Router
   - All 7 pages migrated to app/ directory structure
   - Dynamic route [id] for NFT details
   - File-based routing replaces routes.tsx

4. **Component Updates**
   - Header.tsx: Link → next/link, useLocation → usePathname
   - NFTCard.tsx: Link → next/link
   - All client components marked with 'use client'

5. **Environment Variables**
   - VITE_SUPABASE_URL → NEXT_PUBLIC_SUPABASE_URL
   - VITE_SUPABASE_ANON_KEY → NEXT_PUBLIC_SUPABASE_ANON_KEY
   - VITE_APP_ID → NEXT_PUBLIC_APP_ID
   - Updated src/db/supabase.ts to use process.env

6. **Cleanup**
   - Removed src/pages/ directory
   - Removed src/App.tsx, src/main.tsx, src/routes.tsx
   - Removed index.html (Next.js generates this)
   - Removed vite.config.ts and Vite tsconfig files

### ⚠️ Pending Tasks
- Next.js package installation (requires npm install)
- Build verification
- Runtime testing

## Notes
- Using App Router (modern Next.js 14 approach)
- All shadcn/ui components preserved
- Supabase integration maintained
- All existing functionality preserved
- @ path alias maintained for imports
