'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { PRODUCT_NAME, PRICE_PROMO, PRICE_LIST, CURRENCY, NETWORK_UID, NETWORK_KEY, NETWORK_OFFER, NETWORK_LP, THANK_YOU_PAGE } from '../lib/constants';
import { ShieldCheck, ArrowRight, Clock } from 'lucide-react';
import { useFacebookTracking } from '@/app/hooks/useFacebookTracking';
import { saveLeadSupertrend } from '@/app/lib/supabase-supertrend';

declare global {
  interface Window {
    tmfp?: string;
  }
}

const OrderForm: React.FC = () => {
  const router = useRouter();
  const { trackLeadEvent, saveUserData } = useFacebookTracking();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    fullAddress: ''
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes in seconds
  const fingerPrintLoaded = useRef(false);

  // Load fingerprint script
  useEffect(() => {
    if (fingerPrintLoaded.current) return;
    fingerPrintLoaded.current = true;

    const script = document.createElement('script');
    script.src = 'https://offers.supertrendaffiliateprogram.com/forms/tmfp/';
    script.crossOrigin = 'anonymous';
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  // Timer Countdown Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Check validation whenever formData changes
  useEffect(() => {
    const { fullName, phone, fullAddress } = formData;
    const isValid =
      fullName.trim() !== '' &&
      phone.trim() !== '' &&
      fullAddress.trim() !== '';
    setIsFormValid(isValid);
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || isSubmitting) return;

    setIsSubmitting(true);

    try {
      // Get UTM params from URL
      const urlParams = new URLSearchParams(window.location.search);

      // Facebook Lead tracking - prepare user data
      const nameParts = formData.fullName.trim().split(' ');
      const nome = nameParts[0] || '';
      const cognome = nameParts.slice(1).join(' ') || '';

      const userData = {
        nome,
        cognome,
        telefono: formData.phone.trim(),
        indirizzo: formData.fullAddress.trim()
      };

      saveUserData(userData);

      // 1. SAVE TO SUPABASE FIRST (before sending to network)
      const priceValue = parseFloat(PRICE_PROMO.replace(/\s/g, ''));
      await saveLeadSupertrend({
        landing_page: 'fb-robotcleanprox-czk',
        product: PRODUCT_NAME,
        customer_name: formData.fullName,
        phone: formData.phone,
        address: formData.fullAddress,
        price: priceValue,
        currency: CURRENCY,
        utm_source: urlParams.get('utm_source') || undefined,
        utm_campaign: urlParams.get('utm_campaign') || undefined,
        network_response: 'PENDING'
      });

      const payload = new URLSearchParams({
        uid: NETWORK_UID,
        key: NETWORK_KEY,
        offer: NETWORK_OFFER,
        lp: NETWORK_LP,
        name: formData.fullName,
        tel: formData.phone,
        'street-address': formData.fullAddress,
        tmfp: window.tmfp || '',
        utm_source: urlParams.get('utm_source') || '',
        utm_medium: urlParams.get('utm_medium') || '',
        utm_campaign: urlParams.get('utm_campaign') || '',
        utm_content: urlParams.get('utm_content') || '',
        utm_term: urlParams.get('utm_term') || '',
        sub1: urlParams.get('sub1') || '',
        sub2: urlParams.get('sub2') || '',
        sub3: urlParams.get('sub3') || '',
        sub4: urlParams.get('sub4') || '',
        sub5: urlParams.get('sub5') || '',
      });

      const response = await fetch('https://offers.supertrendaffiliateprogram.com/forms/api/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: payload.toString(),
      });

      if (response.ok) {
        const responseData = await response.json();

        // 2. UPDATE SUPABASE WITH NETWORK RESPONSE
        await saveLeadSupertrend({
          landing_page: 'fb-robotcleanprox-czk',
          product: PRODUCT_NAME,
          customer_name: formData.fullName,
          phone: formData.phone,
          address: formData.fullAddress,
          price: priceValue,
          currency: CURRENCY,
          utm_source: urlParams.get('utm_source') || undefined,
          utm_campaign: urlParams.get('utm_campaign') || undefined,
          network_response: responseData.message || 'OK',
          network_raw: responseData
        });

        // Only track Lead if not a duplicate
        if (responseData.message !== 'DOUBLE') {
          await trackLeadEvent(userData, {
            content_name: PRODUCT_NAME,
            currency: 'CZK',
            value: priceValue
          });
        }

        router.push(THANK_YOU_PAGE);
      } else {
        // Save error response to Supabase
        await saveLeadSupertrend({
          landing_page: 'fb-robotcleanprox-czk',
          product: PRODUCT_NAME,
          customer_name: formData.fullName,
          phone: formData.phone,
          address: formData.fullAddress,
          price: priceValue,
          currency: CURRENCY,
          network_response: 'HTTP_ERROR_' + response.status,
          network_raw: { status: response.status, statusText: response.statusText }
        });
        alert('Chyba pri odesilani objednavky. Zkuste to prosim znovu.');
        setIsSubmitting(false);
      }
    } catch (error) {
      // Save exception to Supabase
      await saveLeadSupertrend({
        landing_page: 'fb-robotcleanprox-czk',
        product: PRODUCT_NAME,
        customer_name: formData.fullName,
        phone: formData.phone,
        address: formData.fullAddress,
        network_response: 'EXCEPTION',
        network_raw: { error: String(error) }
      });
      alert('Chyba pripojeni. Zkuste to prosim znovu.');
      setIsSubmitting(false);
    }
  };

  return (
    <section id="order-form" className="py-10 px-4 bg-red-600">
      <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden relative">

        {/* Urgency Ribbon */}
        <div className="absolute top-0 right-0 bg-yellow-400 text-red-900 text-xs font-black px-3 py-1 rounded-bl-xl z-10">
            SLEVA -50% AKTIVNI
        </div>

        {/* Form Header */}
        <div className="bg-gray-900 p-6 text-center text-white">
          <h3 className="text-2xl font-black uppercase tracking-wide">Objednavkovy Formular</h3>
          <p className="text-gray-300 text-sm mt-1">Vyplnte pro ziskani nabidky</p>
        </div>

        {/* Product Recap */}
        <div className="p-4 bg-yellow-50 border-b border-gray-200 flex justify-between items-center">
            <div>
                <span className="font-bold text-gray-800 block">{PRODUCT_NAME} + Prislusenstvi</span>
                <span className="text-xs text-green-600 font-bold bg-green-100 px-2 py-0.5 rounded">DOPRAVA ZDARMA</span>
            </div>
            <div className="text-right">
                <span className="block text-gray-400 line-through text-sm">{PRICE_LIST} {CURRENCY}</span>
                <span className="block text-red-600 font-black text-2xl">{PRICE_PROMO} {CURRENCY}</span>
            </div>
        </div>

        {/* Countdown Timer */}
        <div className="bg-red-50 p-2 flex justify-center items-center gap-2 text-red-600 font-bold text-sm border-b border-red-100 animate-pulse">
            <Clock size={16} />
            <span>Nabidka vyprsi za: {formatTime(timeLeft)}</span>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">

          {/* Field 1: Name */}
          <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Jmeno a Prijmeni <span className="text-red-500">*</span></label>
              <input
                required
                type="text"
                name="fullName"
                placeholder="Napr.: Jan Novak"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full border-2 border-gray-300 rounded-lg p-3 text-base focus:outline-none focus:border-green-500 transition-colors bg-white text-gray-900 placeholder-gray-400"
              />
          </div>

          {/* Field 2: Phone */}
          <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Telefon (mobil) <span className="text-red-500">*</span></label>
              <input
                required
                type="tel"
                name="phone"
                placeholder="Napr.: 777 123 456"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border-2 border-gray-300 rounded-lg p-3 text-base focus:outline-none focus:border-green-500 transition-colors bg-white text-gray-900 placeholder-gray-400"
              />
          </div>

          {/* Field 3: Full Address (Merged) */}
          <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                  Uplna Adresa <span className="text-red-500">*</span> <br/>
                  <span className="text-xs font-normal text-gray-500">(Ulice, cislo popisne, PSC, mesto)</span>
              </label>
              <textarea
                required
                name="fullAddress"
                rows={3}
                placeholder="Napr.: Karlova 10, 110 00 Praha 1"
                value={formData.fullAddress}
                onChange={handleChange}
                className="w-full border-2 border-gray-300 rounded-lg p-3 text-base focus:outline-none focus:border-green-500 transition-colors resize-none bg-white text-gray-900 placeholder-gray-400"
              />
          </div>

          <div className="bg-gray-100 p-3 rounded text-sm text-gray-600 flex items-start gap-2">
            <ShieldCheck size={20} className="shrink-0 text-green-600" />
            <p>Vase udaje jsou v bezpeci a budou pouzity pouze pro dopravu.</p>
          </div>

          <button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className={`w-full font-black text-xl py-4 rounded-xl shadow-xl transform transition flex justify-center items-center gap-2 border-b-4
                ${isFormValid && !isSubmitting
                    ? 'bg-green-600 hover:bg-green-700 text-white border-green-800 active:scale-95 cursor-pointer'
                    : 'bg-gray-300 text-gray-500 border-gray-400 cursor-not-allowed opacity-70'}
            `}
          >
            <span>{isSubmitting ? 'ODESILANI...' : 'POTVRDIT OBJEDNAVKU'}</span>
            <ArrowRight size={24} strokeWidth={3} />
          </button>

          {!isFormValid && (
              <p className="text-center text-xs text-red-500 font-bold">
                  Vyplnte vsechna povinna pole pro odemknuti tlacitka.
              </p>
          )}

          <div className="text-center text-xs text-gray-500 mt-2 font-medium">
             Platba na dobirku • Zadna zaloha
          </div>
        </form>
      </div>
    </section>
  );
};

export default OrderForm;
