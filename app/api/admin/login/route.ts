import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { password } = body;

        // Simple mock password check
        if (password === 'admin1234') {
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json(
                { error: 'Invalid password' },
                { status: 401 }
            );
        }
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
