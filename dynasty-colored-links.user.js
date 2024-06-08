// ==UserScript==
// @name        Dynasty Colored Links
// @namespace   https://dynasty-scans.com
// @version     0.1
// @author      saori
// @description Colors links to works you've added to your read/subscribed/to read lists.
// @match       https://dynasty-scans.com/
// @match       https://dynasty-scans.com/anthologies*
// @match       https://dynasty-scans.com/authors*
// @match       https://dynasty-scans.com/chapters*
// @match       https://dynasty-scans.com/doujins*
// @match       https://dynasty-scans.com/issues*
// @match       https://dynasty-scans.com/lists/*
// @match       https://dynasty-scans.com/pairings/*
// @match       https://dynasty-scans.com/scanlators/*
// @match       https://dynasty-scans.com/search?*
// @match       https://dynasty-scans.com/series*
// @match       https://dynasty-scans.com/tags*
// @exclude     https://dynasty-scans.com/*/images
// @exclude     https://dynasty-scans.com/pairings/
// @downloadURL https://github.com/saoricake/userscripts/raw/main/dynasty-colored-links.user.js
// @updateURL   https://github.com/saoricake/userscripts/raw/main/dynasty-colored-links.user.js
// @require     https://cdnjs.cloudflare.com/ajax/libs/lz-string/1.5.0/lz-string.min.js
// ==/UserScript==

(async function() {
  // constants
  const ORIGIN = document.location.origin;
  const PATHNAME = document.location.pathname;

  const COLORS = {
    'read': '#999999',
    'subscribed': '#AD1457',
    'to-read': '#3A87AD',
  };

  const TRACKED = [
    '/anthologies/',
    '/chapters/',
    '/doujins/',
    '/issues/',
    '/series/',
    '/authors/',
  ];

  const PREFIX = 'color';

  // Utility stuff
  const array = Array.from;
  const keys = Object.keys;
  const parser = new DOMParser();
  const slicePathname = href => href.slice(ORIGIN.length);

  async function fetchDoc(url) {
    const docAsString = await fetch(url).then(r => r.text());
    return parser.parseFromString(docAsString, 'text/html');
  }

  const storage = (function() {
    const compress = LZString.compress;
    const decompress = LZString.decompress;
    const type = value => (value).constructor.name;

    return {
      set(key, value) {
        const valueToStore = type(value) === 'Set' ? array(value) : value;
        const valueAsString = JSON.stringify(valueToStore);

        localStorage.setItem(`${PREFIX}_${key}`, compress(valueAsString));
      },
      get(key) {
        const storedValue = localStorage.getItem(`${PREFIX}_${key}`);

        if (storedValue === null) return undefined;

        const value = JSON.parse(decompress(storedValue));
        return type(value) === 'Array' ? new Set(value) : value;
      },
      update(listKey, item, action) {
        const storedItems = storage.get(listKey);
        if (storedItems === undefined) return;

        if (action === 'add') {
          storedItems.add(item);
          if (listKey.startsWith('read')) {
            storage.update(listKey.replace('read', 'to-read'), item, 'remove');
          }
        } else if (action === 'remove') {
          storedItems.delete(item);
        }

        storage.set(listKey, storedItems);
      }
    }
  })();

  // Fetching items from lists
  function getLinksFromList(doc) {
    const links = doc.getElementsByClassName('name');
    const linksArray = array(links)
      .filter(a => TRACKED.some(t => a.href.includes(t)))
      .map(a => slicePathname(a.href));
    return new Set(linksArray);
  }

  async function getListItems(listID, listName, subList, page) {
    const pageURL = `${ORIGIN}/lists/${listID}-${listName}?view=${subList}&page=${page}`;
    const pageDoc = await fetchDoc(pageURL);
    const pageLinks = getLinksFromList(pageDoc);
    const nextPageLink = pageDoc.querySelector('[rel="next"]');

    return {
      newLinks: pageLinks,
      newHasNext: nextPageLink !== null
    };
  }

  // Colorings links
  function getLinksFromCurrentPage() {
    const ignore = ['btn', 'label', 'page'];

    const mainDiv = document.getElementById('main');
    const links = mainDiv
      ? array(mainDiv.getElementsByTagName('a'))
      : [];
    return links.filter(a => (
      a.href.startsWith(ORIGIN)
      && ignore.every(c => !a.classList.contains(c))
      && TRACKED.some(t => a.href.includes(t))
      && !a.href.endsWith('/images')
    ));
  }

  function createListStyles(listKey) {
    const listClass = `${PREFIX}_${listKey}`;
    return `
      a.${listClass} b,
      a.${listClass} .title,
      dd a.${listClass},
      #chapter-title a.${listClass},
      #chapter-details a.${listClass} {
        color: ${COLORS[listKey]};
      }
    `;
  }

  // Execute
  async function getAndStoreListURLs() {
    const doc = await fetchDoc(`${ORIGIN}/lists`);
    const listURLs = doc.getElementsByClassName('table-link');
    const filteredListURLs = array(listURLs)
      .slice(0, 4)
      .map(a => a.href.slice(`${ORIGIN}/lists/`.length).split(/(?<=\d+)-/));
    const storageURLs = {};

    for (const listKey of keys(COLORS)) {
      const foundURL = filteredListURLs.find(u => u[1] === listKey);
      storageURLs[listKey] = foundURL[0];
    }

    storage.set('urls', storageURLs);
    return storageURLs;
  }

  await (async function() {
    // Get the cache
    const listItems = {};

    for (const listKey of keys(COLORS)) {
      for (const subList of ['chapters', 'tags']) {
        const storageKey = `${listKey}_${subList}`;
        listItems[storageKey] = storage.get(storageKey) ?? new Set();
      }
    }

    // Get links from current page and add classes to them
    const links = getLinksFromCurrentPage();

    for (const link of links) {
      for (const listKey of keys(COLORS)) {
        const linkPathname = slicePathname(link.href);
        const [,itemType,] = linkPathname.split('/');
        const subList = itemType !== 'chapters' ? 'tags' : 'chapters';

        if (listItems[`${listKey}_${subList}`].has(linkPathname)) {
          link.classList.add(`${PREFIX}_${listKey}`);
          break;
        }
      }
    }

    // Create styles
    const styleElement = document.createElement('style');
    let styles = '';

    for (const listKey of keys(COLORS)) {
      styles += createListStyles(listKey);
    }
    styleElement.textContent = `#main { ${styles} }`;

    document.head.appendChild(styleElement);

    // Queue cache update
    async function updateCache() {
      const listURLs = storage.get('urls') ?? await getAndStoreListURLs();
      const hasNexts = storage.get('hasNext') ?? {};

      for (const storageKey of keys(listItems)) {
        hasNexts[storageKey] ??= true;
        const [listKey, subList] = storageKey.split('_');

        if (hasNexts[storageKey] === true) {
          const nextPage = Math.floor(listItems[storageKey].size / 40) + 1;

          const {newLinks, newHasNext} = await getListItems(
            listURLs[listKey], listKey, subList, nextPage,
          );

          for (const newLink of newLinks) {
            listItems[storageKey].add(newLink);
          }

          storage.set(storageKey, listItems[storageKey]);

          if (hasNexts[storageKey] !== newHasNext) {
            hasNexts[storageKey] = newHasNext;
            storage.set('hasNext', hasNexts);
          }
        }
      }
    }

    if (document.visibilityState === 'hidden') {
      document.onvisibilitychange = async function() {
        document.onvisibilitychange = null;
        await updateCache();
      }
    } else {
      await updateCache();
    }
  })();

  // Hook user updates to list and update the cache if needed
  (async function() {
    if (!TRACKED.some(t => PATHNAME.startsWith(t))) return;

    const baseOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function() {
      const method = arguments[0];

      this.onload = function() {
        if (method === 'POST' && this.status === 200) {
          const listKey = keys(COLORS).find(l => {
            const listRegExp = RegExp(`\\d+-${l}`);
            return this.responseURL.match(listRegExp);
          });

          if (listKey) {
            const resBody = JSON.parse(this.response);
            const action = resBody.added ? 'add' : resBody.removed ? 'remove' : '';

            const itemType = PATHNAME.split('/')[1];
            const subList = itemType !== 'chapters' ? 'tags' : 'chapters';

            storage.update(`${listKey}_${subList}`, PATHNAME, action);
          }
        }
      }

      baseOpen.apply(this, arguments);
    }
  })();
})();
