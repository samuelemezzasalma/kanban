<script lang="ts">
  import type { CardData, SwimLane } from "$lib/models";
    import { trpc } from "$lib/trcp/client";
    import type { RouterInputs } from "$lib/trcp/router";
  import Card from "./Card.svelte";

  let item: RouterInputs['addCardToSwimlane']

  export let boardId: string = "";
  // export let id: string = "";
  // export let title: string = "";
  // export let cards: CardData[] = [];

  export let swimlane: SwimLane = { id: "", title: "", cards: [] };

  const { id, title, cards } = swimlane;

  let isCardBeingAdded = false;

  const enterAddCardMode = () => (isCardBeingAdded = !isCardBeingAdded);

  const addCard = async (card: CardData) => {
    const newSwimlane = await trpc().addCardToSwimlane.mutate({boardId, swimlaneId: id?? "", card});
    swimlane = {...newSwimlane}
    enterAddCardMode();
    // await trpc($page).swimlaneById.query({boardId, swimlaneId: id})
  };
  const handleMessage = (event: CustomEvent) => {
    console.log(event);
    addCard(event.detail.card);
  };

  // export let title: string = ""
  // export let cards: CardData[] = [];
</script>

<div class="flex flex-col flex-shrink-0 w-72">
  <div class="flex items-center flex-shrink-0 h-10 px-2">
    <span class="block text-sm font-semibold">{title}</span>
    <span
      class="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold "
      >{cards.length}</span
    >
    <button
      class="btn-icon variant-filled-primary w-6 h-6 rounded ml-auto btn-base"
    >
      <i class="fa-solid fa-plus" />
    </button>
  </div>
  <div class="flex flex-col pb-2 pr-1 overflow-auto">
    {#each cards as card}
      <Card {...card} />
    {/each}
    {#if isCardBeingAdded}
      <Card
        on:isCardValid={handleMessage}
        isInEditMode={isCardBeingAdded}
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
