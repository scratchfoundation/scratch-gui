import _ from 'lodash';

import GeneratedBlocks from './generated.js';
import MathBlocks from './math.js';
import TextBlocks from './text.js';
import MotionBlocks from './motion.js';
import LooksBlocks from './looks.js';
import SoundBlocks from './sound.js';
import EventBlocks from './event.js';
import ControlBlocks from './control.js';
import OperatorsBlocks from './operators.js';
import DataBlocks from './data.js';

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
        this.targetEventBlock = null;
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
            code = `,\n${this.prefixLines(code, '           ')}`;
        }
        const name = renderedTarget.sprite.name;
        return `Sprite.new(${this.quote_(name)}${code})`;
    };

    Blockly.Ruby.characterStack = function () {
        return this.definitions_.character_stack;
    };

    Blockly.Ruby.character = function () {
        return _.last(this.characterStack());
    };

    Blockly.Ruby.receiverStack = function () {
        return this.definitions_.receiver_stack;
    };

    Blockly.Ruby.receiver = function () {
        return _.last(this.receiverStack());
    };

    Blockly.Ruby.receiverName = function (options = {}) {
        const opts = {
            object: Blockly.Ruby.character(),
            dropSelf: true
        };
        _.extend(opts, options);
        const r = this.receiver();
        if (r === opts.object) {
            if (opts.dropSelf) {
                return '';
            }
            return 'self.';
        }
        return `${opts.object.get('name')}.`;
    };

    Blockly.Ruby.cs = Blockly.Ruby.characterStack;

    Blockly.Ruby.cs_ = Blockly.Ruby.characterStack;

    Blockly.Ruby.c = Blockly.Ruby.character;

    Blockly.Ruby.c_ = Blockly.Ruby.character;

    Blockly.Ruby.rs = Blockly.Ruby.receiverStack;

    Blockly.Ruby.rs_ = Blockly.Ruby.receiverStack;

    Blockly.Ruby.r = Blockly.Ruby.receiver;

    Blockly.Ruby.r_ = Blockly.Ruby.receiver;

    Blockly.Ruby.rn = Blockly.Ruby.receiverName;

    Blockly.Ruby.rn_ = Blockly.Ruby.receiverName;

    Blockly.Ruby.characterMethodCall_ = function (method, args, options = {}) {
        const res = this.characterMethodCallInput_(method, args, options);
        if (res[0]) {
            return `${res[0]}\n`;
        }
        return '';
    };

    Blockly.Ruby.characterMethodCallInput_ = function (method, args, options = {}) {
        let code = null;
        if (this.c_()) {
            if (args && args.length > 0) {
                code = `${this.rn_(options)}${method}(${args})`;
            } else {
                code = `${this.rn_(options)}${method}`;
            }
        }
        return [code, this.ORDER_FUNCTION_CALL];
    };

    Blockly.Ruby.characterSetVariable_ = function (name, val, operator = '=') {
        if (this.c_()) {
            return `${this.rn_({dropSelf: false})}${name} ${operator} ${val}\n`;
        }
        return '';
    };

    Blockly.Ruby.characterEvent_ = function (block, bodyName, name, arg = null) {
        let body;
        const c = this.c_();
        if (c) {
            this.rs_().push(c);
            try {
                body = Blockly.Ruby.statementToCode(block, bodyName) || '\n';
            } finally {
                this.rs_().pop();
            }
            if (arg) {
                arg = `, ${arg}`;
            } else {
                arg = '';
            }
            return `\n\n${this.rn_()}on(:${name}${arg}) do\n${body}end\n`;
        }
        return '';
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
            code = `${this.spriteNew(this.editingTarget)} do\n${this.prefixLines(code, this.INDENT)}end`;
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
        if (block === this.targetEventBlock) {
            if (nextCode !== '') {
                nextCode = this.prefixLines(/** @type {string} */ (nextCode), this.INDENT);
            }
            eventEndCode = 'end\n';
            this.targetEventBlock = null;
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
            return `${prefix}${currVar.name}`;
        }
        return null;
    };

    Blockly.Ruby.listName = function (id) {
        return this.variableName(id, LIST_TYPE);
    };

    Blockly.Ruby.workspaceToCode_ = Blockly.Ruby.workspaceToCode;

    Blockly.Ruby.workspaceToCode = function (block, target) {
        if (target) {
            this.editingTarget = target;
        }
        return this.workspaceToCode_(block);
    };

    Blockly.Ruby.blockToCode_ = Blockly.Ruby.blockToCode;

    Blockly.Ruby.blockToCode = function (block) {
        if (block && !block.disabled && block.type.match(/^hardware_/)) {
            this.definitions_.prepare__init_hardware = 'init_hardware';
        }
        return this.blockToCode_(block);
    };

    Blockly.Ruby.SpecialSymbols = [
        '_myself_',
        '_mouse_',
        '_edge_',
        '_random_',
        '_stage_'
    ];

    Blockly.Ruby.isSpecialSymbol = function (name) {
        return this.SpecialSymbols.includes(name);
    };

    Blockly.Ruby.specialSymbolToCode = function (name) {
        if (this.isSpecialSymbol(name)) {
            return `:${name}`;
        }
        return name;
    };

    Blockly = GeneratedBlocks(Blockly);

    Blockly = MathBlocks(Blockly);
    Blockly = TextBlocks(Blockly);

    Blockly = MotionBlocks(Blockly);
    Blockly = LooksBlocks(Blockly);
    Blockly = SoundBlocks(Blockly);
    Blockly = EventBlocks(Blockly);
    Blockly = ControlBlocks(Blockly);
    Blockly = OperatorsBlocks(Blockly);
    Blockly = DataBlocks(Blockly);

    return Blockly;
}
