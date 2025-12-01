'use client';

import { useCallback } from 'react';
import { usePathname } from 'next/navigation';
import {
  generateEventId,
  trackLead,
  trackPurchase,
  trackPixelEvent,
  isFacebookPage,
  isFacebookThankYouPage
} from '@/app/lib/facebook/pixel';
import {
  saveUserDataToStorage,
  saveEventDataToStorage,
  getEventDataFromStorage,
  trackLeadCAPI,
  trackPurchaseCAPI,
} from '@/app/lib/facebook/capi';
import { FacebookEventData, UserData } from '@/app/config/facebook';

/**
 * Hook per gestire il tracking Facebook nelle landing pages
 */
export function useFacebookTracking() {
  const pathname = usePathname();

  /**
   * Verifica se siamo su una pagina Facebook
   */
  const isOnFacebookPage = useCallback(() => {
    return isFacebookPage(pathname);
  }, [pathname]);

  /**
   * Verifica se siamo su una thank you page Facebook
   */
  const isOnThankYouPage = useCallback(() => {
    return isFacebookThankYouPage(pathname);
  }, [pathname]);

  /**
   * Traccia evento Lead (da chiamare al submit del form)
   * Salva anche i dati utente per il tracking Purchase successivo
   */
  const trackLeadEvent = useCallback(async (
    userData: UserData,
    eventData?: FacebookEventData
  ): Promise<string | null> => {
    if (!isOnFacebookPage()) {
      console.log('[useFacebookTracking] Non su pagina Facebook, skip Lead');
      return null;
    }

    const eventId = generateEventId();
    console.log('[useFacebookTracking] Tracking Lead, eventId:', eventId);

    // Salva userData per il tracking Purchase nella thank you page
    saveUserDataToStorage(userData);

    // Salva eventData (value, currency, content_name) per il Purchase nella TY page
    if (eventData) {
      saveEventDataToStorage(eventData);
    }

    // Track via Pixel (client-side)
    trackLead(eventData, eventId);

    // Track via CAPI (server-side)
    await trackLeadCAPI(eventId, userData, eventData);

    return eventId;
  }, [isOnFacebookPage]);

  /**
   * Traccia evento Purchase (da chiamare nella thank you page)
   */
  const trackPurchaseEvent = useCallback(async (
    userData: UserData,
    eventData?: FacebookEventData
  ): Promise<string | null> => {
    if (!isOnThankYouPage() && !isOnFacebookPage()) {
      console.log('[useFacebookTracking] Non su pagina Facebook/TY, skip Purchase');
      return null;
    }

    const eventId = generateEventId();
    console.log('[useFacebookTracking] Tracking Purchase, eventId:', eventId);

    // Track via Pixel (client-side)
    if (eventData) {
      trackPurchase(eventData, eventId);
    }

    // Track via CAPI (server-side)
    await trackPurchaseCAPI(eventId, userData, eventData);

    return eventId;
  }, [isOnFacebookPage, isOnThankYouPage]);

  /**
   * Traccia un evento custom
   */
  const trackCustomEvent = useCallback(async (
    eventName: string,
    userData: UserData,
    eventData?: FacebookEventData
  ): Promise<string | null> => {
    if (!isOnFacebookPage() && !isOnThankYouPage()) {
      console.log('[useFacebookTracking] Non su pagina Facebook, skip custom event');
      return null;
    }

    const eventId = generateEventId();
    console.log('[useFacebookTracking] Tracking custom event:', eventName, 'eventId:', eventId);

    // Track via Pixel (client-side)
    trackPixelEvent(eventName as 'Lead', eventData, eventId);

    return eventId;
  }, [isOnFacebookPage, isOnThankYouPage]);

  /**
   * Salva i dati utente per uso successivo (es. tra landing e thank you page)
   */
  const saveUserData = useCallback((userData: UserData) => {
    saveUserDataToStorage(userData);
  }, []);

  /**
   * Recupera i dati dell'evento salvati dalla landing page
   * Da usare nella TY page per ottenere value, currency, content_name
   */
  const getStoredEventData = useCallback((): FacebookEventData | null => {
    return getEventDataFromStorage();
  }, []);

  return {
    isOnFacebookPage,
    isOnThankYouPage,
    trackLeadEvent,
    trackPurchaseEvent,
    trackCustomEvent,
    saveUserData,
    getStoredEventData
  };
}

export type { UserData, FacebookEventData };
