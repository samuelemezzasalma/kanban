import transformer from "$lib/utils/trpc";
import { initTRPC } from "@trpc/server";
import type { Context } from "./context";


export const t = initTRPC.context<Context>().create(
  {transformer}
);