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
    errors: [],
    markers: []
};

const rubyCodeShape = PropTypes.shape({
    target: PropTypes.shape({
        id: PropTypes.string
    }),
    code: PropTypes.string,
    modified: PropTypes.bool,
    errors: PropTypes.arrayOf(PropTypes.shape({
        row: PropTypes.number,
        column: PropTypes.number,
        type: PropTypes.oneOf(['error']),
        text: PropTypes.string,
        source: PropTypes.string
    })),
    markers: PropTypes.arrayOf(PropTypes.shape({
        startRow: PropTypes.number,
        startCol: PropTypes.number,
        endRow: PropTypes.number,
        endCol: PropTypes.number,
        type: PropTypes.string,
        className: PropTypes.string,
        source: PropTypes.string
    }))
});

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case UPDATE_RUBYCODE:
        return Object.assign({}, state, {
            modified: true,
            code: action.code,
            errors: [],
            markers: []
        });
    case UPDATE_RUBYCODE_TARGET:
        return Object.assign({}, state, {
            modified: false,
            target: action.target,
            code: RubyGenerator.targetToCode(action.target),
            erros: [],
            markers: []
        });
    case UPDATE_RUBYCODE_ERRORS:
        return Object.assign({}, state, {
            errors: action.errors,
            markers: action.markers
        });
    case CONVERTED_RUBYCODE:
        return Object.assign({}, state, {
            modified: false,
            erros: [],
            markers: []
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
    const markers = (errors || []).map(x => ({
        startRow: x.row,
        startCol: x.column,
        endRow: x.row,
        endCol: (x.source ? x.column + x.source.length : 9999),
        type: 'text',
        className: 'ruby-error'
    }));
    return {
        type: UPDATE_RUBYCODE_ERRORS,
        errors: errors,
        markers: markers
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
