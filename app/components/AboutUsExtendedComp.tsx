import React from "react";

interface AboutUsExtendedCompProps {
  stackingProgress: number;
  cascadingProgress: number;
}

const cardData = [
  {
    title: "Who We Are?",
    imageSrc: "/dog1.jpeg",
    content:
      "At Persevex, we are a collective of educators, innovators and visionaries who believe that learning should be an open journey filled with curiosity and growth. Education for us is not a rigid system but a living experience that adapts to the pace and potential of every learner. With perseverance and passion as our foundation, we are building a platform where knowledge is absorbed deeply, where learners grow into creators, leaders and changemakers who can shape the future."
  },
  {
    title: "Our Story",
    imageSrc: "/cat2.jpeg",
    content:
      "The mission of Persevex is to redefine the way education empowers people. We believe that perseverance, when guided by the right tools, can unlock limitless possibilities. Through innovation, meaningful experiences and a focus on real-world application, we are committed to making education accessible to everyone everywhere. Our purpose is not only to teach but to inspire resilience, nurture potential and create a generation of learners who are ready to succeed and ready to lead with knowledge and confidence."
  },
  {
    title: "Our Mission",
    imageSrc: "/dog3.jpg",
    content:
      "The mission of Persevex is to redefine the way education empowers people. We believe that perseverance, when guided by the right tools, can unlock limitless possibilities. Through innovation, meaningful experiences and a focus on real-world application, we are committed to making education accessible to everyone everywhere. Our purpose is not only to teach but to inspire resilience, nurture potential and create a generation of learners who are ready to succeed and ready to lead with knowledge and confidence.",
  },
];

export default function AboutUsExtendedComp({
  stackingProgress,
  cascadingProgress,
}: AboutUsExtendedCompProps) {
  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
  const easedStackingProgress = easeOutCubic(stackingProgress);

  // --- Animation Timeline Definitions ---
  const SCALE_START = 2.2;
  const STACK_1_START = 4.0; 
  const STACK_2_START = 5.5; 

  // --- Determine which cards should be expanded ---
  const isCard0Expanded = cascadingProgress >= SCALE_START ? 1 : 0;
  const isCard1Expanded = cascadingProgress >= STACK_1_START ? 1 : 0;
  const isCard2Expanded = cascadingProgress >= STACK_2_START ? 1 : 0;


  const getCardStyle = (index: number): React.CSSProperties => {
    let transform = "";
    let zIndex = 0;
    let opacity = 1;
    let width: string | number = 320;
    let height: string | number = 256;

    const unstackedProgress = 1 - easedStackingProgress;
    const verticalOffset = 16;
    const revealDistance = 400;

    const finalWidth = 1200; 
    const finalHeight = 400;
    const stackPushDownOffset = 24;

    switch (index) {
      case 0: {
        const translateX = `${-110 * unstackedProgress}%`;
        const translateY = (isCard0Expanded * -10) + (isCard1Expanded * stackPushDownOffset) + (isCard2Expanded * stackPushDownOffset);
        
        width = 320 + (finalWidth - 320) * isCard0Expanded;
        height = 256 + (finalHeight - 256) * isCard0Expanded;

        transform = `translateX(${translateX}) translateY(${translateY}px)`;
        zIndex = 10;
        break;
      }
      case 1: {
        if (isCard1Expanded) {
          width = finalWidth;
          height = finalHeight;
          const endY = -10;
          const yAfterPush = endY + (isCard2Expanded * stackPushDownOffset);

          transform = `translateY(${yAfterPush}px)`;
          zIndex = 15;
          opacity = 1;
        } else {
          const stackingY = verticalOffset * easedStackingProgress;
          const stage1Progress = easeOutCubic(Math.min(cascadingProgress, 1));
          const revealY = stage1Progress * revealDistance;
          const finalTranslateY = stackingY + revealY;
          const fadeStart = 1.5;
          const fadeDuration = 0.5;
          const fadeProgress = Math.max(0, Math.min((cascadingProgress - fadeStart) / fadeDuration, 1));
          
          opacity = 1 - fadeProgress;
          transform = `translateX(0%) translateY(${finalTranslateY}px)`;
          zIndex = 20;
        }
        break;
      }
      case 2: {
        if (isCard2Expanded) {
          width = finalWidth;
          height = finalHeight;
          const endY = -10;
          transform = `translateY(${endY}px)`;
          zIndex = 20;
          opacity = 1;
        } else {
          const translateX = `${110 * unstackedProgress}%`;
          const stackingY = verticalOffset * 2 * easedStackingProgress;
          const stage1Progress = easeOutCubic(Math.min(cascadingProgress, 1));
          const stage1RevealY = stage1Progress * revealDistance;
          const stage2Progress = easeOutCubic(Math.max(0, Math.min(cascadingProgress - 1, 1)));
          const stage2RevealY = stage2Progress * revealDistance;
          const finalTranslateY = stackingY + stage1RevealY + stage2RevealY;
          const fadeStart = 2.0;
          const fadeDuration = 0.5;
          const fadeProgress = Math.max(0, Math.min((cascadingProgress - fadeStart) / fadeDuration, 1));

          opacity = 1 - fadeProgress;
          if (cascadingProgress > STACK_2_START - 0.1) {
              opacity = 0;
          }
          transform = `translateX(${translateX}) translateY(${finalTranslateY}px)`;
          zIndex = 30;
        }
        break;
      }
      default:
        break;
    }

    return {
      transform, zIndex, opacity,
      width: `${width}px`,
      height: `${height}px`,
      position: "absolute",
      transition: "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s ease-out, width 0.8s ease-in-out, height 0.8s ease-in-out",
    };
  };

  return (
    <div className="flex flex-col items-center justify-center w-full gap-16 mt-20 text-white">
      <div className="max-w-7xl lg:w-full mx-auto px-4 sm:px-6">
        <div className="relative flex items-center justify-center min-h-[24rem] w-full">
          {cardData.map((card, index) => {
            let cardExpansionProgress = 0;
            if (index === 0) cardExpansionProgress = isCard0Expanded;
            else if (index === 1) cardExpansionProgress = isCard1Expanded;
            else if (index === 2) cardExpansionProgress = isCard2Expanded;

            const dynamicGap = 8 + cardExpansionProgress * 24;
            
            // --- CHANGE START ---
            
            // Style for the IMAGE to handle its fade-in animation
            const imageAnimationStyle: React.CSSProperties = {
              opacity: cardExpansionProgress,
              transition: 'opacity 0.5s ease-in-out',
              transitionDelay: cardExpansionProgress ? '0.4s' : '0s',
            };

            // Style for the PARAGRAPH to handle text truncation
            const paragraphStyle: React.CSSProperties = {
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              // When not expanded, clamp to 3 lines. When expanded, remove clamp.
              WebkitLineClamp: cardExpansionProgress ? undefined : 3,
            };

            const textContainerStyle: React.CSSProperties = {
              flexGrow: 0, flexShrink: 0,
              flexBasis: cardExpansionProgress ? `calc(50% - ${dynamicGap / 2}px)` : "100%",
              transition: "flex-basis 0.8s ease-in-out",
              display: 'flex',
              flexDirection: 'column',
            };

            const imageContainerStyle: React.CSSProperties = {
              flexGrow: 0, flexShrink: 0,
              flexBasis: cardExpansionProgress ? `calc(50% - ${dynamicGap / 2}px)` : "0%",
              maxWidth: cardExpansionProgress ? `calc(50% - ${dynamicGap / 2}px)` : "0%",
              opacity: cardExpansionProgress,
              transition: "flex-basis 0.6s ease-in-out, opacity 0.6s ease-in-out, max-width 0.6s ease-in-out",
            };

            // --- CHANGE END ---
            
            return (
              <div
                key={index}
                className="flex items-center bg-black/30 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-8 overflow-hidden"
                style={{ ...getCardStyle(index), gap: `${dynamicGap}px` }}
              >
                <div style={imageContainerStyle}>
                  {card.imageSrc && (
                    <img
                      src={card.imageSrc}
                      alt={card.title}
                      className="w-64  h-64 object-cover rounded-xl"
                      style={imageAnimationStyle} // Apply animation only to image
                    />
                  )}
                </div>
                <div style={textContainerStyle}>
                  {/* Text is now always visible */}
                  <h3 className="text-3xl font-bold mb-6 flex-shrink-0">{card.title}</h3>
                  <p 
                    className="text-gray-300 text-sm leading-relaxed flex-1"
                    style={paragraphStyle} // Apply truncation style here
                  >
                    {card.content}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}