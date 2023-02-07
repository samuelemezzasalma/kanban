<script lang="ts">
  import { cardZod, type CardData } from "$lib/models";
  import type { Card } from "$lib/trcp/client";
  import { Avatar } from "@skeletonlabs/skeleton";
  import { createEventDispatcher } from "svelte";

  export let card: Card = { 
    id: "", 
    title: "", 
    description : "",
    tags: [],
    attachments: [],
    comments: [],
   };

   let newTitle: string = ""

  export let isInEditMode: boolean = false;
  // export let title: string = "";
  // export let description: string | null = "";
  // export let tags: string[] = [];
  // export let attachments: Blob[] = [];
  // export let comments: Comment[] = [];

  const dispatch = createEventDispatcher();

  const isEnter = async (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      check();
    }
  };

  export const check = () => {
    try {
      const newCard: CardData = cardZod.parse({ id: card?.id, title: newTitle });
      dispatch("isCardValid", {
        value: true,
        card: newCard,
      });
    } catch (error: any) {
      console.log(error.message);
    }
  };
</script>

<!-- card p-4 space-y-4 text-center variant-glass-surface -->
<!-- relative flex flex-col items-start p-4 mt-3 -->
<div class="card card-hover variant-soft cursor-pointer mt-3" draggable="true">
  <header class="card-header">
    {#if card?.tags && card?.tags.length > 0}
      <span class="chip variant-filled-primary">{card?.tags}</span>
    {/if}
  </header>
  <div class="pt-2 pb-2 pr-4 pl-4">
    {#if isInEditMode}
      <textarea
        bind:value={newTitle}
        on:keydown={isEnter}
        placeholder="Enter a title for this card…"
        class="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
        rows="3"
      />
    {:else}
      <h4>{card?.title}</h4>
    {/if}
  </div>
  <footer class="card-footer pb-4 pr-4 pl-4">
    <div class="flex items-center w-full text-xs font-medium ">
      <div class="flex items-center">
        <i class="fa-solid fa-calendar" />
        <span class="ml-1 leading-none">Dec 12</span>
      </div>
      {#if card?.comments}
        <div class="relative flex items-center ml-4">
          <i class="fa-solid fa-comment" />
          <span class="ml-1 leading-none">{card?.comments?.length}</span>
        </div>
      {/if}
      {#if card?.attachments}
        <div class="flex items-center ml-4">
          <i class="fa-solid fa-paperclip" />
          <span class="ml-1 leading-none">{card?.attachments?.length}</span>
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
</div>
