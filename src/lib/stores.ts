import { writable } from 'svelte/store';
import type { Swimlane } from './trcp/client';


export const swimLane = writable<Swimlane>({title: "", cards: []});
