import { cardZod, type Board, type CardData, type SwimLane } from "$lib/models";
import type { iCard, ISwimlane } from "$lib/mongoose/documents";
import { conn } from "$lib/mongoose/models";
import { cardSchema, swimlaneSchema } from "$lib/mongoose/schemas";
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
    .input(z.object({ swimlaneId: z.string(), card: cardZod }))
    .mutation(async ({ input }) => {
      // eslint-disable-next-line prefer-const
      let { swimlaneId, card } = { ...input }

      const SwimlaneModel = conn.model('Swimlane', swimlaneSchema);
      const swimlane = await SwimlaneModel.findById(swimlaneId)
      swimlane?.cards?.push(card)
      const savedSwinlane = await swimlane?.save()
      const serializedData = JSON.stringify(savedSwinlane);
      
      return { data: serializedData };
    }),
  })
