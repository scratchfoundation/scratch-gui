import React from 'react';
import PropTypes from 'prop-types';
import platform from 'platform';
import WebGlModalComponent from '../components/webgl-modal/webgl-modal.jsx';
import log from '../lib/log.js';

class ErrorBoundary extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            hasError: false
        };
    }

    componentDidCatch (error, info) {
        // Display fallback UI
        this.setState({hasError: true});
        log.error(`Unhandled Error: ${error}, info: ${info}`);
    }

    handleBack () {
        window.history.back();
    }

    render () {
        if (this.state.hasError) {
            if (platform.name === 'IE') {
                return <h1>Sorry Internet Explorer is not supported.</h1>;
            }
            if (window.WebGLRenderingContext) {
                const canvas = document.createElement('canvas');
                if (!canvas.getContext('webgl')) {
                    return <WebGlModalComponent onBack={this.handleBack} />;
                }
            } else {
                return <WebGlModalComponent onBack={this.handleBack} />;
            }
            return <h1>Something went wrong.</h1>;
        }
        return this.props.children;
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.node
};

export default ErrorBoundary;
