<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
</script>

<style>
  div {
    cursor: pointer;
  }
  div:hover {
    background-color: whitesmoke;
    color: #0a0a0a;
  }
</style>

<div class="dropdown-item" on:click={evt => dispatch('click', evt)}>
  <slot />
</div>
