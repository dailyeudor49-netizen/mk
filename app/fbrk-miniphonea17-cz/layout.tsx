import React from 'react';
import FacebookPixel from '@/app/components/FacebookPixel';

export const metadata = {
  title: "A17 Mini - Kapesní Smartphone | Sleva -50%",
  description: "A17 Mini: kompaktní smartphone, který se vejde do kapsy. WhatsApp, GPS, Dual SIM, Android. Pouze 1999 Kč s platbou při doručení.",
};

export default function FbrkMiniphonea17CzLayout({
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
