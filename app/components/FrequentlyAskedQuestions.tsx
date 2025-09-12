import { FAQType } from '../constants/faqsData';
import AccordionItem from './Framer/AccordianItem';

export default function FrequentlyAskedQuestionsSection({ faqs }: { faqs: FAQType[] }) {
  if (!faqs || faqs.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-5xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-6 items-center justify-center text-center mb-16">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 backdrop-blur-sm">
          <span className="text-orange-400 text-sm font-medium">FAQ</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent leading-tight">
          Frequently Asked
          <br />
          <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
            Questions
          </span>
        </h1>
        
        <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
          Everything you need to know about our internship program. 
          Can't find the answer you're looking for? 
          <span className="text-orange-400 hover:text-orange-300 cursor-pointer transition-colors">
            {" "}Reach out to our team.
          </span>
        </p>
      </div>

      <div className="grid gap-4 md:gap-6">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} faq={faq} index={index} />
        ))}
      </div>

      <div className="mt-20">
        <div className="max-w-5xl mx-auto p-8 rounded-2xl backdrop-blur-xs border border-gray-700/50 ">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-white mb-2">
              Still have questions?
            </h3>
            <p className="text-gray-400">
              Our team is here to help you get started on your internship journey.
            </p>
          </div>

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 bg-black border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className="w-full px-4 py-3 bg-black border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 bg-black border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300"
                placeholder="Enter your email address"
              />
            </div>

            <div>
              <label htmlFor="question" className="block text-sm font-medium text-gray-300 mb-2">
                Your Question *
              </label>
              <textarea
                id="question"
                name="question"
                required
                rows={4}
                className="w-full px-4 py-3 bg-black border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300 resize-none"
                placeholder="Please describe your question or concern..."
              />
            </div>

            <div className="pt-4 flex items-center justify-center">
              <button
                type="submit"
                className="w-fit px-8 py-2 bg-white text-black cursor-pointer font-semibold rounded-xl hover:from-orange-600 hover:to-red-600 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-orange-500/25 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                Send Message
              </button>
            </div>
          </form>

          <p className="text-xs text-gray-500 text-center mt-6">
            We respect your privacy. Your information will only be used to respond to your inquiry.
          </p>
        </div>
      </div>
    </div>
  );
}