
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { installSteps } from '../constants';

interface InstallationGuideProps {
  onOrderClick: () => void;
}

const InstallationGuide: React.FC<InstallationGuideProps> = ({ onOrderClick }) => {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const toggleStep = (stepIndex: number) => {
    setActiveStep(activeStep === stepIndex ? null : stepIndex);
  };

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a2744] mb-4">
            Przewodnik Instalacji
          </h2>
          <p className="text-xl text-gray-600">3 proste kroki, aby zabezpieczyć swój dom w 5 minut</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Steps accordion */}
          <div className="space-y-4">
            {installSteps.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <button
                  onClick={() => toggleStep(index)}
                  className={`w-full text-left rounded-xl p-6 transition-all cursor-pointer ${
                    activeStep === index
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-50 hover:bg-gray-100 text-[#1a2744]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 min-w-[3rem] min-h-[3rem] rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0 ${
                        activeStep === index ? 'bg-white text-blue-600' : 'bg-blue-600 text-white'
                      }`}>
                        {item.step}
                      </div>
                      <h3 className="text-xl font-bold">{item.title}</h3>
                    </div>
                    <ChevronDown
                      className={`transition-transform flex-shrink-0 ${activeStep === index ? 'rotate-180' : ''}`}
                      size={24}
                    />
                  </div>

                  <motion.div
                    initial={false}
                    animate={{
                      height: activeStep === index ? 'auto' : 0,
                      opacity: activeStep === index ? 1 : 0,
                      marginTop: activeStep === index ? 16 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className={`text-base leading-relaxed ${
                      activeStep === index ? 'text-blue-100' : 'text-gray-600'
                    }`}>
                      {item.desc}
                    </p>
                    {/* Obrazek wewnątrz boxa na mobile */}
                    <div className="md:hidden mt-4 relative aspect-square rounded-xl overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.imageAlt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </motion.div>
                </button>
              </motion.div>
            ))}
          </div>

          {/* Image section - desktop only for changing images, mobile uses accordion */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:sticky md:top-8 hidden md:block"
          >
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={activeStep !== null ? installSteps[activeStep].image : 'https://picsum.photos/600/600?random=1'}
                alt={activeStep !== null ? installSteps[activeStep].imageAlt : 'Przewodnik instalacji systemu bezpieczeństwa'}
                className="w-full h-full object-cover transition-all duration-500"
              />
              {activeStep !== null && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              )}
              {activeStep !== null && (
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4">
                    <p className="font-bold text-[#1a2744]">Krok {installSteps[activeStep].step}</p>
                    <p className="text-sm text-gray-600">{installSteps[activeStep].title}</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        <div className="text-center mt-12">
          <button
            onClick={onOrderClick}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-12 rounded-full text-lg transition-all uppercase shadow-lg cursor-pointer transform hover:scale-105"
          >
            Zacznij Teraz
          </button>
        </div>
      </div>
    </section>
  );
};

export default InstallationGuide;
