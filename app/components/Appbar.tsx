// components/Appbar.tsx (or Navbar.tsx)

"use client"; // Add this directive because we're using a hook (useScroll)

import Link from 'next/link';
import { useScroll } from '../contexts/scrollContext';

// Define SectionKey type to match your section keys
type SectionKey = "courses" | "ourEdge" | "partners" | "testimonials" | "aboutUs";

export default function Navbar() {
  // 2. Get the scroll function from our context
  const { scrollToSection } = useScroll();

  // 3. Update the buttons array to include a 'key' for each section
  const buttons: { name: string; key: SectionKey; link?: undefined }[] = [
    { name: "Courses", key: "courses" },
    { name: "Our Edge", key: "ourEdge" }, // Added this to match a section
    { name: "Partners", key: "partners" },
    { name: "Testimonials", key: "testimonials" }, // Added this to match a section
    { name: "About Us", key: "aboutUs" },
  ];

  // Note: I've added 'Our Edge' and 'Testimonials' as examples.
  // You can decide which sections you want in your navbar.

  return (
    <header className="sticky top-0 left-0 right-0 z-50 h-16 bg-transparent flex items-center justify-between p-6 md:p-8 text-white">
      <Link href="/" className="text-2xl md:text-3xl font-bold tracking-wider">
        PERSEVEX
      </Link>
      <nav className="hidden md:flex items-center gap-8 lg:gap-12">
        {buttons.map((button) => (
          // 4. Change Link to a button and add an onClick handler
          <button
            key={button.name}
            onClick={() => scrollToSection(button.key)}
            className="text-base font-medium hover:text-gray-300 transition-colors duration-300 cursor-pointer"
          >
            {button.name}
          </button>
        ))}
      </nav>
    </header>
  );
}