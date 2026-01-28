'use client';

import React, { useState, useEffect } from 'react';
import { 
  Star, Truck, ShieldCheck, Check, Smartphone, Cpu, Wifi, Battery, 
  MessageCircle, Camera, Play, Gamepad2, ShoppingCart, 
  AlertTriangle, X, ArrowDown, Share2, CreditCard, Shield, Zap, Layers, Map,
  Gift, Plus, BadgeCheck, Clock, Lock, XCircle, CheckCircle, MapPin, Quote, 
  ChevronDown, ChevronUp 
} from 'lucide-react';

// --- TYPES ---

interface Review {
  id: number;
  name: string;
  city: string;
  rating: number;
  text: string;
  verified: boolean;
  type: 'positive' | 'skeptic-converted';
  date?: string;
}

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface ComparisonItem {
  feature: string;
  a17: string;
  others: string;
}

interface ProductSpecs {
  display: string;
  dimensions: string;
  weight: string;
  sim: string;
  network: string;
  memory: string;
  battery: string;
  camera: string;
  os: string;
  chipset: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface UseCase {
  icon: string;
  title: string;
  description: string;
}

interface TargetAudience {
  title: string;
  description: string;
  imageText: string;
  image: string;
}

// --- CONSTANTS ---

const PRICE_PROMO = "69,99€";
const PRICE_LIST = "139,99€";
const DISCOUNT_PERCENTAGE = "-50%";

const REVIEWS: Review[] = [
  {
    id: 1,
    name: "Mauro T.",
    city: "Bergamo",
    rating: 5,
    text: "Ero molto scettico. Un telefono così piccolo a questo prezzo? Invece mi sono dovuto ricredere. Lo uso in cantiere perché ho paura di rompere il mio telefono principale da 800 euro. Questo A17 Mini prende ovunque, ha WhatsApp, le mail e se cade non mi viene un infarto. La batteria dura il giusto per la mia giornata lavorativa. Consigliatissimo a chi lavora manuale.",
    verified: true,
    type: 'skeptic-converted',
    date: "2 giorni fa"
  },
  {
    id: 2,
    name: "Carla B.",
    city: "Ferrara",
    rating: 5,
    text: "Finalmente! Ho le mani piccole e le borse sempre piene. I telefoni di oggi sembrano tablet, sono scomodissimi. A17 Mini è una liberazione: sta nel taschino dei jeans e non lo sento nemmeno. Lo uso per chiamare i nipoti su WhatsApp e guardare qualche ricetta su YouTube. Semplice, senza fronzoli, fa il suo dovere. Pagato al corriere che è stato gentilissimo.",
    verified: true,
    type: 'positive',
    date: "Oggi"
  },
  {
    id: 3,
    name: "Luca V.",
    city: "Roma",
    rating: 5,
    text: "Preso per mio figlio di 11 anni per la gita scolastica. Non volevo dargli uno smartphone costoso che avrebbe sicuramente perso o rotto. Questo è perfetto: ha il GPS così vedo dove sta, ci sentiamo su WhatsApp, ma è abbastanza piccolo da non distrarlo troppo. È tornato entusiasta perché i compagni lo volevano vedere tutti. Ottimo acquisto.",
    verified: true,
    type: 'positive',
    date: "Ieri"
  },
  {
    id: 4,
    name: "Silvana R.",
    city: "Torino",
    rating: 4,
    text: "Arrivato in 24 ore esatte. Design molto curato, sembra un piccolo lingotto. Il vetro posteriore è elegante. Non aspettatevi le foto di una macchina professionale, ma per mandare le foto dei gatti su WhatsApp va benissimo. Il volume dell'audio è sorprendentemente alto per le dimensioni.",
    verified: true,
    type: 'positive',
    date: "3 giorni fa"
  },
  {
    id: 5,
    name: "Giorgio M.",
    city: "Latina",
    rating: 5,
    text: "Faccio il runner amatoriale. Correre con i padelloni moderni legati al braccio è un incubo, pesano e scivolano. A17 Mini lo metto nel taschino dei pantaloncini e me lo dimentico. Ha Spotify e il GPS per tracciare la corsa. Per me è il miglior secondo telefono possibile per chi fa sport.",
    verified: true,
    type: 'skeptic-converted',
    date: "1 settimana fa"
  },
  {
    id: 6,
    name: "Anna P.",
    city: "Palermo",
    rating: 5,
    text: "L'ho regalato a mio padre che ha 70 anni. Odiava il suo vecchio smartphone touch perché 'troppo complicato e pieno di icone'. Su questo gli ho messo solo WhatsApp e Telefono nella schermata home. Essendo piccolo lo tiene nel taschino della camicia come faceva con i vecchi cellulari. È felicissimo.",
    verified: true,
    type: 'positive',
    date: "Oggi"
  },
  {
    id: 7,
    name: "Roberto S.",
    city: "Milano",
    rating: 5,
    text: "Uso due SIM per lavoro. Avere due telefoni giganti in tasca era impossibile. Ora ho il mio personale e questo A17 Mini per il numero aziendale. La funzione hotspot è una salvezza quando sono in treno e devo collegare il PC. La ricezione è ottima.",
    verified: true,
    type: 'positive',
    date: "4 giorni fa"
  },
  {
    id: 8,
    name: "Elena D.",
    city: "Verona",
    rating: 5,
    text: "Esteticamente bellissimo. Ho preso quello Arancione ed è molto particolare. Nella confezione c'era già tutto, cover e pellicola, cosa che ormai non ti danno nemmeno con i telefoni da 1000 euro. Bravi.",
    verified: true,
    type: 'positive',
    date: "2 settimane fa"
  },
  {
    id: 9,
    name: "Pietro F.",
    city: "Bari",
    rating: 4,
    text: "Rapporto qualità prezzo onesto. Non è un fulmine di guerra con i giochi pesanti, ma per social, messaggi e internet va più che bene. Comodo il fatto di poter espandere la memoria con la schedina.",
    verified: true,
    type: 'skeptic-converted',
    date: "Ieri"
  },
  {
    id: 10,
    name: "Lucia G.",
    city: "Genova",
    rating: 5,
    text: "Pagamento alla consegna comodissimo, non mi fido a mettere la carta online. Il corriere mi ha fatto controllare il pacco. Azienda seria.",
    verified: true,
    type: 'positive',
    date: "5 giorni fa"
  },
  {
    id: 11,
    name: "Marco L.",
    city: "Firenze",
    rating: 5,
    text: "Lo uso come 'telefono da disintossicazione' nel weekend. Piccolo, essenziale, mi permette di non stare sempre incollato allo schermo ma di essere raggiungibile per le urgenze. Mi ha cambiato la vita in meglio.",
    verified: true,
    type: 'positive',
    date: "1 mese fa"
  },
  {
    id: 12,
    name: "Giovanna T.",
    city: "Napoli",
    rating: 5,
    text: "Piccolo gioiello. Funziona tutto, anche il Play Store. Ho scaricato l'app della banca e funziona. Incredibile la tecnologia di oggi in così poco spazio.",
    verified: true,
    type: 'positive',
    date: "3 giorni fa"
  }
];

const COMPARISON_DATA: ComparisonItem[] = [
  { feature: "Portabilità", a17: "Totale (55g)", others: "Pesante (>200g)" },
  { feature: "Uso una mano", a17: "Perfetto", others: "Impossibile" },
  { feature: "Prezzo", a17: "Accessibile (Sotto 70€)", others: "Esagerato (>300€)" },
  { feature: "Rischio Rottura", a17: "Minimo (Compatto)", others: "Alto (Schermo esposto)" },
  { feature: "Privacy/Essenziale", a17: "Sì (Meno distrazioni)", others: "No (Troppe notifiche)" },
  { feature: "Dotazione", a17: "Full (Cover+Film inclusi)", others: "Solo cavo" },
];

const FEATURES_LIST: Feature[] = [
  { icon: 'pocket', title: "Tascabile Davvero", description: "Dimensioni 88x45mm: sparisce nel taschino o nella pochette." },
  { icon: 'sim', title: "Dual SIM Ibrida", description: "Gestisci due numeri (Lavoro + Casa) o espandi la memoria." },
  { icon: 'android', title: "Android 8.1", description: "Sistema collaudato e compatibile con le app più usate oggi." },
  { icon: 'wifi', title: "Connettività Totale", description: "WiFi, GPS, Bluetooth 4.0 per collegare cuffie e auto." },
  { icon: 'camera', title: "Cattura i Momenti", description: "Camera 12MP (post) + 5MP (front) per videochiamate chiare." },
  { icon: 'battery', title: "Batteria Affidabile", description: "Ottimizzata per portarti a sera con uso standard." },
  { icon: 'play', title: "Google Play Store", description: "Scarica WhatsApp, Facebook, Maps e le tue app preferite." },
  { icon: 'usb', title: "Ricarica Type-C", description: "Lo standard moderno: usa lo stesso cavo di tutti gli altri dispositivi." },
  { icon: 'hotspot', title: "Hotspot Portatile", description: "Trasforma il telefono in un modem WiFi per il tuo PC o Tablet." },
  { icon: 'build', title: "Design Premium", description: "Vetro e metallo. Solido al tatto, non è 'plastica leggera'." },
];

const TARGET_AUDIENCE: TargetAudience[] = [
  { title: "Per i Genitori Smart", description: "Dai a tuo figlio un telefono sicuro, con GPS e WhatsApp, ma senza spendere una fortuna.", imageText: "Bambini/Sicurezza", image: "/images/miniphonea17%20img/Per%20i%20Genitori%20Smart.png" },
  { title: "Per gli Sportivi", description: "Monitora Kcal e battito con le app salute, ascolta musica con il bluetooth. Leggero come una piuma, zero ingombro mentre corri.", imageText: "Sport/Running", image: "/images/miniphonea17%20img/Per%20gli%20Sportivi.png" },
  { title: "Per i Lavoratori", description: "Artigiani, muratori, professionisti: serve un secondo numero, un telefono robusto che entri nel taschino.", imageText: "Lavoro/Cantiere", image: "/images/miniphonea17%20img/Per%20i%20Lavoratori.png" },
  { title: "Per gli Anziani", description: "Cercano semplicità. Un telefono che fa 'il telefono', leggero e facile da impugnare.", imageText: "Anziani/Semplicità", image: "/images/miniphonea17%20img/Per%20gli%20Anziani.png" },
  { title: "Per i Viaggiatori", description: "Un telefono di backup (muletto) in caso di furto o rottura del principale. Indispensabile.", imageText: "Viaggi/Backup", image: "/images/miniphonea17%20img/Per%20i%20Viaggiatori.png" },
  { title: "Zero Ansia & Ingombro", description: "Hai WhatsApp e Mappe, ma senza il peso di un mattone. Ideale per uscire leggeri la sera.", imageText: "Relax/Leggerezza", image: "/images/miniphonea17%20img/Zero%20Ansia%20%26%20Ingombro.png" },
];

const FAQS: FAQItem[] = [
  {
    question: "Posso usare WhatsApp, Facebook e YouTube?",
    answer: "Assolutamente SÌ. A17 Mini monta Android 8.1 con Google Play Store ufficiale. Puoi scaricare WhatsApp, Facebook, TikTok, YouTube, le app della banca, il meteo e tutto ciò che useresti su un telefono normale. Ovviamente, essendo lo schermo piccolo, l'esperienza è diversa, ma funzionale al 100%."
  },
  {
    question: "La batteria quanto dura?",
    answer: "Il fornitore dichiara una batteria maggiorata (9000 mAh nominali) ottimizzata per le dimensioni. Nell'uso reale quotidiano (chiamate, messaggi, un po' di social) copre tranquillamente la giornata. Se usato intensamente come hotspot o navigatore, come tutti gli smartphone, il consumo aumenta."
  },
  {
    question: "È davvero così piccolo?",
    answer: "Sì, è grande circa come una carta di credito (88mm x 45mm). È studiato per sparire nel palmo della mano o nel taschino piccolo dei jeans. Pesa solo 55 grammi, praticamente una piuma rispetto ai 200+ grammi dei telefoni moderni."
  },
  {
    question: "Supporta due SIM e la memoria espandibile?",
    answer: "Sì. Ha un carrellino ibrido: puoi inserire 2 Nano SIM contemporaneamente (perfetto per Lavoro + Personale) oppure 1 Nano SIM + 1 MicroSD per espandere la memoria fino a 128GB extra."
  },
  {
    question: "Ha il jack per le cuffie?",
    answer: "Per mantenere le dimensioni così ridotte, il jack da 3.5mm è stato rimosso. Tuttavia, ha il Bluetooth 4.0 perfettamente compatibile con tutte le cuffie wireless, auricolari e il sistema dell'auto. Puoi anche usare un adattatore USB-C."
  },
  {
    question: "Come funziona il pagamento alla consegna?",
    answer: "È semplicissimo e sicuro. Ordini ora compilando il modulo qui sotto. Non ti chiediamo nessun dato della carta di credito. Spediamo il pacco (di solito in 24/48h) e quando arriva il corriere a casa tua, paghi l'importo esatto in contanti direttamente a lui. Nessun rischio."
  },
  {
    question: "Che lingue ci sono?",
    answer: "Il telefono arriva già impostato o configurabile in Italiano. Supporta anche Inglese, Francese, Tedesco, Spagnolo, Russo, Arabo e molte altre lingue globali."
  },
  {
    question: "Cosa trovo nella scatola?",
    answer: "Ricevi un pacchetto completo: lo Smartphone A17 Mini, il cavo di ricarica USB-C, una cover trasparente protettiva su misura e una pellicola per lo schermo già pronta da applicare. È tutto incluso nel prezzo."
  },
  {
    question: "È adatto a persone anziane?",
    answer: "Sì, perché è leggero e maneggevole. L'interfaccia Android può essere semplificata mettendo le icone principali (Telefono, WhatsApp) grandi nella schermata home. Il volume è buono e il vivavoce si sente bene."
  },
  {
    question: "Ha la garanzia?",
    answer: "Certamente. Offriamo la garanzia legale di 24 mesi per i difetti di conformità. Inoltre, hai la nostra assistenza clienti dedicata via email o WhatsApp per qualsiasi configurazione iniziale."
  }
];

// --- COMPONENTS ---

// Hero Component
const Hero = ({ onScrollToOrder }: { onScrollToOrder: () => void }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const colors = [
    { name: 'Nero Classico', hex: '#000000', border: 'border-gray-900' },
    { name: 'Argento Vivo', hex: '#C0C0C0', border: 'border-gray-400' },
    { name: 'Blu Profondo', hex: '#1e3a8a', border: 'border-blue-900' },
    { name: 'Arancione Pop', hex: '#f97316', border: 'border-orange-500' },
  ];
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  const images = [
    "/images/miniphonea17%20img/1.png",
    "/images/miniphonea17%20img/2.png",
    "/images/miniphonea17%20img/3.png",
    "/images/miniphonea17%20img/4.png"
  ];

  const benefits = [
    {
      title: "WhatsApp, TikTok & YouTube",
      desc: "Tutte le tue app di intrattenimento e messaggistica sempre con te."
    },
    {
      title: "Giochi, Banca & Utility",
      desc: "Scarica dal Play Store Home Banking, Candy Crush e le tue app essenziali."
    },
    {
      title: "GPS & Google Maps",
      desc: "Naviga in auto o a piedi con precisione assoluta, senza perderti mai."
    },
    {
      title: "Dual SIM, WiFi & Bluetooth",
      desc: "Usa due numeri insieme, connettiti al WiFi veloce e alle tue cuffie senza fili."
    },
    {
      title: "Fotocamera & Touchscreen HD",
      desc: "Scatta foto, fai videochiamate e naviga con un tocco sullo schermo ad alta definizione."
    },
    {
      title: "Batteria a Lunga Durata",
      desc: "Progettata per accompagnarti tutto il giorno senza lasciarti a piedi."
    }
  ];

  return (
    <section className="bg-white pb-8">
      <div className="max-w-md mx-auto bg-white md:max-w-4xl lg:flex lg:flex-row-reverse lg:items-start overflow-hidden">
        
        {/* Image Slider - 1:1 Aspect Ratio */}
        <div className="relative w-full aspect-square lg:w-1/2 bg-[#f3f4f6] p-0 md:p-4 lg:sticky lg:top-4">
          <div className="relative w-full h-full md:rounded-2xl overflow-hidden shadow-none md:shadow-lg border-b md:border border-gray-200">
             <img 
               src={images[currentImage]} 
               alt="A17 Mini Smartphone - Vista Prodotto" 
               className="w-full h-full object-cover"
             />
             <div className="absolute top-0 right-0 bg-[#dc2626] text-white font-black px-4 py-2 md:rounded-bl-xl shadow-md z-10 text-xl">
                {DISCOUNT_PERCENTAGE}
             </div>
             <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
                <span className="bg-black/50 text-white px-3 py-1 rounded-full text-sm font-bold backdrop-blur-sm">
                    A17 Mini Frontale
                </span>
             </div>
          </div>
          
          <div className="flex justify-center mt-4 space-x-3 absolute bottom-4 left-0 right-0 md:static">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImage(idx)}
                className={`w-12 h-12 md:w-16 md:h-16 rounded-lg border-2 overflow-hidden transition-all bg-white shadow-sm ${idx === currentImage ? 'border-[#dc2626] ring-2 ring-red-100' : 'border-gray-300 opacity-70'}`}
              >
                  <img src={images[idx]} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="px-5 pt-6 lg:w-1/2 text-left">
          <div className="flex items-center space-x-1 mb-3">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} size={16} className="text-yellow-400 fill-current" />
            ))}
            <span className="text-xs md:text-sm text-gray-500 ml-2 font-bold underline decoration-dotted">Migliaia di clienti soddisfatti</span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-gray-900 mb-4 tracking-tight">
            Finalmente uno smartphone che <span className="text-[#dc2626] bg-red-50 px-2 rounded">entra davvero in tasca</span>... ma fa tutto.
          </h1>
          
          <p className="text-base md:text-lg text-gray-600 mb-8 leading-relaxed">
            <strong>A17 Mini</strong> è il telefono essenziale. Piccolo come una carta di credito, potente come uno smartphone vero.
          </p>

          {/* Screenshot Bullet Points */}
          <div className="space-y-5 mb-8">
            {benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start">
                    <div className="bg-green-100 p-1 rounded-full mr-3 mt-1 text-[#16a34a] shrink-0">
                        <Check size={16} strokeWidth={4} />
                    </div>
                    <div>
                        <strong className="text-gray-900 block text-sm md:text-base mb-1">{benefit.title}</strong>
                        <span className="text-gray-600 text-xs md:text-sm leading-snug block">{benefit.desc}</span>
                    </div>
                </div>
            ))}
          </div>

          {/* Color Selector */}
          <div className="mb-6">
              <span className="text-sm font-bold text-gray-700 uppercase mb-2 block">Seleziona Colore: <span className="text-[#dc2626]">{selectedColor.name}</span></span>
              <div className="flex space-x-3">
                  {colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color)}
                        className={`w-10 h-10 rounded-full border-2 shadow-sm transition-transform hover:scale-110 ${selectedColor.name === color.name ? 'ring-2 ring-offset-2 ring-[#111827] scale-110' : ''}`}
                        style={{ backgroundColor: color.hex }}
                        aria-label={`Seleziona colore ${color.name}`}
                      />
                  ))}
              </div>
          </div>

          <div className="flex items-end space-x-3 mb-6 bg-gray-50 p-4 rounded-xl border border-gray-200 w-fit">
            <div className="flex flex-col">
                <span className="text-xs text-gray-500 uppercase font-bold">Prezzo Offerta</span>
                <div className="text-4xl md:text-5xl font-black text-[#dc2626] tracking-tighter">{PRICE_PROMO}</div>
            </div>
            <div className="flex flex-col pb-1">
                <span className="text-xs text-gray-400 font-bold">Listino</span>
                <div className="text-xl text-gray-400 line-through decoration-2 font-medium">{PRICE_LIST}</div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-2 md:gap-3 mb-6">
              <span className="bg-green-100 text-green-800 text-[10px] md:text-xs font-bold px-3 py-1 rounded-full flex items-center border border-green-200">
                  <Truck size={12} className="mr-1"/> SPEDIZIONE 24/48H
              </span>
              <span className="bg-green-100 text-green-800 text-[10px] md:text-xs font-bold px-3 py-1 rounded-full flex items-center border border-green-200">
                  <ShieldCheck size={12} className="mr-1"/> PAGAMENTO ALLA CONSEGNA
              </span>
          </div>

          <button 
            onClick={onScrollToOrder}
            className="w-full bg-[#16a34a] hover:bg-green-700 text-white font-black text-xl md:text-2xl py-5 rounded-xl shadow-[0_4px_14px_0_rgba(22,163,74,0.39)] transform active:scale-95 transition-all flex items-center justify-center animate-bounce-slow"
          >
            ORDINA E PAGA AL CORRIERE
          </button>
          <p className="text-center text-xs text-gray-500 mt-3">Disponibilità limitata. Nessuna carta di credito richiesta.</p>
        </div>
      </div>
    </section>
  );
};

// Demonstration Component
const Demonstration = ({ onScrollToOrder }: { onScrollToOrder?: () => void }) => {
  const features = [
    {
      id: 'whatsapp',
      title: "Messaggi & Social",
      desc: "WhatsApp, Instagram e TikTok in una mano.",
      icon: <MessageCircle className="w-4 h-4 md:w-5 md:h-5 text-white" />,
      color: "bg-green-500",
      image: "/images/miniphonea17%20img/MESSAGGI%20E%20SOCIAL%20GIF.gif"
    },
    {
      id: 'camera',
      title: "Foto & Video",
      desc: "Scatta foto e selfie nitidi al volo.",
      icon: <Camera className="w-4 h-4 md:w-5 md:h-5 text-white" />,
      color: "bg-blue-500",
      image: "/images/miniphonea17%20img/Foto%20%26%20VideoM%20GIF.gif"
    },
    {
      id: 'media',
      title: "Video & YouTube",
      desc: "Guarda video ovunque senza ingombro.",
      icon: <Play className="w-4 h-4 md:w-5 md:h-5 text-white" />,
      color: "bg-red-500",
      image: "/images/miniphonea17%20img/_Video%20%26%20YouTube%20GIF.gif"
    },
    {
      id: 'games',
      title: "Giochi & Svago",
      desc: "Passatempo perfetto per le pause.",
      icon: <Gamepad2 className="w-4 h-4 md:w-5 md:h-5 text-white" />,
      color: "bg-orange-500",
      image: "/images/miniphonea17%20img/Giochi%20%26%20Svago%20GIF.gif"
    }
  ];

  return (
    <div className="py-10 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-extrabold text-center mb-4 leading-tight">
          Cosa puoi farci <span className="text-[#dc2626] underline decoration-wavy">davvero</span>?
        </h2>
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto text-sm md:text-base">
            Molti pensano sia un giocattolo. Sbagliato. Ecco la prova che è uno smartphone completo.
        </p>

        {/* 4 PERFECT SQUARE BLOCKS (1:1) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-8">
            {features.map((feat) => (
                <div key={feat.id} className="relative group rounded-2xl overflow-hidden shadow-md cursor-default aspect-square">
                    {/* Background Image/GIF (Square) */}
                    <img 
                        src={feat.image} 
                        alt={feat.title} 
                        className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent flex flex-col justify-end p-3 md:p-4">
                        
                        {/* Icon Badge */}
                        <div className={`${feat.color} w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center mb-2 shadow-lg transform group-hover:-translate-y-1 transition-transform`}>
                            {feat.icon}
                        </div>
                        
                        {/* Text Content - Optimized for Mobile Square */}
                        <h3 className="text-white font-bold text-sm md:text-lg leading-tight mb-1">{feat.title}</h3>
                        <p className="text-gray-300 text-[10px] md:text-sm leading-tight opacity-90 line-clamp-2 md:line-clamp-none">{feat.desc}</p>
                    </div>
                </div>
            ))}
        </div>

        {onScrollToOrder && (
            <div className="text-center">
                <button 
                  onClick={onScrollToOrder}
                  className="w-full md:w-auto bg-[#16a34a] text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-green-700 transition-transform active:scale-95 flex items-center justify-center mx-auto text-sm md:text-base"
                >
                    <ShoppingCart size={20} className="mr-2" />
                    VOGLIO PROVARLO SUBITO
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

// ProblemSolution Component
const ProblemSolution = () => {
  return (
    <div className="py-16 px-4 bg-gray-50 border-t border-gray-200">
      {/* Problem Section */}
      <div className="max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-8 leading-tight">
          La verità: i telefoni di oggi sono diventati <span className="text-[#dc2626] underline decoration-wavy">TROPPO INGOMBRANTI</span>.
        </h2>
        
        <p className="text-center text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            Ti senti frustrato ogni volta che devi infilare lo smartphone in tasca? Pesano, scivolano e costano troppo.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border-t-4 border-[#dc2626] flex flex-col items-center text-center">
             <div className="bg-red-100 p-3 rounded-full mb-4 text-[#dc2626]">
                <X size={32} strokeWidth={3} />
             </div>
            <h3 className="font-bold text-xl mb-2 text-gray-900">
                Tasche che Esplodono
            </h3>
            <p className="text-gray-600 text-sm">
                Non entrano nei jeans, rovinano la giacca e occupano tutta la borsa. Uno stress continuo.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border-t-4 border-[#dc2626] flex flex-col items-center text-center">
             <div className="bg-red-100 p-3 rounded-full mb-4 text-[#dc2626]">
                <X size={32} strokeWidth={3} />
             </div>
            <h3 className="font-bold text-xl mb-2 text-gray-900">
                Paura di Romperlo
            </h3>
            <p className="text-gray-600 text-sm">
                Un attimo di distrazione e... crack. Centinaia di euro di danni per un vetro gigante.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border-t-4 border-[#dc2626] flex flex-col items-center text-center">
             <div className="bg-red-100 p-3 rounded-full mb-4 text-[#dc2626]">
                <X size={32} strokeWidth={3} />
             </div>
            <h3 className="font-bold text-xl mb-2 text-gray-900">
                Impossibile con una Mano
            </h3>
            <p className="text-gray-600 text-sm">
                Devi usare sempre due mani per scrivere o navigare. Scomodissimo quando sei in giro.
            </p>
          </div>
        </div>

        <div className="mt-10 text-center">
            <p className="text-xl font-bold italic text-gray-800">"C'è un'alternativa. Riscopri la comodità."</p>
            <div className="flex justify-center mt-6">
                <ArrowDown className="text-gray-400 animate-bounce" size={40} />
            </div>
        </div>
      </div>

      {/* Solution Section */}
      <div className="max-w-4xl mx-auto bg-[#111827] text-white rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#16a34a] opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#dc2626] opacity-10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>
        
        <div className="relative z-10 text-center">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6">
                Ecco <span className="text-[#16a34a]">A17 Mini</span>.
            </h2>
            <p className="text-xl md:text-2xl font-light mb-10 text-gray-200">
                Non è solo un telefono. È la tua libertà tascabile.
            </p>

            {/* Benefits Micro-List */}
            <div className="flex flex-col md:flex-row justify-center gap-4 mb-10">
                <div className="bg-white/10 px-4 py-2 rounded-full border border-white/20 flex items-center justify-center">
                    <Check size={18} className="text-[#16a34a] mr-2" /> <span className="font-bold">Uso con una mano</span>
                </div>
                 <div className="bg-white/10 px-4 py-2 rounded-full border border-white/20 flex items-center justify-center">
                    <Check size={18} className="text-[#16a34a] mr-2" /> <span className="font-bold">Zero ingombro</span>
                </div>
                 <div className="bg-white/10 px-4 py-2 rounded-full border border-white/20 flex items-center justify-center">
                    <Check size={18} className="text-[#16a34a] mr-2" /> <span className="font-bold">Zero ansia</span>
                </div>
            </div>

            {/* Steps */}
            <div className="grid md:grid-cols-3 gap-8 text-left">
                <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-white/10">
                    <div className="text-4xl font-black text-[#16a34a] mb-2">01</div>
                    <h4 className="font-bold text-lg mb-2">Inserisci la SIM</h4>
                    <p className="text-sm text-gray-300">Funziona con tutte le SIM italiane. Puoi metterne anche due contemporaneamente.</p>
                </div>
                <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-white/10">
                    <div className="text-4xl font-black text-[#16a34a] mb-2">02</div>
                    <h4 className="font-bold text-lg mb-2">Accendi e Vai</h4>
                    <p className="text-sm text-gray-300">Android 8.1 è già installato e configurato in Italiano. Pronto all'uso in 30 secondi.</p>
                </div>
                <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-white/10">
                    <div className="text-4xl font-black text-[#16a34a] mb-2">03</div>
                    <h4 className="font-bold text-lg mb-2">Scarica le App</h4>
                    <p className="text-sm text-gray-300">Apri il Play Store e scarica WhatsApp, YouTube o quello che ti serve. Fatto!</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

// Features Component
const Features = ({ onScrollToOrder }: { onScrollToOrder?: () => void }) => {
    const getIcon = (name: string) => {
        switch(name) {
            case 'pocket': return <Smartphone size={40} className="text-[#dc2626] mb-4" strokeWidth={1.5} />;
            case 'sim': return <Layers size={40} className="text-[#dc2626] mb-4" strokeWidth={1.5} />;
            case 'android': return <Shield size={40} className="text-[#dc2626] mb-4" strokeWidth={1.5} />;
            case 'wifi': return <Wifi size={40} className="text-[#dc2626] mb-4" strokeWidth={1.5} />;
            case 'camera': return <Camera size={40} className="text-[#dc2626] mb-4" strokeWidth={1.5} />;
            case 'battery': return <Zap size={40} className="text-[#dc2626] mb-4" strokeWidth={1.5} />;
            case 'play': return <MessageCircle size={40} className="text-[#dc2626] mb-4" strokeWidth={1.5} />;
            case 'hotspot': return <Share2 size={40} className="text-[#dc2626] mb-4" strokeWidth={1.5} />;
            case 'usb': return <CreditCard size={40} className="text-[#dc2626] mb-4" strokeWidth={1.5} />; 
            case 'build': return <Smartphone size={40} className="text-[#dc2626] mb-4" strokeWidth={1.5} />;
            default: return <Map size={40} className="text-[#dc2626] mb-4" strokeWidth={1.5} />;
        }
    };

  return (
    <div className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 mb-4 uppercase tracking-tight">
            Tecnologia Completa
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
                Non farti ingannare dalle dimensioni. Dentro c'è tutto quello che ti aspetti da uno smartphone moderno.
            </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {FEATURES_LIST.map((feat, idx) => (
            <div key={idx} className="bg-gray-50 p-6 rounded-2xl flex flex-col items-center text-center hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-[#dc2626] group">
              <div className="transform group-hover:scale-110 transition-transform duration-300">
                {getIcon(feat.icon)}
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-900">{feat.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{feat.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gray-100 p-4 rounded-lg text-center max-w-3xl mx-auto border border-gray-200">
            <h4 className="font-bold text-gray-700 text-sm uppercase mb-2">Specifiche Tecniche Dettagliate</h4>
            <p className="text-xs text-gray-500 leading-relaxed font-mono mb-4">
                CPU: MediaTek MTK6580 Quad Core (6 Core dich.) | RAM: 16GB (Dich.) | ROM: 64GB | OS: Android 8.1 | 
                Display: 3.0" | Batt: 9000mAh (Nominali) | Cam: 5MP+12MP | 
                Rete: 3G WCDMA / WiFi / GPS / BT 4.0 | Dimensioni: 88.4x45.2x11mm | Peso: 55g.
            </p>
            
            {onScrollToOrder && (
                <button 
                  onClick={onScrollToOrder}
                  className="bg-[#16a34a] text-white font-bold py-2 px-6 rounded-full shadow hover:bg-green-700 transition-transform active:scale-95 inline-flex items-center text-sm"
                >
                    <ShoppingCart size={16} className="mr-2" />
                    VOGLIO ORDINARLO ORA
                </button>
            )}
        </div>
      </div>
    </div>
  );
};

// TargetAudience Component
const TargetAudienceComponent = () => {
  return (
    <div className="py-16 px-4 bg-gray-100">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-black text-center mb-10 text-gray-900">Per chi è perfetto A17 Mini?</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TARGET_AUDIENCE.map((target, idx) => (
            <div key={idx} className="bg-white rounded-xl overflow-hidden shadow-sm flex flex-col h-full border-b-4 border-[#16a34a]">
              {/* Image Container - NOW SQUARE 1:1 */}
              <div className="aspect-square w-full bg-gray-300 relative">
                  <img
                    src={target.image}
                    alt={target.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
                      <h3 className="text-white font-bold text-xl drop-shadow-md">{target.title}</h3>
                  </div>
              </div>
              <div className="p-6 flex-grow">
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">{target.description}</p>
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center text-[#16a34a] font-bold text-sm">
                    <Check size={16} className="mr-2" /> Scelta consigliata
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// KidsSection Component
const KidsSection = () => {
  return (
    <div className="py-16 px-4 bg-blue-50/50 border-t border-b border-blue-100">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">
            
            {/* Left Content */}
            <div className="lg:w-1/2">
                <span className="bg-blue-100 text-blue-800 font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wide mb-4 inline-block">
                    Perfetto per Genitori e Figli
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
                    Il Primo Smartphone <br/>
                    <span className="text-[#16a34a]">Sicuro & Indistruttibile?</span>
                </h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    Vuoi che tuo figlio sia raggiungibile ma hai paura a dargli un telefono da 500€? 
                    A17 Mini è la soluzione che fa felici tutti: <strong>lui ha le sue app, tu hai la tranquillità.</strong>
                </p>

                <div className="space-y-6">
                    <div className="flex items-start">
                        <div className="bg-white p-3 rounded-full shadow-sm mr-4 border border-blue-100 text-blue-600">
                            <MapPin size={24} strokeWidth={2.5} />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 text-lg">GPS & Localizzazione</h4>
                            <p className="text-sm text-gray-600">Grazie a Google Maps e al GPS integrato, puoi sapere sempre dove si trova in caso di necessità.</p>
                        </div>
                    </div>

                    <div className="flex items-start">
                        <div className="bg-white p-3 rounded-full shadow-sm mr-4 border border-green-100 text-green-600">
                            <MessageCircle size={24} strokeWidth={2.5} />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 text-lg">WhatsApp & Chiamate</h4>
                            <p className="text-sm text-gray-600">Resta sempre in contatto. Può mandarti vocali, foto e chiamarti quando esce da scuola.</p>
                        </div>
                    </div>

                    <div className="flex items-start">
                        <div className="bg-white p-3 rounded-full shadow-sm mr-4 border border-purple-100 text-purple-600">
                            <Gamepad2 size={24} strokeWidth={2.5} />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 text-lg">Divertimento "Controllato"</h4>
                            <p className="text-sm text-gray-600">Supporta YouTube e giochi leggeri per i momenti di svago, ma lo schermo compatto evita che resti "ipnotizzato" per ore.</p>
                        </div>
                    </div>

                    <div className="flex items-start">
                        <div className="bg-white p-3 rounded-full shadow-sm mr-4 border border-red-100 text-red-600">
                            <ShieldCheck size={24} strokeWidth={2.5} />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 text-lg">Zero Rischi (Anche se cade)</h4>
                            <p className="text-sm text-gray-600">È piccolo, compatto e robusto. E se dovesse succedere l'impossibile... non hai perso uno stipendio.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Visual/Testimonial */}
            <div className="lg:w-1/2 relative">
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 relative z-10">
                    <Quote className="text-blue-100 absolute top-4 right-4" size={60} />
                    <div className="flex items-center mb-6">
                        <img src="https://placehold.co/100x100/2563eb/white?text=L" alt="Luca" className="w-16 h-16 rounded-full border-2 border-blue-500 mr-4"/>
                        <div>
                            <div className="font-bold text-lg text-gray-900">Luca V.</div>
                            <div className="text-sm text-gray-500">Papà di un ragazzo di 11 anni</div>
                        </div>
                    </div>
                    <p className="text-gray-700 italic text-lg leading-relaxed mb-4">
                        "Preso per mio figlio per la gita scolastica. Non volevo dargli il mio vecchio iPhone che avrebbe sicuramente perso. <span className="bg-yellow-100 font-bold px-1">Questo è perfetto:</span> ha il GPS così vedo dove sta, ci sentiamo su WhatsApp, ma è abbastanza piccolo da stare nel marsupio senza dar fastidio. Lui è felicissimo perché i compagni lo volevano vedere tutti!"
                    </p>
                    <div className="flex items-center text-sm font-bold text-green-600">
                        <ShieldCheck size={16} className="mr-1" /> Acquisto Verificato
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-200 rounded-full blur-3xl opacity-50 -z-0"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-green-200 rounded-full blur-3xl opacity-50 -z-0"></div>
            </div>
        </div>
      </div>
    </div>
  );
};

// Comparison Component
const Comparison = () => {
  return (
    <div className="py-16 px-4 bg-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-black text-center mb-8 uppercase tracking-tight">
            A17 Mini <span className="text-gray-400 font-light lowercase">vs</span> Padelloni
        </h2>
        
        <div className="overflow-hidden border-2 border-gray-100 rounded-2xl shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[350px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="p-3 md:p-4 text-xs md:text-sm font-bold text-gray-400 uppercase tracking-wider w-1/3">Caratteristica</th>
                  <th className="p-3 md:p-4 font-black text-[#111827] text-center w-1/3 text-lg md:text-xl bg-green-50/50 border-x border-green-100 text-[#16a34a]">A17 Mini</th>
                  <th className="p-3 md:p-4 font-bold text-gray-400 text-center w-1/3 text-xs md:text-sm">Smartphone <br/>Tradizionali</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {COMPARISON_DATA.map((item, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}>
                    <td className="p-3 md:p-4 text-xs md:text-sm font-bold text-gray-700">{item.feature}</td>
                    <td className="p-3 md:p-4 text-center bg-green-50/30 border-x border-green-100 font-bold text-gray-900 relative">
                      <div className="absolute top-2 right-2 opacity-10 hidden md:block">
                          <Check size={40} className="text-[#16a34a]" />
                      </div>
                      <span className="relative z-10 text-sm md:text-base">{item.a17}</span>
                    </td>
                    <td className="p-3 md:p-4 text-center text-gray-500 text-sm relative">
                       <span className="text-xs md:text-sm">{item.others}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <p className="text-center text-xs text-gray-400 mt-4 italic">
            *Confronto basato su dimensioni e prezzi medi di mercato degli smartphone da 6.5 pollici o superiori.
        </p>
      </div>
    </div>
  );
};

// WhoIsItFor Component
const WhoIsItFor = () => {
  return (
    <div className="py-16 px-4 bg-white border-t border-gray-100">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-black text-center mb-10 leading-tight">
          Saremo onesti al 100%. <br/>
          <span className="text-gray-500 text-xl font-normal">A17 Mini non è per tutti.</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Who is NOT for */}
          <div className="bg-red-50 rounded-3xl p-8 border-2 border-red-100">
            <h3 className="text-2xl font-black text-red-600 mb-6 flex items-center">
              <XCircle className="mr-3" size={32} />
              NON fa per te se...
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-red-500 font-bold mr-2 text-xl">×</span>
                <span className="text-gray-700 font-medium">Vuoi uno schermo gigante per guardare film di 3 ore o serie TV in 4K.</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 font-bold mr-2 text-xl">×</span>
                <span className="text-gray-700 font-medium">Cerchi un telefono da "Gaming Pesante" (Fortnite, Call of Duty, ecc).</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 font-bold mr-2 text-xl">×</span>
                <span className="text-gray-700 font-medium">Sei un fotografo professionista che cerca lo zoom 100x.</span>
              </li>
            </ul>
          </div>

          {/* Who IS for */}
          <div className="bg-green-50 rounded-3xl p-8 border-2 border-green-100 shadow-xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-20 h-20 bg-green-200 rounded-bl-full opacity-50"></div>
            <h3 className="text-2xl font-black text-green-700 mb-6 flex items-center relative z-10">
              <CheckCircle className="mr-3" size={32} />
              È PERFETTO per te se...
            </h3>
            <ul className="space-y-4 relative z-10">
              <li className="flex items-start">
                <span className="text-green-600 font-bold mr-2 text-xl">✓</span>
                <span className="text-gray-800 font-bold">Vuoi WhatsApp, Video, Mappe e Social in un telefono che sta nel palmo della mano.</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 font-bold mr-2 text-xl">✓</span>
                <span className="text-gray-800 font-bold">Vuoi la comodità della Dual SIM per separare lavoro e vita privata.</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 font-bold mr-2 text-xl">✓</span>
                <span className="text-gray-800 font-bold">Vuoi un telefono affidabile per figli o genitori senza spendere 500€.</span>
              </li>
               <li className="flex items-start">
                <span className="text-green-600 font-bold mr-2 text-xl">✓</span>
                <span className="text-gray-800 font-bold">Sei stanco dei telefoni che pesano come mattoni.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// Bundle Component
const Bundle = () => {
  return (
    <div className="py-12 px-4 bg-gray-900 text-white overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black pointer-events-none"></div>

      <div className="max-w-2xl mx-auto relative z-10">
        <div className="text-center mb-8">
            <span className="bg-yellow-500 text-black font-black px-4 py-1 rounded uppercase text-sm tracking-widest inline-block mb-4 shadow-lg transform -rotate-2">
                Offerta Limitata
            </span>
            <h3 className="text-3xl md:text-4xl font-extrabold mb-2">Non compri solo il telefono.</h3>
            <p className="text-gray-400 text-lg">Ricevi il <span className="text-white font-bold underline">KIT COMPLETO</span> pronto all'uso.</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-sm shadow-2xl">
            <div className="space-y-4">
                {/* Main Item */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="flex items-center">
                        <img src="https://placehold.co/100x100/111827/FFF?text=A17" alt="Phone" className="w-16 h-16 rounded bg-gray-800 object-cover mr-4 border border-gray-700"/>
                        <div>
                            <div className="font-bold text-lg">Smartphone A17 Mini</div>
                            <div className="text-xs text-gray-400">Android 8.1 - 64GB</div>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="font-bold text-xl">139,99€</div>
                    </div>
                </div>

                {/* Freebies */}
                <div className="space-y-3 pl-4 md:pl-20 relative">
                     <div className="absolute left-8 md:left-12 top-0 bottom-0 w-0.5 bg-gray-700 -z-10"></div>
                     
                     <div className="flex items-center justify-between bg-gray-800/50 p-3 rounded-lg border border-gray-700/50">
                        <div className="flex items-center">
                            <Plus className="text-yellow-500 mr-3 shrink-0" size={16} />
                            <span className="text-sm md:text-base">Cover Protettiva Trasparente</span>
                        </div>
                        <div className="flex flex-col text-right">
                             <span className="text-xs text-gray-500 line-through">9,90€</span>
                             <span className="text-yellow-400 font-bold text-sm">GRATIS</span>
                        </div>
                     </div>

                     <div className="flex items-center justify-between bg-gray-800/50 p-3 rounded-lg border border-gray-700/50">
                        <div className="flex items-center">
                            <Plus className="text-yellow-500 mr-3 shrink-0" size={16} />
                            <span className="text-sm md:text-base">Pellicola Schermo</span>
                        </div>
                        <div className="flex flex-col text-right">
                             <span className="text-xs text-gray-500 line-through">7,90€</span>
                             <span className="text-yellow-400 font-bold text-sm">GRATIS</span>
                        </div>
                     </div>

                     <div className="flex items-center justify-between bg-gray-800/50 p-3 rounded-lg border border-gray-700/50">
                        <div className="flex items-center">
                            <Plus className="text-yellow-500 mr-3 shrink-0" size={16} />
                            <span className="text-sm md:text-base">Cavo Ricarica USB-C</span>
                        </div>
                        <div className="flex flex-col text-right">
                             <span className="text-xs text-gray-500 line-through">6,90€</span>
                             <span className="text-yellow-400 font-bold text-sm">GRATIS</span>
                        </div>
                     </div>
                </div>

                {/* Total */}
                <div className="mt-8 pt-6 border-t border-white/20 text-center">
                    <p className="text-sm text-gray-400 mb-1">Valore Totale Commerciale: <span className="line-through">164,69€</span></p>
                    <div className="text-5xl font-black text-white mb-2 tracking-tight">{PRICE_PROMO}</div>
                    <p className="text-green-400 font-bold text-sm uppercase tracking-wider animate-pulse">Spedizione Prioritaria Inclusa Oggi</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

// Reviews Component
const Reviews = ({ onScrollToOrder }: { onScrollToOrder?: () => void }) => {
  return (
    <div className="py-16 bg-gray-50 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-black text-center mb-4 text-gray-900">Cosa dicono i nostri clienti?</h2>
        <div className="flex justify-center items-center mb-10 space-x-2">
            <div className="flex text-yellow-400"><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /></div>
            <span className="font-bold text-gray-600">4.8/5 basato su oltre 12.000 ordini</span>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-12 opacity-80">
            {[
              "/images/miniphonea17%20img/RECENSIONI/ezz1aefevt6f1.jpeg",
              "/images/miniphonea17%20img/RECENSIONI/images.jpeg",
              "/images/miniphonea17%20img/RECENSIONI/oardefault.jpg",
              "/images/miniphonea17%20img/RECENSIONI/s-l1600.webp"
            ].map((src, n) => (
                <img key={n} src={src} alt="Cliente Felice" className="rounded-lg shadow-sm hover:opacity-100 transition-opacity aspect-square object-cover" />
            ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {REVIEWS.map((review) => (
            <div key={review.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col h-full">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white mr-3 shadow-sm ${review.type === 'skeptic-converted' ? 'bg-blue-500' : 'bg-green-500'}`}>
                        {review.name.charAt(0)}
                    </div>
                    <div>
                        <div className="font-bold text-gray-900 text-sm">{review.name}</div>
                        <div className="text-xs text-gray-500">{review.city}</div>
                    </div>
                </div>
                {review.verified && (
                    <div className="flex items-center text-green-700 text-[10px] font-bold bg-green-50 px-2 py-1 rounded-full border border-green-100">
                        <BadgeCheck size={12} className="mr-1" /> VERIFICATO
                    </div>
                )}
              </div>
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                    <Star 
                        key={i} 
                        size={14} 
                        className={i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"} 
                    />
                ))}
              </div>
              <p className="text-gray-700 text-sm leading-relaxed mb-4 flex-grow">"{review.text}"</p>
              <div className="text-xs text-gray-400 mt-auto border-t pt-2">{review.date}</div>
            </div>
          ))}
        </div>

        {onScrollToOrder && (
            <div className="text-center">
                <button 
                  onClick={onScrollToOrder}
                  className="bg-[#16a34a] hover:bg-green-700 text-white font-black text-xl py-4 px-10 rounded-xl shadow-lg transform active:scale-95 transition-all animate-bounce-slow flex items-center justify-center mx-auto"
                >
                    <ShoppingCart size={24} className="mr-2" />
                    NON ASPETTARE, ORDINA ORA
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

// FAQ Component
const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="py-12 px-4 bg-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Domande Frequenti</h2>
        
        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <div key={idx} className="border border-gray-200 rounded-xl overflow-hidden">
              <button 
                onClick={() => toggleFAQ(idx)}
                className="w-full flex justify-between items-center p-5 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
              >
                <span className="font-bold text-gray-900 pr-4">{faq.question}</span>
                {openIndex === idx ? <ChevronUp className="text-gray-500 shrink-0" /> : <ChevronDown className="text-gray-500 shrink-0" />}
              </button>
              
              {openIndex === idx && (
                <div className="p-5 bg-white text-gray-700 leading-relaxed border-t border-gray-200">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 bg-blue-50 p-6 rounded-xl flex items-center justify-center text-center">
            <div>
                <MessageCircle className="mx-auto text-blue-500 mb-2" size={32} />
                <p className="font-bold text-blue-900">Hai altri dubbi?</p>
                <p className="text-sm text-blue-800">Ordina senza impegno: ti chiameremo noi per confermare l'ordine e potrai farci tutte le domande che vuoi al telefono!</p>
            </div>
        </div>
      </div>
    </div>
  );
};

// OrderForm Component
const OrderForm = () => {
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
      firstName: '',
      phone: '',
      address: '',
      color: 'Nero Classico',
      notes: ''
  });

  const colors = [
    { name: 'Nero Classico', hex: '#000000' },
    { name: 'Argento Vivo', hex: '#C0C0C0' },
    { name: 'Blu Profondo', hex: '#1e3a8a' },
    { name: 'Arancione Pop', hex: '#f97316' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setTimeout(() => {
          setIsSubmitted(true);
          const element = document.getElementById('order-confirmation');
          if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 800);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setFormData({...formData, [e.target.name]: e.target.value });
  };

  if (isSubmitted) {
      return (
          <div className="py-20 px-4 bg-green-50 text-center min-h-[60vh] flex flex-col justify-center" id="order-confirmation">
              <div className="max-w-md mx-auto bg-white p-10 rounded-3xl shadow-2xl border-4 border-green-500 animate-fade-in">
                  <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Truck size={48} className="text-green-600" />
                  </div>
                  <h2 className="text-3xl font-black text-gray-900 mb-4">Grazie {formData.firstName}!</h2>
                  <div className="bg-green-100 p-4 rounded-xl mb-6">
                      <p className="text-xl font-bold text-green-800">Il tuo ordine è confermato.</p>
                      <p className="text-sm text-green-700 mt-2">Colore scelto: <strong>{formData.color}</strong></p>
                  </div>
                  <p className="text-gray-600 mb-8 leading-relaxed">
                      Un nostro operatore ti contatterà al numero <strong>{formData.phone}</strong> entro 24 ore per confermare l'indirizzo di spedizione.
                  </p>
                  <div className="border-t border-gray-200 pt-6">
                      <p className="text-sm text-gray-500 uppercase tracking-wide font-bold mb-2">Importo da preparare alla consegna:</p>
                      <p className="text-4xl font-black text-[#dc2626]">{PRICE_PROMO}</p>
                  </div>
              </div>
          </div>
      );
  }

  return (
    <div id="order" className="py-16 px-4 bg-[#dc2626]/5 scroll-mt-10">
      <div className="max-w-xl mx-auto">
        
        {/* Urgency Box */}
        <div className="bg-white border-2 border-[#dc2626] rounded-t-3xl p-4 text-center shadow-lg relative z-10">
             <div className="flex items-center justify-center text-[#dc2626] font-bold animate-pulse">
                <Clock size={20} className="mr-2" />
                <span>L'offerta scade tra: <span className="font-mono text-2xl ml-1">{formatTime(timeLeft)}</span></span>
             </div>
        </div>

        <div className="bg-white rounded-b-3xl rounded-t-none shadow-2xl overflow-hidden border border-gray-200">
            {/* Header */}
            <div className="bg-gray-900 text-white p-8 text-center">
                <h3 className="text-2xl font-black uppercase mb-1">Modulo d'Ordine</h3>
                <p className="text-gray-400 text-sm">Compila per ricevere A17 Mini a casa tua.</p>
            </div>

            <div className="p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                    
                    {/* Visual Recap */}
                    <div className="flex items-center bg-gray-50 p-4 rounded-xl border border-gray-200 mb-6">
                        <img src="https://placehold.co/100x100/111827/FFF?text=A17" alt="Product" className="w-16 h-16 rounded object-cover mr-4"/>
                        <div className="flex-grow">
                            <div className="font-bold text-gray-900">A17 Mini + Kit Accessori</div>
                            <div className="text-[#dc2626] font-black text-xl">{PRICE_PROMO}</div>
                        </div>
                    </div>

                    {/* Color Selection inside Form */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Seleziona il Colore *</label>
                        <div className="grid grid-cols-4 gap-2">
                            {colors.map((c) => (
                                <div 
                                    key={c.name}
                                    onClick={() => setFormData({...formData, color: c.name})}
                                    className={`cursor-pointer rounded-xl p-2 border-2 text-center transition-all ${formData.color === c.name ? 'border-[#16a34a] bg-green-50 ring-1 ring-green-500' : 'border-gray-200 hover:border-gray-300'}`}
                                >
                                    <div className="w-8 h-8 rounded-full mx-auto mb-1 shadow-sm border border-black/10" style={{ backgroundColor: c.hex }}></div>
                                    <div className="text-[10px] font-bold leading-tight text-gray-700">{c.name}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1 ml-1">Nome e Cognome *</label>
                        <input 
                            required
                            type="text" 
                            name="firstName"
                            placeholder="Es: Mario Rossi"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full p-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-[#16a34a] focus:ring-0 outline-none text-lg transition-colors placeholder-gray-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1 ml-1">Numero di Cellulare *</label>
                        <input 
                            required
                            type="tel" 
                            name="phone"
                            placeholder="Es: 340 1234567"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full p-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-[#16a34a] focus:ring-0 outline-none text-lg transition-colors placeholder-gray-400"
                        />
                        <p className="text-xs text-gray-500 mt-1 ml-1">Ti chiameremo solo per confermare la spedizione.</p>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1 ml-1">Indirizzo e N. Civico *</label>
                        <textarea 
                            required
                            name="address"
                            placeholder="Es: Via Garibaldi 10, Roma (Citofono 3)"
                            value={formData.address}
                            onChange={handleChange}
                            rows={3}
                            className="w-full p-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-[#16a34a] focus:ring-0 outline-none text-lg transition-colors placeholder-gray-400 resize-none"
                        ></textarea>
                    </div>

                    <button 
                        type="submit"
                        className="w-full bg-[#16a34a] hover:bg-green-600 text-white font-black text-2xl py-6 rounded-xl shadow-xl mt-4 transform hover:-translate-y-1 active:translate-y-0 transition-all flex items-center justify-center group"
                    >
                        <span>ORDINA ORA</span>
                        <Truck className="ml-3 group-hover:translate-x-1 transition-transform" size={28} />
                    </button>
                    <div className="text-center font-bold text-[#16a34a] text-sm uppercase tracking-wide">Paga in contanti alla consegna</div>

                    <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-100">
                        <div className="flex items-center justify-center text-xs text-gray-500 bg-gray-50 py-2 rounded">
                            <Lock size={12} className="mr-1" /> Nessun dato bancario
                        </div>
                        <div className="flex items-center justify-center text-xs text-gray-500 bg-gray-50 py-2 rounded">
                            <ShieldCheck size={12} className="mr-1" /> Garanzia Italia
                        </div>
                    </div>
                </form>
            </div>
        </div>
      </div>
    </div>
  );
};

// StickyBar Component
const StickyBar = ({ onScrollToOrder }: { onScrollToOrder: () => void }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 p-3 bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.15)] md:hidden z-[9999] pointer-events-auto cursor-auto"
      style={{ paddingBottom: 'max(12px, env(safe-area-inset-bottom))' }}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-col">
            <span className="text-xs text-red-600 font-bold uppercase tracking-wider">Offerta Lampo</span>
            <span className="text-xl font-black text-gray-900 leading-none">{PRICE_PROMO}</span>
        </div>
        <button 
          onClick={onScrollToOrder}
          className="flex-grow bg-[#16a34a] active:bg-green-700 text-white font-bold text-lg py-3 rounded-xl shadow-lg flex items-center justify-center active:scale-95 transition-transform cursor-pointer touch-manipulation"
        >
           <ShoppingCart size={20} className="mr-2" />
           ORDINA ORA
        </button>
      </div>
    </div>
  );
};

// --- MAIN PAGE COMPONENT ---

export default function Home() {
  const scrollToOrder = () => {
    const element = document.getElementById('order');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-[#dc2626] selection:text-white">
      {/* Custom Styles Injection for Keyframes since we can't use tailwind.config */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes bounce {
          0%, 100% {
            transform: translateY(-25%);
            animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
          }
          50% {
            transform: translateY(0);
            animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
          }
        }
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-bounce-slow {
          animation: bounce 3s infinite;
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
        }
        .scroll-mt-10 {
           scroll-margin-top: 2.5rem;
        }
      `}} />

      {/* Urgency Top Bar */}
      <div className="bg-[#dc2626] text-white text-center py-3 text-sm md:text-base font-bold tracking-wide shadow-md z-50 relative">
        ⚠️ ULTIMI 12 PEZZI DISPONIBILI A PREZZO SCONTATO ⚠️
      </div>

      <main className="pb-20 md:pb-0">
        <Hero onScrollToOrder={scrollToOrder} />
        
        {/* The "What can you do" Grid - REAL SCENES */}
        <Demonstration onScrollToOrder={scrollToOrder} />

        {/* Pain & Agitation */}
        <ProblemSolution />
        
        {/* Technical Features Grid */}
        <Features onScrollToOrder={scrollToOrder} />

        {/* Personas */}
        <TargetAudienceComponent />

        {/* Dedicated Section for Parents/Kids */}
        <KidsSection />
        
        {/* Anchor Pricing */}
        <Comparison />

        {/* Reverse Psychology / Qualifier */}
        <WhoIsItFor />
        
        {/* The Offer */}
        <Bundle />
        
        {/* Social Proof */}
        <Reviews onScrollToOrder={scrollToOrder} />
        
        {/* Objection Handling */}
        <FAQ />
        
        {/* Conversion */}
        <OrderForm />
      </main>

      <StickyBar onScrollToOrder={scrollToOrder} />
    </div>
  );
}