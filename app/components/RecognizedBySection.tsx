// Filename: RecognizedBySection.tsx

"use client";

import React from "react";
import { useInView } from "../hooks/useInView"; // Adjust path if needed
import Image, { StaticImageData } from "next/image";

// It's best practice to import images directly for Next.js optimization
import startupImg from "/public/startup.png";
import skillImg from "/public/skill.png";
import msmeImg from "/public/msme.png";
import isoImg from "/public/iso.png";
import aicteImg from "/public/aicte.png";

// --- ENHANCED LOGO DATA FOR BUBBLE DESIGN ---
interface BubbleLogoData {
  src: StaticImageData;
  alt: string;
  size: string; // Tailwind width/height class e.g., 'w-32 h-32'
  position: { top: string; left: string };
  animation: {
    name: string;   // Our custom class from globals.css
    delay: string;  // A string like '-5s' for inline style
  };
}

const logos: BubbleLogoData[] = [
  {
    src: startupImg,
    alt: "Startup India",
    size: "w-40 h-40 md:w-48 md:h-48",
    position: { top: "15%", left: "10%" },
    animation: { name: "animate-float-1", delay: "-2s" },
  },
  {
    src: skillImg,
    alt: "Skill India",
    size: "w-32 h-32 md:w-36 md:h-36",
    position: { top: "30%", left: "75%" },
    animation: { name: "animate-float-2", delay: "-8s" },
  },
  {
    src: msmeImg,
    alt: "MSME",
    size: "w-48 h-48 md:w-56 md:h-56",
    position: { top: "50%", left: "45%" },
    animation: { name: "animate-float-3", delay: "-5s" },
  },
  {
    src: isoImg,
    alt: "ISO Certified",
    size: "w-28 h-28 md:w-32 md:h-32",
    position: { top: "70%", left: "15%" },
    animation: { name: "animate-float-2", delay: "-12s" },
  },
  {
    src: aicteImg,
    alt: "AICTE",
    size: "w-36 h-36 md:w-44 md:h-44",
    position: { top: "8%", left: "55%" },
    animation: { name: "animate-float-1", delay: "-1s" },
  },
];

// --- BUBBLE LOGO COMPONENT ---
const BubbleLogo = ({ logo }: { logo: BubbleLogoData }) => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <div
      ref={ref}
      className={`
        absolute flex items-center justify-center rounded-full
        transform-gpu transition-all duration-1000 ease-out
        ${logo.size}
        ${logo.animation.name}
        ${inView ? "scale-100 opacity-100" : "scale-50 opacity-0"}
      `}
      style={{
        top: logo.position.top,
        left: logo.position.left,
        animationDelay: logo.animation.delay,
      }}
    >
      <div className="relative w-full h-full group cursor-pointer">
        {/* Layer 1: Main Bubble Body (3D effect) */}
        <div className="
          absolute inset-0 rounded-full
          bg-gradient-to-br from-white/20 to-transparent
          shadow-inner shadow-white/20
          border border-white/10
          backdrop-blur-sm
        " />
        
        {/* Layer 2: The Logo */}
        <div className="relative z-10 w-full h-full flex items-center justify-center p-4 md:p-6">
          <Image
            src={logo.src}
            alt={logo.alt}
            width={200}
            height={200}
            className="
              object-contain w-full h-full
              filter brightness-125 contrast-110 group-hover:brightness-150
              transition-all duration-300 scale-90 group-hover:scale-100
            "
          />
        </div>

        {/* Layer 3: Glossy Highlight (on top of logo) */}
        <div className="
          absolute top-[10%] left-[10%] w-2/5 h-2/5
          bg-gradient-to-br from-white/50 to-transparent
          rounded-full transform -rotate-45
          opacity-70 group-hover:opacity-90 transition-opacity
          z-20 pointer-events-none
        " />

        {/* Hover Label */}
        <div className="
          absolute -bottom-4 left-1/2 -translate-x-1/2
          opacity-0 group-hover:opacity-100
          transition-all duration-300 ease-out
          translate-y-2 group-hover:translate-y-0
        ">
          <div className="
            px-3 py-1 rounded-full text-xs font-medium
            bg-black/50 backdrop-blur-sm border border-white/20
            text-white whitespace-nowrap
          ">
            {logo.alt}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN SECTION COMPONENT ---
const RecognizedBySection = () => {
  const [titleRef, titleInView] = useInView({ threshold: 0.5, triggerOnce: true });

  return (
    <section className="
      relative w-full min-h-screen 
      flex flex-col justify-center items-center 
      px-4 py-20 overflow-hidden
     
    ">

      <div
        ref={titleRef}
        className={`
          text-center mb-12 relative z-10
          transition-all duration-1000 ease-out
          ${titleInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
        `}
      >
        <h2 className="
          text-5xl md:text-6xl lg:text-7xl font-bold mb-6
          bg-gradient-to-r from-white to-gray-400
          bg-clip-text text-transparent leading-tight
        ">
          Recognized By
        </h2>
        <p className="
          text-lg md:text-xl text-gray-300 max-w-3xl mx-auto
          font-light
        ">
          We collaborate with leading organizations to provide you with the{" "}
          <span className="
            bg-gradient-to-r from-blue-400 to-cyan-400
            bg-clip-text text-transparent font-medium
          ">
            best learning experience
          </span>
        </p>
      </div>

      {/* Bubble Container - Spans the entire section */}
      <div className="absolute inset-0 w-full h-full z-0">
        {logos.map((logo) => (
          <BubbleLogo key={logo.alt} logo={logo} />
        ))}
      </div>
    </section>
  );
};

export default React.memo(RecognizedBySection);