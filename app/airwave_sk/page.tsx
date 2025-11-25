'use client';

import React, { useState, useEffect, useRef } from 'react';
import './airwave.css';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

// Hook per animazioni scroll
function useScrollAnimation() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

export default function LandingPage() {
  // Force light mode for this page
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--background', '#ffffff');
    root.style.setProperty('--foreground', '#171717');

    return () => {
      root.style.removeProperty('--background');
      root.style.removeProperty('--foreground');
    };
  }, []);

  // Google Ads Pageview Tracking
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://www.googletagmanager.com/gtag/js?id=AW-17741016305';
      document.head.appendChild(script);

      script.onload = () => {
        window.dataLayer = window.dataLayer || [];
        window.gtag = function() { window.dataLayer!.push(arguments); };
        window.gtag('js', new Date());
        window.gtag('config', 'AW-17741016305');
      };
    }
  }, []);

  // --- Main Product Slider State ---
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 6;
  const mainSliderRef = useRef<HTMLDivElement>(null);


  const changeSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // --- Sticky Scroll Logic (Shopify Style) ---
  const productImagesRef = useRef<HTMLDivElement>(null);
  const productSectionRef = useRef<HTMLElement>(null);
  const [placeholderHeight, setPlaceholderHeight] = useState(0);
  const [imagesStyle, setImagesStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    const handleStickyScroll = () => {
      if (window.innerWidth < 1024) {
        setImagesStyle({});
        setPlaceholderHeight(0);
        return;
      }

      if (!productSectionRef.current || !productImagesRef.current) return;

      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const sectionRect = productSectionRef.current.getBoundingClientRect();
      const sectionTop = productSectionRef.current.offsetTop;
      const sectionHeight = productSectionRef.current.offsetHeight;
      const imagesHeight = productImagesRef.current.offsetHeight || 600; // fallback
      const headerOffset = 80;
      const sectionPaddingTop = 48; // 3rem

      const containerWidth = productSectionRef.current.offsetWidth;
      const imageWidth = (containerWidth - 64) / 2; // 64 = gap
      const imageLeft = productSectionRef.current.getBoundingClientRect().left + (window.pageXOffset || document.documentElement.scrollLeft);

      const sectionBottom = sectionTop + sectionHeight;
      const limitBottom = sectionBottom - imagesHeight - sectionPaddingTop;

      if (scrollTop >= sectionTop - headerOffset && scrollTop < limitBottom - headerOffset) {
        setImagesStyle({
          position: 'fixed',
          top: `${headerOffset + sectionPaddingTop}px`,
          left: `${imageLeft}px`,
          width: `${imageWidth}px`,
          zIndex: 20
        });
        setPlaceholderHeight(imagesHeight);
      } else if (scrollTop >= limitBottom - headerOffset) {
        setImagesStyle({
          position: 'absolute',
          top: `${limitBottom - sectionTop}px`,
          left: '0',
          width: `${imageWidth}px`,
          zIndex: 20
        });
        setPlaceholderHeight(imagesHeight);
      } else {
        setImagesStyle({
          position: 'relative',
          zIndex: 20
        });
        setPlaceholderHeight(0);
      }
    };

    window.addEventListener('scroll', handleStickyScroll, { passive: true });
    window.addEventListener('resize', handleStickyScroll);
    // Initial call
    handleStickyScroll();

    return () => {
      window.removeEventListener('scroll', handleStickyScroll);
      window.removeEventListener('resize', handleStickyScroll);
    };
  }, []);

  // --- Why Choose Slider State ---
  const [currentWhyChoose, setCurrentWhyChoose] = useState(0);
  const totalWhyChoose = 5;
  const [isWhyChooseSliding, setIsWhyChooseSliding] = useState(false);
  const [isWhyChooseAutoplaying, setIsWhyChooseAutoplaying] = useState(true);

  const nextWhyChoose = () => {
    if (isWhyChooseSliding) return;
    setIsWhyChooseSliding(true);
    setCurrentWhyChoose((prev) => (prev + 1) % totalWhyChoose);
    setTimeout(() => setIsWhyChooseSliding(false), 600);
    setIsWhyChooseAutoplaying(false);
  };

  const prevWhyChoose = () => {
    if (isWhyChooseSliding) return;
    setIsWhyChooseSliding(true);
    setCurrentWhyChoose((prev) => (prev - 1 + totalWhyChoose) % totalWhyChoose);
    setTimeout(() => setIsWhyChooseSliding(false), 600);
    setIsWhyChooseAutoplaying(false);
  };

  const goToWhyChooseSlide = (index: number) => {
    // Usa sempre transform, sia su mobile che desktop
    setCurrentWhyChoose(index);
    setIsWhyChooseAutoplaying(false);
  };

  useEffect(() => {
    if (!isWhyChooseAutoplaying) return;
    const interval = setInterval(() => {
      setCurrentWhyChoose((prev) => (prev + 1) % totalWhyChoose);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentWhyChoose, isWhyChooseAutoplaying]);

  // --- Reviews Slider State ---
  const [currentReview, setCurrentReview] = useState(0);
  const totalReviews = 10;
  const [isReviewAutoplaying, setIsReviewAutoplaying] = useState(true);

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % totalReviews);
    setIsReviewAutoplaying(false);
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + totalReviews) % totalReviews);
    setIsReviewAutoplaying(false);
  };

  useEffect(() => {
    if (!isReviewAutoplaying) return;
    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % totalReviews);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentReview, isReviewAutoplaying]);

  // --- Modal State ---
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- Form State ---
  const [orderData, setOrderData] = useState({
    name: '',
    phone: '',
    address: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- Fingerprint Script ---
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://offers.supertrendaffiliateprogram.com/forms/tmfp/';
    script.crossOrigin = 'anonymous';
    script.defer = true;
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // --- Form Handler ---
  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const params = new URLSearchParams();
      params.append('uid', '01981ccf-4474-7c39-97eb-9407221996c2');
      params.append('key', '26335c124acad98417ad58');
      params.append('offer', '67');
      params.append('lp', '67');
      params.append('name', orderData.name.trim());
      params.append('tel', orderData.phone.trim());
      params.append('street-address', orderData.address.trim());

      // Fingerprint
      const tmfpInput = document.querySelector('input[name="tmfp"]') as HTMLInputElement;
      if (tmfpInput && tmfpInput.value) {
        params.append('tmfp', tmfpInput.value);
      }

      // UTM params
      const urlParams = new URLSearchParams(window.location.search);
      ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'subid', 'subid2', 'subid3', 'subid4', 'subid5', 'pubid'].forEach(param => {
        const value = urlParams.get(param);
        if (value) params.append(param, value);
      });

      const response = await fetch('https://offers.supertrendaffiliateprogram.com/forms/api/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString()
      });

      if (response.ok) {
        window.location.href = '/ty-sk';
      } else {
        alert('Chyba pri odoslaní objednávky. Skúste to prosím znova.');
        setIsSubmitting(false);
      }
    } catch {
      alert('Chyba pri odoslaní objednávky. Skúste to prosím znova.');
      setIsSubmitting(false);
    }
  };

  // --- Scroll To Form ---
  const scrollToForm = () => {
    const formSection = document.getElementById('ordina');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // --- Scroll Animations per sezione "Perché funziona" ---
  const whyItem1 = useScrollAnimation();
  const whyItem2 = useScrollAnimation();
  const whyItem3 = useScrollAnimation();

  // --- Scroll Animations per sezione "Specifiche Tecniche" ---
  const techSpecsSection = useScrollAnimation();

  return (
    <>
      {/* Click Pixel */}
      <img src="https://offers.supertrendaffiliateprogram.com/forms/api/ck/?o=67&uid=01981ccf-4474-7c39-97eb-9407221996c2&lp=67" style={{width:'1px',height:'1px',display:'none'}} alt="" />

      {/* Product Section */}
      <section className="product-section" id="productSection" ref={productSectionRef}>
        <div className="product-container">
          
          {/* Placeholder for Sticky Scroll */}
          {placeholderHeight > 0 && <div style={{ height: placeholderHeight, width: '100%' }} />}

          {/* Product Images */}
          <div className="product-images" id="productImages" ref={productImagesRef} style={imagesStyle}>
            <div className="product-image-main">
              {/* Black Friday Ribbon */}
              <div className="black-friday-ribbon">
                <span>BLACK</span>
                <span>FRIDAY</span>
              </div>
              
              {/* Slider Container */}
              <div className="slider-container">
                <div className="slider-images" id="mainSlider" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                  {[
                    "/images/condizionatore/specifiche.webp",
                    "/images/condizionatore/caldo-freddo.webp",
                    "/images/condizionatore/installazione.webp",
                    "/images/condizionatore/riscaldamento.webp",
                    "/images/condizionatore/risparmio.webp",
                    "/images/condizionatore/silenzioso.webp"
                  ].map((src, index) => (
                    <div className="slider-image" key={index}>
                      <img src={src} alt={`Slide ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="thumbnails">
              {[
                 "/images/condizionatore/specifiche.webp",
                 "/images/condizionatore/caldo-freddo.webp",
                 "/images/condizionatore/installazione.webp",
                 "/images/condizionatore/riscaldamento.webp",
                 "/images/condizionatore/risparmio.webp",
                 "/images/condizionatore/silenzioso.webp"
              ].map((src, index) => (
                <div 
                  key={index} 
                  className={`thumbnail ${index === currentSlide ? 'active' : ''}`} 
                  onClick={() => changeSlide(index)}
                >
                  <img src={src} alt={`Thumbnail ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="product-info">
            {/* Black Friday Badge */}
            <div className="black-friday-badge" style={{ marginBottom: '0.75rem', marginTop: '0.5rem' }}>
              <span style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg, #FFB800, #FF8C00)',
                color: 'white',
                padding: '0.4rem 0.9rem',
                borderRadius: '20px',
                fontSize: '0.8rem',
                fontWeight: 700,
                letterSpacing: '0.5px',
                textTransform: 'uppercase'
              }}>
                Black Friday
              </span>
            </div>

            {/* Header */}
            <div className="product-header">
              <h1 className="product-title">Klimatizačná jednotka 3 v 1 Air Wave Smart™ - Kúri, Chladí a Odvlhčuje</h1>
              <p className="product-subtitle">Kúri, Chladí a Odvlhčuje • ThermoPanel technológia s elimináciou CO2 • Bez vonkajšej jednotky • 12.000 BTU • Ultra tiché</p>
            </div>

            {/* Rating */}
            <div className="product-rating" onClick={() => {
              const reviewsSection = document.querySelector('#reviewsSection');
              if (reviewsSection) {
                reviewsSection.scrollIntoView({ behavior: 'smooth' });
              }
            }} style={{ cursor: 'pointer' }}>
              <div className="stars">
                <span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span>
              </div>
              <span className="rating-text">4.8 (247 recenzií)</span>
            </div>

            {/* Price */}
            <div className="product-price">
              <div className="price-row">
                <span className="price-current">69,99 €</span>
                <span className="price-original">174,99 €</span>
                <span className="price-save">-60%</span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="product-cta">
              <button className="btn-add-to-cart btn-add-to-cart-mobile" onClick={scrollToForm}>
                <span style={{ display: 'block', fontWeight: 700 }} className="btn-text-main">
                  Objednať teraz
                </span>
                <span style={{ display: 'block', fontWeight: 400 }} className="btn-text-sub">
                  Platba na dobierku - Doprava zadarmo
                </span>
              </button>
              <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '1.5rem 0' }} />
            </div>

            {/* Description */}
            <div className="product-description">
              <h3>Hlavné charakteristiky</h3>
              <ul>
                <li><span className="icon">✓</span><span><strong>12.000 BTU výkon</strong> – Kúri, chladí a odvlhčuje miestnosti do 60 m²</span></li>
                <li><span className="icon">✓</span><span><strong>3 funkcie v 1</strong> – Kúrenie v zime, chladenie v lete a odvlhčovanie</span></li>
                <li><span className="icon">✓</span><span><strong>Presná kontrola teploty 16-32°C</strong> – Digitálny termostat pre maximálne pohodlie</span></li>
                <li><span className="icon">✓</span><span><strong>Energetická trieda A+++</strong> – Ušetríte 60% na účte v porovnaní s tradičnými systémami</span></li>
                <li><span className="icon">✓</span><span><strong>ThermoPanel technológia bez vonkajšej jednotky</strong> – Recykluje vnútorný vzduch eliminujúci CO2, bez vonkajšieho motora</span></li>
                <li><span className="icon">✓</span><span><strong>Ovládanie cez smartphone</strong> – Aplikácia pre iOS a Android, zapnite kúrenie kdekoľvek</span></li>
                <li><span className="icon">✓</span><span><strong>Kontrola vlhkosti</strong> – Znižuje artritídu a plesne, zdravé prostredie</span></li>
                <li><span className="icon">✓</span><span><strong>Jednoduchá inštalácia</strong> – Montáž na stenu alebo podlahu, nie je potrebný technik</span></li>
                <li><span className="icon">✓</span><span><strong>Ultra tichá prevádzka</strong> – Perfektné aj do spálne</span></li>
              </ul>
            </div>

            {/* Trust Section */}
            <div className="trust-section">
              <h3 className="trust-title">Záruky a služby</h3>
              <div className="trust-items">
                <div className="trust-item">
                  <div className="trust-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#FFB800" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                  </div>
                  <div className="trust-content">
                    <h4>ZADARMO doprava do 48 hodín</h4>
                    <p>Rýchla doprava expresnou kuriérskou službou so sledovaním. Bez nákladov na dopravu.</p>
                  </div>
                </div>
                <div className="trust-item">
                  <div className="trust-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#FFB800" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="trust-content">
                    <h4>Platba na dobierku</h4>
                    <p>Bez platby vopred. Platíte až pri prevzatí produktu priamo kuriérovi</p>
                  </div>
                </div>
                <div className="trust-item">
                  <div className="trust-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#FFB800" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                    </svg>
                  </div>
                  <div className="trust-content">
                    <h4>Bezplatný návrat do 30 dní</h4>
                    <p>Nie ste spokojní? Môžete vrátiť produkt do 30 dní pre plný návrat peňazí</p>
                  </div>
                </div>
                <div className="trust-item">
                  <div className="trust-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#FFB800" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div className="trust-content">
                    <h4>Záruka 2 roky</h4>
                    <p>Úplné krytie výrobných chýb na 24 mesiacov</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Info Boxes */}
            <div className="info-boxes">
              <div className="info-box">
                <span className="icon">⚡</span>
                <div className="info-box-content">
                  <p>Len 0,40€ denne</p>
                  <span>Priemerné použitie 4-5 hodín v Eco režime</span>
                </div>
              </div>
              <div className="info-box green">
                <span className="icon">🏠</span>
                <div className="info-box-content">
                  <p>Nie je potrebné povolenie</p>
                  <span>Inštalácia bez obmedzení budovy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Perché ThermoPanel funziona Section - 3 box orizzontali */}
      <section id="whyItWorks" style={{ background: 'white', padding: '4rem 1rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, textAlign: 'center', marginBottom: '0.375rem', color: '#111827' }}>
            Prečo <span style={{ color: '#FFB800' }}>Air Wave Smart™</span> funguje
          </h2>
          <p style={{ textAlign: 'center', color: '#6b7280', maxWidth: '600px', margin: '0 auto 1.5rem', fontSize: '0.8125rem', lineHeight: 1.4 }}>
            Technológia, ktorá vám šetrí peniaze s dokonalým pohodlím po celý rok
          </p>

          <div className="timeline-container" style={{ position: 'relative', maxWidth: '800px', margin: '0 auto', padding: '2rem 0' }}>
            <div className="timeline-line" style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '3px', background: 'linear-gradient(to bottom, #FFB800, #FF8C00)', transform: 'translateX(-50%)' }}></div>

            {/* Item 1 */}
            <div ref={whyItem1.ref} className="timeline-item timeline-item-left" style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '2rem', alignItems: 'center', marginBottom: '3rem', position: 'relative' }}>
              <div className="timeline-content timeline-content-left" style={{
                textAlign: 'right',
                opacity: whyItem1.isVisible ? 1 : 0,
                transform: whyItem1.isVisible ? 'translateX(0)' : 'translateX(-50px)',
                transition: 'opacity 0.8s ease-out, transform 0.8s ease-out'
              }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#CC6600', marginBottom: '0.5rem' }}>ThermoPanel technológia</h3>
                <p style={{ fontSize: '0.9375rem', color: '#995200', lineHeight: 1.6 }}>
                  Bez <strong style={{ color: '#663300' }}>vonkajšieho motora</strong>, bez povolení. Recykluje a čistí vzduch eliminujúci CO2 a nečistoty.
                </p>
              </div>
              <div className="timeline-circle" style={{
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #FFB800, #FF8C00)',
                boxShadow: '0 4px 16px rgba(255, 140, 0, 0.4)',
                zIndex: 1,
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '120px',
                height: '120px',
                opacity: whyItem1.isVisible ? 1 : 0,
                transform: whyItem1.isVisible ? 'translateY(0)' : 'translateY(50px)',
                transition: 'opacity 0.8s ease-out 0.3s, transform 0.8s ease-out 0.3s'
              }}>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 12C4 7.58172 7.58172 4 12 4C14.5264 4 16.7792 5.17108 18.2454 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M20 12C20 16.4183 16.4183 20 12 20C9.47362 20 7.22075 18.8289 5.75463 17" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M18 4L18 7L15 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 20L6 17L9 17" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="timeline-spacer"></div>
            </div>

            {/* Item 2 */}
            <div ref={whyItem2.ref} className="timeline-item timeline-item-right" style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '2rem', alignItems: 'center', marginBottom: '3rem', position: 'relative' }}>
              <div className="timeline-spacer"></div>
              <div className="timeline-circle" style={{
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #FFB800, #FF8C00)',
                boxShadow: '0 4px 16px rgba(255, 140, 0, 0.4)',
                zIndex: 1,
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '120px',
                height: '120px',
                opacity: whyItem2.isVisible ? 1 : 0,
                transform: whyItem2.isVisible ? 'translateY(0)' : 'translateY(50px)',
                transition: 'opacity 0.8s ease-out 0.3s, transform 0.8s ease-out 0.3s'
              }}>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="timeline-content timeline-content-right" style={{
                textAlign: 'left',
                opacity: whyItem2.isVisible ? 1 : 0,
                transform: whyItem2.isVisible ? 'translateX(0)' : 'translateX(50px)',
                transition: 'opacity 0.8s ease-out, transform 0.8s ease-out'
              }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#CC6600', marginBottom: '0.5rem' }}>Skutočná úspora energie</h3>
                <p style={{ fontSize: '0.9375rem', color: '#995200', lineHeight: 1.6 }}>
                  <strong style={{ color: '#663300' }}>Inteligentný termostat</strong> ktorý reguluje teplotu. <strong style={{ color: '#663300' }}>Úspora až 60%</strong> na účte.
                </p>
              </div>
            </div>

            {/* Item 3 */}
            <div ref={whyItem3.ref} className="timeline-item timeline-item-left timeline-item-last" style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '2rem', alignItems: 'center', position: 'relative' }}>
              <div className="timeline-content timeline-content-left" style={{
                textAlign: 'right',
                opacity: whyItem3.isVisible ? 1 : 0,
                transform: whyItem3.isVisible ? 'translateX(0)' : 'translateX(-50px)',
                transition: 'opacity 0.8s ease-out, transform 0.8s ease-out'
              }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#CC6600', marginBottom: '0.5rem' }}>3 funkcie v jednom zariadení</h3>
                <p style={{ fontSize: '0.9375rem', color: '#995200', lineHeight: 1.6 }}>
                  <strong style={{ color: '#663300' }}>Kúri</strong> v zime, <strong style={{ color: '#663300' }}>chladí</strong> v lete a <strong style={{ color: '#663300' }}>odvlhčuje</strong>. Dokonalé pohodlie po celý rok.
                </p>
              </div>
              <div className="timeline-circle" style={{
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #FFB800, #FF8C00)',
                boxShadow: '0 4px 16px rgba(255, 140, 0, 0.4)',
                zIndex: 1,
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '120px',
                height: '120px',
                opacity: whyItem3.isVisible ? 1 : 0,
                transform: whyItem3.isVisible ? 'translateY(0)' : 'translateY(50px)',
                transition: 'opacity 0.8s ease-out 0.3s, transform 0.8s ease-out 0.3s'
              }}>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g transform="rotate(0 12 12)">
                    <path d="M12 5L12 11M12 5L10 7M12 5L14 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </g>
                  <g transform="rotate(120 12 12)">
                    <path d="M12 5L12 11M12 5L10 7M12 5L14 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </g>
                  <g transform="rotate(240 12 12)">
                    <path d="M12 5L12 11M12 5L10 7M12 5L14 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </g>
                </svg>
              </div>
              <div className="timeline-spacer"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section - Slider */}
      <section style={{ background: 'white', padding: '4rem 1rem' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, textAlign: 'center', marginBottom: '1rem', color: '#111827' }}>
            Prečo si vybrať <span style={{ color: '#FF8C00' }}>Air Wave Smart™</span>
          </h2>
          <p style={{ textAlign: 'center', color: '#6b7280', maxWidth: '800px', margin: '0 auto 3rem', fontSize: '1rem' }}>
            Vykúrte svoj dom efektívne bez problémov tradičných klimatizácií
          </p>

          {/* Slider Container */}
          <div className="slider-container-why-choose" style={{ position: 'relative', maxWidth: '1400px', margin: '0 auto 1rem', padding: '0 70px' }}>
            <div
              className="why-choose-slider-track"
              style={{
                borderRadius: '16px'
              }}
            >
              <div
                id="whyChooseSlider"
                style={{
                  display: 'flex',
                  transition: 'transform 0.5s ease',
                  transform: `translateX(-${currentWhyChoose * 100}%)`
                }}
              >

                {/* Slide 1 */}
                <div className="why-choose-slide">
                    <div className="why-choose-slide-content">
                        <div className="why-choose-slide-text">
                            <h3>Silné a efektívne kúrenie</h3>
                            <p>ThermoPanel technológia ktorá <strong>rýchlo vykúri</strong> váš dom bez vonkajšieho motora. <strong>Konštantné teplo</strong>, bez strát, <strong>garantovaná úspora</strong> na účte.</p>
                        </div>
                        <div className="why-choose-slide-image">
                            <img src="/images/condizionatore/riscaldamento.webp" alt="Grijanje" />
                        </div>
                    </div>
                </div>

                {/* Slide 2 */}
                <div className="why-choose-slide">
                    <div className="why-choose-slide-content">
                        <div className="why-choose-slide-text">
                            <h3>S inštaláciou aj bez nej</h3>
                            <p><strong>Jednoduchá montáž</strong> na stenu alebo podlahu. <strong>Nie je potrebný technik</strong>, <strong>plug and play</strong>. Začnite používať za niekoľko minút.</p>
                        </div>
                        <div className="why-choose-slide-image">
                            <img src="/images/condizionatore/installazione.webp" alt="Instalacija" />
                        </div>
                    </div>
                </div>

                {/* Slide 3 */}
                <div className="why-choose-slide">
                    <div className="why-choose-slide-content">
                        <div className="why-choose-slide-text">
                            <h3>Chladí v lete, kúri v zime</h3>
                            <p><strong>3 funkcie v 1</strong>: silné kúrenie pre zimu, chladenie pre leto, odvlhčovanie po celý rok. <strong>Nie je potrebné povolenie</strong> budovy.</p>
                        </div>
                        <div className="why-choose-slide-image">
                            <img src="/images/condizionatore/caldo-freddo.webp" alt="3 u 1" />
                        </div>
                    </div>
                </div>

                {/* Slide 4 */}
                <div className="why-choose-slide">
                    <div className="why-choose-slide-content">
                        <div className="why-choose-slide-text">
                            <h3>Úspora až 60% na účte</h3>
                            <p><strong>Efektívnosť A+++</strong> a inteligentný termostat: spotrebujete len to, čo potrebujete. <strong>Bez plytvanie</strong>, <strong>maximálna úspora</strong> v porovnaní s plynovými systémami.</p>
                        </div>
                        <div className="why-choose-slide-image">
                            <img src="/images/condizionatore/risparmio.webp" alt="Ušteda" />
                        </div>
                    </div>
                </div>

                {/* Slide 5 */}
                <div className="why-choose-slide">
                    <div className="why-choose-slide-content">
                        <div className="why-choose-slide-text">
                            <h3>Ultra tiché: spite pokojne</h3>
                            <p>Perfektné pre <strong>spálňu</strong>. <strong>Mimoriadne tichá</strong> prevádzka, bez hlučného vonkajšieho motora. Užívajte si <strong>maximálne pohodlie</strong> bez rušenia.</p>
                        </div>
                        <div className="why-choose-slide-image">
                            <img src="/images/condizionatore/silenzioso.webp" alt="Tih" />
                        </div>
                    </div>
                </div>

              </div>
            </div>

            <button id="prevWhyChoose" onClick={prevWhyChoose} style={{ position: 'absolute', left: '-5px', top: '50%', transform: 'translateY(-50%)', background: 'linear-gradient(135deg, #FFB800, #FF8C00)', border: 'none', width: '50px', height: '50px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 20px rgba(255, 140, 0, 0.4)', zIndex: 9999, transition: 'all 0.3s' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', pointerEvents: 'none', minWidth: '32px', minHeight: '32px' }}>
                    <path d="M15 18l-6-6 6-6" stroke="#ffffff" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
            <button id="nextWhyChoose" onClick={nextWhyChoose} style={{ position: 'absolute', right: '-5px', top: '50%', transform: 'translateY(-50%)', background: 'linear-gradient(135deg, #FFB800, #FF8C00)', border: 'none', width: '50px', height: '50px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 20px rgba(255, 140, 0, 0.4)', zIndex: 9999, transition: 'all 0.3s' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', pointerEvents: 'none', minWidth: '32px', minHeight: '32px' }}>
                    <path d="M9 18l6-6-6-6" stroke="#ffffff" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
          </div>

          {/* Indicatori con pallini e frecce integrate */}
          <div id="whyChooseIndicator" style={{ textAlign: 'center', marginTop: '1.5rem', display: 'flex', justifyContent: 'center', gap: '1rem', alignItems: 'center' }}>
            {/* Freccia Sinistra */}
            <button
              className="indicator-prev"
              onClick={prevWhyChoose}
              style={{
                width: '45px',
                height: '45px',
                background: 'linear-gradient(135deg, #FFB800, #FF8C00)',
                border: 'none',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(255, 140, 0, 0.4)',
                flexShrink: 0
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>

            {/* Container Pallini */}
            <div className="dots-container" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              {Array.from({ length: totalWhyChoose }).map((_, i) => (
                <span
                  key={i}
                  className={`dot ${i === currentWhyChoose ? 'active' : ''}`}
                  onClick={() => goToWhyChooseSlide(i)}
                  style={{
                    width: i === currentWhyChoose ? '24px' : '10px',
                    height: '10px',
                    borderRadius: '5px',
                    background: i === currentWhyChoose ? 'linear-gradient(135deg, #FFB800, #FF8C00)' : '#d1d5db',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    boxShadow: i === currentWhyChoose ? '0 2px 8px rgba(255, 140, 0, 0.4)' : 'none'
                  }}
                ></span>
              ))}
            </div>

            {/* Freccia Destra */}
            <button
              className="indicator-next"
              onClick={nextWhyChoose}
              style={{
                width: '45px',
                height: '45px',
                background: 'linear-gradient(135deg, #FFB800, #FF8C00)',
                border: 'none',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(255, 140, 0, 0.4)',
                flexShrink: 0
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Technical Specs Section */}
      <section ref={techSpecsSection.ref} style={{ background: 'white', padding: '4rem 1rem' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, textAlign: 'center', marginBottom: '2.5rem', color: '#111827' }}>
            Technické špecifikácie
          </h2>

          <div className="tech-specs-container">
            {/* Desktop */}
            <div className="tech-specs-desktop" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
               <div className="tech-specs-row-3">
                    <div style={{
                      background: '#F5F5F5',
                      border: '2px solid transparent',
                      backgroundClip: 'padding-box',
                      borderRadius: '12px',
                      padding: '1.5rem',
                      textAlign: 'center',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                      position: 'relative',
                      opacity: techSpecsSection.isVisible ? 1 : 0,
                      transform: techSpecsSection.isVisible ? 'translateY(0)' : 'translateY(30px)',
                      transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
                    }}>
                        <div style={{ position: 'absolute', inset: 0, borderRadius: '12px', padding: '2px', background: 'linear-gradient(135deg, #FFB800, #FF8C00)', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude', pointerEvents: 'none' }}></div>
                        <div style={{ marginBottom: '0.5rem', display: 'flex', justifyContent: 'center' }}>
                          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 6C3 4.89543 3.89543 4 5 4H19C20.1046 4 21 4.89543 21 6V18C21 19.1046 20.1046 20 19 20H5C3.89543 20 3 19.1046 3 18V6Z" stroke="#FF8C00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M3 12H21" stroke="#FF8C00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 4V20" stroke="#FF8C00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#FF8C00', marginBottom: '0.25rem' }}>60 m²</div>
                        <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Maximálne pokrytie</div>
                    </div>
                    <div style={{
                      background: '#F5F5F5',
                      border: '2px solid transparent',
                      backgroundClip: 'padding-box',
                      borderRadius: '12px',
                      padding: '1.5rem',
                      textAlign: 'center',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                      position: 'relative',
                      opacity: techSpecsSection.isVisible ? 1 : 0,
                      transform: techSpecsSection.isVisible ? 'translateY(0)' : 'translateY(30px)',
                      transition: 'opacity 0.6s ease-out 0.2s, transform 0.6s ease-out 0.2s'
                    }}>
                        <div style={{ position: 'absolute', inset: 0, borderRadius: '12px', padding: '2px', background: 'linear-gradient(135deg, #FFB800, #FF8C00)', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude', pointerEvents: 'none' }}></div>
                        <div style={{ marginBottom: '0.5rem', display: 'flex', justifyContent: 'center' }}>
                          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="#FF8C00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="#FFB800" fillOpacity="0.2"/>
                          </svg>
                        </div>
                        <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#FF8C00', marginBottom: '0.25rem' }}>12.000</div>
                        <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>BTU výkon</div>
                    </div>
                    <div style={{
                      background: '#F5F5F5',
                      border: '2px solid transparent',
                      backgroundClip: 'padding-box',
                      borderRadius: '12px',
                      padding: '1.5rem',
                      textAlign: 'center',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                      position: 'relative',
                      opacity: techSpecsSection.isVisible ? 1 : 0,
                      transform: techSpecsSection.isVisible ? 'translateY(0)' : 'translateY(30px)',
                      transition: 'opacity 0.6s ease-out 0.4s, transform 0.6s ease-out 0.4s'
                    }}>
                        <div style={{ position: 'absolute', inset: 0, borderRadius: '12px', padding: '2px', background: 'linear-gradient(135deg, #FFB800, #FF8C00)', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude', pointerEvents: 'none' }}></div>
                        <div style={{ marginBottom: '0.5rem', display: 'flex', justifyContent: 'center', gap: '4px' }}>
                          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L12 6M12 6C14.2091 6 16 7.79086 16 10V14C16 16.2091 14.2091 18 12 18C9.79086 18 8 16.2091 8 14V10C8 7.79086 9.79086 6 12 6Z" stroke="#FF8C00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 18V22" stroke="#FF8C00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M16 12H19" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M5 12H8" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#FF8C00', marginBottom: '0.25rem' }}>16-32°C</div>
                        <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Rozsah teploty</div>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
                    <div style={{
                      background: '#F5F5F5',
                      border: '2px solid transparent',
                      backgroundClip: 'padding-box',
                      borderRadius: '12px',
                      padding: '1.5rem',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                      position: 'relative',
                      opacity: techSpecsSection.isVisible ? 1 : 0,
                      transform: techSpecsSection.isVisible ? 'translateY(0)' : 'translateY(30px)',
                      transition: 'opacity 0.6s ease-out 0.6s, transform 0.6s ease-out 0.6s'
                    }}>
                        <div style={{ position: 'absolute', inset: 0, borderRadius: '12px', padding: '2px', background: 'linear-gradient(135deg, #FFB800, #FF8C00)', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude', pointerEvents: 'none' }}></div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#FFB800" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#FF8C00' }}>Úspora energie</h3>
                        </div>
                        <p style={{ color: '#555555', fontSize: '0.9375rem', lineHeight: 1.6 }}>
                            <strong>Až o 60% nižšie účty</strong> v porovnaní s inými klimatizáciami a plynovými systémami vďaka ThermoPanel technológii a energetickej triede A+++.
                        </p>
                    </div>
                    <div style={{
                      background: '#F5F5F5',
                      border: '2px solid transparent',
                      backgroundClip: 'padding-box',
                      borderRadius: '12px',
                      padding: '1.5rem',
                      textAlign: 'center',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      position: 'relative',
                      opacity: techSpecsSection.isVisible ? 1 : 0,
                      transform: techSpecsSection.isVisible ? 'translateY(0)' : 'translateY(30px)',
                      transition: 'opacity 0.6s ease-out 0.8s, transform 0.6s ease-out 0.8s'
                    }}>
                        <div style={{ position: 'absolute', inset: 0, borderRadius: '12px', padding: '2px', background: 'linear-gradient(135deg, #FFB800, #FF8C00)', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude', pointerEvents: 'none' }}></div>
                        <div style={{ marginBottom: '0.5rem', display: 'flex', justifyContent: 'center' }}>
                          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="#FF8C00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="#FFB800"/>
                          </svg>
                        </div>
                        <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#FF8C00', marginBottom: '0.25rem' }}>A+++</div>
                        <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Energetická trieda</div>
                    </div>
                </div>

                <div className="tech-cost-box" style={{
                  background: '#F5F5F5',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  border: '2px solid transparent',
                  backgroundClip: 'padding-box',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                  position: 'relative',
                  opacity: techSpecsSection.isVisible ? 1 : 0,
                  transform: techSpecsSection.isVisible ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'opacity 0.6s ease-out 1s, transform 0.6s ease-out 1s'
                }}>
                    <div style={{ position: 'absolute', inset: 0, borderRadius: '12px', padding: '2px', background: 'linear-gradient(135deg, #FFB800, #FF8C00)', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude', pointerEvents: 'none' }}></div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                        <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#FF8C00' }}>€0,40 denne</div>
                        <div style={{ height: '30px', width: '1px', background: '#cccccc' }}></div>
                        <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Priemerné použitie 4-5 hodín v Eco režime</div>
                    </div>
                </div>
            </div>

            {/* Mobile */}
            <div className="tech-specs-mobile" style={{ display: 'none', gridTemplateColumns: '1fr', gap: '1rem' }}>
                {/* Prima riga: 2 box affiancati */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div style={{
                      background: '#F5F5F5',
                      border: '2px solid transparent',
                      backgroundClip: 'padding-box',
                      borderRadius: '12px',
                      padding: '1rem',
                      textAlign: 'center',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                      position: 'relative',
                      opacity: techSpecsSection.isVisible ? 1 : 0,
                      transform: techSpecsSection.isVisible ? 'translateY(0)' : 'translateY(30px)',
                      transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
                    }}>
                        <div style={{ position: 'absolute', inset: 0, borderRadius: '12px', padding: '2px', background: 'linear-gradient(135deg, #FFB800, #FF8C00)', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude', pointerEvents: 'none' }}></div>
                        <div style={{ marginBottom: '0.25rem', display: 'flex', justifyContent: 'center' }}>
                          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 6C3 4.89543 3.89543 4 5 4H19C20.1046 4 21 4.89543 21 6V18C21 19.1046 20.1046 20 19 20H5C3.89543 20 3 19.1046 3 18V6Z" stroke="#FF8C00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M3 12H21" stroke="#FF8C00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 4V20" stroke="#FF8C00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#FF8C00', marginBottom: '0.125rem' }}>60 m²</div>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Maximálne pokrytie</div>
                    </div>
                    <div style={{
                      background: '#F5F5F5',
                      border: '2px solid transparent',
                      backgroundClip: 'padding-box',
                      borderRadius: '12px',
                      padding: '1rem',
                      textAlign: 'center',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                      position: 'relative',
                      opacity: techSpecsSection.isVisible ? 1 : 0,
                      transform: techSpecsSection.isVisible ? 'translateY(0)' : 'translateY(30px)',
                      transition: 'opacity 0.6s ease-out 0.2s, transform 0.6s ease-out 0.2s'
                    }}>
                        <div style={{ position: 'absolute', inset: 0, borderRadius: '12px', padding: '2px', background: 'linear-gradient(135deg, #FFB800, #FF8C00)', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude', pointerEvents: 'none' }}></div>
                        <div style={{ marginBottom: '0.25rem', display: 'flex', justifyContent: 'center' }}>
                          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="#FF8C00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="#FFB800" fillOpacity="0.2"/>
                          </svg>
                        </div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#FF8C00', marginBottom: '0.125rem' }}>12.000</div>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>BTU výkon</div>
                    </div>
                </div>

                {/* Seconda riga: 2 box affiancati */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div style={{
                      background: '#F5F5F5',
                      border: '2px solid transparent',
                      backgroundClip: 'padding-box',
                      borderRadius: '12px',
                      padding: '1rem',
                      textAlign: 'center',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                      position: 'relative',
                      opacity: techSpecsSection.isVisible ? 1 : 0,
                      transform: techSpecsSection.isVisible ? 'translateY(0)' : 'translateY(30px)',
                      transition: 'opacity 0.6s ease-out 0.4s, transform 0.6s ease-out 0.4s'
                    }}>
                        <div style={{ position: 'absolute', inset: 0, borderRadius: '12px', padding: '2px', background: 'linear-gradient(135deg, #FFB800, #FF8C00)', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude', pointerEvents: 'none' }}></div>
                        <div style={{ marginBottom: '0.25rem', display: 'flex', justifyContent: 'center', gap: '4px' }}>
                          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L12 6M12 6C14.2091 6 16 7.79086 16 10V14C16 16.2091 14.2091 18 12 18C9.79086 18 8 16.2091 8 14V10C8 7.79086 9.79086 6 12 6Z" stroke="#FF8C00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 18V22" stroke="#FF8C00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M16 12H19" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M5 12H8" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#FF8C00', marginBottom: '0.125rem' }}>16-32°C</div>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Rozsah teploty</div>
                    </div>
                    <div style={{
                      background: '#F5F5F5',
                      border: '2px solid transparent',
                      backgroundClip: 'padding-box',
                      borderRadius: '12px',
                      padding: '1rem',
                      textAlign: 'center',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                      position: 'relative',
                      opacity: techSpecsSection.isVisible ? 1 : 0,
                      transform: techSpecsSection.isVisible ? 'translateY(0)' : 'translateY(30px)',
                      transition: 'opacity 0.6s ease-out 0.6s, transform 0.6s ease-out 0.6s'
                    }}>
                        <div style={{ position: 'absolute', inset: 0, borderRadius: '12px', padding: '2px', background: 'linear-gradient(135deg, #FFB800, #FF8C00)', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude', pointerEvents: 'none' }}></div>
                        <div style={{ marginBottom: '0.25rem', display: 'flex', justifyContent: 'center' }}>
                          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="#FF8C00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="#FFB800"/>
                          </svg>
                        </div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#FF8C00', marginBottom: '0.125rem' }}>A+++</div>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Classe energetica</div>
                    </div>
                </div>

                {/* Terza riga: Box largo risparmio energetico + costo */}
                <div style={{
                  background: '#F5F5F5',
                  border: '2px solid transparent',
                  backgroundClip: 'padding-box',
                  borderRadius: '12px',
                  padding: '1.25rem',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                  position: 'relative',
                  opacity: techSpecsSection.isVisible ? 1 : 0,
                  transform: techSpecsSection.isVisible ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'opacity 0.6s ease-out 0.8s, transform 0.6s ease-out 0.8s'
                }}>
                    <div style={{ position: 'absolute', inset: 0, borderRadius: '12px', padding: '2px', background: 'linear-gradient(135deg, #FFB800, #FF8C00)', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude', pointerEvents: 'none' }}></div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#FFB800" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#FF8C00', margin: 0 }}>Úspora energie</h3>
                    </div>
                    <p style={{ color: '#555555', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '0.75rem' }}>
                        <strong>Až o 60% nižšie účty</strong> v porovnaní s inými klimatizáciami a plynovými systémami vďaka ThermoPanel technológii a energetickej triede A+++.
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid #e5e7eb' }}>
                        <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FF8C00' }}>€0,40 denne</div>
                        <div style={{ height: '20px', width: '1px', background: '#cccccc' }}></div>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Priemerné použitie 4-5 hodín v Eco režime</div>
                    </div>
                </div>
            </div>

            <div className="tech-specs-image" style={{ background: 'linear-gradient(135deg, #FFF8F0, #FFE8CC)', border: '2px solid #FFD966', borderRadius: '16px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '400px' }}>
              <img src="/images/condizionatore/specifiche.webp" alt="Technické špecifikácie" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section style={{ background: 'white', padding: '4rem 1rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, textAlign: 'center', marginBottom: '2.5rem', color: '#111827' }}>
            Čo obsahuje <span style={{ color: '#FF8C00' }}>naša ponuka</span>
          </h2>

          <div style={{ background: 'linear-gradient(135deg, #FFF4E6, #FFE8CC)', borderRadius: '16px', padding: '2rem', border: '1px solid #FFDAA3' }}>
            <div className="include-grid">
              <img src="/images/condizionatore/include.webp" alt="Čo obsahuje" className="include-img" />
              <div className="include-list">
                 {[
                    "1× klimatizačná jednotka Air Wave Smart™ 12.000 BTU",
                    "1× Diaľkové ovládanie s batériami",
                    "1× Komplet pre montáž na stenu",
                    "2× Náhradné HEPA filtre (zásoba na 2 roky)",
                    "Používateľská príručka + Záruka 2 roky",
                    "Bezplatný prístup k aplikácii (iOS a Android)"
                 ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ color: '#CC7A00', fontSize: '1.25rem' }}>✓</div>
                        <span style={{ color: '#B86800', fontSize: '0.9375rem', fontWeight: 700 }}>{item}</span>
                    </div>
                 ))}
              </div>
            </div>
          </div>

          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <button onClick={scrollToForm} style={{ background: '#16a34a', color: 'white', padding: '1rem 2.5rem', border: 'none', borderRadius: '12px', fontSize: '1.125rem', fontWeight: 600, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.5px', boxShadow: '0 4px 12px rgba(22,163,74,0.3)', transition: 'all 0.3s' }}>
              Objednať teraz - €69,99
            </button>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviewsSection" style={{ background: 'linear-gradient(to bottom, #ffffff 0%, #FFFCF5 10%, #FFFCF5 90%, #ffffff 100%)', padding: '4rem 1rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, textAlign: 'center', marginBottom: '2.5rem', color: '#111827' }}>
            Overené recenzie
          </h2>

          <div style={{ position: 'relative', maxWidth: '900px', margin: '0 auto 2rem' }}>
            <div id="reviewsSlider" style={{ overflow: 'hidden', borderRadius: '12px' }}>
              <div id="reviewsTrack" style={{ display: 'flex', transition: 'transform 0.5s ease', transform: `translateX(-${currentReview * 100}%)` }}>
                {[
                    { t: 'Konečne skutočne šetrím', d: 'Používam ho približne 2 mesiace a musím povedať, že účet výrazne klesol.. predtým som so starou klimatizáciou spotreboval veľa, teraz oveľa menej. Dobre kúri a výborne funguje', a: 'Marko R.', stars: 5 },
                    { t: 'Prišlo rýchlo!', d: 'Objednané v pondelok a prišlo v stredu, kuriér tiež príjemný. Výborný produkt, namontoval som ho na stenu sám bez volania kohokoľvek.. dobre funguje a hneď vyhreje miestnosť', a: 'Ivan T.', stars: 5 },
                    { t: 'Perfektné do spálne', d: 'Dal som ho do izby a takmer nerobí hluk, sotva počuť... s tým predchádzajúcim som nemohol spať, a toto je výborné. Tiež málo spotrebuje', a: 'Petra M.', stars: 5 },
                    { t: 'Zatiaľ je to dobré', d: 'Veľmi spokojná, rýchlo kúri a dom zostáva teplý. Neviem ako som predtým s radiátormi ktorým trvalo hodiny...toto je úplne iná vec. Nechávam 4 hviezdičky aby som videla ako to ide', a: 'Ana P.', stars: 4 },
                    { t: 'Ľahké na montáž', d: 'Syn a ja sme ho namontovali za pol hodiny, prichádza so skrutkami a všetkým, len ho pripevníte a hneď funguje. Nie je potrebný technik a ušetríte aj tie peniaze. Top', a: 'Robert S.', stars: 5 },
                    { t: 'Super rýchla doprava', d: 'Prišlo za 2 dni, dobre zabalené. Kuriér mi dokonca pomohol to vyniesť hore lebo bývam na treťom poschodí bez výťahu! Výborný produkt, výborne kúri a spotrebuje málo v porovnaní so starým', a: 'Franka B.', stars: 5 },
                    { t: 'Výborný pomer ceny a kvality', d: 'Za cenu čo stojí je naozaj dobrý. Kúri a chladí, ja ho používam hlavne v zime a teplota vždy zostáva taká akú chcem. Už sa nevraciam späť', a: 'Luka D.', stars: 5 },
                    { t: 'Dom vždy teplý', d: 'Vzal som ho do obývacej izby ktorá je veľká okolo 50 m² a vyhreje všetko. Aj keď je vonku zima, za 10 minút je dom teplý.. spotrebuje oveľa menej ako starý a účet je vidieť', a: 'Marija G.', stars: 5 },
                    { t: 'Rýchla doprava a výborný produkt', d: 'Objednané v utorok a prijaté vo štvrtok, kuriér presný. Produkt je výborný, kúri a chladí, používam ho celý rok. Veľmi tiché a jednoduché na použitie aj pre mňa ktorý nie som zručný', a: 'Ante C.', stars: 5 },
                    { t: 'Naozaj spokojná', d: 'Bála som sa objednať online ale všetko prišlo perfektne za niekoľko dní. Funguje výborne a spotrebuje veľmi málo v porovnaní s mojou starou klimatizáciou.. účet drasticky klesol. Veľmi spokojná', a: 'Ivana L.', stars: 5 }
                ].map((review, i) => (
                    <div key={i} className="review-slide" style={{ minWidth: '100%', background: 'linear-gradient(135deg, #FFFEFA, #FFF9F0)', padding: '1.5rem', boxShadow: '0 2px 8px rgba(255, 184, 0, 0.1)', border: '1px solid #FFE5D3', borderRadius: '12px' }}>
                        <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '0.75rem', color: '#fbbf24', fontSize: '1rem' }}>
                            {review.stars === 5 ? '⭐⭐⭐⭐⭐' : '⭐⭐⭐⭐'}
                        </div>
                        <p style={{ fontWeight: 600, color: '#111827', marginBottom: '0.5rem', fontSize: '1rem' }}>{review.t}</p>
                        <p style={{ color: '#6b7280', fontSize: '0.9375rem', lineHeight: 1.6, marginBottom: '0.75rem' }}>{review.d}</p>
                        <p style={{ color: '#9ca3af', fontSize: '0.875rem', fontWeight: 500 }}>{review.a}</p>
                    </div>
                ))}
              </div>
            </div>

            <button id="prevReview" onClick={prevReview} style={{ position: 'absolute', left: '5px', top: '50%', transform: 'translateY(-50%)', background: 'white', border: '1px solid #e5e7eb', width: '40px', height: '40px', minWidth: '40px', minHeight: '40px', borderRadius: '50%', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FFB800" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', minWidth: '32px', minHeight: '32px' }}>
                <path d="M15 18l-6-6 6-6" stroke="#FFB800" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button id="nextReview" onClick={nextReview} style={{ position: 'absolute', right: '5px', top: '50%', transform: 'translateY(-50%)', background: 'white', border: '1px solid #e5e7eb', width: '40px', height: '40px', minWidth: '40px', minHeight: '40px', borderRadius: '50%', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FFB800" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', minWidth: '32px', minHeight: '32px' }}>
                <path d="M9 18l6-6-6-6" stroke="#FFB800" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div id="reviewDots" style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1.5rem' }}>
              {Array.from({ length: totalReviews }).map((_, i) => (
                <span 
                    key={i}
                    className="review-dot" 
                    onClick={() => setCurrentReview(i)}
                    style={{ width: '10px', height: '10px', borderRadius: '50%', background: i === currentReview ? '#FFB800' : '#d1d5db', cursor: 'pointer', transition: 'all 0.3s' }}
                ></span>
              ))}
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
              Všetky recenzie môžete prečítať na oficiálnej stránke <strong style={{ color: '#FFB800' }}>Feedaty</strong>.
            </p>
          </div>

          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <button onClick={() => setIsModalOpen(true)} style={{ background: 'white', color: '#FFB800', padding: '0.875rem 2rem', border: '2px solid #FFB800', borderRadius: '10px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.3s' }}>
              Zanechajte recenziu
            </button>
          </div>
        </div>
      </section>

      {/* Review Modal */}
      {isModalOpen && (
        <div id="reviewModal" style={{ display: 'flex', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, alignItems: 'center', justifyContent: 'center' }} onClick={() => setIsModalOpen(false)}>
            <div style={{ background: 'white', borderRadius: '16px', padding: '2rem', maxWidth: '500px', width: '90%', margin: '0 auto', boxShadow: '0 20px 60px rgba(0,0,0,0.3)', position: 'relative' }} onClick={e => e.stopPropagation()}>
                <button onClick={() => setIsModalOpen(false)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#9ca3af', lineHeight: 1 }}>×</button>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ width: '60px', height: '60px', background: '#fef3c7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', fontSize: '2rem' }}>
                        ⚠️
                    </div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', marginBottom: '1rem' }}>Iba overené nákupy</h3>
                    <p style={{ color: '#6b7280', fontSize: '0.9375rem', lineHeight: 1.6 }}>
                        Pre zabránenie falošných recenzií môžu zanechať recenziu iba zákazníci, ktorí si tento produkt kúpili.
                    </p>
                    <button onClick={() => setIsModalOpen(false)} style={{ marginTop: '1.5rem', background: '#16a34a', color: 'white', padding: '0.75rem 2rem', border: 'none', borderRadius: '10px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer' }}>
                        Rozumiem
                    </button>
                </div>
            </div>
        </div>
      )}

      {/* Order Form Section */}
      {/* OFFERTA / CHECKOUT SECTION */}
      <section id="ordina" style={{ background: '#1E293B', padding: '5rem 1.5rem', color: 'white', position: 'relative' }}>
        {/* Background Glows */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '300px', height: '300px', background: '#FFB800', filter: 'blur(150px)', opacity: 0.1 }}></div>

        <div className="checkout-grid" style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem', alignItems: 'start' }}>

          {/* Left: Product Summary */}
          <div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1rem' }}>Obmedzené zásoby</h2>
            <p style={{ fontSize: '1rem', color: '#94a3b8', marginBottom: '2rem' }}>Využite Black Friday ponuku skôr ako sa minie</p>

            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', alignItems: 'center' }}>
                <img src="/images/condizionatore/specifiche.webp" alt="Prod" style={{ width: '80px', height: '80px', borderRadius: '12px', objectFit: 'cover' }} />
                <div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>Air Wave Smart™ + Komplet</div>
                  <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Zahŕňa aplikáciu pre smartphone</div>
                </div>
              </div>
              <ul style={{ color: '#cbd5e1', listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <span>Katalógová cena</span> <span style={{ textDecoration: 'line-through' }}>€174,99</span>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <span>Black Friday zľava</span> <span style={{ color: '#FFB800' }}>-€105,00</span>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <span>Doprava</span> <span style={{ color: '#4ADE80' }}>ZADARMO</span>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 0', fontSize: '1.25rem', fontWeight: 700, color: 'white' }}>
                  <span>Celkom</span> <span>€69,99</span>
                </li>
              </ul>
              <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#94a3b8', display: 'flex', gap: '10px', alignItems: 'center' }}>
                 <span>🛡️ Záruka 2 roky v cene</span>
              </div>
            </div>
          </div>

          {/* Right: Modern Form */}
          <div style={{ background: 'white', borderRadius: '24px', padding: '2.5rem', color: '#1E293B' }}>
            <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Bezpečná objednávka</h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Nie je potrebná platba vopred.</p>
            </div>

            <form onSubmit={handleFormSubmit} style={{ display: 'grid', gap: '1rem' }}>
              <input type="hidden" name="tmfp" />

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', marginBottom: '4px', display: 'block' }}>MENO A PRIEZVISKO</label>
                <input required type="text" placeholder="Ján Novák" value={orderData.name} onChange={(e) => setOrderData({...orderData, name: e.target.value})} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#F8FAFC' }} />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', marginBottom: '4px', display: 'block' }}>ÚPLNÁ ADRESA</label>
                <input required type="text" placeholder="Hlavná 123, 81000 Bratislava" value={orderData.address} onChange={(e) => setOrderData({...orderData, address: e.target.value})} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#F8FAFC' }} />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', marginBottom: '4px', display: 'block' }}>MOBIL</label>
                <input required type="tel" placeholder="+421 901 123 456" value={orderData.phone} onChange={(e) => setOrderData({...orderData, phone: e.target.value})} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#F8FAFC' }} />
              </div>

              {/* Garanzie e Sicurezza */}
              <div style={{ margin: '1rem 0', padding: '1.5rem', background: '#F8FAFC', border: '2px solid #E2E8F0', borderRadius: '12px' }}>
                <div style={{ display: 'grid', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '14px', flexShrink: 0 }}>✓</div>
                    <span style={{ fontSize: '0.9rem', color: '#1E293B', fontWeight: 600 }}>Platba na dobierku</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#FF8C00', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '14px', flexShrink: 0 }}>⚡</div>
                    <span style={{ fontSize: '0.9rem', color: '#1E293B', fontWeight: 600 }}>Bezplatná doprava do 24-48h</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#3B82F6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '14px', flexShrink: 0 }}>↺</div>
                    <span style={{ fontSize: '0.9rem', color: '#1E293B', fontWeight: 600 }}>30 dní na bezplatný návrat</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#8B5CF6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '14px', flexShrink: 0 }}>★</div>
                    <span style={{ fontSize: '0.9rem', color: '#1E293B', fontWeight: 600 }}>2 roky záruky v cene</span>
                  </div>
                </div>
              </div>

              <button type="submit" style={{
                width: '100%', padding: '1.2rem', borderRadius: '12px', fontSize: '1.1rem', fontWeight: 700, border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                background: 'linear-gradient(135deg, #FFB800 0%, #FF7A00 100%)',
                color: 'white',
                boxShadow: '0 10px 25px -5px rgba(255, 122, 0, 0.4)',
                transition: 'all 0.3s ease'
              }}>
                <span>Potvrdiť objednávku</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* Sticky Bottom Bar */}
      <div className="sticky-bottom-container" style={{
        position: 'fixed',
        bottom: '1rem',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: '1400px',
        padding: '0 1rem',
        zIndex: 1000
      }}>
        <div className="sticky-bottom-bar" style={{
          background: 'linear-gradient(135deg, #FFB800, #FF8C00)',
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.2)',
          padding: '0.75rem 1.5rem',
          borderRadius: '999px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem'
        }}>
          <div className="sticky-info" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            flex: '1'
          }}>
            <div>
              <div style={{ fontSize: '0.95rem', color: 'white', fontWeight: 700, opacity: 0.95 }}>
                Air Wave Smart™
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#16a34a' }}>69,99 €</span>
                <span style={{ fontSize: '0.875rem', textDecoration: 'line-through', color: 'white', opacity: 0.8 }}>174,99 €</span>
              </div>
            </div>
          </div>
          <button
            className="sticky-button"
            onClick={scrollToForm}
            style={{
              background: '#16a34a',
              color: 'white',
              padding: '0.75rem 2rem',
              border: 'none',
              borderRadius: '999px',
              fontSize: '0.875rem',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(22, 163, 74, 0.4)',
              transition: 'all 0.3s',
              whiteSpace: 'nowrap',
              flexShrink: 0
            }}
          >
            Kúpiť teraz
          </button>
        </div>
      </div>

    </>
  );
}