"use client";

import * as THREE from "three";
import { useMemo } from "react";
import { vertex, fragment } from "../constants/vertex";

export default function DustPlane() {
  const geom = useMemo(() => new THREE.PlaneGeometry(20, 12, 1, 1), []);

  const mat = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      transparent: true,
      depthWrite: false,
    });
  }, []);

  return (
    <mesh geometry={geom} position={[0, 0, -3]}>
      <primitive object={mat} attach="material" />
    </mesh>
  );
}