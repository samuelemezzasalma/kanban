import type { Board, CardData, SwimLane } from "$lib/models";

// eslint-disable-next-line prefer-const
let cardList: CardData[] = [
  {
    id: '1',
    description: "",
    title: 'This is the title of the card for the thing that needs to be done.',
    tags: ["Design"],
    comments: []
  },
];

// eslint-disable-next-line prefer-const
let swimlaneList: SwimLane[] = [
  {
    id: '1',
    title: 'Backlog',
    cards: [...cardList]
  }
]

// eslint-disable-next-line prefer-const
export const boards: Board[] = [
  {
    id: '1',
    title: 'Team Project Board',
    swimlanes: [...swimlaneList]
  }
]