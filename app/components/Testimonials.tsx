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

// Component: TestimonialCard
const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    // CHANGE #1: Add `flex` and `flex-col` to the card's main container.
    // This allows us to control the vertical distribution of space inside the card.
    <div className="relative flex flex-col w-[90vw] max-w-md flex-shrink-0 rounded-2xl border border-neutral-800 bg-neutral-900 p-8 shadow-2xl">
      {/* Card Header: This part remains the same */}
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

      {/* Card Body: The testimonial quote */}
      {/* CHANGE #2: Add `flex-grow` to the blockquote. */}
      {/* This makes the quote area expand to fill any available vertical space, */}
      {/* ensuring the card's total height is consistent regardless of quote length. */}
      <blockquote className="mt-6 flex-grow text-lg text-neutral-300">
        <p>&ldquo;{testimonial.quote}&rdquo;</p>
      </blockquote>
    </div>
  );
};

// Main Component: AnimatedTestimonials
export const AnimatedTestimonials = ({
  testimonials,
  progress,
}: {
  testimonials: Testimonial[];
  progress: number;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
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
        const endTranslate = -(trackWidth - containerWidth);
        setTrackEndTranslate(endTranslate);
      }
    };

    calculateTranslation();
    window.addEventListener("resize", calculateTranslation);
    return () => window.removeEventListener("resize", calculateTranslation);
  }, [testimonials]);

  const x = useTransform(motionProgress, [0, 1], [0, trackEndTranslate]);

  return (
    <div
      ref={containerRef}
      className="relative h-[350px] w-full max-w-6xl mx-auto overflow-hidden"
    >
      {/* CHANGE #3: Change `items-center` to `items-stretch` and add vertical padding. */}
      {/* `items-stretch` is the key: it forces all flex children (the cards) to have the same height. */}
      {/* `py-4` adds some vertical spacing for better aesthetics. */}
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