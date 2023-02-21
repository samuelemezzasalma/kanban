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
      const { boardId, cardId, swimlaneId } = input
      let card: CardData | null | undefined = null;
      const board = findById<Board>(boards, boardId);
      if (board) {
        const swimlane = board.swimlanes.has(swimlaneId) ? board.swimlanes.get(swimlaneId) : undefined;
        if (swimlane) {
          card = swimlane.cards.has(cardId)? swimlane.cards.get(cardId) : undefined
        }
      }
      return card ? { ...card } : null;
    }),
  addCardToSwimlane: publicProcedure
    .input(z.object({ boardId: z.string(), swimlaneId: z.string(), card: cardZod }))
    .mutation(({ input }) => {
      const { boardId, swimlaneId, card } = input
      const board = findById<Board>(boards, boardId);
      let swimlane: SwimLane | null | undefined = null;
      if (board) {
        swimlane = board.swimlanes.has(swimlaneId) ? board.swimlanes.get(swimlaneId) : undefined;
        if (swimlane) {
          const id = `${Math.random()}`;
          swimlane.cards.set(id, {
            ...card,
            order: swimlane.cards.size + 1,
            lane_id: swimlane.id?? null,
            id,
          })
        } else {
          throw new Error("Swimlane not found");
        }
      } else {
        throw new Error("Board not found");
      }
      return { ...swimlane };
    }),
})
