"use client";

import * as THREE from "three";
import { useRef, useMemo, MutableRefObject } from "react";
import { useFrame, ThreeElements } from "@react-three/fiber";

// The component no longer needs the scaleRef, so we can simplify the props.
type Props = {
  hover: boolean;
} & ThreeElements['points'];

export default function AboutUsStarField({ hover, ...props }: Props) {
  const pointsRef = useRef<THREE.Points | null>(null);

  // --- REMOVED ---
  // No need to access the camera or its initial position anymore.
  // The starfield's size and position will be static.

  const STAR_COUNT = 500;
  // Let's make the bounds a bit bigger to ensure it fills the screen
  const BOUNDS_X = 100;
  const BOUNDS_Y = 100;
  const BOUNDS_Z = 80;

  const starPositions = useMemo(() => {
    const positions: number[] = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      positions.push(
        (Math.random() - 0.5) * BOUNDS_X,
        (Math.random() - 0.5) * BOUNDS_Y,
        (Math.random() - 0.5) * BOUNDS_Z
      );
    }
    return new Float32Array(positions);
  }, [BOUNDS_X, BOUNDS_Y, BOUNDS_Z]);

  // The animation loop is now much simpler.
  useFrame((_, delta) => {
    if (pointsRef.current) {
        // We only need to handle the rotation.
        pointsRef.current.rotation.y += delta * 0.015;
        pointsRef.current.rotation.x += delta * 0.004;

        // --- REMOVED ---
        // All scaling and camera movement logic is gone.
    }
  });

  return (
    <points ref={pointsRef} {...props}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[starPositions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={new THREE.Color("#ffffff")}
        size={0.05}
        sizeAttenuation={true}
        transparent={true}
        opacity={0.9}
        depthWrite={false}
      />
    </points>
  );
}