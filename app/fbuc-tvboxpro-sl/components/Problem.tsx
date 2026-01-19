import React from 'react';
import { Frown, Gamepad2, Tv } from 'lucide-react';
import { CURRENCY } from '../constants';

export const Problem: React.FC = () => {
  return (
    <section className="bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-black text-center mb-8 uppercase text-gray-800">
          ALI VAM JE TO ZNANO?
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-red-500 text-center">
            <div className="flex justify-center mb-4">
              <Tv size={48} className="text-red-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Slaba kakovost slike?</h3>
            <p className="text-gray-600 leading-relaxed">
              Ste naveličani tekem, ki se zatikajo, in "pikselizirane" slike? Vaš stari sprejemnik ne podpira <span className="font-bold text-gray-800">Pravega 4K</span>, ki ga zaslužite.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-red-500 text-center">
            <div className="flex justify-center mb-4">
              <Frown size={48} className="text-red-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Dolgočasni kanali?</h3>
            <p className="text-gray-600 leading-relaxed">
              Navadna televizija je preteklost. Če želite gledati najnovejše filme in serije, morate plačati <span className="font-bold text-gray-800">več sto evrov</span> na leto za naročnine.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-red-500 text-center">
            <div className="flex justify-center mb-4">
              <Gamepad2 size={48} className="text-red-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Drage konzole?</h3>
            <p className="text-gray-600 leading-relaxed">
              Otroci želijo igrati <span className="font-bold text-gray-800">Fortnite ali FIFA-o</span>, a dati 500+ € za konzolo je norost?
            </p>
          </div>
        </div>

        <div className="mt-8 text-center bg-red-50 border-2 border-red-200 p-4 rounded-lg">
          <p className="text-xl font-bold text-red-700">
            KONEC KOMPROMISOV! Obstaja <span className="uppercase underline">poceni</span> način za 4K Kino, Stadion in Igre neposredno v vaši dnevni sobi.
          </p>
        </div>
      </div>
    </section>
  );
};
