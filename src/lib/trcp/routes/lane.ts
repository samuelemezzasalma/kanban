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
      const { boardId, swimlaneId } = { ...input }
      let swimlane: SwimLane | undefined;
      const board = findById<Board>(boards, boardId);
      if (board) {
        swimlane = board.swimlanes.has(swimlaneId)? board.swimlanes.get(swimlaneId): undefined;
        // swimlane = findById<SwimLane>(board.swimlanes, input.swimlaneId)
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
          board_id: board.id?? null,
          id,
        };
        board.swimlanes.set(id, newLane)
      }
      return {...board};
    }),
    editLane: publicProcedure
    .input(z.object({ boardId: z.string(), swimlaneId : z.string().min(1), title: z.string().min(1) }))
    .mutation(({ input }) => {
      const { boardId, swimlaneId, title } = { ...input }
      let swimlane: SwimLane | null | undefined = null;
      const board = findById<Board>(boards, boardId);
      if (board?.swimlanes && board?.swimlanes !== null) {
        swimlane = board.swimlanes.has(swimlaneId)? board.swimlanes.get(swimlaneId): undefined;
        // swimlane = findById<SwimLane>(board?.swimlanes, swimlaneId)
        if (swimlane && title) {
          swimlane.title = title
          // board.swimlanes = [...board.swimlanes, {...swimlane, title}]
        }
      }
      return swimlane
    })
  })
