export default async function ({ addon, global, console }) {
  const DRAG_AREA_CLASS = "sa-drag-area";
  const DRAG_OVER_CLASS = "sa-dragged-over";

  function droppable(dropArea, onDrop, allowDrop = () => true) {
    dropArea.classList.add(DRAG_AREA_CLASS);
    dropArea.addEventListener("drop", (e) => {
      if (e.dataTransfer.types.includes("Files") && allowDrop()) {
        if (e.dataTransfer.files.length > 0) {
          onDrop(e.dataTransfer.files);
        }
        e.preventDefault();
      }
      dropArea.classList.remove(DRAG_OVER_CLASS);
    });
    dropArea.addEventListener("dragover", (e) => {
      // Ignore dragged text, for example
      if (!e.dataTransfer.types.includes("Files") || !allowDrop()) {
        return;
      }
      dropArea.classList.add(DRAG_OVER_CLASS);
      e.preventDefault();
    });
    dropArea.addEventListener("dragleave", () => {
      dropArea.classList.remove(DRAG_OVER_CLASS);
    });
  }

  async function foreverDroppable(dropAreaSelector, fileInputSelector) {
    while (true) {
      const dropArea = await addon.tab.waitForElement(dropAreaSelector, { markAsSeen: true });
      const fileInput = await addon.tab.waitForElement(fileInputSelector, {
        markAsSeen: true,
      });
      droppable(dropArea, (files) => {
        fileInput.files = files;
        fileInput.dispatchEvent(new Event("change", { bubbles: true }));
      });
    }
  }

  // Sprite selector
  foreverDroppable(
    'div[class*="sprite-selector_sprite-selector"]',
    'div[class*="sprite-selector_sprite-selector"] input[class*="action-menu_file-input"]'
  );

  // Stage selector
  foreverDroppable(
    'div[class*="stage-selector_stage-selector"]',
    'div[class*="stage-selector_stage-selector"] input[class*="action-menu_file-input"]'
  );

  // Costume/sound asset list
  foreverDroppable(
    'div[class*="selector_wrapper"]',
    'div[class*="selector_wrapper"] input[class*="action-menu_file-input"]'
  );

  async function listMonitorsDroppable() {
    while (true) {
      const listMonitor = await addon.tab.waitForElement('div[class*="monitor_list-monitor"]', { markAsSeen: true });
      const canDrop = () => {
        // Don't show drop indicator if in fullscreen/player mode
        return !listMonitor.closest('div[class*="stage_full-screen"], .guiPlayer');
      };
      const handleDrop = async (files) => {
        const contextMenuBefore = document.querySelector("body > .react-contextmenu.react-contextmenu--visible");
        // Simulate a right click on the list monitor
        listMonitor.dispatchEvent(new MouseEvent("contextmenu", { bubbles: true }));
        // Get the right click menu that opened (monitor context menus are
        // children of <body>)
        const contextMenuAfter = document.querySelector("body > .react-contextmenu.react-contextmenu--visible");
        // `contextMenuAfter` is only null if the context menu was already open
        // for the list monitor, in which case we can use the context menu from
        // before the simulated right click
        const contextMenu = contextMenuAfter === null ? contextMenuBefore : contextMenuAfter;
        // Sometimes the menu flashes open, so force hide it.
        contextMenu.style.display = "none";
        // Override DOM methods to import the text file directly
        // See: https://github.com/LLK/scratch-gui/blob/develop/src/lib/import-csv.js#L21-L22
        const appendChild = document.body.appendChild;
        document.body.appendChild = (fileInput) => {
          // Restore appendChild to <body>
          document.body.appendChild = appendChild;
          if (fileInput instanceof HTMLInputElement) {
            document.body.appendChild(fileInput);
            // Prevent Scratch from opening the file input dialog
            fileInput.click = () => {};
            // Insert files from the drop event into the file input
            fileInput.files = files;
            fileInput.dispatchEvent(new Event("change"));
            window.requestAnimationFrame(() => {
              window.requestAnimationFrame(() => {
                contextMenu.style.display = null;
                contextMenu.style.opacity = 0;
                contextMenu.style.pointerEvents = "none";
              });
            });
          } else {
            // The next call for `appendChild` SHOULD be the file input, but if
            // it's not, then make `appendChild` behave as normal.
            console.error('File input was not immediately given to appendChild upon clicking "Import"!');
            return appendChild(fileInput);
          }
        };
        // Simulate clicking on the "Import" option
        contextMenu.children[0].click();
      };
      droppable(listMonitor, handleDrop, canDrop);
    }
  }
  listMonitorsDroppable();

  // For setting .value and letting React know about it
  // https://stackoverflow.com/a/60378508
  const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
  async function askAnswerDroppable() {
    while (true) {
      const answerField = await addon.tab.waitForElement(
        'div[class*="question_question-input"] > input[class*="input_input-form_l9eYg"]',
        { markAsSeen: true }
      );
      droppable(answerField, async (files) => {
        const text = (await Promise.all(Array.from(files, (file) => file.text())))
          .join("")
          // Match pasting behaviour: remove all newline characters at the end
          .replace(/[\r\n]+$/, "")
          .replace(/\r?\n|\r/g, " ");
        const selectionStart = answerField.selectionStart;
        nativeInputValueSetter.call(
          answerField,
          answerField.value.slice(0, selectionStart) + text + answerField.value.slice(answerField.selectionEnd)
        );
        answerField.dispatchEvent(new Event("change", { bubbles: true }));
        answerField.setSelectionRange(selectionStart, selectionStart + text.length);
      });
    }
  }
  askAnswerDroppable();
}
