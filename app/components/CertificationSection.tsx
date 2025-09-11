import React from 'react';

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
        <div className="min-h-screen  text-white flex flex-col items-center justify-center py-20 px-4">
            
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold">
                    CERTIFICATIONS
                </h1>
                <p className="max-w-3xl mt-4 mx-auto text-md md:text-lg text-gray-300">
                    On completion of a program each participant gets a course completion, internship and outstanding performance certificates.
                </p>
            </div>

            <div className="grid grid-cols-3 px-12 justify-center items-center gap-10 w-full mx-auto">
                {certificateData.map((cert, index) => (
                    <div key={index} className="w-full max-w-lg">
                        <div className="group relative cursor-pointer overflow-hidden rounded-xl border-4 border-white shadow-lg transition-transform duration-300 ease-in-out hover:scale-105">
                            <img
                                src={cert.imgSrc}
                                alt={cert.title}
                                className="w-full h-auto object-contain rounded-lg"
                            />
                            <div className="absolute inset-0 flex flex-col backdrop-blur-sm bg-white/80 items-center justify-center text-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <h3 className="text-black text-2xl font-semibold">
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