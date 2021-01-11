import React from 'react';
​
/* Higher Order Component to throttle updates to specific props by delaying it,
 * instead of ignoring it (like ThrottledPropertyHOC)
 * @param {string} propName the name of the prop to throttle updates from.
 * @param {string} throttleTime the minimum time (in ms) between updates to that specific property.
 * @returns {function} a function that accepts a component to wrap.
 */
​
const DebouncedPropertyHOC = function (propName, throttleTime) {
    return function (WrappedComponent) {
        class DebouncedPropertyWrapper extends React.Component {
            constructor () {
                super();
                this.state = {
                    propValue: this.props[propName]
                };
                this._timeout = null;
            }
​
            componentDidUpdate (prevProps) {
                if (!this._timeout && prevProps[propName] !== this.props[propName]) {
                    this._timeout = setTimeout(() => {
                        this.setState({
                            propValue: this.props[propName]
                        });
                        this._timeout = null;
                    }, throttleTime);
                    // update the state.propValue
                    this.setState({
                        propValue: this.props[propName]
                    })
                }
            }
​
            // shouldComponentUpdate (nextProps) {
            //     // Always re-render when timeout is finished
            //     if (!this._timeout) return true;
            //     if (nextProps[propName] === this.props[propName]) return true;
            //     for (const nextProp in nextProps) {
            //         if (nextProp !== propName && this.props[nextProp] !== nextProps[nextProp]) {
            //             return true; // Always update if another property has changed
            //         }
            //     }
            //     return false;
            // }
​
            componentWillUnmount () {
                if (this._timeout) clearTimeout(this._timeout);
            }
​
            render () {
​
                let props =  {};
                if (this._timeout) {
                    props = Object.assign({[propName]: this.state.propValue}, this.props);
                } else {
                    props = this.props;
                }
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
​
export default DebouncedPropertyHOC;
