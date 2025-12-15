'use client';

import React from 'react';
import { ShoppingCart } from 'lucide-react';

export const StickyCTA: React.FC = () => {
  const scrollToOrder = () => {
    const element = document.getElementById('order-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t-4 border-red-600 p-3 shadow-2xl z-50 md:hidden">
      <button 
        onClick={scrollToOrder}
        className="w-full bg-green-600 text-white font-black text-xl py-3 px-4 rounded-lg shadow-lg flex items-center justify-center gap-2 animate-pulse-btn border-2 border-green-700"
      >
        <ShoppingCart size={24} fill="white" />
        ПОРЪЧАЙ - НАЛОЖЕН ПЛАТЕЖ
      </button>
    </div>
  );
};