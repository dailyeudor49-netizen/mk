'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
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
  offer: '2219',
  lp: '2258',
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
            Fechar
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
          <Truck size={14} /> ENVIO 24/48H
        </div>
        <div className="hidden sm:inline">|</div>
        <div className="flex items-center gap-1 text-yellow-300">
          <Banknote size={14} /> PAGAMENTO NA ENTREGA
        </div>
        <div className="hidden sm:inline">|</div>
        <div className="flex items-center gap-1">
          <ShieldCheck size={14} /> GARANTIA 2 ANOS
        </div>
        <div className="hidden md:inline">|</div>
        <div className="hidden md:flex items-center gap-1">
          <Phone size={14} /> APOIO AO CLIENTE EM PORTUGUES
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
  <span key="1"><strong className="text-red-700">NOVIDADE EXCLUSIVA:</strong> Doseamento Automatico de ingredientes (faz tudo sozinho)</span>,
  <span key="2"><strong className="text-gray-900">45 Funcoes em 1:</strong> o robot mais completo do mercado</span>,
  <span key="3">Ecra tactil <strong className="text-gray-900">7&quot; SoftScreen</strong> grande e claro - guia-te passo a passo</span>,
  <span key="4">App com <strong className="text-gray-900">1000+ receitas</strong> - escolhe e segue como um tutorial</span>,
  <span key="5">Funcao <strong className="text-gray-900">&quot;O que tenho no frigorifico?&quot;</strong> - poupa nas compras</span>,
  <span key="6"><strong className="text-gray-900">Balanca integrada</strong> precisa ao grama - adeus doses &quot;a olho&quot;</span>,
  <span key="7">Jarro <strong className="text-gray-900">Ceramica Antiaderente</strong> - nada pega, limpa-se num instante</span>,
  <span key="8">Cozedura ate <strong className="text-gray-900">180C</strong> + Refogado verdadeiro</span>,
  <span key="9">Sistema <strong className="text-gray-900">OneClick</strong> - mudas acessorios sem desmontar nada</span>,
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
          <span className="text-red-600 block mb-2 text-xl md:text-2xl uppercase tracking-wide">Cansado de perder tempo na cozinha?</span>
          Descubra o Primeiro Robot que <span className="bg-yellow-200 px-2">Adiciona os Ingredientes Sozinho.</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-700 mb-6 max-w-2xl mx-auto leading-relaxed">
          Esqueca panelas e stress. Ponha tudo no dispensador, escolha a receita no ecra e <strong className="text-gray-900">ele cozinha por si enquanto descansa.</strong>
          <br className="my-2"/>
          <strong className="text-green-700 bg-green-50 px-3 py-1 rounded inline-block mt-2 border border-green-200 shadow-sm">Resultado perfeito (mesmo que nao saiba cozinhar)</strong>
        </p>

        <div className="relative mb-8 rounded-xl overflow-hidden shadow-2xl border-4 border-gray-100 max-w-xl mx-auto group bg-gray-100">
           <div className="relative aspect-square w-full">
             <img
               src={carouselImages[currentSlide]}
               alt={`Robot de cozinha slide ${currentSlide + 1}`}
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
                   aria-label={`Ir para slide ${idx + 1}`}
                 />
               ))}
             </div>
           </div>
        </div>

        <div className="bg-yellow-50/60 rounded-xl p-6 md:p-8 mb-8 text-left max-w-2xl mx-auto border-2 border-yellow-200 shadow-sm">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 text-center leading-tight">
              O robot que te faz cozinhar como Chef <br className="hidden sm:block"/>sem sujar nada
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
            Oferta Limitada - So Hoje
          </div>

          <div className="flex flex-col items-center justify-center mb-6 mt-6">
             <div className="bg-yellow-400 text-gray-900 font-black text-3xl md:text-4xl px-8 py-3 rounded-lg mb-4 shadow-md">
               -50%
             </div>
             <div className="text-gray-400 font-medium uppercase text-sm tracking-widest mb-1">Preco Promocional</div>
             <div className="flex items-center gap-3">
               <span className="text-gray-400 line-through text-2xl decoration-2">178 EUR</span>
               <span className="text-5xl md:text-6xl font-black text-red-600 tracking-tighter">89 EUR</span>
             </div>
             <div className="mt-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">-50% DESCONTO</div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-100 text-left space-y-4">
             <div className="flex items-center gap-3 border-b border-gray-200 pb-3 last:border-0 last:pb-0">
               <div className="bg-green-100 p-2 rounded-full text-green-700 shrink-0">
                 <Truck size={24} strokeWidth={2} />
               </div>
               <div>
                 <p className="font-bold text-gray-900 leading-none text-lg">Envio Rapido</p>
                 <p className="text-sm text-gray-500 mt-1">Entrega garantida em 24/48 horas</p>
               </div>
             </div>

             <div className="flex items-center gap-3 border-b border-gray-200 pb-3 last:border-0 last:pb-0">
               <div className="bg-yellow-100 p-2 rounded-full text-yellow-700 shrink-0">
                 <Banknote size={24} strokeWidth={2} />
               </div>
               <div>
                 <p className="font-bold text-gray-900 leading-none text-lg">Paga So na Entrega</p>
                 <p className="text-sm text-gray-500 mt-1">Sem adiantamento, dinheiro ao estafeta</p>
               </div>
             </div>

             <div className="flex items-center gap-3">
               <div className="bg-blue-100 p-2 rounded-full text-blue-700 shrink-0">
                 <ShieldCheck size={24} strokeWidth={2} />
               </div>
               <div>
                 <p className="font-bold text-gray-900 leading-none text-lg">Garantia Portugal 2 Anos</p>
                 <p className="text-sm text-gray-500 mt-1">Assistencia tecnica incluida</p>
               </div>
             </div>
          </div>

          <Button onClick={scrollToForm} fullWidth pulse size="xl" subtext="Sem cartao de credito necessario">
            ENCOMENDAR AGORA COM DESCONTO
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
          4,8/5 baseado em mais de 3.000 avaliacoes
        </h3>
        <p className="text-lg text-gray-600 italic mb-6">
          &quot;Finalmente cozinho bem sem enlouquecer.&quot;
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          <div className="flex flex-col items-center gap-2 p-3 bg-white rounded-lg shadow-sm">
            <ThumbsUp className="text-blue-600" />
            <span className="font-bold text-gray-700">Facil</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-3 bg-white rounded-lg shadow-sm">
            <Clock className="text-green-600" />
            <span className="font-bold text-gray-700">Rapido</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-3 bg-white rounded-lg shadow-sm">
            <Zap className="text-yellow-500" />
            <span className="font-bold text-gray-700">Antiaderente</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-3 bg-white rounded-lg shadow-sm">
            <ChefHat className="text-red-500" />
            <span className="font-bold text-gray-700">Receitas Guiadas</span>
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
            Se te identificas com estas situacoes... <br/>este robot muda-te a vida.
          </h2>

          <ul className="space-y-5 mb-8">
            <li className="flex items-start gap-3">
              <div className="bg-red-100 p-1 rounded-full shrink-0 mt-1">
                <X className="text-red-600" size={22} strokeWidth={3} />
              </div>
              <span className="text-lg text-gray-800">Abres o frigorifico e <strong className="text-red-700">nunca sabes o que cozinhar.</strong></span>
            </li>
            <li className="flex items-start gap-3">
              <div className="bg-red-100 p-1 rounded-full shrink-0 mt-1">
                <X className="text-red-600" size={22} strokeWidth={3} />
              </div>
              <span className="text-lg text-gray-800">As receitas ficam <strong className="text-red-700">&quot;mais ou menos&quot;</strong> e perdes a vontade.</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="bg-red-100 p-1 rounded-full shrink-0 mt-1">
                <X className="text-red-600" size={22} strokeWidth={3} />
              </div>
              <span className="text-lg text-gray-800"><strong>Sujas mil panelas</strong> e passas horas a limpar.</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="bg-red-100 p-1 rounded-full shrink-0 mt-1">
                <X className="text-red-600" size={22} strokeWidth={3} />
              </div>
              <span className="text-lg text-gray-800">Acabas por <strong>encomendar comida rapida</strong> e gastar demais.</span>
            </li>
          </ul>

          <div className="text-center bg-white p-6 rounded-lg border border-gray-100 shadow-md">
            <p className="text-xl font-bold text-green-700 mb-6 leading-tight">
              A partir de hoje cozinhas automaticamente pratos saudaveis,<br/> mesmo <span className="underline decoration-green-500 decoration-4">sem experiencia.</span>
            </p>
            <Button onClick={scrollToForm} variant="primary" size="lg" className="mx-auto">
              SIM, QUERO - PAGO NA ENTREGA
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
          Como funciona?
        </h2>
        <p className="text-lg text-gray-600 mb-8">E mais facil que um microondas. <strong className="text-gray-900">Faz tudo sozinho:</strong></p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md border-b-4 border-green-500 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-green-500"></div>
            <div className="w-12 h-12 bg-green-100 text-green-700 font-bold text-2xl rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-green-200">1</div>
            <h3 className="font-bold text-xl mb-2">Carrega o Dispensador</h3>
            <p className="text-gray-600">Coloca os ingredientes nos <strong className="text-gray-900">6 compartimentos</strong>. Nao precisas de pesar antes, a balanca trata disso.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-b-4 border-green-500 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-2 bg-green-500"></div>
            <div className="w-12 h-12 bg-green-100 text-green-700 font-bold text-2xl rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-green-200">2</div>
            <h3 className="font-bold text-xl mb-2">Escolhe a Receita</h3>
            <p className="text-gray-600">Seleciona no <strong className="text-gray-900">Ecra Tactil 7&quot;</strong> ou na App entre 1000+ pratos guiados.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-b-4 border-green-500 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-2 bg-green-500"></div>
            <div className="w-12 h-12 bg-green-100 text-green-700 font-bold text-2xl rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-green-200">3</div>
            <h3 className="font-bold text-xl mb-2">Carrega START e Vai-te Embora</h3>
            <p className="text-gray-600">Ele doseia os ingredientes <strong className="text-gray-900">no momento certo</strong>, cozinha e mexe. Avisa-te quando esta pronto!</p>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 text-blue-900 p-5 rounded-lg inline-block text-base md:text-lg shadow-sm">
          <span className="font-bold">TECNOLOGIA QUICKSENSE:</span> O unico robot que adiciona os ingredientes sozinho enquanto cozinha. <br/>
          <span className="text-sm text-blue-700">Nao precisas de ficar a olhar!</span>
        </div>
      </div>
    </section>
  );
};

// 8. FeaturesGrid Component
const features: FeatureBox[] = [
  {
    id: 1,
    title: "Nunca falhas",
    description: "Segue o ecra e o robot doseia tudo. Resultado garantido a 100%.",
    imageUrl: "/images/quickchef img/Non sbagli mai.png"
  },
  {
    id: 2,
    title: "Faz tudo sozinho",
    description: "Gracas ao DISPENSADOR automatico, nao precisas de adicionar ingredientes durante a cozedura.",
    imageUrl: "/images/quickchef img/DISPENSER AUTOMATICO.png"
  },
  {
    id: 3,
    title: "Funcao Esvazia-Frigorifico",
    description: "Escreve o que tens no frigorifico na App e ele cria a receita perfeita. Zero desperdicio.",
    imageUrl: "/images/quickchef img/Funzione Svota-Frigo.png"
  },
  {
    id: 4,
    title: "Ceramica Antiaderente",
    description: "Jarro Unique revestido a ceramica: nunca pega e limpa-se com uma passagem de esponja.",
    imageUrl: "/images/quickchef img/Ceramica Antiaderente.png"
  },
  {
    id: 5,
    title: "45 Funcoes em 1",
    description: "Tritura, amassa, cozinha a vapor, fermenta, slow cooking, iogurte... substitui 10 eletrodomesticos.",
    imageUrl: "/images/quickchef img/45 Funzioni in 1.png"
  },
  {
    id: 6,
    title: "Resultados de Chef",
    description: "Cremes aveludados, massas para pizza perfeitas, molhos densos. Tudo automatico.",
    imageUrl: "/images/quickchef img/Risultati da Chef.png"
  }
];

const FeaturesGrid: React.FC = () => {
  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900">
          Porque todos o estao a escolher:
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
                  {feature.description}
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
          Comparacao rapida (sem rodeios)
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
                  Outros Robots
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                [<span key="1" className="text-xs md:text-base">Dispensador Automatico <br/><span className="text-[10px] md:text-xs font-normal text-gray-500">(Adiciona ingredientes sozinho)</span></span>, true, "Ausente (Tens de fazer tu)"],
                [<span key="2" className="text-xs md:text-base">Funcoes Totais</span>, "45 (O mais completo)", "Cerca de 12-20"],
                [<span key="3" className="text-xs md:text-base">Ecra Tactil</span>, "7&quot; SoftScreen", "Pequeno ou Ausente"],
                [<span key="4" className="text-xs md:text-base">App + Esvazia-frigorifico</span>, "Sim (1000+ Receitas)", "Poucas receitas"],
                [<span key="5" className="text-xs md:text-base">Material do Jarro</span>, "Ceramica Antiaderente", "Aco (Pega)"],
                [<span key="6" className="text-xs md:text-base">Capacidade</span>, "3,3L (Familia)", "2,2L (Pequena)"],
                [<span key="7" className="text-xs md:text-base">Limpeza</span>, "Auto-limpeza + Maq. louca", "Chata a mao"],
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
            QUERO O MEU - PAGO NA ENTREGA
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
               KIT COMPLETO
             </div>
             <div className="aspect-square w-full rounded-xl shadow-2xl border-4 border-white overflow-hidden transform -rotate-2 hover:rotate-0 transition-transform duration-500 bg-white">
                <img
                  src="/images/quickchef img/1.png"
                  alt="Conteudo da embalagem QuickChef"
                  className="w-full h-full object-cover"
                />
             </div>
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Package className="text-blue-600" size={32} /> O que vem na caixa:
            </h2>
            <ul className="space-y-4">
              {[
                <span key="1">Robot <strong>QuickChef 45 Funcoes</strong></span>,
                <span key="2">Jarro <strong>Ceramica Antiaderente (3,3L)</strong></span>,
                <span key="3"><strong className="text-blue-700">Dispensador Automatico</strong> QuickSense</span>,
                <span key="4">Acessorio <strong>Pa Saute</strong> (para risotos/molhos)</span>,
                <span key="5">Vaporizador XL de 2 niveis</span>,
                <span key="6">Kit de Corte: Laminas, Borboleta, Colher</span>,
                <span key="7"><strong className="text-green-700">BONUS:</strong> App Premium com 1000+ Receitas</span>,
                <span key="8"><strong className="text-gray-900">Garantia Portugal 2 Anos</strong></span>
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
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">Envio</p>
                      <p className="font-bold text-gray-900 text-lg leading-none mt-1">Rapido 24/48h</p>
                  </div>
              </div>

              <div className="flex items-center gap-3 p-2 border-t sm:border-t-0 sm:border-l border-gray-100">
                  <div className="bg-yellow-100 p-3 rounded-full text-yellow-700 shrink-0">
                      <Banknote size={24} />
                  </div>
                  <div>
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">Pagamento</p>
                      <p className="font-bold text-gray-900 text-lg leading-none mt-1">Na Entrega</p>
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
  { id: 1, name: "Maria", age: 57, location: "Lisboa", stars: 5, text: "Nunca fui boa na cozinha... com este fica tudo bem. O ecra diz-te o que fazer, muito comodo.", imageUrl: "/images/quickchef img/recensione 1.jpg" },
  { id: 2, name: "Jose", age: 63, location: "Porto", stars: 5, text: "Cozinhar estava a tornar-se pesado. Agora ponho tudo e ele faz. Limpeza muito mais simples.", imageUrl: "/images/quickchef img/recensione 2.jpg" },
  { id: 3, name: "Ana", age: 41, location: "Braga", stars: 5, text: "Eu trabalho e nao tenho tempo. Este salva-me a noite. Ate massas e molhos ficam perfeitos.", imageUrl: "/images/quickchef img/recensione 3.jpg" },
  { id: 4, name: "Paulo", age: 52, location: "Coimbra", stars: 5, text: "Balanca integrada top, finalmente nao erro mais as doses... antes deitava fora metade das receitas." },
  { id: 5, name: "Catarina", age: 60, location: "Faro", stars: 5, text: "O jarro nao pega, foi isso que me convenceu. Antes tinha de raspar sempre." },
  { id: 6, name: "Sofia", age: 35, location: "Setubal", stars: 5, text: "App com receitas utilissima... e a coisa do 'o que tenho no frigorifico' e genial, nao desperdico mais." }
];

const Reviews: React.FC = () => {
  return (
    <section className="py-12 px-4 bg-white border-t border-gray-200">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          Avaliacoes reais de clientes
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviewsList.map((review) => (
            <div key={review.id} className="bg-gray-50 rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              {review.imageUrl && (
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={review.imageUrl}
                    alt={`Avaliacao de ${review.name}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-bold text-gray-900">{review.name}, {review.age} anos</h4>
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
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span> Compra Verificada
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
  const router = useRouter();
  const { trackLeadEvent, saveUserData } = useFacebookTracking();
  const tmfpRef = useRef<HTMLInputElement>(null);
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
          value: 89
        });
      }

      // Redirect to thank you page
      router.push('/fb-ty/ty-fb-pt');
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <section id="order-form" className="py-12 px-4 bg-red-50 border-t-4 border-red-600 scroll-mt-20">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="bg-red-600 p-6 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-white opacity-10 transform -skew-x-12"></div>
          <h2 className="text-2xl md:text-3xl font-extrabold mb-2 uppercase relative z-10">
            Formulario de Encomenda
          </h2>
          <p className="font-medium opacity-90 relative z-10">Preenche para receber a oferta de 50% desconto</p>
        </div>

        <div className="bg-yellow-100 p-3 text-center border-b border-yellow-200">
          <p className="text-red-700 font-bold text-sm animate-pulse">
            Alta procura: restam apenas 7 unidades a este preco!
          </p>
        </div>

        <div className="p-5 md:p-8">
          <div className="flex justify-between items-center mb-6 pb-6 border-b border-gray-200 bg-gray-50 p-4 rounded-lg">
            <div>
              <p className="text-gray-500 line-through text-sm">Preco de Tabela: 178 EUR</p>
              <p className="text-red-600 font-bold text-2xl">Total: 89 EUR</p>
            </div>
            <div className="text-right">
              <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded border border-blue-200">ENVIO RAPIDO</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input type="hidden" name="tmfp" ref={tmfpRef} />
            <div>
              <label className="block text-gray-700 font-bold mb-1 text-sm uppercase tracking-wide">Nome Completo *</label>
              <input
                type="text"
                name="firstName"
                required
                autoComplete="name"
                className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-green-500 outline-none transition-colors text-lg"
                placeholder="Ex: Joao Silva"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-1 text-sm uppercase tracking-wide">Telefone (Telemovel) *</label>
              <input
                type="tel"
                name="phone"
                required
                autoComplete="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-green-500 outline-none transition-colors text-lg"
                placeholder="Ex: 912 345 678"
                value={formData.phone}
                onChange={handleChange}
              />
              <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                <ShieldCheck size={12}/> Importante para confirmar o envio
              </p>
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-1 text-sm uppercase tracking-wide">Morada Completa (Rua, Numero, Cidade, Codigo Postal) *</label>
              <textarea
                name="fullAddress"
                required
                autoComplete="street-address"
                className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-green-500 outline-none transition-colors text-lg h-32"
                placeholder="Ex: Rua da Liberdade 10, 1000-001 Lisboa"
                value={formData.fullAddress}
                onChange={handleChange}
              />
            </div>

            <div className="bg-gray-50 p-4 rounded border border-gray-200 mt-4 cursor-pointer hover:bg-gray-100 transition-colors">
               <label className="flex items-start gap-3 cursor-pointer pointer-events-none">
                 <input type="radio" checked readOnly className="w-5 h-5 text-green-600 mt-1" />
                 <div>
                   <span className="block font-bold text-gray-800">Pagamento na Entrega (Dinheiro)</span>
                   <span className="block text-xs text-gray-500">Pagas diretamente ao estafeta quando chegar a encomenda. Sem risco.</span>
                 </div>
               </label>
            </div>

            <Button type="submit" fullWidth pulse variant="primary" className="mt-6 shadow-xl text-xl" disabled={isSubmitting}>
              {isSubmitting ? 'A PROCESSAR...' : 'CONFIRMAR ENCOMENDA'}
            </Button>

            <div className="flex justify-center items-center gap-4 text-xs text-gray-400 mt-4">
              <span className="flex items-center gap-1"><Lock size={12}/> SSL Seguro 256-bit</span>
              <span className="flex items-center gap-1"><Truck size={12}/> Envio Rapido</span>
            </div>

          </form>
        </div>
      </div>
    </section>
  );
};

// 13. Faq Component
const faqs: FaqItem[] = [
  { question: "Posso pagar na entrega?", answer: "Sim, absolutamente. Pagas em dinheiro diretamente ao estafeta quando te entregar a encomenda. Nenhum pagamento antecipado necessario." },
  { question: "Quanto tempo demora a chegar?", answer: "Enviamos por correio expresso em 24/48 horas uteis para todo Portugal." },
  { question: "Preciso de saber cozinhar?", answer: "Nao! O robot guia-te passo a passo atraves do ecra tactil e da App. Foi pensado precisamente para quem nao tem tempo ou vontade de cozinhar mas quer comer bem." },
  { question: "Limpa-se facilmente?", answer: "Sim, tem funcao de auto-limpeza e o jarro tem revestimento ceramico antiaderente que se lava com uma passagem de esponja." },
  { question: "O que posso cozinhar?", answer: "Praticamente tudo: risotos, massa, cremes aveludados, cozedura a vapor (peixe/legumes), massas para pizza e pao, doces, iogurte e muito mais." },
  { question: "E se nao gostar?", answer: "Tens a garantia de 2 anos. Alem disso, oferecemos apoio ao cliente em portugues dedicado para qualquer duvida ou problema." }
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
          Perguntas Frequentes
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
    <section className="py-8 bg-gray-900 text-white text-center">
      <div className="max-w-4xl mx-auto px-4">
        <p className="text-lg font-bold mb-2">Distribuido por</p>
        <p className="text-3xl font-black tracking-tight">Ionizi</p>
        <p className="text-sm text-gray-400 mt-2">Qualidade garantida em Portugal</p>
      </div>
    </section>
  );
};

// 15. Footer Component
const Footer: React.FC = () => {
  const [modalOpen, setModalOpen] = useState<'privacy' | 'terms' | null>(null);

  const privacyContent = (
    <>
      <p><strong>Politica de Privacidade (RGPD)</strong></p>
      <p>Os dados recolhidos nesta pagina (Nome, Telefone, Morada) sao utilizados exclusivamente para a gestao e envio da sua encomenda do robot QuickChef.</p>
      <p>Os seus dados nunca serao vendidos a terceiros. O pagamento e feito na entrega, portanto nao recolhemos dados de cartoes de credito.</p>
      <p>Responsavel pelo tratamento: Ionizi Portugal Lda.</p>
    </>
  );

  const termsContent = (
    <>
      <p><strong>Termos e Condicoes de Venda</strong></p>
      <p>1. <strong>Pagamento:</strong> O pagamento e feito integralmente em dinheiro na entrega (Contra-reembolso) ao estafeta.</p>
      <p>2. <strong>Envio:</strong> A entrega e feita em 24/48 horas uteis por correio CTT/GLS.</p>
      <p>3. <strong>Direito de Retratacao:</strong> Nos termos da lei, o cliente tem direito a devolver o produto no prazo de 14 dias apos a rececao.</p>
      <p>4. <strong>Garantia:</strong> Todos os produtos estao cobertos por Garantia Legal de 24 meses para defeitos de conformidade.</p>
    </>
  );

  return (
    <>
      <footer className="bg-gray-900 text-gray-400 py-12 px-4 text-center text-sm border-t border-gray-800">
        <div className="max-w-4xl mx-auto">
          <p className="mb-6 font-semibold text-gray-300">&copy; {new Date().getFullYear()} Ionizi. Todos os direitos reservados.</p>

          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <button onClick={() => setModalOpen('privacy')} className="hover:text-white underline underline-offset-4 decoration-gray-600 hover:decoration-white transition-all">
              Politica de Privacidade
            </button>
            <button onClick={() => setModalOpen('terms')} className="hover:text-white underline underline-offset-4 decoration-gray-600 hover:decoration-white transition-all">
              Termos e Condicoes
            </button>
            <button onClick={() => setModalOpen('terms')} className="hover:text-white underline underline-offset-4 decoration-gray-600 hover:decoration-white transition-all">
              Envios e Devolucoes
            </button>
          </div>

          <div className="text-xs text-gray-600 max-w-2xl mx-auto leading-relaxed border-t border-gray-800 pt-6">
            <p className="mb-2">Este site nao faz parte do site Facebook ou Facebook Inc. Alem disso, este site nao e aprovado pelo Facebook de forma alguma. FACEBOOK e uma marca registada da FACEBOOK, Inc.</p>
            <p>As imagens sao para fins ilustrativos. As avaliacoes sao fruto de experiencias reais dos nossos clientes, mas os resultados podem variar de pessoa para pessoa.</p>
          </div>
        </div>
      </footer>

      <Modal
        isOpen={modalOpen === 'privacy'}
        onClose={() => setModalOpen(null)}
        title="Politica de Privacidade"
        content={privacyContent}
      />
      <Modal
        isOpen={modalOpen === 'terms'}
        onClose={() => setModalOpen(null)}
        title="Termos e Condicoes"
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
          <span className="text-xs text-gray-400 line-through">178 EUR</span>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-extrabold text-red-600">89 EUR</span>
          </div>
        </div>

        <div className="flex-grow">
          <Button onClick={scrollToForm} fullWidth size="md" className="shadow-none py-3 text-lg" icon={<ShoppingCart size={18} />}>
            ENCOMENDAR
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
