/* inserted by pull.js */
import _twAsset0 from "./add.svg";
import _twAsset1 from "./debug-unread.svg";
import _twAsset2 from "./debug.svg";
import _twAsset3 from "./delete.svg";
import _twAsset4 from "./download-white.svg";
import _twAsset5 from "./error.svg";
import _twAsset6 from "./play.svg";
import _twAsset7 from "./warning.svg";
const _twGetAsset = (path) => {
  if (path === "/add.svg") return _twAsset0;
  if (path === "/debug-unread.svg") return _twAsset1;
  if (path === "/debug.svg") return _twAsset2;
  if (path === "/delete.svg") return _twAsset3;
  if (path === "/download-white.svg") return _twAsset4;
  if (path === "/error.svg") return _twAsset5;
  if (path === "/play.svg") return _twAsset6;
  if (path === "/warning.svg") return _twAsset7;
  throw new Error(`Unknown asset: ${path}`);
};

import downloadBlob from "../../libraries/common/cs/download-blob.js";
import { paused, setPaused, onPauseChanged } from "./../pause/module.js";

export default async function ({ addon, global, console, msg }) {
  let workspace, showingConsole, ScratchBlocks;
  const vm = addon.tab.traps.vm;

  const container = document.createElement("div");
  container.className = "sa-debugger-container";
  const buttonContainer = document.createElement("div");
  buttonContainer.className = addon.tab.scratchClass("button_outlined-button", "stage-header_stage-button");
  const buttonContent = document.createElement("div");
  buttonContent.className = addon.tab.scratchClass("button_content");
  const buttonImage = document.createElement("img");
  buttonImage.className = addon.tab.scratchClass("stage-header_stage-button-icon");
  buttonImage.draggable = false;
  buttonImage.src = _twGetAsset("/debug.svg");
  buttonContent.appendChild(buttonImage);
  buttonContainer.appendChild(buttonContent);
  container.appendChild(buttonContainer);
  buttonContainer.addEventListener("click", () => toggleConsole(true));

  const pause = () => {
    setPaused(!paused);
    const pauseAddonButton = document.querySelector(".pause-btn");
    if (!pauseAddonButton || getComputedStyle(pauseAddonButton).display === "none") toggleConsole(true);
  };
  addon.tab.addBlock("\u200B\u200Bbreakpoint\u200B\u200B", [], pause);
  addon.tab.addBlock("\u200B\u200Blog\u200B\u200B %s", ["content"], ({ content }, thread) => {
    workspace = Blockly.getMainWorkspace();
    addItem(content, thread, "log");
  });
  addon.tab.addBlock("\u200B\u200Bwarn\u200B\u200B %s", ["content"], ({ content }, thread) => {
    workspace = Blockly.getMainWorkspace();
    addItem(content, thread, "warn");
  });
  addon.tab.addBlock("\u200B\u200Berror\u200B\u200B %s", ["content"], ({ content }, thread) => {
    workspace = Blockly.getMainWorkspace();
    addItem(content, thread, "error");
  });

  const consoleWrapper = Object.assign(document.createElement("div"), {
    className: addon.tab.scratchClass("card_card", { others: "debug" }),
  });
  const consoleTitle = Object.assign(document.createElement("div"), {
    className: addon.tab.scratchClass("card_header-buttons"),
  });
  const consoleText = Object.assign(document.createElement("h1"), {
    innerText: msg("console"),
  });
  const extraContainer = Object.assign(document.createElement("div"), {
    className: `extra-log-container`,
  });

  const goToBlock = (targetId, blockId) => {
    const offsetX = 32,
      offsetY = 32;
    if (targetId !== vm.editingTarget.id) {
      // note: this is O(n) so don't call it if unnecessary!
      if (vm.runtime.getTargetById(targetId)) {
        vm.setEditingTarget(targetId);
        // Should not cause recursion
        setTimeout(() => goToBlock(targetId, blockId), 300);
      }
      return;
    }
    const block = workspace.getBlockById(blockId);
    if (!block) return;

    // Don't scroll to blocks in the flyout
    if (block.workspace.isFlyout) return;

    // Copied from devtools. If it's code gets improved for this function, bring those changes here too.
    let root = block.getRootBlock();

    let base = block;
    while (base.getOutputShape() && base.getSurroundParent()) {
      base = base.getSurroundParent();
    }

    let ePos = base.getRelativeToSurfaceXY(), // Align with the top of the block
      rPos = root.getRelativeToSurfaceXY(), // Align with the left of the block 'stack'
      scale = workspace.scale,
      x = rPos.x * scale,
      y = ePos.y * scale,
      xx = block.width + x, // Turns out they have their x & y stored locally, and they are the actual size rather than scaled or including children...
      yy = block.height + y,
      s = workspace.getMetrics();
    if (
      x < s.viewLeft + offsetX - 4 ||
      xx > s.viewLeft + s.viewWidth ||
      y < s.viewTop + offsetY - 4 ||
      yy > s.viewTop + s.viewHeight
    ) {
      let sx = x - s.contentLeft - offsetX,
        sy = y - s.contentTop - offsetY;

      workspace.scrollbar.set(sx, sy);
    }
    // Flashing
    const myFlash = { block: null, timerID: null, colour: null };
    if (myFlash.timerID > 0) {
      clearTimeout(myFlash.timerID);
      myFlash.block.setColour(myFlash.colour);
    }

    let count = 4;
    let flashOn = true;
    myFlash.colour = block.getColour();
    myFlash.block = block;

    function _flash() {
      if (!myFlash.block.svgPath_) {
        myFlash.timerID = count = 0;
        flashOn = true;
        return;
      }
      myFlash.block.svgPath_.style.fill = flashOn ? "#ffff80" : myFlash.colour;
      flashOn = !flashOn;
      count--;
      if (count > 0) {
        myFlash.timerID = setTimeout(_flash, 200);
      } else {
        myFlash.timerID = 0;
      }
    }

    _flash();
  };
  extraContainer.addEventListener("click", (e) => {
    const elem = e.target;
    if (elem.classList.contains("deletedTarget")) return;
    const targetId = elem.dataset.targetId;
    const blockId = elem.dataset.blockId;
    if (targetId && blockId) goToBlock(targetId, blockId);
  });
  const consoleList = Object.assign(document.createElement("div"), {
    className: "logs",
  });
  const buttons = Object.assign(document.createElement("div"), {
    className: addon.tab.scratchClass("card_header-buttons-right"),
  });

  const unpauseButton = Object.assign(document.createElement("div"), {
    className: addon.tab.scratchClass("card_shrink-expand-button", { others: "sa-debugger-unpause" }),
    draggable: false,
  });
  const unpauseImg = Object.assign(document.createElement("img"), {
    src: _twGetAsset("/play.svg"),
  });
  const unpauseText = Object.assign(document.createElement("span"), {
    innerText: msg("unpause"),
  });

  const exportButton = Object.assign(document.createElement("div"), {
    className: addon.tab.scratchClass("card_shrink-expand-button"),
    title: msg("export-desc"),
    draggable: false,
  });
  const exportImg = Object.assign(document.createElement("img"), {
    src: _twGetAsset("/download-white.svg"),
  });
  const exportText = Object.assign(document.createElement("span"), {
    innerText: msg("export"),
  });

  const trashButton = Object.assign(document.createElement("div"), {
    className: addon.tab.scratchClass("card_shrink-expand-button"),
    draggable: false,
  });
  const trashImg = Object.assign(document.createElement("img"), {
    src: _twGetAsset("/delete.svg"),
  });
  const trashText = Object.assign(document.createElement("span"), {
    innerText: msg("clear"),
  });

  const closeButton = Object.assign(document.createElement("div"), {
    className: addon.tab.scratchClass("card_remove-button"),
    draggable: false,
  });
  const closeImg = Object.assign(document.createElement("img"), {
    className: addon.tab.scratchClass("close-button_close-icon"),
    src: _twGetAsset("/add.svg"),
  });
  const closeText = Object.assign(document.createElement("span"), {
    innerText: msg("close"),
  });

  consoleTitle.append(consoleText, buttons);
  buttons.append(unpauseButton, exportButton, trashButton, closeButton);
  trashButton.append(trashImg, trashText);
  closeButton.append(closeImg, closeText);
  exportButton.append(exportImg, exportText);
  unpauseButton.append(unpauseImg, unpauseText);
  extraContainer.append(consoleList);
  consoleWrapper.append(consoleTitle, extraContainer);
  document.body.append(consoleWrapper);

  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0,
    maxX,
    maxY;
  consoleTitle.addEventListener("mousedown", dragMouseDown);

  const getTargetInfo = (id, cache = null) => {
    if (cache && cache[id]) return cache[id];
    const target = vm.runtime.getTargetById(id);
    let item;
    if (target) {
      item = { name: target.getName(), isDeleted: false };
    } else {
      item = { name: msg("deleted-sprite"), isDeleted: true };
    }
    if (cache) cache[id] = item;
    return item;
  };

  function dragMouseDown(e) {
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.addEventListener("mouseup", closeDragElement);
    document.addEventListener("mousemove", elementDrag);
  }

  function elementDrag(e) {
    e.preventDefault();
    var winW = document.documentElement.clientWidth || document.body.clientWidth,
      winH = document.documentElement.clientHeight || document.body.clientHeight;
    (maxX = winW - consoleWrapper.offsetWidth - 1), (maxY = winH - consoleWrapper.offsetHeight - 1);
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    if (consoleWrapper.offsetTop - pos2 <= maxY && consoleWrapper.offsetTop - pos2 >= 0) {
      consoleWrapper.style.top = consoleWrapper.offsetTop - pos2 + "px";
    }
    if (consoleWrapper.offsetLeft - pos1 <= maxX && consoleWrapper.offsetLeft - pos1 >= 0) {
      consoleWrapper.style.left = consoleWrapper.offsetLeft - pos1 + "px";
    }
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.removeEventListener("mouseup", closeDragElement);
    document.removeEventListener("mousemove", elementDrag);
  }

  trashButton.addEventListener("click", () => {
    document.querySelectorAll(".log").forEach((log, i) => log.remove());
    closeDragElement();
    logs = [];
  });
  trashButton.addEventListener("mouseup", () => {
    closeDragElement();
  });
  closeButton.addEventListener("click", () => toggleConsole(false));
  closeButton.addEventListener("mouseup", () => closeDragElement());
  let download = (filename, text) => downloadBlob(filename, new Blob([text], { type: "text/plain" }));

  unpauseButton.addEventListener("click", () => setPaused(false));
  if (!paused) unpauseButton.style.display = "none";
  onPauseChanged((newPauseValue) => (unpauseButton.style.display = newPauseValue ? "" : "none"));

  exportButton.addEventListener("click", (e) => {
    const defaultFormat = "{sprite}: {content} ({type})";
    const exportFormat = e.shiftKey ? prompt(msg("enter-format"), defaultFormat) : defaultFormat;
    if (!exportFormat) return;
    closeDragElement();
    const targetInfoCache = Object.create(null);
    let file = logs
      .map(({ targetId, type, content }) =>
        exportFormat.replace(
          /\{(sprite|type|content)\}/g,
          (_, match) =>
            ({
              sprite: getTargetInfo(targetId, targetInfoCache).name,
              type,
              content,
            }[match])
        )
      )
      .join("\n");
    download("logs.txt", file);
  });
  let logs = [];
  const addItem = (content, thread, type) => {
    workspace = Blockly.getMainWorkspace();
    const wrapper = document.createElement("div");
    const span = (text, cl = "") => {
      let s = document.createElement("span");
      s.innerText = text;
      s.className = cl;
      return s;
    };

    const scrolledDown = extraContainer.scrollTop + 5 > extraContainer.scrollHeight - extraContainer.clientHeight;

    const target = thread.target;
    const parentTarget = target.isOriginal ? target : target.sprite.clones[0];
    const targetId = parentTarget.id;
    wrapper.className = "log";
    wrapper.classList.add(type);
    consoleList.append(wrapper);
    if (type !== "log") {
      const imageURL = _twGetAsset((type === "error" ? "/error.svg" : "/warning.svg"));
      const icon = document.createElement("img");
      icon.src = imageURL;
      icon.alt = icon.title = msg("icon-" + type);
      icon.className = "logIcon";
      wrapper.appendChild(icon);
    }

    const blockId = thread.peekStack();
    const block = target.blocks.getBlock(blockId);
    if (block && ScratchBlocks) {
      const inputId = Object.values(block.inputs)[0]?.block;
      const inputBlock = target.blocks.getBlock(inputId);
      if (inputBlock && inputBlock.opcode !== "text") {
        let text, category;
        if (inputBlock.opcode === "data_variable" || inputBlock.opcode === "data_listcontents") {
          text = Object.values(inputBlock.fields)[0].value;
          category = inputBlock.opcode === "data_variable" ? "data" : "list";
        } else {
          // Try to call things like https://github.com/LLK/scratch-blocks/blob/develop/blocks_vertical/operators.js
          let jsonData;
          const fakeBlock = {
            jsonInit(data) {
              jsonData = data;
            },
          };
          const blockConstructor = ScratchBlocks.Blocks[inputBlock.opcode];
          if (blockConstructor) {
            try {
              blockConstructor.init.call(fakeBlock);
            } catch (e) {
              // ignore
            }
          }
          if (jsonData && jsonData.message0 && !jsonData.args0) {
            text = jsonData.message0;
            category = jsonData.category;
          }
        }
        if (text && category) {
          const inputSpan = document.createElement("span");
          inputSpan.textContent = text;
          inputSpan.className = "console-variable";
          inputSpan.dataset.category = category === "list" ? "data-lists" : category;
          inputSpan.style.backgroundColor =
            ScratchBlocks.Colours[category === "list" ? "data_lists" : category].primary;
          wrapper.append(inputSpan);
        }
      }
    }
    logs.push({
      targetId,
      type,
      content,
    });
    wrapper.append(span(content));

    let link = document.createElement("a");
    link.textContent = target.isOriginal
      ? target.getName()
      : msg("clone-of", {
          spriteName: parentTarget.getName(),
        });
    link.className = "logLink";
    link.dataset.blockId = blockId;
    link.dataset.targetId = targetId;
    if (!target.isOriginal) {
      link.dataset.isClone = "true";
    }

    wrapper.appendChild(link);

    if (scrolledDown) extraContainer.scrollTop = extraContainer.scrollHeight;
    if (!showingConsole) buttonImage.src = _twGetAsset("/debug-unread.svg");
  };
  const toggleConsole = (show = !showingConsole) => {
    if (show) {
      buttonImage.src = _twGetAsset("/debug.svg");
      const cacheObj = Object.create(null);
      for (const logLinkElem of document.getElementsByClassName("logLink")) {
        const targetId = logLinkElem.dataset.targetId;
        if (!targetId) return;
        const tInfo = getTargetInfo(targetId, cacheObj);
        logLinkElem.textContent = tInfo.name;
        if (tInfo.isDeleted) {
          logLinkElem.classList.add("deletedTarget");
        } else if (logLinkElem.dataset.isClone) {
          logLinkElem.textContent = msg("clone-of", { spriteName: tInfo.name });
        }
      }
    }
    consoleWrapper.style.display = show ? "flex" : "";
    showingConsole = show;
  };

  ScratchBlocks = await addon.tab.traps.getBlockly();

  while (true) {
    const stageHeaderSizeControls = await addon.tab.waitForElement('[class*="stage-header_stage-size-row"]', {
      markAsSeen: true,
      reduxEvents: [
        "scratch-gui/mode/SET_PLAYER",
        "scratch-gui/mode/SET_FULL_SCREEN",
        "fontsLoaded/SET_FONTS_LOADED",
        "scratch-gui/locales/SELECT_LOCALE",
      ],
    });
    if (addon.tab.editorMode === "editor") {
      stageHeaderSizeControls.insertBefore(container, stageHeaderSizeControls.firstChild);
    } else {
      toggleConsole(false);
    }
  }
}
