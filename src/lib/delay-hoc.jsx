import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

import {
    LoadingState,
    getIsFetchingWithId,
    getIsLoadingWithId
} from '../reducers/project-state';

// This is similar to VM's TaskQueue but tries to be aware of other activity,
// delaying execution, and uses a priority value, weight, instead of cost.

const pool = [];

const nextInPool = (function () {
    let _nextInPoolTimeout = null;
    let last = Date.now();
    const step = () => {
        if (pool.length && pool[0][0] === 0) {
            return;
        }
        // If it took too long for our callback to occur, JS or the browser are
        // trying to do some work. Lets wait a little more to let it run as much
        // of that work as possible.
        if (Date.now() - last > 20) {
            last = Date.now();
            return new Promise(resolve => {
                _nextInPoolTimeout = setTimeout(resolve, 5);
            })
                .then(step);
        }
    };
    return fn => {
        clearTimeout(_nextInPoolTimeout);

        last = Date.now();
        new Promise(resolve => {
            _nextInPoolTimeout = setTimeout(resolve, 5);
        })
            .then(step)
            .then(fn);
    };
}());

const removeFromPool = target => {
    const old = pool.findIndex(item => item[1] === target);
    if (old > -1) {
        pool.splice(old, 1);
    }
};

const addToPool = (weight, target) => {
    return new Promise(resolve => {
        removeFromPool();

        let i;
        for (i = pool.length - 1; i >= 0; i--) {
            if (pool[i][0] <= weight) {
                pool.splice(i + 1, 0, [weight, target, resolve]);
                break;
            }
        }
        if (i === -1) {
            pool.unshift([weight, target, resolve]);
        }
        if (pool.length === 1) {
            nextInPool(() => {
                if (pool.length > 0) {
                    pool[0][2]();
                }
            });
        }
    })
        .then(() => {
            removeFromPool(target);
            nextInPool(() => {
                if (pool.length > 0) {
                    pool[0][2]();
                }
            });
        });
};

// Selectors here can provide a descriptive interface for when delay arguments
// should be which values. If we use only these common functions we can use that
// as a way to shortcut all of the delays gates. By replacing the functions on
// Delay with ones that return true.

const loadingState = state => state.scratchGui.projectState.loadingState;

const fetching = state => (
    loadingState(state) === LoadingState.NOT_LOADED ||
    getIsFetchingWithId(loadingState(state))
);

const isLoading = state => getIsLoadingWithId(loadingState(state));

const loadingStateVisible = state => state.scratchGui.modals.loadingProject;

const loading = state => (
    fetching(state) ||
    isLoading(state) ||
    loadingStateVisible(state)
);

// A set of extra HOCs to handle some annoying details of this interface.

const loadNull = function (load) {
    return function () {
        load();
        return null;
    };
};

const loadChildren = function ({children}) {
    if (children) {
        children();
    }
    return null;
};

const loadComponent = function (load) {
    return function ({children, ...props}) {
        const _Component = load();
        const Component = _Component.default || _Component;
        return <Component {...props}>{children}</Component>;
    };
};

// A HOC to delay rendering a part of the app. It keeps a boolean state and once
// true will always render the passed component and props.
//
// ready: true when we want to render
// stall: false if we want to render immediately, true if it is ok to wait
// weight:
//   - 0 if we should render on the next setTimeout callback
//   - >0 if we want the delayed renders to be render from lowest to highest

const Delay = ({ready, stall, weight, placeholder: _placeholder}) => (WrappedComponent) => {
    const _ready = typeof ready !== 'function' ? ready : false;
    const _stall = typeof stall !== 'function' ? stall : false;
    const _weight = typeof weight !== 'function' ? weight : 0;

    class Delay extends React.Component {
        constructor (props) {
            super(props);

            this.state = {
                shouldRender: null
            };

            this.operate(this.props);

            if (!this.state.shouldRender) {
                this.state.shouldRender = false;
            }
        }

        componentWillUnmount () {
            removeFromPool(this);
            this.state.shouldRender = true;
        }

        componentWillReceiveProps (newProps) {
            this.operate(newProps);
        }

        shouldComponentUpdate (newProps, newState) {
            if (this.state.shouldRender !== newState.shouldRender) {
                return true;
            }
            const {
                ready,
                stall,
                weight,
                placeholder,
                ...nonHocProps
            } = newProps;
            for (const key in nonHocProps) {
                if (nonHocProps[key] !== this.props[key]) {
                    return true;
                }
            }
            return false;
        }

        operate (newProps) {
            const {ready = _ready} = newProps;
            if (!this.state.shouldRender && ready) {
                const {stall = _stall, weight = _weight} = newProps;

                if (stall) {
                    addToPool(weight, this)
                        .then(() => {
                            if (!this.state.shouldRender) {
                                this.setState({
                                    shouldRender: true
                                });
                            }
                        });
                    return;
                }

                removeFromPool(this);

                if (this.state.shouldRender === false) {
                    this.setState({
                        shouldRender: true
                    });
                } else {
                    this.state.shouldRender = true;
                }
            }
        }

        render () {
            if (this.state.shouldRender) {
                const {
                    ready,
                    stall,
                    weight,
                    placeholder,
                    children,
                    ...componentProps
                } = this.props;
                return (<WrappedComponent {...componentProps}>
                    {children}
                </WrappedComponent>);
            }

            const {placeholder = _placeholder} = this.props;
            return placeholder ? placeholder(this.props) : null;
        }
    }

    Delay.propTypes = {
        placeholder: PropTypes.func,
        ready: PropTypes.bool,
        stall: PropTypes.bool,
        weight: PropTypes.number
    };

    if (typeof ready === 'function' || typeof stall === 'function' || typeof weight === 'function') {
        const mapStateToProps = (state, props) => {
            const result = {};
            if (typeof ready === 'function') {
                result.ready = ready(state, props);
            }
            if (typeof stall === 'function') {
                result.stall = stall(state, props);
            }
            if (typeof weight === 'function') {
                result.weight = weight(state, props);
            }
            return result;
        };
        return connect(mapStateToProps)(Delay);
    }
    return Delay;
};

Delay.loadingState = loadingState;
Delay.fetching = fetching;
Delay.isLoading = isLoading;
Delay.loadingStateVisible = loadingStateVisible;
Delay.loading = loading;

Delay.loadNull = loadNull;
Delay.loadChildren = loadChildren;
Delay.loadComponent = loadComponent;

export default Delay;

