import PropTypes from 'prop-types';
import ScratchBlocks from 'scratch-blocks';

const SET_GENERATOR = 'smalruby3-gui/ruby-codes/SET_GENERATOR';
const UPDATE_RUBYCODE = 'smalruby3-gui/ruby-codes/UPDATE_RUBYCODE';
const REMOVE_RUBYCODE = 'smalruby3-gui/ruby-codes/REMOVE_RUBYCODE';

const initialState = {
    generator: null,
    rubyCode: {}
};

const rubyCodesShape = PropTypes.shape({
    generator: PropTypes.shape({
        workspaceToCode: PropTypes.func

    }),
    rubyCode: PropTypes.objectOf(PropTypes.shape({
        target: PropTypes.instanceOf(ScratchBlocks.Generator),
        code: PropTypes.string
    }))
});

const reducer = function (state, action) {
    let newRubyCode;
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case SET_GENERATOR:
        return {
            generator: action.generator,
            rubyCode: state.rubyCode
        };
    case UPDATE_RUBYCODE:
        newRubyCode = Object.assign({}, state.rubyCode);
        newRubyCode[action.target.id] = {
            target: action.target,
            code: state.generator.workspaceToCode(action.workspace, action.target)
        };
        return {
            generator: state.generator,
            rubyCode: newRubyCode
        };
    case REMOVE_RUBYCODE:
        newRubyCode = Object.assign({}, state.rubyCode);
        delete newRubyCode[action.target.id];
        return {
            generator: state.generator,
            rubyCode: newRubyCode
        };
    default:
        return state;
    }
};

const setGenerator = function (generator) {
    return {
        type: SET_GENERATOR,
        generator: generator
    };
};

const updateRubyCode = function (target, workspace) {
    return {
        type: UPDATE_RUBYCODE,
        target: target,
        workspace: workspace
    };
};

const removeRubyCode = function (target) {
    return {
        type: REMOVE_RUBYCODE,
        target: target
    };
};

export {
    reducer as default,
    initialState as rubyCodesInitialState,
    rubyCodesShape,
    setGenerator,
    updateRubyCode,
    removeRubyCode
};
