'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';

const noHeaderRoutes = ['/besecureprovideocamere', '/besecurepro_pl', '/climateguardpro', '/climateguardpro_sk', '/climateguardpro_pl', '/climateguardpro_hr', '/climateguardpro_hu', '/climateguardpro_czk', '/fb-climateguardpro_pl', '/fb-besecurepro_pl', '/fb-superhub_pl', '/fb-superhub_hu', '/fbuc-lithiumpro', '/fbuc-titansaw', '/fbuc-tvboxpro', '/fbuc-ortopper', '/fb-ty', '/fbrk-miniphonea17'];

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const hideHeader = noHeaderRoutes.some(route => pathname?.startsWith(route));
  const showBesecureEmail = pathname?.startsWith('/besecureprovideocamere') || pathname?.startsWith('/besecurepro_pl');
  const besecureLocale = pathname?.startsWith('/besecurepro_pl') ? 'pl' : pathname?.startsWith('/besecureprovideocamere') ? 'it' : undefined;
  const showClimateGuardInfo = pathname?.startsWith('/climateguardpro') || pathname?.startsWith('/climateguardpro_sk') || pathname?.startsWith('/climateguardpro_pl') || pathname?.startsWith('/climateguardpro_hr') || pathname?.startsWith('/climateguardpro_hu') || pathname?.startsWith('/climateguardpro_czk');

  // Determine ClimateGuard locale
  const getClimateGuardLocale = (): 'it' | 'sk' | 'pl' | 'hr' | 'hu' | 'cz' | undefined => {
    if (pathname?.startsWith('/climateguardpro_sk')) return 'sk';
    if (pathname?.startsWith('/climateguardpro_pl')) return 'pl';
    if (pathname?.startsWith('/climateguardpro_hr')) return 'hr';
    if (pathname?.startsWith('/climateguardpro_hu')) return 'hu';
    if (pathname?.startsWith('/climateguardpro_czk')) return 'cz';
    if (pathname?.startsWith('/climateguardpro')) return 'it';
    return undefined;
  };
  const climateGuardLocale = getClimateGuardLocale();

  return (
    <>
      {!hideHeader && <Header />}
      {children}
      <Footer showBesecureEmail={showBesecureEmail} besecureLocale={besecureLocale} showClimateGuardInfo={showClimateGuardInfo} climateGuardLocale={climateGuardLocale} />
    </>
  );
}
