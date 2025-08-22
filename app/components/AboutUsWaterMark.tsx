// AboutUsWatermark.tsx

"use client";
import React from 'react';

const aboutUsWords = "ABOUT US".split(' ');

const AboutUsWatermark = () => {
  return (
    <div
      className="absolute left-1/2"
      style={{
        transform: 'var(--about-us-container-transform)',
        bottom: '1.5rem',
        zIndex: -4,
      } as React.CSSProperties}
    >
      {/* VERSION 1: The "Complex" version for per-letter assembly. */}
      {/* This is only visible during the assembly animation. */}
      <div
        className="flex items-center justify-center space-x-1 md:space-x-2 transition-opacity duration-300"
        style={{
          opacity: 'var(--about-us-assembly-opacity, 1)',
          whiteSpace: 'nowrap'
        } as React.CSSProperties}
      >
        {aboutUsWords.map((word, wordIndex) => (
          <div key={wordIndex} className="flex items-center justify-center space-x-1 md:space-x-2">
            {word.split('').map((letter, letterIndex) => {
              const globalLetterIndex = aboutUsWords.slice(0, wordIndex).join('').length + wordIndex + letterIndex;
              return (
                <h2 key={letterIndex} className="text-[20vw] md:text-[16vw] lg:text-[240px] font-black leading-none" style={{
                  fontFamily: 'serif',
                  transform: `var(--about-us-letter-${globalLetterIndex}-transform)`,
                  opacity: `var(--about-us-letter-${globalLetterIndex}-opacity, 0)`,
                  color: 'transparent',
                  WebkitTextStroke: '1px white',
                } as React.CSSProperties}>
                  {letter}
                </h2>
              )
            })}
            {wordIndex < aboutUsWords.length - 1 && <div className="w-8 md:w-12" />}
          </div>
        ))}
      </div>

      {/* VERSION 2: The "Simple & Performant" version for the video reveal. */}
      {/* This is hidden until the assembly is complete. */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 transition-opacity duration-300"
        style={{
          opacity: 'var(--about-us-reveal-opacity, 0)',
          whiteSpace: 'nowrap',
        }}
      >
        <video autoPlay loop muted playsInline className="absolute top-0 left-0 w-full h-full object-cover -z-10">
          <source src="/O_optimized.webm" type="video/webm" />
        </video>
        <h2
          className="text-[20vw] md:text-[16vw] lg:text-[240px] font-black leading-none"
          style={{
            fontFamily: 'serif',
            background: '#fff',
            color: '#000',
            mixBlendMode: 'screen',
            letterSpacing: '0.05em', // Adjust to match kerning of multi-part version
            wordSpacing: '0.25em'   // Adjust to match space between words
          }}
        >
          ABOUT US
        </h2>
      </div>
    </div>
  );
};

export default AboutUsWatermark;