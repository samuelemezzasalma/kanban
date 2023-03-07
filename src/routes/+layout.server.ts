import { createContext } from "$lib/trcp/context";
import { appRouter } from "$lib/trcp/router";
import { getPool, testConnection } from "$lib/utils/pg_client";
import type { LayoutServerLoad, LayoutServerLoadEvent } from "./$types";

export const load: LayoutServerLoad = async (event: LayoutServerLoadEvent) => {
  // testConnection(getPool())
  await appRouter.createCaller(await createContext(event)).boards.boardById({ id: `1` });
  // const board = appRouter.createCaller(await createContext(event)).boards.boardById({ id: `1` });
  return {
    board: {}
  }
}
  ;
