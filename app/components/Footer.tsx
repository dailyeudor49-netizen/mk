import Link from 'next/link';
import Image from 'next/image';

interface FooterProps {
  showBesecureEmail?: boolean;
  besecureLocale?: 'it' | 'pl';
  showClimateGuardInfo?: boolean;
  climateGuardLocale?: 'it' | 'sk' | 'pl' | 'hr' | 'hu' | 'cz';
}

const climateGuardTexts = {
  it: {
    assistance: 'Per assistenza:',
    brand: 'ClimateGuard Pro è un marchio registrato distribuito in esclusiva da Ionizi.com - Rivenditore Ufficiale Autorizzato.'
  },
  sk: {
    assistance: 'Pre pomoc:',
    brand: 'ClimateGuard Pro je registrovaná značka distribuovaná výhradne spoločnosťou Ionizi.com - Oficiálny autorizovaný predajca.'
  },
  pl: {
    assistance: 'Potrzebujesz pomocy:',
    brand: 'ClimateGuard Pro jest zarejestrowaną marką dystrybuowaną wyłącznie przez Ionizi.com - Oficjalny Autoryzowany Sprzedawca.'
  },
  hr: {
    assistance: 'Za pomoć:',
    brand: 'ClimateGuard Pro je registrirana marka koju ekskluzivno distribuira Ionizi.com - Službeni ovlašteni prodavač.'
  },
  hu: {
    assistance: 'Segítségért:',
    brand: 'A ClimateGuard Pro az Ionizi.com által kizárólagosan forgalmazott bejegyzett márka - Hivatalos meghatalmazott viszonteladó.'
  },
  cz: {
    assistance: 'Pro pomoc:',
    brand: 'ClimateGuard Pro je registrovaná značka výhradně distribuovaná společností Ionizi.com - Oficiální autorizovaný prodejce.'
  }
};

export default function Footer({ showBesecureEmail, besecureLocale, showClimateGuardInfo, climateGuardLocale = 'it' }: FooterProps) {
  const assistanceText = besecureLocale === 'pl' ? 'Potrzebujesz pomocy:' : 'Per assistenza:';
  const cgText = climateGuardTexts[climateGuardLocale] || climateGuardTexts.it;

  return (
    <footer className="w-full border-t border-gray-200 bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-12">
        {showBesecureEmail && (
          <div className="text-center mb-8 pb-8 border-b border-gray-200">
            <p className="text-sm text-gray-600">
              {assistanceText} <a href="mailto:assistenza@besecurepro.com" className="text-blue-600 hover:underline">assistenza@besecurepro.com</a>
            </p>
            <p className="text-xs text-gray-400 mt-2">
              {besecureLocale === 'pl'
                ? 'BeSecure Pro jest marką dystrybuowaną przez Ionizi.com'
                : 'BeSecure Pro è un marchio distribuito da Ionizi.com'}
            </p>
          </div>
        )}
        {showClimateGuardInfo && (
          <div className="text-center mb-8 pb-8 border-b border-gray-200">
            <p className="text-sm text-gray-600">
              {cgText.assistance} <a href="mailto:info@ionizi.com" className="text-blue-600 hover:underline">info@ionizi.com</a>
            </p>
            <p className="text-xs text-gray-400 mt-2">
              {cgText.brand}
            </p>
          </div>
        )}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Company Info */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/images/ionizi_logo.png"
                alt="Ionizi"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-sm text-gray-600 mb-4">
              Your trusted online store for home appliances and everyday essentials. Quality products delivered throughout Europe.
            </p>
          </div>

          {/* About */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">About Us</h3>
            <p className="text-sm text-gray-600">
              We specialize in providing high-quality air conditioners, heaters, kitchen appliances, and small household devices that make your life easier.
            </p>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Information</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/contact" className="text-sm text-gray-600 hover:text-orange-600 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-sm text-gray-600 hover:text-orange-600 transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-gray-600 hover:text-orange-600 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-gray-600 hover:text-orange-600 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600">
              © 2025 Ionizi. All rights reserved.
            </p>
            <p className="text-sm text-gray-600 mt-4 md:mt-0">
              Fast shipping across Europe
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
