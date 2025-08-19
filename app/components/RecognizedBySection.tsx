// RecognizedBySection.tsx
"use client";

import Image from "next/image";
import { useRef, useState, useLayoutEffect } from "react";

// Updated logo order to match your new image
const logos = [
  { src: "/r4.png", alt: "AICTE" },
  { src: "/r5.jpg", alt: "MSME" },
  { src: "/r1.jpg", alt: "Ministry of Corporate Affairs" },
  { src: "/r2.png", alt: "ISO 9001:2015" },
  { src: "/r3.jpeg", alt: "Startup India" },
];

// An easing function to make the animation feel smoother (starts and ends slowly)
const easeInOutCubic = (t: number): number => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};


const RecognizedBySection = ({ progress }: { progress: number }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const [scrollDistance, setScrollDistance] = useState(0);

  // We use useLayoutEffect to measure the width of the logo track and its container
  // after they have been rendered to the DOM.
  useLayoutEffect(() => {
    const calculateScrollDistance = () => {
      if (trackRef.current && windowRef.current) {
        const trackWidth = trackRef.current.scrollWidth;
        const windowWidth = windowRef.current.offsetWidth;
        
        // The total distance the track can scroll is its full width minus the visible window width.
        // We only set a distance if the track is actually wider than the window.
        if (trackWidth > windowWidth) {
          setScrollDistance(trackWidth - windowWidth);
        } else {
          setScrollDistance(0);
        }
      }
    };

    calculateScrollDistance();
    // Recalculate if the window is resized
    window.addEventListener('resize', calculateScrollDistance);
    return () => window.removeEventListener('resize', calculateScrollDistance);
  }, []); // Empty dependency array means this runs once on mount.

  // Apply the easing function to the raw progress value
  const easedProgress = easeInOutCubic(progress);

  // Calculate the final translation in pixels
  const translateX = easedProgress * scrollDistance;

  return (
    <div className="relative h-full w-full flex flex-col j items-center text-white px-4">
      <div className="text-center mb-16 mt-40 md:mb-24">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          Recognized By
        </h2>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
          We collaborate with leading organizations to provide you with the best
          learning experience.
        </p>
      </div>

      {/* 
        THE FIX IS HERE:
        Changed `max-w-6xl` to `max-w-lg`. This makes the container much narrower (512px),
        which is wide enough for about 2-3 logos. This forces the full logo track
        to overflow and creates a scrollable distance, fixing the animation.
      */}
      <div ref={windowRef} className="w-full max-w-3xl mx-auto overflow-hidden">
        {/* 
          The 'track' that moves horizontally.
          - `w-max` makes the container just wide enough to fit all its children in a single line.
        */}
        <div
          ref={trackRef}
          style={{ transform: `translateX(-${translateX}px)` }} // We now translate by pixels
          className="flex items-center gap-x-16 md:gap-x-24 will-change-transform w-max"
        >
          {/* We render the logos only ONCE */}
          {logos.map((logo) => (
            <div key={logo.alt} className="flex-shrink-0">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={160}
                height={80}
                className="object-contain h-16 md:h-20 w-auto"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecognizedBySection;