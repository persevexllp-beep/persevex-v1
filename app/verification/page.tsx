"use client";

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import StarField from '@/app/components/StarField'; 
import CertificateVerifier from "../components/CertificateVerifier";
import Link from 'next/link';

export default function VerifyPage() {
  return (
    <main className="relative min-h-screen w-full ">
      <div className="fixed top-0 left-0 w-full h-full -z-10">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <color attach="background" args={["#000000"]} />
          <Suspense fallback={null}>
            <StarField hover={false} />
          </Suspense>
        </Canvas>
      </div>
 
     
      <div className="flex flex-col min-h-screen p-4">
         <div className='w-full'>
        <ExploreAppbar />
      </div>
      <div className='w-full flex items-center justify-center min-h-screen'>
          <CertificateVerifier />
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
