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
            }

            shouldComponentUpdate (nextProps, nextState) {
                if (nextState.propValue !== this.state.propValue) return true;
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
                if (!this._timeout) {
                    // We are not throttled.
                    this._timeout = setTimeout(() => {
                        this._useInstead = null;
                        // This will re-render when we receive.
                        this.setState({
                            propValue: this.props[propName]
                        }, () => {
                            this._timeout = null;
                        });
                    }, throttleTime);
                    this._useInstead = this.props[propName];
                    return (
                        <WrappedComponent
                            {...this.props}
                        />
                    );
                }
                const props = Object.assign({[propName]: this._useInstead || this.state.propValue}, this.props);
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
