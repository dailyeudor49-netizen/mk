'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: "Ne razumem tehnologije, ali bom znal?",
    answer: "Seveda. Box smo zasnovali točno za ljudi, ki ne želijo zapletov. Vklopite ga v vtičnico kot toaster in deluje. Meni je enostaven in v slovenskem jeziku."
  },
  {
    question: "Ali potrebujem hiter internet?",
    answer: "Ne, zahvaljujoč novi tehnologiji stiskanja podatkov, Box 4K odlično deluje tudi pri običajnem internetu ali hotspotu s telefona (4G/5G)."
  },
  {
    question: "Ali deluje na mojem starem televizorju?",
    answer: "Da! Dovolj je, da ima vaš TV HDMI vhod (tisto pravokotno režo, ki jo imajo vsi televizorji po letu 2005). Kabel je priložen v paketu."
  },
  {
    question: "Moram plačevati mesečno naročnino?",
    answer: "Ne! Plačate samo enkrat za napravo. To je današnja promocijska cena. Po nakupu je Box vaš za vedno, brez skritih stroškov."
  },
  {
    question: "Ali lahko plačam kurirju ob prevzemu?",
    answer: "Seveda! Ponujamo plačilo ob prevzemu. Ne potrebujete kreditne kartice. Naročite zdaj in plačajte z gotovino ali kartico kurirju (GLS/Pošta), ko prevzamete paket."
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
            Pogosto zastavljena vprašanja
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
