<script lang="ts">
  import { temporaryCard } from "$lib/stores";
  import type { Card } from "$lib/trcp/client";
  import { Avatar } from "@skeletonlabs/skeleton";
  import { createEventDispatcher } from "svelte";
  import { z } from "zod";
  import Textarea from "./elements/Textarea.svelte";
  import { flip } from "svelte/animate";
  import { send, receive } from "../utils/transitions";

  const months = new Map([
    [0, `Jan`],
    [1, `Feb`],
    [2, `Mar`],
    [3, `Apr`],
    [4, `May`],
    [5, `Jun`],
    [6, `Jul`],
    [7, `Aug`],
    [8, `Sep`],
    [9, `Oct`],
    [10, `Nov`],
    [11, `Dec`],
  ]);

  const dispatch = createEventDispatcher();

  export let card: Card = {
    id: "",
    title: "",
    description: "",
    tags: [],
    lane_id: null,
    comments: [],
  };

  let newTitle: string = "";

  let isFocused: boolean = true;

  export let cardIndex: number | undefined = undefined;
  export let laneIndex: number | undefined = undefined;

  $: isTemporaryCardValid = z.string().min(1).safeParse(newTitle).success;

  $: $temporaryCard = {
    isValid: isTemporaryCardValid,
    card: { id: card?.id, title: newTitle, lane_id: card?.lane_id ?? null },
  };

  const trySaveCard = () => {
    if (isTemporaryCardValid) {
      dispatch("saveCard", {
        value: isTemporaryCardValid,
      });
    } else {
      if (!isFocused) {
        dispatch("exitAddCard", { value: isTemporaryCardValid });
      }
    }
  };

  $: if (!isFocused) {
    trySaveCard();
  }
</script>

<header class="card-header">
  {#if card?.tags && card?.tags.length > 0}
    <span class="chip variant-filled-primary">{card?.tags}</span>
  {/if}
</header>
<div class="pt-2 pb-2 pr-4 pl-4">
  <!-- {#if isCardInEditMode}
    <Textarea
      clazz={"mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"}
      placeholder={"Enter a title for this card…"}
      rows={3}
      bind:value={newTitle}
      bind:isFocused
      on:onEnter={trySaveCard}
    />
  {:else} -->
    <h4>{card?.title}</h4>
  <!-- {/if} -->
</div>
<footer class="card-footer pb-4 pr-4 pl-4">
  <div class="flex items-center w-full text-xs font-medium ">
    <div class="flex items-center">
      <i class="fa-solid fa-calendar" />
      <span class="ml-1 leading-none"
        >{`${new Date().getDate()} ${months.get(
          new Date().getMonth()
        )}`}</span
      >
    </div>
    {#if card?.comments}
      <div class="relative flex items-center ml-4">
        <i class="fa-solid fa-comment" />
        <span class="ml-1 leading-none">{card?.comments?.length}</span>
      </div>
    {/if}
    <Avatar
      width="w-10"
      rounded="rounded-full"
      class="ml-auto"
      src="https://i.pravatar.cc/"
    />
  </div>
</footer>
