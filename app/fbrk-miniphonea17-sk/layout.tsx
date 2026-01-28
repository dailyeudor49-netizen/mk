import React from 'react';
import FacebookPixel from '@/app/components/FacebookPixel';

export const metadata = {
  title: "A17 Mini - Vreckový Smartphone | Zľava -50%",
  description: "A17 Mini: kompaktný smartphone, ktorý sa zmestí do vrecka. WhatsApp, GPS, Dual SIM, Android. Len 79,99€ s platbou pri doručení.",
};

export default function FbrkMiniphonea17SkLayout({
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
