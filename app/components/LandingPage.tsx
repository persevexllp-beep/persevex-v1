"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useEffect } from "react";
import * as THREE from "three";

import StarField from "./StarField";
import DustPlane from "./DustPlane";
import Hero from "./Hero";
import CoursesSection from "./CoursesSection";

function AnimationController({ 
  scrollProgressRef, 
  textContainerRef, 
  contentContainerRef
}: any) {
  const animatedScroll = useRef(0);

  useFrame(() => {
    animatedScroll.current = THREE.MathUtils.lerp(
      animatedScroll.current,
      scrollProgressRef.current,
      0.1
    );
    const currentProgress = animatedScroll.current;

    // Watermark animation logic (Unchanged)
    if (textContainerRef.current) {
      const pageHeight = 1 / 3;
      const persevexFadeStart = pageHeight;
      const coursesFadeStart = pageHeight * 2;
      
      const persevexProgress = Math.max(0, (currentProgress - persevexFadeStart) / pageHeight);
      const coursesProgress = Math.max(0, (currentProgress - coursesFadeStart) / pageHeight);
      
      const persevexOpacity = (1 - persevexProgress) * 0.4;
      const coursesOpacity = coursesProgress * 0.4;

      const moveDistance = 150; 
      const persevexTranslateY = persevexProgress * -moveDistance;
      const coursesTranslateY = (1 - coursesProgress) * moveDistance;

      textContainerRef.current.style.setProperty('--persevex-opacity', `${persevexOpacity}`);
      textContainerRef.current.style.setProperty('--courses-opacity', `${coursesOpacity}`);
      textContainerRef.current.style.setProperty('--persevex-translate-y', `${persevexTranslateY}px`);
      textContainerRef.current.style.setProperty('--courses-translate-y', `${coursesTranslateY}px`);
    }

    // --- Content animation logic ---
    if (contentContainerRef.current) {
        const animationEnd = 2 / 3;
        const contentProgress = Math.min(1, currentProgress / animationEnd);

        // --- THE KEY CHANGE: Animate over a larger, viewport-relative distance ---
        const moveDistance = 50; // This means 50% of the viewport height (vh)

        // Opacity is unchanged
        const heroOpacity = 1 - contentProgress;
        const coursesOpacity = contentProgress;
        
        // Hero moves up 50vh from center (disappears off the top)
        const heroTranslateY = contentProgress * -moveDistance; 

        // Courses moves from 50vh below center to the center
        const coursesTranslateY = (1 - contentProgress) * moveDistance;

        contentContainerRef.current.style.setProperty('--hero-opacity', `${heroOpacity}`);
        contentContainerRef.current.style.setProperty('--courses-opacity', `${coursesOpacity}`);
        // Apply the new values with the 'vh' unit
        contentContainerRef.current.style.setProperty('--hero-translate-y', `${heroTranslateY}vh`);
        contentContainerRef.current.style.setProperty('--courses-translate-y', `${coursesTranslateY}vh`);
    }
  });

  return (
    <>
      <color attach="background" args={['black']} />
      <StarField hover={false} />
      <DustPlane renderOrder={-2} /> 
    </>
  );
}


export default function LandingPage() {
  const scrollProgressRef = useRef(0);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const contentContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const totalScrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      scrollProgressRef.current = totalScrollableHeight > 0 ? currentScroll / totalScrollableHeight : 0;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main>
      {/* Background and Watermark sections are unchanged */}
      <div className="fixed top-0 left-0 w-full h-full z-0">
        <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
          <Suspense fallback={null}>
            <AnimationController 
              scrollProgressRef={scrollProgressRef} 
              textContainerRef={textContainerRef} 
              contentContainerRef={contentContainerRef}
            />
          </Suspense>
        </Canvas>
      </div>
      <div
        ref={textContainerRef}
        className="fixed top-0 left-0 w-full h-full z-10 pointer-events-none overflow-hidden"
        style={{ 
          '--persevex-opacity': 0.4, 
          '--courses-opacity': 0,
          '--persevex-translate-y': '0px',
          '--courses-translate-y': '150px'
        } as any}
      >
        <h2
          className="absolute bottom-0 left-1/2 z-[2] text-[24vw] md:text-[20vw] lg:text-[18rem] font-black uppercase text-transparent select-none leading-none"
          style={{ 
            opacity: 'var(--persevex-opacity)', 
            WebkitTextStroke: "1px white",
            transform: 'translateX(-50%) translateY(calc(4rem + var(--persevex-translate-y)))'
          }}
        >Persevex</h2>
        <h2
          className="absolute bottom-0 left-1/2 z-[1] text-[24vw] md:text-[20vw] lg:text-[18rem] font-black uppercase text-transparent select-none leading-none"
          style={{ 
            opacity: 'var(--courses-opacity)', 
            WebkitTextStroke: "1px white",
            transform: 'translateX(-50%) translateY(calc(4rem + var(--courses-translate-y)))'
          }}
        >Courses</h2>
      </div>

      {/* --- CHANGE: Update initial style for the content container --- */}
      <div
        ref={contentContainerRef}
        className="fixed inset-0 z-20 flex justify-center items-center pointer-events-none"
        style={{
            '--hero-opacity': 1,
            '--hero-translate-y': '0vh',
            '--courses-opacity': 0,
            '--courses-translate-y': '50vh' // Start 50vh from the bottom
        } as any}
      >
        <div 
            className="w-full  mr-75 absolute"
            style={{ opacity: 'var(--hero-opacity)', transform: 'translateY(var(--hero-translate-y))' }}
        >
          <Hero />
        </div>
        <div 
            className="w-full  mr-75 absolute"
            style={{ opacity: 'var(--courses-opacity)', transform: 'translateY(var(--courses-translate-y))' }}
        >
          <CoursesSection />
        </div>
      </div>

      {/* Scrollable area (Unchanged) */}
      <div className="relative z-30">
        <div className="h-screen" />
        <div className="h-screen" />
        <div className="h-screen" />
      </div>
    </main>
  );
}