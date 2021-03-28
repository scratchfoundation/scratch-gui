export default async function ({ addon, global, console }) {
  const DRAG_AREA_CLASS = "sa-drag-area";
  const DRAG_OVER_CLASS = "sa-dragged-over";

  async function foreverDroppable(dropAreaSelector, fileInputSelector) {
    while (true) {
      const dropArea = await addon.tab.waitForElement(dropAreaSelector, { markAsSeen: true });
      const fileInput = await addon.tab.waitForElement(fileInputSelector, {
        markAsSeen: true,
      });
      dropArea.classList.add(DRAG_AREA_CLASS);

      dropArea.addEventListener("drop", (e) => {
        fileInput.files = e.dataTransfer.files;
        fileInput.dispatchEvent(new Event("change", { bubbles: true }));
        dropArea.classList.remove(DRAG_OVER_CLASS);
        e.preventDefault();
      });
      dropArea.addEventListener("dragover", (e) => {
        dropArea.classList.add(DRAG_OVER_CLASS);
        e.preventDefault();
      });
      dropArea.addEventListener("dragleave", () => {
        dropArea.classList.remove(DRAG_OVER_CLASS);
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
}
