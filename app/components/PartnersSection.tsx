"use client"; 

import React, { useEffect, useState } from 'react';
import Image from 'next/image'; 

// --- HELPER HOOK ---
// Reusing our mobile detection hook.
const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      // Ensure window is defined (for SSR)
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
const partners = [
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

interface PartnersSectionProps {
  progress: number;
}

const PartnersSection: React.FC<PartnersSectionProps> = ({ progress }) => {
  const isMobile = useIsMobile();
  
  // --- DESKTOP ANIMATION LOGIC (Only runs when needed) ---
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

  // --- CONDITIONAL RENDERING ---
  if (isMobile) {
    // --- MOBILE LAYOUT ---
    // A simple, static grid that's easy to read and performant on mobile.
    return (
      <div className="flex flex-col text-white w-full items-center justify-center py-24 px-4 ">
        <div className="text-center mb-12">
          <h2 className="mb-4 text-3xl font-semibold text-white">
            Partnering with leading innovators.
          </h2>
          <p className="text-lg text-gray-300">
            Together, we're shaping the future of learning.
          </p>
        </div>
        
        {/* Simple and clean grid for logos */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 w-full max-w-2xl">
          {partners.slice(0, 12).map((partner, index) => ( // Using slice to not overcrowd the mobile view
            <div
              key={`${partner.name}-${index}`} 
              className="bg-gray-800 rounded-lg p-4 flex items-center justify-center h-24"
            >
              <div className="relative h-12 w-full">
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
  }

  // --- DESKTOP LAYOUT (Original Parallax Version) ---
  return (
    <div className="sticky top-0 flex text-white h-screen w-full items-center justify-center overflow-hidden">
      <div className="relative h-full w-full">
        
        <div
          className="absolute left-1/2 top-1/2 z-10 w-4/5 max-w-2xl text-center"
          style={{
            opacity: textOpacity,
            transform: `translate(-50%, -50%) translateY(${textTranslateY}px)`,
            willChange: 'opacity, transform', // Performance hint
          }}
        >
          <h2 className="mb-4 text-4xl font-semibold text-white md:text-5xl">
            Partnering with leading institutions and innovators.
          </h2>
          <p className="text-4xl font-semibold text-white md:text-5xl">
            Together, we're shaping the future of learning.
          </p>
        </div>

        {partners.map((partner, index) => {
          const initialOffset = 500;
          const totalTravel = 900; 
          const translateY = initialOffset - (progress * totalTravel);
          
          const logoFadeStart = 0.5;
          const logoFadeDuration = 1.0 - logoFadeStart;
          const logoFadeProgress = Math.max(0, (progress - logoFadeStart) / logoFadeDuration);
          const logoOpacity = 1 - logoFadeProgress;
          
          return (
            <div
              key={`${partner.name}-${index}`} 
              className="absolute transition-[transform,opacity] duration-100 ease-out"
              style={{
                top: partner.top,
                left: partner.left,
                transform: `translate(-50%, -50%) translateY(${translateY * partner.speed}px)`,
                opacity: logoOpacity,
                willChange: 'transform, opacity', // Performance hint
              }}
            >
              <div className="relative h-16 w-32 transition-all">
                 <Image
                    src={partner.src}
                    alt={`${partner.name} logo`}
                    fill
                    className="object-contain"
                 />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default React.memo(PartnersSection);