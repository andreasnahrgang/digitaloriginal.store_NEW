import { client } from "@/lib/tina-client";
import type { Artist, NFT, NFTWithArtist } from "@/types/types";

// Helper to map TinaCMS response to our app types
const mapTinaNFT = (tinaNft: any): NFTWithArtist => {
  const node = tinaNft.node || tinaNft;
  return {
    id: node.id,
    title: node.title,
    description: node.body ? JSON.stringify(node.body) : "",
    price: node.price,
    image_url: node.image_ipfs, // We use IPFS url as image_url
    ipfs_hash: node.image_ipfs.replace("ipfs://", ""),
    artist_id: node.artist?.id || "",
    created_at: new Date().toISOString(), // Placeholder
    is_listed: node.is_listed,
    artist: node.artist
      ? {
          id: node.artist.id,
          name: node.artist.name,
          slug: node.artist.slug,
          avatar_url: node.artist.avatar,
          bio: node.artist.bio_short,
          created_at: new Date().toISOString(),
        }
      : null,
  };
};

export const nftApi = {
  async getAllNFTs(): Promise<NFTWithArtist[]> {
    try {
      const response = await client.queries.nftConnection();
      return response.data.nftConnection.edges?.map(mapTinaNFT) || [];
    } catch (error) {
      console.error("Error fetching NFTs from TinaCMS:", error);
      return [];
    }
  },

  async getNFTById(id: string): Promise<NFTWithArtist | null> {
    try {
      // TinaCMS IDs are file paths usually, but we might need to search by slug or filename
      // For now, let's assume we fetch all and find (optimization needed later)
      const response = await client.queries.nftConnection();
      const nfts = response.data.nftConnection.edges?.map(mapTinaNFT) || [];
      return (
        nfts.find(
          (n) => n.id === id || n.title.toLowerCase().replace(/ /g, "-") === id
        ) || null
      );
    } catch (error) {
      console.error("Error fetching NFT:", error);
      return null;
    }
  },

  async getFeaturedNFTs(limit = 6): Promise<NFTWithArtist[]> {
    const all = await this.getAllNFTs();
    return all.slice(0, limit);
  },

  async getNFTsByArtist(artistId: string): Promise<NFT[]> {
    const all = await this.getAllNFTs();
    return all.filter(
      (n) => n.artist?.id === artistId || n.artist?.slug === artistId
    );
  },

  // Write operations are now handled via TinaCMS Admin, so these return null/false
  async createNFT(nft: Partial<NFT>): Promise<NFT | null> {
    console.warn("createNFT is deprecated. Use TinaCMS Admin.");
    return null;
  },

  async updateNFT(id: string, updates: Partial<NFT>): Promise<NFT | null> {
    console.warn("updateNFT is deprecated. Use TinaCMS Admin.");
    return null;
  },

  async deleteNFT(id: string): Promise<boolean> {
    console.warn("deleteNFT is deprecated. Use TinaCMS Admin.");
    return false;
  },
};

export const artistApi = {
  async getAllArtists(): Promise<Artist[]> {
    try {
      const response = await client.queries.artistConnection();
      return (
        response.data.artistConnection.edges?.map((edge: any) => ({
          id: edge.node.id,
          name: edge.node.name,
          slug: edge.node.slug,
          avatar_url: edge.node.avatar,
          bio: edge.node.bio_short,
          created_at: new Date().toISOString(),
        })) || []
      );
    } catch (error) {
      console.error("Error fetching artists:", error);
      return [];
    }
  },

  async getArtistById(id: string): Promise<Artist | null> {
    try {
      const response = await client.queries.artistConnection();
      const artists =
        response.data.artistConnection.edges?.map((edge: any) => ({
          id: edge.node.id,
          name: edge.node.name,
          slug: edge.node.slug,
          avatar_url: edge.node.avatar,
          bio: edge.node.bio_short,
          created_at: new Date().toISOString(),
        })) || [];
      return artists.find((a: any) => a.id === id || a.slug === id) || null;
    } catch (error) {
      console.error("Error fetching artist:", error);
      return null;
    }
  },

  async createArtist(artist: Partial<Artist>): Promise<Artist | null> {
    console.warn("createArtist is deprecated. Use TinaCMS Admin.");
    return null;
  },

  async updateArtist(
    id: string,
    updates: Partial<Artist>
  ): Promise<Artist | null> {
    console.warn("updateArtist is deprecated. Use TinaCMS Admin.");
    return null;
  },
};
