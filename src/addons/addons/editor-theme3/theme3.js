export default async function ({ addon, global, console }) {
  var stylesheet = `path.blocklyBlockBackground[fill="#FF6680"],
    path.blocklyBlockBackground[fill="#5CB1D6"],
    path.blocklyBlockBackground[fill="#FFBF00"],
    g[data-category] > path.blocklyBlockBackground {
      stroke: #0003;
    }
    g[data-argument-type="dropdown"] > path,
    g[data-argument-type="dropdown"] > rect,
    g[data-argument-type="variable"] > rect,
    g[data-argument-type="variable"] > path,
    g[data-shapes="c-block c-1 hat"] > g[data-shapes="stack"]:not(.blocklyDraggable) > path,
    path[data-argument-type="boolean"] {
      stroke: #0003;
      fill: #0001;
    }
    g[data-argument-type*="text"] > path,
    g > line {
      stroke: #0002;
    }
    .scratchCategoryItemBubble {
      border-color: #0003 !important;
    }
	`;

  var categories = {
    motion: {
      color: "#4C97FF",
    },
    looks: {
      color: "#9966FF",
    },
    sounds: {
      color: "#CF63CF",
      alt: "sound",
    },
    events: {
      color: "#DE9E2E",
    },
    control: {
      color: "#FFBF00",
    },
    sensing: {
      color: "#5CB1D6",
    },
    operators: {
      color: "#59C059",
    },
    data: {
      color: "#FF8C1A",
      alt: "variables",
    },
    "data-lists": {
      color: "#FF661A",
      alt: "lists",
      var: "dataLists",
    },
    custom: {
      color: "#FF6680",
      alt: "myBlocks",
    },
    Pen: {
      // For historical reasons, this is called "Pen".
      color: "#0FBD8C",
      alt: "pen",
    },
    TurboWarp: {
      color: "#ff4c4c",
      alt: "tw",
      var: "tw",
    },
  };

  for (var prop of Object.keys(categories)) {
    stylesheet += `g[data-category="${prop}"] > path.blocklyBlockBackground {
			fill: var(--editorTheme3-${categories[prop].var ? categories[prop].var : prop}Color);
		}
		.scratchCategoryId-${categories[prop].alt ? categories[prop].alt : prop} > .scratchCategoryItemBubble {
			background-color: var(--editorTheme3-${categories[prop].var ? categories[prop].var : prop}Color) !important;
		}
    .blocklyDropDownDiv[data-category="${prop}"] {
      background-color: var(--editorTheme3-${categories[prop].var ? categories[prop].var : prop}Color) !important;
    }
	    `;
    if (prop === "custom") {
      stylesheet += `path.blocklyBlockBackground[fill="#FF6680"] {
				fill: var(--editorTheme3-${prop}Color) !important;
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
        }`;
    }
    if (prop === "Pen") {
      stylesheet += `path.blocklyBlockBackground[fill="#0FBD8C"] {
				fill: var(--editorTheme3-${prop}Color);
        }
        .blocklyDropDownDiv[style*="rgb(15, 189, 140)"] {
          background-color: var(--editorTheme3-${prop}Color) !important;
        }`;
    }
  }

  const otherStyle = document.querySelector(`[data-addon-id='${addon.self.id}']`);
  const newStyle = document.createElement("style");
  newStyle.textContent = stylesheet;
  newStyle.className = "scratch-addons-style";
  newStyle.setAttribute("data-addon-id", addon.self.id);
  newStyle.setAttribute("data-addon-index", otherStyle.getAttribute("data-addon-index"));

  otherStyle.parentElement.insertBefore(newStyle, otherStyle.nextSibling);

  // Look for reenable event to enable the style. cs.js cannot handle an appended style.
  addon.self.addEventListener("reenabled", () => (newStyle.disabled = false));
}
