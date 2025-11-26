'use client';

import React, { useState, useEffect } from 'react';
import { Shield, Truck, CheckCircle } from 'lucide-react';

interface LeadFormProps {
  variant?: 'inline' | 'modal';
}

export default function LeadForm({ variant = 'inline' }: LeadFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(variant === 'inline');

  useEffect(() => {
    const handleOpenForm = () => setIsOpen(true);
    window.addEventListener('openOrderForm', handleOpenForm);
    return () => window.removeEventListener('openOrderForm', handleOpenForm);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Redirect to thank you page
    window.location.href = '/ty-it';
  };

  if (!isOpen && variant === 'modal') return null;

  return (
    <div id="order-form" className="bg-gradient-to-br from-[#1a2744] to-[#0f172a] rounded-3xl p-8 shadow-2xl">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-bold mb-4">
          <CheckCircle size={16} />
          Disponibile - Spedizione Immediata
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Ordina Ora - Paga alla Consegna
        </h3>
        <p className="text-gray-400">
          Compila il modulo e ricevi il kit in 24-48h
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Nome e Cognome *
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Mario Rossi"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Numero di Telefono *
          </label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="+39 333 1234567"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Indirizzo di Spedizione *
          </label>
          <input
            type="text"
            required
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Via Roma 1, 00100 Roma (RM)"
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-500 hover:bg-green-600 disabled:bg-green-500/50 text-white font-bold py-4 px-8 rounded-xl text-lg shadow-lg shadow-green-900/30 transition-all flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Invio in corso...
              </>
            ) : (
              <>
                <Shield size={20} />
                ORDINA ORA - 69,90€
              </>
            )}
          </button>
        </div>

        <div className="flex items-center justify-center gap-6 pt-4 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <Truck size={16} className="text-blue-400" />
            Spedizione Gratuita
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle size={16} className="text-green-400" />
            Paga alla Consegna
          </div>
        </div>
      </form>
    </div>
  );
}
