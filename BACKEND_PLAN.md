# Byunhwa 백엔드 아키텍처 계획서

## 📋 개요

- **데이터베이스**: Supabase (PostgreSQL)
- **스토리지**: Supabase Storage
- **인증**: Supabase Auth (관리자 전용)
- **배포**: Vercel
- **API**: Next.js App Router API Routes

---

## 🗄️ 데이터베이스 스키마

### 1. `portfolios` 테이블

```sql
CREATE TABLE portfolios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  category VARCHAR(50) NOT NULL CHECK (category IN ('웨딩', '부케', '화환', '클래스작품', '기타')),
  image_url TEXT NOT NULL,
  description TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 인덱스
CREATE INDEX idx_portfolios_category ON portfolios(category);
CREATE INDEX idx_portfolios_display_order ON portfolios(display_order);
CREATE INDEX idx_portfolios_created_at ON portfolios(created_at DESC);
```

**TypeScript 인터페이스**:
```typescript
export interface Portfolio {
  id: string;
  title: string;
  category: '웨딩' | '부케' | '화환' | '클래스작품' | '기타';
  image_url: string;
  description?: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}
```

---

### 2. `classes` 테이블

```sql
CREATE TABLE classes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  subtitle VARCHAR(255),
  category VARCHAR(100),
  level VARCHAR(100),
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
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

-- 인덱스
CREATE INDEX idx_classes_is_active ON classes(is_active);
CREATE INDEX idx_classes_created_at ON classes(created_at DESC);
```

**JSONB 필드 구조**:
```typescript
// curriculum
{
  step: string;      // "01", "02", ...
  title: string;     // "Theory & Demo"
  content: string;   // 상세 설명
}[]

// policy
{
  refund: string;    // 환불 정책
  note: string;      // 유의사항
}

// bank_info
{
  bank: string;      // "Shinhan Bank"
  account: string;   // "110-123-456789"
  holder: string;    // "Byunhwa (Na HoSeong)"
}
```

**TypeScript 인터페이스**:
```typescript
export interface Class {
  id: string;
  title: string;
  subtitle?: string;
  category?: string;
  level?: string;
  description: string;
  image_url: string;
  location: string;
  duration: string;
  price: number;
  price_display: string;
  capacity?: string;
  curriculum?: ClassCurriculum[];
  policy?: ClassPolicy;
  bank_info?: BankInfo;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ClassCurriculum {
  step: string;
  title: string;
  content: string;
}

export interface ClassPolicy {
  refund: string;
  note: string;
}

export interface BankInfo {
  bank: string;
  account: string;
  holder: string;
}
```

---

### 3. `class_schedules` 테이블

클래스 일정은 별도 테이블로 관리하여 유연성 확보:

```sql
CREATE TABLE class_schedules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  schedule_date TIMESTAMPTZ NOT NULL,
  schedule_display VARCHAR(255) NOT NULL,  -- "12월 14일 (토) 14:00"
  available_seats INTEGER DEFAULT 6,
  is_available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 인덱스
CREATE INDEX idx_class_schedules_class_id ON class_schedules(class_id);
CREATE INDEX idx_class_schedules_date ON class_schedules(schedule_date);
```

**TypeScript 인터페이스**:
```typescript
export interface ClassSchedule {
  id: string;
  class_id: string;
  schedule_date: string;
  schedule_display: string;
  available_seats: number;
  is_available: boolean;
  created_at: string;
}
```

---

### 4. `orders` 테이블

클래스 신청 내역 관리:

```sql
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

-- 인덱스
CREATE INDEX idx_orders_class_id ON orders(class_id);
CREATE INDEX idx_orders_schedule_id ON orders(schedule_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);
```

**TypeScript 인터페이스**:
```typescript
export interface Order {
  id: string;
  class_id: string;
  schedule_id?: string;
  name: string;
  phone: string;
  email?: string;
  schedule_display: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  notes?: string;
  created_at: string;
  updated_at: string;
}
```

---

### 5. `admin_settings` 테이블 (선택 사항)

사이트 설정 및 연락처 정보:

```sql
CREATE TABLE admin_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key VARCHAR(100) UNIQUE NOT NULL,
  value TEXT,
  description TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 기본 데이터 삽입
INSERT INTO admin_settings (key, value, description) VALUES
  ('contact_instagram', '@bye.on.hwa', 'Instagram handle'),
  ('contact_email', 'hoss0225@naver.com', 'Contact email'),
  ('contact_phone', '010-4086-6231', 'Contact phone'),
  ('studio_location', 'Hannam-dong, Seoul', 'Studio location');
```

---

## 🔐 인증 시스템

### Supabase Auth 설정

**관리자 전용 인증 (간단한 방식)**:

1. **Supabase Auth 비활성화 옵션**: 단일 관리자만 사용하는 경우, 환경 변수에 비밀번호 저장
   ```env
   ADMIN_PASSWORD_HASH=<bcrypt_hash>
   ```

2. **Supabase Auth 사용 옵션** (권장): 향후 확장성을 고려
   - Email/Password 인증 활성화
   - 관리자 계정 1개만 생성
   - Row Level Security (RLS) 정책 설정

**RLS 정책 예시**:

```sql
-- 공개 읽기 권한 (portfolios, classes)
CREATE POLICY "Public can view active portfolios"
  ON portfolios FOR SELECT
  USING (true);

CREATE POLICY "Public can view active classes"
  ON classes FOR SELECT
  USING (is_active = true);

-- 관리자만 쓰기 권한
CREATE POLICY "Authenticated users can manage portfolios"
  ON portfolios FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage classes"
  ON classes FOR ALL
  USING (auth.role() = 'authenticated');
```

---

## 📦 Supabase Storage

### 버킷 구조

```
byunhwa-images/
├── portfolios/          # 포트폴리오 이미지
│   ├── {uuid}.jpg
│   └── {uuid}.webp
├── classes/             # 클래스 대표 이미지
│   ├── {uuid}.jpg
│   └── {uuid}.webp
└── temp/                # 임시 업로드 (24시간 후 자동 삭제)
```

### Storage 정책

```sql
-- 공개 읽기
CREATE POLICY "Public can view images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'byunhwa-images');

-- 관리자만 업로드/삭제
CREATE POLICY "Authenticated users can upload images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'byunhwa-images'
    AND auth.role() = 'authenticated'
  );

CREATE POLICY "Authenticated users can delete images"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'byunhwa-images'
    AND auth.role() = 'authenticated'
  );
```

### 이미지 최적화 전략

1. **업로드 시**: Next.js API Route에서 Sharp 라이브러리로 리사이징
   - 원본: 최대 2000px
   - 썸네일: 600px
   - WebP 변환

2. **제공 시**: Next.js Image 컴포넌트 사용

---

## 🔌 API Routes 구조

### `/app/api` 디렉토리 구조

```
app/api/
├── admin/
│   ├── login/route.ts           # POST: 관리자 로그인
│   └── logout/route.ts          # POST: 로그아웃
├── portfolios/
│   ├── route.ts                 # GET: 목록 조회 / POST: 생성
│   └── [id]/route.ts            # GET: 상세 / PUT: 수정 / DELETE: 삭제
├── classes/
│   ├── route.ts                 # GET: 목록 조회 / POST: 생성
│   ├── [id]/route.ts            # GET: 상세 / PUT: 수정 / DELETE: 삭제
│   └── [id]/schedules/route.ts  # GET: 일정 조회 / POST: 일정 추가
├── orders/
│   ├── route.ts                 # GET: 목록 조회 / POST: 신청 생성
│   └── [id]/route.ts            # GET: 상세 / PATCH: 상태 업데이트
├── upload/
│   └── route.ts                 # POST: 이미지 업로드
└── settings/
    └── route.ts                 # GET: 설정 조회 / PUT: 설정 수정
```

### 주요 API 엔드포인트 명세

#### 1. Portfolio API

**GET `/api/portfolios`**
```typescript
// Query params: ?category=웨딩&limit=12&offset=0
Response: {
  data: Portfolio[];
  total: number;
}
```

**POST `/api/portfolios`** (인증 필요)
```typescript
Request: {
  title: string;
  category: string;
  image_url: string;
  description?: string;
  display_order?: number;
}
Response: { data: Portfolio }
```

**GET `/api/portfolios/[id]`**
```typescript
Response: { data: Portfolio }
```

**PUT `/api/portfolios/[id]`** (인증 필요)
```typescript
Request: Partial<Portfolio>
Response: { data: Portfolio }
```

**DELETE `/api/portfolios/[id]`** (인증 필요)
```typescript
Response: { success: boolean }
```

#### 2. Classes API

**GET `/api/classes`**
```typescript
// Query params: ?is_active=true
Response: {
  data: (Class & { schedules: ClassSchedule[] })[];
}
```

**POST `/api/classes`** (인증 필요)
```typescript
Request: Omit<Class, 'id' | 'created_at' | 'updated_at'>
Response: { data: Class }
```

**GET `/api/classes/[id]`**
```typescript
Response: {
  data: Class & { schedules: ClassSchedule[] }
}
```

**POST `/api/classes/[id]/schedules`** (인증 필요)
```typescript
Request: {
  schedule_date: string;
  schedule_display: string;
  available_seats?: number;
}
Response: { data: ClassSchedule }
```

#### 3. Orders API

**GET `/api/orders`** (인증 필요)
```typescript
// Query params: ?status=pending&limit=50
Response: {
  data: (Order & { class_title: string })[];
  total: number;
}
```

**POST `/api/orders`**
```typescript
Request: {
  class_id: string;
  schedule_id?: string;
  name: string;
  phone: string;
  email?: string;
  schedule_display: string;
  notes?: string;
}
Response: { data: Order }
```

**PATCH `/api/orders/[id]`** (인증 필요)
```typescript
Request: {
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
}
Response: { data: Order }
```

#### 4. Upload API

**POST `/api/upload`** (인증 필요)
```typescript
Request: FormData { file: File }
Response: {
  url: string;
  path: string;
}
```

---

## 🔧 Supabase 클라이언트 설정

### `/lib/supabase/client.ts`

```typescript
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

### `/lib/supabase/server.ts`

```typescript
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createClient() {
  const cookieStore = cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // Server Component에서 호출 시 에러 무시
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // Server Component에서 호출 시 에러 무시
          }
        },
      },
    }
  )
}
```

### `/lib/supabase/middleware.ts`

```typescript
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  await supabase.auth.getUser()

  return response
}
```

---

## 🌍 환경 변수 설정

### `.env.local` (개발 환경)

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Admin (선택 - Supabase Auth 미사용 시)
ADMIN_PASSWORD_HASH=$2b$10$...

# 기타
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Vercel 환경 변수

Vercel 대시보드에서 동일한 환경 변수 설정:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (민감 정보, 암호화)
- `NEXT_PUBLIC_SITE_URL` (Production URL)

---

## 📝 마이그레이션 전략

### 단계별 마이그레이션

#### Phase 1: Supabase 프로젝트 설정
- [ ] Supabase 프로젝트 생성
- [ ] 데이터베이스 테이블 생성 (SQL 실행)
- [ ] Storage 버킷 생성 및 정책 설정
- [ ] RLS 정책 적용
- [ ] Auth 설정 (관리자 계정 생성)

#### Phase 2: 클라이언트 라이브러리 구현
- [ ] Supabase 클라이언트 설정 (`lib/supabase/`)
- [ ] TypeScript 타입 정의 (`types/database.ts`)
- [ ] 유틸리티 함수 작성 (이미지 업로드, 에러 핸들링)

#### Phase 3: API Routes 구현
- [ ] Portfolios CRUD API
- [ ] Classes CRUD API
- [ ] Orders API
- [ ] Upload API
- [ ] Admin Auth API

#### Phase 4: 프론트엔드 연동
- [ ] Mock 데이터 제거
- [ ] API 호출로 대체
- [ ] 로딩/에러 상태 처리
- [ ] 이미지 업로드 UI 연동

#### Phase 5: 데이터 마이그레이션
- [ ] Mock 데이터를 Supabase로 이동
- [ ] 이미지 파일을 Supabase Storage로 업로드
- [ ] 데이터 검증

#### Phase 6: 테스트 및 배포
- [ ] 로컬 테스트
- [ ] Vercel Preview 배포
- [ ] Production 배포

---

## 🚀 Vercel 배포 설정

### `vercel.json` (선택 사항)

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["icn1"]
}
```

### 빌드 최적화

- **Image Optimization**: Vercel의 자동 이미지 최적화 활용
- **Edge Functions**: Supabase와 가까운 리전 선택 (서울: `icn1`)
- **Caching**: ISR(Incremental Static Regeneration) 활용

```typescript
// app/portfolio/page.tsx
export const revalidate = 3600; // 1시간마다 재생성
```

---

## 🔍 모니터링 & 로깅

### Supabase Dashboard
- Database 사용량 모니터링
- API 요청 로그
- Storage 용량 확인

### Vercel Analytics
- 페이지 성능 측정
- 사용자 트래픽 분석
- 빌드 시간 추적

---

## 📊 성능 최적화 전략

1. **Database Indexes**: 자주 조회되는 필드에 인덱스 생성 (완료)
2. **Connection Pooling**: Supabase의 기본 Pooler 사용
3. **Cache Strategy**:
   - Portfolio: ISR (1시간)
   - Classes: On-demand revalidation
   - Orders: Real-time (SSR)
4. **Image CDN**: Supabase Storage의 기본 CDN 활용

---

## 🔒 보안 고려사항

1. **환경 변수**: 민감 정보는 절대 코드에 포함 금지
2. **RLS 정책**: 모든 테이블에 적용
3. **Rate Limiting**: Vercel의 기본 Rate Limit + Supabase Edge Functions (필요 시)
4. **입력 검증**: Zod 스키마로 API 요청 검증
5. **CORS**: Next.js API Routes는 동일 도메인이므로 문제 없음
6. **SQL Injection**: Supabase 클라이언트의 파라미터화된 쿼리 사용

---

## 📚 참고 문서

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)
- [Vercel Deployment](https://vercel.com/docs/deployments/overview)
- [Supabase with Next.js](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)

---

*Last updated: 2025-11-22*
