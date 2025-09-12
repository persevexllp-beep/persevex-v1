"use client";

import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import StarField from '@/app/components/StarField';
import { motion, AnimatePresence } from 'framer-motion';

import { managementCourses, technicalCourses } from '../constants/courseConstant';
import CourseDisplayCard from '../components/CourseDisplayCard';

export default function ExploreCoursesPage() {
    const [activeView, setActiveView] = useState<'management' | 'technical'>('management');

    const coursesToShow = activeView === 'management' ? managementCourses : technicalCourses;

    return (
        <main className="relative min-h-screen w-full text-white overflow-x-hidden">
            
            <div className="fixed top-0 left-0 w-full h-full -z-10">
                <Canvas camera={{ position: [0, 0, 5] }}>
                    <color attach="background" args={['#000000']} />
                    <Suspense fallback={null}>
                        <StarField hover={false} />
                    </Suspense>
                </Canvas>
            </div>

            <div className='flex flex-col items-center justify-start pt-4 min-h-screen w-full px-4 sm:px-8'>
                <h1 className='text-4xl md:text-5xl font-bold text-center'>
                    Explore our Trending Courses
                </h1>

                <div className="mt-12 z-20">
                    <div className="relative flex w-fit items-center rounded-full bg-gray-900/50  p-1 backdrop-blur-sm">
                        <motion.div
                            className="absolute left-1 top-1 h-[calc(100%-0.5rem)] w-[110px] rounded-full bg-white"
                            animate={{ x: activeView === 'management' ? '0%' : '100%' }}
                            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                        />
                        <button
                            onClick={() => setActiveView('management')}
                            className={`relative z-10 w-[110px] cursor-pointer rounded-full py-2 text-sm font-semibold transition-colors duration-300 ${
                                activeView === 'management' ? 'text-gray-900' : 'text-white'
                            }`}
                        >
                            Management
                        </button>
                        <button
                            onClick={() => setActiveView('technical')}
                            className={`relative z-10 w-[110px] cursor-pointer rounded-full py-2 text-sm font-semibold transition-colors duration-300 ${
                                activeView === 'technical' ? 'text-gray-900' : 'text-white'
                            }`}
                        >
                            Technical
                        </button>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeView} 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="w-full max-w-7xl mx-auto mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-16 pb-24"
                    >
                        {coursesToShow.map((course) => (
                            <CourseDisplayCard key={course.id} course={course} />
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </main>
    );
}