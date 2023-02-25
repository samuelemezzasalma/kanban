import { cardZod } from "$lib/models";
import prisma from "$lib/utils/prisma";
import type { Card, Prisma } from "@prisma/client";
import { z } from "zod";
import { t } from "../t";

const router = t.router;
const publicProcedure = t.procedure;

export const cardRouter = router({
  create: publicProcedure
    .input(z.object({ swimlaneId: z.number(), cardZ: cardZod }))
    .mutation(async ({ input }) => {
      const { swimlaneId, cardZ } = input
      const cardInput: Prisma.CardCreateInput = {
        title: cardZ.title,
        positioning: cardZ.order,
        authorId: { connect: { id: cardZ.userId } },
        swimlaneId: { connect: { id: swimlaneId } }
      }
      const card: Card | null = await prisma.card.create({ data: cardInput })
      return card;
    }),
  read: publicProcedure
    .input(z.object({ cardId: z.number() }))
    .query(async ({ input }) => {
      const { cardId } = input
      const card: Card | null = await prisma.card.findUnique({ where: { id: cardId } })
      return card;
    }),

})
