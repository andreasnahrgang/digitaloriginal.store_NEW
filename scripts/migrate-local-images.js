require("dotenv").config({ path: ".env" });
const fs = require("fs");
const path = require("path");
const { optimizeImage } = require("./image-optimizer");
const https = require("https");

// Initialize API Key
const nftStorageKey = process.env.NFT_STORAGE_API_KEY;

const SOURCE_DIR =
  "/Users/andreasnahrgang/Documents/artrent pictures/Robert Zielasco Bilder";
const OPTIMIZED_DIR = path.join(__dirname, "../public/nfts-optimized");
const CONTENT_DIR = path.join(__dirname, "../content/nfts");

// Ensure directories exist
if (!fs.existsSync(OPTIMIZED_DIR))
  fs.mkdirSync(OPTIMIZED_DIR, { recursive: true });
if (!fs.existsSync(CONTENT_DIR)) fs.mkdirSync(CONTENT_DIR, { recursive: true });

// Helper to upload via HTTP API directly
async function uploadToNFTStorage(buffer) {
  if (!nftStorageKey) return null;

  return new Promise((resolve, reject) => {
    const req = https.request(
      "https://api.nft.storage/upload",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${nftStorageKey}`,
          "Content-Type": "image/jpeg",
          "Content-Length": buffer.length,
        },
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          if (res.statusCode === 200) {
            try {
              const response = JSON.parse(data);
              if (response.ok) {
                resolve(response.value.cid);
              } else {
                console.warn(`⚠️ API Error: ${JSON.stringify(response)}`);
                resolve(null); // Resolve null on error to continue
              }
            } catch (e) {
              console.warn(`⚠️ Invalid JSON: ${data}`);
              resolve(null);
            }
          } else {
            console.warn(`⚠️ HTTP Error ${res.statusCode}: ${data}`);
            resolve(null);
          }
        });
      }
    );

    req.on("error", (e) => {
      console.warn(`⚠️ Request Error: ${e.message}`);
      resolve(null);
    });
    req.write(buffer);
    req.end();
  });
}

async function processLocalImages() {
  console.log(`🔍 Scanning directory: ${SOURCE_DIR}`);

  try {
    const files = fs.readdirSync(SOURCE_DIR);
    const imageFiles = files.filter((file) =>
      /\.(jpg|jpeg|png|webp)$/i.test(file)
    );

    console.log(`✅ Found ${imageFiles.length} images. Starting migration...`);

    // Create Artist Profile if not exists
    const artistPath = path.join(
      __dirname,
      "../content/artists/robert-zielasco.mdx"
    );
    if (!fs.existsSync(artistPath)) {
      const artistContent = `---
name: "Robert Zielasco"
slug: "robert-zielasco"
bio_short: "Renowned abstract artist known for vibrant colors and dynamic compositions."
---

Robert Zielasco is a distinguished artist whose work explores the boundaries of abstraction...
`;
      fs.writeFileSync(artistPath, artistContent);
      console.log(`👤 Created artist profile: ${artistPath}`);
    }

    for (const filename of imageFiles) {
      console.log(`\n🎨 Processing: ${filename}`);

      try {
        const sourcePath = path.join(SOURCE_DIR, filename);
        const safeName = filename
          .toLowerCase()
          .replace(/[^a-z0-9]/g, "-")
          .replace(/-+/g, "-")
          .replace(/^-|-$/g, "");
        const optimizedFilename = `${safeName}.jpg`;
        const optimizedPath = path.join(OPTIMIZED_DIR, optimizedFilename);

        // 1. Optimize
        let optimizedBuffer;
        let sizeMB;

        if (fs.existsSync(optimizedPath)) {
          console.log("✨ Already optimized.");
          optimizedBuffer = fs.readFileSync(optimizedPath);
          sizeMB = (optimizedBuffer.length / (1024 * 1024)).toFixed(2);
        } else {
          console.log("✨ Optimizing...");
          const result = await optimizeImage(sourcePath, {
            maxSizeMB: 5,
            maxWidth: 2048,
          });
          optimizedBuffer = result.buffer;
          sizeMB = result.sizeMB;
          fs.writeFileSync(optimizedPath, optimizedBuffer);
        }

        console.log(`   Size: ${sizeMB}MB`);

        // 2. Upload to IPFS (Try, but fallback to local)
        console.log("cx Uploading to IPFS...");
        let ipfsUrl = "";
        const cid = await uploadToNFTStorage(optimizedBuffer);

        if (cid) {
          ipfsUrl = `ipfs://${cid}`;
          console.log(`✅ IPFS: ${ipfsUrl}`);
        } else {
          console.log("⚠️ IPFS upload failed. Using local fallback.");
          ipfsUrl = `/nfts-optimized/${optimizedFilename}`; // Local fallback
        }

        // 3. Create TinaCMS Content
        const title = filename.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
        const mdxContent = `---
title: "${title}"
artist: content/artists/robert-zielasco.mdx
price: 0.5
image_ipfs: "${ipfsUrl}"
is_listed: true
category: "Digital Art"
---

Original artwork by Robert Zielasco.
`;

        const contentPath = path.join(CONTENT_DIR, `${safeName}.mdx`);
        fs.writeFileSync(contentPath, mdxContent);
        console.log(`📝 Created content: ${contentPath}`);
      } catch (err) {
        console.error(`❌ Failed to process ${filename}:`, err);
      }
    }

    console.log("\n🎉 Migration complete!");
  } catch (err) {
    console.error("❌ Error scanning directory:", err);
  }
}

processLocalImages();
