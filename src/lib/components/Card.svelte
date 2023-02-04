<script lang="ts">
  import { cardZod, type CardData, type Comment } from "$lib/models";
  import { Avatar } from "@skeletonlabs/skeleton";
  import { createEventDispatcher } from "svelte";

  export const isInEditMode: boolean = false;
  export let title: string | null = "";
  export const description: string | null = "";
  export const tags: string[] = [];
  export const attachments: Blob[] = [];
  export const comments: Comment[] = [];

  const dispatch = createEventDispatcher();

  const isEnter = async (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      check();
    }
  };

  export let check = async () => {
    try {
      let card: CardData = cardZod.parse({ title: title });
      dispatch("isCardValid", {
        value: true,
        card: card,
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
    {#if tags?.length > 0}
      <span class="chip variant-filled-primary">{tags}</span>
    {/if}
  </header>
  <div class="pt-2 pb-2 pr-4 pl-4">
    {#if isInEditMode}
      <textarea
        bind:value={title}
        on:keydown={isEnter}
        placeholder="Enter a title for this card…"
        class="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
        rows="3"
      />
    {:else}
      <h4>{title}</h4>
    {/if}
  </div>
  <footer class="card-footer pb-4 pr-4 pl-4">
    <div class="flex items-center w-full text-xs font-medium ">
      <div class="flex items-center">
        <i class="fa-solid fa-calendar" />
        <span class="ml-1 leading-none">Dec 12</span>
      </div>
      {#if comments?.length}
        <div class="relative flex items-center ml-4">
          <i class="fa-solid fa-comment" />
          <span class="ml-1 leading-none">{comments?.length}</span>
        </div>
      {/if}
      {#if attachments?.length}
        <div class="flex items-center ml-4">
          <i class="fa-solid fa-paperclip" />
          <span class="ml-1 leading-none">{attachments?.length}</span>
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
