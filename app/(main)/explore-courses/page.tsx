"use client";

import React, { useState, Suspense, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import StarField from "@/app/components/StarField";
import { motion, AnimatePresence } from "framer-motion";
import { Facebook } from "lucide-react";
import Image from "next/image";
import { FiMail, FiMapPin, FiInstagram, FiLinkedin } from "react-icons/fi";
import ExploreFooterSection from "@/app/components/ExploreFooterSection";

import { allDomains, DomainView } from "../../constants/courseConstant";
import CourseDisplayCard from "../../components/CourseDisplayCard";

export default function ExploreCoursesPage() {
  const [activeView, setActiveView] = useState<DomainView>("management");

  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const activeIndex = allDomains.findIndex((d) => d.view === activeView);
    const activeButton = buttonRefs.current[activeIndex];

    if (activeButton) {
      setSliderStyle({
        left: activeButton.offsetLeft,
        width: activeButton.offsetWidth,
      });
    }
  }, [activeView]);

  const activeDomain = allDomains.find((domain) => domain.view === activeView);
  const coursesToShow = activeDomain?.courses || [];
  const contentToShow = activeDomain?.content || {
    subheading: "Select a category to begin.",
    paragraph: "Explore our wide range of professional courses.",
  };

  return (
    <main
      className="relative min-h-screen w-full text-white overflow-x-hidden"
      style={{
        msOverflowStyle: "none",
        scrollbarWidth: "none",
      }}
    >
      <div className="fixed top-0 left-0 w-full h-full -z-10">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <color attach="background" args={["#000000"]} />
          <Suspense fallback={null}>
            <StarField hover={false} />
          </Suspense>
        </Canvas>
      </div>

      <div className="flex flex-col items-center justify-start pt-16 min-h-screen w-full px-4 sm:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-center">
          Explore our Trending Courses
        </h1>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="text-center mt-4 max-w-2xl"
          >
            <h2 className="text-2xl font-semibold text-[#F9C47D]">
              {contentToShow.subheading}
            </h2>
            <p className="text-gray-300 mt-2">{contentToShow.paragraph}</p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-12 z-20">
          <div className="relative flex w-fit items-center rounded-full bg-gray-900/50 p-1 backdrop-blur-sm flex-wrap justify-center">
            <motion.div
              className="absolute h-[calc(100%-0.5rem)] rounded-full "
              animate={sliderStyle}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
            />
            {allDomains.map(
              (domain, index) =>
                domain.enabled && (
                  <button
                    key={domain.view}
                    ref={(el) => {
                      buttonRefs.current[index] = el;
                    }}
                    onClick={() => setActiveView(domain.view)}
                    className={`relative z-10 cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-300 whitespace-nowrap ${
                      activeView === domain.view
                        ? "text-orange-400"
                        : "text-white hover:text-gray-200"
                    }`}
                  >
                    {domain.name}
                  </button>
                )
            )}
          </div>
        </div>

        <div className="w-full max-w-7xl mx-auto mt-16 pb-24 min-h-[600px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-16 justify-items-center"
            >
              {coursesToShow.map((course) => (
                <CourseDisplayCard key={course.id} course={course} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <div>
        <ExploreFooterSection />
      </div>
    </main>
  );
}

