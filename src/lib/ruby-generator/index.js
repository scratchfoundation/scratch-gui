import GeneratedBlocks from './generated.js';
import MotionBlocks from './motion.js';
import EventBlocks from './event.js';
import ControlBlocks from './control.js';
import MathBlocks from './math.js';

/**
 * Define Ruby
 * @param {Blockly} Blockly The ScratchBlocks
 * @return {Blockly} Blockly defined Ruby generator.
 */
export default function (Blockly) {
    Blockly = GeneratedBlocks(Blockly);

    Blockly = MotionBlocks(Blockly);
    Blockly = EventBlocks(Blockly);
    Blockly = ControlBlocks(Blockly);
    Blockly = MathBlocks(Blockly);

    return Blockly;
}
