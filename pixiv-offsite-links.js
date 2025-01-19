// ==UserScript==
// @name        Pixiv Skip Offsite Link Interceptor
// @namespace   https://github.com/saoricake/userscripts
// @version     1.1.1
// @author      saori
// @description Skips the intermediate page when clicking an offsite link on Pixiv.
// @match       https://www.pixiv.net/*
// @downloadURL https://github.com/saoricake/userscripts/raw/main/pixiv-offsite-links.user.js
// @updateURL   https://github.com/saoricake/userscripts/raw/main/pixiv-offsite-links.user.js
// ==/UserScript==

(function() {
  const links = document.querySelectorAll('a[href^="/jump.php"]');
  for (const a of links) {
    const href = decodeURIComponent(a.search).split('http');
    href.shift();
    a.href = 'http' + href.join('');
  }
})();
