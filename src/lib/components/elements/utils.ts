import type { DispatchOptions } from "svelte/internal";


export type onEnterType = {
  onEnter: true;
};

export const isEnter = (onEnterDispatch:<EventKey extends "onEnter">(type: EventKey, detail?: {
  onEnter: onEnterType;
}[EventKey] | undefined, options?: DispatchOptions | undefined) => boolean, event: KeyboardEvent) => {
  if (event.key === "Enter") {
    event.preventDefault();
    onEnterDispatch("onEnter", {onEnter: true})
  }
};