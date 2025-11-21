import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import type { Portfolio, PortfolioCreate, PaginatedResponse } from '@/types/database';

// GET /api/portfolios - 포트폴리오 목록 조회
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    const supabase = await createClient();

    let query = supabase
      .from('portfolios')
      .select('*', { count: 'exact' })
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    // 카테고리 필터링
    if (category && category !== '전체') {
      query = query.eq('category', category);
    }

    const { data, error, count } = await query;

    if (error) {
      console.error('Portfolio fetch error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch portfolios' },
        { status: 500 }
      );
    }

    const response: PaginatedResponse<Portfolio> = {
      data: data || [],
      total: count || 0,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Portfolio API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/portfolios - 포트폴리오 생성 (인증 필요)
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

    const body: PortfolioCreate = await request.json();

    // 필수 필드 검증
    if (!body.title || !body.category || !body.image_url) {
      return NextResponse.json(
        { error: 'Missing required fields: title, category, image_url' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('portfolios')
      .insert([body])
      .select()
      .single();

    if (error) {
      console.error('Portfolio creation error:', error);
      return NextResponse.json(
        { error: 'Failed to create portfolio' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    console.error('Portfolio POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
