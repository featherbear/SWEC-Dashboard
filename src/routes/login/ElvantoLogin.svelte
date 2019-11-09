<style>
  /* Adapted from Bulma .tag */
  #elvantoAuth span:nth-child(1):before {
    background-size: cover;
    display: inline-block;
    content: "";
    width: 2em;
    height: 2em;
    vertical-align: middle;
    background-image: url(/assets/icons/elvanto.svg);
  }

  #elvantoAuth span:nth-child(1) {
    background-color: #323232;
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
  }

  #elvantoAuth span:nth-child(2) {
    background-color: #70be3f;
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
    color: white;
    width: 100%;
  }

  #elvantoAuth a {
    border: none;
    padding-left: 0;
    padding-right: 0;
    width: 100%;
  }
</style>

<div class="field" id="elvantoAuth">
  <div class="has-text-centered control">
    <a href="/login/oauth" class="button has-addons">
      <span class="tag is-large" />
      <span class="tag is-large is-info is-expanded">Login with Elvanto</span>
    </a>
  </div>
</div>
