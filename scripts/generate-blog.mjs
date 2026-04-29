import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const articles = JSON.parse(readFileSync(join(root, 'data', 'articles.json'), 'utf-8'));
const distDir = join(root, 'dist');

function renderContent(content) {
  return content.map(block => {
    if (block.startsWith('h2:')) return `<h2>${block.slice(3)}</h2>`;
    if (block.startsWith('h3:')) return `<h3>${block.slice(3)}</h3>`;
    if (block.startsWith('list:'))
      return `<ul>${block.slice(5).split('|').map(i => `<li>${i}</li>`).join('')}</ul>`;
    if (block.startsWith('faq:')) {
      const pairs = block.slice(4).split('|');
      let html = '<h2>Questions fréquentes</h2>';
      for (let i = 0; i < pairs.length; i += 2) {
        if (pairs[i] && pairs[i + 1]) {
          html += `<h3>${pairs[i]}</h3><p>${pairs[i + 1]}</p>`;
        }
      }
      return html;
    }
    return `<p>${block}</p>`;
  }).join('\n');
}

function buildFaqSchema(content) {
  const faqItems = content.filter(b => b.startsWith('faq:'));
  if (faqItems.length === 0) return '';
  const entities = [];
  for (const item of faqItems) {
    const pairs = item.slice(4).split('|');
    for (let i = 0; i < pairs.length; i += 2) {
      if (pairs[i] && pairs[i + 1]) {
        entities.push({
          "@type": "Question",
          "name": pairs[i],
          "acceptedAnswer": { "@type": "Answer", "text": pairs[i + 1] }
        });
      }
    }
  }
  return JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": entities });
}

function generateHTML(article) {
  const articleSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.description,
    "datePublished": article.date,
    "author": { "@type": "Organization", "name": "Nemphisia-web", "url": "https://nemphisia.com" },
    "publisher": { "@type": "Organization", "name": "Nemphisia-web" }
  });
  const faqSchema = buildFaqSchema(article.content);
  const canonical = `https://nemphisia.com/blog/${article.slug}`;

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${article.title} | Nemphisia-web</title>
  <meta name="description" content="${article.description}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${canonical}">
  <meta property="og:type" content="article">
  <meta property="og:title" content="${article.title}">
  <meta property="og:description" content="${article.description}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:site_name" content="Nemphisia-web">
  <meta property="og:locale" content="fr_FR">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${article.title}">
  <meta name="twitter:description" content="${article.description}">
  <script type="application/ld+json">${articleSchema}</script>
  ${faqSchema ? `<script type="application/ld+json">${faqSchema}</script>` : ''}
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23f97316' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z'/%3E%3Cpath d='m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z'/%3E%3Cpath d='M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0'/%3E%3Cpath d='M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5'/%3E%3C/svg%3E">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;700;900&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Inter', sans-serif; max-width: 720px; margin: 0 auto; padding: 40px 20px; color: #1e293b; line-height: 1.7; }
    h1 { font-family: 'Outfit', sans-serif; font-size: 2.2rem; line-height: 1.2; margin-bottom: 16px; }
    h2 { font-family: 'Outfit', sans-serif; font-size: 1.5rem; margin-top: 32px; margin-bottom: 12px; }
    h3 { font-size: 1.1rem; margin-top: 20px; margin-bottom: 8px; }
    p { color: #475569; margin-bottom: 12px; }
    ul { color: #475569; padding-left: 20px; margin-bottom: 12px; }
    li { margin-bottom: 6px; }
    a { color: #d946ef; }
    .meta { font-size: 0.85rem; color: #94a3b8; margin-bottom: 24px; }
    .desc { font-size: 1.1rem; color: #64748b; border-left: 4px solid #d946ef33; padding-left: 16px; margin-bottom: 32px; }
    .cta { text-align: center; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 32px; margin-top: 48px; }
    .cta a { display: inline-block; background: linear-gradient(to right, #c026d3, #f97316); color: white; padding: 12px 24px; border-radius: 999px; text-decoration: none; font-weight: bold; font-size: 0.9rem; }
    .back { display: inline-block; margin-bottom: 24px; font-size: 0.9rem; }
  </style>
</head>
<body>
  <a href="/blog/" class="back">&larr; Retour au blog</a>
  <div class="meta">Nemphisia-web &middot; ${new Date(article.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })} &middot; ${article.readTime} de lecture</div>
  <h1>${article.title}</h1>
  <div class="desc">${article.description}</div>
  <article>
    ${renderContent(article.content)}
  </article>
  <div class="cta">
    <p><strong>Besoin d'un site web sur mesure ?</strong></p>
    <p style="color:#64748b;font-size:0.9rem;margin-bottom:16px;">Contactez notre équipe pour un devis gratuit.</p>
    <a href="https://nemphisia.com/">Demander un devis</a>
  </div>
</body>
</html>`;
}

function generateBlogIndex() {
  const articleLinks = articles.map(a =>
    `<article style="border:1px solid #e2e8f0;border-radius:12px;padding:24px;margin-bottom:16px;">
      <div class="meta">${new Date(a.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })} &middot; ${a.readTime}</div>
      <h2 style="margin-top:4px;"><a href="/blog/${a.slug}/" style="text-decoration:none;color:#1e293b;">${a.title}</a></h2>
      <p>${a.description}</p>
      <a href="/blog/${a.slug}/">Lire l'article &rarr;</a>
    </article>`
  ).join('\n');

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Blog | Nemphisia-web - Guides création site internet & SEO</title>
  <meta name="description" content="Guides et conseils pour créer votre site internet, améliorer votre SEO et apparaître sur Google Maps. Articles par Nemphisia-web.">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://nemphisia.com/blog/">
  <meta property="og:type" content="website">
  <meta property="og:title" content="Blog | Nemphisia-web">
  <meta property="og:description" content="Guides et conseils pour créer votre site internet et améliorer votre SEO.">
  <meta property="og:url" content="https://nemphisia.com/blog/">
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23f97316' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z'/%3E%3Cpath d='m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z'/%3E%3Cpath d='M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0'/%3E%3Cpath d='M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5'/%3E%3C/svg%3E">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;700;900&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Inter', sans-serif; max-width: 720px; margin: 0 auto; padding: 40px 20px; color: #1e293b; line-height: 1.7; }
    h1 { font-family: 'Outfit', sans-serif; font-size: 2.2rem; text-align: center; margin-bottom: 8px; }
    h2 { font-family: 'Outfit', sans-serif; font-size: 1.3rem; }
    p { color: #475569; }
    a { color: #d946ef; }
    .meta { font-size: 0.85rem; color: #94a3b8; }
    .subtitle { text-align: center; color: #64748b; margin-bottom: 40px; font-size: 1.1rem; }
    .back { display: inline-block; margin-bottom: 24px; font-size: 0.9rem; }
  </style>
</head>
<body>
  <a href="/" class="back">&larr; Retour à l'accueil</a>
  <h1>Blog Nemphisia-web</h1>
  <p class="subtitle">Guides et conseils pour développer votre activité en ligne.</p>
  ${articleLinks}
</body>
</html>`;
}

// Generate all static pages
console.log('Generating static blog pages...');

// Blog index
const blogDir = join(distDir, 'blog');
mkdirSync(blogDir, { recursive: true });
writeFileSync(join(blogDir, 'index.html'), generateBlogIndex());
console.log('  /blog/index.html');

// Individual articles
for (const article of articles) {
  const articleDir = join(blogDir, article.slug);
  mkdirSync(articleDir, { recursive: true });
  writeFileSync(join(articleDir, 'index.html'), generateHTML(article));
  console.log(`  /blog/${article.slug}/index.html`);
}

console.log(`Done! Generated ${articles.length + 1} static pages.`);
