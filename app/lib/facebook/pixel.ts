'use client';

import { FB_CONFIG, FacebookEventName, FacebookEventData } from '@/app/config/facebook';

// Dichiarazione del tipo fbq per TypeScript
declare global {
  interface Window {
    fbq?: (
      action: string,
      eventName: string,
      params?: Record<string, unknown>,
      options?: { eventID?: string }
    ) => void;
    _fbq?: unknown;
  }
}

/**
 * Genera un ID univoco per la deduplicazione degli eventi
 */
export function generateEventId(): string {
  const eventId = `${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
  console.log('[FB Pixel] Generated eventId:', eventId);
  return eventId;
}

/**
 * Legge il cookie _fbp
 */
export function getFbp(): string {
  if (typeof document === 'undefined') return '';

  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === '_fbp') {
      console.log('[FB Pixel] Cookie _fbp trovato:', value);
      return value;
    }
  }
  console.log('[FB Pixel] Cookie _fbp non trovato');
  return '';
}

/**
 * Legge il cookie _fbc, se non c'è lo costruisce da fbclid nell'URL
 */
export function getFbc(): string {
  if (typeof document === 'undefined' || typeof window === 'undefined') return '';

  // Prima prova a leggere il cookie
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === '_fbc') {
      console.log('[FB Pixel] Cookie _fbc trovato:', value);
      return value;
    }
  }

  // Se non c'è il cookie, costruiscilo da fbclid nell'URL
  const urlParams = new URLSearchParams(window.location.search);
  const fbclid = urlParams.get('fbclid');
  if (fbclid) {
    const fbc = `fb.1.${Date.now()}.${fbclid}`;
    console.log('[FB Pixel] Cookie _fbc costruito da fbclid:', fbc);
    return fbc;
  }

  console.log('[FB Pixel] Cookie _fbc non trovato e nessun fbclid nell\'URL');
  return '';
}

/**
 * Estrae i parametri UTM dall'URL
 */
export function getUtmParams(): Record<string, string> {
  if (typeof window === 'undefined') return {};

  const urlParams = new URLSearchParams(window.location.search);
  const utmParams: Record<string, string> = {
    utm_source: urlParams.get('utm_source') || '',
    utm_medium: urlParams.get('utm_medium') || '',
    utm_campaign: urlParams.get('utm_campaign') || '',
    utm_content: urlParams.get('utm_content') || '',
    utm_term: urlParams.get('utm_term') || '',
  };

  console.log('[FB Pixel] UTM params:', utmParams);
  return utmParams;
}

/**
 * Traccia un evento con il pixel Facebook
 */
export function trackPixelEvent(
  eventName: FacebookEventName,
  eventData?: FacebookEventData,
  eventId?: string
): void {
  if (typeof window === 'undefined' || !window.fbq) {
    console.log('[FB Pixel] fbq non disponibile');
    return;
  }

  const options = eventId ? { eventID: eventId } : undefined;

  console.log('[FB Pixel] Tracking evento:', eventName);
  console.log('[FB Pixel] Event data:', eventData);
  console.log('[FB Pixel] Event ID:', eventId);

  if (eventData) {
    window.fbq('track', eventName, eventData as Record<string, unknown>, options);
  } else {
    window.fbq('track', eventName, {}, options);
  }

  console.log('[FB Pixel] Evento tracciato con successo:', eventName);
}

/**
 * Traccia PageView
 */
export function trackPageView(eventId?: string): void {
  trackPixelEvent('PageView', undefined, eventId);
}

/**
 * Traccia Purchase
 */
export function trackPurchase(eventData: FacebookEventData, eventId?: string): void {
  trackPixelEvent('Purchase', eventData, eventId);
}

/**
 * Traccia Lead
 */
export function trackLead(eventData?: FacebookEventData, eventId?: string): void {
  trackPixelEvent('Lead', eventData, eventId);
}

/**
 * Ritorna lo script di inizializzazione del pixel
 */
export function initPixelScript(): string {
  console.log('[FB Pixel] Inizializzazione pixel con ID:', FB_CONFIG.PIXEL_ID);

  return `
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '${FB_CONFIG.PIXEL_ID}');
    console.log('[FB Pixel] Pixel inizializzato con ID: ${FB_CONFIG.PIXEL_ID}');
  `;
}

/**
 * Verifica se il pathname corrente è una pagina Facebook
 */
export function isFacebookPage(pathname: string): boolean {
  const isFb = pathname.startsWith('/fb-') || pathname.startsWith('/fbuc-') || pathname.startsWith('/fbital-') || pathname.startsWith('/fbrk-');
  console.log('[FB Pixel] Pathname:', pathname, '-> isFacebookPage:', isFb);
  return isFb;
}

/**
 * Verifica se è una thank you page Facebook
 */
export function isFacebookThankYouPage(pathname: string): boolean {
  const isTy = pathname.startsWith('/fb-ty/ty-fb-');
  console.log('[FB Pixel] Pathname:', pathname, '-> isFacebookThankYouPage:', isTy);
  return isTy;
}
