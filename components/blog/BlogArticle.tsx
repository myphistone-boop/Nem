import React from 'react';
import { ArrowLeft, Clock, BookOpen } from 'lucide-react';
import { articles } from './blogData';

interface Props {
  slug: string;
}

export const BlogArticle: React.FC<Props> = ({ slug }) => {
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <section className="pt-32 pb-14 bg-background min-h-screen">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <h1 className="text-3xl font-bold text-textMain mb-4">Article introuvable</h1>
          <a href="?page=blog" className="text-fuchsia-500 hover:underline">Retour au blog</a>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-32 pb-14 bg-background min-h-screen">
      <article className="container mx-auto px-6 max-w-3xl">
        <a href="?page=blog" className="inline-flex items-center gap-2 text-sm text-textMuted hover:text-fuchsia-500 transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Retour au blog
        </a>

        <div className="flex items-center gap-4 text-xs text-textMuted mb-4">
          <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" /> Nemphisia-web</span>
          <span>{new Date(article.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {article.readTime}</span>
        </div>

        <h1 className="text-3xl lg:text-4xl font-bold font-display text-textMain mb-6 leading-tight">{article.title}</h1>
        <p className="text-lg text-textMuted mb-10 border-l-4 border-fuchsia-500/30 pl-4">{article.description}</p>

        <div className="prose-custom space-y-5">
          {article.content.map((block, i) => {
            if (block.startsWith('h2:')) {
              return <h2 key={i} className="text-2xl font-bold text-textMain mt-10 mb-3 font-display">{block.slice(3)}</h2>;
            }
            if (block.startsWith('h3:')) {
              return <h3 key={i} className="text-lg font-bold text-textMain mt-6 mb-2">{block.slice(3)}</h3>;
            }
            return <p key={i} className="text-textMuted leading-relaxed">{block}</p>;
          })}
        </div>

        <div className="mt-14 p-6 bg-surface/80 border border-border rounded-2xl text-center">
          <p className="text-textMain font-bold mb-2">Besoin d'un site web sur mesure ?</p>
          <p className="text-textMuted text-sm mb-4">Contactez notre équipe pour un devis gratuit.</p>
          <a href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-fuchsia-600 to-orange-500 text-white rounded-full font-bold text-sm hover:opacity-90 transition-opacity">
            Demander un devis
          </a>
        </div>
      </article>
    </section>
  );
};
