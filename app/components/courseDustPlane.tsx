"use client";

import * as THREE from "three";
import { useMemo, forwardRef } from "react";
import { ThreeElements } from "@react-three/fiber";

const vertex = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragment = `
  precision highp float;
  varying vec2 vUv;
  uniform float uScrollProgress;
  uniform float uOpacity;
  const float PI = 3.1415926535;

  void main() {
    vec2 adjustedUv = vUv;
    adjustedUv.y -= uScrollProgress * 0.5;
    float progress = 1.0 - adjustedUv.x;
    vec3 colorDarkOrange = vec3(0.949, 0.451, 0.110);
    vec3 colorLightOrange = vec3(0.933, 0.624, 0.212);
    vec3 colorYellowish = vec3(1.0, 0.8, 0.3);
    vec3 colorWhite = vec3(1.0);
    float dipAmount = 0.12;

    // --- THIS IS THE ONLY CHANGE ---
    // The vertical pivot point is moved from 0.5 down to 0.25
    float pivotY = 0.25 - dipAmount * sin(progress * PI);

    float baseExpansion = pow(progress, 1.5) * 1.0;
    float symmetricalDist = abs(adjustedUv.y - pivotY) / (baseExpansion + 0.01);
    const float downwardSpreadFactor = 2.5; 
    float spreadFalloff = pow(1.0 - progress, 0.75);
    float dynamicDownwardSpread = mix(0.04, downwardSpreadFactor, spreadFalloff);
    float isBelow = step(adjustedUv.y, pivotY);
    float asymmetryMultiplier = mix(1.0, dynamicDownwardSpread, isBelow);
    float asymmetricalDist = abs(adjustedUv.y - pivotY) / (baseExpansion * asymmetryMultiplier + 0.01);
    float horizontalFadeRampUp = smoothstep(0.5, 0.9, progress);
    float horizontalFadeRampDown = 1.0 - smoothstep(0.7, 1.0, progress);
    float horizontalFade = horizontalFadeRampUp * horizontalFadeRampDown;
    vec3 coreColor = mix(colorDarkOrange, colorLightOrange, horizontalFade);
    vec3 edgeColor = mix(coreColor, colorWhite, 0.9);
    float startStrength = 0.7 + uScrollProgress * 0.2;
    float endStrength = 0.4 + uScrollProgress * 0.3;
    float whiteHaloStrength = mix(startStrength, endStrength, progress);
    float yellowRampUp = smoothstep(0.2, 0.6, progress);
    float yellowRampDown = 1.0 - smoothstep(0.85, 1.0, progress);
    float yellowHaloStrength = (yellowRampUp * yellowRampDown) * (1.0 + uScrollProgress * 0.5);
    float toYellowFade = smoothstep(0.05, 0.4, symmetricalDist) * yellowHaloStrength;
    vec3 coreLayerColor = mix(coreColor, colorYellowish, toYellowFade);
    float whiteHaloMask = smoothstep(0.2, 0.7, asymmetricalDist) * whiteHaloStrength;
    vec3 finalColor = mix(coreLayerColor, edgeColor, whiteHaloMask);
    float shapeMask = 1.0 - smoothstep(0.1, 0.8, asymmetricalDist);
    float rightEdgeFade = smoothstep(1.0, 0.8, adjustedUv.x);
    float scrollIntensity = 1.0 + uScrollProgress * 0.3;
    float alpha = shapeMask * rightEdgeFade * scrollIntensity;
    gl_FragColor = vec4(finalColor, alpha * uOpacity);
  }
`;

const DustPlane = forwardRef<THREE.Mesh, ThreeElements['mesh']>((props, ref) => {
  const geom = useMemo(() => new THREE.PlaneGeometry(20, 12, 1, 1), []);

  const mat = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms: {
        uScrollProgress: { value: 0 },
        uOpacity: { value: 1.0 }
      },
      transparent: true,
      depthWrite: false,
    });
  }, []);

  return (
    <mesh ref={ref} geometry={geom} position={[0, 0, -3]} {...props}>
      <primitive object={mat} attach="material" />
    </mesh>
  );
});

DustPlane.displayName = "DustPlane";
export default DustPlane;