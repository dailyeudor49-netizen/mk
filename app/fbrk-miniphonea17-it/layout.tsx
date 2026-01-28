import React from 'react';
import FacebookPixel from '@/app/components/FacebookPixel';

export const metadata = {
  title: "A17 Mini - Lo Smartphone Tascabile | Offerta -50%",
  description: "A17 Mini: lo smartphone compatto che entra in tasca. WhatsApp, GPS, Dual SIM, Android. Solo 69,99€ con pagamento alla consegna.",
};

export default function FbrkMiniphonea17ItLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Facebook Pixel */}
      <FacebookPixel />
      {children}
    </>
  );
}
