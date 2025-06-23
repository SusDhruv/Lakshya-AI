"use client"
import { Webcam as WebcamIcon, Mic } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import useSpeechToText from 'react-hook-speech-to-text';
import { Button } from '@/components/ui/button';
import { toast, Toaster } from 'sonner';
import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';

function RecordAnswerSection({mockInterviewQuestions,activeQuestion,answers, setAnswers, activeQuestionIndex, setActiveQuestionIndex, interviewID}) {
  console.log('RecordAnswerSection interviewID:', interviewID);
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });

  const [userAnswer, setUserAnswer] = useState(answers[activeQuestionIndex]?.answer || '');
  const [isSaving, setIsSaving] = useState(false);
  const { user } = useUser();
  const prevIsRecording = useRef(isRecording);

  useEffect(() => {
    setUserAnswer(answers[activeQuestionIndex]?.answer || '');
  }, [activeQuestionIndex, answers]);

  useEffect(() => {
    const answer = results.map(result => result.transcript).join(' ');
    if (isRecording) setUserAnswer(answer);
  }, [results, isRecording]);
  
  const saveAnswerAndFeedback = async (answerToSave) => {
    if (!answerToSave || answerToSave.length < 10) {
      toast("Error while saving your answer, Please record again !");
      return;
    }
    setIsSaving(true);
    const feedBackPrompt =
      "Question: " + (activeQuestion?.question || "") +
      " Answer: " + (answerToSave || "") +
      ". Depending upon the question and user answer give us rating for the answer and feedback for the area of improvement if any in just 3 to 5 lines to improve it in JSON format with rating field and feedback field.";
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: feedBackPrompt })
      });
      const data = await response.json();
      let parsedFeedback = null;
      if (data && typeof data === 'object') {
        if ('rating' in data && 'feedback' in data) {
          parsedFeedback = { rating: data.rating, feedback: data.feedback };
        } else if (data.feedback && typeof data.feedback === 'object' && 'rating' in data.feedback && 'feedback' in data.feedback) {
          parsedFeedback = { rating: data.feedback.rating, feedback: data.feedback.feedback };
        } else {
          try {
            const maybeObj = typeof data === 'string' ? JSON.parse(data) : data;
            if (maybeObj && 'rating' in maybeObj && 'feedback' in maybeObj) {
              parsedFeedback = { rating: maybeObj.rating, feedback: maybeObj.feedback };
            }
          } catch {}
        }
      }
      if (parsedFeedback) {
        console.log('Parsed Feedback:', parsedFeedback);
      } else {
        console.log('Feedback response did not match expected format:', data);
      }
      setAnswers(prev => {
        const updated = [...prev];
        updated[activeQuestionIndex] = { answer: answerToSave, feedback: parsedFeedback };
        return updated;
      });
      // Save to UserAnswer table
      try {
        await fetch('/api/save-answer', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            MockIdRef: interviewID || '',
            Question: activeQuestion?.question || '',
            CorrectAnswer: activeQuestion?.answer || '',
            UserAnswer: answerToSave,
            Feedback: parsedFeedback?.feedback || '',
            Rating: parsedFeedback?.rating ? String(parsedFeedback.rating) : '',
            userEmail: user?.primaryEmailAddress?.emailAddress || '',
            createdAt: new Date().toISOString(),
          })
        });
      } catch (e) {
        console.error('Failed to save answer to DB', e);
      }
      toast("Answer and feedback saved!");
    } catch (err) {
      toast("Failed to get feedback.");
    } finally {
      setIsSaving(false);
    }
  };

  // Effect: auto-save when recording stops
  useEffect(() => {
    if (prevIsRecording.current && !isRecording) {
      // Recording just stopped
      if (userAnswer && userAnswer.length >= 10) {
        saveAnswerAndFeedback(userAnswer);
      }
    }
    prevIsRecording.current = isRecording;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRecording]);

  // Button handler: start/stop recording or manual save
  const handleButton = () => {
    if (isRecording) {
      stopSpeechToText();
      // Saving will be triggered by useEffect above
    } else {
      startSpeechToText();
    }
  };

  const goToNext = () => {
    if (activeQuestionIndex < mockInterviewQuestions.length - 1) {
      setAnswers(prev => {
        const updated = [...prev];
        updated[activeQuestionIndex] = { answer: userAnswer, feedback: prev[activeQuestionIndex]?.feedback || null };
        return updated;
      });
      setActiveQuestionIndex(activeQuestionIndex + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  const goToPrev = () => {
    if (activeQuestionIndex > 0) {
      setAnswers(prev => {
        const updated = [...prev];
        updated[activeQuestionIndex] = { answer: userAnswer, feedback: prev[activeQuestionIndex]?.feedback || null };
        return updated;
      });
      setActiveQuestionIndex(activeQuestionIndex - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className='w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 flex flex-col items-center p-8 mt-8'>
      <div className='flex flex-col items-center mb-6 w-full'>
        <div className='mb-3 shadow-sm w-full flex justify-center'>
          <Webcam
            audio={true}
            screenshotFormat="image/jpeg"
            className='rounded-xl border border-blue-100 shadow-lg bg-black w-full max-w-[420px] h-[320px] object-cover'
            videoConstraints={{ width: 420, height: 320, facingMode: "user" }}
            mirrored={true}
          />
        </div>
        <WebcamIcon className='text-blue-500 w-8 h-8 mb-2' />
        <h2 className='text-xl font-bold text-gray-800 mb-1'>Record Your Answer</h2>
      </div>
      <div className='flex gap-3 w-full justify-between'>
        <Button onClick={goToPrev} disabled={activeQuestionIndex === 0}>Previous</Button>
        <button
          className={`px-6 py-3 rounded-lg shadow transition-all font-semibold text-base flex items-center gap-2 ${isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
          onClick={handleButton}
          disabled={isSaving}
        >
          {isRecording ? (
            <>
              <Mic className='w-5 h-5 animate-pulse' /> Recording...
            </>
          ) : (
            isSaving ? 'Saving...' : 'Start Recording'
          )}
        </button>
        <Button onClick={goToNext} disabled={activeQuestionIndex === mockInterviewQuestions.length - 1}>Next</Button>
      </div>
      {error && (
        <div className='mt-2 text-red-500 text-sm'>{error}</div>
      )}
    </div>
  );
}

export default RecordAnswerSection;
