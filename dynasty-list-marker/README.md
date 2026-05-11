# [dynasty-list-marker](https://github.com/saoricake/userscripts/raw/main/dynasty-list-marker/script.user.js)

this userscript changes what a link on [dynasty scans](https://dynasty-scans.com/) looks like if you've added the thing it's linking to to one of your four default lists (`to-read`, `read`, `favorites`, and `subscribed`). lists you've created yourself are not supported.

based on the old [dynasty mark read](https://github.com/luejerry/dynasty-markread) script, which was great, but stopped working when the site changed lists to be paginated (only items on the first page of a list were being kept track of). i consider this to be essential functionality for a manga reader, so i decided to make my own version of the script, also taking the opportunity to adjust some things.

## installation

0. install a userscript manager extension on your browser, like [tampermonkey](https://www.tampermonkey.net/index.php), [greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/), or [violentmonkey](https://violentmonkey.github.io/get-it/) (personally, i use the last one).
    - if you're using a chromium-based browser, like chrome or vivaldi and such, you may also have to go into the extension's option (through the general extensions menu) and toggle "Allow User Scripts" to on.
1. **install the script by clicking [HERE](https://github.com/saoricake/userscripts/raw/main/dynasty-list-marker/script.user.js)! but make sure to read on to understand how it works, too!**

## usage

<img width="1349" height="666" alt="examples of links with the script installed" src="https://github.com/user-attachments/assets/db89b2ca-0591-4a66-9868-97c6ccd52a83" />

the picture above shows some examples of what links will look like in most of the site.

- if something's in your `to-read` list, links to it will have an eye icon in front of it, and the text will become **bold**;
- if it's in your `read` list, it'll have a crossed-out eye icon, and the text will be gray;
- if it's in `favorites`, it'll get a star icon;
- and if it's in `subscribed`, it'll get a bookmark icon, with the text also becoming **bold**, like with `to-read`.

also, if something's in more than one of those lists, it'll use the style of the one that comes later in the above order. for example, i have Bloom Into You on both my `read` and `favorites` lists, but as you can see in the picture, it only has the star icon and normal color.

<img width="1349" height="501" alt="examples of links with the script installed on dynasty's homepage" src="https://github.com/user-attachments/assets/e551a159-c8c8-41c0-801d-f70db914923b" />

the site's front page works a bit differently. there, if you've added something to `read`, it'll appear grayed out, and there are no additional changes for the other lists.

## keeping track of things already on your lists

after installing the script, it won't be aware of what's already in your lists right away. in order for it to do that, you'll have to go to each of the lists (again, only `to-read`, `read`, `favorites`, and `subscribed`) and go through all of their pages. the script will recognize that something's in a given list when the page with that thing in it is loaded.

if you're like me, some of your lists might have hundreds of pages. if that's the case, i suggest also installing [this other script i made](https://github.com/saoricake/userscripts/raw/main/arrow-key-navigation/dynastyscans.user.js) that'll let you go to the next/previous page with the right/left arrow keys on your keyboard, respectively.

> [!IMPORTANT]
> you might notice that the script hides the controls for moving things from one list to another en masse. this is because there's no way for the script to be aware of when that feature was used, so using it would unavoidably cause problems. if you have any big moves to do, make them before installing the script.

## reporting bugs, issues, etc.

if you run into any problems, you can [open an issue here](https://github.com/saoricake/userscripts/issues/new). alternatively, you can contact me on discord (i'm `@trhvmn` there).
