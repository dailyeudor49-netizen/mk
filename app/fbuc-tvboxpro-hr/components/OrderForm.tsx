'use client';

import React, { useState, useEffect } from 'react';
import { Timer, ShieldCheck, Lock, Truck, Check } from 'lucide-react';
import { PRICE_PROMO, SHIPPING_COST, PRODUCT_NAME, CURRENCY } from '../constants';
import { useFacebookTracking } from '@/app/hooks/useFacebookTracking';

// Network config for HR (Facebook Uncapped)
const NETWORK_CONFIG = {
  uid: '4a2b2107-ba63-494f-b762-41120bde0c94',
  key: '4afe791f5ae2aac4926eab',
  offer: '2810',
  lp: '2843',
};

export const OrderForm: React.FC = () => {
  const { trackLeadEvent, saveUserData } = useFacebookTracking();
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes in seconds
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    address: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Calculate total price as numbers for safety
  const priceNum = parseFloat(PRICE_PROMO.replace(',', '.'));
  const shippingNum = parseFloat(SHIPPING_COST.replace(',', '.'));
  const totalNum = priceNum + shippingNum;
  const totalStr = totalNum.toFixed(2).replace('.', ',');

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(formState.name && formState.phone && formState.address) {
        setIsSubmitting(true);

        try {
          // Prepare params for network (URLSearchParams for x-www-form-urlencoded)
          const params = new URLSearchParams();
          params.append('uid', NETWORK_CONFIG.uid);
          params.append('key', NETWORK_CONFIG.key);
          params.append('offer', NETWORK_CONFIG.offer);
          params.append('lp', NETWORK_CONFIG.lp);
          params.append('name', formState.name.trim());
          params.append('tel', formState.phone.trim());
          params.append('street-address', formState.address.trim());

          // Add fingerprint if available (query DOM for tmfp input set by network script)
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
          const nameParts = formState.name.trim().split(' ');
          const nome = nameParts[0] || '';
          const cognome = nameParts.slice(1).join(' ') || '';

          const userData = {
            nome,
            cognome,
            telefono: formState.phone.trim(),
            indirizzo: formState.address.trim()
          };

          // Save user data for Facebook tracking
          console.log('[Form] Saving user data:', userData);
          saveUserData(userData);

          // If NOT DOUBLE, track Lead event for Facebook
          if (data.message !== 'DOUBLE') {
            await trackLeadEvent(userData, {
              content_name: 'TVBoxPro HR',
              currency: 'EUR',
              value: totalNum
            });
          } else {
            sessionStorage.setItem('skipConversion', 'true');
          }

          // Redirect to Facebook thank you page
          window.location.href = '/fb-ty/ty-fb-hr';
        } catch (error) {
          console.error('Form submission error:', error);
          // Still redirect on error
          window.location.href = '/fb-ty/ty-fb-hr';
        }
    } else {
        alert("Molimo ispunite sva obavezna polja");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  if (isSubmitted) {
      return (
          <section id="order-form" className="py-16 px-4 bg-green-50 min-h-[50vh] flex items-center justify-center">
              <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-2xl text-center border-4 border-green-500">
                  <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                      <ShieldCheck size={64} className="text-green-600" />
                  </div>
                  <h2 className="text-3xl font-black text-gray-900 mb-4">HVALA VAM, {formState.name}!</h2>
                  <p className="text-xl text-gray-700 mb-6">Vaša narudžba je potvrđena.</p>
                  <p className="text-gray-600">Naš agent će vas uskoro kontaktirati na broj <span className="font-bold">{formState.phone}</span> radi dogovora o dostavi.</p>
                  <div className="mt-6 bg-yellow-100 p-4 rounded-lg border border-yellow-300">
                    <p className="font-bold text-gray-800 uppercase text-sm mb-1">Iznos za plaćanje dostavljaču:</p>
                    <p className="text-3xl font-black text-red-600">{totalStr} {CURRENCY}</p>
                  </div>
              </div>
          </section>
      )
  }

  return (
    <section id="order-form" className="py-12 px-4 bg-gray-200">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-gray-300">
        
        {/* Header Form */}
        <div className="bg-red-600 text-white p-6 text-center">
          <h2 className="text-3xl font-black uppercase mb-2">OBRAZAC ZA NARUDŽBU</h2>
          <p className="text-lg font-medium">Ispunite ispod kako biste rezervirali promociju</p>
          
          <div className="flex items-center justify-center gap-2 mt-4 bg-red-700 py-2 rounded-lg border border-red-500">
            <Timer className="animate-spin-slow" />
            <span className="font-bold text-xl">Ponuda istječe za: {formatTime(timeLeft)}</span>
          </div>
        </div>

        <div className="p-6 md:p-8">
          {/* Order Summary */}
          <div className="bg-yellow-50 border-2 border-yellow-400 p-4 rounded-lg mb-8 shadow-sm">
            <h3 className="font-bold text-gray-800 text-lg mb-2 border-b border-yellow-200 pb-2">Pregled narudžbe:</h3>
            <div className="flex justify-between items-center mb-1 text-lg">
              <span>{PRODUCT_NAME}</span>
              <span className="font-bold">{PRICE_PROMO} {CURRENCY}</span>
            </div>
             <div className="flex justify-between items-center text-gray-700 text-sm mb-2">
              <span className="flex items-center gap-1"><Truck size={16}/> Brza dostava (24/48h)</span>
              <span className="font-bold text-green-600 flex items-center gap-1">
                AKTIVNA <Check size={16} strokeWidth={3} />
              </span>
            </div>
            <div className="flex justify-between items-center mt-3 pt-3 border-t-2 border-yellow-200 text-2xl font-black text-red-600">
              <span>UKUPNO (Plaćanje pouzećem):</span>
              <span>{totalStr} {CURRENCY}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-bold mb-2 text-lg">Ime i Prezime <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                name="name"
                required
                placeholder="Npr. Ivan Kovač"
                className="w-full p-4 border-2 border-gray-300 rounded-lg text-lg focus:border-green-500 focus:ring-green-500 outline-none"
                value={formState.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-2 text-lg">Broj telefona <span className="text-red-500">*</span></label>
              <input 
                type="tel" 
                name="phone"
                required
                placeholder="Npr. 091 123 4567"
                className="w-full p-4 border-2 border-gray-300 rounded-lg text-lg focus:border-green-500 focus:ring-green-500 outline-none"
                value={formState.phone}
                onChange={handleChange}
              />
              <p className="text-sm text-gray-500 mt-1 font-medium bg-blue-50 p-2 rounded text-blue-800">ℹ️ Važno: Dostavljač će vas nazvati na ovaj broj prije dostave.</p>
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-2 text-lg">Adresa za dostavu <span className="text-red-500">*</span></label>
              <textarea 
                name="address"
                required
                placeholder="Grad, Ulica, Kućni broj, Kat..."
                rows={3}
                className="w-full p-4 border-2 border-gray-300 rounded-lg text-lg focus:border-green-500 focus:ring-green-500 outline-none resize-none"
                value={formState.address}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg flex items-center gap-3 text-sm text-gray-600 border border-gray-200">
               <Lock size={20} className="text-green-600"/>
               <span>Bez rizika: plaćate gotovinom tek kada preuzmete paket.</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full text-white text-2xl md:text-3xl font-black py-6 px-6 rounded-xl shadow-xl transform transition border-b-8 whitespace-normal leading-tight ${
                isSubmitting
                  ? 'bg-gray-400 border-gray-500 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 hover:scale-105 border-green-800 animate-pulse-btn'
              }`}
            >
              {isSubmitting ? 'ŠALJEM...' : 'POTVRDI NARUDŽBU'}
              <span className="block text-lg font-normal mt-2 text-green-100">Brza Dostava i Plaćanje Pouzećem</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};