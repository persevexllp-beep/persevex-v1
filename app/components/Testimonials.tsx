"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useAnimationControls,
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
    <div className="relative flex flex-col w-[90vw] max-w-md h-full flex-shrink-0 rounded-2xl border border-neutral-800 p-8 shadow-2xl overflow-hidden">
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
  const controls = useAnimationControls();

  const [constraints, setConstraints] = useState({ left: 0, right: 0 });

  const x = useMotionValue(0);
  const smoothedX = useSpring(x, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // For mobile, we duplicate the testimonials to create a seamless loop.
  const finalTestimonials = isMobile
    ? [...testimonials, ...testimonials] // Double for smooth infinite loop
    : testimonials;

  // Start mobile animation immediately
  useEffect(() => {
    if (!isMobile) return;

    // For mobile, start animation immediately without waiting for constraints
    const cardWidth = window.innerWidth * 0.9; // 90vw
    const gap = 32; // gap-x-8
    const totalWidth = testimonials.length * (cardWidth + gap);

    controls.start({
      x: [0, -totalWidth],
      transition: {
        duration: testimonials.length * 8, // 4 seconds per card
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop",
      },
    });
  }, [isMobile, controls, testimonials.length]);

  // This effect calculates constraints for desktop only
  useEffect(() => {
    if (isMobile) return;

    const calculateConstraints = () => {
      if (!containerRef.current || !trackRef.current) return;

      const trackWidth = trackRef.current.scrollWidth;
      const containerWidth = containerRef.current.offsetWidth;
      const firstCard = trackRef.current.firstChild as HTMLElement;
      if (!firstCard) return;

      const cardWidth = firstCard.offsetWidth;
      const right = (containerWidth - cardWidth) / 2;
      const left = -(trackWidth - containerWidth + right);
      setConstraints({ left, right });
    };

    const timeoutId = setTimeout(calculateConstraints, 50);
    window.addEventListener("resize", calculateConstraints);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", calculateConstraints);
    };
  }, [isMobile, testimonials]);

  // Desktop scroll-based animation
  useEffect(() => {
    if (isMobile) return;

    const totalRange = constraints.right - constraints.left;
    if (totalRange === 0) return;
    const targetX = constraints.right - totalRange * progress;
    x.set(targetX);
  }, [progress, constraints, isMobile, x]);

  return (
    <div className="w-full py-12">
      <h2 className="lg:mb-12 mb-24 text-center text-5xl font-bold text-white md:text-6xl">
        Testimonials.
      </h2>

      <div
        ref={containerRef}
        className="relative h-[350px] w-full mx-auto overflow-hidden"
      >
        <motion.div
          ref={trackRef}
          className="absolute left-0 top-0 flex h-full items-stretch gap-x-8 px-4 py-4"
          // For desktop, we use the spring-smoothed motion value.
          // For mobile, we let the animation controls handle the transform directly.
          style={isMobile ? {} : { x: smoothedX }}
          animate={isMobile ? controls : {}}
        >
          {finalTestimonials.map((t, index) => (
            <TestimonialCard key={`testimonial-${index}`} testimonial={t} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};