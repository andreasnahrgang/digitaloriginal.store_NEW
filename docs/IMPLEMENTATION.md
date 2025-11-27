# NFT Marketplace Implementation Guide

## Overview

This is a minimalist NFT marketplace built with React, TypeScript, Tailwind CSS, and Supabase. The application features a clean black and white design with cyan (#00bcd4) accents, providing an elegant platform for discovering, browsing, and managing digital art NFTs.

## Technology Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI component library
- **React Router** - Navigation
- **Lucide React** - Icons

### Backend & Database
- **Supabase** - Backend as a Service
  - PostgreSQL database
  - Storage for NFT images
  - Real-time capabilities
- **ThirdWeb** - Blockchain integration (requires setup)
- **IPFS** - Decentralized storage (requires setup)

## Features Implemented

### 1. Homepage
- Hero section with logo and call-to-action
- Featured NFT carousel with 6 rotating items
- Feature highlights section
- Responsive design

### 2. Marketplace
- Grid display of all available NFTs
- Search functionality (title, description, artist)
- NFT cards with image, title, artist, and price
- Click to view details

### 3. NFT Detail Page
- Full-size NFT image
- Complete metadata display
- Artist information with profile
- Price and purchase button
- Blockchain details (token ID, contract, IPFS)

### 4. Artist Profiles
- Artist information embedded in NFT cards
- Profile images and bios
- Wallet addresses

### 5. Information Pages
- **About Us** - Mission, vision, and technology
- **Resources** - Documentation and guides
- **FAQ** - Comprehensive Q&A sections
- **Contact** - Contact form and information

### 6. Navigation
- Responsive header with logo
- Desktop navigation menu
- Mobile hamburger menu
- Wallet connect button
- Footer with links

## Database Schema

### Artists Table
```sql
- id (uuid, primary key)
- name (text, required)
- bio (text)
- profile_image (text)
- wallet_address (text, unique)
- website (text)
- social_links (jsonb)
- created_at (timestamptz)
- updated_at (timestamptz)
```

### NFTs Table
```sql
- id (uuid, primary key)
- title (text, required)
- description (text)
- artist_id (uuid, foreign key)
- image_url (text, required)
- ipfs_hash (text)
- price (numeric)
- token_id (text)
- contract_address (text)
- is_listed (boolean)
- metadata (jsonb)
- file_size (integer)
- created_at (timestamptz)
- updated_at (timestamptz)
```

### Storage Bucket
- **Name**: `app-7uja2c23lczl_nft_images`
- **Max File Size**: 5MB
- **Public Access**: Yes

## Design System

### Color Palette
- **Background**: Black (#000000 / HSL: 0 0% 0%)
- **Foreground**: White (#FFFFFF / HSL: 0 0% 100%)
- **Primary/Accent**: Cyan (#00BCD4 / HSL: 187 100% 42%)
- **Secondary**: Dark Gray (HSL: 0 0% 15%)
- **Muted**: Light Gray (HSL: 0 0% 96% light / 0 0% 15% dark)

### Typography
- Modern sans-serif fonts
- High contrast for readability
- Responsive font sizes

### Components
- Card-based layouts with cyan borders
- Hover effects with cyan shadows
- Smooth transitions
- Consistent spacing

## API Functions

### NFT API (`src/db/api.ts`)
- `getAllNFTs()` - Fetch all listed NFTs with artist data
- `getNFTById(id)` - Fetch single NFT with artist data
- `getFeaturedNFTs(limit)` - Fetch featured NFTs for homepage
- `getNFTsByArtist(artistId)` - Fetch NFTs by specific artist
- `createNFT(nft)` - Create new NFT listing
- `updateNFT(id, updates)` - Update NFT information
- `deleteNFT(id)` - Remove NFT listing

### Artist API
- `getAllArtists()` - Fetch all artists
- `getArtistById(id)` - Fetch single artist
- `createArtist(artist)` - Create new artist profile
- `updateArtist(id, updates)` - Update artist information

## Sample Data

The database includes sample data for demonstration:
- 3 artists with profiles
- 6 NFTs with images, descriptions, and pricing
- All NFTs are listed and available for browsing

**Note**: Sample data has been added for demonstration purposes. You can delete this data through the Supabase dashboard if needed.

## Integration Requirements

### ThirdWeb Setup (Not Yet Implemented)
To enable full blockchain functionality:

1. Install ThirdWeb SDK:
```bash
npm install @thirdweb-dev/react @thirdweb-dev/sdk ethers@^5
```

2. Configure ThirdWeb Provider in `App.tsx`:
```tsx
import { ThirdwebProvider } from "@thirdweb-dev/react";

<ThirdwebProvider activeChain="ethereum">
  {/* Your app */}
</ThirdwebProvider>
```

3. Implement wallet connection in Header component
4. Add NFT purchase transaction logic
5. Implement NFT minting functionality

### IPFS Setup (Not Yet Implemented)
Options for IPFS integration:

1. **ThirdWeb Storage** (Recommended)
```typescript
import { ThirdwebStorage } from "@thirdweb-dev/storage";
const storage = new ThirdwebStorage();
const uri = await storage.upload(file);
```

2. **Pinata**
- Sign up at pinata.cloud
- Get API keys
- Use Pinata SDK for uploads

3. **Web3.Storage**
- Sign up at web3.storage
- Get API token
- Use Web3.Storage client

### Tina.io CMS (Not Yet Implemented)
For content management:
1. Sign up at tina.io
2. Configure Tina for artist profiles and NFT metadata
3. Set up content models
4. Integrate Tina client

## Environment Variables

Required environment variables (`.env`):
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_APP_ID=app-7uja2c23lczl
```

## Development

### Running Locally
```bash
npm install
npm run dev
```

### Building for Production
```bash
npm run build
```

### Linting
```bash
npm run lint
```

## File Structure

```
src/
├── components/
│   ├── common/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── nft/
│   │   └── NFTCard.tsx
│   └── ui/
│       └── [shadcn components]
├── db/
│   ├── api.ts
│   └── supabase.ts
├── pages/
│   ├── Home.tsx
│   ├── Marketplace.tsx
│   ├── NFTDetail.tsx
│   ├── About.tsx
│   ├── Resources.tsx
│   ├── FAQ.tsx
│   └── Contact.tsx
├── types/
│   └── types.ts
├── App.tsx
├── routes.tsx
└── index.css
```

## Next Steps

1. **Install ThirdWeb SDK** - Enable wallet connection and blockchain transactions
2. **Configure IPFS** - Set up decentralized storage for NFT images
3. **Implement Purchases** - Add transaction logic for buying NFTs
4. **Add Minting** - Allow artists to create and list new NFTs
5. **Tina.io Integration** - Content management for metadata
6. **Gallery Partners** - White-label marketplace components (Version 2)

## Notes

- The application is currently in dark mode by default
- All blockchain features require ThirdWeb SDK installation
- Sample data is provided for demonstration
- The design follows a minimalist aesthetic with cyan accents
- All pages are responsive and mobile-friendly
