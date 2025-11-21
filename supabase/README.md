# Supabase 설정 가이드

## 1. Supabase 프로젝트 생성

1. [Supabase Dashboard](https://app.supabase.com)에 접속
2. "New Project" 클릭
3. 프로젝트 정보 입력:
   - Name: `byunhwa`
   - Database Password: 안전한 비밀번호 생성
   - Region: `Northeast Asia (Seoul)` 선택 (icn1)
4. 프로젝트 생성 완료 대기 (약 2분)

## 2. 데이터베이스 마이그레이션

### SQL 스크립트 실행

1. Supabase Dashboard에서 **SQL Editor** 메뉴로 이동
2. "New query" 클릭
3. `migrations/001_initial_schema.sql` 파일의 내용을 복사하여 붙여넣기
4. "Run" 버튼 클릭하여 실행
5. 에러 없이 완료되었는지 확인

### 테이블 확인

Database > Tables 메뉴에서 다음 테이블이 생성되었는지 확인:
- `portfolios`
- `classes`
- `class_schedules`
- `orders`
- `admin_settings`

## 3. Storage 버킷 설정

### 버킷 생성

1. Supabase Dashboard에서 **Storage** 메뉴로 이동
2. "Create a new bucket" 클릭
3. 버킷 설정:
   - Name: `byunhwa-images`
   - Public: ✅ (체크)
   - File size limit: `5MB`
   - Allowed MIME types: `image/jpeg, image/png, image/webp`
4. "Create bucket" 클릭

### 폴더 구조 생성

버킷 내부에 다음 폴더들을 생성:
- `portfolios/`
- `classes/`
- `temp/`

### Storage 정책 설정

Storage > Policies 메뉴에서 정책 추가:

**1. Public Read Policy**
```sql
-- Policy name: Public can view images
-- Allowed operation: SELECT
-- Policy definition:
bucket_id = 'byunhwa-images'
```

**2. Authenticated Upload Policy**
```sql
-- Policy name: Authenticated users can upload
-- Allowed operation: INSERT
-- Policy definition:
bucket_id = 'byunhwa-images' AND auth.role() = 'authenticated'
```

**3. Authenticated Delete Policy**
```sql
-- Policy name: Authenticated users can delete
-- Allowed operation: DELETE
-- Policy definition:
bucket_id = 'byunhwa-images' AND auth.role() = 'authenticated'
```

## 4. 인증 설정

### 관리자 계정 생성

1. Authentication > Users 메뉴로 이동
2. "Add user" 클릭
3. 관리자 정보 입력:
   - Email: `admin@byunhwa.com` (또는 원하는 이메일)
   - Password: 안전한 비밀번호 생성
   - Auto Confirm User: ✅ (체크)
4. "Create user" 클릭

### 인증 설정 조정

Authentication > Configuration 메뉴에서:
- **Email Auth**: Enabled
- **Confirm email**: Disabled (관리자만 사용하므로)
- **Email templates**: 필요시 커스터마이징

## 5. API Keys 복사

1. Settings > API 메�로 이동
2. 다음 값들을 복사:
   - **Project URL**: `https://xxx.supabase.co`
   - **anon public key**: `eyJhbG...`
   - **service_role key**: `eyJhbG...` (⚠️ 절대 클라이언트에 노출하지 말 것)

3. 프로젝트의 `.env.local` 파일에 추가:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
SUPABASE_SERVICE_ROLE_KEY=eyJhbG...
```

## 6. 초기 데이터 삽입 (선택 사항)

현재 Mock 데이터를 Supabase로 마이그레이션하려면:

### Portfolio 데이터 예시

SQL Editor에서 실행:
```sql
INSERT INTO portfolios (title, category, image_url, description, display_order)
VALUES
  ('Sample Portfolio 1', '웨딩', 'https://images.unsplash.com/...', '설명', 1),
  ('Sample Portfolio 2', '부케', 'https://images.unsplash.com/...', '설명', 2);
```

### Class 데이터 예시

`data/classData.ts`의 데이터를 참고하여 삽입:
```sql
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
  '겨울의 차가운 공기와...',
  'https://images.unsplash.com/...',
  'Byunhwa Studio, Hannam-dong',
  '14:00 - 16:30 (2.5h)',
  150000,
  '150,000 KRW',
  'Max 6 people',
  '[{"step":"01","title":"Theory & Demo","content":"..."}]'::jsonb,
  '{"refund":"...","note":"..."}'::jsonb,
  '{"bank":"Shinhan Bank","account":"110-123-456789","holder":"Byunhwa"}'::jsonb,
  true
);
```

## 7. 연결 테스트

프로젝트에서 연결 테스트:

```bash
npm run dev
```

브라우저 콘솔에서:
```javascript
// lib/supabase/client.ts를 import하여 테스트
const { data, error } = await supabase.from('portfolios').select('*')
console.log(data, error)
```

## 8. 배포 설정 (Vercel)

Vercel Dashboard > Project Settings > Environment Variables:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (Sensitive 체크)

## 트러블슈팅

### RLS 정책 문제
- 에러: "new row violates row-level security policy"
- 해결: Supabase Dashboard에서 해당 테이블의 RLS 정책 확인

### 이미지 업로드 실패
- Storage 버킷이 Public인지 확인
- MIME type 설정 확인
- 파일 크기 제한 확인

### 인증 문제
- JWT 토큰 만료: 로그아웃 후 재로그인
- 쿠키 설정: middleware.ts가 올바르게 설정되었는지 확인

## 참고 자료

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js with Supabase Guide](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
