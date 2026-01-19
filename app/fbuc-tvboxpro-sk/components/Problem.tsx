import React from 'react';
import { Frown, Gamepad2, Tv } from 'lucide-react';
import { CURRENCY } from '../constants';

export const Problem: React.FC = () => {
  return (
    <section className="bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-black text-center mb-8 uppercase text-gray-800">
          POZNÁTE TIETO PROBLÉMY?
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-red-500 text-center">
            <div className="flex justify-center mb-4">
              <Tv size={48} className="text-red-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Zlá kvalita obrazu?</h3>
            <p className="text-gray-600 leading-relaxed">
              Máte dosť zápasov, ktoré sa zasekávajú a "pixelovanej" obrazovky? Váš starý prijímač nepodporuje <span className="font-bold text-gray-800">Pravé 4K</span>, ktoré si zaslúžite.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-red-500 text-center">
            <div className="flex justify-center mb-4">
              <Frown size={48} className="text-red-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Nudné kanály?</h3>
            <p className="text-gray-600 leading-relaxed">
              Bežná televízia je minulosť. Ak chcete sledovať najnovšie filmy a seriály, musíte platiť <span className="font-bold text-gray-800">stovky eur</span> ročne za predplatné.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-red-500 text-center">
            <div className="flex justify-center mb-4">
              <Gamepad2 size={48} className="text-red-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Drahé konzoly?</h3>
            <p className="text-gray-600 leading-relaxed">
              Deti chcú hrať <span className="font-bold text-gray-800">Fortnite alebo FIFA</span>, ale dať 500+ € za konzolu je šialenstvo?
            </p>
          </div>
        </div>

        <div className="mt-8 text-center bg-red-50 border-2 border-red-200 p-4 rounded-lg">
          <p className="text-xl font-bold text-red-700">
            KONIEC KOMPROMISOV! Existuje <span className="uppercase underline">lacný</span> spôsob ako mať 4K Kino, Štadión a Hry priamo vo vašej obývačke.
          </p>
        </div>
      </div>
    </section>
  );
};
