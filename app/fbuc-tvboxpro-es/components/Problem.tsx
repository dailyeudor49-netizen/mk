import React from 'react';
import { Frown, Gamepad2, Tv } from 'lucide-react';
import { CURRENCY } from '../constants';

export const Problem: React.FC = () => {
  return (
    <section className="bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-black text-center mb-8 uppercase text-gray-800">
          ¿TE SUENAN ESTOS PROBLEMAS?
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-red-500 text-center">
            <div className="flex justify-center mb-4">
              <Tv size={48} className="text-red-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">¿Mala calidad de imagen?</h3>
            <p className="text-gray-600 leading-relaxed">
              ¿Estás harto de partidos que se congelan y pantallas "pixeladas"? Tu viejo receptor no soporta el <span className="font-bold text-gray-800">Verdadero 4K</span> que mereces.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-red-500 text-center">
            <div className="flex justify-center mb-4">
              <Frown size={48} className="text-red-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">¿Canales aburridos?</h3>
            <p className="text-gray-600 leading-relaxed">
              La televisión tradicional es cosa del pasado. Para ver las últimas películas y series, tienes que pagar <span className="font-bold text-gray-800">cientos de euros</span> al año en suscripciones.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-red-500 text-center">
            <div className="flex justify-center mb-4">
              <Gamepad2 size={48} className="text-red-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">¿Consolas carísimas?</h3>
            <p className="text-gray-600 leading-relaxed">
              ¿Tus hijos quieren jugar <span className="font-bold text-gray-800">Fortnite o FIFA</span>, pero gastar 500+ € en una consola es una locura?
            </p>
          </div>
        </div>

        <div className="mt-8 text-center bg-red-50 border-2 border-red-200 p-4 rounded-lg">
          <p className="text-xl font-bold text-red-700">
            ¡SE ACABARON LOS COMPROMISOS! Existe una forma <span className="uppercase underline">económica</span> de tener Cine 4K, Estadio y Juegos directamente en tu salón.
          </p>
        </div>
      </div>
    </section>
  );
};
