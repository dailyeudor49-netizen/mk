import React from 'react';
import FacebookPixel from '@/app/components/FacebookPixel';

export const metadata = {
  title: "TitanSaw Pro X - Profesionální Elektrická Pila | Nabídka -50%",
  description: "Profesionální elektrická pila TitanSaw Pro X. Řeže kmeny do 80cm. 2 baterie + 2 titanové řetězy v balení. Platba při převzetí.",
};

export default function FbucTitansawCzLayout({
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
