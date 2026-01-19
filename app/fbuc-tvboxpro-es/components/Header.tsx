import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white py-4 shadow-md sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 flex justify-between items-center">
            <div className="font-black text-2xl tracking-tighter text-red-600 italic">
                TV BOX <span className="text-black">PRO</span>
            </div>
            <div className="hidden md:block font-bold text-green-700">
                Atención al cliente 24/7
            </div>
        </div>
    </header>
  );
};
