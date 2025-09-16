import React from 'react';
import Image from 'next/image'; // Import the Next.js Image component

const certificateData = [
    {
        imgSrc: '/coursecompletion.png',
        title: 'Course Completion Certificate',
        description: 'Awarded upon successful completion of the course curriculum.'
    },
    {
        imgSrc: '/internshipcomp.png',
        title: 'Internship Certificate',
        description: 'Awarded after gaining practical work experience by successful completion of the capstone projects.'
    },
    {
        imgSrc: '/performancecertificate.png',
        title: 'Outstanding Performance Certificate',
        description: 'Awarded to recognize exceptional performance and contributions during the program.'
    },
];

export default function CertificationSection() {
    return (
        <div className="min-h-screen text-white flex flex-col items-center justify-center py-20 px-4">
            
            <div className="text-center mb-16">
                 <div className="inline-flex mb-4 items-center px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 backdrop-blur-sm">
                    <span className="text-orange-400 text-sm font-medium">Certificates</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold">
                    CERTIFICATIONS
                </h1>
                <p className="max-w-3xl mt-4 mx-auto text-md md:text-lg bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                    On completion of a program each participant gets a course completion, internship and outstanding performance certificates.
                </p>
            </div>

            {/* Responsive Grid Container */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 w-full max-w-7xl px-4 sm:px-6 lg:px-12">
                {certificateData.map((cert, index) => (
                    <div key={index} className="w-full max-w-md mx-auto"> {/* Centered card on mobile */}
                        <div className="group relative cursor-pointer overflow-hidden rounded-xl border-4 border-white shadow-lg transition-transform duration-300 ease-in-out hover:scale-105">
                            {/* Using Next.js Image component for optimization */}
                            <Image
                                src={cert.imgSrc}
                                alt={cert.title}
                                width={1275} // Original image width
                                height={1755} // Original image height
                                layout="responsive" // Makes the image scale with its container
                                className="object-contain rounded-lg"
                            />
                            <div className="absolute inset-0 flex flex-col backdrop-blur-sm bg-white/80 items-center justify-center text-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <h3 className="text-black text-xl md:text-2xl font-semibold">
                                    {cert.title}
                                </h3>
                                <p className='text-sm text-black max-w-xs mt-2'>{cert.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}