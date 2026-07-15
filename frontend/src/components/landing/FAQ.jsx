import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

function FAQ() {
  const faqs = [
    {
      question: "Is CareerPilot completely free to use?",
      answer:
        "Yes. The current version of CareerPilot is free to use. Future premium AI features may be introduced, but core resume building will remain available.",
    },
    {
      question: "Can I download my resume as a PDF?",
      answer:
        "Absolutely. You can download your ATS-friendly resume in PDF format with a single click.",
    },
    {
      question: "Is my personal data secure?",
      answer:
        "Yes. We value your privacy and use secure authentication and best practices to protect your information.",
    },
    {
      question: "Are the resumes ATS-friendly?",
      answer:
        "Yes. CareerPilot is designed to generate resumes that follow ATS-friendly formatting used by recruiters.",
    },
    {
      question: "Can I edit my resume later?",
      answer:
        "Yes. After logging into your account, you can update your resume anytime.",
    },
    {
      question: "Will more AI features be added?",
      answer:
        "Yes. AI Resume Review, Cover Letter Generator, ATS Score, and Career Suggestions are part of our future roadmap.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-24 bg-slate-50"
        data-aos="fade-up"
        >
      <div className="max-w-5xl mx-auto px-6">

        <div className="text-center">

          <span className="inline-block bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold">
            FAQ
          </span>

          <h2 className="text-5xl font-bold mt-6 text-slate-800">
            Frequently Asked Questions
          </h2>

          <p className="mt-6 text-lg text-gray-600">
            Everything you need to know about CareerPilot.
          </p>

        </div>

        <div className="mt-16 space-y-4">

          {faqs.map((faq, index) => (

            <div
              key={index}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm"
            >

              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="w-full flex justify-between items-center px-6 py-5 text-left"
              >

                <span className="font-semibold text-lg">
                  {faq.question}
                </span>

                {openIndex === index ? (
                  <FaChevronUp />
                ) : (
                  <FaChevronDown />
                )}

              </button>

              {openIndex === index && (

                <div className="px-6 pb-5 text-gray-600 leading-7">
                  {faq.answer}
                </div>

              )}

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default FAQ;