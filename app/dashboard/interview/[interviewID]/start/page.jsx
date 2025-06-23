"use client";
import React, { useState, useEffect } from 'react';
import { db } from '@/utils/db';
import { Lakshya_Data } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import Questions from './_component/Questions';
import RecordAnswerSection from './_component/RecordAnswerSection'
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

function StartInterview({ params }) {
  const [interviewData, setInterviewData] = useState(null);
  const [mockInterviewQuestions, setMockInterviewQuestions] = useState([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);

  // The currently active question
  const activeQuestion = mockInterviewQuestions[activeQuestionIndex] || null;

  useEffect(() => {
    getInterviewData();
  }, []);

  const getInterviewData = async () => {
    try {
      console.log("Fetching data for ID:", params.interviewID);
      
      const result = await db
        .select()
        .from(Lakshya_Data)
        .where(eq(Lakshya_Data.mockId, params.interviewID));

      console.log("Full DB Result:", result);

      if (!result || result.length === 0) {
        console.warn('No interview found for ID:', params.interviewID);
        return;
      }

      console.log("Raw jsonMockResponse:", result[0].jsonMockResponse);
      console.log("Type of jsonMockResponse:", typeof result[0].jsonMockResponse);

      // If it's a string, try to parse it
      let jsonMockResponse = result[0].jsonMockResponse;
      if (typeof jsonMockResponse === 'string') {
        try {
          jsonMockResponse = JSON.parse(jsonMockResponse);
          console.log("Parsed from string:", jsonMockResponse);
        } catch (e) {
          console.error("Failed to parse JSON string:", e);
        }
      }

      // Check if we have a questions property
      const questionsArray = Array.isArray(jsonMockResponse) 
        ? jsonMockResponse 
        : (jsonMockResponse.questions || []);

      console.log("Final questions array:", questionsArray);

      setInterviewData(result[0]);
      setMockInterviewQuestions(questionsArray);
      setAnswers(Array(questionsArray.length).fill({ answer: '', feedback: null }));
    } catch (error) {
      console.error('Error fetching interview data:', error);
    }
  };

  return (
    <div className='flex justify-start items-start min-h-screen bg-white'>
      <Questions 
        mockInterviewQuestions={mockInterviewQuestions}
        activeQuestion={activeQuestion}
        answers={answers}
        setActiveQuestionIndex={setActiveQuestionIndex}
        activeQuestionIndex={activeQuestionIndex}
      />
      <div className='flex-1'>
        <RecordAnswerSection
          mockInterviewQuestions={mockInterviewQuestions}
          activeQuestion={activeQuestion}
          answers={answers}
          setAnswers={setAnswers}
          activeQuestionIndex={activeQuestionIndex}
          setActiveQuestionIndex={setActiveQuestionIndex}
          interviewID={params.interviewID}
        />
      </div>
      {activeQuestionIndex === mockInterviewQuestions.length - 1 && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 flex justify-center w-full pointer-events-none">
          <Link href={`/dashboard/interview/${params.interviewID}/feedback`} className="pointer-events-auto">
            <Button
              className="bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white text-lg px-10 py-5 rounded-full shadow-2xl flex items-center gap-3 font-bold border-2 border-white"
              size="lg"
            >
              <CheckCircle2 className="w-7 h-7 mr-2 text-white" />
              End Interview
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default StartInterview;
