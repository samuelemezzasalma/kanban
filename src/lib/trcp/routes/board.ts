import type { Board } from "$lib/models";
import { z } from "zod";
import { boards } from "../data";
import { t } from "../t";

const router = t.router;
const publicProcedure = t.procedure;

export const boardRouter = router({
  boardById: publicProcedure
    .input(getZodIdSchema())
    .query(({ input }) => {
      const board = boards.find((el: Board) => el.id === input.id) ?? null;
      return {...board};
    }),
  })

  function getZodIdSchema(): z.ZodObject<{ id: z.ZodString; }, "strip", z.ZodTypeAny, { id: string; }, { id: string; }> {
    return z.object({ id: z.string() });
  }