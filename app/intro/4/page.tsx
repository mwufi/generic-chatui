"use client";
import Link from "next/link";

export default function QuizStep4() {
  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col">
      {/* Header with progress and back button */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/intro/3" className="text-white">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </Link>
        <div className="flex-1 flex gap-1">
          <div className="h-1 bg-[#4CAF50] rounded flex-1" />
          <div className="h-1 bg-[#4CAF50] rounded flex-1" />
          <div className="h-1 bg-[#4CAF50] rounded flex-1" />
          <div className="h-1 bg-[#4CAF50] rounded flex-1" />
          <div className="h-1 bg-[#4CAF50] rounded flex-1" />
          <div className="h-1 bg-[#4CAF50] rounded flex-1" />
          <div className="h-1 bg-[#4CAF50] rounded flex-1" />
          <div className="h-1 bg-[#4CAF50] rounded flex-1" />
        </div>
      </div>

      {/* Avatar and title */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-full bg-[#4CAF50] flex items-center justify-center">
          <span className="text-lg font-semibold">L</span>
        </div>
        <p className="text-lg">Ok, last step!</p>
      </div>

      {/* Main heading */}
      <h1 className="text-3xl font-serif mb-auto">
        Let's get you your
        <br />
        personalized program!
      </h1>

      {/* Loading spinner */}
      <div className="absolute bottom-48 right-6">
        <div className="w-12 h-12 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
      </div>

      {/* Sign up buttons */}
      <div className="flex flex-col gap-3 mb-6">
        <button className="w-full bg-white text-black py-4 rounded-xl font-medium flex items-center justify-center gap-2">
          <svg viewBox="0 0 24 24" className="w-6 h-6">
            <path d="M12.1,22c-0.3,0-0.6,0-0.9,0c-5.5-0.3-9.5-5.2-9-10.7c0.5-4.7,4.3-8.5,9-9c5.5-0.5,10.4,3.5,10.7,9c0.3,5.5-3.5,10.4-9,10.7c-0.3,0-0.6,0-0.9,0 M16.7,12.7c-0.3-0.2-1.7-0.9-2-1c-0.3-0.1-0.5-0.1-0.7,0.1c-0.2,0.2-0.8,1-0.9,1.1c-0.2,0.2-0.3,0.2-0.6,0.1c-0.3-0.2-1.2-0.4-2.3-1.3c-0.9-0.8-1.5-1.7-1.6-2c-0.2-0.3,0-0.4,0.1-0.6c0.1-0.1,0.3-0.3,0.4-0.4c0.1-0.1,0.2-0.2,0.3-0.4c0.1-0.2,0-0.3,0-0.4c0-0.1-0.7-1.7-1-2.3C8.9,6.1,8.7,6.1,8.5,6.1c-0.2,0-0.4,0-0.6,0S7.5,6.4,7.2,6.8C7,7.2,6.2,7.9,6.2,9.5c0,1.6,1.2,3.2,1.3,3.4c0.1,0.2,2.1,3.3,5.1,4.5c0.7,0.3,1.3,0.5,1.7,0.6c0.7,0.2,1.4,0.2,1.9,0.1c0.6-0.1,1.7-0.7,1.9-1.3c0.2-0.6,0.2-1.2,0.2-1.3C17.6,13,17.4,12.9,16.7,12.7" fill="currentColor"/>
          </svg>
          CONTINUE WITH APPLE
        </button>
        <button className="w-full bg-white text-black py-4 rounded-xl font-medium flex items-center justify-center gap-2">
          <svg viewBox="0 0 24 24" className="w-6 h-6">
            <path d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z" fill="currentColor"/>
          </svg>
          CONTINUE WITH GOOGLE
        </button>
        <button className="w-full bg-white text-black py-4 rounded-xl font-medium flex items-center justify-center gap-2">
          <svg viewBox="0 0 24 24" className="w-6 h-6">
            <path d="M20,4H4C2.9,4,2,4.9,2,6v12c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V6C22,4.9,21.1,4,20,4z M20,8l-8,5L4,8V6l8,5l8-5V8z" fill="currentColor"/>
          </svg>
          CONTINUE WITH EMAIL
        </button>
        <button className="w-full bg-white text-black py-4 rounded-xl font-medium flex items-center justify-center gap-2">
          <svg viewBox="0 0 24 24" className="w-6 h-6">
            <path d="M12,2.04C6.5,2.04,2,6.53,2,12.06C2,17.06,5.66,21.21,10.44,21.96V14.96H7.9V12.06H10.44V9.85C10.44,7.34,11.93,5.96,14.22,5.96C15.31,5.96,16.45,6.15,16.45,6.15V8.62H15.19C13.95,8.62,13.56,9.39,13.56,10.18V12.06H16.34L15.89,14.96H13.56V21.96A10,10,0,0,0,22,12.06C22,6.53,17.5,2.04,12,2.04Z" fill="currentColor"/>
          </svg>
          CONTINUE WITH FACEBOOK
        </button>
      </div>

      {/* Terms and conditions */}
      <p className="text-sm text-center text-gray-400">
        By continuing, you agree to Lifesum's{" "}
        <Link href="#" className="text-blue-500">
          Terms & Conditions
        </Link>{" "}
        and{" "}
        <Link href="#" className="text-blue-500">
          Privacy Policy
        </Link>
      </p>
    </div>
  );
}