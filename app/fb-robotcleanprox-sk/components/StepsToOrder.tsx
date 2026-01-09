'use client';

import React from 'react';
import { FileText, PhoneCall, Truck, Banknote } from 'lucide-react';

const StepsToOrder: React.FC = () => {
  return (
    <section className="py-10 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-black text-center text-gray-900 mb-8 uppercase">
          Ako Objednať v 4 Krokoch
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 relative">
            
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-1 bg-gray-200 -z-10"></div>

            {/* Step 1 */}
            <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg mb-4 border-4 border-white">
                    <FileText size={32} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">1. Vyplňte formulár</h3>
                <p className="text-sm text-gray-600 px-4">Zadajte svoje údaje nižšie, aby ste si zabezpečili ponuku.</p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-white border-4 border-red-600 rounded-full flex items-center justify-center text-red-600 shadow-lg mb-4">
                    <PhoneCall size={32} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">2. Zavoláme vám</h3>
                <p className="text-sm text-gray-600 px-4">Náš operátor vám zavolá na potvrdenie údajov.</p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center">
                 <div className="w-16 h-16 bg-white border-4 border-red-600 rounded-full flex items-center justify-center text-red-600 shadow-lg mb-4">
                    <Truck size={32} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">3. Rýchle Doručenie</h3>
                <p className="text-sm text-gray-600 px-4">Balík vyrazí okamžite a dorazí k vám domov do 24/48 hodín.</p>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-center text-center">
                 <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white shadow-lg mb-4 border-4 border-white">
                    <Banknote size={32} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">4. Platba pri prevzatí</h3>
                <p className="text-sm text-gray-600 px-4">Neplatíte vopred nič. Zaplatíte hotovosťou kuriérovi.</p>
            </div>

        </div>
      </div>
    </section>
  );
};

export default StepsToOrder;