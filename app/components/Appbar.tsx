"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useScroll, SectionKey } from '../contexts/scrollContext';
import { motion, AnimatePresence, Variants } from 'framer-motion';

export default function Navbar() {
  const { scrollToSection } = useScroll();
  const [isDesktopDropdownOpen, setIsDesktopDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileProgramsOpen, setIsMobileProgramsOpen] = useState(false);

  const handleScrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); 
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setIsMobileMenuOpen(false);
  };

  const handleMobileLinkClick = (key: SectionKey) => {
    scrollToSection(key);
    setIsMobileMenuOpen(false);
  };

  const programCategories = [
    {
      title: 'Technology',
      items: [
        { name: 'Artificial Intelligence', href: '/courses/artificial-intelligence' },
        { name: 'Web Development', href: '/courses/full-stack' },
        { name: 'Data Science', href: '/courses/data-science' },
        { name: 'Cyber Security', href: '/courses/cyber-security' },
        {name: 'Cloud Computing', href: '/courses/cloud-computing' },
      ],
    },
    {
      title: 'Finance',
      items: [
        { name: 'Finance', href: '/courses/finance' },
        {name: 'Digital Marketing', href: 'courses/digital-marketing' },
        {name: 'Modern Human Resourse', href: 'courses/human-resource' },
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

  const desktopDropdownVariants: Variants = {
    hidden: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.2, ease: "easeOut" } },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 400, damping: 25, staggerChildren: 0.05 } },
  };

  const desktopItemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  const mobileMenuVariants: Variants = {
    hidden: { opacity: 0, transition: { duration: 0.3, ease: "easeOut" } },
    visible: { opacity: 1, transition: { duration: 0.3, ease: "easeIn", staggerChildren: 0.07 } },
  };
  
  const mobileLinkVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
  };

  return (
    <>
      <header className="sticky top-0 left-0 right-0 z-50 h-16 flex items-center justify-between p-6 md:p-8 text-white ">
        <Link 
          href="/" 
          className="text-2xl cursor-pointer md:text-3xl font-bold tracking-wider"
          onClick={handleScrollToTop}
        >
          PERSEVEX
        </Link>
        <nav className="hidden md:flex items-center gap-8 lg:gap-12">
          <div 
            className="relative"
            onMouseEnter={() => setIsDesktopDropdownOpen(true)}
            onMouseLeave={() => setIsDesktopDropdownOpen(false)}
          >
            <button className="text-base font-medium hover:text-gray-300 transition-colors duration-300 cursor-pointer flex items-center gap-1">
              Programs
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </button>
            <AnimatePresence>
              {isDesktopDropdownOpen && (
                <motion.div 
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 rounded-2xl shadow-lg bg-zinc-900 ring-1 ring-white/10 z-10"
                  initial="hidden" animate="visible" exit="hidden" variants={desktopDropdownVariants}
                >
                  <div className="py-2">
                    {programCategories.map((category, index) => (
                      <React.Fragment key={category.title}>
                        {index > 0 && <div className="my-2 border-t border-white/10 mx-2"></div>}
                        <p className="px-4 pt-2 pb-1 text-xs font-bold text-gray-400 uppercase tracking-wider">{category.title}</p>
                        {category.items.map((item) => (
                          <motion.div key={item.name} variants={desktopItemVariants}>
                            <Link href={item.href} className="block px-4 py-2 text-sm text-gray-300 hover:bg-zinc-800 hover:text-white rounded-md mx-2 transition-colors duration-200" onClick={() => setIsDesktopDropdownOpen(false)}>
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
            <button key={button.name} onClick={() => scrollToSection(button.key)} className="text-base font-medium hover:text-gray-300 transition-colors duration-300 cursor-pointer">
              {button.name}
            </button>
          ))}
        </nav>
        <div className="md:hidden z-50">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {isMobileMenuOpen ? <line x1="18" y1="6" x2="6" y2="18" /> : <line x1="3" y1="12" x2="21" y2="12" />}
              {isMobileMenuOpen ? <line x1="6" y1="6" x2="18" y2="18" /> : <line x1="3" y1="6" x2="21" y2="6" />}
              {!isMobileMenuOpen && <line x1="3" y1="18" x2="21" y2="18" />}
            </svg>
          </button>
        </div>
      </header>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/90 backdrop-blur-lg flex flex-col items-center justify-center text-white"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.div variants={mobileLinkVariants} className="text-center w-full">
              <button
                onClick={() => setIsMobileProgramsOpen(!isMobileProgramsOpen)}
                className="text-2xl font-semibold py-4 flex items-center justify-center w-full gap-2"
              >
                Programs
                <motion.svg animate={{ rotate: isMobileProgramsOpen ? 180 : 0 }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></motion.svg>
              </button>
              <AnimatePresence>
                {isMobileProgramsOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="pt-2 pb-4 flex flex-col gap-3">
                      {programCategories.flatMap(cat => cat.items).map(item => (
                        <Link key={item.name} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className="text-base text-gray-300 hover:text-white">
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            {scrollButtons.map((button) => (
              <motion.button
                key={button.name}
                variants={mobileLinkVariants}
                onClick={() => handleMobileLinkClick(button.key)}
                className="text-2xl font-semibold py-4"
              >
                {button.name}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}