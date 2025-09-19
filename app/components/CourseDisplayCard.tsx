"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CourseType } from "../constants/courseConstant"; 

const CourseDisplayCard = ({ course }: { course: CourseType }) => {
    const Icon = course.icon;

    return (
        <div className="relative flex-shrink-0 w-full max-w-sm mx-auto rounded-xl overflow-hidden 
                       bg-gray-900/90 backdrop-blur-md border border-cyan-500/20
                       transition-all duration-700 ease-out
                       hover:shadow-2xl hover:shadow-cyan-500/25
                       hover:border-cyan-400/50 hover:bg-gray-800/90
                       hover:-translate-y-2 hover:scale-[1.02]
                       group cursor-pointer">
            
            {/* Image Container with Better Aspect Ratio */}
            <div className="relative w-full h-64 overflow-hidden">
                <Image 
                    src={course.cardBg_image} 
                    alt={course.title} 
                    fill
                    className="object-cover transition-all duration-700 
                              group-hover:scale-105 group-hover:brightness-110"
                />
                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-900/40" />
                
                {/* Glowing Border Effect on Hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
                               bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10" />
            </div>

            {/* Content Container */}
            <div className="relative p-5 space-y-3">
                {/* Title */}
                <h3 className="text-lg font-bold text-white mb-2 
                               leading-tight tracking-wide
                               group-hover:text-cyan-300 transition-colors duration-300">
                    {course.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-300 text-sm leading-relaxed 
                              line-clamp-3 group-hover:text-gray-200 transition-colors duration-300">
                    {course.description}
                </p>

                {/* Bottom Section */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-700/50">
                    <Link 
                        href={course.route}
                        className="inline-flex items-center space-x-2 text-sm font-semibold 
                                   text-cyan-400 hover:text-cyan-300 transition-all duration-300
                                   group-hover:scale-105"
                    >
                        <span>View Course</span>
                        <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
                             fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                  d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                    
                    {/* Decorative Element */}
                    <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                        <div className="w-1 h-1 bg-cyan-400/60 rounded-full animate-pulse delay-100" />
                        <div className="w-1 h-1 bg-cyan-400/30 rounded-full animate-pulse delay-200" />
                    </div>
                </div>

                {/* Subtle glow effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-600 to-purple-600 
                               rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10" />
            </div>
        </div>
    );
};

export default CourseDisplayCard;