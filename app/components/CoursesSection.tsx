"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useTransform,
  useMotionValueEvent,
  MotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import {
  CourseType,
  allDomains,
  DomainView,
} from "../constants/courseConstant";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface CoursesSectionProps {
  progress: MotionValue<number>;
  onSwitchView: (view: DomainView) => void;
  onSetProgress: (progress: number) => void;
  activeView: DomainView;
}

const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(
        typeof window !== "undefined" && window.innerWidth < breakpoint
      );
    };
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => {
      window.removeEventListener("resize", checkDevice);
    };
  }, [breakpoint]);
  return isMobile;
};

const Card = ({
  course,
  animatedProgress,
  i,
  isMobile,
}: {
  course: CourseType;
  animatedProgress: MotionValue<number>;
  i: number;
  isMobile: boolean;
}) => {
  const router = useRouter();
  const distance = useTransform(animatedProgress, (p) => p - i);
  const initialY = 480;
  const stackOffset = 14;
  const stackScale = 0.05;
  const maxOverlayOpacity = 0.8;
  const baseDarknessFactor = 0.3;

  const pointerEvents = useTransform(distance, (d) =>
    d < 0.5 ? "auto" : "none"
  );
  const translateY = useTransform(distance, (d) => {
    if (d >= 0) return -d * stackOffset;
    if (d > -1) return initialY * (1 - (1 + d));
    return initialY;
  });
  const scale = useTransform(distance, (d) => {
    const finalScale = isMobile ? 0.85 : 1.0;
    const initialScale = isMobile ? 0.7 : 0.8;
    const scaleRange = finalScale - initialScale;
    if (d >= 0) return finalScale - d * stackScale;
    if (d > -1) return initialScale + scaleRange * (1 + d);
    return initialScale;
  });
  const cardOpacity = useTransform(distance, (d) => {
    if (d >= 0) return 1;
    if (d > -1) return 1 + d;
    return 0;
  });
  const overlayOpacity = useTransform(distance, (d) =>
    d > 0 ? Math.min(maxOverlayOpacity, d * baseDarknessFactor) : 0
  );

  return (
    <motion.div
      key={course.id}
      style={{
        translateY,
        scale,
        opacity: cardOpacity,
        zIndex: i,
        pointerEvents,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className={`absolute overflow-hidden border-2 border-[rgba(255,255,255,0.3)] top-0 w-[90vw] md:w-full max-w-sm rounded-2xl flex flex-col bg-black items-center justify-end shadow-xl ${
        isMobile ? "h-[380px] p-6" : "h-[420px] p-8"
      }`}
    >
      <div className="absolute inset-0 w-full h-full ">
        <Image
          src={course.cardBg_image}
          alt={course.title}
          layout="fill"
          objectFit="cover"
        />
      </div>

      <button
        onClick={() => router.push(course.route)}
        className="absolute z-10 w-44 py-2.5 px-5 cursor-pointer  bottom-2 font-medium text-white border bg-black/30 backdrop-blur-sm border-white/50  rounded-lg transition-colors hover:bg-white/10 focus:ring-4 focus:outline-none focus:ring-gray-300"
      >
        View Course
      </button>

      <motion.div
        className="absolute inset-0 bg-black rounded-2xl pointer-events-none"
        style={{ opacity: overlayOpacity }}
      />
    </motion.div>
  );
};

const CoursesSection: React.FC<CoursesSectionProps> = ({
  progress,
  onSwitchView,
  onSetProgress,
  activeView,
}) => {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const isMobile = useIsMobile();
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0 });

  const smoothedProgress = useSpring(progress, {
    stiffness: 400,
    damping: 90,
  });

  const activeDomain = useMemo(
    () => allDomains.find((d) => d.view === activeView),
    [activeView]
  );

  useMotionValueEvent(progress, "change", (latest) => {
    if (activeDomain) {
      const courseCount = activeDomain.courses.length;
      // Map the 0-1 progress directly to a card index
      const cardIndex = Math.round(latest * (courseCount > 1 ? courseCount - 1 : 0));
      setActiveCardIndex(
        Math.max(0, Math.min(cardIndex, courseCount - 1))
      );
    }
  });


  useEffect(() => {
    const activeDomainIndex = allDomains.findIndex(
      (d) => d.view === activeView
    );
    if (activeDomainIndex !== -1) {
      const activeButton = buttonRefs.current[activeDomainIndex];
      if (activeButton) {
        setSliderStyle({
          left: activeButton.offsetLeft,
          width: activeButton.offsetWidth,
        });
      }
    }
  }, [activeView, isMobile]);

  // Simplified: handleTileClick now calculates a simple 0-1 progress value.
  const handleTileClick = (index: number) => {
    if (!activeDomain) return;
    const courseCount = activeDomain.courses.length;
    if (courseCount <= 1) {
      onSetProgress(0.5); // Go to the middle for a single card
      return;
    }
    const targetProgress = index / (courseCount - 1);
    onSetProgress(targetProgress);
  };
  
  // Simplified: The animated progress maps the 0-1 smoothedProgress directly.
  const animatedCardProgress = useTransform(
    smoothedProgress,
    [0, 1],
    [-1, (activeDomain?.courses.length || 1) - 1]
  );

  return (
    <div className="relative w-full h-full text-white flex flex-col md:flex-row gap-8 justify-end md:justify-center mx-auto px-4 sm:px-8 items-center pb-12 md:pb-0">
      <div className="absolute  top-16 left-1/2 -translate-x-1/2 z-10 lg:max-w-8xl flex w-full flex-col items-center gap-4 px-4  m">
        <div className="w-full  overflow-x-auto scrollbar-hide md:w-fit">
          <div className="relative mx-auto flex max-w-5xl items-center rounded-full bg-black/30 p-1 backdrop-blur-sm md:mx-0">
            <motion.div
              className="absolute top-1 h-[calc(100%-0.5rem)] rounded-full bg-white"
              animate={sliderStyle}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
            />
            {allDomains.map((domain, index) => (
              <button
                key={domain.name}
                ref={(el) => {
                  buttonRefs.current[index] = el;
                }}
                onClick={() => domain.enabled && onSwitchView(domain.view)}
                disabled={!domain.enabled}
                className={`relative z-10 cursor-pointer whitespace-nowrap rounded-full py-2 px-4 text-xs md:text-sm font-semibold transition-colors duration-300
                    ${
                      !domain.enabled
                        ? "cursor-not-allowed text-white/50"
                        : activeView === domain.view
                        ? "text-gray-900"
                        : "text-white"
                    }
                    `}
              >
                {domain.name}
              </button>
            ))}
          </div>
        </div>

        <div className="relative w-full max-w-8xl h-10 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {activeDomain && (
              <motion.div
                key={activeDomain.view}
                className="absolute inset-0 flex items-center justify-center gap-2 px-2 overflow-x-auto scrollbar-hide"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-2 flex-nowrap min-w-fit">
                  {activeDomain.courses.map((course, i) => (
                    <button
                      key={course.id}
                       onClick={() => handleTileClick(i)}
                      className={`flex-shrink-0 rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-all duration-300 border
                        ${
                          activeCardIndex === i
                            ? "bg-white text-black font-semibold border-white shadow-lg"
                            : "bg-black/40 text-white border-white/30 backdrop-blur-sm hover:bg-black/60 hover:border-white/50"
                        }`}
                    >
                      {course.title}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="w-full pt-44 text-center md:text-left md:pt-0 md:static md:w-full md:p-0 flex items-center lg:mb-28 justify-center">
        <div className="relative w-full h-56 md:h-80 lg:ml-24">
          <AnimatePresence mode="wait">
            {activeDomain && (
              <motion.div
                key={activeDomain.view}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <h2 className=" text-2xl md:text-6xl font-extrabold leading-tight">
                  {activeDomain.content.heading}
                  <span className="block opacity-80">
                    {activeDomain.content.subheading}
                  </span>
                </h2>
                <p className="lg:text-lg text-sm md:text-xl opacity-90 mt-4">
                  {activeDomain.content.paragraph}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="relative w-full md:w-1/2 h-[480px] mt-4 md:mt-12 flex items-center justify-center">
        {activeDomain &&
          activeDomain.courses.map((course, i) => (
            <Card
              key={`${activeDomain.view}-${course.id}`}
              course={course}
              animatedProgress={animatedCardProgress}
              i={i}
              isMobile={isMobile}
            />
          ))}
      </div>
    </div>
  );
};

export default React.memo(CoursesSection);