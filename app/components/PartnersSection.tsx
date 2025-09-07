"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

// --- HELPER HOOK (Unchanged) ---
const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth < breakpoint);
      }
    };
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => {
      window.removeEventListener("resize", checkDevice);
    };
  }, [breakpoint]);

  return isMobile;
};


// --- DATA (Unchanged) ---
const desktopPartners = [
  { name: 'Amazon', src: '/amazon.png', top: '30%', left: '80%', speed: 2.8 },
  { name: 'Accenture', src: '/accent.png', top: '45%', left: '15%', speed: 1.4 },
  { name: 'Dell', src: '/Dell.png', top: '14%', left: '50%', speed: 3.2 },
  { name: 'Deloitte', src: '/Deloitte.png', top: '75%', left: '70%', speed: 1.8 },
  { name: 'ey', src: '/ey.png', top: '5%', left: '40%', speed: 4.5 },
  { name: 'TS', src: '/TCS.png', top: '15%', left: '30%', speed: 6.2 },
  { name: 'Harman', src: '/harman.png', top: '20%', left: '15%', speed: 8.5 },
  { name: 'Infosys', src: '/infosys.png', top: '60%', left: '65%', speed: 2.1 },
  { name: 'KPMG', src: '/kpmg.png', top: '85%', left: '50%', speed: 3.4 },
  { name: 'MindTree', src: '/mind.png', top: '10%', left: '38%', speed: 2.6 },
  { name: 'PWC', src: '/pwclogo.png', top: '65%', left: '50%', speed: 3.8 },
  { name: 'TCS', src: '/TCS.png', top: '5%', left: '70%', speed: 3.1 },
  { name: 'Walmart', src: '/wal.png', top: '80%', left: '25%', speed: 4.8 },
  { name: 'Wipro', src: '/wipr.png', top: '60%', left: '85%', speed: 2.3 },
  { name: 'MindTre', src: '/mind.png', top: '10%', left: '78%', speed: 2.9 },
  { name: 'PC', src: '/pwclogo.png', top: '5%', left: '20%', speed: 3.7 },
  { name: 'Walart', src: '/wal.png', top: '60%', left: '35%', speed: 2.2 },
  { name: 'Wipo', src: '/wal.png', top: '40%', left: '85%', speed: 2.4 },
];
const mobilePartners = [
  { name: 'Amazon', src: '/amazon.png', top: '10%', left: '80%', speed: 2.8 },
  { name: 'Accenture', src: '/accent.png', top: '65%', left: '25%', speed: 4.4 },
  { name: 'Dell', src: '/Dell.png', top: '26%', left: '15%', speed: 3.2 },
  { name: 'Deloitte', src: '/Deloitte.png', top: '75%', left: '75%', speed: 1.8 },
  { name: 'ey', src: '/ey.png', top: '5%', left: '80%', speed: 4.5 },
  { name: 'Harman', src: '/harman.png', top: '20%', left: '55%', speed: 8.5 },
  { name: 'KPMG', src: '/kpmg.png', top: '85%', left: '70%', speed: 3.4 },
  { name: 'Walmart', src: '/wal.png', top: '80%', left: '15%', speed: 4.8 },
  { name: 'Wipro', src: '/wipr.png', top: '60%', left: '85%', speed: 2.3 },
  { name: 'PWC', src: '/pwclogo.png', top: '5%', left: '25%', speed: 3.7 },
  { name: 'MindTree', src: '/mind.png', top: '90%', left: '38%', speed: 2.6 },
];

interface PartnersSectionProps {
  progress: number;
}

const PartnersSection: React.FC<PartnersSectionProps> = ({ progress }) => {
  const isMobile = useIsMobile();
  const partners = isMobile ? mobilePartners : desktopPartners;

  // --- Text animation logic remains the same ---
  const movementStartProgress = 0.45;
  const movementEndProgress = 0.75;
  const opacityPeakProgress = 0.55;

  const fadeInDuration = opacityPeakProgress - movementStartProgress;
  const fadeOutDuration = movementEndProgress - opacityPeakProgress;

  let textOpacity = 0;
  if (progress >= movementStartProgress && progress < opacityPeakProgress) {
    textOpacity = (progress - movementStartProgress) / fadeInDuration;
  } else if (progress >= opacityPeakProgress && progress <= movementEndProgress) {
    textOpacity = 1 - ((progress - opacityPeakProgress) / fadeOutDuration);
  }
  textOpacity = Math.max(0, textOpacity);

  const movementAnimationDuration = movementEndProgress - movementStartProgress;
  const movementProgress = Math.max(0, Math.min(1, (progress - movementStartProgress) / movementAnimationDuration));

  const textInitialOffset = 200;
  const textTravelDistance = 600;
  const textTranslateY = textInitialOffset - (movementProgress * textTravelDistance);

  // --- Logo animation constants ---
  const logoFadeStart = 0.5;
  const logoFadeDuration = 0.5; // 1.0 - 0.5
  const initialOffset = 500;
  const totalTravel = 900;

  return (
    <div className="sticky top-0 flex text-white h-screen w-full items-center justify-center overflow-hidden">
      {/* 
        Apply the single CSS variable to this container. 
        All children will inherit it.
      */}
      <div 
        className="relative h-full w-full"
        style={{ '--scroll-progress': progress } as React.CSSProperties}
      >
        <div
          className="absolute left-1/2 top-1/2 z-10 w-[90%] md:w-4/5 max-w-2xl text-center"
          style={{
            opacity: textOpacity,
            transform: `translate(-50%, -50%) translateY(${textTranslateY}px)`,
            willChange: 'transform, opacity',
          }}
        >
          <h2 className="mb-4 text-3xl font-semibold text-white md:text-5xl">
            Partnering with leading institutions and innovators.
          </h2>
          <p className="text-lg font-medium text-gray-200 md:text-4xl md:font-semibold md:text-white">
            Together, we're shaping the future of learning.
          </p>
        </div>

        {partners.map((partner, index) => (
          <div
            key={`${partner.name}-${index}`}
            className="absolute"
            style={{
              top: partner.top,
              left: partner.left,
              // These variables are now static and defined once.
              '--speed': partner.speed,
              // The transform and opacity now only reference inherited or static variables.
              // The browser can optimize this much more effectively.
              transform: `translate3d(-50%, -50%, 0) translateY(calc((${initialOffset}px - (var(--scroll-progress) * ${totalTravel}px)) * var(--speed)))`,
              opacity: `max(0, 1 - (max(0, var(--scroll-progress) - ${logoFadeStart}) / ${logoFadeDuration}))`,
              willChange: 'transform, opacity',
            } as React.CSSProperties}
          >
            <div className="relative h-12 w-24 md:h-16 md:w-32 transition-all">
               <Image
                  src={partner.src}
                  alt={`${partner.name} logo`}
                  fill
                  className="object-contain"
               />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(PartnersSection);