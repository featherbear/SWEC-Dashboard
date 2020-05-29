<script>
  import "bulma-calendar/dist/css/bulma-calendar.min.css";
  import "bulma-checkradio/dist/css/bulma-checkradio.min.css";

  import { onMount, createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let sites = {};

  let elem;

  let calendar;
  let calendarElement;
  onMount(async () => {
    let bulmaCalendar = (await import(
      "bulma-calendar/dist/js/bulma-calendar.min.js"
    )).default;

    calendar = bulmaCalendar.attach(calendarElement, {
      clearButton: false,
      todayButton: false,
      displayMode: "inline",
      isRange: true,
      disabledWeekDays: [1, 2, 3, 4, 5, 6]
      // Sunday is 0
    })[0];
  });
</script>

<form
  bind:this={elem}
  on:submit|preventDefault={() => {
    let targetSites = Object.keys(sites).filter(id => elem[`site_${id}`].checked);
    if (targetSites.length == 0) {
      throw new Error("Require site")
      return;
    }
    let endDate = calendar.endDate || calendar.startDate;
    if (!endDate) {
      throw new Error("Require date")
      return;
    }
    dispatch('submit', {
      title: elem.title.value,
      description: elem.description.value,
      sites: targetSites,
      startDate: calendar.startDate,
      endDate
    });
  }}>
  <div class="field">
    <div class="label">Title</div>
    <div class="control">
      <input
        class="input"
        type="text"
        placeholder="Notice title"
        name="title"
        required />
    </div>
  </div>

  <div class="field">
    <div class="label">Description</div>
    <div class="control">
      <textarea
        class="textarea"
        placeholder="Notice description"
        name="description"
        required />
    </div>
  </div>

  <div class="field">
    <div class="label">Appear On</div>
    <div class="control">
      <div class="field" name="siteField">
        {#each Object.entries(sites) as [id, data]}
          <input
            class="is-checkradio is-block is-primary"
            type="checkbox"
            id={'site_' + id}
            name={'site_' + id} />
          <label for={'site_' + id}>{data.title}</label>
        {/each}
      </div>
    </div>
  </div>

  <div class="field">
    <div class="label">Dates</div>
    <div class="control">
      <div type="date" bind:this={calendarElement} />
    </div>
  </div>

  <button class="button" type="submit">Submit</button>
  <!-- Priority -->
</form>
