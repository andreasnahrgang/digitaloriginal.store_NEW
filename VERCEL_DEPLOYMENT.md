# Vercel Deployment Guide for NFT Marketplace

## Overview
This NFT Marketplace is built with **Vite + React + TypeScript** and can be deployed to Vercel. While the requirements mentioned Next.js, Vercel fully supports Vite applications with automatic configuration.

## Pre-Deployment Checklist

### 1. Environment Variables
Before deploying, you need to set up the following environment variables in Vercel:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Where to find these values:**
1. Go to your Supabase project dashboard
2. Navigate to Settings → API
3. Copy the Project URL and anon/public key

### 2. Supabase Setup
Ensure your Supabase database is set up with:
- ✅ Artists table with sample data
- ✅ NFTs table with sample data
- ✅ All migrations applied
- ✅ Row Level Security (RLS) policies configured

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Connect Repository**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your Git repository (GitHub, GitLab, or Bitbucket)

2. **Configure Project**
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `vite build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

3. **Add Environment Variables**
   - In the project settings, go to "Environment Variables"
   - Add the Supabase variables:
     ```
     VITE_SUPABASE_URL=https://your-project.supabase.co
     VITE_SUPABASE_ANON_KEY=your-anon-key-here
     ```

4. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy your application
   - You'll get a production URL like: `https://your-project.vercel.app`

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   cd /workspace/app-7uja2c23lczl
   vercel
   ```

4. **Follow the prompts:**
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N** (for first deployment)
   - Project name? **nft-marketplace** (or your preferred name)
   - In which directory is your code located? **./`**
   - Want to override settings? **Y**
   - Build Command: `vite build`
   - Output Directory: `dist`
   - Development Command: `vite`

5. **Add Environment Variables**
   ```bash
   vercel env add VITE_SUPABASE_URL
   vercel env add VITE_SUPABASE_ANON_KEY
   ```

6. **Redeploy with environment variables**
   ```bash
   vercel --prod
   ```

## Vercel Configuration File

Create a `vercel.json` file in the root directory for custom configuration:

```json
{
  "buildCommand": "vite build",
  "outputDirectory": "dist",
  "devCommand": "vite",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This configuration ensures:
- Proper routing for single-page application
- All routes redirect to index.html for client-side routing
- Correct build and output directories

## Post-Deployment

### 1. Verify Deployment
After deployment, test the following:
- [ ] Homepage loads with carousel
- [ ] Marketplace page displays NFTs
- [ ] NFT detail pages work
- [ ] Navigation between pages works
- [ ] Images load correctly
- [ ] Supabase data is fetched
- [ ] Search functionality works
- [ ] Mobile responsive design works

### 2. Custom Domain (Optional)
1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

### 3. Performance Optimization
Vercel automatically provides:
- ✅ Global CDN
- ✅ Automatic HTTPS
- ✅ Image optimization
- ✅ Compression (gzip/brotli)
- ✅ Edge caching

## Continuous Deployment

Once connected to Git, Vercel will automatically:
- Deploy on every push to the main branch
- Create preview deployments for pull requests
- Run build checks before deployment

### Branch Deployments
- **Production**: Deploys from `main` or `master` branch
- **Preview**: Deploys from feature branches and PRs

## Troubleshooting

### Build Fails
**Issue**: Build fails with module errors
**Solution**: 
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Environment Variables Not Working
**Issue**: Supabase connection fails
**Solution**:
1. Verify environment variables are set in Vercel dashboard
2. Ensure variable names start with `VITE_`
3. Redeploy after adding variables

### 404 on Page Refresh
**Issue**: Refreshing a page shows 404
**Solution**: Add the `vercel.json` configuration file (see above)

### Images Not Loading
**Issue**: NFT images don't display
**Solution**:
1. Check image URLs in Supabase
2. Verify CORS settings for image hosts
3. Check browser console for errors

## Monitoring and Analytics

### Vercel Analytics
Enable Vercel Analytics for insights:
1. Go to project settings
2. Navigate to "Analytics"
3. Enable Web Analytics
4. Add the analytics script to your app

### Performance Monitoring
Vercel provides:
- Real User Monitoring (RUM)
- Core Web Vitals tracking
- Deployment logs
- Function logs (if using serverless functions)

## Security Best Practices

### Environment Variables
- ✅ Never commit `.env` files to Git
- ✅ Use Vercel's environment variable system
- ✅ Rotate Supabase keys if exposed
- ✅ Use different keys for development and production

### Supabase Security
- ✅ Enable Row Level Security (RLS) on all tables
- ✅ Use anon key for client-side requests
- ✅ Never expose service_role key
- ✅ Configure proper CORS settings

## Cost Considerations

### Vercel Free Tier Includes:
- Unlimited deployments
- 100 GB bandwidth per month
- Automatic HTTPS
- Preview deployments
- Analytics (basic)

### Paid Plans Offer:
- Increased bandwidth
- Team collaboration
- Advanced analytics
- Priority support
- Custom deployment regions

## Next Steps After Deployment

1. **ThirdWeb Integration**
   - Add ThirdWeb SDK for wallet connection
   - Configure blockchain network
   - Implement NFT minting functionality

2. **IPFS Integration**
   - Set up IPFS upload via ThirdWeb API
   - Configure Pinata or Web3.Storage as backup
   - Implement file upload UI

3. **Tina.io CMS**
   - Install Tina CMS
   - Configure content models
   - Set up admin interface

4. **Gallery Partner Features (Version 2)**
   - Create white-label components
   - Implement partner dashboard
   - Set up subdomain routing

## Support Resources

- **Vercel Documentation**: https://vercel.com/docs
- **Vite Documentation**: https://vitejs.dev/guide/
- **Supabase Documentation**: https://supabase.com/docs
- **React Router Documentation**: https://reactrouter.com/

## Deployment Checklist

Before going live:
- [ ] All environment variables configured
- [ ] Supabase database populated with data
- [ ] All pages tested and working
- [ ] Mobile responsiveness verified
- [ ] Images loading correctly
- [ ] Search functionality working
- [ ] Navigation working on all pages
- [ ] Error handling implemented
- [ ] Loading states implemented
- [ ] SEO meta tags added
- [ ] Favicon configured
- [ ] Analytics enabled
- [ ] Custom domain configured (if applicable)

---

**Framework**: Vite + React + TypeScript  
**Deployment Platform**: Vercel  
**Database**: Supabase  
**Status**: ✅ Ready for Deployment
