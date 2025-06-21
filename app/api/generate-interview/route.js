import { NextResponse } from 'next/server';
import { getGeminiResponse } from '@/utils/GeminiModel';

export async function POST(request) {
  try {
    const { jobPosition, jobDescription, yearsOfExperience } = await request.json();
    
    const questionCount = process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT || 5;
    
    const prompt = `Generate exactly ${questionCount} interview questions for a ${jobPosition} position.

Job Description: ${jobDescription}
Years of Experience: ${yearsOfExperience}

IMPORTANT: You must respond with ONLY a valid JSON array. Do not include any explanations, markdown formatting, or additional text.

Each object in the array must have exactly two fields: "question" and "answer".

Example of expected JSON format:
[
  {
    "question": "What is your experience with React?",
    "answer": "I have 3 years of experience building React applications..."
  },
  {
    "question": "How do you handle state management in large applications?",
    "answer": "I typically use Redux or Context API depending on the complexity..."
  }
]

Return ONLY the JSON array, nothing else.`;

    const result = await getGeminiResponse(prompt);
    console.log("Raw Gemini response:", result);
    
    // Clean the response to extract JSON
    let cleanedResult = result.trim();
    
    // Remove markdown code blocks if present
    cleanedResult = cleanedResult.replace(/```json\s*/g, '').replace(/```\s*$/g, '');
    
    // Try to parse the cleaned JSON
    try {
      const questions = JSON.parse(cleanedResult);
      
      // Validate the structure
      if (!Array.isArray(questions)) {
        throw new Error("Response is not an array");
      }
      
      // Validate each question has the required fields
      const validQuestions = questions.filter(q => 
        q && typeof q === 'object' && 
        q.question && typeof q.question === 'string' &&
        q.answer && typeof q.answer === 'string'
      );
      
      if (validQuestions.length === 0) {
        throw new Error("No valid questions found in response");
      }
      
      return NextResponse.json({ 
        success: true, 
        questions: validQuestions 
      });
      
    } catch (parseError) {
      console.error("Failed to parse JSON response:", parseError);
      console.log("Cleaned response that failed to parse:", cleanedResult);
      
      // Try to extract JSON array from the response
      const jsonMatch = cleanedResult.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        try {
          const extractedJson = JSON.parse(jsonMatch[0]);
          
          // Validate the extracted JSON
          if (Array.isArray(extractedJson)) {
            const validQuestions = extractedJson.filter(q => 
              q && typeof q === 'object' && 
              q.question && typeof q.question === 'string' &&
              q.answer && typeof q.answer === 'string'
            );
            
            if (validQuestions.length > 0) {
              return NextResponse.json({ 
                success: true, 
                questions: validQuestions 
              });
            }
          }
        } catch (extractError) {
          console.error("Failed to parse extracted JSON:", extractError);
        }
      }
      
      return NextResponse.json({ 
        success: false, 
        error: "Failed to parse response into valid JSON format", 
        rawResponse: result 
      });
    }
  } catch (error) {
    console.error("Error generating interview questions:", error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
} 