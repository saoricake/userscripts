// ==UserScript==
// @name        Pixiv Skip Offsite Link Interceptor
// @namespace   https://github.com/saoricake/userscripts
// @version     1.0
// @author      saori
// @description Skips the intermediate page when clicking an offsite link on Pixiv.
// @match       https://www.pixiv.net/*
// @downloadURL https://github.com/saoricake/userscripts/raw/main/pixiv-offsite-links.user.js
// @updateURL   https://github.com/saoricake/userscripts/raw/main/pixiv-offsite-links.user.js
// ==/UserScript==

(function() {
  function listener(event) {
    if (event.target?.tagName !== 'A') return;
    if (event.target?.pathname !== '/jump.php') return;

    event.target.href = decodeURIComponent(event.target.search.substring(1));
  }

  document.addEventListener('click', listener);
  document.addEventListener('auxclick', listener);
})();
