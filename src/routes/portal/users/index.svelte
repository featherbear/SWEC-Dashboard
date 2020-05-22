<script context="module">
  export async function preload({ params, query }, session) {
    return {
      data: await this.fetch("http://localhost:3000/api/users", {
        credentials: "include"
      }).then(r => r.json())
    };
  }
</script>

<script>
  export let data = [];
</script>

<ul>
  {#each data as entry}
    <li>
      {entry._id} {entry.disabled} {entry.username} {entry.firstName}
      {entry.lastName}
    </li>
  {/each}
</ul>
