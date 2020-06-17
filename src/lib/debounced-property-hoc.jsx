import React from 'react';

/* Higher Order Component to throttle updates to specific props by delaying it,
 * instead of ignoring it (like ThrottledPropertyHOC)
 * @param {string} propName the name of the prop to throttle updates from.
 * @param {string} throttleTime the minimum time (in ms) between updates to that specific property.
 * @returns {function} a function that accepts a component to wrap.
 */

const DebouncedPropertyHOC = function (propName, throttleTime) {
    return function (WrappedComponent) {
        class DebouncedPropertyWrapper extends React.Component {
            constructor () {
                super();
                this.state = {
                    propValue: null
                };
                this._timeout = null;
                // This will be used during the throttle
                this._useInstead = null;
                // This will be true during the rendering caused by setState in setTimeout
                this._timeoutJustFinished = false;
            }

            shouldComponentUpdate (nextProps) {
                // Always re-render when timeout is finished
                if (this._timeoutJustFinished) return true;
                // If not throttled, we can check the props
                if (!this._timeout && this.props[propName] !== nextProps[propName]) return true;
                for (const property in nextProps) {
                    if (property !== propName && this.props[property] !== nextProps[property]) {
                        return true; // Always update if another property has changed
                    }
                }
                return false;
            }

            componentWillUnmount () {
                if (this._timeout) clearTimeout(this._timeout);
            }

            render () {
                // There are 3 cases:
                // 1. Not throttled: make a timeout to re-render with the latest prop
                // This is handled inside "if" below
                // 2. Throttled: timeoutJustFinished is false, use _useInstead to render
                // 3. Throttling just finished: timeoutJustFinished is true
                // use state.propValue to re-render
                if (!this._timeout) {
                    // We are not throttled.
                    this._timeout = setTimeout(() => {
                        this._useInstead = null;
                        this._timeoutJustFinished = true;
                        // This will re-render when we receive.
                        this.setState({
                            propValue: this.props[propName]
                        }, () => {
                            this._timeout = null;
                            this._timeoutJustFinished = false;
                        });
                    }, throttleTime);
                    this._useInstead = this.props[propName];
                    return (
                        <WrappedComponent
                            {...this.props}
                        />
                    );
                }
                const propValue = this._timeoutJustFinished ? this.state.propValue : this._useInstead;
                const props = Object.assign({[propName]: propValue}, this.props);
                return (
                    <WrappedComponent
                        {...props}
                    />
                );
            }
        }
        return DebouncedPropertyWrapper;
    };
};

export default DebouncedPropertyHOC;
