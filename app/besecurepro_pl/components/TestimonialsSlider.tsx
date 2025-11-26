
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonials } from '../constants';

const TestimonialsSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleManualNav = (callback: () => void) => {
    setAutoPlay(false);
    callback();
  };

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      nextTestimonial();
    }, 5000);
    return () => clearInterval(timer);
  }, [autoPlay]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  };

  return (
    <section id="opinie" className="py-10 md:py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-8 md:px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a2744] mb-4">
            Co Mówią Nasi Klienci
          </h2>
          <div className="flex items-center justify-center gap-2">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 md:w-6 md:h-6 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-base md:text-lg font-bold text-[#1a2744]">4.9</span>
            <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
            <span className="text-base md:text-lg text-gray-600">8 254 opinii</span>
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-2xl bg-white shadow-xl p-6 md:p-10 min-h-[280px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center text-center"
              >
                <Quote className="w-10 h-10 text-blue-600 mb-4 opacity-50" />
                <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">
                  "{testimonials[currentIndex].text}"
                </p>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < testimonials[currentIndex].rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <p className="font-bold text-[#1a2744]">{testimonials[currentIndex].name}</p>
                <p className="text-sm text-gray-500 mt-1 italic">Przez <span className="font-bold">{testimonials[currentIndex].source}</span></p>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={() => handleManualNav(prevTestimonial)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors cursor-pointer z-10"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => handleManualNav(nextTestimonial)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors cursor-pointer z-10"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setAutoPlay(false);
                setDirection(i > currentIndex ? 1 : -1);
                setCurrentIndex(i);
              }}
              className={`w-2 h-2 rounded-full transition-all cursor-pointer ${i === currentIndex ? 'bg-blue-600 w-6' : 'bg-gray-300'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSlider;
