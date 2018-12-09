/* global Opal */
import _ from 'lodash';
import log from '../log';
import Blockly from 'scratch-blocks';
import RubyParser from '../ruby-parser';
import Variable from 'scratch-vm/src/engine/variable';

import ControlConverter from './control';

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
        this._converters = [
            ControlConverter
        ];
        this.reset();
    }

    get errors () {
        return this._context.errors;
    }

    get blocks () {
        return this._context.blocks;
    }

    get variables () {
        return this._context.variables;
    }

    get lists () {
        return this._context.lists;
    }

    reset () {
        this._context = {
            currentNode: null,
            errors: [],
            argumentBlocks: {},
            procedureCallBlocks: {},

            blocks: {},
            blockTypes: {},
            localVariables: {},
            variables: {},
            lists: {},
            procedures: {}
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
            stage = this.vm.runtime.getTargetForStage();
        }
        ['variables', 'lists'].forEach(storeName => {
            Object.keys(this._context[storeName]).forEach(name => {
                const variable = this._context[storeName][name];
                if (variable.scope === 'global') {
                    if (!stage.variables.hasOwnProperty(variable.id)) {
                        stage.createVariable(variable.id, variable.name, variable.type);
                    }
                } else if (!target.isStage) {
                    if (!target.variables.hasOwnProperty(variable.id)) {
                        target.createVariable(variable.id, variable.name, variable.type);
                    }
                }
            });
        });

        Object.keys(target.blocks._blocks).forEach(blockId => {
            target.blocks.deleteBlock(blockId);
        });
        Object.keys(this._context.blocks).forEach(blockId => {
            target.blocks.createBlock(this._context.blocks[blockId]);
        });

        this.vm.emitWorkspaceUpdate();
    }

    _callConvertersHandler (handlerName) {
        for (let i = 0; i < this._converters.length; i++) {
            const converter = this._converters[i];
            if (converter.hasOwnProperty(handlerName)) {
                const block = converter[handlerName].apply(this, Array.prototype.slice.call(arguments, 1));
                if (block) {
                    return block;
                }
            }
        }
        return null;
    }

    _saveContext () {
        const includes = [
            'blocks',
            'blockTypes',
            'localVariables',
            'variables',
            'lists',
            'procedures'
        ];

        const saved = {};
        Object.keys(this._context).filter(k => includes.indexOf(k) >= 0)
            .forEach(k => {
                saved[k] = Object.assign({}, this._context[k]);
            });
        return saved;
    }

    // could not restore attributes.
    _restoreContext (saved) {
        if (!saved) {
            return;
        }

        Object.keys(saved).forEach(key => {
            if (this._context.hasOwnProperty(key)) {
                Object.keys(this._context[key]).forEach(id => {
                    if (!saved[key].hasOwnProperty(id)) {
                        delete this._context[key][id];
                    }
                });
                Object.keys(saved[key]).forEach(id => {
                    if (!this._context[key].hasOwnProperty(id)) {
                        this._context[key][id] = saved[key][id];
                    }
                });
            }
        });
    }

    _loadVariables (target) {
        if (!target || !target.variables) {
            return;
        }
        let scope;
        if (target.isStage) {
            scope = 'global';
        } else {
            scope = 'instance';
        }
        Object.keys(target.variables).forEach(blockId => {
            const variable = target.variables[blockId];
            let storeName;
            if (variable.type === Variable.SCALAR_TYPE) {
                storeName = 'variables';
            } else {
                storeName = 'lists';
            }
            this._context[storeName][variable.name] = Object.assign({}, variable, {
                scope: scope
            });
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

    _createFieldBlock (opcode, fieldName, value) {
        return this._createBlock(opcode, 'value', {
            fields: {
                [fieldName]: {
                    name: fieldName,
                    id: void 0,
                    value: value
                }
            },
            shadow: true
        });
    }

    _createTextBlock (value) {
        if (_.isString(value)) {
            return this._createFieldBlock('text', 'TEXT', value);
        }
        return value;
    }

    _createNumberBlock (opcode, value) {
        if (_.isNumber(value) || value === '') {
            return this._createFieldBlock(opcode, 'NUM', value.toString());
        }
        return value;
    }

    _createRubyExpressionBlock (expression) {
        const block = this._createBlock('ruby_expression', 'value_boolean');
        this._addInput(block, 'EXPRESSION', this._createTextBlock(expression));
        return block;
    }

    _createRubyStatementBlock (statement) {
        const block = this._createBlock('ruby_statement', 'statement');
        this._addInput(block, 'STATEMENT', this._createTextBlock(statement));
        return block;
    }

    _addInput (block, name, inputBlock, shadowBlock) {
        if (!name) {
            name = inputBlock.id;
        }
        inputBlock.parent = block.id;
        let shadowBlockId;
        if (shadowBlock) {
            shadowBlockId = shadowBlock.id;
            shadowBlock.parent = block.id;
        } else {
            shadowBlockId = null;
        }
        block.inputs[name] = {
            name: name,
            block: inputBlock.id,
            shadow: inputBlock.shadow ? inputBlock.id : shadowBlockId
        };
    }

    _addNumberInput (block, name, opcode, inputValue, shadowValue) {
        let shadowBlock;
        if (!_.isNumber(inputValue)) {
            shadowBlock = this._createNumberBlock(opcode, shadowValue);
        }
        this._addInput(block, name, this._createNumberBlock(opcode, inputValue), shadowBlock);
    }

    _addTextInput (block, name, inputValue, shadowValue) {
        let shadowBlock;
        if (!_.isString(inputValue)) {
            shadowBlock = this._createTextBlock(shadowValue);
        }
        this._addInput(block, name, this._createTextBlock(inputValue), shadowBlock);
    }

    _addSubstack (block, substackBlocks, num = 1) {
        if (!_.isArray(substackBlocks)) {
            substackBlocks = [substackBlocks];
        }
        let name = 'SUBSTACK';
        if (num > 1) {
            name = `${name}${num}`;
        }
        let substackBlockId = null;
        if (this._isBlock(substackBlocks[0])) {
            substackBlocks[0].parent = block.id;
            substackBlockId = substackBlocks[0].id;
        }
        block.inputs[name] = {
            name: name,
            block: substackBlockId,
            shadow: null
        };
    }

    _findOrCreateVariableOrList (name, type) {
        name = name.toString();
        let scope;
        let varName;
        if (name[0] === '$') {
            varName = name.slice(1);
            scope = 'global';
        } else if (name[0] === '@') {
            varName = name.slice(1);
            scope = 'instance';
        } else {
            varName = name;
            scope = 'local';
        }
        let storeName;
        if (type === Variable.SCALAR_TYPE) {
            if (scope === 'local') {
                storeName = 'localVariables';
            } else {
                storeName = 'variables';
            }
        } else {
            storeName = 'lists';
        }
        let variable = this._context[storeName][varName];
        if (!variable) {
            variable = {
                id: Blockly.utils.genUid(),
                name: varName,
                scope: scope,
                type: type
            };
            this._context[storeName][varName] = variable;
        }
        return variable;
    }

    _findOrCreateVariable (name) {
        return this._findOrCreateVariableOrList(name, Variable.SCALAR_TYPE);
    }

    _findOrCreateList (name) {
        return this._findOrCreateVariableOrList(name, Variable.LIST_TYPE);
    }

    _findProcedure (name) {
        name = name.toString();
        return this._context.procedures[name];
    }

    _createProcedure (name) {
        name = name.toString();
        let procedure = this._context.procedures[name];
        if (procedure) {
            throw new RubyToBlocksConverterError(
                this._context.currentNode,
                `already defined My Block "${name}".`
            );
        }
        procedure = {
            id: Blockly.utils.genUid(),
            name: name,
            procCode: [name],
            argumentNames: [],
            argumentDefaults: [],
            argumentIds: [],
            argumentVariables: [],
            argumentBlocks: []
        };
        this._context.procedures[name] = procedure;
        return procedure;
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

    _getBlockType (block) {
        return this._context.blockTypes[block.id];
    }

    _setBlockType (block, type) {
        this._context.blockTypes[block.id] = type;
    }

    _changeBlock (block, opcode, blockType) {
        block.opcode = opcode;
        this._setBlockType(block, blockType);
        return block;
    }

    _isSelf (block) {
        return block === Self;
    }

    _isBlock (block) {
        try {
            return block.hasOwnProperty('opcode');
        } catch (e) {
            return false;
        }
    }

    _isValueBlock (block) {
        if (!this._isBlock(block)) {
            return false;
        }
        return /^value/.test(this._getBlockType(block));
    }

    _isNumberOrBlock (numberOrBlock) {
        return _.isNumber(numberOrBlock) || this._isValueBlock(numberOrBlock);
    }

    _isStringOrBlock (stringOrBlock) {
        return _.isString(stringOrBlock) || this._isValueBlock(stringOrBlock);
    }

    _changeToBooleanArgument (varName) {
        varName = varName.toString();
        const variable = this._context.localVariables[varName];
        if (!variable) {
            return false;
        }

        variable.isBoolean = true;

        if (this._context.argumentBlocks.hasOwnProperty(variable.id)) {
            this._context.argumentBlocks[variable.id].forEach(id => {
                const b = this._context.blocks[id];
                b.opcode = 'argument_reporter_boolean';
                this._setBlockType(b, 'value_boolean');
            });
        }
        return true;
    }

    _isFalseOrBooleanBlock (block) {
        if (block === false) {
            return true;
        }
        if (!this._isBlock(block)) {
            return false;
        }
        if (this._getBlockType(block) === 'value_boolean') {
            return true;
        }
        if (block.opcode === 'argument_reporter_string_number') {
            const varName = block.fields.VALUE.value;
            if (this._changeToBooleanArgument(varName)) {
                block.opcode = 'argument_reporter_boolean';
                this._setBlockType(block, 'value_boolean');
                return true;
            }
        }
        return false;
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
        let firstBlock;
        node.children.forEach(childNode => {
            const block = this._process(childNode);
            if (!block) {
                return;
            }
            if (!firstBlock) {
                firstBlock = block;
            }
            switch (this._getBlockType(block)) {
            case 'statement':
                if (prevBlock) {
                    prevBlock.next = block.id;
                    block.parent = prevBlock.id;
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
                    block.parent = prevBlock.id;
                }
                prevBlock = null;
                if (!terminated) {
                    blocks.push(block);
                }
                terminated = true;
                break;
            }
        });
        if (blocks.length === 0 && firstBlock) {
            if (/^value/.test(this._getBlockType(firstBlock))) {
                firstBlock.topLevel = false;
            }
            blocks.push(firstBlock);
        }
        return blocks;
    }

    _onBlock (node) {
        this._checkNumChildren(node, 3);

        return this._onSend(node.children[0], node.children[1], node.children[2]);
    }

    _onSend (node, rubyBlockArgsNode, rubyBlockNode) {
        const saved = this._saveContext();

        let receiver = this._process(node.children[0]);
        if (_.isArray(receiver) && receiver.length === 1) {
            receiver = receiver[0];
        }
        const name = node.children[1].toString();
        const args = node.children.slice(2).map(childNode => this._process(childNode));

        let rubyBlockArgs;
        if (rubyBlockArgsNode) {
            rubyBlockArgs = this._process(rubyBlockArgsNode);
        }

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
                    this._addNumberInput(block, 'STEPS', 'math_number', args[0], 10);
                }
                break;
            case 'turn_right':
            case 'turn_left':
                if (args.length === 1 && this._isNumberOrBlock(args[0])) {
                    block = this._createBlock(
                        name === 'turn_right' ? 'motion_turnright' : 'motion_turnleft', 'statement'
                    );
                    this._addNumberInput(block, 'DEGREES', 'math_number', args[0], 15);
                }
                break;
            case 'go_to':
                if (args.length === 1) {
                    if (_.isString(args[0])) {
                        block = this._createBlock('motion_goto', 'statement');
                        this._addInput(block, 'TO', this._createFieldBlock('motion_goto_menu', 'TO', args[0]));
                    } else if (_.isArray(args[0]) && args[0].length === 2 &&
                               this._isNumberOrBlock(args[0][0]) && this._isNumberOrBlock(args[0][1])) {
                        block = this._createBlock('motion_gotoxy', 'statement');
                        this._addNumberInput(block, 'X', 'math_number', args[0][0], 0);
                        this._addNumberInput(block, 'Y', 'math_number', args[0][1], 0);
                    }
                }
                break;
            case 'glide':
                if (args.length === 2 &&
                    args[1] instanceof Map && args[1].size === 1 && this._isNumberOrBlock(args[1].get('secs'))) {
                    if (_.isString(args[0])) {
                        block = this._createBlock('motion_glideto', 'statement');
                        this._addInput(block, 'TO', this._createFieldBlock('motion_glideto_menu', 'TO', args[0]));
                    } else if (_.isArray(args[0]) && args[0].length === 2 &&
                               this._isNumberOrBlock(args[0][0]) && this._isNumberOrBlock(args[0][1])) {
                        block = this._createBlock('motion_glidesecstoxy', 'statement');
                        this._addNumberInput(block, 'X', 'math_number', args[0][0], 0);
                        this._addNumberInput(block, 'Y', 'math_number', args[0][1], 0);
                    }
                    if (block) {
                        this._addNumberInput(block, 'SECS', 'math_number', args[1].get('secs'), 1);
                    }
                }
                break;
            case 'direction=':
                if (args.length === 1 && this._isNumberOrBlock(args[0])) {
                    block = this._createBlock('motion_pointindirection', 'statement');
                    this._addNumberInput(block, 'DIRECTION', 'math_angle', args[0], 90);
                }
                break;
            case 'point_towards':
                if (args.length === 1 && _.isString(args[0])) {
                    block = this._createBlock('motion_pointtowards', 'statement');
                    this._addInput(
                        block,
                        'TOWARDS',
                        this._createFieldBlock('motion_pointtowards_menu', 'TOWARDS', args[0])
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
                    this._addNumberInput(block, _.toUpper(xy), 'math_number', args[0], 0);
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

                        if (this._isBlock(rubyBlock[0])) {
                            rubyBlock[0].parent = block.id;
                            block.next = rubyBlock[0].id;
                        }
                    }
                }
                break;
            case 'touching?':
                if (args.length === 1 && _.isString(args[0])) {
                    block = this._createBlock('sensing_touchingobject', 'value_boolean');
                    this._addInput(
                        block,
                        'TOUCHINGOBJECTMENU',
                        this._createFieldBlock('sensing_touchingobjectmenu', 'TOUCHINGOBJECTMENU', args[0])
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
                    const variable = this._findOrCreateVariable(args[0]);
                    if (variable.scope !== 'local') {
                        block = this._createBlock(opcode, 'statement', {
                            fields: {
                                VARIABLE: {
                                    name: 'VARIABLE',
                                    id: variable.id,
                                    value: variable.name,
                                    variableType: variable.type
                                }
                            }
                        });
                    }
                }
                break;
            case 'list':
            case 'show_list':
            case 'hide_list':
                if (args.length === 1 && _.isString(args[0])) {
                    let opcode;
                    let blockType;
                    switch (name) {
                    case 'list':
                        opcode = 'data_listcontents';
                        blockType = 'value';
                        break;
                    case 'show_list':
                        opcode = 'data_showlist';
                        blockType = 'statement';
                        break;
                    case 'hide_list':
                        opcode = 'data_hidelist';
                        blockType = 'statement';
                        break;
                    }
                    const variable = this._findOrCreateList(args[0]);
                    if (variable.scope !== 'local') {
                        block = this._createBlock(opcode, blockType, {
                            fields: {
                                LIST: {
                                    name: 'LIST',
                                    id: variable.id,
                                    value: variable.name,
                                    variableType: variable.type
                                }
                            }
                        });
                    }
                }
                break;
            case 'wait':
                if (args.length === 0) {
                    block = this._createRubyStatementBlock('wait');
                }
                break;
            default:
                if (this._findProcedure(name)) {
                    const procedure = this._findProcedure(name);
                    if (procedure.argumentIds.length === args.length) {
                        block = this._createBlock('procedures_call', 'statement', {
                            mutation: {
                                argumentids: JSON.stringify(procedure.argumentIds),
                                children: [],
                                proccode: procedure.procCode.join(' '),
                                tagName: 'mutation',
                                warp: 'false'
                            }
                        });

                        if (this._context.procedureCallBlocks.hasOwnProperty(procedure.id)) {
                            this._context.procedureCallBlocks[procedure.id].push(block.id);
                        } else {
                            this._context.procedureCallBlocks[procedure.id] = [block.id];
                        }

                        args.forEach((arg, i) => {
                            const argumentId = procedure.argumentIds[i];
                            if (this._isFalseOrBooleanBlock(arg)) {
                                if (procedure.argumentVariables[i].isBoolean ||
                                    this._changeToBooleanArgument(procedure.argumentNames[i])) {
                                    if (arg !== false) {
                                        this._addInput(block, argumentId, arg, null);
                                    }
                                    return;
                                }
                            }
                            if (!procedure.argumentVariables[i].isBoolean &&
                                (this._isNumberOrBlock(arg) || this._isStringOrBlock(arg))) {
                                this._addTextInput(block, argumentId, _.isNumber(arg) ? arg.toString() : arg, '');
                                return;
                            }
                            throw new RubyToBlocksConverterError(
                                this._context.currentNode,
                                `invalid type of My Block "${name}" argument #${i + 1}`
                            );
                        });
                    }
                }
                break;
            }
        } else if (this._isVariableBlock(receiver)) {
            switch (name) {
            case 'push':
                if (args.length === 1 &&
                    (this._isStringOrBlock(args[0]) || this._isNumberOrBlock(args[0]))) {
                    block = this._changeBlock(receiver, 'data_addtolist', 'statement');
                    this._addTextInput(block, 'ITEM', _.isNumber(args[0]) ? args[0].toString() : args[0], 'thing');
                }
                break;
            case 'delete_at':
                if (args.length === 1 &&
                    this._isNumberOrBlock(args[0])) {
                    block = this._changeBlock(receiver, 'data_deleteoflist', 'statement');
                    this._addNumberInput(block, 'INDEX', 'math_integer', args[0], 1);
                }
                break;
            case 'clear':
                if (args.length === 0) {
                    block = this._changeBlock(receiver, 'data_deletealloflist', 'statement');
                }
                break;
            case 'insert':
                if (args.length === 2 &&
                    this._isNumberOrBlock(args[0]) &&
                    (this._isStringOrBlock(args[1]) || this._isNumberOrBlock(args[1]))) {
                    block = this._changeBlock(receiver, 'data_insertatlist', 'statement');
                    this._addNumberInput(block, 'INDEX', 'math_integer', args[0], 1);
                    this._addTextInput(block, 'ITEM', _.isNumber(args[1]) ? args[1].toString() : args[1], 'thing');
                }
                break;
            case '[]=':
                if (args.length === 2 &&
                    this._isNumberOrBlock(args[0]) &&
                    (this._isStringOrBlock(args[1]) || this._isNumberOrBlock(args[1]))) {
                    block = this._changeBlock(receiver, 'data_replaceitemoflist', 'statement');
                    this._addNumberInput(block, 'INDEX', 'math_integer', args[0], 1);
                    this._addTextInput(block, 'ITEM', _.isNumber(args[1]) ? args[1].toString() : args[1], 'thing');
                }
                break;
            case '[]':
                if (args.length === 1 &&
                    this._isNumberOrBlock(args[0])) {
                    block = this._changeBlock(receiver, 'data_itemoflist', 'value');
                    this._addNumberInput(block, 'INDEX', 'math_integer', args[0], 1);
                }
                break;
            case 'index':
                if (args.length === 1 &&
                    (this._isStringOrBlock(args[0]) || this._isNumberOrBlock(args[0]))) {
                    block = this._changeBlock(receiver, 'data_itemnumoflist', 'value');
                    this._addTextInput(block, 'ITEM', _.isNumber(args[0]) ? args[0].toString() : args[0], 'thing');
                }
                break;
            case 'length':
                if (args.length === 0) {
                    block = this._changeBlock(receiver, 'data_lengthoflist', 'value');
                }
                break;
            case 'include?':
                if (args.length === 1 &&
                    (this._isStringOrBlock(args[0]) || this._isNumberOrBlock(args[0]))) {
                    block = this._changeBlock(receiver, 'data_listcontainsitem', 'value');
                    this._addTextInput(block, 'ITEM', _.isNumber(args[0]) ? args[0].toString() : args[0], 'thing');
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
                        this._addNumberInput(block, 'NUM1', 'math_number', receiver, '');
                        this._addNumberInput(block, 'NUM2', 'math_number', args[0], '');
                    } else if (name === '+' &&
                               (this._isStringOrBlock(receiver) || this._isStringOrBlock(args[0]))) {
                        block = this._createBlock('operator_join', 'value');
                        this._addTextInput(
                            block,
                            'STRING1',
                            _.isNumber(receiver) ? receiver.toString() : receiver,
                            'apple'
                        );
                        this._addTextInput(
                            block,
                            'STRING2',
                            _.isNumber(args[0]) ? args[0].toString() : args[0],
                            'banana'
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
                    this._addTextInput(block, 'OPERAND1', _.isNumber(receiver) ? receiver.toString() : receiver, '');
                    this._addTextInput(block, 'OPERAND2', _.isNumber(args[0]) ? args[0].toString() : args[0], '50');
                }
                break;
            case '!':
                if (args.length === 0) {
                    block = this._createBlock('operator_not', 'value_boolean');
                    if (receiver) {
                        this._addInput(
                            block,
                            'OPERAND',
                            this._createTextBlock(_.isNumber(receiver) ? receiver.toString() : receiver)
                        );
                    }
                }
                break;
            case '[]':
                if (this._isStringOrBlock(receiver) &&
                    args.length === 1 && this._isNumberOrBlock(args[0])) {
                    block = this._createBlock('operator_letter_of', 'value');
                    this._addTextInput(block, 'STRING', receiver, 'apple');
                    this._addNumberInput(block, 'LETTER', 'math_number', args[0], 1);
                }
                break;
            case 'length':
                if (args.length === 0 && this._isStringOrBlock(receiver)) {
                    block = this._createBlock('operator_length', 'value');
                    this._addTextInput(block, 'STRING', receiver, 'apple');
                }
                break;
            case 'include?':
                if (args.length === 1 &&
                    this._isStringOrBlock(receiver) && this._isStringOrBlock(args[0])) {
                    block = this._createBlock('operator_contains', 'value');
                    this._addTextInput(block, 'STRING1', receiver, 'apple');
                    this._addTextInput(block, 'STRING2', args[0], 'a');
                }
                break;
            case 'round':
                if (args.length === 0 && this._isNumberOrBlock(receiver)) {
                    block = this._createBlock('operator_round', 'value');
                    this._addNumberInput(block, 'NUM', 'math_number', receiver, '');
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
                    this._addNumberInput(block, 'NUM', 'math_number', receiver, '');
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
                    this._addNumberInput(block, 'NUM', 'math_number', args[0], '');
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
                        this._addNumberInput(block, 'NUM', 'math_number', args[0], '');
                    }
                }
                break;
            }
        }

        if (!block) {
            block = this._callConvertersHandler('onSend', receiver, name, args, rubyBlockArgs, rubyBlock);
        }

        if (!block) {
            this._restoreContext(saved);

            if (rubyBlockNode) {
                block = this._createBlock('ruby_statement_with_block', 'statement');
                this._addTextInput(block, 'STATEMENT', this._getSource(node));
                this._addTextInput(block, 'ARGS', this._getSource(rubyBlockArgsNode));
                this._addSubstack(block, this._process(rubyBlockNode));
            } else {
                block = this._createRubyStatementBlock(this._getSource(node));
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

        const saved = this._saveContext();

        const cond = this._process(node.children[0]);
        if (!this._isFalseOrBooleanBlock(cond)) {
            throw new RubyToBlocksConverterError(
                node,
                `condition is not boolean: ${this._getSource(node.children[0])}`
            );
        }
        let statement = this._process(node.children[1]);
        if (!_.isArray(statement)) {
            statement = [statement];
        }
        let elseStatement;
        if (node.$loc().$else() !== Opal.nil) {
            elseStatement = this._process(node.children[2]);
            if (!_.isArray(elseStatement)) {
                elseStatement = [elseStatement];
            }
        }

        let block = this._callConvertersHandler('onIf', cond, statement, elseStatement);
        if (!block) {
            this._restoreContext(saved);

            block = this._createRubyStatementBlock(this._getSource(node));
        }
        return block;
    }

    _onUntil (node) {
        this._checkNumChildren(node, 2);

        const saved = this._saveContext();

        let cond = this._process(node.children[0]);
        if (_.isArray(cond) && cond.length === 1) {
            cond = cond[0];
        }
        if (!this._isFalseOrBooleanBlock(cond)) {
            throw new RubyToBlocksConverterError(
                node,
                `condition is not boolean: ${this._getSource(node.children[0])}`
            );
        }
        let statement = this._process(node.children[1]);
        if (!_.isArray(statement)) {
            statement = [statement];
        }

        let block = this._callConvertersHandler('onUntil', cond, statement);
        if (!block) {
            this._restoreContext(saved);

            block = this._createRubyStatementBlock(this._getSource(node));
        }
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
                        this._addNumberInput(block, `D${_.toUpper(xy)}`, 'math_number', rh, 10);
                    }
                    break;
                }
            } else if (_.isString(lh)) {
                const variable = this._findOrCreateVariable(lh);
                if (variable.scope !== 'local' && this._isNumberOrBlock(rh)) {
                    block = this._createBlock('data_changevariableby', 'statement', {
                        fields: {
                            VARIABLE: {
                                name: 'VARIABLE',
                                id: variable.id,
                                value: variable.name,
                                variableType: variable.type
                            }
                        }
                    });
                    this._addNumberInput(block, 'VALUE', 'math_number', rh, 1);
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
        this._addNumberInput(block, 'FROM', 'math_number', args[0], 1);
        this._addNumberInput(block, 'TO', 'math_number', args[1], 10);
        return block;
    }

    _onErange (node) {
        this._checkNumChildren(node, 2);

        const args = node.children.map(childNode => this._process(childNode));
        const block = this._createBlock('ruby_exclude_range', 'value_boolean');
        this._addNumberInput(block, 'FROM', 'math_number', args[0], 1);
        this._addNumberInput(block, 'TO', 'math_number', args[1], 10);
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
            this._addInput(block, 'OPERAND1', this._createTextBlock(operands[0]));
        }
        if (operands[1]) {
            this._addInput(block, 'OPERAND2', this._createTextBlock(operands[1]));
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
            this._addInput(block, 'OPERAND1', this._createTextBlock(operands[0]));
        }
        if (operands[1]) {
            this._addInput(block, 'OPERAND2', this._createTextBlock(operands[1]));
        }
        return block;
    }

    _onConst (node) {
        this._checkNumChildren(node, 2);

        return this._createRubyExpressionBlock(this._getSource(node));
    }

    _onLvar (node) {
        this._checkNumChildren(node, 1);

        const varName = node.children[0].toString();
        if (this._context.localVariables.hasOwnProperty(varName)) {
            const variable = this._context.localVariables[varName];
            let opcode;
            let blockType;
            if (variable.isBoolean) {
                opcode = 'argument_reporter_boolean';
                blockType = 'value_boolean';
            } else {
                opcode = 'argument_reporter_string_number';
                blockType = 'value';
            }
            const block = this._createBlock(opcode, blockType, {
                fields: {
                    VALUE: {
                        name: 'VALUE',
                        value: variable.name
                    }
                }
            });
            if (this._context.argumentBlocks.hasOwnProperty(variable.id)) {
                this._context.argumentBlocks[variable.id].push(block.id);
            } else {
                this._context.argumentBlocks[variable.id] = [block.id];
            }
            return block;
        }

        return varName;
    }

    _onIvar (node) {
        this._checkNumChildren(node, 1);

        const variable = this._findOrCreateVariable(node.children[0]);
        if (variable.scope !== 'local') {
            return this._createBlock('data_variable', 'value', {
                fields: {
                    VARIABLE: {
                        name: 'VARIABLE',
                        id: variable.id,
                        value: variable.name,
                        variableType: variable.type
                    }
                }
            });
        }

        return node.children[0].toString();
    }

    _onGvar (node) {
        return this._onIvar(node);
    }

    _onIvasgn (node) {
        this._checkNumChildren(node, [1, 2]);

        if (node.children.length === 1) {
            return node.children[0].toString();
        }

        const saved = this._saveContext();

        const variable = this._findOrCreateVariable(node.children[0]);
        if (variable.scope !== 'local') {
            const rh = this._process(node.children[1]);
            if (this._isNumberOrBlock(rh) || this._isStringOrBlock(rh)) {
                const block = this._createBlock('data_setvariableto', 'statement', {
                    fields: {
                        VARIABLE: {
                            name: 'VARIABLE',
                            id: variable.id,
                            value: variable.name,
                            variableType: variable.type
                        }
                    }
                });
                this._addTextInput(block, 'VALUE', _.isNumber(rh) ? rh.toString() : rh, '0');
                return block;
            }
        }

        this._restoreContext(saved);

        return this._createRubyStatementBlock(this._getSource(node));
    }

    _onLvasgn (node) {
        return this._onIvasgn(node);
    }

    _onGvasgn (node) {
        return this._onIvasgn(node);
    }

    _onDefs (node) {
        this._checkNumChildren(node, 4);

        const saved = this._saveContext();

        const receiver = this._process(node.children[0]);
        if (receiver === Self) {
            const procedureName = node.children[1].toString();
            const block = this._createBlock('procedures_definition', 'hat', {
                topLevel: true
            });
            const procedure = this._createProcedure(procedureName);

            const customBlock = this._createBlock('procedures_prototype', 'statement', {
                shadow: true
            });
            this._addInput(block, 'custom_block', customBlock);

            this._context.localVariables = {};
            this._process(node.children[2]).forEach(n => {
                n = n.toString();
                procedure.argumentNames.push(n);
                procedure.argumentVariables.push(this._findOrCreateVariable(n));
                procedure.procCode.push('%s');
                procedure.argumentDefaults.push('');
                const inputId = Blockly.utils.genUid();
                procedure.argumentIds.push(inputId);
                const inputBlock = this._createBlock('argument_reporter_string_number', 'value', {
                    fields: {
                        VALUE: {
                            name: 'VALUE',
                            value: n
                        }
                    },
                    shadow: true
                });
                this._addInput(customBlock, inputId, inputBlock);
                procedure.argumentBlocks.push(inputBlock);
            });

            let body = this._process(node.children[3]);
            if (!_.isArray(body)) {
                body = [body];
            }
            if (this._isBlock(body[0])) {
                block.next = body[0].id;
                body[0].parent = block.id;
            }

            const booleanIndexes = [];
            procedure.argumentVariables.forEach((v, i) => {
                if (v.isBoolean) {
                    booleanIndexes.push(i);
                    procedure.procCode[i + 1] = '%b';
                    procedure.argumentDefaults[i] = 'false';
                    procedure.argumentBlocks[i].opcode = 'argument_reporter_boolean';
                    this._setBlockType(procedure.argumentBlocks[i], 'value_boolean');
                }
            });

            if (booleanIndexes.length > 0 &&
                this._context.procedureCallBlocks.hasOwnProperty(procedure.id)) {
                this._context.procedureCallBlocks[procedure.id].forEach(id => {
                    const b = this._context.blocks[id];
                    b.mutation.proccode = procedure.procCode.join(' ');
                    booleanIndexes.forEach(booleanIndex => {
                        const input = b.inputs[procedure.argumentIds[booleanIndex]];
                        const inputBlock = this._context.blocks[input.block];
                        if (inputBlock) {
                            if (!inputBlock.shadow && input.shadow) {
                                delete this._context.blocks[input.shadow];
                                input.shadow = null;
                            }
                        }
                    });
                });
            }

            customBlock.mutation = {
                argumentdefaults: JSON.stringify(procedure.argumentDefaults),
                argumentids: JSON.stringify(procedure.argumentIds),
                argumentnames: JSON.stringify(procedure.argumentNames),
                children: [],
                proccode: procedure.procCode.join(' '),
                tagName: 'mutation',
                warp: 'false'
            };

            this._restoreContext({localVariables: saved.localVariables});

            return block;
        }

        this._restoreContext(saved);

        return this._createRubyStatementBlock(this._getSource(node));
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
