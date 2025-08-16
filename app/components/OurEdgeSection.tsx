"use client";

import { BrainCircuit, Zap, Users, Code, ShieldCheck, Rocket } from 'lucide-react';
import { useMemo } from 'react';

// Data and finalPositions are unchanged
const edgeData = [
  { icon: <BrainCircuit size={48} className="text-cyan-400 flex-shrink-0" />, title: 'Expert-Led Curriculum', description: 'Our courses are designed and taught by industry veterans with years of real-world experience.' },
  { icon: <Zap size={48} className="text-cyan-400 flex-shrink-0" />, title: 'Hands-On Projects', description: 'Learn by doing. Build a portfolio of impressive projects that showcase your skills to employers.' },
  { icon: <Users size={48} className="text-cyan-400 flex-shrink-0" />, title: 'Community & Support', description: 'Join a thriving community of learners and mentors. Get help when you need it, 24/7.' },
  { icon: <Code size={48} className="text-cyan-400 flex-shrink-0" />, title: 'Cutting-Edge Tech', description: 'Stay ahead of the curve with courses on the latest technologies and industry best practices.' },
  { icon: <ShieldCheck size={48} className="text-cyan-400 flex-shrink-0" />, title: 'Career Focused', description: 'We focus on the skills that matter, providing career services to help you land your dream job.' },
  { icon: <Rocket size={48} className="text-cyan-400 flex-shrink-0" />, title: 'Flexible Learning', description: 'Learn at your own pace with lifetime access to course materials and a flexible schedule.' },
];

const finalPositions = [
  { x: '-120%', y: '-12rem' }, { x: '0%', y: '-12rem' }, { x: '120%', y: '-12rem' },
  { x: '-120%', y: '5rem' }, { x: '0%', y: '5rem' }, { x: '120%', y: '5rem' },
];

// NEW: Easing function for smoother animations
// This function makes motion start and end slowly, accelerating in the middle.
const easeInOutCubic = (t: number): number => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};


const OurEdgeSection = ({ progress }: { progress: number }) => {
  const NUM_CARDS = edgeData.length;

  const cardStyles = useMemo(() => {
    return edgeData.map((_, index) => {
      const cardProgress = progress * NUM_CARDS - index;

      let opacity = 0;
      let scale = 0.5;
      let translateX = 0;
      let translateY = 500;
      // NEW: Add rotation and blur for more dynamic movement
      let rotate = 10;
      let blur = 4;

      if (cardProgress > 0 && cardProgress < 0.5) { // Phase 1: Appear
        const phaseProgress = cardProgress / 0.5;
        // MODIFIED: Apply easing to all animated properties
        const easedProgress = easeInOutCubic(phaseProgress);

        opacity = easedProgress;
        scale = 0.5 + 1.0 * easedProgress;
        translateY = 500 * (1 - easedProgress);
        rotate = 10 * (1 - easedProgress);
        blur = 4 * (1 - easedProgress);

      } else if (cardProgress >= 0.5 && cardProgress < 1) { // Phase 2: Move to final spot
        const phaseProgress = (cardProgress - 0.5) / 0.5;
        // MODIFIED: Apply easing here as well
        const easedProgress = easeInOutCubic(phaseProgress);
        
        const targetX = parseFloat(finalPositions[index].x);
        const targetY = parseFloat(finalPositions[index].y.replace('rem', '')) * 16;
        
        opacity = 1;
        scale = 1.5 - 0.5 * easedProgress;
        translateX = targetX * easedProgress;
        translateY = targetY * easedProgress;
        // NEW: Make rotation react to horizontal movement for a nice touch
        rotate = (targetX / 50) * (1 - easedProgress); // Rotate away from the direction of travel
        blur = 0;

      } else if (cardProgress >= 1) { // Phase 3: In final position
        const targetX = parseFloat(finalPositions[index].x);
        const targetY = parseFloat(finalPositions[index].y.replace('rem', '')) * 16;
        
        opacity = 1;
        scale = 1;
        translateX = targetX;
        translateY = targetY;
        rotate = 0;
        blur = 0;
      }
      
      // MODIFIED: Add rotation and blur to the final style object
      const transform = `translateX(${translateX}%) translateY(${translateY}px) scale(${scale}) rotate(${rotate}deg)`;
      const filter = `blur(${blur}px)`;
      
      return { transform, opacity, filter };
    });
  }, [progress]);

  // JSX is unchanged...
  return (
    <section className="sticky top-0 h-screen flex flex-col items-center justify-center text-white overflow-hidden">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mt-8">Why Choose Us?</h2>
        </div>
        <div className="relative w-full max-w-xs md:max-w-4xl lg:max-w-6xl h-[34rem] z-20">
          {edgeData.map((item, index) => (
            <div
              key={index}
              className="absolute top-1/2 left-1/2 w-full md:w-1/3 lg/w-1/4 p-4"
              style={{ transform: `translateX(-50%) translateY(-50%)`, willChange: 'transform, opacity, filter' }}
            >
              <div
                className="backdrop-blur-xl backdrop-saturate-150 backdrop-brightness-110 bg-white/30 border border-white/20 w-full p-6 rounded-2xl flex flex-col items-start gap-4 shadow-lg h-56 transition-transform duration-100 ease-linear" // Added a subtle transition for even more smoothness
                style={cardStyles[index]}
              >
                <div className='text-base'>{item.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-300 text-sm">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurEdgeSection;