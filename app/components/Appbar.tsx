import Link from 'next/link';

export default function Navbar() {
  const buttons = [
    { name: "Courses", link: "/courses" },
    { name: "Internships", link: "/internships" },
    { name: "LMS", link: "/lms" },
    { name: "Features", link: "/features" },
    { name: "About Us", link: "/about-us" },
  ];

  return (
    <header className="sticky  top-0 left-0 right-0 z-50 h-16 bg-transparent flex items-center justify-between p-6 md:p-8 text-white">
      <Link href="/" className="text-2xl md:text-3xl font-bold tracking-wider">
        PERSEVEX
      </Link>
      <nav className="hidden md:flex items-center gap-8 lg:gap-12">
        {buttons.map((button) => (
          <Link
            key={button.name}
            href={button.link}
            className="text-base font-medium hover:text-gray-300 transition-colors duration-300"
          >
            {button.name}
          </Link>
        ))}
      </nav>
    </header>
  );
}