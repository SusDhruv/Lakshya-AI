"use client"
import { Webcam as WebcamIcon, Mic } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import useSpeechToText from 'react-hook-speech-to-text';
import { Button } from '@/components/ui/button';

function RecordAnswerSection() {
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

  const [userAnswer, setUserAnswer] = useState('');

  useEffect(() => {
    // Concatenate all transcripts into a single string
    const answer = results.map(result => result.transcript).join(' ');
    setUserAnswer(answer);
  }, [results]);

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
        <p className='text-gray-500 text-sm text-center max-w-xs'>Click the button below to start recording your answer. Make sure your webcam and microphone are enabled.</p>
      </div>
      <button
        className={`mt-4 px-6 py-3 rounded-lg shadow transition-all font-semibold text-base flex items-center gap-2 ${isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
        onClick={isRecording ? stopSpeechToText : startSpeechToText}
      >
        {isRecording ? (
          <>
            <Mic className='w-5 h-5 animate-pulse' /> Recording...
          </>
        ) : (
          'Start Recording'
        )}
      </button>
      {error && (
        <div className='mt-2 text-red-500 text-sm'>{error}</div>
      )}
      <Button onClick={() => console.log(userAnswer)}>Show Result</Button>
    </div>
  );
}

export default RecordAnswerSection;
