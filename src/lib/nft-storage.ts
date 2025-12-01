import { NFTStorage, File, Blob } from "nft.storage";

const NFT_STORAGE_TOKEN = process.env.NFT_STORAGE_API_KEY!;

if (!NFT_STORAGE_TOKEN) {
  throw new Error(
    "NFT_STORAGE_API_KEY is required. Get one at https://nft.storage"
  );
}

const client = new NFTStorage({ token: NFT_STORAGE_TOKEN });

export interface NFTMetadata {
  name: string;
  description: string;
  artist: string;
  image?: string;
  properties?: Record<string, any>;
  attributes?: Array<{ trait_type: string; value: string | number }>;
}

export interface UploadResult {
  imageCID: string;
  metadataCID: string;
  imageURL: string;
  metadataURL: string;
}

/**
 * Upload an NFT image and metadata to IPFS via NFT.Storage (FREE)
 *
 * @param imageFile - The image file to upload
 * @param metadata - NFT metadata (ERC-721 compatible)
 * @returns IPFS CIDs and gateway URLs
 */
export async function uploadNFTToIPFS(
  imageFile: File | Blob,
  metadata: NFTMetadata
): Promise<UploadResult> {
  try {
    console.log("📤 Uploading image to IPFS...");

    // Upload image to IPFS
    const imageCID = await client.storeBlob(imageFile);
    const imageIPFS = `ipfs://${imageCID}`;

    console.log(`✅ Image uploaded: ${imageIPFS}`);

    // Create ERC-721 compatible metadata
    const nftMetadata = {
      name: metadata.name,
      description: metadata.description,
      image: imageIPFS,
      properties: {
        artist: metadata.artist,
        ...metadata.properties,
      },
      attributes: metadata.attributes || [],
    };

    console.log("📤 Uploading metadata to IPFS...");

    // Upload metadata JSON to IPFS
    const metadataBlob = new Blob([JSON.stringify(nftMetadata)], {
      type: "application/json",
    });
    const metadataCID = await client.storeBlob(metadataBlob);
    const metadataIPFS = `ipfs://${metadataCID}`;

    console.log(`✅ Metadata uploaded: ${metadataIPFS}`);

    return {
      imageCID: imageIPFS,
      metadataCID: metadataIPFS,
      imageURL: `https://nftstorage.link/ipfs/${imageCID}`,
      metadataURL: `https://nftstorage.link/ipfs/${metadataCID}`,
    };
  } catch (error) {
    console.error("❌ IPFS upload failed:", error);
    throw error;
  }
}

/**
 * Upload just an image to IPFS (for thumbnails, avatars, etc.)
 */
export async function uploadImageToIPFS(
  imageFile: File | Blob
): Promise<string> {
  try {
    const cid = await client.storeBlob(imageFile);
    return `ipfs://${cid}`;
  } catch (error) {
    console.error("❌ Image upload failed:", error);
    throw error;
  }
}

/**
 * Convert IPFS URI to HTTP gateway URL
 */
export function ipfsToHTTP(ipfsURI: string): string {
  if (!ipfsURI.startsWith("ipfs://")) {
    return ipfsURI;
  }

  const cid = ipfsURI.replace("ipfs://", "");
  return `https://nftstorage.link/ipfs/${cid}`;
}

/**
 * Check if NFT.Storage is properly configured
 */
export function checkNFTStorageConfig(): boolean {
  return !!NFT_STORAGE_TOKEN;
}
