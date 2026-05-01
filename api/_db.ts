import { neon } from '@neondatabase/serverless';

export function getDb() {
  const url = process.env.DATABASE_URL || process.env.nemphisia_storage_DATABASE_URL;
  if (!url) throw new Error('DATABASE_URL not configured');
  return neon(url);
}
