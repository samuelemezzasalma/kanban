<script lang="ts">
  import { swimLane as swimLaneStore } from "../stores";
  import type { CardData } from "$lib/models";
  import { trpc, type Swimlane } from "$lib/trcp/client";
  import type { RouterInputs } from "$lib/trcp/router";
  import Card from "./Card.svelte";

  let checkCard: any;

  const checkIfCardcanBeAdded = () => {
    checkCard();
  };

  let item: RouterInputs["addCardToSwimlane"];

  export let boardId: string = "";

  export let swimlane: Swimlane = {
    id: "",
    title: "",
    cards: [],
  };

  $: $swimLaneStore = swimlane;

  // let { id, title, cards } = $swimLaneStore;

  let isCardBeingAdded = false;

  const enterAddCardMode = () => {
    isCardBeingAdded = !isCardBeingAdded;
  };

  const addCard = async (card: CardData) => {
    const newSwimlane = await trpc().addCardToSwimlane.mutate({
      boardId,
      swimlaneId: $swimLaneStore?.id ?? "",
      card,
    });
    $swimLaneStore = newSwimlane;
    // swimLaneStore.update((storeValue) => {...storeValue, cards: [...newSwimlane.cards.}] )
    enterAddCardMode();
    // await trpc($page).swimlaneById.query({boardId, swimlaneId: id})
  };
  const handleMessage = (event: CustomEvent) => {
    addCard(event.detail.card);
  };
  // let mySwimlane: Element
  // $: mySwimlane.scroll({ top: mySwimlane.scrollHeight, behavior: "smooth"})

  // mySwimlane.scroll({ top: mySwimlane.scrollHeight, behavior: "smooth"})
</script>

<div class="flex flex-col flex-shrink-0 w-72">
  <div class="flex items-center flex-shrink-0 h-10 px-2">
    <span class="block text-sm font-semibold">{$swimLaneStore?.title}</span>
    <span
      class="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold "
      >{$swimLaneStore?.cards.length}</span
    >
    <button
      class="btn-icon variant-filled-primary w-6 h-6 rounded ml-auto btn-base"
    >
      <i class="fa-solid fa-plus" />
    </button>
  </div>
  <div id="mySwimlane" class="flex flex-col pb-2 pr-1 overflow-y-scroll">
    {#if $swimLaneStore}
      {#each $swimLaneStore?.cards as card}
        <Card {card} />
      {/each}
    {/if}

    {#if isCardBeingAdded}
      <Card
        on:isCardValid={handleMessage}
        isInEditMode={isCardBeingAdded}
        bind:check={checkCard}
      />
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
        on:click={checkIfCardcanBeAdded}
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

<!-- markup (zero or more items) goes here -->
<style>
  /* your styles go here */
</style>
