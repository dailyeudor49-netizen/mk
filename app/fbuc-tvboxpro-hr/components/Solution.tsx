import React from 'react';
import { CheckCircle2, Zap } from 'lucide-react';
import { PRODUCT_NAME } from '../constants';

export const Solution: React.FC = () => {
  return (
    <section className="py-12 bg-gray-50 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black text-center mb-4 text-gray-900 leading-tight uppercase">
          UREĐAJ IZ <span className="text-red-600 bg-yellow-200 px-2">SNOVA</span> ZA VAŠ DOM
        </h2>
        <p className="text-center text-xl text-gray-600 mb-12 max-w-3xl mx-auto font-medium">
          Zaboravite sve što znate o televiziji. Evo kako ovaj <strong>4K Ultra HD</strong> box mijenja vaš život odmah nakon uključivanja:
        </p>

        <div className="space-y-12">
            
            {/* ANGLE 1: CINEMA / STREAMING */}
            <div className="flex flex-col md:flex-row items-center gap-8 bg-white p-6 rounded-2xl shadow-xl border-2 border-gray-100 transform hover:scale-[1.01] transition duration-300">
                <div className="w-full md:w-1/2">
                    {/* Video Cinema */}
                    <div className="relative rounded-xl overflow-hidden shadow-lg border-4 border-gray-900 aspect-square">
                        <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 z-10 rounded uppercase animate-pulse">4K ULTRA HD</div>
                        <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                            <source src="/images/tvboxpro-4k/cinema-4k.mp4" type="video/mp4" />
                        </video>
                    </div>
                </div>
                <div className="w-full md:w-1/2 text-left">
                    <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-3 uppercase leading-none">
                        1. KINO U 4K (BOLJE OD STVARNOSTI)
                    </h3>
                    <p className="text-gray-600 text-lg mb-4 leading-relaxed">
                        Ovo nije samo "gledanje TV-a", ovo je uranjanje u film. Zahvaljujući <strong>4K Ultra HD s HDR-om</strong>, boje oživljavaju, a detalji su nevjerojatni. Netflix, YouTube i HBO Max pokreću se u trenu.
                    </p>
                    <ul className="space-y-2">
                        <li className="flex items-center gap-2 font-bold text-gray-800">
                            <CheckCircle2 className="text-green-500 shrink-0" /> Pravi 4K (3840x2160)
                        </li>
                        <li className="flex items-center gap-2 font-bold text-gray-800">
                            <CheckCircle2 className="text-green-500 shrink-0" /> Brzi procesor - bez čekanja
                        </li>
                    </ul>
                </div>
            </div>

            {/* ANGLE 2: SPORT / STABILITY */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-8 bg-white p-6 rounded-2xl shadow-xl border-2 border-gray-100 transform hover:scale-[1.01] transition duration-300">
                <div className="w-full md:w-1/2">
                    {/* Video Sport */}
                    <div className="relative rounded-xl overflow-hidden shadow-lg border-4 border-gray-900 aspect-square">
                        <div className="absolute top-2 right-2 bg-green-600 text-white text-xs font-bold px-2 py-1 z-10 rounded uppercase animate-pulse">BEZ ZASTOJA</div>
                        <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                            <source src="/images/tvboxpro-4k/sport.mp4" type="video/mp4" />
                        </video>
                    </div>
                </div>
                <div className="w-full md:w-1/2 text-left">
                    <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-3 uppercase leading-none">
                        2. UTAKMICA, KAO DA STE NA STADIONU
                    </h3>
                    <p className="text-gray-600 text-lg mb-4 leading-relaxed">
                        Vidite svaku vlat trave. Zahvaljujući <strong>glatkom 4K pri 60fps</strong>, utakmice (Arena Sport, MaxSport) ne zapinju, čak ni tijekom derbija Dinamo - Hajduk. Prijatelji će htjeti gledati utakmice samo kod vas.
                    </p>
                    <ul className="space-y-2">
                        <li className="flex items-center gap-2 font-bold text-gray-800">
                            <CheckCircle2 className="text-green-500 shrink-0" /> Glatki streaming bez bufferinga
                        </li>
                        <li className="flex items-center gap-2 font-bold text-gray-800">
                            <CheckCircle2 className="text-green-500 shrink-0" /> Snažna WiFi antena (hvata svugdje)
                        </li>
                    </ul>
                </div>
            </div>

            {/* ANGLE 3: GAMING / KIDS */}
            <div className="flex flex-col md:flex-row items-center gap-8 bg-white p-6 rounded-2xl shadow-xl border-2 border-gray-100 transform hover:scale-[1.01] transition duration-300">
                <div className="w-full md:w-1/2">
                    {/* GIF Gaming */}
                    <div className="relative rounded-xl overflow-hidden shadow-lg border-4 border-gray-900 aspect-square">
                         <div className="absolute top-2 left-2 bg-purple-600 text-white text-xs font-bold px-2 py-1 z-10 rounded uppercase animate-pulse">JOYSTICK U KUTIJI</div>
                        <img src="/images/tvboxpro-4k/gaming.gif" alt="GIF Video Games" className="w-full h-full object-cover" />
                    </div>
                </div>
                <div className="w-full md:w-1/2 text-left">
                    <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-3 uppercase leading-none">
                        3. IGRAJTE GTA, FIFA-u I FORTNITE
                    </h3>
                    <p className="text-gray-600 text-lg mb-4 leading-relaxed">
                        Dobro ste pročitali. Spojite <span className="text-purple-700 font-bold">Joystick POKLON</span> (u paketu) i pretvorite TV u konzolu. Djeca ili unuci mogu igrati hitove bez da trošite 500 € na novu konzolu.
                    </p>
                    <ul className="space-y-2">
                        <li className="flex items-center gap-2 font-bold text-gray-800">
                            <CheckCircle2 className="text-green-500 shrink-0" /> Kompatibilan s Android igrama i Cloud Gamingom
                        </li>
                        <li className="flex items-center gap-2 font-bold text-gray-800">
                            <CheckCircle2 className="text-green-500 shrink-0" /> Štedite stotine eura
                        </li>
                    </ul>
                </div>
            </div>

        </div>
        
        <div className="mt-12 text-center">
             <div className="inline-flex items-center gap-2 bg-yellow-100 border border-yellow-300 px-6 py-3 rounded-full">
                <Zap className="text-yellow-600 fill-current" />
                <span className="font-bold text-gray-800 uppercase text-sm md:text-base">Radi na svakom televizoru (čak i 15 godina starom)</span>
             </div>
        </div>

      </div>
    </section>
  );
};