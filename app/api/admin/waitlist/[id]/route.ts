import { NextResponse } from 'next/server';

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    return NextResponse.json({ message: `Get waitlist entry ${params.id}` });
}

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    return NextResponse.json({ message: `Update waitlist entry ${params.id}` });
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    return NextResponse.json({ message: `Delete waitlist entry ${params.id}` });
}
