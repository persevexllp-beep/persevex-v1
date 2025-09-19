"use client";

import React, { createContext, useContext, useState, RefObject } from 'react';

export const NUM_CARDS = 6;

export type SectionKey = 'courses' | 'ourEdge' | 'partners' | 'testimonials' | 'recognizedBy' | 'aboutUs' | 'faq'| "contactUs" | 'policy' | 'footer';

export interface LayoutState {
  coursesTop: number;
  edgeTop: number;
  partnersTop: number;
  testimonialsTop: number;
  recognizedByTop: number;
  aboutUsTop: number;
  cardStackingTop: number;
  aboutUsToFaqTransitionTop: number;
  contactUsTop: number;
  policyTop: number;
  footerTop: number;
  faqToContactTransitionTop: number
  faqTop: number
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
    // --- FIX: Check for mobile screen size (same breakpoint as useIsMobile hook) ---
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    
    switch (key) {
      case 'ourEdge':
        if (isMobile) {
          // On mobile, use standard scrollIntoView which is more reliable.
          if (ref?.current) {
            ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        } else {
          // On desktop, keep the existing custom scroll logic.
          if (layout) {
            const targetY = layout.edgeTop + (window.innerHeight * NUM_CARDS);
            window.scrollTo({ top: targetY, behavior: 'smooth' });
          }
        }
        break;

      case 'partners':
        if (layout) {
          const targetY = layout.partnersTop + window.innerHeight;
          window.scrollTo({ top: targetY, behavior: 'smooth' });
        }
        break;
      
      case 'aboutUs':
        if (isMobile) {
          // On mobile, the ref points to a zero-height div right before the content, so this works perfectly.
          if (ref?.current) {
            ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        } else {
           // On desktop, keep the existing custom scroll logic.
          if (layout) {
            const targetY = layout.aboutUsTop + (window.innerHeight * 2.6);
            window.scrollTo({ top: targetY, behavior: 'smooth' });
          }
        }
        break;

      case 'footer':
        if (layout) {
          window.scrollTo({ top: layout.footerTop, behavior: 'smooth' });
        }
        break;

      default:
        if (ref?.current) {
          ref.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        } else {
          console.warn(`Ref for section "${key}" not found. Cannot scroll.`);
        }
        break;
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