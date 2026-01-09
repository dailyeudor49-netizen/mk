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
                    alt="Robot Clean Pro X na stacji bazowej"
                    className="relative rounded-2xl shadow-xl border-4 border-white z-10 w-full"
                />
                <div className="absolute bottom-4 right-2 md:bottom-6 md:-right-6 bg-white p-3 md:p-4 rounded-xl shadow-lg border-l-4 border-green-500 z-20">
                    <p className="font-black text-gray-900 text-sm md:text-lg">PEŁNA AUTOMATYZACJA</p>
                    <p className="text-xs md:text-sm text-gray-500">Mapuje, Sprząta, Opróżnia Się</p>
                </div>
            </div>

            {/* Right: The 4 Steps of Logic */}
            <div className="md:w-1/2">
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 leading-tight">
                    ZAAWANSOWANA TECHNOLOGIA, <br/> <span className="text-green-600">PROSTA W OBSŁUDZE.</span>
                </h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    Clean Pro X jest autonomiczny. Oto jak działa jego rutyna sprzątania:
                </p>

                <div className="space-y-6">

                    {/* Step 1: Mapping */}
                    <div className="flex items-start gap-4">
                        <div className="bg-blue-100 p-3 rounded-full text-blue-600 shrink-0">
                            <Map size={24} strokeWidth={2.5} />
                        </div>
                        <div>
                            <h3 className="text-lg font-black text-gray-900 uppercase mb-1">1. PIERWSZE URUCHOMIENIE: MAPUJE DOM</h3>
                            <p className="text-gray-600 leading-snug text-sm md:text-base">
                                Gdy go włączysz (lub użyjesz aplikacji), robi objazd rozpoznawczy. <strong>Uczy się planu Twojego domu</strong> automatycznie, żeby nie pozostawić żadnych niesprząniętych miejsc.
                            </p>
                        </div>
                    </div>

                    {/* Step 2: Modes & Obstacles */}
                    <div className="flex items-start gap-4">
                        <div className="bg-purple-100 p-3 rounded-full text-purple-600 shrink-0">
                            <Settings2 size={24} strokeWidth={2.5} />
                        </div>
                        <div>
                            <h3 className="text-lg font-black text-gray-900 uppercase mb-1">2. TY DECYDUJESZ: ODKURZANIE, MYCIE LUB WSZYSTKO</h3>
                            <p className="text-gray-600 leading-snug text-sm md:text-base">
                                Zdecyduj, czy ma tylko zamiatać, tylko myć, czy robić jedno i drugie. Sam omija przeszkody i <strong>nie kończy</strong>, dopóki pokój nie jest idealnie czysty.
                            </p>
                        </div>
                    </div>

                    {/* Step 3: Base Refill */}
                    <div className="flex items-start gap-4">
                        <div className="bg-cyan-100 p-3 rounded-full text-cyan-600 shrink-0">
                            <Droplet size={24} strokeWidth={2.5} />
                        </div>
                        <div>
                            <h3 className="text-lg font-black text-gray-900 uppercase mb-1">3. SAM UZUPEŁNIA WODĘ I DETERGENT</h3>
                            <p className="text-gray-600 leading-snug text-sm md:text-base">
                                Kiedy trzeba, wraca do bazy i <strong>automatycznie się uzupełnia</strong> czystą wodą i detergentem. Ty tylko od czasu do czasu napełniasz zbiornik bazy.
                            </p>
                        </div>
                    </div>

                    {/* Step 4: Emptying */}
                    <div className="flex items-start gap-4">
                        <div className="bg-red-100 p-3 rounded-full text-red-600 shrink-0">
                            <Trash2 size={24} strokeWidth={2.5} />
                        </div>
                        <div>
                            <h3 className="text-lg font-black text-gray-900 uppercase mb-1">4. SAM SIĘ OPRÓŻNIA DO WORKA</h3>
                            <p className="text-gray-600 leading-snug text-sm md:text-base">
                                Po skończonej pracy baza zasysa brud z robota. Ty tylko <strong>wyrzucasz worek z bazy</strong>, gdy jest pełny (po tygodniach używania).
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
                <h3 className="text-2xl font-black text-gray-900 mb-2 uppercase">2 Lata Gwarancji w Cenie</h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                    Kupuj bez ryzyka. Robot Clean Pro X jest objęty naszą <strong>Oficjalną Gwarancją</strong>.
                    Jeśli coś nie działa, <span className="font-bold text-green-700">wymieniamy go za darmo</span>. Bezpośrednia pomoc techniczna po polsku.
                </p>
            </div>
        </div>

      </div>
    </section>
  );
};

export default ProductDetails;
