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
  import DropdownContainer from "../../../components/DropdownContainer.svelte";
  import DropdownItem from "../../../components/DropdownItem.svelte";

  export let data = [];

  import { stores } from "@sapper/app";
  const { session } = stores();

  async function toggleDisabled(index) {
    let entry = data[index];
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
      data[index].disabled = newState;
      // let idx = data.findIndex(d => d._id == entry._id );
      // data = [
      //   ...data.slice(0, idx),
      //   { ...entry, disabled: newState },
      //   ...data.slice(idx + 1)
      // ];
    }
  }
  async function toggleAdmin(index) {
    let entry = data[index];
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
      data[index].admin = newState;
      // let idx = data.findIndex(d => d._id == entry._id );
      // data = [
      //   ...data.slice(0, idx),
      //   { ...entry, admin: newState },
      //   ...data.slice(idx + 1)
      // ];
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
    {#each data as entry, index (entry._id)}
      <tr>
        <td class:disabled={entry.disabled}>{entry.username}</td>
        <td class:disabled={entry.disabled}>{entry.firstName || '-'}</td>
        <td class:disabled={entry.disabled}>{entry.lastName || '-'}</td>
        <td class:disabled={entry.disabled}>{entry.admin ? 'Yes' : 'No'}</td>
        <td>
          <DropdownContainer label="Actions">
            {#if $session.sub != entry._id}
              <DropdownItem on:click={() => toggleDisabled(index)}>
                {#if entry.disabled}Enable account{:else}Disable account{/if}
              </DropdownItem>
            {/if}
            {#if $session.sub != entry._id}
              <DropdownItem on:click={() => toggleAdmin(index)}>
                {#if entry.admin}Remove admin{:else}Set admin{/if}
              </DropdownItem>
            {/if}
            <DropdownItem on:click={() => changePassword(index)}>
              Change password
            </DropdownItem>
            {#if $session.sub != entry._id}
              <DropdownItem on:click={() => deleteAccount(index)}>
                Delete account
              </DropdownItem>
            {/if}
          </DropdownContainer>
        </td>
      </tr>
    {/each}
  </tbody>
</table>
