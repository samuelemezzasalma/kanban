import { writable } from 'svelte/store';
import type { Card } from './trcp/client';


export const temporaryCard = writable<{isValid: boolean, card: Card}>({isValid: false, card: {title: ""}});
