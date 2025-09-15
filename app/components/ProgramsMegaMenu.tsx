"use client";

import React, { useState } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Briefcase } from 'lucide-react';

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
  const [activeProgram, setActiveProgram] = useState<'Internship' | 'Placement'>('Internship');
  const [activeBranch, setActiveBranch] = useState(programCategories[0]?.branch || '');

  const programs = [
    { name: 'Internship', label: 'INTERNSHIP PROGRAM', icon: <Briefcase size={28} /> },
  ];

  const activeDomains = programCategories.find(cat => cat.branch === activeBranch)?.items || [];

  const getButtonClass = (isActive: boolean) => 
    `w-full p-4 rounded-lg text-left transition-all duration-300 flex items-center gap-4 ${
      isActive
        ? 'bg-orange-400 cursor-pointer text-white shadow-lg font-bold'
        : 'text-gray-300 hover:bg-white/10'
    }`;

  return (
    <motion.div
      layout
      transition={{ type: "spring", stiffness: 500, damping: 40 }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[800px] rounded-2xl shadow-2xl backdrop-blur-xl ring-1 ring-white/10 z-10 text-white overflow-hidden"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={megaMenuVariants}
    >
      <div className="grid grid-cols-12">
        <div className="col-span-8 p-6 grid grid-cols-2 gap-6 ">
          <div>
            <h3 className="text-sm font-semibold text-orange-400 mb-4 flex items-center gap-2">
              Program <span className="text-orange-400">→</span>
            </h3>
            <div className="space-y-3">
              {programs.map((prog) => (
                <button
                  key={prog.name}
                  onClick={() => setActiveProgram(prog.name as 'Internship' | 'Placement')}
                  className={getButtonClass(activeProgram === prog.name)}
                >
                  {prog.icon}
                  <span className="text-sm">{prog.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-orange-400 mb-4 flex items-center gap-2">
              Branch <span className="text-orange-400">→</span>
            </h3>
            <div className="space-y-1">
              {programCategories.map((category) => (
                <button
                  key={category.branch}
                  onMouseEnter={() => setActiveBranch(category.branch)}
                  onFocus={() => setActiveBranch(category.branch)}
                  className={getButtonClass(activeBranch === category.branch)}
                >
                  <span className='pl-2 text-base'>{category.branch}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-4 p-6">
          <h3 className="text-sm font-semibold text-orange-400 mb-4 flex items-center gap-2">
            Domain <span className="text-orange-400">↓</span>
          </h3>
          <div className="flex flex-col items-center gap-3">
            <AnimatePresence mode="wait">
              {activeDomains.map((item) => (
                <MotionLink
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 h-12 rounded-2xl px-2 flex items-center justify- w-full hover:bg-white hover:text-black text-center text-base transition-colors duration-200"
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
    </motion.div>
  );
}