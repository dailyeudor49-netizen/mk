import { Review, BundleItem } from './types';

export const PRODUCT_NAME = "Robot Clean Pro X";
export const PRICE_LIST = "159,99";
export const PRICE_PROMO = "79,99";
export const CURRENCY = "€";
export const DISCOUNT_PERCENT = 50;

// Network tracking
export const NETWORK_UID = "019855d0-397a-72ee-8df5-c5026966105a";
export const NETWORK_KEY = "8ea99f0506e1df27f625d0";
export const NETWORK_OFFER = "596";
export const NETWORK_LP = "596";
export const THANK_YOU_PAGE = "/fb-ty/ty-fb-sk";

export const REVIEWS: Review[] = [
  {
    id: 1,
    name: "Mária Kováčová",
    city: "Bratislava",
    rating: 5,
    text: "Neverila som, ale naozaj dobre čistí! Mám dve mačky a pozbiera všetky chlpy. Konečne nemusím každý deň zametať.",
    verified: true,
    date: "pred 2 dňami",
    hasImage: true,
    imageUrl: "/images/robotcleanprox imggif/recensioni/716UOMnH5CL.jpg"
  },
  {
    id: 2,
    name: "Peter Horváth",
    city: "Košice",
    rating: 5,
    text: "Doručenie za 24 hodín. Zaplatil som kuriérovi hotovosťou, veľmi pohodlné. Robot je jednoduchý na obsluhu, stačí stlačiť tlačidlo.",
    verified: true,
    date: "pred týždňom",
    hasImage: false
  },
  {
    id: 3,
    name: "Jana Nagyová",
    city: "Prešov",
    rating: 4,
    text: "Skvelý pomer ceny a kvality. Umýva tiež celkom dobre na rýchly prechod. Odporúčam pre ľudí s málo časom.",
    verified: true,
    date: "pred 3 dňami",
    hasImage: true,
    imageUrl: "/images/robotcleanprox imggif/recensioni/61H4YDTqFUL.jpg"
  },
  {
    id: 4,
    name: "Tomáš Szabó",
    city: "Žilina",
    rating: 5,
    text: "Moja manželka je veľmi spokojná. Menej bolesti chrbta pre ňu. Príjemná obsluha, zavolali na potvrdenie adresy.",
    verified: true,
    date: "Včera",
    hasImage: true,
    imageUrl: "/images/robotcleanprox imggif/recensioni/617ra1G4FvL.jpg"
  },
  {
    id: 5,
    name: "Katarína Molnárová",
    city: "Banská Bystrica",
    rating: 5,
    text: "Bola som skeptická, ale zmenila som názor. Vysáva jemný prach, ktorý som ani nevidela. Batéria vydrží dlho.",
    verified: true,
    date: "pred 5 dňami",
    hasImage: false
  },
  {
    id: 6,
    name: "Róbert V.",
    city: "Nitra",
    rating: 5,
    text: "Platba na dobierku je záruka. Pevný výrobok, vylezie aj na nízke koberce.",
    verified: true,
    date: "pred 2 týždňami",
    hasImage: false
  },
  {
    id: 7,
    name: "Eva G.",
    city: "Trnava",
    rating: 5,
    text: "Najlepší nákup roka. Tichý a presný.",
    verified: true,
    date: "pred 1 dňom",
    hasImage: false
  },
  {
    id: 8,
    name: "Marek D.",
    city: "Trenčín",
    rating: 5,
    text: "Základňa, ktorá sa sama vyprázdňuje, je neuveriteľné pohodlie. Nedotknete sa ničoho týždne.",
    verified: true,
    date: "pred 3 dňami",
    hasImage: false
  },
  {
    id: 9,
    name: "Silvia L.",
    city: "Martin",
    rating: 4,
    text: "Čistí dobre aj v rohoch. Odporúčam pre ľudí so zvieratami doma.",
    verified: true,
    date: "Včera",
    hasImage: false
  }
];

export const BUNDLE_ITEMS: BundleItem[] = [
  { name: "Napájací kábel", quantity: 1, iconName: "plug" },
  { name: "Vrecko na prach", quantity: 2, iconName: "trash" },
  { name: "Bočné kefy", quantity: 2, iconName: "wind" },
  { name: "Držiak mopu", quantity: 2, iconName: "disc" },
  { name: "Prateľná utierka", quantity: 4, iconName: "droplet" },
  { name: "HEPA filter", quantity: 2, iconName: "filter" },
  { name: "Čistiaci nástroj", quantity: 1, iconName: "brush" },
  { name: "Čistiaci prostriedok", quantity: 1, iconName: "flask" },
  { name: "Návod na obsluhu", quantity: 1, iconName: "book" },
];

export const FAQ_ITEMS = [
  {
    question: "Ako platím?",
    answer: "Platíte priamo kuriérovi hotovosťou pri prevzatí balíka. Nepotrebujete kreditnú kartu."
  },
  {
    question: "Koľko stojí doprava?",
    answer: "Doprava je ZADARMO pre objednávky zadané dnes."
  },
  {
    question: "Čo sa stane, ak sa pokazí?",
    answer: "Máte 2 roky záruky v cene. Ak nefunguje, vymeníme ho."
  },
  {
    question: "Vysáva aj srsť zvierat?",
    answer: "Áno, je špeciálne navrhnutý na vysávanie srsti psov a mačiek bez upchávania."
  }
];
