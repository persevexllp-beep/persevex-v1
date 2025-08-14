// app/OurEdgeSection.tsx

"use client";

import { BrainCircuit, Zap, Users, Code, ShieldCheck, Rocket } from 'lucide-react';
import { useMemo } from 'react';

const edgeData = [
  // Using your provided layout
  {
    icon: <BrainCircuit size={48} className="text-cyan-400 mb-4" />, // Added mb-4 back for vertical spacing
    title: 'Expert-Led Curriculum',
    description: 'Our courses are designed and taught by industry veterans with years of real-world experience.',
  },
  {
    icon: <Zap size={48} className="text-cyan-400 mb-4" />,
    title: 'Hands-On Projects',
    description: 'Learn by doing. Build a portfolio of impressive projects that showcase your skills to employers.',
  },
  {
    icon: <Users size={48} className="text-cyan-400 mb-4" />,
    title: 'Community & Support',
    description: 'Join a thriving community of learners and mentors. Get help when you need it, 24/7.',
  },
  {
    icon: <Code size={48} className="text-cyan-400 mb-4" />,
    title: 'Cutting-Edge Tech',
    description: 'Stay ahead of the curve with courses on the latest technologies and industry best practices.',
  },
  {
    icon: <ShieldCheck size={48} className="text-cyan-400 mb-4" />,
    title: 'Career Focused',
    description: 'We focus on the skills that matter, providing career services to help you land your dream job.',
  },
  {
    icon: <Rocket size={48} className="text-cyan-400 mb-4" />,
    title: 'Flexible Learning',
    description: 'Learn at your own pace with lifetime access to course materials and a flexible schedule.',
  },
];

// Using your provided positions
const finalPositions = [
  { x: '-180%', y: '-10rem' },
  { x: '0%', y: '-10rem' },
  { x: '180%', y: '-10rem' },
  { x: '-180%', y: '10rem' },
  { x: '0%', y: '10rem' },
  { x: '180%', y: '10rem' },
];

const OurEdgeSection = ({ progress }: { progress: number }) => {
  const NUM_CARDS = edgeData.length;

  const cardStyles = useMemo(() => {
    return edgeData.map((_, index) => {
      const cardProgress = progress * (NUM_CARDS + 1) - index;

      let opacity = 0;
      let scale = 0.5;
      let translateX = 0;
      let translateY = 500;

      // Phase 1: Rise to center and scale up (focus)
      if (cardProgress > 0 && cardProgress < 0.5) {
        const phaseProgress = cardProgress / 0.5;
        opacity = phaseProgress;
        
        // --- CONTROL THE FOCUS SIZE HERE (PART 1) ---
        // Starts at 0.5 and grows by 1.0 to a peak scale of 1.5
        scale = 0.5 + 1.0 * phaseProgress; // Changed from 0.6
        
        translateY = 500 * (1 - phaseProgress);
      } 
      // Phase 2: Move from center to final grid position and scale down
      else if (cardProgress >= 0.5 && cardProgress < 1) {
        const phaseProgress = (cardProgress - 0.5) / 0.5;
        const targetX = parseFloat(finalPositions[index].x);
        const targetY = parseFloat(finalPositions[index].y.replace('rem', '')) * 16;
        opacity = 1;
        
        // --- CONTROL THE FOCUS SIZE HERE (PART 2) ---
        // Starts at peak scale of 1.5 and shrinks by 0.5 to a final scale of 1.0
        scale = 1.5 - 0.5 * phaseProgress; // Changed from 1.1 - 0.1
        
        translateX = targetX * phaseProgress;
        translateY = targetY * phaseProgress;
      } 
      // Final state (locked in position)
      else if (cardProgress >= 1) {
        const targetX = parseFloat(finalPositions[index].x);
        const targetY = parseFloat(finalPositions[index].y.replace('rem', '')) * 16;
        opacity = 1;
        scale = 1;
        translateX = targetX;
        translateY = targetY;
      }
      
      const transform = `translateX(${translateX}%) translateY(${translateY}px) scale(${scale})`;
      return { transform, opacity };
    });
  }, [progress]);


  return (
    <section className="sticky top-0 h-screen flex flex-col items-center justify-center text-white overflow-hidden">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose Us?</h2>
        </div>
        <div className="relative w-full max-w-xs md:max-w-4xl lg:max-w-6xl h-[34rem]">
          {edgeData.map((item, index) => (
            <div
              key={index}
              className="absolute top-1/2 left-1/2 w-full md:w-1/3 lg:w-1/4 p-4"
              style={{ transform: `translateX(-50%) translateY(-50%)`, willChange: 'transform, opacity' }}
            >
              {/* Using your provided layout classes */}
              <div
                className="bg-white/10 backdrop-blur-xl w-full flex-col p-6 rounded-2xl border border-white/20 flex items-center text-center gap-4 shadow-lg"

                style={cardStyles[index]}
              >
                {item.icon}
                <div>
                  <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
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