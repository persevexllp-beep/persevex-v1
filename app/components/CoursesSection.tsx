"use client";

import React, { useEffect, useRef, useState, ComponentType } from "react";
import { motion } from "framer-motion";

type IconType = ComponentType<{ className?: string }>;

interface CourseType {
  id: string;
  title: string;
  description: string;
  icon: IconType;
}

interface ContentType {
  heading: string;
  subheading: string;
  paragraph: string;
}

const FinanceIcon: IconType = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-green-500">
    <path d="M12 21V12M12 12H3.5M12 12H20.5M4 7H20M17 4H7C5.89543 4 5 4.89543 5 6V18C5 19.1046 5.89543 20 7 20H17C18.1046 20 19 19.1046 19 18V6C19 4.89543 18.1046 4 17 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const MarketingIcon: IconType = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-orange-500">
    <path d="M3 3V12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 3V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const HRIcon: IconType = () => (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-red-500">
      <path d="M17 21V19C17 16.7909 15.2091 15 13 15H11C8.79086 15 7 16.7909 7 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);
const WebDevIcon: IconType = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-500">
    <path d="M7 8L3 12L7 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17 8L21 12L17 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 4L10 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const AIIcon: IconType = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-cyan-500">
    <path d="M12 8V4H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M4 8H8V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 20V16H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M4 16H8V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M20 8H16V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 8V4H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M20 16H16V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 16V20H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const MLIcon: IconType = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-500">
    <path d="M12 13V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M5 13V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M19 13V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 3L5.5 7.5L12 12L18.5 7.5L12 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const CloudIcon: IconType = () => (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-indigo-500">
      <path d="M18 10C18 6.68629 15.3137 4 12 4C8.68629 4 6 6.68629 6 10C6 10.3347 6.02996 10.6652 6.08839 10.9882C4.35414 11.8585 3 13.7025 3 16C3 18.7614 5.23858 21 8 21H16C18.7614 21 21 18.7614 21 16C21 13.7025 19.6459 11.8585 17.9116 10.9882C17.97 10.6652 18 10.3347 18 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);
const CybersecurityIcon: IconType = () => (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-pink-500">
      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" stroke="currentColor" strokeWidth="2"/>
      <path d="M12 2V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const managementCourses: CourseType[] = [
    { id: 'm1', title: "Finance for Managers", description: "Understand key financial principles to make better business decisions.", icon: FinanceIcon },
    { id: 'm2', title: "Digital Marketing Strategy", description: "Master SEO, SEM, and social media to drive growth and engagement.", icon: MarketingIcon },
    { id: 'm3', title: "Modern Human Resources", description: "Learn to attract, manage, and retain top talent in today's workplace.", icon: HRIcon },
];

const technicalCourses: CourseType[] = [
    { id: 't1', title: "Web Development Mastery", description: "From HTML to advanced React, become a full-stack web developer.", icon: WebDevIcon },
    { id: 't2', title: "Artificial Intelligence", description: "Explore the foundations of AI and build intelligent agents.", icon: AIIcon },
    { id: 't3', title: "Machine Learning Ops", description: "Dive into data analysis, model deployment, and MLOps.", icon: MLIcon },
    { id: 't4', title: "Cloud Computing (AWS)", description: "Architect and deploy scalable, fault-tolerant applications on AWS.", icon: CloudIcon },
    { id: 't5', title: "Cybersecurity Essentials", description: "Protect networks, systems, and data from cyber threats.", icon: CybersecurityIcon },
];

const managementContent: ContentType = {
  heading: "Lead with Confidence.",
  subheading: "Excel in Business & Management.",
  paragraph: "Our management curriculum is tailored for aspiring leaders and seasoned professionals alike. Gain the strategic skills needed to navigate the complexities of the modern business world.",
};

const technicalContent: ContentType = {
  heading: "Build the Future.",
  subheading: "Master In-Demand Tech Skills.",
  paragraph: "Our technical tracks are hands-on and project-based, ensuring you gain practical skills in software development, data science, and cloud technologies that are directly applicable in the real world.",
};

const Card = ({ course, distance, i }: { course: CourseType, distance: number, i: number }) => {
    let translateY = 0;
    let scale = 1;
    let cardOpacity = 0;

    const initialY = 480;
    const stackOffset = 14; 
    const stackScale = 0.05;
    let overlayOpacity = 0;
    const maxOverlayOpacity = 0.8;
    const baseDarknessFactor = 0.3;

    if (distance > 0) {
      overlayOpacity = Math.min(maxOverlayOpacity, distance * baseDarknessFactor);
    }

    if (distance >= 0) {
      translateY = -distance * stackOffset;
      scale = 1 - distance * stackScale;
      cardOpacity = 1;
    } else if (distance > -1 && distance < 0) {
      const localProgress = 1 + distance;
      translateY = initialY * (1 - localProgress);
      scale = 0.8 + 0.2 * localProgress;
      cardOpacity = localProgress;
    } else {
      translateY = initialY;
      scale = 0.8;
      cardOpacity = 0;
    }

    const Icon = course.icon;

    return (
      <motion.div
        key={course.id}
        initial={false}
        style={{
          transform: `translateY(${translateY}px) scale(${scale})`,
          opacity: cardOpacity,
          zIndex: i,
        }}
        className="absolute top-0 w-full max-w-sm h-[400px] rounded-2xl p-8 flex flex-col items-center justify-start border border-black/10 bg-white shadow-xl"
      >
        <div className="w-full h-32 flex items-center justify-center mb-4">
           <Icon />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 text-center">{course.title}</h3>
        <p className="text-gray-600 text-center mt-2">{course.description}</p>
        
        <div 
          className="absolute inset-0 bg-black rounded-2xl pointer-events-none transition-opacity duration-300"
          style={{ opacity: overlayOpacity }}
        />
      </motion.div>
    );
};

const CoursesSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState<number>(0);

  const totalCount = managementCourses.length + technicalCourses.length;
  const managementCount = managementCourses.length;

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        if (!sectionRef.current) return;
        const el = sectionRef.current;
        const rect = el.getBoundingClientRect();
        const scrollY = window.scrollY;
        
        const sectionTop = rect.top + scrollY;
        const sectionHeight = rect.height;
        const viewportHeight = window.innerHeight;
        
        const coursesStartZone = sectionTop - viewportHeight * 0.8;
        const coursesEndZone = sectionTop + sectionHeight - viewportHeight;
        
        let newProgress = 0;
        if (scrollY >= coursesStartZone && scrollY <= coursesEndZone) {
          const totalZoneHeight = coursesEndZone - coursesStartZone;
          const progressInZone = scrollY - coursesStartZone;
          newProgress = progressInZone / totalZoneHeight;
        } else if (scrollY > coursesEndZone) {
          newProgress = 1;
        }
        
        setProgress(Math.max(0, Math.min(1, newProgress)));
        raf = 0;
      });
    };
    
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const overallAnimatedProgress = (progress * totalCount) - 1;
  
  const transitionStartPoint = (managementCount - 0.5) / totalCount;
  const transitionEndPoint = (managementCount + 0.5) / totalCount;
  
  let textTransitionProgress = 0;
  if (progress >= transitionStartPoint && progress <= transitionEndPoint) {
      textTransitionProgress = (progress - transitionStartPoint) / (transitionEndPoint - transitionStartPoint);
  } else if (progress > transitionEndPoint) {
      textTransitionProgress = 1;
  }

  const managementAnimatedProgress = overallAnimatedProgress;
  const technicalAnimatedProgress = overallAnimatedProgress - managementCount;

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full text-white" 
      style={{ height: `${120 + totalCount * 70}vh` }}
    >
      <div className="sticky top-0 flex flex-col md:flex-row max-w-7xl mx-auto px-8 gap-12 h-screen items-center">
        
        <div className="relative w-full md:w-full mb-60 flex flex-col justify-center h-80">
          <motion.div
            animate={{
              opacity: 1 - textTransitionProgress,
              y: -20 * textTransitionProgress,
            }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
          >
            <h2 className="text-4xl md:text-6xl font-extrabold leading-tight">
              {managementContent.heading}
              <span className="block opacity-80">{managementContent.subheading}</span>
            </h2>
            <p className="text-lg md:text-xl max-w-xl opacity-90 mt-6">
              {managementContent.paragraph}
            </p>
          </motion.div>
          
          <motion.div
            className="absolute"
            animate={{
              opacity: textTransitionProgress,
              y: 20 * (1 - textTransitionProgress),
            }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
          >
            <h2 className="text-4xl md:text-6xl font-extrabold leading-tight">
              {technicalContent.heading}
              <span className="block opacity-80">{technicalContent.subheading}</span>
            </h2>
            <p className="text-lg md:text-xl max-w-xl opacity-90 mt-6">
              {technicalContent.paragraph}
            </p>
          </motion.div>
        </div>

        <div className="relative w-full md:w-1/2 h-[480px] flex items-center justify-center">
            <motion.div
              className="absolute inset-0"
              animate={{ opacity: 1 - textTransitionProgress }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {managementCourses.map((course, i) => (
                <Card key={course.id} course={course} distance={managementAnimatedProgress - i} i={i} />
              ))}
            </motion.div>

            <motion.div
              className="absolute inset-0"
              animate={{ opacity: textTransitionProgress }}
              transition={{ duration: 0.3, ease: 'easeIn' }}
            >
              {technicalCourses.map((course, i) => (
                <Card key={course.id} course={course} distance={technicalAnimatedProgress - i} i={i} />
              ))}
            </motion.div>
        </div>
      </div>
    </section>
  );
}

export default CoursesSection;