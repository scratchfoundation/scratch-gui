/**!
 * Imported from SA
 * @license GPLv3.0 (see LICENSE_GPL or https://www.gnu.org/licenses/ for more information)
 */

export default async function ({ addon, global, console }) {
  const vm = addon.tab.traps.vm;
  while (true) {
    let button = await addon.tab.waitForElement("[class^='green-flag_green-flag']", { markAsSeen: true });
    let container = button.parentElement;
    let icon = document.createElement("img");
    container.appendChild(icon);
    icon.src = "/static/assets/e21225ab4b675bc61eed30cfb510c288.svg";
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
