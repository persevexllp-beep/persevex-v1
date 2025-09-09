// Filename: components/CurriculumSection.tsx

"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ModuleType } from '../constants/courseConstant'; // Adjust path if needed
import { Check, ChevronDown } from 'lucide-react';

interface CurriculumSectionProps {
  modules: ModuleType[];
}

// Framer Motion variants for the staggered animation of list items
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};

const CurriculumSection: React.FC<CurriculumSectionProps> = ({ modules }) => {
  // State to track which accordion item is open. `null` means all are closed.
  // We default it to `0` to have the first module open initially.
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <div className="py-24">
      <div className="text-center max-w-4xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-12 bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
          Course Curriculum
        </h2>
      </div>

      <motion.div
        className="max-w-5xl mx-auto flex flex-col gap-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {modules.map((module, index) => {
          const isExpanded = index === expanded;

          return (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-gradient-to-br from-gray-900/50 via-gray-900/20 to-transparent border border-cyan-500/20 rounded-2xl shadow-lg shadow-cyan-900/20 overflow-hidden"
            >
              {/* Module Header - Clickable to toggle accordion */}
              <motion.header
                initial={false}
                onClick={() => setExpanded(isExpanded ? null : index)}
                className={`flex justify-between items-center p-6 cursor-pointer transition-colors duration-300 ${isExpanded ? 'bg-cyan-900/30' : 'hover:bg-cyan-900/20'}`}
              >
                <h3 className="text-xl font-bold text-white">
                  Module {index + 1}: {module.title}
                </h3>
                <div className="flex items-center gap-6">
                    <div className="hidden sm:flex items-center gap-4 text-sm text-neutral-300">
                        <span>{module.duration}</span>
                        <span>&bull;</span>
                        <span>{module.lessons} lessons</span>
                    </div>
                    <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        <ChevronDown className="w-6 h-6 text-cyan-400" />
                    </motion.div>
                </div>
              </motion.header>

              {/* Module Content - Animates open and closed */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.section
                    key="content"
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={{
                      open: { opacity: 1, height: 'auto' },
                      collapsed: { opacity: 0, height: 0 },
                    }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className="overflow-hidden" // Important for smooth height animation
                  >
                    <div className="p-6 pt-4">
                      <p className="text-neutral-300 mb-6">{module.description}</p>
                      <ul className="space-y-3">
                        {module.topics.map((topic, topicIndex) => (
                          <li key={topicIndex} className="flex items-center gap-3">
                            <Check className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                            <span className="text-neutral-200">{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.section>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default CurriculumSection;