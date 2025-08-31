"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, useMotionValueEvent, MotionValue } from "framer-motion";
import { CourseType, managementContent, managementCourses, technicalCourses, technicalContent } from "../constants/courseConstant";
import { useRouter } from "next/navigation";

const Card = ({ course, animatedProgress, i }: { course: CourseType, animatedProgress: MotionValue<number>, i: number }) => {
  const router = useRouter();
  const distance = useTransform(animatedProgress, (p) => p - i);
  const initialY = 480;
  const stackOffset = 14;
  const stackScale = 0.05;
  const maxOverlayOpacity = 0.8;
  const baseDarknessFactor = 0.3;

  const translateY = useTransform(distance, (d) => {
    if (d >= 0) return -d * stackOffset;
    if (d > -1) {
      const localProgress = 1 + d;
      return initialY * (1 - localProgress);
    }
    return initialY;
  });

  const scale = useTransform(distance, (d) => {
    if (d >= 0) return 1 - d * stackScale;
    if (d > -1) {
      const localProgress = 1 + d;
      return 0.8 + 0.2 * localProgress;
    }
    return 0.8;
  });

  const cardOpacity = useTransform(distance, (d) => {
    if (d >= 0) return 1;
    if (d > -1) return 1 + d;
    return 0;
  });

  const overlayOpacity = useTransform(distance, (d) => {
    if (d > 0) return Math.min(maxOverlayOpacity, d * baseDarknessFactor);
    return 0;
  });

  const Icon = course.icon;

  return (
    <motion.div
      key={course.id}
      onClick={() => router.push(course.route)}
      style={{
        translateY,
        scale,
        opacity: cardOpacity,
        zIndex: i,
      }}
      className="absolute top-0 w-full max-w-sm h-[400px] rounded-2xl p-8 flex flex-col items-center justify-start border border-black/10 bg-white shadow-xl cursor-pointer"
    >
      <div className="w-full h-32 flex items-center justify-center mb-4">
        <Icon />
      </div>
      <h3 className="text-2xl font-bold text-gray-800 text-center">{course.title}</h3>
      <p className="text-gray-600 text-center mt-2">{course.description}</p>
      <motion.div
        className="absolute inset-0 bg-black rounded-2xl pointer-events-none"
        style={{ opacity: overlayOpacity }}
      />
    </motion.div>
  );
};

const CoursesSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const scrollProgress = useMotionValue(0);
  const [activeView, setActiveView] = useState<'management' | 'technical'>('management');

  const totalCount = managementCourses.length + technicalCourses.length;
  const managementCount = managementCourses.length;

  const managementEndProgress = managementCount / totalCount;

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        if (!sectionRef.current) return;
        const el = sectionRef.current;
        const rect = el.getBoundingClientRect();
        const scrollY = window.scrollY;
        const sectionTop = rect.top + scrollY;
        const sectionHeight = rect.height;
        const viewportHeight = window.innerHeight;

        const coursesStartZone = sectionTop - viewportHeight * 0.8;
        const coursesEndZone = sectionTop + sectionHeight - viewportHeight;

        let newProgress = 0;
        if (scrollY >= coursesStartZone && scrollY <= coursesEndZone) {
          const totalZoneHeight = coursesEndZone - coursesStartZone;
          const progressInZone = scrollY - coursesStartZone;
          newProgress = progressInZone / totalZoneHeight;
        } else if (scrollY > coursesEndZone) {
          newProgress = 1;
        }

        scrollProgress.set(Math.max(0, Math.min(1, newProgress)));
        raf = 0;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [scrollProgress]);

  useMotionValueEvent(scrollProgress, "change", (latest) => {
    setActiveView(latest >= managementEndProgress ? 'technical' : 'management');
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
      const managementPosition = coursesStartZone + (totalZoneHeight * 0.13);
      window.scrollTo({ top: managementPosition, behavior: 'smooth' });
    } else {
      const technicalPosition = coursesStartZone + (totalZoneHeight * 0.5);
      window.scrollTo({ top: technicalPosition, behavior: 'smooth' });
    }
  };

  const textTransitionProgress = useTransform(scrollProgress, (p) => {
    const transitionStartPoint = managementEndProgress - 0.05;
    const transitionEndPoint = managementEndProgress + 0.05;
    if (p >= transitionStartPoint && p <= transitionEndPoint) {
      return (p - transitionStartPoint) / (transitionEndPoint - transitionStartPoint);
    }
    return p > transitionEndPoint ? 1 : 0;
  });

  const overallAnimatedProgress = useTransform(scrollProgress, [0, 1], [-1, totalCount - 1]);
  const managementAnimatedProgress = overallAnimatedProgress;
  const technicalAnimatedProgress = useTransform(overallAnimatedProgress, (v) => v - managementCount);

  const managementTextOpacity = useTransform(textTransitionProgress, [0, 1], [1, 0]);
  const managementTextY = useTransform(textTransitionProgress, [0, 1], [0, -20]);
  const technicalTextOpacity = textTransitionProgress;
  const technicalTextY = useTransform(textTransitionProgress, [0, 1], [20, 0]);
  
  const managementStackOpacity = useTransform(textTransitionProgress, v => 1 - v);
  const technicalStackOpacity = textTransitionProgress;

  return (
    <section
      ref={sectionRef}
      className="relative w-full text-white"
      style={{ height: `${120 + totalCount * 70}vh` }}
    >
      <div className="sticky top-0 flex flex-col md:flex-row gap-8 justify-center mx-auto px-8 h-screen items-center relative">
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-10">
          <div className="relative flex w-fit items-center rounded-full bg-transparent p-1 backdrop-blur-sm">
            <motion.div
              className="absolute left-1 top-1 h-[calc(100%-0.5rem)] w-[110px] rounded-full bg-white"
              animate={{ x: activeView === 'management' ? '0%' : '100%' }}
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            />
            <button
              onClick={() => handleSwitch('management')}
              className={`relative z-10 w-[110px] cursor-pointer rounded-full py-2 text-sm font-semibold transition-colors duration-300 ${activeView === 'management' ? 'text-gray-900' : 'text-white'
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

        <div className="w-full md:w-full flex mb-44 items-center justify-center">
          <div className="relative w-full ml-24 h-80">
            <motion.div
              className="absolute top-0 left-0 w-full"
              style={{
                opacity: managementTextOpacity,
                y: managementTextY,
              }}
            >
              <h2 className="text-4xl md:text-6xl font-extrabold leading-tight">
                {managementContent.heading}
                <span className="block opacity-80">{managementContent.subheading}</span>
              </h2>
              <p className="text-lg md:text-xl opacity-90 mt-6">
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
              <h2 className="text-4xl md:text-6xl font-extrabold leading-tight">
                {technicalContent.heading}
                <span className="block opacity-80">{technicalContent.subheading}</span>
              </h2>
              <p className="text-lg md:text-xl opacity-90 mt-6">
                {technicalContent.paragraph}
              </p>
            </motion.div>
          </div>
        </div>

        <div className="relative w-full md:w-1/2 h-[480px] flex items-center justify-center">
          <motion.div
            className="absolute inset-0 flex justify-center items-center"
            style={{ opacity: managementStackOpacity }}
          >
            {managementCourses.map((course, i) => (
              <Card key={course.id} course={course} animatedProgress={managementAnimatedProgress} i={i} />
            ))}
          </motion.div>

          <motion.div
            className="absolute inset-0 flex justify-center items-center"
            style={{ opacity: technicalStackOpacity }}
          >
            {technicalCourses.map((course, i) => (
              <Card key={course.id} course={course} animatedProgress={technicalAnimatedProgress} i={i} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default React.memo(CoursesSection);