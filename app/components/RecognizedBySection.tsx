// Filename: RecognizedBySection.tsx

"use client";

import React from "react";
import { useInView } from "../hooks/useInView"; // Adjust path if needed
import Image, { StaticImageData } from "next/image";

// Import your logo images
import startupImg from "/public/startup.png";
import skillImg from "/public/skill.png";
import msmeImg from "/public/msme.png";
import isoImg from "/public/iso.png";
import aicteImg from "/public/aicte.png";

// Data structure remains the same
interface DropLogoData {
  src: StaticImageData;
  alt: string;
  size: string; // Tailwind width/height class e.g., 'w-32 h-32'
  position: { top: string; left: string };
  animation: {
    name: string;
    delay: string;
  };
}

const logos: DropLogoData[] = [
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

// --- DROP LOGO COMPONENT (Refactored for Dropmorphism) ---
const DropLogo = ({ logo }: { logo: DropLogoData }) => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    // This outer container handles positioning and animation
    <div
      ref={ref}
      className={`
        absolute group cursor-pointer
        ${logo.size}
        ${logo.animation.name}
        transition-all duration-1000 ease-out
        ${inView ? "scale-100 opacity-100" : "scale-50 opacity-0"}
      `}
      style={{
        top: logo.position.top,
        left: logo.position.left,
        animationDelay: logo.animation.delay,
      }}
    >
      {/* This inner container IS the dropmorphism effect */}
      <div className="dropmorphism w-full h-full flex items-center justify-center p-6 md:p-8 group-hover:scale-110">
        <Image
          src={logo.src}
          alt={logo.alt}
          width={200}
          height={200}
          className="
            object-contain w-full h-full
            filter brightness-125 contrast-110 group-hover:brightness-150
            transition-all duration-300
          "
        />
      </div>
      
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
  );
};

// --- MAIN SECTION COMPONENT (Mostly unchanged) ---
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

      {/* Container for the floating drops */}
      <div className="absolute inset-0 w-full h-full z-0">
        {logos.map((logo) => (
          <DropLogo key={logo.alt} logo={logo} />
        ))}
      </div>
    </section>
  );
};

export default React.memo(RecognizedBySection);