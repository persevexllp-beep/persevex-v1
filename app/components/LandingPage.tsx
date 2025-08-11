// LandingPage.tsx
"use client";

import { Canvas } from "@react-three/fiber";
import { ScrollControls, Scroll, useScroll } from "@react-three/drei";
import { Suspense } from "react";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";

// Import all the building blocks
import StarField from "./StarField";
import DustPlane from "./DustPlane";
import Hero from "./Hero";
import CoursesSection from "./CoursesSection";

function SceneContent() {
  const scroll = useScroll();
  const [progress, setProgress] = useState(0);

  useFrame(() => {
    setProgress(scroll.offset); // 0 → 1 across total pages
  });

  return (
    <>
      <StarField hover={false} />
      <DustPlane scrollProgress={progress} renderOrder={-2} />
    </>
  );
}

export default function LandingPage() {
  return (
    <main className="w-full h-screen bg-black">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <Suspense fallback={null}>
          <ScrollControls pages={2} damping={0.2}>
            {/* 3D Content */}
            <SceneContent />

            {/* HTML Content */}
            <Scroll html style={{ width: "100%" }}>
              <div className="w-full h-screen flex justify-center items-center">
                <Hero />
              </div>
              <div className="w-full h-screen flex justify-center items-center">
                <CoursesSection />
              </div>
            </Scroll>
          </ScrollControls>
        </Suspense>
      </Canvas>
    </main>
  );
}
