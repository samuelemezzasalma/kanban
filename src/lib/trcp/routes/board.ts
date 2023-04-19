import type { IBoard } from "$lib/mongoose/documents";
import { conn } from "$lib/mongoose/models";
import { boardSchema } from "$lib/mongoose/schemas";
import { Types } from "mongoose";
import { z } from "zod";
import { t } from "../t";
import transformer from "$lib/utils/trpc";

const router = t.router;
const publicProcedure = t.procedure;

export const boardRouter = router({
  boardById: publicProcedure
    .input(z.object({ id: z.instanceof(Types.ObjectId) }))
    .query(async ({ input }) => {
      const BoardModel = conn.model('Board', boardSchema)
      const board: IBoard | null = await BoardModel.findOne<IBoard>({ id: input.id }).exec()
      // const board = boards.find((el: Board) => el.id === input.id) ?? null;
      return board;
    }),
  boardByTitle: publicProcedure
    .input(z.object({ title: z.string() }))
    .query(async ({ input }) => {
      const { title } = { ...input };
      console.log(title);
      const BoardModel = conn.model('Board', boardSchema);
      const board: IBoard | null = await BoardModel.findOne<IBoard>({ title: title }).lean().exec()
      const serializedData = JSON.stringify(board);
      
      // const board = Board.findOne<IBoard>({title: title})
      // const board = boards.find((el: Board) => el.id === input.id) ?? null;


      return { data: serializedData };
    }),
})

/* function getZodIdSchema(): z.ZodObject<{ id: z.ZodString; }, "strip", z.ZodTypeAny, { id: string; }, { id: string; }> {
  return z.object({ id: z.string() });
} */