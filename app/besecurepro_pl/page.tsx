
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Zap, Star, CheckCircle, XCircle, ArrowRight, AlertTriangle, Clock, ShieldCheck, Eye, BellRing, PhoneCall, Radio, HelpCircle, ChevronDown, Package, BadgeCheck, Truck, Wifi, Signal, Battery, Cloud, Play, Pause, SkipBack, SkipForward, HardDrive, Camera, Smartphone, ScanFace, Maximize, Moon, Mic, Volume2, Factory, Square, Key, Link, Mail } from 'lucide-react';
import { features, promoItems, whatHappensSteps, comparisonData, faqs, productImages, hardwareSpecs } from './constants';
import LeadForm from './components/LeadForm';
import TestimonialsSlider from './components/TestimonialsSlider';
import InstallationGuide from './components/InstallationGuide';

// Simple FAQ Component within App for simplicity/speed
const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-16 bg-white border-t border-gray-100 mt-8">
            <div className="max-w-4xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-[#1a2744]">Najczęściej Zadawane Pytania</h2>
                    <p className="text-gray-600 mt-2">Wszystko, co musisz wiedzieć przed zamówieniem.</p>
                </div>
                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <div key={i} className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-gray-50 transition-colors"
                            >
                                <span className="font-bold text-[#1a2744] text-lg pr-4">{faq.question}</span>
                                <ChevronDown className={`transform transition-transform duration-300 text-gray-400 ${openIndex === i ? 'rotate-180' : ''}`} />
                            </button>
                            <AnimatePresence>
                                {openIndex === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="bg-gray-50"
                                    >
                                        <div className="p-5 pt-0 text-gray-600 leading-relaxed border-t border-gray-100 mt-2">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  // Countdown timer logic for sticky bar (reset every 15 mins for urgency)
  const [timeLeft, setTimeLeft] = useState({ m: 14, s: 59 });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const timer = setInterval(() => {
        setTimeLeft(prev => {
            if (prev.s === 0) {
                if (prev.m === 0) return { m: 14, s: 59 };
                return { m: prev.m - 1, s: 59 };
            }
            return { ...prev, s: prev.s - 1 };
        });
    }, 1000);

    return () => {
        window.removeEventListener('resize', checkMobile);
        clearInterval(timer);
    };
  }, []);

  const scrollToOrderForm = () => {
    window.dispatchEvent(new Event('openOrderForm'));
    setTimeout(() => {
        const orderForm = document.getElementById('order-form');
        if (orderForm) {
            orderForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, 100);
  };

  return (
    <div className="overflow-x-hidden w-full max-w-full">
    <main className="min-h-screen bg-white font-inter text-[#1a2744] overflow-x-hidden max-w-[100vw]">

      {/* Sticky Order Bar - Optimized for Demand Gen Urgency */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#1a2744] shadow-[0_-4px_20px_rgba(0,0,0,0.2)]">
        <div className="max-w-7xl mx-auto w-full px-3 py-3 flex items-center justify-between">
          <div className="flex flex-col md:flex-row md:items-center md:gap-4">
             <div className="flex items-center gap-1 md:gap-2 text-white/90 text-[10px] md:text-sm font-medium mb-1 md:mb-0">
                <Clock size={12} className="text-yellow-400 flex-shrink-0" />
                <span className="whitespace-nowrap">Oferta kończy się: <span className="text-yellow-400 font-mono font-bold">{timeLeft.m}:{timeLeft.s < 10 ? `0${timeLeft.s}` : timeLeft.s}</span></span>
             </div>
             <div className="flex items-baseline gap-2">
                <span className="bg-red-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded">-50%</span>
                <p className="text-white font-extrabold text-xl">429 zł</p>
                <p className="text-gray-400 text-xs line-through">858 zł</p>
             </div>
          </div>
          <button
            onClick={scrollToOrderForm}
            className="bg-[#10b981] hover:bg-[#059669] text-white font-bold py-2 px-4 md:py-2.5 md:px-6 rounded-full text-xs md:text-base shadow-lg shadow-green-900/20 transition-all cursor-pointer whitespace-nowrap active:scale-95 flex-shrink-0"
          >
            ZAMÓW
          </button>
        </div>
      </div>

      {/* Navbar Minimal */}
      <nav className="border-b border-gray-100 py-4 bg-white sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
                <Shield className="fill-blue-600 text-blue-600" size={28} />
                <span className="font-extrabold text-xl tracking-tight text-[#1a2744]">BeSecure<span className="text-blue-600">Pro</span></span>
            </div>
            <div className="hidden md:flex items-center gap-4 text-sm font-medium text-gray-600">
                <span className="flex items-center gap-1 text-green-600 font-bold bg-green-50 px-2 py-1 rounded-full text-xs uppercase tracking-wide"><Radio size={14} className="animate-pulse"/> Dostępny Teraz</span>
            </div>
        </div>
      </nav>

      {/* EMERGENCY BANNER - HOLIDAY SEASON */}
      <div className="bg-yellow-400 text-[#1a2744] py-2 md:py-3 px-3 md:px-4 text-center font-bold text-[11px] md:text-base border-b-2 border-yellow-500 shadow-sm relative z-30">
        <div className="flex items-center justify-center gap-1.5 md:gap-2 animate-pulse">
            <AlertTriangle size={16} className="fill-current text-black flex-shrink-0" />
            <span className="leading-tight">ALERT: Grudzień = rekord włamań. Zabezpiecz się!</span>
        </div>
      </div>

      {/* 1. Hero Section - ATTENTION */}
      <section className="bg-gradient-to-b from-blue-50 via-white to-white relative overflow-hidden pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">

            {/* Copy Side */}
            <div className="flex flex-col justify-center order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* SOCIAL PROOF */}
                <div className="flex items-center gap-2 md:gap-4 mb-6 bg-white p-2 rounded-full shadow-sm w-fit pr-4 md:pr-6 border border-gray-100">
                    <div className="flex -space-x-2 md:-space-x-3">
                        <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64" alt="Klient" className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white object-cover" />
                        <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=64&h=64" alt="Klient" className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white object-cover" />
                        <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=64&h=64" alt="Klient" className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white object-cover" />
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[10px] md:text-xs font-bold text-gray-500">+15k</div>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex items-center gap-0.5">
                            <Star size={12} className="fill-yellow-400 text-yellow-400" />
                            <Star size={12} className="fill-yellow-400 text-yellow-400" />
                            <Star size={12} className="fill-yellow-400 text-yellow-400" />
                            <Star size={12} className="fill-yellow-400 text-yellow-400" />
                            <Star size={12} className="fill-yellow-400 text-yellow-400" />
                        </div>
                        <p className="text-[10px] md:text-xs text-gray-600 font-bold">15 420+ Rodzin</p>
                    </div>
                </div>

                <div className="inline-flex items-center gap-2 bg-yellow-400 text-[#1a2744] px-3 py-1.5 rounded-full text-xs md:text-sm font-bold mb-6 shadow-md w-fit">
                  <Zap className="fill-current" size={16} />
                  BeSecure Pro
                </div>

                <h1 className="text-3xl md:text-5xl lg:text-6xl font-black mb-6 leading-[1.1] text-[#1a2744] tracking-tight">
                  Nie czekaj, aż będzie <span className="text-blue-600">za późno</span>.<br/>
                  Chroń bliskich już dziś.
                </h1>

                <p className="text-base md:text-lg text-gray-600 mb-6 leading-relaxed max-w-lg">
                  <strong>4 mikrokamery 4K</strong>, 4 czujniki drzwi, pilot, syrena, automatyczne wezwanie służb i natychmiastowe powiadomienia. <strong>Wszystko bez miesięcznych opłat.</strong>
                </p>

                {/* Trust Badges */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="flex items-center gap-2 bg-white border border-gray-200 p-2 rounded-lg shadow-sm">
                        <BadgeCheck className="text-green-500" size={20} />
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-gray-800">GWARANCJA POLSKA</span>
                            <span className="text-[10px] text-gray-500">2 Lata + Wsparcie</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 bg-white border border-gray-200 p-2 rounded-lg shadow-sm">
                        <Truck className="text-blue-500" size={20} />
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-gray-800">WYSYŁKA 24H</span>
                            <span className="text-[10px] text-gray-500">Płatność Przy Odbiorze</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap gap-4">
                    <button onClick={scrollToOrderForm} className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-full text-lg shadow-xl shadow-red-600/30 transition-transform hover:scale-105 active:scale-95 flex-1 md:flex-none whitespace-nowrap cursor-pointer">
                        CHROŃ MÓJ DOM
                    </button>
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-500 px-4">
                        <CheckCircle size={16} className="text-green-500" />
                        <span>Bez Abonamentu</span>
                    </div>
                </div>

              </motion.div>
            </div>

            {/* Visual Hook - ONLY KIT PRODUCT (Tangibility Focus) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:order-2 flex flex-col items-center justify-center relative"
            >
               {/* Glowing Background Effect */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-500/10 rounded-full blur-3xl -z-10 animate-pulse"></div>

               <div className="relative w-full max-w-lg mx-auto z-10">
                    <div className="p-2 rounded-3xl transform hover:scale-105 transition-transform duration-500">
                        <img
                            src={productImages.kit}
                            alt="Kompletny Zestaw Bezpieczeństwa"
                            className="w-full h-auto rounded-2xl shadow-2xl shadow-blue-900/20 object-cover aspect-[4/3] border-4 border-white"
                        />
                         <div className="absolute -bottom-4 -right-2 md:-bottom-6 md:-right-6 bg-yellow-400 text-[#1a2744] font-black px-4 py-2 md:px-6 md:py-3 rounded-xl shadow-lg transform rotate-[-3deg] border-2 border-white">
                            <div className="absolute -top-2 right-1 bg-red-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full shadow-lg">
                                -50%
                            </div>
                            <div className="text-[8px] md:text-[10px] uppercase font-bold text-[#1a2744]/70 mb-0.5 flex items-center gap-1">
                                <Factory size={10} /> Cena Fabryczna
                            </div>
                            <span className="text-2xl md:text-3xl">429 zł</span>
                        </div>
                    </div>
               </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 2. AGITATION / FEAR */}
      <section className="py-16 md:py-24 bg-[#0f172a] text-white relative overflow-hidden">
        {/* Red glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-900/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block py-1 px-3 rounded bg-red-600/20 text-red-400 text-xs font-bold uppercase tracking-widest mb-4 border border-red-900">
                Tryb Awaryjny Aktywny
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Masz 7 sekund, żeby ich powstrzymać.
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Większość włamań dzieje się, gdy jesteś w pracy lub na wakacjach. Nasz system ostrzega Cię ZANIM zdążą wyważyć zamek.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whatHappensSteps.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-xl overflow-hidden hover:border-red-500/50 transition-colors group"
              >
                <div className="relative h-48 overflow-hidden">
                    <img
                        src={item.image}
                        alt={item.imageAlt}
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                    <div className="absolute top-4 left-4 w-10 h-10 bg-red-600 rounded flex items-center justify-center font-bold text-xl shadow-lg shadow-red-900/50">
                        {item.step}
                    </div>
                </div>
                <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-red-400 transition-colors">{item.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed" dangerouslySetInnerHTML={{__html: item.desc}}></p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. VISUAL SOLUTION */}
      <section className="py-12 bg-gray-50 border-y border-gray-200">
         <div className="max-w-7xl mx-auto px-4">
             <div className="text-center mb-10">
                 <h2 className="text-2xl md:text-3xl font-bold text-[#1a2744]">Twoje Czujne Oko 24/7</h2>
                 <p className="text-gray-600 mt-2">Podczas gdy inne alarmy tylko dzwonią, BeSecure Pro pozwala Ci WIDZIEĆ.</p>
             </div>

             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { title: "Salon", img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=400&q=80", status: "BEZPIECZNY" },
                    { title: "Wejście", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80", status: "BEZPIECZNY" },
                    { title: "Ogród", img: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?auto=format&fit=crop&w=400&q=80", status: "RUCH", alert: true },
                    { title: "Garaż", img: "/images/besecurepro img/cam 4 garage.png", status: "BEZPIECZNY" },
                ].map((cam, i) => (
                    <div key={i} className={`relative rounded-xl overflow-hidden aspect-video shadow-md ${cam.alert ? 'ring-4 ring-red-500 animate-pulse' : ''}`}>
                        <img src={cam.img} className="w-full h-full object-cover" alt={cam.title} />
                        <div className="absolute top-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded backdrop-blur-sm">
                            KAM 0{i+1} - {cam.title}
                        </div>
                        <div className="absolute top-2 right-2 bg-blue-600 text-white text-[8px] font-bold px-1.5 py-0.5 rounded">
                            4K
                        </div>
                        <div className={`absolute bottom-2 right-2 text-[10px] px-2 py-0.5 rounded font-bold ${cam.alert ? 'bg-red-600 text-white' : 'bg-green-500 text-white'}`}>
                            {cam.status}
                        </div>
                    </div>
                ))}
             </div>
             <p className="text-center text-sm text-gray-500 mt-6 italic">
                *Prawdziwe zrzuty ekranu z interfejsu użytkownika. Możesz podłączyć do 10 kamer.
             </p>
         </div>
      </section>

      {/* 4. THE TOOL / HARDWARE SHOWCASE */}
      <section className="pt-12 bg-white border-b border-gray-100 overflow-hidden">
         <div className="max-w-7xl mx-auto px-4">
             <div className="text-center mb-16">
                 <h2 className="text-2xl md:text-3xl font-bold text-[#1a2744]">Małe. Potężne. Niewidoczne.</h2>
                 <p className="text-gray-600 mt-2">Technologia, która wtapia się w Twoje wnętrze. Ty ją kontrolujesz, inni jej nie widzą.</p>
             </div>

             <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto pb-12">
                 {/* Visual Composition: Phone (Left/Overlapping) + Camera (Right/Main) */}
                 <div className="relative h-[400px] md:h-[500px] flex items-center justify-center lg:justify-end">

                     {/* THE CAMERA (Background/Main) */}
                     <div className="relative z-10 w-[70%] ml-auto shadow-2xl rounded-2xl border border-gray-100 bg-white">
                        <img
                            src={productImages.camera}
                            alt="Szczegóły Kamery"
                            className="w-full h-full object-cover rounded-2xl"
                        />
                        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg text-xs font-bold text-[#1a2744] flex items-center gap-2 shadow-sm">
                            <Maximize size={14}/> 5cm
                        </div>
                     </div>

                     {/* THE PHONE (Foreground/Left/Overlapping) - REBUILT AS ACTION MODE UI */}
                     <div className="absolute left-0 bottom-0 md:bottom-10 z-20 w-[45%] md:w-[40%] transform -translate-x-4 md:-translate-x-10 translate-y-4">
                        <div className="bg-black rounded-[2rem] border-[6px] border-gray-900 shadow-[0_20px_50px_rgba(0,0,0,0.4)] overflow-hidden">
                            {/* Action Mode Screen UI */}
                            <div className="bg-gray-900 aspect-[9/19] flex flex-col relative overflow-hidden">

                                {/* Header Alert */}
                                <div className="bg-red-600 text-white p-2 pt-3 text-center animate-pulse">
                                    <div className="flex items-center justify-center gap-1">
                                        <AlertTriangle size={14} className="fill-white text-red-600"/>
                                        <span className="text-[10px] font-black uppercase tracking-wider">WYKRYTO WŁAMANIE</span>
                                    </div>
                                </div>

                                {/* Camera Feed */}
                                <div className="relative flex-grow bg-gray-800 max-h-[60%] overflow-hidden">
                                     <img
                                        src="/images/besecurepro img/RILEVATA INTRUSIONE.png"
                                        className="w-full h-full object-cover opacity-80"
                                        alt="Obraz Intruza"
                                    />
                                    {/* Face Tracking Box */}
                                    <div className="absolute top-1/4 left-1/3 w-16 h-16 border-2 border-red-500 rounded-sm">
                                        <div className="absolute -top-4 left-0 bg-red-500 text-white text-[8px] font-bold px-1">OSOBA</div>
                                    </div>

                                    {/* NEW: VISUAL BADGE FOR AUTO-TRACKING */}
                                    <div className="absolute top-2 left-2 bg-green-500 text-white text-[8px] px-1.5 py-0.5 rounded shadow-sm font-bold flex items-center gap-1 animate-pulse">
                                        <ScanFace size={8} /> ŚLEDZENIE AKTYWNE
                                    </div>

                                    <div className="absolute top-2 right-2 flex flex-col gap-1">
                                        <div className="bg-black/50 text-white text-[8px] px-1 rounded backdrop-blur border border-white/20">NAG ●</div>
                                        <div className="bg-black/50 text-white text-[8px] px-1 rounded backdrop-blur border border-white/20">LIVE</div>
                                    </div>
                                </div>

                                {/* Action Buttons Area */}
                                <div className="bg-gray-900 p-3 space-y-2 relative z-10 border-t border-gray-800">
                                    <div className="flex gap-2">
                                        <button className="flex-1 bg-red-600 text-white py-3 rounded-lg flex flex-col items-center justify-center gap-0.5 shadow-lg active:scale-95 transition-transform border border-red-500">
                                            <PhoneCall size={18} className="fill-white"/>
                                            <span className="text-[9px] font-black">SOS</span>
                                        </button>
                                        <button className="flex-1 bg-yellow-400 text-black py-3 rounded-lg flex flex-col items-center justify-center gap-0.5 shadow-lg active:scale-95 transition-transform border border-yellow-300">
                                            <Volume2 size={18} className="fill-black"/>
                                            <span className="text-[9px] font-black">SYRENA</span>
                                        </button>
                                    </div>
                                    <button className="w-full bg-white/10 text-white py-2 rounded-lg flex items-center justify-center gap-2 border border-white/20 active:bg-white/20">
                                        <Mic size={14} /> <span className="text-[10px] font-bold">MÓWI (GŁOS)</span>
                                    </button>
                                </div>

                            </div>
                        </div>
                     </div>

                 </div>

                 {/* Specs Grid */}
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {hardwareSpecs.map((spec, i) => (
                        <div key={i} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors">
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-600 shadow-sm border border-gray-100">
                                {spec.icon}
                            </div>
                            <div>
                                <div className="text-xs text-gray-500 uppercase font-semibold">{spec.title}</div>
                                <div className="text-sm font-bold text-[#1a2744]">{spec.value}</div>
                            </div>
                        </div>
                    ))}
                    <div className="col-span-1 sm:col-span-2 mt-4 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                        <h4 className="font-bold text-[#1a2744] flex items-center gap-2 mb-2">
                            <Smartphone className="text-blue-600" size={20}/>
                            Automatyczna Instalacja (Zero Kabli)
                        </h4>
                        <p className="text-sm text-gray-600 leading-relaxed mb-3">
                            Bez techników. <strong>4 kamery</strong> i czujniki są już <strong>sparowane</strong> z centralą. Włączasz i działają automatycznie.
                        </p>
                    </div>
                 </div>
             </div>
         </div>
      </section>

      {/* 5. MILITARY TECH / VALUE STACK (MOVED HERE FOR VISIBILITY) */}
      <section className="py-16 bg-gradient-to-b from-white to-blue-50 relative border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a2744] mb-4">
              Technologia Wojskowa dostępna dla każdego
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Wzięliśmy technologię z systemów za 8000 zł i uczyniliśmy ją przystępną i prostą.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {features.map((device, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group"
              >
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    {device.icon}
                </div>
                <h3 className="text-lg font-bold text-[#1a2744] mb-2">{device.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{device.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. ECOSYSTEM (Sensors & Logic) */}
      <section className="py-16 bg-blue-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-[#1a2744] mb-4">Jeden Klik. Wszystko Aktywne.</h2>
                    <p className="text-gray-600 mb-8 leading-relaxed">
                        Wszystko komunikuje się idealnie przez <strong>WiFi lub dołączoną kartę SIM</strong>. Naciśnij przycisk na <strong>PILOCIE W ZESTAWIE</strong> (lub w aplikacji) i wchodzisz w tryb "Twierdza".
                    </p>

                    {/* The "Door Sensor" Focus Block */}
                    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 mb-6">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="bg-red-100 p-2 rounded-lg text-red-600"><Square size={24}/></div>
                            <h3 className="font-bold text-[#1a2744]">Czujniki Drzwi w Zestawie (4 Sztuki)</h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">
                            Przyklejasz dwa magnesy na drzwiach. <strong>Gdy tylko się rozłączą (otwarcie)</strong> natychmiast uruchamia się syrena i telefon.
                        </p>
                        <div className="flex items-center gap-2 text-xs text-green-600 bg-green-50 w-fit px-2 py-1 rounded font-bold">
                            <Battery size={12}/> Bateria długowieczna (5 Lat)
                        </div>
                    </div>

                    {/* Activation Flow */}
                    <div className="space-y-4">
                         <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">1</div>
                            <p className="text-sm text-gray-700">Aktywujesz alarm pilotem wychodząc z domu.</p>
                         </div>
                         <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">2</div>
                            <p className="text-sm text-gray-700">4 kamery nagrywają + czujniki drzwi są uzbrojone.</p>
                         </div>
                         <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">3</div>
                            <p className="text-sm text-gray-700">Jeśli coś się wydarzy, system natychmiast do Ciebie dzwoni.</p>
                         </div>
                    </div>
                </div>

                {/* Battery / Maintenance Card */}
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                    <h3 className="font-bold text-xl text-[#1a2744] mb-6 flex items-center gap-2">
                        <Battery className="text-green-500"/> Baterie i Konserwacja
                    </h3>

                    <div className="space-y-6">
                        <div className="flex gap-4 items-start">
                            <div className="bg-gray-100 p-2 rounded-lg"><Camera size={20} className="text-gray-600"/></div>
                            <div>
                                <h4 className="font-bold text-[#1a2744] text-sm">4x Mikrokamery</h4>
                                <p className="text-xs text-gray-500 mt-1">Akumulator litowy do ładowania. <strong>Autonomia 5 Miesięcy.</strong> Ładujesz kablem USB (w zestawie) jak telefon.</p>
                            </div>
                        </div>

                        <div className="flex gap-4 items-start">
                            <div className="bg-gray-100 p-2 rounded-lg"><Square size={20} className="text-gray-600"/></div>
                            <div>
                                <h4 className="font-bold text-[#1a2744] text-sm">Czujniki, Syrena i Pilot</h4>
                                <p className="text-xs text-gray-500 mt-1">Bateria guzikowa długowieczna. <strong>Autonomia 5 LAT.</strong> Łatwa wymiana (dostępne wszędzie).</p>
                            </div>
                        </div>

                        <div className="mt-4 p-4 bg-green-50 rounded-xl border border-green-100 text-center">
                            <p className="text-sm font-bold text-green-700">Wszystko w Zestawie</p>
                            <p className="text-xs text-green-600">Nie musisz nic dokupować.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* 7. ANTI-SABOTAGE / OBJECTIONS */}
      <section className="py-12 bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4">
             <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
                 <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-center">
                     <div className="flex-1">
                         <h3 className="text-xl font-bold text-[#1a2744] mb-3 flex items-center gap-2">
                             <Wifi className="text-red-500"/> "A jeśli wyłączą prąd lub internet?"
                         </h3>
                         <p className="text-gray-600 text-sm leading-relaxed mb-4">
                             To pierwsza rzecz, którą robią doświadczeni złodzieje. Ale z BeSecure Pro to nie zadziała.
                         </p>
                         <ul className="space-y-2">
                             <li className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                 <Battery size={16} className="text-green-500"/> Bateria Zapasowa (12h dodatkowej autonomii)
                             </li>
                             <li className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                 <Signal size={16} className="text-blue-500"/> Karta SIM 4G w Zestawie (Działa bez WiFi)
                             </li>
                         </ul>
                     </div>
                     <div className="w-px h-32 bg-gray-100 hidden md:block"></div>
                     <div className="flex-1">
                         <h3 className="text-xl font-bold text-[#1a2744] mb-3 flex items-center gap-2">
                             <Cloud className="text-blue-500"/> "Gdzie trafiają nagrania?"
                         </h3>
                         <p className="text-gray-600 text-sm leading-relaxed mb-4">
                             "A jeśli ukradną mi kamerę?". Nie ma znaczenia.
                         </p>
                         <ul className="space-y-2">
                             <li className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                 <HardDrive size={16} className="text-gray-500"/> Karta SD 128GB (Nagrywa 24/7)
                             </li>
                             <li className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                 <Cloud size={16} className="text-blue-500"/> Backup w Chmurze (Dowody są bezpieczne)
                             </li>
                         </ul>
                     </div>
                 </div>
             </div>
        </div>
      </section>

      {/* 8. COMPARISON TABLE */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-[#1a2744] mb-10">
            Dlaczego wszyscy wybierają BeSecure Pro?
          </h2>
          <div className="overflow-hidden rounded-xl border border-gray-200 shadow-lg">
            <table className="w-full text-sm md:text-base">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-4 text-left text-gray-500 font-medium">Cecha</th>
                  <th className="p-4 text-center font-bold text-[#1a2744] bg-blue-50 w-1/3 border-t-4 border-blue-500">MY</th>
                  <th className="p-4 text-center text-gray-400 font-normal w-1/3">Inni</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {comparisonData.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-medium text-gray-700">{row.feature}</td>
                    <td className="p-4 text-center bg-blue-50/30 font-bold text-[#1a2744]">
                        {typeof row.us === 'boolean' ? (
                            <CheckCircle className="inline text-green-500" size={20} />
                        ) : row.us}
                    </td>
                    <td className="p-4 text-center text-gray-400">
                        {typeof row.them === 'boolean' ? (
                            <XCircle className="inline text-gray-300" size={20} />
                        ) : row.them}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 9. INSTALLATION GUIDE */}
      <InstallationGuide onOrderClick={scrollToOrderForm} />

      {/* 10. TESTIMONIALS (MOVED UP) */}
      <TestimonialsSlider />

      {/* 11. UNBOXING / WHAT'S IN THE BOX (MOVED DOWN) */}
      <section className="py-16 bg-white border-t border-gray-200">
         <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-[#1a2744] mb-10">Co otrzymasz do domu</h2>
            <div className="bg-gray-50 rounded-3xl p-8 shadow-xl border border-gray-100 flex flex-col md:flex-row gap-10 items-center">
                <div className="w-full md:w-1/2">
                    <img
                        src={productImages.unboxing}
                        alt="Rozpakowywanie Zestawu"
                        className="w-full rounded-2xl shadow-lg hover:scale-[1.02] transition-transform duration-500"
                    />
                </div>
                <div className="w-full md:w-1/2">
                    <h3 className="text-xl font-bold text-[#1a2744] mb-6 flex items-center gap-2">
                        <Package className="text-blue-600"/> Kompletny Zestaw "Twierdza"
                    </h3>
                    <div className="grid grid-cols-1 gap-3">
                        {promoItems.map((item, i) => (
                            <div key={i} className="flex items-center gap-3 p-2 border-b border-gray-200 last:border-0">
                                <div className="text-blue-500">{item.icon}</div>
                                <div>
                                    <div className="font-bold text-sm text-[#1a2744]">{item.title}</div>
                                    <div className="text-xs text-gray-500">{item.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
         </div>
      </section>

      {/* FINAL CTA SECTION WITH ORDER INSTRUCTIONS */}
      <section className="py-16 bg-white pb-32">
        <div className="max-w-4xl mx-auto px-4">

            {/* NEW: HOW TO ORDER STEPS */}
            <div className="mb-12 text-center">
                <h2 className="text-2xl font-bold text-[#1a2744] mb-8">Jak zamówić w 4 krokach</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                    <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xl mb-3">1</div>
                        <div className="font-bold text-sm text-[#1a2744]">Wypełnij formularz</div>
                        <p className="text-xs text-gray-500 mt-1">Wpisz swoje dane poniżej</p>
                    </div>
                    <div className="flex flex-col items-center relative">
                         {/* Arrow connector for desktop */}
                         <div className="hidden md:block absolute top-6 -left-1/2 w-full h-0.5 bg-blue-100 -z-10"></div>
                        <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xl mb-3">2</div>
                        <div className="font-bold text-sm text-[#1a2744]">Poczekaj na Potwierdzenie</div>
                        <p className="text-xs text-gray-500 mt-1">Zadzwonimy aby potwierdzić</p>
                    </div>
                    <div className="flex flex-col items-center relative">
                        <div className="hidden md:block absolute top-6 -left-1/2 w-full h-0.5 bg-blue-100 -z-10"></div>
                        <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xl mb-3">3</div>
                        <div className="font-bold text-sm text-[#1a2744]">Szybka Wysyłka</div>
                        <p className="text-xs text-gray-500 mt-1">Wyjeżdża w 24/48h</p>
                    </div>
                    <div className="flex flex-col items-center relative">
                        <div className="hidden md:block absolute top-6 -left-1/2 w-full h-0.5 bg-blue-100 -z-10"></div>
                        <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold text-xl mb-3">4</div>
                        <div className="font-bold text-sm text-[#1a2744]">Zapłać Przy Odbiorze</div>
                        <p className="text-xs text-gray-500 mt-1">Gotówką kurierowi</p>
                    </div>
                </div>
            </div>

            <LeadForm variant="inline" />

            {/* FAQ MOVED HERE */}
            <FAQ />
        </div>
      </section>

    </main>
    </div>
  );
}
