export interface Artist {
  id: string;
  name: string;
  bio: string | null;
  profile_image: string | null;
  wallet_address: string | null;
  website: string | null;
  social_links: Record<string, string>;
  created_at: string;
  updated_at: string;
}

export interface NFT {
  id: string;
  title: string;
  description: string | null;
  artist_id: string | null;
  image_url: string;
  ipfs_hash: string | null;
  price: number | null;
  token_id: string | null;
  contract_address: string | null;
  is_listed: boolean;
  metadata: Record<string, unknown>;
  file_size: number | null;
  created_at: string;
  updated_at: string;
}

export interface NFTWithArtist extends NFT {
  artist: Artist | null;
}
