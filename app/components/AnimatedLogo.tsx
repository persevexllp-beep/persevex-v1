// AnimatedLogo.tsx
"use client";

import Image from "next/image";
import { useMemo } from "react";

// Helper hook to generate a random set of box-shadows for the sparkle effect.
// `useMemo` is crucial for performance, preventing recalculation on every render.
const useSparkles = (count: number, width: number, height: number, color: string) => {
  return useMemo(() => {
    return Array.from({ length: count })
      .map(() => {
        // Position the sparkle randomly within the given area
        const x = Math.floor(Math.random() * width);
        const y = Math.floor(Math.random() * height - height / 2);
        // Randomize the size of the sparkle
        const size = Math.random() * 0.5 + 0.5;
        // Randomize the opacity for a twinkling effect
        const opacity = Math.random() * 0.7 + 0.3;
        // Create the box-shadow string for a single sparkle
        return `${x}px ${y}px 0 ${size}px rgba(${color}, ${opacity})`;
      })
      .join(", ");
  }, [count, width, height, color]);
};

// A dedicated component for rendering a layer of sparkles.
const SparkleLayer = ({ count, width, height, color, className = "" }: { count: number; width: number; height: number; color: string; className?: string }) => {
  const sparkles = useSparkles(count, width, height, color);
  return (
    <div className={`absolute pointer-events-none ${className}`}>
      {/* A 1x1 pixel div that acts as an anchor for the box-shadows */}
      <div className="w-px h-px" style={{ boxShadow: sparkles }} />
    </div>
  );
};


// The multi-layered CometTrail component to match the reference image.
const CometTrail = ({ opacity, rotation }: { opacity: number; rotation: number }) => {
  return (
    <div
      className="absolute top-1/2 left-1/2 w-[800px] h-[200px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      style={{
        opacity,
        // The container is centered on the logo. The rotation pivots around this center point.
        transform: `rotate(${rotation}deg)`,
        transition: "opacity 0.8s ease-out",
      }}
    >
      <div className="relative w-full h-full">
        {/*
          The comet is built in layers from back to front.
          The "head" of the comet is positioned at the horizontal center of this container (400px),
          which aligns it perfectly with the animated logo.
        */}

        {/* Layer 1: Sparse Background Sparkles */}
        {/* <SparkleLayer
          count={50}
          width={50}
          height={50}
          color="253, 200, 100" // Deeper orange-yellow
          className="top-1/2 left-[0px] -translate-y-1/2"
        /> */}

        {/* Layer 2: Wavy Tail Body */}
        {/* Part A: Forms the bottom curve of the S-shape */}
        <div
          className="absolute top-1/2 w-[350px] h-[80px] -translate-y-[70%]"
          style={{
            left: '50px',
            background: "linear-gradient(to right, transparent 20%, rgba(217, 119, 6, 0.5) 80%, rgba(253, 224, 71, 0.7))",
            borderRadius: '50%',
            filter: 'blur(30px)',
            transform: 'rotate(-10deg)'
          }}
        />
        <div
          className="absolute top-1/2 w-[350px] h-[80px] -translate-y-[70%]"
          style={{
            left: '50px',
            background: "linear-gradient(to right, transparent 20%, rgba(217, 119, 6, 0.5) 80%, rgba(253, 224, 71, 0.7))",
            borderRadius: '50%',
            filter: 'blur(30px)',
            transform: 'rotate(-10deg)'
          }}
        />
        <div
          className="absolute top-1/2 w-[350px] h-[80px] -translate-y-[70%]"
          style={{
            left: '50px',
            background: "linear-gradient(to right, transparent 20%, rgba(217, 119, 6, 0.5) 80%, rgba(253, 224, 71, 0.7))",
            borderRadius: '50%',
            filter: 'blur(30px)',
            transform: 'rotate(-10deg)'
          }}
        />
        {/* Part B: Forms the top curve of the S-shape */}
        <div
          className="absolute top-1/2 w-[300px] h-[70px] -translate-y-[30%]"
          style={{
            left: '100px',
            background: "linear-gradient(to right, transparent 20%, rgba(253, 224, 71, 0.4) 80%, rgba(253, 235, 150, 0.6))",
            borderRadius: '50%',
            filter: 'blur(30px)',
            transform: 'rotate(10deg)'
          }}
        />

        {/* Layer 3: Dense Foreground Sparkles */}
        <SparkleLayer
          count={80}
          width={300}
          height={150}
          color="253, 230, 150" // Brighter yellow
          className="top-1/2 left-[100px] -translate-y-1/2"
        />

        {/* Layer 4: The Comet Head - Brightest part */}
        <div
          className="absolute top-1/2 w-24 h-24 -translate-x-1/2 -translate-y-1/2"
          style={{
            left: '400px', // Positioned at the center of the 800px container
            background: "radial-gradient(circle, white 20%, rgba(253, 224, 71, 1) 50%, rgba(217, 119, 6, 0.3) 75%, transparent 100%)",
            filter: 'blur(15px)'
          }}
        />
      </div>
    </div>
  );
};


// Main Animated Logo Component
const AnimatedLogo = ({ logo, progress }: { logo: any; progress: number }) => {
  const animationPath = useMemo(() => {
    // CRITICAL FIX: The trail angles have been corrected to point AWAY from the origin.
    switch (logo.animation) {
      // Moves from top-left. Tail must point back to top-left (45 degrees).
      case "from-top-left":
        return { x1: -500, y1: -350, r1: -15, x2: 0, y2: 0, r2: 0, trailAngle: 45 };
      // Moves from bottom-left. Tail must point back to bottom-left (-45 degrees).
      case "from-bottom-left":
        return { x1: -500, y1: 350, r1: 15, x2: 0, y2: 0, r2: 0, trailAngle: -45 };
      // Moves from top. Tail must point back up (90 degrees).
      case "from-top":
        return { x1: 0, y1: -400, r1: 0, x2: 0, y2: 0, r2: 0, trailAngle: 90 };
      // Moves from bottom-right. Tail must point back to bottom-right (-135 degrees).
      case "from-bottom-right":
        return { x1: 500, y1: 350, r1: -15, x2: 0, y2: 0, r2: 0, trailAngle: -135 };
      // Moves from top-right. Tail must point back to top-right (135 degrees).
      case "from-top-right":
        return { x1: 500, y1: -350, r1: 15, x2: 0, y2: 0, r2: 0, trailAngle: 135 };
      default:
        return { x1: 0, y1: 0, r1: 0, x2: 0, y2: 0, r2: 0, trailAngle: 0 };
    }
  }, [logo.animation]);

  const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);
  const easedProgress = easeOutQuart(Math.min(1, progress / 0.85));

  const currentX = animationPath.x1 + (animationPath.x2 - animationPath.x1) * easedProgress;
  const currentY = animationPath.y1 + (animationPath.y2 - animationPath.y1) * easedProgress;
  const currentRotation = animationPath.r1 + (animationPath.r2 - animationPath.r1) * easedProgress;

  const logoAndTrailOpacity = progress > 0.01 ? 1 : 0;
  const trailFadeProgress = Math.max(0, (progress - 0.85) / 0.15);
  const trailFinalOpacity = 1 - trailFadeProgress;

  return (
    <>
      <div
        style={{
          opacity: logoAndTrailOpacity,
          transform: `translate(${currentX}px, ${currentY}px)`,
          transition: "opacity 0.2s linear",
          visibility: progress >= 1 ? "hidden" : "visible",
        }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div style={{ transform: `rotate(${currentRotation}deg)` }} className="relative z-10">
          <div className="bg-white p-2 rounded-md shadow-lg border border-gray-200/50">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={140}
              height={70}
              className="object-contain h-14 w-auto"
            />
          </div>
        </div>
        <CometTrail opacity={trailFinalOpacity} rotation={animationPath.trailAngle} />
      </div>
      <div
        style={{
          opacity: progress >= 1 ? 1 : 0,
          transition: "opacity 0.3s ease-in",
          transform: `rotate(${animationPath.r2}deg)`,
        }}
      >
        <div className="bg-white p-2 rounded-md shadow-lg border border-gray-200/50">
          <Image
            src={logo.src}
            alt={logo.alt}
            width={140}
            height={70}
            className="object-contain h-14 w-auto"
          />
        </div>
      </div>
    </>
  );
};

export default AnimatedLogo;