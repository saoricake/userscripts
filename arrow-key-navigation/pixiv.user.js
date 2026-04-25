// ==UserScript==
// @name        Arrow Key Navigation - Pixiv
// @namespace   https://github.com/saoricake/userscripts
// @version     1
// @author      saori
// @description Lets you use the left and right arrow keys to move through pages on Pixiv.
// @match       *://www.pixiv.net/*
// @downloadURL https://github.com/saoricake/userscripts/raw/main/arrow-key-navigation/pixiv.user.js
// @updateURL   https://github.com/saoricake/userscripts/raw/main/arrow-key-navigation/pixiv.user.js
// ==/UserScript==

document.addEventListener("keydown", (ev) => {
  if (ev.key !== "ArrowLeft" && ev.key !== "ArrowRight") return;
  if (ev.repeat) return;
  if (document.activeElement?.type === "text") return;
  if (document.activeElement?.tagName === "TEXTAREA") return;

  const isUserPage = location.pathname.includes("/users/");
  const query = {
    ArrowLeft: isUserPage ? "a[aria-label='Previous']" : "nav a:has(> svg):first-child",
    ArrowRight: isUserPage ? "a[aria-label='Next']" : "nav a:has(> svg):last-child"
  }

  const link = document.querySelector(query[ev.key]);
  if (link && !link.hidden) link.click();
});
