import React from 'react';
import FacebookPixel from '@/app/components/FacebookPixel';

export const metadata = {
  title: "TitanSaw Pro X - Motosega Elettrica Professionale | Offerta -50%",
  description: "Motosega elettrica professionale TitanSaw Pro X. Taglia tronchi fino a 80cm. 2 batterie + 2 catene titanio incluse. Pagamento alla consegna.",
};

export default function FbucTitansawItLayout({
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
