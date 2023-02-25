import prisma from "$lib/utils/prisma";
import type { Board } from "@prisma/client";
import { z } from "zod";
import { t } from "../t";

const router = t.router;
const publicProcedure = t.procedure;

export const boardRouter = router({
  boardById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const board: Board | null = await prisma.board.findUnique({ where: { id: input.id } })
      return board;
    }),
})