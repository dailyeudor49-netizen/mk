import React from 'react';
import { Star } from 'lucide-react';

const reviews = [
  {
    name: "Marek Kowalski",
    location: "Warszawa",
    tag: "Fan Piłki Nożnej",
    text: "Wreszcie mogę oglądać Ligę Mistrzów i Ekstraklasę bez zacinania. Obraz jest ostry jak żyleta, a konfiguracja zajęła mi dosłownie moment. Polecam każdemu kibicowi!",
    img: "https://picsum.photos/100/100?random=12"
  },
  {
    name: "Anna Nowak",
    location: "Kraków",
    tag: "Kocha Seriale",
    text: "Zmieniłam telewizor w sypialni w prawdziwe kino. Oglądam wszystkie seriale na Netflixie i Playerze. Jest bardzo prosty w obsłudze, nawet dla osoby nietechnicznej jak ja.",
    img: "https://picsum.photos/100/100?random=11"
  },
  {
    name: "Piotr Wiśniewski",
    location: "Gdańsk",
    tag: "Szczęśliwy Dziadek",
    text: "Kupiłem dla wnuków. Grają w Fortnite na dużym ekranie i są zachwyceni. Zaoszczędziłem kupę pieniędzy, bo nie musiałem kupować drogiej konsoli! Świetny zakup.",
    img: "https://picsum.photos/100/100?random=10"
  }
];

export const Reviews: React.FC = () => {
  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-black text-center mb-8 text-gray-900">
          CO MÓWIĄ NASI KLIENCI
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-bl-lg">
                  Zakup Zweryfikowany
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