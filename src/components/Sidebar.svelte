<script>
  export let showAdmin = false;

  import SidebarList from "./SidebarList.svelte";
  import SidebarListItem from "./SidebarListItem.svelte";

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
  aside {
    position: sticky;
    top: 0;
  }

  aside > a {
    color: #4a4a4a;
    font-size: 14px;
    font-weight: 700;
  }
</style>

<aside class="menu" bind:this={elem}>
  <a href="/portal">Dashboard</a>

  <SidebarList label="Notices">
    <SidebarListItem href="/portal/notices/submit">
      Submit Notice
    </SidebarListItem>
    <SidebarListItem href="/portal/notices">View Notices</SidebarListItem>
  </SidebarList>
  <SidebarList label="Bulletin">
    <SidebarListItem href="/portal/bulletin/generate">
      Generate Bulletin
    </SidebarListItem>
    <SidebarListItem href="/portal/bulletin/view">
      View Bulletins
    </SidebarListItem>
  </SidebarList>
  <SidebarList label="Bulletin">
    <SidebarListItem href="/portal/sermon">Manage Outlines</SidebarListItem>
  </SidebarList>
  {#if showAdmin}
    <SidebarList label="Admin">
      <SidebarListItem href="/portal/sites">Manage Sites</SidebarListItem>
      <SidebarListItem href="/portal/users">User Management</SidebarListItem>
    </SidebarList>
  {/if}
</aside>
