'use client';

import React, { useState, useEffect } from 'react';
import { Truck, Banknote } from 'lucide-react';
import { CountdownTimer } from './CountdownTimer';
import { PRICE_PROMO, PRODUCT_NAME, CURRENCY, SHIPPING_COST } from '../constants';
import { useFacebookTracking } from '@/app/hooks/useFacebookTracking';

// Network config for LithiumPro SK
const NETWORK_CONFIG = {
  uid: '4a2b2107-ba63-494f-b762-41120bde0c94',
  key: '4afe791f5ae2aac4926eab',
  offer: '2626',
  lp: '2653',
};

export const OrderForm: React.FC = () => {
  const { trackLeadEvent, saveUserData } = useFacebookTracking();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);

  // Calculate total price
  const priceNum = parseFloat(PRICE_PROMO.replace(/\s/g, '').replace(',', '.'));
  const shippingNum = parseFloat(SHIPPING_COST.replace(/\s/g, '').replace(',', '.'));
  const totalNum = priceNum + shippingNum;

  useEffect(() => {
    // Load fingerprint script dynamically
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.address) {
      alert("Vyplňte prosím všetky povinné polia");
      return;
    }

    setLoading(true);

    try {
      // Prepare params for network (URLSearchParams for x-www-form-urlencoded)
      const params = new URLSearchParams();
      params.append('uid', NETWORK_CONFIG.uid);
      params.append('key', NETWORK_CONFIG.key);
      params.append('offer', NETWORK_CONFIG.offer);
      params.append('lp', NETWORK_CONFIG.lp);
      params.append('name', formData.name.trim());
      params.append('tel', formData.phone.trim());
      params.append('street-address', formData.address.trim());

      // Add fingerprint if available
      const tmfpInput = document.querySelector('input[name="tmfp"]') as HTMLInputElement;
      if (tmfpInput && tmfpInput.value) {
        params.append('tmfp', tmfpInput.value);
      }

      // Add UTM params if present
      const urlParams = new URLSearchParams(window.location.search);
      ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'subid', 'subid2', 'subid3', 'subid4', 'subid5', 'pubid'].forEach(param => {
        const value = urlParams.get(param);
        if (value) params.append(param, value);
      });

      // Send to network API
      const response = await fetch('https://offers.uncappednetwork.com/forms/api/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      });

      const data = await response.json();
      console.log('Network API response:', data);

      // Parse name into first and last name for Facebook
      const nameParts = formData.name.trim().split(' ');
      const nome = nameParts[0] || '';
      const cognome = nameParts.slice(1).join(' ') || '';

      const userData = {
        nome,
        cognome,
        telefono: formData.phone.trim(),
        indirizzo: formData.address.trim()
      };

      // Save user data for Facebook tracking
      saveUserData(userData);

      // If NOT DOUBLE, track Lead event for Facebook
      if (data.message !== 'DOUBLE') {
        await trackLeadEvent(userData, {
          content_name: PRODUCT_NAME + ' SK',
          currency: CURRENCY,
          value: totalNum
        });
      } else {
        sessionStorage.setItem('skipConversion', 'true');
      }

      // Redirect to Facebook thank you page
      window.location.href = '/fb-ty/ty-fb-sk';
    } catch (error) {
      console.error('Form submission error:', error);
      // Still redirect on error
      window.location.href = '/fb-ty/ty-fb-sk';
    }
  };

  return (
    <div id="order-form" className="max-w-xl mx-auto bg-white border-4 border-red-600 rounded-xl shadow-2xl overflow-hidden my-8 scroll-mt-4">
      <div className="bg-red-600 p-4 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-white/10 skew-x-12 transform -translate-x-1/2"></div>
        <h3 className="text-white text-2xl md:text-3xl font-black uppercase tracking-wide relative z-10">Objednávkový Formulár</h3>
        <p className="text-yellow-300 font-bold uppercase text-sm relative z-10 flex items-center justify-center gap-2 mt-1">
           <Banknote className="w-4 h-4" /> Kreditná karta nie je potrebná
        </p>
      </div>

      <div className="p-6">
        <CountdownTimer />

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Hidden input for network fingerprint */}
          <input type="hidden" name="tmfp" />

          <div>
            <label className="block text-gray-800 font-bold mb-1 text-base">Meno a Priezvisko <span className="text-red-600">*</span></label>
            <input
              required
              type="text"
              name="name"
              placeholder="Napr. Ján Novák"
              className="w-full p-3 border-2 border-gray-300 rounded-lg text-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all bg-gray-50 focus:bg-white"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-gray-800 font-bold mb-1 text-base">Telefónne Číslo <span className="text-red-600">*</span></label>
            <input
              required
              type="tel"
              name="phone"
              placeholder="Napr. +421 123 456 789"
              className="w-full p-3 border-2 border-gray-300 rounded-lg text-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all bg-gray-50 focus:bg-white"
              value={formData.phone}
              onChange={handleChange}
            />
            <p className="text-xs text-gray-500 mt-1 font-medium">Zavoláme vám pre potvrdenie doručenia.</p>
          </div>

          <div>
            <label className="block text-gray-800 font-bold mb-1 text-base">Úplná Adresa <span className="text-red-600">*</span></label>
            <textarea
              required
              name="address"
              rows={3}
              placeholder="Ulica, Číslo, Mesto, PSČ"
              className="w-full p-3 border-2 border-gray-300 rounded-lg text-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all bg-gray-50 focus:bg-white"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div className="bg-green-50 p-4 rounded-lg flex items-center gap-4 border-2 border-green-200 border-dashed">
             <div className="bg-white p-2 rounded-full shadow-sm">
                <Banknote className="w-8 h-8 text-green-600" />
             </div>
             <div className="flex-1">
                <p className="font-black text-gray-800 text-sm uppercase">Platba pri Doručení</p>
                <p className="text-xs text-gray-600 leading-tight">Platíte hotovosťou kuriérovi. Nulové riziko.</p>
             </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-black text-2xl py-5 rounded-lg shadow-[0_4px_0_#991b1b] active:shadow-none active:translate-y-1 transition-all flex flex-col items-center justify-center gap-0 uppercase"
          >
            {loading ? 'Spracovanie...' : (
              <>
                <div className="flex items-center gap-2">
                   <span>ODOSLAŤ OBJEDNÁVKU</span>
                   <Truck className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium opacity-80 normal-case">Kliknite pre potvrdenie</span>
              </>
            )}
          </button>

        </form>
      </div>
    </div>
  );
};
