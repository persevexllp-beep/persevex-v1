"use client";

import React from "react";
import { useInView } from "../hooks/useInView"; // Adjust path if needed
import Image from "next/image"; // Assuming you use Next.js for images

// Enhanced logo data with additional properties for better animations
const logos = [
  { 
    src: "/startup.png", 
    alt: "MSME", 
    animation: "from-top-left",
    delay: "delay-100"
  },
  { 
    src: "/skill.png", 
    alt: "Skill India", 
    animation: "from-bottom-left",
    delay: "delay-200"
  },
  { 
    src: "/msme.png", 
    alt: "Ministry of Corporate Affairs", 
    animation: "from-top",
    delay: "delay-300"
  },
  { 
    src: "/iso.png", 
    alt: "Startup India", 
    animation: "from-bottom-right",
    delay: "delay-400"
  },
  { 
    src: "/aicte.png", 
    alt: "Mood Indigo IIT Bombay", 
    animation: "from-top-right",
    delay: "delay-500"
  },
];

// Filename: RecognizedBySection.tsx

const AnimatedLogo = ({ logo, index }: { logo: typeof logos[0]; index: number }) => {
  const [ref, inView] = useInView({ threshold: 0.3 });

  return (
    <div
      ref={ref}
      className={`
        logo-container group cursor-pointer relative
        ${inView ? "animate-in" : "opacity-0"}
        ${logo.delay}
      `}
      data-animation={logo.animation}
      style={{
        animationDelay: `${index * 150}ms`,
      }}
    >
      {/* Glassmorphic container with hover effects */}
      <div className="
        relative overflow-hidden rounded-2xl
       bg-white
        p-6 md:p-8
        transition-all duration-500 ease-out
       
        hover:scale-105 hover:-translate-y-2
        hover:shadow-2xl hover:shadow-blue-500/20
        group-hover:backdrop-blur-md
      ">
        {/* ... rest of the card content is unchanged ... */}
        <div className="
          absolute inset-0 opacity-0 group-hover:opacity-100
          bg-white
          transition-opacity duration-500
        " />
        
        <div className="absolute inset-0 overflow-hidden">
          <div className="
            absolute -top-2 -right-2 w-4 h-4 rounded-full
            bg-gradient-to-r from-blue-400 to-cyan-400
            opacity-0 group-hover:opacity-100
            animate-pulse
            transition-opacity duration-300
          " />
          <div className="
            absolute -bottom-2 -left-2 w-3 h-3 rounded-full
            bg-gradient-to-r from-purple-400 to-pink-400
            opacity-0 group-hover:opacity-100
            animate-bounce
            transition-opacity duration-500
          " />
        </div>

        <div className="relative z-10 flex items-center justify-center h-16 md:h-20">
          <Image
            src={logo.src}
            alt={logo.alt}
            width={400}
            height={200}
            className="
              object-contain w-80 h-64
              filter brightness-110 contrast-110
              group-hover:brightness-125 group-hover:contrast-125
              transition-all duration-300
            "
          />
        </div>

        <div className="
          absolute inset-0 rounded-2xl
          opacity-0 group-hover:opacity-100
          bg-gradient-to-r from-transparent via-white/5 to-transparent
          transition-opacity duration-500
        " />
      </div>

      {/* This label will now be positioned relative to its direct parent */}
      <div className="
        absolute -bottom-8 left-1/2 transform -translate-x-1/2
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

// Enhanced main section with modern design elements
const RecognizedBySection = () => {
  const [titleRef, titleInView] = useInView({ threshold: 0.5 });

  return (
    <section className="
      relative min-h-screen w-full 
      flex flex-col justify-center items-center 
      px-4 py-20 overflow-hidden
     
    ">
      {/* Animated background elements */}
    

      {/* Enhanced title section */}
      <div 
        ref={titleRef}
        className={`
          text-center mb-20 md:mb-32 relative z-10
          transition-all duration-1000 ease-out
          ${titleInView 
            ? "opacity-100 translate-y-0" 
            : "opacity-0 translate-y-8"
          }
        `}
      >
       
        
        <h2 className="
          text-5xl md:text-6xl lg:text-7xl font-bold mb-6
          bg-gradient-to-r from-white via-blue-100 to-cyan-100
          bg-clip-text text-transparent
          leading-tight
        ">
          Recognized By
        </h2>
        
        <p className="
          text-lg md:text-xl lg:text-2xl
          text-gray-300 max-w-3xl mx-auto leading-relaxed
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

      {/* Enhanced logos grid */}
      <div className="
        grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 
        gap-8 md:gap-12 lg:gap-16 
        w-full max-w-6xl relative lg:mb-16 z-10
      ">
        {logos.map((logo, index) => (
          <AnimatedLogo key={logo.alt} logo={logo} index={index} />
        ))}
      </div>

      {/* Floating action hint */}
      
    </section>
  );
};

export default React.memo(RecognizedBySection);