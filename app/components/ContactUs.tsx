import React, { FC, FormEvent } from "react";

const ContactUsSection: FC = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log("Form submitted:", data);
    alert("Thank you for your message! We will get back to you soon.");
    e.currentTarget.reset();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen pt- pb-12 px-4 sm:px-6 lg:px-8 text-white">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="flex flex-col gap-4 text-center h-full items-center  md:text-left">
            <h1 className="font-bold text-6xl">Contact Us</h1>
            <p className="text-center text-lg w-3/4">Have questions about our courses or need more information? Fill out the form below and our team will get back to you shortly.</p>
           
          </div>

          {/* Right Side: Form */}
          <div className=" mb-20  ">
            <form
              onSubmit={handleSubmit}
              className="space-y-6 bg-transparent border w-4/5 lg:ml-24  max-w-2xl border-white/20 rounded-2xl p-8 backdrop-blur-sm"
            >
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
      </div>
    </div>
  );
};

export default ContactUsSection;