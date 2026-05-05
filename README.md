repo for userscripts created by me, saori. unless stated otherwise, they were all made (and tested) with [violentmonkey](https://violentmonkey.github.io/) on firefox.

- [Arrow Key Navigation](#arrow-key-navigation)
- [Dynasty Colored Links](#dynasty-colored-links)
- [I Hate YouTube Shorts](#i-hate-youtube-shorts)
- [Pixiv Skip Offsite Link Interceptor](#pixiv-skip-offsite-link-interceptor)

## Arrow Key Navigation

a collection of scripts. each of them adds the ability to navigate through paginated pages with the left and right arrow keys to a particular site that doesn't have that functionality.

available for [dynasty scans](https://github.com/saoricake/userscripts/raw/main/arrow-key-navigation/dynastyscans.user.js), [exhentai](https://github.com/saoricake/userscripts/raw/main/arrow-key-navigation/exhentai.user.js), [hentainexus](https://github.com/saoricake/userscripts/raw/main/arrow-key-navigation/hentainexus.user.js), and [pixiv](https://github.com/saoricake/userscripts/raw/main/arrow-key-navigation/pixiv.user.js).

## [Dynasty Colored Links](https://github.com/saoricake/userscripts/raw/main/dynasty-colored-links.user.js)

colors links on the [dynasty reader](https://dynasty-scans.com/) if you've added the respective work to your read, to read, or subscribed lists. based on the old [dynasty mark read](https://github.com/luejerry/dynasty-markread) script by cyricc/luejerry.

note that, due to list pages on dynasty now being paginated, rather than a single page, the script works a bit differently from how the old one did. one page's worth of list items will be retrieved from each of the aforementioned lists every time you go to a new page on the site. as a result, you'll see links to works you added to your lists more recently colored first, while older ones might take a while to color. they should all eventually be colored properly if you just use the site as normal, though.

if a link appears colored when it shouldn't (or vice versa (...and other things you added to your lists around that time *are* colored correctly)), try adding/removing the thing from the relevant list, then removing/adding it back again, and that should fix it. if the problem persists, or if this keeps happening with lots of links, then feel free to contact me about it and i'll look into it.

## [I Hate YouTube Shorts](https://github.com/saoricake/userscripts/raw/main/i-hate-youtube-shorts.user.js)

redirects links to youtube shorts to the standard video player, so you don't have to deal with that tiktokified bullshit.

there already are some userscripts that do this, but the ones i found were pretty slow to do the page change. this one has it happen instantly, so you won't even see the shorts page.

## [Pixiv Skip Offsite Link Interceptor](https://github.com/saoricake/userscripts/raw/main/pixiv-offsite-links.user.js)

normally, when you're on pixiv and click a link that'll take you to some other site, you'll be redirected to an interstitial page first, where you have to manually click another link to proceed. this script makes those pages proceed automatically.
