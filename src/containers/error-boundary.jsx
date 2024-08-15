import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import BrowserModalComponent from '../components/browser-modal/browser-modal.jsx';
import CrashMessageComponent from '../components/crash-message/crash-message.jsx';
import log from '../lib/log.js';
import {recommendedBrowser} from '../lib/supported-browser';

class ErrorBoundary extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            error: null,
            errorInfo: null
        };
    }

    /**
     * Handle an error caught by this ErrorBoundary component.
     * @param {Error} error - the error that was caught.
     * @param {React.ErrorInfo} errorInfo - the React error info associated with the error.
     */
    componentDidCatch (error, errorInfo) {
        error = error || {
            stack: 'Unknown stack',
            message: 'Unknown error'
        };
        errorInfo = errorInfo || {
            componentStack: 'Unknown component stack'
        };

        // only remember the first error: later errors might just be side effects of that first one
        if (!this.state.error) {
            // store error & errorInfo for debugging
            this.setState({
                error,
                errorInfo
            });
        }

        // report every error in the console
        log.error([
            `Unhandled Error with action='${this.props.action}': ${error.stack}`,
            `Component stack: ${errorInfo.componentStack}`
        ].join('\n'));
    }

    handleBack () {
        window.history.back();
    }

    handleReload () {
        window.location.replace(window.location.origin + window.location.pathname);
    }

    render () {
        if (this.state.error) {
            if (recommendedBrowser()) {
                return (
                    <CrashMessageComponent
                        onReload={this.handleReload}
                    />
                );
            }
            return (<BrowserModalComponent
                error
                isRtl={this.props.isRtl}
                onBack={this.handleBack}
            />);
        }
        return this.props.children;
    }
}

ErrorBoundary.propTypes = {
    action: PropTypes.string.isRequired, // Used for defining tracking action
    children: PropTypes.node,
    isRtl: PropTypes.bool
};

const mapStateToProps = state => ({
    isRtl: state.locales.isRtl
});

// no-op function to prevent dispatch prop being passed to component
const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ErrorBoundary);
