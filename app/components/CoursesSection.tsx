"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useTransform,
  useMotionValueEvent,
  MotionValue,
  useSpring,
  AnimatePresence,
  useMotionValue, // Import useMotionValue for fallback
} from "framer-motion";
import {
  CourseType,
  allDomains,
  DomainView,
} from "../constants/courseConstant";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { IoIosPeople } from "react-icons/io";
import { FaLaptopCode } from "react-icons/fa6";
import { GiPlug } from "react-icons/gi";
import { FaScrewdriverWrench } from "react-icons/fa6";
import { MdEngineering } from "react-icons/md";

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
      if (typeof window !== "undefined") {
        setIsMobile(window.innerWidth < breakpoint);
      }
    };
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => {
      window.removeEventListener("resize", checkDevice);
    };
  }, [breakpoint]);
  return isMobile;
};

// MODIFICATION 1: Update Card props to make animation-specific props optional
interface CardProps {
  course: CourseType;
  isMobile: boolean;
  animatedProgress?: MotionValue<number>;
  i?: number;
}

const Card: React.FC<CardProps> = ({
  course,
  animatedProgress,
  i,
  isMobile,
}) => {
  const router = useRouter();

  // --- DESKTOP STACKING ANIMATION LOGIC ---
  // We use fallbacks (e.g., useMotionValue(0)) so the hooks don't break on mobile
  // when animatedProgress or i are undefined.
  const distance = useTransform(animatedProgress ?? useMotionValue(0), (p) => p - (i ?? 0));
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
  // --- END DESKTOP LOGIC ---

  // MODIFICATION 2: Define animation variants for mobile fade effect
  const mobileFadeVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  };
  
  // MODIFICATION 3: Conditionally apply animation props and styles
  const motionProps = isMobile
    ? {
        variants: mobileFadeVariants,
        initial: "initial",
        animate: "animate",
        
        exit: "exit",
         transition: { duration: 0.3, ease: "easeInOut" as const },
        className: `relative  overflow-hidden border-2 border-[rgba(255,255,255,0.3)] w-full max-w- rounded-2xl flex flex-col bg-black items-center justify-center shadow-xl   h-full `
      }
    : {
        style: {
          translateY,
          scale,
          opacity: cardOpacity,
          zIndex: i,
          pointerEvents,
          backgroundSize: "cover",
          backgroundPosition: "center",
        },
        // FIX: Reduced padding from p-8 to p-6 to prevent horizontal cropping of the background image text.
        className: `absolute overflow-hidden border-2 border-[rgba(255,255,255,0.3)] top-0 w-full max-w-sm rounded-2xl flex flex-col bg-black items-center justify-end shadow-xl h-[420px]`
      };

  return (
    <motion.div
      key={course.id}
      {...motionProps}
    >
      <div className="absolute inset-0 w- h-full ">
        <Image
          src={course.cardBg_image}
          alt={course.title}
          fill
          sizes="(max-width: 427px) 80vw, 304px"
          style={{ objectFit: "contain" }}
        />
      </div>

      <button
        onClick={() => router.push(course.route)}
        className="absolute z-10 w-40 py-2.5 px-5 cursor-pointer  bottom-2 font-medium text-white border bg-black/30 backdrop-blur-sm border-white/50  rounded-lg transition-colors hover:bg-white/10 focus:ring-4 focus:outline-none focus:ring-gray-300"
      >
        View Course
      </button>

      {!isMobile && (
        <motion.div
            className="absolute inset-0 bg-black rounded-2xl pointer-events-none"
            style={{ opacity: overlayOpacity }}
        />
      )}
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

  const domainIcons = [
    { name: "Management", icon: IoIosPeople },
    { name: "Civil", icon: MdEngineering },
    { name: "Computer Science", icon: FaLaptopCode },
    { name: "Mechanical", icon: FaScrewdriverWrench },
    { name: "Electronics", icon: GiPlug },
  ];

  const smoothedProgress = useSpring(progress, {
    stiffness: 400,
    damping: 90,
  });

  const activeDomain = useMemo(
    () => allDomains.find((d) => d.view === activeView),
    [activeView]
  );

  useMotionValueEvent(smoothedProgress, "change", (latest) => {
    // This logic is for desktop scrolling, so we gate it.
    if (!isMobile && activeDomain) {
      const courseCount = activeDomain.courses.length;
      if (courseCount <= 1) {
        setActiveCardIndex(0);
        return;
      }

      const animatedValue = latest * courseCount;
      const cardIndex = Math.round(animatedValue - 0.7);
      setActiveCardIndex(Math.max(0, Math.min(cardIndex, courseCount - 1)));
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

  const handleDomainSwitch = (domain: (typeof allDomains)[0]) => {
    if (domain.view === activeView) {
      return;
    }

    const courseCount = domain.courses.length;
    if (courseCount === 0) return;

    // For desktop, we set a specific progress to show the stack
    if(!isMobile) {
        let targetProgress;
        switch (domain.view) {
          case "management":
            targetProgress = 0.24;
            break;
          case "technical":
            targetProgress = 0.195;
            break;
          default:
            targetProgress = 1 / courseCount;
            break;
        }
        progress.set(targetProgress);
        onSetProgress(targetProgress);
    }
    
    onSwitchView(domain.view);
    setActiveCardIndex(0);
  };

  const handleTileClick = (index: number) => {
    setActiveCardIndex(index);

    // For desktop, clicking a tile drives the scroll animation
    if (!isMobile && activeDomain) {
        const courseCount = activeDomain.courses.length;
        if (courseCount <= 1) {
          onSetProgress(1);
          return;
        }
        const targetProgress = (index + 1) / courseCount;
        onSetProgress(targetProgress);
    }
    // For mobile, just setting the index is enough to trigger the fade animation.
  };
  
  const cardAnimationDriver = useTransform(smoothedProgress, (p) => {
      const numCourses = activeDomain?.courses.length || 1;
      return p * numCourses - 1;
  });

  return (
    <div className="relative w-full  h-full min-h-screen text-white flex flex-col lg:flex-row gap-2 justify-center md:justify-center mx-auto px-4 items-center pt- md:pt-0  py-12 md:pb-0">
      {!isMobile && (
        <div className="md:h-28 lg:h-auto lg:absolute top-16 left-1/2 -translate-x-1/2 z-10 lg:max-w-8xl flex w-full flex-col items-center gap-4 px-4 m">
          <div className="w-full overflow-x-auto scrollbar-hide md:w-fit">
            <div className="relative mx-auto flex flex-wrap justify-center items-center w-fit max-w-full rounded-2xl lg:max-w-8xl p-2 backdrop-blur-sm md:flex-nowrap md:rounded-full md:p-1 md:mx-0">
              <motion.div
                className="absolute top-1 h-[calc(100%-0.5rem)] rounded-full bg-white hidden md:block"
                animate={sliderStyle}
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
              {allDomains.map((domain, index) => (
                <button
                  key={domain.name}
                  ref={(el) => {
                    buttonRefs.current[index] = el;
                  }}
                  onClick={() => domain.enabled && handleDomainSwitch(domain)}
                  disabled={!domain.enabled}
                  className={`relative z-10 cursor-pointer whitespace-nowrap rounded-full py-2 px-4 text-xs md:text-sm font-semibold transition-colors duration-300
                      ${
                        !domain.enabled
                          ? "cursor-not-allowed text-white/50"
                          : activeView === domain.view
                          ? "text-black"
                          : "text-white"
                      }
                      `}
                >
                  {domain.name}
                </button>
              ))}
            </div>
          </div>
          <div className="relative w-full max-w-8xl h-10 flex items-center justify-center overflow-x-auto scrollbar-hide">
            <AnimatePresence mode="wait">
              {activeDomain && (
                <motion.div
                  key={activeDomain.view}
                  className="absolute inset-0 flex items-center justify-center gap-2 px-2 whitespace-nowrap"
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
                        className={`flex-shrink-0 rounded-full px-4 py-1 text-sm font-medium whitespace-nowrap transition-all duration-300 border
                          ${
                            activeCardIndex === i
                              ? "bg-white text-orange-600 cursor-pointer font-semibold border-white shadow-lg"
                              : "bg-black/40 text-white cursor-pointer border-white/30 backdrop-blur-sm hover:bg-black/60 hover:border-white/50"
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
      )}

      <div className="w-full text-center md:text-left flex items-center justify-center md:p-0 lg:mb-18">
        <div className="w-full h-auto md:relative md:h-80 lg:ml-24">
          <AnimatePresence mode="wait">
            {activeDomain && (
              <motion.div
                key={activeDomain.view}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="md:absolute md:inset-0"
              >
                <h2 className="text-2xl sm:text-4xl md:text-6xl font-extrabold leading-tight">
                  {activeDomain.content.heading}
                  <span className="block opacity-80">
                    {activeDomain.content.subheading}
                  </span>
                </h2>
                <p className="lg:text-lg text-sm hidden md:block md:text-xl opacity-90 mt-4">
                  {activeDomain.content.paragraph}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      {isMobile && (
        <div className="w-full flex  justify-center  items-center gap-4 my-6">
          {allDomains.map((domain, index) => {
            const iconData = domainIcons.find(
              (icon) => icon.name === domain.name
            );
            const IconComponent = iconData ? iconData.icon : null;

            return (
              <div key={domain.name} className="flex flex-col b items-center gap-1">
                <button
                  ref={(el) => {
                    buttonRefs.current[index] = el;
                  }}
                  onClick={() => domain.enabled && handleDomainSwitch(domain)}
                  disabled={!domain.enabled}
                  title={domain.name}
                  className={`relative z-10 flex h-12 w-12 items-center justify-center cursor-pointer rounded-full p-2 transition-all duration-300
                  ${
                    !domain.enabled
                      ? "cursor-not-allowed opacity-50"
                      : activeView === domain.view
                      ? "scale-110 bg-white/90 ring-2 ring-white/50"
                      : "bg-white/10 hover:bg-white/20"
                  }`}
                >
                  {IconComponent && (
                    <IconComponent
                      size={28}
                      className={`transition-colors duration-300 ${
                        activeView === domain.view
                          ? "text-slate-800"
                          : "text-white"
                      }`}
                    />
                  )}
                </button>
                <span className="text-[8px] font-medium text-white/80">
                  {domain.name}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* MODIFICATION 4: Conditionally render cards */}
      <div className="relative w-full md:w-1/2 h-full  p- md:h-full lg:h-[480px] flex items-center justify-center z-10">
        {activeDomain && (
            isMobile ? (
                // --- MOBILE: FADE ANIMATION ---
                // We use AnimatePresence to handle the exit animation of the old card
                // and the enter animation of the new card.
                <AnimatePresence mode="wait">
                    <Card
                        // The key is crucial for AnimatePresence to detect a component change
                        key={`${activeDomain.view}-${activeDomain.courses[activeCardIndex].id}`}
                        course={activeDomain.courses[activeCardIndex]}
                        isMobile={isMobile}
                    />
                </AnimatePresence>
            ) : (
                // --- DESKTOP: STACKING ANIMATION (Original logic) ---
                activeDomain.courses.map((course, i) => (
                    <Card
                        key={`${activeDomain.view}-${course.id}`}
                        course={course}
                        animatedProgress={cardAnimationDriver}
                        i={i}
                        isMobile={isMobile}
                    />
                ))
            )
        )}
      </div>
      
      {isMobile && (
        <div className="w-full rounded-2xl  p-2  mt-4 md:hidden z-20">
          <AnimatePresence mode="wait">
            {activeDomain && (
              <motion.div
                key={activeDomain.view}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
                className="flex items-center w-full gap-2 px-2 overflow-x-auto scrollbar-hide  justify-center flex-wrap"
              >
                {activeDomain.courses.map((course, i) => (
                  <button
                    key={course.id}
                    onClick={() => handleTileClick(i)}
                    className={`z-10 cursor-pointer whitespace-nowrap rounded-full py-2 px-4 text-xs font-semibold transition-colors duration-300
                        ${
                          activeCardIndex === i
                            ? "bg-white text-orange-600 font-semibold"
                            : "bg-black/40 text-white backdrop-blur-sm"
                        }`}
                  >
                    {course.shortTitle || course.title}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default React.memo(CoursesSection);