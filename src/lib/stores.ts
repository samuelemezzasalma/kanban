import { writable } from 'svelte/store';
import type { CardData } from './models';
import type { Card, Swimlane } from './trcp/client';


export const temporaryCard = writable<{isValid: boolean, card: Card}>({isValid: false, card: {title: "", lane_id: null}});

export const temporaryLane = writable<{isValid: boolean, lane: Swimlane}>({isValid: false, lane: {title: "", board_id: null, cards: new Map<string, CardData>()}});
