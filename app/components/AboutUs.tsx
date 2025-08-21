"use client";

import React, { FC, RefObject } from "react";

const aboutUsWords = "ABOUT US".split(' ');

interface AboutUsSectionProps {
  contentProgress: number;
  storyWatermarkRef: RefObject<HTMLHeadingElement | null>;
  videoTextContainerRef: RefObject<HTMLDivElement | null>;
}

const AboutUsSection: FC<AboutUsSectionProps> = ({ contentProgress, storyWatermarkRef, videoTextContainerRef }) => {
  const contentOpacity = contentProgress > 0.5 ? 1 : 0;

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full z-10 pointer-events-none overflow-hidden">
        <h2
          ref={storyWatermarkRef}
          className="absolute bottom-6 left-1/2 z-[-5] text-[20vw] md:text-[16vw] lg:text-[240px] font-black uppercase text-transparent select-none leading-none"
          style={{ opacity: 0, WebkitTextStroke: "1px white", transform: 'translateX(-50%) translateY(4rem)', whiteSpace: 'nowrap' }}
        >
          Our Story
        </h2>
        <div
          ref={videoTextContainerRef}
          className="absolute left-1/2 z-[-4] flex items-center justify-center space-x-1 md:space-x-2"
          style={{
            bottom: '1.5rem',
            opacity: 0,
            transform: 'var(--about-us-container-transform, translateX(-50%))',
            whiteSpace: 'nowrap'
          } as React.CSSProperties}
        >
          {aboutUsWords.map((word, wordIndex) => (
            <div key={wordIndex} className="flex items-center justify-center space-x-1 md:space-x-2">
              {word.split('').map((letter, letterIndex) => {
                const globalLetterIndex = aboutUsWords.slice(0, wordIndex).join(' ').length + (wordIndex > 0 ? 1 : 0) + letterIndex;
                return (
                  <h2
                    key={letterIndex}
                    className="relative text-[20vw] md:text-[16vw] lg:text-[240px] font-black leading-none"
                    style={{
                      fontFamily: 'serif',
                      transform: `var(--about-us-letter-${globalLetterIndex}-transform, translateY(20vh) scale(0.5))`,
                      opacity: `var(--about-us-letter-${globalLetterIndex}-opacity, 0)`,
                      WebkitMaskImage: 'linear-gradient(white, white)',
                      maskImage: 'linear-gradient(white, white)',
                      WebkitMaskClip: 'text',
                      maskClip: 'text',
                      color: 'transparent',
                    } as React.CSSProperties}
                  >
                    <video src={"/videos/U.mp4"} autoPlay loop muted playsInline className="absolute top-0 left-0 w-full h-full object-cover -z-10" />
                    {letter}
                  </h2>
                );
              })}
              {wordIndex < aboutUsWords.length - 1 && <div className="w-8 md:w-12" />}
            </div>
          ))}
        </div>
      </div>

      <div className="sticky top-0 h-screen w-full flex items-center justify-center">
        <div
          className="text-center text-white max-w-3xl px-4 transition-opacity duration-1000"
          style={{ opacity: contentOpacity }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg md:text-xl text-gray-300">
            This is where you can write about your company's story, values, and vision. The content will appear as the watermark animation concludes.
          </p>
        </div>
      </div>
    </>
  );
};

export default React.memo(AboutUsSection);