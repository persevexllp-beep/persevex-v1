"use client";

// We need forwardRef to pass the ref from the parent to the h2 element
import { forwardRef } from "react";

// The component is wrapped in forwardRef
const Hero = forwardRef<HTMLHeadingElement>((props, ref) => {
  return (
    <section className="relative w-full h-full">
      {/* Big outlined text */}
      <div className="absolute inset-0 z-10 flex items-end justify-center pointer-events-none overflow-hidden">
        <h2
          // The ref from the parent is attached here
          ref={ref}
          className="text-[24vw] md:text-[20vw] lg:text-[18rem] font-black uppercase text-transparent opacity-40 select-none leading-none transform translate-y-[4rem]"
          style={{ WebkitTextStroke: "1px white" }}
        >
          Persevex
        </h2>
      </div>
      
      {/* Main content container (unchanged) */}
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
});

// Set a display name for easier debugging in React DevTools
Hero.displayName = 'Hero';
export default Hero;