"use client";
import Image from "next/image";

export default function LoadingScreen() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 relative">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/example.png"
          alt="Abstract art"
          fill
          className="object-contain"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center mt-auto">
        <h1 className="text-3xl font-serif mb-4">
          We're setting everything up
          <br />
          for you
        </h1>
        <p className="text-gray-400 mb-8">
          Customizing your health plan...
        </p>
        
        {/* Loading spinner */}
        <div className="w-12 h-12 rounded-full border-4 border-[#4CAF50] border-t-transparent animate-spin mb-auto" />
      </div>
    </div>
  );
}