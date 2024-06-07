// ==UserScript==
// @name        Exhentai Arrow Key Navigation
// @namespace   https://exhentai.org
// @version     1.0
// @author      saori
// @description Lets you use the left and right arrow keys to move through certain pages on Exhentai.
// @match       https://exhentai.org/*
// @exclude     https://exhentai.org/s/*
// @exclude     https://exhentai.org/uconfig.php
// @exclude     https://exhentai.org/mytags
// @downloadURL https://github.com/saoricake/userscripts/raw/main/arrow-keys-exhentai.js
// @updateURL   https://github.com/saoricake/userscripts/raw/main/arrow-keys-exhentai.js
// ==/UserScript==

(function() {
  const tdElements = document.getElementsByClassName('ptt')[0]?.getElementsByTagName('td');
  const links = {
    ArrowLeft: tdElements
      ? tdElements[0].children[0]
      : document.getElementById('uprev'),
    ArrowRight: tdElements
      ? tdElements[tdElements.length - 1].children[0]
      : document.getElementById('unext'),
  };

  document.onkeydown = function(e) {
    if (document.activeElement?.type === 'text') return;

    const targetLink = links[e.key];
    if (targetLink) document.location = targetLink.href;
  }
})();
