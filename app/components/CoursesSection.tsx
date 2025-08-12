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
      
      let newProgress = 0;
      if (scrollY >= coursesStartZone && scrollY <= coursesEndZone) {
        const totalZoneHeight = coursesEndZone - coursesStartZone;
        const progressInZone = scrollY - coursesStartZone;
        newProgress = progressInZone / totalZoneHeight;
      } else if (scrollY > coursesEndZone) {
        newProgress = 1;
      }
      
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
  const animatedProgress = (progress * cardCount) - 1;

  return (
    <section ref={sectionRef} className="relative w-full text-white" style={{ height: `${120 + cardCount * 70}vh` }}>
      <div className="sticky top-0 flex flex-col md:flex-row max-w-7xl mx-auto px-8 gap-12 h-screen items-center">
        <div className="w-full md:w-full mb-60 flex flex-col justify-center">
          <h2 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Unlock Your Potential.
            <span className="block opacity-80">One Course at a Time.</span>
          </h2>
          <p className="text-lg md:text-xl max-w-xl opacity-90 mt-6">
            Our curriculum is designed to be hands-on and project-based, ensuring you gain practical skills that are directly applicable in the real world. Scroll to explore our featured courses.
          </p>
        </div>

        <div className="relative w-full md:w-1/2 h-[480px] flex items-center justify-center">
          {courses.map((course, i) => {
            const distance = animatedProgress - i;

            let translateY = 0;
            let scale = 1;
            let cardOpacity = 0;

            const initialY = 480;
            const stackOffset = 14; 
            const stackScale = 0.05;

            // --- FIX: New progressive darkening logic ---
            let overlayOpacity = 0;
            const maxOverlayOpacity = 0.9; // Max darkness of cards deep in the stack
            const baseDarknessFactor = 0.25; // How dark the card directly behind the top one becomes

            if (distance > 0) {
              // This condition is true for any card that is being covered or is already in the stack.
              // The overlay opacity is now directly proportional to the card's distance from the top,
              // creating a smooth transition as you scroll.
              overlayOpacity = Math.min(maxOverlayOpacity, distance * baseDarknessFactor);
            }

            if (distance >= 0) {
              translateY = -distance * stackOffset;
              scale = 1 - distance * stackScale;
              cardOpacity = 1;
            } else if (distance > -1 && distance < 0) {
              const localProgress = 1 + distance;
              translateY = initialY * (1 - localProgress);
              scale = 0.8 + 0.2 * localProgress;
              cardOpacity = localProgress;
            } else {
              translateY = initialY;
              scale = 0.8;
              cardOpacity = 0;
            }

            return (
              <motion.div
                key={course.id}
                initial={false}
                style={{
                  transform: `translateY(${translateY}px) scale(${scale})`,
                  opacity: cardOpacity,
                  zIndex: i,
                }}
                className="absolute top-0 w-full max-w-sm h-[400px] rounded-2xl p-8 flex flex-col items-center justify-start border border-black/10 bg-white shadow-xl"
              >
                <div className="w-full h-32 flex items-center justify-center mb-4">
                   <course.icon />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 text-center">{course.title}</h3>
                <p className="text-gray-600 text-center mt-2">{course.description}</p>
                
                <div 
                  className="absolute inset-0 bg-black rounded-2xl pointer-events-none transition-opacity duration-300"
                  style={{ opacity: overlayOpacity }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}