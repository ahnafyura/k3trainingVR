import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json({ message: 'Get Modules API - To be implemented' });
}

export async function POST(request: NextRequest) {
  return NextResponse.json({ message: 'Create Module API - To be implemented' });
}
