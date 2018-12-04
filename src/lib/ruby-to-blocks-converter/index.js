/* global Opal */
import _ from 'lodash';
import log from '../log';
import Blockly from 'scratch-blocks';
import RubyParser from '../ruby-parser';
import Variable from 'scratch-vm/src/engine/variable';

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

    get localVariables () {
        return this._context.localVariables;
    }

    get instanceVariables () {
        return this._context.instanceVariables;
    }

    get globalVariables () {
        return this._context.globalVariables;
    }

    reset () {
        this._context = {
            blocks: {},
            blockTypes: {},
            currentNode: null,
            errors: [],
            localVariables: {},
            instanceVariables: {},
            globalVariables: {}
        };
        if (this.vm && this.vm.runtime && this.vm.runtime.getTargetForStage) {
            this._loadVariables(this.vm.runtime.getTargetForStage());
        }
    }

    targetCodeToBlocks (target, code) {
        this.reset();
        this._loadVariables(target);
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

    applyTargetBlocks (target) {
        let stage;
        if (target.isStage) {
            stage = target;
        } else {
            Object.keys(this._context.instanceVariables).forEach(name => {
                const variable = this._context.instanceVariables[name];
                if (!target.lookupVariableById(variable.id)) {
                    target.createVariable(variable.id, variable.name, variable.type);
                }
            });
            stage = this.vm.runtime.getTargetForStage();
        }
        if (stage) {
            Object.keys(this._context.globalVariables).forEach(name => {
                const variable = this._context.globalVariables[name];
                if (!stage.lookupVariableById(variable.id)) {
                    stage.createVariable(variable.id, variable.name, variable.type);
                }
            });
        }

        Object.keys(target.blocks._blocks).forEach(blockId => {
            target.blocks.deleteBlock(blockId);
        });
        Object.keys(this._context.blocks).forEach(blockId => {
            target.blocks.createBlock(this._context.blocks[blockId]);
        });

        this.vm.emitWorkspaceUpdate();
    }

    _loadVariables (target) {
        if (!target || !target.variables) {
            return;
        }
        let store;
        if (target.isStage) {
            store = this._context.globalVariables;
        } else {
            store = this._context.instanceVariables;
        }
        Object.keys(target.variables).forEach(blockId => {
            const variable = target.variables[blockId];
            store[variable.name] = variable;
        });
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

    _createRubyExpressionBlock (expression) {
        const block = this._createBlock('ruby_expression', 'value_boolean');
        this._addInput(block, 'EXPRESSION', this._createTextBlock(expression, block.id));
        return block;
    }

    _createRubyStatementBlock (statement) {
        const block = this._createBlock('ruby_statement', 'statement');
        this._addInput(block, 'STATEMENT', this._createTextBlock(statement, block.id));
        return block;
    }

    _addInput (block, name, inputBlock) {
        inputBlock.parent = block.id;
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

    _findOrCreateVariable (name, type) {
        let scope;
        let store;
        if (name[0] === '$') {
            name = name.slice(1);
            scope = 'global';
            store = this._context.globalVariables;
        } else if (name[0] === '@') {
            name = name.slice(1);
            scope = 'instance';
            store = this._context.instanceVariables;
        } else {
            scope = 'local';
            store = this._context.localVariables;
        }
        if (store.hasOwnProperty(name)) {
            if (type) {
                store[name].type = type;
            }
            return store[name];
        }

        const variable = {
            id: Blockly.utils.genUid(),
            name: name,
            scope: scope,
            type: type ? type : Variable.SCALAR_TYPE
        };
        store[variable.name] = variable;
        return variable;
    }

    _changeVariableBlock (block, opcode, blockType, varType) {
        block.opcode = opcode;
        this._setBlockType(block, blockType);

        let before;
        let after;
        if (varType === Variable.SCALAR_TYPE) {
            before = 'LIST';
            after = 'VARIABLE';
        } else {
            before = 'VARIABLE';
            after = 'LIST';
        }
        if (block.fields[before]) {
            block.fields[after] = block.fields[before];
            block.fields[after].name = after;
            delete block.fields[before];

            const varName = block.fields[after].value;
            const variable = this.instanceVariables[varName] || this.globalVariables[varName];
            variable.type = varType;
        }
        return block;
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

    _setBlockType (block, type) {
        this._context.blockTypes[block.id] = type;
    }

    _isBlock (block) {
        try {
            return block.hasOwnProperty('opcode');
        } catch (e) {
            return false;
        }
    }

    _isNumberOrBlock (numberOrBlock) {
        return _.isNumber(numberOrBlock) || this._isBlock(numberOrBlock);
    }

    _isStringOrBlock (stringOrBlock) {
        return _.isString(stringOrBlock) || this._isBlock(stringOrBlock);
    }

    _isVariableBlock (block) {
        return this._isBlock(block) && ['data_variable', 'data_listcontents'].indexOf(block.opcode) >= 0;
    }

    _matchRubyExpression (block, regexp) {
        if (!this._isBlock(block) || block.opcode !== 'ruby_expression') {
            return false;
        }
        const textBlock = this._context.blocks[block.inputs.EXPRESSION.block];
        return regexp.test(textBlock.fields.TEXT.value);
    }

    _process (node) {
        if (!node) {
            return null;
        }
        if (node === Opal.nil) {
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
            case 'value_boolean':
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
        if (receiver === Self || receiver === Opal.nil) {
            switch (name) {
            case 'move':
                if (args.length === 1 && this._isNumberOrBlock(args[0])) {
                    block = this._createBlock('motion_movesteps', 'statement');
                    this._addInput(block, 'STEPS', this._createNumberBlock('math_number', args[0], block.id));
                }
                break;
            case 'turn_right':
            case 'turn_left':
                if (args.length === 1 && this._isNumberOrBlock(args[0])) {
                    block = this._createBlock(
                        name === 'turn_right' ? 'motion_turnright' : 'motion_turnleft', 'statement'
                    );
                    this._addInput(block, 'DEGREES', this._createNumberBlock('math_number', args[0], block.id));
                }
                break;
            case 'go_to':
                if (args.length === 1) {
                    if (_.isString(args[0])) {
                        block = this._createBlock('motion_goto', 'statement');
                        this._addInput(
                            block,
                            'TO',
                            this._createFieldBlock('motion_goto_menu', 'TO', args[0], block.id)
                        );
                    } else if (_.isArray(args[0]) && args[0].length === 2 &&
                               this._isNumberOrBlock(args[0][0]) && this._isNumberOrBlock(args[0][1])) {
                        block = this._createBlock('motion_gotoxy', 'statement');
                        this._addInput(block, 'X', this._createNumberBlock('math_number', args[0][0], block.id));
                        this._addInput(block, 'Y', this._createNumberBlock('math_number', args[0][1], block.id));
                    }
                }
                break;
            case 'glide':
                if (args.length === 2 && args[1] instanceof Map && args[1].size === 1 && args[1].get('secs')) {
                    if (_.isString(args[0])) {
                        block = this._createBlock('motion_glideto', 'statement');
                        this._addInput(
                            block,
                            'TO',
                            this._createFieldBlock('motion_glideto_menu', 'TO', args[0], block.id)
                        );
                    } else if (_.isArray(args[0]) && args[0].length === 2 &&
                               this._isNumberOrBlock(args[0][0]) && this._isNumberOrBlock(args[0][1])) {
                        block = this._createBlock('motion_glidesecstoxy', 'statement');
                        this._addInput(block, 'X', this._createNumberBlock('math_number', args[0][0], block.id));
                        this._addInput(block, 'Y', this._createNumberBlock('math_number', args[0][1], block.id));
                    }
                    if (block) {
                        this._addInput(
                            block,
                            'SECS',
                            this._createNumberBlock('math_number', args[1].get('secs'), block.id)
                        );
                    }
                }
                break;
            case 'direction=':
                if (args.length === 1 && this._isNumberOrBlock(args[0])) {
                    block = this._createBlock('motion_pointindirection', 'statement');
                    this._addInput(block, 'DIRECTION', this._createNumberBlock('math_angle', args[0], block.id));
                }
                break;
            case 'point_towards':
                if (args.length === 1 && _.isString(args[0])) {
                    block = this._createBlock('motion_pointtowards', 'statement');
                    this._addInput(
                        block,
                        'TOWARDS',
                        this._createFieldBlock('motion_pointtowards_menu', 'TOWARDS', args[0], block.id)
                    );
                }
                break;
            case 'bounce_if_on_edge':
                if (args.length === 0) {
                    block = this._createBlock('motion_ifonedgebounce', 'statement');
                }
                break;
            case 'rotation_style=': {
                const ROTATION_STYLE = [
                    'left-right',
                    'don\'t rotate',
                    'all around'
                ];
                if (args.length === 1 && _.isString(args[0]) && ROTATION_STYLE.indexOf(args[0]) >= 0) {
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
            }
            case 'x=':
            case 'y=':
                if (args.length === 1 && this._isNumberOrBlock(args[0])) {
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
                if (args.length === 0) {
                    let xy;
                    if (name === 'x') {
                        xy = 'x';
                    } else {
                        xy = 'y';
                    }
                    block = this._createBlock(`motion_${xy}position`, 'value');
                }
                break;
            case 'direction':
                if (args.length === 0) {
                    block = this._createBlock('motion_direction', 'value');
                }
                break;
            case 'when':
                if (args.length === 1) {
                    if (args[0] === 'flag_clicked' &&
                        rubyBlockArgs && rubyBlockArgs.length === 0 && rubyBlock.length > 0) {
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
                if (args.length === 0) {
                    const waitBlock = this._popWaitBlock(rubyBlock);
                    if (waitBlock) {
                        block = this._createBlock('control_forever', 'statement');
                        this._addSubstack(block, rubyBlock);
                    }
                }
                break;
            case 'touching?':
                if (args.length === 1 && _.isString(args[0])) {
                    block = this._createBlock('sensing_touchingobject', 'value_boolean');
                    this._addInput(
                        block,
                        'TOUCHINGOBJECTMENU',
                        this._createFieldBlock('sensing_touchingobjectmenu', 'TOUCHINGOBJECTMENU', args[0], block.id)
                    );
                }
                break;
            case 'rand':
                if (args.length === 1 && this._isBlock(args[0]) && args[0].opcode === 'ruby_range') {
                    block = args[0];
                    block.opcode = 'operator_random';
                    this._setBlockType(block, 'value');
                }
                break;
            case 'show_variable':
            case 'hide_variable':
                if (args.length === 1 && _.isString(args[0])) {
                    let opcode;
                    switch (name) {
                    case 'show_variable':
                        opcode = 'data_showvariable';
                        break;
                    case 'hide_variable':
                        opcode = 'data_hidevariable';
                        break;
                    }
                    const variable = this._findOrCreateVariable(args[0], Variable.SCALAR_TYPE);
                    if (variable.scope !== 'local') {
                        block = this._createBlock(opcode, 'statement', {
                            fields: {
                                VARIABLE: {
                                    name: 'VARIABLE',
                                    id: variable.id,
                                    value: variable.name
                                }
                            }
                        });
                    }
                }
                break;
            case 'show_list':
            case 'hide_list':
                if (args.length === 1 && _.isString(args[0])) {
                    let opcode;
                    switch (name) {
                    case 'show_list':
                        opcode = 'data_showlist';
                        break;
                    case 'hide_list':
                        opcode = 'data_hidelist';
                        break;
                    }
                    const variable = this._findOrCreateVariable(args[0], Variable.LIST_TYPE);
                    if (variable.scope !== 'local') {
                        block = this._createBlock(opcode, 'statement', {
                            fields: {
                                LIST: {
                                    name: 'LIST',
                                    id: variable.id,
                                    value: variable.name
                                }
                            }
                        });
                    }
                }
                break;
            case 'wait':
                if (args.length === 0) {
                    block = this._createBlock('ruby_statement', 'statement');
                    this._addInput(block, 'STATEMENT', this._createTextBlock('wait', block.id));
                }
            }
        } else if (this._isVariableBlock(receiver)) {
            switch (name) {
            case 'push':
                if (args.length === 1 &&
                    this._isStringOrBlock(args[0])) {
                    block = this._changeVariableBlock(receiver, 'data_addtolist', 'statement', Variable.LIST_TYPE);
                    this._addInput(block, 'ITEM', this._createTextBlock(args[0], block.id));
                }
                break;
            case 'delete_at':
                if (args.length === 1 &&
                    this._isNumberOrBlock(args[0])) {
                    block = this._changeVariableBlock(receiver, 'data_deleteoflist', 'statement', Variable.LIST_TYPE);
                    this._addInput(block, 'INDEX', this._createNumberBlock('math_number', args[0], block.id));
                }
                break;
            case 'clear':
                if (args.length === 0) {
                    block = this._changeVariableBlock(receiver, 'data_deletealloflist', 'statement', Variable.LIST_TYPE);
                }
                break;
            case 'insert':
                if (args.length === 2 &&
                    this._isNumberOrBlock(args[0]) &&
                    this._isStringOrBlock(args[1])) {
                    block = this._changeVariableBlock(receiver, 'data_insertatlist', 'statement', Variable.LIST_TYPE);
                    this._addInput(block, 'INDEX', this._createNumberBlock('math_number', args[0], block.id));
                    this._addInput(block, 'ITEM', this._createTextBlock(args[1], block.id));
                }
                break;
            case '[]=':
                if (args.length === 2 &&
                    this._isNumberOrBlock(args[0]) &&
                    this._isStringOrBlock(args[1])) {
                    block = this._changeVariableBlock(receiver, 'data_replaceitemoflist', 'statement', Variable.LIST_TYPE);
                    this._addInput(block, 'INDEX', this._createNumberBlock('math_number', args[0], block.id));
                    this._addInput(block, 'ITEM', this._createTextBlock(args[1], block.id));
                }
                break;
            case '[]':
                if (args.length === 1 &&
                    this._isNumberOrBlock(args[0])) {
                    block = this._changeVariableBlock(receiver, 'data_itemoflist', 'value', Variable.LIST_TYPE);
                    this._addInput(block, 'INDEX', this._createNumberBlock('math_number', args[0], block.id));
                }
                break;
            case 'index':
                if (args.length === 1 &&
                    this._isStringOrBlock(args[0])) {
                    block = this._changeVariableBlock(receiver, 'data_itemnumoflist', 'value', Variable.LIST_TYPE);
                    this._addInput(block, 'ITEM', this._createTextBlock(args[0], block.id));
                }
                break;
            case 'length':
                if (args.length === 0) {
                    block = this._changeVariableBlock(receiver, 'data_lengthoflist', 'value', Variable.LIST_TYPE);
                }
                break;
            case 'include?':
                if (args.length === 1 &&
                    this._isStringOrBlock(args[0])) {
                    block = this._changeVariableBlock(receiver, 'data_listcontainsitem', 'value', Variable.LIST_TYPE);
                    this._addInput(block, 'ITEM', this._createTextBlock(args[0], block.id));
                }
                break;
            }
        } else {
            switch (name) {
            case '+':
            case '-':
            case '*':
            case '/':
            case '%':
                if (args.length === 1) {
                    if (this._isNumberOrBlock(receiver) && this._isNumberOrBlock(args[0])) {
                        let opcode;
                        if (name === '+') {
                            opcode = 'operator_add';
                        } else if (name === '-') {
                            opcode = 'operator_subtract';
                        } else if (name === '*') {
                            opcode = 'operator_multiply';
                        } else if (name === '/') {
                            opcode = 'operator_divide';
                        } else {
                            opcode = 'operator_mod';
                        }
                        block = this._createBlock(opcode, 'value');
                        this._addInput(block, 'NUM1', this._createNumberBlock('math_number', receiver, block.id));
                        this._addInput(block, 'NUM2', this._createNumberBlock('math_number', args[0], block.id));
                    } else if (this._isStringOrBlock(receiver) && name === '+') {
                        block = this._createBlock('operator_join', 'value');
                        this._addInput(block, 'STRING1', this._createTextBlock(receiver, block.id));
                        this._addInput(
                            block,
                            'STRING2',
                            this._createTextBlock(_.isNumber(args[0]) ? args[0].toString() : args[0], block.id)
                        );
                    }
                }
                break;
            case '>':
            case '<':
            case '==':
                if (args.length === 1) {
                    let opcode;
                    if (name === '>') {
                        opcode = 'operator_gt';
                    } else if (name === '<') {
                        opcode = 'operator_lt';
                    } else {
                        opcode = 'operator_equals';
                    }
                    block = this._createBlock(opcode, 'value_boolean');
                    this._addInput(
                        block,
                        'OPERAND1',
                        this._createTextBlock(_.isNumber(receiver) ? receiver.toString() : receiver, block.id)
                    );
                    this._addInput(
                        block,
                        'OPERAND2',
                        this._createTextBlock(_.isNumber(args[0]) ? args[0].toString() : args[0], block.id)
                    );
                }
                break;
            case '!':
                if (args.length === 0) {
                    block = this._createBlock('operator_not', 'value_boolean');
                    if (receiver) {
                        this._addInput(
                            block,
                            'OPERAND',
                            this._createTextBlock(_.isNumber(receiver) ? receiver.toString() : receiver, block.id)
                        );
                    }
                }
                break;
            case '[]':
                if (this._isStringOrBlock(receiver) &&
                    args.length === 1 && this._isNumberOrBlock(args[0])) {
                    block = this._createBlock('operator_letter_of', 'value');
                    this._addInput(block, 'STRING', this._createTextBlock(receiver, block.id));
                    this._addInput(block, 'LETTER', this._createNumberBlock('math_number', args[0], block.id));
                }
                break;
            case 'length':
                if (args.length === 0 && this._isStringOrBlock(receiver)) {
                    block = this._createBlock('operator_length', 'value');
                    this._addInput(block, 'STRING', this._createTextBlock(receiver, block.id));
                }
                break;
            case 'include?':
                if (args.length === 1 &&
                    this._isStringOrBlock(receiver) && this._isStringOrBlock(args[0])) {
                    block = this._createBlock('operator_contains', 'value');
                    this._addInput(block, 'STRING1', this._createTextBlock(receiver, block.id));
                    this._addInput(block, 'STRING2', this._createTextBlock(args[0], block.id));
                }
                break;
            case 'round':
                if (args.length === 0 && this._isNumberOrBlock(receiver)) {
                    block = this._createBlock('operator_round', 'value');
                    this._addInput(block, 'NUM', this._createNumberBlock('math_number', receiver, block.id));
                }
                break;
            case 'abs':
            case 'floor':
            case 'ceil': {
                let operator;
                switch (name) {
                case 'ceil':
                    operator = 'ceiling';
                    break;
                default:
                    operator = name;
                }
                if (args.length === 0 && this._isNumberOrBlock(receiver)) {
                    block = this._createBlock('operator_mathop', 'value', {
                        fields: {
                            OPERATOR: {
                                name: 'OPERATOR',
                                id: void 0,
                                value: operator
                            }
                        }
                    });
                    this._addInput(block, 'NUM', this._createNumberBlock('math_number', receiver, block.id));
                }
                break;
            }
            case 'sqrt':
            case 'sin':
            case 'cos':
            case 'tan':
            case 'asin':
            case 'acos':
            case 'atan':
            case 'log':
            case 'log10': {
                let operator;
                switch (name) {
                case 'log':
                    operator = 'ln';
                    break;
                case 'log10':
                    operator = 'log';
                    break;
                default:
                    operator = name;
                }
                if (args.length === 1 &&
                    this._matchRubyExpression(receiver, /^(::)?Math$/) &&
                    this._isNumberOrBlock(args[0])) {
                    delete this._context.blocks[receiver.inputs.EXPRESSION.block];
                    delete this._context.blocks[receiver.id];

                    block = this._createBlock('operator_mathop', 'value', {
                        fields: {
                            OPERATOR: {
                                name: 'OPERATOR',
                                id: void 0,
                                value: operator
                            }
                        }
                    });
                    this._addInput(block, 'NUM', this._createNumberBlock('math_number', args[0], block.id));
                }
                break;
            }
            case '**':
                if (args.length === 1 && this._isNumberOrBlock(args[0])) {
                    let operator;
                    if (this._matchRubyExpression(receiver, /^(::)?Math::E$/)) {
                        operator = 'e ^';
                        delete this._context.blocks[receiver.inputs.EXPRESSION.block];
                        delete this._context.blocks[receiver.id];
                    } else if (receiver === 10) {
                        operator = '10 ^';
                    }
                    if (operator) {
                        block = this._createBlock('operator_mathop', 'value', {
                            fields: {
                                OPERATOR: {
                                    name: 'OPERATOR',
                                    id: void 0,
                                    value: operator
                                }
                            }
                        });
                        this._addInput(block, 'NUM', this._createNumberBlock('math_number', args[0], block.id));
                    }
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

        const savedBlockIds = Object.keys(this._context.blocks);
        let cond = this._process(node.children[0]);
        if (cond !== false && this._blockType(cond) !== 'value_boolean') {
            Object.keys(this._context.blocks).filter(i => savedBlockIds.indexOf(i) < 0)
                .forEach(blockId => {
                    delete this._context.blocks[blockId];
                });
            cond = this._createRubyExpressionBlock(this._getSource(node.children[0]));
        }
        let statement = this._process(node.children[1]);
        if (!_.isArray(statement)) {
            statement = [statement];
        }
        let elseStatement = this._process(node.children[2]);
        if (!_.isArray(elseStatement)) {
            elseStatement = [elseStatement];
        }

        const inputs = {};
        if (cond !== false) {
            inputs.CONDITION = {
                name: 'CONDITION',
                block: cond.id,
                shadow: null
            };
        }
        inputs.SUBSTACK = {
            name: 'SUBSTACK',
            block: statement[0] === Opal.nil ? null : statement[0].id,
            shadow: null
        };
        let opcode;
        if (elseStatement[0] === Opal.nil) {
            opcode = 'control_if';
        } else {
            opcode = 'control_if_else';
            inputs.SUBSTACK2 = {
                name: 'SUBSTACK2',
                block: elseStatement[0].id,
                shadow: null
            };
        }
        const block = this._createBlock(opcode, 'statement', {inputs: inputs});
        if (cond !== false) {
            cond.parent = block.id;
        }
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
        const operator = node.children[1].toString();
        const rh = this._process(node.children[2]);

        let block;
        if (operator === '+') {
            if (this._isBlock(lh)) {
                switch (lh.opcode) {
                case 'motion_xposition':
                case 'motion_yposition':
                    if (this._isNumberOrBlock(rh)) {
                        delete this._context.blocks[lh.id];

                        let xy;
                        if (lh.opcode === 'motion_xposition') {
                            xy = 'x';
                        } else {
                            xy = 'y';
                        }

                        block = this._createBlock(`motion_change${xy}by`, 'statement');
                        this._addInput(
                            block,
                            `D${_.toUpper(xy)}`,
                            this._createNumberBlock('math_number', rh, block.id)
                        );
                    }
                    break;
                }
            } else if (_.isString(lh)) {
                const variable = this._findOrCreateVariable(lh, Variable.SCALAR_TYPE);
                if (variable.scope !== 'local') {
                    block = this._createBlock('data_changevariableby', 'statement', {
                        fields: {
                            VARIABLE: {
                                name: 'VARIABLE',
                                id: variable.id,
                                value: variable.name
                            }
                        }
                    });
                    this._addInput(
                        block,
                        'VALUE',
                        this._createTextBlock(_.isNumber(rh) ? rh.toString() : rh, block.id)
                    );
                }
            }
        }

        if (!block) {
            Object.keys(this._context.blocks).filter(i => savedBlockIds.indexOf(i) < 0)
                .forEach(blockId => {
                    delete this._context.blocks[blockId];
                });
            block = this._createRubyStatementBlock(this._getSource(node));
        }
        return block;
    }

    _onIrange (node) {
        this._checkNumChildren(node, 2);

        const args = node.children.map(childNode => this._process(childNode));
        const block = this._createBlock('ruby_range', 'value_boolean');
        this._addInput(block, 'FROM', this._createNumberBlock('math_number', args[0], block.id));
        this._addInput(block, 'TO', this._createNumberBlock('math_number', args[1], block.id));
        return block;
    }

    _onErange (node) {
        this._checkNumChildren(node, 2);

        const args = node.children.map(childNode => this._process(childNode));
        const block = this._createBlock('ruby_exclude_range', 'value_boolean');
        this._addInput(block, 'FROM', this._createNumberBlock('math_number', args[0], block.id));
        this._addInput(block, 'TO', this._createNumberBlock('math_number', args[1], block.id));
        return block;
    }

    _onAnd (node) {
        this._checkNumChildren(node, 2);

        const operands = node.children.map(childNode => this._process(childNode));
        const block = this._createBlock('operator_and', 'value_boolean');
        operands.forEach(o => {
            if (o) {
                o.parent = block.id;
            }
        });
        if (operands[0]) {
            this._addInput(block, 'OPERAND1', this._createTextBlock(operands[0], block.id));
        }
        if (operands[1]) {
            this._addInput(block, 'OPERAND2', this._createTextBlock(operands[1], block.id));
        }
        return block;
    }

    _onOr (node) {
        this._checkNumChildren(node, 2);

        const operands = node.children.map(childNode => this._process(childNode));
        const block = this._createBlock('operator_or', 'value_boolean');
        operands.forEach(o => {
            if (o) {
                o.parent = block.id;
            }
        });
        if (operands[0]) {
            this._addInput(block, 'OPERAND1', this._createTextBlock(operands[0], block.id));
        }
        if (operands[1]) {
            this._addInput(block, 'OPERAND2', this._createTextBlock(operands[1], block.id));
        }
        return block;
    }

    _onConst (node) {
        this._checkNumChildren(node, 2);

        return this._createRubyExpressionBlock(this._getSource(node));
    }

    _onIvar (node) {
        this._checkNumChildren(node, 1);

        const variable = this._findOrCreateVariable(node.children[0]);
        if (variable.scope !== 'local') {
            let opcode;
            let name;
            if (variable.type === Variable.SCALAR_TYPE) {
                opcode = 'data_variable';
                name = 'VARIABLE';
            } else {
                opcode = 'data_listcontents';
                name = 'LIST';
            }
            return this._createBlock(opcode, 'value', {
                fields: {
                    [name]: {
                        name: name,
                        id: variable.id,
                        value: variable.name
                    }
                }
            });
        }

        return node.children[0].toString();
    }

    _onLvar (node) {
        return this._onIvar(node);
    }

    _onGvar (node) {
        return this._onIvar(node);
    }

    _onIvasgn (node) {
        this._checkNumChildren(node, [1, 2]);

        if (node.children.length === 1) {
            return node.children[0].toString();
        }

        const variable = this._findOrCreateVariable(node.children[0], Variable.SCALAR_TYPE);
        if (variable.scope !== 'local') {
            const rh = this._process(node.children[1]);
            const block = this._createBlock('data_setvariableto', 'statement', {
                fields: {
                    VARIABLE: {
                        name: 'VARIABLE',
                        id: variable.id,
                        value: variable.name
                    }
                }
            });
            this._addInput(
                block,
                'VALUE',
                this._createTextBlock(_.isNumber(rh) ? rh.toString() : rh, block.id)
            );
            return block;
        }

        return this._createRubyStatementBlock(this._getSource(node));
    }

    _onLvasgn (node) {
        return this._onIvasgn(node);
    }

    _onGvasgn (node) {
        return this._onIvasgn(node);
    }
}

const targetCodeToBlocks = function (vm, target, code, errors = []) {
    const converter = new RubyToBlocksConverter(vm);
    if (converter.targetCodeToBlocks(target, code)) {
        converter.applyTargetBlocks(target);
        return true;
    }
    converter.errors.forEach(e => errors.push(e));
    return false;
};

export {
    RubyToBlocksConverter as default,
    targetCodeToBlocks
};
