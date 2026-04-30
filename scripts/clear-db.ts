import { config } from 'dotenv';
config({ path: '.env.local' });

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { projects } from '../lib/db/schema';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set in .env.local');
}

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql);

async function clearAndSeed() {
  console.log("Clearing existing projects from database...");
  await db.delete(projects);
  console.log("Database cleared.");
}

clearAndSeed().catch((err) => {
  console.error(err);
  process.exit(1);
});
