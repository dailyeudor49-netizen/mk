import React from 'react';
import FacebookPixel from '@/app/components/FacebookPixel';

export const metadata = {
  title: "A17 Mini - Kieszonkowy Smartfon | Rabat -50%",
  description: "A17 Mini: kompaktowy smartfon, który mieści się w kieszeni. WhatsApp, GPS, Dual SIM, Android. Tylko 349 zł z płatnością przy odbiorze.",
};

export default function FbrkMiniphonea17PlLayout({
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
