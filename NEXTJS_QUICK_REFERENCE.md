# Next.js Quick Reference Card

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 📁 File Structure

```
app/                    # Pages (file-based routing)
├── layout.tsx         # Root layout (wraps all pages)
├── page.tsx           # Home page (/)
├── marketplace/
│   └── page.tsx       # /marketplace
└── nft/
    └── [id]/
        └── page.tsx   # /nft/:id (dynamic)

src/
├── components/        # Reusable components
├── db/               # Database & API
├── types/            # TypeScript types
└── lib/              # Utilities
```

## 🔗 Navigation

### Link Component
```tsx
import Link from 'next/link';

<Link href="/marketplace">Marketplace</Link>
<Link href={`/nft/${id}`}>NFT Detail</Link>
```

### Navigation Hooks
```tsx
'use client';
import { usePathname, useParams, useRouter } from 'next/navigation';

const pathname = usePathname();        // Get current path
const params = useParams();            // Get route params
const router = useRouter();            // Programmatic navigation

router.push('/marketplace');           // Navigate
router.back();                         // Go back
```

## 📄 Page Components

### Static Page
```tsx
// app/about/page.tsx
export default function About() {
  return <div>About Page</div>;
}
```

### Client Component (with state/effects)
```tsx
'use client';

import { useState, useEffect } from 'react';

export default function Marketplace() {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    // Fetch data
  }, []);
  
  return <div>Marketplace</div>;
}
```

### Dynamic Route
```tsx
// app/nft/[id]/page.tsx
'use client';

import { useParams } from 'next/navigation';

export default function NFTDetail() {
  const params = useParams();
  const id = params?.id as string;
  
  return <div>NFT {id}</div>;
}
```

## 🎨 Layout

### Root Layout
```tsx
// app/layout.tsx
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import '@/index.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

## 🌍 Environment Variables

### .env File
```env
NEXT_PUBLIC_SUPABASE_URL=https://...
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
NEXT_PUBLIC_APP_ID=app-xxx
```

### Usage
```tsx
// Client components
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;

// Server components
const secret = process.env.SECRET_KEY;  // Not exposed to client
```

**Rules:**
- `NEXT_PUBLIC_*` - Exposed to browser
- Without prefix - Server-only

## 🎯 Client vs Server Components

### Server Component (Default)
```tsx
// No 'use client' directive
// Can fetch data directly
// Cannot use hooks or event handlers

export default async function Page() {
  const data = await fetchData();
  return <div>{data}</div>;
}
```

### Client Component
```tsx
'use client';

// Can use hooks
// Can use event handlers
// Runs in browser

import { useState } from 'react';

export default function Page() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

**When to use 'use client':**
- ✅ useState, useEffect, useContext
- ✅ Event handlers (onClick, onChange)
- ✅ Browser APIs (localStorage, window)
- ✅ Third-party libraries with browser dependencies

## 📦 Imports

### Path Alias (@)
```tsx
import { Button } from '@/components/ui/button';
import { nftApi } from '@/db/api';
import type { NFT } from '@/types/types';
```

### Next.js Imports
```tsx
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
```

## 🖼️ Images

### External Images
```tsx
<img src="https://example.com/image.jpg" alt="NFT" />
```

### Optimized Images
```tsx
import Image from 'next/image';

<Image
  src="/logo.png"
  alt="Logo"
  width={200}
  height={100}
  priority
/>
```

## 🗄️ Database (Supabase)

### Client Setup
```tsx
// src/db/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
```

### Usage (Unchanged)
```tsx
import { supabase } from '@/db/supabase';

const { data, error } = await supabase
  .from('nfts')
  .select('*')
  .eq('is_listed', true);
```

## 🎨 Styling

### Tailwind CSS (Unchanged)
```tsx
<div className="flex items-center justify-between p-4 bg-card">
  <h1 className="text-2xl font-bold">Title</h1>
</div>
```

### shadcn/ui Components (Unchanged)
```tsx
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

<Card>
  <CardContent>
    <Button>Click Me</Button>
  </CardContent>
</Card>
```

## 🔧 Configuration

### next.config.mjs
```js
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
```

### tsconfig.json
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## 🐛 Common Issues

### "Module not found"
```bash
npm install
```

### "use client" missing
Add to top of file:
```tsx
'use client';
```

### Environment variables not working
1. Ensure they start with `NEXT_PUBLIC_`
2. Restart dev server

### Import errors
Check tsconfig.json paths configuration

## 📚 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [App Router Guide](https://nextjs.org/docs/app)
- [Migration Guide](./MIGRATION_GUIDE.md)
- [Migration Summary](./MIGRATION_SUMMARY.md)

## 🎯 Key Differences from Vite

| Feature | Vite | Next.js |
|---------|------|---------|
| Routing | React Router | File-based |
| Links | `<Link to="">` | `<Link href="">` |
| Env vars | `import.meta.env.VITE_*` | `process.env.NEXT_PUBLIC_*` |
| Entry | `main.tsx` | `layout.tsx` |
| Config | `vite.config.ts` | `next.config.mjs` |
| Dev server | `vite` | `next dev` |
| Build | `vite build` | `next build` |

## ✅ Migration Checklist

- [x] All pages migrated to app/ directory
- [x] All components updated for Next.js
- [x] Environment variables renamed
- [x] Navigation updated (Link, hooks)
- [x] Configuration files created
- [ ] Dependencies installed (`npm install`)
- [ ] Build verified (`npm run build`)
- [ ] Application tested (`npm run dev`)

---

**Quick Start:** `npm install && npm run dev`
