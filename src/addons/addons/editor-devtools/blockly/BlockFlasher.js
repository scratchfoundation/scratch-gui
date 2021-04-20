/**
 * Helper class to flash a Blockly scratch block in the users workspace
 */
export default class BlockFlasher {
  /**
   * FLash a block 3 times
   * @param block the block to flash
   */
  static flash(block) {
    if (myFlash.timerID > 0) {
      clearTimeout(myFlash.timerID);
      myFlash.block.svgPath_.style.fill = myFlash.colour;
    }

    let count = 4;
    let flashOn = true;
    myFlash.colour = block.getColour();
    myFlash.block = block;

    /**
     * Internal method to switch the colour of a block between light yellow and it's original colour
     * @private
     */
    function _flash() {
      myFlash.block.svgPath_.style.fill = flashOn ? "#ffff80" : myFlash.colour;
      flashOn = !flashOn;
      count--;
      if (count > 0) {
        myFlash.timerID = setTimeout(_flash, 200);
      } else {
        myFlash.timerID = 0;
      }
    }

    _flash();
  }
}

const myFlash = { block: null, timerID: null, colour: null };
