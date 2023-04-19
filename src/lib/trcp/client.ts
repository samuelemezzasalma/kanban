import { createTRPCClient, type TRPCClientInit } from 'trpc-sveltekit';
import type { AppRouter, RouterInputs, RouterOutputs } from './router';
import transformer from '$lib/utils/trpc';


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
export type SwimlaneByIdInput = RouterInputs['lanes']['swimlaneById'];
export type SwimlaneByOutput = RouterOutputs['lanes']['swimlaneById'];
export type AddCardToSwimlaneInput = RouterInputs['cards']['addCardToSwimlane'];
export type EditLaneInput = RouterInputs['lanes']['editLane']

/* BOARD */
export type BoardByIdInput = RouterInputs['boards']['boardById'];
export type BoardByIdOutput = RouterOutputs['boards']['boardById'];

export type BoardByTitleInput = RouterInputs['boards']['boardByTitle'];
export type BoardByTitleOutput = RouterOutputs['boards']['boardByTitle'];

/* CARD */
export type CardByIdInput = RouterInputs['cards']['cardById'];
export type CardByIdOutput = RouterOutputs['cards']['cardById'];

// export type SwimlaneByIdInput = RouterInput['swimlaneById'];
// export type SwimlaneByIdOutput = RouterOutput['swimlaneById'];
