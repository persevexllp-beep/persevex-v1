"use client";

import * as THREE from "three";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";

export default function DustParticles({ hover }: { hover: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);

  const dustPositions = useMemo(() => {
    const positions = [];
    for (let i = 0; i < 800; i++) {
      positions.push((Math.random() - 0.5) * 5);
      positions.push((Math.random() - 0.5) * 5);
      positions.push((Math.random() - 0.5) * 5);
    }
    return new Float32Array(positions);
  }, []);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * (hover ? 0.2 : 0.05);
      pointsRef.current.rotation.x += delta * (hover ? 0.1 : 0.02);
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[dustPositions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#ffdd99"
        size={0.015}
        sizeAttenuation
        transparent
        opacity={0.8}
      />
    </points>
  );
}
