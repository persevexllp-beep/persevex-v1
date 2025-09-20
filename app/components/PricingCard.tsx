"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { CheckCircle2, Zap } from "lucide-react";

// You can pass this data as props, but for a single card, it's fine here.
const planData = {
  planName: "Platinum",
  price: 35000,
  features: [
    "Course Duration : 6 months",
    "Live classes : 80 Hours",
    "Video Content : 100 Hours",
    "3 Major + 2 Minor Projects",
    "Program Completion Certificate",
    "Co-branded internship Certificate*",
    "100% Job Guarantee (T&C Applied)",
  ],
  paymentLink: "#", // Replace with your actual Razorpay link
};

// Animation variant for the card
const cardVariant: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1], // A nice quint easing
    },
  },
};

export default function PricingCard() {
  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <motion.div
        className="relative w-full max-w-sm rounded-3xl bg-gray-900 border border-orange-500/30 shadow-2xl shadow-orange-900/40"
        variants={cardVariant}
        initial="hidden"
        animate="visible"
      >
        {/* === Planet Decoration === */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 pointer-events-none">
          {/* Orbits */}
          <div className="absolute inset-0 border-2 border-orange-500/20 rounded-full scale-100" />
          <div className="absolute inset-0 border border-orange-500/20 rounded-full scale-75" />
          <div className="absolute inset-0 border border-orange-500/20 rounded-full scale-50" />
          
          {/* Sun/Main Planet */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-br from-orange-400 to-red-600 rounded-full filter blur-md" />
          
          {/* Smaller Planets */}
          <div className="absolute top-[10%] left-[20%] w-6 h-6 bg-gradient-to-br from-indigo-400 to-blue-700 rounded-full" />
          <div className="absolute top-[25%] right-[5%] w-8 h-8 bg-gradient-to-br from-slate-300 to-slate-600 rounded-full" />
          <div className="absolute bottom-[15%] left-[5%] w-7 h-7 bg-gradient-to-br from-red-400 to-orange-700 rounded-full" />
          <div className="absolute bottom-[5%] right-[25%] w-5 h-5 bg-gradient-to-br from-teal-300 to-cyan-600 rounded-full" />
        </div>

        {/* === Card Content === */}
        <div className="relative flex flex-col pt-24 p-8 text-white">
          <h2 className="text-center font-bold text-orange-400 tracking-widest uppercase">
            {planData.planName}
          </h2>
          <p className="text-center text-5xl sm:text-6xl font-extrabold text-white mt-2">
            ₹{planData.price.toLocaleString("en-IN")}
          </p>

          <ul className="mt-8 space-y-4">
            {planData.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle2
                  className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0"
                  aria-hidden="true"
                />
                <span className="text-gray-300">{feature}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <a
              href={planData.paymentLink}
              className="group flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-900/40 transition-all duration-300 hover:bg-blue-700 hover:scale-105"
            >
              <Zap size={18} />
              Select Plan
            </a>
            <p className="mt-2 text-center text-xs text-gray-500">
              Secured by Razorpay
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}