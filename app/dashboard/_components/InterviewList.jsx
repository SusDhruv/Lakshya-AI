'use client';
import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';

function InterviewList() {
  const { user, isLoaded } = useUser();
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInterviews = async () => {
      if (!user?.primaryEmailAddress?.emailAddress) return;
      setLoading(true);
      try {
        const res = await fetch('/api/get-interviews', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: user.primaryEmailAddress.emailAddress }),
        });
        const data = await res.json();
        if (data.success) {
          setInterviews(data.interviews);
        } else {
          setInterviews([]);
        }
      } catch (e) {
        setInterviews([]);
      } finally {
        setLoading(false);
      }
    };
    if (isLoaded) fetchInterviews();
  }, [user, isLoaded]);

  if (loading) {
    return <div className="mt-8 text-center text-gray-400">Loading your interviews...</div>;
  }

  if (!interviews.length) {
    return <div className="mt-8 text-center text-gray-400">No previous interviews found.</div>;
  }

  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {interviews.map((interview) => (
        <Link
          key={interview.mockId}
          href={`/dashboard/interview/${interview.mockId}/feedback`}
          className="block bg-gradient-to-br from-white to-blue-50 border border-blue-100 rounded-xl shadow-md hover:shadow-lg transition-all p-6 group"
        >
          <div className="mb-2 flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
            <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">{new Date(interview.createdAt).toLocaleDateString()}</span>
          </div>
          <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-700 mb-1 truncate">{interview.jobPoistion}</h3>
          <div className="text-sm text-gray-600 mb-2 truncate"><span className="font-semibold">Tech Stack:</span> {interview.jobDesc}</div>
          <div className="text-sm text-gray-600 mb-2"><span className="font-semibold">Experience:</span> {interview.jobExperience} years</div>
          <div className="mt-3 text-right">
            <span className="inline-block px-4 py-1 text-xs bg-blue-100 text-blue-700 rounded-full font-semibold group-hover:bg-blue-200 transition">View Details</span>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default InterviewList;
