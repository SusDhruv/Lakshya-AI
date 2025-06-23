import { NextResponse } from 'next/server';
import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';
import { eq } from 'drizzle-orm';

export async function POST(request) {
  const { interviewID } = await request.json();
  const result = await db.select()
    .from(UserAnswer)
    .where(eq(UserAnswer.MockIdRef, interviewID))
    .orderBy(UserAnswer.id);
  console.log('API get-feedback result:', result, 'for interviewID:', interviewID);
  return NextResponse.json(result);
} 