/**!
 * Imported from SA
 * @license GPLv3.0 (see LICENSE_GPL or https://www.gnu.org/licenses/ for more information)
 */

/* inserted by pull.js */
import _twAsset0 from "./icons/block_icon.svg";
import _twAsset1 from "./icons/control_icon.svg";
import _twAsset2 from "./icons/events_icon.svg";
import _twAsset3 from "./icons/list_icon.svg";
import _twAsset4 from "./icons/looks_icon.svg";
import _twAsset5 from "./icons/motion_icon.svg";
import _twAsset6 from "./icons/operators_icon.svg";
import _twAsset7 from "./icons/sensing_icon.svg";
import _twAsset8 from "./icons/sound_icon.svg";
import _twAsset9 from "./icons/variables_icon.svg";
const _twGetAsset = (path) => {
  if (path === "/icons/block_icon.svg") return _twAsset0;
  if (path === "/icons/control_icon.svg") return _twAsset1;
  if (path === "/icons/events_icon.svg") return _twAsset2;
  if (path === "/icons/list_icon.svg") return _twAsset3;
  if (path === "/icons/looks_icon.svg") return _twAsset4;
  if (path === "/icons/motion_icon.svg") return _twAsset5;
  if (path === "/icons/operators_icon.svg") return _twAsset6;
  if (path === "/icons/sensing_icon.svg") return _twAsset7;
  if (path === "/icons/sound_icon.svg") return _twAsset8;
  if (path === "/icons/variables_icon.svg") return _twAsset9;
  throw new Error(`Unknown asset: ${path}`);
};

//When the page loads add the icons.
export default async function ({ addon, global, console }) {
  while (true) {
    const tabs = await addon.tab.waitForElement(".scratchCategoryMenu", {
      markAsSeen: true,
    });

    /*
     * An array of iconify icons for the categories.
     */
    let icons = [
      "motion_icon",
      "looks_icon",
      "sound_icon",
      "events_icon",
      "control_icon",
      "sensing_icon",
      "operators_icon",
      "variables_icon",
      "block_icon",
    ];
    if (document.querySelector(".scratchCategoryId-lists")) icons.splice(8, 0, "list_icon");
    //For each .scratchCategoryItemBubble add an icon
    document.querySelectorAll(".scratchCategoryItemBubble").forEach((item, i) => {
      //Make the padding a little bigger to fit the icons.
      item.style.padding = "11px";
      //Position it relative so that absolute positioning will be relative to the bubble.
      item.style.position = "relative";
      let k = document.createElement("img");
      try {
        k.src = _twGetAsset(`/icons/${icons[i]}.svg`);
        Object.assign(k.style, {
          filter: "brightness(50000%)",
          top: "50%",
          color: "white",
          left: "50%",
          transform: "translate(-50%, -50%)",
          position: "absolute",
          width: "17px",
          height: "17px",
        });
        item.appendChild(k);
      } catch (e) {
        // ignore
      }
    });
  }
}
