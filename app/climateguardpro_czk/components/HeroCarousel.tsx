
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Image as ImageIcon, MapPin, Truck } from 'lucide-react';

// --- CONFIGURAZIONE IMMAGINI ---
// Inserisci i link delle tue immagini nel campo 'image'.
// Se lasci vuoto "", verrà mostrato il segnaposto con l'icona.
const slides = [
  {
    id: 1,
    label: "FOTO 1: PRODOTTO INTERO (FRONTALE)",
    sub: "Design Aerodinamico",
    image: "/images/climateguardpro img/prodotto-frontale.png"
  },
  {
    id: 2,
    label: "FOTO 2: AMBIENTATA IN SALOTTO",
    sub: "Eleganza Domestica",
    image: "/images/climateguardpro img/ambientata-salotto.png"
  },
  {
    id: 3,
    label: "FOTO 3: DISPLAY LCD & COMANDI",
    sub: "Controllo Totale",
    image: "/images/climateguardpro img/display-tecnologia.png"
  },
  {
    id: 4,
    label: "FOTO 4: DETTAGLIO FILTRO HEPA",
    sub: "Purificazione Attiva",
    image: "/images/climateguardpro img/filtro-hepa.png"
  },
];

export const HeroCarousel: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  const next = () => setCurrent((curr) => (curr === slides.length - 1 ? 0 : curr + 1));

  useEffect(() => {
    const slideInterval = setInterval(next, 4000); // Auto-play ogni 4 secondi
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <div className="relative w-full group rounded-3xl overflow-hidden shadow-2xl bg-white">

      {/* Slides */}
      <div
        className="flex transition-transform ease-out duration-700"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="min-w-full relative flex items-center justify-center bg-gray-50">

             {slide.image ? (
               // SE C'È L'IMMAGINE, MOSTRA QUELLA
               <img
                 src={slide.image}
                 alt={slide.label}
                 className="w-full h-auto block"
               />
             ) : (
               // ALTRIMENTI MOSTRA IL SEGNAPOSTO
               <>
                 <div className="flex flex-col items-center justify-center p-4 md:p-8 text-center transition-opacity transform scale-90 md:scale-100 z-10">
                    <ImageIcon className="w-16 h-16 md:w-24 md:h-24 text-gray-300 mb-6" />
                    <span className="text-void-950 font-display font-bold text-xl md:text-2xl uppercase tracking-widest leading-tight px-4">{slide.label}</span>
                    <span className="text-neon-500 text-sm md:text-lg mt-3 font-bold bg-neon-500/10 px-3 py-1 rounded-full">{slide.sub}</span>
                 </div>
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-gray-100 to-gray-200 opacity-80"></div>
               </>
             )}
             
          </div>
        ))}
      </div>

      {/* Controls (Dark on Light) */}
      <div className="absolute inset-0 flex items-center justify-between p-2 md:p-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none md:pointer-events-auto z-20">
        <button onClick={prev} className="pointer-events-auto p-3 rounded-full bg-white/80 hover:bg-neon-500 hover:text-white text-void-950 backdrop-blur border border-gray-200 shadow-lg transition-all">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button onClick={next} className="pointer-events-auto p-3 rounded-full bg-white/80 hover:bg-neon-500 hover:text-white text-void-950 backdrop-blur border border-gray-200 shadow-lg transition-all">
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-4 md:bottom-6 left-0 right-0 flex justify-center gap-2 z-20">
        {slides.map((_, i) => (
          <div 
            key={i} 
            className={`transition-all duration-300 h-2 rounded-full ${current === i ? 'w-8 md:w-10 bg-neon-500 shadow-lg' : 'w-2.5 md:w-3 bg-gray-300'}`}
          />
        ))}
      </div>

      {/* Trust Badge Overlay (Spedizione Italia) - Clean Style */}
      <div className="absolute top-4 right-4 md:top-6 md:right-6 bg-white/90 backdrop-blur border border-gray-200 px-3 py-1.5 md:px-4 md:py-2 rounded-xl flex items-center gap-2 z-20 shadow-xl">
         <Truck className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
         <span className="text-[10px] md:text-sm font-bold text-void-950 uppercase tracking-wide">Expedice z EU</span>
      </div>
    </div>
  );
};
