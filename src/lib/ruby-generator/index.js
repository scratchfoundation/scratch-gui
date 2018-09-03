import MotionBlocks from './motion.js';
import MathBlocks from './math.js';

/**
 * Define Ruby
 * @param {Blockly} Blockly The ScratchBlocks
 * @return {Blockly} Blockly defined Ruby generator.
 */
export default function (Blockly) {
    Blockly = MotionBlocks(Blockly);
    Blockly = MathBlocks(Blockly);
    return Blockly;
}
