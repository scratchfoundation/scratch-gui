export default async function ({ addon, global, console, msg }) {
  const vm = addon.tab.traps.vm;

  if (addon.tab.redux.state && addon.tab.redux.state.scratchGui.stageSize.stageSize === "small") {
    document.body.classList.add("sa-clones-small");
  }
  document.addEventListener(
    "click",
    (e) => {
      if (e.target.closest("[class*='stage-header_stage-button-first']")) {
        document.body.classList.add("sa-clones-small");
      } else if (e.target.closest("[class*='stage-header_stage-button-last']")) {
        document.body.classList.remove("sa-clones-small");
      }
    },
    { capture: true }
  );

  let countContainerContainer = document.createElement("div");
  addon.tab.displayNoneWhileDisabled(countContainerContainer);

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
    if (v === lastChecked) return;
    countContainerContainer.dataset.count = lastChecked = v;
    count.dataset.str = cache[v] || msg("clones", { cloneCount: v });

    if (v === 0) countContainerContainer.style.display = "none";
    else countContainerContainer.style.display = "flex";
  }

  vm.runtime.on("targetWasRemoved", (t) => {
    // Fix bug with inaccurate clone counter
    if (t.isOriginal) vm.runtime.changeCloneCounter(1);
  });
  const oldStep = vm.runtime.constructor.prototype._step;
  vm.runtime.constructor.prototype._step = function (...args) {
    const ret = oldStep.call(this, ...args);
    doCloneChecks();
    return ret;
  };

  while (true) {
    let bar = await addon.tab.waitForElement('[class*="controls_controls-container"]', {
      markAsSeen: true,
      reduxEvents: ["scratch-gui/mode/SET_PLAYER", "fontsLoaded/SET_FONTS_LOADED", "scratch-gui/locales/SELECT_LOCALE"],
    });

    if (addon.tab.editorMode === "editor") {
      bar.appendChild(countContainerContainer);
    }
  }
}
