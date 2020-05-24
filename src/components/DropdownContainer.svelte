<script>
  export let hoverable = true;
  export let label = "Dropdown";

  import Button from "svelma/src/components/Button.svelte";
</script>

<div class="dropdown" class:is-hoverable={hoverable}>
  <div class="dropdown-trigger">
    <Button>
      <span>{label}</span>
      <span class="icon is-small">
        <i class="fas fa-angle-down" />
      </span>
    </Button>
  </div>
  <div class="dropdown-menu">
    <div class="dropdown-content">
      <slot />
    </div>
  </div>
</div>
