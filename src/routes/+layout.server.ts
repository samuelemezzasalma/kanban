import type { IBoard } from "$lib/mongoose/documents";
import { createContext } from "$lib/trcp/context";
import { appRouter } from "$lib/trcp/router";
import type { LayoutServerLoad, LayoutServerLoadEvent } from "./$types";
import { stringify } from 'devalue';

export const load: LayoutServerLoad = async (event: LayoutServerLoadEvent) => {
  /* const board = appRouter.createCaller(await createContext(event)).boards.boardById({ id: savedBoard.id }); */

  const resultset = await appRouter.createCaller(await createContext(event)).boards.boardByTitle({ title: "My Board" });
  const { data } = {...resultset};
  console.log(data);
  
  return {
    board: data??""
  }
}
  ;
