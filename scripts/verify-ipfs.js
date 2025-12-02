require("dotenv").config({ path: ".env" });
const { NFTStorage, Blob } = require("nft.storage");
const fs = require("fs");

async function testUpload() {
  const apiKey = process.env.NFT_STORAGE_API_KEY;
  if (!apiKey) {
    console.error("❌ Error: NFT_STORAGE_API_KEY not found in .env");
    process.exit(1);
  }

  console.log("🔑 API Key found, initializing client...");
  const client = new NFTStorage({ token: apiKey });

  try {
    console.log("📤 Uploading test file to IPFS...");
    const data = await fs.promises.readFile("test-upload.txt");
    const cid = await client.storeBlob(new Blob([data]));

    console.log(`✅ Success! File uploaded to IPFS.`);
    console.log(`📝 CID: ${cid}`);
    console.log(`🔗 Gateway URL: https://nftstorage.link/ipfs/${cid}`);

    // Cleanup
    fs.unlinkSync("test-upload.txt");
  } catch (error) {
    console.error("❌ Upload failed:", error);
    process.exit(1);
  }
}

testUpload();
