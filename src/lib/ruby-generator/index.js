import GeneratedBlocks from './generated.js';
import MotionBlocks from './motion.js';
import MathBlocks from './math.js';
import EventBlocks from './event.js';

/**
 * Define Ruby
 * @param {Blockly} Blockly The ScratchBlocks
 * @return {Blockly} Blockly defined Ruby generator.
 */
export default function (Blockly) {
    Blockly = GeneratedBlocks(Blockly);
    Blockly = MotionBlocks(Blockly);
    Blockly = MathBlocks(Blockly);
    Blockly = EventBlocks(Blockly);
    return Blockly;
}
