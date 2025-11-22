-- 1. Drop the existing check constraint
ALTER TABLE portfolios DROP CONSTRAINT IF EXISTS portfolios_category_check;

-- 2. Update existing data
UPDATE portfolios SET category = 'Wedding' WHERE category = '웨딩';
UPDATE portfolios SET category = 'Bouquet' WHERE category = '부케';
UPDATE portfolios SET category = 'Wreath' WHERE category = '화환';
UPDATE portfolios SET category = 'Class' WHERE category = '클래스작품';
UPDATE portfolios SET category = 'Others' WHERE category = '기타';

-- 3. Add new check constraint with English categories
ALTER TABLE portfolios ADD CONSTRAINT portfolios_category_check 
CHECK (category IN ('Wedding', 'Bouquet', 'Wreath', 'Class', 'Others'));
