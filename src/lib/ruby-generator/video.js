/**
 * Define Ruby code generator for Video Blocks
 * @param {RubyGenerator} Generator The RubyGenerator
 * @return {RubyGenerator} same as param.
 */
export default function (Generator) {
    Generator.videoSensing_whenMotionGreaterThan = function (block) {
        block.isStatement = true;
        const rh = Generator.valueToCode(block, 'REFERENCE', Generator.ORDER_NONE) || 0;
        return `${Generator.spriteName()}.when(:video_motion_greater_than, ${rh}) do\n`;
    };

    Generator.videoSensing_videoToggle = function (block) {
        const videoState = Generator.valueToCode(block, 'VIDEO_STATE', Generator.ORDER_NONE);
        return `video_turn(${videoState})\n`;
    };

    Generator.videoSensing_menu_VIDEO_STATE = function (block) {
        const videoState = Generator.quote_(Generator.getFieldValue(block, 'VIDEO_STATE') || 'on');
        return [videoState, Generator.ORDER_ATOMIC];
    };

    Generator.videoSensing_setVideoTransparency = function (block) {
        const transparency = Generator.valueToCode(block, 'TRANSPARENCY', Generator.ORDER_NONE) || 0;
        return `self.video_transparency = ${transparency}\n`;
    };

    Generator.videoSensing_videoOn = function (block) {
        const attribute = Generator.valueToCode(block, 'ATTRIBUTE', Generator.ORDER_NONE);
        const subject = Generator.valueToCode(block, 'SUBJECT', Generator.ORDER_NONE);
        return [`${subject}video_${attribute}`, Generator.ORDER_ATOMIC];
    };

    Generator.videoSensing_menu_ATTRIBUTE = function (block) {
        const attribute = Generator.getFieldValue(block, 'ATTRIBUTE') || 'motion';
        return [attribute, Generator.ORDER_ATOMIC];
    };

    Generator.videoSensing_menu_SUBJECT = function (block) {
        const subject = Generator.getFieldValue(block, 'SUBJECT') || 'this sprite';
        if (subject === 'Stage') {
            return ['stage.', Generator.ORDER_ATOMIC];
        } else if (subject === 'this sprite') {
            return ['', Generator.ORDER_ATOMIC];
        }
        return [`${subject}.`, Generator.ORDER_ATOMIC];
    };

    return Generator;
}
