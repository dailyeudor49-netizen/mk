import React from 'react';
import { Frown, Gamepad2, Tv } from 'lucide-react';
import { CURRENCY } from '../constants';

export const Problem: React.FC = () => {
  return (
    <section className="bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-black text-center mb-8 uppercase text-gray-800">
          ПОЗНАТИ ЛИ СА ВИ ТЕЗИ ПРОБЛЕМИ?
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-red-500 text-center">
            <div className="flex justify-center mb-4">
              <Tv size={48} className="text-red-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Лошо качество на картината?</h3>
            <p className="text-gray-600 leading-relaxed">
              Писнало ви е от забиващи мачове и "пикселизиран" екран? Старият декодер не поддържа <span className="font-bold text-gray-800">Истинско 4K</span>, което заслужавате.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-red-500 text-center">
            <div className="flex justify-center mb-4">
              <Frown size={48} className="text-red-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Скучни канали?</h3>
            <p className="text-gray-600 leading-relaxed">
              Обикновената телевизия е минало. За да гледате най-новите филми и сериали, трябва да плащате <span className="font-bold text-gray-800">стотици левове</span> месечно за абонаменти.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-red-500 text-center">
            <div className="flex justify-center mb-4">
              <Gamepad2 size={48} className="text-red-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Скъпи конзоли?</h3>
            <p className="text-gray-600 leading-relaxed">
              Децата искат да играят <span className="font-bold text-gray-800">Fortnite или FIFA</span>, но да дадете 1000+ лв за конзола е лудост?
            </p>
          </div>
        </div>

        <div className="mt-8 text-center bg-red-50 border-2 border-red-200 p-4 rounded-lg">
          <p className="text-xl font-bold text-red-700">
            КРАЙ НА КОМПРОМИСИТЕ! Има <span className="uppercase underline">евтин</span> начин за 4K Кино, Стадион и Игри директно във вашия хол.
          </p>
        </div>
      </div>
    </section>
  );
};