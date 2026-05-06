# [dynasty-list-marker](https://github.com/saoricake/userscripts/raw/main/dynasty-list-marker/script.user.js)

this userscript changes what a link on [dynasty scans](https://dynasty-scans.com/) looks like if you've added the thing it's linking to to one of your four default lists (`to-read`, `read`, `favorites`, and `subscribed`). lists that you've created yourself are not supported.

based on the old [dynasty mark read](https://github.com/luejerry/dynasty-markread) script, which was great, but stopped working when the site changed lists to be paginated (only items on the first page of a list were being kept track of). i consider this to be essential functionality for a manga reader, so i decided to make my own version of the script, also taking the opportunity to adjust some things.

**install the script by clicking [HERE](https://github.com/saoricake/userscripts/raw/main/dynasty-list-marker/script.user.js)! but make sure to read on to understand how it works, too!**

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

