/**
 * Define Ruby with Event Blocks
 * @param {Blockly} Blockly The ScratchBlocks
 * @return {Blockly} Blockly defined Ruby generator.
 */
export default function (Blockly) {
    Blockly.Ruby.event_whenflagclicked = function (block) {
        this.targetEvent = block;
        // TODO: Sprite1をカレントスプライトからどうにかして取得する。
        // TODO: インデントを上げること
        // TODO: 末尾にendを追加すること
        return `Sprite1.when(:flag_clicked) do\n`;
    };

    return Blockly;
}
