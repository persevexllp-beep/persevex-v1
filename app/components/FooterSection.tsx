import React from 'react';

// Data for the footer links to keep the JSX clean
const footerLinks = [
  {
    title: 'Home',
    links: ['Key Metrics', 'Proven Distension', 'FAQs'],
  },
  {
    title: 'About Us.',
    links: ['Who we are', 'Founder ethos', 'Work life balance'],
  },
  {
    title: 'Career',
    links: ['Our commitments', 'Job openings', 'Contact us'],
  },
];

export default function FooterSection() {
  return (
    <footer className="relative min-h-screen  text-white overflow-hidden flex items-center justify-center">
      {/* Background Gradient */}
     

      {/* Giant "PERSEVEX" text behind the content */}
     

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-8xl mx-auto px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          
          {/* Left Column: "Connect With Us" */}
          <div className="md:col-span-1 w-full">
            <h2 className="text-4xl ml-24 w-full  font-serif text-gray-200">
              Connect With Us.
            </h2>
          </div>

          {/* Right Columns: Links */}
          <div className="md:col-span-3  grid grid-cols-1 ml-64 sm:grid-cols-3 gap-8">
            {footerLinks.map((column) => (
              <div key={column.title}>
                <h3 className="font-bold text-white mb-4">{column.title}</h3>
                <ul className="space-y-3">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-gray-700 hover:text-white transition-colors duration-300"
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
      </div>
    </footer>
  );
}