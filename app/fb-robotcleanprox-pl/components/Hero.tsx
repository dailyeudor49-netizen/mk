'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Truck, CheckCircle, ShieldCheck, ChevronLeft, ChevronRight, Award, Smartphone, Trash2, BatteryCharging, Wind, Smile, Star } from 'lucide-react';
import { PRICE_PROMO, PRICE_LIST, CURRENCY } from '../lib/constants';

interface HeroProps {
  onScrollToForm: () => void;
}

const HERO_IMAGES = [
  "/images/robotcleanprox imggif/ROBOTCLEANPROX IMG LANDING/1.webp",
  "/images/robotcleanprox imggif/ROBOTCLEANPROX IMG LANDING/2.webp",
  "/images/robotcleanprox imggif/ROBOTCLEANPROX IMG LANDING/3.webp",
  "/images/robotcleanprox imggif/ROBOTCLEANPROX IMG LANDING/4.webp",
  "/images/robotcleanprox imggif/ROBOTCLEANPROX IMG LANDING/5.webp",
  "/images/robotcleanprox imggif/ROBOTCLEANPROX IMG LANDING/6.webp",
  "/images/robotcleanprox imggif/ROBOTCLEANPROX IMG LANDING/7.webp",
  "/images/robotcleanprox imggif/ROBOTCLEANPROX IMG LANDING/8.webp",
  "/images/robotcleanprox imggif/ROBOTCLEANPROX IMG LANDING/9.webp",
];

const Hero: React.FC<HeroProps> = ({ onScrollToForm }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>(new Array(HERO_IMAGES.length).fill(false));

  // Preload all images on mount
  useEffect(() => {
    HERO_IMAGES.forEach((src, index) => {
      const img = new window.Image();
      img.src = src;
      img.onload = () => {
        setImagesLoaded(prev => {
          const newState = [...prev];
          newState[index] = true;
          return newState;
        });
      };
    });
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === HERO_IMAGES.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? HERO_IMAGES.length - 1 : prev - 1));
  };

  return (
    <section className="bg-white pb-0">
      {/* Top Warning Bar - Urgency */}
      <div className="bg-yellow-300 text-center py-2 px-4 font-bold text-red-700 text-sm uppercase tracking-wide animate-pulse">
        ⚠️ Uwaga: Całkowita wyprzedaż - Ostatnie sztuki
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-6 pb-8">
        {/* Headline */}
        <h1 className="text-3xl md:text-5xl font-black text-center text-gray-900 leading-tight mb-2 uppercase">
          ODKURZA, MYJE I SUSZY <br/> <span className="text-red-600">ZA JEDNYM PRZEJŚCIEM.</span>
        </h1>

        {/* Subheadline - Strong Benefit */}
        <p className="text-lg md:text-xl text-center text-gray-600 font-medium mb-6 leading-relaxed max-w-2xl mx-auto">
          Jedyny robot, który <strong>usuwa zaschnięte plamy</strong>, <strong>płyny</strong> i <strong>sierść zwierząt</strong> jednocześnie. <br/>
          <span className="font-bold text-gray-900 bg-yellow-100 px-1">Wyrzuć mop, wiadro i miotłę na zawsze.</span>
        </p>

        {/* Image Slider */}
        <div className="relative w-full max-w-md md:max-w-lg mx-auto aspect-square rounded-xl overflow-hidden shadow-2xl mb-6 border-4 border-gray-100">

          {/* Social Proof Badge Overlay */}
          <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg flex items-center gap-1 border border-green-500">
             <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
             </div>
             <span className="text-xs font-bold text-gray-800">Best Seller 2025</span>
          </div>

          <Image
            src={HERO_IMAGES[currentSlide]}
            alt={`Robot odkurzacz myjący zdjęcie ${currentSlide + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, 512px"
            className="object-cover"
            priority={currentSlide === 0}
          />

          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white text-gray-800"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white text-gray-800"
          >
            <ChevronRight size={24} />
          </button>

          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {HERO_IMAGES.map((_, idx) => (
              <div
                key={idx}
                className={`w-2 h-2 rounded-full ${currentSlide === idx ? 'bg-red-600' : 'bg-white/60'}`}
              />
            ))}
          </div>
        </div>

        {/* STOCK BAR - VISUAL URGENCY */}
        <div className="max-w-md mx-auto mb-8">
            <div className="flex justify-between text-xs font-bold text-red-600 mb-1 uppercase">
                <span>Dostępność się wyczerpuje</span>
                <span>Pozostało 14 sztuk</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden border border-gray-300">
                <div className="bg-gradient-to-r from-red-500 to-red-600 h-full rounded-full w-[12%] animate-pulse"></div>
            </div>
        </div>

        {/* Main Benefit Bullets - 6 Strong Points */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3 max-w-2xl mx-auto mb-8 bg-gray-50 p-4 rounded-xl border border-gray-200">
            <div className="flex items-start gap-3">
                <Smile className="text-green-600 shrink-0 mt-0.5" size={22} strokeWidth={2.5} />
                <span className="text-base text-gray-800 leading-tight">
                    <strong>Żegnaj Bólu Pleców</strong>: Nigdy więcej nie będziesz się schylać do zamiatania czy mycia.
                </span>
            </div>
             <div className="flex items-start gap-3">
                <Trash2 className="text-green-600 shrink-0 mt-0.5" size={22} strokeWidth={2.5} />
                <span className="text-base text-gray-800 leading-tight">
                    <strong>Czyste Ręce Zawsze</strong>: Baza opróżnia kurz i uzupełnia wodę automatycznie. Zapominasz o nim na miesiące.
                </span>
            </div>
            <div className="flex items-start gap-3">
                <Wind className="text-green-600 shrink-0 mt-0.5" size={22} strokeWidth={2.5} />
                <span className="text-base text-gray-800 leading-tight">
                    <strong>Sierść zwierząt? Zniknęła</strong>: Odkurza 99% sierści i włosów bez zatykania się, nawet z dywanów.
                </span>
            </div>
            <div className="flex items-start gap-3">
                <CheckCircle className="text-green-600 shrink-0 mt-0.5" size={22} strokeWidth={2.5} />
                <span className="text-base text-gray-800 leading-tight">
                    <strong>Naprawdę Myje i Suszy</strong>: Obrotowe mopy usuwają sos i kawę. Podłoga sucha w 1 minutę.
                </span>
            </div>
            <div className="flex items-start gap-3">
                <BatteryCharging className="text-green-600 shrink-0 mt-0.5" size={22} strokeWidth={2.5} />
                <span className="text-base text-gray-800 leading-tight">
                    <strong>Nieskończona Bateria (8 Godzin)</strong>: Sprząta całe domy. Gdy się rozładuje, wraca do bazy i kontynuuje.
                </span>
            </div>
            <div className="flex items-start gap-3">
                <Smartphone className="text-green-600 shrink-0 mt-0.5" size={22} strokeWidth={2.5} />
                <span className="text-base text-gray-800 leading-tight">
                    <strong>Steruj z Kanapy</strong>: Wybierz w aplikacji pokoje do sprzątania. Ty odpoczywasz, on pracuje.
                </span>
            </div>
        </div>

        {/* Price Display */}
        <div className="flex flex-col items-center justify-center mb-6 mt-16 md:mt-12 relative">
            {/* -50% Bubble Badge */}
            <div className="absolute -top-14 md:-top-10 right-0 md:right-24 bg-red-600 text-white w-14 h-14 md:w-20 md:h-20 flex flex-col items-center justify-center rounded-full shadow-xl z-10 rotate-12 border-4 border-white">
                <span className="text-lg md:text-2xl font-black leading-none">-50%</span>
                <span className="text-[7px] md:text-[10px] font-bold uppercase">Rabat</span>
            </div>

            <div className="text-xs md:text-sm font-bold text-red-600 uppercase tracking-wider bg-red-100 px-3 py-1 rounded-full mb-2">
                Oferta Ograniczona Czasowo
            </div>
            <div className="flex items-end gap-2 md:gap-4">
                <span className="text-xl md:text-2xl text-gray-400 line-through font-medium mb-1 md:mb-2">{PRICE_LIST} {CURRENCY}</span>
                <span className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter">
                    {PRICE_PROMO} {CURRENCY}
                </span>
            </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 text-xs md:text-sm font-bold text-gray-600 mb-6 uppercase tracking-tight">
          <div className="flex items-center gap-1 bg-gray-100 px-3 py-1.5 rounded">
            <Truck size={16} className="text-blue-600" /> Wysyłka 24/48h
          </div>
          <div className="flex items-center gap-1 bg-gray-100 px-3 py-1.5 rounded">
            <ShieldCheck size={16} className="text-green-600" /> Płatność przy odbiorze
          </div>
          <div className="flex items-center gap-1 bg-gray-100 px-3 py-1.5 rounded border border-orange-200">
            <Award size={16} className="text-orange-500" /> 2 lata gwarancji
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
            <button
                onClick={onScrollToForm}
                className="w-full md:w-auto bg-green-600 text-white text-xl md:text-2xl font-black py-4 px-8 rounded-xl shadow-xl hover:bg-green-700 transform transition hover:scale-105 animate-bounce-slow border-b-4 border-green-800"
            >
                ZAMÓW TERAZ – PŁACĘ PRZY ODBIORZE
            </button>
            <p className="mt-3 text-sm text-gray-500">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></span>
                Wypełnij formularz, oddzwonimy w celu potwierdzenia.
            </p>
        </div>
      </div>

      {/* Authority Bar */}
      <div className="bg-gray-100 border-t border-gray-200 py-4 overflow-hidden">
        <p className="text-center text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Produkt Polecany Przez</p>
        <div className="flex justify-center items-center gap-4 md:gap-12 opacity-60 grayscale flex-wrap px-4">
            <span className="font-black text-sm md:text-lg text-gray-600 font-serif">TechHome</span>
            <span className="font-black text-sm md:text-lg text-gray-600">DomŁatwy</span>
            <span className="font-bold text-sm md:text-xl text-gray-600 italic">SmartLife</span>
            <span className="font-black text-sm md:text-lg text-gray-600">PolskieNowinki</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
