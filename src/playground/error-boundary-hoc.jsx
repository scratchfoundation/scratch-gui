import React from 'react';
import ErrorBoundary from '../containers/error-boundary.jsx';

/*
 * Higher Order Component to provide error boundary for wrapped component
 * @param {React.Component} WrappedComponent - component to provide state for
 * @returns {React.Component} component with error boundary
 */
const ErrorBoundaryHOC = function (WrappedComponent) {
    const ErrorBoundaryWrapper = props => (
        <ErrorBoundary>
            <WrappedComponent {...props} />
        </ErrorBoundary>
    );
    return ErrorBoundaryWrapper;
};

export default ErrorBoundaryHOC;
