"use client"
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

function Feedback() {
  const params = useParams()
  const [feedback, setFeedback] = useState([])

  useEffect(() => {
    const GetFeedback = async () => {
      const res = await fetch('/api/get-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ interviewID: params.interviewID }),
      })
      const data = await res.json()
      setFeedback(data)
      console.log(data)
    }
    if (params.interviewID) GetFeedback()
  }, [params.interviewID])

  return (
    <div className='p-18'>
      <h2 className='text-3xl font-bold text-green-500'>Congratulations !!</h2>
      <h2 className='font bold text-2xl'>Here is Your Interview result </h2>
      {feedback.length > 0 && (
        <h2 className='text-primary text-lg my-3'>
          Your overall rating:
          <strong>
            {(() => {
              const ratings = feedback
                .map(f => parseFloat(f.Rating))
                .filter(r => !isNaN(r));
              if (ratings.length === 0) return 'N/A';
              const avg = ratings.reduce((a, b) => a + b, 0) / ratings.length;
              return `${avg.toFixed(1)}/10`;
            })()}
          </strong>
        </h2>
      )}
      <h2 className='text-sm text-gray-500 mb-6'>Find below Interview Questions with correct answer, your answer, and feedback</h2>
      <div className="space-y-8">
        {feedback.length === 0 ? (
          <div className="text-gray-400 italic">No feedback available.</div>
        ) : (
          feedback.map((item, idx) => (
            <div key={idx} className="border-b py-4 flex flex-col gap-2">
              <div className="mb-1">
                <span className="font-semibold text-blue-700">Question {idx + 1}:</span>
                <span className="ml-2 text-gray-800">{item.Question}</span>
              </div>
              <div className="flex flex-row flex-wrap gap-x-8 gap-y-2 items-center">
                <span className="px-2 py-1 rounded bg-green-50"><span className="font-semibold text-green-700">Correct:</span> <span className="text-green-900">{item.CorrectAnswer}</span></span>
                <span className="px-2 py-1 rounded bg-blue-50"><span className="font-semibold text-blue-700">Your Answer:</span> <span className="text-blue-900">{item.UserAnswer}</span></span>
                <span className="px-2 py-1 rounded bg-yellow-50"><span className="font-semibold text-yellow-700">Feedback:</span> <span className="text-yellow-900">{item.Feedback}</span></span>
                <span className="px-2 py-1 rounded bg-pink-50"><span className="font-semibold text-pink-700">Rating:</span> <span className="text-pink-900">{item.Rating ? `${item.Rating}/10` : 'N/A'}</span></span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Feedback
