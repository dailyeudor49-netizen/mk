import React from 'react';

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-bold text-lg mb-3">Kizbuy</h3>
            <p className="text-gray-400 text-sm mb-3">
              Premium tehnološki pripomočki in elektronika po veleprodajnih cenah. Hitra dostava po vsem svetu.
            </p>
            <div className="text-gray-400 text-sm space-y-1">
              <p>info@kizbuy.com</p>
              <p>27 Buchanan Enterprise Centre, Glasgow</p>
              <p>G4 0TQ, United Kingdom</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Izdelki</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="https://kizbuy.com/products#speakers" className="hover:text-amber-400">Zvočniki</a></li>
              <li><a href="https://kizbuy.com/products#power" className="hover:text-amber-400">Power Bank</a></li>
              <li><a href="https://kizbuy.com/products#wearables" className="hover:text-amber-400">Nosljivi pripomočki</a></li>
              <li><a href="https://kizbuy.com/products#accessories" className="hover:text-amber-400">Dodatki</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Podjetje</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="https://kizbuy.com/about" className="hover:text-amber-400">O nas</a></li>
              <li><a href="https://kizbuy.com/products" className="hover:text-amber-400">Izdelki</a></li>
              <li><a href="https://kizbuy.com/contact" className="hover:text-amber-400">Kontakt</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Pravne informacije</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="https://kizbuy.com/privacy-policy" className="hover:text-amber-400">Zasebnost</a></li>
              <li><a href="https://kizbuy.com/cookie-policy" className="hover:text-amber-400">Piškotki</a></li>
              <li><a href="https://kizbuy.com/terms-of-service" className="hover:text-amber-400">Pogoji</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-800 text-center">
          <p className="text-amber-400 font-semibold mb-2">TV Box Pro je registrirana blagovna znamka podjetja Kizbuy Ltd.</p>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-gray-500">
          <p>&copy; {year} Kizbuy Ltd. Vse pravice pridržane.</p>
          <div className="flex gap-4">
            <span>VAT: GB 841 3625 78</span>
            <span>Registrirano v Angliji</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
