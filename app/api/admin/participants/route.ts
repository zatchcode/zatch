import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({ message: 'Admin participants list endpoint' });
}

export async function POST() {
    return NextResponse.json({ message: 'Create participant endpoint' });
}
