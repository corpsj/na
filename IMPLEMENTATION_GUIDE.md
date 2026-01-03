# Byunhwa 백엔드 구현 완료 가이드

## ✅ 구현 완료 항목

다음 백엔드 구성요소가 구현되었습니다:

### 1. Supabase 클라이언트 설정
- ✅ `lib/supabase/client.ts` - 브라우저 클라이언트
- ✅ `lib/supabase/server.ts` - 서버 클라이언트
- ✅ `lib/supabase/middleware.ts` - 인증 미들웨어
- ✅ `middleware.ts` - Next.js 미들웨어 설정

### 2. TypeScript 타입 정의
- ✅ `types/database.ts` - 데이터베이스 스키마 타입

### 3. API Routes
- ✅ `/api/portfolios` - 포트폴리오 CRUD
- ✅ `/api/portfolios/[id]` - 포트폴리오 상세/수정/삭제
- ✅ `/api/classes` - 클래스 CRUD
- ✅ `/api/classes/[id]` - 클래스 상세/수정/삭제
- ✅ `/api/classes/[id]/schedules` - 클래스 일정 관리
- ✅ `/api/orders` - 주문 조회/생성
- ✅ `/api/orders/[id]` - 주문 상세/업데이트/삭제
- ✅ `/api/upload` - 이미지 업로드/삭제
- ✅ `/api/admin/login` - 관리자 로그인
- ✅ `/api/admin/logout` - 관리자 로그아웃
- ✅ `/api/admin/me` - 현재 사용자 정보

### 4. SQL 스크립트
- ✅ `supabase/migrations/001_initial_schema.sql` - 테이블 생성 및 RLS 정책
- ✅ `supabase/migrations/002_functions.sql` - 데이터베이스 함수

### 5. 설정 파일
- ✅ `.env.example` - 환경 변수 예시
- ✅ `package.json` - @supabase/ssr 패키지 추가
- ✅ `supabase/README.md` - Supabase 설정 가이드

---

## 🚀 다음 단계

### 1단계: 패키지 설치

```bash
npm install
```

새로 추가된 `@supabase/ssr` 패키지가 설치됩니다.

### 2단계: Supabase 프로젝트 설정

1. [Supabase Dashboard](https://app.supabase.com)에서 새 프로젝트 생성
2. Region은 **Northeast Asia (Seoul)** 선택
3. 프로젝트 생성 완료 대기

### 3단계: 데이터베이스 마이그레이션

**SQL Editor에서 실행:**

1. `supabase/migrations/001_initial_schema.sql` 내용 복사 → 실행
2. `supabase/migrations/002_functions.sql` 내용 복사 → 실행

**결과 확인:**
- Database > Tables에서 5개 테이블 확인
- Database > Functions에서 3개 함수 확인

### 4단계: Storage 버킷 생성

**Storage 메뉴에서:**

1. "Create a new bucket" 클릭
2. 설정:
   - Name: `byunhwa-images`
   - Public: ✅
   - File size limit: `5MB`
   - Allowed MIME types: `image/jpeg, image/png, image/webp`

3. 버킷 내 폴더 생성:
   - `portfolios/`
   - `classes/`
   - `temp/`

**Storage 정책 설정:**

Storage > Policies에서 "New Policy" 클릭하여 추가:

```sql
-- 1. Public Read
CREATE POLICY "Public can view images"
ON storage.objects FOR SELECT
USING (bucket_id = 'byunhwa-images');

-- 2. Authenticated Upload
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'byunhwa-images' AND auth.role() = 'authenticated');

-- 3. Authenticated Delete
CREATE POLICY "Authenticated users can delete"
ON storage.objects FOR DELETE
USING (bucket_id = 'byunhwa-images' AND auth.role() = 'authenticated');
```

### 5단계: 관리자 계정 생성

**Authentication > Users 메뉴에서:**

1. "Add user" → "Create new user" 클릭
2. 정보 입력:
   - Email: `admin@byunhwa.com` (원하는 이메일)
   - Password: 안전한 비밀번호
   - Auto Confirm User: ✅
3. "Create user" 클릭

### 6단계: 환경 변수 설정

**Supabase API Keys 복사:**

Settings > API에서 다음 값 복사:
- Project URL
- anon public key
- service_role key (⚠️ 주의: 절대 클라이언트에 노출 금지)

**`.env.local` 파일 생성:**

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
SUPABASE_SERVICE_ROLE_KEY=eyJhbG...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

⚠️ **중요**: `.env.local`은 `.gitignore`에 포함되어 있어 Git에 커밋되지 않습니다.

### 7단계: 로컬 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:3000` 접속

### 8단계: API 연결 테스트

브라우저 개발자 도구 콘솔에서 테스트:

```javascript
// 1. 포트폴리오 조회
fetch('/api/portfolios')
  .then(r => r.json())
  .then(console.log)

// 2. 클래스 조회
fetch('/api/classes')
  .then(r => r.json())
  .then(console.log)

// 3. 관리자 로그인 테스트
fetch('/api/admin/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'admin@byunhwa.com',
    password: 'your-password'
  })
})
  .then(r => r.json())
  .then(console.log)
```

---

## 📝 프론트엔드 통합 가이드

### 클라이언트 컴포넌트에서 Supabase 사용

```typescript
'use client'

import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import type { Portfolio } from '@/types/database'

export function PortfolioList() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([])
  const supabase = createClient()

  useEffect(() => {
    async function loadPortfolios() {
      const { data, error } = await supabase
        .from('portfolios')
        .select('*')
        .order('display_order')

      if (data) setPortfolios(data)
    }

    loadPortfolios()
  }, [])

  return (
    <div>
      {portfolios.map(p => (
        <div key={p.id}>{p.title}</div>
      ))}
    </div>
  )
}
```

### 서버 컴포넌트에서 Supabase 사용

```typescript
import { createClient } from '@/lib/supabase/server'
import type { Class } from '@/types/database'

export default async function ClassesPage() {
  const supabase = await createClient()

  const { data: classes } = await supabase
    .from('classes')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  return (
    <div>
      {classes?.map(c => (
        <div key={c.id}>{c.title}</div>
      ))}
    </div>
  )
}
```

### API Routes 사용 (fetch)

```typescript
// 포트폴리오 생성
async function createPortfolio(data: PortfolioCreate) {
  const response = await fetch('/api/portfolios', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  return response.json()
}

// 클래스 신청
async function applyForClass(orderData: OrderCreate) {
  const response = await fetch('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData),
  })

  return response.json()
}

// 이미지 업로드
async function uploadImage(file: File, folder: string) {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('folder', folder)

  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  })

  return response.json()
}
```

### 인증 상태 관리 (관리자)

```typescript
'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export function useAuth() {
  const supabase = createClient()
  const router = useRouter()

  const signIn = async (email: string, password: string) => {
    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    if (response.ok) {
      router.push('/admin/dashboard')
    }

    return response.json()
  }

  const signOut = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin')
  }

  return { signIn, signOut }
}
```

---

## 🔧 Mock 데이터 마이그레이션

현재 `data/classData.ts`의 Mock 데이터를 Supabase로 마이그레이션하는 방법:

### SQL Editor에서 실행

```sql
-- 클래스 데이터 삽입
INSERT INTO classes (
  title, subtitle, category, level, description,
  image_url, location, duration, price, price_display,
  capacity, curriculum, policy, bank_info, is_active
)
VALUES (
  'Winter Wreath Masterclass',
  '겨울의 무드를 담은 리스 제작',
  'One-day Class',
  'Beginner - Intermediate',
  '겨울의 차가운 공기와 따뜻한 실내의 온기가 만나는 계절...',
  'https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?q=80&w=2000',
  'Byunhwa Studio, Hannam-dong',
  '14:00 - 16:30 (2.5h)',
  150000,
  '150,000 KRW',
  'Max 6 people',
  '[
    {"step":"01","title":"Theory & Demo","content":"리스 제작의 기초 이론 설명..."},
    {"step":"02","title":"Conditioning","content":"소재 컨디셔닝..."},
    {"step":"03","title":"Arrangement","content":"그린 소재를..."},
    {"step":"04","title":"Finishing & Photo","content":"마무리 점검..."}
  ]'::jsonb,
  '{"refund":"- 수업 7일 전: 100% 환불...","note":"- 시장 상황에 따라..."}'::jsonb,
  '{"bank":"Shinhan Bank","account":"110-123-456789","holder":"Byunhwa (Na HoSeong)"}'::jsonb,
  true
);

-- 클래스 ID 확인 후 스케줄 추가
INSERT INTO class_schedules (class_id, schedule_date, schedule_display, available_seats)
VALUES
  ('클래스-UUID', '2024-12-14 14:00:00+09', '12월 14일 (토) 14:00', 6),
  ('클래스-UUID', '2024-12-15 11:00:00+09', '12월 15일 (일) 11:00', 6),
  ('클래스-UUID', '2024-12-21 14:00:00+09', '12월 21일 (토) 14:00', 6);
```

---

## 🚀 Vercel 배포

### 1. Vercel 프로젝트 생성

```bash
npm install -g vercel
vercel
```

### 2. 환경 변수 설정

Vercel Dashboard > Project Settings > Environment Variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
SUPABASE_SERVICE_ROLE_KEY=eyJhbG...  (Sensitive 체크)
NEXT_PUBLIC_SITE_URL=https://byeonhwa.com
```

### 3. 배포

```bash
vercel --prod
```

---

## 📊 다음 작업 권장사항

### 우선순위 1: 기존 페이지 연동
1. `app/portfolio/page.tsx` - API 연동
2. `app/class/page.tsx` - API 연동
3. `app/class/[id]/page.tsx` - API 연동
4. `app/class/[id]/apply/page.tsx` - 신청 폼 연동

### 우선순위 2: 관리자 페이지 연동
1. `app/admin/page.tsx` - 로그인 페이지 개선
2. `app/admin/portfolio/page.tsx` - CRUD 기능 연동
3. `app/admin/class/page.tsx` - CRUD 기능 연동
4. `app/admin/dashboard/page.tsx` - 통계 대시보드

### 우선순위 3: 추가 기능
1. 이미지 최적화 (Next.js Image + Supabase CDN)
2. 에러 처리 개선
3. 로딩 상태 UI
4. 관리자 권한 체크 강화

---

## 🔍 트러블슈팅

### RLS 정책 에러
- 에러: "new row violates row-level security policy"
- 해결: Supabase Dashboard에서 RLS 정책 확인 및 재적용

### 인증 에러
- 에러: "Unauthorized"
- 해결: 쿠키 설정 확인, 로그아웃 후 재로그인

### 이미지 업로드 실패
- Storage 버킷이 Public인지 확인
- MIME type 설정 확인
- 파일 크기 제한 (5MB) 확인

### 환경 변수 미인식
- `.env.local` 파일 위치 확인 (프로젝트 루트)
- 개발 서버 재시작 (`npm run dev`)
- 변수명 앞에 `NEXT_PUBLIC_` 필요 여부 확인

---

## 📚 참고 자료

- [Supabase 설정 가이드](supabase/README.md)
- [백엔드 아키텍처 계획서](BACKEND_PLAN.md)
- [프로젝트 가이드](CLAUDE.md)
- [Supabase with Next.js 공식 문서](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)

---

**구현 완료일**: 2025-11-22
**다음 작업**: Supabase 프로젝트 설정 및 프론트엔드 연동
