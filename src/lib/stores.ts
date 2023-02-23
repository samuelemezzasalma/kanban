import { writable, type Writable } from 'svelte/store';
import type { CardData } from './models';
import type { Card, Swimlane } from './trcp/client';


export const temporaryCard = writable<{isValid: boolean, card: Card}>({isValid: false, card: {title: "", lane_id: null}});

export const temporaryLane = writable<{isValid: boolean, lane: Swimlane}>({isValid: false, lane: {title: "", board_id: null, cards: new Map<string, CardData>()}});

export const cardHover: Writable<number | null> = writable<number | null>(null);

export const laneHoverDrag: Writable<number | null> = writable<number | null>(null);

export const laneDragged: Writable<number | null> = writable<number | null>(null);

export const cardDragged: Writable<{ laneIndex: number; cardIndex: number } | null> = writable<{ laneIndex: number; cardIndex: number } | null>(null);


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
