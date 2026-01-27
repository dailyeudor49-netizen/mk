'use client';

import React, { useState, useEffect, useRef } from 'react';
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

// --- NETWORK CONFIG ---
const NETWORK_CONFIG = {
  apiUrl: 'https://offers.italiadrop.com/forms/api/',
  uid: '019bfb2e-6cc2-7780-b7d5-e6ab2c6a6b58',
  key: 'a32454578a4cb8f9f41bd4',
  offer: '2225',
  lp: '2264',
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
            Zavriet
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
          <Truck size={14} /> DOPRAVA 24/48H
        </div>
        <div className="hidden sm:inline">|</div>
        <div className="flex items-center gap-1 text-yellow-300">
          <Banknote size={14} /> PLATBA NA DOBIERKU
        </div>
        <div className="hidden sm:inline">|</div>
        <div className="flex items-center gap-1">
          <ShieldCheck size={14} /> ZARUKA 2 ROKY
        </div>
        <div className="hidden md:inline">|</div>
        <div className="hidden md:flex items-center gap-1">
          <Phone size={14} /> SLOVENSKA ZAKAZNICKA PODPORA
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
  <span key="1"><strong className="text-red-700">EXKLUZIVNA NOVINKA:</strong> Automaticke davkovanie ingrediencii (robi vsetko sam)</span>,
  <span key="2"><strong className="text-gray-900">45 Funkcii v 1:</strong> najkompletnejsi robot na trhu</span>,
  <span key="3">Dotykova obrazovka <strong className="text-gray-900">7&quot; SoftScreen</strong> velka a prehladna - vedie vas krok za krokom</span>,
  <span key="4">Aplikacia s <strong className="text-gray-900">1000+ receptami</strong> - vyberte si a postupujte ako v tutoriale</span>,
  <span key="5">Funkcia <strong className="text-gray-900">&quot;Co mam v chladnicke?&quot;</strong> - usetrite na nakupoch</span>,
  <span key="6"><strong className="text-gray-900">Integrovna vaha</strong> presna na gram - koniec odhadovania davok</span>,
  <span key="7">Nadoba <strong className="text-gray-900">Keramicky nepripalovy povrch</strong> - nic nepripali, umyva sa okamzite</span>,
  <span key="8">Varenie do <strong className="text-gray-900">180°C</strong> + Skutocne oprazenie</span>,
  <span key="9">System <strong className="text-gray-900">OneClick</strong> - menit prislusenstvo bez demontaze</span>,
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
          <span className="text-red-600 block mb-2 text-xl md:text-2xl uppercase tracking-wide">Mate dost stracania casu v kuchyni?</span>
          Objavte Prvy Robot ktory <span className="bg-yellow-200 px-2">Sam Pridava Ingrediencie.</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-700 mb-6 max-w-2xl mx-auto leading-relaxed">
          Zabudnite na hrnce a stres. Vlozte vsetko do davkovaca, vyberte recept na obrazovke a <strong className="text-gray-900">on vari za vas, kym si odpocinete.</strong>
          <br className="my-2"/>
          <strong className="text-green-700 bg-green-50 px-3 py-1 rounded inline-block mt-2 border border-green-200 shadow-sm">Perfektny vysledok (aj ked neviete varit)</strong>
        </p>

        <div className="relative mb-8 rounded-xl overflow-hidden shadow-2xl border-4 border-gray-100 max-w-xl mx-auto group bg-gray-100">
           <div className="relative aspect-square w-full">
             <img
               src={carouselImages[currentSlide]}
               alt={`Kuchynsky robot slide ${currentSlide + 1}`}
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
                   aria-label={`Prejst na slide ${idx + 1}`}
                 />
               ))}
             </div>
           </div>
        </div>

        <div className="bg-yellow-50/60 rounded-xl p-6 md:p-8 mb-8 text-left max-w-2xl mx-auto border-2 border-yellow-200 shadow-sm">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 text-center leading-tight">
              Robot, ktory z vas urobi sefkuchara <br className="hidden sm:block"/>bez znecistenia kuchyne
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
            Limitovana Ponuka - Iba Dnes
          </div>

          <div className="flex flex-col items-center justify-center mb-6 mt-6">
             <div className="bg-yellow-400 text-gray-900 font-black text-3xl md:text-4xl px-8 py-3 rounded-lg mb-4 shadow-md">
               -50%
             </div>
             <div className="text-gray-400 font-medium uppercase text-sm tracking-widest mb-1">Promo Cena</div>
             <div className="flex items-center gap-3">
               <span className="text-gray-400 line-through text-2xl decoration-2">158 EUR</span>
               <span className="text-5xl md:text-6xl font-black text-red-600 tracking-tighter">79 EUR</span>
             </div>
             <div className="text-green-600 font-bold text-lg mt-2">-50% ZLAVA</div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-100 text-left space-y-4">
             <div className="flex items-center gap-3 border-b border-gray-200 pb-3 last:border-0 last:pb-0">
               <div className="bg-green-100 p-2 rounded-full text-green-700 shrink-0">
                 <Truck size={24} strokeWidth={2} />
               </div>
               <div>
                 <p className="font-bold text-gray-900 leading-none text-lg">Rychla Doprava</p>
                 <p className="text-sm text-gray-500 mt-1">Dorucenie garantovane do 24/48 hodin</p>
               </div>
             </div>

             <div className="flex items-center gap-3 border-b border-gray-200 pb-3 last:border-0 last:pb-0">
               <div className="bg-yellow-100 p-2 rounded-full text-yellow-700 shrink-0">
                 <Banknote size={24} strokeWidth={2} />
               </div>
               <div>
                 <p className="font-bold text-gray-900 leading-none text-lg">Platite Len Pri Doruceni</p>
                 <p className="text-sm text-gray-500 mt-1">Ziadna zaloha, hotovost kurierovi</p>
               </div>
             </div>

             <div className="flex items-center gap-3">
               <div className="bg-blue-100 p-2 rounded-full text-blue-700 shrink-0">
                 <ShieldCheck size={24} strokeWidth={2} />
               </div>
               <div>
                 <p className="font-bold text-gray-900 leading-none text-lg">Zaruka 2 Roky</p>
                 <p className="text-sm text-gray-500 mt-1">Technicka podpora zahrnuta</p>
               </div>
             </div>
          </div>

          <Button onClick={scrollToForm} fullWidth pulse size="xl" subtext="Ziadna kreditna karta nie je potrebna">
            OBJEDNAT TERAZ SO ZLAVOU
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
          4,8/5 na zaklade viac ako 3 000 recenzii
        </h3>
        <p className="text-lg text-gray-600 italic mb-6">
          &quot;Konecne varim dobre bez stresu.&quot;
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          <div className="flex flex-col items-center gap-2 p-3 bg-white rounded-lg shadow-sm">
            <ThumbsUp className="text-blue-600" />
            <span className="font-bold text-gray-700">Jednoduche</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-3 bg-white rounded-lg shadow-sm">
            <Clock className="text-green-600" />
            <span className="font-bold text-gray-700">Rychle</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-3 bg-white rounded-lg shadow-sm">
            <Zap className="text-yellow-500" />
            <span className="font-bold text-gray-700">Nepripalove</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-3 bg-white rounded-lg shadow-sm">
            <ChefHat className="text-red-500" />
            <span className="font-bold text-gray-700">Navody na recepty</span>
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
            Ak sa spoznavate v tychto situaciach... <br/>tento robot vam zmeni zivot.
          </h2>

          <ul className="space-y-5 mb-8">
            <li className="flex items-start gap-3">
              <div className="bg-red-100 p-1 rounded-full shrink-0 mt-1">
                <X className="text-red-600" size={22} strokeWidth={3} />
              </div>
              <span className="text-lg text-gray-800">Otvorite chladnicku a <strong className="text-red-700">neviete, co varit.</strong></span>
            </li>
            <li className="flex items-start gap-3">
              <div className="bg-red-100 p-1 rounded-full shrink-0 mt-1">
                <X className="text-red-600" size={22} strokeWidth={3} />
              </div>
              <span className="text-lg text-gray-800">Recepty vam vychadzaju <strong className="text-red-700">&quot;tak nejako&quot;</strong> a prejde vas chut.</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="bg-red-100 p-1 rounded-full shrink-0 mt-1">
                <X className="text-red-600" size={22} strokeWidth={3} />
              </div>
              <span className="text-lg text-gray-800"><strong>Spinavite tisic hrncov</strong> a travite hodiny upratovanim.</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="bg-red-100 p-1 rounded-full shrink-0 mt-1">
                <X className="text-red-600" size={22} strokeWidth={3} />
              </div>
              <span className="text-lg text-gray-800">Nakoniec <strong>objednavate rychle jedlo</strong> a minutie prilis vela.</span>
            </li>
          </ul>

          <div className="text-center bg-white p-6 rounded-lg border border-gray-100 shadow-md">
            <p className="text-xl font-bold text-green-700 mb-6 leading-tight">
              Od dnes varite automaticky zdrave jedla,<br/> aj <span className="underline decoration-green-500 decoration-4">bez skusenosti.</span>
            </p>
            <Button onClick={scrollToForm} variant="primary" size="lg" className="mx-auto">
              ANO, CHCEM HO - PLATIM NA DOBIERKU
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
          Ako to funguje?
        </h2>
        <p className="text-lg text-gray-600 mb-8">Je to jednoduchsie ako mikrovlnka. <strong className="text-gray-900">Robi vsetko sam:</strong></p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md border-b-4 border-green-500 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-green-500"></div>
            <div className="w-12 h-12 bg-green-100 text-green-700 font-bold text-2xl rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-green-200">1</div>
            <h3 className="font-bold text-xl mb-2">Naplnte Davkovac</h3>
            <p className="text-gray-600">Vlozte ingrediencie do <strong className="text-gray-900">6 priehradok</strong>. Nemusite ich vazit, o to sa postara vaha.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-b-4 border-green-500 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-2 bg-green-500"></div>
            <div className="w-12 h-12 bg-green-100 text-green-700 font-bold text-2xl rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-green-200">2</div>
            <h3 className="font-bold text-xl mb-2">Vyberte Recept</h3>
            <p className="text-gray-600">Vyberte si na <strong className="text-gray-900">7&quot; Dotykovej obrazovke</strong> alebo v Aplikacii z 1000+ navodov.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-b-4 border-green-500 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-2 bg-green-500"></div>
            <div className="w-12 h-12 bg-green-100 text-green-700 font-bold text-2xl rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-green-200">3</div>
            <h3 className="font-bold text-xl mb-2">Stlacte START a Odidite</h3>
            <p className="text-gray-600">Sam davkuje ingrediencie <strong className="text-gray-900">v spravny cas</strong>, vari a miesa. Upozorni vas, ked je hotovo!</p>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 text-blue-900 p-5 rounded-lg inline-block text-base md:text-lg shadow-sm">
          <span className="font-bold">TECHNOLOGIA QUICKSENSE:</span> Jediny robot, ktory sam pridava ingrediencie pocas varenia. <br/>
          <span className="text-sm text-blue-700">Nemusite pri nom stat a sledovat ho!</span>
        </div>
      </div>
    </section>
  );
};

// 8. FeaturesGrid Component
const features: FeatureBox[] = [
  {
    id: 1,
    title: "Nikdy nespravite chybu",
    description: "Postupujte podla obrazovky a robot odmeruje vsetko. Vysledok garantovany na 100%.",
    imageUrl: "/images/quickchef img/Non sbagli mai.png"
  },
  {
    id: 2,
    title: "Robi vsetko sam",
    description: "Vdaka automatickemu DAVKOVACU nemusite pridavat ingrediencie pocas varenia.",
    imageUrl: "/images/quickchef img/DISPENSER AUTOMATICO.png"
  },
  {
    id: 3,
    title: "Funkcia Vyprazdnit-Chladnicku",
    description: "Napisite do Aplikacie, co mate v chladnicke, a ona vam vytvori perfektny recept. Ziadne plytvanie.",
    imageUrl: "/images/quickchef img/Funzione Svota-Frigo.png"
  },
  {
    id: 4,
    title: "Keramicky Nepripalovy Povrch",
    description: "Jednorazova nadoba s keramickym povrchom: nikdy sa nepripali a umyva sa jednym pohybom.",
    imageUrl: "/images/quickchef img/Ceramica Antiaderente.png"
  },
  {
    id: 5,
    title: "45 Funkcii v 1",
    description: "Seka, miesi, vari v pare, kvasit, pomale varenie, jogurt... nahradi 10 spotrebicov.",
    imageUrl: "/images/quickchef img/45 Funzioni in 1.png"
  },
  {
    id: 6,
    title: "Vysledky ako od Sefkuchara",
    description: "Kremove polievky, perfektne cesta na pizzu, huste omacky. Vsetko automaticky.",
    imageUrl: "/images/quickchef img/Risultati da Chef.png"
  }
];

const FeaturesGrid: React.FC = () => {
  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900">
          Preco si ho vsetci vyberaju:
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
          Rychle porovnanie (bez obchadzok)
        </h2>

        <div className="bg-white rounded-xl shadow-xl overflow-hidden border-2 border-gray-100 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[320px]">
            <thead>
              <tr className="bg-gray-100 border-b-2 border-gray-300">
                <th className="p-2 md:p-4 text-gray-600 font-bold text-xs md:text-base w-1/3 uppercase tracking-wider">Vlastnost</th>
                <th className="p-2 md:p-4 bg-green-50 text-green-800 font-extrabold text-center border-l border-r border-green-200 w-1/3 text-xs md:text-xl shadow-inner">
                  QuickChef
                </th>
                <th className="p-2 md:p-4 text-gray-400 font-medium text-center text-xs md:text-base w-1/3">
                  Ine Roboty
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                [<span key="1" className="text-xs md:text-base">Automaticky Davkovac <br/><span className="text-[10px] md:text-xs font-normal text-gray-500">(Sam pridava ingrediencie)</span></span>, true, "Chyba (Musite to robit vy)"],
                [<span key="2" className="text-xs md:text-base">Celkovy Pocet Funkcii</span>, "45 (Najkompletnejsi)", "Priblizne 12-20"],
                [<span key="3" className="text-xs md:text-base">Dotykova Obrazovka</span>, "7\" SoftScreen", "Mala alebo Ziadna"],
                [<span key="4" className="text-xs md:text-base">Aplikacia + Vyprazdnit-Chladnicku</span>, "Ano (1000+ Receptov)", "Malo receptov"],
                [<span key="5" className="text-xs md:text-base">Material Nadoby</span>, "Keramicky Nepripalovy", "Ocel (Pripali sa)"],
                [<span key="6" className="text-xs md:text-base">Objem</span>, "3,3L (Pre rodinu)", "2,2L (Maly)"],
                [<span key="7" className="text-xs md:text-base">Cistenie</span>, "Samocistenie + Umyvacka", "Nudne rucne umyvanie"],
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
            OBJEDNAT TERAZ - PLATIM NA DOBIERKU
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
               KOMPLETNA SADA
             </div>
             <div className="aspect-square w-full rounded-xl shadow-2xl border-4 border-white overflow-hidden transform -rotate-2 hover:rotate-0 transition-transform duration-500 bg-white">
                <img
                  src="/images/quickchef img/1.png"
                  alt="Obsah balenia QuickChef"
                  className="w-full h-full object-cover"
                />
             </div>
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Package className="text-blue-600" size={32} /> Co najdete v baleni:
            </h2>
            <ul className="space-y-4">
              {[
                <span key="1">Robot <strong>QuickChef 45 Funkcii</strong></span>,
                <span key="2">Nadoba <strong>Keramicky Nepripalovy Povrch (3,3L)</strong></span>,
                <span key="3"><strong className="text-blue-700">Automaticky Davkovac</strong> QuickSense</span>,
                <span key="4">Prislusenstvo <strong>Lopata Saute</strong> (na rizota/omacky)</span>,
                <span key="5">XL Parna Nadoba na 2 urovne</span>,
                <span key="6">Sada na Krajanie: Cepele, Motylik, Lyzica</span>,
                <span key="7"><strong className="text-green-700">BONUS:</strong> Premium Aplikacia s 1000+ Receptami</span>,
                <span key="8"><strong className="text-gray-900">Zaruka 2 Roky</strong></span>
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
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">Doprava</p>
                      <p className="font-bold text-gray-900 text-lg leading-none mt-1">Rychla 24/48h</p>
                  </div>
              </div>

              <div className="flex items-center gap-3 p-2 border-t sm:border-t-0 sm:border-l border-gray-100">
                  <div className="bg-yellow-100 p-3 rounded-full text-yellow-700 shrink-0">
                      <Banknote size={24} />
                  </div>
                  <div>
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">Platba</p>
                      <p className="font-bold text-gray-900 text-lg leading-none mt-1">Na Dobierku</p>
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
  { id: 1, name: "Maria", age: 57, location: "Bratislava", stars: 5, text: "Nikdy som nebola dobra kucharka... s tymto mi vsetko vychadza. Obrazovka vam povie, co robit, velmi pohodlne.", imageUrl: "/images/quickchef img/recensione 1.jpg" },
  { id: 2, name: "Peter", age: 63, location: "Kosice", stars: 5, text: "Varenie zacalo byt unavne. Teraz vlozim vsetko a on to urobi. Cistenie je omnoho jednoduchsie.", imageUrl: "/images/quickchef img/recensione 2.jpg" },
  { id: 3, name: "Katarina", age: 41, location: "Zilina", stars: 5, text: "Pracujem a nemam cas. Tento ma zachranuje kazdý vecer. Aj cesta a omacky vychadzaju perfektne.", imageUrl: "/images/quickchef img/recensione 3.jpg" },
  { id: 4, name: "Jan", age: 52, location: "Nitra", stars: 5, text: "Integrovna vaha je uzasna, konecne uz nerobim chyby v davkach... predtym som polovicu receptov zahodil." },
  { id: 5, name: "Eva", age: 60, location: "Presov", stars: 5, text: "Nadoba sa nepripali, to ma presvedcilo. Predtym som musela stale skrabat." },
  { id: 6, name: "Zuzana", age: 35, location: "Trnava", stars: 5, text: "Aplikacia s receptami je velmi uzitocna... a funkcia 'co mam v chladnicke' je genialna, uz neplytva." }
];

const Reviews: React.FC = () => {
  return (
    <section className="py-12 px-4 bg-white border-t border-gray-200">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          Skutocne recenzie zakaznikov
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviewsList.map((review) => (
            <div key={review.id} className="bg-gray-50 rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              {review.imageUrl && (
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={review.imageUrl}
                    alt={`Recenzia od ${review.name}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-bold text-gray-900">{review.name}, {review.age} rokov</h4>
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
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span> Overeny Nakup
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

      // Facebook tracking
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
        saveUserData(userData);
        await trackLeadEvent(userData, {
          content_name: 'QuickChef',
          currency: 'EUR',
          value: 79
        });
      }

      setSubmitted(true);
      const formElement = document.getElementById('order-form');
      if (formElement) formElement.scrollIntoView({ behavior: 'smooth' });

      // Redirect to thank you page
      window.location.href = '/fb-ty/ty-fb-sk';
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
        <h2 className="text-3xl font-bold text-green-800 mb-4">Dakujeme za vasu objednavku!</h2>
        <p className="text-xl text-gray-700 mb-6">
          Nas operator vam coskoro zavola na cislo <strong className="whitespace-nowrap">{formData.phone}</strong> pre potvrdenie odoslania.
        </p>
        <div className="bg-white p-4 rounded-lg border border-gray-200 inline-block text-left">
          <p className="font-bold text-gray-800 mb-1">Co sa stane teraz?</p>
          <ol className="list-decimal list-inside text-gray-600 space-y-1">
            <li>Vasa objednavka bola zaregistrovana.</li>
            <li>Obdrzite potvrdzovaci hovor.</li>
            <li>Kurier doruci do 24/48 hodin.</li>
            <li>Zaplatite hotovost pri doruceni.</li>
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
            Objednavkovy Formular
          </h2>
          <p className="font-medium opacity-90 relative z-10">Vyplnte pre ziskanie ponuky so zlavou 50%</p>
        </div>

        <div className="bg-yellow-100 p-3 text-center border-b border-yellow-200">
          <p className="text-red-700 font-bold text-sm animate-pulse">
            Vysoký dopyt: zostava len 7 kusov za tuto cenu!
          </p>
        </div>

        <div className="p-5 md:p-8">
          <div className="flex justify-between items-center mb-6 pb-6 border-b border-gray-200 bg-gray-50 p-4 rounded-lg">
            <div>
              <p className="text-gray-500 line-through text-sm">Bezna Cena: 158 EUR</p>
              <p className="text-red-600 font-bold text-2xl">Spolu: 79 EUR</p>
            </div>
            <div className="text-right">
              <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded border border-blue-200">RYCHLA DOPRAVA</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input type="hidden" name="tmfp" ref={tmfpRef} />
            <div>
              <label className="block text-gray-700 font-bold mb-1 text-sm uppercase tracking-wide">Meno a Priezvisko *</label>
              <input
                type="text"
                name="firstName"
                required
                autoComplete="name"
                className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-green-500 outline-none transition-colors text-lg"
                placeholder="Napr: Jan Novak"
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
                placeholder="Napr: 0903 123 456"
                value={formData.phone}
                onChange={handleChange}
              />
              <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                <ShieldCheck size={12}/> Dolezite pre potvrdenie odoslania
              </p>
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-1 text-sm uppercase tracking-wide">Uplna Adresa (Ulica, Cislo, Mesto, PSC) *</label>
              <textarea
                name="fullAddress"
                required
                autoComplete="street-address"
                className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-green-500 outline-none transition-colors text-lg h-32"
                placeholder="Napr: Hlavna 10, 81101 Bratislava"
                value={formData.fullAddress}
                onChange={handleChange}
              />
            </div>

            <div className="bg-gray-50 p-4 rounded border border-gray-200 mt-4 cursor-pointer hover:bg-gray-100 transition-colors">
               <label className="flex items-start gap-3 cursor-pointer pointer-events-none">
                 <input type="radio" checked readOnly className="w-5 h-5 text-green-600 mt-1" />
                 <div>
                   <span className="block font-bold text-gray-800">Platba na Dobierku (Hotovost)</span>
                   <span className="block text-xs text-gray-500">Platite priamo kurierovi pri doruceni balika. Ziadne riziko.</span>
                 </div>
               </label>
            </div>

            <Button type="submit" fullWidth pulse variant="primary" className="mt-6 shadow-xl text-xl" disabled={isSubmitting}>
              {isSubmitting ? 'ODOSIELAM...' : 'POTVRDIT OBJEDNAVKU'}
            </Button>

            <div className="flex justify-center items-center gap-4 text-xs text-gray-400 mt-4">
              <span className="flex items-center gap-1"><Lock size={12}/> SSL Secure 256-bit</span>
              <span className="flex items-center gap-1"><Truck size={12}/> Rychla Doprava</span>
            </div>

          </form>
        </div>
      </div>
    </section>
  );
};

// 13. Faq Component
const faqs: FaqItem[] = [
  { question: "Mozem platit na dobierku?", answer: "Ano, urcite. Platite v hotovosti priamo kurierovi pri doruceni balika. Ziadna platba vopred nie je potrebna." },
  { question: "Ako dlho trva dorucenie?", answer: "Odosielame expresnym kurierom do 24/48 pracovnych hodin po celom Slovensku." },
  { question: "Musim vediet varit?", answer: "Nie! Robot vas vedie krok za krokom cez dotykovu obrazovku a Aplikaciu. Je navrhnuty presne pre tych, ktori nemaju cas alebo chut varit, ale chcu jest dobre." },
  { question: "Da sa lahko cistit?", answer: "Ano, ma funkciu samocistenia a nadoba ma keramicky nepripalovy povrch, ktory sa umyva jednym pohybom hublky." },
  { question: "Co vsetko mozem varit?", answer: "Prakticky vsetko: rizota, cestoviny, kremove polievky, parenie (ryby/zelenina), cesta na pizzu a chlieb, zakusky, jogurt a ovela viac." },
  { question: "Co ak mi nevyhovuje?", answer: "Mate 2-rocnu zaruku. Okrem toho ponukame vyhradnu slovensku zakaznicku podporu pre akekolvek otazky alebo problemy." }
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
          Casto Kladene Otazky
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
    <div className="bg-gray-900 text-white py-3 text-center">
      <p className="text-sm font-medium">
        Oficialne distribuovane spolocnostou <strong>Ionizi</strong>
      </p>
    </div>
  );
};

// 15. Footer Component
const Footer: React.FC = () => {
  const [modalOpen, setModalOpen] = useState<'privacy' | 'terms' | null>(null);

  const privacyContent = (
    <>
      <p><strong>Informacie o ochrane osobnych udajov (GDPR)</strong></p>
      <p>Udaje zhromazdene na tejto stranke (Meno, Telefon, Adresa) sa pouzivaju vyhradne na spracovanie a odoslanie vasej objednavky robota QuickChef.</p>
      <p>Vase udaje nikdy nebudu predane tretim stranam. Platba prebieha pri doruceni, takze nezhromazdujeme udaje o kreditnych kartach.</p>
      <p>Spravca udajov: Ionizi s.r.o.</p>
    </>
  );

  const termsContent = (
    <>
      <p><strong>Obchodne Podmienky</strong></p>
      <p>1. <strong>Platba:</strong> Platba prebieha v plnej vyske v hotovosti pri doruceni (na dobierku) expresnemu kurierovi.</p>
      <p>2. <strong>Doprava:</strong> Dorucenie prebieha do 24/48 pracovnych hodin cez kurierskych sluzieb.</p>
      <p>3. <strong>Pravo na odstupenie:</strong> Zakaznik ma pravo odstupit od zmluvy do 14 dni od prevzatia tovaru.</p>
      <p>4. <strong>Zaruka:</strong> Na vsetky produkty sa vztahuje zakonna zaruka 24 mesiacov na vady zhody.</p>
    </>
  );

  return (
    <>
      <footer className="bg-gray-900 text-gray-400 py-12 px-4 text-center text-sm border-t border-gray-800">
        <div className="max-w-4xl mx-auto">
          <p className="mb-6 font-semibold text-gray-300">&copy; {new Date().getFullYear()} QuickChef - Ionizi. Vsetky prava vyhradene.</p>

          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <button onClick={() => setModalOpen('privacy')} className="hover:text-white underline underline-offset-4 decoration-gray-600 hover:decoration-white transition-all">
              Zasady Ochrany Osobnych Udajov
            </button>
            <button onClick={() => setModalOpen('terms')} className="hover:text-white underline underline-offset-4 decoration-gray-600 hover:decoration-white transition-all">
              Obchodne Podmienky
            </button>
            <button onClick={() => setModalOpen('terms')} className="hover:text-white underline underline-offset-4 decoration-gray-600 hover:decoration-white transition-all">
              Doprava a Vratenie
            </button>
          </div>

          <div className="text-xs text-gray-600 max-w-2xl mx-auto leading-relaxed border-t border-gray-800 pt-6">
            <p className="mb-2">Tato stranka nie je sucastou stranky Facebook ani Facebook Inc. Okrem toho tato stranka nie je ziadnym sposobom schvalena Facebookom. FACEBOOK je ochrannou znamkou spolocnosti FACEBOOK, Inc.</p>
            <p>Obrazky su len na ilustracne ucely. Recenzie su zalozene na skutocnych skusenostiach nasich zakaznikov, ale vysledky sa mozu lisit od cloveka k cloveku.</p>
          </div>
        </div>
      </footer>

      <Modal
        isOpen={modalOpen === 'privacy'}
        onClose={() => setModalOpen(null)}
        title="Zasady Ochrany Osobnych Udajov"
        content={privacyContent}
      />
      <Modal
        isOpen={modalOpen === 'terms'}
        onClose={() => setModalOpen(null)}
        title="Obchodne Podmienky"
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
          <span className="text-xs text-gray-400 line-through">158 EUR</span>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-extrabold text-red-600">79 EUR</span>
          </div>
        </div>

        <div className="flex-grow">
          <Button onClick={scrollToForm} fullWidth size="md" className="shadow-none py-3 text-lg" icon={<ShoppingCart size={18} />}>
            OBJEDNAT TERAZ
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
