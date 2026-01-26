import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params
  return NextResponse.json({ message: `Get waitlist entry ${id}` });
}

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params
  return NextResponse.json({ message: `Update waitlist entry ${id}` });
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params
  return NextResponse.json({ message: `Delete waitlist entry ${id}` });
}
