import React from 'react';
import FacebookPixel from '@/app/components/FacebookPixel';

export const metadata = {
  title: "LithiumPro - Professzionális Elektromos Metszőolló | Limitált Ajánlat -50%",
  description: "Professzionális elektromos metszőolló LithiumPro 40V. Vágja az ágakat 8cm-ig erőfeszítés nélkül. 2 akkumulátor, kiegészítők ajándékba. Fizetés átvételkor.",
};

export default function FbucLithiumproHuLayout({
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
