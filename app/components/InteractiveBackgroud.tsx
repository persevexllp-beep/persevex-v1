// app/components/InteractiveBackground.tsx
'use client';

import { useState, useEffect } from 'react';

// Define the type for a single star's style
interface StarStyle {
  top: string;
  left: string;
  size: string;
  animationDuration: string;
  animationDelay: string;
}

// A utility function to generate a random number in a range
const random = (min: number, max: number) => Math.random() * (max - min) + min;

// A standard function to generate an array of star styles
// It's no longer a hook, just a utility.
const generateStars = (count: number): StarStyle[] => {
  return Array.from({ length: count }, () => ({
    top: `${random(0, 100)}%`,
    left: `${random(0, 100)}%`,
    size: `${random(1, 2.5)}px`,
    animationDuration: `${random(2, 4)}s`,
    animationDelay: `${random(0, 2)}s`,
  }));
};

interface InteractiveBackgroundProps {
  mouseX: number;
  mouseY: number;
}

export default function InteractiveBackground({ mouseX, mouseY }: InteractiveBackgroundProps) {
  // State to hold the stars. Initialized to empty arrays.
  const [stars1, setStars1] = useState<StarStyle[]>([]);
  const [stars2, setStars2] = useState<StarStyle[]>([]);
  const [stars3, setStars3] = useState<StarStyle[]>([]);
  
  // This state will be false on the server and true on the client after mounting.
  const [hasMounted, setHasMounted] = useState(false);
  
  // This effect runs only once on the client after the component mounts.
  useEffect(() => {
    setHasMounted(true);
    // Generate the stars only on the client side.
    setStars1(generateStars(70));
    setStars2(generateStars(50));
    setStars3(generateStars(30));
  }, []); // Empty dependency array ensures this runs only once.


  const parallax = (factor: number) => {
    // We also check for hasMounted here to avoid layout shifts on initial load
    if (!hasMounted) return {};
    const x = (mouseX - window.innerWidth / 2) / factor;
    const y = (mouseY - window.innerHeight / 2) / factor;
    return { transform: `translate(${x}px, ${y}px)` };
  };

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Layer 1: Nebula/Dust */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-orange-900/60 via-orange-900/20 to-transparent"
        style={{
            background: hasMounted ? `radial-gradient(circle at ${mouseX}px ${mouseY}px, rgba(234, 88, 12, 0.15), transparent 40%), linear-gradient(to top, rgba(124, 45, 18, 0.6), transparent)` : 'transparent',
            transition: 'background 0.2s ease-out',
        }}
      />
      
      {/* Starfield Layers for Parallax Effect */}
      {/* The stars will only be rendered on the client after the effect runs */}
      <div className="absolute inset-0 transition-transform duration-500 ease-out" style={parallax(50)}>
        {stars1.map((star, i) => (
          <div key={i} className="absolute rounded-full bg-white opacity-60 animate-pulse" style={star} />
        ))}
      </div>
      <div className="absolute inset-0 transition-transform duration-500 ease-out" style={parallax(30)}>
        {stars2.map((star, i) => (
          <div key={i} className="absolute rounded-full bg-white opacity-80 animate-pulse" style={star} />
        ))}
      </div>
       <div className="absolute inset-0 transition-transform duration-500 ease-out" style={parallax(15)}>
        {stars3.map((star, i) => (
          <div key={i} className="absolute rounded-full bg-white animate-pulse" style={star} />
        ))}
      </div>
    </div>
  );
}