import { neon } from '@neondatabase/serverless';

async function withRetry<T>(fn: () => Promise<T>, maxAttempts = 3): Promise<T> {
  let lastError: any;
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (err: any) {
      lastError = err;
      const msg = String(err?.message || '');
      const isRetryable =
        msg.includes('Control plane') ||
        msg.includes('fetch failed') ||
        msg.includes('ECONNRESET') ||
        err?.code === 'ECONNRESET' ||
        err?.['neon:retryable'] === true;
      if (!isRetryable || attempt === maxAttempts - 1) throw err;
      const delay = 500 * Math.pow(2, attempt);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
  throw lastError;
}

export function getDb(): any {
  const url = process.env.DATABASE_URL || process.env.nemphisia_storage_DATABASE_URL;
  if (!url) throw new Error('DATABASE_URL not configured');

  const rawSql = neon(url);

  const wrappedSql: any = (strings: any, ...values: any[]) => {
    return withRetry(() => (rawSql as any)(strings, ...values));
  };

  wrappedSql.query = (text: string, params?: any[]) => {
    return withRetry(() => (rawSql as any).query(text, params));
  };

  return wrappedSql;
}
