import React from 'react';
import { CheckCircle2, Zap } from 'lucide-react';
import { PRODUCT_NAME } from '../constants';

export const Solution: React.FC = () => {
  return (
    <section className="py-12 bg-gray-50 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black text-center mb-4 text-gray-900 leading-tight uppercase">
          URZĄDZENIE <span className="text-red-600 bg-yellow-200 px-2">OSTATECZNE</span> DO TWOJEGO SALONU
        </h2>
        <p className="text-center text-xl text-gray-600 mb-12 max-w-3xl mx-auto font-medium">
          Zapomnij o wszystkim, co wiesz o telewizji. Oto jak ten box <strong>4K Ultra HD</strong> zmienia Twoje życie od razu po podłączeniu:
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
                        1. KINO W 4K (LEPIEJ NIŻ W RZECZYWISTOŚCI)
                    </h3>
                    <p className="text-gray-600 text-lg mb-4 leading-relaxed">
                        To nie jest zwykłe "oglądanie TV", to wchodzenie w świat filmu. Dzięki rozdzielczości <strong>4K Ultra HD z HDR</strong>, kolory eksplodują, a detale zachwycają. Netflix, HBO Max i Player.pl uruchamiają się błyskawicznie.
                    </p>
                    <ul className="space-y-2">
                        <li className="flex items-center gap-2 font-bold text-gray-800">
                            <CheckCircle2 className="text-green-500 shrink-0" /> Prawdziwe 4K (3840x2160)
                        </li>
                        <li className="flex items-center gap-2 font-bold text-gray-800">
                            <CheckCircle2 className="text-green-500 shrink-0" /> Szybki procesor - zero czekania
                        </li>
                    </ul>
                </div>
            </div>

            {/* ANGLE 2: SPORT / STABILITY */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-8 bg-white p-6 rounded-2xl shadow-xl border-2 border-gray-100 transform hover:scale-[1.01] transition duration-300">
                <div className="w-full md:w-1/2">
                    {/* Video Sport */}
                    <div className="relative rounded-xl overflow-hidden shadow-lg border-4 border-gray-900 aspect-square">
                        <div className="absolute top-2 right-2 bg-green-600 text-white text-xs font-bold px-2 py-1 z-10 rounded uppercase animate-pulse">ZERO ZACIĘĆ</div>
                        <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                            <source src="/images/tvboxpro-4k/sport.mp4" type="video/mp4" />
                        </video>
                    </div>
                </div>
                <div className="w-full md:w-1/2 text-left">
                    <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-3 uppercase leading-none">
                        2. MECZ JAK NA STADIONIE
                    </h3>
                    <p className="text-gray-600 text-lg mb-4 leading-relaxed">
                        Widzisz każde źdźbło trawy. Dzięki <strong>płynności 4K w 60fps</strong>, mecze na Viaplay czy Canal+ Online nie zacinają się, nawet podczas derbów czy gali KSW. Twoi znajomi będą chcieli oglądać mecze tylko u Ciebie.
                    </p>
                    <ul className="space-y-2">
                        <li className="flex items-center gap-2 font-bold text-gray-800">
                            <CheckCircle2 className="text-green-500 shrink-0" /> Płynny streaming bez buforowania
                        </li>
                        <li className="flex items-center gap-2 font-bold text-gray-800">
                            <CheckCircle2 className="text-green-500 shrink-0" /> Mocna antena WiFi (łapie zasięg wszędzie)
                        </li>
                    </ul>
                </div>
            </div>

            {/* ANGLE 3: GAMING / KIDS */}
            <div className="flex flex-col md:flex-row items-center gap-8 bg-white p-6 rounded-2xl shadow-xl border-2 border-gray-100 transform hover:scale-[1.01] transition duration-300">
                <div className="w-full md:w-1/2">
                    {/* GIF Gaming */}
                    <div className="relative rounded-xl overflow-hidden shadow-lg border-4 border-gray-900 aspect-square">
                         <div className="absolute top-2 left-2 bg-purple-600 text-white text-xs font-bold px-2 py-1 z-10 rounded uppercase animate-pulse">PAD W ZESTAWIE</div>
                        <img src="/images/tvboxpro-4k/gaming.gif" alt="GIF Gry Wideo" className="w-full h-full object-cover" />
                    </div>
                </div>
                <div className="w-full md:w-1/2 text-left">
                    <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-3 uppercase leading-none">
                        3. GRAJ W GTA, FIFĘ I FORTNITE
                    </h3>
                    <p className="text-gray-600 text-lg mb-4 leading-relaxed">
                        Dobrze czytasz. Podłącz <span className="text-purple-700 font-bold">Joystick GRATIS</span> (w zestawie) i zmień TV w konsolę. Twoje dzieci lub wnuki mogą grać w hity bez wydawania 2500 zł na PlayStation 5.
                    </p>
                    <ul className="space-y-2">
                        <li className="flex items-center gap-2 font-bold text-gray-800">
                            <CheckCircle2 className="text-green-500 shrink-0" /> Kompatybilny z grami Android i Cloud Gaming
                        </li>
                        <li className="flex items-center gap-2 font-bold text-gray-800">
                            <CheckCircle2 className="text-green-500 shrink-0" /> Oszczędzasz setki złotych na konsoli
                        </li>
                    </ul>
                </div>
            </div>

        </div>
        
        <div className="mt-12 text-center">
             <div className="inline-flex items-center gap-2 bg-yellow-100 border border-yellow-300 px-6 py-3 rounded-full">
                <Zap className="text-yellow-600 fill-current" />
                <span className="font-bold text-gray-800 uppercase text-sm md:text-base">Działa na każdym TV (nawet starym 15-letnim)</span>
             </div>
        </div>

      </div>
    </section>
  );
};