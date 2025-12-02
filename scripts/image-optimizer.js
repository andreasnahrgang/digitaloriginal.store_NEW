const sharp = require("sharp");
const fs = require("fs").promises;
const path = require("path");

/**
 * Optimize an image to meet size constraints
 * Reduces quality incrementally until under size limit
 */
async function optimizeImage(input, options = {}) {
  const {
    maxSizeMB = 5,
    maxWidth = 2048,
    maxHeight = 2048,
    quality: initialQuality = 90,
    format = "jpeg",
  } = options;

  const maxBytes = maxSizeMB * 1024 * 1024;
  let quality = initialQuality;
  let output;
  let metadata;

  // Load image
  let image = sharp(input);
  metadata = await image.metadata();

  // Resize if needed
  if (
    (metadata.width && metadata.width > maxWidth) ||
    (metadata.height && metadata.height > maxHeight)
  ) {
    image = image.resize(maxWidth, maxHeight, {
      fit: "inside",
      withoutEnlargement: true,
    });
  }

  // Try different quality levels
  while (quality > 10) {
    if (format === "jpeg") {
      output = await image.jpeg({ quality }).toBuffer();
    } else if (format === "webp") {
      output = await image.webp({ quality }).toBuffer();
    } else {
      output = await image.png({ compressionLevel: 9 }).toBuffer();
      break; // PNG doesn't have quality, just compression
    }

    if (output.length <= maxBytes) break;
    quality -= 5;
  }

  // Get final metadata
  const finalMetadata = await sharp(output).metadata();

  return {
    buffer: output,
    sizeMB: parseFloat((output.length / (1024 * 1024)).toFixed(2)),
    width: finalMetadata.width || 0,
    height: finalMetadata.height || 0,
    format: finalMetadata.format || format,
  };
}

/**
 * Batch optimize all images in a directory
 */
async function optimizeDirectory(inputDir, outputDir, options = {}) {
  // Create output directory
  await fs.mkdir(outputDir, { recursive: true });

  // Get all image files
  const files = await fs.readdir(inputDir);
  const imageFiles = files.filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f));

  console.log(`📸 Found ${imageFiles.length} images to optimize`);

  for (const file of imageFiles) {
    const inputPath = path.join(inputDir, file);
    const outputName = file.replace(/\.\w+$/, ".jpg");
    const outputPath = path.join(outputDir, outputName);

    try {
      const result = await optimizeImage(inputPath, options);
      await fs.writeFile(outputPath, result.buffer);

      console.log(
        `✓ ${file} → ${result.sizeMB}MB (${result.width}x${result.height}, quality optimized)`
      );
    } catch (error) {
      console.error(`✗ Failed to optimize ${file}:`, error);
    }
  }

  console.log("✅ Optimization complete!");
}

module.exports = { optimizeDirectory, optimizeImage };
