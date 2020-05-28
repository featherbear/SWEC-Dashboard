<script context="module">
  export async function preload({ params, query }, session) {
    return {
      data: await this.fetch("http://localhost:3000/api/sites", {
        credentials: "include"
      }).then(r => r.json())
    };
  }
</script>

<script>
  import Button from "svelma/src/components/Button.svelte";

  import modalLauncher from "../../../components/modalLauncher";
  import SiteManageForm from "../../../components/SiteManageForm.svelte";

  export let data = {};

  function handleManageButton(id) {
    if (typeof id !== "undefined" && !data[id]) return;

    modalLauncher(
      SiteManageForm,
      id ? { data: { id, ...data[id] } } : undefined
    ).$on("accept", newData => {
      let result = newData.detail;
      data = { ...data, [result.id]: result };
    });
  }
</script>

<style>
  .addSiteButton {
    cursor: pointer;
  }

  .addSiteButton:hover {
    background-color: whitesmoke;
    color: #0a0a0a;
  }
</style>

<table class="table is-fullwidth">
  <thead>
    <tr>
      <th>Site</th>
      <th />
    </tr>
  </thead>
  <tbody>
    {#each Object.entries(data) as [id, data] (id)}
      <tr>
        <td>{data.title}</td>
        <td>
          <Button on:click={() => handleManageButton(id)}>Manage</Button>
        </td>
      </tr>
    {/each}
    <tr class="addSiteButton" on:click={() => handleManageButton()}>
      <td colspan="2">
        <div>Create new site</div>
      </td>
    </tr>
  </tbody>
</table>
