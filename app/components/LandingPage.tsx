"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useEffect, useState } from "react";
import * as THREE from "three";

import StarField from "./StarField";
import DustPlane from "./DustPlane";
import Hero from "./Hero";
import CoursesSection from "./CoursesSection";
import OurEdgeSection from "./OurEdgeSection";
import PartnersSection from "./PartnersSection";
import { AnimatedTestimonials } from "./Testimonials";
import { testimonialsData } from "../constants/TestimonialsData";
import RecognizedBySection from "./RecognizedBySection"; // Import the new component

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
      // Fade out dust plane after the first section
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
      let partnersOpacity = 0;
      let trustOpacity = 0;
      let recognizedByOpacity = 0; // New opacity variable

      if (currentProgress < 1.0) {
        persevexOpacity = (1 - currentProgress) * 0.4;
        coursesOpacity = currentProgress * 0.4;
      } else if (currentProgress < 2.0) {
        const phase2Progress = currentProgress - 1.0;
        coursesOpacity = (1 - phase2Progress) * 0.4;
        ourEdgeOpacity = phase2Progress * 0.4;
      } else if (currentProgress < 3.0) {
        const phase3Progress = currentProgress - 2.0;
        ourEdgeOpacity = (1 - phase3Progress) * 0.4;
        partnersOpacity = phase3Progress * 0.4;
      } else if (currentProgress < 4.0) { // Extended phase for Trust
        const phase4Progress = currentProgress - 3.0;
        partnersOpacity = (1 - phase4Progress) * 0.4;
        trustOpacity = phase4Progress * 0.4;
      } else { // New phase for Recognized By
        const phase5Progress = currentProgress - 4.0;
        trustOpacity = (1 - phase5Progress) * 0.4;
        recognizedByOpacity = phase5Progress * 0.4;
      }
      
      persevexOpacity = THREE.MathUtils.clamp(persevexOpacity, 0, 0.4);
      coursesOpacity = THREE.MathUtils.clamp(coursesOpacity, 0, 0.4);
      ourEdgeOpacity = THREE.MathUtils.clamp(ourEdgeOpacity, 0, 0.4);
      partnersOpacity = THREE.MathUtils.clamp(partnersOpacity, 0, 0.4);
      trustOpacity = THREE.MathUtils.clamp(trustOpacity, 0, 0.4);
      recognizedByOpacity = THREE.MathUtils.clamp(recognizedByOpacity, 0, 0.4); // Clamp new opacity

      textContainerRef.current.style.setProperty('--persevex-opacity', `${persevexOpacity}`);
      textContainerRef.current.style.setProperty('--courses-opacity', `${coursesOpacity}`);
      textContainerRef.current.style.setProperty('--our-edge-opacity', `${ourEdgeOpacity}`);
      textContainerRef.current.style.setProperty('--partners-opacity', `${partnersOpacity}`);
      textContainerRef.current.style.setProperty('--trust-opacity', `${trustOpacity}`);
      textContainerRef.current.style.setProperty('--recognized-by-opacity', `${recognizedByOpacity}`); // Set new CSS variable
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
  const recognizedBySectionWrapperRef = useRef<HTMLDivElement>(null); // New ref
  
  const [edgeProgress, setEdgeProgress] = useState(0);
  const [partnersProgress, setPartnersProgress] = useState(0);
  const [testimonialProgress, setTestimonialProgress] = useState(0);
  const [recognizedByProgress, setRecognizedByProgress] = useState(0); // New state
  
  const [targetTestimonialIndex, setTargetTestimonialIndex] = useState(0);
  const lastScrollTime = useRef(0);
  const isInitialLoad = useRef(true);
  
  // New property for recognizedByTop in layout state
  const [layout, setLayout] = useState({ coursesTop: 0, edgeTop: 0, partnersTop: 0, testimonialsTop: 0, recognizedByTop: 0 });

  const formattedTestimonials = testimonialsData.map(testimonial => ({
    quote: testimonial.quote,
    name: testimonial.name,
    designation: testimonial.title,
    src: testimonial.image,
  }));

  const SCROLL_DISTANCE_PER_CARD_VH = 150;
  const testimonialsAnimationDurationVh = SCROLL_DISTANCE_PER_CARD_VH * (formattedTestimonials.length - 1);
  const testimonialsSectionHeightVh = testimonialsAnimationDurationVh + 100;

  useEffect(() => {
    const calculateLayout = () => {
      // Add new ref to the check
      if (coursesSectionWrapperRef.current && ourEdgeSectionWrapperRef.current && partnersSectionWrapperRef.current && testimonialsSectionWrapperRef.current && recognizedBySectionWrapperRef.current) {
        setLayout({
          coursesTop: coursesSectionWrapperRef.current.offsetTop,
          edgeTop: ourEdgeSectionWrapperRef.current.offsetTop,
          partnersTop: partnersSectionWrapperRef.current.offsetTop,
          testimonialsTop: testimonialsSectionWrapperRef.current.offsetTop,
          recognizedByTop: recognizedBySectionWrapperRef.current.offsetTop, // Calculate new section's top
        });
      }
    };

    calculateLayout();
    const resizeObserver = new ResizeObserver(calculateLayout);
    document.body.childNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) {
            resizeObserver.observe(node as Element);
        }
    });
    window.addEventListener('resize', calculateLayout);
    
    return () => {
        resizeObserver.disconnect();
        window.removeEventListener('resize', calculateLayout);
    };
  }, []);

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

      const { coursesTop, edgeTop, partnersTop, testimonialsTop, recognizedByTop } = layout;

      // START OF CHANGE: Refined watermark transition timing
      
      // Define start and end points for the "Partners" to "Trust" transition
      const trustWatermarkAnimStart = testimonialsTop - viewportHeight; // Start when testimonials section enters viewport
      const trustWatermarkAnimEnd = testimonialsTop - viewportHeight / 2; // End when testimonials section is centered
      const trustWatermarkAnimDuration = trustWatermarkAnimEnd - trustWatermarkAnimStart;

      // Define points for the "Trust" to "Recognized By" transition
      const recognizedByWatermarkAnimStart = recognizedByTop - viewportHeight; 
      const recognizedByWatermarkAnimDuration = viewportHeight / 2;

      let newWatermarkProgress = 0;
      
      // Phase 5: "Trust" -> "Validation"
      if (currentScroll >= recognizedByWatermarkAnimStart) {
        const progress = (currentScroll - recognizedByWatermarkAnimStart) / recognizedByWatermarkAnimDuration;
        newWatermarkProgress = 4 + Math.min(1, progress);
      }
      // New static phase: "Trust" is fully visible while scrolling through testimonials
      else if (currentScroll >= trustWatermarkAnimEnd) {
        newWatermarkProgress = 4.0;
      }
      // Phase 4: "Partners" -> "Trust" transition (now happens over a shorter, specific duration)
      else if (currentScroll >= trustWatermarkAnimStart) {
        const duration = trustWatermarkAnimDuration > 0 ? trustWatermarkAnimDuration : 1;
        const progress = (currentScroll - trustWatermarkAnimStart) / duration;
        newWatermarkProgress = 3 + Math.min(1, progress);
      } 
      // Phase 3: "Our Edge" -> "Partners"
      else if (currentScroll >= partnersTop) {
        const duration = trustWatermarkAnimStart - partnersTop;
        const progress = (currentScroll - partnersTop) / duration;
        newWatermarkProgress = 2 + Math.min(1, progress);
      } 
      // Phase 2: "Courses" -> "Our Edge"
      else if (currentScroll >= edgeTop - viewportHeight) {
        const progress = (currentScroll - (edgeTop - viewportHeight)) / viewportHeight;
        newWatermarkProgress = 1 + Math.min(1, progress);
      } 
      // Phase 1: "Persevex" -> "Courses"
      else if (currentScroll >= coursesTop - viewportHeight) {
        const progress = (currentScroll - (coursesTop - viewportHeight)) / viewportHeight;
        newWatermarkProgress = Math.min(1, progress);
      }
      watermarkProgressRef.current = newWatermarkProgress;
      
      // END OF CHANGE

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

      const testimonialsAnimStart = testimonialsTop;
      const testimonialsAnimDurationPx = (testimonialsAnimationDurationVh / 100) * viewportHeight;
      const scrollInTestimonialsZone = currentScroll - testimonialsAnimStart;

      if (scrollInTestimonialsZone >= 0) {
        const progress = Math.min(1, scrollInTestimonialsZone / testimonialsAnimDurationPx);
        setTestimonialProgress(progress);
      } else {
        setTestimonialProgress(0);
      }

      const recognizedByAnimStart = recognizedByTop;
      const recognizedByAnimDuration = viewportHeight * 2;
      const scrollInRecognizedByZone = currentScroll - recognizedByAnimStart;
      let newRecognizedByProgress = 0;
      if (scrollInRecognizedByZone > 0) {
          newRecognizedByProgress = Math.min(1, scrollInRecognizedByZone / recognizedByAnimDuration);
      }
      setRecognizedByProgress(newRecognizedByProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [layout, formattedTestimonials.length, testimonialsAnimationDurationVh]);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      const wrapper = testimonialsSectionWrapperRef.current;
      if (!wrapper || layout.testimonialsTop === 0) return;

      const top = layout.testimonialsTop;
      const bottom = top + wrapper.offsetHeight;
      const viewportHeight = window.innerHeight;

      const isTestimonialSectionActive =
        window.scrollY >= top && window.scrollY < bottom - viewportHeight;

      if (!isTestimonialSectionActive) return;

      const now = Date.now();
      if (now - lastScrollTime.current < 1000) {
        event.preventDefault();
        return;
      }
      
      if (Math.abs(event.deltaY) < 20) {
         event.preventDefault();
         return;
      }
      
      const maxIndex = formattedTestimonials.length - 1;
      const scrollDirection = event.deltaY;

      if (scrollDirection < 0 && targetTestimonialIndex === 0) {
        return;
      }
      if (scrollDirection > 0 && targetTestimonialIndex === maxIndex) {
        return;
      }

      event.preventDefault();
      
      let newIndex = targetTestimonialIndex;
      if (scrollDirection > 0 && targetTestimonialIndex < maxIndex) {
        newIndex = targetTestimonialIndex + 1;
      } else if (scrollDirection < 0 && targetTestimonialIndex > 0) {
        newIndex = targetTestimonialIndex - 1;
      }
      
      if (newIndex !== targetTestimonialIndex) {
        lastScrollTime.current = now;
        setTargetTestimonialIndex(newIndex);
      }
    };
    
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [layout.testimonialsTop, targetTestimonialIndex, formattedTestimonials.length]);

  useEffect(() => {
    if (isInitialLoad.current && layout.testimonialsTop > 0) {
      isInitialLoad.current = false;
      return;
    }
    
    if (layout.testimonialsTop === 0) return;

    const maxIndex = formattedTestimonials.length - 1;
    if (maxIndex <= 0) return;

    const testimonialsAnimDurationPx = (testimonialsAnimationDurationVh / 100) * window.innerHeight;
    
    const targetProgress = targetTestimonialIndex / maxIndex;
    const targetScrollY = layout.testimonialsTop + (targetProgress * testimonialsAnimDurationPx);

    if (Math.abs(window.scrollY - targetScrollY) > 5) {
        window.scrollTo({
          top: targetScrollY,
          behavior: "smooth",
        });
    }
  }, [targetTestimonialIndex, layout.testimonialsTop, formattedTestimonials.length, testimonialsAnimationDurationVh]);


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
        '--trust-opacity': 0,
        '--recognized-by-opacity': 0
      } as any}
    >
      <h2 className="absolute bottom-0 left-1/2 z-[2] text-[24vw] md:text-[20vw] lg:text-[18rem] font-black uppercase text-transparent select-none leading-none" style={{ opacity: 'var(--persevex-opacity)', WebkitTextStroke: "1px white", transform: 'translateX(-50%) translateY(4rem)' }}>Persevex</h2>
      <h2 className="absolute bottom-0 left-1/2 z-[1] text-[24vw] md:text-[20vw] lg:text-[18rem] font-black uppercase text-transparent select-none leading-none" style={{ opacity: 'var(--courses-opacity)', WebkitTextStroke: "1px white", transform: 'translateX(-50%) translateY(4rem)' }}>Courses</h2>
      <h2 className="absolute bottom-0 left-1/2 z-[0] text-[24vw] md:text-[20vw] lg:text-[18rem] font-black uppercase text-transparent select-none leading-none" style={{ opacity: 'var(--our-edge-opacity)', WebkitTextStroke: "1px white", transform: 'translateX(-50%) translateY(4rem)', whiteSpace: 'nowrap' }}>Our Edge</h2>
      <h2 className="absolute bottom-0 left-1/2 z-[-1] text-[24vw] md:text-[20vw] lg:text-[18rem] font-black uppercase text-transparent select-none leading-none" style={{ opacity: 'var(--partners-opacity)', WebkitTextStroke: "1px white", transform: 'translateX(-50%) translateY(4rem)' }}>Partners</h2>
      <h2 className="absolute bottom-0 left-1/2 z-[-2] text-[24vw] md:text-[20vw] lg:text-[18rem] font-black uppercase text-transparent select-none leading-none" style={{ opacity: 'var(--trust-opacity)', WebkitTextStroke: "1px white", transform: 'translateX(-50%) translateY(4rem)' }}>Trust</h2>
      <h2 className="absolute bottom-6 left-1/2 z-[-3] text-[20vw] md:text-[16vw] lg:text-[240px] font-black uppercase text-transparent select-none leading-none" style={{ opacity: 'var(--recognized-by-opacity)', WebkitTextStroke: "1px white", transform: 'translateX(-50%) translateY(4rem)', whiteSpace: 'nowrap' }}>Validation</h2>
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
        
        <div style={{ height: '10vh' }} />
        <div ref={testimonialsSectionWrapperRef} style={{ height: `${testimonialsSectionHeightVh}vh` }}>
          <div className="sticky top-0 flex h-screen items-center justify-center">
            <AnimatedTestimonials 
              testimonials={formattedTestimonials} 
              progress={testimonialProgress} 
            />
          </div>
        </div>

        <div ref={recognizedBySectionWrapperRef} style={{ height: '300vh' }}>
          <div className="sticky top-0 flex h-screen items-center justify-center">
            <RecognizedBySection progress={recognizedByProgress} />
          </div>
        </div>

      </div>
    </main>
  );
}