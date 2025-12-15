'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: "Не разбирам от техника, ще се справя ли?",
    answer: "Разбира се. Проектирахме Box-а точно за хора, които не искат усложнения. Включвате го в контакта като тостер и работи. Менюто е просто и може да се настрои на български."
  },
  {
    question: "Трябва ли ми бърз интернет?",
    answer: "Не, благодарение на новата технология за компресия на данни, Box 4K работи отлично дори при нормален интернет или хотспот от телефон (LTE/5G)."
  },
  {
    question: "Става ли за моя стар телевизор?",
    answer: "Да! Достатъчно е телевизорът ви да има HDMI вход (това правоъгълно гнездо, което имат всички телевизори след 2005 г.). Кабелът е в комплекта."
  },
  {
    question: "Трябва ли да плащам месечна такса?",
    answer: "Не! Плащате само веднъж за устройството. Това е промоционална цена за днес. След покупката Box-ът е ваш завинаги, без скрити такси."
  },
  {
    question: "Мога ли да платя на куриера при доставка?",
    answer: "Разбира се! Предлагаме плащане при доставка (Наложен платеж). Не ви трябва кредитна карта. Поръчвате сега и плащате в брой или с карта на куриера (Econt/Speedy), когато получите пратката."
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
            Често задавани въпроси
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