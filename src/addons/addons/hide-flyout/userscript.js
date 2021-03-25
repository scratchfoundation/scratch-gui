/**!
 * Imported from SA
 * @license GPLv3.0 (see LICENSE or https://www.gnu.org/licenses/ for more information)
 */

/* inserted by pull.js */
import _twAsset0 from "./lock.svg";
import _twAsset1 from "./unlock.svg";
const _twGetAsset = (path) => {
  if (path === "/lock.svg") return _twAsset0;
  if (path === "/unlock.svg") return _twAsset1;
  throw new Error(`Unknown asset: ${path}`);
};

export default async function ({ addon, global, console }) {
  var placeHolderDiv = null,
    lockDisplay = null,
    flyoutLock = false;
  while (true) {
    let flyOut = await addon.tab.waitForElement(".blocklyFlyout", { markAsSeen: true });
    let blocklySvg = await addon.tab.waitForElement(".blocklySvg", { markAsSeen: true });
    (async () => {
      let scrollBar = document.querySelector(".blocklyFlyoutScrollbar");

      // Placeholder Div
      if (placeHolderDiv) placeHolderDiv.remove();
      placeHolderDiv = document.createElement("div");
      if (addon.settings.get("toggle") === "hover") document.body.appendChild(placeHolderDiv);
      placeHolderDiv.className = "sa-flyout-placeHolder";

      // Lock Img
      if (lockDisplay) lockDisplay.remove();
      lockDisplay = document.createElement("img");
      lockDisplay.src = _twGetAsset("/unlock.svg");
      lockDisplay.className = "sa-lock-image";
      lockDisplay.onclick = () => {
        flyoutLock = !flyoutLock;
        lockDisplay.src = _twGetAsset(`/${flyoutLock ? "" : "un"}lock.svg`);
      };

      function positionElements() {
        let addition = flyOut.classList.contains("sa-flyoutClose") ? 260 : 0;
        placeHolderDiv.style.height = `${flyOut.getBoundingClientRect().height - 20}px`;
        placeHolderDiv.style.width = `${flyOut.getBoundingClientRect().width}px`;
        placeHolderDiv.style.left = `${flyOut.getBoundingClientRect().left + addition}px`;
        placeHolderDiv.style.top = `${flyOut.getBoundingClientRect().top}px`;
        lockDisplay.style.top = `${flyOut.getBoundingClientRect().top}px`;
        lockDisplay.style.left = `${flyOut.getBoundingClientRect().right - 32 + addition}px`;
      }

      // Only append if we don't have "categoryclick" on
      if (addon.settings.get("toggle") === "hover") document.body.appendChild(lockDisplay);

      function getSpeedValue() {
        let data = {
          none: "0",
          short: "0.25",
          default: "0.5",
          long: "1",
        };
        return data[addon.settings.get("speed")];
      }

      function onmouseenter(speed = {}) {
        speed = typeof speed === "object" ? getSpeedValue() : speed;
        flyOut.classList.remove("sa-flyoutClose");
        flyOut.style.animation = `openFlyout ${speed}s 1`;
        scrollBar.classList.remove("sa-flyoutClose");
        scrollBar.style.animation = `openScrollbar ${speed}s 1`;
        lockDisplay.classList.remove("sa-flyoutClose");
        lockDisplay.style.animation = `openLock ${speed}s 1`;
        setTimeout(() => Blockly.getMainWorkspace().recordCachedAreas(), speed * 1000);
      }
      function onmouseleave(e, speed = getSpeedValue()) {
        // If we go behind the flyout or the user has locked it, let's return
        if (
          (addon.settings.get("toggle") !== "cathover" && e && e.clientX <= scrollBar.getBoundingClientRect().left) ||
          flyoutLock
        )
          return;
        flyOut.classList.add("sa-flyoutClose");
        flyOut.style.animation = `closeFlyout ${speed}s 1`;
        scrollBar.classList.add("sa-flyoutClose");
        scrollBar.style.animation = `closeScrollbar ${speed}s 1`;
        lockDisplay.classList.add("sa-flyoutClose");
        lockDisplay.style.animation = `closeLock ${speed}s 1`;
        setTimeout(() => Blockly.getMainWorkspace().recordCachedAreas(), speed * 1000);
      }

      // position elements which closes flyout on load
      positionElements();
      let toggle = true,
        selectedCat = null,
        justStart = true;
      if (addon.settings.get("toggle") === "hover")
        (placeHolderDiv.onmouseenter = onmouseenter), (blocklySvg.onmouseenter = onmouseleave);

      addon.tab.redux.initialize();
      addon.tab.redux.addEventListener("statechanged", (e) => {
        switch (e.detail.action.type) {
          // Event casted when switch to small or normal size stage or when screen size changed.
          case "scratch-gui/StageSize/SET_STAGE_SIZE":
          case "scratch-gui/workspace-metrics/UPDATE_METRICS":
            positionElements();
            break;

          // Event casted when you switch between tabs
          case "scratch-gui/navigation/ACTIVATE_TAB":
            // always 0, 1, 2
            lockDisplay.style.display = e.detail.action.activeTabIndex === 0 ? "block" : "none";
            placeHolderDiv.style.display = e.detail.action.activeTabIndex === 0 ? "block" : "none";
            if (e.detail.action.activeTabIndex === 0)
              onmouseenter(0), positionElements(), (toggle = true), (justStart = true);
            break;
          // Event casted when you switch between tabs
          case "scratch-gui/mode/SET_PLAYER":
            // always true or false
            lockDisplay.style.display = e.detail.action.isPlayerOnly ? "none" : "block";
            placeHolderDiv.style.display = e.detail.action.activeTabIndex === 0 ? "block" : "none";
            break;
        }
      });

      if (addon.settings.get("toggle") === "cathover") onmouseleave(null, 0);

      while (true) {
        let category = await addon.tab.waitForElement(".scratchCategoryMenuItem", { markAsSeen: true });
        category.onclick = (e) => {
          if (toggle && selectedCat === category && addon.settings.get("toggle") === "category")
            onmouseleave(), (selectedCat = category), (justStart = false);
          else if (!toggle) onmouseenter(), (selectedCat = category), (justStart = false);
          else return (selectedCat = category), (justStart = false);
          if (addon.settings.get("toggle") === "category") toggle = !toggle;
        };
        if (addon.settings.get("toggle") === "cathover")
          (category.onmouseover = onmouseenter), (flyOut.onmouseleave = onmouseleave);
      }
    })();
  }
}
