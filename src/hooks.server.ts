import { createContext } from '$lib/trcp/context';
import { appRouter } from '$lib/trcp/router';
import type { Handle } from '@sveltejs/kit';
import { createTRPCHandle } from 'trpc-sveltekit';
import { sequence } from '@sveltejs/kit/hooks';

/* const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'postgres',
  port: 5432,
}); */

/* export async function query(sql: string, values?: any[]) {
  const client = new PrismaClient()
  try {
    const result = await client.query(sql, values);
    return result.rows;
  } finally {
    client.release();
  }
} */


export const trpcHandle: Handle = createTRPCHandle({ router: appRouter, createContext: createContext, onError: ({ type, path, error }) =>
console.error(`Encountered error while trying to process ${type} @ ${path}:`, error)
});
 
/* query,  */
export const handle = sequence(trpcHandle);




