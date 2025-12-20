import React from 'react';
import FacebookPixel from '@/app/components/FacebookPixel';

export const metadata = {
  title: "TitanSaw Pro X - Professzionális Elektromos Fűrész | Ajánlat -50%",
  description: "Professzionális elektromos fűrész TitanSaw Pro X. Vágja a törzseket 80cm-ig. 2 akkumulátor + 2 titán lánc a csomagban. Fizetés átvételkor.",
};

export default function FbucTitansawHuLayout({
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
