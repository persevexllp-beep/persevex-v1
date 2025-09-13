"use client";

import {
  motion,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
  bgImage: string;
  bgPosition: string;
  planetImage: string;
};

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <div 
      className="relative flex flex-col w-[90vw] max-w-md flex-shrink-0 rounded-2xl border border-neutral-800 p-8 shadow-2xl overflow-hidden"
    >
      <Image
        src={testimonial.planetImage}
        alt={`Planet for ${testimonial.name}'s testimonial`}
        width={200}
        height={200}
        className="absolute top-35 lg:top-30 right-0.5 left-30 lg:left-40 w-[400px] h-auto opacity-80 pointer-events-none"
      />
      
      <div className="absolute inset-0 bg-black/50 rounded-2xl"></div>

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

export const AnimatedTestimonials = ({
  testimonials,
  progress,
  isMobile,
}: {
  testimonials: Testimonial[];
  progress: number;
  isMobile: boolean;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 });

  // --- Logic for Desktop (Scroll-driven) ---
  const motionProgress = useMotionValue(0);
  const smoothedProgress = useSpring(motionProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // This will be used for both desktop scroll and mobile initial position
  const x = useTransform(
    smoothedProgress,
    [0, 1],
    [dragConstraints.right, dragConstraints.left]
  );
  
  // --- Simplified Logic for Mobile (Drag-driven only) ---
  const xDrag = useMotionValue(0);

  // Sync scroll progress to motion value for desktop animation
  useEffect(() => {
    motionProgress.set(progress);
  }, [progress, motionProgress]);

  // Calculate constraints and initial positions
  useEffect(() => {
    const calculateConstraints = () => {
      if (containerRef.current && trackRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const trackWidth = trackRef.current.scrollWidth;

        const firstCard = trackRef.current.firstChild as HTMLElement;
        if (!firstCard) return;

        const cardWidth = firstCard.offsetWidth;
        const initialOffset = (containerWidth - cardWidth) / 2;

        // The total distance the track can move is its own width minus the container's width.
        const scrollableWidth = trackWidth - containerWidth;
        
        // The end position is the initial offset minus the total scrollable distance.
        const endTranslate = initialOffset - scrollableWidth;

        setDragConstraints({ left: endTranslate, right: initialOffset });

        // On mobile, set the initial position of the draggable element.
        // This only runs once when the constraints are first calculated.
        if (isMobile) {
          xDrag.set(initialOffset);
        }
      }
    };

    calculateConstraints();
    // Use a timeout to recalculate after initial render and layout shifts
    const timeoutId = setTimeout(calculateConstraints, 100);

    window.addEventListener("resize", calculateConstraints);
    return () => {
      window.removeEventListener("resize", calculateConstraints);
      clearTimeout(timeoutId);
    };
  }, [testimonials, isMobile, xDrag]); 
  // Dependency array is correct.

  return (
    <div
      ref={containerRef}
      className="relative h-[350px] w-full mx-auto overflow-hidden"
    >
      <motion.div
        ref={trackRef}
        className="absolute left-0 top-0 flex h-full items-stretch gap-x-8 px-4 py-4"
        // --- Conditionally apply props based on isMobile ---
        style={isMobile ? { x: xDrag } : { x }}
        drag={isMobile ? "x" : false}
        dragConstraints={
          isMobile
            ? { left: dragConstraints.left, right: dragConstraints.right }
            : undefined
        }
        // No more onDragStart/onDragEnd needed as we've removed the conflicting logic
      >
        {testimonials.map((t, index) => (
          <TestimonialCard key={index} testimonial={t} />
        ))}
      </motion.div>
    </div>
  );
};