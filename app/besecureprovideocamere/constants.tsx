
import React from 'react';
import { Lock, Camera, Radar, Phone, Smartphone, Wifi, Users, Circle, CheckCircle, Battery, X, AlertTriangle, Eye, ShieldAlert, Radio, HelpCircle, Package, ShieldCheck, Cloud, Signal, Database, Mic, Zap, Cpu, Moon, HardDrive, ScanFace, Key, Square, Cable } from 'lucide-react';
import { Testimonial, Feature, Step, PromoItem } from './types';

// Nuova interfaccia per la tabella comparativa
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

// Immagini placeholder realistiche per il prodotto hardware
// Sostituisci questi URL con le tue immagini generate
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
    name: 'Marco R.',
    source: 'Acquisto Verificato',
    rating: 5,
    text: 'Sono partito per la settimana bianca e controllavo casa ogni sera dal ristorante. La qualità 4K è pazzesca, vedevo pure il gatto muoversi al buio. Mai stato così tranquillo.',
    gender: 'M'
  },
  {
    name: 'Giulia T.',
    source: 'Recensione Facebook',
    rating: 5,
    text: 'Ero scettica per il prezzo basso, invece è un prodotto solidissimo. L\'app è in italiano e molto veloce. L\'altro giorno ho attivato la sirena per sbaglio ed è fortissima!',
    gender: 'F'
  },
  {
    name: 'Alessandro P.',
    source: 'Google Reviews',
    rating: 5,
    text: 'Avevo un preventivo da 600€ all\'anno con le note marche. Con questo ho speso 69€ una volta sola. Fa le stesse cose, anzi meglio perché vedo tutto in diretta io stesso.',
    gender: 'M'
  },
  {
    name: 'Francesca M.',
    source: 'Trustpilot',
    rating: 4,
    text: 'Installato prima di Natale. Pacco arrivato in 24h. La funzione che ti chiama sul cellulare se scatta l\'allarme è geniale, molto meglio del semplice messaggio.',
    gender: 'F'
  },
  {
    name: 'Roberto C.',
    source: 'Feedaty',
    rating: 5,
    text: 'Visione notturna incredibile. Ho messo una telecamera in giardino e una all\'ingresso. Si vede come fosse giorno grazie agli infrarossi.',
    gender: 'M'
  }
];

export const features: Feature[] = [
  {
    icon: <ScanFace className="w-6 h-6" />,
    title: 'Auto-Tracking Intelligente',
    desc: 'Non è fissa. La telecamera ruota a 360° e segue fisicamente il ladro finché non esce dal raggio visivo.',
    image: 'https://images.unsplash.com/photo-1557862921-37829c790f19?auto=format&fit=crop&w=400&q=80'
  },
  {
    icon: <Moon className="w-6 h-6" />,
    title: 'Vedi nel Buio Totale',
    desc: 'Tecnologia StarLight. Mentre i ladri pensano di essere nascosti nel buio, tu li vedi a colori.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=400&q=80'
  },
  {
    icon: <Phone className="w-6 h-6" />,
    title: 'Ti Chiama Subito',
    desc: 'Se qualcuno entra, il sistema non manda solo una notifica: ti TELEFONA finché non rispondi.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=400&q=80'
  },
  {
    icon: <Square className="w-6 h-6" />,
    title: 'Protezione Porte & Finestre',
    desc: 'I sensori magnetici fanno scattare la sirena appena la porta si apre di 1cm. Impossibile entrare in silenzio.',
    image: 'https://images.unsplash.com/photo-1585664811087-47f65be1b1f6?auto=format&fit=crop&w=400&q=80'
  },
  {
    icon: <HardDrive className="w-6 h-6" />,
    title: 'Registra H24 (Incluso)',
    desc: 'Non perde un secondo. Registrazione continua 24/7 su SD Card da 128GB inclusa nel prezzo.',
    image: 'https://images.unsplash.com/photo-1619553765108-a59074b62438?auto=format&fit=crop&w=400&q=80'
  },
  {
    icon: <Lock className="w-6 h-6" />,
    title: 'Zero Canoni Mensili',
    desc: 'Smetti di pagare abbonamenti. Compri il kit una volta ed è tuo per sempre.',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=400&q=80'
  }
];

export const hardwareSpecs: ProductSpec[] = [
    { title: "Risoluzione", value: "4K Ultra HD", icon: <Eye size={18}/> },
    { title: "Autonomia Cam", value: "5 Mesi (USB)", icon: <Battery size={18}/> },
    { title: "Autonomia Sensori", value: "5 Anni (Sostituibile)", icon: <Battery size={18}/> },
    { title: "Memoria", value: "SD 128GB Inclusa", icon: <Database size={18}/> },
];

export const installSteps: Step[] = [
  {
    step: 1,
    title: 'Posiziona Senza Trapano',
    desc: 'Dimentica polvere e buchi nel muro. Usa gli adesivi industriali 3M inclusi. Attacca i sensori sulle porte e le camere dove vuoi.',
    image: '/images/besecurepro img/posiziona sena trapano.png',
    imageAlt: 'Installazione senza trapano'
  },
  {
    step: 2,
    title: 'Accendi: Tutto Già Collegato',
    desc: 'Le 4 telecamere e i 4 sensori arrivano "Pre-Associati" alla centralina. Non devi configurare il WiFi per ogni pezzo. Accendi e si parlano da soli.',
    image: '/images/besecurepro img/accendi gia tutto collegato.png',
    imageAlt: 'Connessione automatica'
  },
  {
    step: 3,
    title: 'Attiva con un Click',
    desc: 'Premi il telecomando incluso o usa l\'app. Da quel momento, se una porta si apre o qualcuno passa, parte l\'inferno (Sirena + Chiamata).',
    image: '/images/besecurepro img/attiva con un click.png',
    imageAlt: 'Sicurezza domestica attivata'
  }
];

export const whatHappensSteps: Step[] = [
  {
    step: '1',
    title: 'NOTIFICA VIDEO LIVE',
    desc: 'Mentre sei fuori, il telefono vibra. Apri la notifica e <strong>vedi in 4K</strong> chi si è avvicinato alla tua porta. Non è un SMS, è video reale.',
    image: '/images/besecurepro img/NOTIFICA VIDEO LIVE.png',
    imageAlt: 'Rilevamento intrusione'
  },
  {
    step: '2',
    title: 'SCATTA IN AUTOMATICO (O DECIDI TU)',
    desc: 'La sirena da 110dB parte <strong>automaticamente</strong> se entrano. Ma se vedi un sospetto in giardino, puoi <strong>attivarla tu manualmente</strong> dall\'app per spaventarlo prima che entri.',
    image: '/images/besecurepro img/SCATTA IN AUTOMATICO.png',
    imageAlt: 'Sirena attiva'
  },
  {
    step: '3',
    title: 'TU HAI IL CONTROLLO',
    desc: 'Nessun falso allarme. Il sistema chiama TE. Tu guardi il video e confermi. <strong>Solo se dai l\'OK</strong> (o non rispondi) partono i soccorsi. Sei tu il capo.',
    image: '/images/besecurepro img/TU HAI IL CONTROLLO.png',
    imageAlt: 'Notifica smartphone'
  }
];

export const promoItems: PromoItem[] = [
  { icon: <Camera className="w-5 h-5" />, title: '4x Microcamere 4K', desc: 'Ricarica USB (Cavo incluso) ogni 5 mesi' },
  { icon: <Square className="w-5 h-5" />, title: '4x Sensori Porta/Finestra', desc: 'Batteria 5 Anni inclusa. Allarme immediato.' },
  { icon: <Key className="w-5 h-5" />, title: '1x Telecomando Smart', desc: 'Arma/Disarma tutto con un click' },
  { icon: <AlertTriangle className="w-5 h-5" />, title: '1x Sirena 110dB', desc: 'Batteria 5 Anni (facilmente sostituibile)' },
  { icon: <Cable className="w-5 h-5" />, title: '4x Cavi Ricarica USB-C', desc: 'Per ricaricare le telecamere' },
  { icon: <Smartphone className="w-5 h-5" />, title: 'Centralina Smart Hub', desc: 'Collega tutto via WiFi o SIM' },
  { icon: <HardDrive className="w-5 h-5" />, title: 'SD Card 128GB INCLUSA', desc: 'Registrazione continua 24/7 in omaggio' },
  { icon: <Signal className="w-5 h-5" />, title: 'SIM 4G Inclusa', desc: 'Connettività backup inclusa' }
];

export const comparisonData: ComparisonRow[] = [
  { feature: 'Qualità Video', us: '4K Ultra HD', them: 'Spesso 720p/1080p' },
  { feature: 'Registrazione', us: '24/7 su SD 128GB (Inclusa)', them: 'Solo Motion / Cloud a pagamento' },
  { feature: 'Canone Mensile', us: '0€ / per sempre', them: '40€ - 60€ / mese' },
  { feature: 'Chiamata Automatica Soccorsi', us: true, them: 'Costo extra' },
  { feature: 'Sensori Porte Inclusi', us: 'Sì (4 Pezzi)', them: 'Spesso optional costosi' },
  { feature: 'Prezzo Kit Completo', us: '69,90€ (Una Tantum)', them: '300€ - 900€' },
];

export const faqs: FAQItem[] = [
  {
    question: "Perché il prezzo è così basso rispetto agli altri?",
    answer: "BeSecure Pro vende direttamente dalla fabbrica al consumatore, eliminando intermediari, negozi fisici e costi di marketing televisivo. Inoltre, è un'offerta lancio limitata per far conoscere il brand in Italia."
  },
  {
    question: "Devo collegare fili o configurare cose difficili?",
    answer: "No. Il sistema arriva 'Pre-Associato'. Significa che le 4 telecamere e i 4 sensori sono già collegati alla centralina. Devi solo accenderli e funzionano."
  },
  {
    question: "Come funzionano le batterie? Devo cambiarle spesso?",
    answer: "Assolutamente no. I sensori porta, il telecomando e la sirena hanno batterie speciali che durano 5 anni (e si trovano facilmente su Amazon). Le telecamere si ricaricano col cavo USB (incluso) come un cellulare, circa 2 volte l'anno."
  },
  {
    question: "I sensori porta come funzionano?",
    answer: "Sono composti da due parti magnetiche. Una va sul telaio, l'altra sulla porta (con adesivo). Quando l'allarme è attivo, se qualcuno apre la porta anche solo di 1cm, i magneti si separano e fanno scattare sirena e telefonata immediatamente."
  },
  {
    question: "Dove vengono salvati i video? Si paga il cloud?",
    answer: "Assolutamente no. Includiamo GRATIS una scheda SD da 128GB che registra 24 ore su 24. Inoltre hai il backup Cloud gratuito a vita per le clip di allarme. I tuoi video sono tuoi, senza costi nascosti."
  },
  {
    question: "Funziona se va via la corrente o il WiFi?",
    answer: "Assolutamente sì. La centralina ha una batteria tampone integrata che dura fino a 12 ore e, se inserisci una SIM (inclusa), continua a comunicare tramite rete GSM anche senza internet."
  },
];
