"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
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

  const [constraints, setConstraints] = useState({ left: 0, right: 0 });
  const [showIndicator, setShowIndicator] = useState(isMobile);
  
  const x = useMotionValue(0);
  const smoothedX = useSpring(x, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const calculateConstraints = () => {
      if (containerRef.current && trackRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const trackWidth = trackRef.current.scrollWidth;
        const firstCard = trackRef.current.firstChild as HTMLElement;
        if (!firstCard) return;

        const cardWidth = firstCard.offsetWidth;
        const right = (containerWidth - cardWidth) / 2;
        const left = -(trackWidth - containerWidth + right);
        
        setConstraints({ left, right });
        
        if (isMobile) {
          x.set(right);
        }
      }
    };
    calculateConstraints();
    window.addEventListener("resize", calculateConstraints);
    return () => window.removeEventListener("resize", calculateConstraints);
  }, [testimonials, isMobile, x]);

  useEffect(() => {
    if (isMobile) return;
    const totalRange = constraints.right - constraints.left;
    if (totalRange === 0) return;
    const targetX = constraints.right - totalRange * progress;
    x.set(targetX);
  }, [progress, constraints, isMobile, x]);

  useEffect(() => {
    if (!isMobile) return;
    const timer = setTimeout(() => {
      setShowIndicator(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, [isMobile]);

  return (
    <div
      ref={containerRef}
      className="relative h-[350px] w-full mx-auto overflow-hidden"
    >
      <motion.div
        ref={trackRef}
        className="absolute left-0 top-0 flex h-full items-stretch gap-x-8 px-4 py-4"
        style={{ x: isMobile ? x : smoothedX }}
        drag={isMobile ? "x" : false}
        dragConstraints={isMobile ? constraints : undefined}
        onDragStart={isMobile ? () => setShowIndicator(false) : undefined}
      >
        {testimonials.map((t, index) => (
          <TestimonialCard key={index} testimonial={t} />
        ))}
      </motion.div>

      <AnimatePresence>
        {showIndicator && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none"
          >
            <div className="flex items-center justify-start w-24 h-7 p-1 overflow-hidden rounded-full border border-neutral-600 bg-black/50 backdrop-blur-sm">
              <motion.div
                className="w-8 h-full rounded-full bg-white" 
                animate={{ x: [0, 56, 0] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};