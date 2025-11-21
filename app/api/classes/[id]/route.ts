import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import type { ClassUpdate } from '@/types/database';

// GET /api/classes/[id] - 클래스 상세 조회 (스케줄 포함)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();

    // 클래스 정보 조회
    const { data: classData, error: classError } = await supabase
      .from('classes')
      .select('*')
      .eq('id', id)
      .single();

    if (classError) {
      if (classError.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Class not found' },
          { status: 404 }
        );
      }
      console.error('Class fetch error:', classError);
      return NextResponse.json(
        { error: 'Failed to fetch class' },
        { status: 500 }
      );
    }

    // 스케줄 조회
    const { data: schedules } = await supabase
      .from('class_schedules')
      .select('*')
      .eq('class_id', id)
      .order('schedule_date', { ascending: true });

    return NextResponse.json({
      data: {
        ...classData,
        schedules: schedules || [],
      },
    });
  } catch (error) {
    console.error('Class GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/classes/[id] - 클래스 수정 (인증 필요)
export async function PUT(
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

    const body: ClassUpdate = await request.json();

    const { data, error } = await supabase
      .from('classes')
      .update(body)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Class not found' },
          { status: 404 }
        );
      }
      console.error('Class update error:', error);
      return NextResponse.json(
        { error: 'Failed to update class' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Class PUT error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/classes/[id] - 클래스 삭제 (인증 필요)
export async function DELETE(
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

    const { error } = await supabase
      .from('classes')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Class delete error:', error);
      return NextResponse.json(
        { error: 'Failed to delete class' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Class DELETE error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
