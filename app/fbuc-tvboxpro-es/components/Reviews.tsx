import React from 'react';
import { Star } from 'lucide-react';

const reviews = [
  {
    name: "Carlos García",
    location: "Madrid",
    tag: "Fan del Fútbol",
    text: "Por fin veo la Champions y La Liga sin que se congele la imagen. La calidad es cristalina y la instalación me llevó literalmente un minuto. ¡Recomendado para cualquier aficionado!",
    img: "https://picsum.photos/100/100?random=12"
  },
  {
    name: "María López",
    location: "Barcelona",
    tag: "Amante de las Series",
    text: "Convertí el televisor del dormitorio en un auténtico cine. Veo todas las series de Netflix y HBO. Es muy fácil de usar, incluso para alguien que no entiende de tecnología.",
    img: "https://picsum.photos/100/100?random=11"
  },
  {
    name: "Antonio Martínez",
    location: "Valencia",
    tag: "Abuelo Feliz",
    text: "Lo compré para mis nietos. Juegan al Fortnite en la pantalla grande y están encantados. Me ahorré mucho dinero porque no tuve que comprar una consola cara. ¡Excelente compra!",
    img: "https://picsum.photos/100/100?random=10"
  }
];

export const Reviews: React.FC = () => {
  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-black text-center mb-8 text-gray-900">
          QUÉ DICEN NUESTROS CLIENTES
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-bl-lg">
                  Compra Verificada
              </div>
              <div className="flex items-center gap-3 mb-4">
                <img src={review.img} alt={review.name} className="w-12 h-12 rounded-full border-2 border-green-500" />
                <div>
                  <h4 className="font-bold text-gray-900 leading-tight">{review.name}</h4>
                  <p className="text-xs text-blue-600 font-bold">{review.tag}</p>
                  <p className="text-xs text-gray-500">{review.location}</p>
                </div>
              </div>
              <div className="flex text-yellow-400 mb-2">
                {[1, 2, 3, 4, 5].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="text-gray-700 italic text-sm">"{review.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
