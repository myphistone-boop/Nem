import React, { useEffect } from 'react';
import { ArrowLeft, Clock, BookOpen } from 'lucide-react';
import { articles } from './blogData';

interface Props {
  slug: string;
}

export const BlogArticle: React.FC<Props> = ({ slug }) => {
  const article = articles.find((a) => a.slug === slug);

  useEffect(() => {
    if (!article) return;
    document.title = `${article.title} | Nemphisia-web`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', article.description);

    // Article schema
    const articleSchema = document.createElement('script');
    articleSchema.type = 'application/ld+json';
    articleSchema.id = 'article-schema';
    articleSchema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": article.title,
      "description": article.description,
      "datePublished": article.date,
      "author": { "@type": "Organization", "name": "Nemphisia-web", "url": "https://nemphisia.com" },
      "publisher": { "@type": "Organization", "name": "Nemphisia-web" }
    });
    document.head.appendChild(articleSchema);

    // FAQ schema
    const faqItems = article.content.filter(b => b.startsWith('faq:'));
    if (faqItems.length > 0) {
      const faqSchema = document.createElement('script');
      faqSchema.type = 'application/ld+json';
      faqSchema.id = 'faq-schema';
      faqSchema.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqItems.flatMap(item => {
          const pairs = item.slice(4).split('|');
          const result = [];
          for (let i = 0; i < pairs.length; i += 2) {
            if (pairs[i] && pairs[i + 1]) {
              result.push({
                "@type": "Question",
                "name": pairs[i],
                "acceptedAnswer": { "@type": "Answer", "text": pairs[i + 1] }
              });
            }
          }
          return result;
        })
      });
      document.head.appendChild(faqSchema);
    }

    return () => {
      document.getElementById('article-schema')?.remove();
      document.getElementById('faq-schema')?.remove();
    };
  }, [article]);

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

  const renderBlock = (block: string, i: number) => {
    if (block.startsWith('h2:'))
      return <h2 key={i} className="text-2xl font-bold text-textMain mt-10 mb-3 font-display">{block.slice(3)}</h2>;
    if (block.startsWith('h3:'))
      return <h3 key={i} className="text-lg font-bold text-textMain mt-6 mb-2">{block.slice(3)}</h3>;
    if (block.startsWith('list:'))
      return (
        <ul key={i} className="list-disc list-inside space-y-2 text-textMuted leading-relaxed">
          {block.slice(5).split('|').map((item, j) => <li key={j}>{item}</li>)}
        </ul>
      );
    if (block.startsWith('faq:')) {
      const pairs = block.slice(4).split('|');
      const faqs = [];
      for (let j = 0; j < pairs.length; j += 2) {
        if (pairs[j] && pairs[j + 1]) faqs.push({ q: pairs[j], a: pairs[j + 1] });
      }
      return (
        <div key={i} className="mt-10 space-y-4">
          <h2 className="text-2xl font-bold text-textMain font-display">Questions fréquentes</h2>
          {faqs.map((faq, j) => (
            <div key={j} className="border border-border rounded-xl p-5 bg-surface/50">
              <h3 className="font-bold text-textMain mb-2">{faq.q}</h3>
              <p className="text-textMuted text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      );
    }
    return <p key={i} className="text-textMuted leading-relaxed">{block}</p>;
  };

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

        <div className="space-y-5">
          {article.content.map(renderBlock)}
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
