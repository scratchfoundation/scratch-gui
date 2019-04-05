import {compose} from 'redux';

import {flattenStatelessElement} from './element.jsx';

const ifReady = _If => _Else => (
    function DelayIfReady ({ready, ...props}) {
        if (ready) return flattenStatelessElement(_If, props);
        return flattenStatelessElement(_Else, props);
    }
);

const ifNotReady = _Else => _If => ifReady(_If)(_Else);

const Null = () => null;

const gate = compose(
    ifNotReady(Null)
);

const placeholder = _Else => compose(
    ifNotReady(_Else)
);

const addProps = moreProps => WrappedComponent => (
    function DelayAddProps (props) {
        const _props = {...props, ...moreProps};
        return flattenStatelessElement(WrappedComponent, _props);
    }
);

export {
    addProps,
    Null,
    gate,
    ifNotReady,
    ifReady,
    placeholder
};
