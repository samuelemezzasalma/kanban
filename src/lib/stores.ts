import { derived, writable, type Writable } from 'svelte/store';
import type { CardData } from './models';
import type { Board, Card, Swimlane } from './trcp/client';


export const board = writable<Board | null>(null)

export const lanes = derived(board, ($board) => $board?.swimlanes)


export const temporaryCard = writable<{isValid: boolean, card: Card}>({isValid: false, card: {id: "", title: "", lane_id: "", order: 0}});

export const temporaryLane = writable<{isValid: boolean, lane: Swimlane}>({isValid: false, lane: {id: "", title: "", board_id: "", order: 0, cards: new Array<CardData>()}});

export const cardHover: Writable<number | null> = writable<number | null>(null);

export const laneHoverDrag: Writable<number | null> = writable<number | null>(null);

export const laneDragged: Writable<number | null> = writable<number | null>(null);

export const cardDragged: Writable<{ idCard: string, laneIndex: number; cardIndex: number } | null> = writable<{ idCard: string, laneIndex: number; cardIndex: number } | null>(null);


/* 
  dropLane -> Board
  dropCard -> Lane

  startCardDrag -> Lane
  startLaneDrag -> Board

  let draggedCardRect: DOMRect | undefined; -> Card

  $: draggedCardHeight = draggedCardRect?.height ?? 0; -> Card

  let laneHover: number | null = null; -> set Lane read Lane
  
  
  
  let cardHover: number | null = null; -> set Card read Lane -> CROSS
  let laneHoverDrag: number | null = null; -> set Lane read Board -> CROSS

  let laneDragged: number | null = null; -> set Lane set Board -> CROSS
  let cardDragged: { laneIndex: number; cardIndex: number }; -> set Card set Lane -> CROSS


*/
