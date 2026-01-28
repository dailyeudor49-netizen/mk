'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Star, Truck, ShieldCheck, Check, Smartphone, Cpu, Wifi, Battery,
  MessageCircle, Camera, Play, Gamepad2, ShoppingCart,
  AlertTriangle, X, ArrowDown, Share2, CreditCard, Shield, Zap, Layers, Map,
  Gift, Plus, BadgeCheck, Clock, Lock, XCircle, CheckCircle, MapPin, Quote,
  ChevronDown, ChevronUp
} from 'lucide-react';
import { useFacebookTracking } from '@/app/hooks/useFacebookTracking';

// --- NETWORK CONFIG ---
const NETWORK_CONFIG = {
  apiUrl: 'https://offers.supertrendaffiliateprogram.com/forms/api/',
  uid: '019855d0-397a-72ee-8df5-c5026966105a',
  key: '8ea99f0506e1df27f625d0',
  offer: '121',
  lp: '121',
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

const PRICE_PROMO = "349 zł";
const PRICE_LIST = "699 zł";
const DISCOUNT_PERCENTAGE = "-50%";

const REVIEWS: Review[] = [
  {
    id: 1,
    name: "Marek T.",
    city: "Warszawa",
    rating: 5,
    text: "Byłem bardzo sceptyczny. Telefon tak mały w tej cenie? A jednak musiałem zmienić zdanie. Używam go na budowie, bo boję się zepsuć mój główny telefon za 3000 zł. Ten A17 Mini łapie zasięg wszędzie, ma WhatsApp, maile i jak spadnie, to nie dostaję zawału. Bateria wystarcza na cały dzień pracy. Polecam każdemu, kto pracuje fizycznie.",
    verified: true,
    type: 'skeptic-converted',
    date: "2 dni temu"
  },
  {
    id: 2,
    name: "Karolina B.",
    city: "Kraków",
    rating: 5,
    text: "Nareszcie! Mam małe dłonie i torebki zawsze przepełnione. Dzisiejsze telefony wyglądają jak tablety, są strasznie niewygodne. A17 Mini to wybawienie: mieści się w kieszonce dżinsów i nawet go nie czuję. Używam do dzwonienia do wnuków przez WhatsApp i oglądania przepisów na YouTube. Prosty, bez zbędnych bajerów, spełnia swoje zadanie. Zapłaciłam kurierowi, który był bardzo miły.",
    verified: true,
    type: 'positive',
    date: "Dzisiaj"
  },
  {
    id: 3,
    name: "Łukasz W.",
    city: "Łódź",
    rating: 5,
    text: "Kupiłem dla mojego 11-letniego syna na wycieczkę szkolną. Nie chciałem dawać mu drogiego smartfona, który na pewno by zgubił lub zepsuł. Ten jest idealny: ma GPS, więc widzę gdzie jest, rozmawiamy na WhatsApp, ale jest wystarczająco mały, żeby go nie rozpraszał. Wrócił zachwycony, bo wszyscy koledzy chcieli go zobaczyć. Świetny zakup.",
    verified: true,
    type: 'positive',
    date: "Wczoraj"
  },
  {
    id: 4,
    name: "Sylwia R.",
    city: "Wrocław",
    rating: 4,
    text: "Dostawa w dokładnie 24 godziny. Design bardzo dopracowany, wygląda jak mały sztabka złota. Tylne szkło jest eleganckie. Nie oczekujcie zdjęć jak z profesjonalnego aparatu, ale do wysyłania fotek kotów na WhatsApp jest idealny. Głośność dźwięku zaskakująco wysoka jak na te rozmiary.",
    verified: true,
    type: 'positive',
    date: "3 dni temu"
  },
  {
    id: 5,
    name: "Grzegorz M.",
    city: "Poznań",
    rating: 5,
    text: "Jestem amatorem biegania. Bieganie z wielkimi telefonami przypiętymi do ramienia to koszmar, są ciężkie i ślizgają się. A17 Mini wkładam do kieszonki szortów i o nim zapominam. Ma Spotify i GPS do śledzenia trasy. Dla mnie to najlepszy drugi telefon dla osób uprawiających sport.",
    verified: true,
    type: 'skeptic-converted',
    date: "Tydzień temu"
  },
  {
    id: 6,
    name: "Anna P.",
    city: "Gdańsk",
    rating: 5,
    text: "Podarowałam go mojemu tacie, który ma 70 lat. Nienawidził swojego starego smartfona dotykowego, bo był 'zbyt skomplikowany i pełen ikonek'. Na tym ustawiłam mu tylko WhatsApp i Telefon na ekranie głównym. Jako że jest mały, nosi go w kieszonce koszuli, jak kiedyś stare komórki. Jest przeszczęśliwy.",
    verified: true,
    type: 'positive',
    date: "Dzisiaj"
  },
  {
    id: 7,
    name: "Robert S.",
    city: "Szczecin",
    rating: 5,
    text: "Używam dwóch kart SIM do pracy. Noszenie dwóch wielkich telefonów w kieszeni było niemożliwe. Teraz mam mój prywatny i tego A17 Mini na numer służbowy. Funkcja hotspotu to ratunek, gdy jadę pociągiem i muszę podłączyć laptopa. Zasięg jest świetny.",
    verified: true,
    type: 'positive',
    date: "4 dni temu"
  },
  {
    id: 8,
    name: "Elena D.",
    city: "Bydgoszcz",
    rating: 5,
    text: "Estetycznie piękny. Wzięłam pomarańczowy i jest bardzo oryginalny. W opakowaniu było już wszystko, etui i folia, czego już nie dają nawet z telefonami za 4000 zł. Brawo.",
    verified: true,
    type: 'positive',
    date: "2 tygodnie temu"
  },
  {
    id: 9,
    name: "Piotr F.",
    city: "Lublin",
    rating: 4,
    text: "Uczciwy stosunek jakości do ceny. Nie jest demonem szybkości przy ciężkich grach, ale do social mediów, wiadomości i internetu działa więcej niż dobrze. Wygodne jest to, że można rozszerzyć pamięć kartą.",
    verified: true,
    type: 'skeptic-converted',
    date: "Wczoraj"
  },
  {
    id: 10,
    name: "Lucyna G.",
    city: "Katowice",
    rating: 5,
    text: "Płatność przy odbiorze bardzo wygodna, nie ufam podawaniu karty w internecie. Kurier pozwolił mi sprawdzić paczkę. Poważna firma.",
    verified: true,
    type: 'positive',
    date: "5 dni temu"
  },
  {
    id: 11,
    name: "Marcin L.",
    city: "Białystok",
    rating: 5,
    text: "Używam go jako 'telefon do detoksu' w weekendy. Mały, prosty, pozwala mi nie być ciągle przyklejonym do ekranu, ale być osiągalnym w nagłych wypadkach. Zmienił moje życie na lepsze.",
    verified: true,
    type: 'positive',
    date: "Miesiąc temu"
  },
  {
    id: 12,
    name: "Joanna T.",
    city: "Gdynia",
    rating: 5,
    text: "Mała perełka. Wszystko działa, nawet Sklep Play. Pobrałam aplikację bankową i działa. Niesamowite, ile technologii mieści się w tak małej przestrzeni.",
    verified: true,
    type: 'positive',
    date: "3 dni temu"
  }
];

const COMPARISON_DATA: ComparisonItem[] = [
  { feature: "Przenośność", a17: "Całkowita (55g)", others: "Ciężki (>200g)" },
  { feature: "Obsługa jedną ręką", a17: "Idealna", others: "Niemożliwa" },
  { feature: "Cena", a17: "Przystępna (poniżej 350 zł)", others: "Przesadzona (>1500 zł)" },
  { feature: "Ryzyko uszkodzenia", a17: "Minimalne (kompaktowy)", others: "Wysokie (duży ekran)" },
  { feature: "Prywatność/Prostota", a17: "Tak (mniej rozpraszaczy)", others: "Nie (za dużo powiadomień)" },
  { feature: "Wyposażenie", a17: "Pełne (etui+folia w zestawie)", others: "Tylko kabel" },
];

const FEATURES_LIST: Feature[] = [
  { icon: 'pocket', title: "Naprawdę kieszonkowy", description: "Wymiary 88x45mm: znika w kieszonce lub torebce." },
  { icon: 'sim', title: "Hybrydowy Dual SIM", description: "Zarządzaj dwoma numerami (Praca + Dom) lub rozszerz pamięć." },
  { icon: 'android', title: "Android 8.1", description: "Sprawdzony system kompatybilny z najpopularniejszymi aplikacjami." },
  { icon: 'wifi', title: "Pełna łączność", description: "WiFi, GPS, Bluetooth 4.0 do połączenia ze słuchawkami i samochodem." },
  { icon: 'camera', title: "Uchwyć chwile", description: "Aparat 12MP (tył) + 5MP (przód) do wyraźnych wideorozmów." },
  { icon: 'battery', title: "Niezawodna bateria", description: "Zoptymalizowana, by starczyła do końca dnia przy normalnym użyciu." },
  { icon: 'play', title: "Google Play Store", description: "Pobierz WhatsApp, Facebook, Mapy i swoje ulubione aplikacje." },
  { icon: 'usb', title: "Ładowanie Type-C", description: "Nowoczesny standard: używaj tego samego kabla co do innych urządzeń." },
  { icon: 'hotspot', title: "Przenośny hotspot", description: "Zamień telefon w modem WiFi dla laptopa lub tableta." },
  { icon: 'build', title: "Premium design", description: "Szkło i metal. Solidny w dotyku, to nie 'tania plastikowa zabawka'." },
];

const TARGET_AUDIENCE: TargetAudience[] = [
  { title: "Dla mądrych rodziców", description: "Daj dziecku bezpieczny telefon z GPS i WhatsApp, nie wydając fortuny.", imageText: "Dzieci/Bezpieczeństwo", image: "/images/miniphonea17%20img/Per%20i%20Genitori%20Smart.png" },
  { title: "Dla sportowców", description: "Monitoruj kalorie i puls aplikacjami zdrowotnymi, słuchaj muzyki przez bluetooth. Lekki jak piórko, zero przeszkód podczas biegu.", imageText: "Sport/Bieganie", image: "/images/miniphonea17%20img/Per%20gli%20Sportivi.png" },
  { title: "Dla pracowników", description: "Rzemieślnicy, budowlańcy, profesjonaliści: potrzebują drugiego numeru, wytrzymałego telefonu, który mieści się w kieszeni.", imageText: "Praca/Budowa", image: "/images/miniphonea17%20img/Per%20i%20Lavoratori.png" },
  { title: "Dla seniorów", description: "Szukają prostoty. Telefon, który robi to, co telefon powinien, lekki i łatwy do trzymania.", imageText: "Seniorzy/Prostota", image: "/images/miniphonea17%20img/Per%20gli%20Anziani.png" },
  { title: "Dla podróżników", description: "Zapasowy telefon na wypadek kradzieży lub uszkodzenia głównego. Niezbędny.", imageText: "Podróże/Backup", image: "/images/miniphonea17%20img/Per%20i%20Viaggiatori.png" },
  { title: "Zero stresu i ciężaru", description: "Masz WhatsApp i Mapy, ale bez ciężaru cegły. Idealny na lekkie wyjście wieczorem.", imageText: "Relaks/Lekkość", image: "/images/miniphonea17%20img/Zero%20Ansia%20%26%20Ingombro.png" },
];

const FAQS: FAQItem[] = [
  {
    question: "Czy mogę używać WhatsApp, Facebook i YouTube?",
    answer: "Absolutnie TAK. A17 Mini ma Android 8.1 z oficjalnym Google Play Store. Możesz pobrać WhatsApp, Facebook, TikTok, YouTube, aplikacje bankowe, pogodę i wszystko, czego używasz na normalnym telefonie. Oczywiście ekran jest mały, więc doświadczenie jest inne, ale w 100% funkcjonalne."
  },
  {
    question: "Jak długo działa bateria?",
    answer: "Producent deklaruje powiększoną baterię (9000 mAh nominalnie) zoptymalizowaną pod kątem rozmiaru. W codziennym użytku (rozmowy, wiadomości, trochę social mediów) spokojnie wystarcza na cały dzień. Przy intensywnym użyciu jako hotspot lub nawigacja, jak w każdym smartfonie, zużycie wzrasta."
  },
  {
    question: "Czy naprawdę jest taki mały?",
    answer: "Tak, jest wielkości mniej więcej karty kredytowej (88mm x 45mm). Zaprojektowany, by zniknąć w dłoni lub małej kieszeni dżinsów. Waży tylko 55 gramów, praktycznie jak piórko w porównaniu z 200+ gramami nowoczesnych telefonów."
  },
  {
    question: "Czy obsługuje dwie karty SIM i rozszerzalną pamięć?",
    answer: "Tak. Ma hybrydową tackę: możesz włożyć 2 karty Nano SIM jednocześnie (idealne do Pracy + Prywatnie) lub 1 Nano SIM + 1 MicroSD, aby rozszerzyć pamięć o dodatkowe 128GB."
  },
  {
    question: "Czy ma gniazdo słuchawkowe?",
    answer: "Aby zachować tak małe wymiary, gniazdo 3,5mm zostało usunięte. Jednak ma Bluetooth 4.0 w pełni kompatybilny ze wszystkimi słuchawkami bezprzewodowymi i systemem samochodowym. Możesz też użyć adaptera USB-C."
  },
  {
    question: "Jak działa płatność przy odbiorze?",
    answer: "To bardzo proste i bezpieczne. Zamawiasz teraz, wypełniając poniższy formularz. Nie prosimy o żadne dane karty kredytowej. Wysyłamy paczkę (zwykle w 24/48h) i gdy kurier przyjedzie do Ciebie, płacisz dokładną kwotę gotówką bezpośrednio jemu. Żadnego ryzyka."
  },
  {
    question: "Jakie języki są dostępne?",
    answer: "Telefon jest już skonfigurowany lub można go ustawić na język polski. Obsługuje również angielski, niemiecki, francuski, hiszpański, rosyjski, arabski i wiele innych języków."
  },
  {
    question: "Co znajdę w pudełku?",
    answer: "Otrzymujesz kompletny zestaw: Smartfon A17 Mini, kabel USB-C do ładowania, przezroczyste etui ochronne dopasowane do telefonu i folię na ekran gotową do naklejenia. Wszystko w cenie."
  },
  {
    question: "Czy nadaje się dla osób starszych?",
    answer: "Tak, ponieważ jest lekki i poręczny. Interfejs Android można uprościć, ustawiając główne ikony (Telefon, WhatsApp) jako duże na ekranie głównym. Głośność jest dobra, a głośnik działa wyraźnie."
  },
  {
    question: "Czy ma gwarancję?",
    answer: "Oczywiście. Oferujemy 24-miesięczną gwarancję na wady zgodności. Ponadto masz do dyspozycji naszą dedykowaną obsługę klienta przez e-mail lub WhatsApp w przypadku jakiejkolwiek początkowej konfiguracji."
  }
];

// --- COMPONENTS ---

// Hero Component
const Hero = ({ onScrollToOrder }: { onScrollToOrder: () => void }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const colors = [
    { name: 'Klasyczna czerń', hex: '#000000', border: 'border-gray-900' },
    { name: 'Żywe srebro', hex: '#C0C0C0', border: 'border-gray-400' },
    { name: 'Głęboki błękit', hex: '#1e3a8a', border: 'border-blue-900' },
    { name: 'Pop pomarańcz', hex: '#f97316', border: 'border-orange-500' },
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
      title: "WhatsApp, TikTok i YouTube",
      desc: "Wszystkie Twoje aplikacje rozrywkowe i komunikacyjne zawsze przy Tobie."
    },
    {
      title: "Gry, bank i narzędzia",
      desc: "Pobierz ze Sklepu Play aplikację bankową, Candy Crush i inne niezbędne aplikacje."
    },
    {
      title: "GPS i Google Maps",
      desc: "Nawiguj samochodem lub pieszo z absolutną precyzją, nigdy się nie zgubisz."
    },
    {
      title: "Dual SIM, WiFi i Bluetooth",
      desc: "Używaj dwóch numerów jednocześnie, łącz się z szybkim WiFi i bezprzewodowymi słuchawkami."
    },
    {
      title: "Aparat i ekran dotykowy HD",
      desc: "Rób zdjęcia, prowadź wideorozmowy i nawiguj dotykiem na ekranie wysokiej rozdzielczości."
    },
    {
      title: "Długa żywotność baterii",
      desc: "Zaprojektowana, by towarzyszyć Ci przez cały dzień bez zostawiania na lodzie."
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
               alt="Smartfon A17 Mini - Widok produktu"
               className="w-full h-full object-cover"
             />
             <div className="absolute top-0 right-0 bg-[#dc2626] text-white font-black px-4 py-2 md:rounded-bl-xl shadow-md z-10 text-xl">
                {DISCOUNT_PERCENTAGE}
             </div>
             <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
                <span className="bg-black/50 text-white px-3 py-1 rounded-full text-sm font-bold backdrop-blur-sm">
                    A17 Mini przód
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
                  <img src={images[idx]} alt={`Miniatura ${idx}`} className="w-full h-full object-cover" />
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
            <span className="text-xs md:text-sm text-gray-500 ml-2 font-bold underline decoration-dotted">Tysiące zadowolonych klientów</span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-gray-900 mb-4 tracking-tight">
            Nareszcie smartfon, który <span className="text-[#dc2626] bg-red-50 px-2 rounded">naprawdę mieści się w kieszeni</span>... a robi wszystko.
          </h1>

          <p className="text-base md:text-lg text-gray-600 mb-8 leading-relaxed">
            <strong>A17 Mini</strong> to telefon podstawowy. Mały jak karta kredytowa, mocny jak prawdziwy smartfon.
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
              <span className="text-sm font-bold text-gray-700 uppercase mb-2 block">Wybierz kolor: <span className="text-[#dc2626]">{selectedColor.name}</span></span>
              <div className="flex space-x-3">
                  {colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color)}
                        className={`w-10 h-10 rounded-full border-2 shadow-sm transition-transform hover:scale-110 ${selectedColor.name === color.name ? 'ring-2 ring-offset-2 ring-[#111827] scale-110' : ''}`}
                        style={{ backgroundColor: color.hex }}
                        aria-label={`Wybierz kolor ${color.name}`}
                      />
                  ))}
              </div>
          </div>

          <div className="flex items-end space-x-3 mb-6 bg-gray-50 p-4 rounded-xl border border-gray-200 w-fit">
            <div className="flex flex-col">
                <span className="text-xs text-gray-500 uppercase font-bold">Cena promocyjna</span>
                <div className="text-4xl md:text-5xl font-black text-[#dc2626] tracking-tighter">{PRICE_PROMO}</div>
            </div>
            <div className="flex flex-col pb-1">
                <span className="text-xs text-gray-400 font-bold">Cena katalogowa</span>
                <div className="text-xl text-gray-400 line-through decoration-2 font-medium">{PRICE_LIST}</div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-2 md:gap-3 mb-6">
              <span className="bg-green-100 text-green-800 text-[10px] md:text-xs font-bold px-3 py-1 rounded-full flex items-center border border-green-200">
                  <Truck size={12} className="mr-1"/> WYSYŁKA 24/48H
              </span>
              <span className="bg-green-100 text-green-800 text-[10px] md:text-xs font-bold px-3 py-1 rounded-full flex items-center border border-green-200">
                  <ShieldCheck size={12} className="mr-1"/> PŁATNOŚĆ PRZY ODBIORZE
              </span>
          </div>

          <button
            onClick={onScrollToOrder}
            className="w-full bg-[#16a34a] hover:bg-green-700 text-white font-black text-xl md:text-2xl py-5 rounded-xl shadow-[0_4px_14px_0_rgba(22,163,74,0.39)] transform active:scale-95 transition-all flex items-center justify-center animate-bounce-slow"
          >
            ZAMÓW I ZAPŁAĆ KURIEROWI
          </button>
          <p className="text-center text-xs text-gray-500 mt-3">Ograniczona dostępność. Karta kredytowa nie jest wymagana.</p>
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
      title: "Wiadomości i social media",
      desc: "WhatsApp, Instagram i TikTok w jednej ręce.",
      icon: <MessageCircle className="w-4 h-4 md:w-5 md:h-5 text-white" />,
      color: "bg-green-500",
      video: "/images/miniphonea17%20img/MESSAGGI%20E%20SOCIAL%20GIF.webm"
    },
    {
      id: 'camera',
      title: "Zdjęcia i wideo",
      desc: "Rób ostre zdjęcia i selfie w mgnieniu oka.",
      icon: <Camera className="w-4 h-4 md:w-5 md:h-5 text-white" />,
      color: "bg-blue-500",
      video: "/images/miniphonea17%20img/Foto%20%26%20VideoM%20GIF.webm"
    },
    {
      id: 'media',
      title: "Wideo i YouTube",
      desc: "Oglądaj filmy wszędzie bez przeszkód.",
      icon: <Play className="w-4 h-4 md:w-5 md:h-5 text-white" />,
      color: "bg-red-500",
      video: "/images/miniphonea17%20img/_Video%20%26%20YouTube%20GIF.webm"
    },
    {
      id: 'games',
      title: "Gry i rozrywka",
      desc: "Idealna rozrywka na przerwę.",
      icon: <Gamepad2 className="w-4 h-4 md:w-5 md:h-5 text-white" />,
      color: "bg-orange-500",
      video: "/images/miniphonea17%20img/Giochi%20%26%20Svago%20GIF.webm"
    }
  ];

  return (
    <div className="py-10 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-extrabold text-center mb-4 leading-tight">
          Co <span className="text-[#dc2626] underline decoration-wavy">naprawdę</span> możesz z nim robić?
        </h2>
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto text-sm md:text-base">
            Wielu myśli, że to zabawka. Błąd. Oto dowód, że to pełnoprawny smartfon.
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
                    CHCĘ GO WYPRÓBOWAĆ JUŻ TERAZ
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
          Prawda: dzisiejsze telefony stały się <span className="text-[#dc2626] underline decoration-wavy">ZBYT DUŻE</span>.
        </h2>

        <p className="text-center text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            Czujesz frustrację za każdym razem, gdy musisz wcisnąć smartfona do kieszeni? Są ciężkie, wyślizgują się i kosztują za dużo.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border-t-4 border-[#dc2626] flex flex-col items-center text-center">
             <div className="bg-red-100 p-3 rounded-full mb-4 text-[#dc2626]">
                <X size={32} strokeWidth={3} />
             </div>
            <h3 className="font-bold text-xl mb-2 text-gray-900">
                Kieszenie pękają
            </h3>
            <p className="text-gray-600 text-sm">
                Nie mieszczą się w dżinsach, niszczą marynarkę i zajmują całą torebkę. Ciągły stres.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border-t-4 border-[#dc2626] flex flex-col items-center text-center">
             <div className="bg-red-100 p-3 rounded-full mb-4 text-[#dc2626]">
                <X size={32} strokeWidth={3} />
             </div>
            <h3 className="font-bold text-xl mb-2 text-gray-900">
                Strach przed stłuczeniem
            </h3>
            <p className="text-gray-600 text-sm">
                Chwila nieuwagi i... trzask. Setki złotych szkody za jedno wielkie szkło.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border-t-4 border-[#dc2626] flex flex-col items-center text-center">
             <div className="bg-red-100 p-3 rounded-full mb-4 text-[#dc2626]">
                <X size={32} strokeWidth={3} />
             </div>
            <h3 className="font-bold text-xl mb-2 text-gray-900">
                Niemożliwe jedną ręką
            </h3>
            <p className="text-gray-600 text-sm">
                Zawsze musisz używać dwóch rąk do pisania lub przeglądania. Bardzo niewygodne, gdy jesteś w ruchu.
            </p>
          </div>
        </div>

        <div className="mt-10 text-center">
            <p className="text-xl font-bold italic text-gray-800">"Jest alternatywa. Odkryj na nowo wygodę."</p>
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
                Oto <span className="text-[#16a34a]">A17 Mini</span>.
            </h2>
            <p className="text-xl md:text-2xl font-light mb-10 text-gray-200">
                To nie tylko telefon. To Twoja kieszonkowa wolność.
            </p>

            {/* Benefits Micro-List */}
            <div className="flex flex-col md:flex-row justify-center gap-4 mb-10">
                <div className="bg-white/10 px-4 py-2 rounded-full border border-white/20 flex items-center justify-center">
                    <Check size={18} className="text-[#16a34a] mr-2" /> <span className="font-bold">Obsługa jedną ręką</span>
                </div>
                 <div className="bg-white/10 px-4 py-2 rounded-full border border-white/20 flex items-center justify-center">
                    <Check size={18} className="text-[#16a34a] mr-2" /> <span className="font-bold">Zero ciężaru</span>
                </div>
                 <div className="bg-white/10 px-4 py-2 rounded-full border border-white/20 flex items-center justify-center">
                    <Check size={18} className="text-[#16a34a] mr-2" /> <span className="font-bold">Zero stresu</span>
                </div>
            </div>

            {/* Steps */}
            <div className="grid md:grid-cols-3 gap-8 text-left">
                <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-white/10">
                    <div className="text-4xl font-black text-[#16a34a] mb-2">01</div>
                    <h4 className="font-bold text-lg mb-2">Włóż kartę SIM</h4>
                    <p className="text-sm text-gray-300">Działa ze wszystkimi polskimi kartami SIM. Możesz włożyć nawet dwie jednocześnie.</p>
                </div>
                <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-white/10">
                    <div className="text-4xl font-black text-[#16a34a] mb-2">02</div>
                    <h4 className="font-bold text-lg mb-2">Włącz i działaj</h4>
                    <p className="text-sm text-gray-300">Android 8.1 jest już zainstalowany i skonfigurowany po polsku. Gotowy do użycia w 30 sekund.</p>
                </div>
                <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-white/10">
                    <div className="text-4xl font-black text-[#16a34a] mb-2">03</div>
                    <h4 className="font-bold text-lg mb-2">Pobierz aplikacje</h4>
                    <p className="text-sm text-gray-300">Otwórz Sklep Play i pobierz WhatsApp, YouTube lub cokolwiek potrzebujesz. Gotowe!</p>
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
            Kompletna technologia
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
                Nie daj się zwieść rozmiarom. W środku jest wszystko, czego oczekujesz od nowoczesnego smartfona.
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
            <h4 className="font-bold text-gray-700 text-sm uppercase mb-2">Szczegółowa specyfikacja techniczna</h4>
            <p className="text-xs text-gray-500 leading-relaxed font-mono mb-4">
                CPU: MediaTek MTK6580 Quad Core (6 rdzeni dekl.) | RAM: 16GB (dekl.) | ROM: 64GB | OS: Android 8.1 |
                Wyświetlacz: 3.0" | Bateria: 9000mAh (nominalna) | Aparat: 5MP+12MP |
                Sieć: 3G WCDMA / WiFi / GPS / BT 4.0 | Wymiary: 88.4x45.2x11mm | Waga: 55g.
            </p>

            {onScrollToOrder && (
                <button
                  onClick={onScrollToOrder}
                  className="bg-[#16a34a] text-white font-bold py-2 px-6 rounded-full shadow hover:bg-green-700 transition-transform active:scale-95 inline-flex items-center text-sm"
                >
                    <ShoppingCart size={16} className="mr-2" />
                    CHCĘ ZAMÓWIĆ TERAZ
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
        <h2 className="text-3xl font-black text-center mb-10 text-gray-900">Dla kogo A17 Mini jest idealny?</h2>

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
                    <Check size={16} className="mr-2" /> Polecany wybór
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
                    Idealny dla rodziców i dzieci
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
                    Pierwszy smartfon <br/>
                    <span className="text-[#16a34a]">bezpieczny i nie do zdarcia?</span>
                </h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    Chcesz, żeby Twoje dziecko było osiągalne, ale boisz się dać mu telefon za 2000 zł?
                    A17 Mini to rozwiązanie, które zadowoli wszystkich: <strong>dziecko ma swoje aplikacje, Ty masz spokój.</strong>
                </p>

                <div className="space-y-6">
                    <div className="flex items-start">
                        <div className="bg-white p-3 rounded-full shadow-sm mr-4 border border-blue-100 text-blue-600">
                            <MapPin size={24} strokeWidth={2.5} />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 text-lg">GPS i lokalizacja</h4>
                            <p className="text-sm text-gray-600">Dzięki Google Maps i wbudowanemu GPS możesz zawsze wiedzieć, gdzie jest w razie potrzeby.</p>
                        </div>
                    </div>

                    <div className="flex items-start">
                        <div className="bg-white p-3 rounded-full shadow-sm mr-4 border border-green-100 text-green-600">
                            <MessageCircle size={24} strokeWidth={2.5} />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 text-lg">WhatsApp i połączenia</h4>
                            <p className="text-sm text-gray-600">Bądź zawsze w kontakcie. Może wysyłać Ci wiadomości głosowe, zdjęcia i dzwonić, gdy wychodzi ze szkoły.</p>
                        </div>
                    </div>

                    <div className="flex items-start">
                        <div className="bg-white p-3 rounded-full shadow-sm mr-4 border border-purple-100 text-purple-600">
                            <Gamepad2 size={24} strokeWidth={2.5} />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 text-lg">"Kontrolowana" rozrywka</h4>
                            <p className="text-sm text-gray-600">Obsługuje YouTube i lekkie gry na chwile relaksu, ale kompaktowy ekran zapobiega godzinnemu "zahipnotyzowaniu".</p>
                        </div>
                    </div>

                    <div className="flex items-start">
                        <div className="bg-white p-3 rounded-full shadow-sm mr-4 border border-red-100 text-red-600">
                            <ShieldCheck size={24} strokeWidth={2.5} />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 text-lg">Zero ryzyka (nawet jak upadnie)</h4>
                            <p className="text-sm text-gray-600">Jest mały, kompaktowy i wytrzymały. A jeśli zdarzyłoby się coś niemożliwego... nie tracisz pensji.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Visual/Testimonial */}
            <div className="lg:w-1/2 relative">
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 relative z-10">
                    <Quote className="text-blue-100 absolute top-4 right-4" size={60} />
                    <div className="flex items-center mb-6">
                        <img src="https://placehold.co/100x100/2563eb/white?text=L" alt="Łukasz" className="w-16 h-16 rounded-full border-2 border-blue-500 mr-4"/>
                        <div>
                            <div className="font-bold text-lg text-gray-900">Łukasz W.</div>
                            <div className="text-sm text-gray-500">Tata 11-letniego chłopca</div>
                        </div>
                    </div>
                    <p className="text-gray-700 italic text-lg leading-relaxed mb-4">
                        "Kupiłem dla syna na wycieczkę szkolną. Nie chciałem dawać mu mojego starego iPhone'a, który na pewno by zgubił. <span className="bg-yellow-100 font-bold px-1">Ten jest idealny:</span> ma GPS, więc widzę gdzie jest, rozmawiamy na WhatsApp, ale jest wystarczająco mały, żeby zmieścił się w nerko bez przeszkadzania. Jest zachwycony, bo wszyscy koledzy chcieli go zobaczyć!"
                    </p>
                    <div className="flex items-center text-sm font-bold text-green-600">
                        <ShieldCheck size={16} className="mr-1" /> Zweryfikowany zakup
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
            A17 Mini <span className="text-gray-400 font-light lowercase">vs</span> Wielkie telefony
        </h2>

        <div className="overflow-hidden border-2 border-gray-100 rounded-2xl shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[350px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="p-3 md:p-4 text-xs md:text-sm font-bold text-gray-400 uppercase tracking-wider w-1/3">Cecha</th>
                  <th className="p-3 md:p-4 font-black text-[#111827] text-center w-1/3 text-lg md:text-xl bg-green-50/50 border-x border-green-100 text-[#16a34a]">A17 Mini</th>
                  <th className="p-3 md:p-4 font-bold text-gray-400 text-center w-1/3 text-xs md:text-sm">Tradycyjne <br/>smartfony</th>
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
            *Porównanie oparte na średnich wymiarach i cenach rynkowych smartfonów 6,5 cala lub większych.
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
          Będziemy w 100% szczerzy. <br/>
          <span className="text-gray-500 text-xl font-normal">A17 Mini nie jest dla każdego.</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Who is NOT for */}
          <div className="bg-red-50 rounded-3xl p-8 border-2 border-red-100">
            <h3 className="text-2xl font-black text-red-600 mb-6 flex items-center">
              <XCircle className="mr-3" size={32} />
              NIE jest dla Ciebie, jeśli...
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-red-500 font-bold mr-2 text-xl">×</span>
                <span className="text-gray-700 font-medium">Chcesz wielkiego ekranu do oglądania 3-godzinnych filmów lub seriali w 4K.</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 font-bold mr-2 text-xl">×</span>
                <span className="text-gray-700 font-medium">Szukasz telefonu do "ciężkich gier" (Fortnite, Call of Duty, itp.).</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 font-bold mr-2 text-xl">×</span>
                <span className="text-gray-700 font-medium">Jesteś profesjonalnym fotografem szukającym zoomu 100x.</span>
              </li>
            </ul>
          </div>

          {/* Who IS for */}
          <div className="bg-green-50 rounded-3xl p-8 border-2 border-green-100 shadow-xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-20 h-20 bg-green-200 rounded-bl-full opacity-50"></div>
            <h3 className="text-2xl font-black text-green-700 mb-6 flex items-center relative z-10">
              <CheckCircle className="mr-3" size={32} />
              Jest IDEALNY dla Ciebie, jeśli...
            </h3>
            <ul className="space-y-4 relative z-10">
              <li className="flex items-start">
                <span className="text-green-600 font-bold mr-2 text-xl">✓</span>
                <span className="text-gray-800 font-bold">Chcesz WhatsApp, wideo, mapy i social media w telefonie, który mieści się w dłoni.</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 font-bold mr-2 text-xl">✓</span>
                <span className="text-gray-800 font-bold">Chcesz wygody Dual SIM, żeby oddzielić pracę od życia prywatnego.</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 font-bold mr-2 text-xl">✓</span>
                <span className="text-gray-800 font-bold">Chcesz niezawodny telefon dla dzieci lub rodziców bez wydawania 2000 zł.</span>
              </li>
               <li className="flex items-start">
                <span className="text-green-600 font-bold mr-2 text-xl">✓</span>
                <span className="text-gray-800 font-bold">Masz dość telefonów ważących jak cegły.</span>
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
                Oferta limitowana
            </span>
            <h3 className="text-3xl md:text-4xl font-extrabold mb-2">Nie kupujesz tylko telefonu.</h3>
            <p className="text-gray-400 text-lg">Otrzymujesz <span className="text-white font-bold underline">KOMPLETNY ZESTAW</span> gotowy do użycia.</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-sm shadow-2xl">
            <div className="space-y-4">
                {/* Main Item */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="flex items-center">
                        <img src="https://placehold.co/100x100/111827/FFF?text=A17" alt="Telefon" className="w-16 h-16 rounded bg-gray-800 object-cover mr-4 border border-gray-700"/>
                        <div>
                            <div className="font-bold text-lg">Smartfon A17 Mini</div>
                            <div className="text-xs text-gray-400">Android 8.1 - 64GB</div>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="font-bold text-xl">699 zł</div>
                    </div>
                </div>

                {/* Freebies */}
                <div className="space-y-3 pl-4 md:pl-20 relative">
                     <div className="absolute left-8 md:left-12 top-0 bottom-0 w-0.5 bg-gray-700 -z-10"></div>

                     <div className="flex items-center justify-between bg-gray-800/50 p-3 rounded-lg border border-gray-700/50">
                        <div className="flex items-center">
                            <Plus className="text-yellow-500 mr-3 shrink-0" size={16} />
                            <span className="text-sm md:text-base">Przezroczyste etui ochronne</span>
                        </div>
                        <div className="flex flex-col text-right">
                             <span className="text-xs text-gray-500 line-through">49 zł</span>
                             <span className="text-yellow-400 font-bold text-sm">GRATIS</span>
                        </div>
                     </div>

                     <div className="flex items-center justify-between bg-gray-800/50 p-3 rounded-lg border border-gray-700/50">
                        <div className="flex items-center">
                            <Plus className="text-yellow-500 mr-3 shrink-0" size={16} />
                            <span className="text-sm md:text-base">Folia ochronna na ekran</span>
                        </div>
                        <div className="flex flex-col text-right">
                             <span className="text-xs text-gray-500 line-through">39 zł</span>
                             <span className="text-yellow-400 font-bold text-sm">GRATIS</span>
                        </div>
                     </div>

                     <div className="flex items-center justify-between bg-gray-800/50 p-3 rounded-lg border border-gray-700/50">
                        <div className="flex items-center">
                            <Plus className="text-yellow-500 mr-3 shrink-0" size={16} />
                            <span className="text-sm md:text-base">Kabel USB-C do ładowania</span>
                        </div>
                        <div className="flex flex-col text-right">
                             <span className="text-xs text-gray-500 line-through">29 zł</span>
                             <span className="text-yellow-400 font-bold text-sm">GRATIS</span>
                        </div>
                     </div>

                     <div className="flex items-center justify-between bg-green-900/30 p-3 rounded-lg border border-green-700/50">
                        <div className="flex items-center">
                            <ShieldCheck className="text-green-400 mr-3 shrink-0" size={16} />
                            <span className="text-sm md:text-base font-bold text-green-300">Gwarancja 2 lata</span>
                        </div>
                        <div className="flex flex-col text-right">
                             <span className="text-green-400 font-bold text-sm">GRATIS</span>
                        </div>
                     </div>
                </div>

                {/* Total */}
                <div className="mt-8 pt-6 border-t border-white/20 text-center">
                    <p className="text-sm text-gray-400 mb-1">Całkowita wartość rynkowa: <span className="line-through">816 zł</span></p>
                    <div className="text-5xl font-black text-white mb-2 tracking-tight">{PRICE_PROMO}</div>
                    <p className="text-green-400 font-bold text-sm uppercase tracking-wider animate-pulse">Priorytetowa wysyłka dziś w cenie</p>
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
        <h2 className="text-3xl md:text-4xl font-black text-center mb-4 text-gray-900">Co mówią nasi klienci?</h2>
        <div className="flex justify-center items-center mb-10 space-x-2">
            <div className="flex text-yellow-400"><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /></div>
            <span className="font-bold text-gray-600">4.8/5 na podstawie ponad 12 000 zamówień</span>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-12 opacity-80">
            {[
              "/images/miniphonea17%20img/RECENSIONI/ezz1aefevt6f1.jpeg",
              "/images/miniphonea17%20img/RECENSIONI/images.jpeg",
              "/images/miniphonea17%20img/RECENSIONI/oardefault.jpg",
              "/images/miniphonea17%20img/RECENSIONI/s-l1600.webp"
            ].map((src, n) => (
                <img key={n} src={src} alt="Zadowolony klient" className="rounded-lg shadow-sm hover:opacity-100 transition-opacity aspect-square object-cover" />
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
                        <BadgeCheck size={12} className="mr-1" /> ZWERYFIKOWANY
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
                    NIE CZEKAJ, ZAMÓW TERAZ
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
        <h2 className="text-3xl font-bold text-center mb-8">Często zadawane pytania</h2>

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
                <p className="font-bold text-blue-900">Masz inne pytania?</p>
                <p className="text-sm text-blue-800">Zamów bez zobowiązań: zadzwonimy do Ciebie, żeby potwierdzić zamówienie i możesz zadać nam wszystkie pytania przez telefon!</p>
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
      color: 'Klasyczna czerń',
      notes: ''
  });

  const colors = [
    { name: 'Klasyczna czerń', hex: '#000000' },
    { name: 'Żywe srebro', hex: '#C0C0C0' },
    { name: 'Głęboki błękit', hex: '#1e3a8a' },
    { name: 'Pop pomarańcz', hex: '#f97316' },
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
        currency: 'PLN',
        value: 349
      });

      // Redirect to thank you page
      window.location.href = '/fb-ty/ty-fb-pl';
    } catch (error) {
      console.error('[Form] Submit error:', error);
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
                  <h2 className="text-3xl font-black text-gray-900 mb-4">Dziękujemy {formData.firstName}!</h2>
                  <div className="bg-green-100 p-4 rounded-xl mb-6">
                      <p className="text-xl font-bold text-green-800">Twoje zamówienie zostało potwierdzone.</p>
                      <p className="text-sm text-green-700 mt-2">Wybrany kolor: <strong>{formData.color}</strong></p>
                  </div>
                  <p className="text-gray-600 mb-8 leading-relaxed">
                      Nasz konsultant skontaktuje się z Tobą pod numer <strong>{formData.phone}</strong> w ciągu 24 godzin, aby potwierdzić adres dostawy.
                  </p>
                  <div className="border-t border-gray-200 pt-6">
                      <p className="text-sm text-gray-500 uppercase tracking-wide font-bold mb-2">Kwota do przygotowania przy odbiorze:</p>
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
                <span>Oferta wygasa za: <span className="font-mono text-2xl ml-1">{formatTime(timeLeft)}</span></span>
             </div>
        </div>

        <div className="bg-white rounded-b-3xl rounded-t-none shadow-2xl overflow-hidden border border-gray-200">
            {/* Header */}
            <div className="bg-gray-900 text-white p-8 text-center">
                <h3 className="text-2xl font-black uppercase mb-1">Formularz zamówienia</h3>
                <p className="text-gray-400 text-sm">Wypełnij, aby otrzymać A17 Mini do domu.</p>
            </div>

            <div className="p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                    <input type="hidden" name="tmfp" ref={tmfpRef} />

                    {/* Visual Recap */}
                    <div className="flex items-center bg-gray-50 p-4 rounded-xl border border-gray-200 mb-6">
                        <img src="https://placehold.co/100x100/111827/FFF?text=A17" alt="Produkt" className="w-16 h-16 rounded object-cover mr-4"/>
                        <div className="flex-grow">
                            <div className="font-bold text-gray-900">A17 Mini + Zestaw akcesoriów</div>
                            <div className="text-[#dc2626] font-black text-xl">{PRICE_PROMO}</div>
                        </div>
                    </div>

                    {/* Color Selection inside Form */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Wybierz kolor *</label>
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
                        <label className="block text-sm font-bold text-gray-700 mb-1 ml-1">Imię i nazwisko *</label>
                        <input
                            required
                            type="text"
                            name="firstName"
                            placeholder="Np. Jan Kowalski"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full p-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-[#16a34a] focus:ring-0 outline-none text-lg transition-colors placeholder-gray-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1 ml-1">Numer telefonu *</label>
                        <input
                            required
                            type="tel"
                            name="phone"
                            placeholder="Np. 600 123 456"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full p-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-[#16a34a] focus:ring-0 outline-none text-lg transition-colors placeholder-gray-400"
                        />
                        <p className="text-xs text-gray-500 mt-1 ml-1">Zadzwonimy tylko w celu potwierdzenia wysyłki.</p>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1 ml-1">Adres i numer domu *</label>
                        <textarea
                            required
                            name="address"
                            placeholder="Np. ul. Marszałkowska 10, Warszawa (Domofon 3)"
                            value={formData.address}
                            onChange={handleChange}
                            rows={3}
                            className="w-full p-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-[#16a34a] focus:ring-0 outline-none text-lg transition-colors placeholder-gray-400 resize-none"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#16a34a] hover:bg-green-600 disabled:bg-gray-400 text-white font-black text-2xl py-6 rounded-xl shadow-xl mt-4 transform hover:-translate-y-1 active:translate-y-0 transition-all flex items-center justify-center group"
                    >
                        <span>{isSubmitting ? 'WYSYŁANIE...' : 'ZAMÓW TERAZ'}</span>
                        <Truck className="ml-3 group-hover:translate-x-1 transition-transform" size={28} />
                    </button>
                    <div className="text-center font-bold text-[#16a34a] text-sm uppercase tracking-wide">Płatność przy odbiorze</div>

                    <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-100">
                        <div className="flex items-center justify-center text-xs text-gray-500 bg-gray-50 py-2 rounded">
                            <Lock size={12} className="mr-1" /> Bez danych karty
                        </div>
                        <div className="flex items-center justify-center text-xs text-gray-500 bg-gray-50 py-2 rounded">
                            <ShieldCheck size={12} className="mr-1" /> Gwarancja 2 lata
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
            <span className="text-xs text-red-600 font-bold uppercase tracking-wider">Błyskawiczna oferta</span>
            <span className="text-xl font-black text-gray-900 leading-none">{PRICE_PROMO}</span>
        </div>
        <button
          onClick={onScrollToOrder}
          className="flex-grow bg-[#16a34a] active:bg-green-700 text-white font-bold text-lg py-3 rounded-xl shadow-lg flex items-center justify-center active:scale-95 transition-transform cursor-pointer touch-manipulation"
        >
           <ShoppingCart size={20} className="mr-2" />
           ZAMÓW TERAZ
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
        OSTATNIE 12 SZTUK W PROMOCYJNEJ CENIE
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
