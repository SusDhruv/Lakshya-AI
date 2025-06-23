import Link from 'next/link';

const testimonials = [
  {
    name: 'Amit S.',
    text: 'Lakshya helped me gain confidence and ace my interviews. The instant feedback is a game changer!',
    avatar: '/globe.svg',
  },
  {
    name: 'Priya R.',
    text: 'The mock interviews felt real and the feedback was super helpful. Highly recommended!',
    avatar: '/window.svg',
  },
  {
    name: 'Rahul K.',
    text: 'I loved tracking my progress and seeing my improvement. The platform is easy and intuitive.',
    avatar: '/file.svg',
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-200 via-white to-blue-100 flex flex-col">
      {/* Hero Section */}
      <section className="relative flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto py-16 px-6 gap-8">
        {/* Left: Text & CTA */}
        <div className="flex-1 z-10 flex justify-center">
          <div className="relative w-full max-w-md">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-blue-400/30 via-blue-200/20 to-blue-100/10 blur-lg" />
            <div className="relative bg-white/60 backdrop-blur-2xl rounded-3xl shadow-2xl border border-blue-200 p-7 md:p-10 flex flex-col items-center">
              <span className="mb-3 px-4 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full tracking-widest shadow-sm uppercase">AI Interview Prep</span>
              <h1 className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-3 leading-tight drop-shadow-xl text-center tracking-tight">Ace Your Next Interview with <span className="text-blue-600">AI-Powered Practice</span></h1>
              <p className="text-base md:text-lg text-gray-700 mb-6 text-center font-medium">Personalized mock interviews, instant feedback, and progress tracking to help you land your dream job.</p>
              <div className="flex gap-4 w-full justify-center">
                <Link href="/sign-up" className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-400 text-white text-base font-bold rounded-2xl shadow-lg hover:scale-105 hover:from-blue-700 hover:to-blue-500 transition-all">Sign Up</Link>
                <Link href="/sign-in" className="inline-block px-6 py-3 bg-white text-blue-700 border border-blue-700 text-base font-bold rounded-2xl shadow hover:bg-blue-50 hover:scale-105 transition-all">Sign In</Link>
              </div>
            </div>
          </div>
        </div>
        {/* Right: Firefly Image with animation and blur */}
        <div className="flex-1 flex justify-center items-center md:mt-0 mt-4 relative">
          <div className="absolute w-72 h-72 bg-blue-200/40 rounded-full blur-2xl -z-10" />
          <img src="/Firefly_an robot interviewing an human image is for an website that provide mock interview 641705.jpg" alt="AI Interview Illustration" className="w-64 max-w-full rounded-2xl shadow-xl border-2 border-blue-100 object-cover transition-transform duration-300 hover:scale-105 hover:shadow-2xl" style={{maxHeight:'260px'}} />
        </div>
        {/* Decorative Gradient Circles */}
        <div className="absolute left-0 top-0 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl -z-10" />
        <div className="absolute right-0 bottom-0 w-96 h-96 bg-blue-200/30 rounded-full blur-2xl -z-10" />
      </section>

      {/* Features Section */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-10 shadow-lg flex flex-col items-center text-center border border-blue-100 hover:scale-105 transition-transform">
            <span className="text-5xl mb-4">🤖</span>
            <h3 className="text-2xl font-bold text-blue-800 mb-2">AI-Generated Questions</h3>
            <p className="text-gray-600">Practice with questions tailored to your job role, tech stack, and experience level.</p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-10 shadow-lg flex flex-col items-center text-center border border-blue-100 hover:scale-105 transition-transform">
            <span className="text-5xl mb-4">💡</span>
            <h3 className="text-2xl font-bold text-blue-800 mb-2">Instant Feedback</h3>
            <p className="text-gray-600">Get actionable feedback on your answers to improve your interview skills.</p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-10 shadow-lg flex flex-col items-center text-center border border-blue-100 hover:scale-105 transition-transform">
            <span className="text-5xl mb-4">📈</span>
            <h3 className="text-2xl font-bold text-blue-800 mb-2">Track Progress</h3>
            <p className="text-gray-600">Monitor your growth and revisit past interviews and feedback anytime.</p>
          </div>
        </div>
      </section>

      {/* How It Works Short Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-50 to-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-blue-800 mb-12 drop-shadow">How It Works</h2>
          <div className="flex flex-col md:flex-row justify-center gap-10">
            <div className="flex-1 bg-white rounded-2xl shadow-md p-8 mx-2 border border-blue-100 flex flex-col items-center hover:shadow-xl transition">
              <div className="text-4xl mb-3">📝</div>
              <div className="font-semibold text-blue-700 text-lg mb-1">Create Interview</div>
              <div className="text-gray-500 text-base">Set your job role, tech stack, and experience to get started.</div>
            </div>
            <div className="flex-1 bg-white rounded-2xl shadow-md p-8 mx-2 border border-blue-100 flex flex-col items-center hover:shadow-xl transition">
              <div className="text-4xl mb-3">🎤</div>
              <div className="font-semibold text-blue-700 text-lg mb-1">Answer Questions</div>
              <div className="text-gray-500 text-base">Practice with realistic, AI-generated questions and record your answers.</div>
            </div>
            <div className="flex-1 bg-white rounded-2xl shadow-md p-8 mx-2 border border-blue-100 flex flex-col items-center hover:shadow-xl transition">
              <div className="text-4xl mb-3">💬</div>
              <div className="font-semibold text-blue-700 text-lg mb-1">Get Feedback</div>
              <div className="text-gray-500 text-base">Receive instant, actionable feedback to improve your performance.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-blue-800 mb-10">What Our Users Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100 flex flex-col items-center hover:shadow-xl transition">
                <img src={t.avatar} alt={t.name} className="w-16 h-16 rounded-full mb-4 border-2 border-blue-200" />
                <div className="text-gray-700 italic mb-3">"{t.text}"</div>
                <div className="font-bold text-blue-700">{t.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-10 bg-blue-900 text-white text-center text-base">
        <div className="mb-2 font-semibold tracking-wide">Lakshya Interview Prep</div>
        <div className="mb-2">&copy; {new Date().getFullYear()} All rights reserved.</div>
        <div className="flex justify-center gap-6 text-blue-200 text-sm">
          <Link href="/dashboard/how-it-works" className="hover:underline">How it Works</Link>
          <Link href="/dashboard/upgrade" className="hover:underline">Pricing</Link>
          <a href="mailto:support@lakshya.com" className="hover:underline">Contact</a>
        </div>
      </footer>
    </main>
  );
}
