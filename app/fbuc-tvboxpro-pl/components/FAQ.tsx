'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: "Nie znam się na technologii, czy sobie poradzę?",
    answer: "Oczywiście. Zaprojektowaliśmy Boxa właśnie dla osób, które nie chcą komplikacji. Podłączasz go do prądu jak toster i działa. Menu jest proste i w języku polskim."
  },
  {
    question: "Czy potrzebuję szybkiego internetu?",
    answer: "Nie, dzięki nowej technologii kompresji danych, Box 4K działa doskonale nawet przy normalnym łączu lub hotspocie z telefonu LTE/5G."
  },
  {
    question: "Czy pasuje do mojego starego telewizora?",
    answer: "Tak! Wystarczy, że Twój telewizor ma wejście HDMI (to prostokątne wejście obecne we wszystkich TV od 2005 roku). Kabel jest w zestawie."
  },
  {
    question: "Czy muszę płacić abonament?",
    answer: "Nie! Płacisz tylko raz za urządzenie. To cena promocyjna, którą widzisz dzisiaj. Po zakupie Box jest Twój na zawsze, bez ukrytych kosztów."
  },
  {
    question: "Czy mogę zapłacić kurierowi przy odbiorze?",
    answer: "Oczywiście! Oferujemy płatność przy odbiorze (za pobraniem). Nie potrzebujesz karty kredytowej. Zamawiasz teraz, a płacisz gotówką dopiero, gdy paczka dotrze do Twoich rąk."
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
            Częste Pytania
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