<script context="module">
  export async function preload(page, session) {
    const fail = () => this.redirect(302, "/login");
    console.log(session);
    if (!session) return fail();

    // return { user };
  }
</script>

<script>
  export let user;
</script>

<svelte:head>
  <title>SWEC Dashboard</title>
</svelte:head>
