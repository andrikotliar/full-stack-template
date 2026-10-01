import { variables } from '../configs/variables.js';
import { drizzle } from 'drizzle-orm/node-postgres';

export const db = drizzle(variables.DATABASE_URL);
