import { NextResponse } from 'next/server';
import { getGeminiResponse } from '@/utils/GeminiModel';

export async function POST(request) {
  try {
    const { prompt } = await request.json();
    const feedbackPrompt = prompt +
      "\nReturn ONLY a JSON object with two fields: rating (number 1-10) and feedback (string, 3-5 lines). Example: {\"rating\": 8, \"feedback\": \"Your answer was clear, but you could elaborate more on X.\"}";
    const result = await getGeminiResponse(feedbackPrompt);

    // Try to extract JSON from the result
    const jsonMatch = result.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        const feedback = JSON.parse(jsonMatch[0]);
        return NextResponse.json(feedback);
      } catch (e) {
        // fallback: return raw result
      }
    }
    return NextResponse.json({ error: "Could not parse feedback", raw: result });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 