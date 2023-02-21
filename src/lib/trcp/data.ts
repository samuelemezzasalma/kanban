import type { Board, CardData, SwimLane } from "$lib/models";

// eslint-disable-next-line prefer-const
let cardMap: Map<string, CardData> = new Map(
  [
    ['1', {
    id: '1',
    description: "",
    order: 1,
    title: 'This is the title of the card for the thing that needs to be done.',
    tags: ["Design"],
    lane_id: '1',
    comments: []
  }]
]
);

// eslint-disable-next-line prefer-const
let swimlaneMap: Map<string, SwimLane> = new Map([
  ['1', {
    id: '1',
    order: 1,
    title: 'Backlog',
    board_id: '1',
    cards: cardMap
  }]
]) 

// eslint-disable-next-line prefer-const
export const boards: Board[] = [
  {
    id: '1',
    title: 'Team Project Board',
    swimlanes: swimlaneMap
  }
]