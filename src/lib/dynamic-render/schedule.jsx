import React from 'react';

import {afterReady} from './after-ready.jsx';

// Wait and test if we should call or wait more.
const makeCallWhen = (timeout, test) => fn => {
    test();
    const poolIdleStep = () => {
        if (test()) fn();
        else timeout(poolIdleStep);
    };
    timeout(poolIdleStep);
};

// Replace the last timeout if it hasn't fired, and wait ms milliseconds for to
// call fn.
const makeTimeout = ms => {
    let _nextIdleTimeout = null;
    return fn => {
        clearTimeout(_nextIdleTimeout);
        _nextIdleTimeout = setTimeout(fn, ms);
    };
};

// Track the difference in time and return true when the difference is less than
// the max.
const makeTimer = max => {
    let last = Date.now();
    return () => {
        const _last = last;
        const now = last = Date.now();
        return (now - _last) < max;
    };
};

// Call a given function when we think we are idling. When we can make a timeout
// request and get it without a certain limit of what we expect. If it takes too
// long to callback then we are not idle.
const callWhenIdle = makeCallWhen(
    // Wait to call for 5 milliseconds
    makeTimeout(5),
    // If time passed less than 20 milliseconds call, or wait again
    makeTimer(20)
);

// Convenience method wrap callWhenIdle and use the same function each time.
const bindCallWhenIdle = fn => () => callWhenIdle(fn);

/**
 * A pool of prioritized functions to call when we think we are idle.
 */
class IdlePriorityPool {
    constructor () {
        /**
         * @type {array}
         */
        this.pool = [];

        /**
         * @type {function}
         */
        this.schedule = bindCallWhenIdle(() => {
            const item = this.pool.shift();
            this.schedule();
            if (item) item[2]();
        });
    }

    /**
     * @param {function} test - true if we can insert the new item here
     * @param {*} newItem - an item to insert
     */
    _insert (test, newItem) {
        const i = this.pool.findIndex(item => test(item, newItem));
        this.pool.splice(i >= 0 ? i : this.pool.length, 0, newItem);
    }

    /**
     * @param {function} test - true if we found the item in the pool to remove
     * @param {*} oldItem - an item to remove
     */
    _remove (test, oldItem) {
        const i = this.pool.findIndex(item => test(item, oldItem));
        if (i > -1) this.pool.splice(i, 1);
    }

    /**
     * @param {object} item - item in the pool
     * @param {object} oldItem - item to remove from the pool
     * @returns {boolean} true if item and oldItem match
     */
    removeTest (item, oldItem) {
        // Test the "id" value in each item.
        return item[0] === oldItem[0];
    }

    /**
     * Remove an item from the pool.
     */
    remove (...args) {
        this._remove(this.removeTest, args);
    }

    /**
     * @param {object} item - item in the pool
     * @param {object} newItem - item to add
     * @returns {boolean} true if item has a higher priority than newItem
     */
    addTest (item, newItem) {
        return item[1] > newItem[1];
    }

    /**
     * Add a item to the pool. An old copy of the item will be removed.
     */
    add (...args) {
        this.remove(...args);

        this._insert(this.addTest, args);

        // If this was the first item added to the pool quick of the idle call
        // loop so we may eventually execute this item.
        if (this.pool.length === 1) {
            this.schedule();
        }
    }
}

/**
 * @const {IdlePriorityPool}
 */
const pool = new IdlePriorityPool();

// Wrap a component in afterReady and set its value to true or a function that
// attaches it to the pool.
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
