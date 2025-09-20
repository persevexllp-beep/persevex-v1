"use client";

import React from "react";
import { motion, Variants } from "framer-motion"; // <-- 1. IMPORT VARIANTS HERE

// Data for the cards to keep the component clean
const cardData = [
  {
    stat: "100%",
    label: "PAID INTERNSHIPS",
  },
  {
    stat: "4+",
    label: "PROJECTS",
  },
  {
    stat: "100%",
    label: "JOB ASSISTANCE",
  },
];

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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function TrustCards() {
  const dashedBorderUrl = `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='24' ry='24' stroke='%234B556380' stroke-width='2' stroke-dasharray='8%2c 8' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`;

  return (
    <div className="py-16 sm:py-24">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        {cardData.map((card, index) => (
          <motion.div
            key={index}
            className="relative bg-gray-900/40 p-8 rounded-3xl overflow-hidden"
            style={{ backgroundImage: dashedBorderUrl }}
            variants={itemVariants} // <-- THIS WILL NO LONGER CAUSE AN ERROR
          >
            <div className="relative z-10">
              <h2 className="text-6xl lg:text-7xl font-extrabold text-white">
                {card.stat}
              </h2>
              <p className="mt-2 text-sm font-semibold text-gray-400 tracking-widest uppercase">
                {card.label}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}