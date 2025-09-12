"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CourseType } from "../constants/courseConstant"; 

const CourseDisplayCard = ({ course }: { course: CourseType }) => {
    const Icon = course.icon;

    return (
        <div className="relative flex-shrink-0 w-full h-96 rounded-2xl overflow-hidden 
                       bg-white/5 backdrop-blur-sm border border-white/10
                       transition-all duration-500 ease-out
                       hover:shadow-2xl hover:shadow-orange-500/10
                       hover:border-orange-400/30 group
                       whitespace-normal flex flex-col">
            
            <div className="relative w-full h-96 overflow-hidden">
                <Image 
                    src={course.cardBg_image} 
                    alt={course.title} 
                    fill
                    className="object-cover transition-transform duration-500 
                              group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
            </div>
            <div className="relative p-5 h-full flex flex-col justify-between">
                <div>
                    <h3 className="text-xl font-semibold text-white mb-2 
                                   line-clamp-2 leading-tight">
                        {course.title}
                    </h3>
                    <p className="text-sm text-gray-300 leading-relaxed 
                                  line-clamp-3">
                        {course.description}
                    </p>
                </div>
                <div className="flex items-center justify-between mt-4">
                    <Link 
                        href={course.route}
                        className="text-sm font-medium text-orange-400 hover:text-orange-300 transition-colors"
                    >
                        View Course
                    </Link>
                    <div className="flex items-center">
                        <div className="h-px bg-gradient-to-r from-orange-400/50 to-transparent flex-1 w-16" />
                        <div className="w-2 h-2 bg-orange-400/60 rounded-full ml-3" />
                    </div>
                </div>
            </div>

           
        </div>
    );
};

export default CourseDisplayCard;