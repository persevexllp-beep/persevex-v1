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

// AnimationController remains unchanged as it's already performant (uses R3F's loop)
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
  const heroWrapperRef = useRef<HTMLDivElement>(null); // Ref for direct Hero manipulation
  const coursesSectionWrapperRef = useRef<HTMLDivElement>(null);
  const ourEdgeSectionWrapperRef = useRef<HTMLDivElement>(null);
  
  const [edgeProgress, setEdgeProgress] = useState(0);
  
  // State to hold the pre-calculated layout positions
  const [layout, setLayout] = useState({ coursesTop: 0, edgeTop: 0 });

  // Effect to calculate layout ONCE, not on every scroll
  useEffect(() => {
    const calculateLayout = () => {
      if (coursesSectionWrapperRef.current && ourEdgeSectionWrapperRef.current) {
        setLayout({
          coursesTop: coursesSectionWrapperRef.current.offsetTop,
          edgeTop: ourEdgeSectionWrapperRef.current.offsetTop,
        });
      }
    };

    calculateLayout();
    window.addEventListener('resize', calculateLayout);
    return () => window.removeEventListener('resize', calculateLayout);
  }, []); // Empty dependency array means this runs only on mount

  // Effect for the scroll listener, now much more performant
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const viewportHeight = window.innerHeight;

      // 1. Hero Animation (now using a ref to avoid re-renders)
      const heroAnimationProgress = Math.min(1, currentScroll / (viewportHeight * 0.8));
      if (heroWrapperRef.current) {
        heroWrapperRef.current.style.opacity = `${1 - heroAnimationProgress}`;
        heroWrapperRef.current.style.transform = `translateY(${heroAnimationProgress * -250}px)`;
      }

      // Check if layout has been calculated
      if (layout.coursesTop === 0) return;

      const { coursesTop, edgeTop } = layout;

      // 2. Background/Watermark Animation
      const backgroundAnimDuration = viewportHeight;
      const coursesAnimStart = coursesTop - viewportHeight;
      const edgeAnimStartForBackground = edgeTop - viewportHeight;

      let newWatermarkProgress = 0;
      if (currentScroll >= edgeAnimStartForBackground) {
        const progress = (currentScroll - edgeAnimStartForBackground) / backgroundAnimDuration;
        newWatermarkProgress = 1 + Math.min(1, progress);
      } else if (currentScroll >= coursesAnimStart) {
        const progress = (currentScroll - coursesAnimStart) / backgroundAnimDuration;
        newWatermarkProgress = Math.min(1, progress);
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
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, [layout]); // Re-run this effect only when layout changes

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
          ref={heroWrapperRef} // Attach ref here
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

        <div style={{ height: '50vh' }} />
      </div>
    </main>
  );
}