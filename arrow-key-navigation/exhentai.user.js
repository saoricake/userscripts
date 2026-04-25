// ==UserScript==
// @name        Arrow Key Navigation - Exhentai
// @namespace   https://github.com/saoricake/userscripts
// @version     1
// @author      saori
// @description Lets you use the left and right arrow keys to move through pages on Exhentai.
// @match       *://exhentai.org/*
// @exclude     *://exhentai.org/s/*
// @exclude     *://exhentai.org/uconfig.php*
// @exclude     *://exhentai.org/mytags*
// @downloadURL https://github.com/saoricake/userscripts/raw/main/arrow-key-navigation/exhentai.user.js
// @updateURL   https://github.com/saoricake/userscripts/raw/main/arrow-key-navigation/exhentai.user.js
// ==/UserScript==

document.addEventListener("keydown", (ev) => {
  if (ev.key !== "ArrowLeft" && ev.key !== "ArrowRight") return;
  if (ev.repeat) return;
  if (document.activeElement?.type === "text") return;

  const hasListPages = location.pathname.startsWith("/g/")
    || location.pathname.startsWith("/torrents.php");
  const query = {
    ArrowLeft: hasListPages ? ".ptt td:first-of-type a" : "#uprev",
    ArrowRight: hasListPages ? ".ptt td:last-of-type a" : "#unext"
  }

  const link = document.querySelector(query[ev.key]);
  if (link) link.click();
});
