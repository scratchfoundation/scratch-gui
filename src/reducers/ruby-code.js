import PropTypes from 'prop-types';
import RubyGenerator from '../lib/ruby-generator';

const UPDATE_RUBYCODE = 'smalruby3-gui/ruby-code/UPDATE_RUBYCODE';
const UPDATE_RUBYCODE_TARGET = 'smalruby3-gui/ruby-code/UPDATE_RUBYCODE_TARGET';
const UPDATE_RUBYCODE_ERRORS = 'smalruby3-gui/ruby-code/UPDATE_RUBYCODE_ERRORS';
const CONVERTED_RUBYCODE = 'smalruby3-gui/ruby-code/CONVERTED_RUBYCODE';

const initialState = {
    target: null,
    code: '',
    modified: false,
    errors: []
};

const rubyCodeShape = PropTypes.shape({
    target: PropTypes.shape({
        id: PropTypes.string
    }),
    code: PropTypes.string,
    modified: PropTypes.bool,
    errors: PropTypes.arrayOf(PropTypes.shape({
        row: PropTypes.number,
        type: PropTypes.oneOf(['error']),
        text: PropTypes.string
    }))
});

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case UPDATE_RUBYCODE:
        return Object.assign({}, state, {
            code: action.code,
            modified: true
        });
    case UPDATE_RUBYCODE_TARGET:
        return Object.assign({}, state, {
            target: action.target,
            code: RubyGenerator.targetToCode(action.target),
            modified: false
        });
    case UPDATE_RUBYCODE_ERRORS:
        return Object.assign({}, state, {
            errors: action.errors
        });
    case CONVERTED_RUBYCODE:
        return Object.assign({}, state, {
            modified: false
        });
    default:
        return state;
    }
};

const updateRubyCode = function (code) {
    return {
        type: UPDATE_RUBYCODE,
        code: code
    };
};

const updateRubyCodeTarget = function (target) {
    return {
        type: UPDATE_RUBYCODE_TARGET,
        target: target
    };
};

const updateRubyCodeErrors = function (errors) {
    return {
        type: UPDATE_RUBYCODE_ERRORS,
        errors: errors
    };
};

const convertedRubyCode = function () {
    return {
        type: CONVERTED_RUBYCODE
    };
};

export {
    reducer as default,
    initialState as rubyCodeInitialState,
    rubyCodeShape,
    updateRubyCode,
    updateRubyCodeTarget,
    updateRubyCodeErrors,
    convertedRubyCode
};
