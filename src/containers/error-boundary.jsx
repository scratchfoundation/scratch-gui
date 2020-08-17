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
            hasError: false,
            errorId: null
        };
    }

    componentDidCatch (error, info) {
        // Error object may be undefined (IE?)
        error = error || {
            stack: 'Unknown stack',
            message: 'Unknown error'
        };

        // Log errors to analytics, leaving out browsers that are not in our recommended set
        if (recommendedBrowser() && window.Sentry) {
            window.Sentry.withScope(scope => {
                Object.keys(info).forEach(key => {
                    scope.setExtra(key, info[key]);
                });
                scope.setExtra('action', this.props.action);
                window.Sentry.captureException(error);
            });
        }

        // Display fallback UI
        this.setState({
            hasError: true,
            errorId: window.Sentry ? window.Sentry.lastEventId() : null
        });

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
            if (recommendedBrowser()) {
                return (
                    <CrashMessageComponent
                        eventId={this.state.errorId}
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
