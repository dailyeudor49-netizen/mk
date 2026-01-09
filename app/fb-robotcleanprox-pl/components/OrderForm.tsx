'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { PRODUCT_NAME, PRICE_PROMO, PRICE_LIST, CURRENCY, NETWORK_UID, NETWORK_KEY, NETWORK_OFFER, NETWORK_LP, THANK_YOU_PAGE } from '../lib/constants';
import { useFacebookTracking } from '@/app/hooks/useFacebookTracking';
import { ShieldCheck, ArrowRight, Clock } from 'lucide-react';

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
      // Facebook Lead tracking
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

      // Get UTM params from URL
      const urlParams = new URLSearchParams(window.location.search);

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
        if (responseData.message !== 'DOUBLE') {
          await trackLeadEvent(userData, {
            content_name: PRODUCT_NAME,
            currency: 'PLN',
            value: parseFloat(PRICE_PROMO.replace(/\s/g, ''))
          });
        }

        router.push(THANK_YOU_PAGE);
      } else {
        alert('Wystąpił błąd. Spróbuj ponownie.');
        setIsSubmitting(false);
      }
    } catch {
      alert('Wystąpił błąd połączenia. Spróbuj ponownie.');
      setIsSubmitting(false);
    }
  };

  return (
    <section id="order-form" className="py-10 px-4 bg-red-600">
      <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden relative">

        {/* Urgency Ribbon */}
        <div className="absolute top-0 right-0 bg-yellow-400 text-red-900 text-xs font-black px-3 py-1 rounded-bl-xl z-10">
            RABAT -50% AKTYWNY
        </div>

        {/* Form Header */}
        <div className="bg-gray-900 p-6 text-center text-white">
          <h3 className="text-2xl font-black uppercase tracking-wide">Formularz Zamówienia</h3>
          <p className="text-gray-300 text-sm mt-1">Wypełnij, aby otrzymać ofertę</p>
        </div>

        {/* Product Recap */}
        <div className="p-4 bg-yellow-50 border-b border-gray-200 flex justify-between items-center">
            <div>
                <span className="font-bold text-gray-800 block">{PRODUCT_NAME} + Akcesoria</span>
                <span className="text-xs text-green-600 font-bold bg-green-100 px-2 py-0.5 rounded">DARMOWA WYSYŁKA</span>
            </div>
            <div className="text-right">
                <span className="block text-gray-400 line-through text-sm">{PRICE_LIST} {CURRENCY}</span>
                <span className="block text-red-600 font-black text-2xl">{PRICE_PROMO} {CURRENCY}</span>
            </div>
        </div>

        {/* Countdown Timer */}
        <div className="bg-red-50 p-2 flex justify-center items-center gap-2 text-red-600 font-bold text-sm border-b border-red-100 animate-pulse">
            <Clock size={16} />
            <span>Oferta wygasa za: {formatTime(timeLeft)}</span>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">

          {/* Field 1: Name */}
          <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Imię i Nazwisko <span className="text-red-500">*</span></label>
              <input
                required
                type="text"
                name="fullName"
                placeholder="Np: Jan Kowalski"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full border-2 border-gray-300 rounded-lg p-3 text-base focus:outline-none focus:border-green-500 transition-colors bg-white text-gray-900 placeholder-gray-400"
              />
          </div>

          {/* Field 2: Phone */}
          <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Telefon (Komórkowy) <span className="text-red-500">*</span></label>
              <input
                required
                type="tel"
                name="phone"
                placeholder="Np: 501 234 567"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border-2 border-gray-300 rounded-lg p-3 text-base focus:outline-none focus:border-green-500 transition-colors bg-white text-gray-900 placeholder-gray-400"
              />
          </div>

          {/* Field 3: Full Address (Merged) */}
          <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                  Pełny Adres <span className="text-red-500">*</span> <br/>
                  <span className="text-xs font-normal text-gray-500">(Ulica, Numer, Kod pocztowy, Miasto)</span>
              </label>
              <textarea
                required
                name="fullAddress"
                rows={3}
                placeholder="Np: ul. Marszałkowska 10/5, 00-001 Warszawa"
                value={formData.fullAddress}
                onChange={handleChange}
                className="w-full border-2 border-gray-300 rounded-lg p-3 text-base focus:outline-none focus:border-green-500 transition-colors resize-none bg-white text-gray-900 placeholder-gray-400"
              />
          </div>

          <div className="bg-gray-100 p-3 rounded text-sm text-gray-600 flex items-start gap-2">
            <ShieldCheck size={20} className="shrink-0 text-green-600" />
            <p>Twoje dane są bezpieczne i zostaną wykorzystane tylko do wysyłki.</p>
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
            <span>{isSubmitting ? 'WYSYŁANIE...' : 'POTWIERDŹ ZAMÓWIENIE'}</span>
            <ArrowRight size={24} strokeWidth={3} />
          </button>

          {!isFormValid && (
              <p className="text-center text-xs text-red-500 font-bold">
                  Wypełnij wszystkie wymagane pola, aby odblokować przycisk.
              </p>
          )}

          <div className="text-center text-xs text-gray-500 mt-2 font-medium">
             Płatność przy odbiorze • Bez zaliczki
          </div>
        </form>
      </div>
    </section>
  );
};

export default OrderForm;
