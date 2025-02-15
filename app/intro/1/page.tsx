import Link from "next/link";
import Image from "next/image";

export default function QuizStep1() {
  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col">
      {/* Header with progress and back button */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/" className="text-white">
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
          <div className="h-1 bg-white/20 rounded flex-1" />
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
        <p className="text-lg">Let's get to know you better!</p>
      </div>

      {/* Question */}
      <h1 className="text-3xl font-serif mb-8">
        What goal do you have in mind?
      </h1>

      {/* Options */}
      <div className="flex flex-col gap-4 mb-auto">
        <button className="w-full bg-[#4CAF50] text-white p-6 rounded-2xl text-left text-lg">
          Lose weight
        </button>
        <button className="w-full bg-white/10 text-white p-6 rounded-2xl text-left text-lg">
          Maintain weight
        </button>
        <button className="w-full bg-white/10 text-white p-6 rounded-2xl text-left text-lg">
          Gain weight
        </button>
      </div>

      {/* Info text */}
      <p className="text-white/60 text-center text-sm mt-8 mb-6">
        We use this information to calculate and provide you with
        daily personalized recommendations.
      </p>

      {/* Next button */}
      <Link
        href="/intro/2"
        className="w-full bg-[#4CAF50] text-white py-4 rounded-lg font-medium text-center flex items-center justify-center gap-2"
      >
        NEXT
        <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
      </Link>
    </div>
  );
}