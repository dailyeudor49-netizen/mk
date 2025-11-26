import React from 'react';
import { Camera, Square, Key, BellRing, Signal, Cloud, Eye, Moon, ScanFace, Mic, Smartphone } from 'lucide-react';

export const productImages = {
  kit: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80",
  camera: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=600&q=80",
  unboxing: "https://images.unsplash.com/photo-1606229365485-93a3b8ee0385?auto=format&fit=crop&w=800&q=80",
};

export const features = [
  {
    icon: <Camera size={24} />,
    title: "4 Microcamere 4K",
    desc: "Ultra-compatte (5cm). Visione notturna IR. Audio bidirezionale."
  },
  {
    icon: <Square size={24} />,
    title: "4 Sensori Porte",
    desc: "Rilevano apertura istantanea. Batteria 5 anni."
  },
  {
    icon: <Key size={24} />,
    title: "Telecomando",
    desc: "Attiva/disattiva tutto con un click. Pulsante SOS incluso."
  },
  {
    icon: <BellRing size={24} />,
    title: "Sirena 120dB",
    desc: "Mette in fuga qualsiasi intruso. Attivazione automatica."
  },
  {
    icon: <Signal size={24} />,
    title: "SIM 4G Inclusa",
    desc: "Funziona anche senza WiFi. Nessun costo mensile."
  },
  {
    icon: <Cloud size={24} />,
    title: "Cloud Backup",
    desc: "I video sono al sicuro anche se rubano le telecamere."
  },
];

export const promoItems = [
  { icon: <Camera size={18} />, title: "4x Microcamere 4K", desc: "Con visione notturna e audio" },
  { icon: <Square size={18} />, title: "4x Sensori Porte/Finestre", desc: "Wireless, batteria 5 anni" },
  { icon: <Key size={18} />, title: "1x Telecomando", desc: "Con pulsante SOS" },
  { icon: <BellRing size={18} />, title: "1x Sirena 120dB", desc: "Attivazione automatica" },
  { icon: <Signal size={18} />, title: "1x Centralina Hub", desc: "Con SIM 4G inclusa" },
  { icon: <Smartphone size={18} />, title: "App Gratuita", desc: "iOS e Android" },
];

export const whatHappensSteps = [
  {
    step: "1",
    title: "Tentativo di Intrusione",
    desc: "Il ladro si avvicina alla porta. <strong>Il sensore rileva il movimento</strong> e inizia la registrazione.",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=600&q=80",
    imageAlt: "Casa di notte"
  },
  {
    step: "2",
    title: "Allarme Istantaneo",
    desc: "La sirena parte a <strong>120 decibel</strong>. Ricevi notifica + video in diretta sul telefono.",
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=600&q=80",
    imageAlt: "Telecamera di sicurezza"
  },
  {
    step: "3",
    title: "Intervento Rapido",
    desc: "Con un tap <strong>chiami il 112</strong> o attivi l'interfono per parlare col ladro. Lui scappa.",
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=600&q=80",
    imageAlt: "Smartphone con notifica"
  },
];

export const comparisonData = [
  { feature: "Prezzo", us: "69,90€", them: "200-500€" },
  { feature: "Abbonamento Mensile", us: "GRATIS", them: "15-30€/mese" },
  { feature: "Telecamere 4K", us: true, them: false },
  { feature: "SIM 4G Inclusa", us: true, them: false },
  { feature: "Installazione", us: "Fai da te (5 min)", them: "Tecnico (100€+)" },
  { feature: "Chiamata Automatica 112", us: true, them: false },
];

export const faqs = [
  {
    question: "Come funziona il pagamento alla consegna?",
    answer: "Semplicissimo: ordini oggi, ricevi il pacco in 24-48h e paghi in contanti al corriere. Nessun anticipo richiesto."
  },
  {
    question: "Devo pagare un abbonamento mensile?",
    answer: "Assolutamente NO. Paghi solo il kit (69,90€) e basta. L'app, il cloud e la SIM sono inclusi per sempre."
  },
  {
    question: "È difficile da installare?",
    answer: "No! Le telecamere e i sensori arrivano già configurati. Li accendi e funzionano. Niente cavi, niente tecnici. 5 minuti e sei protetto."
  },
  {
    question: "Funziona se va via la corrente o internet?",
    answer: "Sì. La centralina ha una batteria tampone (12h) e una SIM 4G inclusa. Anche senza luce e WiFi, il sistema continua a funzionare e inviarti notifiche."
  },
  {
    question: "Posso vedere le telecamere dal telefono?",
    answer: "Certo! L'app gratuita (iOS/Android) ti permette di vedere in diretta tutte le telecamere, ricevere notifiche, attivare la sirena e parlare tramite l'interfono."
  },
  {
    question: "Cosa succede se rubano una telecamera?",
    answer: "I video vengono salvati automaticamente nel cloud. Anche se il ladro porta via la telecamera, tu hai già le prove sul tuo telefono e nel backup online."
  },
];

export const hardwareSpecs = [
  { icon: <Eye size={18} />, title: "Risoluzione", value: "4K Ultra HD" },
  { icon: <Moon size={18} />, title: "Visione Notturna", value: "IR 10 metri" },
  { icon: <ScanFace size={18} />, title: "Rilevamento", value: "AI Persone/Animali" },
  { icon: <Mic size={18} />, title: "Audio", value: "Bidirezionale" },
];

export const testimonials = [
  {
    name: "Marco R.",
    location: "Milano",
    text: "Installato in 10 minuti. La qualità video è incredibile e l'app funziona perfettamente. Finalmente mi sento sicuro.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100"
  },
  {
    name: "Laura B.",
    location: "Roma",
    text: "Avevo paura di partire per le vacanze. Ora controllo tutto dal telefono. Il prezzo poi è imbattibile!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100"
  },
  {
    name: "Giuseppe M.",
    location: "Napoli",
    text: "Ho provato altri sistemi costosi con abbonamenti. Questo fa tutto meglio e senza costi nascosti.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&h=100"
  },
];
