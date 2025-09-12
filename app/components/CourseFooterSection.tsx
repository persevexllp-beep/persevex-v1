import Image from "next/image";
import React from "react";

interface FooterLinkColumn {
  title: string;
  links: string[];
}

export default function CourseFooterSection({ links }: { links: FooterLinkColumn[] }) {
  return (
    <footer className="relative mt-24 text-white overflow-hidden flex items-center justify-center py-20 md:py-12">
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8">
          <div className="flex items-start gap-6 w-full">
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
            
            <div className="flex flex-col justify-center min-h-[4rem] md:min-h-[5rem]">
              <h2 className="text-3xl md:text-4xl font-serif text-gray-200 leading-tight">
                Persevex
              </h2>
              <p className="mt-2 text-gray-400 leading-relaxed">
                Empowering careers through practical education.
              </p>
            </div>
          </div>

          <div className="md:col-span-1 grid grid-cols-2 sm:grid-cols-3 gap-8 md:gap-12 mt-12 md:mt-0 md:ml-auto text-center sm:text-left">
            {links.map((column) => (
              <div key={column.title}>
                <h3 className="font-bold text-white mb-4 text-lg">
                  {column.title}
                </h3>
                <ul className="space-y-3">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 ease-out text-sm inline-block"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex mt-16 flex-col">
          <div className="h-px bg-gray-700 rounded"></div>
          <div className="flex flex-col sm:flex-row justify-between items-center mx-auto sm:mx-0 w-full gap-4 mt-8">
            <p className="text-sm text-gray-400">© 2025 Persevex. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 ease-out inline-block">Facebook</a>
              <a href="#" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 ease-out inline-block">LinkedIn</a>
              <a href="#" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 ease-out inline-block">Instagram</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}