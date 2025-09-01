// Filename: Testimonials.tsx
"use client";

import { motion, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};

// Component: TestimonialCard (No changes here)
const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <div className="relative flex flex-col w-[90vw] max-w-md flex-shrink-0 rounded-2xl border border-neutral-800 bg-neutral-900 p-8 shadow-2xl">
      <div className="flex items-center gap-4">
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
      <blockquote className="mt-6 flex-grow text-lg text-neutral-300">
        <p>&ldquo;{testimonial.quote}&rdquo;</p>
      </blockquote>
    </div>
  );
};

// Main Component: AnimatedTestimonials (Changes are here)
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

  // NEW: Create a smoothed version of the progress value.
  // The spring will "chase" the value of motionProgress, creating a smooth effect
  // as the user scrolls.
  const smoothedProgress = useSpring(motionProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    // This sets the target for the spring animation
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
            // Adjusted offset slightly to better center the first card on most screens
            const offset = (containerWidth - cardWidth) / 2.5; 
            setInitialXOffset(offset);
        }

        const endTranslate = -(trackWidth - containerWidth);
        setTrackEndTranslate(endTranslate);
      }
    };

    calculateTranslation();
    const handleResize = () => calculateTranslation();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [testimonials]);

  // CHANGED: Use the smoothed progress value for the transformation.
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