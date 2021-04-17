import { normalizeHex, getHexRegex } from "../../libraries/normalize-color.js";
import RateLimiter from "../../libraries/rate-limiter.js";
import tinycolor from "../../libraries/tinycolor-min.js";

export default async ({ addon, console, msg }) => {
  let prevEventHandler;
  // 250-ms rate limit
  const rateLimiter = new RateLimiter(250);
  const getColor = (element) => {
    let fillOrStroke;
    const state = addon.tab.redux.state;
    if (state.scratchPaint.modals.fillColor) {
      fillOrStroke = "fill";
    } else if (state.scratchPaint.modals.strokeColor) {
      fillOrStroke = "stroke";
    } else {
      fillOrStroke = "ihadastroke";
      return;
    }
    const colorType = state.scratchPaint.fillMode.colorIndex;
    const primaryOrSecondary = ["primary", "secondary"][colorType];
    const color = state.scratchPaint.color[`${fillOrStroke}Color`][primaryOrSecondary];
    if (color === null || color === "scratch-paint/style-path/mixed") return;
    // This value can be arbitrary - it can be HEX, RGB, etc.
    // Use tinycolor to convert them.
    return tinycolor(color).toHexString();
  };
  const setColor = (hex, element) => {
    hex = normalizeHex(hex);
    if (!addon.tab.redux.state || !addon.tab.redux.state.scratchPaint) return;
    // The only way to reliably set color is to invoke eye dropper via click()
    // then faking that the eye dropper reported the value.
    const onEyeDropperOpened = ({ detail }) => {
      if (detail.action.type !== "scratch-paint/eye-dropper/ACTIVATE_COLOR_PICKER") return;
      addon.tab.redux.removeEventListener("statechanged", onEyeDropperOpened);
      setTimeout(() => {
        const previousTool = addon.tab.redux.state.scratchPaint.color.eyeDropper.previousTool;
        if (previousTool) previousTool.activate();
        addon.tab.redux.state.scratchPaint.color.eyeDropper.callback(hex);
        addon.tab.redux.dispatch({
          type: "scratch-paint/eye-dropper/DEACTIVATE_COLOR_PICKER",
        });
      }, 50);
    };
    addon.tab.redux.addEventListener("statechanged", onEyeDropperOpened);
    element.children[1].children[0].click();
  };
  while (true) {
    const element = await addon.tab.waitForElement('div[class*="color-picker_swatch-row"]', {
      markAsSeen: true,
      condition: () =>
        addon.tab.redux.state.scratchGui.editorTab.activeTabIndex === 1 &&
        !addon.tab.redux.state.scratchGui.mode.isPlayerOnly,
    });
    rateLimiter.abort(false);
    addon.tab.redux.initialize();
    if (addon.tab.redux && typeof prevEventHandler === "function") {
      addon.tab.redux.removeEventListener("statechanged", prevEventHandler);
      prevEventHandler = null;
    }
    if (addon.tab.editorMode !== "editor") continue;
    const defaultColor = getColor(element);
    const saColorPicker = Object.assign(document.createElement("div"), {
      className: "sa-color-picker sa-color-picker-paint",
    });
    const saColorPickerColor = Object.assign(document.createElement("input"), {
      className: "sa-color-picker-color sa-color-picker-paint-color",
      type: "color",
      value: defaultColor || "#000000",
    });
    const inputClass = document.querySelector('[class*="fixed-tools_costume-input"]').className.split(" ")[0];
    const saColorPickerText = Object.assign(document.createElement("input"), {
      className: `sa-color-picker-text sa-color-picker-paint-text ${inputClass}`,
      type: "text",
      pattern: "^#[0-9a-fA-F]{3,8}$",
      placeholder: msg("hex"),
      value: defaultColor || "",
    });
    saColorPickerColor.addEventListener("input", () =>
      rateLimiter.limit(() => setColor((saColorPickerText.value = saColorPickerColor.value), element))
    );
    saColorPickerText.addEventListener("change", () => {
      const { value } = saColorPickerText;
      if (!getHexRegex().test(value)) return;
      setColor((saColorPickerColor.value = normalizeHex(value)), element);
    });
    prevEventHandler = ({ detail }) => {
      if (detail.action.type === "scratch-paint/color-index/CHANGE_COLOR_INDEX") {
        setTimeout(() => {
          const color = getColor(element);
          saColorPickerColor.value = color || "#000000";
          saColorPickerText.value = color || "";
        }, 100);
      }
    };
    addon.tab.redux.addEventListener("statechanged", prevEventHandler);
    saColorPicker.appendChild(saColorPickerColor);
    saColorPicker.appendChild(saColorPickerText);
    element.parentElement.insertBefore(saColorPicker, element);
  }
};
