<script>
  import "bulma-calendar/dist/css/bulma-calendar.min.css";
  import "bulma-checkradio/dist/css/bulma-checkradio.min.css";

  let calendarElement;

  import { onMount } from "svelte";
  let bulmaCalendar;
  onMount(async () => {
    bulmaCalendar = (await import(
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

<style>
  .calendar {
    margin: unset;
    user-select: none;
  }
</style>

<!-- <link rel="stylesheet" href="/assets/css/bulma-checkradio.min.css" /> -->
<div class="field">
  <div class="label">Title</div>
  <div class="control">
    <input class="input" type="text" placeholder="Notice title" name="title" />
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
      <script type="text/javascript">
        const siteSelectors = {};
        fetch("/dashboard/sites.json", { method: "post" })
          .then(response => response.json())
          .then(sites => {
            var here = document.querySelector("[name=siteField]");
            const prefix = "site_";
            for (var i in sites) {
              var input = document.createElement("input");
              input.classList.add("is-checkradio", "is-block", "is-primary");
              input.type = "checkbox";
              input.name = input.id = prefix + i;
              input.addEventListener("change", function() {
                siteSelectors[this.name.substr(prefix.length)] = this.checked;
              });
              here.appendChild(input);

              var label = document.createElement("label");
              label.htmlFor = prefix + i;
              label.innerHTML = sites[i];
              here.appendChild(label);
            }
          });
      </script>
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
<!-- Priority -->
