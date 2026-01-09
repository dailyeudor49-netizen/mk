'use client';

import React, { useState } from 'react';
import { FAQ_ITEMS } from '../lib/constants';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-10 px-4 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-black text-center text-gray-900 mb-6">
          ČASTO KLADENÉ OTÁZKY
        </h2>
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <button 
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-4 text-left font-bold text-gray-800 hover:bg-gray-50 transition-colors"
              >
                {item.question}
                {openIndex === index ? <ChevronUp className="text-red-500" /> : <ChevronDown className="text-gray-400" />}
              </button>
              {openIndex === index && (
                <div className="p-4 pt-0 text-gray-600 text-sm leading-relaxed border-t border-gray-100 mt-2">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;