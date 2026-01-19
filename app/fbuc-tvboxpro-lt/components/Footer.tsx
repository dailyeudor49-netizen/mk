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
              Premium technologiniai įtaisai ir elektronika didmeninėmis kainomis. Greitas pristatymas visame pasaulyje.
            </p>
            <div className="text-gray-400 text-sm space-y-1">
              <p>info@kizbuy.com</p>
              <p>27 Buchanan Enterprise Centre, Glasgow</p>
              <p>G4 0TQ, United Kingdom</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Produktai</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="https://kizbuy.com/products#speakers" className="hover:text-amber-400">Garsiakalbiai</a></li>
              <li><a href="https://kizbuy.com/products#power" className="hover:text-amber-400">Power Bank</a></li>
              <li><a href="https://kizbuy.com/products#wearables" className="hover:text-amber-400">Išmanieji priedai</a></li>
              <li><a href="https://kizbuy.com/products#accessories" className="hover:text-amber-400">Priedai</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Įmonė</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="https://kizbuy.com/about" className="hover:text-amber-400">Apie mus</a></li>
              <li><a href="https://kizbuy.com/products" className="hover:text-amber-400">Produktai</a></li>
              <li><a href="https://kizbuy.com/contact" className="hover:text-amber-400">Kontaktai</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Teisinė informacija</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="https://kizbuy.com/privacy-policy" className="hover:text-amber-400">Privatumas</a></li>
              <li><a href="https://kizbuy.com/cookie-policy" className="hover:text-amber-400">Slapukai</a></li>
              <li><a href="https://kizbuy.com/terms-of-service" className="hover:text-amber-400">Sąlygos</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-800 text-center">
          <p className="text-amber-400 font-semibold mb-2">TV Box Pro yra registruotas Kizbuy Ltd prekės ženklas.</p>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-gray-500">
          <p>&copy; {year} Kizbuy Ltd. Visos teisės saugomos.</p>
          <div className="flex gap-4">
            <span>VAT: GB 841 3625 78</span>
            <span>Registruota Anglijoje</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
