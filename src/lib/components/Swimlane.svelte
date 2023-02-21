<script lang="ts">
  import type { CardData } from "$lib/models";
  import { trpc, type Swimlane } from "$lib/trcp/client";
  import { createEventDispatcher } from "svelte";
  import { z } from "zod";
  import { temporaryCard, temporaryLane } from "../stores";
  import Card from "./Card.svelte";
  import Input from "./elements/Input.svelte";
  import { flip } from "svelte/animate";
  import { send, receive } from "../utils/transitions";

  /* INITIALIZING */

  export let boardId: string = "";

  export let swimlane: Swimlane = {
    id: "",
    title: "",
    cards: new Map<string, CardData>(),
    board_id: null,
  };

  const dispatch = createEventDispatcher();

  export let isLaneInAddingMode: boolean = false;

  let isLaneInEditMode: boolean = false;

  let isCardBeingAdded = false;

  let swimlaneInternal: Swimlane = null;

  $: swimLaneInternal = swimlane;

  let newTitle: string = "";

  let isInputFocused: boolean = false;

  let isCardFocused: boolean = false;

  export let laneIndex: number | undefined = undefined;

  /* REACTIVITY */

  $: isTemporaryLaneValid = z.string().min(1).safeParse(newTitle).success;

  $: $temporaryLane = {
    isValid: isTemporaryLaneValid,
    lane: {
      id: swimLaneInternal?.id ?? "",
      title: newTitle,
      board_id: swimLaneInternal?.board_id ?? null,
      cards: swimLaneInternal?.cards
        ? new Map([...swimLaneInternal?.cards])
        : new Map<string, CardData>(),
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
        boardId: swimLaneInternal?.board_id ?? "",
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

  function drop(ev: DragEvent) {
    ev.preventDefault();
    if (ev.dataTransfer) {
      const json = ev.dataTransfer.getData("text/plain");
      const data = JSON.parse(json);
      console.log(data);
    }
  }

  function allowDrop(ev: DragEvent) {
    ev.preventDefault();
  }

  
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
        >{swimLaneInternal?.cards?.size}</span
      >
      <button class="btn btn-icon w-6 h-6 rounded ml-auto btn-base">
        <i class="fa-solid fa-ellipsis-vertical" />
      </button>
    {/if}
  </div>

  <!-- CARDS -->
  <div
    class="flex flex-col pb-2 pr-1 overflow-y-scroll"
    on:drop={drop}
    on:dragover={allowDrop}
  >
    {#if swimLaneInternal}
      {#each [...swimLaneInternal?.cards.values()] as card, cardIndex (card)}
        <div
        >
        <!-- in:receive={{ key: cardIndex }}
          out:send={{ key: cardIndex }}
          animate:flip={{ duration: 500 }} -->
          <Card {cardIndex} {laneIndex} {card} />
        </div>
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

<style>
</style>
