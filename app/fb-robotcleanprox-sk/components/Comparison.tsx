'use client';

import React from 'react';
import { Check, X } from 'lucide-react';
import { PRODUCT_NAME, PRICE_PROMO, CURRENCY } from '../lib/constants';

const comparisonData = [
  { feature: 'Samovyprázdňovacia Základňa', ours: 'Súčasť Balenia', oursIcon: true, theirs: 'Voliteľné (€300)', theirsIcon: false },
  { feature: 'Ovládanie Aplikáciou', ours: 'Áno (Kompletné)', oursIcon: true, theirs: 'Nepresné', theirsIcon: false },
  { feature: 'Výdrž', ours: '8 Hodín', oursIcon: null, theirs: 'Max 90 min', theirsIcon: null },
  { feature: 'Sacia Sila', ours: 'Vysáva Skrutky', oursIcon: null, theirs: 'Štandardná', theirsIcon: null },
  { feature: 'Platba pri Prevzatí', ours: 'Áno', oursIcon: true, theirs: 'Nie (Len Karta)', theirsIcon: false },
  { feature: 'Cena', ours: `${CURRENCY}${PRICE_PROMO}`, oursIcon: null, theirs: `${CURRENCY}800+`, theirsIcon: null, isPrice: true },
];

const Comparison: React.FC = () => {
  return (
    <section className="py-10 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-black text-center text-gray-900 mb-8">
          NEHÁDŽTE PENIAZE PREČ
        </h2>

        {/* Mobile: Cards Layout */}
        <div className="md:hidden space-y-3">
          {comparisonData.map((item, idx) => (
            <div key={idx} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p className="font-bold text-gray-700 text-sm mb-2">{item.feature}</p>
              <div className="flex justify-between gap-2">
                <div className={`flex-1 text-center p-2 rounded ${item.isPrice ? 'bg-red-100' : 'bg-green-50'}`}>
                  <p className="text-[10px] text-gray-500 uppercase mb-1">{PRODUCT_NAME}</p>
                  <div className={`flex items-center justify-center gap-1 ${item.isPrice ? 'text-red-600 font-black text-lg' : 'text-green-600 font-bold text-sm'}`}>
                    {item.oursIcon === true && <Check size={14} strokeWidth={3} />}
                    {item.ours}
                  </div>
                </div>
                <div className="flex-1 text-center p-2 rounded bg-gray-100">
                  <p className="text-[10px] text-gray-400 uppercase mb-1">Ostatní</p>
                  <div className={`flex items-center justify-center gap-1 text-gray-400 text-sm ${item.isPrice ? 'line-through' : ''}`}>
                    {item.theirsIcon === false && <X size={14} />}
                    {item.theirs}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: Table Layout */}
        <div className="hidden md:block overflow-x-auto shadow-lg rounded-xl border border-gray-200">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="p-4 w-1/3 text-sm font-medium uppercase tracking-wider">Charakteristika</th>
                <th className="p-4 w-1/3 text-center bg-red-600 font-bold border-b-4 border-red-800 text-lg md:text-xl relative">
                  {PRODUCT_NAME}
                  <div className="absolute top-0 right-0 bg-yellow-400 text-red-900 text-[10px] font-bold px-2 py-0.5 rounded-bl">VÍŤAZ</div>
                </th>
                <th className="p-4 w-1/3 text-center text-gray-300 font-normal">Iné Značkové Roboty</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <tr className="border-b border-gray-100">
                <td className="p-4 font-bold text-gray-700">Samovyprázdňovacia Základňa (Prach+Voda)</td>
                <td className="p-4 text-center bg-red-50 font-bold text-green-600"><div className="flex justify-center gap-1"><Check strokeWidth={4} /> Súčasť Balenia</div></td>
                <td className="p-4 text-center text-gray-400"><div className="flex justify-center gap-1"><X /> Voliteľné (stojí {CURRENCY}300)</div></td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="p-4 font-bold text-gray-700">Ovládanie z Aplikácie a Miestností</td>
                <td className="p-4 text-center bg-red-50 font-bold text-green-600"><div className="flex justify-center gap-1"><Check strokeWidth={4} /> Áno (Kompletné)</div></td>
                <td className="p-4 text-center text-gray-400">Často nepresné</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="p-4 font-bold text-gray-700">Výdrž Batérie</td>
                <td className="p-4 text-center bg-red-50 font-bold text-gray-900">8 Hodín (Vráti sa na základňu)</td>
                <td className="p-4 text-center text-gray-500">Max 90 minút</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="p-4 font-bold text-gray-700">Sacia Sila</td>
                <td className="p-4 text-center bg-red-50 font-bold text-gray-900">Vysáva Skrutky</td>
                <td className="p-4 text-center text-gray-500">Štandardná</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="p-4 font-bold text-gray-700">Platba pri Prevzatí</td>
                <td className="p-4 text-center bg-red-50 font-bold text-green-600"><div className="flex justify-center gap-1"><Check strokeWidth={4} /> Áno</div></td>
                <td className="p-4 text-center text-gray-400"><div className="flex justify-center gap-1"><X /> Nie (Len Karta)</div></td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-gray-700">Cena</td>
                <td className="p-4 text-center bg-red-50 font-black text-red-600 text-xl">{CURRENCY}{PRICE_PROMO}</td>
                <td className="p-4 text-center text-gray-500 line-through">{CURRENCY}800+</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Comparison;