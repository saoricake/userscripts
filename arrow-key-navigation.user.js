// ==UserScript==
// @name        Arrow Key Navigation
// @namespace   https://github.com/saoricake/userscripts
// @version     1.0.1
// @author      saori
// @description Lets you use the left and right arrow keys to move through pages on select websites.
// @match       *://exhentai.org/*
// @exclude     *://exhentai.org/s/*
// @exclude     *://exhentai.org/uconfig.php
// @exclude     *://exhentai.org/mytags
// @match       *://hentainexus.com/*
// @exclude     *://hentainexus.com/read/*
// @match       *://www.pixiv.net/*
// @downloadURL https://github.com/saoricake/userscripts/raw/main/arrow-key-navigation.user.js
// @updateURL   https://github.com/saoricake/userscripts/raw/main/arrow-key-navigation.user.js
// ==/UserScript==

(() => {
  /**
   * @type {{ [host: string]: () => ({ "ArrowLeft": string; "ArrowRight": string }) }}
   */
  const linkQueryMap = {
    "exhentai.org": () => {
      const isGallery = location.pathname.startsWith("/g/");
      return {
        "ArrowLeft": isGallery ? ".ptt td:first-of-type a" : "#uprev",
        "ArrowRight": isGallery ? ".ptt td:last-of-type a" : "#unext"
      }
    },
    "hentainexus.com": () => ({
      "ArrowLeft": ".pagination-previous",
      "ArrowRight": ".pagination-next"
    }),
    "www.pixiv.net": () => {
      switch (true) {
        case location.pathname.includes("/en/users/"): {
          return {
            "ArrowLeft": "a[aria-label='Previous']",
            "ArrowRight": "a[aria-label='Next']"
          }
        }
        case location.pathname.includes("/en/artworks/"): {
          return { "ArrowLeft": "null", "ArrowRight": "null" }
        }
        default: {
          return {
            "ArrowLeft": "nav:has(> a):last-child a:first-of-type",
            "ArrowRight": "nav:has(> a):last-child a:last-of-type"
          }
        }
      }
    }
  };

  document.onkeydown = (ev) => {
    if (document.activeElement?.type === "text") return;
    if (document.activeElement?.tagName === "TEXTAREA") return;
    if (ev.repeat) return;
    if (ev.key !== "ArrowLeft" && ev.key !== "ArrowRight") return;

    const query = linkQueryMap[location.host]()[ev.key];
    const link = document.querySelector(query);

    if (link) { link.click(); }
  }
})();
