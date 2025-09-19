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
  scrollToSection: (key: SectionKey, options?: { behavior?: ScrollBehavior }) => void;
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

export const ScrollProvider = ({ children }: { children: React.ReactNode }) => {
  const [sectionRefs, setSectionRefs] = useState<Partial<Record<SectionKey, RefObject<HTMLDivElement>>>>({});
  const [layout, setLayout] = useState<LayoutState | null>(null);

  const scrollToSection = (key: SectionKey, options?: { behavior?: ScrollBehavior }) => {
    const behavior = options?.behavior || 'smooth';
    const ref = sectionRefs[key];
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    
    switch (key) {
      case 'ourEdge':
        if (isMobile) {
          if (ref?.current) {
            ref.current.scrollIntoView({ behavior, block: 'start' });
          }
        } else {
          if (layout) {
            const targetY = layout.edgeTop + (window.innerHeight * NUM_CARDS);
            window.scrollTo({ top: targetY, behavior });
          }
        }
        break;

      case 'partners':
        if (layout) {
          const targetY = layout.partnersTop + window.innerHeight;
          window.scrollTo({ top: targetY, behavior });
        }
        break;
      
      case 'aboutUs':
        if (isMobile) {
          if (ref?.current) {
            ref.current.scrollIntoView({ behavior, block: 'start' });
          }
        } else {
          if (layout) {
            const targetY = layout.aboutUsTop + (window.innerHeight * 2.6);
            window.scrollTo({ top: targetY, behavior });
          }
        }
        break;

      case 'footer':
        if (layout) {
          window.scrollTo({ top: layout.footerTop, behavior });
        }
        break;

      default:
        if (ref?.current) {
          ref.current.scrollIntoView({
            behavior,
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