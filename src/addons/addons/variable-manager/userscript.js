/**!
 * Imported from SA
 * @license GPLv3.0 (see LICENSE_GPL or https://www.gnu.org/licenses/ for more information)
 */

/* inserted by pull.js */
import _twAsset0 from "./icon.svg";
import _twAsset1 from "./search.svg";
const _twGetAsset = (path) => {
  if (path === "/icon.svg") return _twAsset0;
  if (path === "/search.svg") return _twAsset1;
  throw new Error(`Unknown asset: ${path}`);
};

export default async function ({ addon, global, console, msg }) {
  const vm = addon.tab.traps.vm;

  let contentArea;
  let localVariables = [];
  let globalVariables = [];
  let preventUpdate = false;

  const manager = document.createElement("div");
  manager.classList.add(addon.tab.scratchClass("asset-panel_wrapper"), "sa-var-manager");

  const searchBox = document.createElement("input");
  searchBox.placeholder = msg("search");
  searchBox.className = "sa-var-manager-searchbox";

  searchBox.addEventListener("input", (e) => {
    for (const variable of localVariables) {
      variable.handleSearch(searchBox.value);
    }
    for (const variable of globalVariables) {
      variable.handleSearch(searchBox.value);
    }
    updateHeadingVisibility();
  });

  manager.appendChild(searchBox);

  // begin feedback button stuff (remove when out of beta)

  /*
  const feedbackWrapper = document.createElement("span");
  feedbackWrapper.className = "sa-var-manager-feedback";

  const feedbackDesc = document.createElement("span");
  feedbackDesc.className = "sa-var-manager-feedback-description";
  feedbackDesc.innerText = msg("feedback-description");

  const feedbackButton = document.createElement("a");
  feedbackButton.className = "sa-var-manager-feedback-button";
  feedbackButton.innerText = msg("feedback");
  feedbackButton.href = "https://scratchaddons.com/feedback?version=variable-manager";
  feedbackButton.target = "_blank";
  feedbackButton.rel = "noopener noreferrer";

  feedbackWrapper.appendChild(feedbackDesc);
  feedbackWrapper.appendChild(feedbackButton);
  manager.appendChild(feedbackWrapper);
  */

  // end feedback button stuff

  const localVars = document.createElement("div");
  const localHeading = document.createElement("span");
  const localList = document.createElement("table");
  localHeading.className = "sa-var-manager-heading";
  localHeading.innerText = msg("for-this-sprite");
  localVars.appendChild(localHeading);
  localVars.appendChild(localList);

  const globalVars = document.createElement("div");
  const globalHeading = document.createElement("span");
  const globalList = document.createElement("table");
  globalHeading.className = "sa-var-manager-heading";
  globalHeading.innerText = msg("for-all-sprites");
  globalVars.appendChild(globalHeading);
  globalVars.appendChild(globalList);

  manager.appendChild(localVars);
  manager.appendChild(globalVars);

  const varTab = document.createElement("li");
  varTab.classList.add(addon.tab.scratchClass("react-tabs_react-tabs__tab"), addon.tab.scratchClass("gui_tab"));
  varTab.id = "react-tabs-7";

  const varTabIcon = document.createElement("img");
  varTabIcon.draggable = false;
  varTabIcon.src = _twGetAsset("/icon.svg");

  const varTabText = document.createElement("span");
  varTabText.innerText = msg("variables");

  varTab.appendChild(varTabIcon);
  varTab.appendChild(varTabText);

  function updateHeadingVisibility() {
    // used to hide the headings if there are no variables
    let filteredLocals = localVariables.filter((v) => v.row.style.display !== "none");
    let filteredGlobals = globalVariables.filter((v) => v.row.style.display !== "none");
    localHeading.style.display = filteredLocals.length === 0 ? "none" : "";
    globalHeading.style.display = filteredGlobals.length === 0 ? "none" : "";
  }

  const rowToVariableMap = new WeakMap();
  const observer = new IntersectionObserver(
    (changes) => {
      for (const change of changes) {
        const variable = rowToVariableMap.get(change.target);
        variable.setVisible(change.isIntersecting);
      }
    },
    {
      rootMargin: "100px",
    }
  );

  class WrappedVariable {
    constructor(scratchVariable, target) {
      this.scratchVariable = scratchVariable;
      this.target = target;
      this.visible = false;
      this.buildDOM();
    }

    updateValue(force) {
      if (!this.visible && !force) return;
      let newValue;
      if (this.scratchVariable.type === "list") {
        newValue = this.scratchVariable.value.join("\n");
      } else {
        newValue = this.scratchVariable.value;
      }
      if (newValue !== this.input.value) {
        this.input.value = newValue;
      }
    }

    handleSearch(search) {
      // this doesn't check if this.visible is true or whatever. maybe that would improve performance while typing into the search box but it's probably fine™
      if (this.scratchVariable.name.toLowerCase().includes(search.toLowerCase()) || !search) {
        // fuzzy searches are lame we are too cool for fuzzy searches (& i doubt they're even the right thing to use here, this should work fine enough)
        this.row.style.display = ""; // make the row normal
        this.updateValue(true); // force it to update because its hidden and it wouldnt be able to otherwise
      } else {
        this.row.style.display = "none"; // set the entire row as hidden
      }
    }

    resizeInputIfList() {
      if (this.scratchVariable.type === "list") {
        this.input.style.height = "auto";
        const height = Math.min(1000, this.input.scrollHeight);
        if (height > 0) {
          this.input.style.height = height + "px";
        }
      }
    }

    setVisible(visible) {
      if (this.visible === visible) return;
      this.visible = visible;
      if (visible) {
        this.updateValue();
      }
    }

    buildDOM() {
      const id = `sa-variable-manager-${this.scratchVariable.id}`;

      const row = document.createElement("tr");
      this.row = row;
      const labelCell = document.createElement("td");
      labelCell.className = "sa-var-manager-name";

      const label = document.createElement("label");
      label.textContent = this.scratchVariable.name;
      label.htmlFor = id;
      labelCell.appendChild(label);

      rowToVariableMap.set(row, this);
      observer.observe(row);

      const valueCell = document.createElement("td");
      valueCell.className = "sa-var-manager-value";

      let input;
      if (this.scratchVariable.type === "list") {
        input = document.createElement("textarea");
      } else {
        input = document.createElement("input");
      }
      input.id = id;
      this.input = input;

      this.updateValue(true);
      if (this.scratchVariable.type === "list") {
        this.input.addEventListener("input", () => this.resizeInputIfList(), false);
      }

      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          if (this.scratchVariable.type === "list") {
            vm.setVariableValue(this.target.id, this.scratchVariable.id, input.value.split("\n"));
          } else {
            vm.setVariableValue(this.target.id, this.scratchVariable.id, input.value);
          }
          input.blur();
        }
      });

      input.addEventListener("focus", (e) => {
        preventUpdate = true;
        manager.classList.add("freeze");
      });

      input.addEventListener("blur", (e) => {
        preventUpdate = false;
        manager.classList.remove("freeze");
      });

      valueCell.appendChild(input);
      row.appendChild(labelCell);
      row.appendChild(valueCell);

      this.handleSearch(searchBox.value);
    }
  }

  function fullReload() {
    if (addon.tab.redux.state.scratchGui.editorTab.activeTabIndex !== 3 || preventUpdate) return;

    const editingTarget = vm.runtime.getEditingTarget();
    const stage = vm.runtime.getTargetForStage();
    localVariables = editingTarget.isStage
      ? []
      : Object.values(editingTarget.variables)
          .filter((i) => i.type === "" || i.type === "list")
          .map((i) => new WrappedVariable(i, editingTarget));
    globalVariables = Object.values(stage.variables)
      .filter((i) => i.type === "" || i.type === "list")
      .map((i) => new WrappedVariable(i, stage));

    updateHeadingVisibility();

    while (localList.firstChild) {
      localList.removeChild(localList.firstChild);
    }
    while (globalList.firstChild) {
      globalList.removeChild(globalList.firstChild);
    }

    for (const variable of localVariables) {
      localList.appendChild(variable.row);
      variable.resizeInputIfList();
    }
    for (const variable of globalVariables) {
      globalList.appendChild(variable.row);
      variable.resizeInputIfList();
    }
  }

  function quickReload() {
    if (addon.tab.redux.state.scratchGui.editorTab.activeTabIndex !== 3 || preventUpdate) return;

    for (const variable of localVariables) {
      variable.updateValue();
    }
    for (const variable of globalVariables) {
      variable.updateValue();
    }
  }

  function cleanup() {
    localVariables = [];
    globalVariables = [];
  }

  varTab.addEventListener("click", (e) => {
    addon.tab.redux.dispatch({ type: "scratch-gui/navigation/ACTIVATE_TAB", activeTabIndex: 3 });
  });

  addon.tab.redux.initialize();
  addon.tab.redux.addEventListener("statechanged", ({ detail }) => {
    if (detail.action.type === "scratch-gui/navigation/ACTIVATE_TAB") {
      if (detail.action.activeTabIndex === 3) {
        varTab.classList.add(
          addon.tab.scratchClass("react-tabs_react-tabs__tab--selected"),
          addon.tab.scratchClass("gui_is-selected")
        );
        contentArea.insertAdjacentElement("beforeend", manager);
        fullReload();
      } else {
        varTab.classList.remove(
          addon.tab.scratchClass("react-tabs_react-tabs__tab--selected"),
          addon.tab.scratchClass("gui_is-selected")
        );
        manager.remove();
        cleanup();
      }
    }
  });

  vm.runtime.on("PROJECT_LOADED", () => fullReload());
  vm.runtime.on("TOOLBOX_EXTENSIONS_NEED_UPDATE", () => fullReload());

  const oldStep = vm.runtime.constructor.prototype._step;
  vm.runtime.constructor.prototype._step = function (...args) {
    const ret = oldStep.call(this, ...args);
    quickReload();
    return ret;
  };

  while (true) {
    const tabs = await addon.tab.waitForElement("[class^='react-tabs_react-tabs__tab-list']", {
      markAsSeen: true,
    });

    contentArea = document.querySelector("[class^=gui_tabs]");
    const soundTab = tabs.children[2];
    soundTab.insertAdjacentElement("afterend", varTab);
  }
}
