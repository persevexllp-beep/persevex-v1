import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

interface Stat {
  number: number;
  suffix: string;
  label: string;
}

const statsData: Stat[] = [
  { number: 1500, suffix: '+', label: 'Students Enrolled' },
  { number: 8, suffix: '+', label: 'Expert-Led Courses' },
  { number: 98, suffix: '%', label: 'Satisfaction Rate' },
  { number: 10, suffix: '+', label: 'Global Presence' },
];

interface StatCardProps {
  number: number;
  suffix: string;
  label: string;
}

const StatCard: React.FC<StatCardProps> = ({ number, suffix, label }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <div ref={ref} className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl">
      <p className="text-5xl font-bold text-yellow-400">
        {inView ? <CountUp end={number} duration={2.5} /> : '0'}
        {suffix}
      </p>
      <p className="mt-3 text-lg text-gray-200">{label}</p>
    </div>
  );
};

export default function Stats() {
  return (
    <div className=" py-24   sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-4 text-center sm:grid-cols-2 lg:grid-cols-2">
          {statsData.map((stat) => (
            <StatCard
              key={stat.label}
              number={stat.number}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </div>
      </div>
    </div>
  );
}