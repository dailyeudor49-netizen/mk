import { Review, BundleItem } from './types';

export const PRODUCT_NAME = "Robot Clean Pro X";
export const PRICE_LIST = "699,00";
export const PRICE_PROMO = "349,00";
export const CURRENCY = "zł";
export const DISCOUNT_PERCENT = 50;

// Network tracking
export const NETWORK_UID = "019855d0-397a-72ee-8df5-c5026966105a";
export const NETWORK_KEY = "8ea99f0506e1df27f625d0";
export const NETWORK_OFFER = "595";
export const NETWORK_LP = "595";
export const THANK_YOU_PAGE = "/fb-ty/ty-fb-pl";

export const REVIEWS: Review[] = [
  {
    id: 1,
    name: "Maria Kowalska",
    city: "Warszawa",
    rating: 5,
    text: "Nie wierzyłam, ale naprawdę dobrze sprząta! Mam dwa koty i zbiera wszystkie sierści. W końcu nie muszę codziennie zamiatać.",
    verified: true,
    date: "2 dni temu",
    hasImage: true,
    imageUrl: "/images/robotcleanprox imggif/recensioni/716UOMnH5CL.jpg"
  },
  {
    id: 2,
    name: "Piotr Nowak",
    city: "Kraków",
    rating: 5,
    text: "Dostawa w 24 godziny. Zapłaciłem kurierowi gotówką, bardzo wygodnie. Robot jest prosty w obsłudze, wystarczy nacisnąć przycisk.",
    verified: true,
    date: "tydzień temu",
    hasImage: false
  },
  {
    id: 3,
    name: "Anna Wiśniewska",
    city: "Gdańsk",
    rating: 4,
    text: "Świetny stosunek jakości do ceny. Myje też całkiem dobrze na szybkie przejście. Polecam dla osób z małą ilością czasu.",
    verified: true,
    date: "3 dni temu",
    hasImage: true,
    imageUrl: "/images/robotcleanprox imggif/recensioni/61H4YDTqFUL.jpg"
  },
  {
    id: 4,
    name: "Tomasz Kamiński",
    city: "Poznań",
    rating: 5,
    text: "Moja żona jest bardzo zadowolona. Mniej bólu pleców dla niej. Miła obsługa, zadzwonili żeby potwierdzić adres.",
    verified: true,
    date: "Wczoraj",
    hasImage: true,
    imageUrl: "/images/robotcleanprox imggif/recensioni/617ra1G4FvL.jpg"
  },
  {
    id: 5,
    name: "Katarzyna Lewandowska",
    city: "Wrocław",
    rating: 5,
    text: "Byłam sceptyczna, ale zmieniłam zdanie. Odkurza drobny pył, którego nawet nie widziałam. Bateria trzyma długo.",
    verified: true,
    date: "5 dni temu",
    hasImage: false
  },
  {
    id: 6,
    name: "Robert W.",
    city: "Łódź",
    rating: 5,
    text: "Płatność przy odbiorze to gwarancja. Solidny produkt, wspina się nawet na niskie dywany.",
    verified: true,
    date: "2 tygodnie temu",
    hasImage: false
  },
  {
    id: 7,
    name: "Ewa G.",
    city: "Szczecin",
    rating: 5,
    text: "Najlepszy zakup roku. Cichy i precyzyjny.",
    verified: true,
    date: "1 dzień temu",
    hasImage: false
  },
  {
    id: 8,
    name: "Marek D.",
    city: "Lublin",
    rating: 5,
    text: "Baza, która sama się opróżnia to niesamowita wygoda. Nie dotykasz niczego przez tygodnie.",
    verified: true,
    date: "3 dni temu",
    hasImage: false
  },
  {
    id: 9,
    name: "Sylwia L.",
    city: "Białystok",
    rating: 4,
    text: "Sprząta dobrze nawet w rogach. Polecam dla osób z zwierzętami w domu.",
    verified: true,
    date: "Wczoraj",
    hasImage: false
  }
];

export const BUNDLE_ITEMS: BundleItem[] = [
  { name: "Kabel zasilający", quantity: 1, iconName: "plug" },
  { name: "Worek na kurz", quantity: 2, iconName: "trash" },
  { name: "Szczotki boczne", quantity: 2, iconName: "wind" },
  { name: "Uchwyt mopa", quantity: 2, iconName: "disc" },
  { name: "Ściereczka do prania", quantity: 4, iconName: "droplet" },
  { name: "Filtr HEPA", quantity: 2, iconName: "filter" },
  { name: "Narzędzie do czyszczenia", quantity: 1, iconName: "brush" },
  { name: "Płyn czyszczący", quantity: 1, iconName: "flask" },
  { name: "Instrukcja obsługi", quantity: 1, iconName: "book" },
];

export const FAQ_ITEMS = [
  {
    question: "Jak płacę?",
    answer: "Płacisz bezpośrednio kurierowi gotówką przy odbiorze paczki. Nie potrzebujesz karty kredytowej."
  },
  {
    question: "Ile kosztuje wysyłka?",
    answer: "Wysyłka jest DARMOWA dla zamówień złożonych dzisiaj."
  },
  {
    question: "Co się stanie, jeśli się zepsuje?",
    answer: "Masz 2 lata gwarancji w cenie. Jeśli nie działa, wymienimy go."
  },
  {
    question: "Czy odkurza też sierść zwierząt?",
    answer: "Tak, jest specjalnie zaprojektowany do odkurzania sierści psów i kotów bez zatykania się."
  }
];
