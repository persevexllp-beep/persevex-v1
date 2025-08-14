// app/OurEdgeSection.tsx

"use client";

import { BrainCircuit, Zap, Users, Code, ShieldCheck, Rocket } from 'lucide-react';

const OurEdgeSection = () => {
  const edgeData = [
    {
      icon: <BrainCircuit size={48} className="text-cyan-400 mb-4" />,
      title: 'Expert-Led Curriculum',
      description: 'Our courses are designed and taught by industry veterans with years of real-world experience.',
    },
    {
      icon: <Zap size={48} className="text-cyan-400 mb-4" />,
      title: 'Hands-On Projects',
      description: 'Learn by doing. Build a portfolio of impressive projects that showcase your skills to employers.',
    },
    {
      icon: <Users size={48} className="text-cyan-400 mb-4" />,
      title: 'Community & Support',
      description: 'Join a thriving community of learners and mentors. Get help when you need it, 24/7.',
    },
    {
      icon: <Code size={48} className="text-cyan-400 mb-4" />,
      title: 'Cutting-Edge Tech',
      description: 'Stay ahead of the curve with courses on the latest technologies and industry best practices.',
    },
    {
      icon: <ShieldCheck size={48} className="text-cyan-400 mb-4" />,
      title: 'Career Focused',
      description: 'We focus on the skills that matter, providing career services to help you land your dream job.',
    },
    {
      icon: <Rocket size={48} className="text-cyan-400 mb-4" />,
      title: 'Flexible Learning',
      description: 'Learn at your own pace with lifetime access to course materials and a flexible schedule.',
    },
  ];

  return (
    <section className="container mx-auto px-4 py-24 text-white">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose Us?</h2>
        <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
          We're not just another learning platform. We provide a comprehensive ecosystem designed for your success.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {edgeData.map((item, index) => (
          <div key={index} className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-lg border border-gray-700 text-center flex flex-col items-center">
            {item.icon}
            <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>
            <p className="text-gray-300">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurEdgeSection;