// ==UserScript==
// @name        BlueSky Username-to-Link in Tweet Pages
// @namespace   https://github.com/saoricake/userscripts
// @version     1.0
// @author      saori
// @description On BlueSky tweet pages, turns the tweet author's username into a link (that you can middle click).
// @match       https://bsky.app/profile/*/post/*
// @downloadURL https://github.com/saoricake/userscripts/raw/main/bluesky-username-to-link.user.js
// @updateURL   https://github.com/saoricake/userscripts/raw/main/bluesky-username-to-link.user.js
// ==/UserScript==

(function () {
  const username = location.pathname.split('/')[2];
  const parent = document.querySelector(`div:has(> div[aria-label="${CSS.escape(username)}"][role="link"])`);
  const newChildren = Array.from(parent.children, child => {
    const a = document.createElement('a');
    a.href = `/profile/${username}`;
    a.style.setProperty('text-decoration', 'none');
    a.style.setProperty('max-width', 'max-content');

    for (const attr of child.attributes) {
      a.setAttributeNode(attr.cloneNode(true));
    }

    a.appendChild(child.firstElementChild);
    return a;
  });

  parent.replaceChildren(...newChildren);
})();
