let console = window.console;

/*
Mapping types:

type: "key" maps a button to a keyboard key
All key names will be interpreted as a KeyboardEvent.key value (https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values)
high: "KeyName" is the name of the key to dispatch when a button reads a HIGH value
low: "KeyName" is the name of the key to dispatch when a button reads a LOW value
deadZone: 0.5 controls the minimum value necessary to be read in either + or - to trigger either high or low
The high/low distinction is necessary for axes. Buttons will only use high

type: "mousedown" maps a button to control whether the mouse is down or not
deadZone: 0.5 controls the minimum value to trigger a mousedown

type: "virtual_cursor" maps a button to control the "virtual cursor"
deadZone: 0.5 again controls the minimum value to trigger a movement
sensitivity: 10 controls the speed
high: "+y"/"-y"/"+x"/"-x" defines what happens when an axis reads high
low: "+y"/"-y"/"+x"/"-x" defines what happens when an axis reads low
+y increases y, -y decreases y, +x increases x, -x decreases x.
*/

const defaultAxesMappings = {
  arrows: [
    {
      type: "key",
      high: "ArrowRight",
      low: "ArrowLeft",
      deadZone: 0.5,
    },
    {
      type: "key",
      high: "ArrowDown",
      low: "ArrowUp",
      deadZone: 0.5,
    },
  ],
  wasd: [
    {
      type: "key",
      high: "d",
      low: "a",
      deadZone: 0.5,
    },
    {
      type: "key",
      high: "s",
      low: "w",
      deadZone: 0.5,
    },
  ],
  cursor: [
    {
      type: "virtual_cursor",
      high: "+x",
      low: "-x",
      sensitivity: 0.6,
      deadZone: 0.2,
    },
    {
      type: "virtual_cursor",
      high: "-y",
      low: "+y",
      sensitivity: 0.6,
      deadZone: 0.2,
    },
  ],
};

const emptyMapping = () => ({
  type: "key",
  high: null,
  low: null,
});
const transformAndCopyMapping = (mapping) => {
  if (typeof mapping !== "object" || !mapping) {
    console.warn("invalid mapping", mapping);
    return emptyMapping();
  }
  const copy = Object.assign({}, mapping);
  if (copy.type === "key") {
    if (typeof copy.deadZone === "undefined") {
      copy.deadZone = 0.5;
    }
    if (typeof copy.high === "undefined") {
      copy.high = "";
    }
    if (typeof copy.low === "undefined") {
      copy.low = "";
    }
  } else if (copy.type === "mousedown") {
    if (typeof copy.deadZone === "undefined") {
      copy.deadZone = 0.5;
    }
  } else if (copy.type === "virtual_cursor") {
    if (typeof copy.high === "undefined") {
      copy.high = "";
    }
    if (typeof copy.low === "undefined") {
      copy.low = "";
    }
    if (typeof copy.sensitivity === "undefined") {
      copy.sensitivity = 10;
    }
    if (typeof copy.deadZone === "undefined") {
      copy.deadZone = 0.5;
    }
  } else {
    console.warn("unknown mapping type", copy.type);
    return emptyMapping();
  }
  return copy;
};
const prepareMappingForExport = (mapping) => Object.assign({}, mapping);
const prepareAxisMappingForExport = prepareMappingForExport;
const prepareButtonMappingForExport = (mapping) => {
  const copy = prepareMappingForExport(mapping);
  delete copy.deadZone;
  delete copy.low;
  return copy;
};

const padWithEmptyMappings = (array, length) => {
  // Keep adding empty mappings until the list is full
  while (array.length < length) {
    array.push(emptyMapping());
  }
  // In case the input array is longer than the desired length
  array.length = length;
  return array;
};

const getMovementConfiguration = (usedKeys) => ({
  usesArrows:
    usedKeys.has("ArrowUp") || usedKeys.has("ArrowDown") || usedKeys.has("ArrowRight") || usedKeys.has("ArrowLeft"),
  usesWASD: (usedKeys.has("w") && usedKeys.has("s")) || (usedKeys.has("a") && usedKeys.has("d")),
});

const getGamepadId = (gamepad) => `${gamepad.id} (${gamepad.index})`;

class GamepadData {
  /**
   * @param {Gamepad} gamepad Source Gamepad
   * @param {GamepadLib} gamepadLib Parent GamepadLib
   */
  constructor(gamepad, gamepadLib) {
    this.gamepad = gamepad;
    this.gamepadLib = gamepadLib;
    this.buttonMappings = this.getDefaultButtonMappings().map(transformAndCopyMapping);
    this.axesMappings = this.getDefaultAxisMappings().map(transformAndCopyMapping);
  }

  getDefaultButtonMappings() {
    let buttons;
    if (this.gamepadLib.hints.importedSettings) {
      buttons = this.gamepadLib.hints.importedSettings.buttons;
    } else {
      const usedKeys = this.gamepadLib.hints.usedKeys;
      const alreadyUsedKeys = new Set();
      const { usesArrows, usesWASD } = getMovementConfiguration(usedKeys);
      if (usesWASD) {
        alreadyUsedKeys.add("w");
        alreadyUsedKeys.add("a");
        alreadyUsedKeys.add("s");
        alreadyUsedKeys.add("d");
      }
      const possiblePauseKeys = [
        // Restart keys, pause keys, other potentially dangerous keys
        "p",
        "q",
        "r",
      ];
      const possibleActionKeys = [
        " ",
        "Enter",
        "e",
        "f",
        "z",
        "x",
        "c",
        ...Array.from(usedKeys).filter((i) => i.length === 1 && !possiblePauseKeys.includes(i)),
      ];

      const findKey = (keys) => {
        for (const key of keys) {
          if (usedKeys.has(key) && !alreadyUsedKeys.has(key)) {
            alreadyUsedKeys.add(key);
            return key;
          }
        }
        return null;
      };
      const getPrimaryAction = () => {
        if (usesArrows && usedKeys.has("ArrowUp")) {
          return "ArrowUp";
        }
        if (usesWASD && usedKeys.has("w")) {
          return "w";
        }
        return findKey(possibleActionKeys);
      };
      const getSecondaryAction = () => findKey(possibleActionKeys);
      const getPauseKey = () => findKey(possiblePauseKeys);
      const getUp = () => {
        if (usesArrows || !usesWASD) return "ArrowUp";
        return "w";
      };
      const getDown = () => {
        if (usesArrows || !usesWASD) return "ArrowDown";
        return "s";
      };
      const getRight = () => {
        if (usesArrows || !usesWASD) return "ArrowRight";
        return "d";
      };
      const getLeft = () => {
        if (usesArrows || !usesWASD) return "ArrowLeft";
        return "a";
      };

      const action1 = getPrimaryAction();
      let action2 = getSecondaryAction();
      let action3 = getSecondaryAction();
      let action4 = getSecondaryAction();
      // When only 1 or 2 action keys are detected, bind the other buttons to the same things.
      if (action1 && !action2 && !action3 && !action4) {
        action2 = action1;
        action3 = action1;
        action4 = action1;
      }
      if (action1 && action2 && !action3 && !action4) {
        action3 = action1;
        action4 = action2;
      }

      // Set indices "manually" because we don't evaluate them in order.
      buttons = [];
      buttons[0] = {
        /*
        Xbox: A
        SNES-like: B
        */
        type: "key",
        high: action1,
      };
      buttons[1] = {
        /*
        Xbox: B
        SNES-like: A
        */
        type: "key",
        high: action2,
      };
      buttons[2] = {
        /*
        Xbox: X
        SNES-like: Y
        */
        type: "key",
        high: action3,
      };
      buttons[3] = {
        /*
        Xbox: Y
        SNES-like: X
        */
        type: "key",
        high: action4,
      };
      buttons[4] = {
        /*
        Xbox: LB
        SNES-like: Left trigger
        */
        type: "mousedown",
      };
      buttons[5] = {
        /*
        Xbox: RB
        */
        type: "mousedown",
      };
      buttons[6] = {
        /*
        Xbox: LT
        */
        type: "mousedown",
      };
      buttons[7] = {
        /*
        Xbox: RT
        SNES-like: Right trigger
        */
        type: "mousedown",
      };
      buttons[9] = {
        /*
        Xbox: Menu
        SNES-like: Start
        */
        type: "key",
        high: getPauseKey(),
      };
      buttons[8] = {
        /*
        Xbox: Change view
        SNES-like: Select
        */
        type: "key",
        high: getPauseKey(),
      };
      // Xbox: Left analog press
      buttons[10] = emptyMapping();
      // Xbox: Right analog press
      buttons[11] = emptyMapping();
      buttons[12] = {
        /*
        Xbox: D-pad up
        */
        type: "key",
        high: getUp(),
      };
      buttons[13] = {
        /*
        Xbox: D-pad down
        */
        type: "key",
        high: getDown(),
      };
      buttons[14] = {
        /*
        Xbox: D-pad left
        */
        type: "key",
        high: getLeft(),
      };
      buttons[15] = {
        /*
        Xbox: D-pad right
        */
        type: "key",
        high: getRight(),
      };
    }
    return padWithEmptyMappings(buttons, this.gamepad.buttons.length);
  }

  getDefaultAxisMappings() {
    let axes = [];
    if (this.gamepadLib.hints.importedSettings) {
      axes = this.gamepadLib.hints.importedSettings.axes;
    } else {
      // Only return default axis mappings when there are 4 axes, like an xbox controller
      // If there isn't exactly 4, we can't really predict what the axes mean
      // Some controllers map the dpad to *both* buttons and axes at the same time, which would cause conflicts.
      if (this.gamepad.axes.length === 4) {
        const usedKeys = this.gamepadLib.hints.usedKeys;
        const { usesArrows, usesWASD } = getMovementConfiguration(usedKeys);
        if (usesWASD) {
          axes.push(defaultAxesMappings.wasd[0]);
          axes.push(defaultAxesMappings.wasd[1]);
        } else if (usesArrows) {
          axes.push(defaultAxesMappings.arrows[0]);
          axes.push(defaultAxesMappings.arrows[1]);
        } else {
          axes.push(defaultAxesMappings.cursor[0]);
          axes.push(defaultAxesMappings.cursor[1]);
        }
        axes.push(defaultAxesMappings.cursor[0]);
        axes.push(defaultAxesMappings.cursor[1]);
      }
    }
    return padWithEmptyMappings(axes, this.gamepad.axes.length);
  }
}

class GamepadLib extends EventTarget {
  constructor() {
    super();

    /** @type {Map<string, GamepadData>} */
    this.gamepads = new Map();

    this.handleConnect = this.handleConnect.bind(this);
    this.handleDisconnect = this.handleDisconnect.bind(this);
    this.update = this.update.bind(this);

    this.animationFrame = null;
    this.currentTime = null;
    this.deltaTime = 0;

    this.virtualCursor = {
      x: 0,
      y: 0,
      maxX: Infinity,
      minX: -Infinity,
      maxY: Infinity,
      minY: -Infinity,
      modified: false,
    };

    this._editor = null;

    this.connectCallbacks = [];

    this.hints = {
      usedKeys: new Set(),
      importedSettings: null,
      generated: false,
    };

    this.keysPressedThisFrame = new Set();
    this.oldKeysPressed = new Set();

    this.mouseDownThisFrame = false;
    this.oldMouseDown = false;

    this.addEventHandlers();
  }

  addEventHandlers() {
    window.addEventListener("gamepadconnected", this.handleConnect);
    window.addEventListener("gamepaddisconnected", this.handleDisconnect);
  }

  removeEventHandlers() {
    window.removeEventListener("gamepadconnected", this.handleConnect);
    window.removeEventListener("gamepaddisconnected", this.handleDisconnect);
  }

  gamepadConnected() {
    if (this.gamepads.size > 0) {
      return Promise.resolve();
    }
    return new Promise((resolve) => {
      this.connectCallbacks.push(resolve);
    });
  }

  ensureHintsGenerated() {
    if (this.hints.generated) {
      return;
    }
    if (this.getHintsLazily) {
      Object.assign(this.hints, this.getHintsLazily());
    }
    this.hints.generated = true;
  }

  handleConnect(e) {
    this.ensureHintsGenerated();
    for (const callback of this.connectCallbacks) {
      callback();
    }
    this.connectCallbacks = [];
    const gamepad = e.gamepad;
    const id = getGamepadId(gamepad);
    console.log("connected", gamepad);
    const gamepadData = new GamepadData(gamepad, this);
    this.gamepads.set(id, gamepadData);
    if (this.animationFrame === null) {
      this.animationFrame = requestAnimationFrame(this.update);
    }
    this.dispatchEvent(new CustomEvent("gamepadconnected", { detail: gamepadData }));
  }

  handleDisconnect(e) {
    const gamepad = e.gamepad;
    const id = getGamepadId(gamepad);
    console.log("disconnected", gamepad);
    const gamepadData = this.gamepads.get(id);
    this.gamepads.delete(id);
    this.dispatchEvent(new CustomEvent("gamepaddisconnected", { detail: gamepadData }));
    if (this.gamepads.size === 0) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
      this.currentTime = null;
    }
  }

  dispatchKey(key, pressed) {
    if (pressed) {
      this.dispatchEvent(new CustomEvent("keydown", { detail: key }));
    } else {
      this.dispatchEvent(new CustomEvent("keyup", { detail: key }));
    }
  }

  dispatchMouseDown(down) {
    if (down) {
      this.dispatchEvent(new CustomEvent("mousedown"));
    } else {
      this.dispatchEvent(new CustomEvent("mouseup"));
    }
  }

  dispatchMouseMove(x, y) {
    this.dispatchEvent(new CustomEvent("mousemove", { detail: { x, y } }));
  }

  updateButton(value, mapping) {
    if (mapping.type === "key") {
      if (value >= mapping.deadZone) {
        if (mapping.high) {
          this.keysPressedThisFrame.add(mapping.high);
        }
      } else if (value <= -mapping.deadZone) {
        if (mapping.low) {
          this.keysPressedThisFrame.add(mapping.low);
        }
      }
    } else if (mapping.type === "mousedown") {
      const isDown = Math.abs(value) >= mapping.deadZone;
      if (isDown) {
        this.mouseDownThisFrame = true;
      }
    } else if (mapping.type === "virtual_cursor") {
      const deadZone = mapping.deadZone;
      let action;
      if (value >= deadZone) action = mapping.high;
      if (value <= -deadZone) action = mapping.low;
      if (action) {
        // an axis value just beyond the deadzone should have a multiplier near 0, a high value should have a multiplier of 1
        const multiplier = (Math.abs(value) - deadZone) / (1 - deadZone);
        const speed = multiplier * multiplier * mapping.sensitivity * this.deltaTime;
        if (action === "+x") {
          this.virtualCursor.x += speed;
        } else if (action === "-x") {
          this.virtualCursor.x -= speed;
        } else if (action === "+y") {
          this.virtualCursor.y += speed;
        } else if (action === "-y") {
          this.virtualCursor.y -= speed;
        }
        this.virtualCursor.modified = true;
      }
    }
  }

  update(time) {
    this.oldKeysPressed = this.keysPressedThisFrame;
    this.oldMouseDown = this.mouseDownThisFrame;
    this.keysPressedThisFrame = new Set();
    this.mouseDownThisFrame = false;

    if (this.currentTime === null) {
      this.deltaTime = 0; // doesn't matter what this is, it's just the first frame
    } else {
      this.deltaTime = time - this.currentTime;
    }
    this.deltaTime = Math.max(Math.min(this.deltaTime, 1000), 0);
    this.currentTime = time;

    this.animationFrame = requestAnimationFrame(this.update);

    const gamepads = navigator.getGamepads();
    for (const gamepad of gamepads) {
      if (gamepad === null) {
        continue;
      }

      const id = getGamepadId(gamepad);
      const data = this.gamepads.get(id);

      for (let i = 0; i < gamepad.buttons.length; i++) {
        const button = gamepad.buttons[i];
        const value = button.value;
        const mapping = data.buttonMappings[i];
        this.updateButton(value, mapping);
      }

      for (let i = 0; i < gamepad.axes.length; i++) {
        const axis = gamepad.axes[i];
        const mapping = data.axesMappings[i];
        this.updateButton(axis, mapping);
      }
    }

    if (this._editor) {
      this._editor.update(gamepads);
    }

    for (const key of this.keysPressedThisFrame) {
      if (!this.oldKeysPressed.has(key)) {
        this.dispatchKey(key, true);
      }
    }
    for (const key of this.oldKeysPressed) {
      if (!this.keysPressedThisFrame.has(key)) {
        this.dispatchKey(key, false);
      }
    }
    if (this.mouseDownThisFrame && !this.oldMouseDown) {
      this.dispatchMouseDown(true);
    } else if (!this.mouseDownThisFrame && this.oldMouseDown) {
      this.dispatchMouseDown(false);
    }
    if (this.virtualCursor.modified) {
      this.virtualCursor.modified = false;
      if (this.virtualCursor.x > this.virtualCursor.maxX) {
        this.virtualCursor.x = this.virtualCursor.maxX;
      }
      if (this.virtualCursor.x < this.virtualCursor.minX) {
        this.virtualCursor.x = this.virtualCursor.minX;
      }
      if (this.virtualCursor.y > this.virtualCursor.maxY) {
        this.virtualCursor.y = this.virtualCursor.maxY;
      }
      if (this.virtualCursor.y < this.virtualCursor.minY) {
        this.virtualCursor.y = this.virtualCursor.minY;
      }
      this.dispatchMouseMove(this.virtualCursor.x, this.virtualCursor.y);
    }
  }

  editor() {
    if (!this._editor) {
      this._editor = new GamepadEditor(this);
    }
    return this._editor;
  }
}

GamepadLib.browserHasBrokenGamepadAPI = () => {
  // Check that the gamepad API is supported at all
  if (!navigator.getGamepads) {
    return true;
  }
  // Firefox on Linux has a broken gamepad API implementation that results in strange and sometimes unusable mappings
  // https://bugzilla.mozilla.org/show_bug.cgi?id=1643358
  // https://bugzilla.mozilla.org/show_bug.cgi?id=1643835
  if (navigator.userAgent.includes("Firefox") && navigator.userAgent.includes("Linux")) {
    return true;
  }
  // Firefox on macOS has other bugs that result in strange and unusable mappings
  // eg. https://bugzilla.mozilla.org/show_bug.cgi?id=1434408
  if (navigator.userAgent.includes("Firefox") && navigator.userAgent.includes("Mac OS")) {
    return true;
  }
  return false;
};

GamepadLib.setConsole = (n) => (console = n);

const removeAllChildren = (el) => {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
};
const buttonHtmlId = (index) => `gamepadlib-button-${index}`;
const axisHtmlId = (n) => `gamepadlib-axis-${n}`;

class GamepadEditor extends EventTarget {
  constructor(gamepadLib) {
    super();

    /** @type {GamepadLib} */
    this.gamepadLib = gamepadLib;

    this.root = Object.assign(document.createElement("div"), {
      className: "gamepadlib-root",
    });
    this.selector = Object.assign(document.createElement("select"), {
      className: "gamepadlib-selector",
    });
    this.content = Object.assign(document.createElement("div"), {
      className: "gamepadlib-content",
    });

    this.root.appendChild(this.selector);
    this.root.appendChild(this.content);

    this.onSelectorChange = this.onSelectorChange.bind(this);
    this.onGamepadsChange = this.onGamepadsChange.bind(this);

    this.selector.onchange = this.onSelectorChange;
    this.gamepadLib.addEventListener("gamepadconnected", this.onGamepadsChange);
    this.gamepadLib.addEventListener("gamepaddisconnected", this.onGamepadsChange);

    this.buttonIdToElement = new Map();
    this.axisIdToElement = new Map();

    this.hidden = false;

    // should be overridden later
    this.msg = (id, opts) => id;
  }

  onSelectorChange() {
    this.updateContent();
    this.dispatchEvent(new CustomEvent("gamepad-changed"));
  }

  onGamepadsChange() {
    this.updateAllContent();
    this.dispatchEvent(new CustomEvent("gamepad-changed"));
  }

  updateAllContent() {
    this.updateDropdown();
    this.updateContent();
    this.focus();
  }

  updateDropdown() {
    removeAllChildren(this.selector);

    const gamepads = Array.from(this.gamepadLib.gamepads.entries());
    if (gamepads.length === 0) {
      this.selector.hidden = true;
      return;
    }
    this.selector.hidden = false;
    for (const [id, _] of gamepads) {
      const option = document.createElement("option");
      option.textContent = id;
      option.value = id;
      this.selector.appendChild(option);
    }
  }

  keyToString(key) {
    if (key === " ") return this.msg("key-space");
    if (key === "ArrowUp") return this.msg("key-up");
    if (key === "ArrowDown") return this.msg("key-down");
    if (key === "ArrowLeft") return this.msg("key-left");
    if (key === "ArrowRight") return this.msg("key-right");
    if (key === "Enter") return this.msg("key-enter");
    return key.toUpperCase();
  }

  createButtonMapping(mappingList, index, { property = "high", allowClick = true } = {}) {
    const input = document.createElement("input");
    input.readOnly = true;
    input.className = "gamepadlib-keyinput";
    input.title = this.msg("keyinput-title");
    input.dataset.index = index;

    const update = () => {
      const mapping = mappingList[index];
      input.dataset.empty = false;
      if (mapping.type === "key") {
        if (mapping[property] === null) {
          input.value = this.msg("key-none");
          input.dataset.empty = true;
        } else {
          input.value = this.keyToString(mapping[property]);
        }
      } else if (mapping.type === "mousedown") {
        input.value = this.msg("key-click");
      } else {
        // should never happen
        input.value = `??? ${mapping.type}`;
      }
    };

    const changedMapping = () => {
      mappingList[index] = transformAndCopyMapping(mappingList[index]);
      isAcceptingInput = false;
      input.blur();
      update();
      input.dispatchEvent(new CustomEvent("mapping-changed"));
      this.changed();
    };

    let isAcceptingInput = false;

    const handleClick = (e) => {
      e.preventDefault();
      if (isAcceptingInput) {
        if (allowClick) {
          const mapping = mappingList[index];
          mapping.type = "mousedown";
          changedMapping();
        } else {
          handleBlur();
        }
      } else {
        input.value = "...";
        input.dataset.acceptingInput = true;
        isAcceptingInput = true;
      }
    };

    const handleKeyDown = (e) => {
      if (isAcceptingInput) {
        e.preventDefault();
        const key = e.key;
        if (["Alt", "Shift", "Control"].includes(key)) {
          return;
        }
        const mapping = mappingList[index];
        if (key.length === 1 || ["ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft", "Enter"].includes(key)) {
          mapping.type = "key";
          mapping[property] = key;
        } else if (key !== "Escape") {
          mapping.type = "key";
          mapping[property] = null;
        }
        changedMapping();
      } else if (e.key === "Enter") {
        e.preventDefault();
        e.target.click();
      }
    };

    const handleBlur = () => {
      input.dataset.acceptingInput = false;
      if (isAcceptingInput) {
        isAcceptingInput = false;
        update();
      }
    };

    input.addEventListener("click", handleClick);
    input.addEventListener("keydown", handleKeyDown);
    input.addEventListener("blur", handleBlur);
    update();

    return input;
  }

  createAxisMapping(mappingList, index) {
    const selector = document.createElement("select");
    selector.className = "gamepadlib-axis-mapping";
    selector.id = axisHtmlId(index);
    selector.appendChild(
      Object.assign(document.createElement("option"), {
        textContent: this.msg("axis-none"),
        value: "none",
      })
    );
    selector.appendChild(
      Object.assign(document.createElement("option"), {
        textContent: this.msg("axis-cursor"),
        value: "cursor",
      })
    );
    selector.appendChild(
      Object.assign(document.createElement("option"), {
        // doesn't really make sense to translate
        textContent: "WASD",
        value: "wasd",
      })
    );
    selector.appendChild(
      Object.assign(document.createElement("option"), {
        textContent: this.msg("axis-arrows"),
        value: "arrows",
      })
    );
    selector.appendChild(
      Object.assign(document.createElement("option"), {
        textContent: this.msg("axis-custom"),
        value: "custom",
      })
    );

    const updateDropdownValue = () => {
      if (mappingList[index].type === "key" || mappingList[index].type === "mousedown") {
        if (
          mappingList[index].high === null &&
          mappingList[index].low === null &&
          mappingList[index + 1].high === null &&
          mappingList[index + 1].low === null
        ) {
          selector.value = "none";
        } else if (
          mappingList[index].high === defaultAxesMappings.wasd[0].high &&
          mappingList[index].low === defaultAxesMappings.wasd[0].low &&
          mappingList[index + 1].high === defaultAxesMappings.wasd[1].high &&
          mappingList[index + 1].low === defaultAxesMappings.wasd[1].low
        ) {
          selector.value = "wasd";
        } else if (
          mappingList[index].high === defaultAxesMappings.arrows[0].high &&
          mappingList[index].low === defaultAxesMappings.arrows[0].low &&
          mappingList[index + 1].high === defaultAxesMappings.arrows[1].high &&
          mappingList[index + 1].low === defaultAxesMappings.arrows[1].low
        ) {
          selector.value = "arrows";
        } else {
          selector.value = "custom";
        }
      } else if (mappingList[index].type === "virtual_cursor") {
        selector.value = "cursor";
      } else {
        // should never happen
        selector.value = "none";
      }
    };
    updateDropdownValue();

    const circleOverlay = document.createElement("div");
    circleOverlay.className = "gamepadlib-axis-circle-overlay";
    const updateOverlay = () => {
      removeAllChildren(circleOverlay);
      if (mappingList[index].type === "key") {
        const buttons = [
          this.createButtonMapping(mappingList, index + 1, { property: "low", allowClick: false }),
          this.createButtonMapping(mappingList, index, { property: "low", allowClick: false }),
          this.createButtonMapping(mappingList, index, { property: "high", allowClick: false }),
          this.createButtonMapping(mappingList, index + 1, { property: "high", allowClick: false }),
        ];
        for (const button of buttons) {
          button.classList.add("gamepadlib-axis-mapper");
          button.addEventListener("mapping-changed", updateDropdownValue);
          circleOverlay.appendChild(button);
        }
      }
    };
    updateOverlay();

    selector.addEventListener("change", () => {
      if (selector.value === "custom") {
        // If key mappings already exist, leave them as-is
        if (mappingList[index].type !== "key") {
          mappingList[index] = transformAndCopyMapping(defaultAxesMappings.arrows[0]);
          mappingList[index + 1] = transformAndCopyMapping(defaultAxesMappings.arrows[1]);
        }
      } else if (selector.value === "arrows") {
        mappingList[index] = transformAndCopyMapping(defaultAxesMappings.arrows[0]);
        mappingList[index + 1] = transformAndCopyMapping(defaultAxesMappings.arrows[1]);
      } else if (selector.value === "wasd") {
        mappingList[index] = transformAndCopyMapping(defaultAxesMappings.wasd[0]);
        mappingList[index + 1] = transformAndCopyMapping(defaultAxesMappings.wasd[1]);
      } else if (selector.value === "cursor") {
        mappingList[index] = transformAndCopyMapping(defaultAxesMappings.cursor[0]);
        mappingList[index + 1] = transformAndCopyMapping(defaultAxesMappings.cursor[1]);
      } else {
        mappingList[index] = transformAndCopyMapping(emptyMapping());
        mappingList[index + 1] = transformAndCopyMapping(emptyMapping());
      }
      updateOverlay();
      this.changed();
    });

    return {
      circleOverlay,
      selector,
    };
  }

  hasControllerSelected() {
    return !!this.selector.value;
  }

  updateContent() {
    removeAllChildren(this.content);

    if (this.hidden) {
      return;
    }

    const selectedId = this.selector.value;
    if (!selectedId) {
      const message = document.createElement("div");
      message.textContent = this.msg("no-controllers");
      this.content.appendChild(message);
      return;
    }

    const gamepadData = this.gamepadLib.gamepads.get(selectedId);
    if (!gamepadData) {
      // Users should never be able to see this
      const message = document.createElement("div");
      message.textContent = `Cannot find controller: ${selectedId}`;
      this.content.appendChild(message);
      return;
    }

    this.buttonIdToElement.clear();
    this.axisIdToElement.clear();

    const mappingsContainer = document.createElement("div");
    mappingsContainer.className = "gamepadlib-content-buttons";
    const buttonMappings = gamepadData.buttonMappings;
    for (let i = 0; i < buttonMappings.length; i++) {
      const container = document.createElement("div");
      container.className = "gamepadlib-mapping";
      container.dataset.id = i;
      const label = document.createElement("label");
      label.className = "gamepadlib-mapping-label";
      label.textContent = this.msg("button-n", { n: i });
      const id = buttonHtmlId(i);
      label.htmlFor = id;
      const options = document.createElement("div");
      options.className = "gamepadlib-mapping-options";
      const mappingInput = this.createButtonMapping(buttonMappings, i);
      mappingInput.id = id;
      options.appendChild(mappingInput);
      container.appendChild(label);
      container.appendChild(options);
      mappingsContainer.appendChild(container);
      this.buttonIdToElement.set(i, container);
    }

    const axesContainer = document.createElement("div");
    axesContainer.className = "gamepadlib-content-axes";
    const axesMappings = gamepadData.axesMappings;
    for (let i = 0; i < axesMappings.length; i += 2) {
      const container = document.createElement("div");
      container.className = "gamepadlib-axis";
      const label = document.createElement("label");
      label.textContent = this.msg("axes-a-b", { a: i, b: i + 1 });
      label.htmlFor = axisHtmlId(i);
      const circle = document.createElement("div");
      circle.className = "gamepadlib-axis-circle";
      const { circleOverlay, selector } = this.createAxisMapping(axesMappings, i);
      circle.appendChild(circleOverlay);
      const dot = document.createElement("div");
      dot.className = "gamepadlib-axis-dot";
      circle.appendChild(dot);
      container.appendChild(label);
      container.appendChild(circle);
      container.appendChild(selector);
      axesContainer.appendChild(container);
      this.axisIdToElement.set(i, dot);
    }

    this.content.appendChild(mappingsContainer);
    this.content.appendChild(axesContainer);
  }

  update(gamepads) {
    if (this.hidden) {
      return;
    }
    const selectedId = this.selector.value;
    if (!selectedId) {
      return;
    }
    const gamepad = Array.from(gamepads).find((i) => i && getGamepadId(i) === this.selector.value);
    if (!gamepad) {
      return;
    }
    for (let i = 0; i < gamepad.buttons.length; i++) {
      const element = this.buttonIdToElement.get(i);
      if (element) {
        const button = gamepad.buttons[i];
        const value = button.value.toString();
        if (value !== element.dataset.value) {
          element.dataset.value = value;
        }
      }
    }
    for (let i = 0; i < gamepad.axes.length; i += 2) {
      const element = this.axisIdToElement.get(i);
      if (element) {
        const x = gamepad.axes[i];
        const y = gamepad.axes[i + 1] || 0;
        const size = 150 / 2;
        element.style.transform = `translate(-50%, -50%) translate(${x * size}px, ${y * size}px)`;
      }
    }
  }

  export() {
    const selectedId = this.selector.value;
    if (!selectedId) {
      return null;
    }
    const gamepadData = this.gamepadLib.gamepads.get(selectedId);
    if (!gamepadData) {
      return null;
    }
    return {
      axes: gamepadData.axesMappings.map(prepareAxisMappingForExport),
      buttons: gamepadData.buttonMappings.map(prepareButtonMappingForExport),
    };
  }

  changed() {
    this.dispatchEvent(new CustomEvent("mapping-changed"));
  }

  hide() {
    this.hidden = true;
    this.updateContent();
  }

  focus() {
    if (this.selector.value) {
      this.selector.focus();
    }
  }

  generateEditor() {
    this.hidden = false;
    this.updateAllContent();
    return this.root;
  }
}

export default GamepadLib;
