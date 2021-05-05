import { normalizeHex, getHexRegex } from "../../libraries/common/cs/normalize-color.js";
import RateLimiter from "../../libraries/common/cs/rate-limiter.js";
import tinycolor from "../../libraries/thirdparty/cs/tinycolor-min.js";

export default async ({ addon, console, msg }) => {
  // 250-ms rate limit
  const rateLimiter = new RateLimiter(250);
  const getColor = (element) => {
    const { children } = element.parentElement;
    // h: 0 - 360
    const h = children[1].getAttribute("aria-valuenow");
    // s: 0 - 1
    const s = children[3].getAttribute("aria-valuenow");
    // v: 0 - 255, divide by 255
    const vMultipliedBy255 = children[5].getAttribute("aria-valuenow");
    const v = Number(vMultipliedBy255) / 255;
    return tinycolor(`hsv(${h}, ${s}, ${v || 0})`).toHexString();
  };
  const setColor = (hex, element) => {
    hex = normalizeHex(hex);
    if (!addon.tab.redux.state || !addon.tab.redux.state.scratchGui) return;
    // The only way to reliably set color is to invoke eye dropper via click()
    // then faking that the eye dropper reported the value.
    const onEyeDropperClosed = ({ detail }) => {
      if (detail.action.type !== "scratch-gui/color-picker/DEACTIVATE_COLOR_PICKER") return;
      addon.tab.redux.removeEventListener("statechanged", onEyeDropperClosed);
      setTimeout(() => {
        document.body.classList.remove("sa-hide-eye-dropper-background");
      }, 50);
    };
    const onEyeDropperOpened = ({ detail }) => {
      if (detail.action.type !== "scratch-gui/color-picker/ACTIVATE_COLOR_PICKER") return;
      addon.tab.redux.removeEventListener("statechanged", onEyeDropperOpened);
      addon.tab.redux.addEventListener("statechanged", onEyeDropperClosed);
      setTimeout(() => {
        addon.tab.redux.dispatch({
          type: "scratch-gui/color-picker/DEACTIVATE_COLOR_PICKER",
          color: hex,
        });
      }, 50);
    };
    addon.tab.redux.addEventListener("statechanged", onEyeDropperOpened);
    document.body.classList.add("sa-hide-eye-dropper-background");
    element.click();
  };
  const addColorPicker = () => {
    const element = document.querySelector("button.scratchEyedropper");
    rateLimiter.abort(false);
    addon.tab.redux.initialize();
    const defaultColor = getColor(element);
    const saColorPicker = Object.assign(document.createElement("div"), {
      className: "sa-color-picker sa-color-picker-code",
    });
    const saColorPickerColor = Object.assign(document.createElement("input"), {
      className: "sa-color-picker-color sa-color-picker-code-color",
      type: "color",
      value: defaultColor || "#000000",
    });
    const saColorPickerText = Object.assign(document.createElement("input"), {
      className: addon.tab.scratchClass("input_input-form", {
        others: "sa-color-picker-text sa-color-picker-code-text",
      }),
      type: "text",
      pattern: "^#?([0-9a-fA-F]{3}){1,2}$",
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
    saColorPicker.appendChild(saColorPickerColor);
    saColorPicker.appendChild(saColorPickerText);
    element.parentElement.insertBefore(saColorPicker, element);
  };
  const ScratchBlocks = await addon.tab.traps.getBlockly();
  const originalShowEditor = ScratchBlocks.FieldColourSlider.prototype.showEditor_;
  ScratchBlocks.FieldColourSlider.prototype.showEditor_ = function (...args) {
    const r = originalShowEditor.call(this, ...args);
    addColorPicker();
    return r;
  };
};
