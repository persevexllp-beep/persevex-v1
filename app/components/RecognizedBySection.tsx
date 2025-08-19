// RecognizedBySection.tsx
"use client";

import Image from "next/image";

// Replace these with your actual partner logo paths
const logos = [
  { src: "/r1.jpg", alt: "Partner 1" },
  { src: "/r2.png", alt: "Partner 2" },
  { src: "/r3.jpeg", alt: "Partner 3" },
  { src: "/r4.png", alt: "Partner 4" },
  { src: "/r5.jpg", alt: "Partner 5" }, // Corrected alt text from Partner 6 to 5
];

const RecognizedBySection = ({ progress }: { progress: number }) => {
  // We want to translate the logo strip. The strip is 200% wide.
  // To move it by one full screen width (the width of the first set of logos),
  // we need to translate it by 50% of its own total width.
  // So, progress=0 -> translateX=0%, progress=1 -> translateX=-50%
  const translateX = progress * 50;

  return (
    <div className="relative h-full w-full flex flex-col justify-center items-center overflow-hidden text-white px-4">
      <div className="text-center mb-16 md:mb-24">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          Recognized By
        </h2>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
          We collaborate with leading organizations to provide you with the best
          learning experience.
        </p>
      </div>

      <div className="w-full">
        {/* The 'track' that moves horizontally */}
        <div
          style={{ transform: `translateX(-${translateX}%)` }}
          // THIS IS THE FIX: Set width to 200% to hold both sets of logos side-by-side.
          className="flex items-center w-[200%] gap-x-24 will-change-transform"
        >
          {/* We render the logos twice to create the seamless loop */}
          {[...logos, ...logos].map((logo, index) => (
            <div key={index} className="flex-shrink-0">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={160}
                height={80}
                className="object-contain h-16 md:h-20 w-auto filter grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecognizedBySection;