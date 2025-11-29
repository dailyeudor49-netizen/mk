
'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Lock, AlertTriangle, Gift, CreditCard, Signal, PhoneCall, Truck } from 'lucide-react';

interface LeadFormProps {
  variant?: 'hero' | 'inline';
}

const LeadForm: React.FC<LeadFormProps> = ({ variant = 'hero' }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [stockLeft, setStockLeft] = useState(9);

  // Fake stock depletion logic for urgency
  useEffect(() => {
    const interval = setInterval(() => {
      setStockLeft((prev) => (prev > 2 ? prev - 1 : prev));
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('lead_submitted_pl')) {
      setIsSubmitted(true);
    }
  }, []);

  useEffect(() => {
    const handleOpenForm = () => {
      // Logic for handling open form event if needed
    };
    window.addEventListener('openOrderForm', handleOpenForm);
    return () => window.removeEventListener('openOrderForm', handleOpenForm);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      if(typeof window !== 'undefined') {
          localStorage.setItem('lead_submitted_pl', 'true');
      }
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white p-8 rounded-2xl shadow-xl text-center border-2 border-green-500"
      >
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={40} />
        </div>
        <h3 className="text-2xl font-bold text-[#1a2744] mb-2">Zgłoszenie Otrzymane!</h3>
        <p className="text-gray-600 mb-6 font-medium">
            Twoje zamówienie jeszcze nie zostało wysłane.
        </p>
        <div className="bg-blue-50 p-5 rounded-xl text-left border border-blue-100">
            <h4 className="font-bold text-blue-800 flex items-center gap-2 mb-2">
                <PhoneCall size={18} /> Następny Krok: Potwierdzenie
            </h4>
            <p className="text-sm text-blue-800/80 leading-relaxed">
                Nasz konsultant skontaktuje się z Tobą wkrótce (przez <strong>Telefon</strong> lub <strong>WhatsApp</strong>) aby potwierdzić adres. <br/><br/>
                Wysyłka nastąpi <strong>dopiero po Twojej telefonicznej konfirmacji</strong>.
            </p>
        </div>
      </motion.div>
    );
  }

  const isHero = variant === 'hero';

  return (
    <motion.div
      id="order-form"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`bg-white rounded-2xl shadow-2xl overflow-hidden border-2 ${isHero ? 'border-red-600' : 'border-gray-200'}`}
    >
      {/* Header Form */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 p-4 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-white/20 animate-pulse"></div>
        <h3 className="text-white font-black text-xl md:text-2xl uppercase italic tracking-wider flex items-center justify-center gap-2">
            <Gift className="animate-bounce" size={24} /> PROMOCJA ŚWIĄTECZNA
        </h3>
        <div className="flex items-center justify-center gap-2 text-yellow-300 text-sm font-bold mt-1 bg-red-800/50 py-1 rounded-full inline-flex px-4">
            <AlertTriangle size={14} />
            <span>OSTATNIE {stockLeft} SZTUK NA MAGAZYNIE</span>
        </div>
      </div>

      {/* Pricing & Benefits */}
      <div className="p-5 bg-white">
        <div className="flex items-end justify-center gap-3 mb-4 relative">
            <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-black px-2 py-1 rounded-full transform rotate-12 shadow-lg">
                -50%
            </div>
            <div className="flex flex-col items-end">
                <span className="text-gray-400 text-sm font-semibold">Cena Katalogowa</span>
                <span className="text-gray-400 text-lg line-through decoration-red-500 decoration-2 font-bold">858 zł</span>
            </div>
            <span className="text-5xl md:text-6xl font-black text-[#1a2744] tracking-tighter">429<span className="text-3xl"> zł</span></span>
        </div>

        {/* Progress Bar for Stock */}
        <div className="w-full bg-gray-100 rounded-full h-3 mb-5 border border-gray-200">
            <div className="bg-gradient-to-r from-yellow-400 to-red-500 h-full rounded-full shadow-[0_0_10px_rgba(239,68,68,0.5)]" style={{ width: `${(9/stockLeft) * 10 + 60}%` }}></div>
        </div>

        <div className="space-y-2 mb-6">
            <div className="flex items-center gap-3 text-sm text-gray-800 bg-green-50 p-2.5 rounded-lg border border-green-100">
                <Signal className="text-green-600 flex-shrink-0" size={20} />
                <span className="font-bold">Karta SIM 4G w Zestawie (Bez WiFi? Bez Problemu)</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-800 bg-blue-50 p-2.5 rounded-lg border border-blue-100">
                <Truck className="text-blue-600 flex-shrink-0" size={20} />
                <span className="font-bold">Szybka Dostawa Przed Świętami</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-800 bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                <CheckCircle className="text-gray-600 flex-shrink-0" size={20} />
                <span className="font-bold">Płatność Przy Odbiorze</span>
            </div>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-3">
            <div className="relative">
                <label className="block text-sm font-bold text-[#1a2744] mb-1">Imię i Nazwisko</label>
                <input
                    required
                    type="text"
                    className="w-full pl-4 pr-4 py-4 rounded-xl border-2 border-gray-200 bg-gray-50 text-[#1a2744] placeholder-gray-400 placeholder:text-sm placeholder:font-normal focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10 outline-none transition-all font-bold"
                    placeholder="np. Jan Kowalski"
                />
            </div>
            <div className="relative">
                <label className="block text-sm font-bold text-[#1a2744] mb-1">Pełny Adres Dostawy</label>
                <input
                    required
                    type="text"
                    className="w-full pl-4 pr-4 py-4 rounded-xl border-2 border-gray-200 bg-gray-50 text-[#1a2744] placeholder-gray-400 placeholder:text-sm placeholder:font-normal focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10 outline-none transition-all font-bold"
                    placeholder="np. ul. Marszałkowska 10/5, 00-001 Warszawa"
                />
            </div>
            <div className="relative">
                <label className="block text-sm font-bold text-[#1a2744] mb-1">Numer Telefonu</label>
                <input
                    required
                    type="tel"
                    className="w-full pl-4 pr-4 py-4 rounded-xl border-2 border-gray-200 bg-gray-50 text-[#1a2744] placeholder-gray-400 placeholder:text-sm placeholder:font-normal focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10 outline-none transition-all font-bold"
                    placeholder="np. +48 600 123 456"
                />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#10b981] hover:bg-[#059669] text-white font-black text-base py-5 rounded-xl shadow-[0_4px_14px_0_rgba(16,185,129,0.39)] transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 uppercase tracking-wide cursor-pointer mt-4"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Proszę czekać...
                </>
              ) : (
                <>
                  ODBIERZ I ZAPŁAĆ KURIEROWI
                </>
              )}
            </button>
            <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mt-2">
                <CreditCard size={14} className="text-gray-400"/>
                <span>Karta kredytowa nie jest wymagana</span>
            </div>
        </form>

        <div className="mt-4 flex items-center justify-center gap-1.5 text-[10px] text-gray-400 uppercase tracking-widest font-semibold">
            <Lock size={12} />
            <span>Twoje dane są bezpieczne</span>
        </div>
      </div>
    </motion.div>
  );
};

export default LeadForm;
