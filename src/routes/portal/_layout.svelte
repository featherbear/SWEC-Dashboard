<script context="module">
  export async function preload(page, session) {
    const fail = () => this.redirect(302, "/login");
    if (!session) return fail();
    return { session };
  }
</script>

<script>
  import Nav from "../../components/Nav.svelte";
  import Sidebar from "../../components/Sidebar.svelte";

  export let session;
</script>

<style>
  /* main {
    position: relative;
    max-width: 56em;
    background-color: white;
    padding: 2em;
    margin: 0 auto;
    box-sizing: border-box;
  } */
  #sidebarContainer {
    margin-left: 10px;
  }
</style>

<Nav />
<div class="columns">
  <div class="column is-2" id="sidebarContainer">
    <Sidebar showAdmin={session.admin} />
  </div>

  <div class="column">
    <main>
      <slot />
    </main>
  </div>

</div>
