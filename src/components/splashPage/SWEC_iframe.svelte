<style>
  iframe {
    max-width: initial;
  }

  .site-thumbnail {
    width: 320px !important;
    height: 180px !important;
    position: relative;
  }

  .site-thumbnail iframe {
    width: 1280px;
    height: 720px;
    border-radius: 30px;
    border: none;

    -ms-zoom: 0.25;
    -moz-transform: scale(0.25);
    -moz-transform-origin: 0 0;
    -o-transform: scale(0.25);
    -o-transform-origin: 0 0;
    -webkit-transform: scale(0.25);
    -webkit-transform-origin: 0 0;
  }

  .site-thumbnail:after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
</style>

<div class="site-thumbnail">
    <iframe src="https://swec.org.au" />
</div>
