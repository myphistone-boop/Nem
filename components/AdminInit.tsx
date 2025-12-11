
import React, { useState } from 'react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { Terminal, CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';

export const AdminInit: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [logs, setLogs] = useState<string[]>([]);

  const runInit = async () => {
    setStatus('loading');
    setLogs(['⏳ Lancement de la requête...']);

    try {
      const res = await fetch('/api/init-stripe', { method: 'POST' });
      const data = await res.json();

      if (data.logs) {
        setLogs(prev => [...prev, ...data.logs]);
      }

      if (res.ok && data.success) {
        setStatus('success');
      } else {
        setStatus('error');
        setLogs(prev => [...prev, `❌ Erreur: ${data.error || 'Erreur inconnue'}`]);
      }
    } catch (err: any) {
      setStatus('error');
      setLogs(prev => [...prev, `❌ Erreur réseau: ${err.message}`]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8 flex flex-col items-center justify-center font-mono">
      <Card className="max-w-2xl w-full bg-slate-900 border-slate-800 p-8">
        <div className="flex items-center gap-4 mb-8 border-b border-slate-800 pb-6">
          <div className="p-3 bg-fuchsia-500/10 rounded-lg text-fuchsia-400">
            <Terminal className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Admin / Initialisation Stripe</h1>
            <p className="text-slate-400">Création automatique des Produits & Prix via l'API</p>
          </div>
        </div>

        <div className="mb-8 p-4 bg-slate-950 rounded-lg border border-slate-800 font-mono text-sm h-64 overflow-y-auto">
          {logs.length === 0 && <span className="text-slate-600 italic">En attente d'exécution...</span>}
          {logs.map((log, i) => (
            <div key={i} className="mb-1 text-slate-300 border-l-2 border-slate-800 pl-2">
              {log}
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={() => window.location.href = '/'}>
            Retour au site
          </Button>
          
          <Button 
            variant="primary" 
            onClick={runInit} 
            disabled={status === 'loading' || status === 'success'}
          >
            {status === 'loading' && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {status === 'success' && <CheckCircle className="w-4 h-4 mr-2" />}
            {status === 'error' && <AlertTriangle className="w-4 h-4 mr-2" />}
            
            {status === 'idle' && 'Lancer l\'initialisation'}
            {status === 'loading' && 'Traitement...'}
            {status === 'success' && 'Terminé !'}
            {status === 'error' && 'Réessayer'}
          </Button>
        </div>
      </Card>
    </div>
  );
};
