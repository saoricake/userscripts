// ==UserScript==
// @name        I Hate YouTube Shorts
// @namespace   https://github.com/saoricake/userscripts
// @version     1.0.1
// @author      saori
// @description Redirects shorts to the standard video player.
// @match       *://*.youtube.com/*
// @run-at      document-start
// @downloadURL https://github.com/saoricake/userscripts/raw/main/i-hate-youtube-shorts.user.js
// @updateURL   https://github.com/saoricake/userscripts/raw/main/i-hate-youtube-shorts.user.js
// ==/UserScript==

(function() {
  if (window.location.pathname.startsWith('/shorts/')) {
    window.location.replace(window.location.href.replace('/shorts/', '/watch?v='));
  }

  window.addEventListener(
    'yt-navigate',
    (event) => {
      if (
        event?.detail?.endpoint?.commandMetadata?.webCommandMetadata?.url.startsWith('/shorts/')
      ) {
        event.preventDefault();
        window.location.assign(
          '/watch?v=' + event?.detail?.endpoint?.reelWatchEndpoint?.videoId
        );
      }
    },
    true,
  );
})();
