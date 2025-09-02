// Filename: ContactUs.tsx

import React, { FC, FormEvent, useMemo } from "react";

// Helper function to clamp a number between a min and max value
const clamp = (num: number, min: number, max: number): number =>
  Math.min(Math.max(num, min), max);

// Helper function to map a value from an input range to an output range (linear interpolation)
const interpolate = (
  value: number,
  input: [number, number],
  output: [number, number]
): number => {
  if (input[1] === input[0]) {
    return output[0];
  }
  return (
    output[0] +
    ((value - input[0]) / (input[1] - input[0])) * (output[1] - output[0])
  );
};

interface ContactUsSectionProps {
  progress: number;
}

const ContactUsSection: FC<ContactUsSectionProps> = ({ progress }) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log("Form submitted:", data);
    alert("Thank you for your message! We will get back to you soon.");
    e.currentTarget.reset();
  };

  // --- ADJUSTED ANIMATION TIMELINE ---
  // We've increased the "hold" period for a more significant delay.

  // Phase 1: Text Appears (0% -> 25% of scroll)
  const TEXT_APPEAR_END = 0.25;

  // Phase 2: HOLD. A much longer pause. (25% -> 60% of scroll)
  const FORM_APPEAR_START = 0.60;

  // Phase 3: Form Appears (60% -> 85% of scroll)
  const FORM_APPEAR_END = 0.85;

  // Phase 4: Both elements split apart (85% -> 100% of scroll)
  const SPLIT_START = 0.85;
  const SPLIT_END = 1.0;

  const { textStyle, formStyle } = useMemo(() => {
    // --- Calculate progress for each phase ---
    const textAppearProgress = clamp(progress / TEXT_APPEAR_END, 0, 1);

    const formAppearProgress = clamp(
      (progress - FORM_APPEAR_START) / (FORM_APPEAR_END - FORM_APPEAR_START),
      0,
      1
    );

    const splitProgress = clamp(
      (progress - SPLIT_START) / (SPLIT_END - SPLIT_START),
      0,
      1
    );

    // --- Calculate Final Styles ---

    // ** FIX for CENTERING **
    // Instead of moving to 0vh (the exact center), we move to -15vh.
    // This pulls the entire block up, making it appear visually centered.
    const finalCenterYOffset = -5; // in vh units

    // TEXT Block Styles
    const textOpacity = textAppearProgress;
    const textTranslateY = interpolate(textAppearProgress, [0, 1], [30, finalCenterYOffset]);
    const textScale = interpolate(textAppearProgress, [0, 1], [0.8, 1]);
    const textTranslateX = interpolate(splitProgress, [0, 1], [0, -25]);

    const textStyle: React.CSSProperties = {
      opacity: textOpacity,
      transform: `translate(calc(-50% + ${textTranslateX}vw), calc(-50% + ${textTranslateY}vh)) scale(${textScale})`,
      willChange: 'transform, opacity',
    };

    // FORM Block Styles
    const formOpacity = formAppearProgress;
    const formTranslateY = interpolate(formAppearProgress, [0, 1], [30, finalCenterYOffset]);
    const formScale = interpolate(formAppearProgress, [0, 1], [0.8, 1]);
    const formTranslateX = interpolate(splitProgress, [0, 1], [0, 25]);

    const formStyle: React.CSSProperties = {
      opacity: formOpacity,
      transform: `translate(calc(-50% + ${formTranslateX}vw), calc(-50% + ${formTranslateY}vh)) scale(${formScale})`,
      willChange: 'transform, opacity',
    };

    return { textStyle, formStyle };
  }, [progress]);

  return (
    <div className="relative flex items-center justify-center h-screen px-4 sm:px-6 lg:px-8 text-white">
      {/* Text Block - Absolutely Positioned for Animation */}
      <div
        style={textStyle}
        className="absolute top-1/2 left-1/2 w-full max-w-lg flex flex-col gap-4 text-center md:text-left"
      >
        <h1 className="font-bold text-6xl">Contact Us</h1>
        <p className="text-center md:text-left text-lg">
          Have questions about our courses or need more information? Fill out
          the form below and our team will get back to you shortly.
        </p>
      </div>

      {/* Form Block - Absolutely Positioned for Animation */}
      <div
        style={formStyle}
        className="absolute bg-black top-1/2 left-1/2 w-full max-w-xl"
      >
        {/* Restored original styling for glass effect */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-transparent border w-full border-white/20 rounded-2xl p-8 backdrop-blur-sm"
        >
          {/* Form content remains exactly the same */}
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-6 sm:space-y-0">
            <div className="w-full">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                autoComplete="name"
                required
                placeholder="John Doe"
                className="block w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white/50 transition-shadow duration-300"
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                required
                placeholder="you@example.com"
                className="block w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white/50 transition-shadow duration-300"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Phone Number (Optional)
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              autoComplete="tel"
              placeholder="+1 (555) 123-4567"
              className="block w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white/50 transition-shadow duration-300"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Your Message
            </label>
            <textarea
              name="message"
              id="message"
              rows={4}
              required
              placeholder="How can we help you achieve your goals?"
              className="block w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white/50 transition-shadow duration-300 resize-none"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-black bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white transition-colors duration-300"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUsSection;