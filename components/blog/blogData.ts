import articlesData from '../../data/articles.json';

export interface BlogArticle {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  content: string[];
}

export const articles: BlogArticle[] = articlesData;
