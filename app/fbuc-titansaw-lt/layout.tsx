import React from 'react';
import FacebookPixel from '@/app/components/FacebookPixel';

export const metadata = {
  title: "TitanSaw Pro X - Profesionalus Elektrinis Pjūklas | Pasiūlymas -50%",
  description: "Profesionalus elektrinis pjūklas TitanSaw Pro X. Pjauna kamienus iki 80cm. 2 baterijos + 2 titano grandinės komplekte. Mokėjimas pristatymo metu.",
};

export default function FbucTitansawLtLayout({
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
