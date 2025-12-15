import React from 'react';
import { CheckCircle2, Zap } from 'lucide-react';
import { PRODUCT_NAME } from '../constants';

export const Solution: React.FC = () => {
  return (
    <section className="py-12 bg-gray-50 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black text-center mb-4 text-gray-900 leading-tight uppercase">
          УСТРОЙСТВОТО <span className="text-red-600 bg-yellow-200 px-2">МЕЧТА</span> ЗА ВАШИЯ ДОМ
        </h2>
        <p className="text-center text-xl text-gray-600 mb-12 max-w-3xl mx-auto font-medium">
          Забравете всичко, което знаете за телевизията. Ето как този <strong>4K Ultra HD</strong> box променя живота ви веднага след включване:
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
                        1. КИНО В 4K (ПО-ДОБРЕ ОТ РЕАЛНОСТТА)
                    </h3>
                    <p className="text-gray-600 text-lg mb-4 leading-relaxed">
                        Това не е просто "гледане на TV", това е потапяне във филма. Благодарение на <strong>4K Ultra HD с HDR</strong>, цветовете оживяват, а детайлите са невероятни. Netflix, YouTube и HBO Max стартират мигновено.
                    </p>
                    <ul className="space-y-2">
                        <li className="flex items-center gap-2 font-bold text-gray-800">
                            <CheckCircle2 className="text-green-500 shrink-0" /> Истинско 4K (3840x2160)
                        </li>
                        <li className="flex items-center gap-2 font-bold text-gray-800">
                            <CheckCircle2 className="text-green-500 shrink-0" /> Бърз процесор - без чакане
                        </li>
                    </ul>
                </div>
            </div>

            {/* ANGLE 2: SPORT / STABILITY */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-8 bg-white p-6 rounded-2xl shadow-xl border-2 border-gray-100 transform hover:scale-[1.01] transition duration-300">
                <div className="w-full md:w-1/2">
                    {/* Video Sport */}
                    <div className="relative rounded-xl overflow-hidden shadow-lg border-4 border-gray-900 aspect-square">
                        <div className="absolute top-2 right-2 bg-green-600 text-white text-xs font-bold px-2 py-1 z-10 rounded uppercase animate-pulse">БЕЗ ЗАБИВАНЕ</div>
                        <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                            <source src="/images/tvboxpro-4k/sport.mp4" type="video/mp4" />
                        </video>
                    </div>
                </div>
                <div className="w-full md:w-1/2 text-left">
                    <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-3 uppercase leading-none">
                        2. МАЧЪТ, СЯКАШ СТЕ НА СТАДИОНА
                    </h3>
                    <p className="text-gray-600 text-lg mb-4 leading-relaxed">
                        Виждате всяко стръкче трева. Благодарение на <strong>плавното 4K при 60fps</strong>, мачовете (Diema Sport, Max Sport) не забиват, дори по време на дербита. Приятелите ви ще искат да гледат мачове само у вас.
                    </p>
                    <ul className="space-y-2">
                        <li className="flex items-center gap-2 font-bold text-gray-800">
                            <CheckCircle2 className="text-green-500 shrink-0" /> Плавен стрийминг без буфериране
                        </li>
                        <li className="flex items-center gap-2 font-bold text-gray-800">
                            <CheckCircle2 className="text-green-500 shrink-0" /> Мощна WiFi антена (хваща навсякъде)
                        </li>
                    </ul>
                </div>
            </div>

            {/* ANGLE 3: GAMING / KIDS */}
            <div className="flex flex-col md:flex-row items-center gap-8 bg-white p-6 rounded-2xl shadow-xl border-2 border-gray-100 transform hover:scale-[1.01] transition duration-300">
                <div className="w-full md:w-1/2">
                    {/* GIF Gaming */}
                    <div className="relative rounded-xl overflow-hidden shadow-lg border-4 border-gray-900 aspect-square">
                         <div className="absolute top-2 left-2 bg-purple-600 text-white text-xs font-bold px-2 py-1 z-10 rounded uppercase animate-pulse">ДЖОЙСТИК В КУТИЯТА</div>
                        <img src="/images/tvboxpro-4k/gaming.gif" alt="GIF Video Games" className="w-full h-full object-cover" />
                    </div>
                </div>
                <div className="w-full md:w-1/2 text-left">
                    <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-3 uppercase leading-none">
                        3. ИГРАЙТЕ GTA, FIFA И FORTNITE
                    </h3>
                    <p className="text-gray-600 text-lg mb-4 leading-relaxed">
                        Правилно прочетохте. Свържете <span className="text-purple-700 font-bold">Джойстика ПОДАРЪК</span> (в комплекта) и превърнете TV в конзола. Децата или внуците могат да играят хитове, без да давате 1000 лв за конзола.
                    </p>
                    <ul className="space-y-2">
                        <li className="flex items-center gap-2 font-bold text-gray-800">
                            <CheckCircle2 className="text-green-500 shrink-0" /> Съвместим с Android игри и Cloud Gaming
                        </li>
                        <li className="flex items-center gap-2 font-bold text-gray-800">
                            <CheckCircle2 className="text-green-500 shrink-0" /> Спестявате стотици левове
                        </li>
                    </ul>
                </div>
            </div>

        </div>
        
        <div className="mt-12 text-center">
             <div className="inline-flex items-center gap-2 bg-yellow-100 border border-yellow-300 px-6 py-3 rounded-full">
                <Zap className="text-yellow-600 fill-current" />
                <span className="font-bold text-gray-800 uppercase text-sm md:text-base">Работи на всеки телевизор (дори 15-годишен)</span>
             </div>
        </div>

      </div>
    </section>
  );
};