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
    <section className="pt-32 pb-14 bg-background min-h-screen">
      <div className="container mx-auto px-6 max-w-lg">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/10 flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold font-display text-textMain">Rendez-vous confirmé !</h1>
          <p className="text-textMuted mt-2">Un SMS de confirmation vous a été envoyé.</p>
        </div>

        <div className="rounded-2xl border border-border bg-surface/50 p-6 space-y-4">
          <div className="flex items-center gap-3">
            <Hash className="w-5 h-5 text-fuchsia-500" />
            <div>
              <p className="text-xs text-textMuted">Référence</p>
              <p className="text-lg font-bold text-textMain">{data.reference}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-fuchsia-500" />
            <div>
              <p className="text-xs text-textMuted">Date</p>
              <p className="font-medium text-textMain">{dateFormatted}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-fuchsia-500" />
            <div>
              <p className="text-xs text-textMuted">Heure</p>
              <p className="font-medium text-textMain">{data.time}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Wrench className="w-5 h-5 text-fuchsia-500" />
            <div>
              <p className="text-xs text-textMuted">Intervention</p>
              <p className="font-medium text-textMain">{data.service}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 rounded-xl bg-fuchsia-500/5 border border-fuchsia-500/10 text-center">
          <p className="text-sm text-textMuted">
            Conservez votre référence <span className="font-bold text-fuchsia-500">{data.reference}</span> pour gérer votre rendez-vous.
          </p>
        </div>

        <div className="mt-6 p-4 rounded-xl bg-green-500/5 border border-green-500/10 text-center">
          <p className="text-sm text-green-600 font-medium">
            Votre rendez-vous est bien enregistré. Vous pouvez fermer cette page en toute tranquillité.
          </p>
        </div>

        <button
          onClick={onBack}
          className="w-full mt-6 py-3 rounded-full border border-border text-textMain font-medium text-sm hover:border-fuchsia-500/30 transition-colors"
        >
          Retour
        </button>
      </div>
    </section>
  );
};
