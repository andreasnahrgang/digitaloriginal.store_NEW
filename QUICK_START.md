# NFT Marketplace - Quick Start Guide

## 🚀 Get Started in 5 Minutes

This guide will help you deploy your NFT Marketplace to Vercel quickly.

---

## Step 1: Set Up Supabase (2 minutes)

1. **Create a Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Click "New Project"
   - Fill in project details
   - Wait for project to initialize

2. **Run Database Migrations**
   - Go to SQL Editor in Supabase dashboard
   - Copy and paste each migration file from `supabase/migrations/`:
     - `00001_create_nft_marketplace_schema.sql`
     - `00002_update_artists_and_nfts_with_new_data.sql`
     - `00003_remove_artist_images_and_update_nft_images.sql`
   - Run each migration in order

3. **Get Your API Keys**
   - Go to Settings → API
   - Copy:
     - Project URL (e.g., `https://xxxxx.supabase.co`)
     - anon/public key

---

## Step 2: Deploy to Vercel (2 minutes)

### Option A: Deploy via Vercel Dashboard (Easiest)

1. **Connect Repository**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your Git repository

2. **Configure Project**
   - Framework Preset: **Vite** (auto-detected)
   - Root Directory: `./` (default)
   - Build Command: `vite build` (auto-detected)
   - Output Directory: `dist` (auto-detected)

3. **Add Environment Variables**
   Click "Environment Variables" and add:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your site is live! 🎉

### Option B: Deploy via CLI (For Developers)

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
cd /workspace/app-7uja2c23lczl
vercel

# Add environment variables
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY

# Deploy to production
vercel --prod
```

---

## Step 3: Verify Deployment (1 minute)

Visit your deployed site and check:

- [ ] Homepage loads with carousel
- [ ] Marketplace shows 6 NFTs
- [ ] Click on an NFT to see details
- [ ] Search works
- [ ] All navigation links work
- [ ] Mobile menu works

---

## 🎉 You're Done!

Your NFT Marketplace is now live and functional!

### What You Have
- ✅ Fully functional NFT marketplace
- ✅ 6 sample NFTs with real images
- ✅ 2 sample artists
- ✅ Search functionality
- ✅ Responsive design
- ✅ All pages working

### What's Next?

#### Immediate (Optional)
1. **Custom Domain**
   - Go to Vercel project settings
   - Add your domain
   - Update DNS records

2. **Remove Sample Data**
   - Go to Supabase dashboard
   - Table Editor → NFTs → Delete rows
   - Table Editor → Artists → Delete rows

#### Future Enhancements
1. **ThirdWeb Integration** (Wallet Connection)
   ```bash
   npm install @thirdweb-dev/react @thirdweb-dev/sdk
   ```
   See: [ThirdWeb Docs](https://portal.thirdweb.com/)

2. **IPFS Upload** (NFT Storage)
   - Set up ThirdWeb storage or Pinata
   - Implement file upload component
   - Store IPFS hashes in database

3. **NFT Transactions** (Buy/Sell)
   - Implement purchase functionality
   - Add transaction confirmation
   - Update ownership in database

4. **CMS Integration** (Content Management)
   ```bash
   npm install tinacms
   ```
   See: [Tina.io Docs](https://tina.io/docs/)

---

## 📚 Documentation

- **README.md** - Full project documentation
- **VERCEL_DEPLOYMENT.md** - Detailed deployment guide
- **PROJECT_SUMMARY.md** - Complete feature list
- **TODO.md** - Implementation checklist

---

## 🆘 Troubleshooting

### Issue: NFTs Not Loading
**Solution**: Check environment variables in Vercel
- Go to Project Settings → Environment Variables
- Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- Redeploy if you added variables after deployment

### Issue: 404 on Page Refresh
**Solution**: Already fixed! The `vercel.json` file handles this.

### Issue: Build Fails
**Solution**: Check build logs in Vercel dashboard
- Common causes: Missing dependencies, TypeScript errors
- Fix locally first: `npm run lint`

### Issue: Images Not Loading
**Solution**: Check Supabase data
- Go to Supabase → Table Editor → NFTs
- Verify `image_url` column has valid URLs
- Check browser console for CORS errors

---

## 💡 Pro Tips

1. **Enable Vercel Analytics**
   - Go to Project Settings → Analytics
   - Enable Web Analytics
   - Get insights on performance and usage

2. **Set Up Automatic Deployments**
   - Already configured!
   - Push to main branch = automatic deployment
   - Pull requests = preview deployments

3. **Monitor Performance**
   - Check Vercel dashboard for metrics
   - Use Lighthouse for performance audits
   - Optimize images if needed

4. **Secure Your Keys**
   - Never commit `.env` files
   - Use different keys for dev/prod
   - Rotate keys if exposed

---

## 📞 Need Help?

- **Documentation**: Check README.md and other docs
- **Vercel Support**: [vercel.com/support](https://vercel.com/support)
- **Supabase Support**: [supabase.com/docs](https://supabase.com/docs)
- **Community**: GitHub Issues (if repository is public)

---

## ✅ Deployment Checklist

Before going live:
- [ ] Supabase project created
- [ ] All migrations run
- [ ] Environment variables set in Vercel
- [ ] Site deployed successfully
- [ ] All pages tested
- [ ] Mobile responsiveness verified
- [ ] Sample data reviewed (keep or remove)
- [ ] Custom domain configured (optional)
- [ ] Analytics enabled (optional)

---

**Estimated Total Time**: 5-10 minutes  
**Difficulty**: Easy  
**Cost**: Free (Vercel + Supabase free tiers)

🎉 **Congratulations! Your NFT Marketplace is live!** 🎉
