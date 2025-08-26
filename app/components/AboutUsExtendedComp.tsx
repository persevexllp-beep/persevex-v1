import React from "react";

// Define the component's props
interface AboutUsExtendedCompProps {
  stackingProgress: number;
}

const cardData = [
  {
    title: "Who We Are?",
    content:
      "We are a team of innovators, creators, and problem-solvers dedicated to pushing the boundaries of technology and design.",
  },
  {
    title: "Our Story",
    content:
      "Founded with a passion for excellence, our journey began with a simple idea: to build solutions that make a real difference.",
  },
  {
    title: "Our Mission",
    content:
      "To empower our clients by delivering intuitive, powerful, and elegant solutions that drive growth and inspire success.",
  },
];

export default function AboutUsExtendedComp({
  stackingProgress,
}: AboutUsExtendedCompProps) {
 // src/components/AboutUsExtendedComp.tsx

  const getCardStyle = (index: number): React.CSSProperties => {
    let transform = "";
    let zIndex = 0;

    // Use an easing function for a smoother animation
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
    const easedProgress = easeOutCubic(stackingProgress);

    // --- THIS IS THE CORRECTED LOGIC ---

    const verticalStackOffset = 16; // 16px
    const gridGap = "1rem"; // This corresponds to the `gap-4` in your Tailwind class

    switch (index) {
      // Card 0 ("Who We Are?") - The bottom card
      case 0: {
        // Moves from its starting grid cell (left) into the center cell.
        // It needs to move its own width (100%) PLUS the grid gap.
        const translateX = `calc(${100 * easedProgress}% + ${gridGap} * ${easedProgress})`;
        const translateY = `${verticalStackOffset * 2 * easedProgress}px`;
        const scale = 1 - 0.1 * easedProgress;

        transform = `translateX(${translateX}) translateY(${translateY}) scale(${scale})`;
        zIndex = 10;
        break;
      }

      // Card 1 ("Our Story") - The middle card
      case 1: {
        // This card is already in the center, so it doesn't move horizontally.
        const translateX = `0px`;
        const translateY = `${verticalStackOffset * easedProgress}px`;
        const scale = 1 - 0.05 * easedProgress;

        transform = `translateX(${translateX}) translateY(${translateY}) scale(${scale})`;
        zIndex = 20;
        break;
      }

      // Card 2 ("Our Mission") - The top card
      case 2: {
        // Moves from its starting grid cell (right) into the center cell.
        // It needs to move its own width (-100%) MINUS the grid gap.
        const translateX = `calc(${-100 * easedProgress}% - ${gridGap} * ${easedProgress})`;
        const translateY = `0px`;
        const scale = 1;

        transform = `translateX(${translateX}) translateY(${translateY}) scale(${scale})`;
        zIndex = 30;
        break;
      }

      default:
        break;
    }

    return {
      transform,
      zIndex,
      position: "relative",
      transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
    };
  };

  return (
    <div className="flex flex-col items-center justify-center w-full gap-16 text-white">
      <div className="max-w-7xl lg:w-full mx-auto px-4 sm:px-6">
        {/* We use a grid to lay out the cards initially. The transform property
            will then animate them from their grid position into the central stack. */}
        <div className="grid gap-4 md:grid-cols-3">
          {cardData.map((card, index) => (
            <div
              key={index}
              className="bg-black/30 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-8 w-80 transform transition-transform duration-300 hover:scale-105"
              style={getCardStyle(index)}
            >
              <h3 className="text-xl font-semibold mb-4">{card.title}</h3>
              <p className="text-gray-300 leading-relaxed">{card.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}