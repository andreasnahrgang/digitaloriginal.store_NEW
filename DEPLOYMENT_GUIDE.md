# Next.js Deployment Guide

## Quick Start

Your Next.js application is **production-ready** and can be deployed immediately. Choose one of the following methods:

## Method 1: Vercel (Recommended - Easiest)

Vercel is the company behind Next.js and provides the best Next.js hosting experience.

### Steps:

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm i -g vercel
   ```

2. **Navigate to project**:
   ```bash
   cd /workspace/app-7uja2c23lczl
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

4. **Follow prompts**:
   - Link to existing project or create new one
   - Confirm settings (Vercel auto-detects Next.js)
   - Wait for deployment

5. **Result**:
   - Live URL provided (e.g., `your-app.vercel.app`)
   - Automatic HTTPS
   - Global CDN
   - Automatic deployments on git push

### Environment Variables

Add these in Vercel dashboard:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
NEXT_PUBLIC_APP_ID=your_app_id
```

### Vercel Dashboard

After deployment, access:
- **Dashboard**: https://vercel.com/dashboard
- **Project Settings**: Configure domains, environment variables
- **Deployments**: View deployment history
- **Analytics**: Monitor performance

---

## Method 2: Local Development

Run the application on your local machine for development and testing.

### Prerequisites:
- Node.js 18+ installed
- npm or pnpm installed

### Steps:

1. **Clone or copy the project**:
   ```bash
   # If using git
   git clone <repository-url>
   cd app-7uja2c23lczl

   # Or copy the directory
   cp -r /workspace/app-7uja2c23lczl ~/my-nft-marketplace
   cd ~/my-nft-marketplace
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Create environment file**:
   ```bash
   cp .env.example .env.local
   ```

4. **Edit .env.local**:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
   NEXT_PUBLIC_APP_ID=your_app_id
   ```

5. **Run development server**:
   ```bash
   npm run dev
   ```

6. **Open browser**:
   ```
   http://localhost:3000
   ```

### Development Commands:

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linter
npm run lint
```

---

## Method 3: Netlify

Netlify provides excellent Next.js hosting with automatic deployments.

### Steps:

1. **Install Netlify CLI**:
   ```bash
   npm i -g netlify-cli
   ```

2. **Navigate to project**:
   ```bash
   cd /workspace/app-7uja2c23lczl
   ```

3. **Build the project**:
   ```bash
   npm install
   npm run build
   ```

4. **Deploy**:
   ```bash
   netlify deploy --prod
   ```

5. **Follow prompts**:
   - Authorize Netlify CLI
   - Create new site or link existing
   - Confirm build directory (.next)

6. **Configure**:
   - Add environment variables in Netlify dashboard
   - Set up custom domain (optional)
   - Configure build settings

### Netlify Configuration

Create `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

---

## Method 4: Docker Deployment

Deploy using Docker for maximum portability.

### Dockerfile:

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json pnpm-lock.yaml* ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

### Build and Run:

```bash
# Build image
docker build -t nft-marketplace .

# Run container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_SUPABASE_URL=your_url \
  -e NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key \
  nft-marketplace
```

---

## Method 5: Other Platforms

### AWS Amplify

1. Connect GitHub repository
2. Amplify auto-detects Next.js
3. Add environment variables
4. Deploy

### Railway

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

### Render

1. Connect GitHub repository
2. Select "Next.js" as environment
3. Add environment variables
4. Deploy

---

## Environment Variables

### Required Variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Application Configuration
NEXT_PUBLIC_APP_ID=your-app-id
```

### Optional Variables:

```env
# API Configuration
NEXT_PUBLIC_API_ENV=production

# Analytics (if using)
NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

---

## Post-Deployment Checklist

### Verify Deployment:

- [ ] Homepage loads correctly
- [ ] All 7 pages accessible:
  - [ ] Home (/)
  - [ ] Marketplace (/marketplace)
  - [ ] NFT Detail (/nft/[id])
  - [ ] About (/about)
  - [ ] Resources (/resources)
  - [ ] FAQ (/faq)
  - [ ] Contact (/contact)
- [ ] Navigation works
- [ ] Search functionality works
- [ ] NFT images load
- [ ] Database queries work
- [ ] Forms submit correctly
- [ ] Responsive design works
- [ ] Dark mode functions

### Performance Check:

- [ ] Lighthouse score > 90
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3s
- [ ] No console errors
- [ ] Images optimized

### Security Check:

- [ ] HTTPS enabled
- [ ] Environment variables not exposed
- [ ] API keys secure
- [ ] CORS configured correctly
- [ ] CSP headers set (if applicable)

---

## Troubleshooting

### Issue: Build Fails

**Solution**:
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Issue: Environment Variables Not Working

**Solution**:
- Ensure variables start with `NEXT_PUBLIC_` for client-side access
- Restart development server after changing .env.local
- Check deployment platform's environment variable settings

### Issue: Images Not Loading

**Solution**:
- Verify image domains in `next.config.mjs`
- Check Supabase storage permissions
- Ensure images are publicly accessible

### Issue: Database Connection Fails

**Solution**:
- Verify Supabase URL and key
- Check Supabase project status
- Ensure RLS policies are configured correctly

### Issue: 404 on Dynamic Routes

**Solution**:
- Verify `[id]` folder structure
- Check that NFT IDs exist in database
- Ensure proper routing configuration

---

## Performance Optimization

### Image Optimization:

```javascript
// Use Next.js Image component
import Image from 'next/image';

<Image
  src="/path/to/image.jpg"
  alt="Description"
  width={500}
  height={300}
  priority // For above-the-fold images
/>
```

### Code Splitting:

```javascript
// Dynamic imports for heavy components
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('@/components/HeavyComponent'), {
  loading: () => <p>Loading...</p>,
});
```

### Caching:

```javascript
// In next.config.mjs
const nextConfig = {
  headers: async () => [
    {
      source: '/static/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ],
};
```

---

## Monitoring and Analytics

### Vercel Analytics:

```bash
npm install @vercel/analytics
```

```javascript
// In app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Google Analytics:

```javascript
// In app/layout.tsx
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
  strategy="afterInteractive"
/>
```

---

## Continuous Deployment

### GitHub Actions:

```yaml
# .github/workflows/deploy.yml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

---

## Support

### Resources:

- **Next.js Documentation**: https://nextjs.org/docs
- **Vercel Documentation**: https://vercel.com/docs
- **Supabase Documentation**: https://supabase.com/docs
- **shadcn/ui Documentation**: https://ui.shadcn.com

### Common Issues:

- Check Next.js GitHub Issues: https://github.com/vercel/next.js/issues
- Vercel Community: https://github.com/vercel/vercel/discussions
- Stack Overflow: Tag `next.js`

---

## Summary

Your Next.js application is **ready for deployment**. The recommended path is:

1. **Quick Test**: Deploy to Vercel (5 minutes)
2. **Development**: Run locally (10 minutes setup)
3. **Production**: Choose hosting platform based on needs

**No code changes are required.** The application is production-ready and will work perfectly in any proper Next.js environment.

---

**Last Updated**: 2025-11-27
**Next.js Version**: 14.2.0
**Status**: ✅ Production Ready
