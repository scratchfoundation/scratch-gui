/**
 * Define Ruby
 * @param {Blockly} The ScratchBlocks
 * @return {Blockly} ScratchBlocks defined Ruby generator.
 */
export default function (Blockly) {
    Blockly.Ruby = new Blockly.Generator('Ruby');

    Blockly.Ruby.addReservedWords('BEGIN    class    ensure   nil      self     when END      def      false    not      super    while alias    defined? for      or       then     yield and      do       if       redo     true     __LINE__ begin    else     in       rescue   undef    __FILE__ break    elsif    module   retry    unless   __ENCODING__ case     end      next     return   until'.split(/\s+/));

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

    Blockly.Ruby.init = function() {
        this.definitions_ = Object.create(null);
        if (Blockly.Variables) {
            if (!this.variableDB_) {
                this.variableDB_ = new Blockly.Names(Blockly.Ruby.RESERVED_WORDS_);
            } else {
                this.variableDB_.reset();
            }
            this.definitions_['require__smalruby'] = 'require "smalruby"';
            this.definitions_['receiver_stack'] = ['main'];
            return this.definitions_['character_stack'] = [];
        }
    };

    Blockly.Ruby.defineCharacter = function(c) {
        var blockName, costume, costumeIndex, costumeParam, costumes, name, rotationStyle;
        name = c.get('name');
        blockName = "character_" + name;
        if (!Blockly.Ruby.definitions_[blockName]) {
            switch (c.get('rotationStyle')) {
                case 'left_right':
                    rotationStyle = ', rotation_style: :left_right';
                    break;
                case 'none':
                    rotationStyle = ', rotation_style: :none';
                    break;
                default:
                    rotationStyle = '';
            }
            costumeParam = ['costume: '];
            costumes = (function() {
                var _i, _len, _ref, _results;
                _ref = c.costumesWithName();
                _results = [];
                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                    costume = _ref[_i];
                    _results.push(Blockly.Ruby.quote_(costume));
                }
                return _results;
            })();
            if (costumes.length > 1) {
                costumeParam.push("[" + (costumes.join(', ')) + "]");
            } else {
                costumeParam.push(costumes[0]);
            }
            costumeIndex = c.get('costumeIndex');
            if (costumeIndex > 0) {
                costumeParam.push(", costume_index: " + costumeIndex);
            }
            return Blockly.Ruby.definitions_[blockName] = name + " = Character.new(" + (costumeParam.join('')) + ", x: " + (c.get('x')) + ", y: " + (c.get('y')) + ", angle: " + (c.get('angle')) + rotationStyle + ")";
        }
    };

    Blockly.Ruby.characterStack = function() {
        return this.definitions_['character_stack'];
    };

    Blockly.Ruby.character = function() {
        return _.last(this.characterStack());
    };

    Blockly.Ruby.receiverStack = function() {
        return this.definitions_['receiver_stack'];
    };

    Blockly.Ruby.receiver = function() {
        return _.last(this.receiverStack());
    };

    Blockly.Ruby.receiverName = function(options) {
        var opts, r;
        if (options == null) {
            options = {};
        }
        opts = {
            object: Blockly.Ruby.character(),
            dropSelf: true
        };
        _.extend(opts, options);
        r = this.receiver();
        if (r === opts.object) {
            if (opts.dropSelf) {
                return '';
            } else {
                return 'self.';
            }
        } else {
            return (opts.object.get('name')) + ".";
        }
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

    Blockly.Ruby.characterMethodCall_ = function(method, args, options) {
        var res;
        if (options == null) {
            options = {};
        }
        res = this.characterMethodCallInput_(method, args, options);
        if (res[0]) {
            return res[0] + "\n";
        } else {
            return '';
        }
    };

    Blockly.Ruby.characterMethodCallInput_ = function(method, args, options) {
        var code;
        if (options == null) {
            options = {};
        }
        code = this.c_() ? args && args.length > 0 ? "" + (this.rn_(options)) + method + "(" + args + ")" : "" + (this.rn_(options)) + method : null;
        return [code, this.ORDER_FUNCTION_CALL];
    };

    Blockly.Ruby.characterSetVariable_ = function(name, val, operator) {
        if (operator == null) {
            operator = '=';
        }
        if (this.c_()) {
            return "" + (this.rn_({
                dropSelf: false
            })) + name + " " + operator + " " + val + "\n";
        } else {
            return '';
        }
    };

    Blockly.Ruby.characterEvent_ = function(block, bodyName, name, arg) {
        var body, c;
        if (arg == null) {
            arg = null;
        }
        if (c = this.c_()) {
            this.rs_().push(c);
            try {
                body = Blockly.Ruby.statementToCode(block, bodyName) || '\n';
            } finally {
                this.rs_().pop();
            }
            if (arg) {
                arg = ", " + arg;
            } else {
                arg = '';
            }
            return "\n\n" + (this.rn_()) + "on(:" + name + arg + ") do\n" + body + "end\n";
        } else {
            return '';
        }
    };

    Blockly.Ruby.finish = function(code) {
        var allDefs, definitions, name, prepares, requires, _fn;
        requires = [];
        prepares = [];
        definitions = [];
        _fn = function(name) {
            var def;
            def = Blockly.Ruby.definitions_[name];
            if (_.isString(def)) {
                if (name.match(/^require__/)) {
                    return requires.push(def);
                } else if (name.match(/^prepare__/)) {
                    return prepares.push(def);
                } else {
                    return definitions.push(def);
                }
            }
        };
        for (name in Blockly.Ruby.definitions_) {
            _fn(name);
        }
        if (prepares.length === 0 && definitions.length === 0 && code.length === 0) {
            return '';
        }
        allDefs = requires.join('\n') + '\n\n';
        if (prepares.length > 0) {
            allDefs += prepares.join('\n') + '\n\n';
        }
        if (definitions.length > 0) {
            allDefs += definitions.join('\n').replace(/\n\n+/g, '\n\n').replace(/\n*$/, '\n');
        }
        return allDefs + code;
    };

    Blockly.Ruby.scrubNakedValue = function(line) {
        return line + '\n';
    };

    Blockly.Ruby.escapeChars_ = {
        '"': '\\"'
    };

    Blockly.Ruby.quote_ = function(string) {
        var i, s, sb, _fn, _i, _ref;
        s = String(string);
        sb = ['"'];
        _fn = function(i) {
            var ch;
            ch = s.charAt(i);
            return sb[i + 1] = Blockly.Ruby.escapeChars_[ch] || ch;
        };
        for (i = _i = 0, _ref = s.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
            _fn(i);
        }
        sb.push('"');
        return sb.join('');
    };

    Blockly.Ruby.scrub_ = function(block, code) {
        var comment, commentCode, input, nextBlock, nextCode, _fn, _i, _len, _ref;
        if (code === null) {
            return '';
        }
        commentCode = '';
        if (!block.outputConnection || !block.outputConnection.targetConnection) {
            comment = block.getCommentText();
            if (comment) {
                commentCode += this.prefixLines(comment, '# ') + '\n';
            }
            _ref = block.inputList;
            _fn = (function(_this) {
                return function(input) {
                    var childBlock;
                    if (input.type === Blockly.INPUT_VALUE) {
                        childBlock = input.connection.targetBlock();
                        if (childBlock) {
                            comment = _this.allNestedComments(childBlock);
                            if (comment) {
                                return commentCode += _this.prefixLines(comment, '# ');
                            }
                        }
                    }
                };
            })(this);
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                input = _ref[_i];
                _fn(input);
            }
        }
        nextBlock = block.nextConnection && block.nextConnection.targetBlock();
        nextCode = this.blockToCode(nextBlock);
        return commentCode + code + nextCode;
    };

    Blockly.Ruby.blockToCode_ = Blockly.Ruby.blockToCode;

    Blockly.Ruby.blockToCode = function(block) {
        if (block && !block.disabled && block.type.match(/^hardware_/)) {
            this.definitions_['prepare__init_hardware'] = 'init_hardware';
        }
        return this.blockToCode_(block);
    };

    return Blockly;
}
