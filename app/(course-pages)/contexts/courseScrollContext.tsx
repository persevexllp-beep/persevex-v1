"use client";

import React, { createContext, useContext, useState, RefObject } from 'react';

export type CourseSectionKey = 'about' | 'curriculum' | 'projects' | 'certification' | 'partners' | 'faqs' | 'footer';

interface CourseScrollContextType {
  sectionRefs: Partial<Record<CourseSectionKey, RefObject<HTMLElement>>>;
  setSectionRefs: (refs: Partial<Record<CourseSectionKey, RefObject<HTMLElement>>>) => void;
  scrollToSection: (key: CourseSectionKey) => void;
}

const CourseScrollContext = createContext<CourseScrollContextType | undefined>(undefined);

export const CourseScrollProvider = ({ children }: { children: React.ReactNode }) => {
  const [sectionRefs, setSectionRefs] = useState<Partial<Record<CourseSectionKey, RefObject<HTMLElement>>>>({});

  const scrollToSection = (key: CourseSectionKey) => {
    const ref = sectionRefs[key];
    if (ref?.current) {
      const yOffset = -80; 
      const y = ref.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    } else {
      console.warn(`Ref for course section "${key}" not found.`);
    }
  };

  const value = { sectionRefs, setSectionRefs, scrollToSection };

  return (
    <CourseScrollContext.Provider value={value}>
      {children}
    </CourseScrollContext.Provider>
  );
};

export const useCourseScroll = () => {
  const context = useContext(CourseScrollContext);
  if (context === undefined) {
    throw new Error('useCourseScroll must be used within a CourseScrollProvider');
  }
  return context;
};