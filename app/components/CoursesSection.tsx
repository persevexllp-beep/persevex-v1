"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useTransform,
  useMotionValueEvent,
  MotionValue,
  useSpring,
} from "framer-motion";
import {
  CourseType,
  allDomains,
  DomainView,
} from "../constants/courseConstant";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface CoursesSectionProps {
  progress: MotionValue<number>;
  onSwitchView: (view: DomainView) => void;
  onSetProgress: (progress: number) => void;
}

const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(
        typeof window !== "undefined" && window.innerWidth < breakpoint
      );
    };
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => {
      window.removeEventListener("resize", checkDevice);
    };
  }, [breakpoint]);
  return isMobile;
};

const Card = ({
  course,
  animatedProgress,
  i,
  isMobile,
}: {
  course: CourseType;
  animatedProgress: MotionValue<number>;
  i: number;
  isMobile: boolean;
}) => {
  const router = useRouter();
  const distance = useTransform(animatedProgress, (p) => p - i);
  const initialY = 480;
  const stackOffset = 14;
  const stackScale = 0.05;
  const maxOverlayOpacity = 0.8;
  const baseDarknessFactor = 0.3;

  const pointerEvents = useTransform(distance, (d) =>
    d < 0.5 ? "auto" : "none"
  );
  const translateY = useTransform(distance, (d) => {
    if (d >= 0) return -d * stackOffset;
    if (d > -1) return initialY * (1 - (1 + d));
    return initialY;
  });
  const scale = useTransform(distance, (d) => {
    const finalScale = isMobile ? 0.85 : 1.0;
    const initialScale = isMobile ? 0.7 : 0.8;
    const scaleRange = finalScale - initialScale;
    if (d >= 0) return finalScale - d * stackScale;
    if (d > -1) return initialScale + scaleRange * (1 + d);
    return initialScale;
  });
  const cardOpacity = useTransform(distance, (d) => {
    if (d >= 0) return 1;
    if (d > -1) return 1 + d;
    return 0;
  });
  const overlayOpacity = useTransform(distance, (d) =>
    d > 0 ? Math.min(maxOverlayOpacity, d * baseDarknessFactor) : 0
  );

  return (
    <motion.div
      key={course.id}
      style={{
        translateY,
        scale,
        opacity: cardOpacity,
        zIndex: i,
        pointerEvents,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className={`absolute overflow-hidden border-2 border-[rgba(255,255,255,0.3)] top-0 w-[90vw] md:w-full max-w-sm rounded-2xl flex flex-col bg-black items-center justify-end shadow-xl ${
        isMobile ? "h-[380px] p-6" : "h-[420px] p-8"
      }`}
    >
      <div className="absolute inset-0 w-full h-full ">
        <Image
          src={course.cardBg_image}
          alt={course.title}
          layout="fill"
          objectFit="cover"
        />
      </div>

      <button
        onClick={() => router.push(course.route)}
        className="absolute z-10 w-44 py-2.5 px-5 cursor-pointer  bottom-2 font-medium text-white border bg-black/30 backdrop-blur-sm border-white/50  rounded-lg transition-colors hover:bg-white/10 focus:ring-4 focus:outline-none focus:ring-gray-300"
      >
        View Course
      </button>

      <motion.div
        className="absolute inset-0 bg-black rounded-2xl pointer-events-none"
        style={{ opacity: overlayOpacity }}
      />
    </motion.div>
  );
};

const DomainTiles = ({
  domain,
  smoothedProgress,
  activeCardIndex,
  activeView,
  handleTileClick,
}: any) => {
  const FADE_MARGIN = 0.05;
  const opacity = useTransform(
    smoothedProgress,
    [
      domain.startProgress - FADE_MARGIN,
      domain.middleProgress,
      domain.endProgress + FADE_MARGIN,
    ],
    [0, 1, 0]
  );
  const pointerEvents = useTransform(opacity, (o) =>
    o > 0.1 ? "auto" : "none"
  );

  return (
    <motion.div
      key={`${domain.view}-tiles`}
      className="absolute inset-0 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide"
      style={{ opacity, pointerEvents }}
    >
      {domain.courses.map((course: any, i: any) => (
        <button
          key={course.id}
          onClick={() => handleTileClick(domain.view, i)}
          className={`flex-shrink-0 rounded-full px-3 py-1 text-xs transition-colors duration-300
                ${
                  activeCardIndex === i && activeView === domain.view
                    ? "bg-white cursor-pointer text-black font-semibold"
                    : "bg-black/30 cursor-pointer backdrop-blur-sm"
                }`}
        >
          {course.title}
        </button>
      ))}
    </motion.div>
  );
};

const DomainContent = ({ domain, smoothedProgress }: any) => {
  const FADE_MARGIN = 0.05;
  const opacity = useTransform(
    smoothedProgress,
    [
      domain.startProgress - FADE_MARGIN,
      domain.middleProgress,
      domain.endProgress + FADE_MARGIN,
    ],
    [0, 1, 0]
  );
  const y = useTransform(
    smoothedProgress,
    [
      domain.startProgress - FADE_MARGIN,
      domain.middleProgress,
      domain.endProgress + FADE_MARGIN,
    ],
    [20, 0, -20]
  );

  return (
    <motion.div
      key={`${domain.view}-content`}
      className="absolute top-0 left-0 w-full"
      style={{ opacity, y }}
    >
      <h2 className=" text-2xl md:text-6xl font-extrabold leading-tight">
        {domain.content.heading}
        <span className="block opacity-80">{domain.content.subheading}</span>
      </h2>
      <p className="lg:text-lg text-sm md:text-xl opacity-90 mt-4">
        {domain.content.paragraph}
      </p>
    </motion.div>
  );
};

const DomainCardStack = ({ domain, smoothedProgress, isMobile }: any) => {
  const animatedProgress = useTransform(
    smoothedProgress,
    [domain.startProgress, domain.endProgress],
    [-1, domain.courses.length - 1]
  );
  const FADE_MARGIN = 0.05;
  const opacity = useTransform(
    smoothedProgress,
    [
      domain.startProgress - FADE_MARGIN,
      domain.middleProgress,
      domain.endProgress + FADE_MARGIN,
    ],
    [0, 1, 0]
  );
  const pointerEvents = useTransform(opacity, (o) =>
    o > 0.1 ? "auto" : "none"
  );

  return (
    <motion.div
      key={`${domain.view}-stack`}
      className="absolute inset-0 flex justify-center mt-24 lg:mt-0 items-center"
      style={{ opacity, pointerEvents }}
    >
      {domain.courses.map((course: any, i: any) => (
        <Card
          key={course.id}
          course={course}
          animatedProgress={animatedProgress}
          i={i}
          isMobile={isMobile}
        />
      ))}
    </motion.div>
  );
};

const CoursesSection: React.FC<CoursesSectionProps> = ({
  progress,
  onSwitchView,
  onSetProgress,
}) => {
  const [activeView, setActiveView] = useState<DomainView>("management");
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const isMobile = useIsMobile();
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0 });

  const smoothedProgress = useSpring(progress, {
    stiffness: 400,
    damping: 90,
  });

  const { domainData, totalUnits } = useMemo(() => {
    const DWELL_TIME_UNITS = 1;
    let accumulatedUnits = 0;
    const enabledDomains = allDomains.filter((d) => d.enabled);
    const totalUnits =
      enabledDomains.reduce((sum, domain) => sum + domain.courses.length, 0) +
      (enabledDomains.length - 1) * DWELL_TIME_UNITS;

    const data = enabledDomains.map((domain) => {
      const startUnit = accumulatedUnits;
      accumulatedUnits += domain.courses.length;
      const endUnit = accumulatedUnits;
      accumulatedUnits += DWELL_TIME_UNITS;

      const startProgress = startUnit / totalUnits;
      const endProgress = endUnit / totalUnits;
      const middleProgress = (startProgress + endProgress) / 2;

      return {
        ...domain,
        startProgress,
        endProgress,
        middleProgress,
      };
    });

    return { domainData: data, totalUnits };
  }, []);

  useMotionValueEvent(progress, "change", (latest) => {
    const newActiveDomain = domainData.find(
      (d) => latest >= d.startProgress && latest < d.endProgress + 0.05
    );
    if (newActiveDomain) {
      if (newActiveDomain.view !== activeView) {
        setActiveView(newActiveDomain.view);
      }

      const progressWithinDomain =
        (latest - newActiveDomain.startProgress) /
        (newActiveDomain.endProgress - newActiveDomain.startProgress);
      const cardIndex = Math.round(
        -1 + progressWithinDomain * newActiveDomain.courses.length
      );
      setActiveCardIndex(
        Math.max(0, Math.min(cardIndex, newActiveDomain.courses.length - 1))
      );
    }
  });

  useEffect(() => {
    const activeDomainIndex = allDomains.findIndex(
      (d) => d.view === activeView
    );
    if (activeDomainIndex !== -1) {
      const activeButton = buttonRefs.current[activeDomainIndex];
      if (activeButton) {
        setSliderStyle({
          left: activeButton.offsetLeft,
          width: activeButton.offsetWidth,
        });
      }
    }
  }, [activeView]);

  const handleTileClick = (domain: DomainView, index: number) => {
    const targetDomain = domainData.find((d) => d.view === domain);
    if (!targetDomain) return;
    const courseCount = targetDomain.courses.length;
    if (courseCount <= 1) {
      onSetProgress(targetDomain.middleProgress);
      return;
    }
    const progressWithinRange = index / (courseCount - 1);
    const targetProgress =
      targetDomain.startProgress +
      progressWithinRange *
        (targetDomain.endProgress - targetDomain.startProgress);

    onSetProgress(targetProgress);
  };

  return (
    <div className="relative w-full h-full text-white flex flex-col md:flex-row gap-8 justify-end md:justify-center mx-auto px-8 items-center pb-12 md:pb-0">
      <div className="absolute top-16 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-4">
        <div className="relative flex w-fit items-center rounded-full bg-black/30 p-1 backdrop-blur-sm ">
          <motion.div
            className="absolute top-1 h-[calc(100%-0.5rem)] rounded-full bg-white"
            animate={sliderStyle}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
          />
          {allDomains.map((domain, index) => (
            <button
              key={domain.name}
              ref={(el) => {
                buttonRefs.current[index] = el;
              }}
              onClick={() => domain.enabled && onSwitchView(domain.view)}
              disabled={!domain.enabled}
              className={`relative z-10 cursor-pointer whitespace-nowrap rounded-full py-2 px-4 text-xs md:text-sm font-semibold transition-colors duration-300
                    ${
                      !domain.enabled
                        ? "cursor-not-allowed text-white/50"
                        : activeView === domain.view
                        ? "text-gray-900"
                        : "text-white"
                    }
                    `}
            >
              {domain.name}
            </button>
          ))}
        </div>

        <div className="relative w-[90vw] md:max-w-5xl h-8 flex items-center justify-center">
          {domainData.map((domain) => (
            <DomainTiles
              key={domain.view}
              domain={domain}
              smoothedProgress={smoothedProgress}
              activeCardIndex={activeCardIndex}
              activeView={activeView}
              handleTileClick={handleTileClick}
            />
          ))}
        </div>
      </div>

      <div className="absolute top-0 left-0 w-full pt-48 mt-24 px-8 md:static md:w-full md:p-0 flex items-center lg:mb-44 justify-center">
        <div className="relative w-full lg:ml-24 lg:h-80">
          {domainData.map((domain) => (
            <DomainContent
              key={domain.view}
              domain={domain}
              smoothedProgress={smoothedProgress}
            />
          ))}
        </div>
      </div>

      <div className="relative w-full md:w-1/2 h-[480px] mt-24 lg:mt-0 flex items-center justify-center">
        {domainData.map((domain) => (
          <DomainCardStack
            key={domain.view}
            domain={domain}
            smoothedProgress={smoothedProgress}
            isMobile={isMobile}
          />
        ))}
      </div>
    </div>
  );
};

export default React.memo(CoursesSection);
