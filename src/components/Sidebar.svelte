<script>
  export let showAdmin = false;

  import { onMount } from "svelte";

  onMount(() => {
    // Highlight the current menu item
    for (let elem of document.querySelectorAll("aside.menu a")) {
      if (elem.pathname == location.pathname) {
        elem.classList.add("is-active");
        break;
      }
    }
  });
</script>

<style>
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

<aside class="menu">
  <a href="/portal/">Dashboard</a>
  <p class="menu-label">Notices</p>
  <ul class="menu-list">
    <li>
      <a href="/portal/notices/submit/">Submit Notice</a>
    </li>
    <li>
      <a href="/portal/notices/">View Notices</a>
    </li>
  </ul>
  <p class="menu-label">Bulletin</p>
  <ul class="menu-list">
    <li>
      <a href="/portal/bulletin/generate/">Generate Bulletin</a>
    </li>
    <li>
      <a href="/portal/bulletin/view/">View Bulletins</a>
    </li>
  </ul>
  <p class="menu-label">Sermon Outline</p>
  <ul class="menu-list">
    <li>
      <a href="/portal/sermon/">Manage Outlines</a>
    </li>
  </ul>
  {#if showAdmin }
    <p class="menu-label">Admin</p>
    <ul class="menu-list">
      <li>
        <a href="/portal/admin/sites/">Manage Sites</a>
      </li>
      <li>
        <a href="/portal/admin/users/">User Management</a>
      </li>
      <li>
        <a href="/portal/admin/audit/">Audit Log</a>
      </li>
    </ul>
  {/if}
</aside>
