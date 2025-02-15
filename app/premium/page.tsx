"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function PremiumScreen() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState(1); // Default to 3 months plan (index 1)

  const slides = [
    {
      image: "/example.png",
      title: "Julie, be 5x more likely to succeed with Premium"
    },
    {
      image: "/example.png",
      title: "Get personalized meal plans and recipes"
    },
    {
      image: "/example.png",
      title: "Track your progress with detailed insights"
    }
  ];

  const plans = [
    {
      duration: 1,
      unit: "month",
      price: 7.49,
      originalPrice: 14.99,
      monthly: 7.49,
      billing: "Billed monthly"
    },
    {
      duration: 3,
      unit: "months",
      price: 19.99,
      originalPrice: 39.99,
      monthly: 6.66,
      billing: "Billed quarterly"
    },
    {
      duration: 12,
      unit: "months",
      price: 49.99,
      originalPrice: 99.99,
      monthly: 4.17,
      billing: "Billed yearly"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-start p-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-serif">Lifesum</span>
          <span className="px-2 py-0.5 bg-[#4CAF50] rounded-full text-xs font-medium">
            PREMIUM
          </span>
        </div>
        <Link href="/intro/benefits">
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

      {/* Carousel section */}
      <div className="relative h-[45vh] flex flex-col justify-end pb-16">
        <div className="absolute inset-0">
          <Image
            src={slides[currentSlide].image}
            alt="Premium feature"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
        </div>

        {/* Slide content */}
        <div className="relative z-10 text-center px-6">
          <h1 className="text-3xl font-serif mb-4">
            {slides[currentSlide].title}
          </h1>
          
          {/* Dots navigation */}
          <div className="flex gap-2 justify-center">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full ${
                  index === currentSlide ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Discount banner */}
      <div className="bg-[#4CAF50] py-3 text-center font-medium text-lg">
        50% off Premium
      </div>

      {/* Pricing options */}
      <div className="px-4 py-6">
        <div className="grid grid-cols-3 gap-2">
          {plans.map((plan, index) => (
            <button
              key={index}
              onClick={() => setSelectedPlan(index)}
              className={`rounded-xl p-3 text-center transition-colors ${
                selectedPlan === index
                  ? "bg-[#4CAF50]"
                  : "bg-[#1A1A1A]"
              } ${index === 1 ? "relative" : ""}`}
            >
              {index === 1 && (
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#4CAF50] text-white text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap">
                  MOST POPULAR
                </div>
              )}
              <div className="text-2xl mb-1">{plan.duration}</div>
              <div className="text-sm text-gray-400 mb-2">{plan.unit}</div>
              <div className="text-lg mb-1">{plan.price} €</div>
              <div className="text-xs text-gray-400 line-through mb-2">
                {plan.originalPrice} €
              </div>
              <div className="text-sm text-gray-400">
                {plan.monthly} € / month
              </div>
              <div className="text-xs text-gray-400">{plan.billing}</div>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-6 space-y-4">
          <p className="text-xs text-center text-gray-400">
            ✓ Secured with App Store. Auto-renewable billing. Cancel anytime.
          </p>

          <button className="w-full bg-[#4CAF50] text-white py-4 rounded-lg font-medium text-lg">
            CONTINUE
          </button>

          <div className="flex justify-between text-sm text-gray-400">
            <button className="underline">RESTORE PURCHASE</button>
            <button className="underline">REDEEM CODE</button>
          </div>
        </div>
      </div>
    </div>
  );
}