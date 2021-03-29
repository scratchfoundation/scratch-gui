/* inserted by pull.js */
import _twAsset0 from "./assets/sv-gr.png";
const _twGetAsset = (path) => {
  if (path === "/assets/sv-gr.png") return _twAsset0;
  throw new Error(`Unknown asset: ${path}`);
};

// this script was happily stolen from the color-picker addon, developed by Richie Bendall and apple502j

// import required libraries
import { normalizeHex } from "../../libraries/normalize-color.js";
import RateLimiter from "../../libraries/rate-limiter.js";
import tinycolor from "../../libraries/tinycolor-min.js";

export default async ({ addon, console, msg }) => {
  let prevEventHandler;
  // 250-ms rate limit
  const rateLimiter = new RateLimiter(250);

  // get the color from scratch
  const getColor = (element) => {
    let fillOrStroke;
    const state = addon.tab.redux.state;
    if (state.scratchPaint.modals.fillColor) {
      fillOrStroke = "fill";
    } else if (state.scratchPaint.modals.strokeColor) {
      fillOrStroke = "stroke";
    } else {
      fillOrStroke = "wh";
      return;
    }
    const colorType = state.scratchPaint.fillMode.colorIndex;
    const primaryOrSecondary = ["primary", "secondary"][colorType];
    const color = state.scratchPaint.color[`${fillOrStroke}Color`][primaryOrSecondary];
    if (color === null || color === "scratch-paint/style-path/mixed") return;
    // This value can be arbitrary - it can be HEX, RGB, etc.
    // Use tinycolor to convert them.
    return tinycolor(color).toHex();
  };

  // load the new color to scratch
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

  // for the color picker's background color
  const convertToGeneralColor = (hex) => {
    let h = tinycolor(hex).toHsv();
    h.s = 1;
    h.v = 1;
    return tinycolor(h).toHex();
  };

  // le loop
  while (true) {
    // wait for color dialog box appearance
    const element = await addon.tab.waitForElement('div[class*="color-picker_swatch-row"]', { markAsSeen: true });
    rateLimiter.abort(false);

    // update the bg color of the picker
    function updateColor() {
      rateLimiter.limit(() => {
        let c = getColor(element);
        let chsv = tinycolor(c).toHsv();
        updateHandleFinal(chsv.s, chsv.v);
        saColorPicker.style.background = "#" + convertToGeneralColor(getColor(element));
      });
    }

    // redux stuff
    addon.tab.redux.initialize();
    addon.tab.redux.addEventListener("statechanged", (e) =>
      e.detail.action.type === "scratch-paint/fill-style/CHANGE_FILL_COLOR" ||
      e.detail.action.type === "scratch-paint/fill-style/CHANGE_FILL_COLOR_2" ||
      e.detail.action.type === "scratch-paint/stroke-style/CHANGE_STROKE_COLOR" ||
      e.detail.action.type === "scratch-paint/stroke-style/CHANGE_STROKE_COLOR_2"
        ? updateColor()
        : 0
    );
    if (addon.tab.redux && typeof prevEventHandler === "function") {
      addon.tab.redux.removeEventListener("statechanged", prevEventHandler);
      prevEventHandler = null;
    }

    // get the color
    if (addon.tab.editorMode !== "editor") continue;
    let defaultColor = getColor(element);

    // create the color picker element and all it's child elements
    const saColorPicker = document.createElement("div");
    saColorPicker.className = "sa-2dcolor-picker";
    saColorPicker.style.background = "#" + convertToGeneralColor(defaultColor || "ff0000");

    const saColorPickerImage = Object.assign(document.createElement("img"), {
      className: "sa-2dcolor-picker-image",
      src: _twGetAsset("/assets/sv-gr.png"),
      draggable: false,
    });
    const saColorPickerHandle = Object.assign(document.createElement("div"), {
      className: addon.tab.scratchClass("slider_handle"),
    });
    saColorPickerHandle.style.pointerEvents = "none";

    // create the label
    const saColorLabel = document.createElement("div");
    saColorLabel.className = addon.tab.scratchClass("color-picker_row-header", { others: "sa-2dcolor-label" });
    const saColorLabelName = document.createElement("span");
    saColorLabelName.className = addon.tab.scratchClass("color-picker_label-name", { others: "sa-2dcolor-label-name" });
    saColorLabelName.innerText = msg("shade");
    const saColorLabelVal = document.createElement("span");
    saColorLabelVal.className = addon.tab.scratchClass("color-picker_label-readout", {
      others: "sa-2dcolor-label-val",
    });
    saColorLabel.appendChild(saColorLabelName);
    saColorLabel.appendChild(saColorLabelVal);

    let keyPressed = -1;
    let originalPos = { x: 0, y: 0 };
    window.addEventListener("keydown", (e) => (keyPressed = e.keyCode));
    window.addEventListener("keyup", () => (keyPressed = -1));

    let origHue = 0;
    let el = null;

    let mousemovefunc = function (e) {
      updateHandle(e, keyPressed, originalPos);
      return false;
    };

    let mouseupfunc = function (e) {
      updateFinal(e, keyPressed, originalPos);
    };

    function updateHandle(e, keyPressed, originalPos) {
      let cx = Math.min(Math.max(e.clientX - saColorPicker.getBoundingClientRect().x, 0), 150);
      let cy = Math.min(Math.max(e.clientY - saColorPicker.getBoundingClientRect().y, 0), 150);
      if (keyPressed === 16) {
        if (Math.abs(cx - originalPos.x) > Math.abs(cy - originalPos.y)) cy = originalPos.y;
        else cx = originalPos.x;
      }
      saColorPickerHandle.style.left = cx - 8 + "px";
      saColorPickerHandle.style.top = cy - 8 + "px";
      saColorLabelVal.innerText = `${Math.round((cx / 150) * 100)}, ${100 - Math.round((cy / 150) * 100)}`;

      //update color in real-time (i only bothered to do that for solid colors)
      if (
        (!addon.tab.redux.state.scratchPaint.fillMode.gradientType ||
          addon.tab.redux.state.scratchPaint.fillMode.gradientType === "SOLID") &&
        el
      ) {
        let c = tinycolor({ h: origHue, s: cx / 150, v: 1 - cy / 150 }).toHex();
        if (c.startsWith("#")) el.style.background = c;
        else el.style.background = "#" + c;
      }
    }

    function updateHandleFinal(s, v) {
      saColorPickerHandle.style.left = s * 150 - 8 + "px";
      saColorPickerHandle.style.top = (1 - v) * 150 - 8 + "px";
      saColorLabelVal.innerText = `${Math.round(s * 100)}, ${Math.round(v * 100)}`;
    }

    function updateFinal(e, keyPressed, originalPos) {
      rateLimiter.limit(() => {
        let ox = Math.min(Math.max(e.clientX - saColorPicker.getBoundingClientRect().x, 0), 150);
        let oy = Math.min(Math.max(e.clientY - saColorPicker.getBoundingClientRect().y, 0), 150);
        if (keyPressed === 16) {
          if (Math.abs(ox - originalPos.x) > Math.abs(oy - originalPos.y)) oy = originalPos.y;
          else ox = originalPos.x;
        }

        let color = tinycolor(getColor(element)).toHsv();
        let s = ox / 150;
        let v = 1 - oy / 150;
        let newColor = tinycolor({ h: color.h, s: s, v: v }).toHex();
        setColor(newColor, element);
        updateHandleFinal(s, v);
      });

      window.removeEventListener("pointermove", mousemovefunc);
      window.removeEventListener("pointerup", mouseupfunc);
    }

    if (defaultColor) {
      let defaultHexColor = tinycolor(defaultColor).toHsv();
      updateHandleFinal(defaultHexColor.s, defaultHexColor.v);
    } else updateHandleFinal(1, 1);

    saColorPicker.addEventListener("pointerdown", (e) => {
      e.preventDefault();

      originalPos = {
        x: parseFloat(saColorPickerHandle.style.left) + 8,
        y: parseFloat(saColorPickerHandle.style.top) + 8,
      };

      let fillOrStroke;
      const state = addon.tab.redux.state;
      if (state.scratchPaint.modals.fillColor) {
        fillOrStroke = "fill";
      } else if (state.scratchPaint.modals.strokeColor) {
        fillOrStroke = "stroke";
      } else {
        fillOrStroke = "wh";
      }

      el = null;
      if (fillOrStroke === "fill")
        el = document.getElementsByClassName(addon.tab.scratchClass("color-button_color-button-swatch"))[0];
      else if (fillOrStroke === "stroke")
        el = document.getElementsByClassName(addon.tab.scratchClass("color-button_color-button-swatch"))[1];
      if (el) origHue = tinycolor(el.style.background).toHsv().h;

      updateHandle(e);

      window.addEventListener("pointermove", mousemovefunc);
      window.addEventListener("pointerup", mouseupfunc);
    });
    prevEventHandler = ({ detail }) => {
      if (detail.action.type === "scratch-paint/color-index/CHANGE_COLOR_INDEX") {
        setTimeout(() => {
          updateColor();
        }, 100);
      }
    };
    addon.tab.redux.addEventListener("statechanged", prevEventHandler);
    saColorPicker.appendChild(saColorPickerImage);
    saColorPicker.appendChild(saColorPickerHandle);
    let e = element;
    if (element.parentElement.querySelector(".sa-color-picker"))
      e = element.parentElement.querySelector(".sa-color-picker");
    element.parentElement.insertBefore(saColorLabel, e);
    element.parentElement.insertBefore(saColorPicker, e);

    //hide sat and bright sliders
    saColorPicker.parentElement.children[2].style.display = "none";
    saColorPicker.parentElement.children[3].style.display = "none";
  }
};
