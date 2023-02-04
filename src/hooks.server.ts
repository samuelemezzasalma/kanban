import { createContext } from '$lib/trcp/context';
import { appRouter } from '$lib/trcp/router';
import type { Handle } from '@sveltejs/kit';
import { createTRPCHandle } from 'trpc-sveltekit';

export const handle: Handle = createTRPCHandle({ router: appRouter, createContext: createContext });
