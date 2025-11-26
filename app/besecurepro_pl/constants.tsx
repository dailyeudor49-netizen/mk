
import React from 'react';
import { Lock, Camera, Radar, Phone, Smartphone, Wifi, Users, Circle, CheckCircle, Battery, X, AlertTriangle, Eye, ShieldAlert, Radio, HelpCircle, Package, ShieldCheck, Cloud, Signal, Database, Mic, Zap, Cpu, Moon, HardDrive, ScanFace, Key, Square, Cable } from 'lucide-react';
import { Testimonial, Feature, Step, PromoItem } from './types';

// Interfejs dla tabeli porównawczej
export interface ComparisonRow {
  feature: string;
  us: boolean | string;
  them: boolean | string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ProductSpec {
    title: string;
    value: string;
    icon: React.ReactNode;
}

// Obrazy produktu
export const productImages = {
    kit: "/images/besecurepro img/IMG PRINCIPALE.png",
    camera: "/images/besecurepro img/Piccole. Potenti. Invisibili..png",
    phoneScreen: "/images/besecurepro img/RILEVATA INTRUSIONE.png",
    doorSensor: "https://images.unsplash.com/photo-1585664811087-47f65be1b1f6?auto=format&fit=crop&w=600&q=80",
    unboxing: "/images/besecurepro img/IMG PRINCIPALE.png",
    installation: "/images/besecurepro img/posiziona sena trapano.png",
    garage: "/images/besecurepro img/cam 4 garage.png",
    attivaClick: "/images/besecurepro img/attiva con un click.png",
    accendiCollegato: "/images/besecurepro img/accendi gia tutto collegato.png"
};

export const testimonials: Testimonial[] = [
  {
    name: 'Marek R.',
    source: 'Zweryfikowany Zakup',
    rating: 5,
    text: 'Wyjechałem na narty i sprawdzałem dom każdego wieczoru z restauracji. Jakość 4K jest niesamowita, widziałem nawet kota poruszającego się w ciemności. Nigdy nie byłem tak spokojny.',
    gender: 'M'
  },
  {
    name: 'Julia T.',
    source: 'Recenzja Facebook',
    rating: 5,
    text: 'Byłam sceptyczna ze względu na niską cenę, ale to naprawdę solidny produkt. Aplikacja jest intuicyjna i bardzo szybka. Przypadkowo włączyłam syrenę i jest bardzo głośna!',
    gender: 'F'
  },
  {
    name: 'Aleksander P.',
    source: 'Google Reviews',
    rating: 5,
    text: 'Miałem wycenę na 2500 zł rocznie od znanych marek. Za to zapłaciłem 429 zł jednorazowo. Robi to samo, a nawet lepiej, bo sam widzę wszystko na żywo.',
    gender: 'M'
  },
  {
    name: 'Franciszka M.',
    source: 'Trustpilot',
    rating: 4,
    text: 'Zainstalowałam przed świętami. Paczka dotarła w 24h. Funkcja, która dzwoni na telefon gdy włączy się alarm, jest genialna - dużo lepsza niż zwykły SMS.',
    gender: 'F'
  },
  {
    name: 'Robert C.',
    source: 'Feedaty',
    rating: 5,
    text: 'Niesamowita wizja nocna. Zamontowałem jedną kamerę w ogrodzie i jedną przy wejściu. Widać jak w dzień dzięki podczerwieni.',
    gender: 'M'
  }
];

export const features: Feature[] = [
  {
    icon: <ScanFace className="w-6 h-6" />,
    title: 'Inteligentne Auto-Śledzenie',
    desc: 'Nie jest statyczna. Kamera obraca się o 360° i fizycznie śledzi intruza, dopóki nie opuści pola widzenia.',
    image: 'https://images.unsplash.com/photo-1557862921-37829c790f19?auto=format&fit=crop&w=400&q=80'
  },
  {
    icon: <Moon className="w-6 h-6" />,
    title: 'Widzenie w Całkowitej Ciemności',
    desc: 'Technologia StarLight. Podczas gdy złodzieje myślą, że są ukryci w ciemności, Ty widzisz ich w kolorze.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=400&q=80'
  },
  {
    icon: <Phone className="w-6 h-6" />,
    title: 'Natychmiastowy Telefon',
    desc: 'Gdy ktoś wejdzie, system nie wysyła tylko powiadomienia: DZWONI do Ciebie, dopóki nie odbierzesz.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=400&q=80'
  },
  {
    icon: <Square className="w-6 h-6" />,
    title: 'Ochrona Drzwi i Okien',
    desc: 'Czujniki magnetyczne uruchamiają syrenę, gdy drzwi otworzą się o 1cm. Niemożliwe jest ciche wejście.',
    image: 'https://images.unsplash.com/photo-1585664811087-47f65be1b1f6?auto=format&fit=crop&w=400&q=80'
  },
  {
    icon: <HardDrive className="w-6 h-6" />,
    title: 'Nagrywanie 24/7 (W Cenie)',
    desc: 'Nie traci ani sekundy. Ciągłe nagrywanie 24/7 na kartę SD 128GB zawartą w cenie.',
    image: 'https://images.unsplash.com/photo-1619553765108-a59074b62438?auto=format&fit=crop&w=400&q=80'
  },
  {
    icon: <Lock className="w-6 h-6" />,
    title: 'Zero Opłat Miesięcznych',
    desc: 'Przestań płacić abonament. Kupujesz zestaw raz i jest Twój na zawsze.',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=400&q=80'
  }
];

export const hardwareSpecs: ProductSpec[] = [
    { title: "Rozdzielczość", value: "4K Ultra HD", icon: <Eye size={18}/> },
    { title: "Autonomia Kamery", value: "5 Miesięcy (USB)", icon: <Battery size={18}/> },
    { title: "Autonomia Czujników", value: "5 Lat (Wymienna)", icon: <Battery size={18}/> },
    { title: "Pamięć", value: "SD 128GB W Zestawie", icon: <Database size={18}/> },
];

export const installSteps: Step[] = [
  {
    step: 1,
    title: 'Zamontuj Bez Wiercenia',
    desc: 'Zapomnij o kurzu i dziurach w ścianie. Użyj dołączonych taśm przemysłowych 3M. Przyklej czujniki na drzwiach i kamery gdzie chcesz.',
    image: '/images/besecurepro img/posiziona sena trapano.png',
    imageAlt: 'Instalacja bez wiercenia'
  },
  {
    step: 2,
    title: 'Włącz: Wszystko Już Połączone',
    desc: '4 kamery i 4 czujniki są już "Pre-Sparowane" z centralą. Nie musisz konfigurować WiFi dla każdego elementu. Włącz i komunikują się automatycznie.',
    image: '/images/besecurepro img/accendi gia tutto collegato.png',
    imageAlt: 'Automatyczne połączenie'
  },
  {
    step: 3,
    title: 'Aktywuj Jednym Kliknięciem',
    desc: 'Naciśnij dołączony pilot lub użyj aplikacji. Od tego momentu, jeśli drzwi się otworzą lub ktoś przejdzie, zaczyna się piekło (Syrena + Telefon).',
    image: '/images/besecurepro img/attiva con un click.png',
    imageAlt: 'Aktywowane zabezpieczenie domu'
  }
];

export const whatHappensSteps: Step[] = [
  {
    step: '1',
    title: 'POWIADOMIENIE WIDEO NA ŻYWO',
    desc: 'Gdy jesteś poza domem, telefon wibruje. Otwierasz powiadomienie i <strong>widzisz w 4K</strong> kto zbliżył się do Twoich drzwi. To nie SMS, to prawdziwe wideo.',
    image: '/images/besecurepro img/NOTIFICA VIDEO LIVE.png',
    imageAlt: 'Wykrycie włamania'
  },
  {
    step: '2',
    title: 'URUCHAMIA SIĘ AUTOMATYCZNIE (LUB TY DECYDUJESZ)',
    desc: 'Syrena 110dB uruchamia się <strong>automatycznie</strong> gdy ktoś wejdzie. Ale jeśli widzisz podejrzaną osobę w ogrodzie, możesz <strong>włączyć ją ręcznie</strong> z aplikacji, aby ją odstraszyć zanim wejdzie.',
    image: '/images/besecurepro img/SCATTA IN AUTOMATICO.png',
    imageAlt: 'Aktywna syrena'
  },
  {
    step: '3',
    title: 'TY MASZ KONTROLĘ',
    desc: 'Żadnych fałszywych alarmów. System dzwoni do CIEBIE. Oglądasz wideo i potwierdzasz. <strong>Tylko gdy dasz OK</strong> (lub nie odbierzesz) wzywane są służby. To Ty jesteś szefem.',
    image: '/images/besecurepro img/TU HAI IL CONTROLLO.png',
    imageAlt: 'Powiadomienie na smartfonie'
  }
];

export const promoItems: PromoItem[] = [
  { icon: <Camera className="w-5 h-5" />, title: '4x Mikrokamery 4K', desc: 'Ładowanie USB (kabel w zestawie) co 5 miesięcy' },
  { icon: <Square className="w-5 h-5" />, title: '4x Czujniki Drzwi/Okien', desc: 'Bateria 5 lat w zestawie. Natychmiastowy alarm.' },
  { icon: <Key className="w-5 h-5" />, title: '1x Pilot Smart', desc: 'Uzbrajaj/Rozbrajaj wszystko jednym kliknięciem' },
  { icon: <AlertTriangle className="w-5 h-5" />, title: '1x Syrena 110dB', desc: 'Bateria 5 lat (łatwa wymiana)' },
  { icon: <Cable className="w-5 h-5" />, title: '4x Kable USB-C', desc: 'Do ładowania kamer' },
  { icon: <Smartphone className="w-5 h-5" />, title: 'Centrala Smart Hub', desc: 'Łączy wszystko przez WiFi lub SIM' },
  { icon: <HardDrive className="w-5 h-5" />, title: 'Karta SD 128GB W ZESTAWIE', desc: 'Ciągłe nagrywanie 24/7 gratis' },
  { icon: <Signal className="w-5 h-5" />, title: 'Karta SIM 4G W Zestawie', desc: 'Zapasowa łączność w zestawie' }
];

export const comparisonData: ComparisonRow[] = [
  { feature: 'Jakość Wideo', us: '4K Ultra HD', them: 'Często 720p/1080p' },
  { feature: 'Nagrywanie', us: '24/7 na SD 128GB (W Zestawie)', them: 'Tylko ruch / Płatna chmura' },
  { feature: 'Opłata Miesięczna', us: '0 zł / na zawsze', them: '150-250 zł / miesiąc' },
  { feature: 'Automatyczne Wezwanie Służb', us: true, them: 'Dodatkowy koszt' },
  { feature: 'Czujniki Drzwi W Zestawie', us: 'Tak (4 Sztuki)', them: 'Często płatne dodatkowo' },
  { feature: 'Cena Kompletnego Zestawu', us: '429 zł (Jednorazowo)', them: '1200-3600 zł' },
];

export const faqs: FAQItem[] = [
  {
    question: "Dlaczego cena jest tak niska w porównaniu z innymi?",
    answer: "BeSecure Pro sprzedaje bezpośrednio z fabryki do konsumenta, eliminując pośredników, sklepy stacjonarne i koszty reklamy telewizyjnej. Ponadto jest to limitowana oferta premierowa, aby wprowadzić markę w Polsce."
  },
  {
    question: "Czy muszę podłączać kable lub konfigurować trudne rzeczy?",
    answer: "Nie. System jest dostarczany 'Pre-Sparowany'. Oznacza to, że 4 kamery i 4 czujniki są już połączone z centralą. Wystarczy je włączyć i działają."
  },
  {
    question: "Jak działają baterie? Czy muszę je często wymieniać?",
    answer: "Absolutnie nie. Czujniki drzwi, pilot i syrena mają specjalne baterie, które wytrzymują 5 lat (i łatwo je znaleźć). Kamery ładuje się kablem USB (w zestawie) jak telefon, około 2 razy w roku."
  },
  {
    question: "Jak działają czujniki drzwi?",
    answer: "Składają się z dwóch magnetycznych części. Jedna idzie na framugę, druga na drzwi (z taśmą klejącą). Gdy alarm jest aktywny, jeśli ktoś otworzy drzwi nawet o 1cm, magnesy się rozłączają i natychmiast uruchamiają syrenę i telefon."
  },
  {
    question: "Gdzie są zapisywane nagrania? Czy płaci się za chmurę?",
    answer: "Absolutnie nie. Dołączamy GRATIS kartę SD 128GB, która nagrywa 24 godziny na dobę. Ponadto masz dożywotni darmowy backup w chmurze dla klipów alarmowych. Twoje nagrania są Twoje, bez ukrytych kosztów."
  },
  {
    question: "Czy działa gdy wyłączą prąd lub WiFi?",
    answer: "Absolutnie tak. Centrala ma wbudowaną baterię awaryjną, która wytrzymuje do 12 godzin i, jeśli włożysz kartę SIM (w zestawie), kontynuuje komunikację przez sieć GSM nawet bez internetu."
  },
];
