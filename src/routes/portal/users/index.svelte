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

  async function toggleDisabled(entry) {
    let newState = !entry.disabled;
    let result = await fetch("/api/users", {
      method: "PATCH",
      body: JSON.stringify({
        id: entry._id,
        disabled: newState
      }),
      headers: { "Content-Type": "application/json" }
    });
    if (result.status) {
      let idx = data.findIndex(d => d._id == entry._id );
      data = [
        ...data.slice(0, idx),
        { ...entry, disabled: newState },
        ...data.slice(idx + 1)
      ];
    }
  }
  async function toggleAdmin(entry) {
    let newState = !entry.admin;
    let result = await fetch("/api/users", {
      method: "PATCH",
      body: JSON.stringify({
        id: entry._id,
        admin: newState
      }),
      headers: { "Content-Type": "application/json" }
    });
    if (result.status) {
      let idx = data.findIndex(d => d._id == entry._id );
      data = [
        ...data.slice(0, idx),
        { ...entry, admin: newState },
        ...data.slice(idx + 1)
      ];
    }
  }
  async function changePassword(entry) {}

  async function deleteAccount(entry) {
    // Confirm prompt, enter username and checkbox
    // let result = await fetch("/api/users", {
    //   method: "DELETE",
    //   body: JSON.stringify({
    //     id: entry._id,
    //   }),
    //   headers: { "Content-Type": "application/json" }
    // });
    // if (result.status) {
    //   data = [...data.filter(d => d != entry)];
    // }
  }
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
      <th>Admin</th>
      <th />
    </tr>
  </thead>
  <tbody>
    {#each data as entry (entry._id)}
      <tr>
        <td class:disabled={entry.disabled}>{entry.username}</td>
        <td class:disabled={entry.disabled}>{entry.firstName || '-'}</td>
        <td class:disabled={entry.disabled}>{entry.lastName || '-'}</td>
        <td class:disabled={entry.disabled}>{entry.admin ? 'Yes' : 'No'}</td>
        <td>
          <div class="dropdown is-hoverable">
            <div class="dropdown-trigger">
              <button
                class="button"
                aria-haspopup="true"
                aria-controls="dropdown-menu">
                <span>Manage</span>
                <span class="icon is-small">
                  <i class="fas fa-angle-down" aria-hidden="true" />
                </span>
              </button>
            </div>
            <div class="dropdown-menu" id="dropdown-menu" role="menu">
              <div class="dropdown-content">
                <a class="dropdown-item" on:click={() => toggleDisabled(entry)}>
                  {#if entry.disabled}Enable account{:else}Disable account{/if}
                </a>
                <a class="dropdown-item" on:click={() => toggleAdmin(entry)}>
                  {#if entry.admin}Remove admin{:else}Set admin{/if}
                </a>
                <a class="dropdown-item" on:click={() => changePassword(entry)}>
                  Change password
                </a>
                <a class="dropdown-item" on:click={() => deleteAccount(entry)}>
                  Delete account
                </a>
              </div>
            </div>
          </div>

        </td>
      </tr>
    {/each}
  </tbody>
</table>
