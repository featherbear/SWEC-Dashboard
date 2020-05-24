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

<style>
  .disabled {
    font-style: italic;
    color: #a7a7a7;
  }
</style>

<table class="table is-fullwidth">
  <thead>
    <tr>
      <th>Username</th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {#each data as entry}
      <tr class:disabled={entry.disabled}>
        <td>{entry.username}</td>
        <td>{entry.firstName}</td>
        <td>{entry.lastName}</td>
        <td>
          <div
            on:click={() => {
              !entry.disabled;
            }}>
            {#if entry.disabled}Enable account{:else}Disable account{/if}
          </div>
          <div>Change password</div>
        </td>
      </tr>
    {/each}
  </tbody>
</table>
