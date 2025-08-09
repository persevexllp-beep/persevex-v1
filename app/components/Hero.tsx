"use client";

import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import Navbar from "./Appbar";
import StarField from "./StarField";
import DustPlane from "./DustPlane";

export default function Hero() {
  const [hover, setHover] = useState({ stars: false, dust: false });
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      mouseRef.current = { x, y };
      window.dispatchEvent(new CustomEvent("perse-mouse", { detail: mouseRef.current }));
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <main className="relative w-full min-h-screen bg-black text-white">
      <Navbar />

      <section className="relative w-full h-screen overflow-hidden">
        <Canvas
          className="absolute inset-0"
          camera={{ position: [0, 0, 6], fov: 50 }}
        >
          <Suspense fallback={null}>
            <StarField hover={hover.stars} />
            <DustPlane />
          </Suspense>
        </Canvas>

        <div
          onMouseEnter={() => setHover((s) => ({ ...s, stars: true }))}
          onMouseLeave={() => setHover((s) => ({ ...s, stars: false }))}
          className="absolute top-0 left-0 w-full h-1/2"
          style={{ pointerEvents: "auto" }}
        />
        <div
          onMouseEnter={() => setHover((s) => ({ ...s, dust: true }))}
          onMouseLeave={() => setHover((s) => ({ ...s, dust: false }))}
          className="absolute bottom-0 left-0 w-full h-1/2"
          style={{ pointerEvents: "auto" }}
        />

        <div className="absolute inset-0 z-10 flex items-end justify-center pointer-events-none overflow-hidden">
          <h2
            className="text-[24vw] md:text-[20vw] lg:text-[18rem] font-black uppercase text-transparent opacity-40 select-none leading-none transform translate-y-[4rem]"
            style={{ WebkitTextStroke: '3px white' }}
          >
            Persevex
          </h2>
        </div>

        <div className="absolute inset-0 z-20 pointer-events-none">
          <div className="max-w-6xl   mx-8 my-54 ">
            <h1 className="text-4xl md:text-6xl lg:text-5xl font-extrabold leading-tight">
              Empowering the Next Generation <br className="hidden md:block" />
              <span className="block">with Real-World Skills</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl max-w-2xl opacity-90">
              Experience hands-on learning with AI guidance, expert-curated projects,
              and career-ready outcomes
            </p>
             <button
              className="
                pointer-events-auto  mt-12 cursor-pointer 
                px-12 py-4 
                font-semibold text-white 
                bg-white/10 
                text-xl
                border border-white/30 
                rounded-lg 
                backdrop-blur-sm 
                transition-colors duration-300 
                hover:bg-white/20 hover:border-white/40
              "
            >
              Explore Courses
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}