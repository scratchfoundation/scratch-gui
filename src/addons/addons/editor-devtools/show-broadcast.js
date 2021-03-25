// A file to split Editor Devtools by features.
// Unlike userscript.js, this file mainly interacts with VM.
export default class ShowBroadcast {
  constructor(addon) {
    this.addon = addon;
    this.vm = this.addon.tab.traps.vm;
    this.highlights = {
      timeoutId: 0,
      callback: () => {},
    };
  }

  showSenders(broadcastId) {
    this.highlightTargets(this.getTargetsWithSenders(broadcastId));
  }

  getTargetsWithSenders(broadcastId) {
    const targetWithSenders = [];
    for (const target of this.vm.runtime.targets) {
      if (!target.isOriginal) return;
      for (const blockId of Object.keys(target.blocks._blocks)) {
        const block = target.blocks.getBlock(blockId);
        if (block.inputs.BROADCAST_INPUT) {
          const input = block.inputs.BROADCAST_INPUT;
          // For results, blocks must NOT be inserted, for convenience.
          if (
            input.block === input.shadow &&
            target.blocks.getBlock(input.shadow).fields.BROADCAST_OPTION.id === broadcastId
          ) {
            targetWithSenders.push(target);
            break;
          }
        }
      }
    }
    return targetWithSenders;
  }

  showReceivers(broadcastId) {
    this.highlightTargets(this.getTargetsWithReceivers(broadcastId));
  }

  getTargetsWithReceivers(broadcastId) {
    const targetWithReceivers = [];
    for (const target of this.vm.runtime.targets) {
      if (!target.isOriginal) return;
      for (const blockId of Object.keys(target.blocks._blocks)) {
        const block = target.blocks.getBlock(blockId);
        if (block.opcode === "event_whenbroadcastreceived" && block.fields.BROADCAST_OPTION.id === broadcastId) {
          targetWithReceivers.push(target);
          break;
        }
      }
    }
    return targetWithReceivers;
  }

  highlightTargets(targets) {
    if (this.highlights.timeoutId) {
      this.highlights.callback();
      clearTimeout(this.highlights.timeoutId);
      this.highlights = {
        timeoutId: 0,
        callback: () => {},
      };
    }
    const elemPendingToRemoveHighlights = [];
    for (const target of targets) {
      let elem = null;
      if (target.isStage) {
        elem = document.querySelector('div[class*="stage-selector_header"]');
      } else if (target.isOriginal) {
        // This is one of the most ridiculous code I've ever written.
        // This essentially comparses sprite names to textContent so that we can add CSS.
        const possibleElements = document.querySelectorAll('div[class*="sprite-selector-item_sprite-name"]');
        const spriteNameElem = Array.prototype.find.call(
          possibleElements,
          (elem) => elem.textContent === target.getName()
        );
        if (!spriteNameElem) continue;
        elem = spriteNameElem.parentElement;
      }
      elem.dataset.highlighted = "true";
      elemPendingToRemoveHighlights.push(elem);
    }
    const callbackFactory = (elemToRemoveHighlights) => () => {
      for (const removingElem of elemToRemoveHighlights) {
        if (!removingElem.isConnected) continue;
        removingElem.dataset.highlighted = "false";
      }
    };
    const callback = callbackFactory(elemPendingToRemoveHighlights);
    this.highlights = {
      callback,
      timeoutId: setTimeout(callback, 2000),
    };
  }

  getAssociatedBroadcastId(blockId) {
    const editingTarget = this.vm.editingTarget;
    const block = editingTarget.blocks.getBlock(blockId);
    if (block.opcode === "event_whenbroadcastreceived") {
      return block.fields.BROADCAST_OPTION.id;
    } else {
      const input = block.inputs.BROADCAST_INPUT;
      // Allow shadow blocks
      return editingTarget.blocks.getBlock(input.shadow).fields.BROADCAST_OPTION.id;
    }
  }
}
