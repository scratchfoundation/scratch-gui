/* global Opal */
import _ from 'lodash';
import Variable from 'scratch-vm/src/engine/variable';
import {KeyOptions} from './constants';

const GreaterThanMenu = [
    'LOUDNESS',
    'TIMER'
];

/**
 * Event converter
 */
const EventConverter = {
    // eslint-disable-next-line no-unused-vars
    onSend: function (receiver, name, args, rubyBlockArgs, rubyBlock) {
        let block;
        if ((this._isSelf(receiver) || receiver === Opal.nil) &&
            name === 'when' &&
            args.length >= 1 && args[0].type === 'sym' &&
            rubyBlockArgs && rubyBlockArgs.length === 0 &&
            rubyBlock) {
            switch (args[0].value) {
            case 'flag_clicked':
            case 'clicked':
                if (args.length === 1) {
                    let opcode;
                    switch (args[0].value) {
                    case 'flag_clicked':
                        opcode = 'event_whenflagclicked';
                        break;
                    case 'clicked':
                        if (this._context.target && this._context.target.isStage) {
                            opcode = 'event_whenstageclicked';
                        } else {
                            opcode = 'event_whenthisspriteclicked';
                        }
                        break;
                    }
                    block = this._createBlock(opcode, 'hat');
                    this._setParent(rubyBlock, block);
                }
                break;
            case 'key_pressed':
                if (args.length === 2 && this._isString(args[1]) && KeyOptions.indexOf(args[1].toString()) >= 0) {
                    block = this._createBlock('event_whenkeypressed', 'hat');
                    this._addField(block, 'KEY_OPTION', args[1]);
                    this._setParent(rubyBlock, block);
                }
                break;
            case 'backdrop_switches':
                if (args.length === 2 && this._isString(args[1])) {
                    block = this._createBlock('event_whenbackdropswitchesto', 'hat');
                    this._addField(block, 'BACKDROP', args[1]);
                    this._setParent(rubyBlock, block);
                }
                break;
            case 'greater_than':
                if (args.length === 3 &&
                    this._isString(args[1]) && GreaterThanMenu.indexOf(args[1].toString().toUpperCase()) >= 0 &&
                    this._isNumberOrBlock(args[2])) {
                    block = this._createBlock('event_whengreaterthan', 'hat');
                    this._addField(block, 'WHENGREATERTHANMENU', args[1].toString().toUpperCase());
                    this._addNumberInput(block, 'VALUE', 'math_number', args[2], 10);
                    this._setParent(rubyBlock, block);
                }
                break;
            case 'receive':
                if (args.length === 2 && this._isString(args[1])) {
                    const broadcastMsg = this._lookupOrCreateBroadcastMsg(args[1]);
                    block = this._createBlock('event_whenbroadcastreceived', 'hat');
                    this._addField(block, 'BROADCAST_OPTION', broadcastMsg.name, {
                        id: broadcastMsg.id,
                        variableType: Variable.BROADCAST_MESSAGE_TYPE
                    });
                    this._setParent(rubyBlock, block);
                }
                break;
            }
        } else if (this._isSelf(receiver) || receiver === Opal.nil) {
            switch (name) {
            case 'broadcast':
            case 'broadcast_and_wait':
                if (args.length === 1 && this._isStringOrBlock(args[0]) && !rubyBlock) {
                    let opcode;
                    if (name === 'broadcast') {
                        opcode = 'event_broadcast';
                    } else {
                        opcode = 'event_broadcastandwait';
                    }
                    const menuBlock = this._createBlock('event_broadcast_menu', 'value', {
                        shadow: true
                    });
                    let broadcastMsg;
                    let inputBlock;
                    let shadowBlock;
                    if (this._isString(args[0])) {
                        broadcastMsg = this._lookupOrCreateBroadcastMsg(args[0]);
                        inputBlock = menuBlock;
                        shadowBlock = menuBlock;
                    } else {
                        broadcastMsg = this._defaultBroadcastMsg();
                        inputBlock = args[0];
                        shadowBlock = menuBlock;
                    }
                    this._addField(menuBlock, 'BROADCAST_OPTION', broadcastMsg.name, {
                        id: broadcastMsg.id,
                        variableType: Variable.BROADCAST_MESSAGE_TYPE
                    });

                    block = this._createBlock(opcode, 'statement');
                    this._addInput(block, 'BROADCAST_INPUT', inputBlock, shadowBlock);
                }
                break;
            }
        }

        return block;
    }
};

export default EventConverter;
