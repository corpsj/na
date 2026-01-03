-- Add image_urls column to portfolios and classes tables
-- Created: 2025-11-22

-- Add image_urls to portfolios table
ALTER TABLE portfolios
ADD COLUMN IF NOT EXISTS image_urls JSONB;

-- Add image_urls to classes table
ALTER TABLE classes
ADD COLUMN IF NOT EXISTS image_urls JSONB;

-- Create index for better performance on JSONB queries
CREATE INDEX IF NOT EXISTS idx_portfolios_image_urls ON portfolios USING GIN (image_urls);
CREATE INDEX IF NOT EXISTS idx_classes_image_urls ON classes USING GIN (image_urls);

-- Update existing records to have image_urls array with current image_url
UPDATE portfolios
SET image_urls = jsonb_build_array(image_url)
WHERE image_urls IS NULL AND image_url IS NOT NULL;

UPDATE classes
SET image_urls = jsonb_build_array(image_url)
WHERE image_urls IS NULL AND image_url IS NOT NULL;
