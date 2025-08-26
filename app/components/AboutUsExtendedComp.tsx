import React from "react";

// Props interface remains the same
interface AboutUsExtendedCompProps {
  stackingProgress: number;
  cascadingProgress: number;
}

const cardData = [
  {
    title: "Who We Are?", // Back card
    content:
      "We are a team of innovators, creators, and problem-solvers dedicated to pushing the boundaries of technology and design.",
  },
  {
    title: "Our Story", // Middle card
    content:
      "Founded with a passion for excellence, our journey began with a simple idea: to build solutions that make a real difference.",
  },
  {
    title: "Our Mission", // Front card
    content:
      "To empower our clients by delivering intuitive, powerful, and elegant solutions that drive growth and inspire success.",
  },
];

export default function AboutUsExtendedComp({
  stackingProgress,
  cascadingProgress,
}: AboutUsExtendedCompProps) {
  const getCardStyle = (index: number): React.CSSProperties => {
    let transform = "";
    let zIndex = 0;

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
    const easedStackingProgress = easeOutCubic(stackingProgress);
    const unstackedProgress = 1 - easedStackingProgress;

    // --- NEW LOGIC FOR INTENSE REVEAL ---

    // Use a smaller value as a multiplier. For every unit of progress > 1,
    // the cards will move down by this amount.
    const cascadeUnitDistance = 200; // Increased distance for a more dramatic effect
    const verticalOffset = 16;

    // We only want to ease the initial part of the cascade (from 0 to 1).
    // After that, the movement should be linear to feel more responsive.
    const processedCascadingProgress =
      cascadingProgress <= 1
        ? easeOutCubic(cascadingProgress)
        : cascadingProgress;

    switch (index) {
      // Card 0 ("Who We Are?") - The back card remains anchored.
      case 0: {
        const translateX = `${-110 * unstackedProgress}%`;
        transform = `translateX(${translateX}) translateY(0px)`;
        zIndex = 10;
        break;
      }

      // Card 1 ("Our Story") - The middle card moves down.
      case 1: {
        const stackingY = verticalOffset * easedStackingProgress;
        
        // The middle card moves down based on the cascade progress.
        const cascadingY = cascadeUnitDistance * processedCascadingProgress;
        
        const finalTranslateY = stackingY + cascadingY;

        transform = `translateX(0%) translateY(${finalTranslateY}px)`;
        zIndex = 20;
        break;
      }

      // Card 2 ("Our Mission") - The front card moves down FASTER.
      case 2: {
        const translateX = `${110 * unstackedProgress}%`;
        const stackingY = verticalOffset * 2 * easedStackingProgress;
        
        // The front card moves down at 2x the rate of the middle card,
        // creating the fan-out effect that reveals the cards behind it.
        const cascadingY = cascadeUnitDistance * 2 * processedCascadingProgress;

        const finalTranslateY = stackingY + cascadingY;

        transform = `translateX(${translateX}) translateY(${finalTranslateY}px)`;
        zIndex = 30;
        break;
      }

      default:
        break;
    }

    return {
      transform,
      zIndex,
      position: "absolute",
      transition: "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
    };
  };

  return (
    <div className="flex flex-col items-center justify-center w-full gap-16 text-white">
      <div className="max-w-7xl lg:w-full mx-auto px-4 sm:px-6">
        <div className="relative flex items-center justify-center min-h-[24rem]">
          {cardData.map((card, index) => (
            <div
              key={index}
              className="bg-black/30 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-8 w-80"
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