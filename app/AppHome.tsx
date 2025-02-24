import Image from "next/image";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-between text-white">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/example.png"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full flex flex-col items-center justify-between min-h-screen px-6 py-8">
        {/* Header */}
        <div className="w-full flex justify-between items-center">
          <h1 className="text-2xl font-serif">Lifesum</h1>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 flex items-center">
              <div className="h-0.5 w-0.5 bg-white rounded-full" />
              <div className="h-0.5 w-0.5 bg-white rounded-full ml-0.5" />
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="text-center mt-auto mb-auto">
          <h2 className="text-4xl font-serif mb-4">
            Healthy eating.
            <br />
            Simplified.
          </h2>
        </div>

        {/* Footer */}
        <div className="w-full flex flex-col items-center gap-4">
          <button className="w-full bg-[#4CAF50] text-white py-4 rounded-lg font-medium">
            GET STARTED
          </button>
          <p className="text-sm">
            Already have an account?{" "}
            <a href="#" className="text-[#4CAF50] underline">
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
