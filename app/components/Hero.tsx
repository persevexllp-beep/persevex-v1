// Hero.tsx
"use client";

// No longer needs forwardRef

export default function Hero() {
  // REMOVED: The watermark div is no longer here.
  return (
    // The parent div in LandingPage.tsx now controls the min-h-screen
    <section className="relative w-full h-full">
      {/* Main content container */}
      {/* The z-index is still important to keep content above the 3D scene */}
      <div className="relative z-20 h-full flex text-white flex-col justify-center">
        <div className=" mx-auto px-8 w-full">
          <h1 className="text-4xl md:text-6xl lg:text-5xl font-extrabold leading-tight">
            Empowering the Next Generation <br className="hidden md:block" />
            <span className="block">with Real-World Skills</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl max-w-2xl opacity-90">
            Experience hands-on learning with AI guidance, expert-curated
            projects, and career-ready outcomes
          </p>
          <button
            className="
              pointer-events-auto
              relative px-8 py-3 mt-8 
              text-lg font-semibold text-white 
              rounded-xl border-none cursor-pointer
              bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400
              bg-[length:300%_300%]
              animate-gradient-shift
              transition-all duration-300 ease-in-out
              hover:scale-105 hover:shadow-lg hover:shadow-orange-500/40
              focus:outline-none focus:ring-4 focus:ring-orange-500/50
            "
          >
            Explore Courses
          </button>
        </div>
      </div>
    </section>
  );
}