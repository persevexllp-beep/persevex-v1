import Image from 'next/image';
import React from 'react';

const footerLinks = [
  {
    title: 'Quick Links',
    links: ['Certificate Verification', 'Pre-registration', 'LMS', 'Careers', 'Blogs'],
  },
  {
    title: 'Contact Info',
    links: ['support@persevex.com', 'Bengaluru, India'],
  },
  {
    title: 'Career',
    links: ['Our commitments', 'Job openings', 'Contact us'],
  },
];

export default function FooterSection() {
  return (
    <footer className="relative h-auto md:min-h-screen mt-24 lg:mt-0 text-white overflow-hidden flex items-center justify-center py-20 md:py-24">
  
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8">
          
          <div className="flex flex-col items-start gap-4 w-full">
            <div className='flex gap-6 items-center'>
              <div className="flex-shrink-0">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-xl p-2 shadow-lg flex items-center justify-center">
                  <Image 
                    className="w-full h-full object-contain" 
                    src='/whitelogo.png' 
                    alt="Persevex logo" 
                    height={80} 
                    width={80} 
                  />
                </div>
              </div>
              
              <div className="flex flex-col justify-center">
                <h2 className="text-3xl md:text-4xl font-serif text-white leading-tight">
                  Persevex
                </h2>
                <p className="mt-1 text-white leading-relaxed">
                  Empowering careers through practical education.
                </p>
              </div>
            </div>
            <div className='pr-8'>
              <p className="text-gray-300">Elevate your career with our cutting-edge courses in financial modeling, digital marketing strategies, human resource management, data science, artificial intelligence and machine learning.</p>
            </div>
          </div>

          <div className="md:col-span-1 grid grid-cols-2 sm:grid-cols-3 gap-8 mt-12 md:mt-0 md:ml-auto text-center sm:text-left">
            {footerLinks.map((column) => (
              <div key={column.title}>
                <h3 className="font-bold text-white mb-4 text-lg">{column.title}</h3>
                <ul className="space-y-3">
                  {column.links.map((link) => (
                    <li key={link}>
                      {link.includes('@') ? (
                        <a
                          href={`mailto:${link}`}
                          className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 ease-out text-sm inline-block"
                        >
                          {link}
                        </a>
                      ) : (
                        <a
                          href="#"
                          className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 ease-out text-sm inline-block"
                        >
                          {link}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}