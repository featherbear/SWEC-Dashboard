<script>
  import "bulma-calendar/dist/css/bulma-calendar.min.css";
  import "bulma-checkradio/dist/css/bulma-checkradio.min.css";

  import { onMount, createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let sites = [];

  let calendarElement;
  onMount(async () => {
    let bulmaCalendar = (await import(
      "bulma-calendar/dist/js/bulma-calendar.min.js"
    )).default;

    var calendar = bulmaCalendar.attach(calendarElement, {
      clearButton: false,
      todayButton: false,
      displayMode: "inline",
      isRange: true,
      disabledWeekDays: [1, 2, 3, 4, 5, 6]
      // Sunday is 0
    })[0];

    calendar.on("date:selected", date => {
      document.querySelector("[type=hidden][name=date]").value = date.start
        ? moment(date.start).format("DD/MM/YYYY")
        : 0;
      document.querySelector("[type=hidden][name=endDate]").value = date.end
        ? moment(date.end).format("DD/MM/YYYY")
        : document.querySelector("[type=hidden][name=date]").value;
    });
  });
</script>

<form
  on:submit|preventDefault={e => {
    let form = e.target;
    dispatch('submit', {
      title: form.name.value,
      description: form.description.value,
      sites: sites.map(v => form[`site_${v._id}`].checked),
      startDate: form.date.value,
      endDate: form.endDate.value
    });
  }}>
  <div class="field">
    <div class="label">Title</div>
    <div class="control">
      <input
        class="input"
        type="text"
        placeholder="Notice title"
        name="title" />
    </div>
  </div>

  <div class="field">
    <div class="label">Description</div>
    <div class="control">
      <textarea
        class="textarea"
        placeholder="Notice description"
        name="description" />
    </div>
  </div>

  <div class="field">
    <div class="label">Appear On</div>
    <div class="control">
      <div class="field" name="siteField">
        {#each sites as site}
          <input
            class="is-checkradio is-block is-primary"
            type="checkbox"
            id={'site_' + site._id}
            name={'site_' + site._id} />
          <label for={'site_' + site._id}>{site.title}</label>
        {/each}
      </div>
    </div>
  </div>

  <div class="field">
    <div class="label">Dates</div>
    <div class="control">
      <div type="date" bind:this={calendarElement} />
      <input type="hidden" name="date" />
      <input type="hidden" name="endDate" />
    </div>
  </div>

  <button class="button" type="submit">Submit</button>
  <!-- Priority -->
</form>
