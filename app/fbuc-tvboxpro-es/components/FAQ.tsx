'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: "No entiendo de tecnología, ¿sabré manejarlo?",
    answer: "Por supuesto. Hemos diseñado el Box pensando en personas que no quieren complicaciones. Lo enchufas como una tostadora y funciona. El menú es sencillo y está en español."
  },
  {
    question: "¿Necesito internet rápido?",
    answer: "No, gracias a la nueva tecnología de compresión de datos, el Box 4K funciona perfectamente incluso con internet normal o con el hotspot del móvil (4G/5G)."
  },
  {
    question: "¿Funciona en mi televisor antiguo?",
    answer: "¡Sí! Solo necesitas que tu TV tenga entrada HDMI (ese conector rectangular que tienen todos los televisores desde 2005). El cable viene incluido en el paquete."
  },
  {
    question: "¿Tengo que pagar suscripción mensual?",
    answer: "¡No! Pagas una sola vez por el dispositivo. Este es el precio promocional de hoy. Después de la compra, el Box es tuyo para siempre, sin costes ocultos."
  },
  {
    question: "¿Puedo pagar al repartidor cuando lo reciba?",
    answer: "¡Claro! Ofrecemos pago contra reembolso. No necesitas tarjeta de crédito. Haz el pedido ahora y paga en efectivo o con tarjeta al repartidor (SEUR/MRW) cuando recibas el paquete."
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
            Preguntas frecuentes
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
