"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

interface FaqSectionProps {
  progress: number; // For desktop scroll-driven animation
}

export default function FaqSection({ progress }: FaqSectionProps) {
  const isMobile = useIsMobile();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  if (isMobile) {
    return (
      <motion.div 
        className="w-full max-w-md px-4"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-white">Frequently Asked Questions</h2>
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
    );
  }

  // --- DESKTOP VERSION ---
  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
  const easedProgress = easeOutCubic(progress);
  const opacity = easedProgress;
  const translateY = (1 - easedProgress) * 300; // Start 300px below and rise up

  return (
    <motion.div
      className="w-full max-w-3xl mx-auto flex flex-col gap-4 text-white"
      initial={false}
      animate={{ opacity, y: translateY }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center justify-center">
        <h1 className="text-5xl font-bold mb-12">Frequently Asked Questions</h1>
      </div>
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
  );
}