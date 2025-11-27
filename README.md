# NFT Marketplace - Digital Original

A minimalist NFT marketplace built with modern web technologies, featuring a sleek black and white design with cyan accents. Browse, discover, and manage digital artworks with seamless blockchain integration.

![Digital Original Logo](https://miaoda-conversation-file.s3cdn.medo.dev/user-7uiwbqz6q8lc/conv-7uja2c23lczk/20251127/file-7ujeylhhucjk.png)

## ✨ Features

### Core Functionality
- **NFT Marketplace**: Browse and discover unique digital artworks
- **Featured Carousel**: Rotating showcase of highlighted NFTs on the homepage
- **Artist Profiles**: Detailed information about NFT creators
- **Search & Filter**: Find NFTs by title, description, or artist
- **NFT Details**: Comprehensive view of each artwork with pricing and metadata
- **Wallet Integration**: Ready for ThirdWeb wallet connection
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### Pages
- **Home**: Featured NFT carousel and marketplace preview
- **Marketplace**: Full NFT gallery with search functionality
- **NFT Detail**: Individual artwork pages with artist information
- **About Us**: Information about the platform
- **Resources**: Helpful links and documentation
- **FAQ**: Frequently asked questions
- **Contact**: Get in touch with the team

## 🎨 Design System

### Color Palette
- **Background**: Pure Black (#000000)
- **Text**: White (#FFFFFF)
- **Accent**: Cyan (#00bcd4)
- **Style**: Minimalist avant-garde with high contrast

### Visual Elements
- Clean grid-based layouts
- Card-style NFT displays with cyan borders
- Smooth transitions and hover effects
- Modern sans-serif typography
- Ample whitespace for clarity

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v7
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Carousel**: Embla Carousel

### Backend & Database
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Ready for ThirdWeb integration
- **Storage**: Supabase Storage (ready for IPFS)
- **API**: Supabase Client with TypeScript

### Blockchain (Ready for Integration)
- **Wallet**: ThirdWeb SDK
- **Storage**: IPFS via ThirdWeb/Pinata/Web3.Storage
- **Smart Contracts**: ThirdWeb marketplace templates

## 📁 Project Structure

```
/workspace/app-7uja2c23lczl/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header.tsx          # Navigation header
│   │   │   └── Footer.tsx          # Site footer
│   │   ├── nft/
│   │   │   ├── NFTCard.tsx         # NFT display card
│   │   │   ├── NFTCarousel.tsx     # Homepage carousel
│   │   │   └── NFTGrid.tsx         # Marketplace grid
│   │   └── ui/                     # shadcn/ui components
│   ├── pages/
│   │   ├── Home.tsx                # Homepage
│   │   ├── Marketplace.tsx         # NFT marketplace
│   │   ├── NFTDetail.tsx           # Individual NFT page
│   │   ├── About.tsx               # About page
│   │   ├── Resources.tsx           # Resources page
│   │   ├── FAQ.tsx                 # FAQ page
│   │   └── Contact.tsx             # Contact page
│   ├── db/
│   │   ├── supabase.ts             # Supabase client
│   │   └── api.ts                  # Database API functions
│   ├── types/
│   │   └── types.ts                # TypeScript definitions
│   ├── lib/
│   │   └── utils.ts                # Utility functions
│   ├── routes.tsx                  # Route configuration
│   ├── App.tsx                     # Main app component
│   └── index.css                   # Global styles
├── supabase/
│   └── migrations/                 # Database migrations
├── public/                         # Static assets
├── vercel.json                     # Vercel configuration
├── VERCEL_DEPLOYMENT.md            # Deployment guide
└── package.json                    # Dependencies
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Supabase account
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd app-7uja2c23lczl
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up Supabase database**
   
   Run the migrations in the `supabase/migrations/` directory:
   - `20250127000000_create_artists_table.sql`
   - `20250127000001_create_nfts_table.sql`
   - `20250127000002_add_sample_data.sql`

5. **Start development server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`

## 📊 Database Schema

### Artists Table
```sql
- id (uuid, primary key)
- name (text, required)
- bio (text)
- profile_image_url (text)
- website (text)
- social_links (jsonb)
- created_at (timestamp)
```

### NFTs Table
```sql
- id (uuid, primary key)
- title (text, required)
- description (text)
- image_url (text, required)
- price (numeric)
- artist_id (uuid, foreign key)
- is_listed (boolean)
- metadata (jsonb)
- created_at (timestamp)
```

## 🎯 Sample Data

The database includes sample data for demonstration:

### Artists
- **Robert Zielasco**: Contemporary digital artist
- **digitalgandhi**: Avant-garde digital creator

### NFTs
- 6 unique digital artworks with real images
- Prices ranging from 0.5 to 2.5 ETH
- Complete metadata and artist attribution

## 🌐 Deployment

### Deploy to Vercel

1. **Quick Deploy**
   ```bash
   npm install -g vercel
   vercel
   ```

2. **Configure Environment Variables**
   - Add `VITE_SUPABASE_URL`
   - Add `VITE_SUPABASE_ANON_KEY`

3. **Deploy**
   ```bash
   vercel --prod
   ```

For detailed deployment instructions, see [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)

### Vercel Configuration
The project includes a `vercel.json` file with:
- Automatic Vite detection
- SPA routing configuration
- Build and output directory settings

## 🔧 Development

### Available Scripts

```bash
# Development (note: use external dev server)
npm run dev

# Build for production
npm run build

# Lint and type check
npm run lint

# Preview production build
npm run preview
```

### Code Quality
- TypeScript for type safety
- Biome for linting
- Tailwind CSS for consistent styling
- Component-based architecture

## 🔐 Security

### Environment Variables
- Never commit `.env` files
- Use Vercel's environment variable system
- Rotate keys if exposed

### Supabase Security
- Row Level Security (RLS) enabled
- Public read access for NFT browsing
- Secure write operations (ready for auth)

## 🎨 Customization

### Update Colors
Edit `src/index.css` to change the color scheme:
```css
:root {
  --background: 0 0% 0%;        /* Black */
  --foreground: 0 0% 100%;      /* White */
  --primary: 187 100% 42%;      /* Cyan */
  /* ... other colors */
}
```

### Add New Pages
1. Create component in `src/pages/`
2. Add route in `src/routes.tsx`
3. Update navigation in `src/components/common/Header.tsx`

### Modify NFT Display
Edit `src/components/nft/NFTCard.tsx` to customize:
- Card layout
- Image display
- Metadata presentation
- Hover effects

## 📝 Next Steps

### ThirdWeb Integration
1. Install ThirdWeb SDK
   ```bash
   npm install @thirdweb-dev/react @thirdweb-dev/sdk
   ```

2. Configure ThirdWeb provider in `App.tsx`

3. Implement wallet connection

4. Add NFT minting functionality

### IPFS Integration
1. Set up ThirdWeb storage or Pinata
2. Implement file upload component
3. Store IPFS hashes in database
4. Update NFT creation flow

### CMS Integration (Tina.io)
1. Install Tina CMS
2. Configure content models
3. Set up admin interface
4. Manage artist profiles and content

### Gallery Partner Features (Version 2)
1. Create white-label components
2. Implement partner dashboard
3. Set up subdomain routing
4. Add partner-specific branding

## 🐛 Troubleshooting

### Build Issues
```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

### Supabase Connection
- Verify environment variables
- Check Supabase project status
- Confirm RLS policies

### Image Loading
- Verify image URLs in database
- Check CORS settings
- Inspect browser console

## 📚 Documentation

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Supabase Documentation](https://supabase.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [ThirdWeb Documentation](https://portal.thirdweb.com/)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👥 Support

For questions or support:
- Check the FAQ page
- Review the documentation
- Contact the development team

---

**Built with ❤️ using React, TypeScript, and Supabase**  
**Ready for deployment on Vercel** 🚀
