import type { Board } from "$lib/models";
import { query } from "$lib/utils/pg_client";
import type { QueryConfig } from "pg";
import { z } from "zod";
import { boards } from "../data";
import { t } from "../t";

const router = t.router;
const publicProcedure = t.procedure;

const selectBoard: QueryConfig = {
  text: 'select b.*, s.*, c.* from "Board" b join "Swimlane" s ON b.id = s.board join "Card" c on s.id = c.swimlane where b.id = $1',
  values: [1],
}


export const boardRouter = router({
  boardById: publicProcedure
    .input(getZodIdSchema())
    .query(async ({ input }) => {
      // selectBoard.values?.push(1)
      await query(selectBoard);
      const board = boards.find((el: Board) => el.id === input.id) ?? null;
      return { ...board };
    }),
})



function getZodIdSchema(): z.ZodObject<{ id: z.ZodString; }, "strip", z.ZodTypeAny, { id: string; }, { id: string; }> {
  return z.object({ id: z.string() });
}