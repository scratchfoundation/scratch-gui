/**!
 * Imported from SA
 * @license GPLv3.0 (see LICENSE_GPL or https://www.gnu.org/licenses/ for more information)
 */

export default async function ({ addon, global, console }) {
  console.log("mouse pos enabled");

  let pos = null;

  const vm = addon.tab.traps.vm;

  vm.runtime.ioDevices.mouse.__scratchX = vm.runtime.ioDevices.mouse._scratchX;
  vm.runtime.ioDevices.mouse.__scratchY = vm.runtime.ioDevices.mouse._scratchY;

  var x = vm.runtime.ioDevices.mouse.__scratchX ? vm.runtime.ioDevices.mouse.__scratchX : 0;
  var y = vm.runtime.ioDevices.mouse.__scratchY ? vm.runtime.ioDevices.mouse.__scratchY : 0;

  const showUpdatedValue = () => pos && pos.setAttribute("data-content", `${x}, ${y}`);

  Object.defineProperty(vm.runtime.ioDevices.mouse, "_scratchX", {
    get: function () {
      return this.__scratchX;
    },
    set: function (setx) {
      x = setx;
      showUpdatedValue();
      this.__scratchX = setx;
    },
  });

  Object.defineProperty(vm.runtime.ioDevices.mouse, "_scratchY", {
    get: function () {
      return this.__scratchY;
    },
    set: function (sety) {
      y = sety;
      showUpdatedValue();
      this.__scratchY = sety;
    },
  });

  hideInSmallStageMode({ addon });

  while (true) {
    let bar = await addon.tab.waitForElement('[class*="controls_controls-container"]', { markAsSeen: true });

    if (addon.tab.editorMode === "editor") {
      // my attempt at detecting if they're in the editor?
      var posContainerContainer = document.createElement("div");
      var posContainer = document.createElement("div");
      pos = document.createElement("span");

      posContainerContainer.className = "pos-container-container";
      posContainer.className = "pos-container";

      posContainerContainer.appendChild(posContainer);
      posContainer.appendChild(pos);

      bar.appendChild(posContainerContainer);

      showUpdatedValue();
    }
  }
}

async function hideInSmallStageMode({ addon }) {
  while (true) {
    await addon.tab.waitForElement("[class*='stage-header_stage-size-toggle-group']", { markAsSeen: true });

    document.querySelector("[class*='stage-header_stage-button-first']").addEventListener("click", () => {
      document.querySelector(".pos-container-container").style.display = "none";
    });
    document.querySelector("[class*='stage-header_stage-button-last']").addEventListener("click", () => {
      document.querySelector(".pos-container-container").style.display = "";
    });
  }
}
