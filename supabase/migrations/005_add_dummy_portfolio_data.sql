-- 1. Update the category check constraint to match the frontend exactly
ALTER TABLE portfolios DROP CONSTRAINT IF EXISTS portfolios_category_check;

ALTER TABLE portfolios ADD CONSTRAINT portfolios_category_check
CHECK (category IN ('Flower', 'Planterior', 'Wedding', 'Pop-Up', 'Class', 'Others'));

-- 2. Insert Dummy Data (2 items per category) with Korean content and Real Unsplash Images
INSERT INTO portfolios (title, category, image_url, image_urls, description, display_order)
VALUES
-- Flower
('계절의 숨결 핸드타이드', 'Flower', 'https://images.unsplash.com/photo-1582794543139-8ac92a900275?q=80&w=800&auto=format&fit=crop', '["https://images.unsplash.com/photo-1582794543139-8ac92a900275?q=80&w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1563241527-3004b7be0ee9?q=80&w=800&auto=format&fit=crop"]', '봄의 따스함을 가득 담은 옐로우 톤의 핸드타이드입니다. 튤립과 프리지아를 메인으로 사용하여 생동감을 더했습니다.', 1),
('보랏빛 향기 꽃바구니', 'Flower', 'https://images.unsplash.com/photo-1606820854416-439b3305ff39?q=80&w=800&auto=format&fit=crop', '["https://images.unsplash.com/photo-1606820854416-439b3305ff39?q=80&w=800&auto=format&fit=crop"]', '우아한 무드의 리시안셔스와 스토크를 어레인지한 꽃바구니입니다. 차분하면서도 고급스러운 분위기를 연출하여 축하 선물로 좋습니다.', 2),

-- Planterior
('성수동 오피스 플랜테리어', 'Planterior', 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop', '["https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop"]', '삭막한 사무실 공간에 활력을 불어넣는 대형 관엽식물 배치 프로젝트입니다. 관리가 용이하고 공기 정화 효과가 뛰어난 식물들을 선정했습니다.', 3),
('한남동 주택 실내 조경', 'Planterior', 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=800&auto=format&fit=crop', '["https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=800&auto=format&fit=crop"]', '거실 한켠에 마련한 작은 실내 정원입니다. 잎의 질감이 다양한 식물들을 조화롭게 배치하여 사계절 내내 싱그러움을 느낄 수 있습니다.', 4),

-- Wedding
('채플 웨딩 메인 아치', 'Wedding', 'https://images.unsplash.com/photo-1519225421980-715cb0202128?q=80&w=800&auto=format&fit=crop', '["https://images.unsplash.com/photo-1519225421980-715cb0202128?q=80&w=800&auto=format&fit=crop"]', '순백의 수국과 장미를 풍성하게 사용하여 성스러운 분위기를 연출한 웨딩 아치입니다. 클래식하고 경건한 예식에 어울리는 디자인입니다.', 5),
('가든 웨딩 버진로드', 'Wedding', 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop', '["https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop"]', '자연스러운 들꽃 느낌의 소재들을 믹스하여 빈티지하고 로맨틱한 야외 웨딩을 스타일링했습니다. 바람에 흩날리는 듯한 라인감이 특징입니다.', 6),

-- Pop-Up
('코스메틱 브랜드 팝업', 'Pop-Up', 'https://images.unsplash.com/photo-1561542320-9a18cd340469?q=80&w=800&auto=format&fit=crop', '["https://images.unsplash.com/photo-1561542320-9a18cd340469?q=80&w=800&auto=format&fit=crop"]', '브랜드의 시그니처 컬러인 핑크를 메인으로 한 플라워 포토존 연출입니다. 화려한 색감으로 방문객들의 시선을 사로잡았습니다.', 7),
('백화점 시즌 디스플레이', 'Pop-Up', 'https://images.unsplash.com/photo-1508188683489-094d27f142a8?q=80&w=800&auto=format&fit=crop', '["https://images.unsplash.com/photo-1508188683489-094d27f142a8?q=80&w=800&auto=format&fit=crop"]', '가을 시즌을 맞아 팜파스와 갈대를 활용하여 깊이감 있는 공간을 연출했습니다. 고급스러운 오브제와 함께 배치하여 모던함을 더했습니다.', 8),

-- Class
('내추럴 핸드타이드 마스터', 'Class', 'https://images.unsplash.com/photo-1591271300850-22d6784e0a7f?q=80&w=800&auto=format&fit=crop', '["https://images.unsplash.com/photo-1591271300850-22d6784e0a7f?q=80&w=800&auto=format&fit=crop"]', '스파이럴 기법을 정확히 익히고, 소재의 질감을 살려 잡는 법을 배우는 심화 과정입니다. 플로리스트로서의 기본기를 다질 수 있습니다.', 9),
('겨울 리스 원데이 클래스', 'Class', 'https://images.unsplash.com/photo-1543589077-47d81606c1bf?q=80&w=800&auto=format&fit=crop', '["https://images.unsplash.com/photo-1543589077-47d81606c1bf?q=80&w=800&auto=format&fit=crop"]', '겨울 소재인 편백과 낙엽송을 이용하여 오랫동안 볼 수 있는 드라이 리스를 제작합니다. 연말 분위기를 내기에 좋은 수업입니다.', 10),

-- Others
('플라워 용돈 박스', 'Others', 'https://images.unsplash.com/photo-1592409050153-359425887540?q=80&w=800&auto=format&fit=crop', '["https://images.unsplash.com/photo-1592409050153-359425887540?q=80&w=800&auto=format&fit=crop"]', '부모님 생신 선물로 인기 있는 플라워 용돈 박스입니다. 붉은 카네이션과 장미로 감사의 마음을 표현했습니다.', 11),
('호텔 로비 화병 장식', 'Others', 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=800&auto=format&fit=crop', '["https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=800&auto=format&fit=crop"]', '호텔 로비에 비치된 대형 화병 장식입니다. 계절감을 느낄 수 있는 나뭇가지 소재를 활용하여 공간에 웅장함을 더했습니다.', 12);
