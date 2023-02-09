import { swimlaneZod, type Board, type SwimLane } from "$lib/models";
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
      return swimlane? {...swimlane} : null;
    }),
    addLaneToBoard: publicProcedure
    .input(z.object({ boardId: z.string(), lane: swimlaneZod }))
    .mutation(({ input }) => {
      const { boardId, lane } = { ...input }
      let newLane: SwimLane | null = null;
      const board = findById<Board>(boards, boardId);
      if (board) {
        const id = `${Math.random()}`;
        newLane = {
          ...lane,
          id,
        };
        board.swimlanes = [...board.swimlanes, newLane]
      }
      return {...board};
    }),
    editLane: publicProcedure
    .input(z.object({ boardId: z.string(), swimlaneId : z.string().min(1), title: z.string().min(1) }))
    .mutation(({ input }) => {
      const { boardId, swimlaneId, title } = { ...input }
      let swimlane: SwimLane | null = null;
      const board = findById<Board>(boards, boardId);
      if (board?.swimlanes && board?.swimlanes !== null) {
        swimlane = findById<SwimLane>(board?.swimlanes, swimlaneId)
        if (swimlane && title) {
          swimlane.title = title
          // board.swimlanes = [...board.swimlanes, {...swimlane, title}]
        }
      }
      return swimlane
    })
  })
