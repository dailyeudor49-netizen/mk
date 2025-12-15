import React from 'react';
import { Frown, Gamepad2, Tv } from 'lucide-react';
import { CURRENCY } from '../constants';

export const Problem: React.FC = () => {
  return (
    <section className="bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-black text-center mb-8 uppercase text-gray-800">
          CZY ZNASZ TE PROBLEMY?
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-red-500 text-center">
            <div className="flex justify-center mb-4">
              <Tv size={48} className="text-red-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Słaba jakość obrazu?</h3>
            <p className="text-gray-600 leading-relaxed">
              Masz dość zacinających się meczów i "pikselozy"? Stary dekoder nie obsługuje <span className="font-bold text-gray-800">Prawdziwego 4K</span>, na które zasługujesz.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-red-500 text-center">
            <div className="flex justify-center mb-4">
              <Frown size={48} className="text-red-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Nudne kanały?</h3>
            <p className="text-gray-600 leading-relaxed">
              Zwykła telewizja to przeszłość. Aby oglądać najnowsze filmy i seriale w HD, musisz wydawać <span className="font-bold text-gray-800">setki złotych</span> miesięcznie na abonamenty.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-red-500 text-center">
            <div className="flex justify-center mb-4">
              <Gamepad2 size={48} className="text-red-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">PlayStation za drogie?</h3>
            <p className="text-gray-600 leading-relaxed">
              Twoje dzieci chcą grać w <span className="font-bold text-gray-800">Fortnite lub FIFĘ</span>, ale wydawanie 2500 zł na konsolę to szaleństwo?
            </p>
          </div>
        </div>

        <div className="mt-8 text-center bg-red-50 border-2 border-red-200 p-4 rounded-lg">
          <p className="text-xl font-bold text-red-700">
            KONIEC Z KOMPROMISAMI! Istnieje <span className="uppercase underline">tani</span> sposób na Kino 4K, Stadion i Salon Gier prosto w Twoim salonie.
          </p>
        </div>
      </div>
    </section>
  );
};