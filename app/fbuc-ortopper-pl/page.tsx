"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  Truck, ShieldCheck, CheckCircle2, ChevronLeft, ChevronRight,
  Sparkles, Info, Bone, Activity, Zap, BedDouble,
  UserCheck, Brain, Anchor, BadgeCheck, X, Check,
  ArrowRight, Package, Quote, Star, HelpCircle, ChevronDown, Lock
} from 'lucide-react';
import { useFacebookTracking } from '@/app/hooks/useFacebookTracking';
import { validateForm } from '@/app/utils/formValidation';

// --- TYPES ---
type BedSize = 'Pojedynczy' | 'Półtorak' | 'Podwójny' | 'King';

interface Testimonial {
  id: number;
  name: string;
  city: string;
  text: string;
  rating: number;
}

interface FaqItem {
  question: string;
  answer: string;
}

interface HeroProps {
  selectedSize: BedSize;
  onSelectSize: (size: BedSize) => void;
}

interface OrderFormProps {
  selectedSize: BedSize;
  onSelectSize: (size: BedSize) => void;
}

// --- CONSTANTS ---
const PRICE = 299;
const PRICE_OLD = 598; // -50%
const CURRENCY = 'zł';
const PRODUCT_NAME = 'Topper Ortopedyczny';
const THANK_YOU_PAGE = '/fb-ty/ty-fb-pl';

// Network config for PL
const NETWORK_CONFIG = {
  uid: '4a2b2107-ba63-494f-b762-41120bde0c94',
  key: '4afe791f5ae2aac4926eab',
  offer: '3042',
  lp: '3076',
};

// --- COMPONENTS ---

const Hero: React.FC<HeroProps> = ({ selectedSize, onSelectSize }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slideData = [
    { img: "/images/ortopper-img/1-opt.png" },
    { img: "/images/ortopper-img/2-opt.png" },
    { img: "/images/ortopper-img/3-opt.png" },
    { img: "/images/ortopper-img/4-opt.png" },
    { img: "/images/ortopper-img/5-opt.png" },
    { img: "/images/ortopper-img/6-opt.png" },
    { img: "/images/ortopper-img/7-opt.png" },
    { img: "/images/ortopper-img/8-opt.png" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideData.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slideData.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slideData.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? slideData.length - 1 : prev - 1));

  const sizesMap: Record<BedSize, string> = {
    'Pojedynczy': '80x190 cm',
    'Półtorak': '120x190 cm',
    'Podwójny': '160x190 cm',
    'King': '180x200 cm'
  };

  return (
    <section className="w-full bg-white pb-8 pt-2 px-3 md:px-4 border-b-8 border-blue-600 overflow-hidden">
      <div className="bg-yellow-300 text-center py-3 px-2 mb-6 -mx-3 md:-mx-4 shadow-sm border-b border-yellow-400">
        <p className="text-sm md:text-xl font-black text-red-700 uppercase tracking-wide animate-pulse leading-tight">
          ⚠️ UWAGA: Oferta "Zdrowy Kręgosłup" wygasa o północy
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-xs md:text-lg font-black uppercase tracking-widest mb-4 border border-blue-200 shadow-sm">
            Certyfikowana technologia Memory Foam HD
          </div>
          <h1 className="text-3xl md:text-6xl font-black text-gray-900 leading-tight uppercase mb-4 md:mb-6">
            Zamień swoje łóżko w <br className="hidden md:block" />
            <span className="text-white bg-blue-600 px-3 py-1 rounded shadow-md transform -skew-x-6 inline-block mt-1 md:mt-0">SYSTEM ORTOPEDYCZNY</span>
          </h1>
          <p className="text-lg md:text-3xl font-bold text-gray-600 leading-snug max-w-5xl mx-auto px-2">
            Jedyny topper z <span className="text-blue-600 underline decoration-4 decoration-blue-200">Falami Masującymi</span>, który dekompresuje kręgosłup i <span className="text-white bg-red-600 px-2 rounded-sm whitespace-nowrap">ŁAGODZI BÓL</span> podczas snu.
          </p>
        </div>

        {/* MOBILE LAYOUT */}
        <div className="lg:hidden flex flex-col gap-8">
          <div>
            <div className="relative w-full aspect-square bg-gray-100 rounded-2xl overflow-hidden border-4 border-gray-100 shadow-xl group">
              <div className="absolute top-4 left-4 bg-red-600 text-white font-black px-4 py-2 text-sm z-20 rounded shadow-lg uppercase">
                  Stop Bólowi Pleców
              </div>
              <div className="w-full h-full relative">
                  <img src={slideData[currentSlide].img} alt="Topper Ortopedyczny" className="w-full h-full object-cover transition-opacity duration-500" />
                  <button onClick={(e) => {e.preventDefault(); prevSlide()}} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-lg hover:bg-white text-gray-900 z-10">
                      <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button onClick={(e) => {e.preventDefault(); nextSlide()}} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-lg hover:bg-white text-gray-900 z-10">
                      <ChevronRight className="w-6 h-6" />
                  </button>
              </div>
            </div>
            <div className="flex justify-center gap-2 mt-3">
              {slideData.map((slide, index) => (
                <button key={index} onClick={() => setCurrentSlide(index)} className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${currentSlide === index ? 'border-blue-600 ring-2 ring-blue-200 scale-105' : 'border-gray-200 opacity-70 hover:opacity-100'}`}>
                  <img src={slide.img} alt={`Miniatura ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4 px-1">
            <div className="flex items-start bg-blue-50 p-4 rounded-xl border border-blue-100 shadow-sm">
                <CheckCircle2 className="w-8 h-8 text-blue-600 mr-4 flex-shrink-0 mt-1" />
                <div>
                    <h4 className="font-black text-gray-900 text-lg uppercase mb-1 leading-none">WYRÓWNANIE KRĘGOSŁUPA</h4>
                    <p className="text-base text-gray-800 leading-snug mt-1">Utrzymuje szyję, plecy i miednicę w naturalnej osi. <span className="bg-yellow-200 px-1 font-bold">Koniec ze sztywnymi porankami.</span></p>
                </div>
            </div>
            <div className="flex items-start bg-blue-50 p-4 rounded-xl border border-blue-100 shadow-sm">
                <CheckCircle2 className="w-8 h-8 text-blue-600 mr-4 flex-shrink-0 mt-1" />
                <div>
                    <h4 className="font-black text-gray-900 text-lg uppercase mb-1 leading-none">MASAŻ "WAVE"</h4>
                    <p className="text-base text-gray-800 leading-snug mt-1">Falista powierzchnia reaktywuje przepływ krwi i redukuje <span className="font-bold text-red-600">nocne mrowienia.</span></p>
                </div>
            </div>
            <div className="flex items-start bg-blue-50 p-4 rounded-xl border border-blue-100 shadow-sm">
                <CheckCircle2 className="w-8 h-8 text-blue-600 mr-4 flex-shrink-0 mt-1" />
                <div>
                    <h4 className="font-black text-gray-900 text-lg uppercase mb-1 leading-none">REDUKCJA NACISKU (7CM)</h4>
                    <p className="text-base text-gray-800 leading-snug mt-1">Struktura <strong>Memory HD + HR</strong> (7cm) przyjmuje ramiona i biodra bez zapadania.</p>
                </div>
            </div>
            <div className="flex items-start bg-blue-50 p-4 rounded-xl border border-blue-100 shadow-sm">
                <CheckCircle2 className="w-8 h-8 text-blue-600 mr-4 flex-shrink-0 mt-1" />
                <div>
                    <h4 className="font-black text-gray-900 text-lg uppercase mb-1 leading-none">MAKSYMALNA HIGIENA</h4>
                    <p className="text-base text-gray-800 leading-snug mt-1">Pokrowiec <strong>Aloe Vera z zamkiem</strong> do prania + boczna <strong>siatka 3D Mesh</strong> przeciw poceniu.</p>
                </div>
            </div>
            <div className="flex items-start bg-blue-50 p-4 rounded-xl border border-blue-100 shadow-sm">
                <Anchor className="w-8 h-8 text-blue-600 mr-4 flex-shrink-0 mt-1" />
                <div>
                    <h4 className="font-black text-gray-900 text-lg uppercase mb-1 leading-none">CAŁKOWITA STABILNOŚĆ</h4>
                    <p className="text-base text-gray-800 leading-snug mt-1">Antypoślizgowy spód + <strong>4 szerokie wzmocnione gumki</strong>. <span className="bg-yellow-200 px-1 font-bold">Nie przesuwa się ani o milimetr.</span></p>
                </div>
            </div>
            <div className="flex items-start bg-blue-50 p-4 rounded-xl border border-blue-100 shadow-sm">
                <Sparkles className="w-8 h-8 text-blue-600 mr-4 flex-shrink-0 mt-1" />
                <div>
                    <h4 className="font-black text-gray-900 text-lg uppercase mb-1 leading-none">OSZCZĘDŹ 2000 ZŁ</h4>
                    <p className="text-base text-gray-800 leading-snug mt-1">Nie musisz wymieniać materaca. <span className="bg-yellow-200 px-1 font-bold">Odnów swoje stare łóżko</span> i spraw, by było jak nowe.</p>
                </div>
            </div>
          </div>

          <div className="w-full bg-white border-4 border-blue-600 rounded-3xl p-5 shadow-2xl relative mt-4">
            <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-[90%] text-center bg-red-600 text-white font-black px-4 py-2 uppercase tracking-widest rounded-lg shadow-lg text-sm animate-pulse border-2 border-white z-30">
                Wyprzedaż magazynowa
            </div>
            <div className="text-center mt-6 mb-6">
                <p className="text-gray-500 font-bold text-base mb-1 uppercase tracking-wide">Cena katalogowa</p>
                <div className="flex items-center justify-center gap-2">
                    <span className="text-gray-400 line-through text-3xl font-bold">{PRICE_OLD} {CURRENCY}</span>
                    <span className="text-7xl font-black text-gray-900 tracking-tighter">{PRICE}</span>
                    <span className="text-lg font-bold text-gray-900 self-end mb-4">{CURRENCY}</span>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-3 text-left shadow-sm">
                    <div className="flex items-center text-blue-800 font-black text-xs uppercase mb-1">
                        <Info className="w-4 h-4 mr-1" /> Dlaczego wszystkie rozmiary kosztują tyle samo?
                    </div>
                    <p className="text-xs text-gray-700 leading-tight">
                        Aby zwolnić miejsce w magazynie, <strong>obniżyliśmy ceny dużych rozmiarów</strong> (King/Podwójny) do ceny podstawowej Pojedynczego.
                        <br/><span className="text-red-600 font-bold">Skorzystaj, płacisz za mały, a bierzesz duży!</span>
                    </p>
                </div>
            </div>
            <div className="mb-6">
                <p className="text-center text-base font-black text-gray-800 mb-4 uppercase flex items-center justify-center">
                    <span className="w-3 h-3 bg-blue-600 rounded-full mr-2"></span> Wybierz swój rozmiar
                </p>
                <div className="grid grid-cols-2 gap-2">
                    {(['Pojedynczy', 'Półtorak', 'Podwójny', 'King'] as BedSize[]).map((size) => (
                        <button key={size} onClick={() => onSelectSize(size)} className={`py-3 px-1 rounded-xl border-2 transition-all shadow-sm flex flex-col items-center justify-center ${selectedSize === size ? 'bg-blue-900 border-blue-900 text-white ring-2 ring-blue-200 scale-[1.02] z-10' : 'bg-white border-gray-200 text-gray-600 hover:border-blue-400 hover:text-blue-600'}`}>
                                <span className="text-sm font-black uppercase leading-none mb-1 text-center">{size}</span>
                                <span className="text-[10px] font-bold opacity-80">{size === 'Pojedynczy' ? '80x190 cm' : size === 'Półtorak' ? '120x190 cm' : size === 'Podwójny' ? '160x190 cm' : '180x200 cm'}</span>
                            </button>
                    ))}
                </div>
            </div>
            <a href="#order-form" className="block w-full bg-green-600 hover:bg-green-700 text-white text-center font-black text-2xl py-5 rounded-2xl shadow-xl border-b-8 border-green-800 uppercase transform transition active:scale-95 group leading-none">
                CHCĘ CZUĆ SIĘ DOBRZE
                <span className="block text-xs font-bold text-green-100 mt-2 normal-case opacity-95 group-hover:text-white">Zamów teraz, zapłać kurierowi</span>
            </a>
            <div className="mt-6 pt-5 border-t border-gray-100 grid grid-cols-2 gap-3 text-sm font-bold text-gray-600 text-center">
                <div className="flex items-center justify-center bg-gray-50 py-2 rounded border border-gray-100"><Truck className="w-5 h-5 mr-2 text-blue-600"/> Dostawa 24-48h</div>
                <div className="flex items-center justify-center bg-gray-50 py-2 rounded border border-gray-100"><ShieldCheck className="w-5 h-5 mr-2 text-blue-600"/> Gwarancja 2 lata</div>
            </div>
          </div>
        </div>

        {/* DESKTOP LAYOUT */}
        <div className="hidden lg:block">
          <div className="flex flex-row gap-12 items-start mb-10">
            <div className="w-1/2">
              <div className="relative w-full aspect-square bg-gray-100 rounded-3xl overflow-hidden border-4 border-gray-100 shadow-xl group">
                <div className="absolute top-6 left-6 bg-red-600 text-white font-black px-6 py-3 text-xl z-20 rounded shadow-lg uppercase">Stop Bólowi Pleców</div>
                <div className="w-full h-full relative">
                    <img src={slideData[currentSlide].img} alt="Topper Ortopedyczny" className="w-full h-full object-cover transition-opacity duration-500" />
                    <button onClick={(e) => {e.preventDefault(); prevSlide()}} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 p-4 rounded-full shadow-lg hover:bg-white text-gray-900 z-10"><ChevronLeft className="w-8 h-8" /></button>
                    <button onClick={(e) => {e.preventDefault(); nextSlide()}} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 p-4 rounded-full shadow-lg hover:bg-white text-gray-900 z-10"><ChevronRight className="w-8 h-8" /></button>
                </div>
              </div>
              <div className="flex justify-center gap-3 mt-4">
                {slideData.map((slide, index) => (
                  <button key={index} onClick={() => setCurrentSlide(index)} className={`w-20 h-20 rounded-xl overflow-hidden border-3 transition-all ${currentSlide === index ? 'border-blue-600 ring-2 ring-blue-200 scale-105 shadow-lg' : 'border-gray-200 opacity-60 hover:opacity-100 hover:border-gray-300'}`}>
                    <img src={slide.img} alt={`Miniatura ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
            <div className="w-1/2 space-y-4">
              <div className="flex items-start bg-blue-50 p-5 rounded-xl border border-blue-100 shadow-sm">
                  <CheckCircle2 className="w-10 h-10 text-blue-600 mr-4 flex-shrink-0 mt-1" />
                  <div>
                      <h4 className="font-black text-gray-900 text-2xl uppercase mb-1 leading-none">WYRÓWNANIE KRĘGOSŁUPA</h4>
                      <p className="text-xl text-gray-800 leading-snug mt-1">Utrzymuje szyję, plecy i miednicę w naturalnej osi. <span className="bg-yellow-200 px-1 font-bold">Koniec ze sztywnymi porankami.</span></p>
                  </div>
              </div>
              <div className="flex items-start bg-blue-50 p-5 rounded-xl border border-blue-100 shadow-sm">
                  <CheckCircle2 className="w-10 h-10 text-blue-600 mr-4 flex-shrink-0 mt-1" />
                  <div>
                      <h4 className="font-black text-gray-900 text-2xl uppercase mb-1 leading-none">MASAŻ "WAVE"</h4>
                      <p className="text-xl text-gray-800 leading-snug mt-1">Falista powierzchnia reaktywuje przepływ krwi i redukuje <span className="font-bold text-red-600">nocne mrowienia.</span></p>
                  </div>
              </div>
              <div className="flex items-start bg-blue-50 p-5 rounded-xl border border-blue-100 shadow-sm">
                  <CheckCircle2 className="w-10 h-10 text-blue-600 mr-4 flex-shrink-0 mt-1" />
                  <div>
                      <h4 className="font-black text-gray-900 text-2xl uppercase mb-1 leading-none">REDUKCJA NACISKU (7CM)</h4>
                      <p className="text-xl text-gray-800 leading-snug mt-1">Struktura <strong>Memory HD + HR</strong> (7cm) przyjmuje ramiona i biodra bez zapadania.</p>
                  </div>
              </div>
              <div className="flex items-start bg-blue-50 p-5 rounded-xl border border-blue-100 shadow-sm">
                  <CheckCircle2 className="w-10 h-10 text-blue-600 mr-4 flex-shrink-0 mt-1" />
                  <div>
                      <h4 className="font-black text-gray-900 text-2xl uppercase mb-1 leading-none">MAKSYMALNA HIGIENA</h4>
                      <p className="text-xl text-gray-800 leading-snug mt-1">Pokrowiec <strong>Aloe Vera z zamkiem</strong> do prania + boczna <strong>siatka 3D Mesh</strong> przeciw poceniu.</p>
                  </div>
              </div>
              <div className="flex items-start bg-blue-50 p-5 rounded-xl border border-blue-100 shadow-sm">
                  <Anchor className="w-10 h-10 text-blue-600 mr-4 flex-shrink-0 mt-1" />
                  <div>
                      <h4 className="font-black text-gray-900 text-2xl uppercase mb-1 leading-none">CAŁKOWITA STABILNOŚĆ</h4>
                      <p className="text-xl text-gray-800 leading-snug mt-1">Antypoślizgowy spód + <strong>4 szerokie wzmocnione gumki</strong>. <span className="bg-yellow-200 px-1 font-bold">Nie przesuwa się ani o milimetr.</span></p>
                  </div>
              </div>
              <div className="flex items-start bg-blue-50 p-5 rounded-xl border border-blue-100 shadow-sm">
                  <Sparkles className="w-10 h-10 text-blue-600 mr-4 flex-shrink-0 mt-1" />
                  <div>
                      <h4 className="font-black text-gray-900 text-2xl uppercase mb-1 leading-none">OSZCZĘDŹ 2000 ZŁ</h4>
                      <p className="text-xl text-gray-800 leading-snug mt-1">Nie musisz wymieniać materaca. <span className="bg-yellow-200 px-1 font-bold">Odnów swoje stare łóżko</span> i spraw, by było jak nowe.</p>
                  </div>
              </div>
            </div>
          </div>

          <div className="w-full bg-white border-4 border-blue-600 rounded-3xl p-8 shadow-2xl relative">
            <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-center bg-red-600 text-white font-black px-6 py-2 uppercase tracking-widest rounded-lg shadow-lg text-lg animate-pulse border-2 border-white z-30">Wyprzedaż magazynowa</div>
            <div className="flex flex-row items-center justify-between gap-8 mt-4">
              <div className="flex-1">
                <p className="text-gray-500 font-bold text-lg mb-1 uppercase tracking-wide">Cena katalogowa</p>
                <div className="flex items-center gap-4">
                    <span className="text-gray-400 line-through text-4xl font-bold">{PRICE_OLD} {CURRENCY}</span>
                    <span className="text-8xl font-black text-gray-900 tracking-tighter">{PRICE}</span>
                    <span className="text-xl font-bold text-gray-900 self-end mb-4">{CURRENCY}</span>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-3 text-left shadow-sm max-w-md">
                    <div className="flex items-center text-blue-800 font-black text-sm uppercase mb-1"><Info className="w-4 h-4 mr-1" /> Dlaczego wszystkie rozmiary kosztują tyle samo?</div>
                    <p className="text-sm text-gray-700 leading-tight">Aby zwolnić miejsce w magazynie, <strong>obniżyliśmy ceny dużych rozmiarów</strong>.<span className="text-red-600 font-bold"> Skorzystaj, płacisz za mały, a bierzesz duży!</span></p>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-center text-lg font-black text-gray-800 mb-4 uppercase flex items-center justify-center"><span className="w-4 h-4 bg-blue-600 rounded-full mr-2"></span> Wybierz swój rozmiar</p>
                <div className="grid grid-cols-2 gap-3">
                    {(['Pojedynczy', 'Półtorak', 'Podwójny', 'King'] as BedSize[]).map((size) => (
                        <button key={size} onClick={() => onSelectSize(size)} className={`py-3 px-1 rounded-xl border-2 transition-all shadow-sm flex flex-col items-center justify-center ${selectedSize === size ? 'bg-blue-900 border-blue-900 text-white ring-4 ring-blue-200 scale-[1.02] z-10' : 'bg-white border-gray-200 text-gray-600 hover:border-blue-400 hover:text-blue-600'}`}>
                                <span className="text-lg font-black uppercase leading-none mb-1 text-center">{size}</span>
                                <span className="text-sm font-bold opacity-80">{size === 'Pojedynczy' ? '80x190 cm' : size === 'Półtorak' ? '120x190 cm' : size === 'Podwójny' ? '160x190 cm' : '180x200 cm'}</span>
                            </button>
                    ))}
                </div>
              </div>
              <div className="flex-1 flex flex-col">
                <a href="#order-form" className="block w-full bg-green-600 hover:bg-green-700 text-white text-center font-black text-3xl py-6 rounded-2xl shadow-xl border-b-8 border-green-800 uppercase transform transition active:scale-95 group leading-none">
                    CHCĘ CZUĆ SIĘ DOBRZE
                    <span className="block text-base font-bold text-green-100 mt-2 normal-case opacity-95 group-hover:text-white">Zamów teraz, zapłać kurierowi</span>
                </a>
                <div className="mt-4 grid grid-cols-2 gap-3 text-base font-bold text-gray-600 text-center">
                    <div className="flex items-center justify-center bg-gray-50 py-3 rounded border border-gray-100"><Truck className="w-6 h-6 mr-2 text-blue-600"/> Dostawa 24-48h</div>
                    <div className="flex items-center justify-center bg-gray-50 py-3 rounded border border-gray-100"><ShieldCheck className="w-6 h-6 mr-2 text-blue-600"/> Gwarancja 2 lata</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ProblemSolution: React.FC = () => {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black text-center text-gray-900 mb-4 uppercase leading-tight">
          Czy twój materac <br className="md:hidden"/> <span className="text-red-600 underline decoration-4 decoration-yellow-400">niszczy ci kręgosłup?</span>
        </h2>
        <p className="text-center text-gray-700 font-bold text-lg md:text-2xl mb-12 max-w-3xl mx-auto">
            Jeśli cierpisz na którykolwiek z tych problemów, winowajcą jest powierzchnia, na której śpisz.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:border-red-400 transition-colors">
                <div className="bg-red-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-red-100"><Bone className="w-10 h-10 text-red-600" /></div>
                <h3 className="font-black text-xl text-gray-900 mb-2 uppercase">Ból Lędźwi</h3>
                <p className="text-base text-gray-700 font-medium leading-relaxed">Budzisz się z bolącą dolną częścią pleców, ponieważ materac <span className="font-bold bg-yellow-100">nie wspiera naturalnego łuku.</span></p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:border-red-400 transition-colors">
                <div className="bg-red-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-red-100"><Activity className="w-10 h-10 text-red-600" /></div>
                <h3 className="font-black text-xl text-gray-900 mb-2 uppercase">Sztywność Karku</h3>
                <p className="text-base text-gray-700 font-medium leading-relaxed">Sztywna szyja rano? Oznacza to, że ramiona i głowa <span className="font-bold bg-yellow-100">nie są wyrównane</span> podczas snu.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:border-red-400 transition-colors">
                <div className="bg-red-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-red-100"><Zap className="w-10 h-10 text-red-600" /></div>
                <h3 className="font-black text-xl text-gray-900 mb-2 uppercase">Mrowienie</h3>
                <p className="text-base text-gray-700 font-medium leading-relaxed">Budzisz się z drętwymi rękami lub nogami? Materac <span className="font-bold bg-yellow-100">blokuje przepływ krwi.</span></p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:border-red-400 transition-colors">
                <div className="bg-red-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-red-100"><BedDouble className="w-10 h-10 text-red-600" /></div>
                <h3 className="font-black text-xl text-gray-900 mb-2 uppercase">Niepokój</h3>
                <p className="text-base text-gray-700 font-medium leading-relaxed">Przewracasz się szukając wygodnej pozycji? Twoje ciało walczy o komfort całą noc.</p>
            </div>
        </div>
        <div className="text-center mt-12 p-6 md:p-8 bg-blue-50 rounded-2xl border-2 border-blue-100 max-w-3xl mx-auto">
            <p className="text-xl md:text-3xl font-black text-blue-900 uppercase mb-3 leading-tight">ROZWIĄZANIEM NIE JEST MATERAC ZA 3000 ZŁ</p>
            <p className="text-gray-800 text-lg md:text-xl font-medium">Potrzebujesz wsparcia korekcyjnego, które dostosuje się do ciebie. <br className="hidden md:block"/><span className="font-bold text-blue-700 bg-white px-1">Topper Ortopedyczny</span> robi dokładnie to.</p>
        </div>
      </div>
    </section>
  );
};

const Mechanism: React.FC = () => {
  return (
    <section className="bg-white py-12 md:py-16 px-4 border-t border-gray-200">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 uppercase mb-4 leading-tight">TECHNOLOGIA <span className="text-blue-600">ORTOPEDYCZNA 3 POZIOMY</span></h2>
            <p className="text-gray-600 font-bold text-lg md:text-2xl max-w-4xl mx-auto">Nauka dobrego snu w 3 podstawowych fazach.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200 group hover:shadow-2xl transition-shadow flex flex-col">
                <div className="aspect-square w-full relative">
                    <img src="/images/ortopper-img/decompressione-vertebrale-opt.gif" alt="Dekompresja Kręgosłupa" className="w-full h-full object-cover" />
                    <div className="absolute top-4 left-4 bg-blue-600 text-white font-black w-12 h-12 flex items-center justify-center rounded-full text-2xl shadow-lg border-2 border-white">1</div>
                </div>
                <div className="p-6 md:p-8 flex-1">
                    <h4 className="font-black text-2xl text-gray-900 uppercase mb-3 md:mb-4">Dekompresja Kręgosłupa</h4>
                    <p className="text-gray-700 leading-relaxed text-lg md:text-xl font-medium">Materiał wiskoelastyczny dopasowuje się milimetrowo do ciała, wypełniając puste przestrzenie (okolica lędźwiowa). Pozwala kręgosłupowi się rozciągnąć, a dyskom <span className="bg-yellow-100 font-bold px-1 text-gray-900 border-b-2 border-yellow-300">nawodnić</span> w nocy.</p>
                </div>
            </div>
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200 group hover:shadow-2xl transition-shadow flex flex-col">
                <div className="aspect-square w-full relative">
                    <img src="/images/ortopper-img/profilo-bugnato-wave-opt.gif" alt="Profil Falowy Wave" className="w-full h-full object-cover" />
                    <div className="absolute top-4 left-4 bg-blue-600 text-white font-black w-12 h-12 flex items-center justify-center rounded-full text-2xl shadow-lg border-2 border-white">2</div>
                </div>
                <div className="p-6 md:p-8 flex-1">
                    <h4 className="font-black text-2xl text-gray-900 uppercase mb-3 md:mb-4">Profil Falowy "Wave"</h4>
                    <p className="text-gray-700 leading-relaxed text-lg md:text-xl font-medium">Specjalna falista obróbka wywiera <span className="bg-yellow-100 font-bold px-1 text-gray-900 border-b-2 border-yellow-300">pasywny mikro-masaż</span> przy każdym ruchu. Stymuluje mikrokrążenie kapilarne, redukując obrzęki i retencję wody.</p>
                </div>
            </div>
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200 group hover:shadow-2xl transition-shadow flex flex-col">
                <div className="aspect-square w-full relative">
                    <img src="/images/ortopper-img/zero-punti-pressione-opt.gif" alt="Zero Punktów Nacisku" className="w-full h-full object-cover" />
                    <div className="absolute top-4 left-4 bg-blue-600 text-white font-black w-12 h-12 flex items-center justify-center rounded-full text-2xl shadow-lg border-2 border-white">3</div>
                </div>
                <div className="p-6 md:p-8 flex-1">
                    <h4 className="font-black text-2xl text-gray-900 uppercase mb-3 md:mb-4">Zero Punktów Nacisku</h4>
                    <p className="text-gray-700 leading-relaxed text-lg md:text-xl font-medium">Rozkładając wagę równomiernie na <span className="bg-yellow-100 font-bold px-1 text-gray-900 border-b-2 border-yellow-300">7 CM grubości</span>, eliminuje szczyty nacisku na biodra i ramiona. Kluczowe dla osób z bólami stawów i mrowieniem.</p>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

const BenefitsList: React.FC = () => {
  return (
    <section className="bg-blue-900 py-12 md:py-16 px-4 border-y-4 border-blue-800 text-white">
      <div className="max-w-5xl mx-auto">
        <h3 className="text-3xl md:text-5xl font-black text-center mb-10 uppercase leading-tight">Korzyści Kliniczne i Techniczne</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="bg-blue-800 p-6 md:p-8 rounded-3xl border-2 border-blue-700 flex items-start hover:bg-blue-700 transition-colors shadow-lg">
                <UserCheck className="w-10 h-10 md:w-12 md:h-12 text-green-400 mr-4 md:mr-5 flex-shrink-0 mt-1" />
                <div>
                    <h4 className="font-black text-xl md:text-2xl text-white mb-2 uppercase">Korekta Postawy</h4>
                    <p className="text-blue-50 font-medium text-lg md:text-xl leading-snug">Niezależnie czy śpisz na plecach czy na boku, topper utrzymuje naturalną oś. Budzisz się prosty, bez potrzeby "strzelania" kręgosłupem.</p>
                </div>
            </div>
            <div className="bg-blue-800 p-6 md:p-8 rounded-3xl border-2 border-blue-700 flex items-start hover:bg-blue-700 transition-colors shadow-lg">
                <Brain className="w-10 h-10 md:w-12 md:h-12 text-green-400 mr-4 md:mr-5 flex-shrink-0 mt-1" />
                <div>
                    <h4 className="font-black text-xl md:text-2xl text-white mb-2 uppercase">Boczna Siatka 3D Mesh</h4>
                    <p className="text-blue-50 font-medium text-lg md:text-xl leading-snug">W przeciwieństwie do zamkniętych topperów, nasza techniczna siatka boczna zapewnia stały przepływ powietrza. <span className="text-white font-bold underline decoration-green-400">Koniec z poceniem.</span></p>
                </div>
            </div>
            <div className="bg-blue-800 p-6 md:p-8 rounded-3xl border-2 border-blue-700 flex items-start hover:bg-blue-700 transition-colors shadow-lg">
                <Anchor className="w-10 h-10 md:w-12 md:h-12 text-green-400 mr-4 md:mr-5 flex-shrink-0 mt-1" />
                <div>
                    <h4 className="font-black text-xl md:text-2xl text-white mb-2 uppercase">Całkowita Stabilność</h4>
                    <p className="text-blue-50 font-medium text-lg md:text-xl leading-snug">Wyposażony w <span className="font-bold text-white bg-blue-600 px-1">prawdziwy antypoślizgowy spód</span> i 4 szerokie wzmocnione gumki. Nie przesuwa się ani o milimetr.</p>
                </div>
            </div>
            <div className="bg-blue-800 p-6 md:p-8 rounded-3xl border-2 border-blue-700 flex items-start hover:bg-blue-700 transition-colors shadow-lg">
                <BadgeCheck className="w-10 h-10 md:w-12 md:h-12 text-green-400 mr-4 md:mr-5 flex-shrink-0 mt-1" />
                <div>
                    <h4 className="font-black text-xl md:text-2xl text-white mb-2 uppercase">Certyfikowana Higiena</h4>
                    <p className="text-blue-50 font-medium text-lg md:text-xl leading-snug">Pokrowiec Aloe Vera z zamkiem do szybkiego prania. Materiały antyroztoczowe i antyalergiczne, idealne dla osób wrażliwych.</p>
                </div>
            </div>
        </div>
        <div className="text-center mt-12">
             <a href="#order-form" className="inline-block bg-green-500 hover:bg-green-600 text-white font-black text-xl md:text-3xl py-5 px-10 md:py-6 md:px-16 rounded-full shadow-2xl border-b-8 border-green-700 transform transition hover:scale-105 uppercase tracking-wide">POCZUJ ULGĘ TERAZ</a>
             <p className="mt-4 text-sm md:text-lg text-blue-200 font-bold uppercase tracking-widest">14-dniowa gwarancja satysfakcji lub zwrot pieniędzy</p>
        </div>
      </div>
    </section>
  );
};

const Installation: React.FC = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-5xl mx-auto text-center">
        <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-12 uppercase">Instalacja w 30 sekund</h3>
        <div className="flex flex-col md:flex-row justify-center items-start gap-10">
            <div className="flex flex-col items-center flex-1">
                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center text-3xl font-black text-blue-600 mb-4 border-4 border-blue-100 shadow-sm">1</div>
                <p className="font-black text-2xl text-gray-900 uppercase mb-2">Rozwiń</p>
                <p className="text-lg text-gray-600 font-medium leading-snug">Otwórz opakowanie próżniowe i rozłóż wygodnie na starym materacu.</p>
            </div>
            <div className="hidden md:block w-16 h-2 bg-gray-100 mt-10 rounded-full"></div>
            <div className="flex flex-col items-center flex-1">
                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center text-3xl font-black text-blue-600 mb-4 border-4 border-blue-100 shadow-sm">2</div>
                <p className="font-black text-2xl text-gray-900 uppercase mb-2">Zamocuj</p>
                <p className="text-lg text-gray-600 font-medium leading-snug">Zapnij 4 wzmocnione gumki na rogach dla idealnej stabilności.</p>
            </div>
            <div className="hidden md:block w-16 h-2 bg-gray-100 mt-10 rounded-full"></div>
            <div className="flex flex-col items-center flex-1">
                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center text-3xl font-black text-blue-600 mb-4 border-4 border-blue-100 shadow-sm">3</div>
                <p className="font-black text-2xl text-gray-900 uppercase mb-2">Śpij</p>
                <p className="text-lg text-gray-600 font-medium leading-snug">Ciesz się natychmiastowym komfortem i pożegnaj poranne bóle.</p>
            </div>
        </div>
        <div className="mt-12 bg-yellow-50 inline-block px-6 py-4 rounded-xl border-2 border-yellow-200 text-base md:text-lg text-yellow-900 font-bold max-w-3xl">
            Uwaga: Wysyłany <span className="font-black uppercase">próżniowo zwinięty</span>. Zalecamy poczekać 24-48h na pełne odzyskanie objętości (7cm), ale możesz go używać już po 4 godzinach.
        </div>
      </div>
    </section>
  );
};

const Comparison: React.FC = () => {
  const features = [
    { name: "Struktura Wewnętrzna", us: { text: "PODWÓJNA WARSTWA (Memory+HR)", highlight: true }, them: "Pojedyncza warstwa" },
    { name: "Całkowita Grubość", us: { text: "7 CM RZECZYWISTE", highlight: true }, them: "3-4 CM zaledwie" },
    { name: "Typ Wsparcia", us: { text: "Ortopedyczne Aktywne", highlight: false }, them: "Pasywne / Miękkie" },
    { name: "Wpływ na Kręgosłup", us: { text: "Dekompresja", highlight: false }, them: "Zapadanie" },
    { name: "Technologia Powierzchni", us: { text: "Masujący Profil Falowy", highlight: false }, them: "Gładka / Gorąca" }
  ];

  return (
    <section className="py-12 md:py-16 px-3 md:px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h3 className="text-2xl md:text-4xl font-black text-center text-gray-900 mb-10 uppercase leading-tight">Dlaczego to nie jest zwykła <br/>&quot;pianka&quot;</h3>
        <div className="hidden md:block bg-white rounded-2xl shadow-xl border-2 border-gray-200 overflow-hidden">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-900 text-white">
                        <th className="p-6 w-1/3 text-xl uppercase font-bold pl-8">Cecha</th>
                        <th className="p-6 w-1/3 bg-blue-600 text-xl uppercase text-center font-black border-b-8 border-blue-800 relative">NASZ TOPPER<div className="absolute top-0 right-0 bg-yellow-400 text-black text-xs font-bold px-3 py-1 uppercase tracking-wide">Bestseller</div></th>
                        <th className="p-6 w-1/3 bg-gray-100 text-gray-500 text-xl uppercase text-center font-bold">GENERYCZNE ONLINE</th>
                    </tr>
                </thead>
                <tbody className="text-lg font-medium">
                    {features.map((f, i) => (
                        <tr key={i} className="border-b border-gray-100 last:border-0">
                            <td className="p-6 font-bold text-gray-900">{f.name}</td>
                            <td className="p-6 text-center bg-blue-50 font-bold text-blue-900 text-xl"><div className="flex flex-col items-center gap-2"><Check className="w-8 h-8 text-green-600"/> <span className={f.us.highlight ? "bg-yellow-200 px-2 py-0.5 rounded" : ""}>{f.us.text}</span></div></td>
                            <td className="p-6 text-center text-gray-400 text-lg"><div className="flex flex-col items-center gap-2"><X className="w-6 h-6"/> {f.them}</div></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div className="md:hidden space-y-6">
            {features.map((f, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 overflow-hidden relative">
                    <div className="bg-gray-900 text-white text-center py-3 font-black text-lg uppercase tracking-wide">{f.name}</div>
                    <div className="flex items-stretch relative">
                         <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-white border-2 border-gray-200 rounded-full w-8 h-8 flex items-center justify-center font-black text-[10px] text-gray-400 shadow-sm">VS</div>
                        <div className="flex-1 bg-blue-50 p-4 text-center border-r border-gray-100 flex flex-col items-center justify-start pt-8 pb-6">
                            <div className="absolute top-12 left-0 w-1/2 text-center"><span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">MY</span></div>
                            <div className="flex-grow flex flex-col items-center justify-center mt-2"><Check className="w-8 h-8 text-green-600 mb-2"/><span className={`text-base font-black text-blue-900 leading-tight ${f.us.highlight ? "bg-yellow-200 px-1 shadow-sm" : ""}`}>{f.us.text}</span></div>
                        </div>
                        <div className="flex-1 bg-white p-4 text-center flex flex-col items-center justify-start pt-8 pb-6">
                            <div className="absolute top-12 right-0 w-1/2 text-center"><span className="bg-gray-200 text-gray-500 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">INNI</span></div>
                            <div className="flex-grow flex flex-col items-center justify-center mt-2"><X className="w-6 h-6 text-gray-300 mb-2"/><span className="text-sm font-bold text-gray-400 leading-tight">{f.them}</span></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        <div className="text-center mt-12 flex justify-center items-center text-blue-700 font-bold text-lg cursor-pointer hover:underline group">
             <a href="#order-form" className="flex items-center bg-blue-50 px-6 py-3 rounded-full border border-blue-200 shadow-sm">Wybierz certyfikowaną jakość <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"/></a>
        </div>
      </div>
    </section>
  );
};

const Unboxing: React.FC = () => {
  return (
    <section className="py-12 px-4 bg-white border-t border-gray-200">
      <div className="max-w-4xl mx-auto bg-blue-50 border-4 border-blue-200 rounded-3xl p-5 md:p-10">
        <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-6 md:mb-8 flex items-center justify-center uppercase"><Package className="mr-3 w-8 h-8 md:w-10 md:h-10 text-blue-600" /> Co otrzymasz do domu</h3>
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-10">
            <div className="w-full md:w-1/2">
                <div className="aspect-square bg-white rounded-2xl shadow-lg border-2 border-gray-200 overflow-hidden relative">
                    <img src="/images/ortopper-img/8-opt.png" alt="Zawartość opakowania topper" className="w-full h-full object-cover" />
                    <div className="absolute bottom-0 left-0 right-0 bg-blue-900 text-white text-xs md:text-sm p-2 md:p-3 text-center font-bold uppercase">Higienicznie pakowane próżniowo</div>
                </div>
            </div>
            <div className="w-full md:w-1/2 text-left">
                <ul className="space-y-4 font-bold text-gray-900 text-lg md:text-xl">
                    <li className="flex items-start bg-white p-4 rounded-xl shadow-sm border border-blue-100">
                        <span className="bg-blue-600 text-white rounded-full w-7 h-7 md:w-8 md:h-8 flex items-center justify-center text-sm md:text-lg mr-3 flex-shrink-0 font-black mt-0.5">✓</span>
                        <span className="leading-tight">1x Topper Ortopedyczny (wybrany rozmiar)</span>
                    </li>
                    <li className="flex items-start bg-white p-4 rounded-xl shadow-sm border border-blue-100">
                        <span className="bg-blue-600 text-white rounded-full w-7 h-7 md:w-8 md:h-8 flex items-center justify-center text-sm md:text-lg mr-3 flex-shrink-0 font-black mt-0.5">✓</span>
                        <span className="leading-tight">1x Pokrowiec Aloe Vera z zamkiem (już założony)</span>
                    </li>
                    <li className="flex items-start bg-white p-4 rounded-xl shadow-sm border border-blue-100">
                        <span className="bg-blue-600 text-white rounded-full w-7 h-7 md:w-8 md:h-8 flex items-center justify-center text-sm md:text-lg mr-3 flex-shrink-0 font-black mt-0.5">✓</span>
                        <span className="leading-tight">1x Wodoodporny ochraniac na materac z gumkami</span>
                    </li>
                    <li className="flex items-start bg-white p-4 rounded-xl shadow-sm border border-blue-100">
                        <span className="bg-blue-600 text-white rounded-full w-7 h-7 md:w-8 md:h-8 flex items-center justify-center text-sm md:text-lg mr-3 flex-shrink-0 font-black mt-0.5">✓</span>
                        <span className="text-blue-800 uppercase leading-tight">Oficjalna gwarancja 2 lata</span>
                    </li>
                </ul>
                <div className="mt-6 text-center md:text-left text-base md:text-lg text-blue-900 font-bold">
                    <span className="inline-block bg-blue-200 px-3 py-2 md:px-4 rounded-lg border border-blue-300 leading-tight">Darmowa wysyłka kurierska 24-48h</span>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

const Reviews: React.FC = () => {
  const reviews: (Testimonial & { image?: string })[] = [
    { id: 1, name: "Andrzej K.", city: "Warszawa", text: "Od lat cierpię na rwę kulszową. Mój fizjoterapeuta polecił wymianę materaca, ale był za drogi. Z tym topperem rozwiązałem 90% problemu. Rano mogę się schylić bez bólu. Niesamowite.", rating: 5 },
    { id: 2, name: "Maria W.", city: "Kraków", text: "Mam wypuklinę szyjną, która powodowała zawroty głowy po przebudzeniu. Od kiedy używam Toppera Ortopedycznego, szyja jest dużo bardziej zrelaksowana. Wsparcie jest zdecydowane, ale przyjemne.", rating: 5 },
    { id: 3, name: "Tomasz B.", city: "Gdańsk", text: "Pracuję w magazynie i wieczorem mam plecy w kawałkach. Ten topper dosłownie mnie odmładza. Czujesz, jak kręgosłup się rozciąga, gdy się położysz. Bardzo szybka wysyłka.", rating: 5, image: "/images/ortopper-img/recensione-1.jpg" },
    { id: 4, name: "Katarzyna M.", city: "Wrocław", text: "Byłam sceptyczna co do efektu 'masującego', ale to prawda. Mam problemy z krążeniem w nogach i budzę się dużo mniej opuchnięta. Falista powierzchnia przepuszcza powietrze.", rating: 5 },
    { id: 5, name: "Dr Stefan N.", city: "Poznań", text: "Kupiłem go dla mojej starszej mamy, która dużo czasu spędza w łóżku. Świetny do zapobiegania odleżynom i bólom uciskowym. Tkanina jest świeża i higieniczna. Polecam.", rating: 5 },
    { id: 6, name: "Barbara S.", city: "Łódź", text: "Mój materac stał się jedną wielką dziurą. Budziłam się z bólem nerek. Za 299 zł uniknęłam wydatku 2000 zł. Teraz kręgosłup jest prosty i śpię 8 godzin bez przerwy.", rating: 4 },
  ];

  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-3xl md:text-4xl font-black text-center text-gray-900 mb-4 uppercase leading-tight">Historie codziennego zdrowienia</h3>
        <p className="text-center text-gray-600 font-bold mb-10 md:mb-12 max-w-2xl mx-auto text-lg md:text-xl">Tysiące Polaków przestało żyć z bólem. Oto ich prawdziwe doświadczenia.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {reviews.map((r) => (
                <div key={r.id} className="bg-gray-50 p-6 md:p-8 rounded-2xl border-2 border-gray-100 shadow-sm relative hover:shadow-lg transition-shadow flex flex-col">
                    <Quote className="absolute top-4 right-4 md:top-6 md:right-6 text-gray-200 w-8 h-8 md:w-10 md:h-10 fill-current" />
                    <div className="flex text-yellow-400 mb-4">{[...Array(5)].map((_, i) => <Star key={i} className={`w-5 h-5 fill-current ${i >= r.rating ? 'text-gray-300' : ''}`} />)}</div>
                    <p className="text-gray-800 text-lg md:text-xl mb-6 font-medium leading-relaxed italic flex-grow">&quot;{r.text}&quot;</p>
                    {r.image && (<div className="mb-4 rounded-xl overflow-hidden border-2 border-blue-100"><img src={r.image} alt="Zdjęcie produktu klienta" className="w-full h-48 object-cover" /></div>)}
                    <div className="mt-auto flex items-center border-t border-gray-200 pt-4">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-black text-lg mr-4">{r.name.charAt(0)}</div>
                        <div>
                            <div className="text-base font-bold text-gray-900">{r.name} <span className="text-gray-500 font-normal">- {r.city}</span></div>
                            <div className="text-green-600 text-xs font-bold uppercase mt-1 flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span> Zweryfikowany zakup</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        <div className="text-center mt-10 md:mt-12">
             <a href="#order-form" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-black text-xl md:text-2xl py-5 px-10 md:px-12 rounded-xl shadow-xl uppercase tracking-wide transform transition hover:scale-105">Dołącz do śpiących bez bólu</a>
        </div>
      </div>
    </section>
  );
};

const OrderForm: React.FC<OrderFormProps> = ({ selectedSize, onSelectSize }) => {
  const router = useRouter();
  const { trackLeadEvent, saveUserData } = useFacebookTracking();
  const [formData, setFormData] = useState({ name: '', fullAddress: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const tmfpRef = useRef<HTMLInputElement>(null);
  const pageLoadTime = useRef(Date.now());

  const sizesMap: Record<BedSize, string> = {
    'Pojedynczy': '80x190',
    'Półtorak': '120x190',
    'Podwójny': '160x190',
    'King': '180x200'
  };

  // Load Network fingerprint script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://offers.uncappednetwork.com/forms/tmfp/';
    script.crossOrigin = 'anonymous';
    script.defer = true;
    document.head.appendChild(script);
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateForm({
      name: formData.name,
      phone: formData.phone,
      address: formData.fullAddress,
      countryCode: 'PL',
      productKey: 'ortopper_pl',
      pageLoadTime: pageLoadTime.current,
    });
    if (!validation.isValid) {
      alert(validation.error);
      return;
    }

    setIsSubmitting(true);

    // Get UTM params from URL
    const urlParams = new URLSearchParams(window.location.search);

    // Prepare form data for Network API
    const networkFormData = new FormData();
    networkFormData.append('uid', NETWORK_CONFIG.uid);
    networkFormData.append('key', NETWORK_CONFIG.key);
    networkFormData.append('offer', NETWORK_CONFIG.offer);
    networkFormData.append('lp', NETWORK_CONFIG.lp);
    networkFormData.append('name', formData.name);
    networkFormData.append('tel', formData.phone);
    networkFormData.append('street-address', formData.fullAddress);

    // Add fingerprint if available
    const tmfpValue = tmfpRef.current?.value || '';
    if (tmfpValue) {
      networkFormData.append('tmfp', tmfpValue);
    }

    // Add UTM params if present
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'subid', 'subid2', 'subid3', 'subid4', 'pubid'].forEach(param => {
      const value = urlParams.get(param);
      if (value) networkFormData.append(param, value);
    });

    let isDouble = false;
    try {
      // Send to Network API
      const response = await fetch('https://offers.uncappednetwork.com/forms/api/', {
        method: 'POST',
        body: networkFormData,
      });
      const data = await response.json();
      console.log('Network API response:', data);
      if (data.message === 'DOUBLE') {
        isDouble = true;
      }
    } catch (error) {
      console.error('Network API error:', error);
    }

    try {
      // Facebook Lead tracking (skip if DOUBLE)
      if (!isDouble) {
        const nameParts = formData.name.trim().split(' ');
        const nome = nameParts[0] || '';
        const cognome = nameParts.slice(1).join(' ') || '';

        const userData = {
          nome,
          cognome,
          telefono: formData.phone.trim(),
          indirizzo: formData.fullAddress.trim()
        };

        saveUserData(userData);

        // Track Lead event with Facebook
        await trackLeadEvent(userData, {
          content_name: PRODUCT_NAME,
          currency: 'PLN',
          value: PRICE
        });
      } else {
        console.log('⚠️ Skipping Facebook Lead tracking - DOUBLE from network');
        sessionStorage.setItem('skipFBPurchase', 'true');
      }

      // Store order data for TY page
      sessionStorage.setItem('orderData', JSON.stringify({
        name: formData.name,
        phone: formData.phone,
        address: formData.fullAddress,
        size: selectedSize,
        price: PRICE,
        currency: CURRENCY,
        product: PRODUCT_NAME
      }));

      // Redirect to FB thank you page
      router.push(THANK_YOU_PAGE);
    } catch (error) {
      console.error('Error submitting form:', error);
      // Still redirect on error
      router.push(THANK_YOU_PAGE);
    }
  };

  return (
    <section id="order-form" className="py-12 px-4 bg-blue-50 border-t-4 border-blue-600">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-300">
        <div className="bg-red-600 p-5 text-white text-center">
            <h2 className="text-2xl md:text-3xl font-black uppercase">FORMULARZ ZAMÓWIENIA</h2>
            <p className="text-sm md:text-base font-bold opacity-90 mt-1">Wypełnij, aby zablokować cenę {PRICE} {CURRENCY}</p>
        </div>
        <div className="flex justify-between px-2 md:px-4 py-6 bg-gray-50 border-b border-gray-200 text-center">
             <div className="flex-1 px-1">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto text-sm font-black mb-2 shadow-sm">1</div>
                <span className="text-xs md:text-sm font-bold text-gray-800 uppercase block leading-tight">Wypełnij</span>
             </div>
             <div className="flex-1 px-1 border-l border-gray-200">
                <div className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center mx-auto text-sm font-black mb-2 shadow-sm">2</div>
                <span className="text-xs md:text-sm font-bold text-gray-500 uppercase block leading-tight">Potwierdź</span>
             </div>
             <div className="flex-1 px-1 border-l border-gray-200">
                <div className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center mx-auto text-sm font-black mb-2 shadow-sm">3</div>
                <span className="text-xs md:text-sm font-bold text-gray-500 uppercase block leading-tight">Zapłać przy odbiorze</span>
             </div>
        </div>
        <form onSubmit={handleSubmit} className="p-5 md:p-8 space-y-6">
            {/* Hidden fingerprint field for Network tracking */}
            <input type="hidden" name="tmfp" ref={tmfpRef} />
            <div className="bg-yellow-50 border-2 border-yellow-200 p-4 md:p-5 rounded-lg mb-4 shadow-sm">
                <label className="block text-sm font-black text-gray-800 uppercase mb-3">Potwierdź rozmiar:</label>
                <div className="flex flex-wrap gap-2">
                    {(Object.keys(sizesMap) as BedSize[]).map((size) => (
                        <button type="button" key={size} onClick={() => onSelectSize(size)} className={`text-sm font-bold py-3 px-3 rounded border transition-colors flex-grow md:flex-grow-0 text-center ${selectedSize === size ? 'bg-blue-600 text-white border-blue-600 ring-2 ring-blue-200 shadow-md' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100'}`}>
                                {size} <span className="opacity-80 text-xs block font-normal mt-0.5">{sizesMap[size]}</span>
                            </button>
                    ))}
                </div>
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-yellow-200">
                    <span className="text-sm font-bold text-gray-600">Wybrany rozmiar: <strong className="text-gray-900 block md:inline">{selectedSize}</strong></span>
                    <span className="text-green-700 font-black text-xl">{PRICE} {CURRENCY}</span>
                </div>
            </div>
            <div>
                <label className="block text-base font-bold text-gray-900 mb-2">Imię i Nazwisko*</label>
                <input required name="name" onChange={handleChange} type="text" placeholder="Np. Jan Kowalski" className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none bg-gray-50 font-medium text-lg shadow-sm placeholder-gray-400" />
            </div>
            <div>
                <label className="block text-base font-bold text-gray-900 mb-2">Pełny Adres (Ulica, Nr, Miasto, Kod)*</label>
                <input required name="fullAddress" onChange={handleChange} type="text" placeholder="Np. ul. Warszawska 10, Kraków, 30-001" className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none bg-gray-50 font-medium text-lg shadow-sm placeholder-gray-400" />
            </div>
            <div>
                <label className="block text-base font-bold text-gray-900 mb-2 text-red-700">Numer Telefonu*</label>
                <input required name="phone" onChange={handleChange} type="tel" placeholder="Np. 500 123 456" className="w-full p-4 border-2 border-yellow-400 bg-yellow-50 rounded-lg focus:border-blue-500 outline-none font-bold text-xl text-gray-900 shadow-sm placeholder-gray-400" />
                <p className="text-xs text-gray-500 mt-2 font-medium">Kurier zadzwoni pod ten numer w sprawie dostawy.</p>
            </div>
            <button type="submit" disabled={isSubmitting} className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-black text-xl md:text-3xl py-5 rounded-xl shadow-xl mt-6 border-b-8 border-green-800 transform transition active:scale-95 uppercase flex items-center justify-center group">
                {isSubmitting ? 'WYSYŁANIE...' : 'POTWIERDŹ ZAMÓWIENIE'} <Lock className="ml-3 w-6 h-6 md:w-8 md:h-8 opacity-90 group-hover:opacity-100"/>
            </button>
            <p className="text-center text-xs md:text-sm text-gray-500 font-semibold mt-4">Klikając potwierdzasz zakup. Zapłacisz gotówką kurierowi.</p>
            <div className="flex justify-center gap-2 md:gap-4 pt-6 border-t border-gray-100 flex-wrap">
                <div className="flex items-center text-xs md:text-sm text-gray-600 font-bold"><ShieldCheck className="w-4 h-4 md:w-5 md:h-5 mr-1 text-blue-600"/> Bezpieczne dane</div>
                <div className="flex items-center text-xs md:text-sm text-gray-600 font-bold"><Truck className="w-4 h-4 md:w-5 md:h-5 mr-1 text-green-600"/> Szybka wysyłka</div>
                <div className="flex items-center text-xs md:text-sm text-gray-600 font-bold"><Lock className="w-4 h-4 md:w-5 md:h-5 mr-1 text-gray-600"/> Bez karty</div>
            </div>
        </form>
      </div>
    </section>
  );
};

const FAQ: React.FC = () => {
  const faqs: FaqItem[] = [
    { question: "Mam przepuklinę dyskową / rwę kulszową, czy może mi pomóc?", answer: "Tak, został zaprojektowany specjalnie dla osób z problemami kręgosłupa. Struktura z Memory Foam HD przyjmuje naturalne krzywizny pleców, zmniejszając ucisk na dyski kręgowe i łagodząc stan zapalny nerwu kulszowego." },
    { question: "Dlaczego wszystkie rozmiary kosztują tyle samo?", answer: "Żadnego haczyka. Aby szybko zwolnić magazyn i zrobić miejsce na nowe dostawy, postanowiliśmy zastosować cenę bazową (Pojedynczego) do wszystkich rozmiarów, w tym Podwójnych i King Size. To korzyść dla klienta do wyczerpania zapasów." },
    { question: "Czy jest za miękki? Boję się, że zapadnę.", answer: "Absolutnie nie. Używamy Memory o wysokiej gęstości, który oferuje 'progresywne wsparcie'. Przyjmuje ciało, ale zdecydowanie podtrzymuje wagę, utrzymując kręgosłup prosty. To nie jest zwykła miękka pianka." },
    { question: "Czy pomaga też na kark?", answer: "Oczywiście. Prawidłowo wyrównując kręgosłup od ramion do miednicy, pozwala również odcinkowi szyjnemu się zrelaksować, redukując napięcia w szyi i poranne bóle głowy." },
    { question: "Czy powoduje pocenie latem?", answer: "Nie. Powierzchnia 'falista' służy nie tylko do masażu, ale tworzy kanały powietrzne, które oddzielają ciało od materiału. Powietrze swobodnie cyrkuluje, odprowadzając wilgoć i ciepło." },
    { question: "Czy nadaje się na mój stary materac?", answer: "To idealne rozwiązanie. Topper koryguje wady starego materaca (dziury, kłujące sprężyny, twardą powierzchnię), przywracając ortopedyczne miejsce do spania bez kupowania nowego materaca." },
    { question: "Czy mogę zapłacić przy odbiorze?", answer: "Tak, oferujemy bezpłatną płatność gotówką przy odbiorze (za pobraniem), aby zapewnić maksymalne bezpieczeństwo i spokój przy zakupie." },
  ];

  return (
    <section className="py-16 px-4 bg-gray-50 max-w-4xl mx-auto">
      <h3 className="text-3xl font-black text-center text-gray-900 mb-10 flex items-center justify-center uppercase"><HelpCircle className="mr-3 w-8 h-8 text-blue-600" /> Często Zadawane Pytania</h3>
      <div className="space-y-4">
        {faqs.map((faq, idx) => (
            <details key={idx} className="group bg-white border-2 border-gray-200 rounded-xl open:ring-4 open:ring-blue-50 transition-all">
                <summary className="flex cursor-pointer list-none items-center justify-between p-6 font-bold text-gray-900 text-lg md:text-xl hover:bg-gray-50">
                    <div className="flex items-center"><Activity className="w-6 h-6 text-blue-500 mr-3 flex-shrink-0" />{faq.question}</div>
                    <span className="transition-transform duration-300 group-open:rotate-180"><ChevronDown className="w-6 h-6 text-gray-400 group-hover:text-gray-600"/></span>
                </summary>
                <div className="px-6 pb-6 text-gray-700 text-lg leading-relaxed border-t border-gray-100 pt-4 pl-14 font-medium">{faq.answer}</div>
            </details>
        ))}
      </div>
    </section>
  );
};

// --- STICKY BAR COMPONENT ---
const StickyOrderBar: React.FC<{ onCtaClick: () => void }> = ({ onCtaClick }) => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 shadow-[0_-5px_20px_rgba(0,0,0,0.15)] p-2 z-50 md:hidden pb-safe">
      <div className="flex items-center gap-2">
        <div className="flex-1 pl-1">
          <div className="text-[10px] text-red-600 font-black uppercase flex items-center mb-0.5 animate-pulse">
            🔥 WYPRZEDAŻ - DO WYCZERPANIA ZAPASÓW
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-[#dc3545]">{PRICE} {CURRENCY}</span>
            <span className="text-xs text-slate-400 line-through">{PRICE_OLD} {CURRENCY}</span>
          </div>
        </div>
        <button
          onClick={onCtaClick}
          className="flex-1 bg-[#27ae60] text-white font-black text-lg py-3 px-2 rounded shadow-lg animate-pulse uppercase leading-none"
        >
          ZAMÓW TERAZ
          <span className="block text-[10px] font-medium opacity-80 mt-1">PŁATNOŚĆ PRZY ODBIORZE</span>
        </button>
      </div>
    </div>
  );
};

// --- MAIN PAGE COMPONENT ---
export default function LandingPage() {
  const [selectedSize, setSelectedSize] = useState<BedSize>('Podwójny');

  const scrollToOrder = () => {
    const element = document.getElementById('order-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans scroll-smooth text-gray-900 pb-24 md:pb-0">
      {/* Network Click Pixel */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="https://offers.uncappednetwork.com/forms/api/ck/?o=3042&uid=4a2b2107-ba63-494f-b762-41120bde0c94&lp=3076" style={{width:'1px',height:'1px',display:'none'}} alt="" />
      <Hero selectedSize={selectedSize} onSelectSize={setSelectedSize} />
      <ProblemSolution />
      <Mechanism />
      <BenefitsList />
      <Installation />
      <Comparison />
      <Unboxing />
      <Reviews />
      <OrderForm selectedSize={selectedSize} onSelectSize={setSelectedSize} />
      <FAQ />

      {/* Footer legale */}
      <div className="bg-gray-100 border-t border-gray-200 py-4 text-center">
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Ortopper®</span> jest zarejestrowanym znakiem towarowym sprzedawanym wyłącznie przez{" "}
          <span className="font-semibold">Ionizi</span>
        </p>
      </div>

      {/* Sticky bar mobile */}
      <StickyOrderBar onCtaClick={scrollToOrder} />
    </div>
  );
}
