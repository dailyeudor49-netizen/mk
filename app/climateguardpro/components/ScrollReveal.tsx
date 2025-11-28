import React, { useState, useRef, useEffect } from 'react';

interface ScrollRevealProps {
  children?: React.ReactNode;
  className?: string;
  delay?: number;
  threshold?: number; // Quanto dell'elemento deve essere visibile prima di animarsi (0.1 = 10%)
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({ children, className = "", delay = 0, threshold = 0.1 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Una volta visibile, smettiamo di osservare per performance (animazione one-shot)
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div 
      ref={ref} 
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ease-out transform will-change-transform ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-[0.98]'} ${className}`}
    >
      {children}
    </div>
  );
};