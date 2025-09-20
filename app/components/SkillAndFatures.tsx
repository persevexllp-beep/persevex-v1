"use client";

import React from "react";
import { motion, Variants } from "framer-motion"; // <-- 1. IMPORT VARIANTS HERE
import { ArrowRight } from "lucide-react";

interface SkillsAndFeaturesProps {
  skills: string[];
  features: string[];
}

// 2. EXPLICITLY TYPE THE CONSTANTS
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function SkillsAndFeatures({ skills, features }: SkillsAndFeaturesProps) {
  const sectionsData = [
    {
      title: "Skills Covered",
      items: skills,
    },
    {
      title: "Key Features",
      items: features,
    },
  ].filter((section) => section.items && section.items.length > 0);

  if (sectionsData.length === 0) {
    return null;
  }

  return (
    <div className="text-white">
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {sectionsData.map((section, index) => (
          <motion.div
            key={index}
            className="relative bg-gradient-to-br from-gray-900 to-indigo-900/70 p-8 rounded-3xl overflow-hidden border border-white/10"
            variants={itemVariants} // <-- THIS WILL NO LONGER CAUSE AN ERROR
          >
            <div className="absolute top-[-80px] left-[-80px] w-72 h-72 bg-indigo-500/20 rounded-full filter blur-3xl opacity-60 z-0" />
            <div className="absolute bottom-[-100px] right-[-100px] w-80 h-80 bg-orange-500/10 rounded-full filter blur-3xl opacity-50 z-0" />

            <div className="relative z-10">
              <h3 className="flex items-center gap-3 text-2xl font-bold text-white">
                {section.title}
                <ArrowRight size={22} />
              </h3>

              <div className="my-6 border-b border-dashed border-white/20" />

              <ul className="space-y-3 list-disc list-inside">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-gray-300">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}