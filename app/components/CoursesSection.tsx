"use client";

// We need forwardRef to pass the ref from the parent to the h2 element
import { forwardRef } from "react";

const CoursesSection = forwardRef<HTMLHeadingElement>((props, ref) => {
  return (
    <section className="relative w-full h-full">
      {/* COURSES watermark that appears as you scroll */}
      <div className="absolute inset-0 z-10 flex items-end justify-center pointer-events-none overflow-hidden">
        <h2
          // The ref from the parent is attached here
          ref={ref}
          className="text-[24vw] md:text-[20vw] lg:text-[18rem] font-black uppercase text-transparent select-none leading-none transform translate-y-[4rem]"
          // Start with opacity 0, the animation logic in LandingPage will fade it in
          style={{ 
            WebkitTextStroke: "1px white",
            opacity: 0 
          }}
        >
          Courses
        </h2>
      </div>
      
      {/* Main content container (unchanged) */}
      <div className="relative z-20 h-full flex flex-col justify-center">
        <div className="max-w-6xl mx-auto px-8 w-full">
          <h1 className="text-4xl md:text-6xl lg:text-5xl font-extrabold leading-tight mb-6">
            Our Courses
          </h1>
          <p className="text-lg md:text-xl max-w-2xl opacity-90 mb-8">
            Here you can list your courses. The gradient background that you've 
            scrolled down seamlessly continues from the first page.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <h3 className="text-xl font-semibold mb-2">Web Development</h3>
              <p className="text-white/80">Learn modern web technologies</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <h3 className="text-xl font-semibold mb-2">Data Science</h3>
              <p className="text-white/80">Master data analysis and ML</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <h3 className="text-xl font-semibold mb-2">Mobile Development</h3>
              <p className="text-white/80">Build iOS and Android apps</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

// Set a display name for easier debugging in React DevTools
CoursesSection.displayName = 'CoursesSection';
export default CoursesSection;