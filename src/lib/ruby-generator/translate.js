/**
 * Define Ruby code generator for Translate Blocks
 * @param {RubyGenerator} Generator The RubyGenerator
 * @return {RubyGenerator} same as param.
 */
export default function (Generator) {
    Generator.translate_getTranslate = function (block) {
        const words = Generator.valueToCode(block, 'WORDS', Generator.ORDER_NONE) || null;
        const language = Generator.valueToCode(block, 'LANGUAGE', Generator.ORDER_NONE);
        return `translate(${words}, ${language})\n`;
    };

    Generator.translate_menu_languages = Generator.text2speech_menu_languages;

    Generator.translate_getViewerLanguage = function () {
        return ['language', Generator.ORDER_ATOMIC];
    };

    return Generator;
}
