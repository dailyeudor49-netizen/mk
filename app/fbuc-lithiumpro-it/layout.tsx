import React from 'react';
import FacebookPixel from '@/app/components/FacebookPixel';

export const metadata = {
  title: "LithiumPro - Cesoia Elettrica Professionale | Offerta Limitata -50%",
  description: "Cesoia elettrica professionale LithiumPro 40V. Taglia rami fino a 8cm senza sforzo. 2 batterie incluse, kit accessori in omaggio. Pagamento alla consegna.",
};

export default function FbucLithiumproItLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Facebook Pixel */}
      <FacebookPixel />
      {/* Network Fingerprint Script loaded dynamically in OrderForm */}
      {children}
    </>
  );
}
