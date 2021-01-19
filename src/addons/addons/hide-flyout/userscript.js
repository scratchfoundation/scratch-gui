/**!
 * Imported from SA
 * @license GPLv3.0 (see LICENSE or https://www.gnu.org/licenses/ for more information)
 */

export default async function ({ addon, global, console }) {
  while (true) {
    let flyOut = await addon.tab.waitForElement(".blocklyFlyout", { markAsSeen: true });
    let scrollBar = document.querySelector(".blocklyFlyoutScrollbar");
    let blocklySvg = document.querySelector(".blocklySvg");

    // Placeholder Div
    let placeHolderDiv = document.body.appendChild(document.createElement("div"));
    placeHolderDiv.className = "sa-flyout-placeHolder";
    placeHolderDiv.style.height = `${flyOut.getBoundingClientRect().height}px`;
    placeHolderDiv.style.width = `${flyOut.getBoundingClientRect().width}px`;
    placeHolderDiv.style.left = `${flyOut.getBoundingClientRect().left}px`;
    placeHolderDiv.style.top = `${flyOut.getBoundingClientRect().top}px`;

    let flyoutLock = false;

    // Lock Img
    let lockDisplay = document.createElement("img");
    lockDisplay.src = addon.self.dir + "/unlock.svg";
    lockDisplay.style.top = `${flyOut.getBoundingClientRect().top}px`;
    lockDisplay.style.left = `${flyOut.getBoundingClientRect().right - 32}px`;
    lockDisplay.className = "sa-lock-image";
    lockDisplay.onclick = () => {
      flyoutLock = !flyoutLock;
      lockDisplay.src = addon.self.dir + `/${flyoutLock ? "" : "un"}lock.svg`;
    };

    // Only append and add onclick listeners if we don't have "catagoryclick" on
    if (addon.settings.get("toggle") == "hover") {
      document.body.appendChild(lockDisplay);
      let tabs = document.querySelectorAll("li[class^=react-tabs_react-tabs]");
      for (let tab of tabs)
        tab.onclick = () =>
          (lockDisplay.style.display = placeHolderDiv.style.display = [...tabs].indexOf(tab) == 0 ? "" : "none");
    }

    function getSpeedValue() {
      let data = {
        none: "0",
        short: "0.25",
        default: "0.5",
        long: "1",
      };
      return data[addon.settings.get("speed")];
    }

    function onmouseenter() {
      flyOut.classList.remove("sa-flyoutClose");
      flyOut.style.animation = `openFlyout ${getSpeedValue()}s 1`;
      scrollBar.classList.remove("sa-flyoutClose");
      scrollBar.style.animation = `openScrollbar ${getSpeedValue()}s 1`;
      lockDisplay.classList.remove("sa-flyoutClose");
      lockDisplay.style.animation = `openLock ${getSpeedValue()}s 1`;
      setTimeout(() => Blockly.getMainWorkspace().recordCachedAreas(), getSpeedValue() * 1000);
    }
    function onmouseleave(e) {
      // If we go behind the flyout or the user has locked it, let's return
      if ((e && e.clientX <= scrollBar.getBoundingClientRect().left) || flyoutLock) return;
      flyOut.classList.add("sa-flyoutClose");
      flyOut.style.animation = `closeFlyout ${getSpeedValue()}s 1`;
      scrollBar.classList.add("sa-flyoutClose");
      scrollBar.style.animation = `closeScrollbar ${getSpeedValue()}s 1`;
      lockDisplay.classList.add("sa-flyoutClose");
      lockDisplay.style.animation = `closeLock ${getSpeedValue()}s 1`;
      setTimeout(() => Blockly.getMainWorkspace().recordCachedAreas(), getSpeedValue() * 1000);
    }

    onmouseleave(); // close flyout on load
    let toggle = false;
    let selectedCat = null;
    if (addon.settings.get("toggle") == "hover") {
      placeHolderDiv.onmouseenter = onmouseenter;
      blocklySvg.onmouseenter = onmouseleave;
    }

    while (true) {
      let catagory = await addon.tab.waitForElement(".scratchCategoryMenuItem", { markAsSeen: true });
      catagory.onclick = (e) => {
        if (toggle && selectedCat == catagory && addon.settings.get("toggle") == "category") onmouseleave();
        else if (!toggle) onmouseenter();
        if (addon.settings.get("toggle") == "category") (toggle = !toggle), (selectedCat = catagory);
      };
    }
  }
}
