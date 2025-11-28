import React, { useState, useRef, useEffect } from 'react';

interface ScrollRevealProps {
  children?: React.ReactNode;
  className?: string;
  delay?: number;
  threshold?: number; // Kolik z prvku musí být viditelné před animací (0.1 = 10%)
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({ children, className = "", delay = 0, threshold = 0.1 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Jakmile je viditelný, přestaneme pozorovat pro výkon (jednorázová animace)
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
      className={`transition-[opacity,transform] duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
    >
      {children}
    </div>
  );
};