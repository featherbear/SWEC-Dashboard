<script>
  import Button from "svelma/src/components/Button.svelte";
  import Divider from "../../components/Divider.svelte";

  import { onMount } from "svelte";

  onMount(() => {
    let __data = {};
    location.search
      .substr(1)
      .split(/(?:[^\\])&/)
      .forEach(function(keyPair) {
        keyPair = keyPair.split(/=(.+)/);
        __data[keyPair[0]] = decodeURI(keyPair[1]);
      });
    if (__data.hasOwnProperty("error")) {
      var message;
      switch (__data["error"]) {
        case "locked":
          message = "Account is locked";
          break;
        case "badauth":
          message = "Incorrect username/password";
          break;
        default:
          message = "Something went wrong...";
      }
      document.getElementById("errorMessage").innerText = message;
      document.getElementById("errorMessage").style.display = "block";
    }
  });
</script>

<style>
  .box {
    margin-top: 2rem;
  }

  input {
    font-weight: 300;
  }

  #errorMessage:before {
    content: "Logon failure: ";
  }

  #errorMessage {
    display: none;
    font-weight: bold;
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
    content: "\A";
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

        <div class="notification is-warning" id="errorMessage" />

        <div class="box">
          <Divider content="OR" />
          <form method="post" autocomplete="on">
            <div class="field">
              <div class="control has-icons-left">
                <input
                  class="input is-medium"
                  type="text"
                  placeholder="Username"
                  name="username"
                  autofocus
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

            <button
              class="button is-block is-info is-medium is-fullwidth"
              type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</section>
