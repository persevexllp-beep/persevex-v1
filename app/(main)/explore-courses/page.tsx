"use client";

import React, { useState, Suspense, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import StarField from "@/app/components/StarField";
import { motion, AnimatePresence } from "framer-motion";
import { Facebook } from "lucide-react";
import Image from "next/image";
import { FiMail, FiMapPin, FiInstagram, FiLinkedin } from "react-icons/fi";

import { allDomains, DomainView } from "../../constants/courseConstant";
import CourseDisplayCard from "../../components/CourseDisplayCard";

export default function ExploreCoursesPage() {
  const [activeView, setActiveView] = useState<DomainView>("management");

  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const activeIndex = allDomains.findIndex((d) => d.view === activeView);
    const activeButton = buttonRefs.current[activeIndex];

    if (activeButton) {
      setSliderStyle({
        left: activeButton.offsetLeft,
        width: activeButton.offsetWidth,
      });
    }
  }, [activeView]);

  const activeDomain = allDomains.find((domain) => domain.view === activeView);
  const coursesToShow = activeDomain?.courses || [];
  const contentToShow = activeDomain?.content || {
    subheading: "Select a category to begin.",
    paragraph: "Explore our wide range of professional courses.",
  };

  return (
    <main
      className="relative min-h-screen w-full text-white overflow-x-hidden"
      style={{
        msOverflowStyle: "none",
        scrollbarWidth: "none",
      }}
    >
      <div className="fixed top-0 left-0 w-full h-full -z-10">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <color attach="background" args={["#000000"]} />
          <Suspense fallback={null}>
            <StarField hover={false} />
          </Suspense>
        </Canvas>
      </div>

      <div className="flex flex-col items-center justify-start pt-16 min-h-screen w-full px-4 sm:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-center">
          Explore our Trending Courses
        </h1>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="text-center mt-4 max-w-2xl"
          >
            <h2 className="text-2xl font-semibold text-[#F9C47D]">
              {contentToShow.subheading}
            </h2>
            <p className="text-gray-300 mt-2">{contentToShow.paragraph}</p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-12 z-20">
          <div className="relative flex w-fit items-center rounded-full bg-gray-900/50 p-1 backdrop-blur-sm flex-wrap justify-center">
            <motion.div
              className="absolute h-[calc(100%-0.5rem)] rounded-full "
              animate={sliderStyle}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
            />
            {allDomains.map(
              (domain, index) =>
                domain.enabled && (
                  <button
                    key={domain.view}
                    ref={(el) => {
                      buttonRefs.current[index] = el;
                    }}
                    onClick={() => setActiveView(domain.view)}
                    className={`relative z-10 cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-300 whitespace-nowrap ${
                      activeView === domain.view
                        ? "text-orange-400"
                        : "text-white hover:text-gray-200"
                    }`}
                  >
                    {domain.name}
                  </button>
                )
            )}
          </div>
        </div>

        <div className="w-full max-w-7xl mx-auto mt-16 pb-24 min-h-[600px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-16 justify-items-center"
            >
              {coursesToShow.map((course) => (
                <CourseDisplayCard key={course.id} course={course} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <div>
        <ExploreFooterSection />
      </div>
    </main>
  );
}

type FooterLink = {
  text: string;
  href: string;
  icon?: React.ReactNode;
};

type FooterColumn = {
  title: string;
  links: FooterLink[];
};

type SocialLink = {
  name: string;
  href: string;
  icon: React.ReactNode;
};

const exploreFooterLinkColumns: FooterColumn[] = [
  {
    title: "Quick Links",
    links: [
      { text: "Pre-registration", href: "https://forms.gle/s9nYdQAtr5Qs1YfB6" },
      { text: "LMS", href: "https://lms.persevex.com/login/index.php" },
      { text: "Blogs", href: "/blogs" },
    ],
  },
  {
    title: "Our Courses",
    links: [
      { text: "Management", href: "/explore-courses" },
      { text: "Technical", href: "/explore-courses" },
      { text: "Electronics", href: "/explore-courses" },
      { text: "Mechanical", href: "/explore-courses" },
      { text: "Civil", href: "/explore-courses" },
    ],
  },
  {
    title: "Get in Touch",
    links: [
      {
        text: "support@persevex.com",
        href: "mailto:support@persevex.com",
        icon: <FiMail />,
      },
      { text: "Bengaluru, India", href: "#", icon: <FiMapPin /> },
    ],
  },
];

const socialLinks: SocialLink[] = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/persevex_llp/",
    icon: <FiInstagram size={20} />,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61574597387622#",
    icon: <Facebook size={20} />,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/persevex/posts/?feedView=all",
    icon: <FiLinkedin size={20} />,
  },
];

function ExploreFooterSection() {
  return (
    <footer className="relative w-full text-white overflow-hidden py-8 md:py-16 mt-12 ">
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-white rounded-xl p-2 shadow-xl flex items-center justify-center">
                  <Image
                    className="w-full h-full object-contain"
                    src="/whitelogo.png"
                    alt="Persevex logo"
                    height={80}
                    width={80}
                  />
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-serif text-white">Persevex</h2>
                <p className="text-gray-100">Empowering careers.</p>
              </div>
            </div>
            <p className="text-gray-200 max-w-sm">
              Elevate your career with our cutting-edge courses in financial
              modeling, digital marketing, data science, and more.
            </p>
          </div>

          <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-8">
            {exploreFooterLinkColumns.map((column) => (
              <div key={column.title}>
                <h3 className="font-bold text-sm uppercase tracking-wider text-[#F9C47D] mb-5">
                  {column.title}
                </h3>
                <ul className="space-y-3">
                  {column.links.map((link) => (
                    <li key={link.text}>
                      <a
                        target={
                          link.href.startsWith("http") ? "_blank" : "_self"
                        }
                        rel="noopener noreferrer"
                        href={link.href}
                        className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center gap-2 group break-all"
                      >
                        {link.icon && (
                          <span className="group-hover:text-[#F9C47D] transition-colors">
                            {link.icon}
                          </span>
                        )}
                        <span className="group-hover:translate-x-1 transition-transform duration-300 ease-out inline-block">
                          {link.text}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-200">
            &copy; {new Date().getFullYear()} Persevex. All Rights Reserved.
          </p>
          <div className="flex items-center space-x-4">
            {socialLinks.map((social) => (
              <a
                target="_blank"
                rel="noopener noreferrer"
                key={social.name}
                href={social.href}
                aria-label={social.name}
                className="text-gray-200 hover:text-[#F9C47D] transition-colors duration-300"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
