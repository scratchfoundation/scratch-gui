import PropTypes from 'prop-types';
import React from 'react';

import {afterReady} from './after-ready.jsx';

// This is similar to VM's TaskQueue but tries to be aware of other activity,
// delaying execution, and uses a priority value, weight, instead of cost.

const makeCallAfterTimeout = (timeout, ms) => fn => timeout(fn, ms);

const makeTimerLessThanTest = (timer, max) => () => timer() < max;

const makeCallWhen = (timeout, test) => fn => {
    test();
    const poolIdleStep = () => {
        if (test()) fn();
        else timeout(poolIdleStep);
    };
    timeout(poolIdleStep);
};

const makeTimeout = () => {
    let _nextIdleTimeout = null;
    return (fn, ms) => {
        clearTimeout(_nextIdleTimeout);
        _nextIdleTimeout = setTimeout(fn, ms);
    };
};

const makeTimer = () => {
    let last = Date.now();
    return () => {
        const _last = last;
        const now = last = Date.now();
        return now - _last;
    };
};

const callWhenIdle = makeCallWhen(
    // Wait to call step for 5 milliseconds
    makeCallAfterTimeout(makeTimeout(), 5),
    // Call fn if the time passed is less than 20 milliseconds
    makeTimerLessThanTest(makeTimer(), 20)
);

const bindCallWhenIdle = fn => () => callWhenIdle(fn);

class IdlePriorityPool {
    constructor () {
        this.pool = [];

        this.schedule = bindCallWhenIdle(() => {
            const item = this.pool.shift();
            this.schedule();
            if (item) item[2]();
        });
    }

    _insert (test, newItem) {
        const i = this.pool.findIndex(item => test(item, newItem));
        this.pool.splice(i >= 0 ? i : this.pool.length, 0, newItem);
    }

    _remove (test, oldItem) {
        const i = this.pool.findIndex(item => test(item, oldItem));
        if (i > -1) this.pool.splice(i, 1);
    }

    removeTest (item, oldItem) {
        return item[0] === oldItem[0];
    }

    remove (...args) {
        this._remove(this.removeTest, args);
    }

    addTest (item, newItem) {
        return item[1] > newItem[1];
    }

    add (...args) {
        this.remove(...args);

        this._insert(this.addTest, args);

        if (this.pool.length === 1) {
            this.schedule();
        }
    }
}

const pool = new IdlePriorityPool();

const schedule = WrappedComponent => {
    const DelayAfterReadyWrapped = afterReady(WrappedComponent);
    return function DelaySchedule ({priority, ...props}) {
        return (<DelayAfterReadyWrapped
            ready={priority < 0 || (ready => pool.add(ready, priority, ready))}
            {...props}
        />);
    };
};

export {
    schedule
};
