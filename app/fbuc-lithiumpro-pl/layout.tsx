import React from 'react';
import FacebookPixel from '@/app/components/FacebookPixel';

export const metadata = {
  title: "LithiumPro - Profesjonalne Sekatory Elektryczne | Oferta Limitowana -50%",
  description: "Profesjonalne sekatory elektryczne LithiumPro 40V. Tnie gałęzie do 8cm bez wysiłku. 2 baterie w zestawie, zestaw akcesoriów gratis. Płatność przy odbiorze.",
};

export default function FbucLithiumproPlLayout({
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
