"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useEffect, useState } from "react";
import * as THREE from "three";

import StarField from "./StarField";
import DustPlane from "./DustPlane";
import Hero from "./Hero";
import CoursesSection from "./CoursesSection";
import OurEdgeSection from "./OurEdgeSection";
import PartnersSection from "./PartnersSection"; // 1. Import the new component

const NUM_CARDS = 6;

// AnimationController is updated to handle the new "Partners" watermark
function AnimationController({ watermarkProgressRef, textContainerRef }: any) {
  const animatedProgress = useRef(0);
  const dustPlaneRef = useRef<THREE.Mesh>(null!);

  useFrame(() => {
    // Lerp for smooth animation
    animatedProgress.current = THREE.MathUtils.lerp(
      animatedProgress.current,
      watermarkProgressRef.current,
      0.05
    );
    const currentProgress = animatedProgress.current;

    // Dust plane opacity (fades out after Hero)
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

    // Watermark opacity logic
    if (textContainerRef.current) {
      let persevexOpacity = 0;
      let coursesOpacity = 0;
      let ourEdgeOpacity = 0;
      let partnersOpacity = 0; // New variable for partners watermark

      if (currentProgress < 1.0) {
        // Phase 1: Hero -> Courses
        persevexOpacity = (1 - currentProgress) * 0.4;
        coursesOpacity = currentProgress * 0.4;
      } else if (currentProgress < 2.0) {
        // Phase 2: Courses -> Our Edge
        const phase2Progress = currentProgress - 1.0;
        coursesOpacity = (1 - phase2Progress) * 0.4;
        ourEdgeOpacity = phase2Progress * 0.4;
      } else {
        // Phase 3: Our Edge -> Partners
        const phase3Progress = currentProgress - 2.0;
        ourEdgeOpacity = (1 - phase3Progress) * 0.4;
        partnersOpacity = phase3Progress * 0.4;
      }
      
      // Clamp values to avoid going out of 0-0.4 range
      persevexOpacity = THREE.MathUtils.clamp(persevexOpacity, 0, 0.4);
      coursesOpacity = THREE.MathUtils.clamp(coursesOpacity, 0, 0.4);
      ourEdgeOpacity = THREE.MathUtils.clamp(ourEdgeOpacity, 0, 0.4);
      partnersOpacity = THREE.MathUtils.clamp(partnersOpacity, 0, 0.4);

      // Set CSS variables for opacity
      textContainerRef.current.style.setProperty('--persevex-opacity', `${persevexOpacity}`);
      textContainerRef.current.style.setProperty('--courses-opacity', `${coursesOpacity}`);
      textContainerRef.current.style.setProperty('--our-edge-opacity', `${ourEdgeOpacity}`);
      textContainerRef.current.style.setProperty('--partners-opacity', `${partnersOpacity}`);
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
  const heroWrapperRef = useRef<HTMLDivElement>(null);
  const coursesSectionWrapperRef = useRef<HTMLDivElement>(null);
  const ourEdgeSectionWrapperRef = useRef<HTMLDivElement>(null);
  const partnersSectionWrapperRef = useRef<HTMLDivElement>(null); // 2. Ref for Partners section
  
  const [edgeProgress, setEdgeProgress] = useState(0);
  const [partnersProgress, setPartnersProgress] = useState(0); // 3. State for Partners animation
  
  // State to hold pre-calculated layout positions, now including partners
  const [layout, setLayout] = useState({ coursesTop: 0, edgeTop: 0, partnersTop: 0 });

  // Effect to calculate layout ONCE, not on every scroll
  useEffect(() => {
    const calculateLayout = () => {
      if (coursesSectionWrapperRef.current && ourEdgeSectionWrapperRef.current && partnersSectionWrapperRef.current) {
        setLayout({
          coursesTop: coursesSectionWrapperRef.current.offsetTop,
          edgeTop: ourEdgeSectionWrapperRef.current.offsetTop,
          partnersTop: partnersSectionWrapperRef.current.offsetTop, // Calculate partners top
        });
      }
    };

    calculateLayout();
    window.addEventListener('resize', calculateLayout);
    return () => window.removeEventListener('resize', calculateLayout);
  }, []);

  // Effect for the scroll listener, now more performant
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const viewportHeight = window.innerHeight;

      // 1. Hero Animation
      const heroAnimationProgress = Math.min(1, currentScroll / (viewportHeight * 0.8));
      if (heroWrapperRef.current) {
        heroWrapperRef.current.style.opacity = `${1 - heroAnimationProgress}`;
        heroWrapperRef.current.style.transform = `translateY(${heroAnimationProgress * -250}px)`;
      }

      if (layout.coursesTop === 0) return;

      const { coursesTop, edgeTop, partnersTop } = layout;

      // 2. Background/Watermark Animation (now includes partners section)
      const backgroundAnimDuration = viewportHeight;
      const coursesAnimStart = coursesTop - viewportHeight;
      const edgeAnimStartForBackground = edgeTop - viewportHeight;
      const partnersAnimStartForBackground = partnersTop - viewportHeight;

      let newWatermarkProgress = 0;
      if (currentScroll >= partnersAnimStartForBackground) {
        const progress = (currentScroll - partnersAnimStartForBackground) / backgroundAnimDuration;
        newWatermarkProgress = 2 + Math.min(1, progress); // Progress into phase 3
      } else if (currentScroll >= edgeAnimStartForBackground) {
        const progress = (currentScroll - edgeAnimStartForBackground) / backgroundAnimDuration;
        newWatermarkProgress = 1 + Math.min(1, progress); // Progress into phase 2
      } else if (currentScroll >= coursesAnimStart) {
        const progress = (currentScroll - coursesAnimStart) / backgroundAnimDuration;
        newWatermarkProgress = Math.min(1, progress); // Progress into phase 1
      }
      watermarkProgressRef.current = newWatermarkProgress;
      
      // 3. OurEdgeSection Card Animation
      const edgeCardAnimStart = edgeTop;
      const cardAnimScrollDistance = viewportHeight * NUM_CARDS;
      const scrollInCardZone = currentScroll - edgeCardAnimStart;
      
      let newEdgeProgress = 0;
      if (scrollInCardZone > 0) {
          newEdgeProgress = Math.min(1, scrollInCardZone / cardAnimScrollDistance);
      }
      setEdgeProgress(newEdgeProgress);

      // 4. PartnersSection Animation
      const partnersAnimStart = partnersTop;
      const partnersAnimDuration = viewportHeight; // Animate over 1 screen height
      const scrollInPartnersZone = currentScroll - partnersAnimStart;

      let newPartnersProgress = 0;
      if (scrollInPartnersZone > 0) {
          newPartnersProgress = Math.min(1, scrollInPartnersZone / partnersAnimDuration);
      }
      setPartnersProgress(newPartnersProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [layout]);

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
      style={{ 
        '--persevex-opacity': 0.4, 
        '--courses-opacity': 0, 
        '--our-edge-opacity': 0,
        '--partners-opacity': 0 // Add new CSS variable for partners
      } as any}
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
      {/* 4. Add the "Partners" watermark text */}
      <h2
        className="absolute bottom-0 left-1/2 z-[-1] text-[24vw] md:text-[20vw] lg:text-[18rem] font-black uppercase text-transparent select-none leading-none"
        style={{ 
          opacity: 'var(--partners-opacity)', 
          WebkitTextStroke: "1px white", 
          transform: 'translateX(-50%) translateY(4rem)',
        }}
      >Partners</h2>
    </div>
      
      <div className="relative z-20">
        <div 
          ref={heroWrapperRef}
          className="sticky top-0 flex items-center justify-center h-screen pointer-events-none"
        >
          <div className="w-full mr-74 mb-36 pointer-events-auto">
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

        {/* 5. Add the PartnersSection with a wrapper to control scroll height - overlapping with OurEdgeSection */}
        <div ref={partnersSectionWrapperRef} style={{ height: '200vh', marginTop: '-50vh' }}>
          <PartnersSection progress={partnersProgress} />
        </div>

        <div style={{ height: '50vh' }} />
      </div>
    </main>
  );
}