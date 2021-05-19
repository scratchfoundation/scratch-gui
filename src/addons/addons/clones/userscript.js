export default async function ({ addon, global, console, msg }) {
  const vm = addon.tab.traps.vm;

  hideInSmallStageMode({ addon });

  let countContainerContainer = document.createElement("div");

  addon.tab.displayNoneWhileDisabled(countContainerContainer, { display: "flex" });

  let countContainer = document.createElement("div");
  let count = document.createElement("span");
  let icon = document.createElement("span");

  countContainerContainer.className = "clone-container-container";
  countContainer.className = "clone-container";
  count.className = "clone-count";
  icon.className = "clone-icon";

  countContainerContainer.appendChild(icon);
  countContainerContainer.appendChild(countContainer);
  countContainer.appendChild(count);

  let lastChecked = 0;

  const cache = Array(301)
    .fill()
    .map((_, i) => msg("clones", { cloneCount: i }));

  function doCloneChecks() {
    const v = vm.runtime._cloneCounter;
    // performance
    if (v === lastChecked) return false;
    countContainerContainer.dataset.count = lastChecked = v;
    count.dataset.str = cache[v] || msg("clones", { cloneCount: v });
    return true;
  }

  const check = () => {
    if (doCloneChecks() && addon.tab.editorMode === "editor") {
      if (!countContainerContainer.isConnected) {
        const elem = document.querySelector("[class^='controls_controls-container']");
        elem.appendChild(countContainerContainer);
      }
    }
  };
  vm.runtime.on("targetWasRemoved", (t) => {
    // Fix bug with inaccurate clone counter
    if (t.isOriginal) vm.runtime.changeCloneCounter(1);
  });
  const oldStep = vm.runtime.constructor.prototype._step;
  vm.runtime.constructor.prototype._step = function (...args) {
    check();
    return oldStep.call(this, ...args);
  };
}

async function hideInSmallStageMode({ addon }) {
  while (true) {
    await addon.tab.waitForElement("[class*='stage-header_stage-size-toggle-group']", {
      markAsSeen: true,
      reduxEvents: ["scratch-gui/mode/SET_PLAYER", "fontsLoaded/SET_FONTS_LOADED", "scratch-gui/locales/SELECT_LOCALE"],
      reduxCondition: (state) => !state.scratchGui.mode.isPlayerOnly,
    });

    document.querySelector("[class*='stage-header_stage-button-first']").addEventListener("click", () => {
      document.querySelector(".clone-container-container").style.display = "none";
    });
    document.querySelector("[class*='stage-header_stage-button-last']").addEventListener("click", () => {
      document.querySelector(".clone-container-container").style.display = "";
    });
  }
}
