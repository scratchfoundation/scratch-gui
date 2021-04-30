import _ from 'lodash';
import log from './log';
import Blockly from 'scratch-blocks';

/**
 * Class for a code generator that translates the blocks into a language.
 *
 * reimplementation Blockly.Generator for scratch-vm's blocks
 * from scratch-blocks/core/generator.js.
 */
class Generator {
    // @param {string} name Language name of this generator.
    constructor (name) {
        /**
         * Arbitrary code to inject into locations that risk causing infinite loops.
         * Any instances of '%1' will be replaced by the block ID that failed.
         * E.g. '  checkTimeout(%1);\n'
         * @type {?string}
         */
        this.INFINITE_LOOP_TRAP = null;

        /**
         * Arbitrary code to inject before every statement.
         * Any instances of '%1' will be replaced by the block ID of the statement.
         * E.g. 'highlight(%1);\n'
         * @type {?string}
         */
        this.STATEMENT_PREFIX = null;

        /**
         * The method of indenting.  Defaults to two spaces, but language generators
         * may override this to increase indent or change to tabs.
         * @type {string}
         */
        this.INDENT = '  ';

        /**
         * Maximum length for a comment before wrapping.  Does not account for
         * indenting level.
         * @type {number}
         */
        this.COMMENT_WRAP = 60;

        /**
         * List of outer-inner pairings that do NOT require parentheses.
         * @type {!Array.<!Array.<number>>}
         */
        this.ORDER_OVERRIDES = [];

        /**
         * Comma-separated list of reserved words.
         * @type {string}
         * @private
         */
        this.RESERVED_WORDS_ = '';

        /**
         * This is used as a placeholder in functions defined using
         * provideFunction_.  It must not be legal code that could
         * legitimately appear in a function definition (or comment), and it must
         * not confuse the regular expression parser.
         * @type {string}
         * @private
         */
        this.FUNCTION_NAME_PLACEHOLDER_ = '{leCUI8hutHZI4480Dc}';

        this.FUNCTION_NAME_PLACEHOLDER_REGEXP_ =
            new RegExp(this.FUNCTION_NAME_PLACEHOLDER_, 'g');

        this.name_ = name;
        this.cache_ = {};
        this.definitions_ = {};
        this.functionNames_ = {};

        this.currentTarget = null;
    }

    /**
     * Category to separate generated function names from variables and procedures.
     */
    static get NAME_TYPE () {
        return Blockly.NAME_TYPE;
    }

    /**
     * String for use in the "custom" attribute of a category in toolbox xml.
     * This string indicates that the category should be dynamically populated with
     * procedure blocks.
     * @const {string}
     */
    static get PROCEDURE_CATEGORY_NAME () {
        return Blockly.PROCEDURE_CATEGORY_NAME;
    }

    set currentTarget (target) {
        this.currentTarget_ = target;

        const comments = this.cache_.comments = {};
        const targetCommentTexts = this.cache_.targetCommentTexts = [];
        if (target) {
            Object.keys(target.comments).forEach(commentId => {
                const comment = target.comments[commentId];
                if (comment.blockId) {
                    comments[comment.blockId] = comment;
                } else {
                    targetCommentTexts.push(comment.text);
                }
            });
        }
    }

    get currentTarget () {
        return this.currentTarget_;
    }

    getScripts () {
        return this.currentTarget.blocks.getScripts().filter(blockId => !this.getBlock(blockId).shadow);
    }

    /**
     * Generate code for RenderedTarget's all blocks to the specified language.
     * @param {RenderedTarget} target RenderedTarget to generate code from.
     * @param {object} options Options to generate code.
     * @return {string} Generated code.
     */
    targetToCode_ (target, options) {
        this.currentTarget = target;

        this.init(options);

        let code;
        if (options && options.hasOwnProperty('targetsCode') && options.targetsCode.hasOwnProperty(target.id)) {
            code = `${options.targetsCode[target.id]}\n`.replace(/\n\s+$/, '\n');
        } else {
            const codes = [];
            const proceduresCodes = [];
            const scripts = this.getScripts();
            scripts.forEach(topBlockId => {
                const block = this.getBlock(topBlockId);
                let line = this.blockToCode(block);
                if (_.isArray(line)) {
                    // Value blocks return tuples of code and operator order.
                    // Top-level blocks don't care about operator order.
                    //
                    // This block is a naked value.  Ask the language's code generator if
                    // it wants to append a semicolon, or something.
                    if (this.scrubNakedValue) {
                        line = this.scrubNakedValue(line[0]);
                    }
                }
                if (line) {
                    if (block.opcode === 'procedures_definition') {
                        proceduresCodes.push(line);
                    } else {
                        codes.push(line);
                    }
                }
            });
            // Blank line between each section.
            code = proceduresCodes.join('\n');
            if (proceduresCodes.length > 0) {
                code += '\n';
            }
            code += codes.join('\n');
        }

        code = this.finish(code, options);

        // Final scrubbing of whitespace.
        code = code.replace(/^\s+\n/, '');
        code = code.replace(/\n\s+$/, '\n');
        code = code.replace(/[ \t]+\n/g, '\n');

        return code;
    }

    /**
     * Generate code for RenderedTarget's all blocks to the specified language.
     * @param {RenderedTarget} target RenderedTarget to generate code from.
     * @param {object} options Options to generate code.
     * @return {string} Generated code.
     */
    targetToCode (target, options) {
        this.initTargets(options);
        const code = this.targetToCode_(target, options);
        return this.finishTargets(code, options);
    }

    /**
     * Generate code for array of RenderedTarget's all blocks to the specified language.
     * @param {Array} targets Array of RenderedTarget to generate code from.
     * @param {object} options Options to generate code.
     * @return {string} Generated code.
     */
    targetsToCode (targets, options) {
        this.initTargets(options);

        const codes = [];
        targets.forEach(target => {
            const code = this.targetToCode_(target, options);
            if (code.length > 0) {
                codes.push(code);
            }
        });
        const code = codes.join('\n');

        return this.finishTargets(code, options);
    }

    // The following are some helpful functions which can be used by multiple
    // languages.

    /**
     * Prepend a common prefix onto each line of code.
     * @param {string} text The lines of code.
     * @param {string} prefix The common prefix.
     * @return {string} The prefixed lines of code.
     */
    prefixLines (text, prefix = this.INDENT) {
        return prefix + text.replace(/(?!\n$)\n/g, `\n${prefix}`);
    }

    getChildren (block) {
        const blocks = [];
        for (const inputName in block.inputs) {
            const input = block.inputs[inputName];
            const child = this.getBlock(input.block);
            if (child) {
                blocks.push(child);
            }
        }
        if (block.next) {
            blocks.push(this.getBlock(block.next));
        }
        return blocks;
    }

    getDescendants (block, ignoreShadows) {
        const blocks = [block];
        const childBlocks = this.getChildren(block);
        childBlocks.forEach(child => {
            if (!ignoreShadows || !child.shadow) {
                blocks.push(...this.getDescendants(child, ignoreShadows));
            }
        });
        return blocks;
    }

    /**
     * Recursively spider a tree of blocks, returning all their comments.
     * @param {!object} block The block from which to start spidering.
     * @return {string} Concatenated list of comments.
     */
    allNestedComments (block) {
        const comments = [];
        const blocks = this.getDescendants(block);
        for (let i = 0; i < blocks.length; i++) {
            const comment = this.getCommentText(blocks[i]);
            if (comment) {
                comments.push(comment);
            }
        }
        // Append an empty string to create a trailing line break when joined.
        if (comments.length) {
            comments.push('');
        }
        return comments.join('\n');
    }

    /**
     * Generate code for the specified block (and attached blocks).
     * @param {object} block The block to generate code for.
     * @return {string|!Array} For statement blocks, the generated code.
     *     For value blocks, an array containing the generated code and an
     *     operator order value.  Returns '' if block is null.
     */
    blockToCode (block) {
        try {
            if (!block) {
                return '';
            }

            const func = this[block.opcode];
            if (!func) {
                log.error(`"${block.opcode}" is unsupported to generate "${this.name_}" code. Please implement it.`);
                return '';
            }
            // First argument to func.call is the value of 'this' in the generator.
            // Prior to 24 September 2013 'this' was the only way to access the block.
            // The current prefered method of accessing the block is through the second
            // argument to func.call, which becomes the first parameter to the generator.
            let code = func.call(block, block);
            if (_.isArray(code)) {
                // Value blocks return tuples of code and operator order.
                return [this.scrub_(block, code[0]), code[1]];
            } else if (_.isString(code)) {
                const id = block.id.replace(/\$/g, '$$$$'); // Issue 251.
                if (this.STATEMENT_PREFIX) {
                    code = this.STATEMENT_PREFIX.replace(/%1/g, `'${id}'`) +
                        code;
                }
                return this.scrub_(block, code);
            } else if (code === null) {
                // Block has handled code generation itself.
                return '';
            }
            log.error(`Invalid code generated: ${code}`);
            return '';
        } catch (e) {
            log.error('Error generating code: ', {opcode: block.opcode, error: e});
            return '';
        }
    }

    /**
     * Generate code representing the specified value input.
     * @param {!object} block The block containing the input.
     * @param {string} name The name of the input.
     * @param {number} outerOrder The maximum binding strength (minimum order value)
     *     of any operators adjacent to "block".
     * @return {string} Generated code or '' if no blocks are connected or the
     *     specified input does not exist.
     */
    valueToCode (block, name, outerOrder) {
        if (isNaN(outerOrder)) {
            log.error(`Expecting valid order from block "${block.opcode}"`);
        }
        const input = this.getInputs(block)[name];
        if (!input) {
            return '';
        }
        const targetBlock = this.getBlock(input.block);
        if (!targetBlock) {
            return '';
        }
        const tuple = this.blockToCode(targetBlock);
        if (tuple === '') {
            // Disabled block.
            return '';
        }
        // Value blocks must return code and order of operations info.
        // Statement blocks must only return code.
        if (!_.isArray(tuple)) {
            log.error(`Expecting tuple from value block "${targetBlock.opcode}".`);
        }
        let code = tuple[0];
        const innerOrder = tuple[1];
        if (isNaN(innerOrder)) {
            log.error(`Expecting valid order from value block "${targetBlock.opcode}".`);
        }
        if (!code) {
            return '';
        }

        // Add parentheses if needed.
        let parensNeeded = false;
        const outerOrderClass = Math.floor(outerOrder);
        const innerOrderClass = Math.floor(innerOrder);
        if (outerOrderClass <= innerOrderClass) {
            if (outerOrderClass === innerOrderClass &&
                (outerOrderClass === 0 || outerOrderClass === 99)) {
                // Don't generate parens around NONE-NONE and ATOMIC-ATOMIC pairs.
                // 0 is the atomic order, 99 is the none order.  No parentheses needed.
                // In all known languages multiple such code blocks are not order
                // sensitive.  In fact in Python ('a' 'b') 'c' would fail.
            } else {
                // The operators outside this code are stronger than the operators
                // inside this code.  To prevent the code from being pulled apart,
                // wrap the code in parentheses.
                parensNeeded = true;
                // Check for special exceptions.
                for (let i = 0; i < this.ORDER_OVERRIDES.length; i++) {
                    if (this.ORDER_OVERRIDES[i][0] === outerOrder &&
                        this.ORDER_OVERRIDES[i][1] === innerOrder) {
                        parensNeeded = false;
                        break;
                    }
                }
            }
        }
        if (parensNeeded) {
            // Technically, this should be handled on a language-by-language basis.
            // However all known (sane) languages use parentheses for grouping.
            code = `(${code})`;
        }
        return code;
    }

    /**
     * Generate code representing the statement.  Indent the code.
     * @param {!object} block The block containing the input.
     * @param {string} name The name of the input.
     * @return {string} Generated code or '' if no blocks are connected.
     */
    statementToCode (block, name) {
        const branch = block.inputs[name];
        let targetBlock = null;
        if (branch) {
            targetBlock = this.getBlock(branch.block);
        }
        let code = this.blockToCode(targetBlock);
        // Value blocks must return code and order of operations info.
        // Statement blocks must only return code.
        if (!_.isString(code)) {
            log.error(`Expecting code from statement block "${targetBlock && targetBlock.opcode}".`);
        }
        if (code) {
            code = this.prefixLines(code, this.INDENT);
        }
        return code;
    }

    /**
     * Add an infinite loop trap to the contents of a loop.
     * If loop is empty, add a statment prefix for the loop block.
     * @param {string} branch Code for loop contents.
     * @param {string} id ID of enclosing block.
     * @return {string} Loop contents, with infinite loop trap added.
     */
    addLoopTrap (branch, id) {
        id = id.replace(/\$/g, '$$$$');
        if (this.INFINITE_LOOP_TRAP) {
            branch = this.INFINITE_LOOP_TRAP.replace(/%1/g, `'${id}'`) + branch;
        }
        if (this.STATEMENT_PREFIX) {
            branch += this.prefixLines(this.STATEMENT_PREFIX.replace(/%1/g, `'${id}'`), this.INDENT);
        }
        return branch;
    }

    /**
     * Add one or more words to the list of reserved words for this language.
     * @param {string} words Comma-separated list of words to add to the list.
     *     No spaces.  Duplicates are ok.
     */
    addReservedWords (words) {
        this.RESERVED_WORDS_ += `${words},`;
    }

    /**
     * Hook for code to run before a target code generation starts.
     * Subclasses may override this, e.g. to initialise the database of variable
     * names.
     * @param {!object} options Options to generate code.
     */
    init (options) { // eslint-disable-line no-unused-vars
        // Optionally override
    }

    /**
     * Hook for code to run at end of a target code generation.
     * Subclasses may override this, e.g. to prepend the generated code with the
     * variable definitions.
     * @param {string} code Generated code.
     * @param {!object} options Options to generate code.
     * @return {string} Completed code.
     */
    finish (code, options) { // eslint-disable-line no-unused-vars
        // Optionally override
        return code;
    }

    /**
     * Hook for code to run before all targets code generation starts.
     * Subclasses may override this, e.g. to initialise the database of variable
     * names.
     * @param {!object} options Options to generate code.
     */
    initTargets (options) { // eslint-disable-line no-unused-vars
        // Optionally override
    }

    /**
     * Hook for code to run at end of all targets code generation.
     * Subclasses may override this, e.g. to prepend the generated code with the
     * variable definitions.
     * @param {string} code Generated code.
     * @param {!object} options Options to generate code.
     * @return {string} Completed code.
     */
    finishTargets (code, options) { // eslint-disable-line no-unused-vars
        // Optionally override
        return code;
    }

    /**
     * Naked values are top-level blocks with outputs that aren't plugged into
     * anything.
     * Subclasses may override this, e.g. if their language does not allow
     * naked values.
     * @param {string} line Line of generated code.
     * @return {string} Legal line of code.
     */
    scrubNakedValue (line) {
        // Optionally override
        return line;
    }

    /**
     * Common tasks for generating code from blocks.  This is called from
     * blockToCode and is called on every block, not just top level blocks.
     * Subclasses may override this, e.g. to generate code for statements following
     * the block, or to handle comments for the specified block and any connected
     * value blocks.
     * @param {!object} _block The current block.
     * @param {string} code The JavaScript code created for this block.
     * @return {string} JavaScript code with comments and subsequent blocks added.
     * @private
     */
    scrub_ (_block, code) {
        // Optionally override
        return code;
    }

    /**
     * Define a function to be included in the generated code.
     * The first time this is called with a given desiredName, the code is
     * saved and an actual name is generated.  Subsequent calls with the
     * same desiredName have no effect but have the same return value.
     *
     * It is up to the caller to make sure the same desiredName is not
     * used for different code values.
     *
     * The code gets output when finish() is called.
     *
     * @param {string} desiredName The desired name of the function (e.g., isPrime).
     * @param {!Array.<string>} code A list of statements.  Use '  ' for indents.
     * @return {string} The actual name of the new function.  This may differ
     *     from desiredName if the former has already been taken by the user.
     * @private
     */
    provideFunction_ (desiredName, code) {
        if (!this.definitions_[desiredName]) {
            const functionName = this._variableDB.getDistinctName(desiredName, Generator.PROCEDURE_CATEGORY_NAME);
            this.functionNames_[desiredName] = functionName;
            let codeText = code.join('\n').replace(this.FUNCTION_NAME_PLACEHOLDER_REGEXP_, functionName);
            // Change all '  ' indents into the desired indent.
            // To avoid an infinite loop of replacements, change all indents to '\0'
            // character first, then replace them all with the indent.
            // We are assuming that no provided functions contain a literal null char.
            let oldCodeText;
            while (oldCodeText !== codeText) {
                oldCodeText = codeText;
                codeText = codeText.replace(/^(( {2})*) {2}/gm, '$1\0');
            }
            codeText = codeText.replace(/\0/g, this.INDENT);
            this.definitions_[desiredName] = codeText;
        }
        return this.functionNames_[desiredName];
    }

    getTargetCommentTexts () {
        return this.cache_.targetCommentTexts;
    }

    getCommentText (block) {
        const comment = this.cache_.comments[block.id];
        return comment ? comment.text : null;
    }

    getBlock (blockId) {
        return this.currentTarget.blocks.getBlock(blockId);
    }

    getInputs (block) {
        return this.currentTarget.blocks.getInputs(block);
    }

    getInputTargetBlock (block, name) {
        const input = this.getInputs(block)[name];
        if (input) {
            return this.getBlock(input.block);
        }
        return null;
    }

    getField (block, name) {
        return block.fields[name];
    }

    getFieldId (block, name) {
        return this.getField(block, name).id;
    }

    getFieldValue (block, name) {
        return this.getField(block, name).value;
    }

    isConnectedValue (block) {
        const parent = this.getBlock(block.parent);
        if (parent) {
            const inputs = this.getInputs(parent);
            for (const name in inputs) {
                if (block.id === inputs[name].block) {
                    return true;
                }
            }
        }
        return false;
    }
}

export default Generator;
