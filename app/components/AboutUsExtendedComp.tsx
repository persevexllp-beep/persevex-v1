// Make sure to install framer-motion: npm install framer-motion
import React from "react";
import { motion, AnimatePresence } from "framer-motion"; // Import motion components

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
      "The mission of Persevex is to redefine the way education empowers people. We believe that perseverance, when guided by the right tools, can unlock limitless possibilities. Through innovation, meaningful experiences and a focus on real-world application, we are are committed to making education accessible to everyone everywhere. Our purpose is not only to teach but to inspire resilience, nurture potential and create a generation of learners who are ready to succeed and ready to lead with knowledge and confidence.",
  },
];

export default function AboutUsExtendedComp({
  stackingProgress,
  cascadingProgress,
}: AboutUsExtendedCompProps) {
  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
  const easedStackingProgress = easeOutCubic(stackingProgress);

  const SCALE_START = 2.2;
  const STACK_1_START = 4.0;
  const STACK_2_START = 5.5;

  const isCard1Expanded = cascadingProgress >= STACK_1_START ? 1 : 0;
  const isCard2Expanded = cascadingProgress >= STACK_2_START ? 1 : 0;
  
  // Calculate a smooth progress for card 0's expansion from 0 to 1.
  const expansionProgress = easeOutCubic(
    Math.max(0, Math.min(cascadingProgress / SCALE_START, 1))
  );

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
        
        const translateY =
          expansionProgress * -10 + 
          isCard1Expanded * stackPushDownOffset +
          isCard2Expanded * stackPushDownOffset;

        width = 320 + (finalWidth - 320) * expansionProgress;
        height = 256 + (finalHeight - 256) * expansionProgress;

        transform = `translateX(${translateX}) translateY(${translateY}px)`;
        zIndex = 10;
        break;
      }
      case 1: {
        if (isCard1Expanded) {
          width = finalWidth;
          height = finalHeight;
          const endY = -10;
          const yAfterPush = endY + isCard2Expanded * stackPushDownOffset;

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
          const fadeProgress = Math.max(
            0,
            Math.min((cascadingProgress - fadeStart) / fadeDuration, 1)
          );

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
          const stage2Progress = easeOutCubic(
            Math.max(0, Math.min(cascadingProgress - 1, 1))
          );
          const stage2RevealY = stage2Progress * revealDistance;
          const finalTranslateY = stackingY + (stage1RevealY * 1.50) + stage2RevealY;
          const fadeStart = 2.0;
          const fadeDuration = 0.5;
          const fadeProgress = Math.max(
            0,
            Math.min((cascadingProgress - fadeStart) / fadeDuration, 1)
          );

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
      transform,
      zIndex,
      opacity,
      width: `${width}px`,
      height: `${height}px`,
      position: "absolute",
      transition:
        "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s ease-out",
    };
  };

  return (
    <div className="flex flex-col items-center justify-center w-full gap-16 mt-20 text-white">
      <div className="max-w-7xl lg-w-full mx-auto px-4 sm:px-6">
        <div className="relative flex items-center justify-center min-h-[24rem] w-full">
          {cardData.map((card, index) => {
            let cardExpansionProgress = 0;
            
            // This is the trigger for the final content to show up
            if (index === 0) cardExpansionProgress = expansionProgress > 0.99 ? 1 : 0;
            else if (index === 1) cardExpansionProgress = isCard1Expanded;
            else if (index === 2) cardExpansionProgress = isCard2Expanded;

            const dynamicGap = 8 + cardExpansionProgress * 24;

            const textContainerStyle: React.CSSProperties = {
              flexGrow: 0,
              flexShrink: 0,
              flexBasis: cardExpansionProgress
                ? `calc(50% - ${dynamicGap / 2}px)`
                : "100%",
              transition: "flex-basis 0.8s ease-in-out",
              display: "flex",
              flexDirection: "column",
            };

            const imageContainerStyle: React.CSSProperties = {
              flexGrow: 0,
              flexShrink: 0,
              flexBasis: cardExpansionProgress
                ? `calc(50% - ${dynamicGap / 2}px)`
                : "0%",
              maxWidth: cardExpansionProgress
                ? `calc(50% - ${dynamicGap / 2}px)`
                : "0%",
              opacity: cardExpansionProgress,
              transition:
                "flex-basis 0.6s ease-in-out, opacity 0.6s ease-in-out, max-width 0.6s ease-in-out",
            };

            // --- CHANGE IS HERE ---
            // The logic is now very simple:
            // Is this the first card, has the expansion started, AND has the final content *not* appeared yet?
            // If yes, the flash is on (opacity: 1). Otherwise, it's off (opacity: 0).
            const flashOpacity = (index === 0 && expansionProgress > 0 && cardExpansionProgress === 0) ? 1 : 0;

            return (
              <div
                key={index}
                className="flex items-center bg-black/30 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-8 overflow-hidden"
                style={{ ...getCardStyle(index), gap: `${dynamicGap}px` }}
              >
                {/* The white flash overlay for card 0 during expansion */}
                {index === 0 && (
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      background: 'black',
                      opacity: flashOpacity,
                      borderRadius: 'inherit',
                      pointerEvents: 'none',
                      zIndex: 50,
                      backdropFilter: 'blur(64px)',
                      // A CSS transition makes the change from opacity 1 to 0 smooth
                      transition: 'opacity 0.3s ease-out',
                    }}
                  />
                )}
                <div style={imageContainerStyle}>
                  {/* --- IMAGE ANIMATION --- */}
                  <AnimatePresence>
                    {cardExpansionProgress === 1 && (
                      <motion.img
                        key={`image-${index}`}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        src={card.imageSrc}
                        alt={card.title}
                        className="w-68  h-68 object-cover rounded-xl"
                      />
                    )}
                  </AnimatePresence>
                </div>
                <div style={textContainerStyle}>
                  {/* --- TEXT ANIMATION --- */}
                  <AnimatePresence>
                    {cardExpansionProgress === 1 ? (
                      <motion.div
                        key={`content-${index}`}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={{
                          visible: { transition: { staggerChildren: 0.05 } },
                        }}
                      >
                        <motion.h3
                          variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                          }}
                          className="text-3xl font-bold mb-6 flex-shrink-0"
                        >
                          {card.title}
                        </motion.h3>
                        <p className="text-gray-300 text-sm leading-relaxed flex-1">
                          {card.content.split(" ").map((word, wordIndex) => (
                            <motion.span
                              key={`${word}-${wordIndex}`}
                              variants={{
                                hidden: { filter: "blur(10px)", opacity: 0 },
                                visible: { filter: "blur(0px)", opacity: 1 },
                              }}
                              transition={{
                                duration: 0.3,
                                ease: "easeInOut",
                              }}
                              className="inline-block"
                            >
                              {word}&nbsp;
                            </motion.span>
                          ))}
                        </p>
                      </motion.div>
                    ) : (
                      <div>
                        <h3 className="text-3xl font-bold mb-6 flex-shrink-0">{card.title}</h3>
                        <p
                          className="text-gray-300 text-sm leading-relaxed flex-1"
                          style={{
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            WebkitLineClamp: 3,
                          }}
                        >
                          {card.content}
                        </p>
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}