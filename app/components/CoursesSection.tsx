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
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-green-500">
      <rect x="7" y="2" width="10" height="20" rx="2" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="18" r="1" fill="currentColor" />
    </svg>
);
const DesignIcon = () => (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-orange-500">
        <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" fillOpacity="0.2"/>
        <path d="M12 3C12 3 15 6 15 12C15 18 12 21 12 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const courses = [
    { id: 1, title: "Web Development Mastery", description: "From HTML to advanced React, become a full-stack web developer.", icon: WebDevIcon },
    { id: 2, title: "Data Science & ML", description: "Dive into data analysis, machine learning, and Python.", icon: DataScienceIcon },
    { id: 3, title: "Mobile App Development", description: "Build beautiful, native iOS and Android applications.", icon: MobileDevIcon },
    { id: 4, title: "UI/UX Design Fundamentals", description: "Master the principles of user-centric design and Figma.", icon: DesignIcon },
];

export default function CoursesSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState<number>(0);
  // --- FIX: Removed unused isInCoursesZone state ---

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
      const coursesEndZone = sectionTop + sectionHeight - viewportHeight;
      
      // --- FIX: Simplified and corrected progress calculation ---
      let newProgress = 0;
      if (scrollY >= coursesStartZone && scrollY <= coursesEndZone) {
        const totalZoneHeight = coursesEndZone - coursesStartZone;
        const progressInZone = scrollY - coursesStartZone;
        newProgress = progressInZone / totalZoneHeight;
      } else if (scrollY > coursesEndZone) {
        newProgress = 1;
      }
      // If scrollY is before the start zone, progress remains 0.
      // This removes the need for the 0.001 hack and ensures the animation resets to 0.
      
      setProgress(newProgress);
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

  // --- FIX: Adjusted animatedProgress calculation ---
  // It now maps the scroll progress (0 to 1) to an animation range that starts
  // with the cards off-screen (at -1) and ends with the last card on top.
  const animatedProgress = (progress * cardCount) - 1;

  return (
    <section ref={sectionRef} className="relative w-full text-white" style={{ height: `${120 + cardCount * 70}vh` }}>
      <div className="sticky top-0 flex  flex-col md:flex-row  max-w-8xl mx-auto px-8 gap-12 h-screen items-center">
        <div className="w-full md:w-full flex flex-col justify-center">
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
            // The card animation logic now works correctly because animatedProgress has the correct range.
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
              // Card is waiting off-screen (opacity remains 0)
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
                className="absolute top-0 w-full max-w-sm h-[450px] rounded-2xl p-8 flex flex-col items-center justify-start border border-black/10 bg-white shadow-xl"
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