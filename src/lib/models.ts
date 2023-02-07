import { z } from 'zod';

export const commentZod = z.object({
  id: z.string().nullable(),
  text: z.string(),
  // attachments: z.array(z.instanceof(Blob)).default(new Array<Blob>()).nullish()
});

// extract the inferred type like this
export type Comment = z.infer<typeof commentZod>;


export const cardZod = z.object({
  id: z.string().nullish(),
  title: z.string().min(1),
  description: z.string().nullish(),
  tags: z.array(z.string()).default(new Array<string>()).nullish(),
  comments: z.array(commentZod).default(new Array<Comment>()).nullish(),
  // attachments: z.array(z.instanceof(Blob)).default([])
});

// extract the inferred type like this
export type CardData = z.infer<typeof cardZod>;

export const swimlaneZod = z.object({
  id: z.string().nullish(),
  title: z.string().min(1),
  cards: z.array(cardZod).default(new Array<CardData>()),
})
export type SwimLane = z.infer<typeof swimlaneZod>;

export const boardZod = z.object({
  id: z.string().nullish(),
  title: z.string().min(1),
  swimlanes: z.array(swimlaneZod).default(new Array<SwimLane>()),
})

export type Board = z.infer<typeof boardZod>;