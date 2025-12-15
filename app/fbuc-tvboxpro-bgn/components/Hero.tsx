'use client';

import React, { useState } from 'react';
import { Star, Zap, Check, ChevronLeft, ChevronRight, Truck, ShieldCheck, Banknote } from 'lucide-react';
import { PRICE_PROMO, PRICE_FULL, CURRENCY } from '../constants';

const productImages = [
  "/images/tvboxpro-4k/1.png",
  "/images/tvboxpro-4k/2.png",
  "/images/tvboxpro-4k/3.png",
  "/images/tvboxpro-4k/4.png",
  "/images/tvboxpro-4k/5.png",
  "/images/tvboxpro-4k/6.png",
  "/images/tvboxpro-4k/7.png",
  "/images/tvboxpro-4k/8.png",
  "/images/tvboxpro-4k/9.png",
];

export const Hero: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const scrollToOrder = () => {
    const element = document.getElementById('order-form');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  return (
    <section className="bg-white pb-8">
      {/* Urgency Banner */}
      <div className="bg-red-600 text-white text-center py-2 font-bold text-sm md:text-base px-2 uppercase tracking-wide animate-pulse">
        ⚠️ Високо търсене: Последни бройки в склада
      </div>

      <div className="max-w-4xl mx-auto px-4 pt-6">
        {/* Headline */}
        <h1 className="text-3xl md:text-5xl font-black text-center leading-tight mb-4 text-gray-900">
          ПРЕВЪРНЕТЕ СТАРИЯ СИ ТЕЛЕВИЗОР В <span className="text-white bg-red-600 px-2 transform skew-x-[-10deg] inline-block">КИНО, СТАДИОН И КОНЗОЛА</span>
        </h1>
        <p className="text-center text-gray-700 text-lg md:text-xl font-medium mb-6 leading-relaxed">
          Първият "Всичко-в-едно" Box, който пренася <span className="font-bold underline">Филми, Спорт на живо и Игри</span> на всеки телевизор за 30 секунди. <span className="bg-yellow-100 px-1">Лесен за използване като дистанционно.</span>
        </p>

        {/* Social Proof Badge */}
        <div className="flex justify-center items-center gap-2 mb-6">
          <div className="flex text-yellow-500">
            {[1, 2, 3, 4, 5].map((_, i) => <Star key={i} size={24} fill="currentColor" />)}
          </div>
          <span className="font-bold text-gray-700 underline decoration-green-500 decoration-2">8.350 Българи го използват днес</span>
        </div>

        {/* Product Visual & Offer */}
        <div className="flex flex-col md:flex-row gap-6 items-start border-4 border-gray-100 p-4 rounded-xl bg-gray-50 shadow-xl">
          
          {/* Image Slider Column */}
          <div className="w-full md:w-1/2">
            <div className="relative mb-2 group">
                <div className="absolute top-2 left-2 bg-green-600 text-white font-bold px-3 py-1 text-sm rounded shadow-lg z-10 flex items-center gap-1">
                    <Zap size={16} fill="white"/> ТЕХНОЛОГИЯ 2025
                </div>
                
                {/* Main Image */}
                <div className="relative rounded-lg overflow-hidden border-2 border-gray-300 shadow-md aspect-square bg-white">
                     <img 
                        src={productImages[currentImage]} 
                        alt={`Продукт снимка ${currentImage + 1}`} 
                        className="w-full h-full object-cover"
                    />
                    
                    {/* Navigation Buttons */}
                    <button 
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button 
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>

                {/* Thumbnails */}
                <div className="flex justify-center gap-2 mt-3 flex-wrap">
                    {productImages.map((img, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentImage(idx)}
                            className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${currentImage === idx ? 'border-red-600 scale-110 shadow-lg' : 'border-gray-300 opacity-70 hover:opacity-100'}`}
                        >
                            <img src={img} alt={`Миниатюра ${idx + 1}`} className="w-full h-full object-cover" />
                        </button>
                    ))}
                </div>
            </div>
          </div>
          
          {/* Content Column */}
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="mb-6 w-full bg-yellow-100 border-l-4 border-yellow-500 p-3 rounded-r">
              <span className="text-gray-500 text-xl line-through font-bold mr-2">{PRICE_FULL} {CURRENCY}</span>
              <span className="text-4xl font-black text-red-600">{PRICE_PROMO} {CURRENCY}</span>
            </div>
            
            {/* Concrete Bullet Points */}
            <ul className="space-y-4 mb-6 text-left w-full">
              <li className="flex items-start gap-3">
                <div className="mt-1 bg-green-600 rounded-full p-1 shrink-0"><Check size={16} className="text-white" strokeWidth={4}/></div>
                <span className="text-lg text-gray-800 leading-tight">
                  <span className="text-red-600 font-bold">Кино у дома:</span> Всички приложения (Netflix, YouTube, HBO) са <span className="font-bold">готови за употреба</span>.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 bg-green-600 rounded-full p-1 shrink-0"><Check size={16} className="text-white" strokeWidth={4}/></div>
                <span className="text-lg text-gray-800 leading-tight">
                  <span className="text-red-600 font-bold">Спорт без прекъсване:</span> Гледайте мачове и спорт в 4K качество <span className="font-bold">без буфериране</span>.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 bg-green-600 rounded-full p-1 shrink-0"><Check size={16} className="text-white" strokeWidth={4}/></div>
                <span className="text-lg text-gray-800 leading-tight">
                  <span className="text-red-600 font-bold">TV става Конзола:</span> Спестете от PlayStation. Джойстик за игри в комплекта.
                </span>
              </li>
            </ul>

            <button 
              onClick={scrollToOrder}
              className="w-full bg-green-600 hover:bg-green-700 text-white text-2xl font-black py-4 px-6 rounded-lg shadow-xl transform transition hover:scale-105 border-b-4 border-green-800 leading-tight mb-4"
            >
              ИСКАМ ДА ПОРЪЧАМ
              <span className="block text-sm font-normal mt-1 opacity-90 text-yellow-100">Плащане при доставка (Наложен платеж)</span>
            </button>

            {/* TRUST BAR / GUARANTEES */}
            <div className="w-full grid grid-cols-3 gap-2 py-3 border-t border-gray-200">
                <div className="flex flex-col items-center justify-start text-center">
                    <Banknote className="text-green-600 mb-1" size={24} />
                    <span className="text-[10px] md:text-xs font-bold text-gray-700 leading-tight">ПЛАЩАНЕ<br/>ПРИ ДОСТАВКА</span>
                </div>
                <div className="flex flex-col items-center justify-start text-center border-l border-r border-gray-200">
                    <Truck className="text-green-600 mb-1" size={24} />
                    <span className="text-[10px] md:text-xs font-bold text-gray-700 leading-tight">ДОСТАВКА<br/>24/48 ЧАСА</span>
                </div>
                <div className="flex flex-col items-center justify-start text-center">
                    <ShieldCheck className="text-green-600 mb-1" size={24} />
                    <span className="text-[10px] md:text-xs font-bold text-gray-700 leading-tight">ГАРАНЦИЯ<br/>2 ГОДИНИ</span>
                </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};