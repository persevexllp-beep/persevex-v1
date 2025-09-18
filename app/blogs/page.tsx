"use client";

import React, { useState, Suspense, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import StarField from "@/app/components/StarField";
import Link from "next/link";

export default function BlogsPage() {
 

  return (
    <main className="relative min-h-screen w-full text-white overflow-x-hidden">
      <div className="fixed top-0 left-0 w-full h-full -z-10">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <color attach="background" args={["#000000"]} />
          <Suspense fallback={null}>
            <StarField hover={false} />
          </Suspense>
        </Canvas>
      </div>

      <div className="flex flex-col items-center justify-start pt-4 min-h-screen w-full px-4 sm:px-8">
        <ExploreAppbar />
       <div className="flex min-h-screen items-center justify-center">
         <h1 className=" text-center">
          This is blogs page and it's currently in development page, thank you for your patience.
        </h1>
       </div>

   


     
      </div>
     
    </main>
  );
}

function ExploreAppbar() {
  return (
    <div className="flex items-start justify-start w-full ">
      <Link href={"/"} className="text-2xl md:text-3xl font-bold">
        PERSEVEX
      </Link>
    </div>
  );
}
