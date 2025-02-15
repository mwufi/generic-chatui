"use client";
import Link from "next/link";
import { useState } from "react";

export default function FastingPart4() {
  const [selectedHour, setSelectedHour] = useState(2);
  const [selectedMinute, setSelectedMinute] = useState(47);
  const [selectedPeriod, setSelectedPeriod] = useState("AM");

  const formatTime = (hour: number, minute: number, period: string) => {
    return `${hour}:${minute.toString().padStart(2, "0")} ${period}`;
  };

  const calculateEndTime = () => {
    let endHour = selectedHour;
    let endPeriod = selectedPeriod;

    // Add 12 hours for fasting period
    endHour += 12;
    if (endHour >= 12) {
      endPeriod = endPeriod === "AM" ? "PM" : "AM";
      if (endHour > 12) endHour -= 12;
    }

    return formatTime(endHour, selectedMinute, endPeriod);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-4 p-4">
        <Link href="/interactive/fasting/3" className="text-white">
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
        <h2 className="text-3xl font-serif mb-4">
          When do you want to start your
          <br />
          fasting window?
        </h2>
        <p className="text-gray-400">Fasting interval: 12:12</p>
      </div>

      {/* Time Picker */}
      <div className="px-4 flex-1">
        <div className="bg-[#1A1A1A] rounded-xl p-6 mb-4">
          <div className="text-center mb-4">Start time</div>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="text-4xl text-[#4CAF50] font-medium">
              {formatTime(selectedHour, selectedMinute, selectedPeriod)}
            </div>
          </div>
          <div className="text-sm text-center text-gray-400">Today</div>
        </div>

        <div className="bg-[#1A1A1A] rounded-xl p-6 mb-4">
          <div className="text-center mb-4">Your fast will end at</div>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="text-4xl font-medium">
              {calculateEndTime()}
            </div>
          </div>
          <div className="text-sm text-center text-gray-400">Today</div>
        </div>

        {/* Time Selection */}
        <div className="flex justify-center gap-8 mb-4">
          <button
            onClick={() => setSelectedPeriod("AM")}
            className={`px-6 py-2 rounded-full ${
              selectedPeriod === "AM"
                ? "bg-[#4CAF50] text-white"
                : "bg-[#1A1A1A] text-gray-400"
            }`}
          >
            AM
          </button>
          <button
            onClick={() => setSelectedPeriod("PM")}
            className={`px-6 py-2 rounded-full ${
              selectedPeriod === "PM"
                ? "bg-[#4CAF50] text-white"
                : "bg-[#1A1A1A] text-gray-400"
            }`}
          >
            PM
          </button>
        </div>
      </div>

      <p className="px-4 text-sm text-gray-400 mb-6 text-center">
        If you want to edit your end time, go back and choose your own fasting
        interval. You can always change your interval later.
      </p>

      {/* Fixed Bottom Button */}
      <div className="p-4">
        <Link
          href="/dashboard"
          className="w-full bg-[#4CAF50] text-white py-4 rounded-lg font-medium text-center flex items-center justify-center gap-2"
        >
          NEXT
          <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
        </Link>
      </div>
    </div>
  );
}