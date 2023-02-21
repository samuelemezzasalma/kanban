<script lang="ts">
  import { temporaryLane } from "$lib/stores";
  import { trpc, type Board } from "$lib/trcp/client";
  import Swimlane from "./Swimlane.svelte";
  import { flip } from "svelte/animate";
  import { send, receive } from "../utils/transitions";

  export let board: Board | undefined;

  $: boardInternal = board;

  let isLaneBeingAdded = false;

  const enterSwimlaneMode = () => {
    isLaneBeingAdded = !isLaneBeingAdded;
  };

  const addLane = async () => {
    if ($temporaryLane.isValid && $temporaryLane.lane) {
      if (board && board.id && board.id !== null) {
        const newBoard = await trpc().lanes.addLaneToBoard.mutate({
          boardId: board?.id,
          lane: $temporaryLane.lane,
        });
        if (
          newBoard !== undefined &&
          newBoard !== null &&
          boardInternal?.swimlanes
        ) {
          console.log(newBoard);
          boardInternal = newBoard;
        }
        enterSwimlaneMode();
      }
    }
  };
</script>

<div class="flex flex-col w-screen h-screen overflow-auto">
  <div class="px-10 mt-2">
    <button class="btn variant-filled-primary">
      {boardInternal?.title}
    </button>

    <!-- <h2 class="text-l font-bold">{data?.board.title}</h2> -->
  </div>
  <div class="flex flex-grow px-10 mt-2 space-x-6 overflow-auto">
    {#if boardInternal?.swimlanes}
      {#each [...boardInternal?.swimlanes.values()] as swimlane, laneIndex (swimlane)}
        <div
          class="box-border inline-block h-full align-top whitespace-no-wrap w-72"
        >
          <Swimlane {laneIndex} boardId={boardInternal?.id ?? ""} {swimlane} />
        </div>
      {/each}
    {/if}
    {#if isLaneBeingAdded}
      <div
        class="box-border inline-block h-full align-top whitespace-no-wrap w-72"
      >
        <Swimlane
          isLaneInAddingMode={isLaneBeingAdded}
          boardId={boardInternal?.id ?? ""}
          swimlane={{
            title: "",
            cards: new Map([]),
            board_id: boardInternal?.id ?? null,
          }}
          on:saveLane={addLane}
          on:exitAddLane={enterSwimlaneMode}
        />
        <div class="flex items-center flex-shrink- h-10 px-2">
          <button
            class="btn variant-filled-primary bg-primary-500 w-52 text-sm h-6"
            on:click={addLane}
          >
            <span>Add a lane</span>
          </button>
          <button
            id="exitAdd"
            class="btn-icon variant-filled-primary rounded ml-auto btn-base text-sm h-6"
            on:click={enterSwimlaneMode}
          >
            <span><i class="fa-solid fa-xmark" /></span>
          </button>
        </div>
      </div>
    {/if}
    {#if !isLaneBeingAdded}
      <div
        class="box-border inline-block h-full align-top whitespace-no-wrap w-72"
      >
        <div class="flex flex-col !w-full !max-h-full relative p-2">
          <button
            class="btn variant-filled-primary bg-primary-500 flex flex-grow text-sm h-6"
            on:click={enterSwimlaneMode}
          >
            <span><i class="fa-solid fa-plus" /></span>
            <span>Add another lane</span>
          </button>
        </div>
      </div>
    {/if}

    <div class="flex-shrink-0 w-6" />
  </div>
</div>

<style>
  /* your styles go here */
</style>
