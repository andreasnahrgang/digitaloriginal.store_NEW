# Welcome to Your Miaoda Project

Miaoda Application Link URL
URL:https://medo.dev/projects/app-7uja2c23lczl

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

- **Framework**: Next.js 14 (App Router)
- **Runtime**: React 18 with TypeScript
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Carousel**: Embla Carousel

### Content Management

- **CMS**: TinaCMS for content editing
- **Content**: Markdown-based NFT and artist data
- **Admin**: Built-in TinaCMS admin interface

### Blockchain (Ready for Integration)

- **Wallet**: ThirdWeb SDK
- **Storage**: IPFS via ThirdWeb/Pinata/Web3.Storage
- **Smart Contracts**: ThirdWeb marketplace templates

## 📁 Project Structure

```
/workspace/app-7uja2c23lczl/
├── app/                            # Next.js App Router
│   ├── layout.tsx                  # Root layout
│   ├── page.tsx                    # Homepage
│   ├── marketplace/
│   │   └── page.tsx                # NFT marketplace
│   ├── nft/
│   │   └── [id]/
│   │       └── page.tsx            # Dynamic NFT detail page
│   ├── about/
│   │   └── page.tsx                # About page
│   ├── resources/
│   │   └── page.tsx                # Resources page
│   ├── faq/
│   │   └── page.tsx                # FAQ page
│   └── contact/
│       └── page.tsx                # Contact page
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
│   ├── lib/
│   │   └── utils.ts                # Utility functions
│   ├── types/
│   │   └── types.ts                # TypeScript definitions
│   ├── lib/
│   │   └── utils.ts                # Utility functions
│   └── index.css                   # Global styles
├── tina/
│   └── config.ts                   # TinaCMS configuration
├── public/                         # Static assets
├── next.config.mjs                 # Next.js configuration
├── DEPLOYMENT_GUIDE.md             # Deployment instructions
└── package.json                    # Dependencies
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
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

   Create a `.env` file in the root directory (refer to `.env.example`)

4. **Start development server**

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000`

## 🚢 Deployment

This Next.js application can be deployed to various platforms:

### Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

### Netlify

```bash
npm i -g netlify-cli
netlify deploy --prod
```

### Docker

See `DEPLOYMENT_GUIDE.md` for detailed instructions.

Deployment is managed via Vercel. See [GIT_STRATEGY.md](./GIT_STRATEGY.md) for branch and deployment workflow.

## 📝 Content Management

### TinaCMS

Content is managed through TinaCMS with markdown files:

- **NFTs**: `content/nfts/*.mdx`
- **Artists**: `content/artists/*.mdx`
- **Admin Interface**: Access at `/admin` when running dev server

### Content Schema

All content is version-controlled and stored as markdown files in the `content/` directory.

## 🎯 Content

Sample content is included in the `content/` directory:

### Artists

- Artist profiles with bios and portfolio information
- Managed via TinaCMS admin interface

### NFTs

- Digital artworks with metadata
- Prices and descriptions
- Complete artist attribution

## 🌐 Deployment

### Deploy to Vercel

1. **Quick Deploy**

   ```bash
   npm install -g vercel
   vercel
   ```

2. **Configure Environment Variables**

   - Add environment variables from `.env.example`

3. **Deploy**
   ```bash
   vercel --prod
   ```

For detailed deployment workflow, see [GIT_STRATEGY.md](./GIT_STRATEGY.md)

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

### Content Security

- TinaCMS authentication for admin access
- Version-controlled content via Git
- Read-only public content access

## 🎨 Customization

### Update Colors

Edit `src/index.css` to change the color scheme:

```css
:root {
  --background: 0 0% 0%; /* Black */
  --foreground: 0 0% 100%; /* White */
  --primary: 187 100% 42%; /* Cyan */
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

### CMS (Already Integrated)

- ✅ TinaCMS is already configured
- ✅ Access admin at `/admin` route
- ✅ Manage NFTs and artists via UI
- ✅ Content stored in `content/` directory

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

### Content Loading

- Verify TinaCMS configuration
- Check content directory structure
- Confirm markdown files are valid

### Image Loading

- Verify image URLs in database
- Check CORS settings
- Inspect browser console

## 📚 Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [TinaCMS Documentation](https://tina.io/docs/)
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
