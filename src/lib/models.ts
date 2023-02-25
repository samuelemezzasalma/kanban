import type { Author } from '@prisma/client';
import { z } from 'zod';

export const commentZod = z.object({
  id: z.string(),
  text: z.string(),
  // attachments: z.array(z.instanceof(Blob)).default(new Array<Blob>()).nullish()
});

// extract the inferred type like this
export type Comment = z.infer<typeof commentZod>;


export const cardZod = z.object({
  id: z.string(),
  title: z.string().min(1),
  description: z.string().nullish(),
  order: z.number(),
  tags: z.array(z.string()).default(new Array<string>()).nullish(),
  comments: z.array(commentZod).default(new Array<Comment>()).nullish(),
  laneId: z.number(),
  userId: z.number(),
  // attachments: z.array(z.instanceof(Blob)).default([])
});

// extract the inferred type like this
export type CardData = z.infer<typeof cardZod>;

export const swimlaneZod = z.object({
  id: z.string(),
  title: z.string().min(1),
  order: z.number(),
  cards: z.array(cardZod).default(new Array<CardData>()),
  board_id: z.string(),
  // cards: z.array(cardZod).default(new Array<CardData>()),
})
export type SwimLane = z.infer<typeof swimlaneZod>;

export const boardZod = z.object({
  id: z.string(),
  title: z.string().min(1),
  swimlanes: z.array(swimlaneZod).default(new Array<SwimLane>()),
  // z.array(swimlaneZod).default(new Array<SwimLane>()),
})

export type Board = z.infer<typeof boardZod>;

/* const authorZod = z.object<Author>({

  }
)

type Author = z.infer<typeof Author>;
const userData = {
  name: 'John',
  sruname: 'Doe',
};

const validUser = authorZod.parse(userData);
console.log(validUser); */
// Output: { name: 'John Doe', email: 'john.doe@example.com', age: 30, createdAt: [Date] }




