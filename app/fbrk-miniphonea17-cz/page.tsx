'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useFacebookTracking } from '@/app/hooks/useFacebookTracking';
import {
  Star, Truck, ShieldCheck, Check, Smartphone, Cpu, Wifi, Battery,
  MessageCircle, Camera, Play, Gamepad2, ShoppingCart,
  AlertTriangle, X, ArrowDown, Share2, CreditCard, Shield, Zap, Layers, Map,
  Gift, Plus, BadgeCheck, Clock, Lock, XCircle, CheckCircle, MapPin, Quote,
  ChevronDown, ChevronUp
} from 'lucide-react';

// --- NETWORK CONFIG ---
const NETWORK_CONFIG = {
  apiUrl: 'https://offers.supertrendaffiliateprogram.com/forms/api/',
  uid: '019855d0-397a-72ee-8df5-c5026966105a',
  key: '8ea99f0506e1df27f625d0',
  offer: '119',
  lp: '119',
};

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

const PRICE_PROMO = "1999 Kč";
const PRICE_LIST = "3999 Kč";
const DISCOUNT_PERCENTAGE = "-50%";

const REVIEWS: Review[] = [
  {
    id: 1,
    name: "Martin T.",
    city: "Praha",
    rating: 5,
    text: "Byl jsem hodně skeptický. Tak malý telefon za takovou cenu? Ale musel jsem změnit názor. Používám ho na stavbě, protože se bojím rozbít svůj hlavní telefon za 20 tisíc. Tento A17 Mini má signál všude, má WhatsApp, e-maily a když spadne, nedostanu infarkt. Baterie vydrží celý pracovní den. Doporučuji všem, kdo pracují rukama.",
    verified: true,
    type: 'skeptic-converted',
    date: "Před 2 dny"
  },
  {
    id: 2,
    name: "Karla B.",
    city: "Brno",
    rating: 5,
    text: "Konečně! Mám malé ruce a kabelku vždycky plnou. Dnešní telefony vypadají jako tablety, jsou strašně nepohodlné. A17 Mini je osvobození: vejde se do kapsy džínů a ani ho necítím. Používám ho na volání vnoučatům přes WhatsApp a koukám na recepty na YouTube. Jednoduchý, bez zbytečností, dělá co má. Zaplatila jsem kurýrovi, byl velmi příjemný.",
    verified: true,
    type: 'positive',
    date: "Dnes"
  },
  {
    id: 3,
    name: "Lukáš V.",
    city: "Ostrava",
    rating: 5,
    text: "Koupil jsem ho pro svého 11letého syna na školní výlet. Nechtěl jsem mu dávat drahý smartphone, který by určitě ztratil nebo rozbil. Tento je perfektní: má GPS, takže vidím, kde je, voláme si přes WhatsApp, ale je dost malý, aby ho moc nerozptyloval. Vrátil se nadšený, protože ho všichni spolužáci chtěli vidět. Skvělý nákup.",
    verified: true,
    type: 'positive',
    date: "Včera"
  },
  {
    id: 4,
    name: "Silvie R.",
    city: "Plzeň",
    rating: 4,
    text: "Dorazil přesně za 24 hodin. Design je velmi propracovaný, vypadá jako malý ingot. Zadní sklo je elegantní. Nečekejte fotky jako z profesionálního fotoaparátu, ale na posílání fotek koček přes WhatsApp to stačí. Hlasitost je překvapivě vysoká na takové rozměry.",
    verified: true,
    type: 'positive',
    date: "Před 3 dny"
  },
  {
    id: 5,
    name: "Jiří M.",
    city: "Liberec",
    rating: 5,
    text: "Jsem amatérský běžec. Běhat s dnešními obřími telefony připevněnými na paži je noční můra, jsou těžké a sklouzávají. A17 Mini dám do kapsy šortek a zapomenu na něj. Má Spotify a GPS na sledování běhu. Pro mě je to nejlepší druhý telefon pro sportovce.",
    verified: true,
    type: 'skeptic-converted',
    date: "Před týdnem"
  },
  {
    id: 6,
    name: "Anna P.",
    city: "Olomouc",
    rating: 5,
    text: "Darovala jsem ho svému tátovi, kterému je 70 let. Nesnášel svůj starý smartphone, protože byl 'moc složitý a plný ikon'. Na tento jsem mu dala na domovskou obrazovku jen WhatsApp a Telefon. Protože je malý, nosí ho v náprsní kapse jako staré telefony. Je šťastný.",
    verified: true,
    type: 'positive',
    date: "Dnes"
  },
  {
    id: 7,
    name: "Robert S.",
    city: "České Budějovice",
    rating: 5,
    text: "Používám dvě SIM karty pro práci. Mít dva obří telefony v kapse bylo nemožné. Teď mám svůj osobní a tento A17 Mini pro pracovní číslo. Funkce hotspotu je záchrana, když jedu vlakem a potřebuji připojit notebook. Příjem signálu je výborný.",
    verified: true,
    type: 'positive',
    date: "Před 4 dny"
  },
  {
    id: 8,
    name: "Elena D.",
    city: "Hradec Králové",
    rating: 5,
    text: "Esteticky je nádherný. Vzala jsem si oranžový a je velmi originální. V balení už bylo vše, obal i fólie, což vám dnes nedají ani u telefonů za 25 tisíc. Výborně.",
    verified: true,
    type: 'positive',
    date: "Před 2 týdny"
  },
  {
    id: 9,
    name: "Petr F.",
    city: "Pardubice",
    rating: 4,
    text: "Poměr kvalita/cena je férový. Není to žádná raketa na těžké hry, ale na sociální sítě, zprávy a internet jde víc než dobře. Praktická je možnost rozšířit paměť kartou.",
    verified: true,
    type: 'skeptic-converted',
    date: "Včera"
  },
  {
    id: 10,
    name: "Lucie G.",
    city: "Zlín",
    rating: 5,
    text: "Platba při doručení je super pohodlná, nevěřím zadávání karty online. Kurýr mi nechal zkontrolovat balík. Seriózní firma.",
    verified: true,
    type: 'positive',
    date: "Před 5 dny"
  },
  {
    id: 11,
    name: "Marek L.",
    city: "Ústí nad Labem",
    rating: 5,
    text: "Používám ho jako 'detoxikační telefon' o víkendu. Malý, jednoduchý, umožňuje mi nebýt pořád přilepený k obrazovce, ale být dostupný pro naléhavé případy. Změnil mi život k lepšímu.",
    verified: true,
    type: 'positive',
    date: "Před měsícem"
  },
  {
    id: 12,
    name: "Jana T.",
    city: "Opava",
    rating: 5,
    text: "Malý klenot. Funguje všechno, i Play Store. Stáhla jsem si aplikaci banky a funguje. Neuvěřitelné, co dnešní technologie dokáže v tak malém prostoru.",
    verified: true,
    type: 'positive',
    date: "Před 3 dny"
  }
];

const COMPARISON_DATA: ComparisonItem[] = [
  { feature: "Přenosnost", a17: "Úplná (55g)", others: "Těžký (>200g)" },
  { feature: "Ovládání jednou rukou", a17: "Perfektní", others: "Nemožné" },
  { feature: "Cena", a17: "Dostupná (Pod 2000 Kč)", others: "Přemrštěná (>7500 Kč)" },
  { feature: "Riziko rozbití", a17: "Minimální (Kompaktní)", others: "Vysoké (Velký displej)" },
  { feature: "Soukromí/Jednoduchost", a17: "Ano (Méně rozptýlení)", others: "Ne (Příliš notifikací)" },
  { feature: "Příslušenství", a17: "Kompletní (Obal+Fólie)", others: "Jen kabel" },
];

const FEATURES_LIST: Feature[] = [
  { icon: 'pocket', title: "Skutečně kapesní", description: "Rozměry 88x45mm: zmizí v kapse nebo kabelce." },
  { icon: 'sim', title: "Hybridní Dual SIM", description: "Spravujte dvě čísla (Práce + Domov) nebo rozšiřte paměť." },
  { icon: 'android', title: "Android 8.1", description: "Osvědčený systém kompatibilní s nejpoužívanějšími aplikacemi." },
  { icon: 'wifi', title: "Kompletní konektivita", description: "WiFi, GPS, Bluetooth 4.0 pro připojení sluchátek a auta." },
  { icon: 'camera', title: "Zachyťte okamžiky", description: "Kamera 12MP (zadní) + 5MP (přední) pro jasné videohovory." },
  { icon: 'battery', title: "Spolehlivá baterie", description: "Optimalizovaná, aby vás provázela celý den při běžném používání." },
  { icon: 'play', title: "Google Play Store", description: "Stáhněte si WhatsApp, Facebook, Mapy a své oblíbené aplikace." },
  { icon: 'usb', title: "Nabíjení Type-C", description: "Moderní standard: používejte stejný kabel jako pro ostatní zařízení." },
  { icon: 'hotspot', title: "Přenosný hotspot", description: "Proměňte telefon ve WiFi modem pro váš PC nebo tablet." },
  { icon: 'build', title: "Prémiový design", description: "Sklo a kov. Solidní na dotek, žádný 'levný plast'." },
];

const TARGET_AUDIENCE: TargetAudience[] = [
  { title: "Pro chytré rodiče", description: "Dejte svému dítěti bezpečný telefon s GPS a WhatsApp, aniž byste utratili jmění.", imageText: "Děti/Bezpečnost", image: "/images/miniphonea17%20img/Per%20i%20Genitori%20Smart.png" },
  { title: "Pro sportovce", description: "Sledujte kalorie a tep pomocí zdravotních aplikací, poslouchejte hudbu přes bluetooth. Lehký jako pírko, nulová zátěž při běhu.", imageText: "Sport/Běh", image: "/images/miniphonea17%20img/Per%20gli%20Sportivi.png" },
  { title: "Pro pracující", description: "Řemeslníci, zedníci, profesionálové: potřebujete druhé číslo, odolný telefon, který se vejde do kapsy.", imageText: "Práce/Stavba", image: "/images/miniphonea17%20img/Per%20i%20Lavoratori.png" },
  { title: "Pro seniory", description: "Hledají jednoduchost. Telefon, který dělá 'telefon', lehký a pohodlný na držení.", imageText: "Senioři/Jednoduchost", image: "/images/miniphonea17%20img/Per%20gli%20Anziani.png" },
  { title: "Pro cestovatele", description: "Záložní telefon v případě krádeže nebo rozbití hlavního. Nepostradatelný.", imageText: "Cestování/Záloha", image: "/images/miniphonea17%20img/Per%20i%20Viaggiatori.png" },
  { title: "Žádný stres a zátěž", description: "Máte WhatsApp a Mapy, ale bez váhy cihly. Ideální na lehké večerní vycházky.", imageText: "Relax/Lehkost", image: "/images/miniphonea17%20img/Zero%20Ansia%20%26%20Ingombro.png" },
];

const FAQS: FAQItem[] = [
  {
    question: "Mohu používat WhatsApp, Facebook a YouTube?",
    answer: "Rozhodně ANO. A17 Mini má Android 8.1 s oficiálním Google Play Store. Můžete si stáhnout WhatsApp, Facebook, TikTok, YouTube, bankovní aplikace, počasí a vše, co byste používali na běžném telefonu. Samozřejmě, displej je malý, takže zážitek je jiný, ale 100% funkční."
  },
  {
    question: "Jak dlouho vydrží baterie?",
    answer: "Výrobce uvádí zvětšenou baterii (9000 mAh nominálně) optimalizovanou pro dané rozměry. Při běžném denním používání (hovory, zprávy, trochu sociálních sítí) vydrží pohodlně celý den. Při intenzivním používání jako hotspot nebo navigace se spotřeba zvyšuje, jako u všech smartphonů."
  },
  {
    question: "Je opravdu tak malý?",
    answer: "Ano, je přibližně velký jako kreditní karta (88mm x 45mm). Je navržen tak, aby zmizel v dlani nebo v malé kapse džínů. Váží pouze 55 gramů, prakticky pírko ve srovnání s 200+ gramy moderních telefonů."
  },
  {
    question: "Podporuje dvě SIM karty a rozšiřitelnou paměť?",
    answer: "Ano. Má hybridní slot: můžete vložit 2 Nano SIM současně (perfektní pro Práci + Osobní) nebo 1 Nano SIM + 1 MicroSD pro rozšíření paměti až o 128GB."
  },
  {
    question: "Má jack na sluchátka?",
    answer: "Pro zachování tak malých rozměrů byl 3.5mm jack odstraněn. Má však Bluetooth 4.0 plně kompatibilní se všemi bezdrátovými sluchátky a systémem v autě. Můžete také použít USB-C adaptér."
  },
  {
    question: "Jak funguje platba při doručení?",
    answer: "Je to velmi jednoduché a bezpečné. Objednáte nyní vyplněním formuláře níže. Neptáme se na žádné údaje o kartě. Odešleme balík (obvykle do 24/48h) a když kurýr přijede k vám domů, zaplatíte přesnou částku v hotovosti přímo jemu. Žádné riziko."
  },
  {
    question: "Jaké jazyky jsou k dispozici?",
    answer: "Telefon je již nastaven nebo nastavitelný v češtině. Podporuje také angličtinu, němčinu, francouzštinu, španělštinu, ruštinu, arabštinu a mnoho dalších světových jazyků."
  },
  {
    question: "Co najdu v balení?",
    answer: "Obdržíte kompletní balíček: Smartphone A17 Mini, nabíjecí kabel USB-C, průhledný ochranný obal na míru a ochrannou fólii na displej připravenou k aplikaci. Vše je zahrnuto v ceně."
  },
  {
    question: "Je vhodný pro starší osoby?",
    answer: "Ano, protože je lehký a snadno ovladatelný. Rozhraní Androidu lze zjednodušit umístěním hlavních ikon (Telefon, WhatsApp) velkých na domovskou obrazovku. Hlasitost je dobrá a hlasitý odposlech funguje dobře."
  },
  {
    question: "Má záruku?",
    answer: "Samozřejmě. Nabízíme zákonnou záruku 24 měsíců na vady. Navíc máte naši zákaznickou podporu k dispozici e-mailem nebo WhatsApp pro jakékoli počáteční nastavení."
  }
];

// --- COMPONENTS ---

// Hero Component
const Hero = ({ onScrollToOrder }: { onScrollToOrder: () => void }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const colors = [
    { name: 'Klasická černá', hex: '#000000', border: 'border-gray-900' },
    { name: 'Živé stříbro', hex: '#C0C0C0', border: 'border-gray-400' },
    { name: 'Hluboká modrá', hex: '#1e3a8a', border: 'border-blue-900' },
    { name: 'Pop oranžová', hex: '#f97316', border: 'border-orange-500' },
  ];
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  const images = [
    "/images/miniphonea17%20img/1.png",
    "/images/miniphonea17%20img/2.png",
    "/images/miniphonea17%20img/3.png",
    "/images/miniphonea17%20img/4.png",
    "/images/miniphonea17%20img/5.png",
    "/images/miniphonea17%20img/6.png",
    "/images/miniphonea17%20img/7.png",
    "/images/miniphonea17%20img/8.png"
  ];

  const benefits = [
    {
      title: "WhatsApp, TikTok & YouTube",
      desc: "Všechny vaše oblíbené aplikace pro zábavu a komunikaci vždy s sebou."
    },
    {
      title: "Hry, Banka & Utility",
      desc: "Stahujte z Play Store internetové bankovnictví, Candy Crush a další nezbytné aplikace."
    },
    {
      title: "GPS & Google Mapy",
      desc: "Navigujte v autě nebo pěšky s naprostou přesností, už se nikdy neztratíte."
    },
    {
      title: "Dual SIM, WiFi & Bluetooth",
      desc: "Používejte dvě čísla současně, připojte se k rychlé WiFi a bezdrátovým sluchátkům."
    },
    {
      title: "Fotoaparát & HD dotykový displej",
      desc: "Foťte, videovolejte a procházejte web dotykem na displeji s vysokým rozlišením."
    },
    {
      title: "Baterie s dlouhou výdrží",
      desc: "Navržena tak, aby vás doprovázela celý den bez obav."
    }
  ];

  return (
    <section className="bg-white pb-8">
      <div className="max-w-md mx-auto bg-white md:max-w-4xl lg:flex lg:flex-row-reverse lg:items-start overflow-hidden">

        {/* Image Slider */}
        <div className="relative w-full lg:w-1/2 bg-[#f3f4f6] p-0 md:p-4 lg:sticky lg:top-4">
          <div className="relative w-full aspect-square md:rounded-2xl overflow-hidden shadow-none md:shadow-lg border-b md:border border-gray-200">
             <img
               src={images[currentImage]}
               alt="A17 Mini Smartphone - Pohled na produkt"
               className="w-full h-full object-cover"
             />
             <div className="absolute top-0 right-0 bg-[#dc2626] text-white font-black px-4 py-2 md:rounded-bl-xl shadow-md z-10 text-xl">
                {DISCOUNT_PERCENTAGE}
             </div>
             <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
                <span className="bg-black/50 text-white px-3 py-1 rounded-full text-sm font-bold backdrop-blur-sm">
                    A17 Mini zepředu
                </span>
             </div>
          </div>

          {/* Thumbnails - Below carousel */}
          <div className="flex justify-start md:justify-center gap-2 py-3 px-2 overflow-x-auto bg-[#f3f4f6]">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImage(idx)}
                className={`w-12 h-12 md:w-14 md:h-14 rounded-lg border-2 overflow-hidden transition-all bg-white shadow-sm shrink-0 ${idx === currentImage ? 'border-[#dc2626] ring-2 ring-red-100' : 'border-gray-300 opacity-70'}`}
              >
                  <img src={images[idx]} alt={`Náhled ${idx}`} className="w-full h-full object-cover" />
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
            <span className="text-xs md:text-sm text-gray-500 ml-2 font-bold underline decoration-dotted">Tisíce spokojených zákazníků</span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-gray-900 mb-4 tracking-tight">
            Konečně smartphone, který se <span className="text-[#dc2626] bg-red-50 px-2 rounded">opravdu vejde do kapsy</span>... a zvládne vše.
          </h1>

          <p className="text-base md:text-lg text-gray-600 mb-8 leading-relaxed">
            <strong>A17 Mini</strong> je esenciální telefon. Malý jako kreditní karta, výkonný jako skutečný smartphone.
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
              <span className="text-sm font-bold text-gray-700 uppercase mb-2 block">Vyberte barvu: <span className="text-[#dc2626]">{selectedColor.name}</span></span>
              <div className="flex space-x-3">
                  {colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color)}
                        className={`w-10 h-10 rounded-full border-2 shadow-sm transition-transform hover:scale-110 ${selectedColor.name === color.name ? 'ring-2 ring-offset-2 ring-[#111827] scale-110' : ''}`}
                        style={{ backgroundColor: color.hex }}
                        aria-label={`Vybrat barvu ${color.name}`}
                      />
                  ))}
              </div>
          </div>

          <div className="flex items-end space-x-3 mb-6 bg-gray-50 p-4 rounded-xl border border-gray-200 w-fit">
            <div className="flex flex-col">
                <span className="text-xs text-gray-500 uppercase font-bold">Akční cena</span>
                <div className="text-4xl md:text-5xl font-black text-[#dc2626] tracking-tighter">{PRICE_PROMO}</div>
            </div>
            <div className="flex flex-col pb-1">
                <span className="text-xs text-gray-400 font-bold">Běžná cena</span>
                <div className="text-xl text-gray-400 line-through decoration-2 font-medium">{PRICE_LIST}</div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-2 md:gap-3 mb-6">
              <span className="bg-green-100 text-green-800 text-[10px] md:text-xs font-bold px-3 py-1 rounded-full flex items-center border border-green-200">
                  <Truck size={12} className="mr-1"/> DORUČENÍ 24/48H
              </span>
              <span className="bg-green-100 text-green-800 text-[10px] md:text-xs font-bold px-3 py-1 rounded-full flex items-center border border-green-200">
                  <ShieldCheck size={12} className="mr-1"/> PLATBA PŘI DORUČENÍ
              </span>
              <span className="bg-green-100 text-green-800 text-[10px] md:text-xs font-bold px-3 py-1 rounded-full flex items-center border border-green-200">
                  <ShieldCheck size={12} className="mr-1"/> ZÁRUKA 2 ROKY
              </span>
          </div>

          <button
            onClick={onScrollToOrder}
            className="w-full bg-[#16a34a] hover:bg-green-700 text-white font-black text-xl md:text-2xl py-5 rounded-xl shadow-[0_4px_14px_0_rgba(22,163,74,0.39)] transform active:scale-95 transition-all flex items-center justify-center animate-bounce-slow"
          >
            OBJEDNAT A ZAPLATIT KURÝROVI
          </button>
          <p className="text-center text-xs text-gray-500 mt-3">Omezená dostupnost. Žádná kreditní karta není potřeba.</p>
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
      title: "Zprávy & Sociální sítě",
      desc: "WhatsApp, Instagram a TikTok v jedné ruce.",
      icon: <MessageCircle className="w-4 h-4 md:w-5 md:h-5 text-white" />,
      color: "bg-green-500",
      video: "/images/miniphonea17%20img/MESSAGGI%20E%20SOCIAL%20GIF.webm"
    },
    {
      id: 'camera',
      title: "Foto & Video",
      desc: "Pořizujte ostré fotky a selfie rychle.",
      icon: <Camera className="w-4 h-4 md:w-5 md:h-5 text-white" />,
      color: "bg-blue-500",
      video: "/images/miniphonea17%20img/Foto%20%26%20VideoM%20GIF.webm"
    },
    {
      id: 'media',
      title: "Video & YouTube",
      desc: "Sledujte videa kdekoli bez zátěže.",
      icon: <Play className="w-4 h-4 md:w-5 md:h-5 text-white" />,
      color: "bg-red-500",
      video: "/images/miniphonea17%20img/_Video%20%26%20YouTube%20GIF.webm"
    },
    {
      id: 'games',
      title: "Hry & Zábava",
      desc: "Perfektní rozptýlení na přestávky.",
      icon: <Gamepad2 className="w-4 h-4 md:w-5 md:h-5 text-white" />,
      color: "bg-orange-500",
      video: "/images/miniphonea17%20img/Giochi%20%26%20Svago%20GIF.webm"
    }
  ];

  return (
    <div className="py-10 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-extrabold text-center mb-4 leading-tight">
          Co s ním <span className="text-[#dc2626] underline decoration-wavy">skutečně</span> zvládnete?
        </h2>
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto text-sm md:text-base">
            Mnozí si myslí, že je to hračka. Omyl. Tady je důkaz, že je to kompletní smartphone.
        </p>

        {/* 4 PERFECT SQUARE BLOCKS (1:1) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-8">
            {features.map((feat) => (
                <div key={feat.id} className="relative group rounded-2xl overflow-hidden shadow-md cursor-default aspect-square">
                    {/* Background Video (Square) */}
                    <video
                        src={feat.video}
                        autoPlay
                        loop
                        muted
                        playsInline
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
                    CHCI HO VYZKOUŠET HNED
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
          Pravda: dnešní telefony jsou <span className="text-[#dc2626] underline decoration-wavy">PŘÍLIŠ VELKÉ</span>.
        </h2>

        <p className="text-center text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            Cítíte frustraci pokaždé, když musíte strčit smartphone do kapsy? Jsou těžké, sklouzávají a stojí příliš.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border-t-4 border-[#dc2626] flex flex-col items-center text-center">
             <div className="bg-red-100 p-3 rounded-full mb-4 text-[#dc2626]">
                <X size={32} strokeWidth={3} />
             </div>
            <h3 className="font-bold text-xl mb-2 text-gray-900">
                Přeplněné kapsy
            </h3>
            <p className="text-gray-600 text-sm">
                Nevejdou se do džínů, ničí saka a zabírají celou kabelku. Neustálý stres.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border-t-4 border-[#dc2626] flex flex-col items-center text-center">
             <div className="bg-red-100 p-3 rounded-full mb-4 text-[#dc2626]">
                <X size={32} strokeWidth={3} />
             </div>
            <h3 className="font-bold text-xl mb-2 text-gray-900">
                Strach z rozbití
            </h3>
            <p className="text-gray-600 text-sm">
                Chvilka nepozornosti a... prask. Stovky korun za škody na obřím skle.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border-t-4 border-[#dc2626] flex flex-col items-center text-center">
             <div className="bg-red-100 p-3 rounded-full mb-4 text-[#dc2626]">
                <X size={32} strokeWidth={3} />
             </div>
            <h3 className="font-bold text-xl mb-2 text-gray-900">
                Nemožné jednou rukou
            </h3>
            <p className="text-gray-600 text-sm">
                Musíte vždy používat obě ruce na psaní nebo prohlížení. Velmi nepohodlné na cestách.
            </p>
          </div>
        </div>

        <div className="mt-10 text-center">
            <p className="text-xl font-bold italic text-gray-800">"Existuje alternativa. Objevte znovu pohodlí."</p>
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
                Představujeme <span className="text-[#16a34a]">A17 Mini</span>.
            </h2>
            <p className="text-xl md:text-2xl font-light mb-10 text-gray-200">
                Není to jen telefon. Je to vaše kapesní svoboda.
            </p>

            {/* Benefits Micro-List */}
            <div className="flex flex-col md:flex-row justify-center gap-4 mb-10">
                <div className="bg-white/10 px-4 py-2 rounded-full border border-white/20 flex items-center justify-center">
                    <Check size={18} className="text-[#16a34a] mr-2" /> <span className="font-bold">Ovládání jednou rukou</span>
                </div>
                 <div className="bg-white/10 px-4 py-2 rounded-full border border-white/20 flex items-center justify-center">
                    <Check size={18} className="text-[#16a34a] mr-2" /> <span className="font-bold">Nulová zátěž</span>
                </div>
                 <div className="bg-white/10 px-4 py-2 rounded-full border border-white/20 flex items-center justify-center">
                    <Check size={18} className="text-[#16a34a] mr-2" /> <span className="font-bold">Žádný stres</span>
                </div>
            </div>

            {/* Steps */}
            <div className="grid md:grid-cols-3 gap-8 text-left">
                <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-white/10">
                    <div className="text-4xl font-black text-[#16a34a] mb-2">01</div>
                    <h4 className="font-bold text-lg mb-2">Vložte SIM</h4>
                    <p className="text-sm text-gray-300">Funguje se všemi českými SIM kartami. Můžete vložit i dvě současně.</p>
                </div>
                <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-white/10">
                    <div className="text-4xl font-black text-[#16a34a] mb-2">02</div>
                    <h4 className="font-bold text-lg mb-2">Zapněte a jeďte</h4>
                    <p className="text-sm text-gray-300">Android 8.1 je již nainstalován a nastaven v češtině. Připraven k použití za 30 sekund.</p>
                </div>
                <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-white/10">
                    <div className="text-4xl font-black text-[#16a34a] mb-2">03</div>
                    <h4 className="font-bold text-lg mb-2">Stáhněte aplikace</h4>
                    <p className="text-sm text-gray-300">Otevřete Play Store a stáhněte WhatsApp, YouTube nebo cokoli potřebujete. Hotovo!</p>
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
            Kompletní technologie
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
                Nenechte se zmást rozměry. Uvnitř je vše, co očekáváte od moderního smartphonu.
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
            <h4 className="font-bold text-gray-700 text-sm uppercase mb-2">Podrobné technické specifikace</h4>
            <p className="text-xs text-gray-500 leading-relaxed font-mono mb-4">
                CPU: MediaTek MTK6580 Quad Core (6 Core uváděno) | RAM: 16GB (uváděno) | ROM: 64GB | OS: Android 8.1 |
                Displej: 3.0" | Bat: 9000mAh (nominální) | Kam: 5MP+12MP |
                Síť: 3G WCDMA / WiFi / GPS / BT 4.0 | Rozměry: 88.4x45.2x11mm | Hmotnost: 55g.
            </p>

            {onScrollToOrder && (
                <button
                  onClick={onScrollToOrder}
                  className="bg-[#16a34a] text-white font-bold py-2 px-6 rounded-full shadow hover:bg-green-700 transition-transform active:scale-95 inline-flex items-center text-sm"
                >
                    <ShoppingCart size={16} className="mr-2" />
                    CHCI OBJEDNAT TEĎ
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
        <h2 className="text-3xl font-black text-center mb-10 text-gray-900">Pro koho je A17 Mini perfektní?</h2>

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
                    <Check size={16} className="mr-2" /> Doporučená volba
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
                    Perfektní pro rodiče a děti
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
                    První smartphone <br/>
                    <span className="text-[#16a34a]">Bezpečný & Odolný?</span>
                </h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    Chcete, aby vaše dítě bylo dostupné, ale bojíte se mu dát telefon za 12 000 Kč?
                    A17 Mini je řešení, které udělá radost všem: <strong>on má své aplikace, vy máte klid.</strong>
                </p>

                <div className="space-y-6">
                    <div className="flex items-start">
                        <div className="bg-white p-3 rounded-full shadow-sm mr-4 border border-blue-100 text-blue-600">
                            <MapPin size={24} strokeWidth={2.5} />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 text-lg">GPS & Lokalizace</h4>
                            <p className="text-sm text-gray-600">Díky Google Mapám a integrovanému GPS můžete vždy vědět, kde se nachází v případě potřeby.</p>
                        </div>
                    </div>

                    <div className="flex items-start">
                        <div className="bg-white p-3 rounded-full shadow-sm mr-4 border border-green-100 text-green-600">
                            <MessageCircle size={24} strokeWidth={2.5} />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 text-lg">WhatsApp & Volání</h4>
                            <p className="text-sm text-gray-600">Zůstaňte vždy v kontaktu. Může vám posílat hlasovky, fotky a zavolat, když vychází ze školy.</p>
                        </div>
                    </div>

                    <div className="flex items-start">
                        <div className="bg-white p-3 rounded-full shadow-sm mr-4 border border-purple-100 text-purple-600">
                            <Gamepad2 size={24} strokeWidth={2.5} />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 text-lg">"Kontrolovaná" zábava</h4>
                            <p className="text-sm text-gray-600">Podporuje YouTube a lehké hry pro chvíle odpočinku, ale kompaktní displej zabrání tomu, aby zůstalo "zhypnotizováno" na hodiny.</p>
                        </div>
                    </div>

                    <div className="flex items-start">
                        <div className="bg-white p-3 rounded-full shadow-sm mr-4 border border-red-100 text-red-600">
                            <ShieldCheck size={24} strokeWidth={2.5} />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 text-lg">Žádné riziko (i když spadne)</h4>
                            <p className="text-sm text-gray-600">Je malý, kompaktní a odolný. A pokud by se stalo nemožné... nepřijdete o výplatu.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Visual/Testimonial */}
            <div className="lg:w-1/2 relative">
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 relative z-10">
                    <Quote className="text-blue-100 absolute top-4 right-4" size={60} />
                    <div className="flex items-center mb-6">
                        <img src="https://placehold.co/100x100/2563eb/white?text=L" alt="Lukáš" className="w-16 h-16 rounded-full border-2 border-blue-500 mr-4"/>
                        <div>
                            <div className="font-bold text-lg text-gray-900">Lukáš V.</div>
                            <div className="text-sm text-gray-500">Otec 11letého syna</div>
                        </div>
                    </div>
                    <p className="text-gray-700 italic text-lg leading-relaxed mb-4">
                        "Koupil jsem ho pro syna na školní výlet. Nechtěl jsem mu dávat svůj starý iPhone, který by určitě ztratil. <span className="bg-yellow-100 font-bold px-1">Tento je perfektní:</span> má GPS, takže vidím, kde je, voláme si přes WhatsApp, ale je dost malý, aby se vešel do ledvinky. Je šťastný, protože ho všichni spolužáci chtěli vidět!"
                    </p>
                    <div className="flex items-center text-sm font-bold text-green-600">
                        <ShieldCheck size={16} className="mr-1" /> Ověřený nákup
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
            A17 Mini <span className="text-gray-400 font-light lowercase">vs</span> Velké telefony
        </h2>

        <div className="overflow-hidden border-2 border-gray-100 rounded-2xl shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[350px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="p-3 md:p-4 text-xs md:text-sm font-bold text-gray-400 uppercase tracking-wider w-1/3">Vlastnost</th>
                  <th className="p-3 md:p-4 font-black text-[#111827] text-center w-1/3 text-lg md:text-xl bg-green-50/50 border-x border-green-100 text-[#16a34a]">A17 Mini</th>
                  <th className="p-3 md:p-4 font-bold text-gray-400 text-center w-1/3 text-xs md:text-sm">Tradiční <br/>smartphony</th>
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
            *Srovnání založené na rozměrech a průměrných cenách smartphonů s displejem 6,5 palce nebo větším.
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
          Budeme na 100% upřímní. <br/>
          <span className="text-gray-500 text-xl font-normal">A17 Mini není pro každého.</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Who is NOT for */}
          <div className="bg-red-50 rounded-3xl p-8 border-2 border-red-100">
            <h3 className="text-2xl font-black text-red-600 mb-6 flex items-center">
              <XCircle className="mr-3" size={32} />
              NENÍ pro vás, pokud...
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-red-500 font-bold mr-2 text-xl">×</span>
                <span className="text-gray-700 font-medium">Chcete obří displej na sledování 3hodinových filmů nebo seriálů ve 4K.</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 font-bold mr-2 text-xl">×</span>
                <span className="text-gray-700 font-medium">Hledáte telefon na "náročné hraní" (Fortnite, Call of Duty, atd.).</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 font-bold mr-2 text-xl">×</span>
                <span className="text-gray-700 font-medium">Jste profesionální fotograf, který hledá 100x zoom.</span>
              </li>
            </ul>
          </div>

          {/* Who IS for */}
          <div className="bg-green-50 rounded-3xl p-8 border-2 border-green-100 shadow-xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-20 h-20 bg-green-200 rounded-bl-full opacity-50"></div>
            <h3 className="text-2xl font-black text-green-700 mb-6 flex items-center relative z-10">
              <CheckCircle className="mr-3" size={32} />
              Je PERFEKTNÍ pro vás, pokud...
            </h3>
            <ul className="space-y-4 relative z-10">
              <li className="flex items-start">
                <span className="text-green-600 font-bold mr-2 text-xl">✓</span>
                <span className="text-gray-800 font-bold">Chcete WhatsApp, Video, Mapy a sociální sítě v telefonu, který se vejde do dlaně.</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 font-bold mr-2 text-xl">✓</span>
                <span className="text-gray-800 font-bold">Chcete pohodlí Dual SIM pro oddělení práce a soukromí.</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 font-bold mr-2 text-xl">✓</span>
                <span className="text-gray-800 font-bold">Chcete spolehlivý telefon pro děti nebo rodiče bez utrácení 12 000 Kč.</span>
              </li>
               <li className="flex items-start">
                <span className="text-green-600 font-bold mr-2 text-xl">✓</span>
                <span className="text-gray-800 font-bold">Máte dost telefonů, které váží jako cihly.</span>
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
                Limitovaná nabídka
            </span>
            <h3 className="text-3xl md:text-4xl font-extrabold mb-2">Nekupujete jen telefon.</h3>
            <p className="text-gray-400 text-lg">Získáte <span className="text-white font-bold underline">KOMPLETNÍ SADU</span> připravenou k použití.</p>
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
                        <div className="font-bold text-xl">3999 Kč</div>
                    </div>
                </div>

                {/* Freebies */}
                <div className="space-y-3 pl-4 md:pl-20 relative">
                     <div className="absolute left-8 md:left-12 top-0 bottom-0 w-0.5 bg-gray-700 -z-10"></div>

                     <div className="flex items-center justify-between bg-gray-800/50 p-3 rounded-lg border border-gray-700/50">
                        <div className="flex items-center">
                            <Plus className="text-yellow-500 mr-3 shrink-0" size={16} />
                            <span className="text-sm md:text-base">Průhledný ochranný obal</span>
                        </div>
                        <div className="flex flex-col text-right">
                             <span className="text-xs text-gray-500 line-through">249 Kč</span>
                             <span className="text-yellow-400 font-bold text-sm">ZDARMA</span>
                        </div>
                     </div>

                     <div className="flex items-center justify-between bg-gray-800/50 p-3 rounded-lg border border-gray-700/50">
                        <div className="flex items-center">
                            <Plus className="text-yellow-500 mr-3 shrink-0" size={16} />
                            <span className="text-sm md:text-base">Ochranná fólie na displej</span>
                        </div>
                        <div className="flex flex-col text-right">
                             <span className="text-xs text-gray-500 line-through">199 Kč</span>
                             <span className="text-yellow-400 font-bold text-sm">ZDARMA</span>
                        </div>
                     </div>

                     <div className="flex items-center justify-between bg-gray-800/50 p-3 rounded-lg border border-gray-700/50">
                        <div className="flex items-center">
                            <Plus className="text-yellow-500 mr-3 shrink-0" size={16} />
                            <span className="text-sm md:text-base">Nabíjecí kabel USB-C</span>
                        </div>
                        <div className="flex flex-col text-right">
                             <span className="text-xs text-gray-500 line-through">179 Kč</span>
                             <span className="text-yellow-400 font-bold text-sm">ZDARMA</span>
                        </div>
                     </div>

                     <div className="flex items-center justify-between bg-green-900/30 p-3 rounded-lg border border-green-700/50">
                        <div className="flex items-center">
                            <ShieldCheck className="text-green-400 mr-3 shrink-0" size={16} />
                            <span className="text-sm md:text-base font-bold text-green-300">Záruka 2 roky</span>
                        </div>
                        <div className="flex flex-col text-right">
                             <span className="text-green-400 font-bold text-sm">ZDARMA</span>
                        </div>
                     </div>
                </div>

                {/* Total */}
                <div className="mt-8 pt-6 border-t border-white/20 text-center">
                    <p className="text-sm text-gray-400 mb-1">Celková hodnota: <span className="line-through">4626 Kč</span></p>
                    <div className="text-5xl font-black text-white mb-2 tracking-tight">{PRICE_PROMO}</div>
                    <p className="text-green-400 font-bold text-sm uppercase tracking-wider animate-pulse">Prioritní doprava dnes zdarma</p>
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
        <h2 className="text-3xl md:text-4xl font-black text-center mb-4 text-gray-900">Co říkají naši zákazníci?</h2>
        <div className="flex justify-center items-center mb-10 space-x-2">
            <div className="flex text-yellow-400"><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /></div>
            <span className="font-bold text-gray-600">4.8/5 na základě více než 12 000 objednávek</span>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-12 opacity-80">
            {[
              "/images/miniphonea17%20img/RECENSIONI/ezz1aefevt6f1.jpeg",
              "/images/miniphonea17%20img/RECENSIONI/images.jpeg",
              "/images/miniphonea17%20img/RECENSIONI/oardefault.jpg",
              "/images/miniphonea17%20img/RECENSIONI/s-l1600.webp"
            ].map((src, n) => (
                <img key={n} src={src} alt="Spokojený zákazník" className="rounded-lg shadow-sm hover:opacity-100 transition-opacity aspect-square object-cover" />
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
                        <BadgeCheck size={12} className="mr-1" /> OVĚŘENO
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
                    NEČEKEJTE, OBJEDNEJTE TEĎ
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
        <h2 className="text-3xl font-bold text-center mb-8">Často kladené otázky</h2>

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
                <p className="font-bold text-blue-900">Máte další otázky?</p>
                <p className="text-sm text-blue-800">Objednejte bez závazku: zavoláme vám pro potvrzení objednávky a můžete se nás zeptat na cokoli po telefonu!</p>
            </div>
        </div>
      </div>
    </div>
  );
};

// OrderForm Component
const OrderForm = () => {
  const tmfpRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { trackLeadEvent, saveUserData } = useFacebookTracking();

  const [formData, setFormData] = useState({
      firstName: '',
      phone: '',
      address: '',
      color: 'Klasická černá',
      notes: ''
  });

  const colors = [
    { name: 'Klasická černá', hex: '#000000' },
    { name: 'Živé stříbro', hex: '#C0C0C0' },
    { name: 'Hluboká modrá', hex: '#1e3a8a' },
    { name: 'Pop oranžová', hex: '#f97316' },
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      // Get UTM params from URL
      const urlParams = new URLSearchParams(window.location.search);

      // Send to Network API
      try {
        const networkFormData = new FormData();
        networkFormData.append('uid', NETWORK_CONFIG.uid);
        networkFormData.append('key', NETWORK_CONFIG.key);
        networkFormData.append('offer', NETWORK_CONFIG.offer);
        networkFormData.append('lp', NETWORK_CONFIG.lp);
        networkFormData.append('name', formData.firstName);
        networkFormData.append('tel', formData.phone);
        networkFormData.append('street-address', formData.address);

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
      } catch (error) {
        console.error('Network API error:', error);
      }

      // Track Lead event for Facebook
      const nameParts = formData.firstName.trim().split(' ');
      const nome = nameParts[0] || '';
      const cognome = nameParts.slice(1).join(' ') || '';

      const userData = {
        nome,
        cognome,
        telefono: formData.phone.trim(),
        indirizzo: formData.address.trim()
      };

      console.log('[Form] Saving user data:', userData);
      saveUserData(userData);

      // Track Lead event for Facebook
      await trackLeadEvent(userData, {
        content_name: 'A17 Mini',
        currency: 'CZK',
        value: 1999
      });

      // Redirect to thank you page
      window.location.href = '/fb-ty/ty-fb-cz';
    } catch (error) {
      console.error('[Form] Submit error:', error);
      setIsSubmitting(false);
    }
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
                  <h2 className="text-3xl font-black text-gray-900 mb-4">Děkujeme {formData.firstName}!</h2>
                  <div className="bg-green-100 p-4 rounded-xl mb-6">
                      <p className="text-xl font-bold text-green-800">Vaše objednávka je potvrzena.</p>
                      <p className="text-sm text-green-700 mt-2">Vybraná barva: <strong>{formData.color}</strong></p>
                  </div>
                  <p className="text-gray-600 mb-8 leading-relaxed">
                      Náš operátor vás bude kontaktovat na čísle <strong>{formData.phone}</strong> do 24 hodin pro potvrzení adresy doručení.
                  </p>
                  <div className="border-t border-gray-200 pt-6">
                      <p className="text-sm text-gray-500 uppercase tracking-wide font-bold mb-2">Částka k zaplacení při doručení:</p>
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
                <span>Nabídka končí za: <span className="font-mono text-2xl ml-1">{formatTime(timeLeft)}</span></span>
             </div>
        </div>

        <div className="bg-white rounded-b-3xl rounded-t-none shadow-2xl overflow-hidden border border-gray-200">
            {/* Header */}
            <div className="bg-gray-900 text-white p-8 text-center">
                <h3 className="text-2xl font-black uppercase mb-1">Objednávkový formulář</h3>
                <p className="text-gray-400 text-sm">Vyplňte pro doručení A17 Mini k vám domů.</p>
            </div>

            <div className="p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                    <input type="hidden" name="tmfp" ref={tmfpRef} />

                    {/* Visual Recap */}
                    <div className="flex items-center bg-gray-50 p-4 rounded-xl border border-gray-200 mb-6">
                        <img src="https://placehold.co/100x100/111827/FFF?text=A17" alt="Product" className="w-16 h-16 rounded object-cover mr-4"/>
                        <div className="flex-grow">
                            <div className="font-bold text-gray-900">A17 Mini + Sada příslušenství</div>
                            <div className="text-[#dc2626] font-black text-xl">{PRICE_PROMO}</div>
                        </div>
                    </div>

                    {/* Color Selection inside Form */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Vyberte barvu *</label>
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
                        <label className="block text-sm font-bold text-gray-700 mb-1 ml-1">Jméno a příjmení *</label>
                        <input
                            required
                            type="text"
                            name="firstName"
                            placeholder="Např: Jan Novák"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full p-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-[#16a34a] focus:ring-0 outline-none text-lg transition-colors placeholder-gray-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1 ml-1">Telefonní číslo *</label>
                        <input
                            required
                            type="tel"
                            name="phone"
                            placeholder="Např: 602 123 456"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full p-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-[#16a34a] focus:ring-0 outline-none text-lg transition-colors placeholder-gray-400"
                        />
                        <p className="text-xs text-gray-500 mt-1 ml-1">Zavoláme vám pouze pro potvrzení doručení.</p>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1 ml-1">Adresa a číslo popisné *</label>
                        <textarea
                            required
                            name="address"
                            placeholder="Např: Václavské náměstí 10, Praha 1 (Zvonek 3)"
                            value={formData.address}
                            onChange={handleChange}
                            rows={3}
                            className="w-full p-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-[#16a34a] focus:ring-0 outline-none text-lg transition-colors placeholder-gray-400 resize-none"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full bg-[#16a34a] hover:bg-green-600 text-white font-black text-2xl py-6 rounded-xl shadow-xl mt-4 transform hover:-translate-y-1 active:translate-y-0 transition-all flex items-center justify-center group ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        <span>{isSubmitting ? 'ODESÍLÁNÍ...' : 'OBJEDNAT TEĎ'}</span>
                        {!isSubmitting && <Truck className="ml-3 group-hover:translate-x-1 transition-transform" size={28} />}
                    </button>
                    <div className="text-center font-bold text-[#16a34a] text-sm uppercase tracking-wide">Platba při doručení v hotovosti</div>

                    <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-100">
                        <div className="flex items-center justify-center text-xs text-gray-500 bg-gray-50 py-2 rounded">
                            <Lock size={12} className="mr-1" /> Žádné bankovní údaje
                        </div>
                        <div className="flex items-center justify-center text-xs text-gray-500 bg-gray-50 py-2 rounded">
                            <ShieldCheck size={12} className="mr-1" /> Záruka 2 roky
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
            <span className="text-xs text-red-600 font-bold uppercase tracking-wider">Blesková nabídka</span>
            <span className="text-xl font-black text-gray-900 leading-none">{PRICE_PROMO}</span>
        </div>
        <button
          onClick={onScrollToOrder}
          className="flex-grow bg-[#16a34a] active:bg-green-700 text-white font-bold text-lg py-3 rounded-xl shadow-lg flex items-center justify-center active:scale-95 transition-transform cursor-pointer touch-manipulation"
        >
           <ShoppingCart size={20} className="mr-2" />
           OBJEDNAT
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

  useEffect(() => {
    const fpScript = document.createElement('script');
    fpScript.src = 'https://offers.supertrendaffiliateprogram.com/forms/tmfp/';
    fpScript.crossOrigin = 'anonymous';
    fpScript.defer = true;
    document.head.appendChild(fpScript);
  }, []);

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

      {/* Network Click Pixel */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`https://offers.supertrendaffiliateprogram.com/forms/api/ck/?o=${NETWORK_CONFIG.offer}&uid=${NETWORK_CONFIG.uid}&lp=${NETWORK_CONFIG.lp}`} style={{width:'1px',height:'1px',display:'none'}} alt="" />

      {/* Urgency Top Bar */}
      <div className="bg-[#dc2626] text-white text-center py-3 text-sm md:text-base font-bold tracking-wide shadow-md z-50 relative">
        POSLEDNÍCH 12 KUSŮ ZA SLEVOVOU CENU
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
