import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

import { TURSO_DATABASE_URL, TURSO_AUTH_TOKEN } from "$env/static/private";

export const client = createClient({
  url: TURSO_DATABASE_URL,
  authToken: TURSO_AUTH_TOKEN,
});

const db = drizzle(client, { logger: true });

export default db;
