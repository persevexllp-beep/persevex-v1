// LandingPage.tsx
"use client";

import { Canvas } from "@react-three/fiber";
import { ScrollControls, Scroll, useScroll } from "@react-three/drei";
import { Suspense, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three"; // Import THREE

import StarField from "./StarField";
import DustPlane from "./DustPlane";
import Hero from "./Hero";
import CoursesSection from "./CoursesSection";

// This component now handles ALL scroll-based animations.
function SceneContent() {
  const scroll = useScroll();
  
  // FIX: Define the type for the mesh's material to be a ShaderMaterial for type safety
  interface DustPlaneMesh extends THREE.Mesh {
    material: THREE.ShaderMaterial;
  }
  
  // FIX: Initialize all refs with null and provide correct types.
  const dustPlaneRef = useRef<DustPlaneMesh | null>(null);
  const heroH2Ref = useRef<HTMLHeadingElement | null>(null);
  const coursesH2Ref = useRef<HTMLHeadingElement | null>(null);

  useFrame(() => {
    const progress = scroll.offset; // 0 -> 1

    // 1. Animate the DustPlane shader
    if (dustPlaneRef.current) {
        // FIX: The uniforms are on the material property of the mesh.
        dustPlaneRef.current.material.uniforms.uScrollProgress.value = progress;
    }

    // 2. Animate the "Persevex" watermark (Fade Out)
    if (heroH2Ref.current) {
      const opacity = Math.max(0, 1 - progress * 2);
      heroH2Ref.current.style.opacity = `${opacity * 0.4}`;
    }

    // 3. Animate the "Courses" watermark (Fade In)
    if (coursesH2Ref.current) {
      const opacity = Math.max(0, (progress - 0.5) * 2);
      coursesH2Ref.current.style.opacity = `${opacity * 0.4}`;
    }
  });

  return (
    <>
      {/* 3D Scene Content */}
      <StarField hover={false} />
      {/* Pass the ref to DustPlane, which now accepts it */}
      <DustPlane ref={dustPlaneRef} renderOrder={-2} />

      {/* HTML Content */}
      <Scroll html style={{ width: "100%" }}>
        <div className="w-full h-screen flex justify-center items-center">
          <Hero ref={heroH2Ref} />
        </div>
        
        <div className="w-full h-screen flex justify-center items-center">
          <CoursesSection ref={coursesH2Ref} />
        </div>
      </Scroll>
    </>
  );
}

export default function LandingPage() {
  // No changes here
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
            <SceneContent />
          </ScrollControls>
        </Suspense>
      </Canvas>
    </main>
  );
}