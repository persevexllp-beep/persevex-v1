"use client";

import React, { useState } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Briefcase, FileBadge, ChevronRight, ArrowRight, ArrowDown } from 'lucide-react';

const MotionLink = motion(Link);

type ProgramItem = { name: string; href: string; };
type ProgramCategory = { branch: string; items: ProgramItem[]; };

interface ProgramsMegaMenuProps {
  programCategories: ProgramCategory[];
  onClose: () => void;
}

const megaMenuVariants: Variants = {
  hidden: { opacity: 0, y: -10, scale: 0.98, transition: { duration: 0.2, ease: "easeOut" } },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 400, damping: 30 } },
};

const domainItemVariants: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.2, ease: 'easeOut' } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.15, ease: 'easeIn' } },
};

export default function ProgramsMegaMenu({ programCategories, onClose }: ProgramsMegaMenuProps) {
  // Set default active states to match the provided image
  const [activeProgram, setActiveProgram] = useState<'Internship Program' | 'Placement Provision Program'>('Placement Provision Program');
  const [activeTopic, setActiveTopic] = useState(programCategories[0]?.branch || '');

  const programs = [
    { name: 'Internship Program', label: 'INTERNSHIP PROGRAM', icon: <Briefcase size={28} /> },
    { name: 'Placement Provision Program', label: 'PLACEMENT PROVISION PROGRAM', icon: <FileBadge size={28} /> },
  ];

  const activeCourses = programCategories.find(cat => cat.branch === activeTopic)?.items || [];

  return (
    <motion.div
      layout
      transition={{ type: "spring", stiffness: 500, damping: 40 }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[950px] rounded-2xl shadow-2xl backdrop-blur-lg z-10 text-white overflow-hidden"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={megaMenuVariants}
    >
      <div className="grid grid-cols-3">
        {/* Column 1: Program */}
        <div className="p-6">
          <h3 className="text-lg font-semibold text-orange-500 mb-4 flex items-center gap-2">
            Program <ArrowRight size={20} className="text-orange-500" />
          </h3>
          <div className="space-y-3">
            {programs.map((prog) => {
              const isActive = activeProgram === prog.name;
              return (
                <button
                  key={prog.name}
                  onClick={() => setActiveProgram(prog.name as 'Internship Program' | 'Placement Provision Program')}
                  className={`relative w-full p-4 rounded-lg text-left transition-all duration-300 flex items-center gap-4 ${
                    isActive
                      ? 'bg-orange-500 text-white shadow-lg font-bold'
                      : 'text-white/80 hover:bg-white/10'
                  }`}
                >
                  {isActive && <div className="absolute left-0 top-0 h-full w-1.5  rounded-l-lg" />}
                  {prog.icon}
                  <span className="text-sm tracking-wide">{prog.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Column 2: Topic */}
        <div className="p-6 ">
          <h3 className="text-lg font-semibold text-orange-500 mb-4 flex items-center gap-2">
            Topic <ArrowRight size={20} className="text-orange-400" />
          </h3>
          <div className="space-y-2">
            {programCategories.map((category) => {
              const isActive = activeTopic === category.branch;
              return(
                <button
                  key={category.branch}
                  onMouseEnter={() => setActiveTopic(category.branch)}
                  className={`w-full p-3 rounded-lg text-left transition-colors duration-200 flex items-center justify-between ${
                    isActive 
                      ? 'bg-orange-500 text-white font-semibold'
                      : 'text-white/80 hover:bg-white/10'
                  }`}
                >
                  <span>{category.branch}</span>
                  {!isActive && <ChevronRight size={16} className="text-white/50" />}
                </button>
              )
            })}
          </div>
        </div>

        {/* Column 3: Course */}
        <div className="col-span-1 p-6">
          <h3 className="text-lg font-semibold text-orange-500 mb-4 flex items-center gap-2">
            Course <ArrowDown size={20} className="text-orange-400" />
          </h3>
          <div className="flex flex-col gap-1">
            <AnimatePresence mode="wait">
              {activeCourses.map((item) => (
                <MotionLink
                  key={item.name}
                  href={item.href}
                  className="text-white/80 rounded-md px-3 py-2 text-base transition-colors duration-200 hover:text-white hover:bg-white/10"
                  onClick={onClose}
                  variants={domainItemVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  layout
                >
                  {item.name}
                </MotionLink>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Footer: Training Partners */}
      <div className="border-t border-white/10 bg-black/10 px-8 py-4 flex justify-between items-center">
       
        <div className="flex items-center gap-2">
            <span className="text-xs text-white/60">recognized by</span>
            <div className="w-32 h-8 bg-white/10 rounded flex items-center justify-center font-bold text-orange-800 text-sm">#startupindia</div>
        </div>
      </div>
    </motion.div>
  );
}