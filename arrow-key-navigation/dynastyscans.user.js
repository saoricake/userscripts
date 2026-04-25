// ==UserScript==
// @name        Arrow Key Navigation - Dynasty Scans
// @namespace   https://github.com/saoricake/userscripts
// @version     1
// @author      saori
// @description Lets you use the left and right arrow keys to move through pages on Dynasty Scans.
// @match       *://dynasty-scans.com/*
// @exclude     *://dynasty-scans.com/user*
// @exclude     *://dynasty-scans.com/requests*
// @downloadURL https://github.com/saoricake/userscripts/raw/main/arrow-key-navigation/dynastyscans.user.js
// @updateURL   https://github.com/saoricake/userscripts/raw/main/arrow-key-navigation/dynastyscans.user.js
// ==/UserScript==

document.addEventListener("keydown", (ev) => {
  if (ev.key !== "ArrowLeft" && ev.key !== "ArrowRight") return;
  if (document.activeElement?.type === "text") return;
  if (ev.repeat) return;

  const query = {
    ArrowLeft: "a[rel='prev']",
    ArrowRight: "a[rel='next']"
  }

  const link = document.querySelector(query[ev.key]);
  if (link) link.click();
});
