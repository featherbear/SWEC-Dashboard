<script>
  import Button from "svelma/src/components/Button.svelte";
  import Divider from "../../components/Divider.svelte";
  import ElvantoLogin from "../../components/ElvantoLoginButton.svelte";
  import { fade } from "svelte/transition";

  let showManualLogin = false;
  let manualLoginSpin = false;
  async function handleManualLogin(e) {
    let username = e.target.username.value;
    let password = e.target.password.value;

    manualLoginSpin = true;
    let response = await fetch(location.pathname, {
      body: JSON.stringify({
        username,
        password
      }),
      // redirect: 'follow',
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(r => r.json());
    if (response.error) {
      // TODO: Error message
      manualLoginSpin = false;
      return;
    } else {
      location = "/portal"
    }
  }
</script>

<style>
  .box {
    margin-top: 2rem;
  }

  input {
    font-weight: 300;
  }

  .background {
    background-image: url(/assets/img/sundayworship.jpg);
    background-position: center center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;

    position: fixed;
    left: 0;
    right: 0;
    height: 100%;

    filter: blur(5px);
    transform: scale(1.1);
  }

  .background::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.6);
  }
</style>

<svelte:head>
  <title>Login | SWEC Dashboard</title>
</svelte:head>

<section class="hero is-fullheight">
  <div class="background" />
  <div class="hero-body">
    <div class="container has-text-centered">
      <div class="column is-4 is-offset-4">
        <h3 class="title has-text-white">Login to Dashboard</h3>
        <div class="box">
          <ElvantoLogin />
          <Divider content="OR" />
          {#if !showManualLogin}
            <Button on:click={() => (showManualLogin = true)}>
              Login manually
            </Button>
          {:else}
            <form
              method="post"
              autocomplete="on"
              transition:fade
              on:submit|preventDefault={handleManualLogin}>
              <div class="field">
                <div class="control has-icons-left">
                  <input
                    class="input is-medium"
                    type="text"
                    placeholder="Username"
                    name="username"
                    required />
                  <span class="icon is-small is-left">
                    <i class="fas fa-user" />
                  </span>
                </div>
              </div>
              <div class="field">
                <div class="control has-icons-left">
                  <input
                    class="input is-medium"
                    type="password"
                    name="password"
                    placeholder="Password"
                    required />
                  <span class="icon is-small is-left">
                    <i class="fas fa-lock" />
                  </span>
                </div>
              </div>
              <input type="hidden" name="next" />
              <Button
                loading={manualLoginSpin}
                nativeType="submit"
                class="is-block is-info is-medium is-fullwidth">
                Login
              </Button>
            </form>
          {/if}
        </div>
      </div>
    </div>
  </div>
</section>
