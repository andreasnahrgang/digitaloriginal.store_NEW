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
   - Artist: Robert Zielasco
   - Artist Bio: Robert Zielasco is an Austrian artist born in 1960 in Graz. He studied at the Academy of Fine Arts in Vienna and has been working as a freelance artist since 1985. His work encompasses painting, drawing, and mixed media, exploring themes of abstraction and materiality. For more information, visit: https://www.zielasco.at/page2013/artist.html

3. **Robert Zielasco 3.jpg**
   - Artist: Robert Zielasco
   - Artist Bio: Robert Zielasco is an Austrian artist born in 1960 in Graz. He studied at the Academy of Fine Arts in Vienna and has been working as a freelance artist since 1985. His work encompasses painting, drawing, and mixed media, exploring themes of abstraction and materiality. For more information, visit: https://www.zielasco.at/page2013/artist.html

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

## 4. Migration Plan: Vite to Next.js
\n### 4.1 Phase 1: Project Setup and Configuration
- Create new Next.js application using: `npx create-next-app@latest [project-name]`
- Review Next.js project structure: `app/` or `pages/` directory, `next.config.js`, `public/` folder
- Remove all Vite-specific configuration files (e.g., `vite.config.js`, `index.html`)
\n### 4.2 Phase 2: Component and Asset Migration
- Copy source code files from old `src/` directory to appropriate Next.js locations (`app/` or `components/` folders)
- Transfer all static assets (images, icons, fonts) from old `public/` to Next.js `public/` directory
- Install all necessary dependencies from old `package.json` using `npm install`

### 4.3 Phase 3: Structural and Routing Adaptation
- **Routing:** Convert to Next.js file-based routing by creating directory structure in `app/` (App Router) or `pages/` (Pages Router)
- **Entry Point:** Replace contents of `app/page.jsx` or `pages/index.js` with main landing page component
- **Image Component:** Replace standard `<img>` tags with Next.js `<Image>` component, adjusting `src`, `width`, `height` properties and configuring `next.config.js` for external domains
- **Styling:** Migrate CSS modules or global stylesheets; verify CSS-in-JS library compatibility with Next.js SSR

### 4.4 Phase 4: Build and Deployment Configuration
- Configure `next.config.js` for redirects, environment variables, or headers as needed
- Test build process locally using `npm run build` to identify compilation errors
- Connect new Next.js project repository to Vercel for automatic deployment

### 4.5 Phase 5: Testing and Validation
- Conduct thorough testing of all functionality: navigation, dynamic content, interactive features
- Verify design preservation across different browsers and device sizes
\n## 5. Design Style\n- **Logo:** Use the uploaded image'digital original - ryga-regular - türkis.png' as the application logo
- **Color Scheme:** Minimalist black background with white text; cyan accent color (#00bcd4) for borders, outlines, and component separations
- **Visual Aesthetic:** Minimalist avant-garde design language\n- **Layout:** Clean grid-based layout with ample whitespace, card-style NFT displays with cyan borders
- **Typography:** Modern sans-serif fonts with high contrast for readability
- **Component Style:** Flat design with subtle shadows, sharp edges, cyan-colored borders and dividers, consistent spacing between elements