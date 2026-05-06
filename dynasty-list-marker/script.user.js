// ==UserScript==
// @name        Dynasty List Marker
// @namespace   https://github.com/saoricake/userscripts
// @version     1
// @author      saori
// @description Marks links to works you've saved on your "To Read", "Read", "Favorites", and "Subscribed" lists.
// @grant       none
// @match       *://dynasty-scans.com/*
// @exclude     *://dynasty-scans.com/forum*
// @exclude     *://dynasty-scans.com/user/suggestions*
// @exclude     *://dynasty-scans.com/requests*
// @downloadURL https://github.com/saoricake/userscripts/raw/main/dynasty-list-marker/script.user.js
// @updateURL   https://github.com/saoricake/userscripts/raw/main/dynasty-list-marker/script.user.js
// @require     https://cdnjs.cloudflare.com/ajax/libs/lz-string/1.5.0/lz-string.min.js
// ==/UserScript==

(() => {
  // 1. constants
  const statusIdMap = {
    "to-read": 1, // 0001
    read: 2,      // 0010
    favorites: 4, // 0100
    subscribed: 8 // 1000
  }
  const storageKey = "status";

  // 2. utility functions
  /** @param {string} pathname */
  const splitPathname = (pathname) => {
    const [, dir, nameAndChNum] = pathname.split("/");
		const [name, chNum] = (nameAndChNum ?? "").split(/_ch(?=\d+)/);
		return [dir, name, chNum];
  }

  /** @returns {object} */
  const getStorage = () => {
    const stored = localStorage.getItem(storageKey);
    return stored ? JSON.parse(LZString.decompress(stored)) : {};
  }

  /** @param {object} statusMap */
  const setStorage = (statusMap) => {
    const toStore = LZString.compress(JSON.stringify(statusMap));
    localStorage.setItem(storageKey, toStore);
  }

  /**
   * @param {string} pathname 
   * @param {object} statusMap 
   * @returns {number}
   */
  const getWorkStatus = (pathname, statusMap) => {
    const [dir, name, chNum] = splitPathname(pathname);

    statusMap[dir] ??= {};

    if (chNum) {
      statusMap[dir][name] ??= {};
      return statusMap[dir][name][chNum] ?? 0;
    } else {
      return statusMap[dir][name] ?? 0;
    }
  }

  /**
   * @param {string} pathname
   * @param {object} statusMap
   * @param {number} newStatus
   */
  const setWorkStatus = (pathname, statusMap, newStatus) => {
    if (Object.entries(statusMap).length === 0) {
      localStorage.removeItem("toReadMap");
      localStorage.removeItem("isReadMap");
      localStorage.removeItem("subscribedMap");
      localStorage.removeItem("markread_time_refreshed");
    }

    const removing = Math.sign(newStatus) === -1;
    const [dir, name, chNum] = splitPathname(pathname);
    statusMap[dir] ??= {};

    if (chNum) {
      statusMap[dir][name] ??= {};
      statusMap[dir][name][chNum] ??= 0;
      if (removing) {
        statusMap[dir][name][chNum] &= newStatus;
      } else {
        statusMap[dir][name][chNum] |= newStatus;
      }
    } else {
      statusMap[dir][name] ??= 0;
      if (removing) {
        statusMap[dir][name] &= newStatus;
      } else {
        statusMap[dir][name] |= newStatus;
      }
    }
  }

  // 3. execution
  // 3.1 add css to document
  (() => {
    const style = document.createElement("style");
    style.textContent = ".to-read{--icon-pos:-95px -119px;}.read{--icon-pos:-119px -119px;}.favorites{--icon-pos:-120px 1px;}.subscribed{--icon-pos:-71px -47px;}dl a:not(.label):is(.to-read,.read,.favorites,.subscribed)::before{display:inline-block;height:16px;width:18px;content:'';background-image:url(/assets/twitter/bootstrap/glyphicons-halflings-b4c22a0ed1f42188864f0046f0862ecb.png);background-position:var(--icon-pos);background-repeat:no-repeat;vertical-align:text-bottom;}dl a:not(.label):is(.to-read,.subscribed){font-weight:bold;}#main dl a.read:not(.label,.favorites,.subscribed){font-weight:normal;text-decoration-style:dotted;}dl a.read:not(.label,.favorites,.subscribed,:focus,:hover),ul.added a.read:not(:focus,:hover){color:#999999;}a.thumbnail.read:not(:focus,:hover){opacity:50%;}#main button.dropdown-toggle,dd input[type='checkbox']{display:none;}";
    document.head.appendChild(style);
  })();

  // 3.2 add classes to links
  (() => {
    const statusMap = getStorage();
    if (Object.entries(statusMap).length === 0) return;

    for (const link of document.querySelectorAll("#main a")) {
      const workStatus = getWorkStatus(link.pathname, statusMap);
      if (!workStatus) continue;

      for (const [statusName, statusId] of Object.entries(statusIdMap)) {
        if (!(statusId & workStatus)) continue;
        link.classList.add(statusName);
      }
    }
  })();

  // 3.3 listen for list changes
  (() => {
    const canAddToList = document.querySelectorAll(".navbar .dropdown").length > 1;
    if (!canAddToList) return;

    const baseOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(method, url) {
      this.onload = function() {
        if (method !== "POST" || this.status !== 200) return;

        const [, statusId] = Object.entries(statusIdMap)
          .find(([s]) => RegExp(`^/lists/\\d+-${s}/`).test(url)) ?? [];
        if (statusId === undefined) return;

        const response = JSON.parse(this.response);
        const action = Object.keys(response).filter(k => k !== "success")[0];
        const newStatus = { added: statusId, removed: ~statusId }[action];

        const statusMap = getStorage();
        setWorkStatus(location.pathname, statusMap, newStatus);
        setStorage(statusMap);
      }

      baseOpen.apply(this, [method, url]);
    }
  })();

  // 3.4 record statuses if in one of the relevant lists
  (() => {
    const currentList = /^\/lists\/\d+-([a-z-]+)$/.exec(location.pathname)?.[1];
    if (!currentList) return;
    if (!Object.keys(statusIdMap).includes(currentList)) return;

    const currentView = (new URLSearchParams(location.search)).get("view");
    const linkClass = currentView === "images" ? "thumbnail" : "name";
    const links = document.querySelectorAll(`.${linkClass}:not(.${currentList})`);
    if (links.length === 0) return;

    const newStatus = statusIdMap[currentList];
    const statusMap = getStorage();

    for (const link of links) {
      setWorkStatus(link.pathname, statusMap, newStatus);
    }

    setStorage(statusMap);
  })();
})();
