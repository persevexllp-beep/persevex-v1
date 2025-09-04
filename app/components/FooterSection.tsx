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
    // Make height and padding responsive
    <footer className="relative h-auto md:min-h-screen mt-24 lg:mt-0 text-white overflow-hidden flex items-center justify-center py-20 md:py-24">
      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8">
        {/* Grid now stacks vertically on mobile by default */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          
          {/* Left Column: "Connect With Us" */}
          {/* Center text on mobile, left-align on desktop */}
          <div className="md:col-span-1 w-full text-center md:text-left">
            {/* Adjust text size and remove fixed margin for mobile */}
            <h2 className="text-3xl md:text-4xl md:ml-24 w-full font-serif text-gray-200">
              Connect With Us.
            </h2>
          </div>

          {/* Right Columns: Links */}
          {/* Add top margin on mobile, remove fixed margin for mobile */}
          {/* Use 2 columns on mobile, 3 on larger screens */}
          <div className="md:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-8 mt-12 md:mt-0 md:ml-64 text-center sm:text-left">
            {footerLinks.map((column) => (
              <div key={column.title}>
                <h3 className="font-bold text-white mb-4 text-lg">{column.title}</h3>
                <ul className="space-y-3">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-gray-300 hover:text-white transition-colors duration-300 text-sm"
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