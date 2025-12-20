import React from 'react';
import FacebookPixel from '@/app/components/FacebookPixel';

export const metadata = {
  title: "TitanSaw Pro X - Profesjonalna Pilarka Elektryczna | Oferta -50%",
  description: "Profesjonalna pilarka elektryczna TitanSaw Pro X. Tnie pnie do 80cm. 2 baterie + 2 łańcuchy tytanowe w zestawie. Płatność przy odbiorze.",
};

export default function FbucTitansawPlLayout({
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
