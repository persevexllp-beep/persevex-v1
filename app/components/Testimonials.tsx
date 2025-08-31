// Filename: Testimonials.tsx
"use client";

import { motion, useTransform, useMotionValue } from "framer-motion";
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

  // NEW: State to store the initial offset to center the first card
  const [initialXOffset, setInitialXOffset] = useState(0);
  const [trackEndTranslate, setTrackEndTranslate] = useState(0);
  
  const motionProgress = useMotionValue(0);

  useEffect(() => {
    motionProgress.set(progress);
  }, [progress, motionProgress]);

  useEffect(() => {
    const calculateTranslation = () => {
      if (containerRef.current && trackRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const trackWidth = trackRef.current.scrollWidth;

        // NEW: Calculate the offset to center the first card
        const firstCard = trackRef.current.firstChild as HTMLElement;
        if (firstCard) {
            const cardWidth = firstCard.offsetWidth;
            const offset = (containerWidth - cardWidth) / 3;
            setInitialXOffset(offset);
        }

        // The end translation remains the same logic
        const endTranslate = -(trackWidth - containerWidth);
        setTrackEndTranslate(endTranslate);
      }
    };

    calculateTranslation();
    window.addEventListener("resize", calculateTranslation);
    return () => window.removeEventListener("resize", calculateTranslation);
  }, [testimonials]);

  // CHANGED: Update the transform to start from the centered position
  const x = useTransform(
    motionProgress,
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