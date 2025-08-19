// RecognizedBySection.tsx
"use client";

import { useMemo } from "react";
import AnimatedLogo from "./AnimatedLogo";

// Define the logos with their final positions and animation types
const logos = [
  { src: "/startup.png", alt: "MSME", animation: "from-top-left" },
  { src: "/skill.png", alt: "Skill India", animation: "from-bottom-left" },
  { src: "/msme.png", alt: "Ministry of Corporate Affairs", animation: "from-top" },
  { src: "/iso.png", alt: "Startup India", animation: "from-bottom-right" },
  { src: "/aicte.png", alt: "Mood Indigo IIT Bombay", animation: "from-top-right" },
];

const RecognizedBySection = ({ progress }: { progress: number }) => {
  const numLogos = logos.length;

  return (
    <div className="relative h-full w-full flex flex-col justify-center items-center text-white px-4 overflow-hidden">
      {/* Text Content */}
      <div className="text-center mb-16 md:mb-24 relative z-10">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          Recognized By
        </h2>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
          We collaborate with leading organizations to provide you with the best
          learning experience.
        </p>
      </div>

      {/* Static grid container that defines the final positions of the logos */}
      <div className="grid grid-cols-3 md:grid-cols-5 gap-x-12 md:gap-x-20 gap-y-12 w-full max-w-4xl">
        {logos.map((logo, index) => {
          // This logic determines the progress for each individual logo's animation.
          // The total scroll progress (0 to 1) is divided into segments for each logo.
          const progressPerLogo = 1 / numLogos;
          const startProgress = index * progressPerLogo;
          const endProgress = startProgress + progressPerLogo;

          // Calculate the local progress (0 to 1) for the current logo's animation
          const localProgress = useMemo(() => {
            if (progress >= startProgress && progress <= endProgress) {
              return (progress - startProgress) / progressPerLogo;
            }
            return progress > endProgress ? 1 : 0;
          }, [progress, startProgress, endProgress, progressPerLogo]);

          return (
            <div key={logo.alt} className="relative aspect-video flex items-center justify-center">
              {/* The AnimatedLogo component handles its own animation based on its local progress */}
              <AnimatedLogo
                logo={logo}
                progress={localProgress}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecognizedBySection;