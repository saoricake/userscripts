// ==UserScript==
// @name        Pixiv Skip Offsite Link Interceptor
// @namespace   https://github.com/saoricake/userscripts
// @version     1.1.2
// @author      saori
// @description Skips the intermediate page when clicking an offsite link on Pixiv.
// @match       *://*.pixiv.net/jump.php?*
// @run-at      document-end
// @downloadURL https://github.com/saoricake/userscripts/raw/main/pixiv-offsite-links.user.js
// @updateURL   https://github.com/saoricake/userscripts/raw/main/pixiv-offsite-links.user.js
// ==/UserScript==

location.replace(
  decodeURIComponent(location.search).replace(/\?(?:url=)?/, '')
);
