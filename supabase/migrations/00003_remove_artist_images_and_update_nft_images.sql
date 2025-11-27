/*
# Remove Artist Profile Images and Update NFT Images

## Overview
This migration removes artist profile images to display only text names,
and updates NFT images with appropriate artwork images.

## Changes
1. Remove all artist profile images (set to NULL)
2. Update NFT images for Robert Zielasco artworks
3. Update NFT images for digitalgandhi artworks

## Rationale
- Display only artist names as text (no profile pictures)
- Use appropriate images for the actual artworks
- Maintain clean, gallery-like aesthetic
*/

-- Remove artist profile images (display only text names)
UPDATE artists SET profile_image = NULL WHERE name = 'Robert Zielasco';
UPDATE artists SET profile_image = NULL WHERE name = 'digitalgandhi';

-- Update Robert Zielasco NFT images with abstract paintings
UPDATE nfts 
SET image_url = 'https://miaoda-site-img.s3cdn.medo.dev/images/e89d775c-d033-430c-a14a-275820993343.jpg'
WHERE title = 'Robert Zielasco 1';

UPDATE nfts 
SET image_url = 'https://miaoda-site-img.s3cdn.medo.dev/images/fb22b552-0c0a-4025-8697-1e02d49315b4.jpg'
WHERE title = 'Robert Zielasco 2';

UPDATE nfts 
SET image_url = 'https://miaoda-site-img.s3cdn.medo.dev/images/b879e077-37d7-4445-9b08-85cc7a2cf8f9.jpg'
WHERE title = 'Robert Zielasco 3';

-- Update digitalgandhi NFT images with performance art
UPDATE nfts 
SET image_url = 'https://miaoda-site-img.s3cdn.medo.dev/images/d523b75b-dac8-41e2-8705-6b09e63a5d15.jpg'
WHERE title = 'public naked pushup1';

UPDATE nfts 
SET image_url = 'https://miaoda-site-img.s3cdn.medo.dev/images/34b799de-4b98-4c79-8f10-70b90c316a8c.jpg'
WHERE title = 'public naked pushup2';