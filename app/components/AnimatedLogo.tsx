// AnimatedLogo.tsx
"use client";

import Image from "next/image";
import { useMemo, useEffect, useRef } from "react";
import { createNoise2D } from "simplex-noise"; 

// --- Helper Class for Particles (NO CHANGES) ---
class Particle {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  life: number;
  
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 3 + 1;
    this.vx = -(Math.random() * 1.5 + 1);
    this.vy = (Math.random() - 0.5) * 2;
    this.life = 1;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life -= 0.015;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = `rgba(253, 224, 71, ${this.life * 0.8})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}


// --- Updated CometTrail with Wider Tip ---
const CometTrail = ({ opacity, rotation }: { opacity: number; rotation: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const opacityRef = useRef(opacity);

  useEffect(() => {
    opacityRef.current = opacity;
  }, [opacity]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const simplex = createNoise2D();
    
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    let animationFrameId: number;
    const particles: Particle[] = [];
    const maxParticles = 150;
    
    const coreX = canvas.width / dpr - 50; 
    const coreY = canvas.height / dpr / 2;
    
    let tick = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = opacityRef.current;
      
      ctx.globalCompositeOperation = 'lighter';
      
      const tailLength = 400;

      const noiseScale1 = 0.01, noiseSpeed1 = 0.005, amplitude1 = 80;
      const noiseScale2 = 0.05, noiseSpeed2 = 0.01, amplitude2 = 35;

      for (let i = 0; i < tailLength; i += 4) {
        const progress = i / tailLength;
        const x = coreX - i;
        
        // --- UPDATED: Modified width factor for wider tip ---
        // Using a curve that starts wide (tip), narrows in the middle, then widens at core
        // This creates a more consistent and visually appealing trail
        const widthFactor = 0.4 + 0.6 * (1 - Math.abs(Math.sin(progress * Math.PI * 0.7)));

        // Apply the widthFactor to the noise amplitude
        const yOffset1 = simplex(i * noiseScale1, tick * noiseSpeed1) * amplitude1 * widthFactor;
        const yOffset2 = simplex(i * noiseScale2, tick * noiseSpeed2) * amplitude2 * widthFactor;
        
        const y = coreY + yOffset1 + yOffset2;

        const randomSizeFactor = Math.random() * 0.4 + 0.8;
        const randomAlphaFactor = Math.random() * 0.5 + 0.75;

        // Apply the widthFactor to the radius of the cloud puffs
        const baseRadius = 80;
        const radius = baseRadius * widthFactor * randomSizeFactor;
        // Also tie alpha to the width factor to make the middle appear denser
        const alpha = 0.15 * widthFactor * randomAlphaFactor;

        const tailPartGradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        tailPartGradient.addColorStop(0, `rgba(253, 224, 71, ${alpha})`);
        tailPartGradient.addColorStop(1, `rgba(217, 119, 6, 0)`);
        
        ctx.fillStyle = tailPartGradient;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
      
      ctx.globalCompositeOperation = 'source-over';

      // Update particle spawning to use the new shaping logic
      if (particles.length < maxParticles && Math.random() > 0.5) {
        for (let i = 0; i < 3; i++) {
            const spawnDist = Math.random() * tailLength * 0.9;
            const progress = spawnDist / tailLength;
            const spawnX = coreX - spawnDist;

            // Use the same widthFactor calculation for particle spawning
            const spawnWidthFactor = 0.4 + 0.6 * (1 - Math.abs(Math.sin(progress * Math.PI * 0.7)));

            const spawnYOffset1 = simplex(spawnDist * noiseScale1, tick * noiseSpeed1) * amplitude1 * spawnWidthFactor;
            const spawnYOffset2 = simplex(spawnDist * noiseScale2, tick * noiseSpeed2) * amplitude2 * spawnWidthFactor;

            const spawnY = coreY + spawnYOffset1 + spawnYOffset2;
            particles.push(new Particle(spawnX, spawnY));
        }
      }

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw(ctx);
        if (p.life <= 0) {
          particles.splice(i, 1);
        }
      }

      // Draw the core
      const coreGradient = ctx.createRadialGradient(coreX, coreY, 0, coreX, coreY, 30);
      coreGradient.addColorStop(0, "rgba(255, 255, 224, 1)");
      coreGradient.addColorStop(0.3, "rgba(253, 224, 71, 0.8)");
      coreGradient.addColorStop(1, "rgba(217, 119, 6, 0)");
      
      ctx.fillStyle = coreGradient;
      ctx.beginPath();
      ctx.arc(coreX, coreY, 30, 0, Math.PI * 2);
      ctx.fill();

      tick++;
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      className="absolute top-1/2 left-1/2 w-[800px] h-[200px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      style={{
        transform: `rotate(${rotation}deg) translate(-400px, 0)`,
      }}
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};


// --- Main Animated Logo Component (NO CHANGES NEEDED HERE) ---
const AnimatedLogo = ({ logo, progress }: { logo: any; progress: number }) => {
  const animationPath = useMemo(() => {
    switch (logo.animation) {
      case "from-top-left":
        return { x1: -500, y1: -350, r1: -15, x2: 0, y2: 0, r2: 0, trailAngle: 45 };
      case "from-bottom-left":
        return { x1: -500, y1: 350, r1: 15, x2: 0, y2: 0, r2: 0, trailAngle: -45 };
      case "from-top":
        return { x1: 0, y1: -400, r1: 0, x2: 0, y2: 0, r2: 0, trailAngle: 90 };
      case "from-bottom-right":
        return { x1: 500, y1: 350, r1: -15, x2: 0, y2: 0, r2: 0, trailAngle: -135 };
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
          <div className="p-2 rounded-md shadow-lg ">
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
        <div className=" p- rounded-md   ">
          <Image
            src={logo.src}
            alt={logo.alt}
            width={140}
            height={70}
            className="object-contain  w-full"
          />
        </div>
      </div>
    </>
  );
};

export default AnimatedLogo;