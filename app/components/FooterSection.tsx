import { Facebook } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { FiMail, FiMapPin, FiInstagram, FiTwitter, FiLinkedin } from 'react-icons/fi';

type FooterLink = {
  text: string;
  href: string;
  icon?: React.ReactNode;
};

type FooterColumn = {
  title: string;
  links: FooterLink[];
};

type SocialLink = {
  name: string;
  href: string;
  icon: React.ReactNode;
};

const footerLinkColumns: FooterColumn[] = [
  {
    title: 'Quick Links',
    links: [
      { text: 'Certificate Verification', href: '#' },
      { text: 'Pre-registration', href: 'https://forms.gle/s9nYdQAtr5Qs1YfB6' },
      { text: 'LMS', href: '#' },
      { text: 'Blogs', href: '#' },
    ],
  },
  {
    title: 'Our Courses',
    links: [
      { text: 'Management', href: '#' },
      { text: 'Technical', href: '#' },
      { text: 'Electronics', href: '#' },
      { text: 'Mechanical', href: '#' },
      { text: 'Civil', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { text: 'About Us', href: '#' },
      { text: 'Careers', href: '#' },
      { text: 'Contact Us', href: '#' },
    ],
  },
  {
    title: 'Get in Touch',
    links: [
      { text: 'support@persevex.com', href: 'mailto:support@persevex.com', icon: <FiMail /> },
      { text: 'Bengaluru, India', href: '#', icon: <FiMapPin /> },
    ],
  },
];

const socialLinks: SocialLink[] = [
    { name: 'Instagram', href: 'https://www.instagram.com/persevex_llp/', icon: <FiInstagram size={20} /> },
    { name: 'Twitter', href: 'https://www.facebook.com/profile.php?id=61574597387622#', icon: <Facebook size={20} /> },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/company/persevex/posts/?feedView=all', icon: <FiLinkedin size={20} /> },
];

export default function FooterSection() {
  return (
    <footer className="relative md:min-h-screen top- flex items-center justify-center text-white overflow-hidden py-8 md:py-20">
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1">
            <div className='flex items-center gap-4 mb-4'>
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-white rounded-xl p-2 shadow-xl flex items-center justify-center">
                  <Image 
                    className="w-full h-full object-contain" 
                    src='/whitelogo.png' 
                    alt="Persevex logo" 
                    height={80} 
                    width={80} 
                  />
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-serif text-white">Persevex</h2>
                <p className="text-gray-100">Empowering careers.</p>
              </div>
            </div>
            <p className="text-gray-200 max-w-sm">
              Elevate your career with our cutting-edge courses in financial modeling, digital marketing, data science, and more.
            </p>
          </div>

          <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-8">
            {footerLinkColumns.map((column) => (
              <div key={column.title}>
                <h3 className="font-bold text-sm uppercase tracking-wider text-[#F9C47D] mb-5">{column.title}</h3>
                <ul className="space-y-3">
                  {column.links.map((link) => (
                    <li key={link.text}>
                      <a
                      target='_blank'
                        href={link.href}
                        className="text-gray-300  hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                      >
                        {link.icon && <span className="group-hover:text-[#F9C47D] transition-colors">{link.icon}</span>}
                        <span className="group-hover:translate-x-1 transition-transform duration-300 ease-out inline-block">
                          {link.text}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-200">
            &copy; {new Date().getFullYear()} Persevex. All Rights Reserved.
          </p>
          <div className="flex items-center space-x-4">
            {socialLinks.map((social) => (
                <a target='_blank' key={social.name} href={social.href} aria-label={social.name} className="text-gray-200 hover:text-[#F9C47D] transition-colors duration-300">
                    {social.icon}
                </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}