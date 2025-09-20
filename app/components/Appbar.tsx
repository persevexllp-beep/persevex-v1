"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useScroll, SectionKey } from '../contexts/scrollContext';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import ProgramsMegaMenu from './ProgramsMegaMenu';

type ProgramItem = {key: string, name: string; href: string; };
type ProgramCategory = { branch: string; items: ProgramItem[]; };

export default function Navbar() {
  const { scrollToSection } = useScroll();
  const router = useRouter();
  const pathname = usePathname();

  const [isDesktopDropdownOpen, setIsDesktopDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileProgramsOpen, setIsMobileProgramsOpen] = useState(false);
  
  const isHomePage = pathname === '/';

  const handleNavigationAndScroll = (key: SectionKey) => {
    setIsMobileMenuOpen(false); 
    if (isHomePage) {
      scrollToSection(key);
    } else {
      router.push(`/?scrollTo=${key}`);
    }
  };
  
  const handleGoHome = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (isHomePage) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        router.push('/');
    }
  };

  const internshipProgramCategories: ProgramCategory[] = [
    {
      branch: 'CSE / IT',
      items: [
        {key: 'c1', name: 'Machine Learning', href: '/courses/machine-learning' },
        {key: "c2", name: 'Web Development', href: '/courses/web-development' },
        {key: 'c3', name: 'Artificial Intelligence', href: '/courses/artificial-intelligence' },
        {key: 'c4', name: 'Cyber Security', href: '/courses/cybersecurity' },
        {key: 'c5', name: 'Data Science', href: '/courses/data-science' },
        {key: 'c6', name: 'Cloud Computing', href: '/courses/cloud-computing' },
      ],
    },
    {
      branch: 'Business & Finance',
      items: [
        {key: 'b1', name: 'Finance', href: '/courses/finance' },
        {key: 'b2', name: 'Digital Marketing', href: '/courses/digital-marketing' },
        {key: 'b3', name: 'Modern Human Resourse', href: '/courses/human-resource' },
        {key: 'b4',name: 'Stockmarket & Cryptocurrency', href: '/courses/stock-market-crypto'}
      ],
    },
     {
      branch: 'ECE / EEE',
      items: [
        {key: 'e1', name: 'Embedded Systems', href: '/courses/embedded-systems' },
        {key: 'e2',name: 'Internet of Things(IOT)', href: '/courses/iot'}
      ],
    },
    {
      branch: 'Mechanical',
      items: [
        {key: 'm1', name: 'AutoCAD: 2D & 3D Design', href:'/courses/autocad '}
      ]
    },
    {
      branch: 'Civil',
      items: [
        {key: 'ci1',name: 'AutoCAD: 2D & 3D Design', href: '/courses/autocad'}
      ]
    }
  ];

  const placementProgramCategories: ProgramCategory[] = [
    {
      branch: 'Job Guarantee Programs',
      items: [
        {key: "j1", name: 'Fullstack Development', href: '/job-guarantee-program/web-development' },
        {key: "j2", name: 'Human Resources', href: '/job-guarantee-program/human-resource' },
        {key: "j3", name: 'Digital Marketing', href: '/job-guarantee-program/digital-marketing' },
      ]
    }
  ];

  const scrollButtons: { name: string; key: SectionKey }[] = [
    { name: "Courses", key: "courses" },
    { name: "Our Edge", key: "ourEdge" },
    { name: "Partners", key: "partners" },
    { name: "Testimonials", key: "testimonials" },
    { name: "About Us", key: "aboutUs" },
  ];
  
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
          onClick={handleGoHome}
        >
          PERSEVEX
        </Link>
       
        <nav className="hidden md:flex items-center gap-8 lg:gap-12">
          <div 
            className="relative"
            onMouseEnter={() => setIsDesktopDropdownOpen(true)}
            onMouseLeave={() => setIsDesktopDropdownOpen(false)}
          >
            <Link href="/explore-courses" className="text-base font-medium hover:text-gray-300 transition-colors duration-300 cursor-pointer flex items-center gap-1">
              Programs
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </Link>
            <AnimatePresence>
              {isDesktopDropdownOpen && (
                <ProgramsMegaMenu
                  internshipData={internshipProgramCategories}
                  placementData={placementProgramCategories}
                  onClose={() => setIsDesktopDropdownOpen(false)}
                />
              )}
            </AnimatePresence>
          </div>
           <Link
            href="https://lms.persevex.com/login/index.php"
            target="_blank"
            rel="noopener noreferrer"
            className="text-base font-medium hover:text-gray-300 transition-colors duration-300 cursor-pointer"
          >
            LMS
          </Link>
          {scrollButtons.map((button) => (
            <button key={button.name} onClick={() => handleNavigationAndScroll(button.key)} className="text-base font-medium hover:text-gray-300 transition-colors duration-300 cursor-pointer">
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
            className="fixed inset-0 z-40 bg-black/90 backdrop-blur-lg flex flex-col items-center justify-start pt-24 text-white overflow-y-auto"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.div variants={mobileLinkVariants} className="text-center w-full">
              <button
                onClick={() => setIsMobileProgramsOpen(!isMobileProgramsOpen)}
                className="text-xl font-semibold py-3 flex items-center justify-center w-full gap-2"
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
                    <div className="pt-2 pb-4 flex flex-col gap-1">
                      <div>
                        <h4 className="text-orange-400 font-semibold mt-2 mb-1 px-4 text-center text-sm uppercase tracking-wider">Internship Programs</h4>
                        {internshipProgramCategories.flatMap(cat => cat.items).map(item => (
                          <Link
                            key={item.key}
                            href={item.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block py-2 px-6 text-base text-gray-300 hover:text-white hover:bg-white/10 text-center"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>

                      <div className="mt-4">
                        <h4 className="text-orange-400 font-semibold mt-2 mb-1 px-4 text-center text-sm uppercase tracking-wider">Job Guarantee Programs</h4>
                        {placementProgramCategories.flatMap(cat => cat.items).map(item => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block py-2 px-6 text-base text-gray-300 hover:text-white hover:bg-white/10 text-center"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div variants={mobileLinkVariants}>
              <Link
                href="https://lms.persevex.com/login/index.php"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="inline-block my-3 rounded-full bg-blue-600 px-10 py-2.5 text-lg font-semibold text-white transition-colors hover:bg-blue-700"
              >
                LMS
              </Link>
            </motion.div>

            {scrollButtons.map((button) => (
              <motion.button
                key={button.name}
                variants={mobileLinkVariants}
                onClick={() => handleNavigationAndScroll(button.key)}
                className="text-xl font-semibold py-3"
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