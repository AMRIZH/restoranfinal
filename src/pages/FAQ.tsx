// src/pages/FAQ.tsx

import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const [faqData, setFaqData] = useState<FAQItem[]>([]);

  useEffect(() => {
    const fetchFAQ = async () => {
      try {
        const response = await fetch(
          "https://yoloverse.pythonanywhere.com/api/faq/"
        );
        const data = await response.json();
        setFaqData(data);
      } catch (error) {
        console.error("Error fetching FAQ data:", error);
      }
    };

    fetchFAQ();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-8">
          Frequently Asked Questions
        </h1>

        <div className="space-y-6">
          {faqData.map((faq) => (
            <div key={faq.id} className="border rounded-lg p-6 shadow-md">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {faq.question}
              </h2>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FAQ;
