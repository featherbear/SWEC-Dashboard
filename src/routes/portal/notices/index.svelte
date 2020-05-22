<script context="module">
  export async function preload({ params, query }, session) {
    return { data: await this.fetch("http://localhost:3000/api/notices").then(r=>r.json()) };
  }
</script>

<script>
  export let data;
</script>

<ul>
  {#each data as entry}
    <li>{entry.title} - {entry.description}</li>
  {/each}
</ul>
