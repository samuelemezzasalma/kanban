<script lang="ts">
    import type { ISwimlane } from "$lib/mongoose/documents";
  import { trpc } from "$lib/trcp/client";
  import { createEventDispatcher } from "svelte";
  import { z } from "zod";
  import { temporaryCard, temporaryLane } from "../stores";
  import Card from "./Card.svelte";
  import Input from "./elements/Input.svelte";

  /* INITIALIZING */

  export let boardId: string = "";

  export let swimlane: ISwimlane;

  const dispatch = createEventDispatcher();

  export let isLaneInAddingMode: boolean = false;

  let isLaneInEditMode: boolean = false;

  let isCardBeingAdded = false;

  $: swimLaneInternal = swimlane;

  let newTitle: string = "";

  let isInputFocused: boolean = false;

  let isCardFocused: boolean = false;

  /* REACTIVITY */

  $: isTemporaryLaneValid = z.string().min(1).safeParse(newTitle).success;

  $: $temporaryLane = {
    isValid: isTemporaryLaneValid,
    lane: {
      id: swimLaneInternal?.id ?? "",
      title: newTitle,
      cards: swimLaneInternal?.cards ? [...swimLaneInternal?.cards] : [],
    },
  };

  // $: isLaneInEditMode = isInputFocused;

  /* VALIDATIONS */

  const trySaveLane = () => {
    if (isTemporaryLaneValid) {
      if (isLaneInAddingMode) {
        dispatch("saveLane", {
          value: isTemporaryLaneValid,
        });
      } else {
        changeLane();
      }
    } else {
      if (!isInputFocused) {
        dispatch("exitAddLane", { value: isTemporaryLaneValid });
      }
    }
  };

  $: if (!isInputFocused) {
    trySaveLane();
  }

  /* UI */

  const enterAddCardMode = () => {
    isCardBeingAdded = !isCardBeingAdded;
  };

  const enterEditLaneMode = () => {
    isLaneInEditMode = !isLaneInEditMode;
  };

  /* API */

  const addCard = async () => {
    if ($temporaryCard.isValid && $temporaryCard.card) {
      const newSwimlane = await trpc().cards.addCardToSwimlane.mutate({
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

  const changeLane = async () => {
    if ($temporaryLane.isValid && $temporaryLane.lane) {
      const newLane = await trpc().lanes.editLane.mutate({
        boardId: boardId,
        swimlaneId: $temporaryLane.lane.id ?? "",
        title: $temporaryLane.lane.title,
      });
      if (newLane && newLane !== null) {
        swimLaneInternal = newLane;
      }
      enterEditLaneMode();
    }
  };
</script>

<div
  class="flex flex-col !w-full !max-h-full relative card !bg-transparent p-2 "
>
  <!-- HEADER -->
  <div class="flex items-center flex-shrink-0 h-10 px-2">
    {#if isLaneInAddingMode || isLaneInEditMode}
      <Input
        clazz={"input"}
        placeholder={"Enter lane title..."}
        bind:value={newTitle}
        bind:isFocused={isInputFocused}
        on:onEnter={trySaveLane}
      />
    {:else}
      <button
        class="btn btn-sm variant-glass-primary"
        on:click={enterEditLaneMode}>{swimLaneInternal?.title}</button
      >
      <!-- <span class="block text-sm font-semibold">{swimLaneInternal?.title}</span> -->
      <span
        class="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold "
        >{swimLaneInternal?.cards?.length}</span
      >
      <button class="btn btn-icon w-6 h-6 rounded ml-auto btn-base">
        <i class="fa-solid fa-ellipsis-vertical" />
      </button>
    {/if}
  </div>

  <!-- CARDS -->
  <div class="flex flex-col pb-2 pr-1 overflow-y-scroll">
    {#if swimLaneInternal && swimLaneInternal.cards}
      {#each swimLaneInternal.cards as card}
        <Card {card} />
      {/each}
    {/if}
    {#if isCardBeingAdded}
      <Card
        on:saveCard={addCard}
        isCardInEditMode={isCardBeingAdded}
        on:exitAddCard={enterAddCardMode}
      />
    {/if}
  </div>

  <!-- BUTTONS -->
  {#if !isLaneInAddingMode}
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
  {/if}
</div>

<!-- {#if !isLaneBeingAdded}
      <button
        class="btn variant-filled-primary bg-primary-500 flex flex-grow text-sm h-6"
        on:click={enterSwimlaneMode}
      >
        <span><i class="fa-solid fa-plus" /></span>
        <span>Add another lane</span>
      </button>
    {:else}
      <button
        class="btn variant-filled-primary bg-primary-500 w-52 text-sm h-6"
        on:click={addLane}
      >
        <span>Add lane</span>
      </button>
      <button
        id="exitAdd"
        class="btn-icon variant-filled-primary rounded ml-auto btn-base text-sm h-6"
        on:click={enterSwimlaneMode}
      >
        <span><i class="fa-solid fa-xmark" /></span>
      </button>
    {/if} -->
<style>
  /* .dark.card {
    --tw-ring-color: rgb(250 250 250 / 0.9) !important;
  } */

  /* .card {
    --tw-ring-color: rgb(23 23 23 / 0.5);
  } */

  /* .dark .card {
    --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
    --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);
    box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
    --tw-ring-inset: inset;
    --tw-ring-color: rgb(250 250 250 / 0.9);
} */

  /* .list {
    background-color: var(--ds-background-accent-gray-subtlest,#ebecf0);
    border-radius: 3px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    max-height: 100%;
    position: relative;
    white-space: normal;
    width: 100%!important;
}

.list-wrapper {
    box-sizing: border-box;
    display: inline-block;
    height: 100%;
    margin: 0 4px;
    vertical-align: top;
    white-space: nowrap;
    width: 272px;
} */
</style>
