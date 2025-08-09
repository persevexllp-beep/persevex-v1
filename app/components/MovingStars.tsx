// components/MovingStars.tsx

"use client";

import * as THREE from "three";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";

export default function MovingStars() {
  const pointsRef = useRef<THREE.Points | null>(null);

  const STAR_COUNT = 12000; // Lots of small stars
  const BOUNDS_X = 20;    // Matches the DustPlane width
  const BOUNDS_Y = 6;    // Matches the DustPlane height
  const SPEED = 0.2;      // Slow movement speed to the right

  // Generate star positions within the bounds of the gradient plane
  const starPositions = useMemo(() => {
    const positions: number[] = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      positions.push(
        (Math.random() - 0.5) * BOUNDS_X,
        (Math.random() - 0.5) * BOUNDS_Y,
        0 // Keep them on a 2D plane
      );
    }
    return new Float32Array(positions);
  }, []);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;

    // Animate each star
    for (let i = 0; i < STAR_COUNT; i++) {
      // Move star to the right based on speed and frame delta
      positions[i * 3] += SPEED * delta;

      // If a star goes off the right edge, wrap it back to the left edge
      if (positions[i * 3] > BOUNDS_X / 2) {
        positions[i * 3] = -BOUNDS_X / 2;
      }
    }

    // Tell Three.js to update the positions in the GPU
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    // Position this star plane slightly in front of the gradient (DustPlane is at z=-3)
    <points ref={pointsRef} position={[0, 0, -2]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[starPositions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={new THREE.Color("#ffffff")}
        size={0.02} // Make stars small
        sizeAttenuation={true}
        transparent={true}
        opacity={0.7} // Blend them nicely with the gradient
        depthWrite={false} // Important for transparency layering
      />
    </points>
  );
}