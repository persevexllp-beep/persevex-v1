"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import StarField from "./StarField";
import DustPlane from "./DustPlane";

interface SceneProps {
  hover: {
    stars: boolean;
    dust: boolean;
  };
}

export default function Scene({ hover }: SceneProps) {

    
  return (

    <div className="fixed top-0 left-0 w-full h-full">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <Suspense fallback={null}>
          <StarField hover={hover.stars} renderOrder={-1} />
          <DustPlane renderOrder={0} />
        </Suspense>
      </Canvas>
    </div>
  );
}