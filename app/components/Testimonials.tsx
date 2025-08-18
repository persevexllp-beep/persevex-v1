// Filename: TestimonialsParallax.tsx
"use client";

import React from 'react';
import Image from 'next/image';
import { Testimonial, testimonialsData } from '../constants/TestimonialsData';


const VerifiedIcon = () => (
  <svg className="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.25 17.292l-4.5-4.364 1.857-1.858 2.643 2.506 5.643-5.784 1.857 1.858-7.5 7.642z" />
  </svg>
);

const TestimonialCard: React.FC<Testimonial> = ({ headline, quote, name, title, image }) => (
  <div className="bg-gray-800/20 p-8 rounded-3xl shadow-lg border border-gray-100/10 backdrop-blur-sm">
    <h3 className="text-xl font-bold mb-4 text-white">{headline}</h3>
    <p className="text-gray-400 mb-6">{quote}</p>
    <div className="flex items-center gap-4">
      <Image src={image} alt={name} width={48} height={48} className="w-12 h-12 rounded-full object-cover" />
      <div>
        <div className="flex items-center gap-2"><h4 className="font-semibold text-white">{name}</h4><VerifiedIcon /></div>
        <p className="text-sm text-gray-500">{title}</p>
      </div>
    </div>
  </div>
);

// --- Main Testimonials Section (Parallax Removed) ---
export default function TestimonialsParallax() {
  // Simple distribution for balanced columns
  const columns: Testimonial[][] = [[], [], []];
  testimonialsData.forEach((testimonial, i) => {
    columns[i % 3].push(testimonial);
  });

  return (
    <section className="relative w-full bg-transparent py-24 px-4 sm:px-6 lg:px-8">
      <div className="relative z-10 max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div 
          className="text-center mb-20 max-w-3xl mx-auto"
        >
          <div className="inline-block p-2 mb-4 bg-gray-700/50 rounded-lg">
            <svg className="w-6 h-6 text-gray-300" stroke="currentColor" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M5 10h14M5 14h14" />
            </svg>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-white md:leading-tight">
            Proven track of satisfied clients
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            We cherish relations to blossom and last
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {columns.map((col, colIndex) => (
              <div
                key={colIndex}
                className="flex flex-col gap-8"
              >
                {col.map((testimonial) => (
                  <TestimonialCard key={testimonial.name} {...testimonial} />
                ))}
              </div>
          ))}
        </div>
      </div>
    </section>
  );
}