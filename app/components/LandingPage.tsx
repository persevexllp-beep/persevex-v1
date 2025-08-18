// LandingPage.tsx
"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useEffect, useState } from "react";
import * as THREE from "three";

// --- SECTION IMPORTS ---
import StarField from "./StarField";
import DustPlane from "./DustPlane";
import Hero from "./Hero";
import CoursesSection from "./CoursesSection";
import OurEdgeSection from "./OurEdgeSection";
import PartnersSection from "./PartnersSection";
import { AnimatedTestimonials } from "./Testimonials";
import { testimonialsData } from "../constants/TestimonialsData";

const NUM_CARDS = 6;

// AnimationController now handles the "Trust" watermark
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

    // Watermark opacity logic is extended for the new "Trust" section
    if (textContainerRef.current) {
      let persevexOpacity = 0;
      let coursesOpacity = 0;
      let ourEdgeOpacity = 0;
      let partnersOpacity = 0;
      let trustOpacity = 0; // New variable for the Trust watermark

      if (currentProgress < 1.0) { // Phase 1: Hero -> Courses
        persevexOpacity = (1 - currentProgress) * 0.4;
        coursesOpacity = currentProgress * 0.4;
      } else if (currentProgress < 2.0) { // Phase 2: Courses -> Our Edge
        const phase2Progress = currentProgress - 1.0;
        coursesOpacity = (1 - phase2Progress) * 0.4;
        ourEdgeOpacity = phase2Progress * 0.4;
      } else if (currentProgress < 3.0) { // Phase 3: Our Edge -> Partners
        const phase3Progress = currentProgress - 2.0;
        ourEdgeOpacity = (1 - phase3Progress) * 0.4;
        partnersOpacity = phase3Progress * 0.4;
      } else { // Phase 4: Partners -> Trust
        const phase4Progress = currentProgress - 3.0;
        partnersOpacity = (1 - phase4Progress) * 0.4;
        trustOpacity = phase4Progress * 0.4;
      }
      
      persevexOpacity = THREE.MathUtils.clamp(persevexOpacity, 0, 0.4);
      coursesOpacity = THREE.MathUtils.clamp(coursesOpacity, 0, 0.4);
      ourEdgeOpacity = THREE.MathUtils.clamp(ourEdgeOpacity, 0, 0.4);
      partnersOpacity = THREE.MathUtils.clamp(partnersOpacity, 0, 0.4);
      trustOpacity = THREE.MathUtils.clamp(trustOpacity, 0, 0.4);

      textContainerRef.current.style.setProperty('--persevex-opacity', `${persevexOpacity}`);
      textContainerRef.current.style.setProperty('--courses-opacity', `${coursesOpacity}`);
      textContainerRef.current.style.setProperty('--our-edge-opacity', `${ourEdgeOpacity}`);
      textContainerRef.current.style.setProperty('--partners-opacity', `${partnersOpacity}`);
      textContainerRef.current.style.setProperty('--trust-opacity', `${trustOpacity}`);
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
  const partnersSectionWrapperRef = useRef<HTMLDivElement>(null);
  const testimonialsSectionWrapperRef = useRef<HTMLDivElement>(null);
  
  const [edgeProgress, setEdgeProgress] = useState(0);
  const [partnersProgress, setPartnersProgress] = useState(0);
  
  const [layout, setLayout] = useState({ coursesTop: 0, edgeTop: 0, partnersTop: 0, testimonialsTop: 0 });

  const formattedTestimonials = testimonialsData.map(testimonial => ({
    quote: testimonial.quote,
    name: testimonial.name,
    designation: testimonial.title,
    src: testimonial.image,
  }));


  useEffect(() => {
    const calculateLayout = () => {
      if (coursesSectionWrapperRef.current && ourEdgeSectionWrapperRef.current && partnersSectionWrapperRef.current && testimonialsSectionWrapperRef.current) {
        setLayout({
          coursesTop: coursesSectionWrapperRef.current.offsetTop,
          edgeTop: ourEdgeSectionWrapperRef.current.offsetTop,
          partnersTop: partnersSectionWrapperRef.current.offsetTop,
          testimonialsTop: testimonialsSectionWrapperRef.current.offsetTop,
        });
      }
    };

    calculateLayout();
    window.addEventListener('resize', calculateLayout);
    return () => window.removeEventListener('resize', calculateLayout);
  }, []);

  // 4. Scroll listener updated for the new watermark phase
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const viewportHeight = window.innerHeight;

      const heroAnimationProgress = Math.min(1, currentScroll / (viewportHeight * 0.8));
      if (heroWrapperRef.current) {
        heroWrapperRef.current.style.opacity = `${1 - heroAnimationProgress}`;
        heroWrapperRef.current.style.transform = `translateY(${heroAnimationProgress * -250}px)`;
      }

      if (layout.coursesTop === 0) return;

      const { coursesTop, edgeTop, partnersTop, testimonialsTop } = layout;

      // --- Watermark Animation Logic ---
      const backgroundAnimDuration = viewportHeight;
      const coursesAnimStart = coursesTop - viewportHeight;
      const edgeAnimStartForBackground = edgeTop - viewportHeight;
      const partnersAnimStartForBackground = partnersTop;
      
      // Define specific start and end points for the Partners -> Trust transition
      // Start: When the testimonials section begins to enter the viewport from the bottom.
      const trustTransitionStartScroll = testimonialsTop - viewportHeight;
      // End: When the testimonials section's top is at the vertical center of the viewport.
      const trustTransitionEndScroll = testimonialsTop - (viewportHeight / 2);
      const trustTransitionDuration = trustTransitionEndScroll - trustTransitionStartScroll;

      let newWatermarkProgress = 0;
      // The 'if/else' chain must check for the highest scroll values first.
      if (currentScroll >= trustTransitionStartScroll) {
        // Calculate progress specifically for the final transition's duration.
        const progress = (currentScroll - trustTransitionStartScroll) / trustTransitionDuration;
        newWatermarkProgress = 3 + Math.min(1, Math.max(0, progress)); // Phase 4: Partners -> Trust
      } else if (currentScroll >= partnersAnimStartForBackground) {
        const progress = (currentScroll - partnersAnimStartForBackground) / backgroundAnimDuration;
        newWatermarkProgress = 2 + Math.min(1, progress); // Phase 3: Our Edge -> Partners
      } else if (currentScroll >= edgeAnimStartForBackground) {
        const progress = (currentScroll - edgeAnimStartForBackground) / backgroundAnimDuration;
        newWatermarkProgress = 1 + Math.min(1, progress); // Phase 2: Courses -> Our Edge
      } else if (currentScroll >= coursesAnimStart) {
        const progress = (currentScroll - coursesAnimStart) / backgroundAnimDuration;
        newWatermarkProgress = Math.min(1, progress); // Phase 1: Hero -> Courses
      }
      watermarkProgressRef.current = newWatermarkProgress;
      
      const edgeCardAnimStart = edgeTop;
      const cardAnimScrollDistance = viewportHeight * NUM_CARDS;
      const scrollInCardZone = currentScroll - edgeCardAnimStart;
      let newEdgeProgress = 0;
      if (scrollInCardZone > 0) {
          newEdgeProgress = Math.min(1, scrollInCardZone / cardAnimScrollDistance);
      }
      setEdgeProgress(newEdgeProgress);

      const partnersAnimStart = partnersTop;
      const partnersAnimDuration = viewportHeight * 2;
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
        '--partners-opacity': 0,
        '--trust-opacity': 0
      } as any}
    >
      <h2 className="absolute bottom-0 left-1/2 z-[2] text-[24vw] md:text-[20vw] lg:text-[18rem] font-black uppercase text-transparent select-none leading-none" style={{ opacity: 'var(--persevex-opacity)', WebkitTextStroke: "1px white", transform: 'translateX(-50%) translateY(4rem)' }}>Persevex</h2>
      <h2 className="absolute bottom-0 left-1/2 z-[1] text-[24vw] md:text-[20vw] lg:text-[18rem] font-black uppercase text-transparent select-none leading-none" style={{ opacity: 'var(--courses-opacity)', WebkitTextStroke: "1px white", transform: 'translateX(-50%) translateY(4rem)' }}>Courses</h2>
      <h2 className="absolute bottom-0 left-1/2 z-[0] text-[24vw] md:text-[20vw] lg:text-[18rem] font-black uppercase text-transparent select-none leading-none" style={{ opacity: 'var(--our-edge-opacity)', WebkitTextStroke: "1px white", transform: 'translateX(-50%) translateY(4rem)', whiteSpace: 'nowrap' }}>Our Edge</h2>
      <h2 className="absolute bottom-0 left-1/2 z-[-1] text-[24vw] md:text-[20vw] lg:text-[18rem] font-black uppercase text-transparent select-none leading-none" style={{ opacity: 'var(--partners-opacity)', WebkitTextStroke: "1px white", transform: 'translateX(-50%) translateY(4rem)' }}>Partners</h2>
      <h2 className="absolute bottom-0 left-1/2 z-[-2] text-[24vw] md:text-[20vw] lg:text-[18rem] font-black uppercase text-transparent select-none leading-none" style={{ opacity: 'var(--trust-opacity)', WebkitTextStroke: "1px white", transform: 'translateX(-50%) translateY(4rem)' }}>Trust</h2>
    </div>
      
      <div className="relative z-20">
        <div ref={heroWrapperRef} className="sticky top-0 flex items-center justify-center h-screen pointer-events-none">
          <div className="w-full mr-74 mb-36 pointer-events-auto"><Hero /></div>
        </div>
        
        <div style={{ height: '10vh' }} />
        <div ref={coursesSectionWrapperRef}><CoursesSection /></div>
        <div style={{ height: '50vh' }} />
        <div ref={ourEdgeSectionWrapperRef} style={{ height: `${(NUM_CARDS + 1) * 100}vh` }}><OurEdgeSection progress={edgeProgress} /></div>
        <div ref={partnersSectionWrapperRef} style={{ height: '200vh', marginTop: '-50vh' }}><PartnersSection progress={partnersProgress} /></div>
        
        <div style={{ height: '30vh' }} />
        <div className="mb-40" ref={testimonialsSectionWrapperRef}>
          <AnimatedTestimonials testimonials={formattedTestimonials} autoplay={true} />
        </div>

      </div>
    </main>
  );
}