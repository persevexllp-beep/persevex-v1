// Filename: components/AboutProgramSection.tsx

import React from 'react';
import { CourseType } from '../constants/courseConstant'; // Adjust the import path as needed

// Define the props the component will accept
interface AboutProgramSectionProps {
  course: CourseType;
}

export default function AboutProgramSection({ course }: AboutProgramSectionProps) {
  return (
    // Added margin-top to create space from the section above
    <div className="mt-24 py-16">
      <div className="text-center max-w-4xl mx-auto">
         <div className="inline-flex mb-4 w-fit items-center px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 backdrop-blur-sm">
          <span className="text-orange-400 text-sm font-medium">Programs</span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">
          About The Program
        </h2>
        <p className="text-lg bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent md:text-lg">
          {/* Using the shorter description from the course data */}
          {course.description}
        </p>
      </div>

      {/* Conditionally render the cards section only if programCardsHeading exists */}
      {course.programCardsHeading && course.programCardsHeading.length > 0 && (
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {/* Map over the headings array to create a card for each string */}
          {course.programCardsHeading.map((heading, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/20 rounded-xl p-6 text-center flex items-center justify-center backdrop-blur-sm min-h-[120px] transition-all duration-300 hover:bg-white/10 hover:border-white/30"
            >
              <h3 className="font-semibold text-base md:text-lg">
                {heading}
              </h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}