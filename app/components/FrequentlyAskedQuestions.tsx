// app/components/FrequentlyAskedQuestions.tsx
import { FAQType } from '../constants/faqsData';
import AccordionItem from './Framer/AccordianItem';

export default function FrequentlyAskedQuestionsSection({ faqs }: { faqs: FAQType[] }) {
  if (!faqs || faqs.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-5xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
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

      {/* FAQ Grid */}
      <div className="grid gap-4 md:gap-6">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} faq={faq} index={index} />
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-20 text-center">
        <div className="inline-flex flex-col items-center gap-4 p-8 rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-gray-700/50 backdrop-blur-sm">
          <h3 className="text-2xl font-semibold text-white">
            Still have questions?
          </h3>
          <p className="text-gray-400 max-w-md">
            Our team is here to help you get started on your internship journey.
          </p>
          <button className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-full hover:from-orange-600 hover:to-red-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-orange-500/25">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}