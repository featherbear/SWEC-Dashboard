<script context="module">
  export async function preload({ params, query }, session) {
    return {
      data: await this.fetch("http://localhost:3000/api/notices").then(r =>
        r.json()
      )
    };
  }
</script>

<script>
  import Notice from "../../../components/Notice.svelte";
  export let data = [];
</script>

{#if Object.keys(data).length != 0}
  {#each data as entry}
    <Notice data={entry} />
  {/each}
{:else}No data!{/if}
