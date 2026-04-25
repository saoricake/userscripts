// ==UserScript==
// @name        Arrow Key Navigation - HentaiNexus
// @namespace   https://github.com/saoricake/userscripts
// @version     1
// @author      saori
// @description Lets you use the left and right arrow keys to move through pages on HentaiNexus.
// @match       *://hentainexus.com/
// @match       *://hentainexus.com/?q=*
// @match       *://hentainexus.com/page/*
// @downloadURL https://github.com/saoricake/userscripts/raw/main/arrow-key-navigation/hentainexus.user.js
// @updateURL   https://github.com/saoricake/userscripts/raw/main/arrow-key-navigation/hentainexus.user.js
// ==/UserScript==

document.addEventListener("keydown", (ev) => {
  if (ev.key !== "ArrowLeft" && ev.key !== "ArrowRight") return;
  if (ev.repeat) return;
  if (document.activeElement?.type === "text") return;

  const query = {
    ArrowLeft: ".pagination-previous",
    ArrowRight: ".pagination-next"
  }

  const link = document.querySelector(query[ev.key]);
  if (link) link.click();
});
