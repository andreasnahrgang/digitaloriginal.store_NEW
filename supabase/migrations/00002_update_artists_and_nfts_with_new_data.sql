/*
# Update Artists and NFTs with New Data

## Overview
This migration updates the existing sample data with real artist information:
- Replaces sample artists with Robert Zielasco and digitalgandhi
- Updates NFTs with new titles and artist attributions
- Maintains database structure while refreshing content

## Changes
1. Delete existing sample data
2. Add Robert Zielasco artist profile with bio from official website
3. Add digitalgandhi artist profile
4. Update NFTs with new titles and artist relationships

## Artist Information
- Robert Zielasco: Vienna-based painter, born 1948, studied at Kunstakademie Wien
- digitalgandhi: Digital artist

## NFTs
- 3 NFTs by Robert Zielasco
- 2 NFTs by digitalgandhi
*/

-- Delete existing NFTs first (due to foreign key constraints)
DELETE FROM nfts;

-- Delete existing artists
DELETE FROM artists;

-- Insert Robert Zielasco
INSERT INTO artists (id, name, bio, profile_image, wallet_address, website, created_at, updated_at)
VALUES (
  'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d',
  'Robert Zielasco',
  'Robert Zielasco (*1948, Vienna) studied at the Kunstakademie Wien under Prof. Eckert from 1967-1972. He received a Rome scholarship in 1978/79 and the Theodor Körner Prize in 1979. After travels to India and East Asia in 1980-81, he has been living and working in Vienna since 1982. His philosophy: "Art makes alive, is like breath, is an organism. It is not luxury but a necessity that makes inner realities visible and releases them. Thus an affirmation of the living. Art is surface and depth - I reach for the colors until the unexpected arrives."',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
  '0x1234567890123456789012345678901234567890',
  'https://www.zielasco.at',
  NOW(),
  NOW()
);

-- Insert digitalgandhi
INSERT INTO artists (id, name, bio, profile_image, wallet_address, website, created_at, updated_at)
VALUES (
  'b2c3d4e5-f6a7-4b5c-9d0e-1f2a3b4c5d6e',
  'digitalgandhi',
  'digitalgandhi is a contemporary digital artist exploring themes of public space, performance, and digital identity through provocative and thought-provoking visual art.',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
  '0x2345678901234567890123456789012345678901',
  NULL,
  NOW(),
  NOW()
);

-- Insert Robert Zielasco NFTs
INSERT INTO nfts (id, title, description, artist_id, image_url, ipfs_hash, price, token_id, contract_address, is_listed, file_size, created_at, updated_at)
VALUES 
(
  'c3d4e5f6-a7b8-4c5d-0e1f-2a3b4c5d6e7f',
  'Robert Zielasco 1',
  'A captivating work by Vienna-based painter Robert Zielasco, showcasing his unique approach to color and form. This piece reflects his philosophy that art makes inner realities visible.',
  'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d',
  'https://images.unsplash.com/photo-1549887534-1541e9326642?w=800&h=800&fit=crop',
  'QmRobertZielasco1Hash',
  1.2,
  'RZ001',
  '0xABCDEF1234567890',
  true,
  2048000,
  NOW(),
  NOW()
),
(
  'd4e5f6a7-b8c9-4d5e-1f2a-3b4c5d6e7f8a',
  'Robert Zielasco 2',
  'Another masterpiece from Robert Zielasco''s collection. His work speaks for itself, revealing the unexpected through layers of color and depth.',
  'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d',
  'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=800&fit=crop',
  'QmRobertZielasco2Hash',
  1.5,
  'RZ002',
  '0xABCDEF1234567890',
  true,
  2304000,
  NOW(),
  NOW()
),
(
  'e5f6a7b8-c9d0-4e5f-2a3b-4c5d6e7f8a9b',
  'Robert Zielasco 3',
  'A stunning piece that embodies Zielasco''s artistic vision. This work demonstrates his belief that art is not luxury but a necessity that affirms the living.',
  'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d',
  'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800&h=800&fit=crop',
  'QmRobertZielasco3Hash',
  1.8,
  'RZ003',
  '0xABCDEF1234567890',
  true,
  2560000,
  NOW(),
  NOW()
);

-- Insert digitalgandhi NFTs
INSERT INTO nfts (id, title, description, artist_id, image_url, ipfs_hash, price, token_id, contract_address, is_listed, file_size, created_at, updated_at)
VALUES 
(
  'f6a7b8c9-d0e1-4f5a-3b4c-5d6e7f8a9b0c',
  'public naked pushup1',
  'A bold and provocative piece by digitalgandhi exploring themes of vulnerability, public space, and performance art in the digital age.',
  'b2c3d4e5-f6a7-4b5c-9d0e-1f2a3b4c5d6e',
  'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=800&h=800&fit=crop',
  'QmDigitalGandhi1Hash',
  0.8,
  'DG001',
  '0xDEF1234567890ABC',
  true,
  1792000,
  NOW(),
  NOW()
),
(
  'a7b8c9d0-e1f2-4a5b-4c5d-6e7f8a9b0c1d',
  'public naked pushup2',
  'The second piece in digitalgandhi''s provocative series, challenging conventional boundaries between public and private, physical and digital.',
  'b2c3d4e5-f6a7-4b5c-9d0e-1f2a3b4c5d6e',
  'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&h=800&fit=crop',
  'QmDigitalGandhi2Hash',
  0.9,
  'DG002',
  '0xDEF1234567890ABC',
  true,
  1920000,
  NOW(),
  NOW()
);