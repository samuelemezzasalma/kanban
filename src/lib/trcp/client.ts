import { createTRPCClient, type TRPCClientInit } from 'trpc-sveltekit';
import type { AppRouter } from './router';

let browserClient: ReturnType<typeof createTRPCClient<AppRouter>>;

export function trpc(init?: TRPCClientInit) {
  if (typeof window === 'undefined') return createTRPCClient<AppRouter>({ init });
  if (!browserClient) browserClient = createTRPCClient<AppRouter>();
  return browserClient;
}
