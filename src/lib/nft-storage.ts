import { NFTStorage, File, Blob } from "nft.storage";

const NFT_STORAGE_TOKEN = process.env.NFT_STORAGE_API_KEY!;

// Helper to check if token is configured
export const isNFTStorageConfigured = () => !!NFT_STORAGE_TOKEN;

const getClient = () => {
  if (!NFT_STORAGE_TOKEN) {
    throw new Error("NFT_STORAGE_API_KEY is not configured in .env");
  }
  return new NFTStorage({ token: NFT_STORAGE_TOKEN });
};

export interface NFTMetadata {
  name: string;
  description: string;
  image?: string;
  properties?: Record<string, any>;
  attributes?: Array<{ trait_type: string; value: string | number }>;
}

export interface UploadResult {
  imageCID: string;
  metadataCID: string;
  imageURL: string;
  metadataURL: string;
  gatewayURL: string;
}

/**
 * Upload an NFT image and metadata to IPFS via NFT.Storage (FREE)
 */
export async function uploadNFTToIPFS(
  imageFile: File | Blob,
  metadata: NFTMetadata
): Promise<UploadResult> {
  const client = getClient();

  try {
    console.log("📤 Uploading image to IPFS...");

    // 1. Upload image blob directly to get CID
    const imageCID = await client.storeBlob(imageFile);
    const imageIPFS = `ipfs://${imageCID}`;
    const imageGateway = `https://nftstorage.link/ipfs/${imageCID}`;

    console.log(`✅ Image uploaded: ${imageIPFS}`);

    // 2. Create ERC-721 compatible metadata
    const nftMetadata = {
      name: metadata.name,
      description: metadata.description,
      image: imageIPFS, // Standard requires ipfs:// URI
      properties: {
        ...metadata.properties,
        image_gateway: imageGateway, // Helpful for frontend
      },
      attributes: metadata.attributes || [],
    };

    console.log("📤 Uploading metadata to IPFS...");

    // 3. Upload metadata JSON
    const metadataBlob = new Blob([JSON.stringify(nftMetadata)], {
      type: "application/json",
    });
    const metadataCID = await client.storeBlob(metadataBlob);
    const metadataIPFS = `ipfs://${metadataCID}`;

    console.log(`✅ Metadata uploaded: ${metadataIPFS}`);

    return {
      imageCID: imageIPFS,
      metadataCID: metadataIPFS,
      imageURL: imageIPFS,
      metadataURL: metadataIPFS,
      gatewayURL: `https://nftstorage.link/ipfs/${metadataCID}`,
    };
  } catch (error) {
    console.error("❌ IPFS upload failed:", error);
    throw error;
  }
}

/**
 * Convert IPFS URI to HTTP gateway URL
 */
export function ipfsToHTTP(ipfsURI: string): string {
  if (!ipfsURI) return "";
  if (ipfsURI.startsWith("http")) return ipfsURI;

  // Handle ipfs:// prefix
  const cid = ipfsURI.replace("ipfs://", "");
  return `https://nftstorage.link/ipfs/${cid}`;
}
