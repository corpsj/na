import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import type { Order, OrderCreate, PaginatedResponse } from '@/types/database';

// GET /api/orders - 주문 목록 조회 (인증 필요)
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();

    // 인증 확인 (관리자만 조회 가능)
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    let query = supabase
      .from('orders')
      .select(`
        *,
        classes:class_id (
          title
        )
      `, { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    // 상태 필터링
    if (status) {
      query = query.eq('status', status);
    }

    const { data, error, count } = await query;

    if (error) {
      console.error('Orders fetch error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch orders' },
        { status: 500 }
      );
    }

    // 데이터 변환 (class_title 추가)
    const ordersWithClassTitle = data?.map((order: any) => ({
      ...order,
      class_title: order.classes?.title || 'Unknown Class',
      classes: undefined, // 중첩 객체 제거
    }));

    const response: PaginatedResponse<Order> = {
      data: ordersWithClassTitle || [],
      total: count || 0,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Orders API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/orders - 주문 생성 (공개 - 클래스 신청)
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const body: OrderCreate = await request.json();

    // 필수 필드 검증
    if (!body.class_id || !body.name || !body.phone || !body.schedule_display) {
      return NextResponse.json(
        { error: 'Missing required fields: class_id, name, phone, schedule_display' },
        { status: 400 }
      );
    }

    // 전화번호 형식 간단 검증
    const phoneRegex = /^[0-9-]+$/;
    if (!phoneRegex.test(body.phone)) {
      return NextResponse.json(
        { error: 'Invalid phone number format' },
        { status: 400 }
      );
    }

    // 이메일 형식 검증 (선택 필드)
    if (body.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(body.email)) {
        return NextResponse.json(
          { error: 'Invalid email format' },
          { status: 400 }
        );
      }
    }

    // 클래스가 존재하고 활성화되어 있는지 확인
    const { data: classData, error: classError } = await supabase
      .from('classes')
      .select('id, is_active')
      .eq('id', body.class_id)
      .single();

    if (classError || !classData) {
      return NextResponse.json(
        { error: 'Class not found' },
        { status: 404 }
      );
    }

    if (!classData.is_active) {
      return NextResponse.json(
        { error: 'Class is not active' },
        { status: 400 }
      );
    }

    // 스케줄 확인 (선택 필드)
    if (body.schedule_id) {
      const { data: scheduleData, error: scheduleError } = await supabase
        .from('class_schedules')
        .select('id, is_available, available_seats')
        .eq('id', body.schedule_id)
        .single();

      if (scheduleError || !scheduleData) {
        return NextResponse.json(
          { error: 'Schedule not found' },
          { status: 404 }
        );
      }

      if (!scheduleData.is_available || scheduleData.available_seats <= 0) {
        return NextResponse.json(
          { error: 'Schedule is not available or fully booked' },
          { status: 400 }
        );
      }
    }

    // 주문 생성
    const { data, error } = await supabase
      .from('orders')
      .insert([body])
      .select()
      .single();

    if (error) {
      console.error('Order creation error:', error);
      return NextResponse.json(
        { error: 'Failed to create order' },
        { status: 500 }
      );
    }

    // 스케줄이 있는 경우 available_seats 감소
    if (body.schedule_id) {
      await supabase.rpc('decrement_available_seats', {
        schedule_id: body.schedule_id,
      });
    }

    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    console.error('Order POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
