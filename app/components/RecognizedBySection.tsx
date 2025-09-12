"use client";

import React from "react";
import { useInView } from "../hooks/useInView";
import Image, { StaticImageData } from "next/image";
import startupImg from "/public/startup.png";
import skillImg from "/public/skill.png";
import msmeImg from "/public/msme.png";
import isoImg from "/public/iso.png";
import aicteImg from "/public/aicte.png";

interface PartnerLogo {
  src: StaticImageData;
  alt: string;
}

const logos: PartnerLogo[] = [
  { src: startupImg, alt: "Startup India" },
  { src: skillImg, alt: "Skill India" },
  { src: msmeImg, alt: "MSME" },
  { src: isoImg, alt: "ISO Certified" },
  { src: aicteImg, alt: "AICTE" },
];

const PartnerCard = ({ logo }: { logo: PartnerLogo }) => {
  return (
    <div
      className="
        relative group flex justify-center items-center
        h-32 md:h-36 p-6 bg-white/5 border border-white/10 
        rounded-xl backdrop-blur-sm cursor-pointer
        transition-all duration-300 ease-in-out
        hover:bg-white/15 hover:border-white/20 hover:scale-105
      "
    >
      <Image
        src={logo.src}
        alt={logo.alt}
        width={150}
        height={150}
        className="
          object-contain h-full w-full
          filter  group-hover:grayscale-0 
          brightness-90 group-hover:brightness-110
          transition-all duration-300
        "
      />
      <div
        className="
          absolute -bottom-4 left-1/2 -translate-x-1/2
          px-3 py-1 rounded-full text-xs font-medium
          bg-gray-900/80 backdrop-blur-sm border border-white/20
          text-white whitespace-nowrap
          opacity-0 group-hover:opacity-100
          translate-y-2 group-hover:translate-y-0
          transition-all duration-300 ease-in-out
        "
      >
        {logo.alt}
      </div>
    </div>
  );
};

const RecognizedBySection = () => {
  const [titleRef, titleInView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });
  const [gridRef, gridInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section
      className="
      relative w-full 
      flex flex-col justify-center items-center 
      px-4 py-20 md:py-28 overflow-hidden
    "
    >
      <div
        ref={titleRef}
        className={`
          text-center mb-16 relative z-10
          transition-all duration-1000 ease-out
          ${titleInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
        `}
      >
        <h2
          className="
          text-5xl md:text-6xl lg:text-7xl font-bold mb-6
          bg-gradient-to-r from-white to-gray-400
          bg-clip-text text-transparent leading-tight
        "
        >
          Recognized By
        </h2>
        <p
          className="
          text-lg md:text-xl text-gray-300 max-w-3xl mx-auto
          font-light
        "
        >
          We collaborate with leading organizations to provide you with the{" "}
          <span
            className="
            bg-gradient-to-r from-blue-400 to-cyan-400
            bg-clip-text text-transparent font-medium
          "
          >
            best learning experience
          </span>
        </p>
      </div>

      <div ref={gridRef} className="w-full max-w-5xl">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
          {logos.map((logo, index) => (
            <div
              key={logo.alt}
              className={`
                transition-all duration-500 ease-out
                ${gridInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}
              `}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <PartnerCard logo={logo} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(RecognizedBySection);