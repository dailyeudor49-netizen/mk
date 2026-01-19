import React from 'react';
import { Gamepad2, Plus } from 'lucide-react';
import { PRODUCT_NAME, CURRENCY } from '../constants';

export const Bundle: React.FC = () => {
  return (
    <section className="py-10 px-4 bg-yellow-50">
      <div className="max-w-4xl mx-auto border-4 border-yellow-400 rounded-2xl p-6 relative bg-white shadow-xl">
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-red-600 text-white font-black px-8 py-3 rounded-full uppercase shadow-lg whitespace-nowrap text-xl border-4 border-white">
          ČO DOSTANETE V BALENÍ
        </div>

        <div className="mt-8 flex flex-col md:flex-row gap-8 items-center justify-center">
            {/* Main Item - SmartBox TV 4K Pro */}
            <div className="flex-1 text-center w-full">
                <div className="relative">
                     <img src="/images/tvboxpro-4k/10.png" alt="SmartBox TV 4K Pro" className="w-48 h-48 mx-auto rounded-xl shadow-lg mb-4 object-contain bg-white border border-gray-200"/>
                </div>
                <p className="font-black text-gray-900 text-xl uppercase mb-1">{PRODUCT_NAME}</p>
                <p className="text-gray-500 line-through font-bold">Hodnota 118,00 {CURRENCY}</p>
            </div>

            <Plus className="text-gray-400 hidden md:block" size={48} strokeWidth={3} />

            {/* Included Item - Remote */}
            <div className="flex-1 text-center w-full">
                <img src="/images/tvboxpro-4k/12.png" alt="Hlasový Ovládač" className="w-48 h-48 mx-auto rounded-xl shadow-lg mb-4 object-contain bg-white border border-gray-200"/>
                <p className="font-bold text-gray-800 text-lg uppercase mb-1">Hlasový Ovládač</p>
                <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-bold">ZAHRNUTÉ</div>
            </div>

            <Plus className="text-gray-400 hidden md:block" size={48} strokeWidth={3} />

            {/* THE GIFT - Joystick */}
            <div className="flex-1 text-center w-full relative">
                 <div className="absolute -top-4 -right-4 md:right-4 bg-red-500 text-white rounded-full w-16 h-16 flex items-center justify-center font-black text-sm transform rotate-12 shadow-lg z-10 animate-bounce">
                    DARČEK
                </div>
                <img src="/images/tvboxpro-4k/11.png" alt="Bezdrôtový Joystick" className="w-48 h-48 mx-auto rounded-xl shadow-lg mb-4 object-contain bg-white border-4 border-yellow-400"/>
                <p className="font-black text-gray-900 text-lg uppercase mb-1">Bezdrôtový Joystick</p>
                <p className="text-green-600 font-black text-lg bg-green-100 inline-block px-2 rounded">ZADARMO (Hodnota 25 {CURRENCY})</p>
            </div>
        </div>
      </div>
    </section>
  );
};
