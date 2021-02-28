/**!
 * Imported from SA
 * @license GPLv3.0 (see LICENSE_GPL or https://www.gnu.org/licenses/ for more information)
 */

/* inserted by pull.js */
import _twAsset0 from "./icon--mute.svg";
const _twGetAsset = (path) => {
  if (path === "/icon--mute.svg") return _twAsset0;
  throw new Error(`Unknown asset: ${path}`);
};

export default async function ({ addon, global, console }) {
  const vm = addon.tab.traps.vm;
  while (true) {
    let button = await addon.tab.waitForElement("[class^='green-flag_green-flag']", { markAsSeen: true });
    let container = button.parentElement;
    let icon = document.createElement("img");
    container.appendChild(icon);
    icon.loading = "lazy";
    icon.src = _twGetAsset("/icon--mute.svg");
    icon.style.display = "none";
    let mode = false;
    button.addEventListener("click", (e) => {
      if (e.ctrlKey) {
        e.cancelBubble = true;
        e.preventDefault();
        mode = !mode;
        if (mode) {
          vm.editingTarget.blocks.runtime.audioEngine.audioContext.suspend();
          icon.style.display = "block";
        } else {
          vm.editingTarget.blocks.runtime.audioEngine.audioContext.resume();
          icon.style.display = "none";
        }
      }
    });
  }
}
