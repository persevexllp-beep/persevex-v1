// src/components/AboutUs.tsx (Your new code)
"use client";
import React from "react";

const cardData = [
  {
    title: "Who We Are?",
    content: "We are a team of innovators, creators, and problem-solvers dedicated to pushing the boundaries of technology and design.",
  },
  {
    title: "Our Story",
    content: "Founded with a passion for excellence, our journey began with a simple idea: to build solutions that make a real difference.",
  },
  {
    title: "Our Mission",
    content: "To empower our clients by delivering intuitive, powerful, and elegant solutions that drive growth and inspire success.",
  },
];

const clamp = (num: number, min: number, max: number): number =>
  Math.min(Math.max(num, min), max);

const AboutUsSection = ({ progress }: { progress: number }) => {
  const contentOpacity = clamp((progress - 0.2) / 0.3, 0, 1);
  const animationProgress = clamp((progress - 0.5) / 0.5, 0, 1);

  const getCardStyle = (index: number): React.CSSProperties => {
    let transform = "";
    let zIndex = index;

    switch (index) {
      case 0: {
        const translateX = animationProgress * 105;
        const scale = 1 - animationProgress * 0.1;
        transform = `translateX(${translateX}%) scale(${scale})`;
        zIndex = 1;
        break;
      }
      case 1: {
        const scale = 1 - animationProgress * 0.05;
        transform = `scale(${scale})`;
        zIndex = 2;
        break;
      }
      case 2: {
        const translateX = animationProgress * -105;
        const scale = 1 + animationProgress * 0.05;
        transform = `translateX(${translateX}%) scale(${scale})`;
        zIndex = 3;
        break;
      }
      default:
        break;
    }
    return { transform, zIndex };
  };

  return (
    <div className="sticky top-0 h-screen w-full flex items-center justify-center">
      <div
        className="w-full max-w-5xl px-4 transition-opacity duration-1000"
        style={{ opacity: contentOpacity }}
      >
        <div className="relative flex flex-col md:flex-row gap-8 text-white">
          {cardData.map((card, index) => (
            <div
              key={index}
              className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-white/20 flex-1 text-center"
              style={getCardStyle(index)}
            >
              <h3 className="text-2xl font-bold mb-4">{card.title}</h3>
              <p className="text-gray-300">{card.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(AboutUsSection);