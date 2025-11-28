'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { FB_CONFIG } from '@/app/config/facebook';
import {
  initPixelScript,
  trackPageView,
  trackPurchase,
  trackLead,
  isFacebookPage,
  isFacebookThankYouPage,
  generateEventId
} from '@/app/lib/facebook/pixel';
import {
  getUserDataFromStorage,
  trackPurchaseCAPI,
  trackLeadCAPI
} from '@/app/lib/facebook/capi';

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
    initPixelScript();

    // Track PageView
    trackPageView();

    // Se siamo su una thank you page, traccia Purchase
    if (isFacebookThankYouPage(pathname)) {
      console.log('[FB Pixel] Thank you page rilevata, tracking Purchase...');

      const eventId = generateEventId();
      const userData = getUserDataFromStorage();

      // Recupera i dati dell'evento dalla query string o usa valori di default
      const value = parseFloat(searchParams?.get('value') || '0') || 299;
      const currency = searchParams?.get('currency') || 'EUR';
      const contentName = searchParams?.get('content_name') || 'ClimateGuard Pro';

      const eventData = {
        value,
        currency,
        content_name: contentName,
        content_type: 'product' as const,
        content_ids: ['climateguard-pro'],
      };

      // Track via Pixel (client-side)
      trackPurchase(eventId, eventData);

      // Track via CAPI (server-side) per deduplicazione
      trackPurchaseCAPI(eventId, userData, eventData);
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
    trackLead(eventId, eventData);

    // Track via CAPI (server-side)
    await trackLeadCAPI(eventId, userData, eventData);

    console.log('[FB Pixel] Lead tracciato con eventId:', eventId);
  };

  return { trackLeadEvent };
}
