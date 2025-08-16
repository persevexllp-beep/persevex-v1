"use client"; 

import React from 'react';
import Image from 'next/image'; 

const partners = [
  { name: 'Amazon', src: '/amazon.png', top: '30%', left: '80%', speed: 1.2 },
  { name: 'Accenture', src: '/accent.png', top: '45%', left: '15%', speed: 0.9 },
  { name: 'Dell', src: '/Dell.png', top: '14%', left: '50%', speed: 1.25 },
  { name: 'Deloitte', src: '/Deloitte.png', top: '75%', left: '70%', speed: 1.0 },
  { name: 'ey', src: '/ey.png', top: '5%', left: '40%', speed: 1.8 },
  { name: 'Harman', src: '/harman.png', top: '20%', left: '15%', speed: 1.1 },
  { name: 'Infosys', src: '/infosys.png', top: '60%', left: '65%', speed: 1.05 },
  { name: 'KPMG', src: '/kpmg.png', top: '85%', left: '50%', speed: 1.3 },
  { name: 'MindTree', src: '/mind.png', top: '10%', left: '78%', speed: 1.15 },
  { name: 'PWC', src: '/pwclogo.png', top: '65%', left: '50%', speed: 1.4 },
  { name: 'TCS', src: '/TCS.png', top: '5%', left: '70%', speed: 1.28 },
  { name: 'Walmart', src: '/wal.png', top: '80%', left: '25%', speed: 1.9 },
  { name: 'Wipro', src: '/wipr.png', top: '60%', left: '85%', speed: 1.06 },
];

interface PartnersSectionProps {
  progress: number;
}

const PartnersSection: React.FC<PartnersSectionProps> = ({ progress }) => {
  const travelDistance = 300; 

  return (
    <div className="sticky top-0 flex text-white h-screen w-full items-center justify-center overflow-hidden">
      {/* 
        This relative container now spans the full width of the screen.
        This allows the absolutely positioned logos to use the entire viewport for their 'left' and 'top' values.
        We have removed the 'max-w-7xl' and the unnecessary wrapper div.
      */}
      <div className="relative  h-full w-full">
        
        {/* The text block is correctly centered using absolute positioning and has its own max-width. */}
        <div
          className="absolute left-1/2 ml-80 top-1/2 z-10 w-4/5 max-w-2xl -translate-x-1/2 -translate-y-1/2 text-center transition-[transform,opacity] duration-100 ease-out"
          style={{
            transform: `translate(-50%, -50%) translateY(${progress * -travelDistance * 0.8}px)`,
            opacity: Math.max(0, 1 - progress * 1.5),
          }}
        >
          <h2 className="mb- text-4xl font-semibold text-white md:text-5xl">
            Partnering with leading institutions and innovators.
          </h2>
          <p className="text-4xl font-semibold text-white md:text-5xl">
            Together, we’re shaping the future of learning.
          </p>
        </div>

        {/* The logos are now direct children of the full-width container, so they position correctly. */}
        {partners.map((partner) => (
          <div
            key={partner.name}
            className="absolute transition-[transform,opacity] duration-100 ease-out"
            style={{
              top: partner.top,
              left: partner.left,
              transform: `translate(-50%, -50%) translateY(${progress * -travelDistance * partner.speed}px)`,
              opacity: Math.max(0, 1 - progress * 1.2),
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
        ))}
      </div>
    </div>
  );
};

export default PartnersSection;