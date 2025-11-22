-- Byunhwa Initial Database Schema
-- Created: 2025-11-22

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- 1. PORTFOLIOS TABLE
-- =====================================================
CREATE TABLE portfolios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  category VARCHAR(50) NOT NULL CHECK (category IN ('웨딩', '부케', '화환', '클래스작품', '기타')),
  image_url TEXT NOT NULL,
  image_urls JSONB,
  description TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Portfolios Indexes
CREATE INDEX idx_portfolios_category ON portfolios(category);
CREATE INDEX idx_portfolios_display_order ON portfolios(display_order);
CREATE INDEX idx_portfolios_created_at ON portfolios(created_at DESC);

-- Portfolios RLS Policies
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;

-- Public can view all portfolios
CREATE POLICY "Public can view portfolios"
  ON portfolios FOR SELECT
  USING (true);

-- Authenticated users (admin) can do everything
CREATE POLICY "Authenticated users can insert portfolios"
  ON portfolios FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update portfolios"
  ON portfolios FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete portfolios"
  ON portfolios FOR DELETE
  USING (auth.role() = 'authenticated');

-- =====================================================
-- 2. CLASSES TABLE
-- =====================================================
CREATE TABLE classes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  subtitle VARCHAR(255),
  category VARCHAR(100),
  level VARCHAR(100),
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  image_urls JSONB,
  location VARCHAR(255) NOT NULL,
  duration VARCHAR(100) NOT NULL,
  price INTEGER NOT NULL,
  price_display VARCHAR(100) NOT NULL,
  capacity VARCHAR(100),
  curriculum JSONB,
  policy JSONB,
  bank_info JSONB,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Classes Indexes
CREATE INDEX idx_classes_is_active ON classes(is_active);
CREATE INDEX idx_classes_created_at ON classes(created_at DESC);

-- Classes RLS Policies
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;

-- Public can view active classes
CREATE POLICY "Public can view active classes"
  ON classes FOR SELECT
  USING (is_active = true);

-- Authenticated users can view all classes
CREATE POLICY "Authenticated users can view all classes"
  ON classes FOR SELECT
  USING (auth.role() = 'authenticated');

-- Authenticated users can manage classes
CREATE POLICY "Authenticated users can insert classes"
  ON classes FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update classes"
  ON classes FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete classes"
  ON classes FOR DELETE
  USING (auth.role() = 'authenticated');

-- =====================================================
-- 3. CLASS_SCHEDULES TABLE
-- =====================================================
CREATE TABLE class_schedules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  schedule_date TIMESTAMPTZ NOT NULL,
  schedule_display VARCHAR(255) NOT NULL,
  available_seats INTEGER DEFAULT 6,
  is_available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Class Schedules Indexes
CREATE INDEX idx_class_schedules_class_id ON class_schedules(class_id);
CREATE INDEX idx_class_schedules_date ON class_schedules(schedule_date);
CREATE INDEX idx_class_schedules_available ON class_schedules(is_available);

-- Class Schedules RLS Policies
ALTER TABLE class_schedules ENABLE ROW LEVEL SECURITY;

-- Public can view available schedules
CREATE POLICY "Public can view available schedules"
  ON class_schedules FOR SELECT
  USING (is_available = true);

-- Authenticated users can manage schedules
CREATE POLICY "Authenticated users can view all schedules"
  ON class_schedules FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert schedules"
  ON class_schedules FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update schedules"
  ON class_schedules FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete schedules"
  ON class_schedules FOR DELETE
  USING (auth.role() = 'authenticated');

-- =====================================================
-- 4. ORDERS TABLE
-- =====================================================
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id UUID NOT NULL REFERENCES classes(id),
  schedule_id UUID REFERENCES class_schedules(id),
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(255),
  schedule_display VARCHAR(255) NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Orders Indexes
CREATE INDEX idx_orders_class_id ON orders(class_id);
CREATE INDEX idx_orders_schedule_id ON orders(schedule_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);

-- Orders RLS Policies
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Only authenticated users (admin) can view and manage orders
CREATE POLICY "Authenticated users can view orders"
  ON orders FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Anyone can insert orders"
  ON orders FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update orders"
  ON orders FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete orders"
  ON orders FOR DELETE
  USING (auth.role() = 'authenticated');

-- =====================================================
-- 5. ADMIN_SETTINGS TABLE
-- =====================================================
CREATE TABLE admin_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key VARCHAR(100) UNIQUE NOT NULL,
  value TEXT,
  description TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Admin Settings RLS Policies
ALTER TABLE admin_settings ENABLE ROW LEVEL SECURITY;

-- Public can view settings
CREATE POLICY "Public can view settings"
  ON admin_settings FOR SELECT
  USING (true);

-- Only authenticated users can manage settings
CREATE POLICY "Authenticated users can manage settings"
  ON admin_settings FOR ALL
  USING (auth.role() = 'authenticated');

-- Insert default settings
INSERT INTO admin_settings (key, value, description) VALUES
  ('contact_instagram', '@bye.on.hwa', 'Instagram handle'),
  ('contact_email', 'hoss0225@naver.com', 'Contact email'),
  ('contact_phone', '010-4086-6231', 'Contact phone number'),
  ('studio_location', 'Hannam-dong, Seoul', 'Studio location');

-- =====================================================
-- 6. FUNCTIONS AND TRIGGERS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply update_updated_at trigger to relevant tables
CREATE TRIGGER update_portfolios_updated_at
  BEFORE UPDATE ON portfolios
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_classes_updated_at
  BEFORE UPDATE ON classes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admin_settings_updated_at
  BEFORE UPDATE ON admin_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- 7. STORAGE BUCKET SETUP (Run in Supabase Dashboard)
-- =====================================================

-- Storage bucket for images (run this in Supabase SQL Editor or Dashboard)
-- Note: Storage buckets are created via Supabase Dashboard or Storage API
-- This is a reference for the bucket structure:

/*
Bucket name: byunhwa-images
Public: true
File size limit: 5MB
Allowed MIME types: image/jpeg, image/png, image/webp

Folders:
- portfolios/
- classes/
- temp/
*/
