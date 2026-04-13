import React from 'react';
import { ArrowRight, BookOpen, Clock } from 'lucide-react';
import { articles } from './blogData';
import { Card } from '../ui/Card';

export const BlogList: React.FC = () => {
  return (
    <section className="pt-32 pb-14 bg-background min-h-screen">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-500 text-sm font-medium mb-4">
            <BookOpen className="w-4 h-4" />
            <span>Blog</span>
          </div>
          <h1 className="text-3xl lg:text-5xl font-bold font-display text-textMain mb-4">
            Nos <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-orange-400">articles</span>
          </h1>
          <p className="text-textMuted text-lg">Conseils et guides pour développer votre activité en ligne.</p>
        </div>

        <div className="flex flex-col gap-6">
          {articles.map((article) => (
            <a key={article.slug} href={`?article=${article.slug}`} className="block group">
              <Card className="p-6 lg:p-8 bg-surface/50 border-border hover:border-fuchsia-500/30 transition-all">
                <div className="flex items-center gap-4 text-xs text-textMuted mb-3">
                  <span>{new Date(article.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {article.readTime}</span>
                </div>
                <h2 className="text-xl lg:text-2xl font-bold text-textMain mb-2 group-hover:text-fuchsia-500 transition-colors">{article.title}</h2>
                <p className="text-textMuted mb-4">{article.description}</p>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-fuchsia-500">
                  Lire l'article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
