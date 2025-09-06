"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- HELPER HOOK ---
const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(typeof window !== "undefined" && window.innerWidth < breakpoint);
    };
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, [breakpoint]);
  return isMobile;
};

// --- MODIFIED PROPS INTERFACE ---
interface AboutUsExtendedCompProps {
  stackingProgress: number;
  cascadingProgress: number;
  // This new prop is a function to pass the sentinel element ref up to the parent
  setSentinelRef?: (el: HTMLDivElement | null) => void;
}

// Data remains the same
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

const faqData = [
    {
      question: "What is the core philosophy of Persevex?",
      answer: "Our core philosophy is that learning should be an open, adaptive journey. We believe in empowering every learner with tools and experiences that nurture curiosity, resilience, and real-world application, transforming them into future creators and leaders."
    },
    {
      question: "How do I enroll in a course or internship?",
      answer: "You can browse our available courses and internships on their respective pages. Simply click on the one you're interested in and follow the on-screen instructions to register and begin your learning journey with us."
    },
    {
      question: "What makes the Persevex LMS unique?",
      answer: "Our Learning Management System (LMS) is designed for deep, meaningful engagement. It integrates innovative tools, collaborative features, and a focus on practical application to ensure that knowledge is not just memorized, but truly absorbed and understood."
    },
    {
      question: "Are there any features for educators?",
      answer: "Yes! We provide a comprehensive suite of tools for educators to create, manage, and deliver engaging content. Our platform supports various teaching methodologies and provides analytics to track learner progress and adapt to their needs."
    }
];

// --- MAIN COMPONENT ---
export default function AboutUsExtendedComp({
  stackingProgress,
  cascadingProgress,
  setSentinelRef // Destructure the new prop
}: AboutUsExtendedCompProps) {
  const isMobile = useIsMobile();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [expandedCardIndex, setExpandedCardIndex] = useState<number | null>(null);
  
  // --- NEW ---
  // Create a ref for the sentinel element
  const mobileSentinelRef = useRef<HTMLDivElement>(null);

  // --- NEW ---
  // Use an effect to pass the ref's current element up to the parent
  useEffect(() => {
    if (isMobile && setSentinelRef) {
      setSentinelRef(mobileSentinelRef.current);
    }
    // Clean up when switching to desktop
    return () => {
        if(setSentinelRef) setSentinelRef(null);
    }
  }, [isMobile, setSentinelRef]);


  if (isMobile) {
    return (
      <div className="flex flex-col items-center w-full min-h-screen px-4 py-16 pt-32  text-white gap-20">
        
        {/* Story Cards Section */}
        <motion.div
          className="flex flex-col gap-4 w-full max-w-md"
          layout
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {cardData.map((card, index) => {
            const isExpanded = expandedCardIndex === index;
            return (
              <motion.div
                key={index}
                layout
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                onClick={() => setExpandedCardIndex(isExpanded ? null : index)}
                className="bg-black/30 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg overflow-hidden cursor-pointer"
              >
                <motion.div layout className="relative h-48 w-full">
                    <img src={card.imageSrc} alt={card.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end p-5">
                        <h3 className="text-2xl font-bold text-white">{card.title}</h3>
                    </div>
                </motion.div>
                
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.section
                      key="content"
                      initial="collapsed"
                      animate="open"
                      exit="collapsed"
                      variants={{
                        open: { opacity: 1, height: 'auto' },
                        collapsed: { opacity: 0, height: 0 }
                      }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="p-5">
                        <p className="text-gray-300 text-sm leading-relaxed">{card.content}</p>
                      </div>
                    </motion.section>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

        {/* FAQ Section */}
        <motion.div 
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="flex flex-col gap-4">
             {faqData.map((item, index) => {
                const isExpanded = expandedIndex === index;
                return (
                    <motion.div key={index} className="flex flex-col">
                        <motion.button
                            onClick={() => setExpandedIndex(isExpanded ? null : index)}
                            className="flex items-center justify-between w-full p-5 text-left text-white rounded-xl bg-black/30 border-2 border-white/20 cursor-pointer"
                        >
                            <span className="font-semibold text-base">{item.question}</span>
                            <motion.div
                                className="text-xl font-thin"
                                animate={{ rotate: isExpanded ? 45 : 0 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                            >
                                +
                            </motion.div>
                        </motion.button>
                        <AnimatePresence initial={false}>
                            {isExpanded && (
                                <motion.section
                                    key="content"
                                    initial="collapsed"
                                    animate="open"
                                    exit="collapsed"
                                    variants={{
                                      open: { opacity: 1, height: 'auto', marginTop: '16px' },
                                      collapsed: { opacity: 0, height: 0, marginTop: '0px' }
                                    }}
                                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                                    className="text-gray-300 text-sm leading-relaxed px-5 overflow-hidden"
                                >
                                    {item.answer}
                                </motion.section>
                            )}
                        </AnimatePresence>
                    </motion.div>
                );
             })}
          </div>
        </motion.div>
        
        {/* --- NEW --- 
            This is the invisible sentinel element. 
            It's placed at the very end of all the mobile content. 
        */}
        <div ref={mobileSentinelRef} style={{ height: '1px', width: '1px', pointerEvents: 'none' }} />
      </div>
    );
  }

  // --- DESKTOP VERSION (Original Code - Unchanged) ---
  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
  const easedStackingProgress = easeOutCubic(stackingProgress);
  const isCard1Expanded = cascadingProgress >= 1.8 ? 1 : 0;
  const isCard2Expanded = cascadingProgress >= 2.8 ? 1 : 0;
  const expansionProgress = easeOutCubic(Math.max(0, Math.min(cascadingProgress / 0.8, 1)));
  const cardFadeProgress = easeOutCubic(Math.max(0, Math.min((cascadingProgress - 3.0) / 0.5, 1)));
  const faqRiseProgress = easeOutCubic(Math.max(0, Math.min((cascadingProgress - 3.5) / 0.5, 1)));
  const cardStackOpacity = 1 - cardFadeProgress;
  const faqOpacity = faqRiseProgress;
  const faqTranslateY = (1 - faqRiseProgress) * 600;

  const getCardStyle = (index: number): React.CSSProperties => {
    let transform = "", zIndex = 0, opacity = 1;
    let width: string | number = 320, height: string | number = 256;
    const unstackedProgress = 1 - easedStackingProgress;
    const verticalOffset = 16, revealDistance = 400;
    const finalWidth = 1000, finalHeight = 380, stackPushDownOffset = -16;

    switch (index) {
      case 0: {
        const translateX = `${-110 * unstackedProgress}%`;
        const translateY = expansionProgress * -10 + isCard1Expanded * stackPushDownOffset + isCard2Expanded * stackPushDownOffset;
        width = 320 + (finalWidth - 320) * expansionProgress;
        height = 256 + (finalHeight - 256) * expansionProgress;
        transform = `translateX(${translateX}) translateY(${translateY}px)`;
        zIndex = 10;
        break;
      }
      case 1: {
        if (isCard1Expanded) {
          width = finalWidth; height = finalHeight;
          const endY = -10, yAfterPush = endY + isCard2Expanded * stackPushDownOffset;
          transform = `translateY(${yAfterPush}px)`; zIndex = 15; opacity = 1;
        } else if (cascadingProgress >= 1.0) {
          const card1StackingProgress = easeOutCubic(Math.max(0, Math.min((cascadingProgress - 1.0) / 0.8, 1)));
          width = finalWidth; height = finalHeight; zIndex = 15;
          opacity = card1StackingProgress;
          const startY = 800, endY = -10, currentY = startY + (endY - startY) * card1StackingProgress;
          transform = `translateY(${currentY}px)`;
        } else {
          const stackingY = verticalOffset * easedStackingProgress;
          const stage1Progress = easeOutCubic(Math.min(cascadingProgress, 1));
          const revealY = stage1Progress * revealDistance;
          const finalTranslateY = stackingY + revealY;
          const fadeProgress = Math.max(0, Math.min((cascadingProgress - 0.4) / 0.4, 1));
          opacity = 1 - fadeProgress;
          transform = `translateX(0%) translateY(${finalTranslateY}px)`;
          zIndex = 20;
        }
        break;
      }
      case 2: {
        if (isCard2Expanded) {
          width = finalWidth; height = finalHeight;
          transform = `translateY(-10px)`; zIndex = 20; opacity = 1;
        } else if (cascadingProgress >= 2.0) {
          const card2StackingProgress = easeOutCubic(Math.max(0, Math.min((cascadingProgress - 2.0) / 0.8, 1)));
          width = finalWidth; height = finalHeight; zIndex = 20;
          opacity = card2StackingProgress;
          const startY = 800, endY = -10, currentY = startY + (endY - startY) * card2StackingProgress;
          transform = `translateY(${currentY}px)`;
        } else {
          const translateX = `${110 * unstackedProgress}%`;
          const stackingY = verticalOffset * 2 * easedStackingProgress;
          const stage1Progress = easeOutCubic(Math.min(cascadingProgress, 1)), stage1RevealY = stage1Progress * revealDistance;
          const stage2Progress = easeOutCubic(Math.max(0, Math.min(cascadingProgress - 1, 1))), stage2RevealY = stage2Progress * revealDistance;
          const finalTranslateY = stackingY + (stage1RevealY * 1.50) + stage2RevealY;
          const fadeProgress = Math.max(0, Math.min((cascadingProgress - 1.4) / 0.4, 1));
          opacity = 1 - fadeProgress;
          transform = `translateX(${translateX}) translateY(${finalTranslateY}px)`;
          zIndex = 30;
        }
        break;
      }
      default: break;
    }
    return { transform, zIndex, opacity, width: `${width}px`, height: `${height}px`, position: "absolute", transition: "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s ease-out" };
  };

  return (
    <div className="flex flex-col items-center justify-start w-full pt-20 text-white">
      <div className="relative w-full max-w-7xl lg-w-full mx-auto px-4 sm-px-6 min-h-[30rem]">
        <div className="absolute inset-0 flex items-center justify-center w-full" style={{ opacity: cardStackOpacity, pointerEvents: cardStackOpacity < 0.1 ? 'none' : 'auto' }}>
          {cardData.map((card, index) => {
            let cardExpansionProgress = 0;
            if (index === 0) cardExpansionProgress = expansionProgress > 0.99 ? 1 : 0;
            else if (index === 1) cardExpansionProgress = isCard1Expanded;
            else if (index === 2) cardExpansionProgress = isCard2Expanded;

            const dynamicGap = 8 + cardExpansionProgress * 24;
            const textContainerStyle: React.CSSProperties = { flexGrow: 0, flexShrink: 0, flexBasis: cardExpansionProgress ? `calc(50% - ${dynamicGap / 2}px)` : "100%", display: "flex", flexDirection: "column" };
            const imageContainerStyle: React.CSSProperties = { flexGrow: 0, flexShrink: 0, flexBasis: cardExpansionProgress ? `calc(50% - ${dynamicGap / 2}px)` : "0%", maxWidth: cardExpansionProgress ? `calc(50% - ${dynamicGap / 2}px)` : "0%", opacity: cardExpansionProgress };
            
            let shouldShowContent = true;
            if (index === 0) { if (expansionProgress > 0 && expansionProgress <= 0.99) { shouldShowContent = false; } } 
            else if (index === 1) { if (cascadingProgress >= 1.0 && !isCard1Expanded) { shouldShowContent = false; } } 
            else if (index === 2) { if (cascadingProgress >= 2.0 && !isCard2Expanded) { shouldShowContent = false; } }
            
            let contentOpacity = 1;
            if (index === 0) { if (cascadingProgress >= 1.0) { const fadeProgress = easeOutCubic(Math.max(0, Math.min((cascadingProgress - 1.0) / 0.8, 1))); contentOpacity = 1 - fadeProgress; } } 
            else if (index === 1) { if (cascadingProgress >= 2.0) { const fadeProgress = easeOutCubic(Math.max(0, Math.min((cascadingProgress - 2.0) / 0.8, 1))); contentOpacity = 1 - fadeProgress; } }

            return (
              <div key={index} className="bg-black/30 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-8 overflow-hidden" style={{ ...getCardStyle(index) }}>
                {shouldShowContent && (
                  <div className="flex items-center w-full h-full" style={{ opacity: contentOpacity, gap: `${dynamicGap}px`, transition: "opacity 0.4s ease-out" }}>
                    <div style={imageContainerStyle}>
                      <AnimatePresence>
                        {cardExpansionProgress === 1 && (<motion.img key={`image-${index}`} initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -20, scale: 0.95 }} transition={{ duration: 0.3, ease: "easeInOut" }} src={card.imageSrc} alt={card.title} className="w-68 h-68 object-cover rounded-xl"/>)}
                      </AnimatePresence>
                    </div>
                    <div style={textContainerStyle}>
                      <AnimatePresence>
                        {cardExpansionProgress === 1 ? (
                          <motion.div key={`expanded-${index}`} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} transition={{ duration: 0.2, ease: "easeInOut" }}>
                            <h3 className="text-3xl font-bold mb-6 flex-shrink-0">{card.title}</h3>
                            <p className="text-gray-300 text-sm leading-relaxed flex-1">
                              {card.content.split(" ").map((word, wordIndex) => (<motion.span key={`${word}-${wordIndex}`} initial={{ filter: "blur(10px)", opacity: 0, y: 5 }} animate={{ filter: "blur(0px)", opacity: 1, y: 0 }} transition={{ duration: 0.2, ease: "easeInOut", delay: 0.02 * wordIndex }} className="inline-block">{word}&nbsp;</motion.span>))}
                            </p>
                          </motion.div>
                        ) : (
                          <div key={`truncated-${index}`}>
                            <h3 className="text-3xl font-bold mb-6 flex-shrink-0">{card.title}</h3>
                            <p className="text-gray-300 text-sm leading-relaxed flex-1" style={{ display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden', WebkitLineClamp: 3 }}>{card.content}</p>
                          </div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="absolute inset-0 flex items-center justify-center w-full">
            <motion.div className="w-full max-w-3xl mx-auto flex flex-col gap-4" initial={false} animate={{ opacity: faqOpacity, translateY: faqTranslateY }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
                {faqData.map((item, index) => {
                    const isExpanded = expandedIndex === index;
                    return (
                        <motion.div key={index} className="flex flex-col">
                            <motion.button onClick={() => setExpandedIndex(isExpanded ? null : index)} className={`flex items-center justify-between w-full p-5 text-left text-white rounded-3xl cursor-pointer border-2 border-[rgba(255,255,255,0.3)]`} whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 400, damping: 20 }}>
                                <span className="font-semibold text-lg">{item.question}</span>
                                <motion.div className="text-2xl font-thin" animate={{ rotate: isExpanded ? 45 : 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }}>+</motion.div>
                            </motion.button>
                            <AnimatePresence initial={false}>
                                {isExpanded && (
                                    <motion.section key="content" initial={{ opacity: 0, height: 0, marginTop: 0 }} animate={{ opacity: 1, height: 'auto', marginTop: '16px' }} exit={{ opacity: 0, height: 0, marginTop: 0 }} transition={{ duration: 0.4, ease: 'easeInOut' }} className="text-gray-300 text-sm leading-relaxed px-5 overflow-hidden">{item.answer}</motion.section>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    );
                })}
            </motion.div>
        </div>
      </div>
    </div>
  );
}