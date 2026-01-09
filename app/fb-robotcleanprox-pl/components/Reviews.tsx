'use client';

import React, { useState } from 'react';
import { REVIEWS } from '../lib/constants';
import { Star, CheckCircle, Loader } from 'lucide-react';

const Reviews: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadMore = () => {
    setIsLoading(true);
    // Simulate network delay for effect
    setTimeout(() => {
        setShowAll(true);
        setIsLoading(false);
    }, 1000);
  };

  const visibleReviews = showAll ? REVIEWS : REVIEWS.slice(0, 6);

  return (
    <section className="py-12 px-4 bg-white border-t border-gray-100">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-black text-center text-gray-900 mb-4">
          OPINIE KLIENTÓW
        </h2>

        {/* Review Summary Header */}
        <div className="flex flex-col items-center mb-10">
            <div className="flex items-center gap-2 mb-1">
                <div className="flex text-yellow-400">
                    <Star size={24} fill="currentColor" />
                    <Star size={24} fill="currentColor" />
                    <Star size={24} fill="currentColor" />
                    <Star size={24} fill="currentColor" />
                    <Star size={24} fill="currentColor" />
                </div>
                <span className="text-2xl font-bold text-gray-900">4.9/5</span>
            </div>
            <p className="text-gray-500 font-medium">Na podstawie ponad 1500 zadowolonych klientów w Polsce</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {visibleReviews.map((review) => (
            <div key={review.id} className="bg-gray-50 p-5 rounded-xl border border-gray-200 shadow-sm relative hover:shadow-md transition">
              <div className="flex justify-between items-start mb-2">
                <div>
                   <h4 className="font-bold text-gray-900">{review.name}</h4>
                   <p className="text-xs text-gray-500">{review.city}</p>
                </div>
                <div className="flex text-yellow-400">
                    {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" />
                    ))}
                </div>
              </div>

              <p className="text-gray-700 italic mb-4 text-sm leading-relaxed">"{review.text}"</p>

              <div className="flex justify-between items-center mt-auto">
                  {review.verified && (
                    <div className="flex items-center gap-1 text-green-600 text-xs font-bold uppercase bg-green-50 px-2 py-1 rounded">
                        <CheckCircle size={14} /> Zweryfikowany Zakup
                    </div>
                  )}
                  <span className="text-xs text-gray-400">{review.date}</span>
              </div>

              {review.hasImage && review.imageUrl && (
                  <div className="mt-3 border-t pt-3">
                     <img src={review.imageUrl} alt="Zdjęcie z recenzji" className="w-16 h-16 object-cover rounded border border-gray-300" />
                  </div>
              )}
            </div>
          ))}
        </div>

        {!showAll && (
            <div className="mt-8 text-center">
                <button
                    onClick={handleLoadMore}
                    disabled={isLoading}
                    className="text-green-600 font-bold underline hover:text-green-800 flex items-center justify-center gap-2 mx-auto disabled:opacity-50"
                >
                    {isLoading ? (
                        <>
                            <Loader className="animate-spin" size={20} /> Ładowanie...
                        </>
                    ) : (
                        "Załaduj więcej opinii..."
                    )}
                </button>
            </div>
        )}
      </div>
    </section>
  );
};

export default Reviews;
