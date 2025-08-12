"use client";

export default function CoursesSection() {
  return (
    // The parent div in LandingPage now controls animation and positioning.
    <div className="max-w-6xl text-white mx-auto px-8 w-full">
      <h1 className="text-4xl md:text-6xl lg:text-5xl font-extrabold leading-tight mb-6">
        Our Courses
      </h1>
      <p className="text-lg md:text-xl max-w-2xl opacity-90 mb-8">
        Here you can list your courses. The gradient background that you've
        scrolled down seamlessly continues from the first page.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pointer-events-auto">
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
  );
}