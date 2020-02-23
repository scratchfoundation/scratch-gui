import _ from 'lodash';

import Blockly from 'scratch-blocks';
import Generator from '../generator';

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
import RubyBlocks from './ruby.js';
import MusicBlocks from './music.js';
import PenBlocks from './pen.js';
import VideoBlocks from './video.js';
import Text2SpeechBlocks from './text2speech.js';
import TranslateBlocks from './translate.js';
import MakeyMakeyBlocks from './makeymakey.js';
import MicrobitBlocks from './microbit.js';
import BoostBlocks from './boost.js';
import EV3Blocks from './ev3.js';
import WeDo2Blocks from './wedo2.js';

const SCALAR_TYPE = '';
const LIST_TYPE = 'list';

const RubyGenerator = new Generator('Ruby');

RubyGenerator.addReservedWords(
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

/* eslint-disable no-multi-spaces */
RubyGenerator.ORDER_ATOMIC = 0;            // 0 "" ...
RubyGenerator.ORDER_COLLECTION = 1;        // tuples, lists, dictionaries
RubyGenerator.ORDER_STRING_CONVERSION = 1; // `expression...`
RubyGenerator.ORDER_MEMBER = 2;            // ::
RubyGenerator.ORDER_INDEX = 3;             // []
RubyGenerator.ORDER_FUNCTION_CALL = 4;     // ()
RubyGenerator.ORDER_UNARY_SIGN = 5;        // +(単項)  !  ~
RubyGenerator.ORDER_EXPONENTIATION = 6;    // **
RubyGenerator.ORDER_UNARY_MINUS_SIGN = 7;  // -(単項)
RubyGenerator.ORDER_MULTIPLICATIVE = 8;    // *  /  %
RubyGenerator.ORDER_ADDITIVE = 9;          // +  -
RubyGenerator.ORDER_BITWISE_SHIFT = 10;    // << >>
RubyGenerator.ORDER_BITWISE_AND = 11;      // &
RubyGenerator.ORDER_BITWISE_XOR = 12;      // ^
RubyGenerator.ORDER_BITWISE_OR = 12;       // |
RubyGenerator.ORDER_RELATIONAL = 13;       // > >=  < <=
RubyGenerator.ORDER_EQUALS = 14;           // <=> ==  === !=  =~  !~
RubyGenerator.ORDER_LOGICAL_AND = 15;      // &&
RubyGenerator.ORDER_LOGICAL_OR = 16;       // ||
RubyGenerator.ORDER_RANGE = 17;            // ..  ...
RubyGenerator.ORDER_CONDITIONAL = 18;      // ?:(条件演算子)
RubyGenerator.ORDER_ASSIGNMENT = 19;       // =(+=, -= ... )
RubyGenerator.ORDER_NOT = 20;              // not
RubyGenerator.ORDER_AND_OR = 21;           // and or
RubyGenerator.ORDER_NONE = 99;             // (...)
/* eslint-enable no-multi-spaces */

RubyGenerator.init = function (options) { // eslint-disable-line no-unused-vars
    this.definitions_ = {};
    if (this.variableDB_) {
        this.variableDB_.reset();
    } else {
        this.variableDB_ = new Blockly.Names(RubyGenerator.RESERVED_WORDS_);
    }
};

RubyGenerator.finish = function (code, options) {
    const defs = [];
    for (const name in this.definitions_) {
        const def = this.definitions_[name];
        if (this.isString(def)) {
            if (name.match(/^require__/)) {
                this.requires_[name] = def;
            } else if (name.match(/^prepare__/)) {
                this.prepares_[name] = def;
            } else {
                defs.push(def);
            }
        }
    }

    const comments = RubyGenerator.getTargetCommentTexts();
    if (comments.length > 0) {
        const commentCodes = comments.map(comment => `${this.prefixLines(comment, '# ')}\n`);
        code = `${commentCodes.join('\n')}\n${code}`;
    }

    if (options && options.withSpriteNew) {
        const spriteNewCode = this.spriteNew(this.currentTarget);
        if (code.length > 0) {
            code = this.prefixLines(code, this.INDENT);
        }
        code = `${spriteNewCode} do\n${code}end\n`;
    }

    if (defs.length === 0 && code.length === 0) {
        return '';
    }

    let s = '';
    if (defs.length > 0) {
        s += `${defs.join('\n')}\n\n`;
    }

    return s + code;
};

RubyGenerator.initTargets = function (options) {
    this.requires_ = {};
    this.prepares_ = {};

    if (options && options.hasOwnProperty('requires')) {
        options.requires.forEach(name => {
            this.requires_[`require__${name}`] = `require "${name}"`;
        });
    }
};

RubyGenerator.finishTargets = function (code, options) { // eslint-disable-line no-unused-vars
    let s = '';
    const requires = Object.keys(this.requires_).map(name => this.requires_[name]);
    if (requires.length > 0) {
        s += `${requires.join('\n')}\n\n`;
    }

    const prepares = Object.keys(this.prepares_).map(name => this.prepares_[name]);
    if (prepares.length > 0) {
        s += `${prepares.join('\n')}\n\n`;
    }

    return s + code;
};

RubyGenerator.isString = function (s) {
    return _.isString(s);
};

RubyGenerator.isWhiteSpace = function (s) {
    return s === null || (this.isString(s) && s.trim().length === 0);
};

RubyGenerator.scalarToCode = function (scalar) {
    if (this.isString(scalar)) {
        return this.quote_(scalar);
    }
    return scalar;
};

RubyGenerator.listToCode = function (list) {
    const values = list.map(i => {
        if (this.isString(i)) {
            return this.quote_(i);
        }
        return i;
    }).join(', ');
    return `[${values}]`;
};

RubyGenerator.hashToCode = function (hash, separator = ': ', brace = true) {
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

RubyGenerator.numberOrStringToCode = function (value) {
    if (RubyGenerator.isString(value) &&
        value[0] === '"' &&
        value[value.length - 1] === '"') {
        const s = value.slice(1, value.length - 1);
        const n = Number(s);
        if (!isNaN(n) && !(n === 0 && RubyGenerator.isWhiteSpace(s))) {
            return n;
        }
    }
    return value;
};
RubyGenerator.nosToCode = RubyGenerator.numberOrStringToCode;

RubyGenerator.spriteNew = function (renderedTarget) {
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
                bitmap_resolution: i.bitmapResolution ? i.bitmapResolution : 1,
                data_format: this.quote_(i.dataFormat),
                rotation_center_x: i.rotationCenterX,
                rotation_center_y: i.rotationCenterY
            };
            return this.hashToCode(h);
        }).join(',\n');
        attributes.costumes = `[\n${this.prefixLines(s, this.INDENT)}\n]`;
    }
    if (renderedTarget.rotationStyle !== 'all around') {
        attributes.rotation_style = this.quote_(renderedTarget.rotationStyle);
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

RubyGenerator.scrubNakedValue = function (line) {
    return `${line}\n`;
};

RubyGenerator.escapeChars_ = {
    '"': '\\"'
};

RubyGenerator.quote_ = function (string) {
    let i;
    const s = String(string);
    const sb = ['"'];
    for (i = 0; i < s.length; i++) {
        const ch = s.charAt(i);
        sb.push(RubyGenerator.escapeChars_[ch] || ch);
    }
    sb.push('"');
    return sb.join('');
};

RubyGenerator.scrub_ = function (block, code) {
    if (code === null) {
        return '';
    }

    let commentCode = '';
    if (!this.isConnectedValue(block)) {
        let comment = this.getCommentText(block);
        if (comment) {
            commentCode += `${this.prefixLines(comment, '# ')}\n`;
        }
        const inputs = this.getInputs(block);
        for (const name in inputs) {
            const input = inputs[name];
            const childBlock = this.getBlock(input.block);
            if (childBlock) {
                comment = this.allNestedComments(childBlock);
                if (comment) {
                    commentCode += this.prefixLines(comment, '# ');
                }
            }
        }
    }

    const nextBlock = this.getBlock(block.next);
    let nextCode = this.blockToCode(nextBlock);
    let endCode = '';
    if (block.isStatement) {
        if (nextCode !== '') {
            nextCode = this.prefixLines(nextCode, this.INDENT);
        }
        endCode = 'end\n';
        delete block.isStatement;
    }
    return commentCode + code + nextCode + endCode;
};

RubyGenerator.spriteName = function () {
    return 'self';
};

const escapeIdentityRegexp =
    /[\x00-\x1f\x7f-\x9f !"#$%&'()*+,-./:;<=>?@[\\\]^`{|}~]/g; // eslint-disable-line no-control-regex

RubyGenerator.escapeVariableName = function (s) {
    return s.replace(escapeIdentityRegexp, '_');
};

RubyGenerator.escapeMethodName = RubyGenerator.escapeVariableName;

RubyGenerator.makeVariableName = function (isStage, name) {
    const prefix = isStage ? '$' : '@';
    return `${prefix}${name.replace(escapeIdentityRegexp, '_')}`;
};

RubyGenerator.variableName = function (id, type = SCALAR_TYPE) {
    let currVar;
    let isStage;
    const target = this.currentTarget;
    const variables = target.variables;
    if (variables.hasOwnProperty(id)) {
        currVar = variables[id];
        isStage = target.isStage;
    } else if (target.runtime && !target.isStage) {
        const stage = target.runtime.getTargetForStage();
        if (stage && stage.variables.hasOwnProperty(id)) {
            currVar = stage.variables[id];
            isStage = true;
        }
    }
    if (currVar && currVar.type === type) {
        return this.makeVariableName(isStage, currVar.name);
    }
    return null;
};

RubyGenerator.listName = function (id) {
    return this.variableName(id, LIST_TYPE);
};

RubyGenerator.getScripts = function () {
    return Generator.prototype.getScripts.call(this).sort((a, b) => {
        const aValue = (this.getBlock(a).opcode === 'procedures_definition' ? 1 : -1);
        const bValue = (this.getBlock(b).opcode === 'procedures_definition' ? 1 : -1);
        return bValue - aValue;
    });
};

MathBlocks(RubyGenerator);
TextBlocks(RubyGenerator);
ColourBlocks(RubyGenerator);

MotionBlocks(RubyGenerator);
LooksBlocks(RubyGenerator);
SoundBlocks(RubyGenerator);
EventBlocks(RubyGenerator);
ControlBlocks(RubyGenerator);
SensingBlocks(RubyGenerator);
OperatorsBlocks(RubyGenerator);
DataBlocks(RubyGenerator);
ProcedureBlocks(RubyGenerator);
RubyBlocks(RubyGenerator);
MusicBlocks(RubyGenerator);
PenBlocks(RubyGenerator);
VideoBlocks(RubyGenerator);
Text2SpeechBlocks(RubyGenerator);
TranslateBlocks(RubyGenerator);
MakeyMakeyBlocks(RubyGenerator);
MicrobitBlocks(RubyGenerator);
BoostBlocks(RubyGenerator);
EV3Blocks(RubyGenerator);
WeDo2Blocks(RubyGenerator);

export default RubyGenerator;
