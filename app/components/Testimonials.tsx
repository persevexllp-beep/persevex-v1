// Filename: Testimonials.tsx
"use client";

import { motion, useTransform, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// 1. Update the Testimonial type to include the new planetImage property
type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
  bgImage: string;
  bgPosition: string;
  planetImage: string; // <-- New property for the planet image
};

// Component: TestimonialCard (Updated with a planet Image component)
const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <div 
      className="relative flex flex-col w-[90vw] max-w-md flex-shrink-0 rounded-2xl border border-neutral-800 p-8 shadow-2xl overflow-hidden"
    >
      {/* Planet Image in the background */}
      <Image
        src={testimonial.planetImage}
        alt={`Planet for ${testimonial.name}'s testimonial`}
        width={200}
        height={200}
        className="absolute top-35 lg:top-30 right-0.5 left-30 lg:left-40 w-[400px] h-auto opacity-80 pointer-events-none"
      />
      
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50 rounded-2xl"></div>

      {/* Content sits on top with relative positioning */}
      <div className="relative z-10 flex items-center gap-4">
        <img
          src={testimonial.src}
          alt={testimonial.name}
          className="h-14 w-14 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <p className="font-bold text-lg text-white">{testimonial.name}</p>
          <p className="text-sm text-neutral-400">{testimonial.designation}</p>
        </div>
      </div>
      <blockquote className="relative z-10 mt-6 flex-grow text-base italic text-neutral-300">
        <p>&ldquo;{testimonial.quote}&rdquo;</p>
      </blockquote>
    </div>
  );
};

// Main Component: AnimatedTestimonials (No changes needed here)
export const AnimatedTestimonials = ({
  testimonials,
  progress,
}: {
  testimonials: Testimonial[];
  progress: number;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [initialXOffset, setInitialXOffset] = useState(0);
  const [trackEndTranslate, setTrackEndTranslate] = useState(0);
  
  const motionProgress = useMotionValue(0);

  const smoothedProgress = useSpring(motionProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    motionProgress.set(progress);
  }, [progress, motionProgress]);

  useEffect(() => {
    const calculateTranslation = () => {
      if (containerRef.current && trackRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const trackWidth = trackRef.current.scrollWidth;

        const firstCard = trackRef.current.firstChild as HTMLElement;
        if (firstCard) {
            const cardWidth = firstCard.offsetWidth;
            // Adjusted offset slightly to better center the first card
            const offset = (containerWidth - cardWidth) / 2; 
            setInitialXOffset(offset);
        }

        const endTranslate = -(trackWidth - containerWidth - initialXOffset); // Adjust end position too
        setTrackEndTranslate(endTranslate);
      }
    };

    calculateTranslation();
    const handleResize = () => calculateTranslation();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [testimonials, initialXOffset]); // Added initialXOffset to dependency array

  const x = useTransform(
    smoothedProgress,
    [0, 1],
    [initialXOffset, trackEndTranslate]
  );

  return (
    <div
      ref={containerRef}
      className="relative h-[350px] w-full mx-auto overflow-hidden"
    >
      <motion.div
        ref={trackRef}
        className="absolute left-0 top-0 flex h-full items-stretch gap-x-8 px-4 py-4"
        style={{ x }}
      >
        {testimonials.map((t, index) => (
          <TestimonialCard key={index} testimonial={t} />
        ))}
      </motion.div>
    </div>
  );
};