import PropTypes from 'prop-types';
import React from 'react';

import {flattenStatelessElement} from './element.jsx';

// This is similar to VM's TaskQueue but tries to be aware of other activity,
// delaying execution, and uses a priority value, weight, instead of cost.

const makeTimeout = () => {
    let _nextIdleTimeout = null;
    return (fn, ms) => {
        clearTimeout(_nextIdleTimeout);
        _nextIdleTimeout = setTimeout(fn, ms);
    };
};

const makeTimer = (() => {
    let last = Date.now();
    return () => {
        const _last = last;
        const now = last = Date.now();
        return now - _last;
    };
});

const nextIdle = ((timeout, test) => (
    function poolNextIdle (fn) {
        test();
        const poolIdleStep = () => {
            if (test()) fn();
            else timeout(poolIdleStep);
        };
        timeout(poolIdleStep);
    }
))(
    // Wait to call step for 5 milliseconds
    ((timeout, ms) => step => timeout(step, ms))(makeTimeout(), 5),
    // Call fn if the time passed is less than 20 milliseconds
    ((timer, max) => () => timer() < max)(makeTimer(), 20)
);

const pool = [];

const _next = (function (fn) {
    return function poolCallNextWrapped () {
        nextIdle(fn);
    };
}(
    () => {
        const item = pool.shift();
        _next();
        if (item) item[2]();
    }
));

const _insertInPool = (test, newItem) => {
    const i = pool.findIndex(item => test(item, newItem));
    pool.splice(i >= 0 ? i : pool.length, 0, newItem);
};

const _removeFromPool = (test, oldItem) => {
    const i = pool.findIndex(item => test(item, oldItem));
    if (i > -1) pool.splice(i, 1);
};

const _callPoolNow = item => {
    if (item[1] < 0) {
        item[2]();
        return true;
    }
};

const removeFromPoolTest = (item, oldItem) => (item[0] === oldItem[0]);
const removeFromPool = (...args) => {
    _removeFromPool(removeFromPoolTest, args);
};

const addToPoolTest = (item, newItem) => (item[1] > newItem[1]);
const addToPool = (...args) => {
    removeFromPool(...args);

    if (_callPoolNow(args)) return;

    _insertInPool(addToPoolTest, args);
    if (pool.length === 1) {
        _next();
    }
};

class DelayPoolEntrant extends React.Component {
    constructor (props) {
        super(props);

        this.state = {ready: null};

        this.start(props);

        this.state.ready = this.state.ready || false;
    }

    componentWillReceiveProps (newProps) {
        if (this.state.ready) return;
        this.start(newProps);
    }

    componentWillUnmount () {
        if (this.state.ready) return;
        this.stop();
    }

    start ({priority}) {
        addToPool(this, priority, () => this.ready());
    }

    stop () {
        removeFromPool(this);
    }

    ready () {
        if (this.state.ready === false) {
            this.setState({ready: true});
        } else {
            // We haven't rendered yet, it would cause an error to call setState
            // here.
            // eslint-disable-next-line react/no-direct-mutation-state
            this.state.ready = true;
        }
    }

    render () {
        const {ready} = this.state;
        const {Component, ...props} = this.props;
        return flattenStatelessElement(Component, {
            ready,
            ...props
        });
    }
}

DelayPoolEntrant.propTypes = {
    Component: PropTypes.func,
    priority: PropTypes.number
};

const schedule = WrappedComponent => (
    function DelaySchedule (props) {
        return (
            <DelayPoolEntrant
                Component={WrappedComponent}
                {...props}
            />
        );
    }
);

export {
    schedule
};
