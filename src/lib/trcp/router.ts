import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import { boardRouter } from './routes/board';
import { cardRouter } from './routes/card';
import { laneRouter } from './routes/lane';
import { t } from "./t";
import transformer from '$lib/utils/trpc';

const router = t.router;

export const appRouter = router({
  boards: boardRouter,
  lanes: laneRouter,
  cards: cardRouter
});


export type AppRouter = typeof appRouter

export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;