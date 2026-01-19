import React from 'react';
import { Frown, Gamepad2, Tv } from 'lucide-react';
import { CURRENCY } from '../constants';

export const Problem: React.FC = () => {
  return (
    <section className="bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-black text-center mb-8 uppercase text-gray-800">
          AR PAŽĮSTATE ŠIAS PROBLEMAS?
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-red-500 text-center">
            <div className="flex justify-center mb-4">
              <Tv size={48} className="text-red-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Prasta vaizdo kokybė?</h3>
            <p className="text-gray-600 leading-relaxed">
              Pavargote nuo užstringančių rungtynių ir "pikselizuoto" ekrano? Jūsų senas imtuvas nepalaiko <span className="font-bold text-gray-800">Tikro 4K</span>, kurio nusipelnėte.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-red-500 text-center">
            <div className="flex justify-center mb-4">
              <Frown size={48} className="text-red-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Nuobodūs kanalai?</h3>
            <p className="text-gray-600 leading-relaxed">
              Paprastoji televizija – praeitis. Norint žiūrėti naujausius filmus ir serialus, reikia mokėti <span className="font-bold text-gray-800">šimtus eurų</span> per metus už prenumeratas.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-red-500 text-center">
            <div className="flex justify-center mb-4">
              <Gamepad2 size={48} className="text-red-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Brangios konsolės?</h3>
            <p className="text-gray-600 leading-relaxed">
              Vaikai nori žaisti <span className="font-bold text-gray-800">Fortnite ar FIFA</span>, bet išleisti 500+ € už konsolę – beprotybė?
            </p>
          </div>
        </div>

        <div className="mt-8 text-center bg-red-50 border-2 border-red-200 p-4 rounded-lg">
          <p className="text-xl font-bold text-red-700">
            BAIGĖSI KOMPROMISAI! Yra <span className="uppercase underline">pigus</span> būdas turėti 4K Kiną, Stadioną ir Žaidimus tiesiai savo svetainėje.
          </p>
        </div>
      </div>
    </section>
  );
};
