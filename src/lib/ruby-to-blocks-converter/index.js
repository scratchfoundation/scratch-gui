/* global Opal */
import _ from 'lodash';
import log from '../log';
import Blockly from 'scratch-blocks';
import RubyParser from '../ruby-parser';
import Variable from 'scratch-vm/src/engine/variable';

import Primitive from './primitive';
import {RubyToBlocksConverterError} from './errors';

import MotionConverter from './motion';
import LooksConverter from './looks';
import SoundConverter from './sound';
import EventConverter from './event';
import ControlConverter from './control';
import SensingConverter from './sensing';
import OperatorsConverter from './operators';
import VariablesConverter from './variables';
import MyBlocksConverter from './my-blocks';
import MusicConverter from './music';
import PenConverter from './pen';
import MicroBitConverter from './microbit';
import EV3Converter from './ev3';
import Wedo2Converter from './wedo2';
import GdxForConverter from './gdx_for';

/* eslint-disable no-invalid-this */
const ColorRegexp = /^#[0-9a-fA-F]{6}$/;

/**
 * Class for a block converter that translates ruby code into the blocks.
 */
class RubyToBlocksConverter {
    constructor (vm) {
        this.vm = vm;
        this._converters = [
            MusicConverter,
            PenConverter,
            MicroBitConverter,
            EV3Converter,
            Wedo2Converter,
            GdxForConverter,

            MotionConverter,
            LooksConverter,
            SoundConverter,
            EventConverter,
            ControlConverter,
            SensingConverter,
            OperatorsConverter,
            VariablesConverter,
            MyBlocksConverter
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

    get broadcastMsgs () {
        return this._context.broadcastMsgs;
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
            broadcastMsgs: {},
            procedures: {}
        };
        if (this.vm && this.vm.runtime && this.vm.runtime.getTargetForStage) {
            this._loadVariables(this.vm.runtime.getTargetForStage());
        }
    }

    targetCodeToBlocks (target, code) {
        this.reset();
        this._setTarget(target);
        this._loadVariables(target);
        try {
            const root = RubyParser.$parse(code);
            let blocks = this._process(root);
            if (blocks === null || blocks === Opal.nil) {
                return true;
            }
            if (!_.isArray(blocks)) {
                blocks = [blocks];
            }
            blocks.forEach(block => {
                if (this._isBlock(block)) {
                    block.topLevel = true;
                } else if (block instanceof Primitive) {
                    throw new RubyToBlocksConverterError(
                        block.node,
                        `could not convert primitive: ${this._getSource(block.node)}`
                    );
                } else {
                    throw new Error(`invalid block: ${block}`);
                }
            });
            Object.keys(this._context.blocks).forEach(blockId => {
                const block = this._context.blocks[blockId];
                if (this._isRubyBlock(block)) {
                    throw new RubyToBlocksConverterError(
                        block.node,
                        `could not convert ${block.opcode}: ${this._getSource(block.node)}`
                    );
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

        Object.keys(this._context.broadcastMsgs).forEach(name => {
            const broadcastMsg = this._context.broadcastMsgs[name];
            if (!stage.variables.hasOwnProperty(broadcastMsg.id)) {
                stage.createVariable(broadcastMsg.id, broadcastMsg.name, Variable.BROADCAST_MESSAGE_TYPE);
            }
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
            'broadcastMsgs',
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

    _setTarget (target) {
        this._context.target = target;
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
            } else if (variable.type === Variable.BROADCAST_MESSAGE_TYPE) {
                storeName = 'broadcastMsgs';
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

    _isSelf (block) {
        return block instanceof Primitive && block.type === 'self';
    }

    _isString (value) {
        return _.isString(value) || (value && value.type === 'str');
    }

    _isNumber (value) {
        return _.isNumber(value) || (value && (value.type === 'int' || value.type === 'float'));
    }

    _isFalse (value) {
        return value === false || (value && value.type === 'false');
    }

    _isArray (value) {
        return _.isArray(value) || (value && value.type === 'array');
    }

    _isHash (value) {
        return value && value.type === 'hash';
    }

    _isConst (value) {
        return value && value.type === 'const';
    }

    _isBlock (block) {
        try {
            return block.hasOwnProperty('opcode');
        } catch (e) {
            return false;
        }
    }

    _isStatementBlock (block) {
        const blockType = this._getBlockType(block);
        return blockType === 'statement' || blockType === 'terminate';
    }

    _isValueBlock (block) {
        if (!this._isBlock(block)) {
            return false;
        }
        return /^value/.test(this._getBlockType(block));
    }

    _isNumberOrBlock (numberOrBlock) {
        return this._isNumber(numberOrBlock) || this._isValueBlock(numberOrBlock);
    }

    _isStringOrBlock (stringOrBlock) {
        return this._isString(stringOrBlock) || this._isValueBlock(stringOrBlock);
    }

    _isNumberOrStringOrBlock (block) {
        return this._isNumber(block) || this._isString(block) || this._isValueBlock(block);
    }

    _isColorOrBlock (colorOrBlock) {
        return this._isBlock(colorOrBlock) || (this._isString(colorOrBlock) && ColorRegexp.test(colorOrBlock));
    }

    _isFalseOrBooleanBlock (block) {
        if (this._isFalse(block)) {
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
        return /_variable$/.test(this._getBlockType(block));
    }

    _isRubyExpression (block) {
        return this._isBlock(block) && block.opcode === 'ruby_expression';
    }

    _getRubyExpression (block) {
        if (this._isRubyExpression(block)) {
            const textBlock = this._context.blocks[block.inputs.EXPRESSION.block];
            return textBlock.fields.TEXT.value;
        }
        return null;
    }

    _isRubyStatement (block) {
        return this._isBlock(block) && block.opcode === 'ruby_statement';
    }

    _isRubyBlock (block) {
        return this._isBlock(block) && block.opcode.match(/^ruby_/);
    }

    _getRubyStatement (block) {
        if (this._isRubyStatement(block)) {
            const textBlock = this._context.blocks[block.inputs.STATEMENT.block];
            return textBlock.fields.TEXT.value;
        }
        return null;
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
        if (this._isBlock(value)) {
            return value;
        }
        return this._createBlock(opcode, 'value', {
            fields: {
                [fieldName]: {
                    name: fieldName,
                    id: void 0,
                    value: value.toString()
                }
            },
            shadow: true
        });
    }

    _createTextBlock (value) {
        if (this._isString(value)) {
            return this._createFieldBlock('text', 'TEXT', value.toString());
        }
        return value;
    }

    _createNumberBlock (opcode, value) {
        if (this._isNumber(value) || value === '') {
            return this._createFieldBlock(opcode, 'NUM', value.toString());
        }
        return value;
    }

    _createRubyExpressionBlock (expression, node) {
        const block = this._createBlock('ruby_expression', 'value_boolean');
        block.node = node;
        this._addInput(block, 'EXPRESSION', this._createTextBlock(expression));
        return block;
    }

    _createRubyStatementBlock (statement, node) {
        const block = this._createBlock('ruby_statement', 'statement');
        block.node = node;
        this._addInput(block, 'STATEMENT', this._createTextBlock(statement));
        return block;
    }

    _addField (block, name, value, attributes = {}) {
        if (!this._isBlock(block)) {
            return;
        }
        block.fields[name] = Object.assign({
            name: name,
            value: value.toString()
        }, attributes);
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
        if (!this._isNumber(inputValue)) {
            shadowBlock = this._createNumberBlock(opcode, shadowValue);
        }
        this._addInput(block, name, this._createNumberBlock(opcode, inputValue), shadowBlock);
    }

    _addNoteInput (block, name, inputValue, shadowValue) {
        let shadowBlock;
        const opcode = 'note';
        if (!this._isNumber(inputValue)) {
            shadowBlock = this._createNoteBlock(opcode, shadowValue);
        }
        this._addInput(block, name, this._createNoteBlock(opcode, inputValue), shadowBlock);
    }

    _createNoteBlock (opcode, value) {
        if (this._isNumber(value) || value === '') {
            return this._createFieldBlock(opcode, 'NOTE', value.toString());
        }
        return value;
    }

    _addTextInput (block, name, inputValue, shadowValue) {
        let shadowBlock;
        if (!this._isString(inputValue)) {
            shadowBlock = this._createTextBlock(shadowValue);
        }
        this._addInput(block, name, this._createTextBlock(inputValue), shadowBlock);
    }

    _addFieldInput (block, name, opcode, fieldName, inputValue, shadowValue) {
        let shadowBlock;
        if (!this._isString(inputValue)) {
            shadowBlock = this._createFieldBlock(opcode, fieldName, shadowValue);
        }
        this._addInput(block, name, this._createFieldBlock(opcode, fieldName, inputValue), shadowBlock);
    }

    _addSubstack (block, substackBlock, num = 1) {
        let name = 'SUBSTACK';
        if (num > 1) {
            name = `${name}${num}`;
        }
        let substackBlockId = null;
        if (this._isBlock(substackBlock)) {
            substackBlock.parent = block.id;
            substackBlockId = substackBlock.id;
        }
        block.inputs[name] = {
            name: name,
            block: substackBlockId,
            shadow: null
        };
    }

    _lookupOrCreateVariableOrList (name, type) {
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

    _lookupOrCreateVariable (name) {
        return this._lookupOrCreateVariableOrList(name, Variable.SCALAR_TYPE);
    }

    _lookupOrCreateList (name) {
        return this._lookupOrCreateVariableOrList(name, Variable.LIST_TYPE);
    }

    _lookupOrCreateBroadcastMsg (name) {
        name = name.toString();
        const key = name.toLowerCase();
        let broadcastMsg = this._context.broadcastMsgs[key];
        if (!broadcastMsg) {
            broadcastMsg = {
                id: Blockly.utils.genUid(),
                name: name,
                scope: 'global'
            };
            this._context.broadcastMsgs[key] = broadcastMsg;
        }
        return broadcastMsg;
    }

    _defaultBroadcastMsg () {
        const defaultName = 'message1';
        const keys = Object.keys(this._context.broadcastMsgs);
        if (keys.length === 0) {
            return this._lookupOrCreateBroadcastMsg(defaultName);
        }
        if (this._context.broadcastMsgs.hasOwnProperty(defaultName)) {
            return this._context.broadcastMsgs[defaultName];
        }
        return this._context.broadcastMsgs[keys[0]];
    }

    _lookupProcedure (name) {
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

    _lastBlock (block) {
        let b = block;
        while (b.next) {
            b = this._context.blocks[b.next];
        }
        return b;
    }

    _popWaitBlock (block) {
        if (!block) {
            return null;
        }

        const b = this._lastBlock(block);
        if (b.opcode === 'ruby_statement') {
            const textBlock = this._context.blocks[b.inputs.STATEMENT.block];
            if (textBlock.fields.TEXT.value === 'wait') {
                if (b.parent) {
                    const parent = this._context.blocks[b.parent];
                    if (parent.next === b.id) {
                        parent.next = null;
                    }
                }
                delete this._context.blocks[b.id];
                return b;
            }
        }
        return null;
    }

    _getBlockType (block) {
        if (this._isBlock(block)) {
            return this._context.blockTypes[block.id];
        }
        return 'primitive';
    }

    _setBlockType (block, type) {
        this._context.blockTypes[block.id] = type;
    }

    _changeBlock (block, opcode, blockType) {
        block.opcode = opcode;
        this._setBlockType(block, blockType);
        return block;
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

    _setParent (block, parent) {
        if (this._isBlock(block)) {
            block.parent = parent.id;
            parent.next = block.id;
        }
    }

    _matchRubyExpression (block, regexp) {
        if (!this._isBlock(block) || block.opcode !== 'ruby_expression') {
            return false;
        }
        const textBlock = this._context.blocks[block.inputs.EXPRESSION.block];
        return regexp.test(textBlock.fields.TEXT.value);
    }

    _equalRubyExpression (block, expression) {
        if (!this._isBlock(block) || block.opcode !== 'ruby_expression') {
            return false;
        }
        const textBlock = this._context.blocks[block.inputs.EXPRESSION.block];
        return expression.toString() === textBlock.fields.TEXT.value;
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

    _processStatement (node) {
        let blocks = this._process(node);
        if (!_.isArray(blocks)) {
            blocks = [blocks];
        }
        const block = blocks[0];
        if (blocks.length >= 2 || (block !== Opal.nil && !this._isStatementBlock(block))) {
            throw new RubyToBlocksConverterError(node, 'include not statement blocks');
        }
        return block;
    }

    _processCondition (node) {
        let cond = this._process(node);
        if (_.isArray(cond) && cond.length === 1) {
            cond = cond[0];
        }
        if (!this._isFalseOrBooleanBlock(cond)) {
            throw new RubyToBlocksConverterError(
                node,
                `condition is not boolean: ${this._getSource(node)}`
            );
        }
        return cond;
    }

    _onBegin (node) {
        const blocks = [];
        node.children.forEach(childNode => {
            const block = this._process(childNode);
            if (_.isArray(block)) {
                block.forEach(b => {
                    blocks.push(b);
                });
            } else {
                blocks.push(block);
            }
        });

        let prevBlock = null;
        const result = [];
        blocks.forEach(block => {
            switch (this._getBlockType(block)) {
            case 'statement':
                if (prevBlock) {
                    prevBlock.next = block.id;
                    block.parent = prevBlock.id;
                } else {
                    result.push(block);
                }
                if (block.next) {
                    const b = this._lastBlock(block);
                    if (this._getBlockType(b) === 'statement') {
                        prevBlock = b;
                    } else {
                        prevBlock = null;
                    }
                } else {
                    prevBlock = block;
                }
                break;
            case 'terminate':
                if (prevBlock) {
                    prevBlock.next = block.id;
                    block.parent = prevBlock.id;
                } else {
                    result.push(block);
                }
                prevBlock = null;
                break;
            case 'value':
            case 'value_boolean':
            case 'value_variable':
            case 'value_boolean_variable':
            case 'hat':
            case 'primitive':
                result.push(block);
                prevBlock = null;
            }
        });
        return result;
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
            rubyBlock = this._processStatement(rubyBlockNode);
        }

        let block = this._callConvertersHandler('onSend', receiver, name, args, rubyBlockArgs, rubyBlock, node);
        if (!block) {
            if ((this._isSelf(receiver) || receiver === Opal.nil) && !rubyBlock) {
                switch (name) {
                case 'wait':
                    if (args.length === 0) {
                        block = this._createRubyStatementBlock('wait', node);
                    }
                    break;
                }
            }
        }

        if (!block) {
            this._restoreContext(saved);

            if (rubyBlockNode) {
                block = this._createBlock('ruby_statement_with_block', 'statement');
                block.node = node;
                this._addTextInput(block, 'STATEMENT', this._getSource(node));
                this._addTextInput(block, 'ARGS', this._getSource(rubyBlockArgsNode));
                this._addSubstack(block, this._processStatement(rubyBlockNode));
            } else {
                block = this._createRubyStatementBlock(this._getSource(node), node);
            }
        }
        return block;
    }

    _onSelf (node) {
        return new Primitive('self', 'self', node);
    }

    _onSym (node) {
        this._checkNumChildren(node, 1);

        return new Primitive('sym', node.children[0].toString(), node);
    }

    _onStr (node) {
        this._checkNumChildren(node, 1);

        return new Primitive('str', node.children[0].toString(), node);
    }

    _onInt (node) {
        this._checkNumChildren(node, 1);

        return new Primitive('int', node.children[0], node);
    }

    _onFloat (node) {
        this._checkNumChildren(node, 1);

        return new Primitive('float', node.children[0], node);
    }

    _onTrue (node) {
        return new Primitive('true', true, node);
    }

    _onFalse (node) {
        return new Primitive('false', true, node);
    }

    _onArray (node) {
        return new Primitive('array', node.children.map(childNode => this._process(childNode)), node);
    }

    _onHash (node) {
        return new Primitive('hash', new Map(node.children.map(childNode => this._process(childNode))), node);
    }

    _onPair (node) {
        this._checkNumChildren(node, 2);

        return node.children.map(childNode => this._process(childNode));
    }

    _onIrange (node) {
        this._checkNumChildren(node, 2);

        const args = node.children.map(childNode => this._process(childNode));
        const block = this._createBlock('ruby_range', 'value_boolean');
        block.node = node;
        this._addNumberInput(block, 'FROM', 'math_number', args[0], 1);
        this._addNumberInput(block, 'TO', 'math_number', args[1], 10);
        return block;
    }

    _onErange (node) {
        this._checkNumChildren(node, 2);

        const args = node.children.map(childNode => this._process(childNode));
        const block = this._createBlock('ruby_exclude_range', 'value_boolean');
        block.node = node;
        this._addNumberInput(block, 'FROM', 'math_number', args[0], 1);
        this._addNumberInput(block, 'TO', 'math_number', args[1], 10);
        return block;
    }

    _onConst (node) {
        this._checkNumChildren(node, 2);

        const value = {
            scope: this._process(node.children[0]),
            name: node.children[1].toString()
        };
        return new Primitive('const', value, node);
    }

    _onArgs (node) {
        return node.children.map(childNode => this._process(childNode));
    }

    _onArg (node) {
        this._checkNumChildren(node, 1);

        return node.children[0];
    }

    _onIf (node) {
        this._checkNumChildren(node, 3);

        const saved = this._saveContext();

        const cond = this._processCondition(node.children[0]);
        const statement = this._processStatement(node.children[1]);
        let elseStatement;
        if (node.children[2] !== Opal.nil ||
            (node.$loc().$else && node.$loc().$else() !== Opal.nil)) {
            elseStatement = this._processStatement(node.children[2]);
        }

        let block = this._callConvertersHandler('onIf', cond, statement, elseStatement);
        if (!block) {
            this._restoreContext(saved);

            block = this._createRubyStatementBlock(this._getSource(node), node);
        }
        return block;
    }

    _onUntil (node) {
        this._checkNumChildren(node, 2);

        const saved = this._saveContext();

        const cond = this._processCondition(node.children[0]);
        const statement = this._processStatement(node.children[1]);

        let block = this._callConvertersHandler('onUntil', cond, statement);
        if (!block) {
            this._restoreContext(saved);

            block = this._createRubyStatementBlock(this._getSource(node), node);
        }
        return block;
    }

    _onOpAsgn (node) {
        this._checkNumChildren(node, 3);

        const saved = this._saveContext();

        const lh = this._process(node.children[0]);
        const operator = node.children[1].toString();
        const rh = this._process(node.children[2]);

        let block = this._callConvertersHandler('onOpAsgn', lh, operator, rh);
        if (!block) {
            this._restoreContext(saved);

            block = this._createRubyStatementBlock(this._getSource(node), node);
        }

        return block;
    }

    _onAnd (node) {
        this._checkNumChildren(node, 2);

        const operands = node.children.map(childNode => this._processCondition(childNode));
        return this._callConvertersHandler('onAnd', operands);
    }

    _onOr (node) {
        this._checkNumChildren(node, 2);

        const operands = node.children.map(childNode => this._processCondition(childNode));
        return this._callConvertersHandler('onOr', operands);
    }

    _onVar (node, scope) {
        this._checkNumChildren(node, 1);

        const variable = this._lookupOrCreateVariable(node.children[0]);
        const block = this._callConvertersHandler('onVar', scope, variable);
        if (block) {
            return block;
        }

        return node.children[0].toString();
    }

    _onGvar (node) {
        return this._onVar(node, 'global');
    }

    _onIvar (node) {
        return this._onVar(node, 'instance');
    }

    _onLvar (node) {
        this._checkNumChildren(node, 1);

        const varName = node.children[0].toString();
        if (this._context.localVariables.hasOwnProperty(varName)) {
            const variable = this._context.localVariables[varName];
            const block = this._callConvertersHandler('onVar', 'local', variable);
            if (block) {
                return block;
            }
        }

        return varName;
    }

    _onVasgn (node, scope) {
        this._checkNumChildren(node, [1, 2]);

        if (node.children.length === 1) {
            return node.children[0].toString();
        }

        const saved = this._saveContext();

        const variable = this._lookupOrCreateVariable(node.children[0]);
        const rh = this._process(node.children[1]);
        let block = this._callConvertersHandler('onVasgn', scope, variable, rh);
        if (!block) {
            this._restoreContext(saved);

            block = this._createRubyStatementBlock(this._getSource(node), node);
        }

        return block;
    }

    _onGvasgn (node) {
        return this._onVasgn(node, 'global');
    }

    _onIvasgn (node) {
        return this._onVasgn(node, 'instance');
    }

    _onLvasgn (node) {
        return this._onVasgn(node, 'local');
    }

    _onDefs (node) {
        this._checkNumChildren(node, 4);

        const saved = this._saveContext();

        let block = this._callConvertersHandler('onDefs', node, saved);
        if (!block) {
            this._restoreContext(saved);

            block = this._createRubyStatementBlock(this._getSource(node), node);
        }

        return block;
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
