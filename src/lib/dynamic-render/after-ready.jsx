import React from 'react';
import PropTypes from 'prop-types';

import {
    createElement,
    collapseElement
} from './element.jsx';

class DelayAfterReady extends React.Component {
    constructor (props) {
        super(props);

        this.state = {ready: Boolean(props.ready)};
    }

    componentWillReceiveProps (newProps) {
        if (this.state.ready === false && newProps.ready) {
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
    ready: PropTypes.bool
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
