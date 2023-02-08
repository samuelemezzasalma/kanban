import { writable } from 'svelte/store';
import type { Card, Swimlane } from './trcp/client';


export const temporaryCard = writable<{isValid: boolean, card: Card}>({isValid: false, card: {title: ""}});

export const temporaryLane = writable<{isValid: boolean, lane: Swimlane}>({isValid: false, lane: {title: "", cards: []}});
