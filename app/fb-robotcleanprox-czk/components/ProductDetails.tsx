'use client';

import React from 'react';
import { Award, Map, Settings2, Droplet, Trash2 } from 'lucide-react';

const ProductDetails: React.FC = () => {
  return (
    <section className="py-12 px-4 bg-white overflow-hidden">
      <div className="max-w-4xl mx-auto">
        
        {/* NEW SECTION: EXPLAINING THE TECH SIMPLY */}
        <div className="flex flex-col md:flex-row items-center gap-10 mb-16">
            
            {/* Left: Visual Representation */}
            <div className="w-full md:w-1/2 relative px-4 md:px-0">
                 <div className="absolute inset-0 md:-inset-4 bg-green-100 rounded-full blur-xl opacity-50"></div>
                 <img
                    src="/images/robotcleanprox imggif/ROBOTCLEANPROX IMG LANDING/9.png"
                    alt="Robot Clean Pro X nella base"
                    className="relative rounded-2xl shadow-xl border-4 border-white z-10 w-full"
                />
                <div className="absolute bottom-4 right-2 md:bottom-6 md:-right-6 bg-white p-3 md:p-4 rounded-xl shadow-lg border-l-4 border-green-500 z-20">
                    <p className="font-black text-gray-900 text-sm md:text-lg">VŠE AUTOMATICKÉ</p>
                    <p className="text-xs md:text-sm text-gray-500">Mapuje, Čistí, Vyprazdňuje</p>
                </div>
            </div>

            {/* Right: The 4 Steps of Logic */}
            <div className="md:w-1/2">
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 leading-tight">
                    POKROČILÁ TECHNOLOGIE, <br/> <span className="text-green-600">SNADNÉ POUŽITÍ.</span>
                </h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    Clean Pro X je autonomní. Takto funguje jeho úklidový režim:
                </p>

                <div className="space-y-6">
                    
                    {/* Step 1: Mapping */}
                    <div className="flex items-start gap-4">
                        <div className="bg-blue-100 p-3 rounded-full text-blue-600 shrink-0">
                            <Map size={24} strokeWidth={2.5} />
                        </div>
                        <div>
                            <h3 className="text-lg font-black text-gray-900 uppercase mb-1">1. PRVNÍ ZAPNUTÍ: ZMAPUJE DŮM</h3>
                            <p className="text-gray-600 leading-snug text-sm md:text-base">
                                Jakmile ho zapnete (nebo použijete aplikaci), udělá průzkum. <strong>Naučí se půdorys vašeho domu</strong> automaticky, aby při příštím úklidu nezanechal nepokryté oblasti.
                            </p>
                        </div>
                    </div>

                    {/* Step 2: Modes & Obstacles */}
                    <div className="flex items-start gap-4">
                        <div className="bg-purple-100 p-3 rounded-full text-purple-600 shrink-0">
                            <Settings2 size={24} strokeWidth={2.5} />
                        </div>
                        <div>
                            <h3 className="text-lg font-black text-gray-900 uppercase mb-1">2. VYBERTE SI: VYSÁVÁ, MYE NEBO OBÉ</h3>
                            <p className="text-gray-600 leading-snug text-sm md:text-base">
                                Rozhodněte, zda má jen zametat, jen mýt nebo obojí. Sám se vyhýbá překážkám a <strong>nezastaví se</strong>, dokud není místnost dokonale čistá.
                            </p>
                        </div>
                    </div>

                    {/* Step 3: Base Refill */}
                    <div className="flex items-start gap-4">
                        <div className="bg-cyan-100 p-3 rounded-full text-cyan-600 shrink-0">
                            <Droplet size={24} strokeWidth={2.5} />
                        </div>
                        <div>
                            <h3 className="text-lg font-black text-gray-900 uppercase mb-1">3. DOPLNÍ VODU A ČISTICÍ PROSTŘEDEK SÁM</h3>
                            <p className="text-gray-600 leading-snug text-sm md:text-base">
                                Když je potřeba, vrátí se do základny a <strong>automaticky se doplní</strong> čistou vodou a čisticím prostředkem. Vy jen občas doplníte nádrž základny.
                            </p>
                        </div>
                    </div>

                    {/* Step 4: Emptying */}
                    <div className="flex items-start gap-4">
                        <div className="bg-red-100 p-3 rounded-full text-red-600 shrink-0">
                            <Trash2 size={24} strokeWidth={2.5} />
                        </div>
                        <div>
                            <h3 className="text-lg font-black text-gray-900 uppercase mb-1">4. VYPRÁZDNÍ SE DO SÁČKU</h3>
                            <p className="text-gray-600 leading-snug text-sm md:text-base">
                                Po dokončení práce základna vysaje nečistoty z robota. Vy jen <strong>vyhodíte sáček ze základny</strong>, až bude plný (po týdnech používání).
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        {/* Section 3: Warranty (Kept for Trust) */}
        <div className="bg-yellow-50 border-2 border-yellow-400 rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
            <div className="shrink-0 bg-white p-4 rounded-full shadow-md">
                <Award size={64} className="text-orange-500" />
            </div>
            <div>
                <h3 className="text-2xl font-black text-gray-900 mb-2 uppercase">Česká záruka 2 roky v ceně</h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                    Kupujte bez rizika. Robot Clean Pro X je krytý naší <strong>Oficiální českou zárukou</strong>.
                    Pokud se něco pokazí, <span className="font-bold text-green-700">vyměníme ho zdarma</span>. Přímá podpora v češtině.
                </p>
            </div>
        </div>

      </div>
    </section>
  );
};

export default ProductDetails;