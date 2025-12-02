const fs = require("fs");
const https = require("https");
const path = require("path");

// List of images from the live site (I will need to extract these from the site or user input)
// For now, I'll create a script that can download a list of URLs
const imagesToDownload = [
  // Add URLs here after I inspect the site or user provides them
];

async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        res
          .pipe(fs.createWriteStream(filepath))
          .on("error", reject)
          .once("close", () => resolve(filepath));
      } else {
        res.resume();
        reject(
          new Error(`Request Failed With a Status Code: ${res.statusCode}`)
        );
      }
    });
  });
}

// Placeholder for now
console.log("Ready to download images once URLs are provided");
