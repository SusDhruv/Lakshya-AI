import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-10 max-w-md w-full flex flex-col items-center">
        <img
          src="https://merakiui.com/images/logo.svg"
          alt="Logo"
          className="w-16 h-16 mb-4"
        />
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2 text-center">
          Welcome Back!
        </h1>
        <p className="text-gray-500 dark:text-gray-300 mb-6 text-center">
          Sign in to your account to continue
        </p>
        <SignIn redirectUrl="/dashboard" />
      </div>
    </div>
  )
}