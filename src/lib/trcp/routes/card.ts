import { cardZod, type Board, type CardData, type SwimLane } from "$lib/models";
import { findById } from "$lib/utils/general";
import { z } from "zod";
import { boards } from "../data";
import { t } from "../t";

const router = t.router;
const publicProcedure = t.procedure;

export const cardRouter = router({
  cardById: publicProcedure
    .input(z.object({ boardId: z.string(), swimlaneId: z.string(), cardId: z.string() }))
    .query(({ input }) => {
      let card: CardData | null = null;
      const board = findById<Board>(boards, input.boardId);
      if (board) {
        const swimlane = findById<SwimLane>(board.swimlanes, input.swimlaneId)
        if (swimlane) {
          card = findById<CardData>(swimlane.cards, input.cardId)
        }
      }
      return card? {...card} : null;
    }),
    addCardToSwimlane: publicProcedure
    .input(z.object({ boardId: z.string(), swimlaneId: z.string(), card: cardZod }))
    .mutation(({ input }) => {
      // eslint-disable-next-line prefer-const
      let { boardId, swimlaneId, card } = { ...input }
      const board = findById<Board>(boards, boardId);
      let swimlane: SwimLane | null = null;
      if (board) {
        swimlane = findById<SwimLane>(board.swimlanes, swimlaneId)
        if (swimlane) {
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
      return {...swimlane};
    }),
  })
