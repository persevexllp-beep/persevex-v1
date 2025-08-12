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

    // --- CHANGE 1: Watermark animation logic is now ONLY for opacity ---
    if (textContainerRef.current) {
      const pageHeight = 1 / 3;
      const persevexFadeStart = pageHeight;
      const coursesFadeStart = pageHeight * 2;
      
      const persevexProgress = Math.max(0, (currentProgress - persevexFadeStart) / pageHeight);
      const coursesProgress = Math.max(0, (currentProgress - coursesFadeStart) / pageHeight);
      
      const persevexOpacity = (1 - persevexProgress) * 0.4;
      const coursesOpacity = coursesProgress * 0.4;

      // --- DELETED: The code that calculated watermark movement is gone ---
      // const moveDistance = 150; 
      // const persevexTranslateY = ...
      // const coursesTranslateY = ...

      textContainerRef.current.style.setProperty('--persevex-opacity', `${persevexOpacity}`);
      textContainerRef.current.style.setProperty('--courses-opacity', `${coursesOpacity}`);
      
      // --- DELETED: The code that applied the watermark movement is gone ---
      // textContainerRef.current.style.setProperty('--persevex-translate-y', ...);
      // textContainerRef.current.style.setProperty('--courses-translate-y', ...);
    }

    // Content animation logic (Unchanged and Correct)
    if (contentContainerRef.current) {
        const animationEnd = 2 / 3;
        const contentProgress = Math.min(1, currentProgress / animationEnd);
        const moveDistance = 50; 
        const heroOpacity = 1 - contentProgress;
        const coursesOpacity = contentProgress;
        const heroTranslateY = contentProgress * -moveDistance; 
        const coursesTranslateY = (1 - contentProgress) * moveDistance;

        contentContainerRef.current.style.setProperty('--hero-opacity', `${heroOpacity}`);
        contentContainerRef.current.style.setProperty('--courses-opacity', `${coursesOpacity}`);
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
      {/* Background Section (Unchanged) */}
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

      {/* --- CHANGE 2: Simplified Watermark Container --- */}
      <div
        ref={textContainerRef}
        className="fixed top-0 left-0 w-full h-full z-10 pointer-events-none overflow-hidden"
        style={{ 
          // Only opacity variables are needed now
          '--persevex-opacity': 0.4, 
          '--courses-opacity': 0
        } as any}
      >
        <h2
          className="absolute bottom-0 left-1/2 z-[2] text-[24vw] md:text-[20vw] lg:text-[18rem] font-black uppercase text-transparent select-none leading-none"
          style={{ 
            opacity: 'var(--persevex-opacity)', 
            WebkitTextStroke: "1px white",
            // The transform is now STATIC. No more calc() or CSS variable for movement.
            transform: 'translateX(-50%) translateY(4rem)'
          }}
        >Persevex</h2>
        <h2
          className="absolute bottom-0 left-1/2 z-[1] text-[24vw] md:text-[20vw] lg:text-[18rem] font-black uppercase text-transparent select-none leading-none"
          style={{ 
            opacity: 'var(--courses-opacity)', 
            WebkitTextStroke: "1px white",
            // This also has a static transform.
            transform: 'translateX(-50%) translateY(4rem)'
          }}
        >Courses</h2>
      </div>

      {/* Content Container (Unchanged and Correct) */}
      <div
        ref={contentContainerRef}
        className="fixed inset-0 z-20 flex justify-center items-center pointer-events-none"
        style={{
            '--hero-opacity': 1,
            '--hero-translate-y': '0vh',
            '--courses-opacity': 0,
            '--courses-translate-y': '50vh'
        } as any}
      >
        <div 
            className="w-full mr-74 absolute"
            style={{ opacity: 'var(--hero-opacity)', transform: 'translateY(var(--hero-translate-y))' }}
        >
          <Hero />
        </div>
        <div 
            className="w-full mr-74 absolute"
            style={{ opacity: 'var(--courses-opacity)', transform: 'translateY(var(--courses-translate-y))' }}
        >
          <CoursesSection />
        </div>
      </div>

      {/* Scrollable Area (Unchanged) */}
      <div className="relative z-30">
        <div className="h-screen" />
        <div className="h-screen" />
        <div className="h-screen" />
      </div>
    </main>
  );
}