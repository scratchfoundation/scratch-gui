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
import _twAsset9 from "./icons/tw_icon.svg";
import _twAsset10 from "./icons/variables_icon.svg";
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
  if (path === "/icons/tw_icon.svg") return _twAsset9;
  if (path === "/icons/variables_icon.svg") return _twAsset10;
  throw new Error(`Unknown asset: ${path}`);
};

//When the page loads add the icons.
export default async function ({ addon, global, console }) {
  while (true) {
    await addon.tab.waitForElement(".scratchCategoryMenu", {
      markAsSeen: true,
    });

    /*
     * An array of iconify icons for the categories.
     */
    let icons = {
      motion: "motion_icon",
      looks: "looks_icon",
      sound: "sound_icon",
      events: "events_icon",
      control: "control_icon",
      sensing: "sensing_icon",
      operators: "operators_icon",
      variables: "variables_icon",
      lists: "list_icon",
      myBlocks: "block_icon",
      tw: "tw_icon",
    };
    //For each .scratchCategoryItemBubble add an icon
    document.querySelectorAll(".scratchCategoryItemBubble").forEach((item) => {
      const category = Array.from(item.parentNode.classList)
        .find((i) => i.startsWith("scratchCategoryId"))
        .split("-")[1];
      const imgSrc = icons[category];
      if (!imgSrc) return;
      let k = document.createElement("img");
      k.src = _twGetAsset(`/icons/${imgSrc}.svg`);
      k.id = "sa-category-icon";
      addon.tab.displayNoneWhileDisabled(k);
      item.appendChild(k);
    });
  }
}
