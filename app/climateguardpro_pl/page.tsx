'use client';

import React, { useState, useRef, useEffect } from 'react';
import { CountdownTimer } from './components/CountdownTimer';
import { ComparisonTable } from './components/ComparisonTable';
import { Reviews } from './components/Reviews';
import { HeroCarousel } from './components/HeroCarousel';
import { ObjectionHandler } from './components/ObjectionHandler';
import { ScrollReveal } from './components/ScrollReveal';
import { OrderFormState } from './types';
import { ArrowRight, CheckCircle2, Zap, Wind, ShieldCheck, Truck, CreditCard, Star, PlayCircle, Image as ImageIcon, ArrowDown, Moon, RefreshCw, Cpu, Package, Gift, ShoppingCart, Menu, Eye, Thermometer, Droplets, Smartphone, Settings, Fan, Leaf, Sparkles, UtensilsCrossed, Flower2, Shield, ScanEye, ThermometerSnowflake, Flame, Trophy, Banknote, Timer, Lock, BadgeCheck, Radio, Wallet, MapPin, ClipboardEdit, PhoneCall, PackageCheck, Repeat, Waves } from 'lucide-react';

// --- COMPONENTI PER IMMAGINI ---
const ImagePlaceholder = ({ src, label, height = "h-56 md:h-full", className = "" }: { src?: string, label: string, height?: string, className?: string }) => {
  if (src) {
    return (
      <div className={`w-full rounded-2xl overflow-hidden shadow-lg`}>
        <img src={src} alt={label} className="w-full h-auto block transition-transform duration-700 hover:scale-105" />
      </div>
    );
  }
  return (
    <div className={`w-full ${height} bg-black/5 border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center p-4 text-center group hover:border-neon-500 transition-colors relative overflow-hidden backdrop-blur-sm ${className}`}>
      <div className="absolute inset-0 bg-grid-pattern-light opacity-50"></div>
      <ImageIcon className="w-10 h-10 md:w-16 md:h-16 text-gray-400 mb-3 group-hover:text-neon-500 transition-colors" />
      <span className="text-gray-500 text-xs md:text-sm uppercase tracking-widest font-bold group-hover:text-neon-500 leading-tight px-2">{label}</span>
    </div>
  );
};

const ImagePlaceholderDark = ({ src, label, height = "h-56 md:h-full", className = "" }: { src?: string, label: string, height?: string, className?: string }) => {
  if (src) {
    return (
      <div className={`w-full rounded-2xl overflow-hidden shadow-2xl relative group`}>
         <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-[200%] w-full animate-scanline pointer-events-none z-10 opacity-30"></div>
         <div className="absolute inset-0 bg-void-950/20 group-hover:bg-transparent transition-colors z-10"></div>
         <img src={src} alt={label} className="w-full h-auto block transition-transform duration-700 group-hover:scale-105" />
      </div>
    );
  }
  return (
    <div className={`w-full ${height} bg-black/40 border-2 border-dashed border-white/20 rounded-2xl flex flex-col items-center justify-center p-4 text-center group hover:border-neon-500 transition-colors relative overflow-hidden backdrop-blur-sm ${className}`}>
      <div className="absolute inset-0 bg-grid-pattern-dark opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-[200%] w-full animate-scanline pointer-events-none"></div>
      <ImageIcon className="w-10 h-10 md:w-16 md:h-16 text-gray-500 mb-3 group-hover:text-neon-500 transition-colors relative z-10" />
      <span className="text-gray-400 text-xs md:text-sm uppercase tracking-widest font-bold group-hover:text-white leading-tight px-2 shadow-black drop-shadow-md relative z-10">{label}</span>
    </div>
  );
};

// Header Platinum (Light Mode)
const Header = ({ scrollToForm }: { scrollToForm: () => void }) => (
  <nav className="sticky top-[35px] z-40 bg-white/95 backdrop-blur-xl border-b border-gray-200 px-4 md:px-6 py-2 md:py-3 w-full shadow-sm">
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 md:w-9 md:h-9 bg-void-950 rounded-lg flex items-center justify-center font-display font-bold text-white text-lg md:text-xl shadow-lg">C</div>
        <div className="flex flex-col leading-none">
           <span className="font-display font-bold text-lg md:text-xl text-void-950 tracking-tight">ClimateGuard<span className="text-neon-500">Pro</span></span>
           <span className="text-[9px] md:text-[10px] text-gray-500 font-bold uppercase tracking-widest">Official Store</span>
        </div>
      </div>
      <button onClick={scrollToForm} className="bg-void-950 hover:bg-neon-500 text-white px-4 py-2 md:px-6 md:py-2.5 rounded-full flex items-center gap-2 transition-all shadow-lg hover:shadow-neon-500/30 transform hover:-translate-y-0.5 group overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
        <ShoppingCart className="w-4 h-4 group-hover:animate-bounce relative z-10" />
        <span className="hidden md:inline text-sm font-bold tracking-wide relative z-10">ZAMÓW TERAZ</span>
        <span className="md:hidden text-xs font-bold uppercase relative z-10">Zamów</span>
      </button>
    </div>
  </nav>
);

export default function Home() {
  const formRef = useRef<HTMLDivElement>(null);
  const [formState, setFormState] = useState<OrderFormState>({
    fullName: '', fullAddress: '', phone: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [viewers, setViewers] = useState(38);

  useEffect(() => {
    const interval = setInterval(() => {
      setViewers(prev => Math.min(Math.max(prev + Math.floor(Math.random() * 5) - 2, 25), 90));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-void-950 font-sans selection:bg-neon-500 selection:text-white w-full overflow-x-hidden" style={{ touchAction: 'pan-y' }}>
      <CountdownTimer />
      <Header scrollToForm={scrollToForm} />

      {/* --- AGGRESSIVE HERO SECTION (CONVERSION FOCUSED) --- */}
      <div className="relative bg-platinum-50 pb-12 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern-light opacity-[0.04] pointer-events-none"></div>
        
        {/* Animated Marquee Bar */}
        <div className="w-full bg-void-950 py-2 md:py-2.5 overflow-hidden border-b border-gray-800 relative z-10">
           <div className="flex animate-marquee whitespace-nowrap gap-8 md:gap-12 text-[10px] md:text-sm font-bold text-white uppercase tracking-widest items-center">
              <span className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-green-500"/> Oficjalna gwarancja 2 lata</span>
              <span className="flex items-center gap-2"><Trophy className="w-3 h-3 md:w-4 md:h-4 text-yellow-500"/> Wybrany Innowacyjnym Produktem 2025</span>
              <span className="flex items-center gap-2"><Truck className="w-3 h-3 md:w-4 md:h-4 text-neon-500"/> Wysyłka z magazynu UE</span>
              <span className="flex items-center gap-2"><BadgeCheck className="w-3 h-3 md:w-4 md:h-4 text-blue-400"/> Autoryzowany sprzedawca</span>
              {/* Duplicate for infinite loop */}
              <span className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-green-500"/> Oficjalna gwarancja 2 lata</span>
              <span className="flex items-center gap-2"><Trophy className="w-3 h-3 md:w-4 md:h-4 text-yellow-500"/> Wybrany Innowacyjnym Produktem 2025</span>
              <span className="flex items-center gap-2"><Truck className="w-3 h-3 md:w-4 md:h-4 text-neon-500"/> Wysyłka z magazynu UE</span>
              <span className="flex items-center gap-2"><BadgeCheck className="w-3 h-3 md:w-4 md:h-4 text-blue-400"/> Autoryzowany sprzedawca</span>
           </div>
        </div>

        <section className="pt-4 md:pt-12 md:pb-16 px-4 md:px-6 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-12 gap-6 md:gap-12 items-start min-w-0">
            
            {/* LEFT COLUMN: VISUALS */}
            <div className="md:col-span-7 min-w-0 relative">
                <HeroCarousel />
                
                {/* Social Proof Widget */}
                <div className="mt-3 md:mt-4 flex items-center justify-between bg-white border border-gray-200 p-2.5 md:p-3 rounded-lg md:rounded-xl shadow-sm max-w-full">
                   <div className="flex items-center gap-3">
                      <div className="relative w-8 h-8 rounded-full bg-green-50 border border-green-200 flex items-center justify-center shrink-0">
                         <Radio className="w-4 h-4 text-green-600 animate-pulse" />
                         <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
                      </div>
                      <div className="leading-tight">
                         <p className="font-bold text-void-950 text-xs md:text-sm"><span className="text-green-600 font-black">{viewers} odwiedzających</span> online</p>
                         <p className="text-gray-500 text-[10px] md:text-xs">Ogląda tę ofertę</p>
                      </div>
                   </div>
                   <div className="text-right">
                      <div className="text-[10px] md:text-xs font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-full border border-red-100 flex items-center gap-1">
                        <Flame className="w-3 h-3 fill-current" />
                        OSTATNIE SZTUKI
                      </div>
                   </div>
                </div>
            </div>

            {/* RIGHT COLUMN: AGGRESSIVE COPY & BUY BOX */}
            <div className="md:col-span-5 flex flex-col min-w-0 relative z-10">
                
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-void-950 mb-3 md:mb-4 tracking-tighter uppercase leading-[0.9]">
                  Koniec z <span className="text-orange-500">wysokimi</span> rachunkami.
                </h1>
                
                <p className="text-sm md:text-xl text-gray-700 font-medium mb-5 md:mb-6 leading-relaxed">
                   Pierwszy system klimatyczny <strong className="text-void-950 bg-gray-100 px-1 rounded">4-w-1 ze Sztuczną Inteligencją</strong>, który ogrzewa Twój dom w 18 minut za połowę ceny.
                </p>

                {/* BULLET POINTS */}
                <div className="grid grid-cols-1 gap-3 mb-6 md:mb-8">
                   <div className="flex items-start gap-3 bg-white/90 p-3.5 rounded-xl border border-gray-200 shadow-sm backdrop-blur-sm transition-transform hover:scale-[1.02]">
                      <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center shrink-0 border border-red-100">
                        <Waves className="w-5 h-5" />
                      </div>
                      <div>
                         <h4 className="text-base font-bold text-gray-800 leading-tight">Turbina 360° Równomierna (26°C)</h4>
                         <p className="text-sm text-gray-800 font-medium leading-snug mt-1">Technologia AirMulti™ rozprowadza ciepłe powietrze do <span className="text-red-600 font-bold underline decoration-red-200">każdego kąta</span>, eliminując zimne strefy.</p>
                      </div>
                   </div>

                   <div className="flex items-start gap-3 bg-white/90 p-3.5 rounded-xl border border-gray-200 shadow-sm backdrop-blur-sm transition-transform hover:scale-[1.02]">
                      <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0 border border-green-100">
                        <Cpu className="w-5 h-5" />
                      </div>
                      <div>
                         <h4 className="text-base font-bold text-gray-800 leading-tight">Chip ECO-AI (-60% na rachunku)</h4>
                         <p className="text-sm text-gray-800 font-medium leading-snug mt-1">Czujniki wyłączają grzałkę w ułamku sekundy. <span className="text-green-600 font-bold underline decoration-green-200">Zero marnotrawstwa</span> energii.</p>
                      </div>
                   </div>

                   <div className="flex items-start gap-3 bg-white/90 p-3.5 rounded-xl border border-gray-200 shadow-sm backdrop-blur-sm transition-transform hover:scale-[1.02]">
                      <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border border-purple-100">
                        <Droplets className="w-5 h-5" />
                      </div>
                      <div>
                         <h4 className="text-base font-bold text-gray-800 leading-tight">Osuszacz Termiczny</h4>
                         <p className="text-sm text-gray-800 font-medium leading-snug mt-1">Usuwa wilgoć ze ścian podczas ogrzewania. Zapobiega <span className="text-purple-600 font-bold underline decoration-purple-200">pleśni i kondensacji</span>.</p>
                      </div>
                   </div>
                   
                   <div className="flex items-start gap-3 bg-white/90 p-3.5 rounded-xl border border-gray-200 shadow-sm backdrop-blur-sm transition-transform hover:scale-[1.02]">
                      <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div>
                         <h4 className="text-base font-bold text-gray-800 leading-tight">Aktywny Filtr HEPA</h4>
                         <p className="text-sm text-gray-800 font-medium leading-snug mt-1">Wychwytuje kurz, zapachy kuchenne i pyłki. Oddychaj czystym powietrzem nawet przy zamkniętych oknach.</p>
                      </div>
                   </div>
                </div>

                {/* BUY BOX */}
                <div className="bg-white rounded-2xl md:rounded-3xl border border-gray-200 shadow-2xl relative overflow-hidden ring-4 ring-gray-50/50">
                  <div className="p-5 md:p-6 pb-4 border-b border-gray-100">
                    <div className="flex justify-between items-start mb-4 md:mb-5">
                       <div>
                          <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Limitowana Oferta 2025</p>
                          <div className="flex items-baseline gap-2 md:gap-3">
                              <span className="text-5xl md:text-6xl font-black text-void-950 tracking-tighter">299 zł</span>
                              <div className="flex flex-col leading-none">
                                <span className="text-lg text-gray-400 line-through decoration-red-500 font-bold">599 zł</span>
                              </div>
                          </div>
                       </div>
                       <div className="flex flex-col items-end gap-1">
                          <span className="bg-red-500 text-white text-xs md:text-sm font-black px-2.5 py-1 rounded-lg shadow-sm uppercase transform rotate-2">
                             -50%
                          </span>
                          <span className="text-[10px] text-green-600 font-bold bg-green-50 px-1.5 py-0.5 rounded border border-green-100">Oszczędzasz 300 zł</span>
                       </div>
                    </div>

                    <button onClick={scrollToForm} className="w-full bg-neon-500 hover:bg-neon-400 text-white font-bold py-3.5 md:py-4 rounded-xl shadow-[0_4px_14px_0_rgba(255,77,0,0.39)] hover:shadow-[0_6px_20px_rgba(255,77,0,0.23)] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 text-lg md:text-xl mb-2 group leading-tight relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-shimmer"></div>
                        <span className="relative z-10">ZAMÓW TERAZ</span>
                        <span className="block text-xs md:text-sm font-normal opacity-90 relative z-10">(Płatność przy odbiorze)</span>
                        <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform relative z-10" />
                    </button>
                    <div className="text-center">
                       <span className="text-[10px] md:text-xs text-gray-400 font-medium flex items-center justify-center gap-1.5">
                         <Lock className="w-3 h-3" /> Nie wymagamy przedpłaty
                       </span>
                    </div>
                  </div>

                  <div className="bg-gray-50/80 p-3 md:p-5 space-y-2 md:space-y-3">
                     <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-green-600 shrink-0 shadow-sm">
                           <Truck className="w-4 h-4" />
                        </div>
                        <div className="leading-tight">
                           <span className="font-bold text-void-950 text-xs md:text-sm block">Ekspresowa Wysyłka 24/48h</span>
                           <span className="text-gray-500 text-[10px] md:text-xs">Dostawa śledzona i ubezpieczona.</span>
                        </div>
                     </div>
                     <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-void-950 shrink-0 shadow-sm">
                           <Banknote className="w-4 h-4" />
                        </div>
                        <div className="leading-tight">
                           <span className="font-bold text-void-950 text-xs md:text-sm block">Płatność przy Odbiorze</span>
                           <span className="text-gray-500 text-[10px] md:text-xs">Płacisz gotówką kurierowi. Zero ryzyka.</span>
                        </div>
                     </div>
                  </div>
                </div>
            </div>
          </div>
          
          {/* TRUST BADGES */}
          <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-200 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
             <div className="flex flex-col items-center justify-center p-3 md:p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                <Shield className="w-6 h-6 md:w-8 md:h-8 text-void-950 mb-2" />
                <span className="text-[10px] md:text-xs font-bold leading-tight text-center text-gray-600">TECHNOLOGIA<br/>CERTYFIKOWANA CE</span>
             </div>
             <div className="flex flex-col items-center justify-center p-3 md:p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                <Zap className="w-6 h-6 md:w-8 md:h-8 text-void-950 mb-2" />
                <span className="text-[10px] md:text-xs font-bold leading-tight text-center text-gray-600">KLASA<br/>ENERGETYCZNA A+++</span>
             </div>
             <div className="flex flex-col items-center justify-center p-3 md:p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                <AwardIcon className="w-6 h-6 md:w-8 md:h-8 text-void-950 mb-2" />
                <span className="text-[10px] md:text-xs font-bold leading-tight text-center text-gray-600">NAGRODA<br/>DESIGNU 2025</span>
             </div>
             <div className="flex flex-col items-center justify-center p-3 md:p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                <Leaf className="w-6 h-6 md:w-8 md:h-8 text-void-950 mb-2" />
                <span className="text-[10px] md:text-xs font-bold leading-tight text-center text-gray-600">ECO<br/>FRIENDLY</span>
             </div>
          </div>

        </section>
        
        {/* Transition Curve */}
        <div className="absolute bottom-0 left-0 right-0 h-16 md:h-24 bg-gradient-to-t from-void-950 to-transparent pointer-events-none"></div>
      </div>

      {/* --- DEEP DIVE MARKETING BODY --- */}
      <div className="bg-void-950 text-white relative overflow-x-clip w-full pt-10">
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-white/5 z-0"></div>

        {/* STORY BLOCK 1: IL PARADOSSO */}
        <section className="py-12 md:py-24 px-4 md:px-6 relative overflow-x-clip overflow-y-visible bg-gradient-to-b from-void-950 via-[#2a0a0a] to-void-950">
           <div className="hidden md:block absolute top-1/4 -left-20 w-96 h-96 bg-red-600/20 rounded-full blur-[100px] animate-blob mix-blend-screen pointer-events-none"></div>

           <div className="max-w-7xl mx-auto relative z-10">
             <div className="md:hidden mb-6 flex justify-center">
                <span className="bg-red-500/20 text-red-400 border border-red-500/50 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider">01. Problem</span>
             </div>

             <ScrollReveal className="grid md:grid-cols-2 gap-8 md:gap-20 items-center">
                <div className="relative">
                   <div className="hidden md:block absolute left-0 -top-10 text-[180px] font-display font-bold text-white/5 leading-none -z-10 select-none">01</div>
                   <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 md:mb-8 leading-tight drop-shadow-lg">
                      Przestań marnować pieniądze na <span className="text-red-500 underline decoration-red-900 underline-offset-4">4 różne</span> urządzenia.
                   </h2>
                   <p className="text-gray-200 text-lg md:text-xl leading-relaxed mb-8 font-light">
                      Policzyłeś koszty? Kupno mocnego grzejnika, wentylatora, oczyszczacza i osuszacza kosztuje ponad <strong className="text-red-500 bg-red-950/30 px-1 rounded">3200 zł</strong>.
                      <br/><br/>
                      <span className="text-white font-bold text-xl border-l-4 border-red-500 pl-4 block">ClimateGuard Pro™ to ostateczny monolit.</span> Kosmiczny design łączący 4 technologie w jednej kolumnie.
                   </p>
                   <ul className="space-y-4 font-medium text-lg text-white/90">
                      <li className="flex items-center gap-4 p-3 bg-red-950/40 rounded-lg border border-red-500/20 shadow-lg">
                        <span className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center border border-red-500/50 shrink-0">
                          <Flame className="w-4 h-4 text-red-500" />
                        </span>
                        <span className="font-bold text-red-100">Ogrzewanie Ceramiczne</span> (Zima)
                      </li>
                      <li className="flex items-center gap-4 p-3 bg-blue-950/40 rounded-lg border border-blue-500/20">
                        <span className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/50 shrink-0">
                          <Wind className="w-4 h-4 text-blue-500" />
                        </span>
                        Wentylacja Rozproszona (Lato)
                      </li>
                      <li className="flex items-center gap-4 p-3 bg-green-950/40 rounded-lg border border-green-500/20">
                        <span className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/50 shrink-0">
                          <Leaf className="w-4 h-4 text-green-500" />
                        </span>
                        Oczyszczanie Anty-Zapachowe (Zawsze)
                      </li>
                   </ul>
                </div>
                <div className="mt-6 md:mt-0">
                   <ImagePlaceholderDark src="/images/climateguardpro img/disordine-vs-ordine.png" label="FOTO: 4 VECCHI ELETTRODOMESTICI VS 1 CLIMATEGUARD" height="h-[300px] md:h-[500px]" />
                   <div className="mt-4 md:mt-6 bg-[#1a0505] border border-red-500/30 p-4 md:p-5 rounded-2xl shadow-2xl flex items-center gap-3 md:gap-4 max-w-full md:max-w-[280px]">
                      <Package className="w-8 h-8 md:w-10 md:h-10 text-red-500 shrink-0" />
                      <div>
                         <div className="text-xs text-gray-400 uppercase font-bold leading-none mb-1">Miejsce</div>
                         <div className="text-white font-bold text-lg md:text-xl">-75% Powierzchni</div>
                      </div>
                   </div>
                </div>
             </ScrollReveal>
           </div>
        </section>

        {/* STORY BLOCK 2: PERFORMANCE */}
        <section className="py-12 md:py-24 px-4 md:px-6 relative overflow-x-clip overflow-y-visible bg-gradient-to-b from-void-950 via-[#0a1025] to-void-950">
           <div className="hidden md:block absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] animate-blob mix-blend-screen animation-delay-2000 pointer-events-none"></div>

           <div className="max-w-7xl mx-auto relative z-10">
              <div className="md:hidden mb-6 flex justify-center">
                 <span className="bg-blue-500/20 text-blue-400 border border-blue-500/50 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider">02. Technologia</span>
              </div>

              <ScrollReveal className="grid md:grid-cols-2 gap-8 md:gap-20 items-center">
                 <div className="order-2 md:order-1 mt-6 md:mt-0">
                    <ImagePlaceholderDark src="/images/climateguardpro img/performance-calore.png" label="FOTO: GRAFICO FLUSSO DIFFUSO E CERAMICA PTC" height="h-[300px] md:h-[500px]" />
                    <div className="mt-4 md:mt-6 bg-[#050b1a] border border-blue-500/30 p-4 md:p-5 rounded-2xl shadow-2xl max-w-full md:max-w-[280px]">
                       <div className="text-xs text-gray-400 mb-2 uppercase tracking-wide font-bold">Ogrzewanie</div>
                       <div className="flex items-end gap-3">
                          <span className="text-3xl md:text-4xl font-bold text-white tracking-tighter">PTC</span>
                          <span className="text-[10px] md:text-xs text-orange-400 mb-1 font-bold bg-orange-900/50 px-2 py-1 rounded border border-orange-500/30">CERAMICA</span>
                       </div>
                       <div className="text-xs text-gray-400 mt-2 font-bold text-blue-300">Natychmiastowe ciepło.</div>
                    </div>
                 </div>
                 <div className="order-1 md:order-2 relative">
                    <div className="hidden md:block absolute right-0 -top-10 text-[180px] font-display font-bold text-white/5 leading-none -z-10 select-none">02</div>
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 md:mb-8 leading-tight drop-shadow-lg">
                       Moc Ceramiczna i <span className="text-blue-500">Inteligentny Przepływ.</span>
                    </h2>
                    <p className="text-gray-200 text-lg md:text-xl leading-relaxed mb-8 font-light">
                       Zwykłe grzejniki spalają powietrze i ogrzewają tylko przed sobą.
                       ClimateGuard używa <strong className="text-blue-400">Ceramiki PTC</strong> (natychmiastowe, super-wydajne ogrzewanie) i turbiny o mocy <strong className="text-white border-b border-blue-500">290 litrów/sekundę</strong>.
                       <br/><br/>
                       <span className="text-white block mb-2 text-xl flex items-center gap-2">
                         <Sparkles className="w-5 h-5 text-blue-500" />
                         <strong>Tryb Rozproszony:</strong>
                       </span>
                       Powietrze nigdy nie uderza bezpośrednio w twarz. Przepływ kierowany jest na tył, otulając pomieszczenie ciepłem bez dyskomfortu.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                       <div className="bg-blue-950/40 p-5 rounded-2xl border border-blue-500/30 text-center shadow-lg hover:bg-blue-900/60 transition-colors min-w-0">
                          <Thermometer className="w-8 h-8 md:w-10 md:h-10 text-red-500 mx-auto mb-3 drop-shadow-md"/>
                          <div className="text-base md:text-lg font-bold text-white truncate">Ciepło w <span className="text-red-500">3 Sek</span></div>
                       </div>
                       <div className="bg-blue-950/40 p-5 rounded-2xl border border-blue-500/30 text-center shadow-lg hover:bg-blue-900/60 transition-colors min-w-0">
                          <Wind className="w-8 h-8 md:w-10 md:h-10 text-cyan-400 mx-auto mb-3 drop-shadow-md"/>
                          <div className="text-base md:text-lg font-bold text-white truncate">Oscylacja <span className="text-cyan-400">350°</span></div>
                       </div>
                    </div>
                 </div>
              </ScrollReveal>
           </div>
        </section>

        {/* STORY BLOCK 3: SALUTE */}
        <section className="py-12 md:py-24 px-4 md:px-6 relative overflow-x-clip overflow-y-visible bg-gradient-to-b from-void-950 via-[#150520] to-void-950">
           <div className="hidden md:block absolute top-1/2 left-1/4 w-80 h-80 bg-purple-600/20 rounded-full blur-[100px] animate-blob mix-blend-screen animation-delay-4000 pointer-events-none"></div>

           <div className="max-w-7xl mx-auto relative z-10">
              <div className="md:hidden mb-6 flex justify-center">
                 <span className="bg-purple-500/20 text-purple-400 border border-purple-500/50 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider">03. Czyste Powietrze</span>
              </div>

              <ScrollReveal className="grid md:grid-cols-2 gap-8 md:gap-20 items-center">
                 <div className="relative">
                    <div className="hidden md:block absolute left-0 -top-10 text-[180px] font-display font-bold text-white/5 leading-none -z-10 select-none">03</div>
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 md:mb-8 leading-tight drop-shadow-lg">
                       Twój dom jest <span className="text-purple-500">5 razy</span> bardziej zanieczyszczony niż na zewnątrz.
                    </h2>
                    <div className="text-gray-200 text-lg md:text-xl leading-relaxed mb-8 font-light space-y-4">
                       <p>Zima, zamknięte okna = zatęchłe powietrze. Filtr <strong className="text-white">HEPA-13 z Węglem Aktywnym</strong> pracuje podczas ogrzewania:</p>
                       
                       <div className="space-y-3">
                         <div className="flex items-start gap-3 p-2 rounded hover:bg-purple-900/20 transition-colors">
                           <UtensilsCrossed className="w-6 h-6 text-red-500 mt-1 shrink-0" />
                           <span><strong className="text-red-400">Kuchnia:</strong> Eliminuje zapachy smażenia i ryb w 10 minut.</span>
                         </div>
                         <div className="flex items-start gap-3 p-2 rounded hover:bg-purple-900/20 transition-colors">
                           <Flower2 className="w-6 h-6 text-yellow-500 mt-1 shrink-0" />
                           <span><strong className="text-yellow-400">Alergie:</strong> Wychwytuje 99,9% pyłków i alergenów.</span>
                         </div>
                         <div className="flex items-start gap-3 p-2 rounded hover:bg-purple-900/20 transition-colors">
                           <Shield className="w-6 h-6 text-green-500 mt-1 shrink-0" />
                           <span><strong className="text-green-400">Zdrowie:</strong> Poprawia jakość powietrza.</span>
                         </div>
                       </div>
                    </div>
                    <div className="flex items-center gap-4 md:gap-6 bg-purple-900/30 border border-purple-500/30 p-5 md:p-6 rounded-2xl shadow-lg hover:border-purple-500 transition-all">
                       <RefreshCw className="w-10 h-10 md:w-12 md:h-12 text-purple-400 shrink-0 drop-shadow-[0_0_10px_rgba(192,132,252,0.5)]" />
                       <div className="text-sm md:text-base text-gray-200">
                          <strong className="text-white text-lg md:text-xl block mb-1">Osusza podczas ogrzewania:</strong>
                          Żegnaj mokre szyby i <span className="text-purple-400 font-bold underline decoration-purple-600">czarna pleśń na ścianach</span>.
                       </div>
                    </div>
                 </div>
                 <div className="relative mt-6 md:mt-0">
                    <ImagePlaceholderDark src="/images/climateguardpro img/salute-cucina.png" label="FOTO: FUMI CUCINA E POLLINE CATTURATI DAL FILTRO" height="h-[300px] md:h-[500px]" />
                 </div>
              </ScrollReveal>
           </div>
        </section>

        {/* STORY BLOCK 4: ECONOMIA */}
        <section className="py-12 md:py-24 px-4 md:px-6 relative overflow-x-clip overflow-y-visible bg-gradient-to-b from-void-950 via-[#021005] to-void-950">
           <div className="hidden md:block absolute top-1/3 right-1/4 w-96 h-96 bg-green-600/20 rounded-full blur-[100px] animate-blob mix-blend-screen animation-delay-2000 pointer-events-none"></div>

           <div className="max-w-7xl mx-auto relative z-10">
              <div className="md:hidden mb-6 flex justify-center">
                 <span className="bg-green-500/20 text-green-400 border border-green-500/50 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider">04. Oszczędność AAA+</span>
              </div>

              <ScrollReveal className="grid md:grid-cols-2 gap-8 md:gap-20 items-center">
                 <div className="order-2 md:order-1 relative mt-6 md:mt-0">
                    <ImagePlaceholderDark src="/images/climateguardpro img/app-risparmio.png" label="FOTO: MODALITÀ AUTO E APP" height="h-[300px] md:h-[500px]" />
                 </div>
                 <div className="order-1 md:order-2 relative">
                    <div className="hidden md:block absolute right-0 -top-10 text-[180px] font-display font-bold text-white/5 leading-none -z-10 select-none">04</div>
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 md:mb-8 leading-tight drop-shadow-lg">
                       Tryb Auto: <span className="text-green-500">Płaci za Ciebie.</span>
                    </h2>
                    <p className="text-gray-200 text-lg md:text-xl leading-relaxed mb-8 font-light">
                       ClimateGuard ma <strong className="text-green-400">"czujniki laserowe"</strong> analizujące powietrze.
                       <br/><br/>
                       <span className="flex items-start gap-3 mb-4">
                         <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-500/20 text-green-500 text-xs font-bold border border-green-500/50 shrink-0 mt-1">1</span>
                         <span><strong>Wykrywa zanieczyszczenia:</strong> Jeśli gotujesz lub jest dym, przyspiesza oczyszczanie.</span>
                       </span>
                       <span className="flex items-start gap-3">
                         <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-500/20 text-green-500 text-xs font-bold border border-green-500/50 shrink-0 mt-1">2</span>
                         <span><strong>Czuje zimno:</strong> Gdy osiągnie 26°C, redukuje moc do minimum.</span>
                       </span>
                       <br/><br/>
                       Nie marnuje ani jednego wata energii. Dlatego ma <strong className="text-white bg-green-900/40 px-2 py-0.5 rounded border border-green-500/30">Klasę Energetyczną AAA+</strong>.
                    </p>
                    <button onClick={scrollToForm} className="bg-white/5 hover:bg-white/10 text-white border-2 border-green-500/50 hover:border-green-500 px-6 py-5 md:px-8 md:py-6 rounded-2xl flex items-center gap-4 transition-all w-full md:w-auto justify-center font-bold text-lg md:text-xl shadow-[0_0_20px_rgba(34,197,94,0.2)]">
                       Chcę zmniejszyć rachunek o połowę
                       <ArrowRight className="w-6 h-6 md:w-7 md:h-7" />
                    </button>
                 </div>
              </ScrollReveal>
           </div>
        </section>

        {/* TECH SPECS & BENTO GRID */}
        <section className="py-12 md:py-24 px-4 md:px-6 bg-void-900 border-t border-white/5">
           <div className="max-w-7xl mx-auto">
              <ScrollReveal className="text-center mb-10 md:mb-12">
                 <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">Pełen Komfort</h2>
                 <p className="text-lg text-gray-400">Wszystko, czego nie spodziewasz się po urządzeniu AGD.</p>
              </ScrollReveal>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {/* Card 1: App */}
                 <ScrollReveal delay={0} className="md:col-span-2 h-full">
                   <div className="bg-void-950 border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 md:gap-8 group hover:border-neon-500/50 transition-all h-full relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-neon-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="flex-1 relative z-10">
                         <Smartphone className="w-10 h-10 text-neon-500 mb-4" />
                         <h3 className="text-2xl font-bold text-white mb-2">Sterowanie Aplikacją Smart</h3>
                         <p className="text-gray-400 text-lg">
                            Znajdź ciepły dom po powrocie. Włączaj, wyłączaj i programuj wszystko z telefonu, gdziekolwiek jesteś. Kompatybilne z poleceniami głosowymi.
                         </p>
                      </div>
                      <div className="w-full md:w-1/3">
                         <ImagePlaceholderDark src="/images/climateguardpro img/telecomando.png" label="APP SCREEN" />
                      </div>
                   </div>
                 </ScrollReveal>

                 {/* Card 2: Manutenzione */}
                 <ScrollReveal delay={150} className="h-full">
                   <div className="bg-void-950 border border-white/10 rounded-3xl p-6 md:p-8 group hover:border-purple-500/50 transition-all h-full relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="relative z-10">
                         <Settings className="w-10 h-10 text-purple-500 mb-4" />
                         <h3 className="text-xl font-bold text-white mb-2">Konserwacja 60 Sek</h3>
                         <p className="text-gray-400 text-lg">
                            Aplikacja i wyświetlacz powiadamiają, kiedy wymienić filtr. Wymienia się jednym kliknięciem, bez narzędzi. Bardzo łatwe.
                         </p>
                      </div>
                   </div>
                 </ScrollReveal>

                 {/* Card 3: Flusso Diffuso */}
                 <ScrollReveal delay={300} className="h-full">
                   <div className="bg-void-950 border border-white/10 rounded-3xl p-6 md:p-8 group hover:border-blue-500/50 transition-all h-full relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="relative z-10">
                         <Fan className="w-10 h-10 text-blue-500 mb-4" />
                         <h3 className="text-xl font-bold text-white mb-2">Tryb "Rozproszony"</h3>
                         <p className="text-gray-400 text-lg">
                            Chcesz oczyszczać bez odczuwania powietrza? Przepływ kierowany na tył. Niewidzialny i cichy komfort.
                         </p>
                      </div>
                   </div>
                 </ScrollReveal>

                 {/* Card 4: Notte */}
                 <ScrollReveal delay={450} className="md:col-span-2 h-full">
                   <div className="bg-void-950 border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row-reverse items-center gap-6 md:gap-8 group hover:border-green-500/50 transition-all h-full relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="flex-1 relative z-10">
                         <Moon className="w-10 h-10 text-green-500 mb-4" />
                         <h3 className="text-2xl font-bold text-white mb-2">Tryb Nocny Ultra-Cichy</h3>
                         <p className="text-gray-400 text-lg">
                            Śpij spokojnie. Wyświetlacz wyłącza się, hałas spada poniżej 25dB, a powietrze jest stale oczyszczane podczas snu.
                         </p>
                      </div>
                      <div className="w-full md:w-1/3">
                         <ImagePlaceholderDark src="/images/climateguardpro img/display-notturno.png" label="DISPLAY SPENTO" />
                      </div>
                   </div>
                 </ScrollReveal>
              </div>
           </div>
        </section>
      </div>

      {/* --- TECH SPECS SUMMARY --- */}
      <section className="py-10 md:py-16 bg-void-900 px-4 md:px-6 border-y border-white/10 overflow-x-clip overflow-y-visible">
         <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <ComparisonTable />
            </ScrollReveal>
         </div>
      </section>

      {/* --- SOCIAL PROOF --- */}
      <Reviews />

      {/* --- FAQ --- */}
      <section className="py-12 md:py-20 px-4 md:px-6 max-w-4xl mx-auto overflow-x-clip overflow-y-visible text-white">
         <ScrollReveal className="text-center mb-10 md:mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-3 font-display">Wątpliwości? Odpowiada Ekspert</h3>
            <p className="text-base md:text-lg text-gray-400">Kliknij na pytania, aby uzyskać natychmiastową odpowiedź.</p>
         </ScrollReveal>
         <ScrollReveal delay={200}>
            <ObjectionHandler />
         </ScrollReveal>
      </section>

      {/* --- ORDER FORM (SINGLE OFFER 149€) --- */}
      <section id="order-form" className="py-12 md:py-24 px-4 md:px-6 bg-[#050508] border-t border-white/10 pb-40 md:pb-24 overflow-x-clip overflow-y-visible relative text-white">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-neon-500/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

        <div className="max-w-2xl mx-auto">
          <ScrollReveal className="text-center mb-10 md:mb-12">
             <div className="inline-block bg-neon-500 text-void-950 text-sm md:text-sm font-bold px-4 py-1.5 rounded-full mb-4 animate-pulse shadow-[0_0_20px_#FF4D00]">OSTATNIE 7 SZTUK PO 299 zł</div>
             <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-4">Bezpieczne Zamówienie</h2>
             <p className="text-base md:text-lg text-gray-400">Szybka wysyłka w 24/48h wliczona.</p>
          </ScrollReveal>

          {/* PROCESS STEPS */}
          <ScrollReveal delay={100} className="mb-10">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-row md:flex-col items-center gap-4 text-left md:text-center">
                  <div className="w-12 h-12 rounded-full bg-neon-500/20 text-neon-500 flex items-center justify-center border border-neon-500/50 shrink-0">
                     <ClipboardEdit className="w-6 h-6" />
                  </div>
                  <div>
                     <h5 className="font-bold text-white uppercase text-sm">1. Wypełnij</h5>
                     <p className="text-gray-400 text-xs">Wprowadź dane poniżej.</p>
                  </div>
               </div>
               <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-row md:flex-col items-center gap-4 text-left md:text-center relative">
                   <div className="hidden md:block absolute -left-2 top-1/2 -translate-y-1/2 w-4 border-t-2 border-dashed border-gray-600"></div>
                  <div className="w-12 h-12 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center border border-green-500/50 shrink-0 animate-pulse">
                     <PhoneCall className="w-6 h-6" />
                  </div>
                  <div>
                     <h5 className="font-bold text-white uppercase text-sm">2. Potwierdź</h5>
                     <p className="text-gray-400 text-xs">Zadzwonimy, aby potwierdzić.</p>
                  </div>
               </div>
               <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-row md:flex-col items-center gap-4 text-left md:text-center relative">
                  <div className="hidden md:block absolute -left-2 top-1/2 -translate-y-1/2 w-4 border-t-2 border-dashed border-gray-600"></div>
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center border border-blue-500/50 shrink-0">
                     <PackageCheck className="w-6 h-6" />
                  </div>
                  <div>
                     <h5 className="font-bold text-white uppercase text-sm">3. Płatność przy Odbiorze</h5>
                     <p className="text-gray-400 text-xs">Gotówką kurierowi.</p>
                  </div>
               </div>
             </div>
          </ScrollReveal>

          <ScrollReveal delay={200} className="bg-void-900/80 border border-white/10 p-6 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden backdrop-blur-xl">
             <div ref={formRef} className="absolute -top-24 md:-top-32 invisible" /> 
             
             {submitted ? (
               <div className="text-center py-10 md:py-20 flex flex-col items-center">
                  <CheckCircle2 className="w-24 h-24 md:w-28 md:h-28 text-green-500 mb-6" />
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Zamówienie Potwierdzone!</h3>
                  <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-md mx-auto">Dziękujemy! Twoje zamówienie zostało przyjęte. Nasz operator skontaktuje się z Tobą przez WhatsApp lub telefon w ciągu 2 godzin, aby potwierdzić wysyłkę.</p>
                  <button onClick={() => window.location.reload()} className="text-neon-500 font-bold underline text-xl">Wróć do sklepu</button>
               </div>
             ) : (
               <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                  
                  {/* PACKAGE SUMMARY */}
                  <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                     <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-2">
                        <h4 className="text-gray-400 text-xs uppercase font-bold tracking-widest">Podsumowanie Zamówienia:</h4>
                        <span className="text-neon-500 font-bold text-xl">Razem: 299 zł</span>
                     </div>
                     <ul className="space-y-3">
                        <li className="flex items-center gap-3 text-white text-base md:text-lg">
                           <CheckCircle2 className="text-green-500 w-5 h-5 md:w-6 md:h-6 shrink-0"/> 
                           <span className="font-bold">1x ClimateGuard Pro 4-in-1</span>
                        </li>
                        <li className="flex items-center gap-3 text-white text-base md:text-lg">
                           <CheckCircle2 className="text-green-500 w-5 h-5 md:w-6 md:h-6 shrink-0"/> 
                           <span>Pilot Smart <span className="text-gray-500 text-xs ml-1">(W zestawie)</span></span>
                        </li>
                        <li className="flex items-center gap-3 text-white text-base md:text-lg bg-neon-500/10 p-2 -mx-2 rounded-lg border border-neon-500/20">
                           <Gift className="text-neon-500 w-5 h-5 md:w-6 md:h-6 shrink-0 animate-pulse"/> 
                           <span className="font-bold">1x Filtr HEPA Zapasowy <span className="text-neon-500 text-xs font-black ml-2 bg-neon-500/20 px-1.5 py-0.5 rounded border border-neon-500/50 uppercase">Gratis</span></span>
                        </li>
                     </ul>
                  </div>

                  {/* FORM FIELDS */}
                  <div className="space-y-5">
                    <div>
                        <label className="block text-gray-400 text-xs font-bold uppercase mb-2 ml-1">Imię i Nazwisko</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"><ShieldCheck className="w-5 h-5" /></span>
                            <Input name="fullName" placeholder="Np: Jan Kowalski" onChange={handleInputChange} className="pl-12" />
                        </div>
                    </div>

                    <div>
                       <label className="block text-gray-400 text-xs font-bold uppercase mb-2 ml-1">Pełny Adres (Ulica, Miasto, Kod pocztowy)</label>
                       <div className="relative">
                            <span className="absolute left-4 top-4 text-gray-500"><MapPin className="w-5 h-5" /></span>
                            <textarea
                              name="fullAddress"
                              required
                              rows={3}
                              placeholder="Np: ul. Marszałkowska 10, 00-001 Warszawa"
                              onChange={handleInputChange}
                              className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 pl-12 text-white placeholder-gray-500 focus:outline-none focus:border-neon-500 focus:ring-1 focus:ring-neon-500 transition-all font-sans text-lg resize-none"
                            />
                       </div>
                    </div>

                    <div>
                       <label className="flex justify-between items-center text-gray-400 text-xs font-bold uppercase mb-2 ml-1">
                          <span>Numer Telefonu</span>
                          <span className="text-neon-500">Aby potwierdzić zamówienie</span>
                       </label>
                       <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"><Smartphone className="w-5 h-5" /></span>
                            <Input name="phone" placeholder="Np: 500 123 456" type="tel" onChange={handleInputChange} className="pl-12" />
                       </div>
                       <p className="text-[10px] text-gray-500 mt-1 ml-1 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-green-500" /> Ważne: odbierz telefon, aby odblokować wysyłkę.
                       </p>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-500/10 border border-yellow-500/20 p-5 rounded-2xl flex gap-4 items-start">
                     <div className="bg-yellow-500/20 p-2.5 rounded-full shrink-0">
                        <CreditCard className="w-6 h-6 text-yellow-500" />
                     </div>
                     <div className="text-sm md:text-base text-gray-300">
                        <span className="text-yellow-500 font-bold block mb-1 text-base md:text-lg">PŁATNOŚĆ PRZY ODBIORZE</span>
                        Nie prosimy o kartę kredytową. Zapłacisz <span className="text-white font-bold underline">299 zł</span> bezpośrednio kurierowi gotówką.
                     </div>
                  </div>

                  <button type="submit" className="w-full bg-neon-500 hover:bg-neon-400 text-white font-display font-bold py-5 md:py-6 rounded-2xl text-xl md:text-2xl shadow-[0_0_40px_rgba(255,77,0,0.4)] transition-all mt-6 flex items-center justify-center gap-4 animate-pulse-neon group relative overflow-hidden">
                     <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-shimmer"></div>
                     <span className="relative z-10">POTWIERDŹ ZAMÓWIENIE</span>
                     <ArrowRight className="w-7 h-7 group-hover:translate-x-1 transition-transform relative z-10"/>
                  </button>
               </form>
             )}
          </ScrollReveal>
        </div>
      </section>

      {/* Aggressive Sticky Mobile Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-void-950 shadow-[0_-5px_25px_rgba(0,0,0,0.8)] border-t border-white/10 pb-safe">
        <div className="bg-yellow-500 text-void-950 text-[10px] font-black uppercase text-center py-1.5 tracking-widest flex items-center justify-center gap-2 animate-pulse">
           <Timer className="w-3 h-3" />
           Oferta błyskawiczna -50% wkrótce wygasa
        </div>
        <div className="p-3">
           <button onClick={scrollToForm} className="w-full bg-neon-500 hover:bg-neon-400 text-white rounded-xl py-3.5 px-5 flex justify-between items-center shadow-[0_0_20px_rgba(255,77,0,0.4)] group active:scale-95 transition-transform relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-shimmer"></div>
              <div className="flex flex-col items-start leading-none relative z-10">
                 <span className="font-bold text-lg">ZAMÓW TERAZ</span>
                 <span className="text-[10px] opacity-90 flex items-center gap-1 font-medium mt-0.5"><Wallet className="w-3 h-3" /> Płacisz Kurierowi</span>
              </div>
              <div className="flex items-center gap-2 bg-black/20 px-3 py-1.5 rounded-lg border border-white/10 relative z-10">
                 <span className="font-bold text-xl">299 zł</span>
                 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
           </button>
        </div>
      </div>
    </div>
  );
}

// Icon for Design Award
const AwardIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>
)

// Increased Font Size for Inputs + className prop
const Input = ({ className = "", ...props }: any) => (
   <input 
      required
      className={`w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-neon-500 focus:ring-1 focus:ring-neon-500 transition-all font-sans text-lg ${className}`} 
      {...props} 
   />
);