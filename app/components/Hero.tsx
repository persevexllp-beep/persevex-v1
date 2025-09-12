
"use client";

import Link from "next/link";

export default function Hero() {
  return (
    // The parent div in LandingPage now controls animation and positioning.
    // This div just groups the content.
    <div className="max-w-6xl text-white  mx-auto px-4 md:px-8 w-full text-center md:text-left">
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl font-extrabold leading-tight">
        Empowering the Next Generation <br className="hidden md:block" />
        <span className="block">with Real-World Skills</span>
      </h1>
      <p className="mt-4 md:mt-6 text-lg md:text-xl max-w-2xl opacity-90 mx-auto md:mx-0">
        Experience hands-on learning with AI guidance, expert-curated
        projects, and career-ready outcomes
      </p>
      <Link
        // IMPORTANT: Allow clicks on the button
        href='/explore-courses'
        className="pointer-events-auto relative px-8 py-3 mt-6 md:mt-8 text-lg font-semibold text-white rounded-xl border-none cursor-pointer bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400 bg-[length:300%_300%] animate-gradient-shift transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-orange-500/40 "
      >
        Explore Courses
      </Link>
    </div>
  );
}