import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import type { ClassScheduleCreate } from '@/types/database';

// GET /api/classes/[id]/schedules - 클래스 스케줄 조회
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('class_schedules')
      .select('*')
      .eq('class_id', id)
      .order('schedule_date', { ascending: true });

    if (error) {
      console.error('Schedules fetch error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch schedules' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: data || [] });
  } catch (error) {
    console.error('Schedules GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/classes/[id]/schedules - 스케줄 추가 (인증 필요)
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();

    // 인증 확인
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();

    // class_id를 파라미터에서 가져온 id로 설정
    const scheduleData: ClassScheduleCreate = {
      class_id: id,
      schedule_date: body.schedule_date,
      schedule_display: body.schedule_display,
      available_seats: body.available_seats || 6,
      is_available: body.is_available !== undefined ? body.is_available : true,
    };

    // 필수 필드 검증
    if (!scheduleData.schedule_date || !scheduleData.schedule_display) {
      return NextResponse.json(
        { error: 'Missing required fields: schedule_date, schedule_display' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('class_schedules')
      .insert([scheduleData])
      .select()
      .single();

    if (error) {
      console.error('Schedule creation error:', error);
      return NextResponse.json(
        { error: 'Failed to create schedule' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    console.error('Schedule POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/classes/[id]/schedules?schedule_id=xxx - 스케줄 삭제 (인증 필요)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const searchParams = request.nextUrl.searchParams;
    const scheduleId = searchParams.get('schedule_id');

    if (!scheduleId) {
      return NextResponse.json(
        { error: 'Missing schedule_id parameter' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // 인증 확인
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { error } = await supabase
      .from('class_schedules')
      .delete()
      .eq('id', scheduleId)
      .eq('class_id', id);

    if (error) {
      console.error('Schedule delete error:', error);
      return NextResponse.json(
        { error: 'Failed to delete schedule' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Schedule DELETE error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
