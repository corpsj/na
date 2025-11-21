# Byunhwa 플로리스트 포트폴리오 웹사이트 기획서

## 📋 프로젝트 개요

**프로젝트명**: Byunhwa 플로리스트 포트폴리오
**목적**: 플로리스트 작품 전시 및 클래스 안내
**경로**: `/Users/zoopark/dev/byunhwa`

---

## 🎨 디자인 컨셉

### 스타일
- **Chic & Hip**: 20대 남성 플로리스트가 운영하는 힙하고 시크한 감성
- **Dark & Moody**: 블랙 배경을 기반으로 한 강렬하고 무게감 있는 분위기
- **Modern Noir**: 세련되고 도시적인 느낌, 여백의 미보다는 강렬한 대비 강조

### 색상 팔레트
| 구분 | 색상명 | Hex Code | 설명 |
| :--- | :--- | :--- | :--- |
| **Primary** | **Obsidian Black** | `#000000` | 전체 배경, 헤더, 푸터. 깊이감 있고 시크한 무드 조성 |
| **Secondary** | **Crimson Red** | `#8B0000` | 로고의 '花' 색상. 브랜드 아이덴티티, 강조 텍스트, 호버 효과 |
| **Text** | **Stark White** | `#FFFFFF` | 로고의 '變' 색상. 본문 텍스트, 타이틀. 블랙 위에서 선명한 대비 |
| **Accent** | **Charcoal Gray** | `#333333` | 카드 배경, 구분선, 서브 텍스트. 블랙과 조화되는 딥 그레이 |

### 타이포그래피
- **제목**: **Bold Serif** (예: Playfair Display, Bodoni) - 클래식하면서도 강렬한 인상
- **본문**: **Clean Sans-serif** (예: Pretendard, Helvetica Now) - 가독성 높고 모던한 느낌
- **포인트**: 손글씨 느낌의 영문 폰트 (서명 등)로 힙한 감성 더하기

---

## 🛠 기술 스택

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript

### Backend & Database (예정)
- **Database**: Supabase (무료 플랜)
- **Storage**: Supabase Storage (이미지 업로드)
- **Authentication**: 비밀번호 기반 간단 인증

### Deployment
- **Hosting**: Vercel
- **Domain**: TBD

---

## 📂 사이트 구조

### 1. 홈 (`/`)
- 히어로 섹션 (브랜드명 + 소개)
- 대표 이미지
- 최근 작품 미리보기 (3개)
- 클래스 안내 미리보기 (2개)

### 2. 포트폴리오 (`/portfolio`)
- 카테고리별 필터링
  - 전체
  - 웨딩
  - 부케
  - 화환
  - 클래스작품
  - 기타
- 그리드 레이아웃 (3열)
- 이미지 클릭 시 확대/상세 보기

### 3. 클래스 (`/classes`)
- 진행 중인 클래스 목록
- 각 클래스 상세 정보
  - 제목, 설명
  - 일정
  - 소요시간
  - 수강료
  - 장소
- 신청하기 버튼
- 클래스 문의 섹션

### 4. About (`/about`)
- 플로리스트 소개
- 연락처 정보
  - Instagram: @bye.on.hwa
  - Email: contact@byunhwa.com
  - Tel: 010-4086-6231
- 위치 정보 (선택)

### 5. 관리자 페이지 (`/admin`)
- 로그인 페이지
- 포트폴리오 관리
  - 작품 등록/수정/삭제
  - 이미지 업로드
  - 카테고리 지정
  - 순서 변경
- 클래스 관리
  - 클래스 등록/수정/삭제
  - 활성화/비활성화
  - 일정 관리

---

## 💾 데이터 구조

### Portfolio 테이블
```typescript
interface Portfolio {
  id: string;
  title: string;
  category: '웨딩' | '부케' | '화환' | '클래스작품' | '기타';
  image_url: string;
  description?: string;
  order: number;
  created_at: Date;
}
```

### Classes 테이블
```typescript
interface Class {
  id: string;
  title: string;
  description: string;
  long_description: string;
  image_url: string;
  schedules: string[];
  duration: string;
  price: number;
  location: string;
  is_active: boolean;
  created_at: Date;
}
```

---

## 🎯 주요 기능

### 사용자 기능
- ✅ 포트폴리오 갤러리 보기
- ✅ 카테고리별 필터링
- ✅ 클래스 정보 확인
- ✅ 클래스 신청 (외부 링크 또는 내부 폼)
- ✅ 반응형 디자인 (모바일/태블릿/데스크탑)

### 관리자 기능
- ✅ 콘텐츠 직접 관리
- ✅ 이미지 업로드/삭제
- ✅ 포트폴리오 작품 CRUD
- ✅ 클래스 정보 CRUD
- ✅ 비밀번호 인증

---

## 📅 개발 단계

### Phase 1: 디자인 목업
- [ ] 홈페이지
- [ ] 포트폴리오 페이지
- [ ] 클래스 페이지
- [ ] About 페이지

### Phase 2: 기본 구조
- [ ] 공통 컴포넌트 분리 (Header, Footer, Button 등)
- [ ] 레이아웃 최적화
- [ ] 반응형 디자인 완성

### Phase 3: 데이터베이스 연동
- [ ] Supabase 프로젝트 설정
- [ ] 테이블 생성 및 관계 설정
- [ ] 이미지 스토리지 설정
- [ ] API 라우트 생성

### Phase 4: 관리자 페이지
- [ ] 인증 시스템 구축
- [ ] 포트폴리오 관리 페이지
- [ ] 클래스 관리 페이지
- [ ] 이미지 업로드 기능

### Phase 5: 최적화 & 배포
- [ ] SEO 최적화
- [ ] 이미지 최적화
- [ ] 성능 최적화
- [ ] Vercel 배포

---

## 📝 참고사항

- 관리자 페이지를 통해 콘텐츠를 직접 관리 가능하도록 구성
- 모바일 우선 반응형 디자인
- 이미지 품질 중요 (플로리스트 작품 포트폴리오)
- 로딩 속도 최적화 필요

---

## 🔗 연락처

- **Instagram**: [@bye.on.hwa](https://instagram.com/bye.on.hwa)
- **Email**: hoss0225@naver.com
- **Tel**: 010-4086-6231

---

*Last updated: 2025-11-21*
