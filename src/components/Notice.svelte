<script>
  export let data = {};
  let title = data.title || "";
  let description = data.description || "";
  let active = Boolean(data.active);
  let sites = data.sites || [];
  console.log(data);
</script>

<style>
  .inactive {
    font-style: italic;
    color: #a7a7a7;
  }
</style>

<article class="media" class:inactive={!active}>
  <div class="media-content">
    <div class="content">
      <p>
        <strong>{title}</strong>
        <br />
        {description}
      </p>
      {#if sites.length > 0}
        <div class="tags">
          {#each sites as site}
            <span class="tag is-info is-light">{site.title}</span>
          {/each}
        </div>
      {/if}
    </div>
  </div>
</article>
