-- Byunhwa Initial Seed Data
-- 이 파일을 Supabase SQL Editor에서 실행하세요

-- =====================================================
-- 1. PORTFOLIO 샘플 데이터
-- =====================================================

INSERT INTO portfolios (title, category, image_url, description, display_order)
VALUES
  (
    '봄 웨딩 부케',
    'Wedding',
    'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2000&auto=format&fit=crop',
    '파스텔 톤의 봄꽃으로 제작한 로맨틱 웨딩 부케',
    1
  ),
  (
    '클래식 핸드타이 부케',
    'Bouquet',
    'https://images.unsplash.com/photo-1535398089889-dd807df1dfaa?q=80&w=2000&auto=format&fit=crop',
    '장미와 작약을 중심으로 한 클래식한 분위기의 부케',
    2
  ),
  (
    '축하 화환',
    'Wreath',
    'https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=2000&auto=format&fit=crop',
    '개업 및 기념일을 위한 화려한 스탠딩 화환',
    3
  ),
  (
    '가을 테이블 센터피스',
    'Class',
    'https://images.unsplash.com/photo-1503069190713-42eba0b9c6b4?q=80&w=2000&auto=format&fit=crop',
    '클래스 수강생이 제작한 가을 무드의 테이블 센터피스',
    4
  ),
  (
    '겨울 리스',
    'Class',
    'https://images.unsplash.com/photo-1544892504-5a42d285ab6f?q=80&w=2000&auto=format&fit=crop',
    '겨울 소재를 활용한 리스 제작 클래스 작품',
    5
  ),
  (
    '드라이플라워 스왑',
    'Others',
    'https://images.unsplash.com/photo-1487070183336-b863922373d4?q=80&w=2000&auto=format&fit=crop',
    '드라이플라워를 이용한 장식용 스왑',
    6
  );

-- =====================================================
-- 2. CLASS 데이터
-- =====================================================

-- 클래스 1: Winter Wreath Masterclass
INSERT INTO classes (
  title,
  subtitle,
  category,
  level,
  description,
  image_url,
  location,
  duration,
  price,
  price_display,
  capacity,
  curriculum,
  policy,
  bank_info,
  is_active
)
VALUES (
  'Winter Wreath Masterclass',
  '겨울의 무드를 담은 리스 제작',
  'One-day Class',
  'Beginner - Intermediate',
  '겨울의 차가운 공기와 따뜻한 실내의 온기가 만나는 계절, 겨울 소재들을 활용하여 공간에 계절감을 더해줄 리스를 제작합니다. 거친 질감의 소재들과 부드러운 잎들을 조화롭게 엮어내는 방법을 배웁니다.',
  'https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?q=80&w=2000&auto=format&fit=crop',
  'Byunhwa Studio, Hannam-dong',
  '14:00 - 16:30 (2.5h)',
  150000,
  '150,000 KRW',
  'Max 6 people',
  '[
    {
      "step": "01",
      "title": "Theory & Demo",
      "content": "리스 제작의 기초 이론 설명 및 소재 소개. 플로리스트의 데몬스트레이션."
    },
    {
      "step": "02",
      "title": "Conditioning",
      "content": "소재 컨디셔닝 및 와이어링 기법 실습. 리스 틀 준비."
    },
    {
      "step": "03",
      "title": "Arrangement",
      "content": "그린 소재를 베이스로 형태 잡기. 포인트 소재 배치 및 디자인 밸런스 조정."
    },
    {
      "step": "04",
      "title": "Finishing & Photo",
      "content": "마무리 점검 및 리본 장식. 작품 촬영 및 포장."
    }
  ]'::jsonb,
  '{
    "refund": "- 수업 7일 전: 100% 환불\n- 수업 3일 전: 50% 환불\n- 이후: 환불 불가",
    "note": "- 시장 상황에 따라 소재가 변경될 수 있습니다.\n- 수업 시작 10분 전까지 도착 부탁드립니다.\n- 꽃 알러지가 있으신 분은 미리 말씀해 주시기 바랍니다.\n- 수업 중 촬영된 사진은 포트폴리오로 활용될 수 있습니다."
  }'::jsonb,
  '{
    "bank": "Shinhan Bank",
    "account": "110-123-456789",
    "holder": "Byunhwa (Na HoSeong)"
  }'::jsonb,
  true
);

-- 클래스 2: Spring Bouquet Workshop (추가 샘플)
INSERT INTO classes (
  title,
  subtitle,
  category,
  level,
  description,
  image_url,
  location,
  duration,
  price,
  price_display,
  capacity,
  curriculum,
  policy,
  bank_info,
  is_active
)
VALUES (
  'Spring Bouquet Workshop',
  '봄꽃으로 만드는 핸드타이 부케',
  'One-day Class',
  'All Levels',
  '봄의 시작을 알리는 튤립, 라넌큘러스, 스위트피 등 봄꽃으로 나만의 부케를 만들어보는 클래스입니다. 핸드타이 기법의 기초부터 완성까지 차근차근 배워갑니다.',
  'https://images.unsplash.com/photo-1535398089889-dd807df1dfaa?q=80&w=2000&auto=format&fit=crop',
  'Byunhwa Studio, Hannam-dong',
  '11:00 - 13:30 (2.5h)',
  180000,
  '180,000 KRW',
  'Max 6 people',
  '[
    {
      "step": "01",
      "title": "Introduction",
      "content": "봄꽃 소개 및 색상 조합 이론. 핸드타이 부케의 특징 설명."
    },
    {
      "step": "02",
      "title": "Preparation",
      "content": "꽃 컨디셔닝 및 줄기 정리. 색상별 그룹핑."
    },
    {
      "step": "03",
      "title": "Hand-tied Technique",
      "content": "스파이럴 기법으로 부케 제작. 형태와 밸런스 잡기."
    },
    {
      "step": "04",
      "title": "Finishing",
      "content": "리본 마무리 및 포장. 관리 방법 안내."
    }
  ]'::jsonb,
  '{
    "refund": "- 수업 7일 전: 100% 환불\n- 수업 3일 전: 50% 환불\n- 이후: 환불 불가",
    "note": "- 시장 상황에 따라 소재가 변경될 수 있습니다.\n- 수업 시작 10분 전까지 도착 부탁드립니다.\n- 꽃 알러지가 있으신 분은 미리 말씀해 주시기 바랍니다.\n- 완성된 부케는 당일 가져가실 수 있습니다."
  }'::jsonb,
  '{
    "bank": "Shinhan Bank",
    "account": "110-123-456789",
    "holder": "Byunhwa (Na HoSeong)"
  }'::jsonb,
  true
);

-- =====================================================
-- 3. CLASS SCHEDULES 데이터
-- =====================================================

-- 먼저 방금 생성한 클래스들의 ID를 가져옵니다
-- Winter Wreath Masterclass 스케줄
INSERT INTO class_schedules (class_id, schedule_date, schedule_display, available_seats, is_available)
SELECT
  id,
  '2024-12-14 14:00:00+09'::timestamptz,
  '12월 14일 (토) 14:00',
  6,
  true
FROM classes
WHERE title = 'Winter Wreath Masterclass'
LIMIT 1;

INSERT INTO class_schedules (class_id, schedule_date, schedule_display, available_seats, is_available)
SELECT
  id,
  '2024-12-15 11:00:00+09'::timestamptz,
  '12월 15일 (일) 11:00',
  6,
  true
FROM classes
WHERE title = 'Winter Wreath Masterclass'
LIMIT 1;

INSERT INTO class_schedules (class_id, schedule_date, schedule_display, available_seats, is_available)
SELECT
  id,
  '2024-12-21 14:00:00+09'::timestamptz,
  '12월 21일 (토) 14:00',
  6,
  true
FROM classes
WHERE title = 'Winter Wreath Masterclass'
LIMIT 1;

-- Spring Bouquet Workshop 스케줄
INSERT INTO class_schedules (class_id, schedule_date, schedule_display, available_seats, is_available)
SELECT
  id,
  '2025-03-08 11:00:00+09'::timestamptz,
  '3월 8일 (토) 11:00',
  6,
  true
FROM classes
WHERE title = 'Spring Bouquet Workshop'
LIMIT 1;

INSERT INTO class_schedules (class_id, schedule_date, schedule_display, available_seats, is_available)
SELECT
  id,
  '2025-03-15 11:00:00+09'::timestamptz,
  '3월 15일 (토) 11:00',
  6,
  true
FROM classes
WHERE title = 'Spring Bouquet Workshop'
LIMIT 1;

INSERT INTO class_schedules (class_id, schedule_date, schedule_display, available_seats, is_available)
SELECT
  id,
  '2025-03-22 14:00:00+09'::timestamptz,
  '3월 22일 (토) 14:00',
  6,
  true
FROM classes
WHERE title = 'Spring Bouquet Workshop'
LIMIT 1;

-- =====================================================
-- 4. ORDERS 샘플 데이터 (테스트용)
-- =====================================================

-- Winter Wreath Masterclass 신청 샘플
INSERT INTO orders (class_id, schedule_id, name, phone, email, schedule_display, status, notes)
SELECT
  c.id,
  cs.id,
  'Kim Minji',
  '010-1234-5678',
  'minji@example.com',
  '12월 14일 (토) 14:00',
  'confirmed',
  '친구와 함께 참석 예정입니다.'
FROM classes c
JOIN class_schedules cs ON c.id = cs.class_id
WHERE c.title = 'Winter Wreath Masterclass'
  AND cs.schedule_display = '12월 14일 (토) 14:00'
LIMIT 1;

INSERT INTO orders (class_id, schedule_id, name, phone, email, schedule_display, status)
SELECT
  c.id,
  cs.id,
  'Lee Junho',
  '010-9876-5432',
  'junho@example.com',
  '12월 15일 (일) 11:00',
  'pending'
FROM classes c
JOIN class_schedules cs ON c.id = cs.class_id
WHERE c.title = 'Winter Wreath Masterclass'
  AND cs.schedule_display = '12월 15일 (일) 11:00'
LIMIT 1;

-- =====================================================
-- 확인 쿼리
-- =====================================================

-- 데이터가 정상적으로 삽입되었는지 확인
SELECT 'Portfolios inserted:' as info, COUNT(*) as count FROM portfolios
UNION ALL
SELECT 'Classes inserted:', COUNT(*) FROM classes
UNION ALL
SELECT 'Schedules inserted:', COUNT(*) FROM class_schedules
UNION ALL
SELECT 'Orders inserted:', COUNT(*) FROM orders
UNION ALL
SELECT 'Settings:', COUNT(*) FROM admin_settings;

-- 클래스와 스케줄 조인 확인
SELECT
  c.title,
  c.price_display,
  COUNT(cs.id) as schedule_count
FROM classes c
LEFT JOIN class_schedules cs ON c.id = cs.class_id
GROUP BY c.id, c.title, c.price_display
ORDER BY c.created_at;
