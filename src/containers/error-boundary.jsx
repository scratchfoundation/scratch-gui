import React from 'react';
import PropTypes from 'prop-types';
import platform from 'platform';
import BrowserModalComponent from '../components/browser-modal/browser-modal.jsx';
import log from '../lib/log.js';
import analytics from '../lib/analytics';

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
        analytics.event({
            category: 'error',
            action: 'Fatal Error',
            label: error.message
        });
    }

    handleBack () {
        window.history.back();
    }

    render () {
        if (this.state.hasError) {
            if (platform.name === 'IE') {
                return <BrowserModalComponent onBack={this.handleBack} />;
            }
            return (
                <div style={{margin: '2rem'}}>
                    <h1>Oops! Something went wrong.</h1>
                    <p>
                        We are so sorry, but it looks like Scratch has crashed. This bug has been
                        automatically reported to the Scratch Team. Please refresh your page to try
                        again.
                    </p>
                </div>
            );
        }
        return this.props.children;
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.node
};

export default ErrorBoundary;
