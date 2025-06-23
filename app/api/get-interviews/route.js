import { NextResponse } from 'next/server';
import { db } from '@/utils/db';
import { Lakshya_Data } from '@/utils/schema';
import { eq } from 'drizzle-orm';

export async function POST(request) {
  try {
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json({ success: false, error: 'Email is required' }, { status: 400 });
    }
    const interviews = await db.select().from(Lakshya_Data).where(eq(Lakshya_Data.createdBy, email));
    return NextResponse.json({ success: true, interviews });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
} 