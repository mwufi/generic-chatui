"use client";
import Link from "next/link";
import { Lock } from "lucide-react";
import { useState } from "react";

export default function FastingPart3() {
  const [selectedInterval, setSelectedInterval] = useState("12:12");

  const intervals = [
    {
      id: "12:12",
      badge: "BALANCED",
      title: "12:12",
      description: "Small changes can make a big difference with a 12-hour fasting period. Great for those who want to quit late-night snacking."
    },
    {
      id: "16:8",
      badge: "IDEAL WITH OUR 16:8 MEAL PLANS",
      title: "16:8",
      description: "Suitable for those who want to skip a meal during the 16-hour fasting period, and fits with our easy-to-follow Meal Plans."
    },
    {
      id: "14:10",
      badge: "ADVANCED WEIGHT LOSS",
      title: "14:10",
      description: "Put your body into ketosis during the 14-hour fasting period, and continue eating at least 3 meals daily."
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-4 p-4">
        <Link href="/interactive/fasting/2" className="text-white">
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
        <h2 className="text-3xl font-serif mb-4">Choose your fasting interval</h2>
      </div>

      {/* Custom Interval Option */}
      <div className="px-4 mb-4">
        <button className="w-full bg-[#1A1A1A] rounded-xl p-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg mb-1">Custom fasting interval</h3>
            <p className="text-sm text-gray-400">
              Set any fasting period that matches your level and your
              day-to-day life
            </p>
          </div>
          <Lock className="text-gray-400" />
        </button>
      </div>

      {/* Interval Options */}
      <div className="px-4 space-y-4 flex-1">
        {intervals.map((interval) => (
          <button
            key={interval.id}
            onClick={() => setSelectedInterval(interval.id)}
            className={`w-full text-left ${
              selectedInterval === interval.id
                ? "bg-[#4CAF50]"
                : "bg-[#1A1A1A]"
            } rounded-xl p-4`}
          >
            <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full mb-2 ${
              selectedInterval === interval.id
                ? "bg-white/20"
                : interval.badge === "BALANCED"
                ? "bg-blue-500"
                : interval.badge === "IDEAL WITH OUR 16:8 MEAL PLANS"
                ? "bg-orange-500"
                : "bg-purple-500"
            }`}>
              {interval.badge}
            </span>
            <h3 className="text-xl font-medium mb-1">{interval.title}</h3>
            <p className="text-sm text-gray-200">
              {interval.description}
            </p>
          </button>
        ))}
      </div>

      {/* Fixed Bottom Button */}
      <div className="p-4">
        <Link
          href="/interactive/fasting/4"
          className="w-full bg-[#4CAF50] text-white py-4 rounded-lg font-medium text-center flex items-center justify-center gap-2"
        >
          NEXT
          <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
        </Link>
      </div>
    </div>
  );
}