'use client';

import React from 'react';
import { Smartphone, Wifi, Camera, CheckCircle } from 'lucide-react';

interface InstallationGuideProps {
  onOrderClick: () => void;
}

export default function InstallationGuide({ onOrderClick }: InstallationGuideProps) {
  const steps = [
    {
      icon: <Camera size={24} />,
      title: "Posiziona le Telecamere",
      desc: "Scegli i punti strategici: ingresso, salotto, giardino. Le telecamere si attaccano con adesivo o viti incluse."
    },
    {
      icon: <Wifi size={24} />,
      title: "Connetti alla Centralina",
      desc: "Accendi la centralina. Le telecamere si collegano automaticamente (sono già pre-configurate)."
    },
    {
      icon: <Smartphone size={24} />,
      title: "Scarica l'App",
      desc: "Inquadra il QR code sulla centralina. L'app si configura da sola in 30 secondi."
    },
    {
      icon: <CheckCircle size={24} />,
      title: "Sei Protetto!",
      desc: "Attiva l'allarme col telecomando. Da questo momento ricevi notifiche per ogni movimento."
    },
  ];

  return (
    <section className="py-16 bg-white border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1a2744]">
            Installazione in 5 Minuti
          </h2>
          <p className="text-gray-600 mt-2">
            Niente tecnici, niente cavi, niente complicazioni
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div key={i} className="relative">
              <div className="bg-gray-50 rounded-2xl p-6 h-full hover:bg-blue-50 transition-colors">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center mb-4">
                  {step.icon}
                </div>
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-[#1a2744] text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {i + 1}
                </div>
                <h3 className="font-bold text-[#1a2744] mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.desc}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-blue-200"></div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button
            onClick={onOrderClick}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-blue-600/30 transition-all"
          >
            Voglio Proteggere la Mia Casa
          </button>
        </div>
      </div>
    </section>
  );
}
