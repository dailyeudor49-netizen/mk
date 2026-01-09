'use client';

import React from 'react';

const Features: React.FC = () => {
  return (
    <section className="bg-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black text-center text-gray-900 mb-10 leading-tight uppercase">
          NIE JE TO LEN ROBOT,<br/>JE TO VAŠA NOVÁ UPRATOVAČKA.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Feature 1 - Suction Power (GIF) */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-transparent hover:border-red-500 transition-colors group">
             <div className="aspect-square w-full bg-gray-900 relative overflow-hidden">
               <img src="/images/robotcleanprox imggif/GIF ASPIRA TUTTO.gif" alt="GIF Aspirazione Bulloni" className="w-full h-full object-cover" />
               <div className="absolute bottom-0 left-0 bg-red-600 text-white font-bold px-4 py-1 text-sm uppercase shadow-md">Turbo Motor</div>
            </div>
             <div className="p-5">
                <h3 className="text-xl font-black mb-2 text-gray-900 uppercase">VYSÁVA SKRUTKY A BATÉRIE</h3>
                <p className="text-gray-600 text-base leading-snug">
                Nielen prach. Má takú silu, že vysaje <strong>mince, granule a ťažké nečistoty</strong>. Keď prejde, nezostane nič.
                </p>
            </div>
          </div>

          {/* Feature 2 - Base Station (GIF) */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-transparent hover:border-red-500 transition-colors group">
            <div className="aspect-square w-full bg-gray-900 relative overflow-hidden">
               <img src="/images/robotcleanprox imggif/GIF Svuotamento.gif" alt="GIF Base Autosvuotante" className="w-full h-full object-cover" />
               <div className="absolute bottom-0 left-0 bg-red-600 text-white font-bold px-4 py-1 text-sm uppercase shadow-md">All-in-One Základňa</div>
            </div>
            <div className="p-5">
                <h3 className="text-xl font-black mb-2 text-gray-900 uppercase">ZABUDNETE NA NEHO</h3>
                <p className="text-gray-600 text-base leading-snug">
                Nemusíte vyprázdňovať nič. Základňa <strong>vysáva nečistoty</strong> do uzavretého vrecka a <strong>napĺňa vodu</strong> sama. Neušpinite si ruky 60 dní.
                </p>
            </div>
          </div>

          {/* Feature 3 - Washing (GIF) */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-transparent hover:border-blue-500 transition-colors group">
             <div className="aspect-square w-full bg-gray-900 relative overflow-hidden">
               <img src="/images/robotcleanprox imggif/GIF Toglie Macchie.gif" alt="GIF Lavaggio Macchie" className="w-full h-full object-cover" />
               <div className="absolute bottom-0 left-0 bg-blue-600 text-white font-bold px-4 py-1 text-sm uppercase shadow-md">Umývanie pod Tlakom</div>
            </div>
             <div className="p-5">
                <h3 className="text-xl font-black mb-2 text-gray-900 uppercase">ODSTRÁNI ZASCHNUTÉ ŠKVRNY</h3>
                <p className="text-gray-600 text-base leading-snug">
                Rotujúce mopy sa točia 200-krát za minútu. Odstraňujú škvrny od <strong>kávy, omáčky a zaschlého bahna</strong>. Podlaha zostane lesklá okamžite.
                </p>
            </div>
          </div>

           {/* Feature 4 - AI Navigation (Video) */}
           <div className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-transparent hover:border-orange-500 transition-colors group">
             <div className="aspect-square w-full bg-gray-900 relative overflow-hidden">
               <video src="/images/robotcleanprox imggif/GIF Evita Ostacoli.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover" />
               <div className="absolute bottom-0 left-0 bg-orange-600 text-white font-bold px-4 py-1 text-sm uppercase shadow-md">Umelá Inteligencia</div>
            </div>
             <div className="p-5">
                <h3 className="text-xl font-black mb-2 text-gray-900 uppercase">NENARAZIA A NESPADNE</h3>
                <p className="text-gray-600 text-base leading-snug">
                Vidí a <strong>vyhýba sa prekážkam</strong> ako ponožky, topánky a hračky. Mapuje dom na milimeter laserom a nespadne zo schodov.
                </p>
            </div>
          </div>

          {/* Feature 5 - App Control (Video) */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-transparent hover:border-green-500 transition-colors group">
             <div className="aspect-square w-full bg-gray-900 relative overflow-hidden">
               <video src="/images/robotcleanprox imggif/GIF Controllo App.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover" />
               <div className="absolute bottom-0 left-0 bg-green-600 text-white font-bold px-4 py-1 text-sm uppercase shadow-md">Aplikácia & Hlas</div>
            </div>
             <div className="p-5">
                <h3 className="text-xl font-black mb-2 text-gray-900 uppercase">POSLÚCHA VAŠE PRÍKAZY</h3>
                <p className="text-gray-600 text-base leading-snug">
                "Alexa, vyčisti kuchyňu". Alebo použite aplikáciu, aby ste mu povedali <strong>kam ísť</strong> a kedy začať, aj keď ste mimo domu.
                </p>
            </div>
          </div>

          {/* Feature 6 - Battery 8 Hours */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-transparent hover:border-purple-500 transition-colors group">
             <div className="aspect-square w-full bg-gray-900 relative overflow-hidden">
               <img src="/images/robotcleanprox imggif/IMG Ricarica.png" alt="Ricarica Robot" className="w-full h-full object-cover" />
               <div className="absolute bottom-0 left-0 bg-purple-600 text-white font-bold px-4 py-1 text-sm uppercase shadow-md">8 Hodín Výdrže</div>
            </div>
             <div className="p-5">
                <h3 className="text-xl font-black mb-2 text-gray-900 uppercase">NEÚNAVNÝ</h3>
                <p className="text-gray-600 text-base leading-snug">
                Batéria vydrží <strong>až 8 hodín</strong>. Vyčistí vily s viacerými podlažiami naraz. Ak sa vybije, vráti sa na základňu, nabije sa a <strong>pokračuje sám</strong>.
                </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Features;