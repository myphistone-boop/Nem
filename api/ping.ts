import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getDb } from './_db.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const sql = getDb();
  await sql`SELECT 1`;
  return res.json({ ok: true });
}
