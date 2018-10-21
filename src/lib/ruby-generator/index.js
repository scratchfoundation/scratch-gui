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
        this.defineSprite(this.editingTarget);
    };

    Blockly.Ruby.defineSprite = function (renderedTarget) {
        if (!renderedTarget) {
            return null;
        }
        const RenderedTarget = renderedTarget.constructor;
        const name = renderedTarget.sprite.name;
        const definitionsId = `sprite_${name}`;

        if (!this.definitions_.hasOwnProperty(definitionsId)) {
            const attributes = [''];

            if (renderedTarget.x !== 0) {
                attributes.push(`x: ${renderedTarget.x}`);
            }
            if (renderedTarget.y !== 0) {
                attributes.push(`y: ${renderedTarget.y}`);
            }
            if (renderedTarget.direction !== 90) {
                attributes.push(`direction: ${renderedTarget.direction}`);
            }
            if (!renderedTarget.visible) {
                attributes.push(`visible: ${!!renderedTarget.visible}`);
            }
            if (renderedTarget.size !== 100) {
                attributes.push(`size: ${renderedTarget.size}`);
            }
            if (renderedTarget.currentCostume > 1) {
                attributes.push(`current_costume: ${renderedTarget.currentCostume - 1}`);
            }
            if (renderedTarget.sprite.costumes.length > 0) {
                const costumesParams = ['costumes: ['];
                costumesParams.push(
                    renderedTarget.sprite.costumes.map(costume => `             {
               asset_id: ${this.quote_(costume.assetId)},
               name: ${this.quote_(costume.name)},
               bitmap_resolution: ${costume.bitmapResolution},
               md5: ${this.quote_(costume.md5)},
               data_format: ${this.quote_(costume.dataFormat)},
               rotation_center_x: ${costume.rotationCenterX},
               rotation_center_y: ${costume.rotationCenterY}
             }`).join(',\n')
                );
                costumesParams.push('           ]');
                attributes.push(costumesParams.join('\n'));
            }
            switch (renderedTarget.rotationStyle) {
            case RenderedTarget.ROTATION_STYLE_LEFT_RIGHT:
                attributes.push('rotation_style: :left_right');
                break;
            case RenderedTarget.ROTATION_STYLE_NONE:
                attributes.push('rotation_style: :none');
                break;
            }

            this.definitions_[definitionsId] =
                `Sprite.new(${this.quote_(name)}${attributes.join(',\n           ')})`;
        }
        return Blockly.Ruby.definitions_[definitionsId];
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
        let name;

        for (name in Blockly.Ruby.definitions_) {
            const def = this.definitions_[name];
            if (typeof def === 'string' || def instanceof String) {
                if (name.match(/^require__/)) {
                    requires.push(def);
                } else if (name.match(/^prepare__/)) {
                    prepares.push(def);
                } else {
                    defs.push(def);
                }
            }
        }
        if (requires.length === 0 && prepares.length === 0 && defs.length === 0 && code.length === 0) {
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
        return `sprite(${this.quote_(this.editingTarget.sprite.name)})`;
    };

    Blockly.Ruby.broadcastMessageName = function (name) {
        const bm = this.editingTarget.lookupBroadcastMsg(name);
        if (bm) {
            return Blockly.Ruby.quote_(bm.name);
        }
        return null;
    };

    Blockly.Ruby.variableName = function (name) {
        const variable = this.editingTarget.lookupOrCreateVariable(name);
        if (variable) {
            return variable.name;
        }
        return null;
    };

    Blockly.Ruby.listName = function (name) {
        const list = this.editingTarget.lookupOrCreateList(name);
        if (list) {
            return list.name;
        }
        return null;
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
