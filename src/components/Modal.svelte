<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
</script>

<div class="modal is-active">
  <div class="modal-background" on:click={() => dispatch('destroy')} />
  <slot name="launcherTarget" {dispatch}>
    <div class="modal-card">
      <slot {dispatch} {$$props} />
    </div>
  </slot>
</div>
