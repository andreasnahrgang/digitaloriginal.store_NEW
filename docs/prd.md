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

### 2.3 Authentication & Management
- Integrate ThirdWeb.com services for user login and account management\n- Support multiple wallet connection options via ThirdWeb\n
### 2.4 NFT Upload & Storage
- Primary: Upload NFTs to IPFS via ThirdWeb.com or ThirdWeb API
- Backup services: Pinata and Web3 Store for redundant storage
- Store NFT metadata and artist information in Supabase database
- Use Tina.io as CMS for managing metadata, artist profiles, and website content

### 2.5 Gallery Partner Integration (Version 2)\n- Provide white-label marketplace components for gallery partners
- Enable partners to embed NFT sales functionality on their own websites
- Maintain centralized NFT inventory accessible across partner sites

## 3. Technical Stack
- **Framework:** Next.js
- **UI Components:** ui.shadcn.com
- **Blockchain Services:** ThirdWeb.com (marketplace templates, authentication, NFT management)
- **Storage:** IPFS via ThirdWeb.com/ThirdWeb API, Pinata, Web3 Store
- **CMS:** Tina.io
- **Database:** Supabase
- **Version Control:** GitHub
- **Deployment:** Vercel
- **Development:** Localhost → GitHub → Vercel

## 4. Design Style
- **Logo:** Use the uploaded image'digital original - ryga-regular - türkis.png' as the application logo
- **Color Scheme:** Minimalist black and white palette with black background and white text throughout; cyan color (#00bcd4) extracted from the logo is used for borders, outlines, and component separations
- **Visual Aesthetic:** Minimalist avant-garde design language
- **Layout:** Clean grid-based layout with ample whitespace, card-style NFT displays with cyan borders\n- **Typography:** Modern sans-serif fonts with high contrast for readability
- **Component Style:** Flat design with subtle shadows, sharp edges, cyan-colored borders and dividers, consistent spacing between elements