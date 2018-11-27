/* global Opal */
import _ from 'lodash';
import log from '../log';
import Blockly from 'scratch-blocks';
import RubyParser from '../ruby-parser';

/**
 * Class for Ruby's self for detecting self.
 */
class Self {}

/**
 * Exception class for RubyToBlocksConverter
 */
class RubyToBlocksConverterError {
    constructor (node, message) {
        this.node = node;
        this.message = message;
    }
}

/**
 * Class for a block converter that translates ruby code into the blocks.
 */
class RubyToBlocksConverter {
    constructor (vm) {
        this.vm = vm;
        this.reset();
    }

    get errors () {
        return this._context.errors;
    }

    get blocks () {
        return this._context.blocks;
    }

    reset () {
        this._context = {
            blocks: {},
            blockTypes: {},
            currentNode: null,
            errors: []
        };
    }

    targetCodeToBlocks (target, code) {
        this.reset();
        try {
            const root = RubyParser.$parse(code);
            let blocks = this._process(root);
            if (!_.isArray(blocks)) {
                blocks = [blocks];
            }
            let prevBlock;
            blocks.forEach(block => {
                if (!block) {
                    return;
                }
                if (!prevBlock) {
                    block.topLevel = true;
                }
                if (block.next) {
                    prevBlock = block;
                } else {
                    prevBlock = null;
                }
            });
            return true;
        } catch (e) {
            let error;
            if (e.$$class && e.$$class.$$name === 'SyntaxError') {
                const loc = e.$diagnostic().$location();
                error = this._toErrorAnnotation(loc.$line(), loc.$column(), e.$message());
            } else if (e instanceof RubyToBlocksConverterError) {
                const loc = e.node.$loc();
                error = this._toErrorAnnotation(loc.$line(), loc.$column(), e.message);
            } else if (this._context.currentNode) {
                const loc = this._context.currentNode.$loc();
                error = this._toErrorAnnotation(loc.$line(), loc.$column(), e.message);
            } else {
                error = this._toErrorAnnotation(1, 0, e.message);
            }
            if (error) {
                this._context.errors.push(error);
            }
            return false;
        }
    }

    applyTargetBlocks (target, blocks) {
        Object.keys(target.blocks._blocks).forEach(blockId => {
            target.blocks.deleteBlock(blockId);
        });
        Object.keys(blocks).forEach(blockId => {
            target.blocks.createBlock(blocks[blockId]);
        });
        this.vm.emitWorkspaceUpdate();
    }

    _toErrorAnnotation (row, column, message) {
        if (row === Opal.nil) {
            row = 0;
        } else {
            row -= 1;
        }
        let columnText = '';
        if (column === Opal.nil) {
            column = 0;
        } else {
            columnText = `${column}: `;
        }
        return {
            row: row,
            column: column,
            type: 'error',
            text: `${columnText}${message}`
        };
    }

    _checkNumChildren (node, length) {
        if (_.isArray(length)) {
            if (length.indexOf(node.children.length) < 0) {
                log.error(`'${node.type}' node.children.length !== ${length.join(' or ')}: `, node.children);
            }
        } else if (node.children.length !== length) {
            log.error(`'${node.type}' node.children.length !== ${length}: `, node.children);
        }
    }

    _createBlock (opcode, type, attributes = {}) {
        const block = Object.assign({
            id: Blockly.utils.genUid(),
            opcode: opcode,
            inputs: {},
            fields: {},
            next: null,
            topLevel: false,
            parent: null,
            shadow: false,
            x: void 0,
            y: void 0
        }, attributes);
        this._context.blocks[block.id] = block;
        this._context.blockTypes[block.id] = type;
        return block;
    }

    _createFieldBlock (opcode, fieldName, value, parentBlockId) {
        return this._createBlock(opcode, 'value', {
            fields: {
                [fieldName]: {
                    name: fieldName,
                    id: void 0,
                    value: value
                }
            },
            parent: parentBlockId,
            shadow: true
        });
    }

    _createTextBlock (value, parentBlockId) {
        if (_.isString(value)) {
            return this._createFieldBlock('text', 'TEXT', value, parentBlockId);
        }
        return value;
    }

    _createNumberBlock (opcode, value, parentBlockId) {
        if (_.isNumber(value)) {
            return this._createFieldBlock(opcode, 'NUM', value, parentBlockId);
        }
        return value;
    }

    _addInput (block, name, inputBlock) {
        block.inputs[name] = {
            name: name,
            block: inputBlock.id,
            shadow: inputBlock.shadow ? inputBlock.id : null
        };
    }

    _addSubstack (block, substackBlocks, num = 1) {
        let name = 'SUBSTACK';
        if (num > 1) {
            name = `${name}${num}`;
        }
        block.inputs[name] = {
            name: name,
            block: substackBlocks.length > 0 ? substackBlocks[0].id : null,
            shadow: null
        };
        substackBlocks.forEach(b => {
            b.parent = block.id;
        });
    }

    _getSource (node) {
        const expression = node.$loc().$expression();
        if (expression === Opal.nil) {
            return '';
        }
        return expression.$source().toString();
    }

    _popWaitBlock (blocks) {
        if (!blocks || !_.isArray(blocks)) {
            return null;
        }

        const block = _.last(blocks);
        if (block.opcode === 'ruby_statement') {
            const textBlock = this._context.blocks[block.inputs.STATEMENT.block];
            if (textBlock.fields.TEXT.value === 'wait') {
                blocks.pop();
                if (blocks.length > 0) {
                    _.last(blocks).next = null;
                }
                delete this._context.blocks[block.id];
                delete this._context.blocks[block.id];

                return block;
            }
        }
        return null;
    }

    _blockType (block) {
        return this._context.blockTypes[block.id];
    }

    _process (node) {
        if (!node) {
            return null;
        }
        if (node == Opal.nil) {
            return Opal.nil;
        }
        node = node.$to_ast();
        this._context.currentNode = node;
        const handlerName = '_' + _.camelCase(`on_${node.type}`); // eslint-disable-line prefer-template
        if (_.isFunction(this[handlerName])) {
            return this[handlerName](node);
        }
        throw new RubyToBlocksConverterError(node, `not supported node type: ${node.type}`);
    }

    _onBegin (node) {
        let prevBlock = null;
        const blocks = [];
        let terminated = false;
        node.children.forEach(childNode => {
            const block = this._process(childNode);
            if (!block) {
                return;
            }
            switch (this._blockType(block)) {
            case 'statement':
                if (prevBlock) {
                    prevBlock.next = block.id;
                }
                prevBlock = block;
                if (!terminated) {
                    blocks.push(block);
                }
                break;
            case 'value':
                block.topLevel = true;
                break;
            case 'hat':
                break;
            case 'terminate':
                if (prevBlock) {
                    prevBlock.next = block.id;
                }
                prevBlock = null;
                if (!terminated) {
                    blocks.push(block);
                }
                terminated = true;
                break;
            }
        });
        return blocks;
    }

    _onBlock (node) {
        this._checkNumChildren(node, 3);

        return this._onSend(node.children[0], node.children[1], node.children[2]);
    }

    _onSend (node, rubyBlockArgsNode, rubyBlockNode) {
        // 対象外のコードの場合に備えて、作成したブロックを削除できるようにしておく。
        const savedBlockIds = Object.keys(this._context.blocks);

        const receiver = this._process(node.children[0]);
        const name = node.children[1].toString();
        const args = node.children.slice(2).map(childNode => this._process(childNode));

        let rubyBlockArgs;
        if (rubyBlockArgsNode) {
            rubyBlockArgs = this._process(rubyBlockArgsNode);
        }

        const receiverAndArgsBlockIds = Object.keys(this._context.blocks).filter(i => savedBlockIds.indexOf(i) < 0);

        let rubyBlock;
        if (rubyBlockNode) {
            rubyBlock = this._process(rubyBlockNode);
            if (!_.isArray(rubyBlock)) {
                rubyBlock = [rubyBlock];
            }
        }

        let block;
        if (receiver === Self || receiver == Opal.nil) {
            switch (name) {
            case 'move':
                if (args.length == 1) {
                    block = this._createBlock('motion_movesteps', 'statement');
                    this._addInput(block, 'STEPS', this._createNumberBlock('math_number', args[0], block.id));
                }
                break;
            case 'turn_right':
            case 'turn_left':
                if (args.length == 1) {
                    block = this._createBlock(
                        name === 'turn_right' ? 'motion_turnright' : 'motion_turnleft', 'statement'
                    );
                    this._addInput(block, 'DEGREES', this._createNumberBlock('math_number', args[0], block.id));
                }
                break;
            case 'go_to':
                if (args.length == 1) {
                    if (_.isString(args[0])) {
                        block = this._createBlock('motion_goto', 'statement');
                        this._addInput(
                            block,
                            'TO',
                            this._createFieldBlock('motion_goto_menu', 'TO', args[0], block.id)
                        );
                    } else if (_.isArray(args[0]) && args[0].length == 2) {
                        block = this._createBlock('motion_gotoxy', 'statement');
                        this._addInput(block, 'X', this._createNumberBlock('math_number', args[0][0], block.id));
                        this._addInput(block, 'Y', this._createNumberBlock('math_number', args[0][1], block.id));
                    }
                }
                break;
            case 'glide':
                if (args.length == 2 && args[1] instanceof Map && args[1].size === 1 && args[1].get('secs')) {
                    if (_.isString(args[0])) {
                        block = this._createBlock('motion_glideto', 'statement');
                        this._addInput(
                            block,
                            'TO',
                            this._createFieldBlock('motion_glideto_menu', 'TO', args[0], block.id)
                        );
                    } else if (_.isArray(args[0]) && args[0].length == 2) {
                        block = this._createBlock('motion_glidesecstoxy', 'statement');
                        this._addInput(block, 'X', this._createNumberBlock('math_number', args[0][0], block.id));
                        this._addInput(block, 'Y', this._createNumberBlock('math_number', args[0][1], block.id));
                    }
                    this._addInput(
                        block,
                        'SECS',
                        this._createNumberBlock('math_number', args[1].get('secs'), block.id)
                    );
                }
                break;
            case 'direction=':
                if (args.length == 1) {
                    block = this._createBlock('motion_pointindirection', 'statement');
                    this._addInput(block, 'DIRECTION', this._createNumberBlock('math_angle', args[0], block.id));
                }
                break;
            case 'point_towards':
                if (args.length == 1) {
                    if (_.isString(args[0])) {
                        block = this._createBlock('motion_pointtowards', 'statement');
                        this._addInput(
                            block,
                            'TOWARDS',
                            this._createFieldBlock('motion_pointtowards_menu', 'TOWARDS', args[0], block.id)
                        );
                    }
                }
                break;
            case 'bounce_if_on_edge':
                if (args.length == 0) {
                    block = this._createBlock('motion_ifonedgebounce', 'statement');
                }
                break;
            case 'rotation_style=':
                if (args.length == 1 && _.isString(args[0])) {
                    block = this._createBlock('motion_setrotationstyle', 'statement', {
                        fields: {
                            STYLE: {
                                name: 'STYLE',
                                id: void 0,
                                value: args[0]
                            }
                        }
                    });
                }
                break;
            case 'x=':
            case 'y=':
                if (args.length == 1) {
                    let xy;
                    if (name === 'x=') {
                        xy = 'x';
                    } else {
                        xy = 'y';
                    }
                    block = this._createBlock(`motion_set${xy}`, 'statement');
                    this._addInput(block, _.toUpper(xy), this._createNumberBlock('math_number', args[0], block.id));
                }
                break;
            case 'x':
            case 'y':
                if (args.length == 0) {
                    let xy;
                    if (name === 'x=') {
                        xy = 'x';
                    } else {
                        xy = 'y';
                    }
                    block = this._createBlock(`motion_${xy}position`, 'value');
                }
                break;
            case 'direction':
                if (args.length == 0) {
                    block = this._createBlock('motion_direction', 'value');
                }
                break;
            case 'when':
                if (args.length === 1) {
                    if (args[0] == 'flag_clicked' &&
                        rubyBlockArgs && rubyBlockArgs.length == 0 && rubyBlock.length > 0) {
                        block = this._createBlock('event_whenflagclicked', 'hat', {
                            topLevel: true
                        });

                        if (rubyBlock[0] !== Opal.nil) {
                            rubyBlock.forEach(b => {
                                b.parent = block.id;
                            });
                            block.next = rubyBlock[0].id;
                        }
                    }
                }
                break;
            case 'loop':
                if (args.length == 0) {
                    const waitBlock = this._popWaitBlock(rubyBlock);
                    if (waitBlock) {
                        block = this._createBlock('control_forever', 'statement');
                        this._addSubstack(block, rubyBlock);
                    }
                }
                break;
            case 'touching?':
                if (args.length == 1 && _.isString(args[0])) {
                    block = this._createBlock('sensing_touchingobject', 'value');
                    this._addInput(
                        block,
                        'TOUCHINGOBJECTMENU',
                        this._createFieldBlock('sensing_touchingobjectmenu', 'TOUCHINGOBJECTMENU', args[0], block.id)
                    );
                }
                break;

            }
        }
        if (!block) {
            receiverAndArgsBlockIds.forEach(blockId => {
                delete this._context.blocks[blockId];
            });

            if (rubyBlock) {
                block = this._createBlock('ruby_statement_with_block', 'statement');
                this._addInput(block, 'STATEMENT', this._createTextBlock(this._getSource(node), block.id));
                this._addInput(block, 'ARGS', this._createTextBlock(this._getSource(rubyBlockArgsNode), block.id));
                this._addSubstack(block, rubyBlock);
            } else {
                block = this._createBlock('ruby_statement', 'statement');
                this._addInput(block, 'STATEMENT', this._createTextBlock(this._getSource(node), block.id));
            }
        }
        return block;
    }

    _onSelf (node) { // eslint-disable-line no-unused-vars
        return Self;
    }

    _onSym (node) {
        this._checkNumChildren(node, 1);

        return node.children[0].toString();
    }

    _onArgs (node) {
        return node.children.map(childNode => this._process(childNode));
    }

    _onArg (node) {
        this._checkNumChildren(node, 1);

        return node.children[0];
    }

    _onInt (node) {
        this._checkNumChildren(node, 1);

        return node.children[0];
    }

    _onIf (node) {
        this._checkNumChildren(node, 3);

        const cond = this._process(node.children[0]);
        let statement = this._process(node.children[1]);
        if (!_.isArray(statement)) {
            statement = [statement];
        }
        let elseStatement = this._process(node.children[2]);
        if (!_.isArray(elseStatement)) {
            elseStatement = [elseStatement];
        }

        let block;
        if (elseStatement[0] === Opal.nil) {
            block = this._createBlock('control_if', 'statement', {
                inputs: {
                    CONDITION: {
                        name: 'CONDITION',
                        block: cond.id,
                        shadow: null
                    },
                    SUBSTACK: {
                        name: 'SUBSTACK',
                        block: statement[0] === Opal.nil ? null : statement[0].id,
                        shadow: null
                    }
                }
            });
        } else {
            block = this._createBlock('control_if_else', 'statement', {
                inputs: {
                    CONDITION: {
                        name: 'CONDITION',
                        block: cond.id,
                        shadow: null
                    },
                    SUBSTACK: {
                        name: 'SUBSTACK',
                        block: statement[0] === Opal.nil ? null : statement[0].id,
                        shadow: null
                    },
                    SUBSTACK2: {
                        name: 'SUBSTACK2',
                        block: elseStatement[0].id,
                        shadow: null
                    }
                }
            });
        }
        cond.parent = block.id;
        statement.forEach(b => {
            if (b && b !== Opal.nil) {
                b.parent = block.id;
            }
        });
        elseStatement.forEach(b => {
            if (b && b !== Opal.nil) {
                b.parent = block.id;
            }
        });
        return block;
    }

    _onStr (node) {
        this._checkNumChildren(node, 1);

        return node.children[0].toString();
    }

    _onArray (node) {
        return node.children.map(childNode => this._process(childNode));
    }

    _onHash (node) {
        return new Map(node.children.map(childNode => this._process(childNode)));
    }

    _onPair (node) {
        this._checkNumChildren(node, 2);

        return node.children.map(childNode => this._process(childNode));
    }

    _onTrue (node) { // eslint-disable-line no-unused-vars
        return true;
    }

    _onFalse (node) { // eslint-disable-line no-unused-vars
        return false;
    }

    _onOpAsgn (node) {
        this._checkNumChildren(node, 3);

        const savedBlockIds = Object.keys(this._context.blocks);
        const lh = this._process(node.children[0]);
        const operand = node.children[1].toString();
        const rh = this._process(node.children[2]);

        let block;
        if (lh.hasOwnProperty('opcode')) {
            switch (lh.opcode) {
            case 'motion_xposition':
            case 'motion_yposition':
                if (operand === '+') {
                    delete this._context.blocks[lh.id];

                    let xy;
                    if (lh.opcode === 'motion_xposition') {
                        xy = 'x';
                    } else {
                        xy = 'y';
                    }

                    block = this._createBlock(`motion_change${xy}by`, 'statement');
                    this._addInput(block, `D${_.toUpper(xy)}`, this._createNumberBlock('math_number', rh, block.id));
                }
                break;
            }
        }
        if (!block) {
            Object.keys(this._context.blocks).filter(i => savedBlockIds.indexOf(i) < 0)
                .forEach(blockId => {
                    delete this._context.blocks[blockId];
                });
            block = this._createBlock('ruby_statement', 'statement');
            this._addInput(block, 'STATEMENT', this._createTextBlock(this._getSource(node), block.id));
        }
        return block;
    }

    _onLvar (node) {
        this._checkNumChildren(node, 1);

        return node.children[0].toString();
    }
}

const targetCodeToBlocks = function (vm, target, code, errors = []) {
    const converter = new RubyToBlocksConverter(vm);
    if (converter.targetCodeToBlocks(target, code)) {
        converter.applyTargetBlocks(target, converter.blocks);
        return true;
    }
    converter.errors.forEach(e => errors.push(e));
    return false;
};

export {
    RubyToBlocksConverter as default,
    targetCodeToBlocks
};
