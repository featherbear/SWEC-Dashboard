<script>
  import Button from "svelma/src/components/Button.svelte";
  import Divider from "./Divider.svelte";

  import { createEventDispatcher } from "svelte";
  export let dispatch = createEventDispatcher();

  export let data = {
    id: "",
    title: "",
    custom: {}
  };

  let newTitle = data.title || "";
  let customFields = Object.entries(data.custom || {});

  let isSaving = false;
  async function handleSave() {
    try {
      let currentID = data && data.id
      isSaving = true;
      let postData = {
        title: newTitle,
        custom: Object.fromEntries(
          customFields.filter(d => d[0].trim() && d[1].trim())
        )
      };
      if (currentID) {
        postData.id = currentID;
      }

      let resp = await fetch("/api/sites", {
        method: currentID ? "PATCH" : "POST",
        body: JSON.stringify(postData),
        headers: {
          "Content-Type": "application/json"
        }
      }).then(r => r.json);
      
      if(!resp.status) {
        throw new Error()
      }
      
      if (!currentID) {
        postData.id = resp._id;
      }

      dispatch("accept", postData);
      dispatch("destroy");
      
    } finally {
      isSaving = false;
    }
  }

  let form;
</script>

<header class="modal-card-head">
  <p class="modal-card-title">Editing Site: {data.title}</p>
  <button
    class="delete"
    aria-label="close"
    on:click={() => dispatch('destroy')} />
</header>
<section class="modal-card-body">
  <form bind:this={form}>
    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">Title</label>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control">
            <input
              class="input"
              type="text"
              placeholder="Site title"
              bind:value={newTitle} />
          </div>
        </div>
      </div>
    </div>
    <Divider content="Custom Fields" />
    {#each customFields as entry, idx}
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label" />
        </div>
        <div class="field-body">
          <div class="field">
            <p class="control is-expanded">
              <input
                class="input"
                type="text"
                placeholder="Key"
                bind:value={entry[0]} />
            </p>
          </div>
          <div class="field">
            <p class="control is-expanded">
              <input
                class="input"
                type="text"
                placeholder="Value"
                bind:value={entry[1]} />
            </p>
          </div>
        </div>
      </div>
    {/each}

    <div class="field is-horizontal">
      <div class="field-label" />
      <div class="field-body">
        <div class="field">
          <div class="control">
            <Button
              on:click={() => (customFields = [...customFields, ['', '']])}>
              New Field
            </Button>
          </div>
        </div>
      </div>
    </div>

  </form>
</section>
<footer class="modal-card-foot">
  <Button loading={isSaving} on:click={handleSave} type="is-success">
    Save
  </Button>
  <Button on:click={() => dispatch('destroy')}>Cancel</Button>
</footer>
