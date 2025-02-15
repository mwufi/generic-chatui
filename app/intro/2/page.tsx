"use client";
import Link from "next/link";
import Image from "next/image";

export default function QuizStep2() {
  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col">
      {/* Header with progress and back button */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/intro/1" className="text-white">
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
          <div className="h-1 bg-white/20 rounded flex-1" />
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
        <p className="text-lg">We're excited to help you!</p>
      </div>

      {/* Question */}
      <h1 className="text-3xl font-serif mb-8 leading-tight">
        What sex should we use to calculate your recommendations?
      </h1>

      {/* Options */}
      <div className="flex flex-col gap-4 mb-auto">
        <button className="w-full bg-[#4CAF50] text-white p-6 rounded-2xl text-left text-lg flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM16 15C16 12.8 14.2 11 12 11C9.8 11 8 12.8 8 15V16H16V15Z" />
            </svg>
          </div>
          Female
        </button>
        <button className="w-full bg-white/10 text-white p-6 rounded-2xl text-left text-lg flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM16 15C16 12.8 14.2 11 12 11C9.8 11 8 12.8 8 15V16H16V15Z" />
            </svg>
          </div>
          Male
        </button>
      </div>

      {/* Info link */}
      <button className="text-[#4CAF50]/80 text-sm underline text-center mt-8 mb-6">
        Why do we need this information?
      </button>

      {/* Next button */}
      <Link
        href="/intro/3"
        className="w-full bg-[#4CAF50] text-white py-4 rounded-lg font-medium text-center flex items-center justify-center gap-2"
      >
        NEXT
        <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
      </Link>
    </div>
  );
}