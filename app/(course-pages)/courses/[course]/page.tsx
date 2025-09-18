"use client";

import React, { use, useEffect, useRef } from 'react';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import Image from 'next/image';
import { faqsData } from '@/app/constants/faqsData';
import { managementCourses, technicalCourses } from '@/app/constants/courseConstant';
import { Canvas } from '@react-three/fiber';
import StarField from '@/app/components/StarField';
import { allDomains, CourseType } from '@/app/constants/courseConstant'; 
import AboutProgramSection from '@/app/components/AboutProgramSection';
import CurriculumSection from '@/app/components/CurriculumSection';
import ProjectsSection from '@/app/components/ProjectsSection';
import CertificationSection from '@/app/components/CertificationSection';
import TrainingPartners from '@/app/components/TrainingPartners';
import FrequentlyAskedQuestionsSection from '@/app/components/FrequentlyAskedQuestions';
import CourseFooterSection from '@/app/components/CourseFooterSection';
import { useCourseScroll } from '../../contexts/courseScrollContext';
  
const managementFooterLinks = [
  {
    title: "Quick Links",
    links: ["Home", "Digital Marketing", "Finance", "Human Resource", "Contact Us"],
  },
  {
    title: "Our Programs",
    links: ["Digital Marketing", "Finance", "Human Resource"],
  },
  {
    title: "About Us",
    links: ["Who we are", "Founder ethos", "Work life balance"],
  },
];

const technicalFooterLinks = [
  {
    title: "Quick Links",
    links: ["Home", "Web Development", "Artificial Intelligence", "Machine Learning", "Contact Us"],
  },
  {
    title: "Our Programs",
    links: ["Web Development", "Artificial Intelligence", "Machine Learning", "Cloud Computing", "Cybersecurity"],
  },
  {
    title: "About Us",
    links: ["Who we are", "Founder ethos", "Work life balance"],
  },
];

export default function CoursePage({ params }: { params: Promise<{ course: string }> }) {
  const resolvedParams = use(params);
  const { setSectionRefs } = useCourseScroll(); 
  
   const allCourses: CourseType[] = allDomains.flatMap(domain => domain.courses);
  const course = allCourses.find(c => c.slug === resolvedParams.course);


  const aboutRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;;
  const curriculumRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;;
  const projectsRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;;
  const certificationRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;;
  const partnersRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;;
  const faqsRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;;
  const footerRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;;

  useEffect(() => {
    setSectionRefs({
      about: aboutRef,
      curriculum: curriculumRef,
      projects: projectsRef,
      certification: certificationRef,
      partners: partnersRef,
      faqs: faqsRef,
      footer: footerRef,
    });
  }, [setSectionRefs]);

  if (!course) {
    notFound();
  }

  const isManagementCourse = managementCourses.some(mc => mc.id === course.id);
  const footerLinksToShow = isManagementCourse ? managementFooterLinks : technicalFooterLinks;
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

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
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
        </div>
        
        <div ref={aboutRef}>
          <AboutProgramSection course={course} />
        </div>

        {course.modules && course.modules.length > 0 && (
          <div ref={curriculumRef}>
            <CurriculumSection modules={course.modules} />
          </div>
        )}
        
        {course.projects && course.projects.length > 0 && (
          <div ref={projectsRef}>
            <ProjectsSection projects={course.projects} />
          </div>
        )}

        <div ref={certificationRef}>
          <CertificationSection />
        </div>

        <div ref={partnersRef}>
          <TrainingPartners />
        </div>

        <div ref={faqsRef}>
          <FrequentlyAskedQuestionsSection faqs={courseFaqs} />
        </div>

        <div ref={footerRef}>
          <CourseFooterSection links={footerLinksToShow} />
        </div>
      </div>
    </main>
  );
}