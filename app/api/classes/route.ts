import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import type { Class, ClassCreate, ClassSchedule } from '@/types/database';

// GET /api/classes - 클래스 목록 조회 (스케줄 포함)
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const isActive = searchParams.get('is_active');

    const supabase = await createClient();

    // 인증 여부 확인 (관리자는 모든 클래스 조회 가능)
    const { data: { user } } = await supabase.auth.getUser();
    const isAuthenticated = !!user;

    let classesQuery = supabase
      .from('classes')
      .select('*')
      .order('created_at', { ascending: false });

    // 비인증 사용자는 활성화된 클래스만 조회
    if (!isAuthenticated) {
      classesQuery = classesQuery.eq('is_active', true);
    } else if (isActive !== null) {
      // 관리자가 명시적으로 필터링하는 경우
      classesQuery = classesQuery.eq('is_active', isActive === 'true');
    }

    const { data: classes, error: classesError } = await classesQuery;

    if (classesError) {
      console.error('Classes fetch error:', classesError);
      return NextResponse.json(
        { error: 'Failed to fetch classes' },
        { status: 500 }
      );
    }

    // 각 클래스의 스케줄 조회
    const classIds = classes?.map((c) => c.id) || [];
    const { data: schedules } = await supabase
      .from('class_schedules')
      .select('*')
      .in('class_id', classIds)
      .order('schedule_date', { ascending: true });

    // 클래스와 스케줄 결합
    const classesWithSchedules = classes?.map((classItem) => ({
      ...classItem,
      schedules: schedules?.filter((s) => s.class_id === classItem.id) || [],
    }));

    return NextResponse.json({ data: classesWithSchedules || [] });
  } catch (error) {
    console.error('Classes API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/classes - 클래스 생성 (인증 필요)
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    // 인증 확인
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body: ClassCreate = await request.json();

    // 필수 필드 검증
    if (!body.title || !body.description || !body.image_url || !body.location || !body.duration || !body.price) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('classes')
      .insert([body])
      .select()
      .single();

    if (error) {
      console.error('Class creation error:', error);
      return NextResponse.json(
        { error: 'Failed to create class' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    console.error('Class POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
