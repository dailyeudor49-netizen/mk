'use client';

import React from 'react';

const Features: React.FC = () => {
  return (
    <section className="bg-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black text-center text-gray-900 mb-10 leading-tight uppercase">
          NENÍ TO JEN ROBOT,<br/>JE TO VAŠE NOVÁ POMOCNICE.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Feature 1 - Suction Power (GIF) */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-transparent hover:border-red-500 transition-colors group">
             <div className="aspect-square w-full bg-gray-900 relative overflow-hidden">
               <img src="/images/robotcleanprox imggif/GIF ASPIRA TUTTO.gif" alt="GIF Vysávání šroubů" className="w-full h-full object-cover" />
               <div className="absolute bottom-0 left-0 bg-red-600 text-white font-bold px-4 py-1 text-sm uppercase shadow-md">Turbo motor</div>
            </div>
             <div className="p-5">
                <h3 className="text-xl font-black mb-2 text-gray-900 uppercase">VYSÁVÁ ŠROUBY A BATERIE</h3>
                <p className="text-gray-600 text-base leading-snug">
                Nejen prach. Má takový výkon, že vysaje <strong>mince, granule a těžké nečistoty</strong>. Když projede, nezůstane nic.
                </p>
            </div>
          </div>

          {/* Feature 2 - Base Station (GIF) */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-transparent hover:border-red-500 transition-colors group">
            <div className="aspect-square w-full bg-gray-900 relative overflow-hidden">
               <img src="/images/robotcleanprox imggif/GIF Svuotamento.gif" alt="GIF Samovyprazdňovací základna" className="w-full h-full object-cover" />
               <div className="absolute bottom-0 left-0 bg-red-600 text-white font-bold px-4 py-1 text-sm uppercase shadow-md">Základna All-in-One</div>
            </div>
            <div className="p-5">
                <h3 className="text-xl font-black mb-2 text-gray-900 uppercase">ZAPOMENETE NA NĚJ</h3>
                <p className="text-gray-600 text-base leading-snug">
                Nemusíte nic vyprazdňovat. Základna <strong>vysaje nečistoty</strong> do uzavřeného sáčku a <strong>doplní vodu</strong> sama. 60 dní si neušpiníte ruce.
                </p>
            </div>
          </div>

          {/* Feature 3 - Washing (GIF) */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-transparent hover:border-blue-500 transition-colors group">
             <div className="aspect-square w-full bg-gray-900 relative overflow-hidden">
               <img src="/images/robotcleanprox imggif/GIF Toglie Macchie.gif" alt="GIF Mytí skvrn" className="w-full h-full object-cover" />
               <div className="absolute bottom-0 left-0 bg-blue-600 text-white font-bold px-4 py-1 text-sm uppercase shadow-md">Tlakové mytí</div>
            </div>
             <div className="p-5">
                <h3 className="text-xl font-black mb-2 text-gray-900 uppercase">ODSTRANÍ ZASCHNUTÉ SKVRNY</h3>
                <p className="text-gray-600 text-base leading-snug">
                Rotační mopy se točí 200x za minutu. Odstraní skvrny od <strong>kávy, omáčky a zaschlého bláta</strong>. Podlaha hned září.
                </p>
            </div>
          </div>

           {/* Feature 4 - AI Navigation (Video) */}
           <div className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-transparent hover:border-orange-500 transition-colors group">
             <div className="aspect-square w-full bg-gray-900 relative overflow-hidden">
               <video src="/images/robotcleanprox imggif/GIF Evita Ostacoli.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover" />
               <div className="absolute bottom-0 left-0 bg-orange-600 text-white font-bold px-4 py-1 text-sm uppercase shadow-md">Umělá inteligence</div>
            </div>
             <div className="p-5">
                <h3 className="text-xl font-black mb-2 text-gray-900 uppercase">NENARAZÍ A NESPADNE</h3>
                <p className="text-gray-600 text-base leading-snug">
                Vidí a <strong>vyhýbá se překážkám</strong> jako ponožky, boty a hračky. Mapuje dům přesně laserem a nespadne ze schodů.
                </p>
            </div>
          </div>

          {/* Feature 5 - App Control (Video) */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-transparent hover:border-green-500 transition-colors group">
             <div className="aspect-square w-full bg-gray-900 relative overflow-hidden">
               <video src="/images/robotcleanprox imggif/GIF Controllo App.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover" />
               <div className="absolute bottom-0 left-0 bg-green-600 text-white font-bold px-4 py-1 text-sm uppercase shadow-md">Aplikace a hlas</div>
            </div>
             <div className="p-5">
                <h3 className="text-xl font-black mb-2 text-gray-900 uppercase">POSLOUCHÁ VAŠE PŘÍKAZY</h3>
                <p className="text-gray-600 text-base leading-snug">
                "Alexa, ukliď kuchyň". Nebo použijte aplikaci a řekněte mu <strong>kam má jet</strong> a kdy vyrazit, i když nejste doma.
                </p>
            </div>
          </div>

          {/* Feature 6 - Battery 8 Hours */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-transparent hover:border-purple-500 transition-colors group">
             <div className="aspect-square w-full bg-gray-900 relative overflow-hidden">
               <img src="/images/robotcleanprox imggif/IMG Ricarica.png" alt="Nabíjení robota" className="w-full h-full object-cover" />
               <div className="absolute bottom-0 left-0 bg-purple-600 text-white font-bold px-4 py-1 text-sm uppercase shadow-md">8 hodin provozu</div>
            </div>
             <div className="p-5">
                <h3 className="text-xl font-black mb-2 text-gray-900 uppercase">NEÚNAVNÝ</h3>
                <p className="text-gray-600 text-base leading-snug">
                Baterie vydrží <strong>až 8 hodin</strong>. Uklidí vícepodlažní vily najednou. Když se vybije, vrátí se, nabije se a <strong>pokračuje sám</strong>.
                </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Features;