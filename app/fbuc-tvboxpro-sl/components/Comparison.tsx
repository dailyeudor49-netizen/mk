import React from 'react';
import { Check, Trophy } from 'lucide-react';
import { PRODUCT_NAME, PRICE_PROMO, CURRENCY } from '../constants';

const comparisonData = [
    {
        feature: "Skupna cena",
        us: { text: `Samo ${PRICE_PROMO} ${CURRENCY}`, sub: "Enkratno plačilo", highlight: true },
        them: { text: "Več kot 500 €", sub: "Cena novega TV-ja", highlight: false }
    },
    {
        feature: "Ali deluje na starih TV-jih?",
        us: { text: "DA, TUDI NA STARIH", sub: "Potreben samo HDMI", highlight: false },
        them: { text: "Ne", sub: "Morate kupiti novega", highlight: false }
    },
    {
        feature: "Namestitev",
        us: { text: "30 Sekund", sub: "Naredite sami", highlight: false },
        them: { text: "Zapletena", sub: "Računi, WiFi, Kanali...", highlight: false }
    },
    {
        feature: "Prenosljivost",
        us: { text: "DA, KJERKOLI", sub: "Vikendica, Hotel, Apartma", highlight: false },
        them: { text: "NE", sub: "Stoji na enem mestu", highlight: false }
    },
    {
        feature: "Video igre?",
        us: { text: "V PAKETU", sub: "+ Joystick Darilo", highlight: true },
        them: { text: "LOČENO", sub: "Potrebna konzola", highlight: false }
    },
    {
        feature: "Življenjska doba",
        us: { text: "LETA", sub: "Posodabljate samo box", highlight: false },
        them: { text: "ZASTARI", sub: "TV postane počasen", highlight: false }
    }
];

export const Comparison: React.FC = () => {
  return (
    <section className="bg-white py-12 px-4 border-t-8 border-gray-100">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-black text-center mb-2 uppercase text-gray-900 leading-tight">
          NE MEČITE STAREGA TELEVIZORJA!
        </h2>
        <p className="text-center text-gray-600 mb-8 text-lg">
          Poglejte, koliko prihranite v primerjavi z nakupom novega Smart TV-ja.
        </p>

        {/* --- DESKTOP VIEW (Table) --- */}
        <div className="hidden md:block overflow-hidden rounded-xl border-2 border-gray-200 shadow-2xl">
          <table className="w-full text-center border-collapse">
            <thead>
              <tr>
                <th className="p-4 bg-gray-50 w-1/3 text-gray-500 font-bold uppercase text-sm tracking-wider">Funkcija</th>
                <th className="p-4 bg-green-600 text-white w-1/3 border-b-4 border-green-800 relative">
                    <div className="text-xl font-black uppercase tracking-tighter">{PRODUCT_NAME}</div>
                    <div className="absolute top-0 right-0 bg-yellow-400 text-black text-xs font-bold px-2 py-1 shadow-sm">ZMAGOVALEC</div>
                </th>
                <th className="p-4 bg-gray-800 text-gray-400 w-1/3 border-b-4 border-gray-900">
                  Nov Smart TV
                </th>
              </tr>
            </thead>
            <tbody className="text-lg">
              {comparisonData.map((row, idx) => (
                  <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50 transition">
                    <td className="p-4 text-left font-bold text-gray-700 bg-gray-50 border-r border-gray-200">
                        {row.feature}
                    </td>
                    <td className="p-4 bg-green-50 border-r border-gray-200">
                         <div className="flex flex-col items-center">
                            {idx === 0 || row.us.highlight ? (
                                <span className="font-black text-red-600 text-xl">{row.us.text}</span>
                            ) : (
                                <div className="flex items-center gap-2 font-bold text-green-800">
                                    <Check size={20} strokeWidth={4} /> {row.us.text}
                                </div>
                            )}
                            <span className="text-xs font-medium text-green-700 mt-1">{row.us.sub}</span>
                         </div>
                    </td>
                    <td className="p-4 bg-gray-100 opacity-70">
                         <div className="flex flex-col items-center">
                            <span className="font-bold text-gray-600">{row.them.text}</span>
                            <span className="text-xs text-gray-500 mt-1">{row.them.sub}</span>
                         </div>
                    </td>
                  </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* --- MOBILE VIEW (Battle Cards) --- */}
        <div className="md:hidden space-y-6">

            {/* Mobile Header Legend */}
            <div className="flex justify-between items-end px-2 mb-4">
                <div className="text-center w-1/2 pr-2">
                    <div className="bg-green-600 text-white font-black text-sm py-2 rounded-t-lg shadow-md border-b-4 border-green-800">
                        TV BOX PRO
                    </div>
                </div>
                <div className="text-center w-1/2 pl-2">
                    <div className="bg-gray-700 text-gray-300 font-bold text-xs py-2 rounded-t-lg">
                        SMART TV
                    </div>
                </div>
            </div>

            {/* Mobile Feature Cards */}
            {comparisonData.map((row, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow-lg border-2 border-gray-100 overflow-hidden">
                    <div className="bg-gray-100 p-2 text-center font-bold text-gray-800 text-sm uppercase tracking-wider border-b border-gray-200">
                        {row.feature}
                    </div>
                    <div className="flex">
                        {/* Left Side (Winner) */}
                        <div className="w-1/2 bg-green-50 p-3 flex flex-col items-center justify-center text-center border-r-2 border-white relative">
                            {/* Little trophy icon for visual reinforcement */}
                            <div className="absolute top-1 left-1 text-yellow-500 opacity-50"><Trophy size={12} fill="currentColor"/></div>

                            <span className={`font-black ${row.us.highlight ? 'text-red-600 text-lg' : 'text-green-800 text-base'}`}>
                                {row.us.text}
                            </span>
                            <span className="text-[10px] leading-tight font-medium text-green-700 mt-1">
                                {row.us.sub}
                            </span>
                        </div>

                        {/* Right Side (Loser) */}
                        <div className="w-1/2 bg-gray-50 p-3 flex flex-col items-center justify-center text-center opacity-70 grayscale">
                            <span className="font-bold text-gray-600 text-sm">
                                {row.them.text}
                            </span>
                            <span className="text-[10px] leading-tight text-gray-500 mt-1">
                                {row.them.sub}
                            </span>
                        </div>
                    </div>
                </div>
            ))}

            <div className="text-center mt-6">
                <p className="text-sm text-gray-500 italic">
                    Rezultat: Box zmaga 6 proti 0 v razmerju cene in kakovosti.
                </p>
            </div>
        </div>

      </div>
    </section>
  );
};
