// Make sure to install framer-motion: npm install framer-motion
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

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
      "The mission of Persevex is to redefine the way education empowers people. We believe that perseverance, when guided by the right tools, can unlock limitless possibilities. Through innovation, meaningful experiences and a focus on real-world application, we are committed to making education accessible to everyone everywhere. Our purpose is not only to teach but to inspire resilience, nurture potential and a generation of learners who are ready to succeed and ready to lead with knowledge and confidence."
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

  const SCALE_START = 0.6;
  const STACK_1_START = 1.6;
  const STACK_2_START = 2.6;

  const isCard1Expanded = cascadingProgress >= STACK_1_START ? 1 : 0;
  const isCard2Expanded = cascadingProgress >= STACK_2_START ? 1 : 0;

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

    const finalWidth = 1000;
    const finalHeight = 380;
    const stackPushDownOffset = -16;

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
        const PRE_STACK_1_START = 0.8;

        if (isCard1Expanded) {
          width = finalWidth;
          height = finalHeight;
          const endY = -10;
          const yAfterPush = endY + isCard2Expanded * stackPushDownOffset;

          transform = `translateY(${yAfterPush}px)`;
          zIndex = 15;
          opacity = 1;
        } else if (cascadingProgress >= PRE_STACK_1_START) {
          const card1StackingProgress = easeOutCubic(
            Math.max(
              0,
              Math.min(
                (cascadingProgress - PRE_STACK_1_START) /
                  (STACK_1_START - PRE_STACK_1_START),
                1
              )
            )
          );

          width = finalWidth;
          height = finalHeight;
          zIndex = 15;

          opacity = card1StackingProgress;
          const startY = 800;
          const endY = -10;
          const currentY = startY + (endY - startY) * card1StackingProgress;
          transform = `translateY(${currentY}px)`;

        } else {
          const stackingY = verticalOffset * easedStackingProgress;
          const stage1Progress = easeOutCubic(Math.min(cascadingProgress, 1));
          const revealY = stage1Progress * revealDistance;
          const finalTranslateY = stackingY + revealY;
          const fadeStart = 0.4;
          const fadeDuration = 0.4;
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
        const PRE_STACK_2_START = 1.8;

        if (isCard2Expanded) {
          width = finalWidth;
          height = finalHeight;
          const endY = -10;
          transform = `translateY(${endY}px)`;
          zIndex = 20;
          opacity = 1;
        } else if (cascadingProgress >= PRE_STACK_2_START) {
          const card2StackingProgress = easeOutCubic(
            Math.max(
              0,
              Math.min(
                (cascadingProgress - PRE_STACK_2_START) /
                  (STACK_2_START - PRE_STACK_2_START),
                1
              )
            )
          );

          width = finalWidth;
          height = finalHeight;
          zIndex = 20;

          opacity = card2StackingProgress;
          const startY = 800;
          const endY = -10;
          const currentY = startY + (endY - startY) * card2StackingProgress;
          transform = `translateY(${currentY}px)`;

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
          const fadeStart = 1.4;
          const fadeDuration = 0.4;
          const fadeProgress = Math.max(
            0,
            Math.min((cascadingProgress - fadeStart) / fadeDuration, 1)
          );

          opacity = 1 - fadeProgress;
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
      <div className="max-w-7xl lg-w-full mx-auto px-4 sm-px-6">
        <div className="relative flex items-center justify-center min-h-[24rem] w-full">
          {cardData.map((card, index) => {
            let cardExpansionProgress = 0;

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
            };

            const PRE_STACK_1_START = 0.8;
            const PRE_STACK_2_START = 1.8;

            let shouldShowContent = true;
            if (index === 0) {
              if (expansionProgress > 0 && expansionProgress <= 0.99) {
                shouldShowContent = false;
              }
            } else if (index === 1) {
              if (cascadingProgress >= PRE_STACK_1_START && !isCard1Expanded) {
                shouldShowContent = false;
              }
            } else if (index === 2) {
              if (cascadingProgress >= PRE_STACK_2_START && !isCard2Expanded) {
                shouldShowContent = false;
              }
            }
            
            // --- CHANGE STARTS HERE: Calculate opacity for fading out previous card's content ---
            let contentOpacity = 1;
            if (index === 0) {
              // Fade out card 0 when card 1 starts animating in
              if (cascadingProgress >= PRE_STACK_1_START) {
                const fadeProgress = easeOutCubic(
                  Math.max(
                    0,
                    Math.min(
                      (cascadingProgress - PRE_STACK_1_START) /
                        (STACK_1_START - PRE_STACK_1_START),
                      1
                    )
                  )
                );
                contentOpacity = 1 - fadeProgress;
              }
            } else if (index === 1) {
              // Fade out card 1 when card 2 starts animating in
              if (cascadingProgress >= PRE_STACK_2_START) {
                const fadeProgress = easeOutCubic(
                  Math.max(
                    0,
                    Math.min(
                      (cascadingProgress - PRE_STACK_2_START) /
                        (STACK_2_START - PRE_STACK_2_START),
                      1
                    )
                  )
                );
                contentOpacity = 1 - fadeProgress;
              }
            }
            // --- CHANGE ENDS HERE ---

            return (
              <div
                key={index}
                className="bg-black/30 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-8 overflow-hidden"
                style={{ ...getCardStyle(index) }}
              >
                {shouldShowContent && (
                  // --- CHANGE STARTS HERE: Added a wrapper to control content layout and opacity ---
                  <div
                    className="flex items-center w-full h-full"
                    style={{
                      opacity: contentOpacity,
                      gap: `${dynamicGap}px`,
                      transition: "opacity 0.4s ease-out",
                    }}
                  >
                    <div style={imageContainerStyle}>
                      <AnimatePresence>
                        {cardExpansionProgress === 1 && (
                          <motion.img
                            key={`image-${index}`}
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            src={card.imageSrc}
                            alt={card.title}
                            className="w-68 h-68 object-cover rounded-xl"
                          />
                        )}
                      </AnimatePresence>
                    </div>
                    <div style={textContainerStyle}>
                      <AnimatePresence>
                        {cardExpansionProgress === 1 ? (
                          <motion.div
                            key={`expanded-${index}`}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.2, ease: "easeInOut" }}
                          >
                            <h3 className="text-3xl font-bold mb-6 flex-shrink-0">
                              {card.title}
                            </h3>
                            <p className="text-gray-300 text-sm leading-relaxed flex-1">
                              {card.content.split(" ").map((word, wordIndex) => (
                                <motion.span
                                  key={`${word}-${wordIndex}`}
                                  initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
                                  animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                                  transition={{
                                    duration: 0.2,
                                    ease: "easeInOut",
                                    delay: 0.02 * wordIndex,
                                  }}
                                  className="inline-block"
                                >
                                  {word}&nbsp;
                                </motion.span>
                              ))}
                            </p>
                          </motion.div>
                        ) : (
                          <div key={`truncated-${index}`}>
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
                   // --- CHANGE ENDS HERE ---
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}