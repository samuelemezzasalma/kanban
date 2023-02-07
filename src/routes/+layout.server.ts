import type { Board } from "$lib/trcp/client";
import { createContext } from "$lib/trcp/context";
import { appRouter } from "$lib/trcp/router";
import type { LayoutServerLoad, LayoutServerLoadEvent } from "./$types";

export const load: LayoutServerLoad = async (event: LayoutServerLoadEvent) => {
  const board = appRouter.createCaller(await createContext(event)).boardById({ id: `1` });
  return {
    board: board
  }
}
;
