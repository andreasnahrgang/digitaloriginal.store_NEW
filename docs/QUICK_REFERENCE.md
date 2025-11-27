# Quick Reference Guide - Website Updates

## What Changed?

### 1. New Artists & NFTs

#### Robert Zielasco (3 NFTs)
- **Robert Zielasco 1** - 1.2 ETH
- **Robert Zielasco 2** - 1.5 ETH  
- **Robert Zielasco 3** - 1.8 ETH
- **Bio**: Vienna-based painter (*1948), studied at Kunstakademie Wien, Rome scholarship recipient
- **Website**: https://www.zielasco.at

#### digitalgandhi (2 NFTs)
- **public naked pushup1** - 0.8 ETH
- **public naked pushup2** - 0.9 ETH
- **Bio**: Contemporary digital artist exploring public space and performance themes

### 2. Color Scheme

**Only 3 Colors Used:**
- ⬛ **Black** (#000000) - Backgrounds
- ⬜ **White** (#FFFFFF) - Text
- 🔷 **Cyan** (#00bcd4) - Borders, accents, highlights

**What Changed:**
- Dark grey → Pure black
- All borders → Cyan
- All separators → Cyan
- Middle section → Pure black background

## Where to Find Things

### Database
- **Artists**: 2 artists in `artists` table
- **NFTs**: 5 NFTs in `nfts` table
- **Access**: Supabase dashboard at https://ukqmfahojgxlthzabqof.supabase.co

### Design System
- **File**: `src/index.css`
- **Colors**: All defined in HSL format
- **Theme**: Dark mode by default

### Pages
- **Homepage**: Features carousel with new NFTs
- **Marketplace**: Grid view of all 5 NFTs
- **NFT Details**: Individual pages for each NFT with artist info

## Key Features

✅ Real artist information from official sources
✅ Proper artist attribution on all NFTs
✅ Strict three-color palette (black/white/cyan)
✅ Pure black backgrounds (no grey)
✅ Cyan borders throughout
✅ Professional artist biographies
✅ Working links to artist websites

## Technical Status

✅ All linting checks pass
✅ Database fully updated
✅ No TypeScript errors
✅ All components working
✅ Responsive design maintained
✅ Dark mode optimized

## Quick Stats

- **Total NFTs**: 5
- **Total Artists**: 2
- **Color Palette**: 3 colors only
- **Price Range**: 0.8 - 1.8 ETH
- **Files Modified**: 2 (index.css + database migration)

## Artist Information Sources

- **Robert Zielasco**: https://www.zielasco.at/page2013/artist.html
- **digitalgandhi**: Custom bio created

## Color Values Reference

```css
/* Black */
--background: 0 0% 0%;
--card: 0 0% 0%;

/* White */
--foreground: 0 0% 100%;

/* Cyan */
--primary: 187 100% 42%;
--border: 187 100% 42%;
--accent: 187 100% 42%;
```

## Verification Checklist

- [x] 5 NFTs in database
- [x] 2 artists with complete profiles
- [x] Robert Zielasco info from official website
- [x] digitalgandhi profile created
- [x] All backgrounds pure black (no grey)
- [x] All borders cyan color
- [x] Middle section pure black
- [x] All code passes linting
- [x] No TypeScript errors

---

**Last Updated**: November 27, 2025
**Status**: ✅ All requirements completed
