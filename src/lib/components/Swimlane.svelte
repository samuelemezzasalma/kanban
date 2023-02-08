<script lang="ts">
  import { trpc, type Swimlane } from "$lib/trcp/client";
  import { temporaryCard } from "../stores";
  import Card from "./Card.svelte";

  export let boardId: string = "";

  export let swimlane: Swimlane = {
    id: "",
    title: "",
    cards: [],  
  };

  $: swimLaneInternal = swimlane;

  let isCardBeingAdded = false;

  const enterAddCardMode = () => {
    isCardBeingAdded = !isCardBeingAdded;
  };

  const addCard = async () => {
    if ($temporaryCard.isValid && $temporaryCard.card) {
      const newSwimlane = await trpc().addCardToSwimlane.mutate({
        boardId,
        swimlaneId: swimLaneInternal?.id ?? "",
        card: $temporaryCard.card,
      });
      if (newSwimlane !== null) {
        swimLaneInternal = newSwimlane;
      }
      enterAddCardMode();
    }
  };
</script>

<div class="flex flex-col flex-shrink-0 w-72">
  <div class="flex items-center flex-shrink-0 h-10 px-2">
    <span class="block text-sm font-semibold">{swimLaneInternal?.title}</span>
    <span
      class="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold "
      >{swimLaneInternal?.cards?.length}</span
    >
    <button class="btn btn-icon w-6 h-6 rounded ml-auto btn-base">
      <i class="fa-solid fa-ellipsis-vertical"></i>
    </button>
  </div>
  <div id="mySwimlane" class="flex flex-col pb-2 pr-1 overflow-y-scroll">
    {#if swimLaneInternal}
      {#each swimLaneInternal?.cards as card}
        <Card {card} />
      {/each}
    {/if}

    {#if isCardBeingAdded}
      <Card on:saveCard={addCard} isInEditMode={isCardBeingAdded} />
    {/if}
  </div>
  <div class="flex items-center flex-shrink- h-10 px-2">
    {#if !isCardBeingAdded}
      <button
        class="btn variant-filled-primary bg-primary-500 flex flex-grow text-sm h-6"
        on:click={enterAddCardMode}
      >
        <span><i class="fa-solid fa-plus" /></span>
        <span>Add a card</span>
      </button>
    {:else}
      <button
        class="btn variant-filled-primary bg-primary-500 w-52 text-sm h-6"
        on:click={addCard}
      >
        <span>Add a card</span>
      </button>
      <button
        id="exitAdd"
        class="btn-icon variant-filled-primary rounded ml-auto btn-base text-sm h-6"
        on:click={enterAddCardMode}
      >
        <span><i class="fa-solid fa-xmark" /></span>
      </button>
    {/if}
  </div>
</div>

<style>
</style>
