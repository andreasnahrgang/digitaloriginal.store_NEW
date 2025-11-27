# NFT Marketplace Requirements Document

## 1. Application Overview
**Application Name:** NFT Marketplace
\n**Application Description:** A minimalist NFT marketplace built on Next.js, enabling users to browse, purchase, and manage NFTs with seamless integration of ThirdWeb.com services, IPFS storage, and gallery partner support.

## 2. Core Features

### 2.1 Homepage
- Implement a carousel component from ui.shadcn.com displaying rotating NFTs from the marketplace
- Clicking on any carousel NFT redirects to the full marketplace view
- Navigation menu with the following items: About Us, Resources, FAQ, Contact

### 2.2 NFT Marketplace
- Display all available NFTs with maximum file size of 5MB per NFT
- Show NFT metadata including title, description, price, and creator information
- Present artist profiles and information alongside their NFTs
- Enable NFT browsing and purchasing functionality
\n**Featured NFT Artworks:**
\n1. **Robert Zielasco1.jpg**
   - Artist: Robert Zielasco
   - Artist Bio: Robert Zielasco is an Austrian artist born in 1960in Graz. He studied at the Academy of Fine Arts in Vienna and has been working as a freelance artist since 1985. His work encompasses painting, drawing, and mixed media, exploring themes of abstraction and materiality. For more information, visit: https://www.zielasco.at/page2013/artist.html

2. **Robert Zielasco 2.jpg**
   - Artist: Robert Zielasco\n   - Artist Bio: Robert Zielasco is an Austrian artist born in 1960 in Graz. He studied at the Academy of Fine Arts in Vienna and has been working as a freelance artist since 1985. His work encompasses painting, drawing, and mixed media, exploring themes of abstraction and materiality. For more information, visit: https://www.zielasco.at/page2013/artist.html
\n3. **Robert Zielasco 3.jpg**
   - Artist: Robert Zielasco
   - Artist Bio: Robert Zielasco is an Austrian artist born in 1960 in Graz. He studied at the Academy of Fine Arts in Vienna and has been working as a freelance artist since 1985. His work encompasses painting, drawing, and mixed media, exploring themes of abstraction and materiality. For more information, visit: https://www.zielasco.at/page2013/artist.html\n
4. **public naked pushup1.JPG**
   - Artist: digitalgandhi
\n5. **public naked pushup2.JPG**
   - Artist: digitalgandhi\n
### 2.3 Authentication & Management
- Integrate ThirdWeb.com services for user login and account management
- Support multiple wallet connection options via ThirdWeb\n\n### 2.4 NFT Upload & Storage
- Primary: Upload NFTs to IPFS via ThirdWeb.com or ThirdWeb API
- Backup services: Pinata and Web3 Store for redundant storage
- Store NFT metadata and artist information in Supabase database
- Use Tina.io as CMS for managing metadata, artist profiles, and website content

### 2.5 Gallery Partner Integration (Version 2)\n- Provide white-label marketplace components for gallery partners
- Enable partners to embed NFT sales functionality on their own websites
- Maintain centralized NFT inventory accessible across partner sites

## 3. Technical Stack
- **Framework:** Next.js (mandatory - using App Router or Pages Router)
- **UI Components:** ui.shadcn.com\n- **Blockchain Services:** ThirdWeb.com (marketplace templates, authentication, NFT management)
- **Storage:** IPFS via ThirdWeb.com/ThirdWeb API, Pinata, Web3 Store
- **CMS:** Tina.io\n- **Database:** Supabase
- **Version Control:** GitHub\n- **Deployment:** Vercel\n- **Development:** Localhost → GitHub → Vercel

## 4. Vite to Next.js Migration Guide

### 4.1 Phase 1: Project Structure & Configuration Analysis

**Step 1.1: Analyze Existing Vite Project**
- Review the current Vite project structure, identifying root directory, source folders (typically `src/`), and public asset locations
- Confirm project type (React with TypeScript/JavaScript)\n- Document all custom configurations in `vite.config.js/ts`

**Step 1.2: Dependency Review**
- Open `package.json` and list all dependencies and devDependencies
- Identify Vite-specific plugins (e.g., `@vitejs/plugin-react`) that need Next.js equivalents
- Note any build scripts that require modification

**Step 1.3: Configuration Mapping**
- Map Vite configuration settings to Next.js `next.config.js` equivalents:\n  - Base URL → `basePath` in next.config.js
  - Proxy settings → `rewrites` or `redirects` in next.config.js
  - Environment variables → Next.js environment variable conventions
  - Build output directory → Next.js default `.next` directory

### 4.2 Phase 2: Core Framework Migration

**Step 2.1: Initialize Next.js Project**
- Create new Next.js application:\n  ```bash
  npx create-next-app@latest nft-marketplace-nextjs
  ```
- Select configuration options:\n  - TypeScript: Yes (if original project uses TypeScript)
  - ESLint: Yes\n  - Tailwind CSS: Yes (if used in original project)
  - App Router: Yes (recommended for new projects)
\n**Step 2.2: Migrate Dependencies**
- Copy all non-Vite-specific dependencies from old `package.json` to new project
- Install dependencies:
  ```bash
  npm install
  ```
- Install Next.js-specific packages:
  ```bash
  npm install next-themes (if dark mode is needed)
  ```
\n**Step 2.3: Remove Vite Configuration**
- Delete `vite.config.js/ts` from the project\n- Remove `index.html` (Next.js handles HTML generation)
- Remove Vite-specific scripts from `package.json`

### 4.3 Phase 3: Source Code Transformation

**Step 3.1: Directory Structure Migration**
- Move source code from `src/` to Next.js structure:\n  - Components → `app/components/` or `components/`
  - Pages/Routes → `app/` directory (for App Router)
  - Utilities → `lib/` or `utils/`
  - Hooks → `hooks/`
  - Styles → `app/globals.css` or `styles/`
\n**Step 3.2: Entry Point Conversion**
- Replace Vite entry point (typically `src/main.jsx` or `src/main.tsx`) content
- Move main app component logic to `app/page.jsx` or `app/page.tsx`
- Create `app/layout.jsx` for root layout:\n  ```jsx
  export default function RootLayout({ children }) {
    return (
      <html lang='en'>
        <body>{children}</body>
      </html>
    )
  }
  ```

**Step 3.3: Update Import Paths**
- Update all relative import paths to reflect new directory structure
- Replace any Vite-specific imports (e.g., `import.meta.env`) with Next.js equivalents (`process.env`)

### 4.4 Phase 4: Routing Migration

**Step 4.1: Convert Client-Side Routing**
- Remove `react-router-dom` dependency (if used)
- Convert route components to Next.js file-based routing:\n  - `/about` → `app/about/page.jsx`
  - `/marketplace` → `app/marketplace/page.jsx`
  - `/nft/[id]` → `app/nft/[id]/page.jsx` (dynamic routes)
\n**Step 4.2: Update Navigation Components**
- Replace `<Link>` from react-router-dom with Next.js `<Link>`:\n  ```jsx
  import Link from 'next/link'\n  <Link href='/marketplace'>Marketplace</Link>
  ```
- Replace `useNavigate()` with `useRouter()` from `next/navigation`:\n  ```jsx
  import { useRouter } from 'next/navigation'
  const router = useRouter()
  router.push('/marketplace')
  ```

**Step 4.3: Create Route Files**
- Create `page.jsx`, `layout.jsx`, `loading.jsx`, and `error.jsx` files as needed for each route
- Implement proper metadata exports for SEO:\n  ```jsx
  export const metadata = {
    title: 'NFT Marketplace',\n    description: 'Browse and purchase NFTs'\n  }
  ```\n
### 4.5 Phase 5: Build & Asset Handling

**Step 5.1: Migrate Static Assets**
- Move all files from old `public/` directory to Next.js `public/` directory
- Ensure asset paths are updated (Next.js serves public assets from root `/`)

**Step 5.2: Image Optimization**
- Replace standard `<img>` tags with Next.js `<Image>` component:\n  ```jsx
  import Image from 'next/image'\n  <Image src='/logo.png' alt='Logo' width={200} height={100} />
  ```
- Configure `next.config.js` for external image domains:
  ```javascript
  module.exports = {
    images: {
      domains: ['example.com', 'ipfs.io'],
    },
  }
  ```

**Step 5.3: CSS Migration**
- Move global CSS to `app/globals.css`
- Import global CSS in `app/layout.jsx`
- Convert CSS modules: rename files to `*.module.css` and update imports
- Verify CSS-in-JS library compatibility (styled-components, emotion) with Next.js SSR

### 4.6 Phase 6: Environment & API Configuration

**Step 6.1: Environment Variables**\n- Create `.env.local` file in Next.js project root
- Migrate environment variables:\n  - `VITE_API_URL` → `NEXT_PUBLIC_API_URL` (for client-side access)
  - Server-only variables → no `NEXT_PUBLIC_` prefix
- Update all references in code to use `process.env.NEXT_PUBLIC_*`

**Step 6.2: API Routes (if needed)**
- Create API routes in `app/api/` directory
- Example: `app/api/nfts/route.js` for NFT data endpoints
\n**Step 6.3: Proxy Configuration**
- If Vite proxy was used, migrate to `next.config.js`:\n  ```javascript
  module.exports = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'https://api.example.com/:path*',
        },
      ]
    },
  }
  ```

### 4.7 Phase 7: Build and Verification

**Step 7.1: Build Process**
- Run Next.js build command:
  ```bash
  npm run build\n  ```
- Review build output for errors, warnings, or optimization suggestions
- Address any compilation issues related to:\n  - Server/client component boundaries
  - Import path errors
  - Missing dependencies

**Step 7.2: Development Testing**
- Start development server:
  ```bash
  npm run dev
  ```
- Test all application features:
  - Homepage carousel functionality
  - Navigation between pages
  - NFT browsing and display
  - Wallet connection via ThirdWeb
  - Image loading and optimization
\n**Step 7.3: Cross-Browser & Responsive Testing**
- Verify design consistency across browsers (Chrome, Firefox, Safari, Edge)\n- Test responsive behavior on different device sizes
- Validate that all styles render correctly
- Ensure client-side navigation functions smoothly

**Step 7.4: Performance Verification**
- Run Lighthouse audit to check performance metrics
- Verify image optimization is working\n- Check for any console errors or warnings

### 4.8 Phase 8: Deployment\n
**Step 8.1: GitHub Integration**
- Push migrated Next.js project to GitHub repository
- Ensure `.gitignore` includes `.next/`, `node_modules/`, and `.env.local`
\n**Step 8.2: Vercel Deployment**
- Connect GitHub repository to Vercel
- Configure environment variables in Vercel dashboard
- Deploy and verify production build
- Test all functionality in production environment

## 5. Design Style\n- **Logo:** Use the uploaded image'digital original - ryga-regular - türkis.png' as the application logo
- **Color Scheme:** Minimalist black background (#000000) with white text (#FFFFFF); cyan accent color (#00bcd4) for interactive elements and visual separation
- **Layout:** Grid-based layout with generous whitespace, card-style NFT displays featuring cyan borders\n- **Typography:** Clean sans-serif font family with high contrast for optimal readability
- **Component Style:** Flat design with subtle drop shadows, sharp geometric edges, cyan-colored borders and dividers throughout the interface