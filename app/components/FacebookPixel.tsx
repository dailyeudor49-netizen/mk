'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { FB_CONFIG } from '@/app/config/facebook';
import {
  trackPageView,
  trackLead,
  isFacebookPage,
  isFacebookThankYouPage,
  generateEventId
} from '@/app/lib/facebook/pixel';
import {
  getUserDataFromStorage,
  trackLeadCAPI
} from '@/app/lib/facebook/capi';

// Funzione per inizializzare il Pixel direttamente
function initializePixel() {
  if (typeof window === 'undefined') return;
  if (window.fbq) {
    console.log('[FB Pixel] Pixel già inizializzato');
    return;
  }

  console.log('[FB Pixel] Inizializzazione pixel con ID:', FB_CONFIG.PIXEL_ID);

  // Inietta lo script standard di Facebook
  const script = document.createElement('script');
  script.innerHTML = `
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '${FB_CONFIG.PIXEL_ID}');
  `;
  document.head.appendChild(script);

  console.log('[FB Pixel] Pixel inizializzato con ID:', FB_CONFIG.PIXEL_ID);
}

export default function FacebookPixel() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Inizializza il Pixel solo se siamo su una pagina Facebook
    if (!isFacebookPage(pathname) && !isFacebookThankYouPage(pathname)) {
      console.log('[FB Pixel] Pagina non Facebook, skip inizializzazione');
      return;
    }

    console.log('[FB Pixel] Inizializzazione per pathname:', pathname);

    // Inizializza lo script del Pixel
    initializePixel();

    // Track PageView solo sulle landing pages (fb-*), NON sulle TY pages
    if (isFacebookPage(pathname) && !isFacebookThankYouPage(pathname)) {
      trackPageView();
      console.log('[FB Pixel] PageView tracciato su landing page');
    }

    // Se siamo su una thank you page, NON tracciare nulla qui
    // PageView e Purchase vengono tracciati direttamente nelle TY pages
    if (isFacebookThankYouPage(pathname)) {
      console.log('[FB Pixel] Thank you page rilevata, tracking gestito dalla TY page');
    }
  }, [pathname, searchParams]);

  // Render null - questo componente non ha UI
  return null;
}

/**
 * Hook per tracciare Lead manualmente (es. al submit del form)
 */
export function useTrackLead() {
  const pathname = usePathname();

  const trackLeadEvent = async (userData: {
    nome?: string;
    cognome?: string;
    telefono?: string;
    email?: string;
    indirizzo?: string;
  }, eventData?: {
    value?: number;
    currency?: string;
    content_name?: string;
  }) => {
    if (!isFacebookPage(pathname)) {
      console.log('[FB Pixel] Non su pagina Facebook, skip Lead tracking');
      return;
    }

    const eventId = generateEventId();

    // Track via Pixel (client-side)
    trackLead(eventData, eventId);

    // Track via CAPI (server-side)
    await trackLeadCAPI(eventId, userData, eventData);

    console.log('[FB Pixel] Lead tracciato con eventId:', eventId);
  };

  return { trackLeadEvent };
}
