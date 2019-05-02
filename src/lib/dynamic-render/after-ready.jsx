import React from 'react';
import PropTypes from 'prop-types';

import {
    createElement,
    collapseElement
} from './element.jsx';

/**
 * In case a parent changes the ready state back to false this component can be
 * used to store the state that ready was previously true and will continue to
 * be until this component is removed.
 */
class DelayAfterReady extends React.Component {
    constructor (props) {
        super(props);

        /**
         * Internal method to set ready depending on component's mounting state.
         * @type {function}
         */
        this._step = this.readyNoop;

        /**
         * Bound copy of ready. Using the callback ready style, functions may
         * depend on ready being a the same function for the same component.
         * @type {function}
         */
        this.ready = this.ready.bind(this);

        // The initial ready value. May be changed synchronously before
        // this.state is set.
        let ready = false;

        if (typeof props.ready === 'function') {
            this._step = () => {
                ready = true;
            };
            props.ready(this.ready);
        } else {
            ready = Boolean(props.ready);
        }

        if (ready === false) {
            this._step = this.readySetTrue;
        } else {
            this._step = this.readyNoop;
        }

        this.state = {ready};
    }

    componentWillReceiveProps ({ready}) {
        if (typeof ready === 'function') {
            ready(this.ready);
        } else if (ready) {
            this.ready();
        }
    }

    componentWillUnmount () {
        this._step = this.readyNoop;
    }

    ready () {
        this._step();
    }

    readySetTrue () {
        this.setState({ready: true});
        this._step = this.readyNoop;
    }

    readyNoop () {}

    render () {
        const {ready} = this.state;
        const {
            Component,
            ...inputProps
        } = this.props;
        const outputProps = {...inputProps, ready};
        return collapseElement(createElement(Component, outputProps));
    }
}

DelayAfterReady.propTypes = {
    Component: PropTypes.func,
    ready: PropTypes.oneOfType([PropTypes.bool, PropTypes.func])
};

const afterReady = WrappedComponent => (
    function DelayAfterReadyWrapped (props) {
        return collapseElement(createElement(DelayAfterReady, {
            Component: WrappedComponent,
            ...props
        }));
    }
);

export {
    afterReady
};
