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
  offer: '120',
  lp: '120',
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

const PRICE_PROMO = "79,99€";
const PRICE_LIST = "159,99€";
const DISCOUNT_PERCENTAGE = "-50%";

const REVIEWS: Review[] = [
  {
    id: 1,
    name: "Marek T.",
    city: "Bratislava",
    rating: 5,
    text: "Bol som veľmi skeptický. Taký malý telefón za takúto cenu? Ale musel som zmeniť názor. Používam ho na stavbe, lebo sa bojím zničiť svoj hlavný telefón za 800 eur. Tento A17 Mini má signál všade, má WhatsApp, emaily a keď spadne, nedostanem infarkt. Batéria vydrží celý pracovný deň. Vrelo odporúčam všetkým, čo pracujú manuálne.",
    verified: true,
    type: 'skeptic-converted',
    date: "pred 2 dňami"
  },
  {
    id: 2,
    name: "Katarína B.",
    city: "Košice",
    rating: 5,
    text: "Konečne! Mám malé ruky a kabelky vždy plné. Dnešné telefóny vyzerajú ako tablety, sú strašne nepraktické. A17 Mini je oslobodenie: vojde sa do vrecka na džínsoch a ani ho necítim. Používam ho na volanie vnúčatám cez WhatsApp a pozeranie receptov na YouTube. Jednoduchý, bez zbytočností, robí čo má. Zaplatila som kuriérovi, ktorý bol veľmi milý.",
    verified: true,
    type: 'positive',
    date: "Dnes"
  },
  {
    id: 3,
    name: "Lukáš V.",
    city: "Prešov",
    rating: 5,
    text: "Kúpil som pre syna (11 rokov) na školský výlet. Nechcel som mu dať drahý smartfón, ktorý by určite stratil alebo rozbil. Tento je perfektný: má GPS, takže vidím, kde je, voláme si cez WhatsApp, ale je dosť malý na to, aby ho príliš nerozptyľoval. Vrátil sa nadšený, pretože ho chceli vidieť všetci spolužiaci. Skvelý nákup.",
    verified: true,
    type: 'positive',
    date: "Včera"
  },
  {
    id: 4,
    name: "Silvia R.",
    city: "Žilina",
    rating: 4,
    text: "Doručené za 24 hodín. Dizajn je veľmi elegantný, vyzerá ako malý zlatý prút. Zadné sklo je elegantné. Nečakajte fotky ako z profesionálneho fotoaparátu, ale na posielanie fotiek mačiek cez WhatsApp je to úplne v poriadku. Hlasitosť zvuku je prekvapivo vysoká na takú veľkosť.",
    verified: true,
    type: 'positive',
    date: "pred 3 dňami"
  },
  {
    id: 5,
    name: "Juraj M.",
    city: "Banská Bystrica",
    rating: 5,
    text: "Som amatérsky bežec. Behať s obrovskými telefónmi pripevnenými na ramene je nočná mora, sú ťažké a kĺžu. A17 Mini dám do vrecka na šortkách a zabudnem naň. Má Spotify a GPS na sledovanie behu. Pre mňa je to najlepší druhý telefón pre športovcov.",
    verified: true,
    type: 'skeptic-converted',
    date: "pred týždňom"
  },
  {
    id: 6,
    name: "Anna P.",
    city: "Nitra",
    rating: 5,
    text: "Darovala som ho otcovi, ktorý má 70 rokov. Nenávidel svoj starý smartfón, lebo bol 'príliš komplikovaný a plný ikon'. Na tento som mu dala len WhatsApp a Telefón na hlavnú obrazovku. Keďže je malý, nosí ho vo vrecku na košeli ako staré mobily. Je šťastný.",
    verified: true,
    type: 'positive',
    date: "Dnes"
  },
  {
    id: 7,
    name: "Róbert S.",
    city: "Trnava",
    rating: 5,
    text: "Používam dve SIM karty pre prácu. Mať dva obrovské telefóny vo vrecku bolo nemožné. Teraz mám osobný a tento A17 Mini pre pracovné číslo. Funkcia hotspot je záchrana, keď som vo vlaku a potrebujem pripojiť počítač. Príjem signálu je výborný.",
    verified: true,
    type: 'positive',
    date: "pred 4 dňami"
  },
  {
    id: 8,
    name: "Elena D.",
    city: "Trenčín",
    rating: 5,
    text: "Esteticky nádherný. Vzala som si oranžový a je veľmi originálny. V balení bolo všetko, puzdro aj fólia, čo vám nedajú ani pri telefónoch za 1000 eur. Výborne.",
    verified: true,
    type: 'positive',
    date: "pred 2 týždňami"
  },
  {
    id: 9,
    name: "Peter F.",
    city: "Martin",
    rating: 4,
    text: "Pomer kvalita/cena je férový. Nie je to blesk pri náročných hrách, ale na sociálne siete, správy a internet je viac než dobrý. Praktické je, že môžete rozšíriť pamäť kartou.",
    verified: true,
    type: 'skeptic-converted',
    date: "Včera"
  },
  {
    id: 10,
    name: "Lucia G.",
    city: "Poprad",
    rating: 5,
    text: "Platba pri doručení veľmi pohodlná, neverím zadávaniu karty online. Kuriér mi dal skontrolovať balík. Seriózna firma.",
    verified: true,
    type: 'positive',
    date: "pred 5 dňami"
  },
  {
    id: 11,
    name: "Martin L.",
    city: "Prievidza",
    rating: 5,
    text: "Používam ho ako 'detox telefón' cez víkend. Malý, jednoduchý, umožňuje mi nebyť stále prilepený k obrazovke, ale byť dostupný pre naliehavé prípady. Zmenil mi život k lepšiemu.",
    verified: true,
    type: 'positive',
    date: "pred mesiacom"
  },
  {
    id: 12,
    name: "Jana T.",
    city: "Zvolen",
    rating: 5,
    text: "Malý klenot. Všetko funguje, aj Play Store. Stiahla som si bankovú aplikáciu a funguje. Neuveriteľné, čo dnešná technológia dokáže v takom malom priestore.",
    verified: true,
    type: 'positive',
    date: "pred 3 dňami"
  }
];

const COMPARISON_DATA: ComparisonItem[] = [
  { feature: "Prenosnosť", a17: "Úplná (55g)", others: "Ťažký (>200g)" },
  { feature: "Ovládanie jednou rukou", a17: "Perfektné", others: "Nemožné" },
  { feature: "Cena", a17: "Dostupná (Pod 80€)", others: "Prehnaná (>300€)" },
  { feature: "Riziko poškodenia", a17: "Minimálne (Kompaktný)", others: "Vysoké (Veľká obrazovka)" },
  { feature: "Súkromie/Jednoduchosť", a17: "Áno (Menej rozptýlenia)", others: "Nie (Príliš veľa notifikácií)" },
  { feature: "Výbava", a17: "Kompletná (Puzdro+Fólia)", others: "Len kábel" },
];

const FEATURES_LIST: Feature[] = [
  { icon: 'pocket', title: "Skutočne vreckový", description: "Rozmery 88x45mm: zmizne vo vrecku alebo kabelke." },
  { icon: 'sim', title: "Hybridná Dual SIM", description: "Spravujte dve čísla (Práca + Súkromie) alebo rozšírte pamäť." },
  { icon: 'android', title: "Android 8.1", description: "Overený systém kompatibilný s najpoužívanejšími aplikáciami." },
  { icon: 'wifi', title: "Kompletná konektivita", description: "WiFi, GPS, Bluetooth 4.0 na pripojenie slúchadiel a auta." },
  { icon: 'camera', title: "Zachyťte momenty", description: "Kamera 12MP (zadná) + 5MP (predná) pre jasné videohovory." },
  { icon: 'battery', title: "Spoľahlivá batéria", description: "Optimalizovaná, aby vydržala celý deň pri bežnom používaní." },
  { icon: 'play', title: "Google Play Store", description: "Stiahnite si WhatsApp, Facebook, Maps a vaše obľúbené aplikácie." },
  { icon: 'usb', title: "Nabíjanie Type-C", description: "Moderný štandard: použite rovnaký kábel ako pre ostatné zariadenia." },
  { icon: 'hotspot', title: "Prenosný hotspot", description: "Premeňte telefón na WiFi modem pre váš PC alebo tablet." },
  { icon: 'build', title: "Prémiový dizajn", description: "Sklo a kov. Pevný na dotyk, nie je to 'lacný plast'." },
];

const TARGET_AUDIENCE: TargetAudience[] = [
  { title: "Pre múdrych rodičov", description: "Dajte dieťaťu bezpečný telefón s GPS a WhatsAppom bez míňania majetku.", imageText: "Deti/Bezpečnosť", image: "/images/miniphonea17%20img/Per%20i%20Genitori%20Smart.png" },
  { title: "Pre športovcov", description: "Sledujte kalórie a tep so zdravotnými aplikáciami, počúvajte hudbu cez bluetooth. Ľahký ako pierko, žiadne prekážky pri behu.", imageText: "Šport/Beh", image: "/images/miniphonea17%20img/Per%20gli%20Sportivi.png" },
  { title: "Pre pracujúcich", description: "Remeselníci, murári, profesionáli: potrebujete druhé číslo, odolný telefón, ktorý sa vojde do vrecka.", imageText: "Práca/Stavba", image: "/images/miniphonea17%20img/Per%20i%20Lavoratori.png" },
  { title: "Pre seniorov", description: "Hľadajú jednoduchosť. Telefón, ktorý robí 'telefón', ľahký a ľahko sa drží.", imageText: "Seniori/Jednoduchosť", image: "/images/miniphonea17%20img/Per%20gli%20Anziani.png" },
  { title: "Pre cestovateľov", description: "Záložný telefón v prípade krádeže alebo poškodenia hlavného. Nevyhnutný.", imageText: "Cestovanie/Záloha", image: "/images/miniphonea17%20img/Per%20i%20Viaggiatori.png" },
  { title: "Žiadny stres a záťaž", description: "Máte WhatsApp a Mapy, ale bez váhy tehly. Ideálny na ľahké večerné vychádzky.", imageText: "Relax/Ľahkosť", image: "/images/miniphonea17%20img/Zero%20Ansia%20%26%20Ingombro.png" },
];

const FAQS: FAQItem[] = [
  {
    question: "Môžem používať WhatsApp, Facebook a YouTube?",
    answer: "Absolútne ÁNO. A17 Mini má Android 8.1 s oficiálnym Google Play Store. Môžete si stiahnuť WhatsApp, Facebook, TikTok, YouTube, bankové aplikácie, počasie a všetko, čo by ste používali na bežnom telefóne. Samozrejme, keďže je obrazovka malá, zážitok je iný, ale 100% funkčný."
  },
  {
    question: "Ako dlho vydrží batéria?",
    answer: "Dodávateľ uvádza väčšiu batériu (9000 mAh nominálne) optimalizovanú pre tieto rozmery. Pri bežnom dennom používaní (hovory, správy, trochu sociálnych sietí) pohodlne vydrží celý deň. Pri intenzívnom používaní ako hotspot alebo navigácia spotreba rastie ako pri všetkých smartfónoch."
  },
  {
    question: "Je naozaj taký malý?",
    answer: "Áno, je veľký približne ako kreditná karta (88mm x 45mm). Je navrhnutý tak, aby zmizol v dlani alebo v malom vrecku džínsov. Váži len 55 gramov, prakticky pierko v porovnaní s 200+ gramami moderných telefónov."
  },
  {
    question: "Podporuje dve SIM karty a rozšíriteľnú pamäť?",
    answer: "Áno. Má hybridný zásobník: môžete vložiť 2 Nano SIM súčasne (perfektné pre Prácu + Súkromie) alebo 1 Nano SIM + 1 MicroSD na rozšírenie pamäte až o 128GB."
  },
  {
    question: "Má jack na slúchadlá?",
    answer: "Aby sa zachovali takéto malé rozmery, 3,5mm jack bol odstránený. Má však Bluetooth 4.0 plne kompatibilný so všetkými bezdrôtovými slúchadlami a systémom auta. Môžete použiť aj USB-C adaptér."
  },
  {
    question: "Ako funguje platba pri doručení?",
    answer: "Je to jednoduché a bezpečné. Objednáte teraz vyplnením formulára nižšie. Nepýtame žiadne údaje o kreditnej karte. Odošleme balík (zvyčajne do 24/48h) a keď príde kuriér k vám domov, zaplatíte presnú sumu v hotovosti priamo jemu. Žiadne riziko."
  },
  {
    question: "Aké jazyky sú k dispozícii?",
    answer: "Telefón prichádza už nastavený alebo konfigurovateľný v slovenčine. Podporuje aj angličtinu, francúzštinu, nemčinu, španielčinu, ruštinu, arabčinu a mnoho ďalších svetových jazykov."
  },
  {
    question: "Čo nájdem v balení?",
    answer: "Dostanete kompletný balíček: Smartphone A17 Mini, nabíjací kábel USB-C, priehľadné ochranné puzdro na mieru a ochrannú fóliu na obrazovku pripravenú na aplikáciu. Všetko je zahrnuté v cene."
  },
  {
    question: "Je vhodný pre starších ľudí?",
    answer: "Áno, pretože je ľahký a praktický. Rozhranie Android je možné zjednodušiť umiestnením hlavných ikon (Telefón, WhatsApp) veľkých na domovskú obrazovku. Hlasitosť je dobrá a hlasný odposluch funguje dobre."
  },
  {
    question: "Má záruku?",
    answer: "Samozrejme. Ponúkame zákonnú záruku 24 mesiacov na vady zhody. Okrem toho máte našu zákaznícku podporu cez email alebo WhatsApp pre akúkoľvek počiatočnú konfiguráciu."
  }
];

// --- COMPONENTS ---

// Hero Component
const Hero = ({ onScrollToOrder }: { onScrollToOrder: () => void }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const colors = [
    { name: 'Klasická čierna', hex: '#000000', border: 'border-gray-900' },
    { name: 'Živé striebro', hex: '#C0C0C0', border: 'border-gray-400' },
    { name: 'Hlboká modrá', hex: '#1e3a8a', border: 'border-blue-900' },
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
      title: "WhatsApp, TikTok a YouTube",
      desc: "Všetky vaše zábavné a komunikačné aplikácie vždy po ruke."
    },
    {
      title: "Hry, Banka a Utility",
      desc: "Stiahnite si z Play Store mobilné bankovníctvo, Candy Crush a vaše nevyhnutné aplikácie."
    },
    {
      title: "GPS a Google Maps",
      desc: "Navigujte autom alebo pešo s absolútnou presnosťou, nikdy sa nestratíte."
    },
    {
      title: "Dual SIM, WiFi a Bluetooth",
      desc: "Používajte dve čísla súčasne, pripojte sa k rýchlemu WiFi a bezdrôtovým slúchadlám."
    },
    {
      title: "Fotoaparát a HD dotykový displej",
      desc: "Fotky, videohovory a prehliadanie dotykom na obrazovke s vysokým rozlíšením."
    },
    {
      title: "Dlhotrvajúca batéria",
      desc: "Navrhnutá, aby vás sprevádzala celý deň bez toho, aby vás nechala na suchu."
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
               alt="A17 Mini Smartphone - Pohľad na produkt"
               className="w-full h-full object-cover"
             />
             <div className="absolute top-0 right-0 bg-[#dc2626] text-white font-black px-4 py-2 md:rounded-bl-xl shadow-md z-10 text-xl">
                {DISCOUNT_PERCENTAGE}
             </div>
             <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
                <span className="bg-black/50 text-white px-3 py-1 rounded-full text-sm font-bold backdrop-blur-sm">
                    A17 Mini spredu
                </span>
             </div>
          </div>

          <div className="flex justify-start md:justify-center gap-2 mt-4 px-2 pb-2 overflow-x-auto md:overflow-visible">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImage(idx)}
                className={`w-10 h-10 md:w-14 md:h-14 rounded-lg border-2 overflow-hidden transition-all bg-white shadow-sm shrink-0 ${idx === currentImage ? 'border-[#dc2626] ring-2 ring-red-100' : 'border-gray-300 opacity-70'}`}
              >
                  <img src={images[idx]} alt={`Náhľad ${idx}`} className="w-full h-full object-cover" />
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
            <span className="text-xs md:text-sm text-gray-500 ml-2 font-bold underline decoration-dotted">Tisíce spokojných zákazníkov</span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-gray-900 mb-4 tracking-tight">
            Konečne smartfón, ktorý sa <span className="text-[#dc2626] bg-red-50 px-2 rounded">naozaj vojde do vrecka</span>... a zvládne všetko.
          </h1>

          <p className="text-base md:text-lg text-gray-600 mb-8 leading-relaxed">
            <strong>A17 Mini</strong> je nevyhnutný telefón. Malý ako kreditná karta, výkonný ako skutočný smartfón.
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
              <span className="text-sm font-bold text-gray-700 uppercase mb-2 block">Vyberte farbu: <span className="text-[#dc2626]">{selectedColor.name}</span></span>
              <div className="flex space-x-3">
                  {colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color)}
                        className={`w-10 h-10 rounded-full border-2 shadow-sm transition-transform hover:scale-110 ${selectedColor.name === color.name ? 'ring-2 ring-offset-2 ring-[#111827] scale-110' : ''}`}
                        style={{ backgroundColor: color.hex }}
                        aria-label={`Vybrať farbu ${color.name}`}
                      />
                  ))}
              </div>
          </div>

          <div className="flex items-end space-x-3 mb-6 bg-gray-50 p-4 rounded-xl border border-gray-200 w-fit">
            <div className="flex flex-col">
                <span className="text-xs text-gray-500 uppercase font-bold">Akciová cena</span>
                <div className="text-4xl md:text-5xl font-black text-[#dc2626] tracking-tighter">{PRICE_PROMO}</div>
            </div>
            <div className="flex flex-col pb-1">
                <span className="text-xs text-gray-400 font-bold">Bežná cena</span>
                <div className="text-xl text-gray-400 line-through decoration-2 font-medium">{PRICE_LIST}</div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-2 md:gap-3 mb-6">
              <span className="bg-green-100 text-green-800 text-[10px] md:text-xs font-bold px-3 py-1 rounded-full flex items-center border border-green-200">
                  <Truck size={12} className="mr-1"/> DORUČENIE 24/48H
              </span>
              <span className="bg-green-100 text-green-800 text-[10px] md:text-xs font-bold px-3 py-1 rounded-full flex items-center border border-green-200">
                  <ShieldCheck size={12} className="mr-1"/> PLATBA PRI DORUČENÍ
              </span>
              <span className="bg-green-100 text-green-800 text-[10px] md:text-xs font-bold px-3 py-1 rounded-full flex items-center border border-green-200">
                  <ShieldCheck size={12} className="mr-1"/> ZÁRUKA 2 ROKY
              </span>
          </div>

          <button
            onClick={onScrollToOrder}
            className="w-full bg-[#16a34a] hover:bg-green-700 text-white font-black text-xl md:text-2xl py-5 rounded-xl shadow-[0_4px_14px_0_rgba(22,163,74,0.39)] transform active:scale-95 transition-all flex items-center justify-center animate-bounce-slow"
          >
            OBJEDNAŤ A ZAPLATIŤ KURIÉROVI
          </button>
          <p className="text-center text-xs text-gray-500 mt-3">Obmedzená dostupnosť. Nie je potrebná kreditná karta.</p>
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
      title: "Správy a sociálne siete",
      desc: "WhatsApp, Instagram a TikTok v jednej ruke.",
      icon: <MessageCircle className="w-4 h-4 md:w-5 md:h-5 text-white" />,
      color: "bg-green-500",
      video: "/images/miniphonea17%20img/MESSAGGI%20E%20SOCIAL%20GIF.webm"
    },
    {
      id: 'camera',
      title: "Fotky a videá",
      desc: "Fotky a selfie ostré ako britva.",
      icon: <Camera className="w-4 h-4 md:w-5 md:h-5 text-white" />,
      color: "bg-blue-500",
      video: "/images/miniphonea17%20img/Foto%20%26%20VideoM%20GIF.webm"
    },
    {
      id: 'media',
      title: "Video a YouTube",
      desc: "Pozerajte videá kdekoľvek bez záťaže.",
      icon: <Play className="w-4 h-4 md:w-5 md:h-5 text-white" />,
      color: "bg-red-500",
      video: "/images/miniphonea17%20img/_Video%20%26%20YouTube%20GIF.webm"
    },
    {
      id: 'games',
      title: "Hry a zábava",
      desc: "Perfektná zábava počas prestávok.",
      icon: <Gamepad2 className="w-4 h-4 md:w-5 md:h-5 text-white" />,
      color: "bg-orange-500",
      video: "/images/miniphonea17%20img/Giochi%20%26%20Svago%20GIF.webm"
    }
  ];

  return (
    <div className="py-10 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-extrabold text-center mb-4 leading-tight">
          Čo s ním <span className="text-[#dc2626] underline decoration-wavy">naozaj</span> môžete robiť?
        </h2>
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto text-sm md:text-base">
            Mnohí si myslia, že je to hračka. Omyl. Tu je dôkaz, že je to kompletný smartfón.
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
                    CHCEM HO VYSKÚŠAŤ HNEĎ
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
          Pravda: dnešné telefóny sú <span className="text-[#dc2626] underline decoration-wavy">PRÍLIŠ VEĽKÉ</span>.
        </h2>

        <p className="text-center text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            Frustruje vás zakaždým, keď musíte strčiť smartfón do vrecka? Sú ťažké, kĺžu a stoja príliš veľa.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border-t-4 border-[#dc2626] flex flex-col items-center text-center">
             <div className="bg-red-100 p-3 rounded-full mb-4 text-[#dc2626]">
                <X size={32} strokeWidth={3} />
             </div>
            <h3 className="font-bold text-xl mb-2 text-gray-900">
                Preplnené vrecká
            </h3>
            <p className="text-gray-600 text-sm">
                Nevojdú sa do džínsov, ničia sako a zaberajú celú kabelku. Neustály stres.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border-t-4 border-[#dc2626] flex flex-col items-center text-center">
             <div className="bg-red-100 p-3 rounded-full mb-4 text-[#dc2626]">
                <X size={32} strokeWidth={3} />
             </div>
            <h3 className="font-bold text-xl mb-2 text-gray-900">
                Strach z poškodenia
            </h3>
            <p className="text-gray-600 text-sm">
                Chvíľka nepozornosti a... prask. Stovky eur škody za obrovské sklo.
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
                Musíte vždy používať obe ruky na písanie alebo prehliadanie. Veľmi nepraktické na cestách.
            </p>
          </div>
        </div>

        <div className="mt-10 text-center">
            <p className="text-xl font-bold italic text-gray-800">"Existuje alternatíva. Objavte znovu pohodlie."</p>
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
                Tu je <span className="text-[#16a34a]">A17 Mini</span>.
            </h2>
            <p className="text-xl md:text-2xl font-light mb-10 text-gray-200">
                Nie je to len telefón. Je to vaša vreckový sloboda.
            </p>

            {/* Benefits Micro-List */}
            <div className="flex flex-col md:flex-row justify-center gap-4 mb-10">
                <div className="bg-white/10 px-4 py-2 rounded-full border border-white/20 flex items-center justify-center">
                    <Check size={18} className="text-[#16a34a] mr-2" /> <span className="font-bold">Ovládanie jednou rukou</span>
                </div>
                 <div className="bg-white/10 px-4 py-2 rounded-full border border-white/20 flex items-center justify-center">
                    <Check size={18} className="text-[#16a34a] mr-2" /> <span className="font-bold">Žiadna záťaž</span>
                </div>
                 <div className="bg-white/10 px-4 py-2 rounded-full border border-white/20 flex items-center justify-center">
                    <Check size={18} className="text-[#16a34a] mr-2" /> <span className="font-bold">Žiadny stres</span>
                </div>
            </div>

            {/* Steps */}
            <div className="grid md:grid-cols-3 gap-8 text-left">
                <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-white/10">
                    <div className="text-4xl font-black text-[#16a34a] mb-2">01</div>
                    <h4 className="font-bold text-lg mb-2">Vložte SIM</h4>
                    <p className="text-sm text-gray-300">Funguje so všetkými SIM kartami. Môžete vložiť aj dve naraz.</p>
                </div>
                <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-white/10">
                    <div className="text-4xl font-black text-[#16a34a] mb-2">02</div>
                    <h4 className="font-bold text-lg mb-2">Zapnite a používajte</h4>
                    <p className="text-sm text-gray-300">Android 8.1 je už nainštalovaný a nastavený v slovenčine. Pripravený za 30 sekúnd.</p>
                </div>
                <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-white/10">
                    <div className="text-4xl font-black text-[#16a34a] mb-2">03</div>
                    <h4 className="font-bold text-lg mb-2">Stiahnite aplikácie</h4>
                    <p className="text-sm text-gray-300">Otvorte Play Store a stiahnite WhatsApp, YouTube alebo čo potrebujete. Hotovo!</p>
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
            Kompletná technológia
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
                Nenechajte sa oklamať rozmermi. Vnútri je všetko, čo očakávate od moderného smartfónu.
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
            <h4 className="font-bold text-gray-700 text-sm uppercase mb-2">Podrobné technické špecifikácie</h4>
            <p className="text-xs text-gray-500 leading-relaxed font-mono mb-4">
                CPU: MediaTek MTK6580 Quad Core (6 jadier uvádzaných) | RAM: 16GB (uvádzaná) | ROM: 64GB | OS: Android 8.1 |
                Displej: 3.0" | Bat: 9000mAh (nominálne) | Kam: 5MP+12MP |
                Sieť: 3G WCDMA / WiFi / GPS / BT 4.0 | Rozmery: 88.4x45.2x11mm | Hmotnosť: 55g.
            </p>

            {onScrollToOrder && (
                <button
                  onClick={onScrollToOrder}
                  className="bg-[#16a34a] text-white font-bold py-2 px-6 rounded-full shadow hover:bg-green-700 transition-transform active:scale-95 inline-flex items-center text-sm"
                >
                    <ShoppingCart size={16} className="mr-2" />
                    CHCEM OBJEDNAŤ TERAZ
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
        <h2 className="text-3xl font-black text-center mb-10 text-gray-900">Pre koho je A17 Mini perfektný?</h2>

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
                    <Check size={16} className="mr-2" /> Odporúčaná voľba
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
                    Perfektný pre rodičov a deti
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
                    Prvý smartfón <br/>
                    <span className="text-[#16a34a]">bezpečný a nezničiteľný?</span>
                </h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    Chcete, aby bolo vaše dieťa dostupné, ale bojíte sa mu dať telefón za 500€?
                    A17 Mini je riešenie, ktoré poteší všetkých: <strong>on má svoje aplikácie, vy máte pokoj.</strong>
                </p>

                <div className="space-y-6">
                    <div className="flex items-start">
                        <div className="bg-white p-3 rounded-full shadow-sm mr-4 border border-blue-100 text-blue-600">
                            <MapPin size={24} strokeWidth={2.5} />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 text-lg">GPS a lokalizácia</h4>
                            <p className="text-sm text-gray-600">Vďaka Google Maps a integrovanému GPS môžete vždy vedieť, kde sa nachádza v prípade potreby.</p>
                        </div>
                    </div>

                    <div className="flex items-start">
                        <div className="bg-white p-3 rounded-full shadow-sm mr-4 border border-green-100 text-green-600">
                            <MessageCircle size={24} strokeWidth={2.5} />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 text-lg">WhatsApp a hovory</h4>
                            <p className="text-sm text-gray-600">Zostaňte vždy v kontakte. Môže vám posielať hlasové správy, fotky a volať, keď odchádza zo školy.</p>
                        </div>
                    </div>

                    <div className="flex items-start">
                        <div className="bg-white p-3 rounded-full shadow-sm mr-4 border border-purple-100 text-purple-600">
                            <Gamepad2 size={24} strokeWidth={2.5} />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 text-lg">"Kontrolovaná" zábava</h4>
                            <p className="text-sm text-gray-600">Podporuje YouTube a ľahké hry na chvíle oddychu, ale kompaktná obrazovka zabraňuje tomu, aby zostal "zhypnotizovaný" celé hodiny.</p>
                        </div>
                    </div>

                    <div className="flex items-start">
                        <div className="bg-white p-3 rounded-full shadow-sm mr-4 border border-red-100 text-red-600">
                            <ShieldCheck size={24} strokeWidth={2.5} />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 text-lg">Žiadne riziko (aj keď spadne)</h4>
                            <p className="text-sm text-gray-600">Je malý, kompaktný a odolný. A ak by sa stalo nemožné... nestratili ste výplatu.</p>
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
                            <div className="text-sm text-gray-500">Otec 11-ročného chlapca</div>
                        </div>
                    </div>
                    <p className="text-gray-700 italic text-lg leading-relaxed mb-4">
                        "Kúpil som pre syna na školský výlet. Nechcel som mu dať svoj starý iPhone, ktorý by určite stratil. <span className="bg-yellow-100 font-bold px-1">Tento je perfektný:</span> má GPS, takže vidím, kde je, voláme si cez WhatsApp, ale je dosť malý na to, aby sa zmestil do ľadvinky bez problémov. Je nadšený, pretože ho chceli vidieť všetci spolužiaci!"
                    </p>
                    <div className="flex items-center text-sm font-bold text-green-600">
                        <ShieldCheck size={16} className="mr-1" /> Overený nákup
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
            A17 Mini <span className="text-gray-400 font-light lowercase">vs</span> Veľké telefóny
        </h2>

        <div className="overflow-hidden border-2 border-gray-100 rounded-2xl shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[350px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="p-3 md:p-4 text-xs md:text-sm font-bold text-gray-400 uppercase tracking-wider w-1/3">Vlastnosť</th>
                  <th className="p-3 md:p-4 font-black text-[#111827] text-center w-1/3 text-lg md:text-xl bg-green-50/50 border-x border-green-100 text-[#16a34a]">A17 Mini</th>
                  <th className="p-3 md:p-4 font-bold text-gray-400 text-center w-1/3 text-xs md:text-sm">Tradičné <br/>smartfóny</th>
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
            *Porovnanie založené na priemerných rozmeroch a cenách smartfónov s obrazovkou 6.5 palcov a viac.
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
          Budeme na 100% úprimní. <br/>
          <span className="text-gray-500 text-xl font-normal">A17 Mini nie je pre každého.</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Who is NOT for */}
          <div className="bg-red-50 rounded-3xl p-8 border-2 border-red-100">
            <h3 className="text-2xl font-black text-red-600 mb-6 flex items-center">
              <XCircle className="mr-3" size={32} />
              NIE JE pre vás, ak...
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-red-500 font-bold mr-2 text-xl">×</span>
                <span className="text-gray-700 font-medium">Chcete obrovskú obrazovku na pozeranie 3-hodinových filmov alebo seriálov v 4K.</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 font-bold mr-2 text-xl">×</span>
                <span className="text-gray-700 font-medium">Hľadáte telefón na "Náročné hry" (Fortnite, Call of Duty atď.).</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 font-bold mr-2 text-xl">×</span>
                <span className="text-gray-700 font-medium">Ste profesionálny fotograf, ktorý hľadá 100x zoom.</span>
              </li>
            </ul>
          </div>

          {/* Who IS for */}
          <div className="bg-green-50 rounded-3xl p-8 border-2 border-green-100 shadow-xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-20 h-20 bg-green-200 rounded-bl-full opacity-50"></div>
            <h3 className="text-2xl font-black text-green-700 mb-6 flex items-center relative z-10">
              <CheckCircle className="mr-3" size={32} />
              JE PERFEKTNÝ pre vás, ak...
            </h3>
            <ul className="space-y-4 relative z-10">
              <li className="flex items-start">
                <span className="text-green-600 font-bold mr-2 text-xl">✓</span>
                <span className="text-gray-800 font-bold">Chcete WhatsApp, Video, Mapy a sociálne siete v telefóne, ktorý sa vojde do dlane.</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 font-bold mr-2 text-xl">✓</span>
                <span className="text-gray-800 font-bold">Chcete pohodlie Dual SIM na oddelenie práce a súkromia.</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 font-bold mr-2 text-xl">✓</span>
                <span className="text-gray-800 font-bold">Chcete spoľahlivý telefón pre deti alebo rodičov bez míňania 500€.</span>
              </li>
               <li className="flex items-start">
                <span className="text-green-600 font-bold mr-2 text-xl">✓</span>
                <span className="text-gray-800 font-bold">Ste unavení z telefónov, ktoré vážia ako tehly.</span>
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
                Limitovaná ponuka
            </span>
            <h3 className="text-3xl md:text-4xl font-extrabold mb-2">Nekupujete len telefón.</h3>
            <p className="text-gray-400 text-lg">Dostanete <span className="text-white font-bold underline">KOMPLETNÝ SET</span> pripravený na použitie.</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-sm shadow-2xl">
            <div className="space-y-4">
                {/* Main Item */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="flex items-center">
                        <img src="https://placehold.co/100x100/111827/FFF?text=A17" alt="Telefón" className="w-16 h-16 rounded bg-gray-800 object-cover mr-4 border border-gray-700"/>
                        <div>
                            <div className="font-bold text-lg">Smartphone A17 Mini</div>
                            <div className="text-xs text-gray-400">Android 8.1 - 64GB</div>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="font-bold text-xl">159,99€</div>
                    </div>
                </div>

                {/* Freebies */}
                <div className="space-y-3 pl-4 md:pl-20 relative">
                     <div className="absolute left-8 md:left-12 top-0 bottom-0 w-0.5 bg-gray-700 -z-10"></div>

                     <div className="flex items-center justify-between bg-gray-800/50 p-3 rounded-lg border border-gray-700/50">
                        <div className="flex items-center">
                            <Plus className="text-yellow-500 mr-3 shrink-0" size={16} />
                            <span className="text-sm md:text-base">Priehľadné ochranné puzdro</span>
                        </div>
                        <div className="flex flex-col text-right">
                             <span className="text-xs text-gray-500 line-through">9,90€</span>
                             <span className="text-yellow-400 font-bold text-sm">ZADARMO</span>
                        </div>
                     </div>

                     <div className="flex items-center justify-between bg-gray-800/50 p-3 rounded-lg border border-gray-700/50">
                        <div className="flex items-center">
                            <Plus className="text-yellow-500 mr-3 shrink-0" size={16} />
                            <span className="text-sm md:text-base">Ochranná fólia na displej</span>
                        </div>
                        <div className="flex flex-col text-right">
                             <span className="text-xs text-gray-500 line-through">7,90€</span>
                             <span className="text-yellow-400 font-bold text-sm">ZADARMO</span>
                        </div>
                     </div>

                     <div className="flex items-center justify-between bg-gray-800/50 p-3 rounded-lg border border-gray-700/50">
                        <div className="flex items-center">
                            <Plus className="text-yellow-500 mr-3 shrink-0" size={16} />
                            <span className="text-sm md:text-base">Nabíjací kábel USB-C</span>
                        </div>
                        <div className="flex flex-col text-right">
                             <span className="text-xs text-gray-500 line-through">6,90€</span>
                             <span className="text-yellow-400 font-bold text-sm">ZADARMO</span>
                        </div>
                     </div>

                     <div className="flex items-center justify-between bg-green-900/30 p-3 rounded-lg border border-green-700/50">
                        <div className="flex items-center">
                            <ShieldCheck className="text-green-400 mr-3 shrink-0" size={16} />
                            <span className="text-sm md:text-base font-bold text-green-300">Záruka 2 roky</span>
                        </div>
                        <div className="flex flex-col text-right">
                             <span className="text-green-400 font-bold text-sm">ZADARMO</span>
                        </div>
                     </div>
                </div>

                {/* Total */}
                <div className="mt-8 pt-6 border-t border-white/20 text-center">
                    <p className="text-sm text-gray-400 mb-1">Celková obchodná hodnota: <span className="line-through">184,69€</span></p>
                    <div className="text-5xl font-black text-white mb-2 tracking-tight">{PRICE_PROMO}</div>
                    <p className="text-green-400 font-bold text-sm uppercase tracking-wider animate-pulse">Prioritné doručenie dnes zadarmo</p>
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
        <h2 className="text-3xl md:text-4xl font-black text-center mb-4 text-gray-900">Čo hovoria naši zákazníci?</h2>
        <div className="flex justify-center items-center mb-10 space-x-2">
            <div className="flex text-yellow-400"><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /></div>
            <span className="font-bold text-gray-600">4.8/5 na základe viac ako 12 000 objednávok</span>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-12 opacity-80">
            {[
              "/images/miniphonea17%20img/RECENSIONI/ezz1aefevt6f1.jpeg",
              "/images/miniphonea17%20img/RECENSIONI/images.jpeg",
              "/images/miniphonea17%20img/RECENSIONI/oardefault.jpg",
              "/images/miniphonea17%20img/RECENSIONI/s-l1600.webp"
            ].map((src, n) => (
                <img key={n} src={src} alt="Spokojný zákazník" className="rounded-lg shadow-sm hover:opacity-100 transition-opacity aspect-square object-cover" />
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
                        <BadgeCheck size={12} className="mr-1" /> OVERENÉ
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
                    NEČAKAJTE, OBJEDNAJTE TERAZ
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
                <p className="font-bold text-blue-900">Máte ďalšie otázky?</p>
                <p className="text-sm text-blue-800">Objednajte bez záväzku: zavoláme vám na potvrdenie objednávky a môžete sa nás opýtať všetko, čo chcete, telefonicky!</p>
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
      color: 'Klasická čierna',
      notes: ''
  });

  const colors = [
    { name: 'Klasická čierna', hex: '#000000' },
    { name: 'Živé striebro', hex: '#C0C0C0' },
    { name: 'Hlboká modrá', hex: '#1e3a8a' },
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
        currency: 'EUR',
        value: 79.99
      });

      // Redirect to thank you page
      window.location.href = '/fb-ty/ty-fb-sk';
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
                  <h2 className="text-3xl font-black text-gray-900 mb-4">Ďakujeme {formData.firstName}!</h2>
                  <div className="bg-green-100 p-4 rounded-xl mb-6">
                      <p className="text-xl font-bold text-green-800">Vaša objednávka je potvrdená.</p>
                      <p className="text-sm text-green-700 mt-2">Vybraná farba: <strong>{formData.color}</strong></p>
                  </div>
                  <p className="text-gray-600 mb-8 leading-relaxed">
                      Náš operátor vás bude kontaktovať na čísle <strong>{formData.phone}</strong> do 24 hodín na potvrdenie doručovacej adresy.
                  </p>
                  <div className="border-t border-gray-200 pt-6">
                      <p className="text-sm text-gray-500 uppercase tracking-wide font-bold mb-2">Suma na zaplatenie pri doručení:</p>
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
                <span>Ponuka končí o: <span className="font-mono text-2xl ml-1">{formatTime(timeLeft)}</span></span>
             </div>
        </div>

        <div className="bg-white rounded-b-3xl rounded-t-none shadow-2xl overflow-hidden border border-gray-200">
            {/* Header */}
            <div className="bg-gray-900 text-white p-8 text-center">
                <h3 className="text-2xl font-black uppercase mb-1">Objednávkový formulár</h3>
                <p className="text-gray-400 text-sm">Vyplňte pre doručenie A17 Mini k vám domov.</p>
            </div>

            <div className="p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                    <input type="hidden" name="tmfp" ref={tmfpRef} />

                    {/* Visual Recap */}
                    <div className="flex items-center bg-gray-50 p-4 rounded-xl border border-gray-200 mb-6">
                        <img src="https://placehold.co/100x100/111827/FFF?text=A17" alt="Produkt" className="w-16 h-16 rounded object-cover mr-4"/>
                        <div className="flex-grow">
                            <div className="font-bold text-gray-900">A17 Mini + Set príslušenstva</div>
                            <div className="text-[#dc2626] font-black text-xl">{PRICE_PROMO}</div>
                        </div>
                    </div>

                    {/* Color Selection inside Form */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Vyberte farbu *</label>
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
                        <label className="block text-sm font-bold text-gray-700 mb-1 ml-1">Meno a priezvisko *</label>
                        <input
                            required
                            type="text"
                            name="firstName"
                            placeholder="Napr.: Ján Novák"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full p-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-[#16a34a] focus:ring-0 outline-none text-lg transition-colors placeholder-gray-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1 ml-1">Telefónne číslo *</label>
                        <input
                            required
                            type="tel"
                            name="phone"
                            placeholder="Napr.: 0905 123 456"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full p-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-[#16a34a] focus:ring-0 outline-none text-lg transition-colors placeholder-gray-400"
                        />
                        <p className="text-xs text-gray-500 mt-1 ml-1">Zavoláme vám len na potvrdenie doručenia.</p>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1 ml-1">Adresa a číslo domu *</label>
                        <textarea
                            required
                            name="address"
                            placeholder="Napr.: Hlavná 10, Bratislava (Zvonček 3)"
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
                        <span>{isSubmitting ? 'SPRACOVANIE...' : 'OBJEDNAŤ TERAZ'}</span>
                        {!isSubmitting && <Truck className="ml-3 group-hover:translate-x-1 transition-transform" size={28} />}
                    </button>
                    <div className="text-center font-bold text-[#16a34a] text-sm uppercase tracking-wide">Platba pri doručení</div>

                    <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-100">
                        <div className="flex items-center justify-center text-xs text-gray-500 bg-gray-50 py-2 rounded">
                            <Lock size={12} className="mr-1" /> Žiadne bankové údaje
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
            <span className="text-xs text-red-600 font-bold uppercase tracking-wider">Blesková ponuka</span>
            <span className="text-xl font-black text-gray-900 leading-none">{PRICE_PROMO}</span>
        </div>
        <button
          onClick={onScrollToOrder}
          className="flex-grow bg-[#16a34a] active:bg-green-700 text-white font-bold text-lg py-3 rounded-xl shadow-lg flex items-center justify-center active:scale-95 transition-transform cursor-pointer touch-manipulation"
        >
           <ShoppingCart size={20} className="mr-2" />
           OBJEDNAŤ TERAZ
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
            transform: translateY(-25%)}
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
        POSLEDNYCH 12 KUSOV ZA ZLACNENU CENU
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
