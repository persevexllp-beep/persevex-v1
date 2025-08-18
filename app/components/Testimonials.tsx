// Filename: Testimonials.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};

// Component props updated: `activeIndex` is replaced with `progress`.
export const AnimatedTestimonials = ({
  testimonials,
  progress,
}: {
  testimonials: Testimonial[];
  progress: number;
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // --- SMOOTH ANIMATION LOGIC ---
  // 1. Calculate a continuous index based on scroll progress.
  // This will be a float, e.g., 0.5 when halfway between card 0 and 1.
  const continuousIndex = progress * (testimonials.length - 1);

  // 2. Determine the current discrete index for displaying text and images.
  // We round to the nearest whole number to decide which one to show.
  const currentIndex = Math.round(continuousIndex);

  return (
    <div className="mx-auto max-w-sm px-4 py-20 font-sans antialiased md:max-w-4xl md:px-8 lg:px-12">
      <div className="relative grid grid-cols-1 gap-24 md:grid-cols-2">
        <div className="">
          <div className="relative h-80 w-full">
            {/* --- MODIFICATION START --- */}
            {/*
              Instead of mapping all images and animating them based on distance,
              we use AnimatePresence to show only ONE image at a time (the one at currentIndex).
              This creates a clean cross-fade effect as you scroll, preventing the blend.
            */}
            <AnimatePresence>
              {isMounted && (
                <motion.div
                  key={currentIndex} // The key tells AnimatePresence when to animate
                  initial={{
                    opacity: 0,
                    y: 20,
                    scale: 0.95,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    y: -20,
                    scale: 0.95,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0"
                >
                  <img
                    src={testimonials[currentIndex].src}
                    alt={testimonials[currentIndex].name}
                    width={500}
                    height={500}
                    draggable={false}
                    className="h-full w-full rounded-3xl object-cover object-center"
                  />
                </motion.div>
              )}
            </AnimatePresence>
            {/* --- MODIFICATION END --- */}
          </div>
        </div>
        <div className="flex flex-col justify-between py-4">
          <AnimatePresence mode="wait">
            {/* The key is now the rounded currentIndex, so text transitions at the halfway point */}
            <motion.div
              key={currentIndex}
              initial={{
                y: 20,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              exit={{
                y: -20,
                opacity: 0,
              }}
              transition={{
                duration: 0.2,
                ease: "easeInOut",
              }}
            >
              {/* Data is accessed using the rounded currentIndex */}
              <h3 className="text-2xl font-bold text-white">
                {testimonials[currentIndex].name}
              </h3>
              <p className="text-sm text-neutral-400">
                {testimonials[currentIndex].designation}
              </p>
              <motion.p className="mt-8 text-lg text-neutral-300">
                {testimonials[currentIndex].quote.split(" ").map((word, index) => (
                  <motion.span
                    key={`${word}-${index}`}
                    initial={{
                      filter: "blur(10px)",
                      opacity: 0,
                      y: 5,
                    }}
                    animate={{
                      filter: "blur(0px)",
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.2,
                      ease: "easeInOut",
                      delay: 0.02 * index,
                    }}
                    className="inline-block"
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
              </motion.p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};