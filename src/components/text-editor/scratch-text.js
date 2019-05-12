/**
 * This is the language definition file for our Monaco text editor for scratch.
 * We need this file so Monaco can identify the keywords for scratch blocks that are text.
 * Examples for each language can be found here:
 * https://microsoft.github.io/monaco-editor/playground.html#extending-language-services-custom-languages
 */
import ScratchBlocks from 'scratch-blocks';
// console.log(ScratchBlocks.msg.HELP);
let defs = {
    // Set defaultToken to invalid to see what you do not tokenize yet
    // defaultToken: 'invalid',

    // /when key (\w+) is pressed/
    keywords: [

    ],

    // we include these common regular expressions
    symbols: /[=><!~?:&|+\-*/^%]+/,

    tokenizer: {
        root: [
            {include: '@whitespace'},
            {include: '@numbers'},
            {include: '@strings'},

            [/[,:;]/, 'delimiter'],
            [/[{}[\]()]/, '@brackets'],

            [/@[a-zA-Z]\w*/, 'tag'],
            [/[a-zA-Z]\w*/, {
                cases: {
                    '@keywords': 'keyword',
                    '@default': 'identifier'
                }
            }]
        ],

        // Deal with white space, including single and multi-line comments
        whitespace: [
            [/\s+/, 'white'],
            [/(^#.*$)/, 'comment'],
            [/('''.*''')|(""".*""")/, 'string'],
            [/'''.*$/, 'string', '@endDocString'],
            [/""".*$/, 'string', '@endDblDocString']
        ],
        endDocString: [
            [/\\'/, 'string'],
            [/.*'''/, 'string', '@popall'],
            [/.*$/, 'string']
        ],
        endDblDocString: [
            [/\\"/, 'string'],
            [/.*"""/, 'string', '@popall'],
            [/.*$/, 'string']
        ],

        // Recognize hex, negatives, decimals, imaginaries, longs, and scientific notation
        numbers: [
            [/-?0x([abcdef]|[ABCDEF]|\d)+[lL]?/, 'number.hex'],
            [/-?(\d*\.)?\d+([eE][+-]?\d+)?[jJ]?[lL]?/, 'number']
        ],

        // Recognize strings, including those broken across lines with \ (but not without)
        strings: [
            [/'$/, 'string.escape', '@popall'],
            [/'/, 'string.escape', '@stringBody'],
            [/"$/, 'string.escape', '@popall'],
            [/"/, 'string.escape', '@dblStringBody']
        ],
        stringBody: [
            [/[^\\']+$/, 'string', '@popall'],
            [/[^\\']+/, 'string'],
            [/\\./, 'string'],
            [/'/, 'string.escape', '@popall'],
            [/\\$/, 'string']
        ],
        dblStringBody: [
            [/[^\\"]+$/, 'string', '@popall'],
            [/[^\\"]+/, 'string'],
            [/\\./, 'string'],
            [/"/, 'string.escape', '@popall'],
            [/\\$/, 'string']
        ]
    }
};

/**
 * Populates defs with all the block type definitons for monaco to work with. Defs is referenced from:
 * https://microsoft.github.io/monaco-editor/monarch.html
 * @returns {array} should hold a list of all blocks as defined in this file:
 * https://github.com/KSU-CS-Software-Engineering/scratch-blocks/blob/develop/msg/messages.js
 */
export default function LangDef (){
    Object.keys(ScratchBlocks.Msg).forEach(msg => {
        // For some example, say msg: CONTROL_FOREACH
        // Get the class
        const className = msg.split('_')[0].toLowerCase(); // => event
        // Get Msg at [msg]
        const textRepresentation = ScratchBlocks.Msg[msg]; // => Blockly.Msg.CONTROL_FOREACH = 'for each %1 in %2';
        // Convert value to RegExp when %1 clicked => ^when (it?)clicked$
        // Regular expresson '.+' = One or more of any character except line break
        const regExpStr = textRepresentation.replace(/%\d+/g, '.+'); // => 'for each '.+' in '.+'
        if (!defs.tokenizer[className]) defs.tokenizer[className] = [];
        // DO NEXT - save as a def file
        // const dataExample = [new RegExp(regExpStr), className];
        // example defs entry: Array [/replace item .+ of .+ with .+/, "data"]
        // console.log(dataExample); // browser -> inspect -> network to view output
        defs.tokenizer[className].push([new RegExp(regExpStr), className]); // => ['for each '.+' in '.+', control]
    });

    // console.log("Defs is: ");
    // console.log(defs);
    return defs;
}
