// app/contexts/ScrollContext.tsx

"use client";

import React, { createContext, useContext, useState, RefObject } from 'react';

export const NUM_CARDS = 6;

// The types are already correct, no changes needed here
export type SectionKey = 'courses' | 'ourEdge' | 'partners' | 'testimonials' | 'recognizedBy' | 'aboutUs' | "contactUs" | 'policy' | 'footer';

export interface LayoutState {
  coursesTop: number;
  edgeTop: number;
  partnersTop: number;
  testimonialsTop: number;
  recognizedByTop: number;
  aboutUsTop: number;
  cardStackingTop: number;
  contactUsTop: number;
  policyTop: number;
  footerTop: number;
}

interface ScrollContextType {
  sectionRefs: Partial<Record<SectionKey, RefObject<HTMLDivElement>>>;
  layout: LayoutState | null;
  setSectionRefs: (refs: Partial<Record<SectionKey, RefObject<HTMLDivElement>>>) => void;
  setLayout: (layout: LayoutState) => void;
  scrollToSection: (key: SectionKey) => void;
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

export const ScrollProvider = ({ children }: { children: React.ReactNode }) => {
  const [sectionRefs, setSectionRefs] = useState<Partial<Record<SectionKey, RefObject<HTMLDivElement>>>>({});
  const [layout, setLayout] = useState<LayoutState | null>(null);

  const scrollToSection = (key: SectionKey) => {
    const ref = sectionRefs[key];

    // Special handling for "Our Edge"
    if (key === 'ourEdge' && layout) {
      const targetY = layout.edgeTop + (window.innerHeight * NUM_CARDS);
      window.scrollTo({
        top: targetY,
        behavior: 'smooth',
      });
      return;
    } 
    // Special handling for "Partners"
    else if (key === 'partners' && layout) {
      const targetY = layout.partnersTop + window.innerHeight;
      window.scrollTo({
        top: targetY,
        behavior: 'smooth',
      });
      return;
    }
    // Special handling for "About Us"
    else if (key === 'aboutUs' && layout) {
      const targetY = layout.aboutUsTop + (window.innerHeight * 2.6);
      window.scrollTo({
        top: targetY,
        behavior: 'smooth',
      });
      return;
    }
    // +++ MODIFICATION START +++
    // Add special handling for "Footer"
    else if (key === 'footer' && layout) {
      // We explicitly scroll to the calculated top of the footer section.
      // This is the most reliable way to get to the end of the page.
      window.scrollTo({
        top: layout.footerTop,
        behavior: 'smooth',
      });
      return;
    }
    // +++ MODIFICATION END +++

    // Default behavior for all other sections (like Courses, Contact Us, etc.)
    if (ref?.current) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    } else {
      console.warn(`Ref or layout for section "${key}" not found.`);
    }
  };

  const value = { sectionRefs, layout, setSectionRefs, setLayout, scrollToSection };

  return (
    <ScrollContext.Provider value={value}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScroll = () => {
  const context = useContext(ScrollContext);
  if (context === undefined) {
    throw new Error('useScroll must be used within a ScrollProvider');
  }
  return context;
};