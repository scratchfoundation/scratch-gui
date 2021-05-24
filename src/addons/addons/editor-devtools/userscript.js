/* inserted by pull.js */
import _twAsset0 from "./icon--close.svg";
const _twGetAsset = (path) => {
  if (path === "/icon--close.svg") return _twAsset0;
  throw new Error(`Unknown asset: ${path}`);
};

import DevTools from "./DevTools.js";

export default async function ({ addon, global, console, msg, safeMsg: m }) {
  const untilInEditor = () => {
    if (addon.tab.editorMode === "editor") return;
    return new Promise((resolve, reject) => {
      const handler = () => {
        if (addon.tab.editorMode === "editor") {
          resolve();
          addon.tab.removeEventListener("urlChange", handler);
        }
      };
      addon.tab.addEventListener("urlChange", handler);
    });
  };

  await untilInEditor();

  const guiDirection = addon.tab.direction;
  const helpHTML = `
<div id="s3devHelpPop" class="${addon.tab.scratchClass("modal_modal-overlay")}" dir="${guiDirection}">
<div class="${addon.tab.scratchClass("modal_modal-content")}">
<div class="${addon.tab.scratchClass("modal_header")}">
  <div class="${addon.tab.scratchClass("modal_header-item", "modal_header-item-title")}">${m("help-title")}</div>
  <div class="${addon.tab.scratchClass("modal_header-item", "modal_header-item-close")}">
    <div class="${addon.tab.scratchClass("close-button_close-button", "close-button_large", {
      others: "close-button",
    })}">
	  <img class="${addon.tab.scratchClass("close-button_close-icon")}" src="${_twGetAsset("/icon--close.svg")}">
	</div>
  </div>
</div>
<div id="s3devHelpContent">
<!-- tw: we don't put this in because including "Scratch Addons" would probably violate BE/US policy :(
<p>${m("help-title")} ${m("help-by", {
    ndash: "&ndash;",
    url: '<a target="_blank" rel="noreferrer noopener" href="https://www.youtube.com/griffpatch">Griffpatch</a>',
  })}</p>
-->
<hr />
<h2><strong>${m("code-tab-features")}</strong></h2>
<p dir="auto"><strong>${m("interactive-find-bar")}</strong> &ndash; ${m("interactive-find-bar-desc")}</p>
<p dir="auto"><strong>${m("improved-tidy-up")}</strong> &ndash; ${m("improved-tidy-up-desc")}</p>
<p dir="auto"><strong>${m("help-make-space")} ${m("help-new")}</strong> &ndash; ${m("help-make-space-desc")}</p>
<p dir="auto"><strong>${m("copy-to-clipboard")}</strong> &ndash; ${m("copy-to-clipboard-desc")}</p>
<p dir="auto"><strong>${m("paste-from-clipboard")}</strong> &ndash; ${m("paste-from-clipboard-desc")}</p>
<p dir="auto"><strong>${m("swap-variable")}</strong> &ndash; ${m("swap-variable-desc")}</p>
<p dir="auto"><strong>${m("middleclick")}</strong> &ndash; ${m("middleclick-desc")}</p>
<p dir="auto"><strong>${m("ctrl-lr")}</strong> &ndash; ${m("ctrl-lr-desc")}</p>
<p dir="auto"><strong>${m("ctrl-space")}</strong> &ndash; ${m("ctrl-space-desc")}</p>
<hr />
<h2><strong>${m("costume-tab-features")}</strong></h2>
<p dir="auto"><strong>${m("find-bar")}</strong> &ndash; ${m("find-bar-costume-desc")}</p>
<p dir="auto"><strong>${m("ctrl-lr")}</strong> &ndash; ${m("ctrl-lr-costume-desc")}</p>
<p dir="auto"><strong>${m("send-top-bottom")}</strong> &ndash; ${m("send-top-bottom-desc")}</p>
<hr />
<p>${m(
    "youtube"
  )} -&nbsp;<a target="_blank" rel="noreferrer noopener" href="https://www.youtube.com/griffpatch">https://www.youtube.com/user/griffpatch</a></p>
</div>
</div>
</div>
`;

  const devTools = new DevTools(addon, msg, m, helpHTML);
  devTools.init();
}
