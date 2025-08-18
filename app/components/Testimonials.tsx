// Filename: Testimonials.tsx
"use client";

// Removed Icon imports as buttons are no longer needed
import { motion, AnimatePresence } from "framer-motion"; 
import { useEffect, useState } from "react";

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};

// Component props updated: `autoplay` removed, `activeIndex` added.
export const AnimatedTestimonials = ({
  testimonials,
  activeIndex,
}: {
  testimonials: Testimonial[];
  activeIndex: number;
}) => {
  // isMounted state is kept to prevent hydration errors from the random rotation
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Removed `active` state, `handleNext`, and `handlePrev` functions.
  // The component is now controlled by the `activeIndex` prop.

  const isActive = (index: number) => {
    // Logic now uses the activeIndex prop
    return index === activeIndex;
  };

  // Removed the `useEffect` for autoplay functionality.

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  return (
    <div className="mx-auto max-w-sm px-4 py-20 font-sans antialiased md:max-w-4xl md:px-8 lg:px-12">
      <div className="relative grid grid-cols-1 gap-24 md:grid-cols-2">
        <div className="">
          <div className="relative  h-80 w-full">
            <AnimatePresence>
              {isMounted && testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    y: -100,
                    rotate: randomRotateY(),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.5,
                    scale: isActive(index) ? 1 : 0.95,
                    y: isActive(index) ? 0 : -50,
                    // Logic now uses activeIndex prop
                    zIndex: isActive(index) ? testimonials.length : testimonials.length - Math.abs(index - activeIndex),
                    rotate: isActive(index) ? 0 : randomRotateY(),
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    y: 100,
                    rotate: randomRotateY(),
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom"
                >
                  <img
                    src={testimonial.src}
                    alt={testimonial.name}
                    width={500}
                    height={500}
                    draggable={false}
                    className="h-full w-full rounded-3xl object-cover object-center"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex flex-col justify-between py-4">
          <AnimatePresence mode="wait">
            {/* The key is now derived from the activeIndex prop */}
            <motion.div
              key={activeIndex}
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
              {/* All data is now accessed using activeIndex */}
              <h3 className="text-2xl font-bold text-white">
                {testimonials[activeIndex].name}
              </h3>
              <p className="text-sm text-neutral-400">
                {testimonials[activeIndex].designation}
              </p>
              <motion.p className="mt-8 text-lg text-neutral-300">
                {testimonials[activeIndex].quote.split(" ").map((word, index) => (
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
          {/* Removed the div containing the next/prev buttons */}
        </div>
      </div>
    </div>
  );
};