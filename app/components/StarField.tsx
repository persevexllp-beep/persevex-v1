"use client";

import * as THREE from "three";
import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";

type Props = { hover: boolean };

export default function StarField({ hover }: Props) {
  const pointsRef = useRef<THREE.Points | null>(null);
  const mouse = useRef({ x: 0, y: 0 });

  const STAR_COUNT = 12000;
  const BOUNDS_X = 80; 
  const BOUNDS_Y = 40;
  const BOUNDS_Z = 60;

  useEffect(() => {
    const handler = (e: any) => {
      const d = e.detail as { x: number; y: number };
      mouse.current = d;
    };
    window.addEventListener("perse-mouse", handler as EventListener);
    return () => window.removeEventListener("perse-mouse", handler as EventListener);
  }, []);

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
  }, []);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;

    pointsRef.current.rotation.y += delta * (hover ? 0.06 : 0.015);
    pointsRef.current.rotation.x += delta * (hover ? 0.02 : 0.004);

    const mx = (mouse.current.x - 0.5) * 2;
    const my = (mouse.current.y - 0.5) * -0.4;
    pointsRef.current.position.x += (mx - pointsRef.current.position.x) * 0.06;
    pointsRef.current.position.y += (my - pointsRef.current.position.y) * 0.06;

    for (let i = 0; i < STAR_COUNT; i++) {
      let x = positions[i * 3];
      let y = positions[i * 3 + 1];
      let z = positions[i * 3 + 2];

      if (x < -BOUNDS_X / 2) x = BOUNDS_X / 2;
      else if (x > BOUNDS_X / 2) x = -BOUNDS_X / 2;

      if (y < -BOUNDS_Y / 2) y = BOUNDS_Y / 2;
      else if (y > BOUNDS_Y / 2) y = -BOUNDS_Y / 2;

      if (z < -BOUNDS_Z / 2) z = BOUNDS_Z / 2;
      else if (z > BOUNDS_Z / 2) z = -BOUNDS_Z / 2;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[starPositions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={new THREE.Color("#ffffff")}
        size={0.03}
        sizeAttenuation={true}
        transparent={true}
        opacity={0.9}
      />
    </points>
  );
}
