<script>
  export let href = "#";
</script>

<style>
  a {
    font-size: 14px;
    font-weight: 700;
  }
</style>

<li>
  <a {href}>
    <slot />
  </a>
</li>
