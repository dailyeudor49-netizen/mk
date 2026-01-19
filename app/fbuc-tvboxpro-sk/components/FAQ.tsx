'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: "Nerozumiem technológiám, zvládnem to?",
    answer: "Samozrejme. Box sme navrhli presne pre ľudí, ktorí nechcú komplikácie. Zapojte ho do zásuvky ako hriankovač a funguje. Menu je jednoduché a v slovenskom jazyku."
  },
  {
    question: "Potrebujem rýchly internet?",
    answer: "Nie, vďaka novej technológii kompresie dát, Box 4K funguje výborne aj pri bežnom internete alebo hotspote z mobilu (4G/5G)."
  },
  {
    question: "Funguje na mojom starom televízore?",
    answer: "Áno! Stačí, aby váš TV mal HDMI vstup (ten obdĺžnikový konektor, ktorý majú všetky televízory po roku 2005). Kábel je súčasťou balenia."
  },
  {
    question: "Musím platiť mesačné predplatné?",
    answer: "Nie! Platíte len raz za zariadenie. Toto je dnešná akčná cena. Po kúpe je Box váš navždy, bez skrytých poplatkov."
  },
  {
    question: "Môžem zaplatiť kuriérovi pri doručení?",
    answer: "Samozrejme! Ponúkame platbu na dobierku. Nepotrebujete kreditnú kartu. Objednajte teraz a zaplaťte hotovosťou alebo kartou kuriérovi (GLS/Pošta), keď prevezmete balík."
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
            Často kladené otázky
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
