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
import StarField from "./StarField";
import DustPlane from "./DustPlane";
import Hero from "./Hero";
import CoursesSection from "./CoursesSection";
import OurEdgeSection from "./OurEdgeSection";
// No change to this import, it's just referencing the component defined above
import PartnersSection from "./PartnersSection"; 
import RecognizedBySection from "./RecognizedBySection";
import AboutUsSection from "./AboutUs";
import SimpleStars from "./SimpleStars";
import AboutUsExtendedComp from "./AboutUsExtendedComp";
import { useScroll } from "../contexts/scrollContext";

const NUM_CARDS = 6;
const clamp = (num: number, min: number, max: number): number =>
  Math.min(Math.max(num, min), max);

interface DustMaterial extends THREE.ShaderMaterial {
  uniforms: { uOpacity: { value: number } };
}
interface AnimationControllerProps {
  watermarkProgressRef: MutableRefObject<number>;
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

const StickyHeader: FC<{ show: boolean }> = ({ show }) => (
  <div
    className="fixed top-0 left-0 w-full px-4 md:px-8 lg:px-16 py-6 flex items-center justify-between z-50 pointer-events-none"
    style={{
      opacity: show ? 1 : 0,
      transition: "opacity 0.5s ease-in-out",
    }}
  >
    <div className="pointer-events-auto">
      <h2
        className="text-white text-xl md:text-2xl font-black"
        style={{ fontFamily: "serif" }}
      >
        ABOUT US
      </h2>
    </div>
  </div>
);

const LandingPage: FC = () => {
  const { layout, setLayout, setSectionRefs } = useScroll();

  const [headerProgress, setHeaderProgress] = useState<number>(0);
  const [showStickyHeader, setShowStickyHeader] = useState<boolean>(false);
  const watermarkProgressRef = useRef<number>(0);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const heroWrapperRef = useRef<HTMLDivElement>(null);
  const coursesSectionWrapperRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
  const ourEdgeSectionWrapperRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
  const partnersSectionWrapperRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
  const recognizedBySectionWrapperRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
  const aboutUsSectionWrapperRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
  const cardStackingWrapperRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
  const videoRef = useRef<HTMLVideoElement>(null);
  const starfieldOverlayRef = useRef<HTMLDivElement>(null);
  const whiteOverlayRef = useRef<HTMLDivElement>(null);
  const textMaskContainerRef = useRef<HTMLDivElement>(null);
  const [edgeProgress, setEdgeProgress] = useState<number>(0);
  const [partnersProgress, setPartnersProgress] = useState<number>(0);
  const [aboutUsProgress, setAboutUsProgress] = useState<number>(0);
  const [stackingProgress, setStackingProgress] = useState<number>(0);
  const [cascadingProgress, setCascadingProgress] = useState<number>(0);
  const aboutUsWord = "ABOUT US";
  const lettersWithSpaces = useMemo(() => aboutUsWord.split(""), []);


  useEffect(() => {
    const calculateLayout = () => {
      if (
        coursesSectionWrapperRef.current &&
        ourEdgeSectionWrapperRef.current &&
        partnersSectionWrapperRef.current &&
        recognizedBySectionWrapperRef.current &&
        aboutUsSectionWrapperRef.current &&
        cardStackingWrapperRef.current
      ) {
        setLayout({
          coursesTop: coursesSectionWrapperRef.current.offsetTop,
          edgeTop: ourEdgeSectionWrapperRef.current.offsetTop,
          partnersTop: partnersSectionWrapperRef.current.offsetTop,
          testimonialsTop: 0,
          recognizedByTop: recognizedBySectionWrapperRef.current.offsetTop,
          aboutUsTop: aboutUsSectionWrapperRef.current.offsetTop,
          cardStackingTop: cardStackingWrapperRef.current.offsetTop,
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
      recognizedBy: recognizedBySectionWrapperRef,
      aboutUs: aboutUsSectionWrapperRef,
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
        let persevexOpacity = 0, coursesOpacity = 0, ourEdgeOpacity = 0, partnersOpacity = 0, recognizedByOpacity = 0, aboutUsOpacity = 0;

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
        } else if (currentProgress < 4.0) { // Partners -> RecognizedBy
          const p = currentProgress - 3.0;
          partnersOpacity = (1 - p) * 0.4;
          recognizedByOpacity = p * 0.4;
        } else if (currentProgress < 5.0) { // RecognizedBy -> AboutUs
          const p = currentProgress - 4.0;
          recognizedByOpacity = (1 - p) * 0.4;
          aboutUsOpacity = p * 0.4;
        } else { // Settled on AboutUs
          recognizedByOpacity = 0;
          aboutUsOpacity = 0.4;
        }

        const assemblyStart = 5.0;
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
        
        setShowStickyHeader(riseProgress >= 1);

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

        const y_pos_before_rise = THREE.MathUtils.lerp(initialY * 16, centerTargetPx, centerProgress);
        const y_pos_after_rise_starts = THREE.MathUtils.lerp(centerTargetPx, topTargetPx, riseProgress);
        const containerTranslateY = isBeforeRise ? y_pos_before_rise : y_pos_after_rise_starts;

        const initial_scale = 1.0;
        const final_scale = 0.45;
        const containerScale = isBeforeRise ? initial_scale : THREE.MathUtils.lerp(initial_scale, final_scale, riseProgress);
        const animatedTextOpacity = riseProgress >= 1 ? 0 : 1;

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
        textContainerRef.current.style.setProperty("--recognized-by-opacity", `${clamp(recognizedByOpacity, 0, 0.4)}`);
        textContainerRef.current.style.setProperty("--about-us-opacity", `${clamp(aboutUsOpacity, 0, 0.4)}`);
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
      const { coursesTop, edgeTop, partnersTop, recognizedByTop, aboutUsTop, cardStackingTop } = layout;

      const aboutUsWatermarkAnimStart = aboutUsTop - viewportHeight;
      const aboutUsWatermarkAnimDuration = viewportHeight * 6;
      let newWatermarkProgress = 0;
      
      if (currentScroll >= aboutUsWatermarkAnimStart) {
        const progress = clamp((currentScroll - aboutUsWatermarkAnimStart) / aboutUsWatermarkAnimDuration, 0, 1);
        newWatermarkProgress = 5 + progress * 5;
      } else if (currentScroll >= recognizedByTop - viewportHeight) {
        newWatermarkProgress = 4 + Math.min(1, (currentScroll - (recognizedByTop - viewportHeight)) / viewportHeight);
      } else if (currentScroll >= partnersTop) {
        const duration = (recognizedByTop - viewportHeight) - partnersTop;
        newWatermarkProgress = 2 + Math.min(1, (currentScroll - partnersTop) / duration) * 2;
      } else if (currentScroll >= edgeTop - viewportHeight) {
        newWatermarkProgress = 1 + Math.min(1, (currentScroll - (edgeTop - viewportHeight)) / viewportHeight);
      } else if (currentScroll >= coursesTop - viewportHeight) {
        newWatermarkProgress = Math.min(1, (currentScroll - (coursesTop - viewportHeight)) / viewportHeight);
      }

      targetProgressRef.current = newWatermarkProgress;
      
      if (heroWrapperRef.current) {
        const heroProgress = Math.min(1, currentScroll / (viewportHeight * 0.8));
        heroWrapperRef.current.style.opacity = `${1 - heroProgress}`;
        heroWrapperRef.current.style.transform = `translateY(${heroProgress * -250}px)`;
      }

      setEdgeProgress(Math.min(1, Math.max(0, currentScroll - edgeTop) / (viewportHeight * NUM_CARDS)));
      setPartnersProgress(Math.min(1, Math.max(0, currentScroll - partnersTop) / (viewportHeight * 4)));
      
      const aboutUsContentAnimStart = aboutUsTop + viewportHeight;
      const aboutUsContentAnimDuration = viewportHeight * 4;
      setAboutUsProgress(clamp((currentScroll - aboutUsContentAnimStart) / aboutUsContentAnimDuration, 0, 1));
      
      let newStackingProgress = 0;
      let newCascadingProgress = 0;

      if (cardStackingWrapperRef.current && cardStackingTop > 0) {
        const start = cardStackingTop;
        const totalDuration = cardStackingWrapperRef.current.offsetHeight - viewportHeight;
        
        const gapDuration = totalDuration * 0.05;
        const stackingDuration = totalDuration * 0.09;
        const cascadeDuration = totalDuration * 0.09;
        
        const stackingStart = start + gapDuration;
        const cascadeStart = stackingStart + stackingDuration;
        
        if (currentScroll < stackingStart) {
          newStackingProgress = 0;
        } 
        else if (currentScroll < cascadeStart) {
          newStackingProgress = clamp((currentScroll - stackingStart) / stackingDuration, 0, 1);
        }
        else {
          newStackingProgress = 1;
        }

        if (currentScroll > cascadeStart) {
          newCascadingProgress = (currentScroll - cascadeStart) / cascadeDuration;
        }
      }
      
      setStackingProgress(newStackingProgress);
      setCascadingProgress(newCascadingProgress);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [layout]);

  const extendedCompProgress = clamp((aboutUsProgress - 0.7) / 0.3, 0, 1);

  return (
    <main>
      <StickyHeader show={showStickyHeader} />
      
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
        <h2 className="absolute bottom-6 left-1/2 z-[-2] text-[20vw] md:text-[16vw] lg:text-[240px] font-black uppercase text-transparent select-none leading-none" style={{ opacity: "var(--recognized-by-opacity)", WebkitTextStroke: "1px white", transform: "translateX(-50%) translateY(4rem)", whiteSpace: "nowrap", }}>Validation</h2>
        <h2 className="absolute bottom-6 left-1/2 z-[-4] text-[20vw] md:text-[16vw] lg:text-[240px] font-black uppercase text-transparent select-none leading-none" style={{ opacity: "var(--about-us-opacity)", WebkitTextStroke: "1px white", transform: "translateX(-50%) translateY(4rem)", whiteSpace: "nowrap", }}>Our Story</h2>
        
        <div
          className="absolute left-1/2 z-[-3]"
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
              opacity: "calc(var(--about-us-opacity) * 2.5 * var(--animated-text-opacity, 1))",
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
          <CoursesSection />
        </div>
        <div style={{ height: "50vh" }} />
        <div ref={ourEdgeSectionWrapperRef} style={{ height: `${(NUM_CARDS + 1) * 100}vh` }} >
          <OurEdgeSection progress={edgeProgress} />
        </div>
        <div ref={partnersSectionWrapperRef} style={{ height: "300vh", marginTop: "-50vh" }}>
          <PartnersSection progress={partnersProgress} />
        </div>

        <div style={{ height: "10vh" }} />
        <div ref={recognizedBySectionWrapperRef} style={{ height: "300vh" }}>
          <div className="sticky top-0 flex h-screen items-center justify-center">
            <RecognizedBySection />
          </div>
        </div>
        <div ref={aboutUsSectionWrapperRef} style={{ height: "545vh" }}>
         
        </div>
         <div  ref={cardStackingWrapperRef} style={{ height: "1150vh" }}>
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
      </div>
    </main>
  );
};
export default LandingPage;