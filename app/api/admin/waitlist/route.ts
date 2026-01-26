import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({ message: 'Admin waitlist list endpoint' });
}

export async function POST() {
    return NextResponse.json({ message: 'Create waitlist entry endpoint' });
}
