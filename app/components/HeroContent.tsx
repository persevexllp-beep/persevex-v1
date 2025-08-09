// app/components/HeroContent.tsx
export default function HeroContent() {
  return (
    <div className="relative z-10 flex h-full flex-col items-center justify-center">
      {/* Main Text Content */}
      <div className="max-w-4xl px-4 text-left sm:text-center -mt-20">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
          Empowering the Next Generation
          <br />
          with Real-World Skills
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-300">
          Experience hands-on learning with AI guidance, expert-curated
          projects, and career-ready outcomes.
        </p>
      </div>

      {/* Large Watermark Text */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <h2
          className="select-none text-[12rem] font-black text-transparent opacity-10 sm:text-[20rem] lg:text-[24rem]"
          style={{ WebkitTextStroke: '1px rgba(255, 255, 255, 0.3)' }}
        >
          PERSEVEX
        </h2>
      </div>
    </div>
  );
}