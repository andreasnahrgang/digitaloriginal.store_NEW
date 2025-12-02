require("dotenv").config({ path: ".env" });

const key = process.env.NFT_STORAGE_API_KEY;

if (!key) {
  console.log("❌ Key is MISSING");
} else {
  console.log(`✅ Key found. Length: ${key.length}`);
  console.log(`   Starts with: ${key.substring(0, 10)}...`);
  console.log(`   Ends with: ...${key.substring(key.length - 5)}`);
  console.log(`   Contains whitespace? ${/\s/.test(key)}`);
  console.log(`   Is JWT format? ${key.split(".").length === 3}`);
}
