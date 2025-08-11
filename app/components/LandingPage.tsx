"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useEffect } from "react";
import * as THREE from "three";

import StarField from "./StarField";
import DustPlane from "./DustPlane";
import Hero from "./Hero";
import CoursesSection from "./CoursesSection";

function AnimationController({ scrollProgressRef, textContainerRef }: any) {
  const dustPlaneRef = useRef<THREE.Mesh<THREE.BufferGeometry, THREE.ShaderMaterial>>(null);
  const animatedScroll = useRef(0);

  useFrame(() => {
    animatedScroll.current = THREE.MathUtils.lerp(
      animatedScroll.current,
      scrollProgressRef.current,
      0.1
    );
    const currentProgress = animatedScroll.current;

    if (dustPlaneRef.current && dustPlaneRef.current.material.uniforms.uScrollProgress) {
      dustPlaneRef.current.material.uniforms.uScrollProgress.value = currentProgress;
    }

    if (textContainerRef.current) {
      const pageHeight = 1 / 3;
      const persevexFadeStart = pageHeight;
      const coursesFadeStart = pageHeight * 2;
      
      const persevexProgress = Math.max(0, (currentProgress - persevexFadeStart) / pageHeight);
      const coursesProgress = Math.max(0, (currentProgress - coursesFadeStart) / pageHeight);
      
      const persevexOpacity = (1 - persevexProgress) * 0.4;
      const coursesOpacity = coursesProgress * 0.4;

      textContainerRef.current.style.setProperty('--persevex-opacity', `${persevexOpacity}`);
      textContainerRef.current.style.setProperty('--courses-opacity', `${coursesOpacity}`);
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
  const scrollProgressRef = useRef(0);
  const textContainerRef = useRef<HTMLDivElement>(null);

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
      <div className="fixed top-0 left-0 w-full h-full z-0">
        <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
          <Suspense fallback={null}>
            <AnimationController 
              scrollProgressRef={scrollProgressRef} 
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
          className="absolute bottom-0 left-1/2 z-[2] text-[24vw] md:text-[20vw] lg:text-[18rem] font-black uppercase text-transparent select-none leading-none transform -translate-x-1/2 translate-y-[4rem]"
          style={{ opacity: 'var(--persevex-opacity)', WebkitTextStroke: "1px white" }}
        >
          Persevex
        </h2>
        <h2
          className="absolute bottom-0 left-1/2 z-[1] text-[24vw] md:text-[20vw] lg:text-[18rem] font-black uppercase text-transparent select-none leading-none transform -translate-x-1/2 translate-y-[4rem]"
          style={{ opacity: 'var(--courses-opacity)', WebkitTextStroke: "1px white" }}
        >
          Courses
        </h2>
      </div>

      <div className="relative z-20">
        <div className="h-screen flex justify-center items-center">
          <Hero />
        </div>
        <div className="h-screen" />
        <div className="h-screen flex justify-center items-center">
          <CoursesSection />
        </div>
      </div>
    </main>
  );
}