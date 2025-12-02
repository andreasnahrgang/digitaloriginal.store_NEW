require("dotenv").config({ path: ".env" });
const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");
const https = require("https");
const { optimizeImage } = require("./image-optimizer");
const { NFTStorage, Blob } = require("nft.storage");

// Initialize Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Initialize NFT.Storage
const nftStorageKey = process.env.NFT_STORAGE_API_KEY;
const nftStorage = new NFTStorage({ token: nftStorageKey });

const DOWNLOAD_DIR = path.join(__dirname, "../public/temp-download");
const OPTIMIZED_DIR = path.join(__dirname, "../public/nfts-optimized");

// Ensure directories exist
if (!fs.existsSync(DOWNLOAD_DIR))
  fs.mkdirSync(DOWNLOAD_DIR, { recursive: true });
if (!fs.existsSync(OPTIMIZED_DIR))
  fs.mkdirSync(OPTIMIZED_DIR, { recursive: true });

async function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const filepath = path.join(DOWNLOAD_DIR, filename);
    const file = fs.createWriteStream(filepath);

    https
      .get(url, (response) => {
        response.pipe(file);
        file.on("finish", () => {
          file.close();
          resolve(filepath);
        });
      })
      .on("error", (err) => {
        fs.unlink(filepath, () => {});
        reject(err);
      });
  });
}

async function processImages() {
  console.log("🔍 Fetching NFTs from Supabase...");

  // 1. Fetch NFTs
  const { data: nfts, error } = await supabase
    .from("nfts")
    .select("*, artist:artists(*)");

  if (error) {
    console.error("❌ Error fetching NFTs:", error);
    return;
  }

  console.log(`✅ Found ${nfts.length} NFTs. Starting migration...`);

  const migrationResults = [];

  for (const nft of nfts) {
    console.log(`\n🎨 Processing: ${nft.title}`);

    try {
      // 2. Download
      const imageUrl = nft.image_url; // Adjust field name if needed
      if (!imageUrl) {
        console.log("⚠️ No image URL found, skipping.");
        continue;
      }

      const filename = `${nft.id}-${path.basename(imageUrl).split("?")[0]}`;
      console.log(`⬇️ Downloading ${imageUrl}...`);
      const localPath = await downloadImage(imageUrl, filename);

      // 3. Optimize
      console.log("✨ Optimizing...");
      const { buffer: optimizedBuffer } = await optimizeImage(localPath, {
        maxSizeMB: 5,
        maxWidth: 2048,
      });

      const optimizedPath = path.join(OPTIMIZED_DIR, filename);
      fs.writeFileSync(optimizedPath, optimizedBuffer);

      // 4. Upload to IPFS
      console.log("cx Uploading to IPFS...");
      const cid = await nftStorage.storeBlob(new Blob([optimizedBuffer]));
      const ipfsUrl = `ipfs://${cid}`;

      console.log(`✅ Done! IPFS: ${ipfsUrl}`);

      migrationResults.push({
        original_id: nft.id,
        title: nft.title,
        artist: nft.artist?.name,
        old_url: imageUrl,
        new_ipfs: ipfsUrl,
        gateway_url: `https://nftstorage.link/ipfs/${cid}`,
      });
    } catch (err) {
      console.error(`❌ Failed to process ${nft.title}:`, err);
    }
  }

  // Save results
  fs.writeFileSync(
    path.join(__dirname, "../migration-report.json"),
    JSON.stringify(migrationResults, null, 2)
  );

  console.log("\n🎉 Migration complete! Report saved to migration-report.json");
}

processImages();
