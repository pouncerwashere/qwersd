// ==UserScript==
// @name         jugglingedgecollapse
// @namespace    jugglingedgecollapse
// @version      0.1
// @description  enter something useful
// @author       You
// @match        http://www.jugglingedge.com/*
// @include        http://www.jugglingedge.com/*
// @grant        1
// ==/UserScript==


window.addEventListener('DOMContentLoaded', function (e) {

	var els = document.evaluate("(//div[contains(@class,'SmallReply')] | //div[contains(@class,'SmallOP')])", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

	for (i = 0; i < els.snapshotLength; i++) {

		linky = document.createElement("a");
		linky.style.float = "left";
		linky.style.marginTop = "1em";
		linky.style.marginRight = "0.5em";
		linky.href = "javascript:void();";
		linky.className = "collapseLinky";
		linky.id = i;
		linky.appendChild(document.createTextNode('[−]'));
		linky.onclick = function (e) {
			var els = document.evaluate("(//div[contains(@class,'SmallReply')] | //div[contains(@class,'SmallOP')])", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			i = parseInt(this.id);
			if (this.innerHTML == "[−]") {
				collapsed = 1;
				this.innerHTML = "[+]"
				els.snapshotItem(i).style.height = "3.2em";
				els.snapshotItem(i).style.overflow = "hidden";
			} else {
				collapsed = 0;
				this.innerHTML = "[−]";
				els.snapshotItem(i).style.height = "auto";
				//els.snapshotItem(i).style.overflow = "hidden";
			}

			j = i + 1;

			li = parseFloat((els.snapshotItem(i).style.marginLeft).replace('px',''));
			lj = parseFloat((els.snapshotItem(j).style.marginLeft).replace('px',''));

			while (lj > li) {

				if (collapsed == 1) {
					els.snapshotItem(j).style.display = "none";
				}
				else {
					els.snapshotItem(j).style.display = "block";
				}
				j++;
				lj = parseFloat((els.snapshotItem(j).style.marginLeft).replace('px',''));

			}

		};

		els.snapshotItem(i).insertBefore(linky, els.snapshotItem(i).firstChild);
	}

}, false);
