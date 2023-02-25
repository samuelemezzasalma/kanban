import { swimlaneZod } from "$lib/models";
import prisma from "$lib/utils/prisma";
import type { Prisma, Swimlane } from "@prisma/client";
import { z } from "zod";
import { t } from "../t";

const router = t.router;
const publicProcedure = t.procedure;

export const laneRouter = router({
  create: publicProcedure
    .input(z.object({ boardId: z.number(), lane: swimlaneZod }))
    .mutation(async ({ input }) => {
      const { boardId, lane } = { ...input }
      const swimLaneInput: Prisma.SwimlaneCreateInput = {
        title: lane.title,
        positioning: lane.order,
        boardId: { connect: { id: boardId } }
      }
      const swimLane: Swimlane | null = await prisma.swimlane.create({ data: swimLaneInput })
      return swimLane;
    }),
  read: publicProcedure
    .input(z.object({ swimlaneId: z.number() }))
    .query(async ({ input }) => {
      const { swimlaneId } = { ...input }
      const lane: Swimlane | null = await prisma.swimlane.findUnique({ where: { id: swimlaneId } })
      return lane;
    }),
  update: publicProcedure
    .input(z.object({ swimlaneId: z.number(), title: z.string().min(1) }))
    .mutation(async ({ input }) => {
      const { swimlaneId, title } = { ...input }
      const lane: Swimlane | null = await prisma.swimlane.update({
        where: { id: swimlaneId },
        data: { title: title }
      })
      return lane;
    }),
  delete: publicProcedure
    .input(z.object({ swimlaneId: z.number() }))
    .mutation(async ({ input }) => {
      const { swimlaneId } = { ...input }
      const lane: Swimlane = await prisma.swimlane.delete({
        where: { id: swimlaneId }
      })
      return lane;
    })
})
