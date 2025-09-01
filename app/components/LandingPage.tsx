// Filename: LandingPage.tsx

"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Suspense,
  useRef,
  useEffect,
  useState,
  FC,
  MutableRefObject,
  useMemo,
} from "react";
import * as THREE from "three";
import { useMotionValue } from "framer-motion"; 
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
import SimpleStars from "./SimpleStars";
import AboutUsExtendedComp from "./AboutUsExtendedComp";
import { useScroll } from "../contexts/scrollContext";
import ContactUsSection from "./ContactUs";

const NUM_CARDS = 6;
const clamp = (num: number, min: number, max: number): number =>
  Math.min(Math.max(num, min), max);

interface DustMaterial extends THREE.ShaderMaterial {
  uniforms: { uOpacity: { value: number } };
}
interface AnimationControllerProps {
  watermarkProgressRef: MutableRefObject<number>;
}
interface Testimonial {
  quote: string;
  name: string;
  designation: string;
  src: string;
}





const AboutUsLetters: FC<{ letters: string[] }> = ({ letters }) => (
  <>
    {letters.map((letter, index) => {
      if (letter === " ") return <div key={index} className="w-8 md:w-12" />;
      return (
        <h2
          key={index}
          className="relative text-[20vw] md:text-[16vw] lg:text-[200px] font-black leading-none"
          style={
            {
              fontFamily: "serif",
              transform: `var(--about-us-letter-${index}-transform)`,
              color: "var(--about-us-fill-color)",
              WebkitTextStroke: "var(--about-us-stroke)",
            } as React.CSSProperties
          }
        >
          {letter}
        </h2>
      );
    })}
  </>
);

const AnimationController: FC<AnimationControllerProps> = ({ watermarkProgressRef }) => {
  const animatedProgress = useRef<number>(0);
  const dustPlaneRef = useRef<THREE.Mesh<THREE.BufferGeometry, DustMaterial>>(null);
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
      const material = dustPlaneRef.current.material;
      if (material.uniforms.uOpacity) {
        material.uniforms.uOpacity.value = dustOpacity;
      }
    }
  });
  return (
    <>
      <color attach="background" args={["black"]} />
      <StarField hover={false} />
      <DustPlane ref={dustPlaneRef} renderOrder={-2} />
    </>
  );
};



const LandingPage: FC = () => {
  const { layout, setLayout, setSectionRefs } = useScroll();

  // Create a MotionValue to hold the scroll progress for the CoursesSection.
  const coursesProgress = useMotionValue(0);

  const [headerProgress, setHeaderProgress] = useState<number>(0);
  const [showStickyHeader, setShowStickyHeader] = useState<boolean>(false);
  const watermarkProgressRef = useRef<number>(0);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const heroWrapperRef = useRef<HTMLDivElement>(null);
  const coursesSectionWrapperRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
  const ourEdgeSectionWrapperRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
  const partnersSectionWrapperRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
  const testimonialsSectionWrapperRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
  const recognizedBySectionWrapperRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
  const aboutUsSectionWrapperRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
  const cardStackingWrapperRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
  const contactUsSectionWrapperRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
  const videoRef = useRef<HTMLVideoElement>(null);
  const starfieldOverlayRef = useRef<HTMLDivElement>(null);
  const whiteOverlayRef = useRef<HTMLDivElement>(null);
  const textMaskContainerRef = useRef<HTMLDivElement>(null);
  const [edgeProgress, setEdgeProgress] = useState<number>(0);
  const [partnersProgress, setPartnersProgress] = useState<number>(0);
  const [testimonialProgress, setTestimonialProgress] = useState<number>(0);
  const [aboutUsProgress, setAboutUsProgress] = useState<number>(0);
  const [stackingProgress, setStackingProgress] = useState<number>(0);
  const [cascadingProgress, setCascadingProgress] = useState<number>(0);
  const aboutUsWord = "ABOUT US";
  const lettersWithSpaces = useMemo(() => aboutUsWord.split(""), []);

  const formattedTestimonials: Testimonial[] = useMemo(
    () => testimonialsData.map((t) => ({
      quote: t.quote,
      name: t.name,
      designation: t.title,
      src: t.image,
    })),
    []
  );

  const testimonialsAnimationDurationVh = 300;
  const testimonialsSectionHeightVh = testimonialsAnimationDurationVh + 100;

  useEffect(() => {
    const calculateLayout = () => {
      if (
        coursesSectionWrapperRef.current &&
        ourEdgeSectionWrapperRef.current &&
        partnersSectionWrapperRef.current &&
        testimonialsSectionWrapperRef.current &&
        recognizedBySectionWrapperRef.current &&
        aboutUsSectionWrapperRef.current &&
        cardStackingWrapperRef.current &&
        // +++ START: ADD CHECK FOR NEW REF +++
        contactUsSectionWrapperRef.current
        // +++ END: ADD CHECK FOR NEW REF +++
      ) {
        setLayout({
          coursesTop: coursesSectionWrapperRef.current.offsetTop,
          edgeTop: ourEdgeSectionWrapperRef.current.offsetTop,
          partnersTop: partnersSectionWrapperRef.current.offsetTop,
          testimonialsTop: testimonialsSectionWrapperRef.current.offsetTop,
          recognizedByTop: recognizedBySectionWrapperRef.current.offsetTop,
          aboutUsTop: aboutUsSectionWrapperRef.current.offsetTop,
          cardStackingTop: cardStackingWrapperRef.current.offsetTop,
          // +++ START: ADD NEW LAYOUT PROPERTY +++
          contactUsTop: contactUsSectionWrapperRef.current.offsetTop,
          // +++ END: ADD NEW LAYOUT PROPERTY +++
        });
      }
    };
    calculateLayout();
    const resizeObserver = new ResizeObserver(calculateLayout);
    document.body.childNodes.forEach((node) => {
      if (node instanceof Element) resizeObserver.observe(node);
    });
    window.addEventListener("resize", calculateLayout);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", calculateLayout);
    };
  }, [setLayout]);

  useEffect(() => {
    setSectionRefs({
      courses: coursesSectionWrapperRef,
      ourEdge: ourEdgeSectionWrapperRef,
      partners: partnersSectionWrapperRef,
      testimonials: testimonialsSectionWrapperRef,
      recognizedBy: recognizedBySectionWrapperRef,
      aboutUs: aboutUsSectionWrapperRef,
      // +++ START: ADD NEW REF TO CONTEXT +++
      contactUs: contactUsSectionWrapperRef,
      // +++ END: ADD NEW REF TO CONTEXT +++
    });
  }, [setSectionRefs]);

  const targetProgressRef = useRef(0);
  const smoothedProgressRef = useRef(0);

  useEffect(() => {
    let animationFrameId: number;
    const animationLoop = () => {
      smoothedProgressRef.current = THREE.MathUtils.lerp(
        smoothedProgressRef.current,
        targetProgressRef.current,
        0.075
      );
      watermarkProgressRef.current = targetProgressRef.current;
      const currentProgress = smoothedProgressRef.current;
      setHeaderProgress(currentProgress);
      if (textContainerRef.current && window.innerHeight) {
        // +++ START: ADD NEW OPACITY VARIABLE +++
        let persevexOpacity = 0, coursesOpacity = 0, ourEdgeOpacity = 0, partnersOpacity = 0, trustOpacity = 0, recognizedByOpacity = 0, aboutUsOpacity = 0, contactUsOpacity = 0;
        // +++ END: ADD NEW OPACITY VARIABLE +++

        // +++ START: MODIFY WATERMARK OPACITY LOGIC +++
        if (currentProgress < 1.0) {
          persevexOpacity = (1 - currentProgress) * 0.4;
          coursesOpacity = currentProgress * 0.4;
        } else if (currentProgress < 2.0) {
          const p = currentProgress - 1.0;
          coursesOpacity = (1 - p) * 0.4;
          ourEdgeOpacity = p * 0.4;
        } else if (currentProgress < 3.0) {
          const p = currentProgress - 2.0;
          ourEdgeOpacity = (1 - p) * 0.4;
          partnersOpacity = p * 0.4;
        } else if (currentProgress < 4.0) {
          const p = currentProgress - 3.0;
          partnersOpacity = (1 - p) * 0.4;
          trustOpacity = p * 0.4;
        } else if (currentProgress < 5.0) {
          const p = currentProgress - 4.0;
          trustOpacity = (1 - p) * 0.4;
          recognizedByOpacity = p * 0.4;
        } else if (currentProgress < 6.0) {
          const p = currentProgress - 5.0;
          recognizedByOpacity = (1 - p) * 0.4;
          aboutUsOpacity = p * 0.4;
        } else if (currentProgress < 11.0) { // During "ABOUT US" text animation
          recognizedByOpacity = 0;
          aboutUsOpacity = 0.4;
        } else if (currentProgress < 12.0) { // Transition from "Our Story" to "Contact US"
            const p = currentProgress - 11.0;
            aboutUsOpacity = (1 - p) * 0.4;
            contactUsOpacity = p * 0.4;
        } else { // After transition, "Contact US" stays visible
            recognizedByOpacity = 0;
            aboutUsOpacity = 0;
            contactUsOpacity = 0.4;
        }
        // +++ END: MODIFY WATERMARK OPACITY LOGIC +++

        const assemblyStart = 6.0;
        const assemblyDuration = 2.0;
        const assemblyEnd = assemblyStart + assemblyDuration;
        const videoFadeStart = assemblyEnd;
        const videoFadeDuration = 2.0;
        const videoFadeEnd = videoFadeStart + videoFadeDuration;
        const riseStart = videoFadeEnd;
        const riseDuration = 1.0;

        const assemblyProgress = clamp((currentProgress - assemblyStart) / assemblyDuration, 0, 1);
        const videoFadeProgress = clamp((currentProgress - videoFadeStart) / videoFadeDuration, 0, 1);
        const riseProgress = clamp((currentProgress - riseStart) / riseDuration, 0, 1);
        
        // +++ START: MODIFIED LOGIC FOR STICKY HEADER +++
        const isDisplayingAboutUsContent = riseProgress >= 1;
        // Start hiding the header as soon as the contact transition begins (progress > 11.0)
        // A small threshold like 11.01 ensures it doesn't flicker at the exact boundary.
        const isStartingContactUsTransition = currentProgress > 11.01;
        setShowStickyHeader(isDisplayingAboutUsContent && !isStartingContactUsTransition);
        // +++ END: MODIFIED LOGIC FOR STICKY HEADER +++

        let fillColor = "white", stroke = "none", textContainerMixBlendMode = "normal", textContainerBackground = "transparent", textContainerBoxShadow = "none", videoOpacity = 0, starfieldOpacity = 0, whiteOverlayOpacity = 0;

        if (assemblyProgress < 1) {
          fillColor = "white"; stroke = "none";
        } else if (videoFadeProgress < 1) {
          fillColor = "white"; stroke = "none";
          textContainerMixBlendMode = "multiply";
          textContainerBackground = "black";
          textContainerBoxShadow = "0 0 20px 20px black";
          videoOpacity = 1;
          whiteOverlayOpacity = 2 * Math.abs(videoFadeProgress - 0.5);
          const starFadeStartPoint = 0.9;
          const starFadeProgress = clamp((videoFadeProgress - starFadeStartPoint) / (1.0 - starFadeStartPoint), 0, 1);
          starfieldOpacity = 1 - starFadeProgress;
        } else {
          fillColor = "white"; stroke = "none";
          textContainerMixBlendMode = "normal";
          textContainerBackground = "transparent";
          textContainerBoxShadow = "none";
          videoOpacity = 0; whiteOverlayOpacity = 0; starfieldOpacity = 0;
        }

        const isBeforeRise = currentProgress < riseStart;
        const centerProgress = isBeforeRise ? assemblyProgress : 1;
        const initialY = 4;
        const centerTargetVh = -35;
        const topTargetVh = -68;
        const centerTargetPx = (centerTargetVh * window.innerHeight) / 100;
        const topTargetPx = (topTargetVh * window.innerHeight) / 100;

        const exitStart = riseStart + riseDuration; // 11.0
        const exitDuration = 0.1;
        const exitEnd = exitStart + exitDuration; // 11.5
        const exitProgress = clamp((currentProgress - exitStart) / exitDuration, 0, 1);

        let containerTranslateY;
        if (currentProgress < riseStart) { // Before 10.0: Assembly and centering
            containerTranslateY = THREE.MathUtils.lerp(initialY * 16, centerTargetPx, centerProgress);
        } else if (currentProgress < exitStart) { // Between 10.0 and 11.0: Rising to top
            containerTranslateY = THREE.MathUtils.lerp(centerTargetPx, topTargetPx, riseProgress);
        } else { // After 11.0: Exiting off-screen
            const exitTargetVh = -100; // Animate to a position off the top of the screen
            const exitTargetPx = (exitTargetVh * window.innerHeight) / 100;
            containerTranslateY = THREE.MathUtils.lerp(topTargetPx, exitTargetPx, exitProgress);
        }

        const initial_scale = 1.0;
        const final_scale = 0.45;
        const containerScale = isBeforeRise ? initial_scale : THREE.MathUtils.lerp(initial_scale, final_scale, riseProgress);
        
        let animatedTextOpacity;
        const fadeInProgress = clamp((currentProgress - assemblyStart) / (assemblyDuration / 2), 0, 1);
        if (currentProgress < assemblyStart) {
            animatedTextOpacity = 0;
        } else if (currentProgress < exitEnd) {
            animatedTextOpacity = fadeInProgress; 
        } else {
            animatedTextOpacity = 0; 
        }

        textContainerRef.current.style.setProperty("--about-us-container-transform", `translateX(-50%) translateY(${containerTranslateY}px) scale(${containerScale})`);
        textContainerRef.current.style.setProperty("--animated-text-opacity", `${animatedTextOpacity}`);

        if (textMaskContainerRef.current) {
          (textMaskContainerRef.current.style as any).mixBlendMode = textContainerMixBlendMode;
          textMaskContainerRef.current.style.background = textContainerBackground;
          textMaskContainerRef.current.style.boxShadow = textContainerBoxShadow;
        }

        textContainerRef.current.style.setProperty("--about-us-fill-color", fillColor);
        textContainerRef.current.style.setProperty("--about-us-stroke", stroke);
        
        if (videoRef.current) videoRef.current.style.opacity = `${videoOpacity}`;
        if (starfieldOverlayRef.current) starfieldOverlayRef.current.style.opacity = `${starfieldOpacity}`;
        if (whiteOverlayRef.current) whiteOverlayRef.current.style.opacity = `${whiteOverlayOpacity}`;

        const numLetters = aboutUsWord.replace(/ /g, "").length;
        const numSpaces = aboutUsWord.split(" ").length - 1;
        const spacePauseFactor = 2;
        const totalAnimationUnits = numLetters + numSpaces * spacePauseFactor;
        const unitDuration = 1.0 / totalAnimationUnits;
        const animationWindow = unitDuration * 5;
        const totalStaggerDuration = (numLetters - 1 + numSpaces * spacePauseFactor) * unitDuration;
        const compressionFactor = totalStaggerDuration > 0 ? (1.0 - animationWindow) / totalStaggerDuration : 1;
        let timeCursor = 0;

        lettersWithSpaces.forEach((char, index) => {
          if (char === " ") { timeCursor += unitDuration * spacePauseFactor; return; }
          const start = timeCursor * compressionFactor;
          const letterProgress = clamp((assemblyProgress - start) / animationWindow, 0, 1);
          const translateY = (1 - letterProgress) * 20;
          const scale = 0.5 + letterProgress * 0.5;
          if (textContainerRef.current) {
            textContainerRef.current.style.setProperty(`--about-us-letter-${index}-transform`, `translateY(${translateY}vh) scale(${scale})`);
          }
          timeCursor += unitDuration;
        });

        textContainerRef.current.style.setProperty("--persevex-opacity", `${clamp(persevexOpacity, 0, 0.4)}`);
        textContainerRef.current.style.setProperty("--courses-opacity", `${clamp(coursesOpacity, 0, 0.4)}`);
        textContainerRef.current.style.setProperty("--our-edge-opacity", `${clamp(ourEdgeOpacity, 0, 0.4)}`);
        textContainerRef.current.style.setProperty("--partners-opacity", `${clamp(partnersOpacity, 0, 0.4)}`);
        textContainerRef.current.style.setProperty("--trust-opacity", `${clamp(trustOpacity, 0, 0.4)}`);
        textContainerRef.current.style.setProperty("--recognized-by-opacity", `${clamp(recognizedByOpacity, 0, 0.4)}`);
        textContainerRef.current.style.setProperty("--about-us-opacity", `${clamp(aboutUsOpacity, 0, 0.4)}`);
        // +++ START: SET NEW CSS VARIABLE FOR OPACITY +++
        textContainerRef.current.style.setProperty("--contact-us-opacity", `${clamp(contactUsOpacity, 0, 0.4)}`);
        // +++ END: SET NEW CSS VARIABLE FOR OPACITY +++
      }
      animationFrameId = requestAnimationFrame(animationLoop);
    };
    animationLoop();
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [layout, lettersWithSpaces]);

  useEffect(() => {
    const handleScroll = () => {
      if (!layout || layout.coursesTop === 0) return;
      const currentScroll = window.scrollY;
      const viewportHeight = window.innerHeight;
      // +++ START: DESTRUCTURE NEW LAYOUT PROPERTY +++
      const { coursesTop, edgeTop, partnersTop, testimonialsTop, recognizedByTop, aboutUsTop, cardStackingTop, contactUsTop } = layout;
      // +++ END: DESTRUCTURE NEW LAYOUT PROPERTY +++

      const aboutUsWatermarkAnimStart = aboutUsTop - viewportHeight;
      const aboutUsWatermarkAnimDuration = viewportHeight * 6;
      let newWatermarkProgress = 0;
      
      // +++ START: MODIFY SCROLL PROGRESS LOGIC +++
      // This new block must be first as it checks for the highest scroll value.
      const contactUsTransitionStart = contactUsTop - viewportHeight;
      const contactUsTransitionDuration = viewportHeight;

      if (currentScroll >= contactUsTransitionStart) {
        const progress = clamp((currentScroll - contactUsTransitionStart) / contactUsTransitionDuration, 0, 1);
        newWatermarkProgress = 11 + progress; // Progress from 11 to 12
      } else if (currentScroll >= aboutUsWatermarkAnimStart) {
        const progress = clamp((currentScroll - aboutUsWatermarkAnimStart) / aboutUsWatermarkAnimDuration, 0, 1);
        newWatermarkProgress = 6 + progress * 5; // Progress from 6 to 11
      } else if (currentScroll >= recognizedByTop - viewportHeight) {
        // This was recognizedByTop before, but that caused a jump. Correcting to be smooth.
        const start = testimonialsTop - viewportHeight / 2;
        const duration = (recognizedByTop - viewportHeight) - start;
        newWatermarkProgress = 4 + Math.min(1, (currentScroll - start) / duration);
      } else if (currentScroll >= testimonialsTop - viewportHeight / 2) {
        newWatermarkProgress = 4.0;
      } else if (currentScroll >= testimonialsTop - viewportHeight) {
        newWatermarkProgress = 3 + Math.min(1, (currentScroll - (testimonialsTop - viewportHeight)) / (viewportHeight / 2));
      } else if (currentScroll >= partnersTop) {
        newWatermarkProgress = 2 + Math.min(1, (currentScroll - partnersTop) / (testimonialsTop - viewportHeight - partnersTop));
      } else if (currentScroll >= edgeTop - viewportHeight) {
        newWatermarkProgress = 1 + Math.min(1, (currentScroll - (edgeTop - viewportHeight)) / viewportHeight);
      } else if (currentScroll >= coursesTop - viewportHeight) {
        newWatermarkProgress = Math.min(1, (currentScroll - (coursesTop - viewportHeight)) / viewportHeight);
      }
      // +++ END: MODIFY SCROLL PROGRESS LOGIC +++

      targetProgressRef.current = newWatermarkProgress;
      
      if (heroWrapperRef.current) {
        const heroProgress = Math.min(1, currentScroll / (viewportHeight * 0.8));
        heroWrapperRef.current.style.opacity = `${1 - heroProgress}`;
        heroWrapperRef.current.style.transform = `translateY(${heroProgress * -250}px)`;
      }

      // --- NEW: Calculate and set progress for CoursesSection ---
      if (coursesSectionWrapperRef.current && coursesTop > 0) {
        const sectionEl = coursesSectionWrapperRef.current;
        const sectionHeight = sectionEl.offsetHeight;

        const coursesStartZone = coursesTop - viewportHeight * 0.8;
        const coursesEndZone = coursesTop + sectionHeight - viewportHeight;

        let newCoursesProgress = 0;
        if (currentScroll >= coursesStartZone && currentScroll <= coursesEndZone) {
          const totalZoneHeight = coursesEndZone - coursesStartZone;
          const progressInZone = currentScroll - coursesStartZone;
          newCoursesProgress = progressInZone / totalZoneHeight;
        } else if (currentScroll > coursesEndZone) {
          newCoursesProgress = 1;
        }

        coursesProgress.set(Math.max(0, Math.min(1, newCoursesProgress)));
      }

      setEdgeProgress(Math.min(1, Math.max(0, currentScroll - edgeTop) / (viewportHeight * NUM_CARDS)));
      setPartnersProgress(Math.min(1, Math.max(0, currentScroll - partnersTop) / (viewportHeight * 4)));
      setTestimonialProgress(Math.min(1, Math.max(0, (currentScroll - testimonialsTop) / ((testimonialsAnimationDurationVh / 100) * viewportHeight))));
      
      const aboutUsContentAnimStart = aboutUsTop + viewportHeight;
      const aboutUsContentAnimDuration = viewportHeight * 4;
      setAboutUsProgress(clamp((currentScroll - aboutUsContentAnimStart) / aboutUsContentAnimDuration, 0, 1));
      
       let newStackingProgress = 0;
      let newCascadingProgress = 0;

      if (cardStackingWrapperRef.current && cardStackingTop > 0) {
        const start = cardStackingTop;
        const vh = window.innerHeight / 100;

        // Define explicit scroll durations for each animation phase
        const stackingDuration = 100 * vh;   // Stacking animation occurs over 100vh of scrolling
        const cascadingDuration = 200 * vh;  // Cascading/FAQ animation occurs over the next 200vh
        
        // Define start points for each phase
        const stackingStart = start;
        const cascadeStart = stackingStart + stackingDuration;

        // --- Calculate new stacking progress ---
        newStackingProgress = clamp((currentScroll - stackingStart) / stackingDuration, 0, 1);

        // --- Calculate new cascading progress ---
        // The animations in AboutUsExtendedComp finish around a progress value of 4.0
        const CASCADING_MAX_PROGRESS = 4.0; 
        if (currentScroll > cascadeStart) {
          const progressWithinCascade = (currentScroll - cascadeStart) / cascadingDuration;
          newCascadingProgress = clamp(progressWithinCascade * CASCADING_MAX_PROGRESS, 0, CASCADING_MAX_PROGRESS);
        } else {
          newCascadingProgress = 0;
        }
      }
      
      setStackingProgress(newStackingProgress);
      setCascadingProgress(newCascadingProgress);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [layout, testimonialsAnimationDurationVh, coursesProgress]); // Add coursesProgress to dependency array

  const extendedCompProgress = clamp((aboutUsProgress - 0.7) / 0.3, 0, 1);

  return (
    <main>
     
      
      <div className="fixed top-0 left-0 w-full h-full z-0">
        <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
          <Suspense fallback={null}>
            <AnimationController watermarkProgressRef={watermarkProgressRef} />
          </Suspense>
        </Canvas>
      </div>
      
      <div
        ref={textContainerRef}
        className="fixed top-0 left-0 w-full h-full z-10 pointer-events-none overflow-hidden"
      >
        <h2 className="absolute bottom-0 left-1/2 z-[2] text-[24vw] md:text-[20vw] lg:text-[18rem] font-black uppercase text-transparent select-none leading-none" style={{ opacity: "var(--persevex-opacity)", WebkitTextStroke: "1px white", transform: "translateX(-50%) translateY(4rem)", }}>Persevex</h2>
        <h2 className="absolute bottom-0 left-1/2 z-[1] text-[24vw] md:text-[20vw] lg:text-[18rem] font-black uppercase text-transparent select-none leading-none" style={{ opacity: "var(--courses-opacity)", WebkitTextStroke: "1px white", transform: "translateX(-50%) translateY(4rem)", }}>Courses</h2>
        <h2 className="absolute bottom-0 left-1/2 z-[0] text-[24vw] md:text-[20vw] lg:text-[18rem] font-black uppercase text-transparent select-none leading-none" style={{ opacity: "var(--our-edge-opacity)", WebkitTextStroke: "1px white", transform: "translateX(-50%) translateY(4rem)", whiteSpace: "nowrap", }}>Our Edge</h2>
        <h2 className="absolute bottom-0 left-1/2 z-[-1] text-[24vw] md:text-[20vw] lg:text-[18rem] font-black uppercase text-transparent select-none leading-none" style={{ opacity: "var(--partners-opacity)", WebkitTextStroke: "1px white", transform: "translateX(-50%) translateY(4rem)", }}>Partners</h2>
        <h2 className="absolute bottom-0 left-1/2 z-[-2] text-[24vw] md:text-[20vw] lg:text-[18rem] font-black uppercase text-transparent select-none leading-none" style={{ opacity: "var(--trust-opacity)", WebkitTextStroke: "1px white", transform: "translateX(-50%) translateY(4rem)", }}>Trust</h2>
        <h2 className="absolute bottom-6 left-1/2 z-[-3] text-[20vw] md:text-[16vw] lg:text-[240px] font-black uppercase text-transparent select-none leading-none" style={{ opacity: "var(--recognized-by-opacity)", WebkitTextStroke: "1px white", transform: "translateX(-50%) translateY(4rem)", whiteSpace: "nowrap", }}>Validation</h2>
        <h2 className="absolute bottom-6 left-1/2 z-[-5] text-[20vw] md:text-[16vw] lg:text-[240px] font-black uppercase text-transparent select-none leading-none" style={{ opacity: "var(--about-us-opacity)", WebkitTextStroke: "1px white", transform: "translateX(-50%) translateY(4rem)", whiteSpace: "nowrap", }}>Our Story</h2>
        {/* +++ START: ADD NEW WATERMARK +++ */}
        <h2 className="absolute bottom-6 left-1/2 z-[-6] text-[20vw] md:text-[16vw] lg:text-[240px] font-black uppercase text-transparent select-none leading-none" style={{ opacity: "var(--contact-us-opacity)", WebkitTextStroke: "1px white", transform: "translateX(-50%) translateY(4rem)", whiteSpace: "nowrap", }}>Contact Us</h2>
        {/* +++ END: ADD NEW WATERMARK +++ */}
        
        <div
          className="absolute left-1/2 z-[-4]"
          style={
            {
              bottom: "1.5rem",
              transform: "var(--about-us-container-transform, translateX(-50%))",
              whiteSpace: "nowrap",
            } as React.CSSProperties
          }
        >
          <div
            className="relative"
            style={{
              opacity: "var(--animated-text-opacity, 1)",
              transition: 'opacity 0.3s ease-out',
              isolation: "isolate",
            }}
          >
            <div className="absolute inset-0 w-full h-full">
              <video ref={videoRef} autoPlay loop muted playsInline className="absolute top-0 left-0 w-full h-full object-cover" style={{ opacity: 0 }} >
                <source src="/videos/N2.mp4" type="video/mp4" />
              </video>
              <div ref={whiteOverlayRef} className="absolute inset-0 bg-white" style={{ opacity: 0 }}/>
            </div>
            <div ref={textMaskContainerRef} className="flex items-center justify-center space-x-1 md:space-x-2 w-full h-full">
              <AboutUsLetters letters={lettersWithSpaces} />
            </div>
            <div ref={starfieldOverlayRef} className="absolute inset-0 pointer-events-none" style={{ opacity: 0, overflow: "hidden" }} >
              <SimpleStars />
            </div>
          </div>
        </div>
      </div>
      
      <div className="relative z-20">
        <div ref={heroWrapperRef} className="sticky top-0 flex items-center justify-center h-screen pointer-events-none">
          <div className="w-full mr-74 mb-36 pointer-events-auto">
            <Hero />
          </div>
        </div>

        <div style={{ height: "10vh" }} />
        <div ref={coursesSectionWrapperRef}>
          {/* Pass the calculated progress down to the CoursesSection */}
          <CoursesSection progress={coursesProgress} />
        </div>
        <div style={{ height: "50vh" }} />
        <div ref={ourEdgeSectionWrapperRef} style={{ height: `${(NUM_CARDS + 1) * 100}vh` }} >
          <OurEdgeSection progress={edgeProgress} />
        </div>
        <div ref={partnersSectionWrapperRef} style={{ height: "400vh", marginTop: "-50vh" }}>
          <PartnersSection progress={partnersProgress} />
        </div>

        <div style={{ height: "10vh" }} />
        <div ref={testimonialsSectionWrapperRef} style={{ height: `${testimonialsSectionHeightVh}vh` }}>
          <div className="sticky top-0 flex h-screen items-center justify-center">
            <AnimatedTestimonials testimonials={formattedTestimonials} progress={testimonialProgress} />
          </div>
        </div>
        <div ref={recognizedBySectionWrapperRef} style={{ height: "300vh" }}>
          <div className="sticky top-0 flex h-screen items-center justify-center">
            <RecognizedBySection />
          </div>
        </div>
        <div ref={aboutUsSectionWrapperRef} style={{ height: "545vh" }}>
         
        </div>
         <div  ref={cardStackingWrapperRef} style={{ height: "400vh" }}>
          <div className="sticky top-0 min-h-screen flex flex-col items-center justify-start  md:pt-24">
            <div
              className="w-full text-white text-sm"
              style={{ opacity: extendedCompProgress }}
            >
              <AboutUsExtendedComp
                stackingProgress={stackingProgress}
                cascadingProgress={cascadingProgress}
              />
            </div>
          </div>
        </div>

        {/* +++ START: ADD NEW SECTION TO THE PAGE +++ */}
        <div ref={contactUsSectionWrapperRef} style={{ height: "100vh" }}>
          <ContactUsSection />
        </div>
        {/* +++ END: ADD NEW SECTION TO THE PAGE +++ */}
      </div>
    </main>
  );
};
export default LandingPage;