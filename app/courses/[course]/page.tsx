

"use client";

import React, { use } from 'react';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import Image from 'next/image';
import { faqsData } from '../../constants/faqsData'; 
import { managementCourses, technicalCourses } from '../../constants/courseConstant'; 
import { Canvas } from '@react-three/fiber';
import StarField from '@/app/components/StarField';
import AboutProgramSection from '@/app/components/AboutProgramSection';
import CurriculumSection from '@/app/components/CurriculumSection';
import ProjectsSection from '@/app/components/ProjectsSection';
import CertificationSection from '@/app/components/CertificationSection';
import TrainingPartners from '@/app/components/TrainingPartners';
import FrequentlyAskedQuestionsSection from '@/app/components/FrequentlyAskedQuestions';
import FooterSection from '@/app/components/FooterSection';

export default function CoursePage({ params }: { params: Promise<{ course: string }> }) {
  const resolvedParams = use(params);
  
  const allCourses = [...managementCourses, ...technicalCourses];
  const course = allCourses.find(c => c.slug === resolvedParams.course);

  if (!course) {
    notFound();
  }

  const courseFaqs = faqsData[course.slug] || [];

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

      <div className="relative z-10 max-w-7xl min-h-screen mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-12 items-center">
          <div className="flex justify-center items-center order-1 md:order-2">
             <Image
                src={course.image}
                alt={course.title}
                width={500}
                height={500}
                className="rounded-lg object-contain w-full h-auto max-w-sm md:max-w-none"
                priority
             />
          </div>

          <div className="flex flex-col gap-6 order-2 md:order-1 items-center text-center md:items-start md:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight">
              {course.title}
            </h1>
            <div className="w-1/2 h-0.5 bg-white/80" />
            <p className="text-sm lg:text-lg text-neutral-300 max-w-xl">
              {course.large_description}
            </p>
            
            <div className="mt-6">
              <div className="relative w-fit">
                <button className="relative z-10 px-10 py-3 bg-orange-500 rounded-full font-semibold text-lg shadow-lg shadow-orange-500/30 hover:bg-orange-600 transition-colors duration-300">
                  Enroll Now
                </button>
              </div>
            </div>
          </div>

        </div>

        <div>
          <AboutProgramSection course={course} />
        </div>
        
        {course.modules && course.modules.length > 0 && (
          <CurriculumSection modules={course.modules} />
        )}

      </div>
      
      {course.projects && course.projects.length > 0 && (
          <ProjectsSection projects={course.projects} />
      )}

      <CertificationSection />
      <TrainingPartners />

      <FrequentlyAskedQuestionsSection faqs={courseFaqs} />

      <FooterSection />
    </main>
  );
}