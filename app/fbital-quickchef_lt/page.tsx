'use client';

import React, { useState, useEffect } from 'react';
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

// --- TYPES ---

interface Review {
  id: number;
  name: string;
  age: number;
  location: string;
  stars: number;
  text: string;
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
            Uzdaryti
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
          <Truck size={14} /> PRISTATYMAS 24/48H
        </div>
        <div className="hidden sm:inline">|</div>
        <div className="flex items-center gap-1 text-yellow-300">
          <Banknote size={14} /> MOKEJIMAS PRISTATYMO METU
        </div>
        <div className="hidden sm:inline">|</div>
        <div className="flex items-center gap-1">
          <ShieldCheck size={14} /> 2 METU GARANTIJA
        </div>
        <div className="hidden md:inline">|</div>
        <div className="hidden md:flex items-center gap-1">
          <Phone size={14} /> LIETUVISKA KLIENTU APTARNAVIMAS
        </div>
      </div>
    </div>
  );
};

// 4. Hero Component
const carouselImages = [
  "/images/quickchef img/quickchef-hero1.jpg",
  "/images/quickchef img/quickchef-hero2.jpg",
  "/images/quickchef img/quickchef-hero3.jpg",
  "/images/quickchef img/quickchef-hero4.jpg",
];

const benefits = [
  <span key="1"><strong className="text-red-700">NAUJOVE EKSKLIUZYVINE:</strong> Automatinis ingredientu dozavimas (viską daro pats)</span>,
  <span key="2"><strong className="text-gray-900">45 Funkcijos 1-ame:</strong> isskirtinis robotas rinkoje</span>,
  <span key="3">Lietimui jautrus ekranas <strong className="text-gray-900">7" SoftScreen</strong> didelis ir aiškus - veda zingsnis po zingsnio</span>,
  <span key="4">Programele su <strong className="text-gray-900">1000+ receptu</strong> - pasirinkite ir sekite kaip pamoka</span>,
  <span key="5">Funkcija <strong className="text-gray-900">"Kas šaldytuve?"</strong> - taupote pirkiniams</span>,
  <span key="6"><strong className="text-gray-900">Integruotos svarstykles</strong> tikslios iki gramo - nebera "apytikriu" dozavimo</span>,
  <span key="7">Keraminis <strong className="text-gray-900">nelimpantis indas</strong> - niekas nepridega, išsivalote akimirksniu</span>,
  <span key="8">Kepimas iki <strong className="text-gray-900">180C</strong> + tikras kepinimas</span>,
  <span key="9">Sistema <strong className="text-gray-900">OneClick</strong> - keiciate priedus be jokio ardymo</span>,
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
          <span className="text-red-600 block mb-2 text-xl md:text-2xl uppercase tracking-wide">Pavargote gaišti laika virtuveje?</span>
          Atraskite Pirmaji Robota, kuris <span className="bg-yellow-200 px-2">Pats Prideda Ingredientus.</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-700 mb-6 max-w-2xl mx-auto leading-relaxed">
          Pamirškite puodus ir stresa. Sudekite viską i dozatoriu, pasirinkite recepta ekrane ir <strong className="text-gray-900">jis gamina uz jus, kol jus ilsites.</strong>
          <br className="my-2"/>
          <strong className="text-green-700 bg-green-50 px-3 py-1 rounded inline-block mt-2 border border-green-200 shadow-sm">Puikus rezultatas (net jei nemokate gaminti)</strong>
        </p>

        <div className="relative mb-8 rounded-xl overflow-hidden shadow-2xl border-4 border-gray-100 max-w-xl mx-auto group bg-gray-100">
           <div className="relative aspect-square w-full">
             <img
               src={carouselImages[currentSlide]}
               alt={`Virtuves robotas ${currentSlide + 1}`}
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
                   aria-label={`Eiti i ${idx + 1} skaidre`}
                 />
               ))}
             </div>
           </div>
        </div>

        <div className="bg-yellow-50/60 rounded-xl p-6 md:p-8 mb-8 text-left max-w-2xl mx-auto border-2 border-yellow-200 shadow-sm">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 text-center leading-tight">
              Robotas, kuris leidzia gaminti kaip šefui <br className="hidden sm:block"/>be jokio netvarkos
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
            Ribotas pasiulymas - Tik šiandien
          </div>

          <div className="flex flex-col items-center justify-center mb-6 mt-6">
             <div className="text-gray-400 font-medium uppercase text-sm tracking-widest mb-1">Akcine kaina</div>
             <div className="flex items-center gap-3">
               <span className="text-gray-400 line-through text-2xl decoration-2">138 EUR</span>
               <span className="text-5xl md:text-6xl font-black text-red-600 tracking-tighter">69 EUR</span>
             </div>
             <span className="bg-green-100 text-green-800 font-bold px-3 py-1 rounded-full text-sm mt-2 border border-green-200">-50% NUOLAIDA</span>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-100 text-left space-y-4">
             <div className="flex items-center gap-3 border-b border-gray-200 pb-3 last:border-0 last:pb-0">
               <div className="bg-green-100 p-2 rounded-full text-green-700 shrink-0">
                 <Truck size={24} strokeWidth={2} />
               </div>
               <div>
                 <p className="font-bold text-gray-900 leading-none text-lg">Greitas pristatymas</p>
                 <p className="text-sm text-gray-500 mt-1">Pristatymas per 24/48 valandas</p>
               </div>
             </div>

             <div className="flex items-center gap-3 border-b border-gray-200 pb-3 last:border-0 last:pb-0">
               <div className="bg-yellow-100 p-2 rounded-full text-yellow-700 shrink-0">
                 <Banknote size={24} strokeWidth={2} />
               </div>
               <div>
                 <p className="font-bold text-gray-900 leading-none text-lg">Mokate tik pristatymo metu</p>
                 <p className="text-sm text-gray-500 mt-1">Be išankstinio mokejimo, grynaisiais kurjeriui</p>
               </div>
             </div>

             <div className="flex items-center gap-3">
               <div className="bg-blue-100 p-2 rounded-full text-blue-700 shrink-0">
                 <ShieldCheck size={24} strokeWidth={2} />
               </div>
               <div>
                 <p className="font-bold text-gray-900 leading-none text-lg">2 metu garantija</p>
                 <p className="text-sm text-gray-500 mt-1">Technine pagalba itraukta</p>
               </div>
             </div>
          </div>

          <Button onClick={scrollToForm} fullWidth pulse size="xl" subtext="Kredito kortele nereikalinga">
            UZSAKYTI DABAR SU NUOLAIDA
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
          4,8/5 remiantis daugiau nei 3.000 atsiliepimu
        </h3>
        <p className="text-lg text-gray-600 italic mb-6">
          "Pagaliau gerai gaminu be jokio streso."
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          <div className="flex flex-col items-center gap-2 p-3 bg-white rounded-lg shadow-sm">
            <ThumbsUp className="text-blue-600" />
            <span className="font-bold text-gray-700">Paprasta</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-3 bg-white rounded-lg shadow-sm">
            <Clock className="text-green-600" />
            <span className="font-bold text-gray-700">Greita</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-3 bg-white rounded-lg shadow-sm">
            <Zap className="text-yellow-500" />
            <span className="font-bold text-gray-700">Nelimpantis</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-3 bg-white rounded-lg shadow-sm">
            <ChefHat className="text-red-500" />
            <span className="font-bold text-gray-700">Receptai su gidu</span>
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
            Jei atpazįstate save šiose situacijose... <br/>šis robotas pakeis jusu gyvenima.
          </h2>

          <ul className="space-y-5 mb-8">
            <li className="flex items-start gap-3">
              <div className="bg-red-100 p-1 rounded-full shrink-0 mt-1">
                <X className="text-red-600" size={22} strokeWidth={3} />
              </div>
              <span className="text-lg text-gray-800">Atidarote šaldytuva ir <strong className="text-red-700">nezinote ka gaminti.</strong></span>
            </li>
            <li className="flex items-start gap-3">
              <div className="bg-red-100 p-1 rounded-full shrink-0 mt-1">
                <X className="text-red-600" size={22} strokeWidth={3} />
              </div>
              <span className="text-lg text-gray-800">Receptai išeina <strong className="text-red-700">"mazdaug"</strong> ir prarandate nora.</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="bg-red-100 p-1 rounded-full shrink-0 mt-1">
                <X className="text-red-600" size={22} strokeWidth={3} />
              </div>
              <span className="text-lg text-gray-800"><strong>Sutepate tuziną puodu</strong> ir valandas praleidziate valydami.</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="bg-red-100 p-1 rounded-full shrink-0 mt-1">
                <X className="text-red-600" size={22} strokeWidth={3} />
              </div>
              <span className="text-lg text-gray-800">Galutinai <strong>uzsisakote greitaji maista</strong> ir isleidziate per daug.</span>
            </li>
          </ul>

          <div className="text-center bg-white p-6 rounded-lg border border-gray-100 shadow-md">
            <p className="text-xl font-bold text-green-700 mb-6 leading-tight">
              Nuo šiandien automatiškai gaminate sveikus patiekalus,<br/> net <span className="underline decoration-green-500 decoration-4">be patirties.</span>
            </p>
            <Button onClick={scrollToForm} variant="primary" size="lg" className="mx-auto">
              TAIP, NORIU - MOKESIU PRISTATYMO METU
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
          Kaip tai veikia?
        </h2>
        <p className="text-lg text-gray-600 mb-8">Paprasčiau nei mikrobange. <strong className="text-gray-900">Viską daro pats:</strong></p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md border-b-4 border-green-500 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-green-500"></div>
            <div className="w-12 h-12 bg-green-100 text-green-700 font-bold text-2xl rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-green-200">1</div>
            <h3 className="font-bold text-xl mb-2">Uzpildykite dozatoriu</h3>
            <p className="text-gray-600">Sudekite ingredientus i <strong className="text-gray-900">6 skyrius</strong>. Nereikia sverti iš anksto, tai atlieka svarstykles.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-b-4 border-green-500 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-2 bg-green-500"></div>
            <div className="w-12 h-12 bg-green-100 text-green-700 font-bold text-2xl rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-green-200">2</div>
            <h3 className="font-bold text-xl mb-2">Pasirinkite recepta</h3>
            <p className="text-gray-600">Pasirinkite iš <strong className="text-gray-900">7" lietimui jautraus ekrano</strong> arba programeles iš 1000+ patiekalu su gidu.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-b-4 border-green-500 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-2 bg-green-500"></div>
            <div className="w-12 h-12 bg-green-100 text-green-700 font-bold text-2xl rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-green-200">3</div>
            <h3 className="font-bold text-xl mb-2">Paspauskite START ir eikite</h3>
            <p className="text-gray-600">Jis dozuoja ingredientus <strong className="text-gray-900">tinkamu momentu</strong>, gamina ir maišo. Praneša, kai paruošta!</p>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 text-blue-900 p-5 rounded-lg inline-block text-base md:text-lg shadow-sm">
          <span className="font-bold">QUICKSENSE TECHNOLOGIJA:</span> Vienintelis robotas, kuris pats prideda ingredientus gaminimo metu. <br/>
          <span className="text-sm text-blue-700">Nereikia stoveti šalia!</span>
        </div>
      </div>
    </section>
  );
};

// 8. FeaturesGrid Component
const features: FeatureBox[] = [
  {
    id: 1,
    title: "Niekada nesuklysite",
    description: "Sekite ekrana ir robotas viską dozuoja. 100% garantuotas rezultatas.",
    imageUrl: "/images/quickchef img/feature-1.jpg"
  },
  {
    id: 2,
    title: "Viską daro pats",
    description: "Deju automatinio DOZATORIAUS nereikia prideti ingredientu gaminimo metu.",
    imageUrl: "/images/quickchef img/feature-2.jpg"
  },
  {
    id: 3,
    title: "Funkcija Ištuštink-šaldytuva",
    description: "Irašykite, ka turite šaldytuve, i programele ir ji sukurs tobula recepta. Nulis švaistymo.",
    imageUrl: "/images/quickchef img/feature-3.jpg"
  },
  {
    id: 4,
    title: "Keraminis nelimpantis",
    description: "Unique indas su keraminiu padengimu: niekada nelimpa ir išsivalo vienu mostu.",
    imageUrl: "/images/quickchef img/feature-4.jpg"
  },
  {
    id: 5,
    title: "45 Funkcijos 1-ame",
    description: "Smulkina, minko, garina, fermentuoja, slow cooking, jogurtas... pakeicia 10 prietaisu.",
    imageUrl: "/images/quickchef img/feature-5.jpg"
  },
  {
    id: 6,
    title: "Šefo rezultatai",
    description: "Aksominiai kremai, tobulos picos tešlos, tiršti padažai. Viskas automatiškai.",
    imageUrl: "/images/quickchef img/feature-6.jpg"
  }
];

const FeaturesGrid: React.FC = () => {
  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900">
          Kodel visi ji renkasi:
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
          Greitas palyginimas (be aplinkiniu keliu)
        </h2>

        <div className="bg-white rounded-xl shadow-xl overflow-hidden border-2 border-gray-100">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b-2 border-gray-300">
                <th className="p-4 text-gray-600 font-bold text-sm md:text-base w-1/3 uppercase tracking-wider">Savybe</th>
                <th className="p-4 bg-green-50 text-green-800 font-extrabold text-center border-l border-r border-green-200 w-1/3 text-sm md:text-xl shadow-inner">
                  QuickChef
                </th>
                <th className="p-4 text-gray-400 font-medium text-center text-sm md:text-base w-1/3">
                  Kiti robotai
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                [<span key="1">Automatinis dozatorius <br/><span className="text-xs font-normal text-gray-500">(Pats prideda ingredientus)</span></span>, true, "Nera (Darote patys)"],
                [<span key="2">Viso funkciju</span>, "45 (Išsamiausias)", "Apie 12-20"],
                [<span key="3">Lietimui jautrus ekranas</span>, "7\" SoftScreen", "Mazas arba nera"],
                [<span key="4">Programele + Ištuštink-šaldytuva</span>, "Taip (1000+ Receptu)", "Mazai receptu"],
                [<span key="5">Indo medziaga</span>, "Keraminis nelimpantis", "Plienas (Limpa)"],
                [<span key="6">Talpa</span>, "3,3L (Šeimai)", "2,2L (Maza)"],
                [<span key="7">Valymas</span>, "Savarankiškas + Indaplove", "Varginantis rankomis"],
              ].map(([feature, isUs, them], idx) => (
                <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="p-3 md:p-4 font-bold text-gray-800 text-sm md:text-base align-middle">{feature}</td>
                  <td className="p-3 md:p-4 bg-green-50 border-l border-r border-green-100 text-center align-middle">
                    {isUs === true ? <Check className="inline-block text-green-600" size={28} strokeWidth={4} /> : <span className="font-extrabold text-green-700 text-lg">{isUs}</span>}
                  </td>
                  <td className="p-3 md:p-4 text-center text-gray-500 text-sm md:text-base align-middle">
                    {them}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 text-center">
          <Button onClick={scrollToForm} variant="primary" size="lg">
            GAUKITE DABAR - MOKATE PRISTATYMO METU
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
               PILNAS KOMPLEKTAS
             </div>
             <div className="aspect-square w-full rounded-xl shadow-2xl border-4 border-white overflow-hidden transform -rotate-2 hover:rotate-0 transition-transform duration-500 bg-white">
                <img
                  src="/images/quickchef img/box-content.jpg"
                  alt="QuickChef pakuotes turinys"
                  className="w-full h-full object-cover"
                />
             </div>
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Package className="text-blue-600" size={32} /> Ka rasite pakuoteje:
            </h2>
            <ul className="space-y-4">
              {[
                <span key="1">Robotas <strong>QuickChef 45 Funkcijos</strong></span>,
                <span key="2">Indas <strong>Keraminis Nelimpantis (3,3L)</strong></span>,
                <span key="3"><strong className="text-blue-700">Automatinis Dozatorius</strong> QuickSense</span>,
                <span key="4">Priedas <strong>Saute mentelė</strong> (rizotams/padažams)</span>,
                <span key="5">XL garintuvas 2 lygiu</span>,
                <span key="6">Pjaustymo rinkinys: Peiliukai, Drugelis, Šaukštas</span>,
                <span key="7"><strong className="text-green-700">PREMIJA:</strong> Premium programele su 1000+ Receptu</span>,
                <span key="8"><strong className="text-gray-900">2 metu garantija</strong></span>
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
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">Pristatymas</p>
                      <p className="font-bold text-gray-900 text-lg leading-none mt-1">Greitas 24/48h</p>
                  </div>
              </div>

              <div className="flex items-center gap-3 p-2 border-t sm:border-t-0 sm:border-l border-gray-100">
                  <div className="bg-yellow-100 p-3 rounded-full text-yellow-700 shrink-0">
                      <Banknote size={24} />
                  </div>
                  <div>
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">Mokejimas</p>
                      <p className="font-bold text-gray-900 text-lg leading-none mt-1">Pristatymo metu</p>
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
  { id: 1, name: "Ruta", age: 57, location: "Vilnius", stars: 5, text: "Niekada nebuvau gera virėja... su šituo viskas puikiai pavyksta. Ekranas parodo, ka daryti, labai patogu." },
  { id: 2, name: "Jonas", age: 63, location: "Kaunas", stars: 5, text: "Gaminti darėsi nuobodu. Dabar sudėju viską ir jis gamina. Valyti daug paprasčiau." },
  { id: 3, name: "Elena", age: 41, location: "Klaipeda", stars: 5, text: "Dirbu ir neturiu laiko. Tai išgelbsti vakarais. Net tešlos ir padažai puikiai išeina." },
  { id: 4, name: "Paulius", age: 52, location: "Šiauliai", stars: 5, text: "Integruotos svarstyklės yra nuostabios, pagaliau nesuklystu su kiekiais... anksčiau išmesdavau pusę receptų." },
  { id: 5, name: "Ana", age: 60, location: "Panevežys", stars: 5, text: "Indas nelimpa, tai mane įtikino. Anksčiau visada reikėjo grandyti." },
  { id: 6, name: "Saulė", age: 35, location: "Alytus", stars: 5, text: "Programėlė su receptais labai naudinga... o funkcija 'kas šaldytuve' yra geniali, nebešvaistau nieko." }
];

const Reviews: React.FC = () => {
  return (
    <section className="py-12 px-4 bg-white border-t border-gray-200">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          Tikri klientu atsiliepimai
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviewsList.map((review) => (
            <div key={review.id} className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-bold text-gray-900">{review.name}, {review.age} m.</h4>
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
                <span className="w-2 h-2 bg-green-500 rounded-full"></span> Patvirtintas pirkimas
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

    if (!formData.firstName || !formData.phone || !formData.fullAddress) {
      alert("Prašome uzpildyti visus privalomus laukus");
      return;
    }

    setIsSubmitting(true);

    try {
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

      // Save user data for Facebook tracking
      saveUserData(userData);

      // Track Lead event for Facebook
      await trackLeadEvent(userData, {
        content_name: 'QuickChef',
        currency: 'EUR',
        value: 69
      });

      // Redirect to thank you page
      window.location.href = '/fb-ty/ty-fb-lt';
    } catch (error) {
      console.error('Form submission error:', error);
      // Still redirect on error
      window.location.href = '/fb-ty/ty-fb-lt';
    }
  };

  return (
    <section id="order-form" className="py-12 px-4 bg-red-50 border-t-4 border-red-600 scroll-mt-20">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="bg-red-600 p-6 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-white opacity-10 transform -skew-x-12"></div>
          <h2 className="text-2xl md:text-3xl font-extrabold mb-2 uppercase relative z-10">
            Uzsakymo forma
          </h2>
          <p className="font-medium opacity-90 relative z-10">Uzpildykite ir gaukite 50% nuolaida</p>
        </div>

        <div className="bg-yellow-100 p-3 text-center border-b border-yellow-200">
          <p className="text-red-700 font-bold text-sm animate-pulse">
            Didelė paklausa: tik 7 vienetai šia kaina!
          </p>
        </div>

        <div className="p-5 md:p-8">
          <div className="flex justify-between items-center mb-6 pb-6 border-b border-gray-200 bg-gray-50 p-4 rounded-lg">
            <div>
              <p className="text-gray-500 line-through text-sm">Kaina: 138 EUR</p>
              <p className="text-red-600 font-bold text-2xl">Viso: 69 EUR</p>
            </div>
            <div className="text-right">
              <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded border border-blue-200">GREITAS PRISTATYMAS</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-700 font-bold mb-1 text-sm uppercase tracking-wide">Vardas ir Pavarde *</label>
              <input
                type="text"
                name="firstName"
                required
                autoComplete="name"
                className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-green-500 outline-none transition-colors text-lg"
                placeholder="Pvz.: Jonas Jonaitis"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-1 text-sm uppercase tracking-wide">Telefonas (Mobilusis) *</label>
              <input
                type="tel"
                name="phone"
                required
                autoComplete="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-green-500 outline-none transition-colors text-lg"
                placeholder="Pvz.: +370 612 34567"
                value={formData.phone}
                onChange={handleChange}
              />
              <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                <ShieldCheck size={12}/> Svarbu pristatymo patvirtinimui
              </p>
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-1 text-sm uppercase tracking-wide">Pilnas adresas (Gatvė, Nr., Miestas, Pašto kodas) *</label>
              <textarea
                name="fullAddress"
                required
                autoComplete="street-address"
                className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-green-500 outline-none transition-colors text-lg h-32"
                placeholder="Pvz.: Gedimino pr. 10, LT-01103 Vilnius"
                value={formData.fullAddress}
                onChange={handleChange}
              />
            </div>

            <div className="bg-gray-50 p-4 rounded border border-gray-200 mt-4 cursor-pointer hover:bg-gray-100 transition-colors">
               <label className="flex items-start gap-3 cursor-pointer pointer-events-none">
                 <input type="radio" checked readOnly className="w-5 h-5 text-green-600 mt-1" />
                 <div>
                   <span className="block font-bold text-gray-800">Mokejimas pristatymo metu (Grynaisiais)</span>
                   <span className="block text-xs text-gray-500">Mokate tiesiogiai kurjeriui, kai gausite siuntini. Be rizikos.</span>
                 </div>
               </label>
            </div>

            <Button type="submit" fullWidth pulse variant="primary" className="mt-6 shadow-xl text-xl" disabled={isSubmitting}>
              {isSubmitting ? 'SIUNČIAMA...' : 'PATVIRTINTI UZSAKYMA'}
            </Button>

            <div className="flex justify-center items-center gap-4 text-xs text-gray-400 mt-4">
              <span className="flex items-center gap-1"><Lock size={12}/> SSL saugus 256-bit</span>
              <span className="flex items-center gap-1"><Truck size={12}/> Greitas pristatymas</span>
            </div>

          </form>
        </div>
      </div>
    </section>
  );
};

// 13. Faq Component
const faqs: FaqItem[] = [
  { question: "Ar galiu moketi pristatymo metu?", answer: "Taip, zinoma. Mokate grynaisiais tiesiogiai kurjeriui, kai gausite siuntini. Išankstinio mokejimo nereikia." },
  { question: "Kiek laiko trunka pristatymas?", answer: "Siunčiame greitu pristatymu per 24/48 darbo valandas i visa Lietuva." },
  { question: "Ar reikia moketi gaminti?", answer: "Ne! Robotas veda jus zingsnis po zingsnio per lietimui jautru ekrana ir programele. Sukurtas tiems, kas neturi laiko ar noro gaminti, bet nori valgyti skaniai." },
  { question: "Ar lengva išvalyti?", answer: "Taip, turi savarankiško valymo funkcija, o indas turi keramini nelimpanti padengima, kuris išsivalo vienu šluostymu." },
  { question: "Ka galiu gaminti?", answer: "Beveik viską: rizotus, pastas, kremu sriubas, garintas (zuvis/darzoves), picos ir duonos tešlas, desertus, jogurta ir dar daug daugiau." },
  { question: "O jei man netinka?", answer: "Turite 2 metu garantija. Be to, siulome klientu aptarnavima lietuviu kalba bet kokiems klausimams ar problemoms." }
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
          Dažniausiai uzduodami klausimai
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
          QuickChef yra prekės zenklas, platinamas išskirtinai <strong className="text-white">Ionizi</strong> - Oficialus iįgaliotas platintojas
        </p>
      </div>
    </section>
  );
};

// 15. Footer Component
const Footer: React.FC = () => {
  const [modalOpen, setModalOpen] = useState<'privacy' | 'terms' | null>(null);

  const privacyContent = (
    <>
      <p><strong>Privatumo politika (BDAR)</strong></p>
      <p>Šiame puslapyje surinkti duomenys (Vardas, Telefonas, Adresas) naudojami išskirtinai jusu QuickChef roboto uzsakymo apdorojimui ir pristatymui.</p>
      <p>Jusu duomenys niekada nebus parduoti tretiesiems asmenims. Mokejimas atliekamas pristatymo metu, todėl mes nerenkame kredito korteliu duomenu.</p>
      <p>Duomenu valdytojas: Ionizi Ltd.</p>
    </>
  );

  const termsContent = (
    <>
      <p><strong>Pardavimo salygos ir taisykles</strong></p>
      <p>1. <strong>Mokejimas:</strong> Mokejimas atliekamas pilnai grynaisiais pristatymo metu kurjeriui.</p>
      <p>2. <strong>Pristatymas:</strong> Pristatymas vykdomas per 24/48 darbo valandas greitu pristatymu.</p>
      <p>3. <strong>Atsisakymo teise:</strong> Klientas turi teise atsisakyti per 14 dienu nuo produkto gavimo.</p>
      <p>4. <strong>Garantija:</strong> Visiems produktams taikoma 24 menesiu teisine garantija del atitikties defektu.</p>
    </>
  );

  return (
    <>
      <footer className="bg-gray-900 text-gray-400 py-12 px-4 text-center text-sm border-t border-gray-800">
        <div className="max-w-4xl mx-auto">
          <p className="mb-6 font-semibold text-gray-300">&copy; {new Date().getFullYear()} Ionizi. Visos teises saugomos.</p>

          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <button onClick={() => setModalOpen('privacy')} className="hover:text-white underline underline-offset-4 decoration-gray-600 hover:decoration-white transition-all">
              Privatumo politika
            </button>
            <button onClick={() => setModalOpen('terms')} className="hover:text-white underline underline-offset-4 decoration-gray-600 hover:decoration-white transition-all">
              Salygos ir taisykles
            </button>
            <button onClick={() => setModalOpen('terms')} className="hover:text-white underline underline-offset-4 decoration-gray-600 hover:decoration-white transition-all">
              Pristatymas ir grazinimas
            </button>
          </div>

          <div className="text-xs text-gray-600 max-w-2xl mx-auto leading-relaxed border-t border-gray-800 pt-6">
            <p className="mb-2">Ši svetaine nera Facebook svetaines ar Facebook Inc. dalis. Be to, ši svetaine nera jokiu budu patvirtinta Facebook. FACEBOOK yra FACEBOOK, Inc. prekės zenklas.</p>
            <p>Vaizdai pateikti iliustraciniais tikslais. Atsiliepimai yra tikru musu klientu patirtys, taciau rezultatai gali skirtis priklausomai nuo asmens.</p>
          </div>
        </div>
      </footer>

      <Modal
        isOpen={modalOpen === 'privacy'}
        onClose={() => setModalOpen(null)}
        title="Privatumo politika"
        content={privacyContent}
      />
      <Modal
        isOpen={modalOpen === 'terms'}
        onClose={() => setModalOpen(null)}
        title="Salygos ir taisykles"
        content={termsContent}
      />
    </>
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
          <span className="text-xs text-gray-400 line-through">138 EUR</span>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-extrabold text-red-600">69 EUR</span>
          </div>
        </div>

        <div className="flex-grow">
          <Button onClick={scrollToForm} fullWidth size="md" className="shadow-none py-3 text-lg" icon={<ShoppingCart size={18} />}>
            UZSAKYTI DABAR
          </Button>
        </div>
      </div>
    </div>
  );
};

// --- MAIN PAGE COMPONENT ---

export default function Home() {
  const scrollToForm = () => {
    const formElement = document.getElementById('order-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen bg-white font-sans text-gray-900 pb-20 md:pb-0">
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
