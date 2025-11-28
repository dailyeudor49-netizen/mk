import React, { useState } from 'react';
import { Sparkles, Loader2, MessageCircleQuestion } from 'lucide-react';

// Risposte predefinite per le FAQ
const faqResponses: Record<string, string> = {
  "Davvero risparmio il 60% sulla bolletta?": "Sì, grazie alla tecnologia PTC ceramica e al chip ECO-AI che ottimizza i consumi in tempo reale. I nostri clienti riportano risparmi medi del 55-65% rispetto alle stufe tradizionali.",
  "Riesce a scaldare un salone di 90mq?": "Assolutamente sì! La turbina 360° distribuisce l'aria calda uniformemente fino a 120mq. Per ambienti più grandi, consigliamo 2 unità per prestazioni ottimali.",
  "Aiuta contro la muffa invernale?": "Sì, il deumidificatore termico integrato rimuove l'umidità in eccesso mentre riscalda, prevenendo la formazione di muffa e condensa sui muri e sulle finestre.",
  "Fa rumore la notte?": "In modalità notte, ClimateGuard Pro opera a soli 25dB - più silenzioso di un sussurro. Il display si spegne completamente per non disturbare il sonno.",
  "Posso pagare al corriere?": "Certo! Offriamo il pagamento alla consegna (contrassegno). Paghi direttamente al corriere in contanti quando ricevi il prodotto. Zero rischi per te."
};

export const ObjectionHandler: React.FC = () => {
  const [activeQuestion, setActiveQuestion] = useState<string | null>(null);
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const doubts = [
    "Davvero risparmio il 60% sulla bolletta?",
    "Riesce a scaldare un salone di 90mq?",
    "Aiuta contro la muffa invernale?",
    "Fa rumore la notte?",
    "Posso pagare al corriere?"
  ];

  const askExpert = async (question: string) => {
    setActiveQuestion(question);
    setLoading(true);
    setResponse(null);

    // Simula un breve ritardo per dare l'effetto di "risposta"
    await new Promise(resolve => setTimeout(resolve, 800));

    const answer = faqResponses[question] || "Mi dispiace, non ho una risposta per questa domanda. Contattaci per maggiori informazioni.";
    setResponse(answer);
    setLoading(false);
  };

  return (
    <div className="w-full max-w-3xl mx-auto relative group">
      {/* Neon Glow effect behind */}
      <div className="absolute -inset-1 bg-gradient-to-r from-neon-500 to-holo-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>

      <div className="relative glass-tech rounded-xl overflow-hidden flex flex-col md:flex-row min-h-[300px]">

        {/* Sidebar / Menu */}
        <div className="bg-void-900/80 p-6 md:w-1/3 border-r border-white/5 flex flex-col justify-between">
           <div>
              <div className="flex items-center gap-2 mb-6 text-white">
                <MessageCircleQuestion className="w-5 h-5 text-neon-500" />
                <span className="font-display font-bold tracking-wider text-sm uppercase">Supporto Clienti</span>
              </div>
              <p className="text-gray-400 text-xs mb-4">Domande frequenti:</p>
              <div className="flex flex-col gap-2">
                 {doubts.map((q) => (
                   <button
                     key={q}
                     onClick={() => askExpert(q)}
                     className={`text-left text-xs py-3 px-4 rounded border transition-all duration-300 ${activeQuestion === q ? 'bg-neon-500 text-white border-neon-500 shadow-lg' : 'bg-white/5 border-transparent text-gray-400 hover:bg-white/10 hover:text-white'}`}
                   >
                     {q}
                   </button>
                 ))}
              </div>
           </div>
           <div className="mt-6 text-[10px] text-green-500 font-bold flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              OPERATORE ONLINE
           </div>
        </div>

        {/* Output Screen */}
        <div className="p-6 md:w-2/3 bg-void-950/50 relative flex flex-col justify-center">
            {!activeQuestion ? (
               <div className="text-center opacity-50">
                  <MessageCircleQuestion className="w-12 h-12 mx-auto mb-4 text-gray-600" />
                  <p className="font-display text-lg text-gray-400">Seleziona una domanda qui a fianco</p>
               </div>
            ) : (
               <div className="relative z-10">
                 <div className="mb-4 inline-block px-3 py-1 bg-white/10 rounded text-[10px] uppercase tracking-widest text-gray-400">La tua domanda</div>
                 <h4 className="text-xl font-display text-white mb-6 leading-tight">{activeQuestion}</h4>

                 {loading ? (
                    <div className="flex items-center gap-3 text-neon-500">
                       <Loader2 className="w-5 h-5 animate-spin" />
                       <span className="font-bold text-sm">Sto scrivendo la risposta...</span>
                    </div>
                 ) : (
                    <div className="animate-fade-in-up">
                       <div className="mb-2 inline-block px-3 py-1 bg-neon-500/10 border border-neon-500/20 rounded text-[10px] uppercase tracking-widest text-neon-500 font-bold">Risposta</div>
                       <p className="text-lg text-gray-200 leading-relaxed font-light pl-4 border-l-2 border-neon-500">
                          {response}
                       </p>
                    </div>
                 )}
               </div>
            )}
        </div>

      </div>
    </div>
  );
};
