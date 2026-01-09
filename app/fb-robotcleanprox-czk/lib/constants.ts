import { Review, BundleItem } from './types';

export const PRODUCT_NAME = "Robot Clean Pro X";
export const PRICE_LIST = "3 999";
export const PRICE_PROMO = "1 999";
export const CURRENCY = "Kč";
export const DISCOUNT_PERCENT = 50;

// Network tracking
export const NETWORK_UID = "019855d0-397a-72ee-8df5-c5026966105a";
export const NETWORK_KEY = "8ea99f0506e1df27f625d0";
export const NETWORK_OFFER = "597";
export const NETWORK_LP = "597";
export const THANK_YOU_PAGE = "/fb-ty/ty-fb-cz";

export const REVIEWS: Review[] = [
  {
    id: 1,
    name: "Marie Nováková",
    city: "Praha",
    rating: 5,
    text: "Nevěřila jsem, ale opravdu dobře uklízí! Mám dvě kočky a posbírá všechny chlupy. Konečně nemusím každý den zametat.",
    verified: true,
    date: "před 2 dny",
    hasImage: true,
    imageUrl: "/images/robotcleanprox imggif/recensioni/716UOMnH5CL.jpg"
  },
  {
    id: 2,
    name: "Petr Svoboda",
    city: "Brno",
    rating: 5,
    text: "Doručení za 24 hodin. Zaplatil jsem kurýrovi hotově, velmi pohodlné. Robot je jednoduchý na ovládání, stačí zmáčknout tlačítko.",
    verified: true,
    date: "před týdnem",
    hasImage: false
  },
  {
    id: 3,
    name: "Jana Dvořáková",
    city: "Ostrava",
    rating: 4,
    text: "Skvělý poměr ceny a kvality. Myje také celkem dobře na rychlý průchod. Doporučuji pro lidi s málo času.",
    verified: true,
    date: "před 3 dny",
    hasImage: true,
    imageUrl: "/images/robotcleanprox imggif/recensioni/61H4YDTqFUL.jpg"
  },
  {
    id: 4,
    name: "Tomáš Černý",
    city: "Plzeň",
    rating: 5,
    text: "Moje žena je velmi spokojená. Méně bolesti zad pro ni. Příjemná obsluha, zavolali na potvrzení adresy.",
    verified: true,
    date: "Včera",
    hasImage: true,
    imageUrl: "/images/robotcleanprox imggif/recensioni/617ra1G4FvL.jpg"
  },
  {
    id: 5,
    name: "Kateřina Procházková",
    city: "Liberec",
    rating: 5,
    text: "Byla jsem skeptická, ale změnila jsem názor. Vysává jemný prach, který jsem ani neviděla. Baterie vydrží dlouho.",
    verified: true,
    date: "před 5 dny",
    hasImage: false
  },
  {
    id: 6,
    name: "Robert V.",
    city: "Olomouc",
    rating: 5,
    text: "Platba na dobírku je záruka. Pevný výrobek, vyleze i na nízké koberce.",
    verified: true,
    date: "před 2 týdny",
    hasImage: false
  },
  {
    id: 7,
    name: "Eva G.",
    city: "České Budějovice",
    rating: 5,
    text: "Nejlepší nákup roku. Tichý a přesný.",
    verified: true,
    date: "před 1 dnem",
    hasImage: false
  },
  {
    id: 8,
    name: "Marek D.",
    city: "Hradec Králové",
    rating: 5,
    text: "Základna, která se sama vyprazdňuje, je neuvěřitelné pohodlí. Nedotknete se ničeho týdny.",
    verified: true,
    date: "před 3 dny",
    hasImage: false
  },
  {
    id: 9,
    name: "Silvie L.",
    city: "Pardubice",
    rating: 4,
    text: "Uklízí dobře i v rozích. Doporučuji pro lidi se zvířaty doma.",
    verified: true,
    date: "Včera",
    hasImage: false
  }
];

export const BUNDLE_ITEMS: BundleItem[] = [
  { name: "Napájecí kabel", quantity: 1, iconName: "plug" },
  { name: "Sáček na prach", quantity: 2, iconName: "trash" },
  { name: "Boční kartáče", quantity: 2, iconName: "wind" },
  { name: "Držák mopu", quantity: 2, iconName: "disc" },
  { name: "Pratelný hadřík", quantity: 4, iconName: "droplet" },
  { name: "HEPA filtr", quantity: 2, iconName: "filter" },
  { name: "Čisticí nástroj", quantity: 1, iconName: "brush" },
  { name: "Čisticí prostředek", quantity: 1, iconName: "flask" },
  { name: "Návod k obsluze", quantity: 1, iconName: "book" },
];

export const FAQ_ITEMS = [
  {
    question: "Jak platím?",
    answer: "Platíte přímo kurýrovi hotově při převzetí balíku. Nepotřebujete kreditní kartu."
  },
  {
    question: "Kolik stojí doprava?",
    answer: "Doprava je ZDARMA pro objednávky zadané dnes."
  },
  {
    question: "Co se stane, když se pokazí?",
    answer: "Máte 2 roky záruky v ceně. Pokud nefunguje, vyměníme ho."
  },
  {
    question: "Vysává i srst zvířat?",
    answer: "Ano, je speciálně navržen na vysávání srsti psů a koček bez ucpávání."
  }
];
