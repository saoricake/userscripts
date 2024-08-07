// ==UserScript==
// @name        Pixiv Arrow Key Navigation
// @namespace   https://github.com/saoricake/userscripts
// @version     1.2
// @author      saori
// @description Lets you use the left and right arrow keys to move through certain pages on Pixiv.
// @match       https://www.pixiv.net/*
// @downloadURL https://github.com/saoricake/userscripts/raw/main/arrow-keys-pixiv.user.js
// @updateURL   https://github.com/saoricake/userscripts/raw/main/arrow-keys-pixiv.user.js
// ==/UserScript==

(function() {
  document.onkeydown = function(e) {
    if (document.activeElement?.type === 'text') return;

    if (document.location.pathname.startsWith('/search_user.php')) {
      const targetLink = {
        ArrowLeft: document.getElementsByClassName('prev')[0].getElementsByTagName('a')[0],
        ArrowRight: document.getElementsByClassName('next')[0].getElementsByTagName('a')[0],
      }[e.key];

      if (targetLink) document.location = targetLink.href;
    } else {
      const links = document.getElementsByTagName('nav')[1]?.getElementsByTagName('a') ?? [];
      const targetLink = {
        ArrowLeft: links[0],
        ArrowRight: links[links.length - 1],
      }[e.key];

      if (targetLink && !targetLink.hidden) document.location = targetLink.href;
    }
  }
})();
