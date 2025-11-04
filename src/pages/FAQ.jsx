import React, { useState } from "react";

const faqs = [
  {
    question: "How can I track my order?",
    answer:
      "After placing your order, you’ll receive a confirmation email with tracking details. You can also log into your account to check your order status anytime.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit and debit cards, PayPal, and secure wallet payments for your convenience.",
  },
  {
    question: "Can I return or exchange an item?",
    answer:
      "Yes! We offer a 14-day return policy for unused items in their original packaging. Visit our Returns page for full details.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Absolutely! We ship to over 100 countries. Shipping costs and delivery times vary by region.",
  },
  {
    question: "How do I contact customer support?",
    answer:
      "You can reach our support team via the Contact page or by emailing support@shopease.com — we typically respond within 24 hours.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="min-h-screen bg-white text-gray-800 px-6 md:px-20 py-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-10 text-center text-blue-600">
          Frequently Asked Questions
        </h1>

        {faqs.map((faq, index) => (
          <div
            key={index}
            className="mb-4 border-b border-gray-300 pb-4"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex justify-between items-center text-left focus:outline-none"
            >
              <span className="font-medium text-lg text-blue-700">
                {faq.question}
              </span>
              <span className="text-2xl text-blue-500">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>

            {openIndex === index && (
              <p className="mt-3 text-gray-600 transition-all duration-300">
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
