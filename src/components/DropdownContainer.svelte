<script>
  export let hoverable = true;
  export let label = "Dropdown";
</script>

<div class="dropdown" class:is-hoverable={hoverable}>
  <div class="dropdown-trigger">
    <button class="button">
      <span>{label}</span>
      <span class="icon is-small">
        <i class="fas fa-angle-down" />
      </span>
    </button>
  </div>
  <div class="dropdown-menu">
    <div class="dropdown-content">
      <slot />
    </div>
  </div>
</div>
