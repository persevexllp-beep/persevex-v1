// components/DustPlane.tsx

"use client";

import * as THREE from "three";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { vertex, fragment } from "../constants/vertex"; // Assuming this path is correct

export default function DustPlane() {
  const geom = useMemo(() => new THREE.PlaneGeometry(20, 12, 1, 1), []);
  const materialRef = useRef<THREE.ShaderMaterial>(null!);

  // This hook runs on every frame, updating the 'u_time' uniform in the shader
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_time.value = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh geometry={geom} position={[0, 0, -3]}>
      <shaderMaterial
        ref={materialRef}
        key={Date.now()} // A simple key to ensure it re-creates on hot-reload
        vertexShader={vertex}
        fragmentShader={fragment}
        transparent={true}
        depthWrite={false}
        uniforms={{
          u_time: { value: 0.0 },
        }}
      />
    </mesh>
  );
}