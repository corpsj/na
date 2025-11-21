import { NextResponse } from 'next/server';

// Mock database
let orders = [
    {
        id: '1',
        name: 'Kim Minji',
        phone: '010-1234-5678',
        schedule: '12월 14일 (토) 14:00',
        status: 'pending',
        created_at: new Date().toISOString(),
    },
    {
        id: '2',
        name: 'Lee Junho',
        phone: '010-9876-5432',
        schedule: '12월 15일 (일) 11:00',
        status: 'confirmed',
        created_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    }
];

export async function GET() {
    return NextResponse.json({ orders });
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const newOrder = {
            id: Math.random().toString(36).substr(2, 9),
            ...body,
            status: 'pending',
            created_at: new Date().toISOString(),
        };
        orders = [newOrder, ...orders];
        return NextResponse.json({ success: true, order: newOrder });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to create order' },
            { status: 500 }
        );
    }
}
