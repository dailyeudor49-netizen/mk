'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';

const noHeaderRoutes = ['/besecureprovideocamere', '/besecurepro_pl'];

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const hideHeader = noHeaderRoutes.some(route => pathname?.startsWith(route));
  const showBesecureEmail = pathname?.startsWith('/besecureprovideocamere') || pathname?.startsWith('/besecurepro_pl');

  return (
    <>
      {!hideHeader && <Header />}
      {children}
      <Footer showBesecureEmail={showBesecureEmail} />
    </>
  );
}
