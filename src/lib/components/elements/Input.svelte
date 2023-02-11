<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { isEnter, type onEnterType } from "./utils";



  const onEnterDispatch = createEventDispatcher<{onEnter: onEnterType}>();
  export let clazz: string = "";
  export let placeholder: string = "";
  // export const type: string = "";

  export let isFocused: boolean = false;

  const onFocus = () => (isFocused = true);
  const onBlur = () => (isFocused = false);

  function init(el: HTMLInputElement) {
    onFocus();
    el.focus();
  }

  export let initValue: string = ""
  export let value: string = initValue;

  export let onEnter: boolean = false;

  

</script>

<input
  bind:value={value}
  use:init
  on:focus={onFocus}
  on:blur={onBlur}
  on:keydown={(e) => isEnter(onEnterDispatch, e)}
  id=""
  class={clazz}
  placeholder={placeholder}
  type="text"
/>

<style>
  /* your styles go here */
</style>
