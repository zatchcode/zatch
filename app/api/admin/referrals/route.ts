import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({ message: 'Admin referrals list endpoint' });
}

export async function POST() {
    return NextResponse.json({ message: 'Create referral endpoint' });
}
