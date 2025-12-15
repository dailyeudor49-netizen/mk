import React from 'react';
import { Frown, Gamepad2, Tv } from 'lucide-react';
import { CURRENCY } from '../constants';

export const Problem: React.FC = () => {
  return (
    <section className="bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-black text-center mb-8 uppercase text-gray-800">
          POZNATI SU VAM OVI PROBLEMI?
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-red-500 text-center">
            <div className="flex justify-center mb-4">
              <Tv size={48} className="text-red-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Loša kvaliteta slike?</h3>
            <p className="text-gray-600 leading-relaxed">
              Dosta vam je utakmica koje zapinju i "pikseliziranog" ekrana? Vaš stari prijemnik ne podržava <span className="font-bold text-gray-800">Pravi 4K</span> koji zaslužujete.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-red-500 text-center">
            <div className="flex justify-center mb-4">
              <Frown size={48} className="text-red-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Dosadni kanali?</h3>
            <p className="text-gray-600 leading-relaxed">
              Obična televizija je prošlost. Da biste gledali najnovije filmove i serije, morate plaćati <span className="font-bold text-gray-800">stotine eura</span> godišnje za pretplate.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-red-500 text-center">
            <div className="flex justify-center mb-4">
              <Gamepad2 size={48} className="text-red-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Skube konzole?</h3>
            <p className="text-gray-600 leading-relaxed">
              Djeca žele igrati <span className="font-bold text-gray-800">Fortnite ili FIFA-u</span>, ali dati 500+ € za konzolu je ludost?
            </p>
          </div>
        </div>

        <div className="mt-8 text-center bg-red-50 border-2 border-red-200 p-4 rounded-lg">
          <p className="text-xl font-bold text-red-700">
            KRAJ KOMPROMISA! Postoji <span className="uppercase underline">jeftin</span> način za 4K Kino, Stadion i Igre direktno u vašem dnevnom boravku.
          </p>
        </div>
      </div>
    </section>
  );
};