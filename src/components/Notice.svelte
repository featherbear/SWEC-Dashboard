<script>
  export let data = {};
  let title = data.title;
  let description = data.description;
  let active = Boolean(data.active);
  let site = data.sites;
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
        <small>{site}</small>
        <br />
        {description}
      </p>
    </div>
  </div>
</article>
