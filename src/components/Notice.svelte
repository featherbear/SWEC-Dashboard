<script>
  export let data = {};
  let title = data.title || "";
  let description = data.description || "";
  let active = Boolean(data.active);
  let sites = data.sites || {};

  export let filteredSites = [];

  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
</script>

<style>
  .inactive {
    font-style: italic;
    color: #a7a7a7;
  }
  span.tag {
    cursor: pointer;
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
      <div class="tags">
        {#each Object.entries(sites) as [id, { title }]}
          <span
            class="tag is-info"
            class:is-light={filteredSites.indexOf(id) == -1}
            on:click={() => dispatch('tagClick', id)}>
            {title}
          </span>
        {/each}
      </div>
    </div>
  </div>
</article>
