'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Truck,
  ShieldCheck,
  Phone,
  Banknote,
  Check,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  Star,
  Zap,
  Clock,
  ThumbsUp,
  ChefHat,
  X,
  Package,
  CheckCircle,
  Lock,
  ShoppingCart,
  MapPin,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useFacebookTracking } from '@/app/hooks/useFacebookTracking';
import { validateForm } from '@/app/utils/formValidation';

// --- NETWORK CONFIG ---
const NETWORK_CONFIG = {
  apiUrl: 'https://offers.italiadrop.com/forms/api/',
  uid: '019bfb2e-6cc2-7780-b7d5-e6ab2c6a6b58',
  key: 'a32454578a4cb8f9f41bd4',
  offer: '2876',
  lp: '2915',
};

// --- TYPES ---

interface Review {
  id: number;
  name: string;
  age: number;
  location: string;
  stars: number;
  text: string;
  imageUrl?: string;
}

interface FeatureBox {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

// --- COMPONENTS ---

// 1. Button Component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  pulse?: boolean;
  subtext?: string;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'lg',
  fullWidth = false,
  pulse = false,
  subtext,
  className = '',
  icon,
  ...props
}) => {
  const baseStyles = "font-bold rounded-lg transition-transform active:scale-95 inline-flex flex-col items-center justify-center text-center shadow-lg border-b-4";

  const variants = {
    primary: "bg-green-600 hover:bg-green-500 text-white border-green-800",
    secondary: "bg-yellow-400 hover:bg-yellow-300 text-gray-900 border-yellow-600",
    danger: "bg-red-600 hover:bg-red-500 text-white border-red-800",
  };

  const sizes = {
    md: "py-3 px-6 text-lg",
    lg: "py-4 px-8 text-xl",
    xl: "py-6 px-8 text-2xl uppercase tracking-wide",
  };

  const pulseClass = pulse ? "animate-pulse" : "";
  const widthClass = fullWidth ? "w-full" : "w-full md:w-auto";

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${pulseClass} ${widthClass} ${className}`}
      {...props}
    >
      <span className="flex items-center gap-2 justify-center">
        {icon}
        {children}
      </span>
      {subtext && (
        <span className="block text-xs sm:text-sm font-medium opacity-90 mt-1 tracking-wide text-white/90">
          {subtext}
        </span>
      )}
    </button>
  );
};

// 2. Modal Component
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col relative animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors text-gray-600"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto text-sm text-gray-600 leading-relaxed space-y-4">
          {content}
        </div>
        <div className="p-4 border-t border-gray-100 bg-gray-50 rounded-b-xl flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-900 text-white rounded-lg font-bold hover:bg-gray-800 transition-colors"
          >
            Inchide
          </button>
        </div>
      </div>
    </div>
  );
};

// 3. StickyHeader Component
const StickyHeader: React.FC = () => {
  return (
    <div className="sticky top-0 z-50 w-full bg-red-700 text-white text-xs sm:text-sm font-bold shadow-md">
      <div className="max-w-6xl mx-auto px-2 py-2 flex flex-wrap justify-center items-center gap-x-4 gap-y-1 text-center">
        <div className="flex items-center gap-1">
          <Truck size={14} /> LIVRARE 24/48H
        </div>
        <div className="hidden sm:inline">|</div>
        <div className="flex items-center gap-1 text-yellow-300">
          <Banknote size={14} /> PLATA LA LIVRARE
        </div>
        <div className="hidden sm:inline">|</div>
        <div className="flex items-center gap-1">
          <ShieldCheck size={14} /> GARANTIE 2 ANI
        </div>
        <div className="hidden md:inline">|</div>
        <div className="hidden md:flex items-center gap-1">
          <Phone size={14} /> SUPORT CLIENTI IN ROMANA
        </div>
      </div>
    </div>
  );
};

// 4. Hero Component
const carouselImages = [
  "/images/quickchef img/1.png",
  "/images/quickchef img/2.png",
  "/images/quickchef img/3.png",
  "/images/quickchef img/4.png",
  "/images/quickchef img/5.png",
];

const benefits = [
  <span key="1"><strong className="text-red-700">NOUTATE EXCLUSIVA:</strong> Dozare automata a ingredientelor (face totul singur)</span>,
  <span key="2"><strong className="text-gray-900">45 Functii intr-unul singur:</strong> robotul unic pe piata</span>,
  <span key="3">Ecran tactil <strong className="text-gray-900">7" SoftScreen</strong> mare si clar - te ghideaza pas cu pas</span>,
  <span key="4">Aplicatie cu <strong className="text-gray-900">1000+ retete</strong> - alegi si urmezi ca un tutorial</span>,
  <span key="5">Functia <strong className="text-gray-900">"Ce am in frigider?"</strong> - economisesti la cumparaturi</span>,
  <span key="6"><strong className="text-gray-900">Cantar integrat</strong> precis la gram - nu mai dozezi "cu ochiul"</span>,
  <span key="7">Vas ceramic <strong className="text-gray-900">antiaderent</strong> - nu se lipeste nimic, se curata intr-o clipita</span>,
  <span key="8">Gatire pana la <strong className="text-gray-900">180°C</strong> + prajire reala</span>,
  <span key="9">Sistem <strong className="text-gray-900">OneClick</strong> - schimbi accesoriile fara demontare</span>,
];

const Hero: React.FC<{ scrollToForm: () => void }> = ({ scrollToForm }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);

  return (
    <section className="bg-white pt-6 pb-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
          <span className="text-red-600 block mb-2 text-xl md:text-2xl uppercase tracking-wide">Te-ai saturat sa pierzi timp in bucatarie?</span>
          Descopera Primul Robot care <span className="bg-yellow-200 px-2">Adauga Ingredientele Singur.</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-700 mb-6 max-w-2xl mx-auto leading-relaxed">
          Uita de oale si de stres. Pune totul in dozator, alege reteta de pe ecran si <strong className="text-gray-900">gateste pentru tine in timp ce te relaxezi.</strong>
          <br className="my-2"/>
          <strong className="text-green-700 bg-green-50 px-3 py-1 rounded inline-block mt-2 border border-green-200 shadow-sm">Rezultate perfecte (chiar daca nu stii sa gatesti)</strong>
        </p>

        <div className="relative mb-8 rounded-xl overflow-hidden shadow-2xl border-4 border-gray-100 max-w-xl mx-auto group bg-gray-100">
           <div className="relative aspect-square w-full">
             <img
               src={carouselImages[currentSlide]}
               alt={`Robot de bucatarie ${currentSlide + 1}`}
               className="w-full h-full object-cover transition-all duration-300"
             />

             <div className="absolute inset-0 flex items-center justify-between px-2 md:px-4 pointer-events-none">
                <button onClick={(e) => { e.stopPropagation(); prevSlide(); }} className="bg-white/80 p-2 rounded-full shadow hover:bg-white pointer-events-auto text-gray-800 transition-colors">
                  <ChevronLeft size={24} />
                </button>
                <button onClick={(e) => { e.stopPropagation(); nextSlide(); }} className="bg-white/80 p-2 rounded-full shadow hover:bg-white pointer-events-auto text-gray-800 transition-colors">
                  <ChevronRight size={24} />
                </button>
             </div>

             <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
               {carouselImages.map((_, idx) => (
                 <button
                   key={idx}
                   onClick={() => setCurrentSlide(idx)}
                   className={`w-2.5 h-2.5 rounded-full transition-colors shadow-sm ${idx === currentSlide ? 'bg-red-600' : 'bg-white/70 hover:bg-white'}`}
                   aria-label={`Mergi la slide ${idx + 1}`}
                 />
               ))}
             </div>
           </div>
        </div>

        <div className="bg-yellow-50/60 rounded-xl p-6 md:p-8 mb-8 text-left max-w-2xl mx-auto border-2 border-yellow-200 shadow-sm">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 text-center leading-tight">
              Robotul care te face sa gatesti ca un chef <br className="hidden sm:block"/>fara niciun dezastru
            </h3>
            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3 text-lg">
                  <div className="bg-green-100 p-1 rounded-full shrink-0 mt-0.5">
                    <Check className="text-green-700" strokeWidth={3} size={20} />
                  </div>
                  <span className="text-gray-800 leading-snug">{benefit}</span>
                </li>
              ))}
            </ul>
        </div>

        <div className="bg-white border-4 border-red-600 p-6 rounded-xl max-w-2xl mx-auto mb-8 relative shadow-xl transform transition-transform hover:scale-[1.01]">
          <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-6 py-2 rounded-full text-sm md:text-base font-bold uppercase tracking-wider shadow-md whitespace-nowrap animate-pulse border-2 border-white">
            Oferta limitata - Doar astazi
          </div>

          <div className="flex flex-col items-center justify-center mb-6 mt-6">
             <div className="bg-yellow-400 text-gray-900 font-black text-3xl md:text-4xl px-8 py-3 rounded-lg mb-4 shadow-md">
               -50%
             </div>
             <div className="text-gray-400 font-medium uppercase text-sm tracking-widest mb-1">Pret promotional</div>
             <div className="flex items-center gap-3">
               <span className="text-gray-400 line-through text-2xl decoration-2">912 lei</span>
               <span className="text-5xl md:text-6xl font-black text-red-600 tracking-tighter">456 lei</span>
             </div>
             <span className="bg-green-100 text-green-800 font-bold px-3 py-1 rounded-full text-sm mt-2 border border-green-200">-50% REDUCERE</span>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-100 text-left space-y-4">
             <div className="flex items-center gap-3 border-b border-gray-200 pb-3 last:border-0 last:pb-0">
               <div className="bg-green-100 p-2 rounded-full text-green-700 shrink-0">
                 <Truck size={24} strokeWidth={2} />
               </div>
               <div>
                 <p className="font-bold text-gray-900 leading-none text-lg">Livrare rapida</p>
                 <p className="text-sm text-gray-500 mt-1">Livrare in 24/48 ore</p>
               </div>
             </div>

             <div className="flex items-center gap-3 border-b border-gray-200 pb-3 last:border-0 last:pb-0">
               <div className="bg-yellow-100 p-2 rounded-full text-yellow-700 shrink-0">
                 <Banknote size={24} strokeWidth={2} />
               </div>
               <div>
                 <p className="font-bold text-gray-900 leading-none text-lg">Platesti doar la livrare</p>
                 <p className="text-sm text-gray-500 mt-1">Fara plata in avans, cash la curier</p>
               </div>
             </div>

             <div className="flex items-center gap-3">
               <div className="bg-blue-100 p-2 rounded-full text-blue-700 shrink-0">
                 <ShieldCheck size={24} strokeWidth={2} />
               </div>
               <div>
                 <p className="font-bold text-gray-900 leading-none text-lg">Garantie 2 ani</p>
                 <p className="text-sm text-gray-500 mt-1">Asistenta tehnica inclusa</p>
               </div>
             </div>
          </div>

          <Button onClick={scrollToForm} fullWidth pulse size="xl" subtext="Nu ai nevoie de card de credit">
            COMANDA ACUM CU REDUCERE
          </Button>
        </div>

        <div className="flex justify-center animate-bounce text-gray-400 mt-4">
            <ArrowDown size={32} />
        </div>
      </div>
    </section>
  );
};

// 5. SocialProof Component
const SocialProof: React.FC = () => {
  return (
    <section className="bg-gray-100 py-8 border-y border-gray-200">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="flex justify-center gap-1 text-yellow-400 mb-2">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star key={s} fill="currentColor" size={24} />
          ))}
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          4,8/5 pe baza a peste 3.000 de recenzii
        </h3>
        <p className="text-lg text-gray-600 italic mb-6">
          "In sfarsit gatesc bine fara niciun stres."
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          <div className="flex flex-col items-center gap-2 p-3 bg-white rounded-lg shadow-sm">
            <ThumbsUp className="text-blue-600" />
            <span className="font-bold text-gray-700">Simplu</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-3 bg-white rounded-lg shadow-sm">
            <Clock className="text-green-600" />
            <span className="font-bold text-gray-700">Rapid</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-3 bg-white rounded-lg shadow-sm">
            <Zap className="text-yellow-500" />
            <span className="font-bold text-gray-700">Antiaderent</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-3 bg-white rounded-lg shadow-sm">
            <ChefHat className="text-red-500" />
            <span className="font-bold text-gray-700">Retete ghidate</span>
          </div>
        </div>
      </div>
    </section>
  );
};

// 6. ProblemAgitation Component
const ProblemAgitation: React.FC<{ scrollToForm: () => void }> = ({ scrollToForm }) => {
  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="bg-red-50 border border-red-100 rounded-xl p-6 md:p-8 shadow-sm">
          <h2 className="text-2xl md:text-3xl font-bold text-red-700 mb-6 text-center">
            Daca te regasesti in aceste situatii... <br/>acest robot iti va schimba viata.
          </h2>

          <ul className="space-y-5 mb-8">
            <li className="flex items-start gap-3">
              <div className="bg-red-100 p-1 rounded-full shrink-0 mt-1">
                <X className="text-red-600" size={22} strokeWidth={3} />
              </div>
              <span className="text-lg text-gray-800">Deschizi frigiderul si <strong className="text-red-700">nu stii ce sa gatesti.</strong></span>
            </li>
            <li className="flex items-start gap-3">
              <div className="bg-red-100 p-1 rounded-full shrink-0 mt-1">
                <X className="text-red-600" size={22} strokeWidth={3} />
              </div>
              <span className="text-lg text-gray-800">Retetele iti ies <strong className="text-red-700">"asa si asa"</strong> si iti pierzi motivatia.</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="bg-red-100 p-1 rounded-full shrink-0 mt-1">
                <X className="text-red-600" size={22} strokeWidth={3} />
              </div>
              <span className="text-lg text-gray-800"><strong>Murdaresti o gramada de oale</strong> si petreci ore intregi la spalat.</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="bg-red-100 p-1 rounded-full shrink-0 mt-1">
                <X className="text-red-600" size={22} strokeWidth={3} />
              </div>
              <span className="text-lg text-gray-800">Pana la urma <strong>comanzi fast-food</strong> si cheltui prea mult.</span>
            </li>
          </ul>

          <div className="text-center bg-white p-6 rounded-lg border border-gray-100 shadow-md">
            <p className="text-xl font-bold text-green-700 mb-6 leading-tight">
              De astazi gatesti automat mancaruri sanatoase,<br/> chiar <span className="underline decoration-green-500 decoration-4">fara experienta.</span>
            </p>
            <Button onClick={scrollToForm} variant="primary" size="lg" className="mx-auto">
              DA, VREAU - PLATESC LA LIVRARE
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

// 7. HowItWorks Component
const HowItWorks: React.FC = () => {
  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Cum functioneaza?
        </h2>
        <p className="text-lg text-gray-600 mb-8">Mai simplu decat un cuptor cu microunde. <strong className="text-gray-900">Face totul singur:</strong></p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md border-b-4 border-green-500 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-green-500"></div>
            <div className="w-12 h-12 bg-green-100 text-green-700 font-bold text-2xl rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-green-200">1</div>
            <h3 className="font-bold text-xl mb-2">Umple dozatorul</h3>
            <p className="text-gray-600">Pune ingredientele in <strong className="text-gray-900">6 compartimente</strong>. Nu trebuie sa cantaresti dinainte, face cantarul asta.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-b-4 border-green-500 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-2 bg-green-500"></div>
            <div className="w-12 h-12 bg-green-100 text-green-700 font-bold text-2xl rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-green-200">2</div>
            <h3 className="font-bold text-xl mb-2">Alege reteta</h3>
            <p className="text-gray-600">Selecteaza de pe <strong className="text-gray-900">ecranul tactil de 7"</strong> sau din aplicatie din peste 1000 de retete ghidate.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-b-4 border-green-500 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-2 bg-green-500"></div>
            <div className="w-12 h-12 bg-green-100 text-green-700 font-bold text-2xl rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-green-200">3</div>
            <h3 className="font-bold text-xl mb-2">Apasa START si pleaca</h3>
            <p className="text-gray-600">Dozeaza ingredientele <strong className="text-gray-900">la momentul potrivit</strong>, gateste si amesteca. Te anunta cand e gata!</p>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 text-blue-900 p-5 rounded-lg inline-block text-base md:text-lg shadow-sm">
          <span className="font-bold">TEHNOLOGIE QUICKSENSE:</span> Singurul robot care adauga ingredientele singur in timpul gatirii. <br/>
          <span className="text-sm text-blue-700">Nu mai trebuie sa stai langa el!</span>
        </div>
      </div>
    </section>
  );
};

// 8. FeaturesGrid Component
const features: FeatureBox[] = [
  {
    id: 1,
    title: "Nu gresesti niciodata",
    description: "Urmezi ecranul si robotul dozeaza totul. Rezultat garantat 100%.",
    imageUrl: "/images/quickchef img/Non sbagli mai.png"
  },
  {
    id: 2,
    title: "Face totul singur",
    description: "Datorita DOZATORULUI automat nu trebuie sa adaugi ingrediente in timpul gatirii.",
    imageUrl: "/images/quickchef img/DISPENSER AUTOMATICO.png"
  },
  {
    id: 3,
    title: "Functia Goleste-frigiderul",
    description: "Introdu in aplicatie ce ai in frigider si iti creeaza reteta perfecta. Zero risipa.",
    imageUrl: "/images/quickchef img/Funzione Svota-Frigo.png"
  },
  {
    id: 4,
    title: "Ceramic antiaderent",
    description: "Vas unic cu invelis ceramic: nu se lipeste nimic si se curata dintr-o singura miscare.",
    imageUrl: "/images/quickchef img/Ceramica Antiaderente.png"
  },
  {
    id: 5,
    title: "45 Functii intr-unul singur",
    description: "Toaca, framanta, gateste la abur, fermenteaza, slow cooking, iaurt... inlocuieste 10 aparate.",
    imageUrl: "/images/quickchef img/45 Funzioni in 1.png"
  },
  {
    id: 6,
    title: "Rezultate de chef",
    description: "Creme catifelate, aluaturi perfecte de pizza, sosuri dense. Totul automat.",
    imageUrl: "/images/quickchef img/Risultati da Chef.png"
  }
];

const FeaturesGrid: React.FC = () => {
  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900">
          De ce il aleg toti:
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div key={feature.id} className="border rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow bg-white flex flex-col h-full">
              <div className="aspect-square bg-gray-200 relative overflow-hidden group">
                <img
                  src={feature.imageUrl}
                  alt={feature.title}
                  className="w-full h-full object-cover transition-transform hover:scale-110 duration-700"
                />
              </div>
              <div className="p-5 flex-grow">
                <h3 className="font-extrabold text-xl mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed text-base">
                  {feature.description.split(/([A-Z\s]{4,})/).map((part, i) =>
                    part.match(/[A-Z\s]{4,}/) ? <strong key={i} className="text-gray-800">{part}</strong> : part
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 9. ComparisonTable Component
const ComparisonTable: React.FC<{ scrollToForm: () => void }> = ({ scrollToForm }) => {
  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900">
          Comparatie rapida (fara ocolisuri)
        </h2>

        <div className="bg-white rounded-xl shadow-xl overflow-hidden border-2 border-gray-100 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[320px]">
            <thead>
              <tr className="bg-gray-100 border-b-2 border-gray-300">
                <th className="p-2 md:p-4 text-gray-600 font-bold text-xs md:text-base w-1/3 uppercase tracking-wider">Caracteristica</th>
                <th className="p-2 md:p-4 bg-green-50 text-green-800 font-extrabold text-center border-l border-r border-green-200 w-1/3 text-xs md:text-xl shadow-inner">
                  QuickChef
                </th>
                <th className="p-2 md:p-4 text-gray-400 font-medium text-center text-xs md:text-base w-1/3">
                  Alte robote
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                [<span key="1" className="text-xs md:text-base">Dozator automat <br/><span className="text-[10px] md:text-xs font-normal text-gray-500">(Adauga ingredientele singur)</span></span>, true, "Nu are (Faci tu)"],
                [<span key="2" className="text-xs md:text-base">Total functii</span>, "45 (Cel mai complet)", "Aprox. 12-20"],
                [<span key="3" className="text-xs md:text-base">Ecran tactil</span>, "7\" SoftScreen", "Mic sau absent"],
                [<span key="4" className="text-xs md:text-base">Aplicatie + Goleste-frigiderul</span>, "Da (1000+ Retete)", "Putine retete"],
                [<span key="5" className="text-xs md:text-base">Material vas</span>, "Ceramic antiaderent", "Otel (Se lipeste)"],
                [<span key="6" className="text-xs md:text-base">Capacitate</span>, "3,3L (Pentru familie)", "2,2L (Mica)"],
                [<span key="7" className="text-xs md:text-base">Curatare</span>, "Auto-curatare + Masina de spalat", "Obositoare manual"],
              ].map(([feature, isUs, them], idx) => (
                <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="p-2 md:p-4 font-bold text-gray-800 text-xs md:text-base align-middle">{feature}</td>
                  <td className="p-2 md:p-4 bg-green-50 border-l border-r border-green-100 text-center align-middle">
                    {isUs === true ? <Check className="inline-block text-green-600" size={28} strokeWidth={4} /> : <span className="font-extrabold text-green-700 text-xs md:text-lg">{isUs}</span>}
                  </td>
                  <td className="p-2 md:p-4 text-center text-gray-500 text-xs md:text-base align-middle">
                    {them}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 text-center">
          <Button onClick={scrollToForm} variant="primary" size="lg">
            COMANDA ACUM - PLATESTI LA LIVRARE
          </Button>
        </div>
      </div>
    </section>
  );
};

// 10. WhatsIncluded Component
const WhatsIncluded: React.FC = () => {
  return (
    <section className="py-12 px-4 bg-blue-50/80">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2 relative">
             <div className="absolute -top-4 -right-4 bg-yellow-400 text-gray-900 font-bold px-4 py-2 rounded-full shadow-lg z-10 transform rotate-12">
               KIT COMPLET
             </div>
             <div className="aspect-square w-full rounded-xl shadow-2xl border-4 border-white overflow-hidden transform -rotate-2 hover:rotate-0 transition-transform duration-500 bg-white">
                <img
                  src="/images/quickchef img/1.png"
                  alt="Continutul pachetului QuickChef"
                  className="w-full h-full object-cover"
                />
             </div>
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Package className="text-blue-600" size={32} /> Ce gasesti in pachet:
            </h2>
            <ul className="space-y-4">
              {[
                <span key="1">Robot <strong>QuickChef 45 Functii</strong></span>,
                <span key="2">Vas <strong>Ceramic Antiaderent (3,3L)</strong></span>,
                <span key="3"><strong className="text-blue-700">Dozator Automat</strong> QuickSense</span>,
                <span key="4">Accesoriu <strong>Paleta Saute</strong> (pentru risotto/sosuri)</span>,
                <span key="5">Gatitor la abur XL pe 2 niveluri</span>,
                <span key="6">Kit taiere: Lame, Fluture, Lingura</span>,
                <span key="7"><strong className="text-green-700">BONUS:</strong> Aplicatie Premium cu 1000+ Retete</span>,
                <span key="8"><strong className="text-gray-900">Garantie 2 ani</strong></span>
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-lg text-gray-800 border-b border-blue-100 pb-2 last:border-0">
                  <CheckCircle className="text-green-500 shrink-0 mt-1" size={22} fill="currentColor" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8 bg-white rounded-xl shadow-lg border border-gray-100 p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-2">
                  <div className="bg-green-100 p-3 rounded-full text-green-700 shrink-0">
                      <Truck size={24} />
                  </div>
                  <div>
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">Livrare</p>
                      <p className="font-bold text-gray-900 text-lg leading-none mt-1">Rapida 24/48h</p>
                  </div>
              </div>

              <div className="flex items-center gap-3 p-2 border-t sm:border-t-0 sm:border-l border-gray-100">
                  <div className="bg-yellow-100 p-3 rounded-full text-yellow-700 shrink-0">
                      <Banknote size={24} />
                  </div>
                  <div>
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">Plata</p>
                      <p className="font-bold text-gray-900 text-lg leading-none mt-1">La livrare</p>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// 11. Reviews Component
const reviewsList: Review[] = [
  { id: 1, name: "Maria", age: 57, location: "Bucuresti", stars: 5, text: "Nu am fost niciodata buna la gatit... cu asta totul iese perfect. Ecranul imi arata ce sa fac, e foarte practic.", imageUrl: "/images/quickchef img/recensione 1.jpg" },
  { id: 2, name: "Andrei", age: 63, location: "Cluj-Napoca", stars: 5, text: "Gatitul devenise plictisitor. Acum pun totul si el gateste. Sa curat e mult mai simplu.", imageUrl: "/images/quickchef img/recensione 2.jpg" },
  { id: 3, name: "Elena", age: 41, location: "Timisoara", stars: 5, text: "Lucrez si nu am timp. Asta ma salveaza seara. Chiar si aluaturile si sosurile ies perfecte.", imageUrl: "/images/quickchef img/recensione 3.jpg" },
  { id: 4, name: "Ion", age: 52, location: "Iasi", stars: 5, text: "Cantarul integrat e minunat, in sfarsit nu mai gresesc cantitatile... inainte aruncam jumatate din retete." },
  { id: 5, name: "Ana", age: 60, location: "Constanta", stars: 5, text: "Vasul nu se lipeste, asta m-a convins. Inainte trebuia sa freec mereu." },
  { id: 6, name: "Cristina", age: 35, location: "Brasov", stars: 5, text: "Aplicatia cu retete e super utila... iar functia 'ce am in frigider' e geniala, nu mai risipesc nimic." }
];

const Reviews: React.FC = () => {
  return (
    <section className="py-12 px-4 bg-white border-t border-gray-200">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          Recenzii reale de la clienti
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviewsList.map((review) => (
            <div key={review.id} className="bg-gray-50 rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              {review.imageUrl && (
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={review.imageUrl}
                    alt={`Recenzie de la ${review.name}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-bold text-gray-900">{review.name}, {review.age} ani</h4>
                    <div className="flex items-center text-gray-500 text-xs mt-1">
                      <MapPin size={12} className="mr-1" /> {review.location}
                    </div>
                  </div>
                  <div className="flex text-yellow-400">
                    {[...Array(review.stars)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 italic">"{review.text}"</p>
                <div className="mt-4 flex items-center gap-2 text-green-700 text-xs font-bold uppercase">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span> Achizitie verificata
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 12. OrderForm Component
const OrderForm: React.FC = () => {
  const { trackLeadEvent, saveUserData } = useFacebookTracking();
  const tmfpRef = useRef<HTMLInputElement>(null);
  const pageLoadTime = useRef(Date.now());

  const [formData, setFormData] = useState({
    firstName: '',
    phone: '',
    fullAddress: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateForm({
      name: formData.firstName,
      phone: formData.phone,
      address: formData.fullAddress,
      countryCode: 'RO',
      productKey: 'quickchef_ro',
      pageLoadTime: pageLoadTime.current,
    });
    if (!validation.isValid) {
      alert(validation.error);
      return;
    }

    setIsSubmitting(true);

    try {
      // Get UTM params from URL
      const urlParams = new URLSearchParams(window.location.search);

      // Send to Network API
      let isDouble = false;
      try {
        const networkFormData = new FormData();
        networkFormData.append('uid', NETWORK_CONFIG.uid);
        networkFormData.append('key', NETWORK_CONFIG.key);
        networkFormData.append('offer', NETWORK_CONFIG.offer);
        networkFormData.append('lp', NETWORK_CONFIG.lp);
        networkFormData.append('name', formData.firstName);
        networkFormData.append('tel', formData.phone);
        networkFormData.append('street-address', formData.fullAddress);

        // Add fingerprint if available
        const tmfpValue = tmfpRef.current?.value || '';
        if (tmfpValue) {
          networkFormData.append('tmfp', tmfpValue);
        }

        // Add UTM params if present
        ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'subid', 'subid2', 'subid3', 'subid4', 'pubid'].forEach(param => {
          const value = urlParams.get(param);
          if (value) networkFormData.append(param, value);
        });

        const response = await fetch(NETWORK_CONFIG.apiUrl, {
          method: 'POST',
          body: networkFormData,
        });
        const data = await response.json();
        console.log('Network API response:', data);

        if (data.message === 'DOUBLE') {
          isDouble = true;
          sessionStorage.setItem('skipFBPurchase', 'true');
        }
      } catch (error) {
        console.error('Network API error:', error);
      }

      // Parse name into first and last name for Facebook
      const nameParts = formData.firstName.trim().split(' ');
      const nome = nameParts[0] || '';
      const cognome = nameParts.slice(1).join(' ') || '';

      const userData = {
        nome,
        cognome,
        telefono: formData.phone.trim(),
        indirizzo: formData.fullAddress.trim()
      };

      if (!isDouble) {
        // Save user data for Facebook tracking
        saveUserData(userData);

        // Track Lead event for Facebook
        await trackLeadEvent(userData, {
          content_name: 'QuickChef',
          currency: 'RON',
          value: 456
        });
      }

      // Redirect to thank you page
      window.location.href = '/fb-ty/ty-fb-ro';
    } catch (error) {
      console.error('Form submission error:', error);
      // Still redirect on error
      window.location.href = '/fb-ty/ty-fb-ro';
    }
  };

  return (
    <section id="order-form" className="py-12 px-4 bg-red-50 border-t-4 border-red-600 scroll-mt-20">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="bg-red-600 p-6 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-white opacity-10 transform -skew-x-12"></div>
          <h2 className="text-2xl md:text-3xl font-extrabold mb-2 uppercase relative z-10">
            Formular de comanda
          </h2>
          <p className="font-medium opacity-90 relative z-10">Completeaza si primesti 50% reducere</p>
        </div>

        <div className="bg-yellow-100 p-3 text-center border-b border-yellow-200">
          <p className="text-red-700 font-bold text-sm animate-pulse">
            Cerere mare: doar 7 bucati la acest pret!
          </p>
        </div>

        <div className="p-5 md:p-8">
          <div className="flex justify-between items-center mb-6 pb-6 border-b border-gray-200 bg-gray-50 p-4 rounded-lg">
            <div>
              <p className="text-gray-500 line-through text-sm">Pret: 912 lei</p>
              <p className="text-red-600 font-bold text-2xl">Total: 456 lei</p>
            </div>
            <div className="text-right">
              <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded border border-blue-200">LIVRARE RAPIDA</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input type="hidden" name="tmfp" ref={tmfpRef} />
            <div>
              <label className="block text-gray-700 font-bold mb-1 text-sm uppercase tracking-wide">Nume si Prenume *</label>
              <input
                type="text"
                name="firstName"
                required
                autoComplete="name"
                className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-green-500 outline-none transition-colors text-lg"
                placeholder="Ex: Ion Popescu"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-1 text-sm uppercase tracking-wide">Telefon (Mobil) *</label>
              <input
                type="tel"
                name="phone"
                required
                autoComplete="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-green-500 outline-none transition-colors text-lg"
                placeholder="Ex: 0721 123 456"
                value={formData.phone}
                onChange={handleChange}
              />
              <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                <ShieldCheck size={12}/> Important pentru confirmarea livrarii
              </p>
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-1 text-sm uppercase tracking-wide">Adresa completa (Strada, Nr., Oras, Cod postal) *</label>
              <textarea
                name="fullAddress"
                required
                autoComplete="street-address"
                className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-green-500 outline-none transition-colors text-lg h-32"
                placeholder="Ex: Str. Victoriei 10, 010011 Bucuresti"
                value={formData.fullAddress}
                onChange={handleChange}
              />
            </div>

            <div className="bg-gray-50 p-4 rounded border border-gray-200 mt-4 cursor-pointer hover:bg-gray-100 transition-colors">
               <label className="flex items-start gap-3 cursor-pointer pointer-events-none">
                 <input type="radio" checked readOnly className="w-5 h-5 text-green-600 mt-1" />
                 <div>
                   <span className="block font-bold text-gray-800">Plata la livrare (Cash)</span>
                   <span className="block text-xs text-gray-500">Platesti direct curierului cand primesti coletul. Fara risc.</span>
                 </div>
               </label>
            </div>

            <Button type="submit" fullWidth pulse variant="primary" className="mt-6 shadow-xl text-xl" disabled={isSubmitting}>
              {isSubmitting ? 'SE TRIMITE...' : 'CONFIRMA COMANDA'}
            </Button>

            <div className="flex justify-center items-center gap-4 text-xs text-gray-400 mt-4">
              <span className="flex items-center gap-1"><Lock size={12}/> SSL securizat 256-bit</span>
              <span className="flex items-center gap-1"><Truck size={12}/> Livrare rapida</span>
            </div>

          </form>
        </div>
      </div>
    </section>
  );
};

// 13. Faq Component
const faqs: FaqItem[] = [
  { question: "Pot plati la livrare?", answer: "Da, desigur. Platesti cash direct curierului cand primesti coletul. Nu e nevoie de plata in avans." },
  { question: "Cat dureaza livrarea?", answer: "Expediem cu livrare rapida in 24/48 ore lucratoare in toata Romania." },
  { question: "Trebuie sa stiu sa gatesc?", answer: "Nu! Robotul te ghideaza pas cu pas prin ecranul tactil si aplicatie. Este creat pentru cei care nu au timp sau chef sa gateasca, dar vor sa manance bine." },
  { question: "Este usor de curatat?", answer: "Da, are functie de auto-curatare, iar vasul are invelis ceramic antiaderent care se curata dintr-o singura stergere." },
  { question: "Ce pot gati?", answer: "Aproape orice: risotto, paste, supe crema, gatit la abur (peste/legume), aluaturi de pizza si paine, deserturi, iaurt si multe altele." },
  { question: "Daca nu imi convine?", answer: "Ai garantie 2 ani. In plus, oferim suport clienti in romana pentru orice intrebare sau problema." }
];

const Faq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900">
          Intrebari frecvente
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center p-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <span className="font-bold text-gray-800 text-lg">{faq.question}</span>
                {openIndex === index ? <ChevronUp className="text-gray-500" /> : <ChevronDown className="text-gray-500" />}
              </button>

              {openIndex === index && (
                <div className="p-4 bg-white text-gray-600 border-t border-gray-200 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 14. BrandBanner Component
const BrandBanner: React.FC = () => {
  return (
    <section className="py-6 px-4 bg-gray-900">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-gray-400 text-sm">
          QuickChef este un brand distribuit exclusiv de <strong className="text-white">Ionizi</strong> - Distribuitor oficial autorizat
        </p>
      </div>
    </section>
  );
};

// Footer Component
const Footer: React.FC = () => {
  return (
    <div className="w-full border-t border-gray-200 bg-gray-50" style={{ display: 'block' }}>
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-12">
        <div className="text-center mb-8 pb-8 border-b border-gray-200">
          <p className="text-sm text-gray-600">
            Aveți nevoie de ajutor: <a href="mailto:info@ionizi.com" className="text-blue-600 hover:underline">info@ionizi.com</a>
          </p>
          <p className="text-xs text-gray-400 mt-2">
            QuickChef este o marcă înregistrată distribuită exclusiv de Ionizi.com - Distribuitor Oficial Autorizat.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/images/ionizi_logo.png"
                alt="Ionizi"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-sm text-gray-600 mb-4">
              Magazinul dvs. online de încredere pentru electrocasnice și articole esențiale de zi cu zi. Produse de calitate livrate în toată Europa.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Despre noi</h3>
            <p className="text-sm text-gray-600">
              Ne specializăm în furnizarea de aparate de aer condiționat, încălzitoare, electrocasnice de bucătărie și dispozitive mici pentru casă de înaltă calitate.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Informații</h3>
            <ul className="space-y-3">
              <li><Link href="/contact" className="text-sm text-gray-600 hover:text-orange-600 transition-colors">Contact</Link></li>
              <li><Link href="/shipping" className="text-sm text-gray-600 hover:text-orange-600 transition-colors">Livrare și returnări</Link></li>
              <li><Link href="/terms" className="text-sm text-gray-600 hover:text-orange-600 transition-colors">Termeni și condiții</Link></li>
              <li><Link href="/privacy" className="text-sm text-gray-600 hover:text-orange-600 transition-colors">Politica de confidențialitate</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600">© 2025 Ionizi. Toate drepturile rezervate.</p>
            <p className="text-sm text-gray-600 mt-4 md:mt-0">Livrare rapidă în toată Europa</p>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 py-4 px-4 text-center text-xs text-gray-500 border-t border-gray-200">
        <p>Această pagină nu face parte din site-ul Facebook sau Facebook Inc. De asemenea, această pagină nu este în niciun fel aprobată de Facebook. FACEBOOK este o marcă înregistrată a FACEBOOK, Inc.</p>
      </div>
    </div>
  );
};

// 16. StickyMobileCTA Component
const StickyMobileCTA: React.FC<{ scrollToForm: () => void }> = ({ scrollToForm }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-[0_-4px_15px_-3px_rgba(0,0,0,0.1)] z-50 md:hidden animate-slide-up pb-safe">
      <div className="flex items-center justify-between px-4 py-3 gap-4">
        <div className="flex flex-col">
          <span className="text-xs text-gray-400 line-through">912 lei</span>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-extrabold text-red-600">456 lei</span>
          </div>
        </div>

        <div className="flex-grow">
          <Button onClick={scrollToForm} fullWidth size="md" className="shadow-none py-3 text-lg" icon={<ShoppingCart size={18} />}>
            COMANDA ACUM
          </Button>
        </div>
      </div>
    </div>
  );
};

// --- MAIN PAGE COMPONENT ---

export default function Home() {
  useEffect(() => {
    const fpScript = document.createElement('script');
    fpScript.src = 'https://offers.italiadrop.com/forms/tmfp/';
    fpScript.crossOrigin = 'anonymous';
    fpScript.defer = true;
    document.head.appendChild(fpScript);
  }, []);

  const scrollToForm = () => {
    const formElement = document.getElementById('order-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen bg-white font-sans text-gray-900 pb-20 md:pb-0">
      {/* Network Click Pixel */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`https://offers.italiadrop.com/forms/api/ck/?o=${NETWORK_CONFIG.offer}&uid=${NETWORK_CONFIG.uid}&lp=${NETWORK_CONFIG.lp}`} style={{width:'1px',height:'1px',display:'none'}} alt="" />
      <StickyHeader />
      <Hero scrollToForm={scrollToForm} />
      <SocialProof />
      <ProblemAgitation scrollToForm={scrollToForm} />
      <HowItWorks />
      <FeaturesGrid />
      <ComparisonTable scrollToForm={scrollToForm} />
      <WhatsIncluded />
      <Reviews />
      <OrderForm />
      <Faq />
      <BrandBanner />
      <Footer />
      <StickyMobileCTA scrollToForm={scrollToForm} />
    </main>
  );
}
