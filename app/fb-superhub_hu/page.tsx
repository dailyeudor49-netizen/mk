'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Star, Signal, Tv, Gamepad2, Lock, Truck, Banknote, ShieldCheck,
  Clapperboard, Trophy, PlugZap, Wifi, PlayCircle, Radio,
  Globe, Users, Gift, TrendingDown, Clock, ChevronDown, Check
} from 'lucide-react';
import { useFacebookTracking } from '@/app/hooks/useFacebookTracking';

export default function SuperHubHU() {
  // Facebook Tracking Hook
  const { trackLeadEvent, saveUserData } = useFacebookTracking();

  const [stickyCTAVisible, setStickyCTAVisible] = useState(false);
  const [orderData, setOrderData] = useState({
    name: '',
    phone: '',
    address: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Fade-in sections observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.fade-in-section').forEach((section) => observer.observe(section));

    // Sticky CTA scroll handler
    const handleScroll = () => {
      setStickyCTAVisible(window.scrollY > 600);
    };

    window.addEventListener('scroll', handleScroll);

    // Fingerprint Script
    const script = document.createElement('script');
    script.src = 'https://offers.supertrendaffiliateprogram.com/forms/tmfp/';
    script.crossOrigin = 'anonymous';
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
      document.head.removeChild(script);
    };
  }, []);

  const scrollToForm = () => {
    document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const params = new URLSearchParams();
      params.append('uid', '019855d0-397a-72ee-8df5-c5026966105a');
      params.append('key', '8ea99f0506e1df27f625d0');
      params.append('offer', '417');
      params.append('lp', '417');
      params.append('name', orderData.name.trim());
      params.append('tel', orderData.phone.trim());
      params.append('street-address', orderData.address.trim());

      // Fingerprint
      const tmfpInput = document.querySelector('input[name="tmfp"]') as HTMLInputElement;
      if (tmfpInput && tmfpInput.value) {
        params.append('tmfp', tmfpInput.value);
      }

      // UTM params
      const urlParams = new URLSearchParams(window.location.search);
      ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'subid', 'subid2', 'subid3', 'subid4', 'subid5', 'pubid'].forEach(param => {
        const value = urlParams.get(param);
        if (value) params.append(param, value);
      });

      const response = await fetch('https://offers.supertrendaffiliateprogram.com/forms/api/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString()
      });

      if (response.ok) {
        // Salva dati utente e traccia Lead per Facebook
        const nameParts = orderData.name.trim().split(' ');
        const nome = nameParts[0] || '';
        const cognome = nameParts.slice(1).join(' ') || '';

        const userData = {
          nome,
          cognome,
          telefono: orderData.phone.trim(),
          indirizzo: orderData.address.trim()
        };

        console.log('[Form] Salvataggio dati utente:', userData);
        saveUserData(userData);

        // Traccia Lead
        await trackLeadEvent(userData, {
          content_name: 'SuperHub',
          currency: 'HUF',
          value: 23999
        });

        window.location.href = '/fb-ty/ty-fb-hu';
      } else {
        alert('Hiba a rendelés elküldésekor. Kérjük, próbálja újra.');
        setIsSubmitting(false);
      }
    } catch {
      alert('Hiba a rendelés elküldésekor. Kérjük, próbálja újra.');
      setIsSubmitting(false);
    }
  };

  // Marquee content
  const MarqueeItem = () => (
    <>
      <span className="flex items-center gap-2 font-bold text-sm sm:text-base uppercase tracking-wide">
        <Gift className="w-5 h-5 text-yellow-400 fill-yellow-400" /> KARÁCSONYI AKCIÓ: -50% + INGYENES KONTROLLER
      </span>
      <span className="flex items-center gap-2 font-bold text-sm sm:text-base uppercase tracking-wide text-yellow-400">
        <Clock className="w-5 h-5" /> UTÁNVÉTTEL FIZETHETSZ
      </span>
      <span className="flex items-center gap-2 font-bold text-sm sm:text-base uppercase tracking-wide">
        <Truck className="w-5 h-5" /> GYORS SZÁLLÍTÁS 24/48 ÓRA
      </span>
    </>
  );

  return (
    <>
      {/* Click Pixel */}
      <img src="https://offers.supertrendaffiliateprogram.com/forms/api/ck/?o=25&uid=01981ccf-4474-7c39-97eb-9407221996c2&lp=25" style={{width:'1px',height:'1px',display:'none'}} alt="" />

      <style jsx global>{`
        body { font-family: 'Inter', sans-serif; scroll-behavior: smooth; }
        header { display: none !important; }
        .fade-in-section {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .fade-in-section.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #0f172a; }
        ::-webkit-scrollbar-thumb { background: #334155; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #475569; }
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 60s linear infinite;
        }
      `}</style>

      {/* TOP BAR */}
      <div className="bg-red-600 text-white py-3 overflow-hidden sticky top-0 z-50 shadow-md border-b border-red-800 flex">
        <div className="animate-marquee whitespace-nowrap flex flex-shrink-0 items-center gap-16 px-4">
          {[...Array(10)].map((_, i) => (
            <React.Fragment key={i}>
              <MarqueeItem />
            </React.Fragment>
          ))}
        </div>
        <div className="animate-marquee whitespace-nowrap flex flex-shrink-0 items-center gap-16 px-4">
          {[...Array(10)].map((_, i) => (
            <React.Fragment key={`dup-${i}`}>
              <MarqueeItem />
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden pb-12 fade-in-section">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/10 blur-3xl rounded-full pointer-events-none"></div>
        <div className="container mx-auto px-4 pt-6 md:pt-16">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">

            {/* Hero Image */}
            <div className="w-full lg:w-1/2 z-10 relative order-1 lg:order-2">
              <div className="relative rounded-xl overflow-hidden shadow-2xl border-4 border-slate-700/50 group">
                <img
                  src="/images/superhub hu/img1principale hu.png"
                  alt="SuperVision Hub"
                  className="w-full h-auto drop-shadow-2xl"
                />
              </div>
              <div className="-mt-1 bg-slate-900/90 backdrop-blur-md p-3 md:p-4 rounded-b-lg border border-t-0 border-yellow-400/30 shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <p className="text-white font-bold text-xs md:text-sm uppercase tracking-wider">A csomagban vezeték nélküli kontroller</p>
                    <p className="text-yellow-400 text-[10px] md:text-xs font-bold">15 500 Ft ÉRTÉKBEN - <span className="animate-pulse">INGYEN</span></p>
                  </div>
                </div>
              </div>
            </div>

            {/* Text Content */}
            <div className="w-full lg:w-1/2 z-10 text-center lg:text-left order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 bg-yellow-400 text-slate-900 border border-yellow-400/50 rounded-full px-4 py-1 text-sm font-extrabold mb-4 uppercase tracking-wider shadow-lg shadow-yellow-400/20">
                <Star className="w-4 h-4 fill-slate-900" /> Az első 4-az-1-ben eszköz
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
                Változtasd a TV-det <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400 font-black">Netflix-sé, Next-Gen konzollá</span> és <span className="text-white">Élő Focivá</span>.
              </h1>
              <p className="text-slate-300 text-lg mb-6 leading-relaxed">
                A <strong>SuperVision Hub</strong> segítségével a meglévő TV-det csatlakoztatod, és hozzáférsz <span className="text-white font-bold">filmekhez, sorozatokhoz, élő focimeccsekhez és streaming játékokhoz</span>. Nincs szükség új TV-re, nincs szükség 700 000 Ft-os konzolra. Minden <span className="text-yellow-400 font-bold underline decoration-yellow-400/50 underline-offset-4">egy 4-az-1-ben eszközben</span>.
              </p>

              {/* Price */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8">
                <div className="bg-slate-800/80 p-4 rounded-lg border border-slate-600 backdrop-blur-sm shadow-inner w-full sm:w-auto text-center sm:text-left hover:scale-[1.02] transition-transform duration-300">
                  <div className="text-slate-400 line-through text-sm">Eredeti ár 47 998 Ft</div>
                  <div className="flex items-center justify-center sm:justify-start gap-3">
                    <span className="text-5xl font-black text-white tracking-tight">23 999 Ft</span>
                    <div className="flex flex-col items-start">
                      <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase animate-pulse">Villám Akció</span>
                      <span className="text-green-400 text-xs font-bold">-50% Kedvezmény</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
                <button
                  onClick={scrollToForm}
                  className="bg-green-600 hover:bg-green-700 text-white text-xl font-black py-4 px-10 rounded-full shadow-lg shadow-green-900/50 transform transition hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl flex items-center justify-center gap-2 uppercase tracking-wide w-full sm:w-auto cursor-pointer"
                >
                  RENDELÉS MOST
                </button>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 pt-2">
                <div className="bg-slate-800/40 backdrop-blur-md border border-slate-700/50 rounded-xl grid grid-cols-3 divide-x divide-slate-700/50 overflow-hidden">
                  <div className="p-3 md:p-4 flex flex-col items-center justify-center text-center group hover:bg-slate-700/30 transition-colors">
                    <Truck className="w-6 h-6 text-slate-200 mb-1.5 group-hover:text-yellow-400 transition-colors" />
                    <span className="text-white font-bold text-[10px] md:text-xs uppercase tracking-wide mb-0.5">Szállítás</span>
                    <span className="text-slate-400 text-[9px] md:text-[11px]">Gyors 24/48 óra</span>
                  </div>
                  <div className="p-3 md:p-4 flex flex-col items-center justify-center text-center group hover:bg-slate-700/30 transition-colors">
                    <Banknote className="w-6 h-6 text-slate-200 mb-1.5 group-hover:text-yellow-400 transition-colors" />
                    <span className="text-white font-bold text-[10px] md:text-xs uppercase tracking-wide mb-0.5">Fizetés</span>
                    <span className="text-slate-400 text-[9px] md:text-[11px]">Átvételkor</span>
                  </div>
                  <div className="p-3 md:p-4 flex flex-col items-center justify-center text-center group hover:bg-slate-700/30 transition-colors">
                    <ShieldCheck className="w-6 h-6 text-slate-200 mb-1.5 group-hover:text-yellow-400 transition-colors" />
                    <span className="text-white font-bold text-[10px] md:text-xs uppercase tracking-wide mb-0.5">Garancia</span>
                    <span className="text-slate-400 text-[9px] md:text-[11px]">2 Év</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-12 bg-white fade-in-section">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center p-6 border border-slate-100 rounded-xl shadow-lg hover:shadow-xl transition bg-white hover:border-red-600/20 group">
              <div className="mb-4 p-4 bg-red-50 rounded-full group-hover:scale-110 transition">
                <Signal className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-slate-900">4K Ultra HD vétel</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Kristálytiszta kép, élénk színek és stabil jel. <span className="font-bold text-slate-900">Nincs több akadozás</span>, üdvözöld a 4K világát.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 border border-slate-100 rounded-xl shadow-lg hover:shadow-xl transition bg-white hover:border-red-600/20 group">
              <div className="mb-4 p-4 bg-red-50 rounded-full group-hover:scale-110 transition">
                <Tv className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-slate-900">Mozi és Stadion otthon</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Élvezd szabadon az <span className="font-bold text-slate-900">Élő focit, Sorozatokat és Premiereket</span> korlátozás nélkül, magas felbontásban.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 border border-slate-100 rounded-xl shadow-lg hover:shadow-xl transition bg-white hover:border-red-600/20 group">
              <div className="mb-4 p-4 bg-red-50 rounded-full group-hover:scale-110 transition">
                <Gamepad2 className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-slate-900">4-az-1-ben játékkonzol</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Az eszköz a TV-det erős konzollá változtatja. Játssz <span className="font-bold text-slate-900">Fortnite, GTA 5, FC 26</span> játékokat közvetlenül a hubról (kontroller mellékelve).</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 border border-slate-100 rounded-xl shadow-lg hover:shadow-xl transition bg-white hover:border-red-600/20 group">
              <div className="mb-4 p-4 bg-red-50 rounded-full group-hover:scale-110 transition">
                <Lock className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-slate-900">Szülői felügyelet</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Állíts be időkorlátot és blokkold a tartalmakat, hogy <span className="font-bold text-slate-900">biztonságban legyenek a gyerekek</span> játék közben.</p>
            </div>
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="py-16 bg-slate-50 fade-in-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">A gyakorlatban mit csinálhatsz vele <span className="text-red-600">minden nap</span>?</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Ez nem egy kütyü, amit háromszor használsz. Ez a te napi <span className="font-bold text-slate-900">szórakoztatóközpontod</span>.</p>
          </div>
          <div className="space-y-12">
            {/* Case 1 */}
            <div className="flex flex-col md:flex-row items-center gap-8 hover:scale-[1.01] transition duration-500">
              <div className="md:w-1/2 order-2 md:order-1">
                <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-red-600 h-full hover:shadow-xl transition">
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-3 text-slate-900">
                    <Clapperboard className="w-8 h-8 text-red-600" /> Filmek és sorozatok
                  </h3>
                  <p className="text-slate-600 mb-4 leading-relaxed">Nyisd meg a <span className="font-bold text-slate-900 bg-yellow-100 px-1">Netflixet, Maxot, Disney+-t, HBO Maxot és RTL+-t</span> ugyanazon a képernyőn. Nézz sorozatmaratonokat, élvezd a legújabb filmpremieret, kapcsolj gyerekeknek mesét... minden a nappali TV-n.</p>
                </div>
              </div>
              <div className="md:w-1/2 order-1 md:order-2">
                <img src="/images/superhub hu/4.png" alt="Family watching TV" className="rounded-2xl shadow-xl w-full" />
              </div>
            </div>
            {/* Case 2 */}
            <div className="flex flex-col md:flex-row items-center gap-8 hover:scale-[1.01] transition duration-500">
              <div className="md:w-1/2">
                <img src="/images/superhub hu/5.png" alt="Football match" className="rounded-2xl shadow-xl w-full" />
              </div>
              <div className="md:w-1/2">
                <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-blue-700 h-full hover:shadow-xl transition">
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-3 text-slate-900">
                    <Trophy className="w-8 h-8 text-blue-700" /> Élő foci és sport
                  </h3>
                  <p className="text-slate-600 mb-4 leading-relaxed">Éld át a <span className="font-bold text-slate-900 bg-blue-100 px-1">magyar bajnokságot, a Bajnokok Ligáját</span> mintha a stadionban lennél. Az olyan alkalmazásokkal, mint az <span className="font-bold text-slate-900">M4 Sport, Spíler1, Spíler2, Sport1 vagy Arena4</span>, könnyen követheted a legfontosabb meccseket és eseményeket.</p>
                </div>
              </div>
            </div>
            {/* Case 3 */}
            <div className="flex flex-col md:flex-row items-center gap-8 hover:scale-[1.01] transition duration-500">
              <div className="md:w-1/2 order-2 md:order-1">
                <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-purple-600 h-full hover:shadow-xl transition">
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-3 text-slate-900">
                    <Gamepad2 className="w-8 h-8 text-purple-600" /> Játék ismert címekkel
                  </h3>
                  <p className="text-slate-600 mb-4 leading-relaxed">Csatlakoztatod a kontrollert, megnyitod a felhőalapú platformot és játszol <span className="font-bold text-slate-900 bg-purple-100 px-1">Fortnite, GTA 5, FC 26</span> játékokkal. Fizikai konzol nélkül. Leülsz és játszol.</p>
                </div>
              </div>
              <div className="md:w-1/2 order-1 md:order-2">
                <img src="/images/superhub polonia/3.png" alt="Gaming setup" className="rounded-2xl shadow-xl w-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 bg-slate-900 text-white overflow-hidden fade-in-section">
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <span className="text-yellow-400 font-bold uppercase tracking-widest text-xs mb-2 block">Abszolút egyszerűség</span>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Telepítés 3 perc alatt</h2>
            <p className="text-slate-400 max-w-2xl mx-auto italic mt-2 font-medium">"Ha be tudsz dugni egy HDMI kábelt, fel tudod telepíteni a SuperVision Hub-ot."</p>
          </div>
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-1 bg-gradient-to-r from-slate-700 via-yellow-400/50 to-slate-700 -z-0 rounded-full"></div>
            {/* Steps */}
            <div className="relative z-10 flex flex-col items-center text-center group">
              <div className="w-24 h-24 bg-slate-800 rounded-full border-4 border-slate-700 flex items-center justify-center mb-6 shadow-xl group-hover:border-yellow-400 transition-colors duration-300">
                <PlugZap className="w-10 h-10 text-slate-300 group-hover:text-yellow-400 transition-colors" />
              </div>
              <h3 className="text-xl font-bold mb-3">Csatlakoztasd a TV-hez</h3>
              <p className="text-slate-400 text-sm max-w-xs">Dugd be a HDMI kábelt (mellékelve) és a tápkábelt. Smart TV-n és régebbi modelleken is működik.</p>
            </div>
            <div className="relative z-10 flex flex-col items-center text-center group">
              <div className="w-24 h-24 bg-slate-800 rounded-full border-4 border-slate-700 flex items-center justify-center mb-6 shadow-xl group-hover:border-yellow-400 transition-colors duration-300">
                <Wifi className="w-10 h-10 text-slate-300 group-hover:text-yellow-400 transition-colors" />
              </div>
              <h3 className="text-xl font-bold mb-3">Csatlakozz Wi-Fi-hez</h3>
              <p className="text-slate-400 text-sm max-w-xs">Kapcsold be és válaszd ki a hálózatot. Írd be a jelszót csak egyszer és máris online vagy.</p>
            </div>
            <div className="relative z-10 flex flex-col items-center text-center group">
              <div className="w-24 h-24 bg-slate-800 rounded-full border-4 border-slate-700 flex items-center justify-center mb-6 shadow-xl group-hover:border-yellow-400 transition-colors duration-300">
                <PlayCircle className="w-10 h-10 text-slate-300 group-hover:text-yellow-400 transition-colors" />
              </div>
              <h3 className="text-xl font-bold mb-3">Nyomd meg a Play-t</h3>
              <p className="text-slate-400 text-sm max-w-xs">Kész! Válassz filmet, meccset vagy indíts játékot a kontrollerrel.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="py-16 bg-white fade-in-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Ez nem egy hagyományos dekóder. Ez egy <span className="text-red-600 underline decoration-2 decoration-red-600/50">4-az-1-ben eszköz</span>.</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 group hover:shadow-lg transition">
              <div className="mb-4 inline-block p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200">
                <Radio className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-slate-900">Vétel <span className="text-blue-700">4K PRO</span></h3>
              <p className="text-sm text-slate-600">Abszolút stabilitás 4K Ultra HD-ben.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 group hover:shadow-lg transition">
              <div className="mb-4 inline-block p-3 bg-red-100 rounded-lg group-hover:bg-red-200">
                <Tv className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-slate-900">Smart TV <span className="text-red-600">Hub</span></h3>
              <p className="text-sm text-slate-600">Netflix, Max, HBO Max, RTL+ és Spíler egy menüben.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 group hover:shadow-lg transition">
              <div className="mb-4 inline-block p-3 bg-purple-100 rounded-lg group-hover:bg-purple-200">
                <Gamepad2 className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-slate-900">Gaming <span className="text-purple-700">"next-gen"</span></h3>
              <p className="text-sm text-slate-600">Játssz AAA címekkel a felhőben.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 group hover:shadow-lg transition">
              <div className="mb-4 inline-block p-3 bg-green-100 rounded-lg group-hover:bg-green-200">
                <Globe className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-slate-900">Könyvtár <span className="text-green-700">Hatalmas</span></h3>
              <p className="text-sm text-slate-600">Hozzáférés ezernyi csatornához és játékhoz.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="py-16 bg-slate-100 fade-in-section">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-center text-slate-900 mb-12">Hogyan fogod használni otthon?</h2>
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row bg-white rounded-xl shadow overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="md:w-1/3 bg-cover bg-center h-48 md:h-auto" style={{backgroundImage: "url('/images/superhub polonia/cinema2.jpeg')"}}></div>
              <div className="p-6 md:w-2/3 flex flex-col justify-center">
                <h3 className="font-bold text-xl mb-2 flex items-center gap-2 text-slate-900">
                  <Users className="w-6 h-6 text-red-600" /> Netflix este a családdal
                </h3>
                <p className="text-slate-600 text-sm">Bekapcsolod a TV-t, a gyerekek mesét néznek, ti sorozatot. A nagy képernyő visszatér az otthon központjába.</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row bg-white rounded-xl shadow overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="md:w-1/3 bg-cover bg-center h-48 md:h-auto md:order-2" style={{backgroundImage: "url('/images/superhub polonia/calcio2.jpeg')"}}></div>
              <div className="p-6 md:w-2/3 flex flex-col justify-center md:order-1">
                <h3 className="font-bold text-xl mb-2 flex items-center gap-2 text-slate-900">
                  <Trophy className="w-6 h-6 text-blue-700" /> Meccs mint a stadionban
                </h3>
                <p className="text-slate-600 text-sm">Bajnokok Ligája este. A kép stabil, mindent látsz a kedvenc alkalmazásaidban.</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row bg-white rounded-xl shadow overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="md:w-1/3 bg-cover bg-center h-48 md:h-auto" style={{backgroundImage: "url('/images/superhub polonia/gioco2.jpeg')"}}></div>
              <div className="p-6 md:w-2/3 flex flex-col justify-center">
                <h3 className="font-bold text-xl mb-2 flex items-center gap-2 text-slate-900">
                  <Gamepad2 className="w-6 h-6 text-purple-600" /> Játék szesszió
                </h3>
                <p className="text-slate-600 text-sm">Csatlakoztatod a kontrollert, elindítod a Fortnite-ot vagy az FC 26-ot. A gyerekek azt hiszik, új konzolt vettél.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TARGET AUDIENCE */}
      <section className="py-12 bg-white fade-in-section">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-slate-900">A SuperVision Hub tökéletes neked, ha...</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 border rounded-lg text-center bg-slate-50">
              <div className="inline-block p-3 bg-red-100 rounded-full mb-4">
                <Users className="text-red-600 w-6 h-6" />
              </div>
              <h3 className="font-bold mb-2 text-slate-900">Van családod</h3>
              <p className="text-sm text-slate-600">Ajándék, amit mindenki használ: mesék, filmek, játékok.</p>
            </div>
            <div className="p-6 border rounded-lg text-center bg-slate-50">
              <div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
                <Trophy className="text-blue-700 w-6 h-6" />
              </div>
              <h3 className="font-bold mb-2 text-slate-900">Szereted a focit és a sportot</h3>
              <p className="text-sm text-slate-600">Meccsek stabil képpel és minden alkalmazással kéznél.</p>
            </div>
            <div className="p-6 border rounded-lg text-center bg-slate-50">
              <div className="inline-block p-3 bg-purple-100 rounded-full mb-4">
                <Tv className="text-purple-600 w-6 h-6" />
              </div>
              <h3 className="font-bold mb-2 text-slate-900">Van egy "régi" TV-d</h3>
              <p className="text-sm text-slate-600">Ne dobd ki, fejleszd!</p>
            </div>
          </div>
        </div>
      </section>

      {/* BOX CONTENT */}
      <section className="py-12 bg-slate-900 text-white fade-in-section">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2 rounded-xl shadow-2xl border-2 border-slate-700 overflow-hidden h-80 md:h-96 bg-white flex items-center justify-center">
            <img
              src="/images/superhub polonia/_SuperVision Hub. img principale.png"
              alt="SuperVision Hub Box"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-6">Kinyitod a dobozt és minden megvan</h2>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-xs font-bold">
                  <Check className="w-4 h-4 text-white" />
                </span> SuperVision Hub 4-az-1-ben fő egység
              </li>
              <li className="flex items-center gap-3 font-bold text-yellow-400">
                <span className="w-6 h-6 rounded-full bg-yellow-400 text-black flex items-center justify-center text-xs font-bold">
                  <Check className="w-4 h-4 text-black" />
                </span> Vezeték nélküli kontroller INGYEN
              </li>
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-xs font-bold">
                  <Check className="w-4 h-4 text-white" />
                </span> HDMI 4K Ultra Speed kábel
              </li>
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-xs font-bold">
                  <Check className="w-4 h-4 text-white" />
                </span> Koaxiális árnyékolt kábel + Tápegység
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* WHY BUY NOW */}
      <section className="py-12 bg-red-700 text-white fade-in-section">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold mb-8">Miért érdemes <span className="underline decoration-white/30 underline-offset-4">MOST</span> venni?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20">
              <Gift className="mb-3 w-8 h-8 text-yellow-400" />
              <h3 className="font-bold text-xl mb-2">Okos ajándék</h3>
              <p className="text-sm text-white/90">Mindenki használja: gyerekek játékhoz, te a meccsekhez.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20">
              <TrendingDown className="mb-3 w-8 h-8 text-yellow-400" />
              <h3 className="font-bold text-xl mb-2">Megtakarítás</h3>
              <p className="text-sm text-white/90">Smart TV + Konzol vagyonba kerül. Itt a fő funkciókat töredék áron kapod.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20">
              <Clock className="mb-3 w-8 h-8 text-yellow-400" />
              <h3 className="font-bold text-xl mb-2">Limitált akció</h3>
              <p className="text-sm text-white/90">Kedvezmény és ingyen kontroller csak az akciós darabokhoz.</p>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-16 bg-slate-50 fade-in-section">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10 text-slate-900">Mit mondanak a családok</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md border border-slate-100">
              <div className="flex gap-1 text-yellow-400 mb-4">★★★★★</div>
              <p className="text-slate-600 mb-4 italic">"Nagyszerű vásárlás. A gyerekek játszanak, mi sorozatot nézünk."</p>
              <div className="font-bold text-slate-900">Márk, 38 éves</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border border-slate-100">
              <div className="flex gap-1 text-yellow-400 mb-4">★★★★★</div>
              <p className="text-slate-600 mb-4 italic">"A fiam streamelve játszik, én meccseket nézek."</p>
              <div className="font-bold text-slate-900">Anna, 41 éves</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border border-slate-100">
              <div className="flex gap-1 text-yellow-400 mb-4">★★★★★</div>
              <p className="text-slate-600 mb-4 italic">"Az útmutató egyértelmű. Csatlakoztattam és működik."</p>
              <div className="font-bold text-slate-900">Katalin, 56 éves</div>
            </div>
          </div>
        </div>
      </section>

      {/* GUARANTEE */}
      <section className="py-10 bg-white border-t border-b border-slate-100 fade-in-section">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-8 text-slate-900">Nulla kockázat: átvételkor fizetsz</h2>
          <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-16">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-3">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-900">2 év garancia</h4>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-3">
                <Truck className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-900">Fizetés átvételkor</h4>
            </div>
          </div>
        </div>
      </section>

      {/* ORDER FORM */}
      <div id="order-form" className="py-16 bg-slate-900 text-white fade-in-section">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-10">Változtasd meg a TV-det MA</h2>
          <div className="flex flex-col lg:flex-row gap-10 max-w-5xl mx-auto">
            <div className="lg:w-1/2 bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-2xl">
              <h3 className="text-xl font-bold mb-6 text-yellow-400 uppercase">Összefoglaló</h3>
              <div className="bg-slate-700/50 p-4 rounded-xl border border-slate-600 mb-6">
                <h4 className="font-bold text-lg text-white mb-3">1x SuperVision Hub 4-az-1-ben</h4>
                <ul className="space-y-2 text-slate-300 text-sm">
                  <li>PRO 4K vevő</li>
                  <li>Smart TV Hub</li>
                  <li>Játékkonzol</li>
                </ul>
              </div>
              <div className="bg-green-900/30 p-4 rounded-xl border border-green-700/50 mb-6 relative">
                <div className="absolute top-2 right-2 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded">Ingyen</div>
                <h4 className="font-bold text-lg text-white mb-1">Vezeték nélküli kontroller</h4>
                <p className="text-xs text-green-300">56 990 Ft értékben - INGYEN</p>
              </div>
              <div className="bg-slate-900 p-5 rounded-lg text-center border-2 border-dashed border-yellow-400/30">
                <p className="text-slate-400 text-sm line-through">Eredeti ár: 47 998 Ft</p>
                <p className="text-4xl font-black text-white">23 999 Ft</p>
              </div>
            </div>
            <div className="lg:w-1/2 bg-white text-slate-900 p-8 rounded-2xl shadow-2xl border-t-4 border-green-600">
              <h3 className="text-2xl font-bold mb-6 text-center">Szállítás és fizetés</h3>
              <form onSubmit={handleFormSubmit} style={{ display: 'grid', gap: '1rem' }}>
                <input type="hidden" name="tmfp" />

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', marginBottom: '4px', display: 'block' }}>TELJES NÉV</label>
                  <input
                    required
                    type="text"
                    placeholder="Nagy István"
                    value={orderData.name}
                    onChange={(e) => setOrderData({...orderData, name: e.target.value})}
                    style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#F8FAFC' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', marginBottom: '4px', display: 'block' }}>TELJES CÍM</label>
                  <input
                    required
                    type="text"
                    placeholder="Petőfi utca 10, 1052 Budapest"
                    value={orderData.address}
                    onChange={(e) => setOrderData({...orderData, address: e.target.value})}
                    style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#F8FAFC' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', marginBottom: '4px', display: 'block' }}>TELEFON</label>
                  <input
                    required
                    type="tel"
                    placeholder="+36 20 123 4567"
                    value={orderData.phone}
                    onChange={(e) => setOrderData({...orderData, phone: e.target.value})}
                    style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#F8FAFC' }}
                  />
                </div>

                {/* Trust Badges */}
                <div style={{ margin: '1rem 0', padding: '1.5rem', background: '#F8FAFC', border: '2px solid #E2E8F0', borderRadius: '12px' }}>
                  <div style={{ display: 'grid', gap: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '14px', flexShrink: 0 }}>✓</div>
                      <span style={{ fontSize: '0.9rem', color: '#1E293B', fontWeight: 600 }}>Fizetés átvételkor</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#FF8C00', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '14px', flexShrink: 0 }}>⚡</div>
                      <span style={{ fontSize: '0.9rem', color: '#1E293B', fontWeight: 600 }}>Ingyenes kiszállítás 24-48 órán belül</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#3B82F6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '14px', flexShrink: 0 }}>↺</div>
                      <span style={{ fontSize: '0.9rem', color: '#1E293B', fontWeight: 600 }}>30 napos ingyenes visszaküldés</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#8B5CF6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '14px', flexShrink: 0 }}>★</div>
                      <span style={{ fontSize: '0.9rem', color: '#1E293B', fontWeight: 600 }}>2 év garancia a csomagban</span>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  style={{
                    width: '100%',
                    padding: '1.2rem',
                    borderRadius: '12px',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    border: 'none',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    background: isSubmitting ? '#9CA3AF' : 'linear-gradient(135deg, #16A34A 0%, #22C55E 100%)',
                    color: 'white',
                    boxShadow: '0 10px 25px -5px rgba(22, 163, 74, 0.4)',
                    transition: 'all 0.3s ease',
                    opacity: isSubmitting ? 0.6 : 1
                  }}
                  disabled={isSubmitting}
                >
                  <span>{isSubmitting ? 'KÜLDÉS...' : 'RENDELÉS MEGERŐSÍTÉSE'}</span>
                  {!isSubmitting && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <section className="py-16 bg-slate-50 fade-in-section">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-extrabold text-center text-slate-900 mb-8">Gyakori kérdések</h2>
          <div className="space-y-4">
            <details className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm group">
              <summary className="flex justify-between items-center p-5 cursor-pointer font-bold text-slate-800 text-lg list-none">
                Működik régi TV-vel is? <ChevronDown className="w-5 h-5 group-open:rotate-180 transition" />
              </summary>
              <div className="p-5 pt-0 text-slate-600">Igen, elég egy HDMI bemenet.</div>
            </details>
            <details className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm group">
              <summary className="flex justify-between items-center p-5 cursor-pointer font-bold text-slate-800 text-lg list-none">
                Tudok Fortnite-ot játszani? <ChevronDown className="w-5 h-5 group-open:rotate-180 transition" />
              </summary>
              <div className="p-5 pt-0 text-slate-600">Igen, felhőalapú streameléssel a mellékelt kontroller használatával.</div>
            </details>
            <details className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm group">
              <summary className="flex justify-between items-center p-5 cursor-pointer font-bold text-slate-800 text-lg list-none">
                Kell hozzá szakember? <ChevronDown className="w-5 h-5 group-open:rotate-180 transition" />
              </summary>
              <div className="p-5 pt-0 text-slate-600">Nem, a telepítés 3 percet vesz igénybe.</div>
            </details>
          </div>
        </div>
      </section>

      {/* STICKY CTA */}
      <div
        className={`fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 p-3 shadow-2xl z-50 flex items-center justify-between md:justify-center gap-6 transition-transform duration-300 ${stickyCTAVisible ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <div className="hidden md:block font-bold text-lg text-slate-900">Az akció hamarosan lejár!</div>
        <div className="md:hidden flex flex-col">
          <span className="text-xs text-slate-500 line-through">47 998 Ft</span>
          <div className="flex items-baseline gap-1">
            <span className="font-black text-slate-900 text-xl">23 999 Ft</span>
            <span className="text-xs font-bold text-red-600 bg-red-100 px-1 rounded">-50%</span>
          </div>
        </div>
        <button onClick={scrollToForm} className="bg-green-600 hover:bg-green-700 text-white font-black py-3 px-8 rounded-lg shadow-lg uppercase">
          RENDELÉS MOST
        </button>
      </div>
    </>
  );
}
