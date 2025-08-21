// RecognizedBySection.tsx
"use client";

import React, { useMemo } from "react";
import AnimatedLogo from "./AnimatedLogo";

const logos = [
  { src: "/startup.png", alt: "MSME", animation: "from-top-left" },
  { src: "/skill.png", alt: "Skill India", animation: "from-bottom-left" },
  { src: "/msme.png", alt: "Ministry of Corporate Affairs", animation: "from-top" },
  { src: "/iso.png", alt: "Startup India", animation: "from-bottom-right" },
  { src: "/aicte.png", alt: "Mood Indigo IIT Bombay", animation: "from-top-right" },
];

const RecognizedBySection = ({ progress }: { progress: number }) => {
  const numLogos = logos.length;

  // --- NEW: A factor to slow down the entire sequence ---
  // A value of 2.5 means the animation sequence will be 2.5x slower than before.
  // The user's 0-1 scroll will be mapped to an internal 0-2.5 timeline.
  const sequenceStretchFactor = 2.5;

  // The total duration of our new, stretched internal timeline
  const totalSequenceDuration = sequenceStretchFactor; 
  const overlapFactor = 0; // Keep this at 0 for sequential animations

  // Get timings from the child component
  const movementDuration = 2.0;
  const fadeDuration = 0.4;
  const childAnimationTotalDuration = movementDuration + fadeDuration; // 2.4

  // Calculate the duration for each logo on our new stretched timeline.
  // Each logo now gets a much larger slice of time (2.5 / 5 = 0.5)
  const progressPerLogo = totalSequenceDuration / numLogos;

  // Scale the incoming progress to our new internal timeline
  const scaledProgress = progress * sequenceStretchFactor;

  return (
    <div className="relative h-full w-full flex flex-col justify-center items-center text-white px-4 overflow-hidden">
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
        {logos.map((logo, index) => {
          const startOffset = progressPerLogo * (1 - overlapFactor);
          const startProgress = index * startOffset;

          const localProgress = useMemo(() => {
            // Use the scaledProgress for the calculation
            const timeSlotProgress = (scaledProgress - startProgress) / progressPerLogo;
            if (timeSlotProgress < 0) return 0;
            return timeSlotProgress * childAnimationTotalDuration;
          }, [scaledProgress, startProgress, progressPerLogo, childAnimationTotalDuration]);

          return (
            <div key={logo.alt} className="relative aspect-video flex items-center justify-center">
              <AnimatedLogo logo={logo} progress={localProgress} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(RecognizedBySection);