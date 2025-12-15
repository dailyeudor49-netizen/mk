'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: "Ne razumijem se u tehniku, hoću li se snaći?",
    answer: "Naravno. Dizajnirali smo Box točno za ljude koji ne žele komplikacije. Uključite ga u struju kao toster i radi. Izbornik je jednostavan i na hrvatskom jeziku."
  },
  {
    question: "Treba li mi brzi internet?",
    answer: "Ne, zahvaljujući novoj tehnologiji kompresije podataka, Box 4K radi odlično čak i pri normalnom internetu ili hotspotu s mobitela (4G/5G)."
  },
  {
    question: "Radi li na mom starom televizoru?",
    answer: "Da! Dovoljno je da vaš TV ima HDMI ulaz (onaj pravokutni utor koji imaju svi televizori nakon 2005. godine). Kabel dolazi u paketu."
  },
  {
    question: "Moram li plaćati mjesečnu pretplatu?",
    answer: "Ne! Plaćate samo jednom za uređaj. Ovo je promotivna cijena za danas. Nakon kupnje Box je vaš zauvijek, bez skrivenih troškova."
  },
  {
    question: "Mogu li platiti dostavljaču kod preuzimanja?",
    answer: "Naravno! Nudimo plaćanje pouzećem. Ne treba vam kreditna kartica. Naručite sada i platite gotovinom ili karticom dostavljaču (GLS/HP) kada preuzmete paket."
  }
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gray-50 py-12 px-4 border-t border-gray-200">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-center gap-2 mb-8">
            <HelpCircle className="text-red-600" size={32} />
            <h2 className="text-3xl font-black text-center text-gray-900 uppercase">
            Često postavljana pitanja
            </h2>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
            >
              <button
                className="w-full flex justify-between items-center p-5 text-left font-bold text-gray-800 hover:bg-gray-50 transition"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-lg">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="text-red-600" />
                ) : (
                  <ChevronDown className="text-gray-400" />
                )}
              </button>
              
              {openIndex === index && (
                <div className="p-5 pt-0 text-gray-600 leading-relaxed border-t border-gray-100 bg-gray-50">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};