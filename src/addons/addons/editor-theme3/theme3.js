import { textColor, multiply } from "../../libraries/common/cs/text-color.esm.js";

function updateSettings(addon, newStyle) {
  var stylesheet = "";
  const textMode = addon.settings.get("text");
  if (textMode === "black") {
    stylesheet += `
      .blocklyText {
        fill: #575e75;
      }
      .blocklyDropdownText {
        fill: #575e75 !important;
      }
      .blocklyDropDownDiv .goog-menuitem,
      #s3devIDD > li {
        color: #575e75;
      }`;
  }
  var categories = {
    motion: {
      color: "#4C97FF",
      tertiaryColor: "#3373CC",
    },
    looks: {
      color: "#9966FF",
      tertiaryColor: "#774DCB",
    },
    sounds: {
      color: "#CF63CF",
      tertiaryColor: "#BD42BD",
      alt: "sound",
    },
    events: {
      color: "#DE9E2E",
      tertiaryColor: "#CC9900",
    },
    control: {
      color: "#FFBF00",
      tertiaryColor: "#CF8B17",
    },
    sensing: {
      color: "#5CB1D6",
      tertiaryColor: "#2E8EB8",
    },
    operators: {
      color: "#59C059",
      tertiaryColor: "#389438",
    },
    data: {
      color: "#FF8C1A",
      tertiaryColor: "#DB6E00",
      alt: "variables",
    },
    "data-lists": {
      color: "#FF661A",
      tertiaryColor: "#E64D00",
      alt: "lists",
      var: "dataLists",
    },
    custom: {
      color: "#FF6680",
      tertiaryColor: "#FF6355",
      alt: "myBlocks",
    },
    Pen: {
      // For historical reasons, this is called "Pen".
      color: "#0FBD8C",
      tertiaryColor: "#0B8E69",
      alt: "pen",
    },
    TurboWarp: {
      color: "#ff4c4c",
      tertiaryColor: "#e64444", // TODO fix
      alt: "tw",
      var: "tw",
    },
  };

  for (var prop of Object.keys(categories)) {
    var settingName = categories[prop].var ? categories[prop].var : prop;
    if (textMode === "white" || textMode === "black") {
      stylesheet += `g[data-category="${prop}"] > path.blocklyBlockBackground {
        fill: var(--editorTheme3-${settingName}Color);
      }
      .scratchCategoryId-${categories[prop].alt ? categories[prop].alt : prop} > .scratchCategoryItemBubble {
        background-color: var(--editorTheme3-${settingName}Color) !important;
      }
      .blocklyDropDownDiv[data-category="${prop}"] {
        background-color: var(--editorTheme3-${settingName}Color) !important;
        border-color: #0003 !important;
      }
      .blocklyBubbleCanvas [stroke="${categories[prop].tertiaryColor}"] {
        stroke: var(--editorTheme3-${settingName}Color);
      }
      #s3devIDD > li.${prop} {
        background-color: var(--editorTheme3-${settingName}Color);
      }`;
      if (prop === "custom") {
        stylesheet += `path.blocklyBlockBackground[fill="#FF6680"] {
          fill: var(--editorTheme3-${prop}Color);
        }`;
      }
      if (prop === "sensing") {
        stylesheet += `path.blocklyBlockBackground[fill="#5CB1D6"] {
          fill: var(--editorTheme3-${prop}Color);
        }`;
      }
      if (prop === "events") {
        stylesheet += `path.blocklyBlockBackground[fill="#FFBF00"] {
          fill: var(--editorTheme3-${prop}Color);
        }
        .blocklyDropDownDiv[style*="rgb(255, 191, 0)"] {
          background-color: var(--editorTheme3-${prop}Color) !important;
          border-color: #0003 !important;
        }`;
      }
      if (prop === "Pen") {
        stylesheet += `path.blocklyBlockBackground[fill="#0FBD8C"] {
          fill: var(--editorTheme3-${prop}Color);
        }
        .blocklyDropDownDiv[style*="rgb(15, 189, 140)"] {
          background-color: var(--editorTheme3-${prop}Color) !important;
          border-color: #0003 !important;
        }`;
      }
    } else {
      let background = { colorOnWhite: "#fff", colorOnBlack: "#282828" }[textMode];
      let inputShadow = { colorOnWhite: "#00000026", colorOnBlack: "#fff3" }[textMode];
      let secondary = multiply(addon.settings.get((prop === "TurboWarp" ? "tw" : prop) + "-color"), { a: 0.15 });
      stylesheet += `g[data-category="${prop}"] > path.blocklyBlockBackground,
      g[data-category="${prop}"] > g[data-argument-type="dropdown"] > rect,
      g[data-category="${prop}"] > g[data-argument-type="variable"] > rect {
        fill: ${background};
        stroke: var(--editorTheme3-${settingName}Color);
      }
      g[data-category="${prop}"] > .blocklyText {
        fill: var(--editorTheme3-${settingName}Color);
      }
      g[data-category="${prop}"] > g[data-argument-type="dropdown"] > .blocklyDropdownText,
      g[data-category="${prop}"] > g[data-argument-type="variable"] > .blocklyDropdownText,
      g[data-category="${prop}"] > g[data-argument-type="dropdown"] > g > .blocklyDropdownText {
        fill: var(--editorTheme3-${settingName}Color) !important;
      }
      g[data-category="${prop}"] > g[data-argument-type="dropdown"] > path,
      g[data-category="${prop}"] > g[data-argument-type="variable"] > path,
      g[data-category="${prop}"] > path[data-argument-type="boolean"] {
        fill: ${secondary};
        stroke: var(--editorTheme3-${settingName}Color);
      }
      .scratchCategoryId-${categories[prop].alt ? categories[prop].alt : prop} > .scratchCategoryItemBubble {
        background-color: var(--editorTheme3-${settingName}Color) !important;
      }
      .blocklyDropDownDiv[data-category="${prop}"] {
        background-color: ${background} !important;
        border-color: var(--editorTheme3-${settingName}Color) !important;
      }
      .blocklyDropDownDiv[data-category="${prop}"] .goog-menuitem {
        color: var(--editorTheme3-${settingName}Color);
      }
      .blocklyBubbleCanvas [stroke="${categories[prop].tertiaryColor}"],
      g[data-category=${prop}] > g[data-argument-type*="text"] > path,
      g[data-category=${prop}] > g > line  {
        stroke: var(--editorTheme3-${settingName}Color);
      }
      .blocklyWidgetDiv.fieldTextInput[style*="box-shadow"] {
        box-shadow: 0 0 0 4px ${inputShadow} !important;
      }
      #s3devIDD > li.${prop} {
        background-color: ${background};
        color: var(--editorTheme3-${settingName}Color);
      }
      #s3devIDD > li.${prop}:not(.boolean) {
        border: 1px solid var(--editorTheme3-${settingName}Color);
      }`;
      if (prop === "custom") {
        stylesheet += `path.blocklyBlockBackground[fill="#FF6680"] {
          fill: ${background};
          stroke: var(--editorTheme3-${prop}Color);
        }
        path.blocklyBlockBackground[fill="#FF6680"] ~ .blocklyText,
        g[data-shapes="c-block c-1 hat"] > g[data-shapes="stack"]:not(.blocklyDraggable) > .blocklyText,
        .blocklyEditableText > rect[fill="#FF3355"] ~ .blocklyText {
          fill: var(--editorTheme3-${prop}Color);
        }
        path.blocklyBlockBackground[fill="#FF6680"] ~ [data-argument-type="text"] > path {
          stroke: var(--editorTheme3-${prop}Color);
        }
        g[data-shapes="c-block c-1 hat"] > g[data-shapes="stack"]:not(.blocklyDraggable) > path,
        path[data-argument-type="boolean"][fill="#FF3355"] {
          fill: ${secondary};
          stroke: var(--editorTheme3-${prop}Color);
        }
        .blocklyEditableText > rect[fill="#FF3355"] {
          fill: ${secondary};
        }`;
      }
      if (prop === "sensing") {
        stylesheet += `path.blocklyBlockBackground[fill="#5CB1D6"],
        g[data-argument-type="dropdown"] > rect[fill="#5CB1D6"],
        g[data-argument-type="dropdown"] > rect[fill="#2E8EB8"] {
          fill: ${background};
          stroke: var(--editorTheme3-${prop}Color);
        }
        g[data-argument-type="dropdown"] > path[fill="#47A8D1"],
        g[data-argument-type="dropdown"] > path[fill="#2E8EB8"] {
          fill: ${secondary};
          stroke: var(--editorTheme3-${prop}Color);
        }
        path.blocklyBlockBackground[fill="#5CB1D6"] ~ .blocklyText {
          fill: var(--editorTheme3-${prop}Color);
        }
        g[data-argument-type="dropdown"] > rect[fill="#5CB1D6"] ~ .blocklyText,
        g[data-argument-type="dropdown"] > rect[fill="#2E8EB8"] ~ .blocklyText,
        g[data-argument-type="dropdown"] > path[fill="#47A8D1"] ~ * > .blocklyText,
        g[data-argument-type="dropdown"] > path[fill="#2E8EB8"] ~ * > .blocklyText {
          fill: var(--editorTheme3-${prop}Color) !important;
        }
        .blocklyDropDownDiv[style*="rgb(92, 177, 214)"] {
          background-color: ${background} !important;
          border-color: var(--editorTheme3-${settingName}Color) !important;
        }
        .blocklyDropDownDiv[style*="rgb(92, 177, 214)"] .goog-menuitem {
          color: var(--editorTheme3-${settingName}Color);
        }`;
      }
      if (prop === "events") {
        stylesheet += `path.blocklyBlockBackground[fill="#FFBF00"],
        g[data-argument-type="dropdown"] > rect[fill="#FFBF00"],
        g[data-argument-type="dropdown"] > rect[fill="#CC9900"] {
          fill: ${background};
          stroke: var(--editorTheme3-${settingName}Color);
        }
        path.blocklyBlockBackground[fill="#FFBF00"] ~ .blocklyText {
          fill: var(--editorTheme3-${prop}Color);
        }
        path.blocklyBlockBackground[fill="#FFBF00"] ~ g[data-argument-type="variable"] > g > .blocklyDropdownText {
          fill: var(--editorTheme3-${prop}Color) !important;
        }
        g[data-argument-type="dropdown"] > rect[fill="#FFBF00"] ~ .blocklyText,
        g[data-argument-type="dropdown"] > rect[fill="#CC9900"] ~ .blocklyText {
          fill: var(--editorTheme3-${prop}Color) !important;
        }
        .blocklyDropDownDiv[style*="rgb(255, 191, 0)"] {
          background-color: ${background} !important;
          border-color: var(--editorTheme3-${settingName}Color) !important;
        }
        .blocklyDropDownDiv[style*="rgb(255, 191, 0)"] .goog-menuitem {
          color: var(--editorTheme3-${settingName}Color);
        }`;
      }
      if (prop === "Pen") {
        stylesheet += `g[data-category] /* specificity */ > path.blocklyBlockBackground[fill="#0FBD8C"] {
          fill: ${background};
          stroke: var(--editorTheme3-${prop}Color);
        }
        path.blocklyBlockBackground[fill="#0FBD8C"] ~ .blocklyText {
          fill: var(--editorTheme3-${prop}Color);
        }
        path.blocklyBlockBackground[fill="#0FBD8C"] ~ g[data-argument-type="dropdown"] > g > .blocklyDropdownText {
          fill: var(--editorTheme3-${prop}Color) !important;
        }
        g[data-argument-type="dropdown"] > path[fill="#0DA57A"],
        g[data-argument-type="dropdown"] > path[fill="#0B8E69"] {
          fill: ${secondary};
          stroke: var(--editorTheme3-${prop}Color);
        }
        .blocklyDropDownDiv[style*="rgb(15, 189, 140)"] {
          background-color: ${background} !important;
          border-color: var(--editorTheme3-${settingName}Color) !important;
        }
        path.blocklyBlockBackground[fill="#0FBD8C"] ~ [data-argument-type="text"] > path,
        path.blocklyBlockBackground[fill="#0FBD8C"] ~ g > line  {
          stroke: var(--editorTheme3-${prop}Color);
        }
        #s3devIDD > li.extension {
          background-color: ${background};
          color: var(--editorTheme3-${settingName}Color);
        }
        #s3devIDD > li.extension:not(.boolean) {
          border: 1px solid var(--editorTheme3-${settingName}Color);
        }`;
      }
    }
  }

  document.documentElement.style.setProperty(
    "--editorTheme3-inputColor-text",
    textColor(addon.settings.get("input-color"))
  );
  newStyle.textContent = stylesheet;
}

export default async function ({ addon, global, console }) {
  const otherStyle = document.querySelector(`[data-addon-id='${addon.self.id}']`);
  const newStyle = document.createElement("style");
  updateSettings(addon, newStyle);
  addon.settings.addEventListener("change", () => {
    updateSettings(addon, newStyle);
  });
  newStyle.className = "scratch-addons-style";
  newStyle.setAttribute("data-addon-id", addon.self.id);
  newStyle.setAttribute("data-addon-index", otherStyle.getAttribute("data-addon-index"));

  otherStyle.parentElement.insertBefore(newStyle, otherStyle.nextSibling);

  // Look for reenable event to enable the style. cs.js cannot handle an appended style.
  addon.self.addEventListener("reenabled", () => (newStyle.disabled = false));
}
