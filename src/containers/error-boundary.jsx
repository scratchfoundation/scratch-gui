import React from 'react';
import PropTypes from 'prop-types';
import bowser from 'bowser';
import BrowserModalComponent from '../components/browser-modal/browser-modal.jsx';
import CrashMessageComponent from '../components/crash-message/crash-message.jsx';
import log from '../lib/log.js';
import supportedBrowser from '../lib/supported-browser';
import analytics from '../lib/analytics';

class ErrorBoundary extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            hasError: false
        };
    }

    componentDidCatch (error, info) {
        // Error object may be undefined (IE?)
        error = error || {
            stack: 'Unknown stack',
            message: 'Unknown error'
        };

        // Display fallback UI
        this.setState({hasError: true});

        // Log errors to analytics, separating supported browsers from unsupported.
        if (supportedBrowser()) {
            analytics.event({
                category: 'error',
                action: this.props.action,
                label: error.message
            });
        } else {
            analytics.event({
                category: 'Unsupported Browser Error',
                action: `(Unsupported Browser) ${this.props.action}`,
                label: `${bowser.name} ${error.message}`
            });
        }

        // Log error locally for debugging as well.
        log.error(`Unhandled Error: ${error.stack}\nComponent stack: ${info.componentStack}`);
    }

    handleBack () {
        window.history.back();
    }

    handleReload () {
        window.location.replace(window.location.origin + window.location.pathname);
    }

    render () {
        if (this.state.hasError) {
            if (supportedBrowser()) {
                return <CrashMessageComponent onReload={this.handleReload} />;
            }
            return <BrowserModalComponent onBack={this.handleBack} />;
        }
        return this.props.children;
    }
}

ErrorBoundary.propTypes = {
    action: PropTypes.string.isRequired, // Used for defining tracking action
    children: PropTypes.node
};

export default ErrorBoundary;
