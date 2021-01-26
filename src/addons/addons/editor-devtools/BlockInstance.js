/**!
 * Imported from SA
 * @license GPLv3.0 (see LICENSE_GPL or https://www.gnu.org/licenses/ for more information)
 */

/**
 * Encapsulates a block (either in this sprite or another / Blockly, or native JSON block
 */
export default class BlockInstance {
  constructor(target, block) {
    this.targetId = target.id;
    this.id = block.id;
  }
}
