# NFT Marketplace Requirements Document

## 1. Application Overview
**Application Name:** NFT Marketplace
\n**Application Description:** A minimalist NFT marketplace built on Next.js, enabling users to browse, purchase, and manage NFTs with seamless integration of ThirdWeb.com services, IPFS storage, and gallery partner support.

## 2. Core Features
\n### 2.1 Homepage
- Implement a carousel component from ui.shadcn.com displaying rotating NFTs from the marketplace
- Clicking on any carousel NFT redirects to the full marketplace view
- Navigation menu with the following items: About Us, Resources, FAQ, Contact

### 2.2 NFT Marketplace
- Display all available NFTs with maximum file size of 5MB per NFT
- Show NFT metadata including title, description, price, and creator information
- Present artist profiles and information alongside their NFTs
- Enable NFT browsing and purchasing functionality
\n**Featured NFT Artworks:**
\n1. **Robert Zielasco 1.jpg**
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
- **Framework:** Next.js\n- **UI Components:** ui.shadcn.com
- **Blockchain Services:** ThirdWeb.com (marketplace templates, authentication, NFT management)
- **Storage:** IPFS via ThirdWeb.com/ThirdWeb API, Pinata, Web3 Store
- **CMS:** Tina.io\n- **Database:** Supabase
- **Version Control:** GitHub
- **Deployment:** Vercel\n- **Development:** Localhost → GitHub → Vercel

## 4. Design Style
- **Logo:** Use the uploaded image'digital original - ryga-regular - türkis.png' as the application logo
- **Color Scheme:** Minimalist black and white palette with black background and white text throughout; cyan color (#00bcd4) extracted from the logo is used for borders, outlines, and component separations
- **Visual Aesthetic:** Minimalist avant-garde design language\n- **Layout:** Clean grid-based layout with ample whitespace, card-style NFT displays with cyan borders
- **Typography:** Modern sans-serif fonts with high contrast for readability
- **Component Style:** Flat design with subtle shadows, sharp edges, cyan-colored borders and dividers, consistent spacing between elements