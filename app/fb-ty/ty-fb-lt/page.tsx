'use client';

import React, { useState, useEffect } from 'react';
import { useFacebookTracking } from '@/app/hooks/useFacebookTracking';
import { getUserDataFromStorage, getEventDataFromStorage } from '@/app/lib/facebook/capi';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export default function ThankYouPage() {
  const [orderCode, setOrderCode] = useState('');
  const { trackPurchaseEvent } = useFacebookTracking();
  const [purchaseTracked, setPurchaseTracked] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem('orderCode');
    if (stored) {
      setOrderCode(stored);
    } else {
      const newCode = Math.floor(100000 + Math.random() * 900000).toString();
      sessionStorage.setItem('orderCode', newCode);
      setOrderCode(newCode);
    }

    // Facebook Purchase Tracking (dinamico) - aspetta che il Pixel sia pronto
    if (!purchaseTracked) {
      const alreadyTrackedFb = sessionStorage.getItem('fb_purchase_tracked_lt');
      if (!alreadyTrackedFb) {
        const trackPurchase = () => {
          const userData = getUserDataFromStorage();
          const storedEventData = getEventDataFromStorage();

          const eventData = storedEventData || {
            value: 64,
            currency: 'EUR',
            content_name: 'Product LT',
            content_type: 'product' as const,
            content_ids: 'product-lt'
          };

          console.log('[TY-LT] Using event data:', eventData);
          trackPurchaseEvent(userData, eventData);

          sessionStorage.setItem('fb_purchase_tracked_lt', 'true');
          setPurchaseTracked(true);
          console.log('[TY-LT] Facebook Purchase tracked');
        };

        // Aspetta 500ms per permettere al Pixel di inizializzarsi
        setTimeout(trackPurchase, 500);
      }
    }

    // Google Ads Conversion Tracking
    const alreadyTracked = sessionStorage.getItem('conversionTracked');
    if (typeof window !== 'undefined' && !alreadyTracked) {
      const transactionId = sessionStorage.getItem('orderCode') || Math.floor(100000 + Math.random() * 900000).toString();

      // Load gtag script
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://www.googletagmanager.com/gtag/js?id=AW-17746789099';
      document.head.appendChild(script);

      script.onload = () => {
        window.dataLayer = window.dataLayer || [];
        window.gtag = function() { window.dataLayer!.push(arguments); };
        window.gtag('js', new Date());
        window.gtag('config', 'AW-17746789099');
        window.gtag('event', 'conversion', {
          'send_to': 'AW-17746789099/y9IvCKyq_cUbEOuFqo5C',
          'value': 1.0,
          'currency': 'EUR',
          'transaction_id': transactionId
        });
        sessionStorage.setItem('conversionTracked', 'true');
        console.log('[TY-LT] Google Ads conversion tracked, transaction_id:', transactionId);
      };
    }
  }, [purchaseTracked, trackPurchaseEvent]);

  return (
    <div className="ty-container" style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <div className="ty-box" style={{
        background: 'white',
        borderRadius: '24px',
        padding: '3rem',
        maxWidth: '550px',
        width: '100%',
        textAlign: 'center',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}>
        <style>{`
          @media (max-width: 640px) {
            .ty-box { padding: 1rem !important; margin: 0 !important; border-radius: 16px !important; }
            .ty-container { padding: 0.75rem !important; }
          }
        `}</style>
        <div style={{
          width: '80px',
          height: '80px',
          background: 'linear-gradient(135deg, #16a34a 0%, #22c55e 100%)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem',
          fontSize: '2.5rem',
          color: 'white'
        }}>
          ✓
        </div>

        <h1 style={{
          fontSize: '2rem',
          fontWeight: 800,
          color: '#111827',
          marginBottom: '0.5rem'
        }}>
          Ačiū už užsakymą!
        </h1>

        <p style={{
          color: '#6b7280',
          fontSize: '1rem',
          marginBottom: '1.5rem'
        }}>
          Jūsų užsakymas sėkmingai priimtas.
        </p>

        <div style={{
          background: 'linear-gradient(135deg, #FFF4E6, #FFE8CC)',
          borderRadius: '12px',
          padding: '1.25rem',
          marginBottom: '1.5rem',
          border: '1px solid #FFDAA3'
        }}>
          <div style={{ fontSize: '0.875rem', color: '#92400e', marginBottom: '0.25rem' }}>Užsakymo numeris</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#FF8C00', letterSpacing: '2px' }}>{orderCode}</div>
        </div>

        <div style={{
          background: '#F8FAFC',
          borderRadius: '12px',
          padding: '1.5rem',
          marginBottom: '1.5rem',
          textAlign: 'left'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ width: '32px', height: '32px', background: '#16a34a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1rem' }}>€</div>
            <div>
              <div style={{ fontWeight: 600, color: '#1E293B', fontSize: '0.95rem' }}>Mokėjimas pristatymo metu</div>
              <div style={{ color: '#64748b', fontSize: '0.85rem' }}>Sumokėsite grynaisiais kurjeriui</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ width: '32px', height: '32px', background: '#3B82F6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1rem' }}>📦</div>
            <div>
              <div style={{ fontWeight: 600, color: '#1E293B', fontSize: '0.95rem' }}>Nemokamas pristatymas</div>
              <div style={{ color: '#64748b', fontSize: '0.85rem' }}>Pristatymas per 24-48 valandas</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ width: '32px', height: '32px', background: '#8B5CF6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1rem' }}>↺</div>
            <div>
              <div style={{ fontWeight: 600, color: '#1E293B', fontSize: '0.95rem' }}>30 dienų grąžinimui</div>
              <div style={{ color: '#64748b', fontSize: '0.85rem' }}>Pinigų grąžinimas, jei nesate patenkinti</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '32px', height: '32px', background: '#F59E0B', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1rem' }}>★</div>
            <div>
              <div style={{ fontWeight: 600, color: '#1E293B', fontSize: '0.95rem' }}>2 metų garantija</div>
              <div style={{ color: '#64748b', fontSize: '0.85rem' }}>Visiems produktams</div>
            </div>
          </div>
        </div>

        <div style={{
          background: '#F1F5F9',
          borderRadius: '12px',
          padding: '1rem',
          marginBottom: '2rem'
        }}>
          <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '0.25rem' }}>Reikia pagalbos arba norite grąžinti prekę?</div>
          <a href="mailto:info@ionizi.com" style={{ color: '#FF8C00', fontWeight: 600, textDecoration: 'none', fontSize: '0.95rem' }}>info@ionizi.com</a>
          <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.5rem' }}>Galite prašyti grąžinimo per 30 dienų, jei nesate patenkinti produktu</div>
        </div>

        <a href="/" style={{
          display: 'inline-block',
          background: 'linear-gradient(135deg, #FFB800 0%, #FF7A00 100%)',
          color: 'white',
          padding: '1rem 2rem',
          borderRadius: '12px',
          fontSize: '1rem',
          fontWeight: 600,
          textDecoration: 'none'
        }}>
          Grįžti į pagrindinį puslapį
        </a>
      </div>
    </div>
  );
}
