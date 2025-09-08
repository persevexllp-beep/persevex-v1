"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, useMotionValueEvent, MotionValue, useSpring } from "framer-motion";
import { CourseType, managementContent, managementCourses, technicalCourses, technicalContent } from "../constants/courseConstant";
import { useRouter } from "next/navigation";
import Image from "next/image";

// --- HELPER HOOK ---
const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(typeof window !== "undefined" && window.innerWidth < breakpoint);
    };
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => {
      window.removeEventListener("resize", checkDevice);
    };
  }, [breakpoint]);
  return isMobile;
};

// --- CARD COMPONENT (Updated for mobile scaling) ---
// --- CARD COMPONENT (Corrected) ---
const Card = ({ course, animatedProgress, i, isMobile }: { course: CourseType, animatedProgress: MotionValue<number>, i: number, isMobile: boolean }) => {
  const router = useRouter();
  const distance = useTransform(animatedProgress, (p) => p - i);
  const initialY = 480;
  const stackOffset = 14;
  const stackScale = 0.05;
  const maxOverlayOpacity = 0.8;
  const baseDarknessFactor = 0.3;

  // ... (All other useTransform hooks are unchanged) ...
  const pointerEvents = useTransform(distance, (d) => d < 0.5 ? "auto" : "none");
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
  const overlayOpacity = useTransform(distance, (d) => d > 0 ? Math.min(maxOverlayOpacity, d * baseDarknessFactor) : 0);

  const Icon = course.icon;

  // --- THE FIX IS HERE ---
  // We combine the gradient overlay and the image in a single CSS property.
  // The first background listed is on top.
  const cardBackgroundImage = `
    url(${course.cardBg_image})
  `;

  return (
    <motion.div
      key={course.id}
      style={{
        translateY,
        scale,
        opacity: cardOpacity,
        zIndex: i,
        pointerEvents,
       
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      className={`absolute overflow-hidden border-2 border-[rgba(255,255,255,0.3)] top-0 w-[90vw] md:w-full max-w-sm rounded-2xl flex flex-col bg-black items-center justify-end shadow-xl ${isMobile ? 'h-[380px] p-6' : 'h-[420px] p-'}`}
    >
      <div className="w-full h-full ">
        <Image src={course.cardBg_image} alt="image" height={1000} width={1000} />
      </div>
      {/* 
        THE OVERLAY DIV IS NOW REMOVED. 
        The linear-gradient in the style prop handles the overlay. 
      */}

      {/* Card Content with relative z-index */}
      {/* <div className="relative z-10 flex flex-col items-center text-center">
        <div className="w-full h-28 md:h-32 flex items-center justify-center mb-2 md:mb-4">
          <Icon />
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-white">{course.title}</h3>
        <p className="text-sm md:text-base text-gray-200 mt-2">{course.description}</p>
      </div> */}

      <button
        onClick={() => router.push(course.route)}
        className="absolute z-10 w-44 py-2.5 mt-   px-5 cursor-pointer  font-medium text-white border  rounded-lg transition-colors focus:ring-4 focus:outline-none focus:ring-gray-300"
      >
        View Course
      </button>

      {/* Stacking overlay for when cards are behind */}
      <motion.div
        className="absolute inset-0 bg-black rounded-2xl pointer-events-none"
        style={{ opacity: overlayOpacity }}
      />
    </motion.div>
  );
};

// --- MAIN SECTION COMPONENT (Updated) ---
const CoursesSection: React.FC<{ progress: MotionValue<number> }> = ({ progress }) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeView, setActiveView] = useState<'management' | 'technical'>('management');
  const isMobile = useIsMobile();

  const smoothedProgress = useSpring(progress, {
    stiffness: 400,
    damping: 90,
  });

  const DWELL_TIME_UNITS = 1;
  const managementUnits = managementCourses.length;
  const technicalUnits = technicalCourses.length;
  const totalUnits = managementUnits + DWELL_TIME_UNITS + technicalUnits;
  const managementAnimationEndProgress = managementUnits / totalUnits;
  const technicalAnimationStartProgress = (managementUnits + DWELL_TIME_UNITS) / totalUnits;
  const switchPoint = (managementAnimationEndProgress + technicalAnimationStartProgress) / 2;

  useMotionValueEvent(progress, "change", (latest) => {
    setActiveView(latest >= switchPoint ? 'technical' : 'management');
  });

  const handleSwitch = (view: 'management' | 'technical') => {
    if (!sectionRef.current) return;
    const el = sectionRef.current;
    const rect = el.getBoundingClientRect();
    const scrollY = window.scrollY;
    const sectionTop = rect.top + scrollY;
    const sectionHeight = rect.height;
    const viewportHeight = window.innerHeight;
    const coursesStartZone = sectionTop - viewportHeight * 0.8;
    const coursesEndZone = sectionTop + sectionHeight - viewportHeight;
    const totalZoneHeight = coursesEndZone - coursesStartZone;

    if (view === 'management') {
      const managementPosition = coursesStartZone + (totalZoneHeight * (managementAnimationEndProgress / 2));
      window.scrollTo({ top: managementPosition, behavior: 'smooth' });
    } else {
      const technicalPosition = coursesStartZone + (totalZoneHeight * technicalAnimationStartProgress);
      window.scrollTo({ top: technicalPosition, behavior: 'smooth' });
    }
  };

  const textTransitionProgress = useTransform(
    smoothedProgress,
    [managementAnimationEndProgress, technicalAnimationStartProgress],
    [0, 1]
  );

  const managementAnimatedProgress = useTransform(
    smoothedProgress,
    [0, managementAnimationEndProgress],
    [-1, managementCourses.length - 1]
  );
  
  const technicalAnimatedProgress = useTransform(
    smoothedProgress,
    [technicalAnimationStartProgress, 1],
    [-1, technicalCourses.length - 1]
  );

  const managementTextOpacity = useTransform(textTransitionProgress, [0, 1], [1, 0]);
  const managementTextY = useTransform(textTransitionProgress, [0, 1], [0, -20]);
  const technicalTextOpacity = textTransitionProgress;
  const technicalTextY = useTransform(textTransitionProgress, [0, 1], [20, 0]);
  
  const managementStackOpacity = useTransform(textTransitionProgress, v => 1 - v);
  const technicalStackOpacity = textTransitionProgress;
  
  const managementPointerEvents = useTransform(managementStackOpacity, (o) => (o > 0.1 ? "auto" : "none"));
  const technicalPointerEvents = useTransform(technicalStackOpacity, (o) => (o > 0.1 ? "auto" : "none"));

  return (
    <div
      ref={sectionRef as React.RefObject<HTMLDivElement>}
      className="relative w-full h-full text-white flex flex-col md:flex-row gap-8 justify-end md:justify-center mx-auto px-8 items-center pb-12 md:pb-0"
    >
      <div className="absolute top-16 left-1/2 -translate-x-1/2 z-10">
        <div className="relative flex w-fit items-center rounded-full bg-transparent px-1 lg:p-1 backdrop-blur-sm">
            <motion.div
              className="absolute left-1 top-1 h-[calc(100%-0.5rem)] w-[110px] rounded-full bg-white"
              animate={{ x: activeView === 'management' ? '0%' : '100%' }}
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            />
            <button
              onClick={() => handleSwitch('management')}
              className={`relative z-10 w-[110px] cursor-pointer rounded-full lg:py-2 text-sm font-semibold transition-colors duration-300 ${activeView === 'management' ? 'text-gray-900' : 'text-white'
                }`}
            >
              Management
            </button>
            <button
              onClick={() => handleSwitch('technical')}
              className={`relative z-10 w-[110px] cursor-pointer rounded-full py-2 text-sm font-semibold transition-colors duration-300 ${activeView === 'technical' ? 'text-gray-900' : 'text-white'
                }`}
            >
              Technical
            </button>
          </div>
      </div>
        
      <div className="absolute top-0 left-0 w-full pt-36 px-8 md:static md:w-full md:p-0 flex items-center lg:mb-44 justify-center">
        <div className="relative w-full lg:ml-24 lg:h-80">
            <motion.div
              className="absolute top-0 left-0 w-full"
              style={{
                opacity: managementTextOpacity,
                y: managementTextY,
              }}
            >
              <h2 className=" text-2xl md:text-6xl font-extrabold leading-tight">
                {managementContent.heading}
                <span className="block opacity-80">{managementContent.subheading}</span>
              </h2>
              <p className="lg:text-lg text-sm md:text-xl opacity-90 mt-4">
                {managementContent.paragraph}
              </p>
            </motion.div>

            <motion.div
              className="absolute top-0 left-0 w-full"
              style={{
                opacity: technicalTextOpacity,
                y: technicalTextY,
              }}
            >
              <h2 className="text-2xl md:text-6xl font-extrabold leading-tight">
                {technicalContent.heading}
                <span className="block opacity-80">{technicalContent.subheading}</span>
              </h2>
              <p className="lg:text-lg text-sm md:text-xl opacity-90 mt-2">
                {technicalContent.paragraph}
              </p>
            </motion.div>
          </div>
      </div>

      <div className="relative w-full md:w-1/2 h-[480px] lg:mt-0 flex items-center justify-center">
        <motion.div
            className="absolute inset-0 flex justify-center mt-20 lg:mt-0 items-center"
            style={{ 
              opacity: managementStackOpacity,
              pointerEvents: managementPointerEvents 
            }}
          >
            {managementCourses.map((course, i) => (
              <Card key={course.id} course={course} animatedProgress={managementAnimatedProgress} i={i} isMobile={isMobile} />
            ))}
          </motion.div>

          <motion.div
            className="absolute inset-0 flex justify-center mt-20 lg:mt-0 items-center"
            style={{ 
              opacity: technicalStackOpacity,
              pointerEvents: technicalPointerEvents 
            }}
          >
            {technicalCourses.map((course, i) => (
              <Card key={course.id} course={course} animatedProgress={technicalAnimatedProgress} i={i} isMobile={isMobile} />
            ))}
          </motion.div>
      </div>
    </div>
  );
}

export default React.memo(CoursesSection);