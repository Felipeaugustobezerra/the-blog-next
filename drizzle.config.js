import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/drizzle/schemas.ts',
  out: './src/db/drizzle/migrations',
  dialect: 'sqlite',
  dbCredentials: {
    url: './db.sqlite3',
  },
});
