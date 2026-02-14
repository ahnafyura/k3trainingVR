import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json({ message: 'Get Progress API - To be implemented' });
}

export async function POST(request: NextRequest) {
  return NextResponse.json({ message: 'Update Progress API - To be implemented' });
}
