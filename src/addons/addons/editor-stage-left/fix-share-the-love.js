/**!
 * Imported from SA
 * @license GPLv3.0 (see LICENSE_GPL or https://www.gnu.org/licenses/ for more information)
 */

export default function ({ addon, global, console }) {
  const inject = (workspace) => {
    const originalGetClientRect = workspace.toolbox_.getClientRect;
    workspace.toolbox_.getClientRect = function () {
      // we are trying to undo the effect of BIG_NUM in https://github.com/LLK/scratch-blocks/blob/ab26fa2960643fa38fbc7b91ca2956be66055070/core/flyout_vertical.js#L739
      const rect = originalGetClientRect.call(this);
      if (!rect) return rect;
      if (rect.left > 0) return rect;
      rect.left += 1000000000;
      rect.width -= 1000000000;
      return rect;
    };
  };

  if (addon.tab.editorMode === "editor") {
    const interval = setInterval(() => {
      if (Blockly.getMainWorkspace()) {
        inject(Blockly.getMainWorkspace());
        clearInterval(interval);
      }
    }, 100);
  }
  addon.tab.addEventListener(
    "urlChange",
    () => addon.tab.editorMode === "editor" && inject(Blockly.getMainWorkspace())
  );
}
