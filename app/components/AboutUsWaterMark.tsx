"use client";

import React from 'react';

const aboutUsWords = "ABOUT US".split(' ');

const AboutUsWatermark = () => {
  return (
    <>
      {/* 
        VERSION 1: The "Complex" version for the initial letter assembly.
        This is only visible during the assembly animation.
      */}
      <div 
        className="absolute left-1/2 z-[-4] flex items-center justify-center space-x-1 md:space-x-2 transition-opacity duration-300"
        style={{ 
          bottom: '1.5rem',
          opacity: 'var(--about-us-assembly-opacity, 1)', 
          transform: 'var(--about-us-container-transform)',
          whiteSpace: 'nowrap' 
        } as React.CSSProperties}
      >
        {aboutUsWords.map((word, wordIndex) => (
          <div key={wordIndex} className="flex items-center justify-center space-x-1 md:space-x-2">
            {word.split('').map((letter, letterIndex) => {
              const globalLetterIndex = aboutUsWords.slice(0, wordIndex).join(' ').length + (wordIndex > 0 ? 1 : 0) + letterIndex;
              return (
                <h2 key={letterIndex} className="relative text-[20vw] md:text-[16vw] lg:text-[240px] font-black leading-none" style={{
                  fontFamily: 'serif',
                  transform: `var(--about-us-letter-${globalLetterIndex}-transform)`,
                  opacity: `var(--about-us-letter-${globalLetterIndex}-opacity, 1)`,
                  WebkitMaskImage: 'linear-gradient(white, white)',
                  maskImage: 'linear-gradient(white, white)',
                  WebkitMaskClip: 'text',
                  maskClip: 'text',
                  color: 'transparent',
                } as React.CSSProperties}>
                  <video autoPlay loop muted playsInline className="absolute top-0 left-0 w-full h-full object-cover -z-10">
                    <source src="/O_optimized.webm" type="video/webm" />
                  </video>
                  {letter}
                </h2>
              )
            })}
            {wordIndex < aboutUsWords.length - 1 && <div className="w-8 md:w-12" />}
          </div>
        ))}
      </div>

      {/* 
        VERSION 2: The "Simple & Performant" version for the rise animation.
        This is only visible after the letters have assembled. THIS IS THE FIXED VERSION.
      */}
      <div 
        className="absolute left-1/2 z-[-4] transition-opacity duration-300"
        style={{
          bottom: '1.5rem',
          opacity: 'var(--about-us-rise-opacity, 0)',
          transform: 'var(--about-us-container-transform)',
          whiteSpace: 'nowrap',
        } as React.CSSProperties}
      >
        <div className="relative" style={{
          WebkitMaskImage: 'linear-gradient(white, white)',
          maskImage: 'linear-gradient(white, white)',
          WebkitMaskClip: 'text',
          maskClip: 'text',
          color: 'transparent'
        }}>
          <video autoPlay loop muted playsInline className="absolute top-0 left-0 w-full h-full object-cover -z-10">
            <source src="/O_optimized.webm" type="video/webm" />
          </video>
          
          <h2 
            className="relative text-[20vw] md:text-[16vw] lg:text-[240px] font-black leading-none" 
            style={{ 
              fontFamily: 'serif',
              letterSpacing: '0.05em', // Adjust to match the kerning of the multi-part version
              wordSpacing: '0.25em' // Adjust to match the space between words
            }}
          >
            ABOUT US
          </h2>
        </div>
      </div>
    </>
  );
};

export default AboutUsWatermark;