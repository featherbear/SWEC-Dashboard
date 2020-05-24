<script>
  export let label = "Heading";
</script>

<style>
  .menu-label {
    color: #8f99a3;
    letter-spacing: 1.3;
    font-weight: 700;
  }
</style>

<p class="menu-label">{label}</p>
<ul class="menu-list">
  <slot />
</ul>
