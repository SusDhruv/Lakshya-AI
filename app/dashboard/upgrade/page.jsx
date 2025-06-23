import React from 'react';

const plans = [
  {
    name: 'Starter',
    price: 149,
    features: [
      'Ask up to 10 questions per day',
      '2 mock interviews per month',
      'Basic feedback',
    ],
    popular: false,
  },
  {
    name: 'Pro',
    price: 249,
    features: [
      'Ask up to 30 questions per day',
      '10 mock interviews per month',
      'Detailed feedback & analytics',
      'Priority support',
    ],
    popular: true,
  },
  {
    name: 'Elite',
    price: 549,
    features: [
      'Unlimited questions',
      'Unlimited mock interviews',
      'Advanced feedback & analytics',
      '1:1 mentor session (monthly)',
      'Priority support',
    ],
    popular: false,
  },
];

export default function UpgradePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-4 text-blue-800">Upgrade Your Plan</h1>
      <p className="text-center text-gray-600 mb-10">Choose the plan that fits your interview preparation needs.</p>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative bg-white rounded-2xl shadow-lg border border-blue-100 p-8 flex flex-col items-center transition-transform hover:scale-105 ${plan.popular ? 'ring-2 ring-blue-400' : ''}`}
          >
            {plan.popular && (
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs px-4 py-1 rounded-full font-semibold shadow">Most Popular</span>
            )}
            <h2 className="text-xl font-bold text-blue-700 mb-2">{plan.name}</h2>
            <div className="text-4xl font-extrabold text-gray-900 mb-2">₹{plan.price}</div>
            <div className="text-sm text-gray-500 mb-6">per month</div>
            <ul className="mb-8 space-y-2 w-full">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2 text-gray-700">
                  <span className="inline-block w-2 h-2 bg-blue-400 rounded-full"></span>
                  {feature}
                </li>
              ))}
            </ul>
            <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">Upgrade</button>
          </div>
        ))}
      </div>
    </div>
  );
} 