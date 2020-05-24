<script>
  export let showAdmin = false;

  import { stores } from "@sapper/app";
  const { page } = stores();
  let elem;
  $: {
    if (elem) {
      let oldElem = elem.querySelector(".is-active");
      oldElem && oldElem.classList.remove("is-active");

      let newElem = elem.querySelector(`a[href$='${$page.path}']`);
      newElem && newElem.classList.add("is-active");
    }
  }
</script>

<style>
  aside > a {
    color: #4a4a4a;
  }

  .menu-label {
    color: #8f99a3;
    letter-spacing: 1.3;
    font-weight: 700;
  }
  .menu-list a,
  .menu > a {
    font-size: 14px;
    font-weight: 700;
  }
</style>

<aside class="menu" bind:this={elem}>
  <a href="/portal">Dashboard</a>
  <p class="menu-label">Notices</p>
  <ul class="menu-list">
    <li>
      <a href="/portal/notices/submit">Submit Notice</a>
    </li>
    <li>
      <a href="/portal/notices">View Notices</a>
    </li>
  </ul>
  <p class="menu-label">Bulletin</p>
  <ul class="menu-list">
    <li>
      <a href="/portal/bulletin/generate">Generate Bulletin</a>
    </li>
    <li>
      <a href="/portal/bulletin/view">View Bulletins</a>
    </li>
  </ul>
  <p class="menu-label">Sermon Outline</p>
  <ul class="menu-list">
    <li>
      <a href="/portal/sermon">Manage Outlines</a>
    </li>
  </ul>
  {#if showAdmin }
    <p class="menu-label">Admin</p>
    <ul class="menu-list">
      <li>
        <a href="/portal/sites">Manage Sites</a>
      </li>
      <li>
        <a href="/portal/users">User Management</a>
      </li>
    </ul>
  {/if}
</aside>
