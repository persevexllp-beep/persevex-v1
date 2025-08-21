"use client";

import React from "react";
import { useInView } from "../hooks/useInView"; // Adjust path if needed
import Image from "next/image"; // Assuming you use Next.js for images

// Your logo data remains the same
const logos = [
  { src: "/startup.png", alt: "MSME", animation: "from-top-left" },
  { src: "/skill.png", alt: "Skill India", animation: "from-bottom-left" },
  { src: "/msme.png", alt: "Ministry of Corporate Affairs", animation: "from-top" },
  { src: "/iso.png", alt: "Startup India", animation: "from-bottom-right" },
  { src: "/aicte.png", alt: "Mood Indigo IIT Bombay", animation: "from-top-right" },
];

// A new, optimized Logo component that animates itself when it enters the view.
const AnimatedLogo = ({ logo }: { logo: typeof logos[0] }) => {
  const [ref, inView] = useInView({ threshold: 0.5 });

  // The animation direction is now controlled by a data attribute
  // which is targeted by our CSS.
  return (
    <div
      ref={ref}
      className={`logo-wrapper ${inView ? "is-visible" : ""}`}
      data-animation={logo.animation}
    >
      <Image
        src={logo.src}
        alt={logo.alt}
        width={140}
        height={70}
        className="object-contain w-full"
      />
      {/* 
        NOTE: The particle effect canvas has been removed from the individual logo.
        If you still want particles, the most performant way is to have a SINGLE 
        canvas in the parent RecognizedBySection and draw all effects there.
        For now, removing it provides the biggest performance gain.
      */}
    </div>
  );
};

// The main section is now clean and performant. It no longer needs 'progress'.
const RecognizedBySection = () => {
  return (
    <div className="relative h-full w-full flex flex-col justify-center items-center text-white px-4">
      <div className="text-center mb-16 md:mb-24 relative z-10">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          Recognized By
        </h2>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
          We collaborate with leading organizations to provide you with the best
          learning experience.
        </p>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-5 gap-x-12 md:gap-x-20 gap-y-12 w-full max-w-4xl">
        {logos.map((logo) => (
          <AnimatedLogo key={logo.alt} logo={logo} />
        ))}
      </div>
    </div>
  );
};

export default React.memo(RecognizedBySection);