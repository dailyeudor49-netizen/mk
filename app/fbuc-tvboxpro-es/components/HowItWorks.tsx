import React from 'react';
import { HdmiPort, Wifi, PlayCircle } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-black text-center mb-10 uppercase text-gray-900 leading-tight">
          ¿INSTALACIÓN? <br/>
          <span className="text-green-600">MÁS FÁCIL IMPOSIBLE</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting Line (Desktop only) */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-1 bg-gray-200 -z-10 transform scale-x-75"></div>

          {/* Step 1 */}
          <div className="flex flex-col items-center text-center group">
            <div className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center text-white shadow-xl mb-6 transform group-hover:scale-110 transition duration-300 border-4 border-white relative">
              <span className="absolute -top-2 -left-2 w-8 h-8 bg-yellow-400 rounded-full text-black font-black flex items-center justify-center border-2 border-white">1</span>
              <HdmiPort size={40} strokeWidth={2} />
            </div>
            <h3 className="text-xl font-black uppercase mb-2 text-gray-800">CONECTA</h3>
            <p className="text-gray-600 px-4">
              Enchufa el cable HDMI al televisor. No necesitas llamar a un técnico, solo encuentra una entrada libre en la parte trasera del TV.
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center group">
            <div className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center text-white shadow-xl mb-6 transform group-hover:scale-110 transition duration-300 border-4 border-white relative">
              <span className="absolute -top-2 -left-2 w-8 h-8 bg-yellow-400 rounded-full text-black font-black flex items-center justify-center border-2 border-white">2</span>
              <Wifi size={40} strokeWidth={2} />
            </div>
            <h3 className="text-xl font-black uppercase mb-2 text-gray-800">ENLAZA</h3>
            <p className="text-gray-600 px-4">
              Enciende el dispositivo y conéctalo a tu WiFi de casa (o al internet del móvil). Funciona con todos los operadores.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center group">
            <div className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center text-white shadow-xl mb-6 transform group-hover:scale-110 transition duration-300 border-4 border-white relative">
              <span className="absolute -top-2 -left-2 w-8 h-8 bg-yellow-400 rounded-full text-black font-black flex items-center justify-center border-2 border-white">3</span>
              <PlayCircle size={40} strokeWidth={2} />
            </div>
            <h3 className="text-xl font-black uppercase mb-2 text-gray-800">DISFRUTA</h3>
            <p className="text-gray-600 px-4">
              ¡Listo! Tienes acceso a miles de canales, películas, series y juegos. Sin contratos y sin estrés.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};
