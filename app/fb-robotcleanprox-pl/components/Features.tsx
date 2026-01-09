'use client';

import React from 'react';

const Features: React.FC = () => {
  return (
    <section className="bg-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black text-center text-gray-900 mb-10 leading-tight uppercase">
          TO NIE TYLKO ROBOT,<br/>TO TWOJA NOWA GOSPODYNI.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Feature 1 - Suction Power (GIF) */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-transparent hover:border-red-500 transition-colors group">
             <div className="aspect-square w-full bg-gray-900 relative overflow-hidden">
               <img src="/images/robotcleanprox imggif/GIF ASPIRA TUTTO.gif" alt="GIF Odkurzanie Śrub" className="w-full h-full object-cover" />
               <div className="absolute bottom-0 left-0 bg-red-600 text-white font-bold px-4 py-1 text-sm uppercase shadow-md">Silnik Turbo</div>
            </div>
             <div className="p-5">
                <h3 className="text-xl font-black mb-2 text-gray-900 uppercase">ODKURZA ŚRUBY I BATERIE</h3>
                <p className="text-gray-600 text-base leading-snug">
                Nie tylko kurz. Ma taką moc, że odkurza <strong>monety, karmę i ciężkie zanieczyszczenia</strong>. Jak przejedzie, nic nie zostaje.
                </p>
            </div>
          </div>

          {/* Feature 2 - Base Station (GIF) */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-transparent hover:border-red-500 transition-colors group">
            <div className="aspect-square w-full bg-gray-900 relative overflow-hidden">
               <img src="/images/robotcleanprox imggif/GIF Svuotamento.gif" alt="GIF Baza Samoopróżniająca" className="w-full h-full object-cover" />
               <div className="absolute bottom-0 left-0 bg-red-600 text-white font-bold px-4 py-1 text-sm uppercase shadow-md">Baza All-in-One</div>
            </div>
            <div className="p-5">
                <h3 className="text-xl font-black mb-2 text-gray-900 uppercase">ZAPOMNISZ O NIM</h3>
                <p className="text-gray-600 text-base leading-snug">
                Nie musisz niczego opróżniać. Baza <strong>zasysa brud</strong> do szczelnego worka i <strong>uzupełnia wodę</strong> sama. Nie brudzisz rąk przez 60 dni.
                </p>
            </div>
          </div>

          {/* Feature 3 - Washing (GIF) */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-transparent hover:border-blue-500 transition-colors group">
             <div className="aspect-square w-full bg-gray-900 relative overflow-hidden">
               <img src="/images/robotcleanprox imggif/GIF Toglie Macchie.gif" alt="GIF Usuwanie Plam" className="w-full h-full object-cover" />
               <div className="absolute bottom-0 left-0 bg-blue-600 text-white font-bold px-4 py-1 text-sm uppercase shadow-md">Mycie Ciśnieniowe</div>
            </div>
             <div className="p-5">
                <h3 className="text-xl font-black mb-2 text-gray-900 uppercase">USUWA ZASCHNIĘTE PLAMY</h3>
                <p className="text-gray-600 text-base leading-snug">
                Obrotowe mopy wirują 200 razy na minutę. Usuwają plamy z <strong>kawy, sosu i zaschniętego błota</strong>. Podłoga od razu lśni.
                </p>
            </div>
          </div>

           {/* Feature 4 - AI Navigation (Video) */}
           <div className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-transparent hover:border-orange-500 transition-colors group">
             <div className="aspect-square w-full bg-gray-900 relative overflow-hidden">
               <video src="/images/robotcleanprox imggif/GIF Evita Ostacoli.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover" />
               <div className="absolute bottom-0 left-0 bg-orange-600 text-white font-bold px-4 py-1 text-sm uppercase shadow-md">Sztuczna Inteligencja</div>
            </div>
             <div className="p-5">
                <h3 className="text-xl font-black mb-2 text-gray-900 uppercase">NIE UDERZA I NIE SPADA</h3>
                <p className="text-gray-600 text-base leading-snug">
                Widzi i <strong>omija przeszkody</strong> jak skarpetki, buty i zabawki. Mapuje dom co do milimetra laserem i nie spada ze schodów.
                </p>
            </div>
          </div>

          {/* Feature 5 - App Control (Video) */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-transparent hover:border-green-500 transition-colors group">
             <div className="aspect-square w-full bg-gray-900 relative overflow-hidden">
               <video src="/images/robotcleanprox imggif/GIF Controllo App.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover" />
               <div className="absolute bottom-0 left-0 bg-green-600 text-white font-bold px-4 py-1 text-sm uppercase shadow-md">Aplikacja & Głos</div>
            </div>
             <div className="p-5">
                <h3 className="text-xl font-black mb-2 text-gray-900 uppercase">SŁUCHA TWOICH POLECEŃ</h3>
                <p className="text-gray-600 text-base leading-snug">
                "Alexa, posprzątaj kuchnię". Lub użyj aplikacji, żeby wskazać mu <strong>gdzie ma jechać</strong> i kiedy startować, nawet gdy jesteś poza domem.
                </p>
            </div>
          </div>

          {/* Feature 6 - Battery 8 Hours */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-transparent hover:border-purple-500 transition-colors group">
             <div className="aspect-square w-full bg-gray-900 relative overflow-hidden">
               <img src="/images/robotcleanprox imggif/IMG Ricarica.png" alt="Ładowanie Robota" className="w-full h-full object-cover" />
               <div className="absolute bottom-0 left-0 bg-purple-600 text-white font-bold px-4 py-1 text-sm uppercase shadow-md">8 Godzin Autonomii</div>
            </div>
             <div className="p-5">
                <h3 className="text-xl font-black mb-2 text-gray-900 uppercase">NIEZMORDOWANY</h3>
                <p className="text-gray-600 text-base leading-snug">
                Bateria wytrzymuje <strong>do 8 godzin</strong>. Sprząta wielopiętrowe domy za jednym razem. Jak się rozładuje, wraca do bazy, ładuje się i <strong>startuje sam</strong>.
                </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Features;
