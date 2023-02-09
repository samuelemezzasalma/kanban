import { cardZod, swimlaneZod, type Board, type CardData, type SwimLane } from '$lib/models';
import { findById } from '$lib/utils/general';
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import { z } from 'zod';
import type { Swimlane } from './client';
import { boards } from './data';
import { boardRouter } from './routes/board';
import { cardRouter } from './routes/card';
import { laneRouter } from './routes/lane';
import { t } from "./t";

const router = t.router;
const publicProcedure = t.procedure;

const appRouter = router({
  boards: boardRouter,
  lanes: laneRouter,
  cards: cardRouter
});


export type AppRouter = typeof appRouter

export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;