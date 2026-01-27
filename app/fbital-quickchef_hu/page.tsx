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
            Bezar
          </button>
        </div>
      </div>
    </div>
  );
};

// 3. BrandBanner Component
const BrandBanner: React.FC = () => {
  return (
    <div className="bg-gray-900 text-white py-2 px-4">
      <div className="max-w-6xl mx-auto flex justify-center items-center">
        <span className="text-sm font-semibold tracking-wide">IONIZI</span>
      </div>
    </div>
  );
};

// 4. StickyHeader Component
const StickyHeader: React.FC = () => {
  return (
    <div className="sticky top-0 z-50 w-full bg-red-700 text-white text-xs sm:text-sm font-bold shadow-md">
      <div className="max-w-6xl mx-auto px-2 py-2 flex flex-wrap justify-center items-center gap-x-4 gap-y-1 text-center">
        <div className="flex items-center gap-1">
          <Truck size={14} /> SZALLITAS 24/48 ORA
        </div>
        <div className="hidden sm:inline">|</div>
        <div className="flex items-center gap-1 text-yellow-300">
          <Banknote size={14} /> UTANVETTEL FIZET
        </div>
        <div className="hidden sm:inline">|</div>
        <div className="flex items-center gap-1">
          <ShieldCheck size={14} /> 2 EV GARANCIA
        </div>
        <div className="hidden md:inline">|</div>
        <div className="hidden md:flex items-center gap-1">
          <Phone size={14} /> UGYFELSZOLGALAT
        </div>
      </div>
    </div>
  );
};

// 5. Hero Component
const carouselImages = [
  "/images/quickchef img/1.png",
  "/images/quickchef img/2.png",
  "/images/quickchef img/3.png",
  "/images/quickchef img/4.png",
  "/images/quickchef img/5.png",
];

const benefits = [
  <span key="1"><strong className="text-red-700">EXKLUZIV UJDONSAG:</strong> Automatikus hozzavalo-adagolas (mindent magatok csinal)</span>,
  <span key="2"><strong className="text-gray-900">45 funkcio 1-ben:</strong> a legteljesebb konyhai robot a piacon</span>,
  <span key="3">Erintokepernyo <strong className="text-gray-900">7&quot; SoftScreen</strong> nagy es tiszta - lepesrol lepesre vezet</span>,
  <span key="4">App <strong className="text-gray-900">1000+ recepttel</strong> - valassz es kovesd mint egy tutorial</span>,
  <span key="5"><strong className="text-gray-900">&quot;Mi van a hutomben?&quot;</strong> funkcio - sporolj a bevasarlason</span>,
  <span key="6"><strong className="text-gray-900">Beepitett merleg</strong> grammra pontos - tobbe nem kell &quot;szemre&quot; adagolni</span>,
  <span key="7"><strong className="text-gray-900">Keramia bevonat</strong> - nem eg oda, pillanatok alatt tisztithato</span>,
  <span key="8">Fozesi homerseklet <strong className="text-gray-900">180°C-ig</strong> + igazi parolas</span>,
  <span key="9"><strong className="text-gray-900">OneClick</strong> rendszer - kiegeszitok csereje szereles nelkul</span>,
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
          <span className="text-red-600 block mb-2 text-xl md:text-2xl uppercase tracking-wide">Eleged van a konyhaban toltott idopazarlasbol?</span>
          Fedezd fel az elso robotot, amely <span className="bg-yellow-200 px-2">magatok adagolja a hozzavalokat.</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-700 mb-6 max-w-2xl mx-auto leading-relaxed">
          Felejtsd el az edenyeket es a stresszt. Tedd be mindent az adagoloba, valaszd ki a receptet a kepernyorol es <strong className="text-gray-900">o foz helyetted, mig te pihensz.</strong>
          <br className="my-2"/>
          <strong className="text-green-700 bg-green-50 px-3 py-1 rounded inline-block mt-2 border border-green-200 shadow-sm">Tokeletes eredmeny (meg ha nem is tudsz fozni)</strong>
        </p>

        <div className="relative mb-8 rounded-xl overflow-hidden shadow-2xl border-4 border-gray-100 max-w-xl mx-auto group bg-gray-100">
           <div className="relative aspect-square w-full">
             <img
               src={carouselImages[currentSlide]}
               alt={`Konyhai robot ${currentSlide + 1}. kep`}
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
                   aria-label={`Ugras a ${idx + 1}. kephez`}
                 />
               ))}
             </div>
           </div>
        </div>

        <div className="bg-yellow-50/60 rounded-xl p-6 md:p-8 mb-8 text-left max-w-2xl mx-auto border-2 border-yellow-200 shadow-sm">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 text-center leading-tight">
              A robot, amivel sefkent fozhetsz <br className="hidden sm:block"/>anelkul, hogy osszekoszolnad a konyhad
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
            Limitalt Ajanlat - Csak Ma
          </div>

          <div className="flex flex-col items-center justify-center mb-6 mt-6">
             <div className="text-gray-400 font-medium uppercase text-sm tracking-widest mb-1">Akcios Ar</div>
             <div className="flex items-center gap-3">
               <span className="text-gray-400 line-through text-2xl decoration-2">71 164 Ft</span>
               <span className="text-5xl md:text-6xl font-black text-red-600 tracking-tighter">35 582 Ft</span>
             </div>
             <span className="text-green-600 font-bold text-lg mt-2">-50% KEDVEZMENY</span>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-100 text-left space-y-4">
             <div className="flex items-center gap-3 border-b border-gray-200 pb-3 last:border-0 last:pb-0">
               <div className="bg-green-100 p-2 rounded-full text-green-700 shrink-0">
                 <Truck size={24} strokeWidth={2} />
               </div>
               <div>
                 <p className="font-bold text-gray-900 leading-none text-lg">Gyors Szallitas</p>
                 <p className="text-sm text-gray-500 mt-1">Garantalt kiszallitas 24/48 ora alatt</p>
               </div>
             </div>

             <div className="flex items-center gap-3 border-b border-gray-200 pb-3 last:border-0 last:pb-0">
               <div className="bg-yellow-100 p-2 rounded-full text-yellow-700 shrink-0">
                 <Banknote size={24} strokeWidth={2} />
               </div>
               <div>
                 <p className="font-bold text-gray-900 leading-none text-lg">Fizetes Atvételkor</p>
                 <p className="text-sm text-gray-500 mt-1">Nincs eloleg, keszpenzben a futarnak</p>
               </div>
             </div>

             <div className="flex items-center gap-3">
               <div className="bg-blue-100 p-2 rounded-full text-blue-700 shrink-0">
                 <ShieldCheck size={24} strokeWidth={2} />
               </div>
               <div>
                 <p className="font-bold text-gray-900 leading-none text-lg">2 Ev Garancia</p>
                 <p className="text-sm text-gray-500 mt-1">Technikai tamogatas benne van</p>
               </div>
             </div>
          </div>

          <Button onClick={scrollToForm} fullWidth pulse size="xl" subtext="Nincs szukseg bankkartya adatokra">
            RENDELD MEG MOST AKCIOSAN
          </Button>
        </div>

        <div className="flex justify-center animate-bounce text-gray-400 mt-4">
            <ArrowDown size={32} />
        </div>
      </div>
    </section>
  );
};

// 6. SocialProof Component
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
          4,8/5 tobb mint 3.000 ertekeles alapjan
        </h3>
        <p className="text-lg text-gray-600 italic mb-6">
          &quot;Vegre jol fozok anelkul, hogy megornulnek.&quot;
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          <div className="flex flex-col items-center gap-2 p-3 bg-white rounded-lg shadow-sm">
            <ThumbsUp className="text-blue-600" />
            <span className="font-bold text-gray-700">Egyszeru</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-3 bg-white rounded-lg shadow-sm">
            <Clock className="text-green-600" />
            <span className="font-bold text-gray-700">Gyors</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-3 bg-white rounded-lg shadow-sm">
            <Zap className="text-yellow-500" />
            <span className="font-bold text-gray-700">Tapadasmentes</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-3 bg-white rounded-lg shadow-sm">
            <ChefHat className="text-red-500" />
            <span className="font-bold text-gray-700">Vezetett receptek</span>
          </div>
        </div>
      </div>
    </section>
  );
};

// 7. ProblemAgitation Component
const ProblemAgitation: React.FC<{ scrollToForm: () => void }> = ({ scrollToForm }) => {
  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="bg-red-50 border border-red-100 rounded-xl p-6 md:p-8 shadow-sm">
          <h2 className="text-2xl md:text-3xl font-bold text-red-700 mb-6 text-center">
            Ha felismered magad ezekben a helyzetekben... <br/>ez a robot megvaltoztatja az eleted.
          </h2>

          <ul className="space-y-5 mb-8">
            <li className="flex items-start gap-3">
              <div className="bg-red-100 p-1 rounded-full shrink-0 mt-1">
                <X className="text-red-600" size={22} strokeWidth={3} />
              </div>
              <span className="text-lg text-gray-800">Kinyitod a hutot es <strong className="text-red-700">nem tudod, mit fozz.</strong></span>
            </li>
            <li className="flex items-start gap-3">
              <div className="bg-red-100 p-1 rounded-full shrink-0 mt-1">
                <X className="text-red-600" size={22} strokeWidth={3} />
              </div>
              <span className="text-lg text-gray-800">A receptek <strong className="text-red-700">&quot;ugy-ahogy&quot;</strong> sikerulnek es elmegy a kedved.</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="bg-red-100 p-1 rounded-full shrink-0 mt-1">
                <X className="text-red-600" size={22} strokeWidth={3} />
              </div>
              <span className="text-lg text-gray-800"><strong>Ezer edenyt koszolsz ossze</strong> es orakat toltesz mosogatással.</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="bg-red-100 p-1 rounded-full shrink-0 mt-1">
                <X className="text-red-600" size={22} strokeWidth={3} />
              </div>
              <span className="text-lg text-gray-800">Vegul <strong>gyorsetelt rendelsz</strong> es tulsokat koltesz.</span>
            </li>
          </ul>

          <div className="text-center bg-white p-6 rounded-lg border border-gray-100 shadow-md">
            <p className="text-xl font-bold text-green-700 mb-6 leading-tight">
              Marol automatikusan fozhetsz egeszsegesen,<br/> meg <span className="underline decoration-green-500 decoration-4">tapasztalat nelkul is.</span>
            </p>
            <Button onClick={scrollToForm} variant="primary" size="lg" className="mx-auto">
              IGEN, KEREM - ATVETKOR FIZETEK
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

// 8. HowItWorks Component
const HowItWorks: React.FC = () => {
  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Hogyan mukodik?
        </h2>
        <p className="text-lg text-gray-600 mb-8">Egyszerubb, mint a mikrosuto. <strong className="text-gray-900">Mindent magatok csinal:</strong></p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md border-b-4 border-green-500 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-green-500"></div>
            <div className="w-12 h-12 bg-green-100 text-green-700 font-bold text-2xl rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-green-200">1</div>
            <h3 className="font-bold text-xl mb-2">Toltsd fel az adagolot</h3>
            <p className="text-gray-600">Tedd be a hozzavalokat a <strong className="text-gray-900">6 rekeszbe</strong>. Nem kell elore merned, a merleg elvegzi.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-b-4 border-green-500 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-2 bg-green-500"></div>
            <div className="w-12 h-12 bg-green-100 text-green-700 font-bold text-2xl rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-green-200">2</div>
            <h3 className="font-bold text-xl mb-2">Valaszd ki a receptet</h3>
            <p className="text-gray-600">Valassz a <strong className="text-gray-900">7&quot; erintokepernyon</strong> vagy az Appbol 1000+ vezetett etel kozul.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-b-4 border-green-500 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-2 bg-green-500"></div>
            <div className="w-12 h-12 bg-green-100 text-green-700 font-bold text-2xl rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-green-200">3</div>
            <h3 className="font-bold text-xl mb-2">Nyomd meg a START-ot es Menj</h3>
            <p className="text-gray-600">O adagolja a hozzavalokat <strong className="text-gray-900">a megfelelo pillanatban</strong>, foz es kever. Szol, ha kesz!</p>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 text-blue-900 p-5 rounded-lg inline-block text-base md:text-lg shadow-sm">
          <span className="font-bold">QUICKSENSE technologia:</span> Az egyetlen robot, amely magatok adagolja a hozzavalokat fozes kozben. <br/>
          <span className="text-sm text-blue-700">Nem kell ott allnod es nezned!</span>
        </div>
      </div>
    </section>
  );
};

// 9. FeaturesGrid Component
const features: FeatureBox[] = [
  {
    id: 1,
    title: "Sosem rontod el",
    description: "Kovesd a kepernyot es a robot mindent adagol. 100%-os siker garantalva.",
    imageUrl: "/images/quickchef img/Non sbagli mai.png"
  },
  {
    id: 2,
    title: "Mindent magatok csinal",
    description: "Az AUTOMATIKUS ADAGOLO segitsegevel nem kell hozzavalokat adnod fozes kozben.",
    imageUrl: "/images/quickchef img/DISPENSER AUTOMATICO.png"
  },
  {
    id: 3,
    title: "Huto-urito funkcio",
    description: "Ird be az Appba, mi van a hutodben, es o elkesziti a tokeletes receptet. Semmi pazarlas.",
    imageUrl: "/images/quickchef img/Funzione Svota-Frigo.png"
  },
  {
    id: 4,
    title: "Keramia bevonat",
    description: "Unique keramia bevonat: sosem ragad, egy torlessel tiszta.",
    imageUrl: "/images/quickchef img/Ceramica Antiaderente.png"
  },
  {
    id: 5,
    title: "45 funkcio 1-ben",
    description: "Daral, gyur, gozon foz, fermentar, lassufoz, joghurtot keszit... 10 haztartasi gepet helyettesit.",
    imageUrl: "/images/quickchef img/45 Funzioni in 1.png"
  },
  {
    id: 6,
    title: "Sefszintu eredmenyek",
    description: "Barsonyos kremek, tokeletes pizzateszta, suru szoszok. Minden automatikusan.",
    imageUrl: "/images/quickchef img/Risultati da Chef.png"
  }
];

const FeaturesGrid: React.FC = () => {
  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900">
          Miert valasztja mindenki:
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

// 10. ComparisonTable Component
const ComparisonTable: React.FC<{ scrollToForm: () => void }> = ({ scrollToForm }) => {
  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900">
          Gyors osszehasonlitas (keritesnelkul)
        </h2>

        <div className="bg-white rounded-xl shadow-xl overflow-hidden border-2 border-gray-100">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b-2 border-gray-300">
                <th className="p-4 text-gray-600 font-bold text-sm md:text-base w-1/3 uppercase tracking-wider">Jellemzo</th>
                <th className="p-4 bg-green-50 text-green-800 font-extrabold text-center border-l border-r border-green-200 w-1/3 text-sm md:text-xl shadow-inner">
                  QuickChef
                </th>
                <th className="p-4 text-gray-400 font-medium text-center text-sm md:text-base w-1/3">
                  Mas robotok
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                [<span key="1">Automatikus adagolo <br/><span className="text-xs font-normal text-gray-500">(Magatok adja a hozzavalokat)</span></span>, true, "Nincs (Neked kell)"],
                [<span key="2">Osszes funkcio</span>, "45 (A legteljesebb)", "Kb. 12-20"],
                [<span key="3">Erintokepernyo</span>, "7&quot; SoftScreen", "Kicsi vagy nincs"],
                [<span key="4">App + Huto-urito</span>, "Igen (1000+ recept)", "Kevés recept"],
                [<span key="5">Edeny anyaga</span>, "Keramia bevonat", "Acel (Ragad)"],
                [<span key="6">Kapacitas</span>, "3,3L (Csaladi)", "2,2L (Kicsi)"],
                [<span key="7">Tisztitas</span>, "Ontisztito + mosogatogep", "Kezzel unalmas"],
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
            RENDELD MEG MOST - ATVETKOR FIZET
          </Button>
        </div>
      </div>
    </section>
  );
};

// 11. WhatsIncluded Component
const WhatsIncluded: React.FC = () => {
  return (
    <section className="py-12 px-4 bg-blue-50/80">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2 relative">
             <div className="absolute -top-4 -right-4 bg-yellow-400 text-gray-900 font-bold px-4 py-2 rounded-full shadow-lg z-10 transform rotate-12">
               TELJES KESZLET
             </div>
             <div className="aspect-square w-full rounded-xl shadow-2xl border-4 border-white overflow-hidden transform -rotate-2 hover:rotate-0 transition-transform duration-500 bg-white">
                <img
                  src="/images/quickchef img/1.png"
                  alt="QuickChef csomag tartalma"
                  className="w-full h-full object-cover"
                />
             </div>
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Package className="text-blue-600" size={32} /> Mit talalsz a csomagban:
            </h2>
            <ul className="space-y-4">
              {[
                <span key="1"><strong>QuickChef</strong> robot 45 funkcioval</span>,
                <span key="2"><strong>Keramia bevonat</strong> (3,3L)</span>,
                <span key="3"><strong className="text-blue-700">Automatikus adagolo</strong> QuickSense technologia</span>,
                <span key="4"><strong>Saute lapatka</strong> kiegeszito (rizottohoz/szoszokhoz)</span>,
                <span key="5">XL gozelokeszulek 2 szintes</span>,
                <span key="6">Vagokeszlet: pengek, pillango, kanal</span>,
                <span key="7"><strong className="text-green-700">BONUS:</strong> Premium App 1000+ recepttel</span>,
                <span key="8"><strong className="text-gray-900">2 Ev Garancia</strong></span>
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
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">Szallitas</p>
                      <p className="font-bold text-gray-900 text-lg leading-none mt-1">Gyors 24/48 ora</p>
                  </div>
              </div>

              <div className="flex items-center gap-3 p-2 border-t sm:border-t-0 sm:border-l border-gray-100">
                  <div className="bg-yellow-100 p-3 rounded-full text-yellow-700 shrink-0">
                      <Banknote size={24} />
                  </div>
                  <div>
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">Fizetes</p>
                      <p className="font-bold text-gray-900 text-lg leading-none mt-1">Atvetkor</p>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// 12. Reviews Component
const reviewsList: Review[] = [
  { id: 1, name: "Maria", age: 57, location: "Budapest", stars: 5, text: "Sosem voltam jo a konyhaban... ezzel minden jol sikerul. A kepernyo megmutatja, mit kell csinalni, nagyon kenyelmes." },
  { id: 2, name: "Jozsef", age: 63, location: "Debrecen", stars: 5, text: "A fozes kezdett terheemne valodni. Most beleteszek mindent es o csinalja. A tisztitas is sokkal egyszerubb." },
  { id: 3, name: "Elena", age: 41, location: "Szeged", stars: 5, text: "Dolgozom es nincs idom. Ez megment estenként. Meg a tesztak es szoszok is tokeletesek." },
  { id: 4, name: "Pal", age: 52, location: "Pecs", stars: 5, text: "A beepitett merleg szuper, vegre nem hbiazom az adagokat... korabban az etelek felet kidobtam." },
  { id: 5, name: "Anna", age: 60, location: "Gyor", stars: 5, text: "Az edeny nem ragad, ez gyozott meg. Korabban mindig vakarnom kellett." },
  { id: 6, name: "Zsuzsa", age: 35, location: "Miskolc", stars: 5, text: "A receptes App nagyon hasznos... es a 'mi van a hutomben' funkcio zsenialis, tobbe nem pazarlok." }
];

const Reviews: React.FC = () => {
  return (
    <section className="py-12 px-4 bg-white border-t border-gray-200">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          Valos vasarloi velemenyek
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviewsList.map((review) => (
            <div key={review.id} className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-bold text-gray-900">{review.name}, {review.age} eves</h4>
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
              <p className="text-gray-700 italic">&quot;{review.text}&quot;</p>
              <div className="mt-4 flex items-center gap-2 text-green-700 text-xs font-bold uppercase">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span> Ellenorzott vasarlas
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 13. OrderForm Component
const OrderForm: React.FC = () => {
  const { trackLeadEvent, saveUserData } = useFacebookTracking();

  const [formData, setFormData] = useState({
    firstName: '',
    phone: '',
    fullAddress: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      // Parse name
      const nameParts = formData.firstName.trim().split(' ');
      const nome = nameParts[0] || '';
      const cognome = nameParts.slice(1).join(' ') || '';

      const userData = {
        nome,
        cognome,
        telefono: formData.phone.trim(),
        indirizzo: formData.fullAddress.trim()
      };

      // Save user data
      saveUserData(userData);

      // Track Lead event for Facebook
      await trackLeadEvent(userData, {
        content_name: 'QuickChef',
        currency: 'HUF',
        value: 35582
      });

      setSubmitted(true);
      const formElement = document.getElementById('order-form');
      if (formElement) formElement.scrollIntoView({ behavior: 'smooth' });

      // Redirect to thank you page
      setTimeout(() => {
        window.location.href = '/fb-ty/ty-fb-hu';
      }, 1500);

    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div id="order-form" className="py-12 px-4 bg-green-50 text-center rounded-xl border-4 border-green-500 max-w-2xl mx-auto my-8 scroll-mt-20">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
          <ShieldCheck size={48} className="text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-green-800 mb-4">Koszonjuk a rendelesedet!</h2>
        <p className="text-xl text-gray-700 mb-6">
          Munkatarsunk hamarosan felhiv a <strong className="whitespace-nowrap">{formData.phone}</strong> szamon a szallitas megerositesere.
        </p>
        <div className="bg-white p-4 rounded-lg border border-gray-200 inline-block text-left">
          <p className="font-bold text-gray-800 mb-1">Mi tortenik most?</p>
          <ol className="list-decimal list-inside text-gray-600 space-y-1">
            <li>A rendelesedet rogzitettuk.</li>
            <li>Megerosito hivast kapsz (magyar szam).</li>
            <li>A futar 24/48 ora alatt kiszallit.</li>
            <li>Keszpenzzel fizetsz atvetkor.</li>
          </ol>
        </div>
      </div>
    );
  }

  return (
    <section id="order-form" className="py-12 px-4 bg-red-50 border-t-4 border-red-600 scroll-mt-20">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="bg-red-600 p-6 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-white opacity-10 transform -skew-x-12"></div>
          <h2 className="text-2xl md:text-3xl font-extrabold mb-2 uppercase relative z-10">
            Rendelesi Urlap
          </h2>
          <p className="font-medium opacity-90 relative z-10">Toltsd ki a 50% kedvezmenyes ajanlat igenybeveteltehez</p>
        </div>

        <div className="bg-yellow-100 p-3 text-center border-b border-yellow-200">
          <p className="text-red-700 font-bold text-sm animate-pulse">
            Nagy kereslet: mar csak 7 darab maradt ezen az aron!
          </p>
        </div>

        <div className="p-5 md:p-8">
          <div className="flex justify-between items-center mb-6 pb-6 border-b border-gray-200 bg-gray-50 p-4 rounded-lg">
            <div>
              <p className="text-gray-500 line-through text-sm">Lista ar: 71 164 Ft</p>
              <p className="text-red-600 font-bold text-2xl">Osszesen: 35 582 Ft</p>
            </div>
            <div className="text-right">
              <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded border border-blue-200">GYORS SZALLITAS</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-700 font-bold mb-1 text-sm uppercase tracking-wide">Nev *</label>
              <input
                type="text"
                name="firstName"
                required
                autoComplete="name"
                className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-green-500 outline-none transition-colors text-lg"
                placeholder="Pl: Kovacs Janos"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-1 text-sm uppercase tracking-wide">Telefonszam (Mobil) *</label>
              <input
                type="tel"
                name="phone"
                required
                autoComplete="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-green-500 outline-none transition-colors text-lg"
                placeholder="Pl: 06 30 123 4567"
                value={formData.phone}
                onChange={handleChange}
              />
              <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                <ShieldCheck size={12}/> Fontos a szallitas megerositesehez
              </p>
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-1 text-sm uppercase tracking-wide">Teljes Cim (Utca, Hazszam, Varos, Iranyitoszam) *</label>
              <textarea
                name="fullAddress"
                required
                autoComplete="street-address"
                className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-green-500 outline-none transition-colors text-lg h-32"
                placeholder="Pl: Petofi utca 10, 1234 Budapest"
                value={formData.fullAddress}
                onChange={handleChange}
              />
            </div>

            <div className="bg-gray-50 p-4 rounded border border-gray-200 mt-4 cursor-pointer hover:bg-gray-100 transition-colors">
               <label className="flex items-start gap-3 cursor-pointer pointer-events-none">
                 <input type="radio" checked readOnly className="w-5 h-5 text-green-600 mt-1" />
                 <div>
                   <span className="block font-bold text-gray-800">Utanvettel (Keszpenz)</span>
                   <span className="block text-xs text-gray-500">Fizess kozvetlenul a futarnak, amikor megkapod a csomagot. Semmi kockazat.</span>
                 </div>
               </label>
            </div>

            <Button type="submit" fullWidth pulse variant="primary" className="mt-6 shadow-xl text-xl" disabled={isSubmitting}>
              {isSubmitting ? 'FELDOLGOZAS...' : 'RENDELES MEGEROSITESE'}
            </Button>

            <div className="flex justify-center items-center gap-4 text-xs text-gray-400 mt-4">
              <span className="flex items-center gap-1"><Lock size={12}/> SSL Biztonsagos 256-bit</span>
              <span className="flex items-center gap-1"><Truck size={12}/> Gyors Szallitas</span>
            </div>

          </form>
        </div>
      </div>
    </section>
  );
};

// 14. Faq Component
const faqs: FaqItem[] = [
  { question: "Fizethetek atvetkor?", answer: "Igen, termeszetesen. Fizess keszpenzzel kozvetlenul a futarnak, amikor atadja a csomagot. Nincs elolegfizetes." },
  { question: "Mennyi ideig tart a szallitas?", answer: "Expressz futarral szallitunk 24/48 munkanap alatt egesz Magyarorszagon." },
  { question: "Kell tudni fozni?", answer: "Nem! A robot lepesrol lepesre vezet az erintokepernyon es az Appon keresztul. Kifejezetten azoknak terveztek, akiknek nincs idejuk vagy kedvuk fozni, de jol akarnak enni." },
  { question: "Konnyű tisztitani?", answer: "Igen, van ontisztito funkcio es az edeny keramia bevonatu, ami egy szivaccsal letorold." },
  { question: "Mit fozhetek?", answer: "Gyakorlatilag mindent: rizottot, tesztat, kremlevest, gozon sult (hal/zoldseg), pizzatesxta es kenyer, desszerteket, joghurtot es sok mast." },
  { question: "Mi van, ha nem felel meg?", answer: "2 ev garanciát kapsz. Emellett magyar nyelvű ügyfélszolgálatot biztosítunk bármilyen kérdés vagy probléma esetén." }
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
          Gyakran Ismetelt Kerdesek
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

// 15. Footer Component
const Footer: React.FC = () => {
  const [modalOpen, setModalOpen] = useState<'privacy' | 'terms' | null>(null);

  const privacyContent = (
    <>
      <p><strong>Adatvedelmi Tajekoztato (GDPR)</strong></p>
      <p>Az ezen az oldalon gyujtott adatokat (Nev, Telefonszam, Cim) kizarolag a QuickChef robot rendelesenek kezelesehez es szallitasahoz hasznaljuk.</p>
      <p>Adataid sosem adjuk el harmadik feleknek. A fizetes atvetkor tortenik, ezert nem gyujtunk bankkartya adatokat.</p>
      <p>Adatkezelo: Ionizi Ltd.</p>
    </>
  );

  const termsContent = (
    <>
      <p><strong>Altalanos Szerzodesi Feltetelek</strong></p>
      <p>1. <strong>Fizetes:</strong> A fizetes teljes egeszeben keszpenzben tortenik atvetkor (utanvet) az expressz futarnak.</p>
      <p>2. <strong>Szallitas:</strong> A kiszallitas 24/48 munkanap alatt tortenik expressz futarral.</p>
      <p>3. <strong>Elallasi jog:</strong> A vasarlonak joga van 14 napon belul elallni a termek atvetelétol szamitva.</p>
      <p>4. <strong>Garancia:</strong> Minden termekre 24 honap torvényes garancia vonatkozik.</p>
    </>
  );

  return (
    <>
      <footer className="bg-gray-900 text-gray-400 py-12 px-4 text-center text-sm border-t border-gray-800">
        <div className="max-w-4xl mx-auto">
          <p className="mb-6 font-semibold text-gray-300">&copy; {new Date().getFullYear()} Ionizi. Minden jog fenntartva.</p>

          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <button onClick={() => setModalOpen('privacy')} className="hover:text-white underline underline-offset-4 decoration-gray-600 hover:decoration-white transition-all">
              Adatvedelmi iranyelvek
            </button>
            <button onClick={() => setModalOpen('terms')} className="hover:text-white underline underline-offset-4 decoration-gray-600 hover:decoration-white transition-all">
              Altalanos Szerzodesi Feltetelek
            </button>
            <button onClick={() => setModalOpen('terms')} className="hover:text-white underline underline-offset-4 decoration-gray-600 hover:decoration-white transition-all">
              Szallitas es Visszakuldes
            </button>
          </div>

          <div className="text-xs text-gray-600 max-w-2xl mx-auto leading-relaxed border-t border-gray-800 pt-6">
            <p className="mb-2">Ez a webhely nem resze a Facebook oldalnak vagy a Facebook Inc.-nek. Tovabba ezt a webhelyet a Facebook semmilyen modon nem hagyta jova. A FACEBOOK a FACEBOOK, Inc. vedjegye.</p>
            <p>A kepek illusztracios celokat szolgalnak. A velemenyek valodi vasarloinak tapasztalatai, de az eredmenyek szemelytol fuggoën valtozhatnak.</p>
          </div>
        </div>
      </footer>

      <Modal
        isOpen={modalOpen === 'privacy'}
        onClose={() => setModalOpen(null)}
        title="Adatvedelmi iranyelvek"
        content={privacyContent}
      />
      <Modal
        isOpen={modalOpen === 'terms'}
        onClose={() => setModalOpen(null)}
        title="Altalanos Szerzodesi Feltetelek"
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
          <span className="text-xs text-gray-400 line-through">71 164 Ft</span>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-extrabold text-red-600">35 582 Ft</span>
          </div>
        </div>

        <div className="flex-grow">
          <Button onClick={scrollToForm} fullWidth size="md" className="shadow-none py-3 text-lg" icon={<ShoppingCart size={18} />}>
            RENDELD MEG MOST
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
      <BrandBanner />
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
      <Footer />
      <StickyMobileCTA scrollToForm={scrollToForm} />
    </main>
  );
}
