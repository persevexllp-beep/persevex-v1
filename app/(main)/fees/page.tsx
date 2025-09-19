"use client";
import React, { Suspense, ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import StarField from "@/app/components/StarField";
import {
  FiCheck,
  FiX,
  FiMonitor,
  FiUsers,
  FiGitBranch,
  FiAward,
} from "react-icons/fi";
import { motion } from "framer-motion";
import ExploreFooterSection from "@/app/components/ExploreFooterSection";

type PlanFeature = {
  text: string;
  included: boolean;
};

type PricingPlan = {
  title: string;
  price: string;
  color: "cyan" | "lime" | "orange";
  features: PlanFeature[];
  popular: boolean;
  paymentLink: string;
};

const pricingPlans: PricingPlan[] = [
  {
    title: "Self Paced",
    price: "5000",
    color: "cyan",
    paymentLink: "https://payments.cashfree.com/forms/PERSEVE_REGISTRATION",
    features: [
      { text: "Recorded Lectures", included: true },
      { text: "Real Time Projects", included: true },
      { text: "4+ Hrs of Live Sessions", included: true },
      { text: "One On One Doubt Sessions", included: true },
      { text: "Certifications", included: true },
      { text: "Mentor Support", included: false },
      { text: "Placement Guidance", included: false },
      { text: "Interview Assistance", included: false },
    ],
    popular: false,
  },
  {
    title: "Mentor Led",
    price: "9000",
    color: "lime",
    paymentLink: "https://payments.cashfree.com/forms/ADVANCE_REGS",
    features: [
      { text: "Recorded Lectures", included: true },
      { text: "Real Time Projects", included: true },
      { text: "16+ Hrs of Live Sessions", included: true },
      { text: "One On One Doubt Sessions", included: true },
      { text: "Certifications", included: true },
      { text: "Mentor Support", included: true },
      { text: "Placement Guidance", included: false },
      { text: "Interview Assistance", included: false },
    ],
    popular: true,
  },
  {
    title: "Advance",
    price: "13000",
    color: "orange",
    paymentLink: "https://payments.cashfree.com/forms/ADV_REGS",
    features: [
      { text: "Recorded Lectures", included: true },
      { text: "Real Time Projects", included: true },
      { text: "24+ Hrs of Live Sessions", included: true },
      { text: "One On One Doubt Sessions", included: true },
      { text: "Certifications", included: true },
      { text: "Mentor Support", included: true },
      { text: "Placement Guidance", included: true },
      { text: "Interview Assistance", included: true },
    ],
    popular: false,
  },
];

type PricingCardProps = {
  plan: PricingPlan;
  index: number;
};

function PricingCard({ plan, index }: PricingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      viewport={{ once: true, amount: 0.5 }}
      className={`relative flex flex-col h-full rounded-2xl bg-gray-900/50 border border-gray-700 backdrop-blur-sm overflow-hidden ${
        plan.popular ? "border-lime-400 shadow-lime-400/20 shadow-2xl" : ""
      }`}
    >
      {plan.popular && (
        <div className="absolute top-0 right-0 w-32 h-32">
          <div className="absolute transform rotate-45 bg-lime-500 text-center text-white font-semibold py-1 right-[-34px] top-[32px] w-[170px]">
            Most Popular
          </div>
        </div>
      )}
      <div className={`p-8 text-center relative overflow-hidden`}>
        <div
          className={`absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-[150%] rounded-full bg-gradient-radial from-${plan.color}-400/50 to-transparent opacity-40`}
        />
        <h3 className="text-xl font-bold uppercase tracking-wider">
          {plan.title}
        </h3>
        <p className="text-5xl font-bold mt-4">₹{plan.price}</p>
      </div>
      <div className="flex-grow p-8 text-left border-t border-gray-700">
        <ul className="space-y-4">
          {plan.features.map((feature, i) => (
            <li key={i} className="flex items-center gap-4">
              {feature.included ? (
                <FiCheck className="text-green-400 flex-shrink-0" size={20} />
              ) : (
                <FiX className="text-red-400 flex-shrink-0" size={20} />
              )}
              <span
                className={
                  !feature.included ? "text-gray-500" : "text-gray-300"
                }
              >
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-8 mt-auto">
        <a
          href={plan.paymentLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`block w-full text-center py-3 px-6 rounded-lg font-semibold text-white transition-all duration-300 ${
            plan.popular
              ? "bg-lime-500 hover:bg-lime-600 shadow-lg shadow-lime-500/20"
              : "bg-gray-700 hover:bg-gray-600"
          }`}
        >
          Select Plan
        </a>
      </div>
    </motion.div>
  );
}

type Feature = {
  icon: ReactNode;
  title: string;
  description: string;
};

const features: Feature[] = [
  {
    icon: <FiMonitor size={28} className="text-cyan-400" />,
    title: "Industry Relevant Curriculum",
    description:
      "Our courses are designed by industry experts to ensure you learn skills that are in demand.",
  },
  {
    icon: <FiUsers size={28} className="text-cyan-400" />,
    title: "Expert Mentors",
    description:
      "Learn from professionals with years of experience in their respective fields.",
  },
  {
    icon: <FiGitBranch size={28} className="text-cyan-400" />,
    title: "Hands-on Projects",
    description:
      "Apply your knowledge to real-world projects that enhance your portfolio.",
  },
  {
    icon: <FiAward size={28} className="text-cyan-400" />,
    title: "Recognized Certifications",
    description:
      "Earn certificates that are recognized by top companies in the industry.",
  },
];

function WhyChooseUsSection() {
  return (
    <section className="w-full py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.5 }}
          className="text-4xl md:text-5xl font-bold"
        >
          Why Choose Persevex?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true, amount: 0.5 }}
          className="text-lg text-gray-400 mt-4 max-w-2xl mx-auto"
        >
          We provide comprehensive learning solutions to help you succeed.
        </motion.p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true, amount: 0.3 }}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 flex flex-col items-center"
            >
              <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function FeesPage() {
  return (
    <main className="relative min-h-screen w-full text-white overflow-y-auto">
      <div className="fixed top-0 left-0 w-full h-full -z-10">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <color attach="background" args={["#000000"]} />
          <Suspense fallback={null}>
            <StarField hover={false} />
          </Suspense>
        </Canvas>
      </div>
      <div className="flex flex-col items-center justify-center w-full">
        <div className="min-h-screen flex flex-col items-center justify-center w-full px-4 sm:px-8 py-24">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-center mb-4"
          >
            Choose Your Plan
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-gray-400 text-center max-w-2xl mb-16"
          >
            We offer a range of flexible plans designed to fit your learning
            style and career goals.
          </motion.p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full max-w-6xl">
            {pricingPlans.map((plan, index) => (
              <PricingCard key={plan.title} plan={plan} index={index} />
            ))}
          </div>
        </div>
        <WhyChooseUsSection />
      </div>
      <div>
        <ExploreFooterSection />
      </div>
    </main>
  );
}