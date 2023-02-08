<script lang="ts">
  import type { Board } from "$lib/trcp/client";
  import Swimlane from "./Swimlane.svelte";

  export let board: Board | undefined;
</script>

<div class="flex flex-col w-screen h-screen overflow-auto">
  <div class="px-10 mt-2">
    <button class="btn variant-filled-primary">
      {board?.title}
    </button>

    <!-- <h2 class="text-l font-bold">{data?.board.title}</h2> -->
  </div>
  <div class="flex flex-grow px-10 mt-2 space-x-6 overflow-auto">
    {#if board?.swimlanes}
      {#each board?.swimlanes as swimlane}
        <Swimlane boardId={board?.id ?? ""} {swimlane} />
      {/each}
    {/if}
    <div class="flex flex-col flex-shrink-0 w-72">
      <div class="flex items-center flex-shrink h-10 pl-1 pr-4">
        <button
        class="btn variant-filled-primary bg-primary-500 flex flex-grow text-sm h-6"
      >
        <span><i class="fa-solid fa-plus" /></span>
        <span>Add another swimlane</span>
      </button>
      </div>
    </div>
    <div class="flex-shrink-0 w-6" />
  </div>
</div>

<style>
  /* your styles go here */
</style>
