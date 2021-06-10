/* inserted by pull.js */
import _twAsset0 from "./pause.svg";
import _twAsset1 from "./play.svg";
const _twGetAsset = (path) => {
  if (path === "/pause.svg") return _twAsset0;
  if (path === "/play.svg") return _twAsset1;
  throw new Error(`Unknown asset: ${path}`);
};

import { paused, setPaused, onPauseChanged } from "./module.js";

export default async function ({ addon, global, console, msg }) {
  const img = document.createElement("img");
  img.className = "pause-btn";
  img.draggable = false;
  img.title = msg("pause");

  const setSrc = () => (img.src = _twGetAsset((paused ? "/play.svg" : "/pause.svg")));
  img.addEventListener("click", () => setPaused(!paused));
  addon.tab.displayNoneWhileDisabled(img);
  addon.self.addEventListener("disabled", () => setPaused(false));
  setSrc();
  onPauseChanged(setSrc);

  while (true) {
    const flag = await addon.tab.waitForElement("[class^='green-flag']", {
      markAsSeen: true,
      reduxEvents: ["scratch-gui/mode/SET_PLAYER", "fontsLoaded/SET_FONTS_LOADED", "scratch-gui/locales/SELECT_LOCALE"],
    });
    flag.insertAdjacentElement("afterend", img);
  }
}
