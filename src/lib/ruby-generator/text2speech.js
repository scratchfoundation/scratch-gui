/**
 * Define Ruby code generator for Text to Speech Blocks
 * @param {RubyGenerator} Generator The RubyGenerator
 * @return {RubyGenerator} same as param.
 */
export default function (Generator) {
    Generator.text2speech_speakAndWait = function (block) {
        const words = Generator.valueToCode(block, 'WORDS', Generator.ORDER_NONE) || null;
        return `text2speech_speak(${words})\n`;
    };

    Generator.text2speech_setVoice = function (block) {
        const voice = Generator.valueToCode(block, 'VOICE', Generator.ORDER_NONE);
        return `self.text2speech_voice = ${voice}\n`;
    };

    Generator.text2speech_menu_voices = function (block) {
        const voice = Generator.quote_(Generator.getFieldValue(block, 'voices') || 'ALTO');
        return [voice, Generator.ORDER_ATOMIC];
    };

    Generator.text2speech_setLanguage = function (block) {
        const language = Generator.valueToCode(block, 'LANGUAGE', Generator.ORDER_NONE);
        return `self.text2speech_language = ${language}\n`;
    };

    Generator.text2speech_menu_languages = function (block) {
        const language = Generator.quote_(Generator.getFieldValue(block, 'languages') || 'ja');
        return [language, Generator.ORDER_ATOMIC];
    };

    return Generator;
}
