<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { isEnter, type onEnterType } from "./utils";
  
  
  const onEnterDispatch = createEventDispatcher<{ onEnter: onEnterType }>();

  export let clazz: string = "";
  export let placeholder: string = "";
  export let rows: number = 2;

  export let isFocused: boolean = false;

  const onFocus = () => (isFocused = true);
  const onBlur = () => (isFocused = false);

  function init(el: HTMLTextAreaElement) {
    onFocus()
    el.focus()
  }

  export let initValue: string = "";
  export let value: string = initValue;
</script>

<textarea
  bind:value
  use:init
  on:keydown={(e) => isEnter(onEnterDispatch, e)}
  on:focus={onFocus}
  on:blur={onBlur}
  class={clazz}
  placeholder={placeholder}
  rows={rows}
/>

<style>
  /* your styles go here */
</style>
