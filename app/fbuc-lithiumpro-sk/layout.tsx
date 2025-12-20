import React from 'react';
import FacebookPixel from '@/app/components/FacebookPixel';

export const metadata = {
  title: "LithiumPro - Profesionálne Elektrické Nožnice | Limitovaná Ponuka -50%",
  description: "Profesionálne elektrické nožnice LithiumPro 40V. Reže konáre do 8cm bez námahy. 2 batérie v balení, sada príslušenstva zadarmo. Platba pri prevzatí.",
};

export default function FbucLithiumproSkLayout({
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
