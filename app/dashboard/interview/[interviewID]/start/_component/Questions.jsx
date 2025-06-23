import React, { useState } from 'react'
import { Button } from "@/components/ui/button"

// Add a simple speaker SVG icon
const SpeakerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 9v6h4l5 5V4l-5 5H9z" />
  </svg>
);

function speakText(text) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel(); // Stop any current speech
    const utterance = new window.SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  } else {
    alert('Text-to-speech is not supported in this browser.');
  }
}

function Questions({mockInterviewQuestions, answers = [], setActiveQuestionIndex, activeQuestionIndex}) {
  return (
    <div className='w-[400px] bg-gradient-to-b from-gray-50 to-white'>
      {/* Questions List */}
      <div className='p-6 border-b border-gray-200 bg-white/50 backdrop-blur-sm shadow-sm'>
        <h1 className='text-xl font-bold text-gray-800 mb-4 flex items-center'>
          <span className='bg-blue-500 w-2 h-6 rounded mr-3'></span>
          Interview Questions
        </h1>
        <div className='flex flex-col gap-2'>
          {mockInterviewQuestions && mockInterviewQuestions.length > 0 ? (
            mockInterviewQuestions.map((q, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <Button
                  variant="outline"
                  className={`group py-2 px-3 text-left h-auto w-full transition-all duration-200 hover:shadow-md
                    ${activeQuestionIndex === idx 
                      ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-white shadow-inner' 
                      : 'hover:border-gray-300 hover:bg-white'}
                    ${answers[idx]?.answer ? 'ring-2 ring-green-400' : ''}`}
                  onClick={() => setActiveQuestionIndex(idx)}
                >
                  <div className='flex items-center gap-2'>
                    <span className={`flex items-center justify-center w-6 h-6 rounded-full text-sm font-medium
                      ${activeQuestionIndex === idx 
                        ? 'bg-blue-500 text-white' 
                        : answers[idx]?.answer 
                          ? 'bg-green-500 text-white' 
                          : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'}`}>
                      {idx + 1}
                    </span>
                    <span className={`font-medium ${activeQuestionIndex === idx ? 'text-blue-600' : 'text-gray-700'}`}>
                      Question {idx + 1}
                    </span>
                    {answers[idx]?.answer && <span className="ml-2 text-green-600 text-xs font-semibold">Answered</span>}
                  </div>
                </Button>
                {/* TTS Button for each question */}
                <button
                  type="button"
                  className="ml-1 p-1 rounded hover:bg-blue-100 text-blue-600"
                  aria-label="Read question aloud"
                  onClick={e => {
                    e.stopPropagation();
                    const questionText = q?.question || (typeof q === 'string' ? q : '');
                    speakText(questionText);
                  }}
                >
                  <SpeakerIcon />
                </button>
              </div>
            ))
          ) : (
            <div className='text-gray-500 italic p-3 text-center bg-gray-50 rounded-lg'>
              No questions available.
            </div>
          )}
        </div>
      </div>

      {/* Selected Question Display Below */}
      <div className='p-6'>
        {mockInterviewQuestions[activeQuestionIndex] && (
          <div className='p-6 border border-gray-200 rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl'>
            <div className='flex items-center gap-3 mb-4'>
              <span className='flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white font-medium'>
                {activeQuestionIndex + 1}
              </span>
              <h2 className='text-lg font-semibold text-gray-800'>
                Question {activeQuestionIndex + 1}
              </h2>
              {/* TTS Button for selected question */}
              <button
                type="button"
                className="ml-2 p-2 rounded hover:bg-blue-100 text-blue-600"
                aria-label="Read question aloud"
                onClick={() => {
                  const q = mockInterviewQuestions[activeQuestionIndex];
                  const questionText = q?.question || (typeof q === 'string' ? q : '');
                  speakText(questionText);
                }}
              >
                <SpeakerIcon />
              </button>
            </div>
            <p className='text-gray-700 text-base leading-relaxed pl-11'>
              {mockInterviewQuestions[activeQuestionIndex]?.question || 
               (typeof mockInterviewQuestions[activeQuestionIndex] === 'string' 
                 ? mockInterviewQuestions[activeQuestionIndex] 
                 : 'Question format not recognized')}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Questions
