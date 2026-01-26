import { NextResponse } from 'next/server';

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    return NextResponse.json({ message: `Get referral ${params.id}` });
}

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    return NextResponse.json({ message: `Update referral ${params.id}` });
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    return NextResponse.json({ message: `Delete referral ${params.id}` });
}
