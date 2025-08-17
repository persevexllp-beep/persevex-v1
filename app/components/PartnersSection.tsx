"use client"; 

import React from 'react';
import Image from 'next/image'; 

const partners = [
  { name: 'Amazon', src: '/amazon.png', top: '30%', left: '80%', speed: 1.2 },
  { name: 'Accenture', src: '/accent.png', top: '45%', left: '15%', speed: 0.9 },
  { name: 'Dell', src: '/Dell.png', top: '14%', left: '50%', speed: 1.25 },
  { name: 'Deloitte', src: '/Deloitte.png', top: '75%', left: '70%', speed: 1.0 },
  { name: 'ey', src: '/ey.png', top: '5%', left: '40%', speed: 1.8 },
  { name: 'TS', src: '/TCS.png', top: '15%', left: '30%', speed: 3 },
  { name: 'Harman', src: '/harman.png', top: '20%', left: '15%', speed: 5 },
  { name: 'Infosys', src: '/infosys.png', top: '60%', left: '65%', speed: 1.05 },
  { name: 'KPMG', src: '/kpmg.png', top: '85%', left: '50%', speed: 1.3 },
  { name: 'MindTree', src: '/mind.png', top: '10%', left: '78%', speed: 1.15 },
  { name: 'PWC', src: '/pwclogo.png', top: '65%', left: '50%', speed: 1.4 },
  { name: 'TCS', src: '/TCS.png', top: '5%', left: '70%', speed: 1.28 },
  { name: 'Walmart', src: '/wal.png', top: '80%', left: '25%', speed: 1.9 },
  { name: 'Wipro', src: '/wipr.png', top: '60%', left: '85%', speed: 1.06 },
  { name: 'MindTre', src: '/mind.png', top: '10%', left: '78%', speed: 1.15 },
  { name: 'PC', src: '/pwclogo.png', top: '5%', left: '20%', speed: 1.4 },
  { name: 'Walart', src: '/wal.png', top: '80%', left: '25%', speed: 1.9 },
  { name: 'Wipo', src: '/wal.png', top: '40%', left: '85%', speed: 1.06 },
];

interface PartnersSectionProps {
  progress: number;
}

const PartnersSection: React.FC<PartnersSectionProps> = ({ progress }) => {
  const animationStartProgress = 0.3;
  const centerPointProgress = 0.6; 
  const animationEndProgress = 1.0;

  const fadeInDuration = centerPointProgress - animationStartProgress;
  const fadeOutDuration = animationEndProgress - centerPointProgress;

  const fadeInProgress = Math.min(1, Math.max(0, (progress - animationStartProgress) / fadeInDuration));
  const fadeOutProgress = Math.max(0, (progress - centerPointProgress) / fadeOutDuration);

  const textOpacity = Math.max(0, fadeInProgress - fadeOutProgress);
  
  const movementAnimationDuration = 0.75 - 0.3; 
  const movementProgress = Math.max(0, (progress - animationStartProgress) / movementAnimationDuration);
  
  const textInitialOffset = 400; 
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
            Together, we’re shaping the future of learning.
          </p>
        </div>

        {partners.map((partner, index) => {
          const initialOffset = 500;
          const totalTravel = 900; 
          const translateY = initialOffset - (progress * totalTravel);
          
          return (
            <div
              key={`${partner.name}-${index}`} 
              className="absolute transition-[transform,opacity] duration-100 ease-out"
              style={{
                top: partner.top,
                left: partner.left,
                transform: `translate(-50%, -50%) translateY(${translateY * partner.speed}px)`,
                // ======================= FIX IS HERE =======================
                // Removed the `* 1.2` multiplier to make the fade-out last the entire scroll.
                opacity: Math.max(0, 1 - progress),
                // =========================================================
              }}
            >
              <div className="relative h-16 w-32 filter grayscale hover:grayscale-0 transition-all">
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

export default PartnersSection;