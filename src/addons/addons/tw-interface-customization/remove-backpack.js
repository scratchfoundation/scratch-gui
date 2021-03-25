/**!
 * Imported from SA
 * @license GPLv3.0 (see LICENSE or https://www.gnu.org/licenses/ for more information)
 */

export default async function () {
  // Trigger a resize so that Blockly knows that the backpack is gone
  window.dispatchEvent(new Event("resize"));
}
