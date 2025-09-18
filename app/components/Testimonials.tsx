"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useAnimationControls,
  PanInfo,
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
  const [isAutoScrollActive, setIsAutoScrollActive] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);

  const x = useMotionValue(0);
  const smoothedX = useSpring(x, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // For mobile, we create multiple copies for seamless infinite scroll
  const finalTestimonials = isMobile
    ? [...testimonials, ...testimonials, ...testimonials] // Triple for smoother infinite loop
    : testimonials;

  // Calculate card dimensions for mobile
  const getCardDimensions = () => {
    const cardWidth = window.innerWidth * 0.9; // 90vw
    const gap = 32; // gap-x-8
    return { cardWidth, gap, totalWidth: cardWidth + gap };
  };

  // Start mobile auto-scroll animation
  const startAutoScroll = () => {
    if (!isMobile || !isAutoScrollActive) return;

    const { totalWidth } = getCardDimensions();
    const singleSetWidth = testimonials.length * totalWidth;
    
    // Calculate current position in the cycle
    const currentX = x.get();
    const normalizedPosition = ((currentX % singleSetWidth) + singleSetWidth) % singleSetWidth;
    
    controls.start({
      x: [currentX, currentX - singleSetWidth],
      transition: {
        duration: (testimonials.length * 4) * (singleSetWidth - normalizedPosition) / singleSetWidth,
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop",
      },
    });
  };

  // Stop auto-scroll animation
  const stopAutoScroll = () => {
    controls.stop();
    setCurrentPosition(x.get());
  };

  // Handle pan start (finger down)
  const handlePanStart = () => {
    if (!isMobile) return;
    setIsDragging(true);
    setIsAutoScrollActive(false);
    stopAutoScroll();
  };

  // Handle pan (finger drag)
  const handlePan = (event: any, info: PanInfo) => {
    if (!isMobile || !isDragging) return;
    
    // Apply resistance to make dragging feel more natural
    const resistance = 0.6;
    const newPosition = currentPosition + (info.offset.x * resistance);
    x.set(newPosition);
  };

  // Handle pan end (finger up)
  const handlePanEnd = (event: any, info: PanInfo) => {
    if (!isMobile) return;
    
    const { totalWidth } = getCardDimensions();
    const velocity = info.velocity.x;
    const offset = info.offset.x;
    
    // More conservative thresholds for card advancement
    const velocityThreshold = 800; // Higher threshold for velocity-based swipe
    const distanceThreshold = totalWidth * 0.25; // 25% of card width
    
    let cardsToMove = 0;
    
    // Determine how many cards to move based on gesture
    if (Math.abs(velocity) > velocityThreshold) {
      // Fast swipe - move one card in the direction of velocity
      cardsToMove = velocity < 0 ? -1 : 1;
    } else if (Math.abs(offset) > distanceThreshold) {
      // Slow drag but sufficient distance - move one card
      cardsToMove = offset < 0 ? -1 : 1;
    }
    // If neither threshold is met, snap back to current position (cardsToMove = 0)
    
    const finalPosition = currentPosition + (cardsToMove * totalWidth);
    
    // Animate to snap position and then immediately resume auto-scroll
    controls.start({
      x: finalPosition,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        duration: 0.4,
      },
    }).then(() => {
      // Resume auto-scroll immediately after snap animation completes
      setCurrentPosition(finalPosition);
      setIsAutoScrollActive(true);
    });
    
    setIsDragging(false);
  };

  // Start auto-scroll when component mounts or when auto-scroll is reactivated
  useEffect(() => {
    if (!isMobile || isDragging) return;
    
    if (isAutoScrollActive) {
      // Small delay to ensure smooth transition
      const timeoutId = setTimeout(() => {
        startAutoScroll();
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [isMobile, isAutoScrollActive, isDragging, controls, testimonials.length]);

  // Initialize auto-scroll on mount
  useEffect(() => {
    if (!isMobile) return;
    
    setIsAutoScrollActive(true);
    x.set(0);
    setCurrentPosition(0);
  }, [isMobile, x]);

  // Handle infinite loop reset for mobile
  useEffect(() => {
    if (!isMobile) return;

    const { totalWidth } = getCardDimensions();
    const singleSetWidth = testimonials.length * totalWidth;
    
    const unsubscribe = x.onChange((latest) => {
      // Reset position when we've scrolled through one complete set
      if (latest <= -singleSetWidth * 2) {
        const resetPosition = latest + singleSetWidth;
        x.set(resetPosition);
        setCurrentPosition(resetPosition);
      }
    });

    return unsubscribe;
  }, [isMobile, x, testimonials.length]);

  // Desktop constraints calculation
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
          style={isMobile ? {} : { x: smoothedX }}
          animate={isMobile ? controls : {}}
          // Touch event handlers for mobile
          onPanStart={isMobile ? handlePanStart : undefined}
          onPan={isMobile ? handlePan : undefined}
          onPanEnd={isMobile ? handlePanEnd : undefined}
          // Drag configuration for mobile
          drag={isMobile ? "x" : false}
          dragElastic={0.1}
          dragMomentum={false}
          // Improved touch responsiveness
          whileTap={isMobile ? { scale: 0.98 } : undefined}
        >
          {finalTestimonials.map((t, index) => (
            <TestimonialCard key={`testimonial-${index}`} testimonial={t} />
          ))}
        </motion.div>
      </div>
      
      {/* Optional: Visual indicator for mobile users */}
      {isMobile && (
        <div className="flex justify-center mt-4">
          <p className="text-neutral-400 text-sm">
            {isDragging ? "Swiping..." : "Auto-scrolling"}
          </p>
        </div>
      )}
    </div>
  );
};