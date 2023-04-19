import { swimlaneZod, type Board, type SwimLane } from "$lib/models";
import { conn } from "$lib/mongoose/models";
import { boardSchema, swimlaneSchema } from "$lib/mongoose/schemas";
import { findById } from "$lib/utils/general";
import { z } from "zod";
import { boards } from "../data";
import { t } from "../t";

const router = t.router;
const publicProcedure = t.procedure;

export const laneRouter = router({
  swimlaneById: publicProcedure
    .input(z.object({ boardId: z.string(), swimlaneId: z.string().min(1) }))
    .query(({ input }) => {
      let swimlane: SwimLane | null = null;
      const board = findById<Board>(boards, input.boardId);
      if (board) {
        swimlane = findById<SwimLane>(board.swimlanes, input.swimlaneId)
      }
      return swimlane ? { ...swimlane } : null;
    }),
  addLaneToBoard: publicProcedure
    .input(z.object({ boardId: z.string(), lane: swimlaneZod }))
    .mutation(async ({ input }) => {
      const { boardId, lane } = { ...input }
      const BoardModel = conn.model('Board', boardSchema);
      const board = await BoardModel.findById(boardId)
      board?.swimlanes?.push(lane)
      const savedBoard = await board?.save()
      const serializedData = JSON.stringify(savedBoard);
      return { data: serializedData };
    }),
  editLane: publicProcedure
    .input(z.object({ boardId: z.string(), swimlaneId: z.string().min(1), title: z.string().min(1) }))
    .mutation(({ input }) => {
      const { boardId, swimlaneId, title } = { ...input }
      const filter = { id: swimlaneId }
      const update = { title }
      const SwimlaneModel = conn.model('Swimlane', swimlaneSchema);
      const savedSwimlane = SwimlaneModel.findOneAndUpdate(filter, update, { lean: true, returnOriginal: false, upsert: false })
      const serializedData = JSON.stringify(savedSwimlane);

      return { data: serializedData };
    })
})
