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
import RecognizedBySection from "./RecognizedBySection";
import AboutUsSection from "./AboutUs";

const NUM_CARDS = 6;
const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max);

function AnimationController({ watermarkProgressRef, textContainerRef }: any) {
  const animatedProgress = useRef(0);
  const dustPlaneRef = useRef<THREE.Mesh>(null!);
  
  const aboutUsWord = "ABOUT US"; 

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
      let persevexOpacity = 0, coursesOpacity = 0, ourEdgeOpacity = 0, partnersOpacity = 0, trustOpacity = 0, recognizedByOpacity = 0, aboutUsOpacity = 0;
      
      if (currentProgress < 1.0) { persevexOpacity = (1 - currentProgress) * 0.4; coursesOpacity = currentProgress * 0.4; }
      else if (currentProgress < 2.0) { const p = currentProgress - 1.0; coursesOpacity = (1 - p) * 0.4; ourEdgeOpacity = p * 0.4; }
      else if (currentProgress < 3.0) { const p = currentProgress - 2.0; ourEdgeOpacity = (1 - p) * 0.4; partnersOpacity = p * 0.4; }
      else if (currentProgress < 4.0) { const p = currentProgress - 3.0; partnersOpacity = (1 - p) * 0.4; trustOpacity = p * 0.4; }
      else if (currentProgress < 5.0) { const p = currentProgress - 4.0; trustOpacity = (1 - p) * 0.4; recognizedByOpacity = p * 0.4; }
      else if (currentProgress < 6.0) {
        const p = currentProgress - 5.0;
        recognizedByOpacity = (1 - p) * 0.4;
        aboutUsOpacity = p * 0.4;
      }
      else {
        recognizedByOpacity = 0;
        aboutUsOpacity = 0.4;
      }
      
      const assemblyStart = 6.0;
      const assemblyDuration = 2.5; 
      const assemblyEnd = assemblyStart + assemblyDuration;
      const assemblyProgress = clamp((currentProgress - assemblyStart) / assemblyDuration, 0, 1);
      
      const riseStart = assemblyEnd;
      const riseDuration = 0.5;
      const riseProgress = clamp((currentProgress - riseStart) / riseDuration, 0, 1);
      
      const initialY = 4;
      const centerTarget = -35;
      const move_to_center_Y = THREE.MathUtils.lerp(initialY * 16, centerTarget * window.innerHeight / 100, assemblyProgress);
      const finalRise = -riseProgress * 30;
      const containerTranslateY = move_to_center_Y + (finalRise * window.innerHeight / 100);
      const containerScale = 1 - riseProgress * 0.7;
      textContainerRef.current.style.setProperty('--about-us-container-transform', `translateX(-50%) translateY(${containerTranslateY}px) scale(${containerScale})`);

      const lettersWithSpaces = aboutUsWord.split('');
      const numLetters = aboutUsWord.replace(/ /g, '').length;
      const numSpaces = aboutUsWord.split(' ').length - 1;
      
      const spacePauseFactor = 2;
      const totalAnimationUnits = numLetters + (numSpaces * spacePauseFactor);
      const unitDuration = 1.0 / totalAnimationUnits;
      const animationWindow = unitDuration * 5;

      let timeCursor = 0;

      lettersWithSpaces.forEach((char, globalIndex) => {
        if (char === ' ') {
          timeCursor += unitDuration * spacePauseFactor;
          return;
        }

        const start = timeCursor;
        const letterProgress = clamp((assemblyProgress - start) / animationWindow, 0, 1);
        const letterOpacity = letterProgress > 0 ? 1 : 0;
        const translateY = (1 - letterProgress) * 20;
        const scale = 0.5 + letterProgress * 0.5;

        if (currentProgress < riseStart) {
          textContainerRef.current.style.setProperty(`--about-us-letter-${globalIndex}-transform`, `translateY(${translateY}vh) scale(${scale})`);
        } else {
          textContainerRef.current.style.setProperty(`--about-us-letter-${globalIndex}-transform`, `translateY(0vh) scale(1)`);
        }
        textContainerRef.current.style.setProperty(`--about-us-letter-${globalIndex}-opacity`, `${letterOpacity}`);

        timeCursor += unitDuration;
      });
      
      textContainerRef.current.style.setProperty('--persevex-opacity', `${clamp(persevexOpacity, 0, 0.4)}`);
      textContainerRef.current.style.setProperty('--courses-opacity', `${clamp(coursesOpacity, 0, 0.4)}`);
      textContainerRef.current.style.setProperty('--our-edge-opacity', `${clamp(ourEdgeOpacity, 0, 0.4)}`);
      textContainerRef.current.style.setProperty('--partners-opacity', `${clamp(partnersOpacity, 0, 0.4)}`);
      textContainerRef.current.style.setProperty('--trust-opacity', `${clamp(trustOpacity, 0, 0.4)}`);
      textContainerRef.current.style.setProperty('--recognized-by-opacity', `${clamp(recognizedByOpacity, 0, 0.4)}`);
      textContainerRef.current.style.setProperty('--about-us-opacity', `${clamp(aboutUsOpacity, 0, 0.4)}`);
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
  const recognizedBySectionWrapperRef = useRef<HTMLDivElement>(null);
  const aboutUsSectionWrapperRef = useRef<HTMLDivElement>(null);
  
  const [edgeProgress, setEdgeProgress] = useState(0);
  const [partnersProgress, setPartnersProgress] = useState(0);
  const [testimonialProgress, setTestimonialProgress] = useState(0);
  const [recognizedByProgress, setRecognizedByProgress] = useState(0);
  const [aboutUsProgress, setAboutUsProgress] = useState(0);
  
  const [targetTestimonialIndex, setTargetTestimonialIndex] = useState(0);
  const lastScrollTime = useRef(0);
  const isInitialLoad = useRef(true);
  const aboutUsWords = "ABOUT US".split(' '); 

  const letterVideos = [
    '/videos/A.mp4', 
    '/videos/B.mp4', 
    '/videos/O.mp4', 
    '/videos/U.mp4', 
    '/videos/T.mp4', 
    '/videos/U2.mp4',
    '/videos/S.mp4', 
  ];
  
  const [layout, setLayout] = useState({ coursesTop: 0, edgeTop: 0, partnersTop: 0, testimonialsTop: 0, recognizedByTop: 0, aboutUsTop: 0 });

  const formattedTestimonials = testimonialsData.map(t => ({ quote: t.quote, name: t.name, designation: t.title, src: t.image }));

  const SCROLL_DISTANCE_PER_CARD_VH = 150;
  const testimonialsAnimationDurationVh = SCROLL_DISTANCE_PER_CARD_VH * (formattedTestimonials.length - 1);
  const testimonialsSectionHeightVh = testimonialsAnimationDurationVh + 100;

  useEffect(() => {
    const calculateLayout = () => {
      if (coursesSectionWrapperRef.current && ourEdgeSectionWrapperRef.current && partnersSectionWrapperRef.current && testimonialsSectionWrapperRef.current && recognizedBySectionWrapperRef.current && aboutUsSectionWrapperRef.current) {
        setLayout({
          coursesTop: coursesSectionWrapperRef.current.offsetTop,
          edgeTop: ourEdgeSectionWrapperRef.current.offsetTop,
          partnersTop: partnersSectionWrapperRef.current.offsetTop,
          testimonialsTop: testimonialsSectionWrapperRef.current.offsetTop,
          recognizedByTop: recognizedBySectionWrapperRef.current.offsetTop,
          aboutUsTop: aboutUsSectionWrapperRef.current.offsetTop,
        });
      }
    };
    calculateLayout();
    const resizeObserver = new ResizeObserver(calculateLayout);
    document.body.childNodes.forEach(node => { if (node.nodeType === Node.ELEMENT_NODE) resizeObserver.observe(node as Element); });
    window.addEventListener('resize', calculateLayout);
    return () => { resizeObserver.disconnect(); window.removeEventListener('resize', calculateLayout); };
  }, []);

  // --- START OF OPTIMIZATION ---
  useEffect(() => {
    let ticking = false; // A flag to prevent multiple animation frame requests

    const performUpdate = () => {
        const currentScroll = window.scrollY;
        const viewportHeight = window.innerHeight;

        if (heroWrapperRef.current) {
            const heroProgress = Math.min(1, currentScroll / (viewportHeight * 0.8));
            heroWrapperRef.current.style.opacity = `${1 - heroProgress}`;
            heroWrapperRef.current.style.transform = `translateY(${heroProgress * -250}px)`;
        }

        if (layout.coursesTop === 0) {
            ticking = false; // Reset ticking even if layout is not ready
            return;
        }

        const { coursesTop, edgeTop, partnersTop, testimonialsTop, recognizedByTop, aboutUsTop } = layout;

        const trustWatermarkAnimStart = testimonialsTop - viewportHeight;
        const trustWatermarkAnimEnd = testimonialsTop - viewportHeight / 2;
        
        const recognizedByWatermarkAnimStart = recognizedByTop - viewportHeight; 
        
        const aboutUsWatermarkAnimStart = aboutUsTop - viewportHeight;
        const aboutUsWatermarkAnimDuration = viewportHeight * 4; 

        let newWatermarkProgress = 0;
        
        if (currentScroll >= aboutUsWatermarkAnimStart) {
            const progress = (currentScroll - aboutUsWatermarkAnimStart) / aboutUsWatermarkAnimDuration;
            newWatermarkProgress = 5 + progress * 4;
        }
        else if (currentScroll >= recognizedByWatermarkAnimStart) {
            newWatermarkProgress = 4 + Math.min(1, (currentScroll - recognizedByWatermarkAnimStart) / viewportHeight);
        }
        else if (currentScroll >= trustWatermarkAnimEnd) { newWatermarkProgress = 4.0; }
        else if (currentScroll >= trustWatermarkAnimStart) { newWatermarkProgress = 3 + Math.min(1, (currentScroll - trustWatermarkAnimStart) / (trustWatermarkAnimEnd - trustWatermarkAnimStart)); }
        else if (currentScroll >= partnersTop) { newWatermarkProgress = 2 + Math.min(1, (currentScroll - partnersTop) / (trustWatermarkAnimStart - partnersTop)); }
        else if (currentScroll >= edgeTop - viewportHeight) { newWatermarkProgress = 1 + Math.min(1, (currentScroll - (edgeTop - viewportHeight)) / viewportHeight); }
        else if (currentScroll >= coursesTop - viewportHeight) { newWatermarkProgress = Math.min(1, (currentScroll - (coursesTop - viewportHeight)) / viewportHeight); }
        
        watermarkProgressRef.current = newWatermarkProgress;
        
        setEdgeProgress(Math.min(1, Math.max(0, currentScroll - edgeTop) / (viewportHeight * NUM_CARDS)));
        setPartnersProgress(Math.min(1, Math.max(0, currentScroll - partnersTop) / (viewportHeight * 2)));
        setTestimonialProgress(Math.min(1, Math.max(0, currentScroll - testimonialsTop) / ((testimonialsAnimationDurationVh / 100) * viewportHeight)));
        setRecognizedByProgress(Math.min(1, Math.max(0, currentScroll - recognizedByTop) / (viewportHeight * 2)));
        
        const aboutUsContentStart = aboutUsTop + viewportHeight * 3;
        setAboutUsProgress(Math.min(1, Math.max(0, currentScroll - aboutUsContentStart) / (viewportHeight)));

        ticking = false; // Reset the flag after updates are done
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(performUpdate);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call to set the state on load
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [layout, formattedTestimonials.length, testimonialsAnimationDurationVh]);
  // --- END OF OPTIMIZATION ---


  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      const wrapper = testimonialsSectionWrapperRef.current;
      if (!wrapper || layout.testimonialsTop === 0) return;
      const top = layout.testimonialsTop;
      const bottom = top + wrapper.offsetHeight;
      const viewportHeight = window.innerHeight;
      const isTestimonialSectionActive = window.scrollY >= top && window.scrollY < bottom - viewportHeight;
      if (!isTestimonialSectionActive) return;
      const now = Date.now();
      if (now - lastScrollTime.current < 1000) { event.preventDefault(); return; }
      if (Math.abs(event.deltaY) < 20) { event.preventDefault(); return; }
      const maxIndex = formattedTestimonials.length - 1;
      const scrollDirection = event.deltaY;
      if (scrollDirection < 0 && targetTestimonialIndex === 0) return;
      if (scrollDirection > 0 && targetTestimonialIndex === maxIndex) return;
      event.preventDefault();
      let newIndex = targetTestimonialIndex;
      if (scrollDirection > 0 && targetTestimonialIndex < maxIndex) newIndex = targetTestimonialIndex + 1;
      else if (scrollDirection < 0 && targetTestimonialIndex > 0) newIndex = targetTestimonialIndex - 1;
      if (newIndex !== targetTestimonialIndex) { lastScrollTime.current = now; setTargetTestimonialIndex(newIndex); }
    };
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [layout.testimonialsTop, targetTestimonialIndex, formattedTestimonials.length]);

  useEffect(() => {
    if (isInitialLoad.current && layout.testimonialsTop > 0) { isInitialLoad.current = false; return; }
    if (layout.testimonialsTop === 0) return;
    const maxIndex = formattedTestimonials.length - 1;
    if (maxIndex <= 0) return;
    const testimonialsAnimDurationPx = (testimonialsAnimationDurationVh / 100) * window.innerHeight;
    const targetProgress = targetTestimonialIndex / maxIndex;
    const targetScrollY = layout.testimonialsTop + (targetProgress * testimonialsAnimDurationPx);
    if (Math.abs(window.scrollY - targetScrollY) > 5) { window.scrollTo({ top: targetScrollY, behavior: "smooth" }); }
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
        '--recognized-by-opacity': 0,
        '--about-us-opacity': 0,
      } as any}
    >
      <h2 className="absolute bottom-0 left-1/2 z-[2] text-[24vw] md:text-[20vw] lg:text-[18rem] font-black uppercase text-transparent select-none leading-none" style={{ opacity: 'var(--persevex-opacity)', WebkitTextStroke: "1px white", transform: 'translateX(-50%) translateY(4rem)' }}>Persevex</h2>
      <h2 className="absolute bottom-0 left-1/2 z-[1] text-[24vw] md:text-[20vw] lg:text-[18rem] font-black uppercase text-transparent select-none leading-none" style={{ opacity: 'var(--courses-opacity)', WebkitTextStroke: "1px white", transform: 'translateX(-50%) translateY(4rem)' }}>Courses</h2>
      <h2 className="absolute bottom-0 left-1/2 z-[0] text-[24vw] md:text-[20vw] lg:text-[18rem] font-black uppercase text-transparent select-none leading-none" style={{ opacity: 'var(--our-edge-opacity)', WebkitTextStroke: "1px white", transform: 'translateX(-50%) translateY(4rem)', whiteSpace: 'nowrap' }}>Our Edge</h2>
      <h2 className="absolute bottom-0 left-1/2 z-[-1] text-[24vw] md:text-[20vw] lg:text-[18rem] font-black uppercase text-transparent select-none leading-none" style={{ opacity: 'var(--partners-opacity)', WebkitTextStroke: "1px white", transform: 'translateX(-50%) translateY(4rem)' }}>Partners</h2>
      <h2 className="absolute bottom-0 left-1/2 z-[-2] text-[24vw] md:text-[20vw] lg:text-[18rem] font-black uppercase text-transparent select-none leading-none" style={{ opacity: 'var(--trust-opacity)', WebkitTextStroke: "1px white", transform: 'translateX(-50%) translateY(4rem)' }}>Trust</h2>
      <h2 className="absolute bottom-6 left-1/2 z-[-3] text-[20vw] md:text-[16vw] lg:text-[240px] font-black uppercase text-transparent select-none leading-none" style={{ opacity: 'var(--recognized-by-opacity)', WebkitTextStroke: "1px white", transform: 'translateX(-50%) translateY(4rem)', whiteSpace: 'nowrap' }}>Validation</h2>
      <h2 className="absolute bottom-6 left-1/2 z-[-5] text-[20vw] md:text-[16vw] lg:text-[240px] font-black uppercase text-transparent select-none leading-none" style={{ opacity: 'var(--about-us-opacity)', WebkitTextStroke: "1px white", transform: 'translateX(-50%) translateY(4rem)', whiteSpace: 'nowrap' }}>Our Story</h2>
      
      <div 
        className="absolute left-1/2 z-[-4] flex items-center justify-center space-x-1 md:space-x-2"
        style={{ 
            bottom: '1.5rem',
            opacity: 'var(--about-us-opacity)', 
            transform: 'var(--about-us-container-transform, translateX(-50%))',
            whiteSpace: 'nowrap' 
        }}
    >
        {(() => {
          let videoIndex = 0;
          return aboutUsWords.map((word, wordIndex) => (
            <div key={wordIndex} className="flex items-center justify-center space-x-1 md:space-x-2">
            {word.split('').map((letter, letterIndex) => {
                const globalLetterIndex = aboutUsWords.slice(0, wordIndex).join(' ').length + (wordIndex > 0 ? 1 : 0) + letterIndex;
                const currentVideoSrc = letterVideos[videoIndex++];
                
                return (
                  <h2
                    key={letterIndex}
                    className="relative text-[20vw] md:text-[16vw] lg:text-[240px] font-black leading-none"
                    style={{
                      fontFamily: 'serif',
                      transform: `var(--about-us-letter-${globalLetterIndex}-transform)`,
                      opacity: `var(--about-us-letter-${globalLetterIndex}-opacity, 1)`,
                      WebkitMaskImage: 'linear-gradient(white, white)',
                      maskImage: 'linear-gradient(white, white)',
                      WebkitMaskClip: 'text',
                      maskClip: 'text',
                      color: 'transparent',
                    }}
                  >
                    <video 
                      src={currentVideoSrc}
                      autoPlay 
                      loop 
                      muted 
                      playsInline
                      className="absolute top-0 left-0 w-full h-full object-cover -z-10"
                    />
                    {letter}
                  </h2>
                )
            })}
            {wordIndex < aboutUsWords.length - 1 && <div className="w-8 md:w-12" />}
            </div>
          ))
        })()}
        </div>
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
            <AnimatedTestimonials testimonials={formattedTestimonials} progress={testimonialProgress} />
          </div>
        </div>

        <div ref={recognizedBySectionWrapperRef} style={{ height: '300vh' }}>
          <div className="sticky top-0 flex h-screen items-center justify-center">
            <RecognizedBySection progress={recognizedByProgress} />
          </div>
        </div>

        <div ref={aboutUsSectionWrapperRef} style={{ height: '400vh' }}><AboutUsSection progress={aboutUsProgress} /></div>
      </div>
    </main>
  );
}