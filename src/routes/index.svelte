<script>
  import Banner from "../components/splashPage/Banner.svelte";
  import SWECiframe from "../components/splashPage/SWEC_iframe.svelte";
</script>

<style>
  #mainContent {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  #contentPanel {
    width: 500px;
    margin: 0 auto;
  }

  #pageContainer {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  #pageContainer > section:first-child {
    flex: 1;
  }

  .bannerContainer {
    margin-bottom: 200px;
  }
</style>

<div id="pageContainer">
  <section id="mainContent">
    <div class="level" id="contentPanel">
      <div class="level-left">
        <div class="level-item">
          <SWECiframe />
        </div>
      </div>

      <div class="level-right">
        <div class="level-item">
          <aside class="menu">
            <ul class="menu-list">
              <li>
                <a href="portal/">
                  <span class="icon">
                    <i class="fas fa-tools" />
                  </span>
                  Manage
                </a>
              </li>
              <li>
                <a href="https://swec.org.au">
                  <span class="icon">
                    <i class="fas fa-home" />
                  </span>
                  Go to SWEC
                </a>
              </li>
              <li>
                <a href="https://soundcloud.com/swechurch">
                  <span class="icon">
                    <i class="fab fa-soundcloud" />
                  </span>
                  SoundCloud
                </a>
              </li>
              <li>
                <a>
                  <span class="icon">
                    <i class="fas fa-file-alt" />
                  </span>
                  View
                </a>
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </div>
  </section>
  <div class="bannerContainer">
    <Banner />
  </div>
</div>
