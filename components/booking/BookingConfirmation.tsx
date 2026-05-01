import React from 'react';
import { CheckCircle, Calendar, Clock, Wrench, Hash } from 'lucide-react';

interface Props {
  data: {
    reference: string;
    date: string;
    time: string;
    service: string;
    business_name: string;
  };
  slug: string;
  onBack: () => void;
}

export const BookingConfirmation: React.FC<Props> = ({ data, slug, onBack }) => {
  const dateFormatted = new Date(data.date).toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <section className="min-h-screen bg-slate-50">
      <div className="max-w-xl mx-auto px-5 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden p-8">

          <div className="text-center mb-8">
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-green-50 flex items-center justify-center">
              <CheckCircle className="w-7 h-7 text-green-500" />
            </div>
            <h1 className="text-xl font-bold text-slate-900">Rendez-vous confirmé</h1>
            <p className="text-sm text-slate-500 mt-1">Un SMS de confirmation vous a été envoyé.</p>
          </div>

          <div className="rounded-xl border border-slate-200 divide-y divide-slate-100">
            <div className="flex items-center gap-3 px-5 py-4">
              <Hash className="w-4 h-4 text-slate-400" />
              <div>
                <p className="text-xs text-slate-400">Référence</p>
                <p className="text-sm font-semibold text-slate-900">{data.reference}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 px-5 py-4">
              <Calendar className="w-4 h-4 text-slate-400" />
              <div>
                <p className="text-xs text-slate-400">Date</p>
                <p className="text-sm font-medium text-slate-900">{dateFormatted}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 px-5 py-4">
              <Clock className="w-4 h-4 text-slate-400" />
              <div>
                <p className="text-xs text-slate-400">Heure</p>
                <p className="text-sm font-medium text-slate-900">{data.time}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 px-5 py-4">
              <Wrench className="w-4 h-4 text-slate-400" />
              <div>
                <p className="text-xs text-slate-400">Intervention</p>
                <p className="text-sm font-medium text-slate-900">{data.service}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-lg bg-blue-50 text-center">
            <p className="text-sm text-blue-800">
              Conservez votre référence <span className="font-bold">{data.reference}</span> pour gérer votre rendez-vous.
            </p>
          </div>

          <div className="mt-4 p-4 rounded-lg bg-green-50 text-center">
            <p className="text-sm text-green-700 font-medium">
              Votre rendez-vous est bien enregistré. Vous pouvez fermer cette page.
            </p>
          </div>

          <button
            onClick={onBack}
            className="w-full mt-6 py-3 rounded-lg border border-slate-200 text-slate-700 font-medium text-sm hover:bg-slate-50 transition-colors"
          >
            Retour à l'accueil
          </button>
        </div>

        <p className="text-center text-xs text-slate-400 mt-6">Propulsé par Nemphisia</p>
      </div>
    </section>
  );
};
