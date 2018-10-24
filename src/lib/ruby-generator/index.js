import _ from 'lodash';
import log from '../log';

import MathBlocks from './math.js';
import TextBlocks from './text.js';
import ColourBlocks from './colour.js';
import MotionBlocks from './motion.js';
import LooksBlocks from './looks.js';
import SoundBlocks from './sound.js';
import EventBlocks from './event.js';
import ControlBlocks from './control.js';
import SensingBlocks from './sensing.js';
import OperatorsBlocks from './operators.js';
import DataBlocks from './data.js';
import ProcedureBlocks from './procedure.js';

/**
 * Define Ruby
 * @param {Blockly} Blockly The ScratchBlocks
 * @return {Blockly} Blockly defined Ruby generator.
 */
export default function (Blockly) {
    const SCALAR_TYPE = '';
    const LIST_TYPE = 'list';

    Blockly.Ruby = new Blockly.Generator('Ruby');

    Blockly.Ruby.addReservedWords(
        `BEGIN
         class
         ensure
         nil
         self
         when
         END
         def
         false
         not
         super
         while
         alias
         defined?
         for
         or
         then
         yield
         and
         do
         if
         redo
         true
         __LINE__
         begin
         else
         in
         rescue
         undef
         __FILE__
         break
         elsif
         module
         retry
         unless
         __ENCODING__
         case
         end
         next
         return
         until`.split(/\s+/));

    Blockly.Ruby.ORDER_ATOMIC = 0;
    Blockly.Ruby.ORDER_COLLECTION = 1;
    Blockly.Ruby.ORDER_STRING_CONVERSION = 1;
    Blockly.Ruby.ORDER_MEMBER = 2;
    Blockly.Ruby.ORDER_INDEX = 3;
    Blockly.Ruby.ORDER_FUNCTION_CALL = 4;
    Blockly.Ruby.ORDER_UNARY_SIGN = 5;
    Blockly.Ruby.ORDER_EXPONENTIATION = 6;
    Blockly.Ruby.ORDER_UNARY_MINUS_SIGN = 7;
    Blockly.Ruby.ORDER_MULTIPLICATIVE = 8;
    Blockly.Ruby.ORDER_ADDITIVE = 9;
    Blockly.Ruby.ORDER_BITWISE_SHIFT = 10;
    Blockly.Ruby.ORDER_BITWISE_AND = 11;
    Blockly.Ruby.ORDER_BITWISE_XOR = 12;
    Blockly.Ruby.ORDER_BITWISE_OR = 12;
    Blockly.Ruby.ORDER_RELATIONAL = 13;
    Blockly.Ruby.ORDER_EQUALS = 14;
    Blockly.Ruby.ORDER_LOGICAL_AND = 15;
    Blockly.Ruby.ORDER_LOGICAL_OR = 16;
    Blockly.Ruby.ORDER_RANGE = 17;
    Blockly.Ruby.ORDER_CONDITIONAL = 18;
    Blockly.Ruby.ORDER_ASSIGNMENT = 19;
    Blockly.Ruby.ORDER_NOT = 20;
    Blockly.Ruby.ORDER_AND_OR = 21;
    Blockly.Ruby.ORDER_NONE = 99;
    Blockly.Ruby.INFINITE_LOOP_TRAP = null;

    Blockly.Ruby.init = function () {
        this.definitions_ = {};
        if (Blockly.Variables) {
            if (this.variableDB_) {
                this.variableDB_.reset();
            } else {
                this.variableDB_ = new Blockly.Names(Blockly.Ruby.RESERVED_WORDS_);
            }
        }
    };

    Blockly.Ruby.isString = function (s) {
        return (typeof s === 'string' || s instanceof String);
    };

    Blockly.Ruby.isWhiteSpace = function (s) {
        return s === null || (typeof s === 'string' && s.trim().length === 0);
    };

    Blockly.Ruby.scalarToCode = function (scalar) {
        if (this.isString(scalar)) {
            return this.quote_(scalar);
        }
        return scalar;
    };

    Blockly.Ruby.listToCode = function (list) {
        const values = list.map(i => {
            if (this.isString(i)) {
                return this.quote_(i);
            }
            return i;
        }).join(', ');
        return `[${values}]`;
    };

    Blockly.Ruby.hashToCode = function (hash, separator = ': ', brace = true) {
        const lines = [];
        for (const key in hash) {
            const value = hash[key];
            lines.push(`${key}${separator}${value}`);
        }
        let code = lines.join(',\n');
        if (brace) {
            code = ['{', this.prefixLines(code, this.INDENT), '}'].join('\n');
        }
        return code;
    };

    Blockly.Ruby.numberOrStringToCode = function (value) {
        if (Blockly.Ruby.isString(value) &&
            value[0] === '"' &&
            value[value.length - 1] === '"') {
            const s = value.slice(1, value.length - 1);
            const n = Number(s);
            if (!isNaN(n) && !(n === 0 && Blockly.Ruby.isWhiteSpace(s))) {
                return n;
            }
        }
        return value;
    };
    Blockly.Ruby.nosToCode = Blockly.Ruby.numberOrStringToCode;

    Blockly.Ruby.spriteNew = function (renderedTarget) {
        if (!renderedTarget) {
            return null;
        }

        const attributes = {};
        if (renderedTarget.x !== 0) {
            attributes.x = renderedTarget.x;
        }
        if (renderedTarget.y !== 0) {
            attributes.y = renderedTarget.y;
        }
        if (renderedTarget.direction !== 90) {
            attributes.direction = renderedTarget.direction;
        }
        if (!renderedTarget.visible) {
            attributes.visible = !!renderedTarget.visible;
        }
        if (renderedTarget.size !== 100) {
            attributes.size = renderedTarget.size;
        }
        if (renderedTarget.currentCostume > 1) {
            attributes.current_costume = renderedTarget.currentCostume - 1;
        }
        const costumes = renderedTarget.sprite.costumes;
        if (costumes.length > 0) {
            const s = costumes.map(i => {
                const h = {
                    asset_id: this.quote_(i.assetId),
                    name: this.quote_(i.name),
                    bitmap_resolution: i.bitmapResolution,
                    md5: this.quote_(i.md5),
                    data_format: this.quote_(i.dataFormat),
                    rotation_center_x: i.rotationCenterX,
                    rotation_center_y: i.rotationCenterY
                };
                return this.hashToCode(h);
            }).join(',\n');
            attributes.costumes = `[\n${this.prefixLines(s, this.INDENT)}\n]`;
        }
        const RenderedTarget = renderedTarget.constructor;
        switch (renderedTarget.rotationStyle) {
        case RenderedTarget.ROTATION_STYLE_LEFT_RIGHT:
            attributes.rotation_style = ':left_right';
            break;
        case RenderedTarget.ROTATION_STYLE_NONE:
            attributes.rotation_style = ':none';
            break;
        }

        const variables = [];
        const lists = [];
        for (const id in renderedTarget.variables) {
            const v = renderedTarget.variables[id];
            switch (v.type) {
            case SCALAR_TYPE:
                variables.push(v);
                break;
            case LIST_TYPE:
                lists.push(v);
                break;
            }
        }
        if (variables.length > 0) {
            const s = variables.map(i => {
                const h = {
                    name: this.quote_(i.name)
                };
                if (i.value !== 0) {
                    h.value = this.scalarToCode(i.value);
                }
                return this.hashToCode(h);
            }).join(',\n');
            attributes.variables = `[\n${this.prefixLines(s, this.INDENT)}\n]`;
        }
        if (lists.length > 0) {
            const s = lists.map(i => {
                const h = {
                    name: this.quote_(i.name)
                };
                if (i.value.length > 0) {
                    h.value = this.listToCode(i.value);
                }
                return this.hashToCode(h);
            }).join(',\n');
            attributes.lists = `[\n${this.prefixLines(s, this.INDENT)}\n]`;
        }

        let code = this.hashToCode(attributes, ': ', false);
        if (code.length > 0) {
            const indent = renderedTarget.isStage ? '          ' : '           ';
            code = `,\n${this.prefixLines(code, indent)}`;
        }
        const klass = renderedTarget.isStage ? 'Stage' : 'Sprite';
        const name = renderedTarget.sprite.name;
        return `${klass}.new(${this.quote_(name)}${code})`;
    };

    Blockly.Ruby.finish = function (code) {
        const requires = [];
        const prepares = [];
        const defs = [];

        for (const name in Blockly.Ruby.definitions_) {
            const def = this.definitions_[name];
            if (this.isString(def)) {
                if (name.match(/^require__/)) {
                    requires.push(def);
                } else if (name.match(/^prepare__/)) {
                    prepares.push(def);
                } else {
                    defs.push(def);
                }
            }
        }
        if (!this.editingTarget &&
            requires.length === 0 &&
            prepares.length === 0 &&
            defs.length === 0 &&
            code.length === 0) {
            return '';
        }
        let allDefs = '';
        if (requires.length > 0) {
            allDefs += `${requires.join('\n')}\n\n`;
        }
        if (prepares.length > 0) {
            allDefs += `${prepares.join('\n')}\n\n`;
        }
        if (defs.length > 0) {
            allDefs += `${defs.join('\n')}\n\n`;
        }

        if (this.editingTarget) {
            const body = code ? this.prefixLines(code, this.INDENT) : '';
            code = `${this.spriteNew(this.editingTarget)} do\n${body}end`;
        }

        return allDefs + code;
    };

    Blockly.Ruby.scrubNakedValue = function (line) {
        return `${line}\n`;
    };

    Blockly.Ruby.escapeChars_ = {
        '"': '\\"'
    };

    Blockly.Ruby.quote_ = function (string) {
        let i;
        const s = String(string);
        const sb = ['"'];
        for (i = 0; i < s.length; i++) {
            const ch = s.charAt(i);
            sb.push(Blockly.Ruby.escapeChars_[ch] || ch);
        }
        sb.push('"');
        return sb.join('');
    };

    Blockly.Ruby.scrub_ = function (block, code) {
        let comment; let commentCode; let nextCode;
        if (code === null) {
            return '';
        }
        commentCode = '';
        if (!block.outputConnection || !block.outputConnection.targetConnection) {
            comment = block.getCommentText();
            if (comment) {
                commentCode += `${this.prefixLines(comment, '# ')}\n`;
            }
            block.inputList.forEach(input => {
                if (input.type === Blockly.INPUT_VALUE) {
                    const childBlock = input.connection.targetBlock();
                    if (childBlock) {
                        comment = this.allNestedComments(childBlock);
                        if (comment) {
                            commentCode += this.prefixLines(comment, '# ');
                        }
                    }
                }
            });
        }
        const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
        nextCode = this.blockToCode(nextBlock);
        let eventEndCode = '';
        if (block.isStatement) {
            if (nextCode !== '') {
                nextCode = this.prefixLines(/** @type {string} */ (nextCode), this.INDENT);
            }
            eventEndCode = 'end\n';
        }
        return commentCode + code + nextCode + eventEndCode;
    };

    Blockly.Ruby.spriteName = function () {
        return 'self';
    };

    Blockly.Ruby.broadcastMessageName = function (name) {
        const bm = this.editingTarget.lookupBroadcastMsg(name);
        if (bm) {
            return Blockly.Ruby.quote_(bm.name);
        }
        return null;
    };

    const escapeIdentityRegexp =
          /[\x00-\x1f\x7f-\x9f !"#$%&'()*+,-./:;<=>?@[\\\]^`{|}~]/g; // eslint-disable-line no-control-regex

    Blockly.Ruby.escapeVariableName = function (s) {
        return s.replace(escapeIdentityRegexp, '_');
    };

    Blockly.Ruby.escapeMethodName = Blockly.Ruby.escapeVariableName;

    Blockly.Ruby.variableName = function (id, type = SCALAR_TYPE) {
        let currVar;
        let prefix;
        const target = this.editingTarget;
        const variables = target.variables;
        if (variables.hasOwnProperty(id)) {
            currVar = variables[id];
            if (target.isStage) {
                prefix = '$';
            } else {
                prefix = '@';
            }
        } else if (target.runtime && !target.isStage) {
            const stage = target.runtime.getTargetForStage();
            if (stage && stage.variables.hasOwnProperty(id)) {
                currVar = stage.variables[id];
                prefix = '$';
            }
        }
        if (currVar && currVar.type === type) {
            return `${prefix}${currVar.name.replace(escapeIdentityRegexp, '_')}`;
        }
        return null;
    };

    Blockly.Ruby.listName = function (id) {
        return this.variableName(id, LIST_TYPE);
    };

    Blockly.Ruby.workspaceToCode = function (workspace, target) {
        this.editingTarget = target;
        const getTopBlocks = workspace.getTopBlocks;
        let code = null;
        try {
            workspace.getTopBlocks = function (ordered) {
                const blocks = getTopBlocks.call(workspace, ordered);
                if (ordered) {
                    return blocks.sort((a, b) => {
                        const aType = (a.type === 'procedures_definition' ? 1 : -1);
                        const bType = (b.type === 'procedures_definition' ? 1 : -1);
                        return bType - aType;
                    });
                }
                return blocks;
            };
            code = Blockly.Generator.prototype.workspaceToCode.call(this, workspace);
        } finally {
            workspace.getTopBlocks = getTopBlocks;
        }
        return code;
    };

    Blockly.Ruby.blockToCode = function (block) {
        try {
            return Blockly.Generator.prototype.blockToCode.call(this, block);
        } catch (error) {
            log.error(`'${block.type}' block is not unsupported to generate Ruby code. Please implement it.`);
            return null;
        }
    };

    Blockly = MathBlocks(Blockly);
    Blockly = TextBlocks(Blockly);
    Blockly = ColourBlocks(Blockly);

    Blockly = MotionBlocks(Blockly);
    Blockly = LooksBlocks(Blockly);
    Blockly = SoundBlocks(Blockly);
    Blockly = EventBlocks(Blockly);
    Blockly = ControlBlocks(Blockly);
    Blockly = SensingBlocks(Blockly);
    Blockly = OperatorsBlocks(Blockly);
    Blockly = DataBlocks(Blockly);
    Blockly = ProcedureBlocks(Blockly);

    return Blockly;
}
