"use client"; 

import React from 'react';
import Image from 'next/image'; 

// Enhanced parallax with more natural speed variations
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

// new section

const PartnersSection: React.FC<PartnersSectionProps> = ({ progress }) => {
  // Define keyframes for the text's movement. These remain unchanged.
  const movementStartProgress = 0.45;
  const movementEndProgress = 0.75; 

  // --- MODIFIED OPACITY LOGIC ---
  // THE ONLY CHANGE IS ON THE NEXT LINE:
  // Set the text to be fully opaque (1.0) slightly before the visual midpoint of its journey.
  const opacityPeakProgress = 0.55; // Changed from (start + end) / 2

  // Calculate the duration of the fade-in and fade-out phases based on the new peak.
  const fadeInDuration = opacityPeakProgress - movementStartProgress;
  const fadeOutDuration = movementEndProgress - opacityPeakProgress;

  let textOpacity = 0;
  if (progress >= movementStartProgress && progress < opacityPeakProgress) {
    // Phase 1: Fading IN.
    textOpacity = (progress - movementStartProgress) / fadeInDuration;
  } else if (progress >= opacityPeakProgress && progress <= movementEndProgress) {
    // Phase 2: Fading OUT.
    textOpacity = 1 - ((progress - opacityPeakProgress) / fadeOutDuration);
  }
  // Ensure opacity doesn't go below 0.
  textOpacity = Math.max(0, textOpacity);
  // --- END OF MODIFICATION ---

  // Movement logic remains the same.
  const movementAnimationDuration = movementEndProgress - movementStartProgress; 
  const movementProgress = Math.max(0, Math.min(1, (progress - movementStartProgress) / movementAnimationDuration));
  
  const textInitialOffset = 200; 
  const textTravelDistance = 600; 
  const textTranslateY = textInitialOffset - (movementProgress * textTravelDistance);

  return (
    <div className="sticky top-0 flex text-white h-screen w-full items-center justify-center overflow-hidden">
      <div className="relative h-full w-full">
        
        <div
          className="absolute ml-84 left-1/2 top-1/2 z-10 w-4/5 max-w-2xl -translate-x-1/2 -translate-y-12 text-center"
          style={{
            opacity: textOpacity,
            transform: `translate(-50%, -50%) translateY(${textTranslateY}px)`,
          }}
        >
          <h2 className="mb- text-4xl font-semibold text-white md:text-5xl">
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
              }}
            >
              <div className="relative h-16 w-32 transition-all">
                 <Image
                    src={partner.src}
                    alt={`${partner.name} logo`}
                    layout="fill"
                    objectFit="contain"
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