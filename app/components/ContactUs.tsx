"use client";
import React, { FC, FormEvent, useMemo, useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";

const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(typeof window !== "undefined" && window.innerWidth < breakpoint);
    };
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, [breakpoint]);
  return isMobile;
};

const clamp = (num: number, min: number, max: number): number =>
  Math.min(Math.max(num, min), max);

const interpolate = (
  value: number,
  input: [number, number],
  output: [number, number]
): number => {
  if (input[1] === input[0]) return output[0];
  return output[0] + ((value - input[0]) / (input[1] - input[0])) * (output[1] - output[0]);
};

interface ContactUsSectionProps {
  progress: number;
}

const ContactUsSection: FC<ContactUsSectionProps> = ({ progress }) => {
  const isMobile = useIsMobile();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log("Form submitted:", data);
    alert("Thank you for your message! We will get back to you soon.");
    e.currentTarget.reset();
  };

  const { textStyle, formStyle } = useMemo(() => {
    const TEXT_APPEAR_END = 0.25;
    const FORM_APPEAR_START = 0.60;
    const FORM_APPEAR_END = 0.85;
    const SPLIT_START = 0.85;
    const SPLIT_END = 1.0;
    
    const textAppearProgress = clamp(progress / TEXT_APPEAR_END, 0, 1);
    const formAppearProgress = clamp((progress - FORM_APPEAR_START) / (FORM_APPEAR_END - FORM_APPEAR_START), 0, 1);
    const splitProgress = clamp((progress - SPLIT_START) / (SPLIT_END - SPLIT_START), 0, 1);
    const finalCenterYOffset = -5;
    const textOpacity = textAppearProgress;
    const textTranslateY = interpolate(textAppearProgress, [0, 1], [30, finalCenterYOffset]);
    const textScale = interpolate(textAppearProgress, [0, 1], [0.8, 1]);
    const textTranslateX = interpolate(splitProgress, [0, 1], [0, -25]);
    const textStyle: React.CSSProperties = {
      opacity: textOpacity,
      transform: `translate(calc(-50% + ${textTranslateX}vw), calc(-50% + ${textTranslateY}vh)) scale(${textScale})`,
      willChange: 'transform, opacity',
    };
    const formOpacity = textAppearProgress;
    const formTranslateY = interpolate(formAppearProgress, [0, 1], [100, finalCenterYOffset]);
    const formTranslateX = interpolate(splitProgress, [0, 1], [0, 25]);
    const formScale = interpolate(formAppearProgress, [0, 1], [1.0, 0.7]);
    const formStyle: React.CSSProperties = {
      opacity: formOpacity,
      transform: `translate(calc(-50% + ${formTranslateX}vw), calc(-50% + ${formTranslateY}vh)) scale(${formScale})`,
      willChange: 'transform, opacity',
    };
    return { textStyle, formStyle };
  }, [progress]);


  if (isMobile) {
    const sectionVariants: Variants = {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
    };

    const itemVariants: Variants = {
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };

    return (
      <motion.div 
        className="flex flex-col items-center justify-center mt-1 lg:mt-0 min-h-screen w-full px-4 py-16 text-white"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div
          variants={itemVariants} 
          className="w-full max-w-lg flex flex-col gap-2 text-center mb-8"
        >
          <h1 className="font-bold mt-8 text-4xl">Contact Us</h1>
          <p className="text-sm text-gray-300">
            Have questions about our courses or need more information? Fill out
            the form and our team will get back to you shortly.
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="w-full max-w-lg bg-black/40 border-white/20 border rounded-2xl p-6 backdrop-blur-sm relative overflow-hidden"
        >
       
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col space-y-6">
              <div className="w-full">
                <label htmlFor="name-mobile" className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                <input type="text" name="name" id="name-mobile" required placeholder="John Doe" className="block w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white/50"/>
              </div>
              <div className="w-full">
                <label htmlFor="email-mobile" className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                <input type="email" name="email" id="email-mobile" required placeholder="you@example.com" className="block w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white/50"/>
              </div>
            </div>
            <div>
              <label htmlFor="phone-mobile" className="block text-sm font-medium text-gray-300 mb-2">Phone Number (Optional)</label>
              <input type="tel" name="phone" id="phone-mobile" placeholder="+1 (555) 123-4567" className="block w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white/50"/>
            </div>
            <div>
              <label htmlFor="message-mobile" className="block text-sm font-medium text-gray-300 mb-2">Your Message</label>
              <textarea name="message" id="message-mobile" rows={3} required placeholder="How can we help you?" className="block w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white/50 resize-none"/>
            </div>
            <div>
              <button type="submit" className="w-full cursor-pointer flex justify-center py-3 px-4 border border-transparent rounded-lg text-base font-medium text-black bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white transition-colors duration-300">
                Send Message
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    );
  }

  
  return (
    <div className="relative flex items-center justify-center h-screen px-4 sm:px-6 lg:px-8 text-white">
      <div style={textStyle} className="absolute top-1/2 left-1/2  w-full max-w-lg flex flex-col gap-4 text-center md:text-left">
        <h1 className="font-bold text-6xl">Contact Us</h1>
        <p className="text-center md:text-left text-lg">
          Have questions about our courses or need more information? Fill out
          the form below and our team will get back to you shortly.
        </p>
      </div>
     
      <div style={formStyle} className="absolute top-1/2 left-1/2 w-full max-w-4xl bg-black/40 border border-white rounded-2xl p-8 backdrop-blur-sm   overflow-hidden">
       
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-6 sm:space-y-0">
            <div className="w-full">
              <label htmlFor="name-desktop" className="block text-xl font-medium text-gray-300 mb-2">Full Name</label>
              <input type="text" name="name" id="name-desktop" autoComplete="name" required placeholder="John Doe" className="block w-full px-4 py-3 backdrop-blur-sm text-xl rounded-lg bg-transparent border border-white placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white/50 transition-shadow duration-300"/>
            </div>
            <div className="w-full">
              <label htmlFor="email-desktop" className="block text-xl font-medium text-gray-300 mb-2">Email Address</label>
              <input type="email" name="email" id="email-desktop" autoComplete="email" required placeholder="you@example.com" className="block w-full px-4 py-3 text-xl rounded-lg bg-transparent border border-white placeholder-gray-500 text-white backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white/50 transition-shadow duration-300"/>
            </div>
          </div>
          <div>
            <label htmlFor="phone-desktop" className="block text-xl font-medium text-gray-300 mb-2">Phone Number (Optional)</label>
            <input type="tel" name="phone" id="phone-desktop" autoComplete="tel" placeholder="+1 (555) 123-4567" className="block w-full px-4 py-3 backdrop-blur-sm text-xl rounded-lg bg-transparent border border-white placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white/50 transition-shadow duration-300"/>
          </div>
          <div>
            <label htmlFor="message-desktop" className="block text-xl font-medium text-gray-300 mb-2">Your Message</label>
            <textarea name="message" id="message-desktop" rows={5} required placeholder="How can we help you achieve your goals?" className="block w-full px-4 py-3 text-xl rounded-lg bg-transparent border border-white placeholder-gray-500 text-white backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white/50 transition-shadow duration-300 resize-none"/>
          </div>
          <div>
            <button type="submit" className="w-full cursor-pointer flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm  font-medium text-xl text-black bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white transition-colors duration-300">
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUsSection;