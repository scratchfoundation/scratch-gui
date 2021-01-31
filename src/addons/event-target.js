// Some browsers have a non-functional EventTarget, so we write our own version that works everywhere.

class EventTargetShim {
    constructor () {
        this._events = {};
    }

    addEventListener (event, handler) {
        if (!this._events[event]) {
            this._events[event] = [];
        }
        this._events[event].push(handler);
    }

    removeEventListener (event, handler) {
        const handlers = this._events[event];
        if (handlers) {
            this._events[event] = handlers.filter(i => i !== handler);
        }
    }

    dispatchEvent (event) {
        const handlers = this._events[event.type];
        if (handlers) {
            for (const fn of handlers) {
                fn(event);
            }
        }
    }
}

export default EventTargetShim;
