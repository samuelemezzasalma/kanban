import { cardZod, type Board, type CardData, type SwimLane } from '$lib/models';
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import { z } from 'zod';
import { t } from "./t";

const router = t.router;
const publicProcedure = t.procedure;


// eslint-disable-next-line prefer-const
let cardList: CardData[] = [
  {
    id: '1',
    description: null,
    title: 'This is the title of the card for the thing that needs to be done.',
    tags: ["Design"],
    attachments: [],
    comments: []
  },
];

// eslint-disable-next-line prefer-const
let swimlaneList: SwimLane[] = [
  {
    id: '1',
    title: 'Backlog',
    cards: [...cardList]
  }
]

// eslint-disable-next-line prefer-const
let board: Board = {
  id: '1',
  title: 'Team Project Board',
  swimlanes: [...swimlaneList]
}

export const boards: Board[] = [
  board
]

export const appRouter = router({
  boardById: publicProcedure
    .input(getZodIdSchema())
    .query(({ input }) => {
      const board = findById<Board>(boards, input.id);
      console.log(board);
      return board;
    }),
  swimlaneById: publicProcedure
    .input(z.object({ boardId: z.string(), swimlaneId: z.string() }))
    .query(({ input }) => {
      let swimlane: SwimLane | null = null;
      const board = findById<Board>(boards, input.boardId);
      if (board !== null) {
        swimlane = findById<SwimLane>(board.swimlanes, input.swimlaneId)
      }
      return swimlane;
    }),
  addCardToSwimlane: publicProcedure
    .input(z.object({ boardId: z.string(), swimlaneId: z.string(), card: cardZod }))
    .mutation(({ input }) => {
      let swimlane: SwimLane | null;
      // eslint-disable-next-line prefer-const
      let { boardId, swimlaneId, card } = { ...input }
      const board = findById<Board>(boards, boardId);
      if (board !== null) {
        swimlane = findById<SwimLane>(board.swimlanes, swimlaneId)
        if (swimlane !== null) {
          const id = `${Math.random()}`;
          const newCard: CardData = {
            ...card,
            id,
          };
          swimlane.cards = [...swimlane.cards, newCard]
        } else {
          throw new Error("Swimlane not found");
        }
      } else {
        throw new Error("Board not found");
      }
      return swimlane;
    }),
})

function findById<T extends { id: string | null }>(array: Array<T>, id: string) {
  return array.find((el: T) => el.id === id) ?? null;
}

function getZodIdSchema(): z.ZodObject<{ id: z.ZodString; }, "strip", z.ZodTypeAny, { id: string; }, { id: string; }> {
  return z.object({ id: z.string() });
}

export type AppRouter = typeof appRouter

export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;