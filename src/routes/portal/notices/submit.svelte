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
  export let sites;

  import { stores } from "@sapper/app";
  const { session } = stores();

  import Button from "svelma/src/components/Button.svelte";
  import Form from "../../../components/NoticeSubmitForm.svelte";
  let submitted = false;

  let submitHandler = async function({ detail }) {
    let response = await fetch("/api/notices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(detail),
      credentials: "include"
    }).then(r => r.json());

    if (response.status) {
      submitted = true;
    }
  };
</script>

{#if !submitted}
  <Form {sites} on:submit={submitHandler} />
{:else}
  <p>
    Your notice has been submitted
    {#if $session.admin}for approval{/if}
  </p>
  <Button on:click={() => (submitted = false)}>Submit a new notice</Button>
{/if}
