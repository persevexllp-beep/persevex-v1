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

  // Desktop animation states (unchanged)
  const [constraints, setConstraints] = useState({ left: 0, right: 0 });
  const x = useMotionValue(0);
  const smoothedX = useSpring(x, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Mobile-only states
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [isTouching, setIsTouching] = useState(false);
  const [autoScrollTimeout, setAutoScrollTimeout] = useState<NodeJS.Timeout | null>(null);
  
  const mobileX = useMotionValue(0);
  const mobileControls = useAnimationControls();

  // Mobile card dimensions
  const CARD_WIDTH = typeof window !== 'undefined' ? window.innerWidth * 0.9 : 350; // 90vw
  const GAP = 32; // gap-x-8
  const CARD_TOTAL_WIDTH = CARD_WIDTH + GAP;

  // Create extended testimonials array for mobile infinite scroll
  const extendedTestimonials = isMobile 
    ? [...testimonials, ...testimonials, ...testimonials] 
    : testimonials;

  // Mobile auto-scroll function
  const startMobileAutoScroll = () => {
    if (!isMobile || isTouching || !isAutoScrolling) return;

    const nextIndex = currentIndex + 1;
    const targetX = -nextIndex * CARD_TOTAL_WIDTH;

    mobileControls.start({
      x: targetX,
      transition: {
        duration: 0.8,
        ease: [0.32, 0.72, 0, 1], // Custom easing for smooth feel
      }
    }).then(() => {
      setCurrentIndex(nextIndex);
      
      // Reset position when we've gone through original set
      if (nextIndex >= testimonials.length) {
        mobileX.set(0);
        setCurrentIndex(0);
        mobileControls.set({ x: 0 });
      }
    });
  };

  // Mobile auto-scroll interval
  useEffect(() => {
    if (!isMobile || !isAutoScrolling || isTouching) return;

    const interval = setInterval(startMobileAutoScroll, 1000); // 3 seconds per card
    return () => clearInterval(interval);
  }, [isMobile, isAutoScrolling, isTouching, currentIndex]);

  // Handle touch start
  const handleTouchStart = () => {
    if (!isMobile) return;
    setIsTouching(true);
    setIsAutoScrolling(false);
    
    // Stop the continuous animation and capture current position
    mobileControls.stop();
    const currentPos = mobileX.get();
    
    // Calculate which card we're closest to
    const closestIndex = Math.round(Math.abs(currentPos) / CARD_TOTAL_WIDTH) % testimonials.length;
    setCurrentIndex(closestIndex);
    
    // Clear any pending auto-scroll timeout
    if (autoScrollTimeout) {
      clearTimeout(autoScrollTimeout);
      setAutoScrollTimeout(null);
    }
  };

  // Handle drag
  const handleDrag = (event: any, info: PanInfo) => {
    if (!isMobile || !isTouching) return;
    
    // Get the position when touch started
    const startPosition = -currentIndex * CARD_TOTAL_WIDTH;
    const newPosition = startPosition + info.offset.x * 0.1; // Add resistance
    mobileX.set(newPosition);
  };

  // Handle touch end
  const handleTouchEnd = (event: any, info: PanInfo) => {
    if (!isMobile) return;
    
    const swipeThreshold = CARD_TOTAL_WIDTH * 0.3; // 30% of card width
    const velocityThreshold = 500;
    
    let newIndex = currentIndex;
    
    // Determine swipe direction
    if (info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold) {
      // Swipe left - next card
      newIndex = Math.min(currentIndex + 1, testimonials.length - 1);
    } else if (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) {
      // Swipe right - previous card  
      newIndex = Math.max(currentIndex - 1, 0);
    }
    
    // Animate to final position
    const targetX = -newIndex * CARD_TOTAL_WIDTH;
    mobileControls.start({
      x: targetX,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      }
    });
    
    setCurrentIndex(newIndex);
    setIsTouching(false);
    
    // Resume auto-scroll after 4 seconds
    const timeout = setTimeout(() => {
      setIsAutoScrolling(true);
      setAutoScrollTimeout(null);
    }, 1000);
    
    setAutoScrollTimeout(timeout);
  };

  // Desktop constraints calculation (unchanged)
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

  // Desktop scroll-based animation (unchanged)
  useEffect(() => {
    if (isMobile) return;

    const totalRange = constraints.right - constraints.left;
    if (totalRange === 0) return;
    const targetX = constraints.right - totalRange * progress;
    x.set(targetX);
  }, [progress, constraints, isMobile, x]);

  // Handle infinite loop reset for continuous flow
  useEffect(() => {
    if (!isMobile || isTouching) return;

    const singleSetWidth = testimonials.length * CARD_TOTAL_WIDTH;
    
    const unsubscribe = mobileX.onChange((latest) => {
      // Reset position when we've scrolled through one complete set
      if (latest <= -singleSetWidth * 2) {
        const resetPosition = latest + singleSetWidth;
        mobileX.set(resetPosition);
        
        // Update current index relative to reset
        const newIndex = Math.abs(Math.round(resetPosition / CARD_TOTAL_WIDTH)) % testimonials.length;
        setCurrentIndex(newIndex);
      }
    });

    return unsubscribe;
  }, [isMobile, isTouching, mobileX, testimonials.length]);

  // Initialize mobile state
  useEffect(() => {
    if (isMobile) {
      setCurrentIndex(0);
      setIsAutoScrolling(true);
      mobileX.set(0);
    }
  }, [isMobile]);

  // Cleanup timeouts
  useEffect(() => {
    return () => {
      if (autoScrollTimeout) {
        clearTimeout(autoScrollTimeout);
      }
    };
  }, [autoScrollTimeout]);

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
          // Desktop: use smoothed spring motion
          // Mobile: use direct motion value with controls
          style={isMobile ? { x: mobileX } : { x: smoothedX }}
          animate={isMobile ? mobileControls : undefined}
          // Mobile touch handlers
          onPanStart={isMobile ? handleTouchStart : undefined}
          onPan={isMobile ? handleDrag : undefined}
          onPanEnd={isMobile ? handleTouchEnd : undefined}
          // Mobile drag config
          drag={isMobile ? "x" : false}
          dragMomentum={false}
          dragElastic={0.1}
        >
          {(isMobile ? extendedTestimonials : testimonials).map((t, index) => (
            <TestimonialCard key={`testimonial-${index}`} testimonial={t} />
          ))}
        </motion.div>
      </div>
      
      {/* Mobile status indicator */}
      {isMobile && (
        <div className="flex justify-center mt-4 space-x-4">
          <p className="text-neutral-400 text-sm">
            {isTouching 
              ? "Swiping..." 
              : isAutoScrolling 
                ? "Auto-flowing" 
                : "Resuming flow in 4s"
            }
          </p>
          
          {/* Card indicators */}
          <div className="flex space-x-2">
            {testimonials.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  index === currentIndex % testimonials.length
                    ? "bg-white" 
                    : "bg-neutral-600"
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};