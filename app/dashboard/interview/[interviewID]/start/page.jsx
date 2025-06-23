"use client";
import React, { useState, useEffect } from 'react';
import { db } from '@/utils/db';
import { Lakshya_Data } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import Questions from './_component/Questions';
import RecordAnswerSection from './_component/RecordAnswerSection'

function StartInterview({ params }) {
  const [interviewData, setInterviewData] = useState(null);
  const [mockInterviewQuestions, setMockInterviewQuestions] = useState([]);

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
    } catch (error) {
      console.error('Error fetching interview data:', error);
    }
  };

  return (
    <div className='flex justify-start items-start min-h-screen bg-white'>
      <Questions mockInterviewQuestions={mockInterviewQuestions}/>
      <div className='flex-1'>
        <RecordAnswerSection />
      </div>
    </div>
  );
}

export default StartInterview;
