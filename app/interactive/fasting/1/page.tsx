"use client";
import Link from "next/link";
import Image from "next/image";

export default function FastingPart1() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex-1 flex items-center">
          <div className="flex-1 flex gap-1">
            <div className="h-1 bg-[#4CAF50] rounded flex-1" />
            <div className="h-1 bg-white/20 rounded flex-1" />
            <div className="h-1 bg-white/20 rounded flex-1" />
            <div className="h-1 bg-white/20 rounded flex-1" />
          </div>
        </div>
        <Link href="/home" className="ml-4">
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

      <h1 className="text-xl px-4 mb-4">Intermittent fasting</h1>

      {/* Image Grid */}
      <div className="grid grid-cols-2 gap-2 p-4">
        <div className="aspect-square relative rounded-xl overflow-hidden">
          <Image
            src="/example.png"
            alt="Food preparation"
            fill
            className="object-cover"
          />
        </div>
        <div className="aspect-square relative rounded-xl overflow-hidden">
          <Image
            src="/example.png"
            alt="Healthy meal"
            fill
            className="object-cover"
          />
        </div>
        <div className="aspect-square relative rounded-xl overflow-hidden">
          <Image
            src="/example.png"
            alt="Person exercising"
            fill
            className="object-cover"
          />
        </div>
        <div className="aspect-square relative rounded-xl overflow-hidden">
          <Image
            src="/example.png"
            alt="Water and bread"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Info Cards */}
      <div className="p-4 space-y-4 flex-1">
        {/* Text Card */}
        <div className="bg-[#1A1A1A] rounded-xl p-6">
          <h2 className="text-2xl font-serif mb-4">Intermittent fasting</h2>
          <p className="text-gray-400">
            Intermittent fasting is an eating plan that switches between
            fasting and eating on a regular schedule. Research shows fasting
            for a certain number of hours each day may have health benefits.
          </p>
        </div>

        {/* Highlight Card */}
        <div className="bg-[#1A1A1A] rounded-xl p-6">
          <h2 className="text-2xl font-serif mb-4">
            Fasting is made up of two
            <br />
            distinct phases
          </h2>
        </div>
      </div>

      {/* Fixed Bottom Button */}
      <div className="p-4">
        <Link
          href="/interactive/fasting/2"
          className="w-full bg-[#4CAF50] text-white py-4 rounded-lg font-medium text-center flex items-center justify-center gap-2"
        >
          NEXT
        </Link>
      </div>
    </div>
  );
}