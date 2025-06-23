import React from 'react';

const steps = [
  {
    title: 'Sign Up / Sign In',
    description: 'Create your account or log in using your email to access your personalized dashboard.',
    icon: '👤',
  },
  {
    title: 'Create a Mock Interview',
    description: 'Start a new interview by specifying your job position, tech stack, and experience level.',
    icon: '📝',
  },
  {
    title: 'Answer AI-Generated Questions',
    description: 'Receive tailored interview questions and record your answers directly on the platform.',
    icon: '🤖',
  },
  {
    title: 'Get Instant Feedback',
    description: 'Our AI analyzes your responses and provides constructive feedback to help you improve.',
    icon: '💡',
  },
  {
    title: 'Track Your Progress',
    description: 'View your previous interviews and feedback anytime from your dashboard.',
    icon: '📈',
  },
  {
    title: 'Upgrade for More Features',
    description: 'Unlock more questions, interviews, and advanced analytics by upgrading your plan.',
    icon: '🚀',
  },
];

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100/60 to-white py-16 px-4 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold text-blue-800 mb-4 text-center drop-shadow">How It Works</h1>
      <p className="text-center text-gray-600 mb-12 max-w-2xl">Follow these simple steps to get the most out of your interview preparation journey!</p>
      <div className="w-full max-w-3xl flex flex-col gap-8">
        {steps.map((step, idx) => (
          <div
            key={step.title}
            className="relative bg-white rounded-2xl shadow-lg border border-blue-100 px-8 py-6 flex items-center gap-6 hover:shadow-xl transition group"
          >
            <div className="flex flex-col items-center mr-4">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-100 text-3xl font-bold mb-2 border-2 border-blue-300 group-hover:bg-blue-200 transition">
                {step.icon}
              </div>
              <div className="text-blue-700 font-bold text-lg">Step {idx + 1}</div>
            </div>
            <div>
              <div className="text-xl font-semibold text-blue-800 mb-1">{step.title}</div>
              <div className="text-gray-700 text-base">{step.description}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-14 text-center text-gray-500 text-lg font-medium">
        Ready to ace your next interview? <span className="text-blue-700 font-bold">Start practicing now!</span>
      </div>
    </div>
  );
} 