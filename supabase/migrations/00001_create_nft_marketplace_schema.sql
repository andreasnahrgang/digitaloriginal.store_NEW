/*
# NFT Marketplace Database Schema

## Overview
This migration creates the core database structure for the NFT marketplace, including tables for artists, NFTs, and marketplace transactions.

## Tables

### 1. artists
Stores information about NFT creators and artists.
- `id` (uuid, primary key): Unique identifier for the artist
- `name` (text, required): Artist's display name
- `bio` (text): Artist biography
- `profile_image` (text): URL to artist's profile image
- `wallet_address` (text, unique): Blockchain wallet address
- `website` (text): Artist's website URL
- `social_links` (jsonb): Social media links (Twitter, Instagram, etc.)
- `created_at` (timestamptz): Record creation timestamp
- `updated_at` (timestamptz): Last update timestamp

### 2. nfts
Stores NFT metadata and marketplace information.
- `id` (uuid, primary key): Unique identifier for the NFT
- `title` (text, required): NFT title
- `description` (text): NFT description
- `artist_id` (uuid, foreign key): Reference to artists table
- `image_url` (text, required): URL to NFT image (IPFS or Supabase Storage)
- `ipfs_hash` (text): IPFS content hash
- `price` (numeric): NFT price in ETH
- `token_id` (text): Blockchain token ID
- `contract_address` (text): Smart contract address
- `is_listed` (boolean): Whether NFT is currently listed for sale
- `metadata` (jsonb): Additional metadata (attributes, properties, etc.)
- `file_size` (integer): File size in bytes
- `created_at` (timestamptz): Record creation timestamp
- `updated_at` (timestamptz): Last update timestamp

### 3. nft_images
Storage bucket for NFT images with 5MB limit.

## Security
- Public read access for all tables (marketplace is public)
- No RLS enabled (public marketplace)
- Artists and NFTs can be viewed by anyone
*/

-- Create artists table
CREATE TABLE IF NOT EXISTS artists (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  bio text,
  profile_image text,
  wallet_address text UNIQUE,
  website text,
  social_links jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create NFTs table
CREATE TABLE IF NOT EXISTS nfts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  artist_id uuid REFERENCES artists(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  ipfs_hash text,
  price numeric(20, 8),
  token_id text,
  contract_address text,
  is_listed boolean DEFAULT true,
  metadata jsonb DEFAULT '{}'::jsonb,
  file_size integer,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create storage bucket for NFT images
INSERT INTO storage.buckets (id, name, public, file_size_limit)
VALUES ('app-7uja2c23lczl_nft_images', 'app-7uja2c23lczl_nft_images', true, 5242880)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for public access
CREATE POLICY "Public read access for NFT images"
ON storage.objects FOR SELECT
USING (bucket_id = 'app-7uja2c23lczl_nft_images');

CREATE POLICY "Public upload access for NFT images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'app-7uja2c23lczl_nft_images');

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_nfts_artist_id ON nfts(artist_id);
CREATE INDEX IF NOT EXISTS idx_nfts_is_listed ON nfts(is_listed);
CREATE INDEX IF NOT EXISTS idx_nfts_created_at ON nfts(created_at DESC);

-- Insert sample artists
INSERT INTO artists (name, bio, wallet_address, profile_image) VALUES
('Digital Visionary', 'Creating immersive digital art experiences that blend technology and emotion.', '0x1234567890abcdef1234567890abcdef12345678', 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400'),
('Crypto Artist', 'Pioneering the intersection of blockchain and contemporary art.', '0xabcdef1234567890abcdef1234567890abcdef12', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400'),
('NFT Creator', 'Exploring new dimensions of digital ownership and artistic expression.', '0x9876543210fedcba9876543210fedcba98765432', 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400');

-- Insert sample NFTs
INSERT INTO nfts (title, description, artist_id, image_url, price, is_listed) VALUES
('Cyber Dreams #001', 'A journey through neon-lit digital landscapes', (SELECT id FROM artists WHERE name = 'Digital Visionary'), 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800', 0.5, true),
('Abstract Reality', 'Where code meets canvas in perfect harmony', (SELECT id FROM artists WHERE name = 'Crypto Artist'), 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800', 1.2, true),
('Digital Genesis', 'The birth of a new artistic paradigm', (SELECT id FROM artists WHERE name = 'NFT Creator'), 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800', 0.8, true),
('Quantum Flux', 'Capturing the essence of digital transformation', (SELECT id FROM artists WHERE name = 'Digital Visionary'), 'https://images.unsplash.com/photo-1618172193622-ae2d025f4032?w=800', 1.5, true),
('Neon Nights', 'Urban landscapes reimagined in vibrant digital hues', (SELECT id FROM artists WHERE name = 'Crypto Artist'), 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800', 0.9, true),
('Ethereal Visions', 'Transcending physical boundaries through art', (SELECT id FROM artists WHERE name = 'NFT Creator'), 'https://images.unsplash.com/photo-1620121692029-d088224ddc74?w=800', 2.0, true);