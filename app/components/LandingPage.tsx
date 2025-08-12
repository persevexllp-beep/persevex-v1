"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useEffect } from "react";
import * as THREE from "three";

import StarField from "./StarField";
import DustPlane from "./DustPlane";
import Hero from "./Hero";
import CoursesSection from "./CoursesSection";

// --- MODIFIED AnimationController ---
function AnimationController({ 
  scrollProgressRef, 
  textContainerRef, 
  contentContainerRef // Add ref for the main content
}: any) {
  const animatedScroll = useRef(0);

  useFrame(() => {
    // Smooth the scroll value
    animatedScroll.current = THREE.MathUtils.lerp(
      animatedScroll.current,
      scrollProgressRef.current,
      0.1
    );
    const currentProgress = animatedScroll.current;

    // --- CHANGE: The gradient is now STATIC. This line is removed. ---
    // if (dustPlaneRef.current && dustPlaneRef.current.material.uniforms.uScrollProgress) {
    //   dustPlaneRef.current.material.uniforms.uScrollProgress.value = currentProgress;
    // }

    // --- Watermark animation logic (UNCHANGED and CORRECT) ---
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

    // --- NEW: Animate the Hero and Courses Section content ---
    if (contentContainerRef.current) {
        // The animation happens over the first two screens (progress 0 to 0.66)
        const animationEnd = 2 / 3;
        const contentProgress = Math.min(1, currentProgress / animationEnd);

        const heroOpacity = 1 - contentProgress;
        const heroTranslateY = contentProgress * -100; // Move up 100px

        const coursesOpacity = contentProgress;
        const coursesTranslateY = (1 - contentProgress) * 100; // Move in from below

        contentContainerRef.current.style.setProperty('--hero-opacity', `${heroOpacity}`);
        contentContainerRef.current.style.setProperty('--hero-translate-y', `${heroTranslateY}px`);
        contentContainerRef.current.style.setProperty('--courses-opacity', `${coursesOpacity}`);
        contentContainerRef.current.style.setProperty('--courses-translate-y', `${coursesTranslateY}px`);
    }
  });

  return (
    <>
      <color attach="background" args={['black']} />
      <StarField hover={false} />
      {/* The DustPlane ref is no longer needed here as it's static */}
      <DustPlane renderOrder={-2} /> 
    </>
  );
}


export default function LandingPage() {
  const scrollProgressRef = useRef(0);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const contentContainerRef = useRef<HTMLDivElement>(null); // Ref for the new content container

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
      {/* 1. Fixed 3D Background (Unchanged) */}
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

      {/* 2. Fixed Watermark Text Container (Unchanged and Correct) */}
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

      {/* 3. NEW: Fixed container for animated content */}
      <div
        ref={contentContainerRef}
        className="fixed inset-0 z-20 flex justify-center items-center pointer-events-none"
        style={{
            '--hero-opacity': 1,
            '--hero-translate-y': '0px',
            '--courses-opacity': 0,
            '--courses-translate-y': '100px'
        } as any}
      >
        {/* The components will be positioned absolutely to overlap */}
        <div 
            className="w-full absolute"
            style={{ opacity: 'var(--hero-opacity)', transform: 'translateY(var(--hero-translate-y))' }}
        >
          <Hero />
        </div>
        <div 
            className="w-full absolute"
            style={{ opacity: 'var(--courses-opacity)', transform: 'translateY(var(--courses-translate-y))' }}
        >
          <CoursesSection />
        </div>
      </div>

      {/* 4. Scrollable area with EMPTY divs to create height */}
      <div className="relative z-30">
        <div className="h-screen" />
        <div className="h-screen" />
        <div className="h-screen" />
      </div>
    </main>
  );
}