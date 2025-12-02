#!/usr/bin/env node

/**
 * Image Optimization Script
 * Optimizes NFT images to 5MB max for web display
 *
 * Usage:
 *   node scripts/optimize-nft-images.js <input-dir> <output-dir>
 */

const { optimizeDirectory } = require("./image-optimizer");

const inputDir = process.argv[2] || "./public/nfts-original";
const outputDir = process.argv[3] || "./public/nfts-optimized";

console.log("🎨 NFT Image Optimizer");
console.log("====================");
console.log(`Input:  ${inputDir}`);
console.log(`Output: ${outputDir}`);
console.log("");

optimizeDirectory(inputDir, outputDir, {
  maxSizeMB: 5,
  maxWidth: 2048,
  maxHeight: 2048,
  quality: 90,
  format: "jpeg",
})
  .then(() => {
    console.log("");
    console.log("✅ All images optimized successfully!");
    console.log(`📁 Optimized images saved to: ${outputDir}`);
  })
  .catch((error) => {
    console.error("❌ Optimization failed:", error);
    process.exit(1);
  });
