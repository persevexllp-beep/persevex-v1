"use client";

import React, { Suspense, use } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { managementCourses, technicalCourses } from '../../constants/courseConstant'; 
import { Canvas } from '@react-three/fiber';
import StarField from '@/app/components/StarField';

// A mock course constant for demonstration if the import fails
// In your actual app, you'd use your real import.
// const managementCourses = [{slug: 'example-course', title: 'Example Course', large_description: 'This is a great course.', image: '/dog1.jpeg' }];
// const technicalCourses = [];


export default function CoursePage({ params }: { params: Promise<{ course: string }> }) {
  // Unwrap the params Promise using React.use()
  const resolvedParams = use(params);
  
  const allCourses = [...managementCourses, ...technicalCourses];

  const course = allCourses.find(c => c.slug === resolvedParams.course);

  if (!course) {
    notFound();
  }

  return (
    <main className="relative min-h-screen w-full text-white overflow-x-hidden">
      
      {/* 1. Background Canvas Layer */}
      <div className="fixed top-0 left-0 w-full h-full -z-10">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <Suspense fallback={null}>
            <StarField hover={false} />
          </Suspense>
        </Canvas>
      </div>

      {/* 2. Foreground Content Layer */}
      {/* Adjusted padding for better spacing on all devices */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        {/* Increased vertical gap on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-12 items-center">
          
          {/* Right Column (on desktop) / First element (on mobile) */}
          {/* Reordered for mobile-first visual hierarchy */}
          <div className="flex justify-center items-center order-1 md:order-2">
             <Image
                src={course.image}
                alt={course.title}
                width={500}
                height={500}
                // Responsive image classes:
                // - w-full: Takes up container width
                // - h-auto: Maintains aspect ratio
                // - max-w-sm: Prevents it from being too big on small screens
                // - md:max-w-none: Allows it to fill its grid column on larger screens
                className="rounded-lg object-contain w-full h-auto max-w-sm md:max-w-none"
                priority // Good for LCP (Largest Contentful Paint)
             />
          </div>

          {/* Left Column (on desktop) / Second element (on mobile) */}
          {/* Centered on mobile, left-aligned on desktop */}
          <div className="flex flex-col gap-6 order-2 md:order-1 items-center text-center md:items-start md:text-left">
            {/* Responsive font sizes */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight">
              {course.title}
            </h1>
            {/* Divider centered on mobile, left-aligned on desktop */}
            <div className="w-1/2 h-0.5 bg-white/80" />
            <p className="text-sm lg:text-lg text-neutral-300 max-w-xl">
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

        </div>
      </div>
    </main>
  );
}