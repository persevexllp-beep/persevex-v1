"use client";

export default function CoursesSection({ scrollProgress = 0 }: { scrollProgress?: number }) {
  // Calculate opacity for COURSES watermark
  // With 3.5 pages, starts appearing later for smoother transition
  const coursesOpacity = Math.min(0.4, Math.max(0, (scrollProgress - 0.5) / 0.3) * 0.4);
  
  return (
    <section className="relative w-full h-full">
      {/* COURSES watermark that appears as you scroll */}
      <div className="absolute inset-0 z-10 flex items-end justify-center pointer-events-none overflow-hidden">
        <h2
          className="text-[24vw] md:text-[20vw] lg:text-[18rem] font-black uppercase text-transparent select-none leading-none transform translate-y-[4rem]"
          style={{ 
            WebkitTextStroke: "1px white",
            opacity: coursesOpacity
          }}
        >
          Courses
        </h2>
      </div>
      
      {/* Main content container */}
      <div className="relative z-20 h-full flex flex-col justify-center">
        <div className="max-w-6xl mx-auto px-8 w-full">
          <h1 className="text-4xl md:text-6xl lg:text-5xl font-extrabold leading-tight mb-6">
            Our Courses
          </h1>
          <p className="text-lg md:text-xl max-w-2xl opacity-90 mb-8">
            Here you can list your courses. The gradient background that you've 
            scrolled down seamlessly continues from the first page.
          </p>
          
          {/* Placeholder for course cards */}
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
}