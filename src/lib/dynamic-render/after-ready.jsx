import React from 'react';
import PropTypes from 'prop-types';

import {
    createElement,
    collapseElement
} from './element.jsx';

class DelayAfterReady extends React.Component {
    constructor (props) {
        super(props);

        this.ready = this.ready.bind(this);

        if (typeof props.ready === 'function') {
            this.state = {ready: false};
            props.ready(this.ready);
        } else {
            this.state = {ready: Boolean(props.ready)};
        }
    }

    componentWillReceiveProps (newProps) {
        if (this.state.ready === false) {
            if (typeof newProps.ready === 'function') {
                newProps.ready(this.ready);
            } else if (newProps.ready) {
                this.ready();
            }
        }
    }

    ready () {
        if (this.state.ready === false) {
            this.setState({ready: true});
        }
    }

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
