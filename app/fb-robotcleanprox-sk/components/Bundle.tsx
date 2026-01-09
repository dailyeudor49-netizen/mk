'use client';

import React from 'react';
import { BUNDLE_ITEMS } from '../lib/constants';
import { Disc, Wind, Trash, Plug, Droplet, Filter, Brush, FlaskConical, BookOpen, Gift } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  disc: <Disc size={32} />,
  wind: <Wind size={32} />,
  trash: <Trash size={32} />,
  plug: <Plug size={32} />,
  droplet: <Droplet size={32} />,
  filter: <Filter size={32} />,
  brush: <Brush size={32} />,
  flask: <FlaskConical size={32} />,
  book: <BookOpen size={32} />,
};

const Bundle: React.FC = () => {
  return (
    <section className="py-12 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-black text-center text-gray-900 mb-2">
          ČO NÁJDETE V BALENÍ?
        </h2>
        <div className="flex justify-center items-center gap-2 mb-8 flex-wrap px-2">
            <Gift className="text-red-600 shrink-0" />
            <p className="text-center text-base md:text-lg font-bold text-red-600 uppercase">
                Mega Balík Príslušenstva (€49) <span className="bg-red-600 text-white px-2 py-0.5 rounded text-sm ml-1">ZADARMO</span>
            </p>
        </div>

        <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg border-2 border-green-500 relative overflow-hidden">
            {/* Badge OMAGGIO */}
            <div className="absolute -top-1 right-2 md:-top-4 md:-right-4 bg-green-600 text-white font-black px-3 py-1 md:px-4 md:py-2 rounded-lg shadow-md transform rotate-3 text-sm md:text-base">
                SÚČASŤ BALENIA!
            </div>

            {/* Box content image */}
            <div className="mb-8 flex justify-center mt-6 md:mt-0">
                 <img src="/images/robotcleanprox imggif/ROBOTCLEANPROX IMG LANDING/1.png" alt="Contenuto confezione" className="rounded-lg opacity-90 hover:opacity-100 transition w-full max-w-md" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {BUNDLE_ITEMS.map((item, index) => (
                <div key={index} className="flex flex-col items-center text-center p-2 border border-gray-100 rounded-lg hover:shadow-sm transition">
                    <div className="text-gray-700 mb-2">
                        {iconMap[item.iconName] || <Disc />}
                    </div>
                    <span className="font-bold text-base md:text-lg text-gray-900 leading-tight">{item.name}</span>
                    <span className="text-xs bg-gray-200 px-2 py-0.5 rounded-full font-bold text-gray-600 mt-2">
                        Množstvo: {item.quantity}
                    </span>
                </div>
                ))}
            </div>
            
            <div className="mt-8 text-center">
                <p className="text-gray-500 text-sm">Nebudete musieť kupovať náhradné diely aspoň 12 mesiacov.</p>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Bundle;