"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FAQType } from '@/app/constants/faqsData';

export default function AccordionItem({ 
  faq, 
  index 
}: { 
  faq: FAQType; 
  index: number;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      {/* Glow effect */}
      <div className="absolute -inset-0.5 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-1000 group-hover:duration-200"></div>
      
      {/* Main container */}
      <div className="relative backdrop-blur-xl rounded-2xl border border-gray-700/50 group-hover:border-orange-500/50 transition-all duration-300">
        {/* Question Header */}
        <motion.div
          onClick={toggleOpen}
          className="flex items-center justify-between cursor-pointer p-6 md:p-8"
          whileHover={{ scale: 1.001 }}
          whileTap={{ scale: 0.999 }}
        >
          <div className="flex items-start gap-4 flex-1">
            {/* Question number */}
            <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-orange-500 text-sm font-bold">
              {(index + 1).toString().padStart(2, '0')}
            </div>
            
            {/* Question text */}
            <h3 className="text-lg md:text-xl font-semibold text-white leading-relaxed pr-4">
              {faq.question}
            </h3>
          </div>
          
          {/* Chevron icon */}
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex-shrink-0 ml-4"
          >
            <div className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-orange-400"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
          </motion.div>
        </motion.div>

        {/* Answer Content */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial="collapsed"
              animate="open"
              exit="collapsed"
              variants={{
                open: { 
                  opacity: 1, 
                  height: 'auto'
                },
                collapsed: { 
                  opacity: 0, 
                  height: 0
                },
              }}
              transition={{ 
                duration: 0.3, 
                ease: [0.25, 0.46, 0.45, 0.94],
                opacity: { duration: 0.2 }
              }}
              className="overflow-hidden"
            >
              <div className="px-6 md:px-8 pb-8">
                <div className="pl-12 pr-4">
                  {/* Divider line */}
                  <div className="w-full h-px bg-gradient-to-r from-orange-500/50 to-transparent mb-6"></div>
                  
                  {/* Answer text */}
                  <div className="prose prose-invert max-w-none">
                    <p className="text-gray-300 text-sm md:text-lg leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}