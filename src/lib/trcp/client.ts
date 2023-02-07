import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import { createTRPCClient, type TRPCClientInit } from 'trpc-sveltekit';
import type { AppRouter, RouterInputs, RouterOutputs } from './router';

let browserClient: ReturnType<typeof createTRPCClient<AppRouter>>;

export function trpc(init?: TRPCClientInit) {
  if (typeof window === 'undefined') return createTRPCClient<AppRouter>({ init });
  if (!browserClient) browserClient = createTRPCClient<AppRouter>();
  return browserClient;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type ArrayType<T> = T extends (infer Item)[] ? Item : T

/* SWIMLANE */
export type SwimlaneByIdInput = RouterInputs['swimlaneById'];
export type Swimlane = RouterOutputs['swimlaneById'];
export type AddCardToSwimlaneInput = RouterInputs['addCardToSwimlane'];

/* BOARD */
export type BoardByIdInput = RouterInputs['boardById'];
export type Board = RouterOutputs['boardById'];

/* CARD */
export type CardByIdInput = RouterInputs['cardById'];
export type Card = RouterOutputs['cardById'];

// export type SwimlaneByIdInput = RouterInput['swimlaneById'];
// export type SwimlaneByIdOutput = RouterOutput['swimlaneById'];
