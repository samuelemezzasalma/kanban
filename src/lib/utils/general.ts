export function findById<T extends { id?: string | null | undefined }>(array: Array<T>, id: string) {
  return array.find((el: T) => el.id === id) ?? null;
}

export declare type Item = import('svelte-dnd-action').Item;
export declare type DndEvent<ItemType = Item> = import('svelte-dnd-action').DndEvent<ItemType>;
// 	interface HTMLAttributes<T> {
// 		onconsider?: (event: CustomEvent<DndEvent<Item>> & { target: EventTarget & T }) => void;
// 		onfinalize?: (event: CustomEvent<DndEvent<Item>> & { target: EventTarget & T }) => void;
// }