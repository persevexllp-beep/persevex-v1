"use client";
import React, { useEffect, useState } from 'react';
import { BrainCircuit, Zap, Users, Code, ShieldCheck, Rocket } from 'lucide-react';
import { useMemo } from 'react';
import { motion, Variants } from 'framer-motion'; // Import Variants type
import Image from 'next/image';

// --- HELPER HOOK ---
const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(typeof window !== 'undefined' && window.innerWidth < breakpoint);
    };
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => {
      window.removeEventListener("resize", checkDevice);
    };
  }, [breakpoint]);
  return isMobile;
};

// --- DATA (Updated with planet images) ---
const edgeData = [
  { 
    icon: <BrainCircuit size={48} className="text-orange-500 flex-shrink-0" />, 
    title: 'Expert-Led Curriculum', 
    description: 'Our courses are designed and taught by industry veterans with years of real-world experience.',
    planetImage: '/machinelearn.png' // Added image path
  },
  { 
    icon: <Zap size={48} className="text-orange-500 flex-shrink-0" />, 
    title: 'Hands-On Projects', 
    description: 'Learn by doing. Build a portfolio of impressive projects that showcase your skills to employers.',
    planetImage: '/artificialint.png' // Added image path
  },
  { 
    icon: <Users size={48} className="text-orange-500 flex-shrink-0" />, 
    title: 'Community & Support', 
    description: 'Join a thriving community of learners and mentors. Get help when you need it, 24/7.',
    planetImage: '/webdevl.png' // Added image path
  },
  { 
    icon: <Code size={48} className="text-orange-500 flex-shrink-0" />, 
    title: 'Cutting-Edge Tech', 
    description: 'Stay ahead of the curve with courses on the latest technologies and industry best practices.',
    planetImage: '/finan.png' // Added image path
  },
  { 
    icon: <ShieldCheck size={48} className="text-orange-500 flex-shrink-0" />, 
    title: 'Career Focused', 
    description: 'We focus on the skills that matter, providing career services to help you land your dream job.',
    planetImage: '/datasci.png' // Added image path
  },
  { 
    icon: <Rocket size={48} className="text-orange-500 flex-shrink-0" />, 
    title: 'Flexible Learning', 
    description: 'Learn at your own pace with lifetime access to course materials and a flexible schedule.',
    planetImage: '/cybersec.png' // Added image path
  },
];

const finalPositions = [
  { x: '-120%', y: '-12rem' }, { x: '0%', y: '-12rem' }, { x: '120%', y: '-12rem' },
  { x: '-120%', y: '5rem' }, { x: '0%', y: '5rem' }, { x: '120%', y: '5rem' },
];

const easeInOutCubic = (t: number): number => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

// --- MAIN COMPONENT ---
const OurEdgeSection = ({ progress }: { progress: number }) => {
  const isMobile = useIsMobile();
  const NUM_CARDS = edgeData.length;

  const desktopCardStyles = useMemo(() => {
    if (isMobile) return [];

    return edgeData.map((_, index) => {
      const cardProgress = progress * NUM_CARDS - index;
      let opacity = 0, scale = 0.5, translateX = 0, translateY = 500, rotate = 10, blur = 4;

      if (cardProgress > 0 && cardProgress < 0.5) {
        const easedProgress = easeInOutCubic(cardProgress / 0.5);
        opacity = easedProgress;
        scale = 0.5 + 1.0 * easedProgress;
        translateY = 500 * (1 - easedProgress);
        rotate = 10 * (1 - easedProgress);
        blur = 4 * (1 - easedProgress);
      } else if (cardProgress >= 0.5 && cardProgress < 1) {
        const easedProgress = easeInOutCubic((cardProgress - 0.5) / 0.5);
        const targetX = parseFloat(finalPositions[index].x);
        const targetY = parseFloat(finalPositions[index].y.replace('rem', '')) * 16;
        opacity = 1;
        scale = 1.5 - 0.5 * easedProgress;
        translateX = targetX * easedProgress;
        translateY = targetY * easedProgress;
        rotate = (targetX / 50) * (1 - easedProgress);
        blur = 0;
      } else if (cardProgress >= 1) {
        const targetX = parseFloat(finalPositions[index].x);
        const targetY = parseFloat(finalPositions[index].y.replace('rem', '')) * 16;
        opacity = 1;
        scale = 1;
        translateX = targetX;
        translateY = targetY;
        rotate = 0;
        blur = 0;
      }
      
      const transform = `translateX(${translateX}%) translateY(${translateY}px) scale(${scale}) rotate(${rotate}deg)`;
      const filter = `blur(${blur}px)`;
      
      return { transform, opacity, filter };
    });
  }, [progress, isMobile, NUM_CARDS]);
  
  // --- Animation Variants for Mobile Cards (Error Fixed) ---
  const mobileCardVariants: Variants = { // Explicitly typed with Variants
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    },
  };

  return (
    <section className="relative w-full h-auto md:h-screen md:sticky top-0 flex flex-col items-center justify-start md:justify-center text-white py-24 md:py-0 md:overflow-hidden">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">Why Choose Us?</h2>
        </div>

        {isMobile ? (
          // --- MOBILE LAYOUT with FADE-IN ANIMATION ---
          <div className="w-full max-w-sm flex flex-col items-center gap-6">
            {edgeData.map((item, index) => (
              <motion.div
                key={index}
                className="bg-transparent border border-white/20 w-full p-6 rounded-2xl flex items-center gap-4 shadow-lg relative overflow-hidden"
                variants={mobileCardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <Image
                  src={item.planetImage} // Use dynamic image source
                  alt={`Planet for ${item.title}`} // Use dynamic alt text
                  width={150}
                  height={150}
                  className="absolute -bottom-8 -right-8 w-[120px] h-auto -z-10 opacity-100 pointer-events-none"
                />
                <div className='text-base text-orange-500'>{item.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          // --- DESKTOP LAYOUT ---
          <div className="relative w-full max-w-xs md:max-w-4xl lg:max-w-6xl h-[34rem]">
            {edgeData.map((item, index) => (
              <div
                key={index}
                className="absolute top-1/2 left-1/2 w-full md:w-1/3 p-4"
                style={{ transform: `translateX(-50%) translateY(-50%)`, willChange: 'transform, opacity, filter' }}
              >
                <div
                  className="bg-transparent border border-white/20 w-full p-6 rounded-2xl flex flex-col items-start gap-4 shadow-lg h-56 transition-transform duration-100 ease-linear relative overflow-hidden"
                  style={desktopCardStyles[index]}
                >
                  <Image
                    src={item.planetImage} // Use dynamic image source
                    alt={`Planet for ${item.title}`} // Use dynamic alt text
                    width={200}
                    height={200}
                    className="absolute top-20 right-0 w-[400px] h-auto -z-10 opacity-50 pointer-events-none"
                  />
                  <div className='text-base'>{item.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-300 text-sm">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default React.memo(OurEdgeSection);