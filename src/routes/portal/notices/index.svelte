<script context="module">
  export async function preload({ params, query }, session) {
    console.log(session.token);
    const data = await this.fetch("http://localhost:1337/notices", {
      headers: {
        Authorization: `Bearer ${session.token}`
      }
    }).then(r => r.json());

    console.log(data);
    return { data };
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
