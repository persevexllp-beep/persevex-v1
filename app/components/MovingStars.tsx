"use client";

import * as THREE from "three";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";

export default function MovingStars() {
  const pointsRef = useRef<THREE.Points | null>(null);

  const STAR_COUNT = 12000; 
  const BOUNDS_X = 20;   
  const BOUNDS_Y = 6;    
  const SPEED = 0.2;    

  const starPositions = useMemo(() => {
    const positions: number[] = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      positions.push(
        (Math.random() - 0.5) * BOUNDS_X,
        (Math.random() - 0.5) * BOUNDS_Y,
        0 
      );
    }
    return new Float32Array(positions);
  }, []);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < STAR_COUNT; i++) {
      positions[i * 3] += SPEED * delta;
      if (positions[i * 3] > BOUNDS_X / 2) {
        positions[i * 3] = -BOUNDS_X / 2;
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} position={[0, 0, -2]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[starPositions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={new THREE.Color("#ffffff")}
        size={0.02}
        sizeAttenuation={true}
        transparent={true}
        opacity={0.7}
        depthWrite={false}
      />
    </points>
  );
}