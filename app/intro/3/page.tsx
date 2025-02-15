"use client";
import Link from "next/link";

export default function QuizStep3() {
  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col">
      {/* Header with progress and back button */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/intro/2" className="text-white">
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
          <div className="h-1 bg-white/20 rounded flex-1" />
          <div className="h-1 bg-white/20 rounded flex-1" />
          <div className="h-1 bg-white/20 rounded flex-1" />
          <div className="h-1 bg-white/20 rounded flex-1" />
          <div className="h-1 bg-white/20 rounded flex-1" />
        </div>
      </div>

      {/* Avatar and title */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-full bg-[#4CAF50] flex items-center justify-center">
          <span className="text-lg font-semibold">L</span>
        </div>
        <p className="text-lg">Next step</p>
      </div>

      {/* Question */}
      <h1 className="text-3xl font-serif mb-8">
        What's your date of birth?
      </h1>

      {/* Date selection */}
      <div className="flex flex-col gap-4 mb-auto">
        <div className="grid grid-cols-3 gap-4">
          {/* Day */}
          <div className="flex flex-col gap-2">
            <div className="bg-[#4CAF50] text-white p-4 rounded-xl text-center">
              <span className="text-xl">7</span>
            </div>
            <div className="grid grid-cols-1 gap-2">
              <button className="bg-white/10 text-white p-4 rounded-xl text-center">
                <span className="text-xl">6</span>
              </button>
              <button className="bg-white/10 text-white p-4 rounded-xl text-center">
                <span className="text-xl">8</span>
              </button>
              <button className="bg-white/10 text-white p-4 rounded-xl text-center">
                <span className="text-xl">9</span>
              </button>
            </div>
          </div>

          {/* Month */}
          <div className="flex flex-col gap-2">
            <div className="bg-[#4CAF50] text-white p-4 rounded-xl text-center">
              <span className="text-xl">Apr</span>
            </div>
            <div className="grid grid-cols-1 gap-2">
              <button className="bg-white/10 text-white p-4 rounded-xl text-center">
                <span className="text-xl">Mar</span>
              </button>
              <button className="bg-white/10 text-white p-4 rounded-xl text-center">
                <span className="text-xl">May</span>
              </button>
              <button className="bg-white/10 text-white p-4 rounded-xl text-center">
                <span className="text-xl">Jun</span>
              </button>
            </div>
          </div>

          {/* Year */}
          <div className="flex flex-col gap-2">
            <div className="bg-[#4CAF50] text-white p-4 rounded-xl text-center">
              <span className="text-xl">2000</span>
            </div>
            <div className="grid grid-cols-1 gap-2">
              <button className="bg-white/10 text-white p-4 rounded-xl text-center">
                <span className="text-xl">1999</span>
              </button>
              <button className="bg-white/10 text-white p-4 rounded-xl text-center">
                <span className="text-xl">2001</span>
              </button>
              <button className="bg-white/10 text-white p-4 rounded-xl text-center">
                <span className="text-xl">2002</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Info text */}
      <p className="text-white/60 text-center text-sm mt-8 mb-6">
        We use this information to calculate and provide you with
        daily personalized recommendations.
      </p>

      {/* Next button */}
      <Link
        href="/intro/4"
        className="w-full bg-[#4CAF50] text-white py-4 rounded-lg font-medium text-center flex items-center justify-center gap-2"
      >
        NEXT
        <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
      </Link>
    </div>
  );
}