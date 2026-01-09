'use client';

import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { PRICE_PROMO, PRICE_LIST, CURRENCY } from '../lib/constants';

interface StickyCTAProps {
  onScrollToForm: () => void;
  isVisible: boolean;
}

const StickyCTA: React.FC<StickyCTAProps> = ({ onScrollToForm, isVisible }) => {
  return (
    <div
      className={`fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-[100] transition-transform duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="max-w-4xl mx-auto px-4 py-2 md:py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="flex flex-col">
            <span className="text-[10px] md:text-xs text-gray-400 line-through">Cena {PRICE_LIST} {CURRENCY}</span>
            <span className="text-xl md:text-2xl font-black text-red-600 leading-none">{PRICE_PROMO} {CURRENCY}</span>
          </div>
          <div className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm whitespace-nowrap">
            -50%
          </div>
        </div>
        <button
          onClick={onScrollToForm}
          className="bg-green-600 text-white font-bold py-2 md:py-3 px-6 md:px-8 rounded-lg flex items-center gap-2 shadow-lg hover:bg-green-700 transition-colors transform active:scale-95 text-sm md:text-base"
        >
          <ShoppingCart size={18} className="md:w-5 md:h-5" />
          ZAMÓW
        </button>
      </div>
    </div>
  );
};

export default StickyCTA;
