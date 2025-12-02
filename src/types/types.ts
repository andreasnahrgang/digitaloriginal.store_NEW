export interface Artist {
  id: string;
  name: string;
  slug: string;
  bio: string;
  avatar_url: string;
  profile_image?: string; // Legacy/Optional
  wallet_address?: string; // Legacy/Optional
  website?: string;
  social_links?: {
    twitter?: string;
    instagram?: string;
  };
  created_at: string;
  updated_at?: string;
}

export interface NFT {
  id: string;
  title: string;
  description: string | null;
  artist_id: string | null;
  image_url: string;
  ipfs_hash: string | null;
  price: number | null;
  token_id?: string | null; // Legacy/Optional
  contract_address?: string | null; // Legacy/Optional
  is_listed: boolean;
  metadata?: Record<string, unknown>; // Legacy/Optional
  file_size?: number | null; // Legacy/Optional
  created_at: string;
  updated_at?: string; // Legacy/Optional
}

export interface NFTWithArtist extends NFT {
  artist: Artist | null;
}
