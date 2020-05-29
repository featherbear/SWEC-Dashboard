<script context="module">
  export async function preload({ params, query }, session) {
    let notices = await this.fetch("http://localhost:3000/api/notices", {
      credentials: "include"
    }).then(r => r.json());

    return {
      data: notices.map(d => ({
        ...d,
        sites: Object.fromEntries(
          (d.sites || []).map(({ _id, ...data }) => [_id, data])
        )
      }))
    };
  }
</script>

<script>
  import Notice from "../../../components/Notice.svelte";
  export let data = [];
  let filteredSites = [];

  function handleTagClick(evt) {
    let id = evt.detail;

    let newSites = filteredSites.filter(_id => _id != id);
    if (filteredSites.indexOf(id) == -1) {
      newSites.push(id);
    }

    filteredSites = newSites;
  }
</script>

{#if Object.keys(data).length != 0}
  {#each data as entry}
    {#if filteredSites.every(id => entry.sites[id])}
      <Notice data={entry} on:tagClick={handleTagClick} {filteredSites} />
    {/if}
  {/each}
{:else}No data!{/if}
