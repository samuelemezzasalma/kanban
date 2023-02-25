import { createTRPCClient, type TRPCClientInit } from 'trpc-sveltekit';
import type { AppRouter, RouterInputs, RouterOutputs } from './router';
import transformer from "$lib/utils/trpc";

let browserClient: ReturnType<typeof createTRPCClient<AppRouter>>;

export function trpc(init?: TRPCClientInit) {
  
  const client = createTRPCClient<AppRouter>({ transformer, init });
  if (typeof window === 'undefined') return client;
  if (!browserClient) browserClient = client;
  return browserClient;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type ArrayType<T> = T extends (infer Item)[] ? Item : T

/* SWIMLANE */
export type SwimlaneByIdInput = RouterInputs['lanes']['read'];
export type Swimlane = RouterOutputs['lanes']['read'];
export type AddCardToSwimlaneInput = RouterInputs['cards']['create'];
export type EditLaneInput = RouterInputs['lanes']['update']

/* BOARD */
export type BoardByIdInput = RouterInputs['boards']['boardById'];
export type Board = RouterOutputs['boards']['boardById'];

/* CARD */
export type CardByIdInput = RouterInputs['cards']['read'];
export type Card = RouterOutputs['cards']['read'];

// export type SwimlaneByIdInput = RouterInput['swimlaneById'];
// export type SwimlaneByIdOutput = RouterOutput['swimlaneById'];
