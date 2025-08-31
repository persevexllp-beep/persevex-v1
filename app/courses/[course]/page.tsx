"use client";

import React, { Suspense, use } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { managementCourses, technicalCourses } from '../../constants/courseConstant'; 
import { Canvas } from '@react-three/fiber';
import StarField from '@/app/components/StarField';

export default function CoursePage({ params }: { params: Promise<{ course: string }> }) {
  // Unwrap the params Promise using React.use()
  const resolvedParams = use(params);
  
  const allCourses = [...managementCourses, ...technicalCourses];

  const course = allCourses.find(c => c.slug === resolvedParams.course);

  if (!course) {
    notFound();
  }

  return (
    // The main container is now 'relative' to act as a positioning context
    // We remove 'bg-black' as the canvas will handle the background.
    <main className="relative min-h-screen w-full text-white  overflow-hidden">
      
      {/* 1. Background Canvas Layer */}
      {/* This div is fixed to the screen, covers the entire viewport, and is sent to the back with z-index. */}
      <div className="fixed top-0 left-0 w-full h-full -z-10">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <Suspense fallback={null}>
            <StarField hover={false} />
          </Suspense>
        </Canvas>
      </div>

      {/* 2. Foreground Content Layer */}
      {/* This div holds all your visible UI content and is positioned on top of the background canvas. */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          
          {/* Left Column: Text Content */}
          <div className="flex flex-col gap-6">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight">
              {course.title}
            </h1>
            <div className="w-1/2 h-0.5 bg-white/80" />
            <p className="text-lg md:text-xl text-neutral-300 max-w-xl">
              {course.large_description}
            </p>
            
            {/* CTA Button with shadow effect */}
            <div className="mt-6">
              <div className="relative w-fit">
                <button className="relative z-10 px-10 py-3 bg-orange-500 rounded-full font-semibold text-lg shadow-lg shadow-orange-500/30 hover:bg-orange-600 transition-colors duration-300">
                  Enroll Now
                </button>
                <div className="absolute inset-0 bg-orange-700 rounded-full transform translate-x-1 translate-y-1"></div>
              </div>
            </div>
          </div>

          {/* Right Column: Illustration/Image */}
          <div className="flex justify-center  items-center">
             <Image
                src={course.image}
                alt={course.title}
                width={500}
                height={500}
                className="rounded-lg object-contain w-[400px] h-[400px]"
                priority // Add priority to preload the main image
             />
          </div>

        </div>
      </div>
    </main>
  );
}