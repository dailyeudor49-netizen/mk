'use client';

import { FB_CONFIG, FacebookEventName, FacebookEventData, UserData } from '@/app/config/facebook';
import { hashNome, hashCognome, hashTelefono, hashEmail } from './hash';
import { getFbp, getFbc, getUtmParams } from './pixel';

const USER_DATA_STORAGE_KEY = 'userData';
const EVENT_DATA_STORAGE_KEY = 'fbEventData';

/**
 * Recupera i dati utente da localStorage o query string
 */
export function getUserDataFromStorage(): UserData {
  console.log('[FB CAPI] Recupero userData...');

  if (typeof window === 'undefined') {
    console.log('[FB CAPI] Window non disponibile');
    return {};
  }

  // Prima prova localStorage
  try {
    const stored = localStorage.getItem(USER_DATA_STORAGE_KEY);
    if (stored) {
      const userData = JSON.parse(stored);
      console.log('[FB CAPI] userData da localStorage:', userData);
      return userData;
    }
  } catch (error) {
    console.log('[FB CAPI] Errore lettura localStorage:', error);
  }

  // Fallback a query string
  const urlParams = new URLSearchParams(window.location.search);
  const userData: UserData = {
    nome: urlParams.get('nome') || undefined,
    cognome: urlParams.get('cognome') || undefined,
    telefono: urlParams.get('telefono') || undefined,
    indirizzo: urlParams.get('indirizzo') || undefined,
    email: urlParams.get('email') || undefined,
  };

  // Rimuovi campi undefined
  Object.keys(userData).forEach(key => {
    if (userData[key as keyof UserData] === undefined) {
      delete userData[key as keyof UserData];
    }
  });

  if (Object.keys(userData).length > 0) {
    console.log('[FB CAPI] userData da query string:', userData);
  } else {
    console.log('[FB CAPI] Nessun userData trovato');
  }

  return userData;
}

/**
 * Salva i dati utente in localStorage
 */
export function saveUserDataToStorage(userData: UserData): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(USER_DATA_STORAGE_KEY, JSON.stringify(userData));
    console.log('[FB CAPI] userData salvato in localStorage:', userData);
  } catch (error) {
    console.log('[FB CAPI] Errore salvataggio localStorage:', error);
  }
}

/**
 * Pulisce i dati utente da localStorage
 */
export function clearUserDataFromStorage(): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(USER_DATA_STORAGE_KEY);
    console.log('[FB CAPI] userData rimosso da localStorage');
  } catch (error) {
    console.log('[FB CAPI] Errore rimozione localStorage:', error);
  }
}

/**
 * Salva i dati dell'evento (value, currency, content_name) in sessionStorage
 * Da chiamare nella landing page quando si traccia il Lead
 * Usa sessionStorage invece di localStorage così i dati si cancellano quando chiudi il browser
 */
export function saveEventDataToStorage(eventData: FacebookEventData): void {
  if (typeof window === 'undefined') return;

  try {
    sessionStorage.setItem(EVENT_DATA_STORAGE_KEY, JSON.stringify(eventData));
    console.log('[FB CAPI] eventData salvato in sessionStorage:', eventData);
  } catch (error) {
    console.log('[FB CAPI] Errore salvataggio sessionStorage:', error);
  }
}

/**
 * Recupera i dati dell'evento da sessionStorage
 * Da chiamare nella TY page per il Purchase
 */
export function getEventDataFromStorage(): FacebookEventData | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored = sessionStorage.getItem(EVENT_DATA_STORAGE_KEY);
    if (stored) {
      const eventData = JSON.parse(stored);
      console.log('[FB CAPI] eventData da sessionStorage:', eventData);
      return eventData;
    }
  } catch (error) {
    console.log('[FB CAPI] Errore lettura sessionStorage:', error);
  }

  console.log('[FB CAPI] Nessun eventData trovato');
  return null;
}

/**
 * Pulisce i dati dell'evento da sessionStorage
 */
export function clearEventDataFromStorage(): void {
  if (typeof window === 'undefined') return;

  try {
    sessionStorage.removeItem(EVENT_DATA_STORAGE_KEY);
    console.log('[FB CAPI] eventData rimosso da sessionStorage');
  } catch (error) {
    console.log('[FB CAPI] Errore rimozione sessionStorage:', error);
  }
}

/**
 * Costruisce il payload completo per il webhook CAPI
 */
export async function buildCAPIPayload(
  eventName: FacebookEventName,
  eventId: string,
  userData: UserData,
  eventData?: FacebookEventData
): Promise<Record<string, unknown>> {
  console.log('[FB CAPI] Building payload per evento:', eventName);
  console.log('[FB CAPI] Event ID:', eventId);
  console.log('[FB CAPI] User data:', userData);
  console.log('[FB CAPI] Event data:', eventData);

  // Hash dei dati utente
  const [nomeHash, cognomeHash, telefonoHash, emailHash] = await Promise.all([
    hashNome(userData.nome),
    hashCognome(userData.cognome),
    hashTelefono(userData.telefono),
    hashEmail(userData.email),
  ]);

  // Recupera fbp, fbc e UTM
  const fbp = getFbp();
  const fbc = getFbc();
  const utmParams = getUtmParams();

  // Costruisci event_source_url
  const eventSourceUrl = typeof window !== 'undefined'
    ? FB_CONFIG.DOMAIN + window.location.pathname
    : FB_CONFIG.DOMAIN;

  const payload: Record<string, unknown> = {
    event_name: eventName,
    event_id: eventId,
    event_source_url: eventSourceUrl,
    timestamp: Math.floor(Date.now() / 1000),
    pixel_id: FB_CONFIG.PIXEL_ID,
    token: FB_CONFIG.ACCESS_TOKEN,

    // Dati utente hashati
    nome_hash: nomeHash,
    cognome_hash: cognomeHash,
    telefono_hash: telefonoHash,
    email_hash: emailHash,
    indirizzo: userData.indirizzo || '',

    // Browser info
    user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
    fbp: fbp,
    fbc: fbc,

    // Event data
    content_name: eventData?.content_name || '',
    content_category: eventData?.content_category || '',
    content_ids: eventData?.content_ids || '',
    content_type: eventData?.content_type || 'product',
    currency: eventData?.currency || 'EUR',
    value: eventData?.value || 0,
    quantity: eventData?.quantity || 1,

    // UTM params
    utm_source: utmParams.utm_source || '',
    utm_medium: utmParams.utm_medium || '',
    utm_campaign: utmParams.utm_campaign || '',
    utm_content: utmParams.utm_content || '',
    utm_term: utmParams.utm_term || '',

    // Page info
    page_title: typeof document !== 'undefined' ? document.title : '',
    referrer: typeof document !== 'undefined' ? document.referrer : '',
    language: typeof navigator !== 'undefined' ? navigator.language : '',
    screen_resolution: typeof window !== 'undefined'
      ? `${window.screen.width}x${window.screen.height}`
      : '',

    // Test event code (rimuovere in produzione)
    test_event_code: FB_CONFIG.TEST_EVENT_CODE,
  };

  console.log('[FB CAPI] Payload costruito:', payload);
  return payload;
}

/**
 * Invia il payload al webhook CAPI
 */
export async function sendToCAPI(payload: Record<string, unknown>): Promise<boolean> {
  console.log('[FB CAPI] Invio payload al webhook:', FB_CONFIG.CAPI_WEBHOOK_URL);
  console.log('[FB CAPI] Payload completo:', JSON.stringify(payload, null, 2));

  try {
    const response = await fetch(FB_CONFIG.CAPI_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      console.log('[FB CAPI] Webhook response: SUCCESS', response.status);
      return true;
    } else {
      console.log('[FB CAPI] Webhook response: ERROR', response.status, await response.text());
      return false;
    }
  } catch (error) {
    console.log('[FB CAPI] Errore invio webhook:', error);
    return false;
  }
}

/**
 * Traccia Lead via CAPI
 */
export async function trackLeadCAPI(
  eventId: string,
  userData: UserData,
  eventData?: FacebookEventData
): Promise<boolean> {
  console.log('[FB CAPI] Tracking Lead via CAPI');
  const payload = await buildCAPIPayload('Lead', eventId, userData, eventData);
  return sendToCAPI(payload);
}

/**
 * Traccia Purchase via CAPI
 */
export async function trackPurchaseCAPI(
  eventId: string,
  userData: UserData,
  eventData?: FacebookEventData
): Promise<boolean> {
  console.log('[FB CAPI] Tracking Purchase via CAPI');
  const payload = await buildCAPIPayload('Purchase', eventId, userData, eventData);
  return sendToCAPI(payload);
}
