"use client";

import React, { useState } from 'react'; // Import React for Fragment
import Link from 'next/link';
import { useScroll, SectionKey } from '../contexts/scrollContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { scrollToSection } = useScroll();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // 1. Update the data structure to include categories
  const programCategories = [
    {
      title: 'Technology',
      items: [
        { name: 'AI & Machine Learning', href: '/programs/ai-ml' },
        { name: 'Full Stack Development', href: '/programs/full-stack' },
        { name: 'Data Science', href: '/programs/data-science' },
        { name: 'Cyber Security', href: '/programs/cyber-security' },
      ],
    },
    {
      title: 'Finance',
      items: [
        { name: 'Quantitative Finance', href: '/programs/quantitative-finance' },
        { name: 'Financial Modeling', href: '/programs/financial-modeling' },
        { name: 'Blockchain & DeFi', href: '/programs/blockchain-defi' },
      ],
    },
  ];

  const scrollButtons: { name: string; key: SectionKey }[] = [
    { name: "Courses", key: "courses" },
    { name: "Our Edge", key: "ourEdge" },
    { name: "Partners", key: "partners" },
    { name: "Testimonials", key: "testimonials" },
    { name: "About Us", key: "aboutUs" },
  ];

  const dropdownVariants = {
    hidden: { 
      opacity: 0, 
      y: -10,
      scale: 0.95,
      transition: { duration: 0.2, ease: [0.42, 0, 0.58, 1] as const }
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        type: "spring" as const,
        stiffness: 400,
        damping: 25,
        staggerChildren: 0.05
      } 
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <header className="sticky top-0 left-0 right-0 z-50 h-16 bg-transparent flex items-center justify-between p-6 md:p-8 text-white">
      <Link href="/" className="text-2xl md:text-3xl font-bold tracking-wider">
        PERSEVEX
      </Link>
      <nav className="hidden md:flex items-center gap-8 lg:gap-12">
        
        <div 
          className="relative"
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <button
            className="text-base font-medium hover:text-gray-300 transition-colors duration-300 cursor-pointer flex items-center gap-1"
            aria-haspopup="true"
            aria-expanded={isDropdownOpen}
          >
            Programs
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
          </button>
          
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div 
                className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 rounded-2xl shadow-lg bg-zinc-900 ring-1 ring-white/10 z-10" // Increased width slightly
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={dropdownVariants}
              >
                <div className="py-2" role="menu" aria-orientation="vertical">
                  {/* 2. Use nested mapping for categories */}
                  {programCategories.map((category, index) => (
                    <React.Fragment key={category.title}>
                      {/* Add a separator between categories */}
                      {index > 0 && <div className="my-2 border-t border-white/10 mx-2"></div>}
                      
                      {/* Category Title */}
                      <p className="px-4 pt-2 pb-1 text-xs font-bold text-gray-400 uppercase tracking-wider">
                        {category.title}
                      </p>
                      
                      {/* Map through items in the category */}
                      {category.items.map((item) => (
                        <motion.div key={item.name} variants={itemVariants}>
                          <Link
                            href={item.href}
                            className="block px-4 py-2 text-sm text-gray-300 hover:bg-zinc-800 hover:text-white rounded-md mx-2 transition-colors duration-200"
                            role="menuitem"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            {item.name}
                          </Link>
                        </motion.div>
                      ))}
                    </React.Fragment>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {scrollButtons.map((button) => (
          <button
            key={button.name}
            onClick={() => scrollToSection(button.key)}
            className="text-base font-medium hover:text-gray-300 transition-colors duration-300 cursor-pointer"
          >
            {button.name}
          </button>
        ))}
      </nav>
    </header>
  );
}