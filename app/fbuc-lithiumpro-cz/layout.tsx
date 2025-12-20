import React from 'react';
import FacebookPixel from '@/app/components/FacebookPixel';

export const metadata = {
  title: "LithiumPro - Profesionální Elektrické Nůžky | Limitovaná Nabídka -50%",
  description: "Profesionální elektrické nůžky LithiumPro 40V. Řeže větve do 8cm bez námahy. 2 baterie v balení, sada příslušenství zdarma. Platba při převzetí.",
};

export default function FbucLithiumproCzLayout({
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
