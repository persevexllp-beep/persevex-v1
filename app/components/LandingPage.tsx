"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useEffect, useState } from "react";
import * as THREE from "three";

import StarField from "./StarField";
import DustPlane from "./DustPlane";
import Hero from "./Hero";
import CoursesSection from "./CoursesSection";

// --- FIX: Restored the sequential fade logic for the watermarks ---
function AnimationController({ watermarkProgressRef, textContainerRef }: any) {
  const animatedProgress = useRef(0);

  useFrame(() => {
    animatedProgress.current = THREE.MathUtils.lerp(
      animatedProgress.current,
      watermarkProgressRef.current,
      0.1
    );
    const currentProgress = animatedProgress.current;

    if (textContainerRef.current) {
      let persevexOpacity = 0;
      let coursesOpacity = 0;

      // This logic splits the 0-1 progress into two halves.
      // First half (0 to 0.5): Persevex fades out.
      // Second half (0.5 to 1): Courses fades in.
      if (currentProgress < 0.5) {
        // Map the scroll from [0, 0.5] to an opacity from [0.4, 0]
        persevexOpacity = (1 - (currentProgress / 0.5)) * 0.4;
        coursesOpacity = 0;
      } else {
        persevexOpacity = 0;
        // Map the scroll from [0.5, 1] to an opacity from [0, 0.4]
        coursesOpacity = ((currentProgress - 0.5) / 0.5) * 0.4;
      }

      textContainerRef.current.style.setProperty('--persevex-opacity', `${persevexOpacity}`);
      textContainerRef.current.style.setProperty('--courses-opacity', `${coursesOpacity}`);
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
  const watermarkProgressRef = useRef(0);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const [heroOpacity, setHeroOpacity] = useState(1);
  const [heroTranslateY, setHeroTranslateY] = useState(0);
  
  const coursesSectionWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const viewportHeight = window.innerHeight;

      const heroAnimationProgress = Math.min(1, currentScroll / (viewportHeight * 0.8));
      setHeroOpacity(1 - heroAnimationProgress);
      setHeroTranslateY(heroAnimationProgress * -250);

      if (coursesSectionWrapperRef.current) {
        const coursesTop = coursesSectionWrapperRef.current.offsetTop;
        
        const transitionStart = viewportHeight;
        const transitionEnd = coursesTop;
        const transitionDuration = transitionEnd - transitionStart;
        
        let newWatermarkProgress = 0;
        if (transitionDuration > 0) {
            if (currentScroll <= transitionStart) {
                newWatermarkProgress = 0;
            } else if (currentScroll >= transitionEnd) {
                newWatermarkProgress = 1;
            } else {
                newWatermarkProgress = (currentScroll - transitionStart) / transitionDuration;
            }
        }
        watermarkProgressRef.current = newWatermarkProgress;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main>
      <div className="fixed top-0 left-0 w-full h-full z-0">
        <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
          <Suspense fallback={null}>
            <AnimationController 
              watermarkProgressRef={watermarkProgressRef} 
              textContainerRef={textContainerRef} 
            />
          </Suspense>
        </Canvas>
      </div>

      <div
        ref={textContainerRef}
        className="fixed top-0 left-0 w-full h-full z-10 pointer-events-none overflow-hidden"
        style={{ '--persevex-opacity': 0.4, '--courses-opacity': 0 } as any}
      >
        <h2
          className="absolute bottom-0 left-1/2 z-[2] text-[24vw] md:text-[20vw] lg:text-[18rem] font-black uppercase text-transparent select-none leading-none"
          style={{ opacity: 'var(--persevex-opacity)', WebkitTextStroke: "1px white", transform: 'translateX(-50%) translateY(4rem)' }}
        >Persevex</h2>
        <h2
          className="absolute bottom-0 left-1/2 z-[1] text-[24vw] md:text-[20vw] lg:text-[18rem] font-black uppercase text-transparent select-none leading-none"
          style={{ opacity: 'var(--courses-opacity)', WebkitTextStroke: "1px white", transform: 'translateX(-50%) translateY(4rem)' }}
        >Courses</h2>
      </div>
      
      <div className="relative z-20">
        <div 
          className="sticky top-0 flex items-center justify-center h-screen pointer-events-none"
          style={{ 
            opacity: heroOpacity, 
            transform: `translateY(${heroTranslateY}px)` 
          }}
        >
          <div className="w-full mr-74 pointer-events-auto">
            <Hero />
          </div>
        </div>
        
        <div style={{ height: '100vh' }} />

        <div ref={coursesSectionWrapperRef}>
          <CoursesSection />
        </div>
      </div>
    </main>
  );
}