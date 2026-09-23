import { env } from '@/configs/env.js';
import { drizzle } from 'drizzle-orm/node-postgres';

export const db = drizzle(env.DATABASE_URL);
