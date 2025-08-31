// Filename: components/CourseClientUI.tsx

"use client";

import React, { Suspense } from 'react';
import Image from 'next/image';
import { Canvas } from '@react-three/fiber';
import StarField from './StarField'; // Assuming StarField is in the same components folder
import { CourseType } from '../constants/courseConstant';

export default function CourseClientUI({ course }: { course: CourseType }) {
  return (
    <main className="relative min-h-screen w-full text-white overflow-hidden">
      
      {/* Background Canvas Layer */}
      <div className="fixed top-0 left-0 w-full h-full -z-10">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <Suspense fallback={null}>
            <StarField hover={false} />
          </Suspense>
        </Canvas>
      </div>

      {/* Foreground Content Layer */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          
          {/* Left Column: Text Content */}
          <div className="flex flex-col gap-6">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight">
              {course.title}
            </h1>
            <div className="w-1/2 h-0.5 bg-white/80" />
            <p className="text-lg md:text-xl text-neutral-300 max-w-xl">
              {/* NOTE: Changed back to 'description' as 'large_description' is not in your data type */}
              {course.description}
            </p>
            
            {/* CTA Button */}
            <div className="mt-6">
              <div className="relative w-fit">
                <button className="relative z-10 px-10 py-3 bg-orange-500 rounded-full font-semibold text-lg shadow-lg shadow-orange-500/30 hover:bg-orange-600 transition-colors duration-300">
                  Enroll Now
                </button>
                <div className="absolute inset-0 bg-orange-700 rounded-full transform translate-x-1 translate-y-1"></div>
              </div>
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="flex justify-center items-center">
             <Image
                src={course.image}
                alt={course.title}
                width={500}
                height={500}
                // NOTE: Changed class for better responsiveness
                className="rounded-lg object-contain w-full h-auto max-w-[400px]"
                priority 
             />
          </div>

        </div>
      </div>
    </main>
  );
}