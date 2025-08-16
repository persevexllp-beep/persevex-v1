"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useEffect, useState } from "react";
import * as THREE from "three";

import StarField from "./StarField";
import DustPlane from "./DustPlane";
import Hero from "./Hero";
import CoursesSection from "./CoursesSection";
import OurEdgeSection from "./OurEdgeSection";

const NUM_CARDS = 6;

function AnimationController({ watermarkProgressRef, textContainerRef }: any) {
  const animatedProgress = useRef(0);
  const dustPlaneRef = useRef<THREE.Mesh>(null!);

  useFrame(() => {
    animatedProgress.current = THREE.MathUtils.lerp(
      animatedProgress.current,
      watermarkProgressRef.current,
      0.05
    );
    const currentProgress = animatedProgress.current;

    if (dustPlaneRef.current) {
      let dustOpacity = 1.0;
      if (currentProgress > 1.0) {
        dustOpacity = Math.max(0, 1.0 - (currentProgress - 1.0));
      }
      const material = dustPlaneRef.current.material as THREE.ShaderMaterial;
      if (material.uniforms.uOpacity) {
        material.uniforms.uOpacity.value = dustOpacity;
      }
    }

    if (textContainerRef.current) {
      let persevexOpacity = 0;
      let coursesOpacity = 0;
      let ourEdgeOpacity = 0;

      if (currentProgress < 1.0) {
        persevexOpacity = (1 - currentProgress) * 0.4;
        coursesOpacity = currentProgress * 0.4;
      } else {
        const phase2Progress = currentProgress - 1.0;
        coursesOpacity = (1 - phase2Progress) * 0.4;
        ourEdgeOpacity = phase2Progress * 0.4;
      }
      
      persevexOpacity = THREE.MathUtils.clamp(persevexOpacity, 0, 0.4);
      coursesOpacity = THREE.MathUtils.clamp(coursesOpacity, 0, 0.4);
      ourEdgeOpacity = THREE.MathUtils.clamp(ourEdgeOpacity, 0, 0.4);

      textContainerRef.current.style.setProperty('--persevex-opacity', `${persevexOpacity}`);
      textContainerRef.current.style.setProperty('--courses-opacity', `${coursesOpacity}`);
      textContainerRef.current.style.setProperty('--our-edge-opacity', `${ourEdgeOpacity}`);
    }
  });

  return (
    <>
      <color attach="background" args={['black']} />
      <StarField hover={false} />
      <DustPlane ref={dustPlaneRef} renderOrder={-2} /> 
    </>
  );
}


export default function LandingPage() {
  const watermarkProgressRef = useRef(0);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const [heroOpacity, setHeroOpacity] = useState(1);
  const [heroTranslateY, setHeroTranslateY] = useState(0);
  const [edgeProgress, setEdgeProgress] = useState(0);

  const coursesSectionWrapperRef = useRef<HTMLDivElement>(null);
  const ourEdgeSectionWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const viewportHeight = window.innerHeight;

      const heroAnimationProgress = Math.min(1, currentScroll / (viewportHeight * 0.8));
      setHeroOpacity(1 - heroAnimationProgress);
      setHeroTranslateY(heroAnimationProgress * -250);

      if (coursesSectionWrapperRef.current && ourEdgeSectionWrapperRef.current) {
        const coursesTop = coursesSectionWrapperRef.current.offsetTop;
        const edgeTop = ourEdgeSectionWrapperRef.current.offsetTop;
        const t1_start = coursesTop - viewportHeight;
        const t1_duration = coursesTop - t1_start;
        const t2_start = edgeTop - viewportHeight;
        const t2_duration = edgeTop - t2_start;

        let newWatermarkProgress = 0;
        if (currentScroll > t2_start && t2_duration > 0) {
            newWatermarkProgress = 1 + Math.min(1, (currentScroll - t2_start) / t2_duration);
        } else if (currentScroll > t1_start && t1_duration > 0) {
            newWatermarkProgress = Math.min(1, (currentScroll - t1_start) / t1_duration);
        }
        watermarkProgressRef.current = newWatermarkProgress;
        
        const edgeAnimStart = edgeTop;
        const scrollDurationInVH = NUM_CARDS;
        const edgeAnimDuration = viewportHeight * scrollDurationInVH;
        
        const scrollInZone = currentScroll - edgeAnimStart;
        
        let newEdgeProgress = 0;
        if (scrollInZone > 0) {
            newEdgeProgress = Math.min(1, scrollInZone / edgeAnimDuration);
        }
        
        setEdgeProgress(newEdgeProgress);
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
        style={{ '--persevex-opacity': 0.4, '--courses-opacity': 0, '--our-edge-opacity': 0 } as any}
      >
        <h2
          className="absolute bottom-0 left-1/2 z-[2] text-[24vw] md:text-[20vw] lg:text-[18rem] font-black uppercase text-transparent select-none leading-none"
          style={{ opacity: 'var(--persevex-opacity)', WebkitTextStroke: "1px white", transform: 'translateX(-50%) translateY(4rem)' }}
        >Persevex</h2>
        <h2
          className="absolute bottom-0 left-1/2 z-[1] text-[24vw] md:text-[20vw] lg:text-[18rem] font-black uppercase text-transparent select-none leading-none"
          style={{ opacity: 'var(--courses-opacity)', WebkitTextStroke: "1px white", transform: 'translateX(-50%) translateY(4rem)' }}
        >Courses</h2>
        <h2
          className="absolute bottom-0 left-1/2 z-[0] text-[24vw] md:text-[20vw] lg:text-[18rem] font-black uppercase text-transparent select-none leading-none"
          style={{ 
            opacity: 'var(--our-edge-opacity)', 
            WebkitTextStroke: "1px white", 
            transform: 'translateX(-50%) translateY(4rem)',
            whiteSpace: 'nowrap'
          }}
        >Our Edge</h2>
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
        
        <div style={{ height: '10vh' }} />

        <div ref={coursesSectionWrapperRef}>
          <CoursesSection />
        </div>
        
        <div style={{ height: '50vh' }} />
        
        <div ref={ourEdgeSectionWrapperRef} style={{ height: `${(NUM_CARDS + 1) * 100}vh` }}>
          <OurEdgeSection progress={edgeProgress} />
        </div>

        <div style={{ height: '50vh' }} />
      </div>
    </main>
  );
}