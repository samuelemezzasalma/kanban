<script lang="ts">
  export let clazz: string = "";
  export let placeholder: string = "";
  // export const type: string = "";

  export let isFocused: boolean = false;

  const onFocus = () => (isFocused = true);
  const onBlur = () => (isFocused = false);

  function init(el: HTMLElement) {
    onFocus();
    el.focus();
  }

  export let initValue: string = ""
  export let value: string = initValue;
  

</script>

<input
  bind:value={value}
  use:init
  on:focus={onFocus}
  on:blur={onBlur}
  id=""
  class={clazz}
  placeholder={placeholder}
  type="text"
/>

<style>
  /* your styles go here */
</style>
