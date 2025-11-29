
import React from 'react';
import { Star, CheckCircle2 } from 'lucide-react';
import { ReviewType } from '../types';
import { ScrollReveal } from './ScrollReveal';

const reviews: ReviewType[] = [
  {
    id: 1,
    name: "Marek Novák",
    location: "Bratislava",
    rating: 5,
    text: "Bol som skeptický ohľadom 90 m², mám veľký otvorený priestor. Ale musím povedať, že rozháňa teplý vzduch všade za menej ako 20 minút. To najlepšie? Účty za plyn skutočne klesli o 40% oproti minulému roku.",
    highlight: "Účty na polovicu a teplý domov",
    verified: true,
    timeAgo: "Pred 2 dňami"
  },
  {
    id: 2,
    name: "Jana Kováčová",
    location: "Košice",
    rating: 5,
    text: "Vyriešila som problém s plesňou v spálni. Predtým som sa budila s mokrými oknami, teraz je vzduch suchý a teplý. V noci veľmi tichý, konečne spím.",
    highlight: "Zbohom pleseň a vlhkosť",
    verified: true,
    timeAgo: "Kúpené pred 1 týždňom"
  },
  {
    id: 3,
    name: "Peter Horváth",
    location: "Žilina",
    rating: 5,
    text: "Dizajn je úžasný, vypadá ako zariadenie za 600€. Zaplatil som pri doručení kuriérovi v hotovosti, nulové riziko. Ohreje hneď ako ho zapnete.",
    highlight: "Bezpečná platba pri doručení",
    verified: true,
    timeAgo: "Pred 3 dňami"
  }
];

export const Reviews: React.FC = () => {
  return (
    <div id="reviews-section" className="bg-void-900 border-y border-white/5 py-16 px-6 scroll-mt-20 relative overflow-hidden">
      {/* Subtle blue glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <ScrollReveal className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-3">ČO HOVORIA ZÁKAZNÍCI</h3>
          <div className="flex justify-center items-center gap-3">
            <div className="flex text-yellow-500">
              <Star className="w-6 h-6 fill-current" />
              <Star className="w-6 h-6 fill-current" />
              <Star className="w-6 h-6 fill-current" />
              <Star className="w-6 h-6 fill-current" />
              <Star className="w-6 h-6 fill-current" />
            </div>
            <span className="text-gray-300 font-bold text-lg">4.9/5 Overený priemer</span>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <ScrollReveal key={review.id} delay={index * 150} className="h-full">
              <div className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors relative shadow-xl backdrop-blur-sm h-full flex flex-col">
                <div className="flex justify-between items-start mb-5">
                  <div className="flex text-yellow-500">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <div className="text-sm text-gray-400 font-medium">{review.timeAgo}</div>
                </div>
                
                <h4 className="text-white font-bold mb-4 text-xl leading-tight">"{review.highlight}"</h4>
                <p className="text-gray-300 text-lg mb-8 leading-relaxed font-light flex-1">"{review.text}"</p>
                
                <div className="flex items-center gap-4 mt-auto pt-5 border-t border-white/5">
                  <div className="w-12 h-12 rounded-full bg-neon-500/20 flex items-center justify-center text-neon-500 font-bold text-lg shrink-0">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-white text-base font-bold">{review.name}</div>
                    <div className="text-gray-500 text-sm flex items-center gap-1.5 font-medium">
                      {review.verified && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                      {review.location}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
};
