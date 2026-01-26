import { NextResponse } from 'next/server';

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    return NextResponse.json({ message: `Get share ${params.id}` });
}

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    return NextResponse.json({ message: `Update share ${params.id}` });
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    return NextResponse.json({ message: `Delete share ${params.id}` });
}
