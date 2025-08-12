"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// --- Placeholder Icons ---
const WebDevIcon = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-500">
    <path d="M7 8L3 12L7 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17 8L21 12L17 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 4L10 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const DataScienceIcon = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-500">
    <path d="M3 3V12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 3V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const MobileDevIcon = () => (
    // This icon is used in the original image for Mobile App Development
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-green-500">
      <rect x="7" y="2" width="10" height="20" rx="2" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="18" r="1" fill="currentColor" />
    </svg>
);
const DesignIcon = () => (
    // This icon is used in the original image for UI/UX Design
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-orange-500">
        <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" fillOpacity="0.2"/>
        <path d="M12 3C12 3 15 6 15 12C15 18 12 21 12 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

// --- Updated Course Data ---
const courses = [
    { id: 1, title: "Web Development Mastery", description: "From HTML to advanced React, become a full-stack web developer.", icon: WebDevIcon },
    { id: 2, title: "Data Science & ML", description: "Dive into data analysis, machine learning, and Python.", icon: DataScienceIcon },
    { id: 3, title: "Mobile App Development", description: "Build beautiful, native iOS and Android applications.", icon: MobileDevIcon },
    { id: 4, title: "UI/UX Design Fundamentals", description: "Master the principles of user-centric design and Figma.", icon: DesignIcon },
];

export default function CoursesSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [isInCoursesZone, setIsInCoursesZone] = useState<boolean>(false);

  useEffect(() => {
    let raf = 0;
    const updateProgress = () => {
      if (!sectionRef.current) return;
      const el = sectionRef.current;
      const rect = el.getBoundingClientRect();
      const scrollY = window.scrollY;
      const sectionTop = rect.top + scrollY;
      const sectionHeight = rect.height;
      const viewportHeight = window.innerHeight;
      
      const coursesStartZone = sectionTop - viewportHeight * 0.8; 
      
      // --- FIX: Correct calculation for the end of the scroll zone ---
      // The animation should conclude when the bottom of the section aligns with the bottom of the viewport.
      // This ensures the sticky container is still fully visible when the animation finishes (progress = 1).
      // The original calculation (sectionHeight - viewportHeight * 0.1) caused the animation to end
      // too late, after the sticky container had already started scrolling off-screen.
      const coursesEndZone = sectionTop + sectionHeight - viewportHeight;
      
      const inCoursesZone = scrollY >= coursesStartZone && scrollY <= coursesEndZone;
      setIsInCoursesZone(inCoursesZone);
      
      if (scrollY < coursesStartZone) {
        setProgress(0);
      } else if (scrollY > coursesEndZone) {
        setProgress(1);
      } else {
        const zoneProgress = (scrollY - coursesStartZone) / (coursesEndZone - coursesStartZone);
        setProgress(Math.max(0.001, Math.min(1, zoneProgress)));
      }
    };
    
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        updateProgress();
        raf = 0;
      });
    };
    
    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const cardCount = courses.length;
  const displayProgress = isInCoursesZone ? Math.max(0.001, progress) : progress;

  return (
    <section ref={sectionRef} className="relative w-full text-white" style={{ height: `${120 + cardCount * 70}vh` }}>
      <div className="sticky top-0 flex flex-col md:flex-row max-w-7xl mx-auto px-8 gap-12 h-screen items-center">
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <h2 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Unlock Your Potential.
            <span className="block opacity-80">One Course at a Time.</span>
          </h2>
          <p className="text-lg md:text-xl max-w-xl opacity-90 mt-6">
            Our curriculum is designed to be hands-on and project-based, ensuring you gain practical skills that are directly applicable in the real world. Scroll to explore our featured courses.
          </p>
        </div>

        <div className="relative w-full md:w-1/2 h-[520px] flex items-center justify-center">
          {courses.map((course, i) => {
            const animatedProgress = displayProgress * (cardCount - 1);
            const distance = animatedProgress - i;

            let translateY = 0;
            let scale = 1;
            let opacity = 0;

            const initialY = 480;
            const stackOffset = 14; 
            const stackScale = 0.05;

            if (distance >= 0) {
              // Card is in the stack
              translateY = -distance * stackOffset;
              scale = 1 - distance * stackScale;
              opacity = 1;
            } else if (distance > -1 && distance < 0) {
              // Card is animating IN
              const localProgress = 1 + distance;
              translateY = initialY * (1 - localProgress);
              scale = 0.8 + 0.2 * localProgress;
              opacity = localProgress;
            } else {
              // Card is waiting off-screen
              translateY = initialY;
              scale = 0.8;
              opacity = 0;
            }

            return (
              <motion.div
                key={course.id}
                initial={false}
                style={{
                  transform: `translateY(${translateY}px) scale(${scale})`,
                  opacity,
                  zIndex: i,
                }}
                className="absolute top-0 w-full max-w-sm h-[480px] rounded-2xl p-8 flex flex-col items-center justify-start border border-black/10 bg-white shadow-xl"
              >
                <div className="w-full h-32 flex items-center justify-center mb-4">
                   <course.icon />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 text-center">{course.title}</h3>
                <p className="text-gray-600 text-center mt-2">{course.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}