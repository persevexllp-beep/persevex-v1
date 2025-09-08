// LandingPage.tsx

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
import PolicySection from "./Policy";
import FooterSection from "./FooterSection";
import { managementCourses, technicalCourses } from "../constants/courseConstant";

const NUM_CARDS = 6;
const clamp = (num: number, min: number, max: number): number =>
  Math.min(Math.max(num, min), max);

const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return isMobile;
};

interface Testimonial {
  quote: string;
  name: string;
  designation: string;
  src: string;
  bgImage: string;
  bgPosition: string
}

const AboutUsLetters: FC<{ letters: string[] }> = ({ letters }) => (
  <>
    {letters.map((letter, index) => {
      if (letter === " ") return <div key={index} className="w-8 md:w-12" />;
      return (
        <h2
          key={index}
          className="relative text-[16vw] md:text-[16vw] lg:text-[200px] font-black leading-none"
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

interface DustMaterial extends THREE.ShaderMaterial {
  uniforms: { uOpacity: { value: number } };
}

const DustPlaneController: FC<{ watermarkProgressRef: MutableRefObject<number> }> = ({ watermarkProgressRef }) => {
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
      // --- CORRECTED LOGIC START ---
      let dustOpacity = 0;
      if (currentProgress <= 1.0) { // Fully visible during Hero and Courses
        dustOpacity = 1.0;
      } else if (currentProgress > 1.0 && currentProgress < 2.0) { // Fade out during the transition TO Our Edge
        dustOpacity = 1.0 - (currentProgress - 1.0);
      } else if (currentProgress >= 12.0 && currentProgress < 13.0) { // Fade in for Policy
        dustOpacity = currentProgress - 12.0;
      } else if (currentProgress >= 13.0) { // Visible for Policy/Footer
        dustOpacity = 1.0;
      }
      // --- CORRECTED LOGIC END ---

      const material = dustPlaneRef.current.material as DustMaterial;
      if (material.uniforms.uOpacity) {
        material.uniforms.uOpacity.value = clamp(dustOpacity, 0, 1);
      }
    }
  });

  return <DustPlane ref={dustPlaneRef} renderOrder={-2} />;
};


const LandingPage: FC = () => {
  const { layout, setLayout, setSectionRefs } = useScroll();
  const isMobile = useIsMobile();
  const coursesProgress = useMotionValue(0);
  const [headerProgress, setHeaderProgress] = useState<number>(0);
  const [showStickyHeader, setShowStickyHeader] = useState<boolean>(false);
  const watermarkProgressRef = useRef<number>(0);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const heroWrapperRef = useRef<HTMLDivElement>(null);
  const saturnWrapperRef = useRef<HTMLDivElement>(null);
  const coursesSectionWrapperRef = useRef<HTMLDivElement>(
    null
  ) as React.RefObject<HTMLDivElement>;
  const ourEdgeSectionWrapperRef = useRef<HTMLDivElement>(
    null
  ) as React.RefObject<HTMLDivElement>;
  const partnersSectionWrapperRef = useRef<HTMLDivElement>(
    null
  ) as React.RefObject<HTMLDivElement>;
  const testimonialsSectionWrapperRef = useRef<HTMLDivElement>(
    null
  ) as React.RefObject<HTMLDivElement>;
  const recognizedBySectionWrapperRef = useRef<HTMLDivElement>(
    null
  ) as React.RefObject<HTMLDivElement>;
  const aboutUsSectionWrapperRef = useRef<HTMLDivElement>(
    null
  ) as React.RefObject<HTMLDivElement>;
  const cardStackingWrapperRef = useRef<HTMLDivElement>(
    null
  ) as React.RefObject<HTMLDivElement>;
  const contactUsSectionWrapperRef = useRef<HTMLDivElement>(
    null
  ) as React.RefObject<HTMLDivElement>;
  const policySectionWrapperRef = useRef<HTMLDivElement>(
    null
  ) as React.RefObject<HTMLDivElement>;
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
  const [contactUsProgress, setContactUsProgress] = useState<number>(0);
  const footerSectionWrapperRef = useRef<HTMLDivElement>(
    null
  ) as React.RefObject<HTMLDivElement>;
  const contentWrapperRef = useRef<HTMLDivElement>(null);
  const fadeOverlayRef = useRef<HTMLDivElement>(null);

  // Refs for smoothing partners progress
  const targetPartnersProgressRef = useRef(0);
  const smoothedPartnersProgressRef = useRef(0);

  const formattedTestimonials: Testimonial[] = useMemo(
  () =>
    testimonialsData.map((t) => ({
      quote: t.quote,
      name: t.name,
      designation: t.title,
      src: t.image,
      bgImage: t.bgImage,
      bgPosition: t.bgPosition
      
    })),
  []
);

  const testimonialsAnimationDurationVh = 300;
  const testimonialsSectionHeightVh = testimonialsAnimationDurationVh + 100;

  const managementUnits = managementCourses.length;
  const technicalUnits = technicalCourses.length;
  const DWELL_TIME_UNITS = 1;
  const totalUnits = managementUnits + DWELL_TIME_UNITS + technicalUnits;
  const coursesSectionHeight = 120 + totalUnits * 70;

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
        contactUsSectionWrapperRef.current &&
        footerSectionWrapperRef.current
      ) {
        setLayout({
          coursesTop: coursesSectionWrapperRef.current.offsetTop,
          edgeTop: ourEdgeSectionWrapperRef.current.offsetTop,
          partnersTop: partnersSectionWrapperRef.current.offsetTop,
          testimonialsTop: testimonialsSectionWrapperRef.current.offsetTop,
          recognizedByTop: recognizedBySectionWrapperRef.current.offsetTop,
          aboutUsTop: aboutUsSectionWrapperRef.current.offsetTop,
          cardStackingTop: cardStackingWrapperRef.current.offsetTop,
          contactUsTop: contactUsSectionWrapperRef.current.offsetTop,
          policyTop: policySectionWrapperRef.current.offsetTop,
          footerTop: footerSectionWrapperRef.current.offsetTop,
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
  }, [setLayout, isMobile]);

  useEffect(() => {
    setSectionRefs({
      courses: coursesSectionWrapperRef,
      ourEdge: ourEdgeSectionWrapperRef,
      partners: partnersSectionWrapperRef,
      testimonials: testimonialsSectionWrapperRef,
      recognizedBy: recognizedBySectionWrapperRef,
      aboutUs: aboutUsSectionWrapperRef,
      contactUs: contactUsSectionWrapperRef,
      policy: policySectionWrapperRef,
      footer: footerSectionWrapperRef,
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
      
      // Smooth partners progress
      smoothedPartnersProgressRef.current = THREE.MathUtils.lerp(
        smoothedPartnersProgressRef.current,
        targetPartnersProgressRef.current,
        0.075
      );
      setPartnersProgress(smoothedPartnersProgressRef.current);

      const currentProgress = smoothedProgressRef.current;
      setHeaderProgress(currentProgress);
      if (textContainerRef.current && window.innerHeight) {
        let persevexOpacity = 0,
          coursesOpacity = 0,
          ourEdgeOpacity = 0,
          partnersOpacity = 0,
          trustOpacity = 0,
          recognizedByOpacity = 0,
          aboutUsOpacity = 0,
          contactUsOpacity = 0,
          policyOpacity = 0,
          footerOpacity = 0;

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
        } else if (currentProgress < 11.0) {
          recognizedByOpacity = 0;
          aboutUsOpacity = 0.4;
        } else if (currentProgress < 12.0) {
          const p = currentProgress - 11.0;
          aboutUsOpacity = (1 - p) * 0.4;
          contactUsOpacity = p * 0.4;
        } else if (currentProgress < 13.0) {
          const p = currentProgress - 12.0;
          contactUsOpacity = (1 - p) * 0.4;
          policyOpacity = p * 0.4;
        } else if (currentProgress < 14.0) {
          const p = currentProgress - 13.0;
          policyOpacity = (1 - p) * 0.4;
          footerOpacity = p * 1.0;
        } else {
          policyOpacity = 0;
          footerOpacity = 1.0;
        }

        const assemblyStart = 6.0;
        const assemblyDuration = 2.0;
        const assemblyEnd = assemblyStart + assemblyDuration;
        const videoFadeStart = assemblyEnd;
        const videoFadeDuration = 2.0;
        const videoFadeEnd = videoFadeStart + videoFadeDuration;
        const riseStart = videoFadeEnd;
        const riseDuration = 1.0;

        const assemblyProgress = clamp(
          (currentProgress - assemblyStart) / assemblyDuration,
          0,
          1
        );
        const videoFadeProgress = clamp(
          (currentProgress - videoFadeStart) / videoFadeDuration,
          0,
          1
        );
        const riseProgress = clamp(
          (currentProgress - riseStart) / riseDuration,
          0,
          1
        );

        const isDisplayingAboutUsContent = riseProgress >= 1;
        const isStartingContactUsTransition = currentProgress > 11.01;
        setShowStickyHeader(
          isDisplayingAboutUsContent && !isStartingContactUsTransition
        );

        if (!isMobile) {
            let fillColor = "white",
            stroke = "none",
            textContainerMixBlendMode = "normal",
            textContainerBackground = "transparent",
            textContainerBoxShadow = "none",
            videoOpacity = 0,
            starfieldOpacity = 0,
            whiteOverlayOpacity = 0;

            if (assemblyProgress < 1) {
            fillColor = "white";
            stroke = "none";
            } else if (videoFadeProgress < 1) {
            fillColor = "white";
            stroke = "none";
            textContainerMixBlendMode = "multiply";
            textContainerBackground = "black";
            textContainerBoxShadow = "0 0 20px 20px black";
            videoOpacity = 1;
            whiteOverlayOpacity = 2 * Math.abs(videoFadeProgress - 0.5);
            const starFadeStartPoint = 0.9;
            const starFadeProgress = clamp(
                (videoFadeProgress - starFadeStartPoint) /
                (1.0 - starFadeStartPoint),
                0,
                1
            );
            starfieldOpacity = 1 - starFadeProgress;
            } else {
            fillColor = "white";
            stroke = "none";
            textContainerMixBlendMode = "normal";
            textContainerBackground = "transparent";
            textContainerBoxShadow = "none";
            videoOpacity = 0;
            whiteOverlayOpacity = 0;
            starfieldOpacity = 0;
            }

            const isBeforeRise = currentProgress < riseStart;
            const centerProgress = isBeforeRise ? assemblyProgress : 1;
            const initialY = 4;
            const centerTargetVh = -35;
            const topTargetVh = -68;
            const centerTargetPx = (centerTargetVh * window.innerHeight) / 100;
            const topTargetPx = (topTargetVh * window.innerHeight) / 100;

            const exitStart = riseStart + riseDuration;
            const exitDuration = 0.1;
            const exitEnd = exitStart + exitDuration;
            const exitProgress = clamp(
            (currentProgress - exitStart) / exitDuration,
            0,
            1
            );

            let containerTranslateY;
            if (currentProgress < riseStart) {
            containerTranslateY = THREE.MathUtils.lerp(
                initialY * 16,
                centerTargetPx,
                centerProgress
            );
            } else if (currentProgress < exitStart) {
            containerTranslateY = THREE.MathUtils.lerp(
                centerTargetPx,
                topTargetPx,
                riseProgress
            );
            } else {
            const exitTargetVh = -100;
            const exitTargetPx = (exitTargetVh * window.innerHeight) / 100;
            containerTranslateY = THREE.MathUtils.lerp(
                topTargetPx,
                exitTargetPx,
                exitProgress
            );
            }

            const initial_scale = 1.0;
            const final_scale = 0.45;
            const containerScale = isBeforeRise
            ? initial_scale
            : THREE.MathUtils.lerp(initial_scale, final_scale, riseProgress);

            const fadeInProgress = clamp(
            (currentProgress - assemblyStart) / (assemblyDuration / 2),
            0,
            1
            );
            let animatedTextOpacity;
            if (currentProgress < assemblyStart) {
                animatedTextOpacity = 0;
            } else {
                const fadeOutOpacity = (1 - clamp((currentProgress - 11.0) / 0.5, 0, 1));
                animatedTextOpacity = Math.min(fadeInProgress, fadeOutOpacity);
            }
            
            textContainerRef.current.style.setProperty("--animated-text-opacity", `${animatedTextOpacity}`);
            textContainerRef.current.style.setProperty("--about-us-container-transform", `translateX(-50%) translateY(${containerTranslateY}px) scale(${containerScale})`);
            
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
                if (char === " ") {
                    timeCursor += unitDuration * spacePauseFactor;
                    return;
                }
                const start = timeCursor * compressionFactor;
                const letterProgress = clamp(
                    (assemblyProgress - start) / animationWindow, 0, 1
                );
                const translateY = (1 - letterProgress) * 20;
                const scale = 0.5 + letterProgress * 0.5;
                if (textContainerRef.current) {
                    textContainerRef.current.style.setProperty(`--about-us-letter-${index}-transform`, `translateY(${translateY}vh) scale(${scale})`);
                }
                timeCursor += unitDuration;
            });

        } else {
            // Mobile: Hide all animated elements
            if (videoRef.current) videoRef.current.style.opacity = '0';
            if (starfieldOverlayRef.current) starfieldOverlayRef.current.style.opacity = '0';
            if (whiteOverlayRef.current) whiteOverlayRef.current.style.opacity = '0';
            if(textContainerRef.current) textContainerRef.current.style.setProperty("--animated-text-opacity", "0");
            aboutUsOpacity = 0; // Hide watermark
        }

        if(textContainerRef.current){
            textContainerRef.current.style.setProperty("--persevex-opacity", `${clamp(persevexOpacity, 0, 0.4)}`);
            textContainerRef.current.style.setProperty("--courses-opacity", `${clamp(coursesOpacity, 0, 0.4)}`);
            textContainerRef.current.style.setProperty("--our-edge-opacity", `${clamp(ourEdgeOpacity, 0, 0.4)}`);
            textContainerRef.current.style.setProperty("--partners-opacity", `${clamp(partnersOpacity, 0, 0.4)}`);
            textContainerRef.current.style.setProperty("--trust-opacity", `${clamp(trustOpacity, 0, 0.4)}`);
            textContainerRef.current.style.setProperty("--recognized-by-opacity", `${clamp(recognizedByOpacity, 0, 0.4)}`);
            textContainerRef.current.style.setProperty("--about-us-opacity", `${clamp(aboutUsOpacity, 0, 0.4)}`);
            textContainerRef.current.style.setProperty("--contact-us-opacity", `${clamp(contactUsOpacity, 0, 0.4)}`);
            textContainerRef.current.style.setProperty("--policy-opacity", `${clamp(policyOpacity, 0, 0.4)}`);
            textContainerRef.current.style.setProperty("--footer-opacity", `${clamp(footerOpacity, 0, 1.0)}`);
        }

        const inAboutUsContentSection = currentProgress >= 10.0 && currentProgress < 11.0;
        
        if (contentWrapperRef.current) {
            if (isMobile && inAboutUsContentSection) {
                contentWrapperRef.current.style.zIndex = '5';
            } else {
                contentWrapperRef.current.style.zIndex = '20';
            }
        }
        
        if (fadeOverlayRef.current) {
            if (isMobile && inAboutUsContentSection) {
                fadeOverlayRef.current.style.opacity = '1';
            } else {
                fadeOverlayRef.current.style.opacity = '0';
            }
        }
      }
      animationFrameId = requestAnimationFrame(animationLoop);
    };
    animationLoop();
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [layout, lettersWithSpaces, isMobile]);

  useEffect(() => {
    const handleScroll = () => {
      if (!layout || !layout.footerTop) return;
      const currentScroll = window.scrollY;
      const viewportHeight = window.innerHeight;
      const {
        coursesTop,
        edgeTop,
        partnersTop,
        testimonialsTop,
        recognizedByTop,
        aboutUsTop,
        cardStackingTop,
        contactUsTop,
        policyTop,
        footerTop,
      } = layout;

      const aboutUsWatermarkAnimStart = aboutUsTop - viewportHeight;
      const aboutUsWatermarkAnimDuration = viewportHeight * 6;
      let newWatermarkProgress = 0;

      const footerTransitionStart = footerTop - viewportHeight;
      const footerTransitionDuration = viewportHeight;
      const policyTransitionStart = policyTop - viewportHeight;
      const policyTransitionDuration = viewportHeight;
      const contactUsTransitionStart = contactUsTop - viewportHeight;
      const contactUsTransitionDuration = viewportHeight;

      const validationToStoryTransitionDuration = viewportHeight;

      if (currentScroll >= footerTransitionStart) {
        const progress = clamp(
          (currentScroll - footerTransitionStart) / footerTransitionDuration,
          0,
          1
        );
        newWatermarkProgress = 13 + progress;
      } else if (currentScroll >= policyTransitionStart) {
        const progress = clamp(
          (currentScroll - policyTransitionStart) / policyTransitionDuration,
          0,
          1
        );
        newWatermarkProgress = 12 + progress;
      } else if (currentScroll >= contactUsTransitionStart) {
        const progress = clamp(
          (currentScroll - contactUsTransitionStart) /
            contactUsTransitionDuration,
          0,
          1
        );
        newWatermarkProgress = 11 + progress;
      } else if (
        currentScroll >=
        aboutUsWatermarkAnimStart + validationToStoryTransitionDuration
      ) {
        const animStart =
          aboutUsWatermarkAnimStart + validationToStoryTransitionDuration;

        if (isMobile) {
            const mobileAnimDuration = viewportHeight * 2.5;
            const progress = clamp((currentScroll - animStart) / mobileAnimDuration, 0, 1);
            newWatermarkProgress = 6.0 + progress * 5;
        } else {
            const animDuration =
              aboutUsWatermarkAnimDuration - validationToStoryTransitionDuration;
            const progress = clamp((currentScroll - animStart) / animDuration, 0, 1);
            newWatermarkProgress = 6.0 + progress * 5;
        }

      } else if (currentScroll >= aboutUsWatermarkAnimStart) {
        const animStart = aboutUsWatermarkAnimStart;
        const progress = clamp(
          (currentScroll - animStart) / validationToStoryTransitionDuration,
          0,
          1
        );
        newWatermarkProgress = 5.0 + progress;
      } else if (currentScroll >= recognizedByTop - viewportHeight / 2) {
        newWatermarkProgress = 5.0;
      } else if (currentScroll >= recognizedByTop - viewportHeight) {
        const start = recognizedByTop - viewportHeight;
        const duration = viewportHeight / 2;
        const progress = clamp((currentScroll - start) / duration, 0, 1);
        newWatermarkProgress = 4.0 + progress;
      } else if (currentScroll >= testimonialsTop - viewportHeight / 2) {
        newWatermarkProgress = 4.0;
      } else if (currentScroll >= testimonialsTop - viewportHeight) {
        const transitionDuration = viewportHeight / 2;
        newWatermarkProgress =
          3 +
          Math.min(
            1,
            (currentScroll - (testimonialsTop - viewportHeight)) /
              transitionDuration
          );
      } else if (currentScroll >= partnersTop) {
        newWatermarkProgress =
          2 +
          Math.min(
            1,
            (currentScroll - partnersTop) /
              (testimonialsTop - viewportHeight - partnersTop)
          );
      } else if (currentScroll >= edgeTop - viewportHeight) {
        newWatermarkProgress =
          1 +
          Math.min(
            1,
            (currentScroll - (edgeTop - viewportHeight)) / viewportHeight
          );
      } else if (currentScroll >= coursesTop - viewportHeight) {
        newWatermarkProgress = Math.min(
          1,
          (currentScroll - (coursesTop - viewportHeight)) / viewportHeight
        );
      }

      targetProgressRef.current = newWatermarkProgress;
      
      const heroProgress = Math.min(
        1,
        currentScroll / (viewportHeight * 0.8)
      );

      if (heroWrapperRef.current) {
        heroWrapperRef.current.style.opacity = `${1 - heroProgress}`;
        heroWrapperRef.current.style.transform = `translateY(${
          heroProgress * -250
        }px)`;
      }

      if (saturnWrapperRef.current) {
        saturnWrapperRef.current.style.opacity = `${1 - heroProgress}`;
      }


      if (coursesSectionWrapperRef.current && coursesTop > 0) {
        const sectionEl = coursesSectionWrapperRef.current;
        const sectionHeight = sectionEl.offsetHeight;

        const coursesStartZone = coursesTop - viewportHeight * 0.8;
        const coursesEndZone = coursesTop + sectionHeight - viewportHeight;

        let newCoursesProgress = 0;
        if (
          currentScroll >= coursesStartZone &&
          currentScroll <= coursesEndZone
        ) {
          const totalZoneHeight = coursesEndZone - coursesStartZone;
          const progressInZone = currentScroll - coursesStartZone;
          newCoursesProgress = progressInZone / totalZoneHeight;
        } else if (currentScroll > coursesEndZone) {
          newCoursesProgress = 1;
        }

        coursesProgress.set(Math.max(0, Math.min(1, newCoursesProgress)));
      }

      const edgeAnimationDurationFactor = isMobile ? 3 : NUM_CARDS;
      setEdgeProgress(
        Math.min(
          1,
          Math.max(0, currentScroll - edgeTop) / (viewportHeight * edgeAnimationDurationFactor)
        )
      );
      
      // Update the target ref for partners progress instead of state
      if (partnersSectionWrapperRef.current && partnersTop > 0) {
        const partnersSectionHeight = partnersSectionWrapperRef.current.offsetHeight;
        const animationDuration = isMobile ? partnersSectionHeight * 0.75 : partnersSectionHeight / 2;
        const progress = clamp( (currentScroll - partnersTop) / animationDuration, 0, 1);
        targetPartnersProgressRef.current = progress;
      }

      setTestimonialProgress(
        Math.min(
          1,
          Math.max(
            0,
            (currentScroll - testimonialsTop) /
              ((testimonialsAnimationDurationVh / 100) * viewportHeight)
          )
        )
      );

      const aboutUsContentAnimStart = aboutUsTop + viewportHeight;
      const aboutUsContentAnimDuration = viewportHeight * 4;
      setAboutUsProgress(
        clamp(
          (currentScroll - aboutUsContentAnimStart) /
            aboutUsContentAnimDuration,
          0,
          1
        )
      );

      let newStackingProgress = 0;
      let newCascadingProgress = 0;

      if (cardStackingWrapperRef.current && cardStackingTop > 0) {
        const start = cardStackingTop;
        const vh = window.innerHeight / 100;
        const stackingDuration = 100 * vh;
         const cascadingDuration = 400 * vh;
        const stackingStart = start;
        const cascadeStart = stackingStart + stackingDuration;
        newStackingProgress = clamp(
          (currentScroll - stackingStart) / stackingDuration,
          0,
          1
        );

        const CASCADING_MAX_PROGRESS = 4.0;
        if (currentScroll > cascadeStart) {
          const progressWithinCascade =
            (currentScroll - cascadeStart) / cascadingDuration;
          newCascadingProgress = clamp(
            progressWithinCascade * CASCADING_MAX_PROGRESS,
            0,
            CASCADING_MAX_PROGRESS
          );
        } else {
          newCascadingProgress = 0;
        }
      }

      setStackingProgress(newStackingProgress);
      setCascadingProgress(newCascadingProgress);

      if (contactUsTop > 0) {
        const animationStart = contactUsTop - viewportHeight;
        const animationDuration = viewportHeight * 2;
        const progress = clamp(
          (currentScroll - animationStart) / animationDuration,
          0,
          1
        );
        setContactUsProgress(progress);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [layout, testimonialsAnimationDurationVh, coursesProgress, isMobile]);

  const extendedCompProgress = clamp((aboutUsProgress - 0.7) / 0.3, 0, 1);
  const ourEdgeSectionHeightVh = isMobile ? 250 : (NUM_CARDS + 1) * 100;
  const partnersSectionMarginTop = isMobile ? "-250vh" : "-50vh";
  const aboutUsSectionHeightVh = isMobile ? 0 : 545;
  const cardStackingSectionHeightVh = 600; // Only used for desktop now
  const contactUsSectionHeightVh = isMobile ? 100 : 250;

  return (
    <>
      {/* Layer 1: Background Canvas (Stars only) */}
      <div className="fixed top-0 left-0 w-full h-full z-0">
        <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
          <Suspense fallback={null}>
            <color attach="background" args={["black"]} />
            <StarField hover={false} />
          </Suspense>
        </Canvas>
      </div>

      {/* Layer 2: Saturn Image */}
      <div
        ref={saturnWrapperRef}
        className="fixed top-0 left-0 w-full h-full z-10 pointer-events-none"
      >
        <img
          src="/sat.png"
          alt="Saturn with rings"
          className="absolute lg:top-96  top-50 right-32 rotate-2 lg:right-40 transform -translate-y-1/2 translate-x-[28%] w-[90vw] md:w-[65vw] lg:w-[750px] max-w-[750px] pointer-events-none mix-blend-screen  opacity-60"
        />
      </div>
      
      {/* Layer 3: Foreground Canvas (Dust Plane only, transparent) */}
      <div className="fixed top-0 left-0 w-full h-full z-20 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 6], fov: 50 }} gl={{ alpha: true }}>
          <Suspense fallback={null}>
            <DustPlaneController watermarkProgressRef={watermarkProgressRef} />
          </Suspense>
        </Canvas>
      </div>

      {/* Layer 5: Watermark Text Overlay */}
      <div
        ref={textContainerRef}
        className="fixed top-0 left-0 w-full h-full z-40 pointer-events-none overflow-hidden"
      >
        <div className="hidden md:block">
            <h2
              className="absolute bottom-0 left-1/2 z-[2] text-[24vw] md:text-[20vw] lg:text-[18rem] font-black uppercase text-transparent select-none leading-none"
              style={{
                opacity: "var(--persevex-opacity)",
                WebkitTextStroke: "1px white",
                transform: "translateX(-50%) translateY(4rem)",
              }}
            >
              Persevex
            </h2>
            <h2
              className="absolute bottom-0 left-1/2 z-[1] text-[24vw] md:text-[20vw] lg:text-[18rem] font-black uppercase text-transparent select-none leading-none"
              style={{
                opacity: "var(--courses-opacity)",
                WebkitTextStroke: "1px white",
                transform: "translateX(-50%) translateY(4rem)",
              }}
            >
              Courses
            </h2>
            <h2
              className="absolute bottom-0 left-1/2 z-[0] text-[24vw] md:text-[20vw] lg:text-[18rem] font-black uppercase text-transparent select-none leading-none"
              style={{
                opacity: "var(--our-edge-opacity)",
                WebkitTextStroke: "1px white",
                transform: "translateX(-50%) translateY(4rem)",
                whiteSpace: "nowrap",
              }}
            >
              Our Edge
            </h2>
            <h2
              className="absolute bottom-0 left-1/2 z-[-1] text-[24vw] md:text-[20vw] lg:text-[18rem] font-black uppercase text-transparent select-none leading-none"
              style={{
                opacity: "var(--partners-opacity)",
                WebkitTextStroke: "1px white",
                transform: "translateX(-50%) translateY(4rem)",
              }}
            >
              Partners
            </h2>
            <h2
              className="absolute bottom-0 left-1/2 z-[-2] text-[24vw] md:text-[20vw] lg:text-[18rem] font-black uppercase text-transparent select-none leading-none"
              style={{
                opacity: "var(--trust-opacity)",
                WebkitTextStroke: "1px white",
                transform: "translateX(-50%) translateY(4rem)",
              }}
            >
              Trust
            </h2>
            <h2
              className="absolute bottom-6 left-1/2 z-[-3] text-[20vw] md:text-[16vw] lg:text-[240px] font-black uppercase text-transparent select-none leading-none"
              style={{
                opacity: "var(--recognized-by-opacity)",
                WebkitTextStroke: "1px white",
                transform: "translateX(-50%) translateY(4rem)",
                whiteSpace: "nowrap",
              }}
            >
              Validation
            </h2>
            <h2
              className="absolute bottom-6 left-1/2 z-[-5] text-[20vw] md:text-[16vw] lg:text-[240px] font-black uppercase text-transparent select-none leading-none"
              style={{
                opacity: "var(--about-us-opacity)",
                WebkitTextStroke: "1px white",
                transform: "translateX(-50%) translateY(4rem)",
                whiteSpace: "nowrap",
              }}
            >
              Our Story
            </h2>
            <h2
              className="absolute bottom-6 left-1/2 z-[-6] text-[20vw] md:text-[16vw] lg:text-[240px] font-black uppercase text-transparent select-none leading-none"
              style={{
                opacity: "var(--contact-us-opacity)",
                WebkitTextStroke: "1px white",
                transform: "translateX(-50%) translateY(4rem)",
                whiteSpace: "nowrap",
              }}
            >
              Contact Us
            </h2>
            <h2
              className="absolute bottom-6 left-1/2 z-[-7] text-[20vw] md:text-[16vw] lg:text-[240px] font-black uppercase text-transparent select-none leading-none"
              style={{
                opacity: "var(--policy-opacity)",
                WebkitTextStroke: "1px white",
                transform: "translateX(-50%) translateY(4rem)",
                whiteSpace: "nowrap",
              }}
            >
              Privacy
            </h2>
            <h2
              className="absolute -bottom-[5vh] left-1/2 -translate-x-1/2 text-[18vw] font-black text-white leading-none pointer-events-none z-[-8]"
              style={{
                opacity: "var(--footer-opacity)",
                textShadow: "0 0 30px rgba(255, 255, 255, 1.0)",
              }}
            >
              PERSEVEX
            </h2>
          </div>
          <div
            className="absolute left-1/2 z-[-4]"
            style={
              {
                bottom: "1.5rem",
                transform:
                  "var(--about-us-container-transform, translateX(-50%))",
                whiteSpace: "nowrap",
              } as React.CSSProperties
            }
          >
            <div
              className="relative"
              style={{
                opacity: "var(--animated-text-opacity, 1)",
                transition: "opacity 0.3s ease-out",
                isolation: "isolate",
              }}
            >
              <div className="absolute inset-0 w-full h-full">
                <video
                  ref={videoRef}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute top-0 left-0 w-full h-full object-cover"
                  style={{ opacity: 0 }}
                >
                  <source src="/videos/N2.mp4" type="video/mp4" />
                </video>
                <div
                  ref={whiteOverlayRef}
                  className="absolute inset-0 bg-white"
                  style={{ opacity: 0 }}
                />
              </div>
              <div
                ref={textMaskContainerRef}
                className="flex items-center justify-center space-x-1 md:space-x-2 w-full h-full"
              >
                <AboutUsLetters letters={lettersWithSpaces} />
              </div>
              <div
                ref={starfieldOverlayRef}
                className="absolute inset-0 pointer-events-none"
                style={{ opacity: 0, overflow: "hidden" }}
              >
                <SimpleStars />
              </div>
            </div>
          </div>
      </div>
      
      {/* Layer 4: Main HTML Content */}
      <main className="relative z-30">
        <div
          ref={fadeOverlayRef}
          className="fixed top-0 left-0 w-full h-[35vh] z-[7] pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, black 50%, transparent)',
            opacity: 0,
            transition: 'opacity 0.4s ease-in-out',
          }}
        />
        <div ref={contentWrapperRef} className="relative">
          <div
            ref={heroWrapperRef}
            className="sticky top-0 flex items-center justify-center h-screen pointer-events-none"
          >
            {/* Saturn Image is now in its own layer */}
            <div className="relative w-full md:mr-74 md:mb-36 pointer-events-none">
              <Hero />
            </div>
          </div>

          <div style={{ height: "10vh" }} />
          <div
            ref={coursesSectionWrapperRef}
            style={{ height: `${coursesSectionHeight}vh` }}
          >
            <div className="sticky top-0 h-screen w-full">
              <CoursesSection progress={coursesProgress} />
            </div>
          </div>
          <div style={{ height: "50vh" }} />
          <div
            ref={ourEdgeSectionWrapperRef}
            style={{ height: `${ourEdgeSectionHeightVh}vh` }}
          >
            <OurEdgeSection progress={edgeProgress} />
          </div>

          <div
            ref={partnersSectionWrapperRef}
            style={{ height: "400vh", marginTop: partnersSectionMarginTop }}
          >
            <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
              <PartnersSection progress={partnersProgress} />
            </div>
          </div>

          <div
            ref={testimonialsSectionWrapperRef}
            style={{ 
              height: `${testimonialsSectionHeightVh}vh`,
              marginTop: '-100vh'
            }}
          >
            <div className="sticky top-0 flex h-screen items-center justify-center">
              <AnimatedTestimonials
                testimonials={formattedTestimonials}
                progress={testimonialProgress}
              />
            </div>
          </div>
          
          <div ref={recognizedBySectionWrapperRef} style={{ height: "100vh" }}>
            <div className="sticky top-0 flex h-screen items-center justify-center">
              <RecognizedBySection />
            </div>
          </div>
          
          <div ref={aboutUsSectionWrapperRef} style={{ height: `${aboutUsSectionHeightVh}vh` }}></div>
          
          {isMobile ? (
            <div ref={cardStackingWrapperRef} className="w-full text-white">
              <AboutUsExtendedComp
                stackingProgress={0} 
                cascadingProgress={0} 
              />
            </div>
          ) : (
            <div ref={cardStackingWrapperRef} style={{ height: `${cardStackingSectionHeightVh}vh` }}>
              <div className="sticky top-0 min-h-screen flex flex-col items-center justify-start pt-8 md:pt-24">
                <div
                  className="w-full text-white"
                  style={{ opacity: extendedCompProgress }}
                >
                  <AboutUsExtendedComp
                    stackingProgress={stackingProgress}
                    cascadingProgress={cascadingProgress}
                  />
                </div>
              </div>
            </div>
          )}

          <div ref={contactUsSectionWrapperRef} style={{ height: `${contactUsSectionHeightVh}vh` }}>
            <div className="sticky top-0  h-screen w-full overflow-hidden">
              <ContactUsSection progress={contactUsProgress} />
            </div>
          </div>

          <div ref={policySectionWrapperRef} style={{ height: "100vh" }}>
            <PolicySection />
          </div>

          <div ref={footerSectionWrapperRef}>
            <FooterSection />
          </div>
        </div>
      </main>
    </>
  );
};
export default LandingPage;
