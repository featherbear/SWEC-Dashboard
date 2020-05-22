<script context="module">
  export async function preload({ params, query }, session) {
    return {
      sites: await this.fetch("http://localhost:3000/api/sites").then(r =>
        r.json()
      )
    };
  }
</script>

<script>
  import Form from "../../../components/NoticeSubmitForm.svelte";
  export let sites;
  let submitHandler = function({ detail }) {
    fetch("/api/notices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(detail),
      credentials: 'include'
    });
  };
</script>

<Form {sites} on:submit={submitHandler} />
