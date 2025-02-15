"use client";
import Link from "next/link";

export default function BenefitsScreen() {
  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col">
      {/* Header with checkmark */}
      <div className="flex justify-center mb-6">
        <div className="w-12 h-12 rounded-full bg-[#4CAF50] flex items-center justify-center">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-serif text-center mb-8">
        Julie, your personalized health plan
        <br />
        is ready!
      </h1>

      {/* Weight goal card */}
      <div className="bg-white/10 rounded-2xl p-6 mb-4">
        <div className="flex items-baseline gap-2 justify-center mb-2">
          <span className="text-3xl">69 kg</span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-[#4CAF50]"
          >
            <path d="M7 14l5-5 5 5z" />
          </svg>
          <span className="text-3xl">60 kg</span>
        </div>
        <p className="text-center text-sm text-gray-400">
          Follow your recommendations and you will reach your
          <br />
          goal on June 12, 2024.
        </p>
      </div>

      {/* Nutritional recommendations card */}
      <div className="bg-white/10 rounded-2xl p-6 mb-4">
        <h2 className="text-xl font-serif mb-1">
          Daily nutritional recommendations
        </h2>
        <p className="text-sm text-gray-400 mb-6">
          You can edit this anytime in the app
        </p>

        {/* Progress bars */}
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Calories</span>
              <span>1511 kcal</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full w-[75%] bg-[#4CAF50] rounded-full" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Carbs</span>
              <span>50%</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full w-[50%] bg-[#FFA726] rounded-full" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Fat</span>
              <span>30%</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full w-[30%] bg-[#EC407A] rounded-full" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Protein</span>
              <span>20%</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full w-[20%] bg-[#7E57C2] rounded-full" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Life Score</span>
              <span>110 points</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full w-[80%] bg-[#42A5F5] rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Goals card */}
      <div className="bg-white/10 rounded-2xl p-6 mb-8">
        <h2 className="text-xl font-serif mb-4">
          How to reach your goals:
        </h2>
        <div className="flex items-center gap-4 text-sm text-gray-400">
          <div className="w-12 h-12 rounded-full bg-[#4CAF50]/20 flex items-center justify-center flex-shrink-0">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-[#4CAF50]"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
            </svg>
          </div>
          <p>
            Get your weekly Life Score and personal
            <br />
            advice to improve your habits
          </p>
        </div>
      </div>

      {/* Get started button */}
      <Link
        href="/dashboard"
        className="w-full bg-[#4CAF50] text-white py-4 rounded-lg font-medium text-center flex items-center justify-center gap-2"
      >
        GET STARTED
        <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
      </Link>
    </div>
  );
}