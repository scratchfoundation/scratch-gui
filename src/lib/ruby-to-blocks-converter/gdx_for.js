/* global Opal */
import _ from 'lodash';

/**
 * GdxFor converter
 */
const GdxForConverter = {
    // eslint-disable-next-line no-unused-vars
    onSend: function (receiver, name, args, rubyBlockArgs, rubyBlock) {
        let block;
        if ((this._isSelf(receiver) || receiver === Opal.nil) && !rubyBlock) {
            switch (name) {
            case 'gdx_for_acceleration':
                if (args.length === 1 && this._isStringOrBlock(args[0])) {
                    block = this._createBlock('gdxfor_getAcceleration', 'value');
                    this._addInput(
                        block,
                        'DIRECTION',
                        this._createFieldBlock('gdxfor_menu_axisOptions', 'axisOptions', args[0])
                    );
                }
                break;
            case 'gdx_for_force':
                if (args.length === 0){
                    block = this._createBlock('gdxfor_getForce', 'value');
                }
                break;
            case 'gdx_for_tilted?':
                if (args.length === 1 && this._isStringOrBlock(args[0])) {
                    block = this._createBlock('gdxfor_isTilted', 'value');
                    this._addInput(
                        block,
                        'TILT',
                        this._createFieldBlock('gdxfor_menu_tiltAnyOptions', 'tiltAnyOptions', args[0])
                    );
                }
                break;
            case 'gdx_for_tilt_angle':
                if (args.length === 1 && this._isStringOrBlock(args[0])) {
                    block = this._createBlock('gdxfor_getTilt', 'value');
                    this._addInput(
                        block,
                        'TILT',
                        this._createFieldBlock('gdxfor_menu_tiltOptions', 'tiltOptions', args[0])
                    );
                }
                break;
            case 'gdx_for_falling?':
                if (args.length === 0) {
                    block = this._createBlock('gdxfor_isFreeFalling', 'value');
                }
                break;
            case 'gdx_for_spin_speed':
                if (args.length === 1 && this._isStringOrBlock(args[0])){
                    block = this._createBlock('gdxfor_getSpinSpeed', 'value');
                    this._addInput(
                        block,
                        'DIRECTION',
                        this._createFieldBlock('gdxfor_menu_axisOptions', 'axisOptions', args[0])
                    );
                }
                break;
            }
        } else if ((this._isSelf(receiver) || receiver === Opal.nil) &&
            name === 'when' &&
            args.length === 2 && args[0].type === 'sym' &&
            this._isStringOrBlock(args[1]) &&
            rubyBlockArgs && rubyBlockArgs.length === 0 &&
            rubyBlock) {
            switch (args[0].value) {
            case 'gdx_for_gesture':
                block = this._createBlock('gdxfor_whenGesture', 'hat');
                this._addInput(
                    block,
                    'GESTURE',
                    this._createFieldBlock('gdxfor_menu_gestureOptions', 'gestureOptions', args[1])
                );
                this._setParent(rubyBlock, block);
                break;
            case 'gdx_force_sensor':
                block = this._createBlock('gdxfor_whenForcePushedOrPulled', 'hat');
                this._addInput(
                    block,
                    'PUSH_PULL',
                    this._createFieldBlock('gdxfor_menu_pushPullOptions', 'pushPullOptions', args[1])
                );
                this._setParent(rubyBlock, block);
                break;
            case 'gdx_for_tilted':
                block = this._createBlock('gdxfor_whenTilted', 'hat');
                this._addInput(
                    block,
                    'TILT',
                    this._createFieldBlock('gdxfor_menu_tiltAnyOptions', 'tiltAnyOptions', args[1])
                );
                this._setParent(rubyBlock, block);
                break;
            }
        }
        return block;
    }
};

export default GdxForConverter;
