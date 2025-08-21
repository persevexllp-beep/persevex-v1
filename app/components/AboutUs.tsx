// AboutUs.tsx (UPDATED - Simplified)
"use client";

const AboutUsSection = ({ progress }: { progress: number }) => {
  // The animation now happens entirely in the parent.
  // This progress prop is used to fade in the content at the right time.
  const contentOpacity = progress > 0.5 ? 1 : 0;

  return (
    <div className="sticky top-0 h-screen w-full flex items-center justify-center">
      <div 
        className="text-center text-white max-w-3xl px-4 transition-opacity duration-1000"
        style={{ opacity: contentOpacity }}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Mission</h2>
        <p className="text-lg md:text-xl text-gray-300">
          This is where you can write about your company's story, values, and vision. The content will appear as the watermark animation concludes.
        </p>
      </div>
    </div>
  );
};

export default AboutUsSection;