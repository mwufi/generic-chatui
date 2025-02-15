"use client";
import Link from "next/link";
import { Flame, Zap } from "lucide-react";

export default function FastingPart2() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-4 p-4">
        <Link href="/interactive/fasting/1" className="text-white">
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
        </div>
        <Link href="/home" className="text-white">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </Link>
      </div>

      <div className="px-4 mb-6">
        <h1 className="text-xl mb-2">Intermittent fasting</h1>
        <h2 className="text-3xl font-serif mb-4">Fasting stages</h2>
        <p className="text-gray-400">
          When we fast, our body goes through different stages.
          Remember that your body is unique, and these phases
          may start at other times depending on your health,
          activity, and environment.
        </p>
      </div>

      {/* Timeline */}
      <div className="px-4 flex-1">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-[#FF5F6D] to-[#4CAF50]" />

          {/* Stage 1 */}
          <div className="relative flex gap-4 mb-8">
            <div className="w-12 h-12 rounded-full bg-[#FF5F6D] flex items-center justify-center flex-shrink-0">
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm text-gray-400">11-12 hours of fasting</div>
              <h3 className="text-xl font-medium mb-2">Fat-burning stage</h3>
              <p className="text-gray-400">
                When the body has used all of the available glucose from the
                food you have eaten, it starts using its fat reserves as fuel.
              </p>
            </div>
          </div>

          {/* Stage 2 */}
          <div className="relative flex gap-4">
            <div className="w-12 h-12 rounded-full bg-[#4CAF50] flex items-center justify-center flex-shrink-0">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm text-gray-400">12-14 hours of fasting</div>
              <h3 className="text-xl font-medium mb-2">Ketosis</h3>
              <p className="text-gray-400">
                The body enters the stage of ketosis. The body is now fully
                running on body fat as fuel, turning the fat cells into ketone
                bodies in the liver, which are then used as energy.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Button */}
      <div className="p-4">
        <Link
          href="/interactive/fasting/3"
          className="w-full bg-[#4CAF50] text-white py-4 rounded-lg font-medium text-center flex items-center justify-center gap-2"
        >
          NEXT
          <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
        </Link>
      </div>
    </div>
  );
}