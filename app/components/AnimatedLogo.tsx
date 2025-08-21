// AnimatedLogo.tsx
"use client";
import React from "react";
import Image from "next/image";
import { useMemo, useEffect, useRef } from "react";

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


// --- CometTrail Component (NO CHANGES) ---
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
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = opacityRef.current;
      
      ctx.globalCompositeOperation = 'lighter';
      
      const tailLength = 400;
      const tailStartWidth = 40;
      const tailEndWidth = 200;

      for (let i = 0; i < tailLength; i += 4) {
        const progress = i / tailLength;
        const x = coreX - i;
        
        const currentWidth = tailStartWidth + (tailEndWidth - tailStartWidth) * progress;

        const puffsPerSegment = 3;
        for (let j = 0; j < puffsPerSegment; j++) {
          const yOffset = (Math.random() - 0.5) * currentWidth;
          const y = coreY + yOffset;
          
          const baseRadius = 40;
          const radius = (baseRadius + Math.random() * 20) * (progress * 0.8 + 0.2); 
          
          const alpha = (1 - progress * 0.7) * (Math.random() * 0.1 + 0.05);

          const tailPartGradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
          tailPartGradient.addColorStop(0, `rgba(253, 224, 71, ${alpha})`);
          tailPartGradient.addColorStop(1, `rgba(217, 119, 6, 0)`);
          
          ctx.fillStyle = tailPartGradient;
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      
      ctx.globalCompositeOperation = 'source-over';

      if (particles.length < maxParticles && Math.random() > 0.6) {
        for (let k = 0; k < 2; k++) {
            const spawnDist = Math.random() * tailLength * 0.8;
            const progress = spawnDist / tailLength;
            const spawnX = coreX - spawnDist;
            
            const spawnWidth = tailStartWidth + (tailEndWidth - tailStartWidth) * progress;
            const spawnY = coreY + (Math.random() - 0.5) * spawnWidth;
            
            particles.push(new Particle(spawnX, spawnY));
        }
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw(ctx);
        if (p.life <= 0) {
          particles.splice(i, 1);
        }
      }

      const coreGradient = ctx.createRadialGradient(coreX, coreY, 0, coreX, coreY, 30);
      coreGradient.addColorStop(0, "rgba(255, 255, 224, 1)");
      coreGradient.addColorStop(0.3, "rgba(253, 224, 71, 0.8)");
      coreGradient.addColorStop(1, "rgba(217, 119, 6, 0)");
      
      ctx.fillStyle = coreGradient;
      ctx.beginPath();
      ctx.arc(coreX, coreY, 30, 0, Math.PI * 2);
      ctx.fill();

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


// --- UPDATED: Main component with slower internal animation ---
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
  
  // --- UPDATED: Increased duration for slower movement ---
  const movementDuration = 2.0; // Was 1.5
  const fadeDuration = 0.4;     // Was 0.3

  const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);
  
  const easedProgress = easeOutQuart(Math.min(1, progress / movementDuration));

  const currentX = animationPath.x1 + (animationPath.x2 - animationPath.x1) * easedProgress;
  const currentY = animationPath.y1 + (animationPath.y2 - animationPath.y1) * easedProgress;
  const currentRotation = animationPath.r1 + (animationPath.r2 - animationPath.r1) * easedProgress;

  const logoAndTrailOpacity = progress > 0.01 ? 1 : 0;

  const trailFadeProgress = Math.max(0, (progress - movementDuration) / fadeDuration);
  const trailFinalOpacity = 1 - trailFadeProgress;
  
  const isMovementComplete = progress >= movementDuration;
  const isFadeComplete = trailFadeProgress >= 1;

  return (
    <>
      <div
        style={{
          opacity: logoAndTrailOpacity,
          transform: `translate(${currentX}px, ${currentY}px)`,
          transition: "opacity 0.2s linear",
          visibility: isFadeComplete ? "hidden" : "visible",
        }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div 
            style={{ 
                transform: `rotate(${currentRotation}deg)`,
                visibility: isMovementComplete ? 'hidden' : 'visible'
            }} 
            className="relative z-10"
        >
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
          opacity: isMovementComplete ? 1 : 0,
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

export default React.memo(AnimatedLogo);