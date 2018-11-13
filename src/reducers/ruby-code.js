import PropTypes from 'prop-types';
import RubyGenerator from '../lib/ruby-generator';

const UPDATE_RUBYCODE = 'smalruby3-gui/ruby-code/UPDATE_RUBYCODE';

const initialState = {
    target: null,
    code: ''
};

const rubyCodeShape = PropTypes.shape({
    target: PropTypes.shape({
        id: PropTypes.string
    }),
    code: PropTypes.string
});

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case UPDATE_RUBYCODE:
        return {
            target: action.target,
            code: RubyGenerator.targetToCode(action.target)
        };
    default:
        return state;
    }
};

const updateRubyCode = function (target) {
    return {
        type: UPDATE_RUBYCODE,
        target: target
    };
};

export {
    reducer as default,
    initialState as rubyCodeInitialState,
    rubyCodeShape,
    updateRubyCode
};
