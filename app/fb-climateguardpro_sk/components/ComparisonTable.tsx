import React from 'react';
import { ShieldCheck, Zap, Thermometer, Droplets } from 'lucide-react';

export const ComparisonTable: React.FC = () => {
  return (
    <div className="w-full rounded-3xl border border-white/10 bg-void-900/50 backdrop-blur-xl overflow-hidden relative shadow-2xl">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-500 to-transparent opacity-50"></div>
      
      <div className="overflow-x-auto p-6">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="px-6 py-5 text-gray-400 uppercase tracking-widest font-bold text-sm">Dôležité špecifikácie</th>
              <th className="px-6 py-5 bg-white/5 rounded-t-2xl border-x border-t border-white/10 min-w-[220px]">
                <div className="flex items-center gap-2.5 text-neon-400 font-bold font-display text-xl">
                  <ShieldCheck className="w-6 h-6" />
                  ClimateGuard
                </div>
              </th>
              <th className="px-6 py-5 text-gray-500 font-normal text-sm uppercase text-center opacity-70">Kúrenie / Radiátory</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-base md:text-lg">
            <tr>
              <td className="px-6 py-5 font-medium text-gray-200 flex items-center gap-3"><Zap className="w-5 h-5 text-yellow-500"/> Náklady na účty</td>
              <td className="px-6 py-5 bg-white/5 border-x border-white/10 text-green-400 font-bold shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]">
                -60% (Chip AI Eco)
              </td>
              <td className="px-6 py-5 text-red-500 text-center font-bold">Veľmi vysoké (Plyn/Radiátor)</td>
            </tr>
            <tr>
              <td className="px-6 py-5 font-medium text-gray-200 flex items-center gap-3"><Thermometer className="w-5 h-5 text-red-500"/> Pokrytie teplom</td>
              <td className="px-6 py-5 bg-white/5 border-x border-white/10 text-white font-bold">
                90 m² (Rovnomerné)
              </td>
              <td className="px-6 py-5 text-gray-500 text-center">Len blízko zdroja</td>
            </tr>
            <tr>
              <td className="px-6 py-5 font-medium text-gray-200 flex items-center gap-3"><Droplets className="w-5 h-5 text-blue-500"/> Funkcia proti plesni</td>
              <td className="px-6 py-5 bg-white/5 border-x border-white/10">
                <span className="px-3 py-1 rounded bg-neon-500/20 text-neon-400 text-sm font-bold border border-neon-500/30">Aktívne odvlhčovanie</span>
              </td>
              <td className="px-6 py-5 text-gray-500 text-center">Chýba (Vytvára kondenzáciu)</td>
            </tr>
            <tr>
              <td className="px-6 py-5 font-medium text-gray-200">Bezpečnosť</td>
              <td className="px-6 py-5 bg-white/5 border-x border-white/10 text-white rounded-b-2xl border-b">
                Bez lopatiek & Ochrana pred popálením
              </td>
              <td className="px-6 py-5 text-gray-500 text-center">Nebezpečné pre deti</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};